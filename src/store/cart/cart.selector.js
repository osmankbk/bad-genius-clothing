import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart


export const cartItemSelector = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const cartQuantitySelector = createSelector(
  [cartItemSelector],
  (newCartItems) =>  newCartItems.reduce((total, item) => total + item.quantity, 0)
)

export const totalCartCost = createSelector(
  [cartItemSelector],
  (newCartItems) => newCartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
)

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
)