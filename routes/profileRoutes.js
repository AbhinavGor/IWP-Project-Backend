const router = require('express').Router();
const {auth} = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;