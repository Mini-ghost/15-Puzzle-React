import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux'

import puzzleStore from './reducer'
import { createStore } from "redux";

const store = createStore(
  puzzleStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('root')
);
