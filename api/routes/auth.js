const { Router } = require("express");
const router = Router();
const User = require('../models/User.js');
const CryptoJS = require("crypto-js");
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken")

dotenv.config();

// REGISTER

router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.SECRET_PASS).toString(),
    })
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
});


// LOGIN 

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username })
        !user && res.status(401).json("Credenciales incorrectas")
        
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.SECRET_PASS
            );
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        Originalpassword !== req.body.password && res.status(401).json("Credenciales incorrectas");

        
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.SECRET_JWT,
            {expiresIn: '3d'}
        )

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});
        
    } catch (error) {
        res.status(500).send(error)
    }
})







module.exports = router;