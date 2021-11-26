const router = require('express').Router();
const {auth} = require('../middleware/auth');
router.get('/', auth, async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        
        const user = await User.findOne({ email: decoded.email });

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