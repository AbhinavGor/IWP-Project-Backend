const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    productTag: {
        type: String
    },
    image: {
        type: Buffer
    },
    sku: {
        type: String
    },
    productCost: {
        type: Number,
        required: true
    },
    postedBy: {
        type: String
    },
    postedByEmail: {
        type: String
    },
    Address: {
        type: String
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;