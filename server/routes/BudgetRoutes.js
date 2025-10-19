const express = require('express');
const {
    authMiddleware,
} = require('../controllers/AuthController');
const {
    getAllBudget,
    getFilteredBudget,
    checkBudget,
    createBudget,
    updateBudget,
    deleteBudget
} = require('../controllers/BudgetController');

const router = express.Router();

router.get("/", getAllBudget);
router.post("/filtered/", getFilteredBudget);
router.post("/check/", checkBudget);
router.post("/", createBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);





module.exports = router;
