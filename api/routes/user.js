const { Router } = require("express");
const User = require("../models/User");
const Token = require("../models/Token");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASS
    ).toString();
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL USERS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.getFullYear - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastyear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// VERIFY TOKEN

router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user)
      return res.status(400).json({
        succefull: false,
        msg: "Invalid link",
      });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token)
      return res.status(400).json({
        succefull: false,
        msg: "Invalid link",
      });
    await User.updateOne({ _id: user._id }, { $set: { verified: true } });
    await Token.deleteOne({ _id: token._id });

    res.status(200).json({
      succefull: true,
      msg: "Email verificado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succefull: false,
      msg: "Internal Server Error",
    });
  }
});

module.exports = router;
