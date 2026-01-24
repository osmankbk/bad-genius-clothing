import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { configureStore } from "@reduxjs/toolkit";
import { logger } from 'redux-logger';

// root reducer

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const middleWares = [import.meta.env.MODE !== 'production' &&  logger].filter(Boolean);
const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store)

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     import.meta.env.MODE !== 'production'
//       ? getDefaultMiddleware().concat(logger)
//       : getDefaultMiddleware(),
//   devTools: import.meta.env.MODE !== 'production',
// });

