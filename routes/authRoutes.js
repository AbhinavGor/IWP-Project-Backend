const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { auth } = require('../middleware/auth');


router.post('/signup', async (req, res) => {
    const { email, name, password } =  req.body;
    const newUser = new User({
        email, name, password
    });

    try {
        const foundUser = await User.findOne({email: email});
        if(!foundUser){
            await newUser.save();
            const token = jwt.sign({email: email}, process.env.SESSION_SECRET);
            res.status(200).send({newUser, token});
        }else{
            res.status(401).send({message: `User with email ${email} already exists! Please try again with other email.`});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const password = req.body.password;

        const foundUser = await User.findOne({email: req.body.email});

        console.log(foundUser);

        if(!foundUser){
            console.log("Unable to login!");
            res.status(400).send({message: "Unable to login!"});
        }else{
            const isMatch = await bcrypt.compare(password, foundUser.password);

            if(!isMatch){
                console.log("Unable to login!");
                res.status(400).send({message: "Unable to login!"});
            }else{
                const token = jwt.sign({_id: foundUser._id, email: foundUser.email}, process.env.SESSION_SECRET);
            
                res.send({foundUser, token});
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/resetpassword', auth, async (req,res) => {
    const { password } = req.body;
    const UID = req.user._id;

    const foundUser = await User.findOne({_id: UID});

    if(foundUser){
        foundUser.password = password;
        await foundUser.save();

        res.status(200).send({"message": "password changed successfully!"});
    }else{
        res.status(404).send({"message": "User not found."});
    }
});

module.exports = router;