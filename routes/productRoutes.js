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

router.get("/:id/picture", async (req,res) => {
    try{

        const product = await Product.findById(req.params.id)

        if(!product || !product.image) {
            throw new Error("Article or Picture doesn't exist")
        }

        res.set("Content-Type","image/png")
        res.send(product.image)
    } catch (e) {
        console.log(e)
        res.status(404).send({"message":`Oops! No picture found for article with id ${article.id}.`})
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

module.exports = router;