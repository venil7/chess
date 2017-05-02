import * as React from 'react';
import { Cell } from './Cell';

const { Component } = React;
export class ChessBoard extends Component {
  render() {
    const { board, onCellClick, selectedField, possibleMoves } = this.props;
    const { fields } = board;
    const possibleFields = possibleMoves.map(({ to }) => to);
    return (
      <div className="board">
        {fields.map((field, index) => {
          const selected = (!!selectedField) && (selectedField.coordinates.index === field.coordinates.index);
          const possibleMove = possibleFields.some(f => f.index === field.coordinates.index)
          return (
            <Cell
              key={index}
              field={field}
              selected={selected}
              possibleMove={possibleMove}
              onClick={(field) => onCellClick(field)} />);
        })}
      </div>
    )
  }
}