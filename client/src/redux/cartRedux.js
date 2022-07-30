import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products:[],
        quantity: 0,
        total: 0,
        checkoutProducts: {},
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        addCheckout: (state, action ) => {
            state.checkoutProducts = action.payload
        }
    },
});


export const { addProduct, addCheckout } = cartSlice.actions;
export default cartSlice.reducer; 