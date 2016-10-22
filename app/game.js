/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import assert from 'assert';

import {Point} from 'geometry-2d';

import {GameBoard}                           from 'ai-for-shogi-like-games';
import {Chick, Hen, Elephant, Giraffe, Lion} from 'ai-for-shogi-like-games';
import {createPieceSet}                      from 'ai-for-shogi-like-games';
import {PieceOnSide}                         from 'ai-for-shogi-like-games';
import {CaptureBag}                          from 'ai-for-shogi-like-games';

import {Geometry, geometry}  from './geometry.js';
import MovingSide            from './moving-side.js';
import ControlPanel          from './control-panel.js';
import {PointInBoardOrCaptureBoard} from './point-in-board-or-capture-box.js';

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

type StateT = {gameBoard: GameBoard, movingSide: MovingSide, winner: ?MovingSide, selectedPiece: ?PointInBoardOrCaptureBox};

const Game = React.createClass({
    getInitialState: function(): StateT {
        return {
            gameBoard: createStartingBoard(),
            movingSide: MovingSide.BLACK,
            winner: null,
            selectedPiece: null
        };
    },
    selectPiece: function(p: PointInBoardOrCaptureBox): void {
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
        const selectedPiece: ?PointInBoardOrCaptureBox = this.state.selectedPiece;
        if (selectedPiece!=null) {
            assert( this.state.gameBoard.isCellEmpty(p) || MovingSide.fromSide(this.state.gameBoard.sideOnCell(p))===this.state.movingSide.theOther());
            if (selectedPiece.captureBox===null) { // case A: normal board move
                const nextBoard: ?GameBoard = this.state.gameBoard.move(selectedPiece.point, p);
                if (nextBoard!=null) {
                    const winner: ?boolean = nextBoard.boardImmediateWinSide();
                    if (winner!=null) {
                        this.setState({gameBoard: nextBoard,
                                       movingSide: this.state.movingSide.theOther(),
                                       selectedPiece: null,
                                       winner: MovingSide.fromWhetherIsSideA(winner)
                                      });
                    } else {
                        if (this.state.movingSide!=null) {
                            this.setState({gameBoard: nextBoard,
                                           movingSide: this.state.movingSide.theOther(),
                                           selectedPiece: null
                                          });
                        } else
                            throw new Error('bug');
                    }
                } else
                    throw new Error(`bug - it should be impossible to call moveToCell on a point (${p.toString()}) that doesn't exist on the board`);
            } else {                               // case B: drop moves
                throw new Error('drops are not implemented yet');
            }
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
                    // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow            
                    winner={this.state.winner}
                />
                </div>
            </div>                
        );
    }
});

export default Game;

