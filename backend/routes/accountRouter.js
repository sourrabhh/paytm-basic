const express = require('express');

const {Account} = require('../db');
const authMiddleware = require('../middleware');
const {default: mongoose} = require('mongoose');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const {to, amount} = req.body;

    // Fetch account within transaction
    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }
    // performing transaction
    await Account.updateOne({userId: req.userId}, { $inc: {balance: -amount } }).session(session);
    await Account.updateOne({userId: to }, { $inc: {balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer Successfully"
    })
})

module.exports = router;