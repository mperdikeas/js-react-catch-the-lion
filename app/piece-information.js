// @flow
'use strict';

import MovingSide from './moving-side.js';
import {Point}     from 'geometry-2d';

class PieceInformation {

    fname: string;
    sideOfThisPiece: MovingSide;
    sideThatMovesOnBoard: MovingSide;


    constructor(fname: string, sideOfThisPiece: MovingSide, sideThatMovesOnBoard: MovingSide) {
        this.fname = fname;
        this.sideOfThisPiece = sideOfThisPiece;
        this.sideThatMovesOnBoard = sideThatMovesOnBoard;
    }

    belongsToTheMovingSide(): boolean {
        return this.sideOfThisPiece === this.sideThatMovesOnBoard;
    }
}
exports.PieceInformation = PieceInformation;
