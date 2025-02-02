const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware');
const {signupValidation, updateBodyValidation, signinValidation}  = require('../zodvalidation/zodValidation');  

const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const {User, Account} = require('../db');
// const Account = require('../db');

    // signup route 
    router.post('/signup', async (req, res) => {
        const body = req.body;     
        const {success} = signupValidation.safeParse(req.body);
        if(!success) {
            return res.json({
                message: "Incorrect Input"
            })
        }

        const existingUser = await User.findOne({
            username: body.username
        });

        if(existingUser){
            return(
                res.status(411).json({
                    message: 'Email already taken'
                })
            )
        }

        const createUser = await User.create({
            username: body.username,
            password: body.password,
            firstName: body.firstName,
            lastName: body.lastName
        });
        const createdUserId = createUser._id;

        // Seed accountbalace of created user with random amount balance
        await Account.create({
            userId: createdUserId,
            balance: 1 + Math.random() * 100000
        })

        const token = jwt.sign({
            userId: createdUserId
        }, JWT_SECRET);

        res.json({
            message: 'User Created Successfully',
            token: token
        })
    });

    // signin route
    router.post('/signin', async (req, res) => {
        const {success} = signinValidation.safeParse(req.body);
        if(!success) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if(user) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);

            res.json({
                token: token
            })
            return
        }

        res.status(411).json({
            message: "Error while logging in"
        })
    });

    // for getting the user based on search string
    router.get('/bulkuser', async (req, res) => {
        const filter = req.query.filter ;

        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }},
                {
                lastName: {
                    "$regex": filter
                }
            }]
        })
        
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    });

    // for updating user 
    router.put('/updateuser', authMiddleware, async(req, res) => {
        const {success} = updateBodyValidation.safeParse(req.body)
        if(!success) {
            res.status(411).json({
                message: "Error while updating information"
            })
        }

        await User.updateOne(req.body , { id: req.userId } )

        res.json({
            message: "Updated Successfully"
        })
    })


module.exports = router;