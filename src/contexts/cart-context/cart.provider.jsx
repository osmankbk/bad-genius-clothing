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

  const removeCartItem = (cartItems, cartItemToRemove) => {
    const itemInCart = cartItems.find((item) => item.id === cartItemToRemove.id);

    if (itemInCart.quantity === 1) {
      return cartItems.filter((cartItem) => cartItemToRemove.id !== cartItem.id);
    } 

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
      ? 
      {...cartItem, quantity: cartItem.quantity - 1} 
      : 
      cartItem);
  }

  const clearCartItemFromCart = (cartItems, ItemToRemove) => {
    return cartItems.filter((cartItem) => ItemToRemove.id !== cartItem.id);
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const clearItemFromCartList = (ItemToRemove) => {
    setCartItems(clearCartItemFromCart(cartItems, ItemToRemove));
  }

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }
  
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalCost = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)


  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartQuantity,
    removeItemFromCart,
    clearItemFromCartList,
    totalCost
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}