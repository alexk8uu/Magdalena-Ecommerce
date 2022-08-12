import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    checkoutProducts: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    addCheckout: (state, action) => {
      state.checkoutProducts = action.payload;
    },
    addQuantity: (state, action) => {
      state.products.map((p) => {
        if (p._id === action.payload._id) {
          p.quantity += 1;
          state.quantity += 1;
          state.total += action.payload.price;
        }
        return p;
      });
    },
    removeQuantity: (state, action) => {
      state.products = state.products.map((p) => {
        if (p._id === action.payload._id && action.payload.quantity > 1) {
          p.quantity -= 1;
          state.quantity -= 1;
          state.total -= action.payload.price  
        }
        return p;
      });
    },
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (p) => p._id !== action.payload._id
      );
      state.quantity = state.quantity - action.payload.quantity;
      state.total -= action.payload.quantity * action.payload.price;
    },
  },
});

export const {
  addProduct,
  addCheckout,
  resetCart,
  removeProduct,
  addQuantity,
  removeQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
