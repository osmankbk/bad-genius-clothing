import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
import { RootState } from "../store";

export const userSelectorReducer = (state: RootState): UserState => state.user;

export const userSelector = createSelector(
  userSelectorReducer,
  (user) => user.currentUser
);