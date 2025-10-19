const mongoose = require("mongoose");
const BudgetSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    month: Date,
    limitAmount: Number,
}, { timestamps: true }
);
const Budget = mongoose.model("Budget", BudgetSchema);
module.exports = Budget;