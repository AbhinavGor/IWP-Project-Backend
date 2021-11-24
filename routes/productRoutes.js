const express = require('express')
const router = express.Router()
const {auth} = require('../middleware/auth')
const Product = require('../models/Product')
const User = require('../models/User')

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

module.exports = router;