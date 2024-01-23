
import { all, fork } from 'redux-saga/effects';
import watchLogin from '../store/loginSaga';

function* rootSaga() {
  yield all([
    fork(watchLogin),
    // Add other sagas here
  ]);
}

export default rootSaga;
