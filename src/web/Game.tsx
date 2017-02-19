/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { ChessBoard } from './ChessBoard';
import { Field } from '../field';
import { connect } from 'react-redux';
import * as actions from './boardActions';

const { Component } = React;

@connect((state) => ({ game: state.game }))
export class Game extends Component<any, any> {
  onNewGame() {
    const { dispatch } = this.props;
    dispatch(actions.newGame());
  }

  onCellClick(field: Field) {
    const { dispatch } = this.props;
    dispatch(actions.selectFieldThunk(field));
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
          onCellClick={(field) => this.onCellClick(field)} />
        <span>Move: {game.thinking ? 'CPU' : 'Human'}</span>
      </div>
    );
  }
}