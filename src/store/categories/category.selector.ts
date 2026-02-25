import { createSelector } from "reselect";
import { CategoriesState } from './category.reducer';
import { CategoryMapSelector } from "./category.types";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const categoriesSelector = createSelector(
  [selectCategories],
  (categories) => categories.
 reduce((acc, categories) => {
    const { title, items } = categories;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoryMapSelector)
);

export const categoryIsLoadingSelector = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

