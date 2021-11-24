const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async function(req, res, next) {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        
        const user = await User.findOne({ _id: decoded._id });

        console.log({decoded, user});

        // if(!user){
        //     throw new Error();
        // }

        res.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Please authenticate");
    }
}

module.exports = {auth};