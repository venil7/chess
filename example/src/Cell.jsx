import * as React from 'react';

const { Component } = React;

export class Cell extends Component {
  onClick() {
    const { onClick, field } = this.props;
    onClick(field);
  }

  render() {
    const { field, selected, possibleMove } = this.props;
    const symbol = field.isEmpty ? "" : field.piece.toString();
    let className = 'cell';
    className += selected ? ' selected' : '';
    className += possibleMove ? ' possible-move' : '';
    return (
      <div className={className}
        onClick={() => this.onClick()}>
        {symbol}
      </div>
    );
  }
}