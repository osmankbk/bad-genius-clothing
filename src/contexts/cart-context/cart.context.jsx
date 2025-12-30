import { createContext } from "react";

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartQuantity: 0,
  setCartQuantity: () => {},
  removeItemFromCart: () => {},
  clearItemFromCartList: () => {},
  totalCost: () => {}
});