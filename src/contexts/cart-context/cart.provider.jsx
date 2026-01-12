import { useReducer } from "react";
import { CartContext } from "./cart.context";
import { createAction } from "../../utils/reducer/reducer.utils";

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  total: 0,
  cartQuantity: 0,


};

const CART_ACTIONS_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTIONS_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTIONS_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({children}) => {
  const [{cartItems, isCartOpen, cartQuantity, totalCost}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const cartQuantity = newCartItems.reduce((total, item) => total + item.quantity, 0);
    const totalCost = newCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    dispatch(createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartQuantity, totalCost}));
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, bool));
  }

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
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCartList = (ItemToRemove) => {
    const newCartItems = clearCartItemFromCart(cartItems, ItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }


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