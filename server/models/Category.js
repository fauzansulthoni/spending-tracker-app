const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String },
    color: { type: String },
    type: { type: String, enum: ["Income", "Expense"] },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }, // reference to User
}, { timestamps: true }
);
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;