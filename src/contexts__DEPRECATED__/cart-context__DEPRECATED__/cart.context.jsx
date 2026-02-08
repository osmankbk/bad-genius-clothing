// src/contexts/cart.context.jsx (DEPRECATED)
import { createContext } from "react";
/**
 * @deprecated Migrated to Redux + Saga.
 * Do not use this context for app state.
 */
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