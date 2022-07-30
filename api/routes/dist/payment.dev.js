"use strict";

var _require = require("express"),
    Router = _require.Router;

var _require2 = require("./verifyToken"),
    verifyTokenAndAdmin = _require2.verifyTokenAndAdmin,
    verifyTokenAndAuthorization = _require2.verifyTokenAndAuthorization,
    verifyToken = _require2.verifyToken;

var mercadopago = require('mercadopago');

var router = Router();
router.get('/', function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.json({
            "/payment": "generate a payment link",
            "/suscribtion": "generate a suscribtion link"
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/mercadopago', verifyToken, function _callee2(req, res) {
  var products, preference, answer, _answer$body, items, init_point, id, date_created, payer, shipments;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          products = req.body.products.map(function (p) {
            return {
              "id": p._id,
              "title": p.title,
              "description": p.desc,
              "quantity": p.quantity,
              "currency_id": "ARS",
              "unit_price": p.price
            };
          });
          _context2.prev = 1;
          mercadopago.configure({
            access_token: process.env.ACCESS_TOKEN
          });
          preference = {
            "items": products,
            "payer": {
              "email": "test_user_63234944@testuser.com"
            },
            "auto_return": "all",
            "back_urls": {
              "success": 'http://localhost:3000/success',
              "pending": 'http://localhost:3000/pending',
              "failure": 'http://localhost:3000/failed'
            }
          };
          _context2.next = 6;
          return regeneratorRuntime.awrap(mercadopago.preferences.create(preference));

        case 6:
          answer = _context2.sent;

          /*  console.log(answer) */
          _answer$body = answer.body, items = _answer$body.items, init_point = _answer$body.init_point, id = _answer$body.id, date_created = _answer$body.date_created, payer = _answer$body.payer, shipments = _answer$body.shipments;
          res.json({
            responsed: id,
            init_point: init_point,
            items: items,
            created: date_created,
            payer: payer,
            shipments: shipments
          });
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          res.status(500).send(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
module.exports = router;