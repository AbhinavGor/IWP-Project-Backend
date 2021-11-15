require('dotenv').config()
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser")
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=> {
    console.log("MONGO DB CONNECTED!")
}).catch((e)=>console.log("Cannot Connect to Mongo",e));

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false}));
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 }
}));

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}.`);
})

app.get('/', (req, res) => {
    res.status(200).send({
        title: "IWP project Backend",
        author: "Abhinav Gorantla"
    });
});