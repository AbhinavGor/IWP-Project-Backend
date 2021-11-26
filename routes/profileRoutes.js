const router = require('express').Router();
const {auth} = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user);
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/edit', auth, async (req, res) => {
    try {
        const {name, address, mobile, altMobile, upi} = req.body;

        const foundUser = await User.findOne({email: req.user.email});

        foundUser.name = name;
        foundUser.mobile = mobile;
        foundUser.altMobile = altMobile;
        foundUser.address = address;
        foundUser.upi = upi;

        await foundUser.save();

        res.status(200).send({foundUser})

    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;