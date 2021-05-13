import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {ModalProvider} from './context/Modal'
import './index.css';
import App from './App';
import configureStore from './store'

const store = configureStore();
window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

Object.deepEq = function ($, _) {
  if (!$ || !_ || typeof $ !== 'object' || typeof _ !== 'object') return false;
  const [$$, __] = [$, _].map(Object.values);
  if ($$.length !== __.length) return false;
  for (const $_ in $$) {
    if (
      (typeof $$[+$_] !== typeof __[+$_]) ||
      (typeof $$[+$_] !== 'object' && $$[+$_] !== __[+$_]) ||
      (typeof $$[+$_] === 'object' && !Object.deepEq($$[+$_], __[+$_]))
    ) return false;
  }
  return true;
};

// Helper function by JM
