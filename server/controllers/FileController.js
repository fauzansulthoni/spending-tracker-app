const User = require("../models/User");
const Account = require("../models/Account");
const path = require('path');
const fs = require('fs');

const uploadProfileImage = async (req, res) => {
    const file = req.file;
    const userId = req.body._id;
    if (!file) return res.status(400).send('No file uploaded');
    const ext = path.extname(file.originalname);
    const newFilename = `${file.filename}${ext}`; // e.g., '96733e64c88c5a0dd0f0d121159ace47.jpg'
    const newPath = path.join(file.destination, newFilename);
    try {
        await User.findByIdAndUpdate({ _id: userId }, { $set: { photo: newFilename } });
        fs.renameSync(file.path, newPath);

        // Save file path to DB or cloud, associate with userId
        console.log(`User ${userId} uploaded: ${file.originalname}`);
        res.json({
            success: true,
            message: "The file has been saved"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Some error occured, the file has not been saved"
        })
    }
}

const uploadAccountImage = async (req, res) => {
    const file = req.file;
    const accountId = req.body.accountId;
    if (!file) return res.status(400).send('No file uploaded');
    const ext = path.extname(file.originalname);
    const newFilename = `${file.filename}${ext}`; // e.g., '96733e64c88c5a0dd0f0d121159ace47.jpg'
    const newPath = path.join(file.destination, newFilename);
    try {
        await Account.findByIdAndUpdate({ _id: accountId }, { $set: { photo: newFilename } });
        fs.renameSync(file.path, newPath);
        res.json({
            success: true,
            message: "The file has been saved"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Some error occured, the file has not been saved"
        })
    }
}

module.exports = {
    uploadProfileImage,
    uploadAccountImage,
};