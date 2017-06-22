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

  onPruning({ target }) {
    const { dispatch } = this.props;
    dispatch(actions.setSettings({ pruning: target.checked }));
  }

  onDepth({ target }) {
    const { dispatch } = this.props;
    dispatch(actions.setSettings({ depth: parseInt(target.value, 10) }));
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
        </div>
        <div>
          <input id="pruning" type="checkbox" onChange={v => this.onPruning(v)} defaultChecked={settings.pruning} />
          <label htmlFor="pruning">Alpha-Beta Pruning</label>
        </div>
        <div>
          <input type="range" onChange={v => this.onDepth(v)} defaultValue={settings.depth} min={2} max={4} />
          <label>depth: {settings.depth}</label>
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
