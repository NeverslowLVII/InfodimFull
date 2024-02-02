
import { createStore, compose, applyMiddleware, Middleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import rootSaga from "./sagas";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware as Middleware];
let store: any;

export function configureStore(initialState: {}) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const localstore = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  store = localstore;
  return localstore;
}

export type RootState = ReturnType<typeof store.getState>;
