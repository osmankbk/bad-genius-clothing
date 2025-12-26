import { useState } from "react";
import { CartContext } from "./cart.context";

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addCartItem = (cartItems, productToAdd) => {
    const itemInCart = cartItems.find((item) => item.id === productToAdd.id);
    if (itemInCart) {
      return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
      ? 
      {...cartItem, quantity: cartItem.quantity + 1} 
      : 
      cartItem);
    } 

    return [...cartItems, {...productToAdd, quantity: 1}]
  }

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }
  
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartQuantity,
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}