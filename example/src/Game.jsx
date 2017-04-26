import * as React from 'react';
import { ChessBoard } from './ChessBoard';
import { connect} from 'react-redux';
import * as actions from './boardActions';

const { Component } = React;
const enhance = connect((state) => ({ game: state.game }));

class Game extends Component {
  onNewGame() {
    const { dispatch } = this.props;
    dispatch(actions.newGame());
  }

  onCellClick(field) {
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
const ConnectedGame = enhance(Game);

export { ConnectedGame as Game };