"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popularProducts = exports.categories = exports.sliderItems = void 0;

var _imagen = _interopRequireDefault(require("../utils/imagen1.png"));

var _imagen2 = _interopRequireDefault(require("../utils/imagen2.png"));

var _imagen3 = _interopRequireDefault(require("../utils/imagen3.png"));

var _D = _interopRequireDefault(require("../utils/17-D-4.jpg"));

var _D2 = _interopRequireDefault(require("../utils/15-D-1.jpg"));

var _D3 = _interopRequireDefault(require("../utils/21-D-2.jpg"));

var _ = _interopRequireDefault(require("../utils/1.jpg"));

var _2 = _interopRequireDefault(require("../utils/2.jpg"));

var _3 = _interopRequireDefault(require("../utils/3.jpg"));

var _4 = _interopRequireDefault(require("../utils/4.jpg"));

var _5 = _interopRequireDefault(require("../utils/5.jpg"));

var _6 = _interopRequireDefault(require("../utils/6.jpg"));

var _7 = _interopRequireDefault(require("../utils/7.jpg"));

var _8 = _interopRequireDefault(require("../utils/8.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sliderItems = [{
  id: 1,
  img: _imagen["default"],
  title: "TEMPORADA INVIERNO",
  desc: "LA ROPA QUE VOS QUERIAS! AHORA 50% OFF",
  bg: "fcffe2"
}, {
  id: 2,
  img: _imagen2["default"],
  title: "TEMPORADA VERANO",
  desc: "LA ROPA QUE VOS QUERIAS! AHORA 50% OFF",
  bg: "fcf1d3"
}, {
  id: 3,
  img: _imagen3["default"],
  title: "TEMPORADA OTOÑO 2022",
  desc: "LA ROPA QUE VOS QUERIAS! AHORA 50% OFF",
  bg: "fcf1f3"
}];
exports.sliderItems = sliderItems;
var categories = [{
  id: 1,
  img: _D["default"],
  title: 'BUZOS',
  cat: 'buzos'
}, {
  id: 2,
  img: _D2["default"],
  title: 'PANTALONES',
  cat: 'pantalones'
}, {
  id: 3,
  img: _D3["default"],
  title: 'BLUSAS',
  cat: 'blusas'
}];
exports.categories = categories;
var popularProducts = [{
  id: 1,
  img: _["default"]
}, {
  id: 2,
  img: _2["default"]
}, {
  id: 3,
  img: _3["default"]
}, {
  id: 4,
  img: _4["default"]
}, {
  id: 5,
  img: _5["default"]
}, {
  id: 6,
  img: _6["default"]
}, {
  id: 7,
  img: _7["default"]
}, {
  id: 8,
  img: _8["default"]
}];
exports.popularProducts = popularProducts;