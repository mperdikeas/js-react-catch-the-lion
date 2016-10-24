/* @flow */
'use strict';
import assert from 'assert';
import _      from 'lodash';
import React  from 'react';
//const     _ = require('lodash');
//const React = require('react');
var      cx = require('classnames');

import {inRange, Point, Vector}     from 'geometry-2d';

import {GameBoard}                           from 'ai-for-shogi-like-games';
import {Side}                                from 'ai-for-shogi-like-games';
import {Move, BoardMove, DropMove}           from 'ai-for-shogi-like-games';
import {Chick, Hen, Elephant, Giraffe, Lion} from 'ai-for-shogi-like-games';
import {Geometry}  from './geometry.js';
import Cell        from './cell.js';
import imgFile     from './img-file.js';
import {arrayOfPoints} from './custom-react-validators.js';
import MovingSide from './moving-side.js';
import {PieceInformation}            from './piece-information.js';
import {PointInBoardOrCaptureBox} from './point-in-board-or-capture-box.js';

const BoardGrid = React.createClass({
    propTypes: {
        gameBoard        : React.PropTypes.instanceOf(GameBoard).isRequired,
        movingSide       : React.PropTypes.instanceOf(MovingSide).isRequired,
        width            : React.PropTypes.number.isRequired,
        height           : React.PropTypes.number.isRequired,
        X                : React.PropTypes.number.isRequired,
        Y                : React.PropTypes.number.isRequired,
        cellWidth        : React.PropTypes.number.isRequired,
        cellHeight       : React.PropTypes.number.isRequired,
        cellBorder       : React.PropTypes.number.isRequired,
        pieceWidth       : React.PropTypes.number.isRequired,
        pieceHeight      : React.PropTypes.number.isRequired,
        pieceBorder      : React.PropTypes.number.isRequired,
        selectedPiece    : React.PropTypes.instanceOf(PointInBoardOrCaptureBox),
        selectPiece      : React.PropTypes.func.isRequired,
        moveToCell       : React.PropTypes.func.isRequired,
        getPieceInCaptureBox : React.PropTypes.func.isRequired        
    },
    cellsFromBoard(): Array<React.Element> {
        const selectedPiecePossibleMovesOnBoard: ?Array<string> = (()=>{
            const selectedPiece :?PointInBoardOrCaptureBox = this.props.selectedPiece;
            if (selectedPiece!=null) {
                if (selectedPiece.captureBox===null) { // piece on board
                    const nextMoves2Boards: Map<string, GameBoard> = this.props.gameBoard.nextStatesByMovingPieceOnAParticularSquare(selectedPiece.point);
                    return Array.from(nextMoves2Boards.keys());
                } else { // piece in capture box
                    // the selected piece has to belong to the moving side:
                    assert(this.props.movingSide===selectedPiece.captureBox);
                    const nextMoves2Boards: Map<string, GameBoard> = this.props.gameBoard.nextStatesByDroppingAParticularCapturedPiece(
                        this.props.getPieceInCaptureBox(selectedPiece.captureBox, selectedPiece.point)
                        , selectedPiece.captureBox.side.isSideA());
                    return Array.from(nextMoves2Boards.keys());
                }
            } else
                return null;
        })();        
        const cells: Array<React.Element> = [];
        for (let j: number = 0; j < this.props.Y ; j++) {      // it is important that we scan along the X-direction first, then along the Y-direction as this is how the 'static' layout will work
            for (let i: number = 0 ; i < this.props.X ; i++) {
                const point = new Point(i,j);
                const pieceInformation: ?PieceInformation = (()=>{
                    if (this.props.gameBoard.board.has( point.toString() )) {
                        const p: ?IConcretePieceOnSide = this.props.gameBoard.board.get(point.toString());
                        if (p!=null)
                            return new PieceInformation(
                                imgFile(p.piece.code.toLowerCase()),
                                MovingSide.fromSide(p.isSideA?Side.A:Side.B),
                                this.props.movingSide);
                        else
                            throw new Error('bug');
                    } else {
                        return null;
                    }
                })();
                const imgIsSelected: ?boolean = (()=>{
                    if (pieceInformation) {
                        if (this.props.selectedPiece && (this.props.selectedPiece.captureBox===null)) {
                            return this.props.selectedPiece.point.equals(point);
                        } else
                            return false;
                    } else
                        return null;
                })();
                if ((pieceInformation!=null) && (imgIsSelected==null))
                    throw new Error();
                const movableHighlight: boolean = (()=>{
                    if (selectedPiecePossibleMovesOnBoard!=null) {
                        assert(this.props.selectedPiece!=null);
                        return _.some(selectedPiecePossibleMovesOnBoard, (s)=>{
                            const move: Move = Move.fromString([Chick, Hen, Elephant, Giraffe, Lion], s);
                            if (move instanceof BoardMove) {
                                assert(this.props.selectedPiece.captureBox===null);
                                if (this.props.selectedPiece!=null)
                                    assert(move.vector.from.equals(this.props.selectedPiece.point));
                                else
                                    throw new Error('bug');
                                return move.vector.to.equals(point);
                            } else if (move instanceof DropMove) {
                                assert(this.props.selectedPiece.captureBox!=null);                                
                                return move.to.equals(point);
                            } else throw new Error();
                        });
                    } else
                        return false;
                })();
                
                cells.push((
                        <Cell key={ JSON.stringify(point) }
                    point={point}
                    width={this.props.cellWidth}
                    height={this.props.cellHeight}
                    border={this.props.cellBorder}
                    pieceWidth={this.props.pieceWidth}
                    pieceHeight={this.props.pieceHeight}
                    pieceBorder={this.props.pieceBorder}
                    // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow                    
                    pieceInformation={pieceInformation}
                    // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow
                    imgIsSelected= {imgIsSelected}
                    movableHighlight={movableHighlight}
                    selectPiece={(p)=>{this.props.selectPiece(new PointInBoardOrCaptureBox(p, null));}}
                    moveToCell={this.props.moveToCell}
                        />
                ));
            }
        }
        return cells;
    },
    render: function() {
        const style = {
            position: 'absolute',
            padding: 0,
            margin: 0,
            left: 0,
            top: 0,
            width : this.props.width,
            height: this.props.height,
            border: 'none',
            background: 'transparent',
            fontSize: 0
        };
        const cells: Array<React.Element> = this.cellsFromBoard();
        return (
                <div style={style}>
                {cells}
                </div>                
        );
    }
});

export default BoardGrid;

