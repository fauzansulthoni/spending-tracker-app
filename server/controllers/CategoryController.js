const mongoose = require('mongoose');
const Category = require('../models/Category');

const getAllCategory = async (req, res) => {
    // Sometimes you need to limit this query!
    try {
        const categorys = await Category.find({}).exec();

        if (!categorys.length) {
            return res.status(404).json({
                success: false,
                message: "No categorys found!",
            });
        }
        res.status(200).json({
            success: true,
            data: categorys,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }

}

const getFilteredCategory = async (req, res) => {
    const { page = 1, limit = 10, categoryId, startDateRaw, endDateRaw, startAmountRaw, endAmountRaw, type, accountId, sort = [] } = req.body;
    const skip = (page - 1) * limit;
    const sortConfig = {};
    sort.forEach(({ field, order }) => {
        if (field === "user") {
            sortConfig["user.name"] = order === "asc" ? 1 : -1;
        } else {
            sortConfig[field] = order === "asc" ? 1 : -1;
        }
    });
    // if (accountId === 'null') {
    //     return res.status(200).json({
    //         success: true,
    //         message: "Category not found!",
    //         data: {
    //             items: null,
    //             total: 0,
    //         },
    //     });
    // }
    query = {};
    if (accountId) {

        query.accountId = new mongoose.Types.ObjectId(accountId);
    }
    if (type) {
        query.type = type;
    }

    const pipelineForIndexing = [
        { $match: query },
        { $skip: skip },
        { $limit: limit },
    ];


    const pipeline = pipelineForIndexing;
    if (Object.keys(sort).length > 0) {
        pipeline.push({ $sort: sort });
    }

    const [forIndexing, categorys, total] = await Promise.all([
        Category.aggregate(pipelineForIndexing),
        Category.aggregate(pipeline),
        Category.countDocuments(query).exec(),
    ])
    const indexQuery = forIndexing.map((item, i) => ({
        id: item._id,
        rowIndex: skip + i + 1,
    }))
    const indexedCategory = categorys.map((item, i) => ({
        ...item,
        rowIndex: indexQuery.find(f => f.id.toString() === item._id.toString())?.rowIndex ?? null
    }))
    res.json({
        success: true,
        data: {
            items: indexedCategory,
            total,
        },
    })
}

const createCategory = async (req, res) => {
    try {
        const { name, type, icon, color, accountId } = req.body;
        const newData = Category({ name, type, icon, color, accountId });
        const category = await newData.save()
        res.status(200).json({
            success: true,
            message: "New category data has been added",
            data: category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to add new data but some error occured!",
        });
    }
}
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndDelete({ _id: id }).exec();
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category deleted succesfully",
            data: category
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to delete data but some error occured!"
        })
    }
}
const updateCategory = async (req, res) => {

    try {
        const { _id, ...updates } = req.body;
        if (Object.keys(updates).length === 0) {
            res.status(500).json({
                success: false,
                message: "No fields provided for update."
            })
        }
        const category = await Category.findByIdAndUpdate(_id, updates, { new: true }).exec();
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "The category data has been updated",
            data: category
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
    getAllCategory,
    getFilteredCategory,
    createCategory,
    deleteCategory,
    updateCategory,
};
