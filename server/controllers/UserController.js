const mongoose = require('mongoose');
const User = require('../models/User');

const getAllUser = async (req, res) => {
    // Sometimes you need to limit this query!
    try {
        const users = await User.find({}).exec();

        if (!users.length) {
            return res.status(404).json({
                success: false,
                message: "No users found!",
            });
        }
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }

}

const getFilteredUser = async (req, res) => {
    const { page = 1, limit = 10, userId, sort = [] } = req.body;
    const skip = (page - 1) * limit;
    const sortConfig = {};
    let sortByNum = true;
    sort.forEach(({ field, order }) => {
        sortConfig[field] = order === "asc" ? 1 : -1;
    });
    sortByNum = sort.some(item => item.field === 'createdAt' && item.order === 'asc');

    query = {};
    if (userId) {
        query.user = new mongoose.Types.ObjectId(userId);
    }

    const pipelineForIndexing = [
        { $match: query },
        { $skip: skip },
        { $limit: limit },
    ];


    const pipeline = [...pipelineForIndexing, { $sort: sortConfig }];

    const [forIndexing, users, total] = await Promise.all([
        User.aggregate(pipelineForIndexing),
        User.aggregate(pipeline),
        User.countDocuments(query).exec(),
    ])
    const indexQuery = forIndexing.map((item, i) => ({
        id: item._id,
        rowIndex: skip + i + 1,
    }))
    const indexedUser = users.map((item, i) => ({
        ...item,
        rowIndex: indexQuery.find(f => f.id.toString() === item._id.toString())?.rowIndex ?? null
    }))
    res.json({
        success: true,
        data: {
            items: indexedUser,
            total,
        },
    })
}

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newData = User({ name, email });
        const user = await newData.save()
        res.status(200).json({
            success: true,
            message: "New user data has been added",
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to add new data but some error occured!",
        });
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({ _id: id }).exec();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User deleted succesfully",
            data: user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to delete data but some error occured!"
        })
    }
}
const updateUser = async (req, res) => {

    try {
        const { _id, ...updates } = req.body;
        if (Object.keys(updates).length === 0) {
            res.status(500).json({
                success: false,
                message: "No fields provided for update."
            })
        }
        const user = await User.findByIdAndUpdate(_id, updates, { new: true }).populate('categoryId').exec();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "The user data has been updated",
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to update data but some error occured!"
        })
    }
}


module.exports = {
    getAllUser,
    getFilteredUser,
    createUser,
    deleteUser,
    updateUser,
};
