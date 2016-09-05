/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import assert from 'assert';

import {Point} from 'geometry-2d';

import {GameBoard}                           from '../modules/block-optimization/es6/board-lib.js';
import {Chick, Hen, Elephant, Giraffe, Lion} from '../modules/block-optimization/es6/piece-set.js';
import {createPieceSet}                      from '../modules/block-optimization/es6/piece-set-factory.js';
import {PieceOnSide}                         from '../modules/block-optimization/es6/piece.js';
import {CaptureBag}                          from '../modules/block-optimization/es6/captureBag.js';

import {Geometry, geometry}  from './geometry.js';
import MovingSide            from './moving-side.js';
import ControlPanel          from './control-panel.js';


import TableTop     from './tabletop.js';

function createStartingBoard() {
    const pieceSet = createPieceSet([Chick, Hen, Elephant, Giraffe, Lion]);
    const notation: string  = 'c@1~3, e@0~4, l@1~4, g@2~4 * g@0~0, l@1~0, e@2~0, c@1~1';
    const cb = new CaptureBag();
    cb.capture(new PieceOnSide(Elephant, true));
    cb.capture(new PieceOnSide(Giraffe, false));                            
    const gb = GameBoard.create(3, 5, true, 0, pieceSet, notation, cb);
    console.log(gb.toStringFancy());
    return gb;
}

type StateT = {gameBoard: GameBoard, movingSide: MovingSide, selectedPiece: ?Point};

const Game = React.createClass({
    getInitialState: function(): StateT {
        return {
            gameBoard: createStartingBoard(),
            movingSide: MovingSide.BLACK,
            selectedPiece: null
        };
    },
    selectPiece: function(p: Point): void {
        console.log(p.toString());
        if (this.state.selectedPiece!=null) {
            if (this.state.selectedPiece.equals(p)) {
                this.setState({selectedPiece: null});
                return;
            }
        }
        this.setState({selectedPiece: p});
    },
    moveToCell: function(p: Point): void {
        console.log(`Piece should now move to ${p.toString()}`);
        const selectedPiece: ?Point = this.state.selectedPiece;
        if (selectedPiece!=null) {
            assert(this.state.gameBoard.isCellEmpty(p) || MovingSide.fromSide(this.state.gameBoard.sideOnCell(p))===this.state.movingSide.theOther());
            const nextBoard: ?GameBoard = this.state.gameBoard.move(selectedPiece, p);
            if (nextBoard!=null) {
                this.setState({gameBoard: nextBoard,
                               movingSide: this.state.movingSide.theOther(),
                               selectedPiece: null});
            } else
                throw new Error(`bug - it should be impossible to call moveToCell on a point (${p.toString()}) that doesn't exist on the board`);
        } else throw new Error(`bug - it should be impossible to call moveToCell when there is no selected piece`);
    },
    render: function() {
        console.log('rendering game');
        const style = {
            position: 'absolute',
            padding : 0,
            margin  : 0,
            left    : geometry.gameXOffset,
            top     : geometry.gameYOffset,
            width   : geometry.gameWidth,
            height  : geometry.gameHeight,
            background: 'white'
        };
        const controlPanelStyle = {
            position: 'absolute',
            padding : 0,
            margin  : 0,
            left    : 30,
            top     : 30,
            width   : 100,
            height  : 20,
            borderWidth: 1
        };
        return (
            <div style={style}>
                <TableTop
                    geometry={geometry}
                    gameBoard={this.state.gameBoard}
                    movingSide={this.state.movingSide}
                    // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow
                    selectedPiece={this.state.selectedPiece}
                    selectPiece={this.selectPiece}
                    moveToCell={this.moveToCell}
                />
                <div style={controlPanelStyle}>
                <ControlPanel
                    movingSide={this.state.movingSide}
                />
                </div>
            </div>                
        );
    }
});

export default Game;

