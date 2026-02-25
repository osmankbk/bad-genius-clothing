import { AnyAction } from "redux";
import { Category } from "./category.types";
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFaiiled } from './category.action';

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  error: Error | null;
};

const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction) => {

  if (fetchCategoriesStart.match(action)) {
    return {
        ...state,
        isLoading: true
    }
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {
        ...state,
        categories: action.payload,
        isLoading: false
      }
  }

  if (fetchCategoriesFaiiled.match(action)) {
    return {
        ...state,
        error: action.payload,
        isLoading: false
      }
  }

  return state;
};