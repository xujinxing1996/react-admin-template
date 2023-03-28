import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './features/Routes';
import { Provider } from 'react-redux';
import store from './stores';
import './mock';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>
);
