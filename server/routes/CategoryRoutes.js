const express = require('express');
const {
    authMiddleware,
} = require('../controllers/AuthController');
const {
    getAllCategory,
    getFilteredCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/CategoryController');

const router = express.Router();

router.get("/", getAllCategory);
router.post("/filtered/", getFilteredCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);





module.exports = router;
