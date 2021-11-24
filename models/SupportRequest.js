const mongoose = require('mongoose')

const SupportRequestSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    solution: {
        type: String
    }
});

const SupportRequest = mongoose.model('SupportRequest', SupportRequestSchema);

module.exports = SupportRequest;