import { CART_ACTIONS_TYPES } from "./cart.types"
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCartItems = (cartItems) => createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, cartItems);


export const setIsCartOpen = (bool) => createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, bool);

export const clearCart = () => createAction(CART_ACTIONS_TYPES.SET_EMPTY_CART)

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

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
}

export const clearItemFromCartList = (cartItems, itemToRemove) => {
  const newCartItems = clearCartItemFromCart(cartItems, itemToRemove);
  return setCartItems(newCartItems);
}

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
}