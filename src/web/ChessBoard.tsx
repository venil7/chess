/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { Board } from '../board';
import { Field } from '../field';
import { Move } from '../Move';
import { Cell } from './Cell';

interface ChessBoardProps {
  board: Board;
  onCellClick: (field: Field) => void;
  selectedField: Field;
  possibleMoves: Move[];
}

const { Component } = React;
export class ChessBoard extends Component<ChessBoardProps, any> {
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