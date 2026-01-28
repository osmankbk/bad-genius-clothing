import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

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
  }, {})
);

export const categoryIsLoadingSelector = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

