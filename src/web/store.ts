import { applyMiddleware, createStore, combineReducers } from 'redux';
import * as createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import { boardReducer } from './boardReducer';

const loggerMiddleware = createLogger();
const defaultState = {
  items: []
};

const reducer = combineReducers({
  game: boardReducer
});

export const newStore = () =>
  createStore(reducer, applyMiddleware(thunk, loggerMiddleware));