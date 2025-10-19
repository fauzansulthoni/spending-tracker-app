const mongoose = require("mongoose");
const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    photo: {
        type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true }
);
const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;