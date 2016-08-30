/* @flow */
'use strict';
require('./css/style.css');
const     _ = require('lodash');
var      cx = require('classnames');

import assert from 'assert';

const {PieceOnSide} = require('../modules/block-optimization/es5/piece.js');

class CellOccupiedState {
    v: string;
    constructor(v: string) {
        this.v = v;
        Object.freeze(v);
    }
    static EMPTY             = new CellOccupiedState('e');
    static OCCUPIED          = new CellOccupiedState('o');
}



class CellState {
    occupied   : boolean;
    highlighted: boolean;
    piece      : ?PieceOnSide;
    constructor(occupied: boolean, highlighted: boolean, piece: PieceOnSide) {
        assert( (occupied && (piece!=null)) || ((!occupied) && (piece===null)) );
        this.occupied      = occupied;
        this.highlighted   = highlighted;
        this.piece         = piece;
    }
}


exports.CellState = CellState;

