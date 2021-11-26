const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {auth} = require('../middleware/auth')
const Product = require('../models/Product')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.post('/newproduct', auth, async (req, res) => {
    try {
        const foundUser = await User.findOne({_id: req.user._id});

        let newProduct = new Product({
            ...req.body,
            postedBy: foundUser.name,
            postedByEmail: foundUser.email
        });

        await newProduct.save();

        res.status(200).send({
            newProduct,
            'message': 'Added new product successfully!'
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const foundProducts = await Product.find();

        if(foundProducts){
            res.status(200).send(foundProducts);
        }else{
            res.status(404).send({'message': 'No products found!'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:id/picture", async (req,res) => {
    try{

        const product = await Product.findOne({_id: mongoose.Types.ObjectId(req.params.id)})

        if(!product || !product.image) {
            throw new Error("Article or Picture doesn't exist")
        }

        const img = 'data:image/png;base64,' + product.image.toString('base64');
        res.send(img)
    } catch (e) {
        console.log(e)
        res.status(404).send({"message":`Oops! No picture found for article with id.`})
    }
})

router.get('/myproducts', auth, async (req, res) => {
    try {
        const foundUser = await User.findOne({_id: req.user._id});

        const foundProducts = await Product.find({postedByEmail: foundUser.email});

        if(foundProducts){
            res.status(200).send(foundProducts);
        }else{
            res.status(404).send({'message': 'No products found!'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/:email', async (req, res) => {
    try {
        const foundUser = await User.findOne({email: req.params.email});

        if(foundUser){
            res.status(200).send(foundUser);
        }else{
            res.status(404).send({'message': 'No user found!'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/profile', auth, async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        console.log(decoded);
        
        const user = await User.findOne({ _id: decoded._id });

        if(user){
            res.status(200).send(user);
        }else{
            res.status(404).send({'message': 'No user found!'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;