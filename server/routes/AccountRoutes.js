const express = require('express');
const {
    authMiddleware,
} = require('../controllers/AuthController');
const {
    getAllAccount,
    getFilteredAccount,
    createAccount,
    updateAccount,
    deleteAccount
} = require('../controllers/AccountController');

const router = express.Router();

router.get("/", getAllAccount);
router.post("/filtered/", getFilteredAccount);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);





module.exports = router;
