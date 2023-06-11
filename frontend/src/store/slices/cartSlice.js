//here we donot have to deal with async code so we donot need to use createApi, and also there is no need of endpoints
import { createSlice } from "@reduxjs/toolkit";

const initialState =
  //our items will be stored in local storage so checking local storage for items
  //localStorage holds strings so we need to parse it as js object
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2); //upto 2 decimal places
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; //the item we want to add to cart
      //check if item is already in cart
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      //calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0 //acc is accumulator, that starts from 0 and adds the price of each item
        )
      );

      //calculate shipping price
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100); //if order is >100, shipping is free else 10

      //calculate tax price
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      ); //15% tax

      //calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      //save all these prices in local storage
      localStorage.setItem("cart", JSON.stringify(state)); //save this entire state to local storage as cart
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
