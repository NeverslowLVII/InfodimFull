import { all } from 'redux-saga/effects';
import watchLogin from '../loginSaga';
// Import your individual sagas here

function* rootSaga() {
  yield all([
    watchLogin(),
    // Add individual sagas here
  ]);
}

export default rootSaga;
