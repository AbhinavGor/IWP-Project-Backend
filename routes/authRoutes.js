const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { auth } = require('../middleware/auth');


router.post('/signup', (req, res) => {
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

router.post('/login', (req, res) => {
    try {
        const userFound = await User.findOne({email});

        if(!foundUser){
            console.log("Unable to login!");
            res.status(400).send({message: "Unable to login!"});
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if(!isMatch){
            console.log("Unable to login!");
            res.status(400).send({message: "Unable to login!"});
        }
        const token = jwt.sign({_id: foundUser._id, email: foundUser.email});
        
        res.send({foundUser, token});

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})