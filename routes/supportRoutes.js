const express = require('express');
const SupportRequest = require('../models/SupportRequest');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newSupportRequest = new SupportRequest({
            ...req.body
        });

        await newSupportRequest.save();

        console.log(newSupportRequest);

        res.status(200).send({newSupportRequest});
    } catch (error) {
        res.status(500).send({error})
    }
});

router.get('/', async (req, res) => {
    try {
        const foundRequests = await SupportRequest.find();

        res.status(200).send({foundRequests});
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;