const express = require('express');
const {
    authMiddleware,
    updateUser, updatePassword
} = require('../controllers/AuthController');
const {
    getAllUser,
    getFilteredUser,
    createUser,
    // updateUser,
    deleteUser
} = require('../controllers/UserController');

const router = express.Router();

router.get("/", getAllUser);
router.post("/filtered/", getFilteredUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/change-password/:id", updatePassword);
router.delete("/:id", deleteUser);





module.exports = router;
