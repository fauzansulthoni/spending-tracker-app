const express = require('express');
const {
    validationEmailUser,
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware,
    // refreshServerToken
} = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', registerUser)
router.post('/register/check-email/:email', validationEmailUser)
router.post('/login', loginUser);
router.post('/logout', logoutUser);
// router.post('/refresh-token', refreshServerToken);
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
});



module.exports = router;
