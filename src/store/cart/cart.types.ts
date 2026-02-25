import { CategoryItem } from "../categories/category.types";

export enum CART_ACTIONS_TYPES {
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
  SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
  SET_EMPTY_CART = 'cart/SET_CLEAR_CART_ITEMS'
};

export type CartItem = CategoryItem & {
  quantity: number;
};