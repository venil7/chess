/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { Field } from '../field'

const { Component } = React;
interface Props {
  field: Field;
  onClick: (field: Field) => void;
  selected: boolean;
  possibleMove: boolean;
}

export class Cell extends Component<Props, any> {
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