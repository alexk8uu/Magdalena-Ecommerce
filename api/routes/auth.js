const { Router } = require("express");
const router = Router();
const User = require("../models/User.js");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const sendEmail = require("../utils/sendEmail");

dotenv.config();

// REGISTER

router.post("/register", async (req, res) => {
  const { email } = req.body;

  let user = (await User.findOne({ email })) || null;

  if (user !== null) {
    return res.status(500).json({
      success: false,
      msg: "Correo ya registrado",
    });
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASS
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();

    const token = await new Token({
      userId: savedUser._id,
      token: CryptoJS.SHA256(savedUser.username.toString).toString(
        CryptoJS.enc.Hex
      ),
    }).save();
    const url = `${process.env.BASE_URL}users/${savedUser._id}/verify/${token.token}`;
    await sendEmail(savedUser.email, "Verify Email", url);

    res.status(200).json({
      success: true,
      msg: "Un correo electrónico ha sido enviado a su cuenta, por favor verifique",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  let responseSet = false;
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({
        success: false,
        msg: "Credenciales incorrectas",
      });
      responseSet = true;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASS
    );
    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (Originalpassword !== req.body.password) {
      res.status(401).json({
        success: false,
        msg: "Credenciales incorrectas",
      });
      responseSet = true;
    }

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: CryptoJS.SHA256(user.username.toString).toString(
            CryptoJS.enc.Hex
          ),
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }
      responseSet = true;
      return res.status(500).json({
        success: true,
        msg: "Un correo electrónico ha sido enviado a su cuenta, por favor verifique",
      });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_JWT,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    if (!responseSet) {
      res.status(200).json({ ...others, accessToken });
    }
  } catch (error) {
    if (!responseSet) {
      console.log("error", error);
      res.status(500).send(error);
    }
  }
});

module.exports = router;
