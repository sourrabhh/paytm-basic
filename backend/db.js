const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/paytmdb');

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 4,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    }
});

// Account Schema
const accountSchema = new mongoose.Schema({
    userId: {                                       
        type: mongoose.Schema.Types.ObjectId,   // Reference to User Model's id
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('AccountBalance', accountSchema);

module.exports = { User, Account }