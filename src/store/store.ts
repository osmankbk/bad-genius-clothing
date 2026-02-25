import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
// import { configureStore } from "@reduxjs/toolkit";
import { logger } from 'redux-logger';

import { rootSaga } from "./root-saga";

// root reducer

import { rootReducer } from "./root-reducer";

export type RootState =  ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[],
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [import.meta.env.MODE !== 'production' &&  logger, sagaMiddleware].filter((middleware): middleware is Middleware => Boolean(middleware));
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga);

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     import.meta.env.MODE !== 'production'
//       ? getDefaultMiddleware().concat(logger)
//       : getDefaultMiddleware(),
//   devTools: import.meta.env.MODE !== 'production',
// });

