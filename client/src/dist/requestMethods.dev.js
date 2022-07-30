"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mercadopagoRequest = exports.userRequest = exports.publicRequest = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASE_URL = "http://localhost:5000/api/";
var TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2VlYjU3YzUyZWYzZmU0NDMwOWQ3MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODA0MTQzNywiZXhwIjoxNjU4MzAwNjM3fQ.dWxvx5MVa-F60jL2OSFpYYI4vA_-zVs1y_mgRudR-as";

var publicRequest = _axios["default"].create({
  baseURL: BASE_URL
});

exports.publicRequest = publicRequest;

var userRequest = _axios["default"].create({
  baseURL: BASE_URL,
  headers: {
    token: "Bearer ".concat(TOKEN)
  }
});

exports.userRequest = userRequest;

var mercadopagoRequest = _axios["default"].create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer ".concat(process.env.ACCESS_TOKEN)
  }
});

exports.mercadopagoRequest = mercadopagoRequest;