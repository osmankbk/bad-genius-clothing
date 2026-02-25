import { CART_ACTIONS_TYPES, CartItem } from "./cart.types"
import { CategoryItem } from "../categories/category.types";
import { createAction, Action, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer.utils';


// Types
export type SetCartItems = ActionWithPayload<CART_ACTIONS_TYPES.SET_CART_ITEMS, CartItem[]>;

export type SetIsCartOpen = ActionWithPayload<CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean>;

export type ClearCart = Action<CART_ACTIONS_TYPES.SET_EMPTY_CART>;
 
export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, cartItems));

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, bool));

export const clearCart = withMatcher((): ClearCart => createAction(CART_ACTIONS_TYPES.SET_EMPTY_CART));

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  const itemInCart = cartItems.find((item) => item.id === cartItemToRemove.id);

  if (itemInCart && itemInCart.quantity === 1) {
    return cartItems.filter((cartItem) => cartItemToRemove.id !== cartItem.id);
  } 

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
    ? 
    {...cartItem, quantity: cartItem.quantity - 1} 
    : 
    cartItem);
}

const clearCartItemFromCart = (cartItems: CartItem[], ItemToRemove: CartItem): CartItem[] => {
  return cartItems.filter((cartItem) => ItemToRemove.id !== cartItem.id);
}

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
}

export const clearItemFromCartList = (cartItems: CartItem[], itemToRemove: CartItem) => {
  const newCartItems = clearCartItemFromCart(cartItems, itemToRemove);
  return setCartItems(newCartItems);
}

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
}