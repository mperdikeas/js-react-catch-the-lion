'use strict'; 

import 'babel-polyfill';
const assert     = require('assert');
import _ from 'lodash';


import {Point, Piece, PieceSet, GameBoard}   from '../es6/board-lib.js';
import {Vector}                              from '../es6/vector.js';
import {Chick, Hen, Elephant, Giraffe, Lion} from '../es6/piece-set.js';
import {createPieceSet}                      from '../es6/piece-set-factory.js';
import {PieceOnSide}                         from '../es6/piece.js';
import {CaptureBag}                          from '../es6/captureBag.js';
import {Move, BoardMove, DropMove}           from '../es6/moves.js';
import {model000}            from '../es6/eval-model-library.js';

import {boardA, boardB, boardTwoKings, boardWithSideAKingCaptured, boardWithSideBKingCaptured} from './common-test-boards.js';

describe('Move constructors', function() {
    it('should not break', function() {
        new Move();
        new BoardMove(new Vector(new Point(0,0), new Point(0,1)));
        new DropMove(new PieceOnSide(Chick, true), new Point(3,3));
        new DropMove(new PieceOnSide(Elephant, false), new Point(3,3));
    });
});


describe('toString and fromString', function() {
    it('should work for BoardMoves', function() {
        const bm  =  new BoardMove(new Vector(new Point(0,0), new Point(0,1)));
        const bm2 = BoardMove.fromString(null, bm.toString());
        assert(bm.equals(bm2));
        assert(bm2.equals(bm));
        assert(bm.toString()===bm2.toString());
    });
    it('should work for DropMoves', function() {
        const dm  = new DropMove(new PieceOnSide(Chick, true), new Point(3,4));
        const dm2 = DropMove.fromString([Chick, Hen, Elephant], dm.toString());
        assert(dm.equals(dm2));
        assert(dm2.equals(dm));
        assert(dm.toString()===dm2.toString());
    });
});
