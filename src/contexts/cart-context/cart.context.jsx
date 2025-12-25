import { createContext } from "react";

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => {}
});