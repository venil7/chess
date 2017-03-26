import * as React from 'react';
import { ChessBoard } from './ChessBoard';
import { connect } from 'react-redux';
import * as actions from './boardActions';

const { Component } = React;
const enhance = connect(state => ({ game: state.game }));

class Game extends Component {
  onNewGame() {
    const { dispatch } = this.props;
    dispatch(actions.newGame());
  }

  onCellClick(field) {
    const { dispatch } = this.props;
    dispatch(actions.selectFieldThunk(field));
  }

  onPruning(event) {
    const { dispatch } = this.props;
    dispatch(actions.setSettings({ pruning: event.target.checked }));
  }

  render() {
    const { game } = this.props;
    const { board, selectedField, possibleMoves, settings } = game;
    return (
      <div>
        <div>
          <button onClick={() => this.onNewGame()}>
            New Game
          </button>
          <input type="checkbox" onChange={v => this.onPruning(v)} defaultChecked={settings.pruning} />
          <label>Alpha-Beta Pruning</label>
        </div>
        <ChessBoard
          selectedField={selectedField}
          possibleMoves={possibleMoves}
          board={board}
          onCellClick={field => this.onCellClick(field)}
        />
        <span>Move: {game.thinking ? 'CPU' : 'Human'}</span>
      </div>
    );
  }
}
const ConnectedGame = enhance(Game);

export { ConnectedGame as Game };
