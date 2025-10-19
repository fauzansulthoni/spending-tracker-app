const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

const getAllTransaction = async (req, res) => {
    // Sometimes you need to limit this query!
    try {
        const transactions = await Transaction.find({}).exec();

        if (!transactions.length) {
            return res.status(404).json({
                success: false,
                message: "No transactions found!",
            });
        }
        res.status(200).json({
            success: true,
            data: transactions,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }

}

const getFilteredTransaction = async (req, res) => {
    const { page = 1, limit = 10, categoryId, startDateRaw, endDateRaw, startAmountRaw, endAmountRaw, accountId, month, sort = [] } = req.body;
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

    const highestVal = async () => {
        return Math.max(...transactions.map(tx => tx.amount));
    }
    if (startAmountRaw || endAmountRaw) {
        const startAmount = startAmountRaw ? parseInt(startAmountRaw) : 0;
        const endAmount = endDateRaw ? parseInt(endDateRaw) : highestVal;
        query.amount = {
            $gte: startAmount,
            $lte: endAmount,
        };
    }
    
    if (month) {
        const inputDate = new Date(month); // e.g., "2025-01-28T17:00:00.000Z"
        const startDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1); // 2025-01-01
        const endDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 1); // 2025-02-01

        query.date = {
            $gte: startDate,
            $lt: endDate, // use $lt to exclude the first moment of next month
        };
    }
    if (startDateRaw || endDateRaw) {
        const now = new Date();
        const startDate = startDateRaw ? new Date(startDateRaw) : new Date("1970-01-01T00:00:00.000Z");
        const endDate = endDateRaw ? new Date(endDateRaw) : now;

        query.date = {
            $gte: startDate,
            $lte: endDate,
        };
    }

    const pipelineForIndexing = [
        { $match: query },
        { $skip: skip },
        { $limit: limit },
    ];


    const pipeline = pipelineForIndexing;
    // if (Object.keys(sort).length > 0) {
    //     pipeline.push({ $sort: sort });
    // }

    const [forIndexing, transactions, total] = await Promise.all([
        Transaction.aggregate(pipelineForIndexing),
        Transaction.aggregate(pipeline),
        Transaction.countDocuments(query).exec(),
    ])
    const indexQuery = forIndexing.map((item, i) => ({
        id: item._id,
        rowIndex: skip + i + 1,
    }))
    const indexedTransaction = transactions.map((item, i) => ({
        ...item,
        rowIndex: indexQuery.find(f => f.id.toString() === item._id.toString())?.rowIndex ?? null
    }))
    res.json({
        success: true,
        data: {
            items: indexedTransaction,
            total,
        },
    })
}

const createTransaction = async (req, res) => {
    try {
        const { accountId, amount, categoryId, type, date, note } = req.body;
        const newData = Transaction({ accountId, amount, categoryId, type, date, note });
        const transaction = await newData.save()
        res.status(200).json({
            success: true,
            message: "New transaction data has been added",
            data: transaction,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to add new data but some error occured!",
        });
    }
}
const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        const transaction = await Transaction.findByIdAndDelete({ _id: id }).exec();
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Transaction deleted succesfully",
            data: transaction
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to delete data but some error occured!"
        })
    }
}
const updateTransaction = async (req, res) => {

    try {
        const { _id, ...updates } = req.body;
        if (Object.keys(updates).length === 0) {
            res.status(500).json({
                success: false,
                message: "No fields provided for update."
            })
        }
        const transaction = await Transaction.findByIdAndUpdate(_id, updates, { new: true }).exec();
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "The transaction data has been updated",
            data: transaction
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
    getAllTransaction,
    getFilteredTransaction,
    createTransaction,
    deleteTransaction,
    updateTransaction,
};
