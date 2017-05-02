import * as React from 'react';
import { Game } from './Game';
import { Provider } from 'react-redux';
import { newStore } from './store';
import './style.css';

const { Component } = React;
const store = newStore();

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  }
}
