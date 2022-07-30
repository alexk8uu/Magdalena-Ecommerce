"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.addCheckout = exports.addProduct = void 0;

var _toolkit = require("@reduxjs/toolkit");

var cartSlice = (0, _toolkit.createSlice)({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    checkoutProducts: {}
  },
  reducers: {
    addProduct: function addProduct(state, action) {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    addCheckout: function addCheckout(state, action) {
      state.checkoutProducts = action.payload;
    }
  }
});
var _cartSlice$actions = cartSlice.actions,
    addProduct = _cartSlice$actions.addProduct,
    addCheckout = _cartSlice$actions.addCheckout;
exports.addCheckout = addCheckout;
exports.addProduct = addProduct;
var _default = cartSlice.reducer;
exports["default"] = _default;