const mongoose = require('mongoose');
const Budget = require('../models/Budget');

const getAllBudget = async (req, res) => {
    // Sometimes you need to limit this query!
    try {
        const budgets = await Budget.find({}).exec();

        if (!budgets.length) {
            return res.status(404).json({
                success: false,
                message: "No budgets found!",
            });
        }
        res.status(200).json({
            success: true,
            data: budgets,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }

}

const getFilteredBudget = async (req, res) => {
    const { page = 1, limit = 10, budgetId, month, startAmountRaw, endAmountRaw, accountId, categoryId, sort = [] } = req.body;
    const skip = (page - 1) * limit;
    const sortConfig = {};
    let sortByNum = true;
    sort.forEach(({ field, order }) => {
        if (field === "user") {
            sortConfig["user.name"] = order === "asc" ? 1 : -1;
        } else {
            sortConfig[field] = order === "asc" ? 1 : -1;
        }
    });
    sortByNum = sort.some(item => item.field === 'createdAt' && item.order === 'asc');

    query = {};
    if (accountId) {
        query.accountId = new mongoose.Types.ObjectId(accountId);
    }
    if (categoryId) {
        query.categoryId = new mongoose.Types.ObjectId(categoryId);
    }

    if (month) {
        const inputDate = new Date(month); // e.g., "2025-01-28T17:00:00.000Z"
        const startDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1); // 2025-01-01
        const endDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 1); // 2025-02-01

        query.month = {
            $gte: startDate,
            $lt: endDate, // use $lt to exclude the first moment of next month
        };
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
    const [forIndexing, budgets, total] = await Promise.all([
        Budget.aggregate(pipelineForIndexing),
        Budget.aggregate(pipeline),
        Budget.countDocuments(query).exec(),
    ])
    const indexQuery = forIndexing.map((item, i) => ({
        id: item._id,
        rowIndex: skip + i + 1,
    }))
    const indexedBudget = budgets.map((item, i) => ({
        ...item,
        rowIndex: indexQuery.find(f => f.id.toString() === item._id.toString())?.rowIndex ?? null
    }))
    res.json({
        success: true,
        data: {
            items: indexedBudget,
            total,
        },

    })
}

const createBudget = async (req, res) => {
    try {
        const { accountId, categoryId, month, limitAmount } = req.body;
        const newData = Budget({ accountId, categoryId, month, limitAmount });
        const budget = await newData.save()
        res.status(200).json({
            success: true,
            message: "New budget data has been added",
            data: budget,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to add new data but some error occured!",
        });
    }
}

const checkBudget = async (req, res) => {
    try {
        const { accountId, categoryId, month, limitAmount } = req.body;
        let budget = await Budget.findOne({ accountId, categoryId }).exec();
        let message = "Data already exist";
        if (!budget) {
            const newData = Budget({ accountId, categoryId, month, limitAmount, budget });
            budget = await newData.save();
            message = "New budget data has been added to the category";
        }
        res.status(200).json({
            success: true,
            message: message,
            data: budget,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to find/add new data but some error occured!",
        });
    }
}


const deleteBudget = async (req, res) => {
    try {
        const id = req.params.id;
        const budget = await Budget.findByIdAndDelete({ _id: id }).exec();
        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Budget deleted succesfully",
            data: budget
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to delete data but some error occured!"
        })
    }
}
const updateBudget = async (req, res) => {

    try {
        const { _id, ...updates } = req.body;
        if (Object.keys(updates).length === 0) {
            res.status(500).json({
                success: false,
                message: "No fields provided for update."
            })
        }
        const budget = await Budget.findByIdAndUpdate(_id, updates, { new: true }).populate('categoryId').exec();
        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "The budget data has been updated",
            data: budget
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
    getAllBudget,
    getFilteredBudget,
    checkBudget,
    createBudget,
    deleteBudget,
    updateBudget,
};
