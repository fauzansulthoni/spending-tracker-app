const express = require('express');
const {
    authMiddleware,
} = require('../controllers/AuthController');
const {
    getAllTransaction,
    getFilteredTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/TransactionController');

const router = express.Router();

router.get("/", getAllTransaction);
router.post("/filtered/", getFilteredTransaction);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);





module.exports = router;
