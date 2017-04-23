/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { Game } from './Game';
import { Provider } from 'react-redux';
import { newStore } from './store';
import './style.css';

const { Component } = React;
export class App extends Component<any, any> {
  render() {
    const store = newStore();
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  }
}
