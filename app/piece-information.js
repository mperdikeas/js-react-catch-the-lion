// @flow
'use strict';

import MovingSide from './moving-side.js';
import {Point}     from 'geometry-2d';

class PieceInformation {

    fname: string;
    side: MovingSide;
    getMovingSide: (p: Point)=>MovingSide;

    constructor(fname: string, side: MovingSide, getMovingSide: (p: Point)=>MovingSide) {
        this.fname = fname;
        this.side = side;
        this.getMovingSide = getMovingSide;
    }
}
exports.PieceInformation = PieceInformation;
