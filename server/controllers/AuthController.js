const User = require('../models/User')
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// register
const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.json({
                success: false,
                message: 'User already exist with the same email! Please use another email'
            })
        }
        const checkConfirmPassword = password === confirmPassword;
        if (!checkConfirmPassword) {
            return res.json({
                success: false,
                message: "Your Password and Confirmation Password don't match!"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'Registration successful'
        })
    } catch (err) {
        // console.error(err)
        res.status(500).json({
            success: false,
            message: "Failed to register user",
            err
        })
    }
}

const validationEmailUser = async (req, res) => {
    const { email } = req.params;
    try {
        const checked = await User.findOne({ email });

        if (checked) {
            return res.json({
                success: false,
                message: "Email must be unique, the current email has been used by another user",
            });
        }

        return res.json({
            success: true,
            message: "Email is unique",
        });
    } catch (error) {
        console.error("Error checking email:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while checking email",
        });
    }
}

const loginUser = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser)
            return res.json({
                success: false,
                message: "User doesn't exists! Please register first"
            })
        const checkPasswordMatch = await bcrypt.compare(
            password,
            checkUser.password
        )
        if (!checkPasswordMatch)
            return res.json({
                success: false,
                message: "Incorrect password! Please try again"
            })

        const token = jwt.sign(
            {
                _id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
            },
            process.env.CLIENT_SECRET_KEY,
            {
                expiresIn: !!rememberMe ? "30d" : "60m"
            }
        );

        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Logged in successfully",
            user: {
                _id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
                photo: checkUser.photo
            },
            token: token,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Unauthorised user! token is not found"
        });

    try {
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
        req.user = decoded;
        next(); // ✅ now Express knows to continue
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Unauthorised user! Not authorized token detected"
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { _id, name, email, photo } = req.body;
        const updates = { name, email, photo }
        if (Object.keys(updates).length === 0) {
            res.status(500).json({
                success: false,
                message: "No fields provided for update."
            })
        }
        const userUpdate = await User.findByIdAndUpdate(_id, updates, { new: true }).exec();
        if (!userUpdate) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const token = jwt.sign(
            {
                _id: userUpdate._id,
                name: userUpdate.name,
                email: userUpdate.email,
            },
            process.env.CLIENT_SECRET_KEY,
            {
                expiresIn: "60m"
            }
        );

        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "The user data has been updated",
            user: {
                _id: userUpdate._id,
                name: userUpdate.name,
                email: userUpdate.email,
                photo: userUpdate.photo
            },
            token: token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to update data but some error occured!"
        })
    }
}
const updatePassword = async (req, res) => {
    try {
        const { _id, oldPassword,
            newPassword,
            confirmNewPassword } = req.body;
        const fields = {
            oldPassword,
            newPassword,
            confirmNewPassword
        }
        if (Object.keys(fields).length === 0) {
            res.status(500).json({
                success: false,
                message: "No fields provided for update."
            })
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(404).json({
                success: false,
                message: "The password confirmation doesn't match",
            })
        }
        checkUser = await User.findOne({ _id });
        const checkPasswordMatch = await bcrypt.compare(
            oldPassword,
            checkUser.password
        )
        if (!checkPasswordMatch)
            return res.json({
                success: false,
                message: "Incorrect password! Please try again"
            })
        const hashPassword = await bcrypt.hash(password, 12);
        const updatedUser = await User.findByIdAndUpdate(_id, {
            password: hashPassword
        }, { new: true }).exec();
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const token = jwt.sign(
            {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            },
            process.env.CLIENT_SECRET_KEY,
            {
                expiresIn: "60m"
            }
        );
        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "The user password has been updated",
            user: {
                _id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
                role: checkUser.role,
                photo: checkUser.photo
            },
            token: token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Try to update data but some error occured!"
        })
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: false });
    res.status(200).json({ success: true, message: "Logged out successfully" });
}


module.exports = { registerUser, validationEmailUser, loginUser, authMiddleware, logoutUser, updateUser, updatePassword };