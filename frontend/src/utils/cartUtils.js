export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2); //upto 2 decimal places
};

export const updateCart = (state) => {
  //calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0 //acc is accumulator, that starts from 0 and adds the price of each item
    )
  );

  //calculate shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10); //if order is >100, shipping is free else 10

  //calculate tax price (15% tax)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2))); //15% tax

  //calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  //save all these prices in local storage
  localStorage.setItem("cart", JSON.stringify(state)); //save this entire state to local storage as cart
  return state;
};
