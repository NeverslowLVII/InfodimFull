import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginRequest, setCredentials, logout, loginFailure } from './authSlice';

function* handleLogin(action: any): Generator<any, any, any> {
  try {
    const response: any = yield call(axios.post, 'http://localhost:3333/login', action.payload);
    if (response.data.success) {
      yield put(setCredentials({ token: response.data.token }));
      localStorage.setItem('authToken', response.data.token);
      console.info('Login successful');
    } else {
      yield put(loginFailure());
      console.warn('Login failed');
    }
  } catch (error) {
    yield put(logout());
    console.error('Login error', error);
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, handleLogin);
  console.info('Login watcher started');
}

export default watchLogin;
