const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    note: { type: String },
    date: { type: Date, required: true },
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
