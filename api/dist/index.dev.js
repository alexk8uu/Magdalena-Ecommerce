"use strict";

var express = require("express");

var mongoose = require("mongoose");

var dotenv = require("dotenv");

var userRoute = require('./routes/user.js');

var authRoute = require('./routes/auth.js');

var productRoute = require('./routes/product.js');

var orderRoute = require('./routes/order.js');

var cartRoute = require('./routes/cart.js');

var paymentRoute = require('./routes/payment.js');

var cors = require('cors');

dotenv.config();
var app = express();
mongoose.connect(process.env.MONGO_URL).then(function () {
  return console.log("DB Connection Successfull!");
})["catch"](function (err) {
  return console.log(err);
});
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
app.use("/api/payment", paymentRoute);
app.listen(process.env.PORT || 5000, function () {
  console.log('Backend server is running!');
});