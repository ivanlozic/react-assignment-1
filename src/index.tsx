import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './reduxStore/store';
import { createRoot } from 'react-dom/client';

const element = document.getElementById('root') as Element;
const root = createRoot(element)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

