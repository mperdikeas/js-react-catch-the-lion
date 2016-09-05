/* @flow */
'use strict';
import assert from 'assert';
import _      from 'lodash';
import React  from 'react';
//const     _ = require('lodash');
//const React = require('react');
var      cx = require('classnames');

import {inRange, Point, Vector}     from 'geometry-2d';

const {GameBoard} = require('../modules/block-optimization/es5/board-lib.js');
import {Side}      from '../modules/block-optimization/es5/side.js';
import {Geometry}  from './geometry.js';
import Cell        from './cell.js';
import imgFile     from './img-file.js';
import {arrayOfPoints} from './custom-react-validators.js';
import MovingSide from './moving-side.js';
import {PieceInformation}            from './piece-information.js';

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
        selectedPiece    : React.PropTypes.instanceOf(Point),
        selectPiece      : React.PropTypes.func.isRequired,
        moveToCell       : React.PropTypes.func.isRequired        
    },
    cellsFromBoard(): Array<React.Element> {
        const selectedPiecePossibleMovesOnBoard: ?Array<string> = (()=>{
            if (this.props.selectedPiece!=null) {
                const nextMoves2Boards: Map<string, GameBoard> = this.props.gameBoard.nextStatesByMovingPieceOnAParticularSquare(this.props.selectedPiece);
                return Array.from(nextMoves2Boards.keys());
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
                        if (this.props.selectedPiece)
                            return this.props.selectedPiece.equals(point);
                        else
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
                            const v: Vector = Vector.fromString(s);
                            if (this.props.selectedPiece!=null)
                                assert(v.from.equals(this.props.selectedPiece));
                            else
                                throw new Error('bug');
                            return v.to.equals(point);
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
                    selectPiece={this.props.selectPiece}
                    moveToCell={this.props.moveToCell}
                        />
                ));
            }
        }
        return cells;
    },
    render: function() {
        console.log('rendering board-grid');
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

