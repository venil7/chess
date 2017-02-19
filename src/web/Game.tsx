/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { ChessBoard } from './ChessBoard';
import { Field } from '../field';
import { connect } from 'react-redux';

const { Component } = React;

@connect((state) => ({ game: state.game }))
export class Game extends Component<any, any> {
  onNewGame() {
    const { dispatch } = this.props;
    dispatch({ type: 'NEW_GAME' });
  }

  onCellClick(field: Field) {
    const { dispatch } = this.props;
    dispatch({ type: "SELECT_FIELD", field });
  }

  render() {
    const { game } = this.props;
    const { board, selectedField, possibleMoves } = game;
    return (
      <div>
        <button
          onClick={() => this.onNewGame()}>
          New</button>
        <ChessBoard
          selectedField={selectedField}
          possibleMoves={possibleMoves}
          board={board}
          onCellClick={(f) => this.onCellClick(f)} />
      </div>
    );
  }
}