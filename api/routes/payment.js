const { Router } = require("express");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("./verifyToken");
const mercadopago = require("mercadopago");

const router = Router();

router.get("/", async (req, res, next) => {
  res.json({
    "/payment": "generate a payment link",
    "/suscribtion": "generate a suscribtion link",
  });
});

router.post("/mercadopago", verifyToken, async (req, res) => {
  const user = req.body.user;
  const products = req.body.cart.products.map((p) => ({
    id: p._id,
    title: p.title,
    description: p.desc,
    quantity: p.quantity,
    currency_id: "ARS",
    unit_price: p.price,
  }));
  try {
    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
    });
    let preference = {
      items: products,
      payer: {
        email: "test_user_63234944@testuser.com",
      },
      additional_info: user._id,
      auto_return: "all",
      back_urls: {
        success: "http://localhost:3000/success",
        pending: "http://localhost:3001/pending",
        failure: "http://localhost:3001/failed",
      },
    };
    let answer = await mercadopago.preferences.create(preference);

    const {
      items,
      init_point,
      id,
      date_created,
      payer,
      shipments,
      additional_info,
    } = answer.body;

    res.json({
      responsed: id,
      init_point: init_point,
      items: items,
      created: date_created,
      payer: payer,
      shipments: shipments,
      additional_info: additional_info,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
