import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './store/store';
import './index.css';

const preloadedState = {
  auth: {
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  },
};

const store = configureStore(preloadedState);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
