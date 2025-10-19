const mongoose = require('mongoose');
const Account = require('../models/Account');

const getAllAccount = async (req, res) => {
    // Sometimes you need to limit this query!
    try {
        const accounts = await Account.find({}).exec();

        if (!accounts.length) {
            return res.status(404).json({
                success: false,
                message: "No accounts found!",
            });
        }
        res.status(200).json({
            success: true,
            data: accounts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }

}

const getFilteredAccount = async (req, res) => {
    const { page = 1, limit = 10, accountId, userId, sort = [] } = req.body;
    const skip = (page - 1) * limit;
    const sortConfig = {};
    sort.forEach(({ field, order }) => {
        sortConfig[field] = order === "asc" ? 1 : -1;
    });

    query = {};
    if (accountId) {
        query._id = new mongoose.Types.ObjectId(accountId);
    }
    query = {};
    if (userId) {
        query.userId = new mongoose.Types.ObjectId(userId);
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

    const [forIndexing, accounts, total] = await Promise.all([
        Account.aggregate(pipelineForIndexing),
        Account.aggregate(pipeline),
        Account.countDocuments(query).exec(),
    ])
    const indexQuery = forIndexing.map((item, i) => ({
        id: item._id,
        rowIndex: skip + i + 1,
    }))
    const indexedAccount = accounts.map((item, i) => ({
        ...item,
        rowIndex: indexQuery.find(f => f.id.toString() === item._id.toString())?.rowIndex ?? null
    }))
    res.json({
        success: true,
        data: {
            items: indexedAccount,
            total,
        },
    })
}

const createAccount = async (req, res) => {
    try {
        const { name, description, photo, userId } = req.body;
        const newData = Account({ name, description, photo, userId });
        const account = await newData.save()
        res.status(200).json({
            success: true,
            message: "New account data has been added",
            data: account,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to add new data but some error occured!",
        });
    }
}
const deleteAccount = async (req, res) => {
    try {
        const id = req.params.id;
        const account = await Account.findByIdAndDelete({ _id: id }).exec();
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Account deleted succesfully",
            data: account
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to delete data but some error occured!"
        })
    }
}
const updateAccount = async (req, res) => {

    try {
        const { _id, ...updates } = req.body;
        if (Object.keys(updates).length === 0) {
            res.status(500).json({
                success: false,
                message: "No fields provided for update."
            })
        }
        const account = await Account.findByIdAndUpdate(_id, updates, { new: true }).exec();
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "The account data has been updated",
            data: account
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
    getAllAccount,
    getFilteredAccount,
    createAccount,
    deleteAccount,
    updateAccount,
};
