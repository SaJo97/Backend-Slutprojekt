import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const getTotalPrice = (cart) => {
  let total = 0;
  cart.forEach((item) => {
    total += item.product.price * item.quantity;
  });
  return total;
};

const getTotalQuantity = (cart) => {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //action.payload = product

      const item = state.cart.find(
        (cartItem) => cartItem.product._id === action.payload._id
      );

      item
        ? item.quantity++
        : (state.cart = [
            ...state.cart,
            { product: action.payload, quantity: 1 },
          ]);

      state.totalPrice = getTotalPrice(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
    removeOne: (state, action) => {
      //action.payload = productId
      const item = state.cart.find(
        (cartItem) => cartItem.product._id === action.payload
      );

      item.quantity <= 1
        ? (state.cart = state.cart.filter(
            (item) => item.product._id !== action.payload
          ))
        : item.quantity--;

      state.totalPrice = getTotalPrice(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
    removeItem: (state, action) => {
      //action.payload = productId
      state.cart = state.cart.filter(
        (item) => item.product._id !== action.payload
      );

      state.totalPrice = getTotalPrice(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];

      state.totalPrice = getTotalPrice(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },
  },
});

export const { addToCart, removeOne, removeItem, clearCart } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
