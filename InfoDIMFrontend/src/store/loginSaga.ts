import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginRequest, setCredentials, logout, loginFailure } from './authSlice';

function* handleLogin(action: any): Generator<any, any, any> {
  try {
    const response: any = yield call(axios.post, 'http://localhost:3333/login', action.payload);
    if (response.data.success) {
      yield put(setCredentials({ token: response.data.token }));
      localStorage.setItem('authToken', response.data.token);
      // Redirect to dashboard or handle successful login
    } else {
      yield put(loginFailure());
      // Handle login error
    }
  } catch (error) {
    yield put(logout());
    // Handle login error
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, handleLogin);
}

export default watchLogin;
