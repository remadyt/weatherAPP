import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Audio } from 'react-loader-spinner';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';

import { App } from './App';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Audio width="50" color="#9B51E0" />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
