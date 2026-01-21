import { compose, createStore, applyMiddleware } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import { logger } from 'redux-logger';

// import { userReducer } from "./user/user.reducer";

// root reducer

import { rootReducer } from "./root-reducer";

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

// export const store = configureStore({
//   reducer: { user: userReducer },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(logger),
// });

