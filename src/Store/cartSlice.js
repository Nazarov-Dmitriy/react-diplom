import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  countProduct: localStorage.length,
  orderSendFlag: false,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addProduct: (state) => {
      state.countProduct = state.countProduct + 1;
    },
    addOrderSendFlag: (state, action) => {
      state.orderSendFlag = action.payload;
    },
    removeProduct: (state) => {
      state.countProduct = state.countProduct - 1;
    },
    clearProduct: (state, ) => {
      state.countProduct = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearProduct,
  addOrderSendFlag,
} = cartSlice.actions;

export const cart = (state) => state.cartSlice;

export default cartSlice.reducer;