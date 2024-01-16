<<<<<<< Updated upstream:InfoDIMFrontend/src/redux/sagas.ts
import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";

export default function* rootSaga() {
  yield all([authSaga(), layoutSaga()]);
}
=======

import { all, fork } from 'redux-saga/effects';
import watchLogin from './loginSaga';

function* rootSaga() {
  yield all([
    fork(watchLogin),
    // Add other sagas here
  ]);
}

export default rootSaga;
>>>>>>> Stashed changes:InfoDIMFrontend/src/store/sagas.ts
