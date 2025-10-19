const express = require("express");
const multer = require("multer")
const uploadUser = multer({ dest: 'uploads/' });
const uploadAccount = multer({ dest: 'uploads/' });

const {
    uploadProfileImage,
    uploadAccountImage
} = require("../controllers/FileController");

const router = express.Router();

// router.get("/", (req, res) => res.send("hello world"));
router.post("/upload", uploadUser.single('photo'), uploadProfileImage);
router.post("/upload/account", uploadAccount.single('photo'), uploadAccountImage);
module.exports = router;
