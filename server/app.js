const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRouter = require("./routes/authRoutes");
const transactionRouter = require("./routes/TransactionRoutes");
const categoryRouter = require("./routes/CategoryRoutes");
const budgetRouter = require("./routes/BudgetRoutes");
const accountRouter = require("./routes/AccountRoutes");
const userRouter = require("./routes/UserRoutes");
const fileRouter = require("./routes/FileRoutes");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user/category", categoryRouter);
app.use("/api/user/transaction", transactionRouter);
app.use("/api/user/budget", budgetRouter);
app.use("/api/user/account", accountRouter);
app.use("/api/user/user", userRouter);
app.use("/api/image/", fileRouter);
app.use('/uploads', express.static('uploads'));

module.exports = app;