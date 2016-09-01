/* @flow */
'use strict';
import assert from 'assert';
import _      from 'lodash';
import React  from 'react';
//const     _ = require('lodash');
//const React = require('react');
var      cx = require('classnames');

import {Geometry}  from './geometry.js';
import Cell        from './cell.js';
import imgFile     from './img-file.js';
import {inRange, Point}     from 'geometry-2d';
import {ImageFilenameAndOrientation} from './img-fname-orientation.js';

import {arrayOfPoints} from './custom-react-validators.js';
const {GameBoard} = require('../modules/block-optimization/es5/board-lib.js');

const BoardGrid = React.createClass({
    propTypes: {
        gameBoard  : React.PropTypes.instanceOf(GameBoard).isRequired,
        width      : React.PropTypes.number.isRequired,
        height     : React.PropTypes.number.isRequired,
        X          : React.PropTypes.number.isRequired,
        Y          : React.PropTypes.number.isRequired,
        cellWidth  : React.PropTypes.number.isRequired,
        cellHeight : React.PropTypes.number.isRequired,
        cellBorder : React.PropTypes.number.isRequired,
        pieceWidth : React.PropTypes.number.isRequired,
        pieceHeight: React.PropTypes.number.isRequired,
        pieceBorder: React.PropTypes.number.isRequired,
        selectedPiece: React.PropTypes.instanceOf(Point),
        selectedPiecePossibleMovesOnBoard: arrayOfPoints,        
        selectPiece: React.PropTypes.func.isRequired        
    },
    cellsFromBoard(): Array<React.Element> {
        const selectedPiecePossibleMovesOnBoard: ?Array<Point> = (()=>{
            if (this.props.selectedPiece!=null) {
                const nextMoves2Boards: Map<string, GameBoard> = this.props.gameBoard.nextStatesByMovingPieceOnAParticularSquare(this.props.selectedPiece);
                // $SuppressFlowFinding: Function cannot be called on any member of intersection type
                return Array.from(nextMoves2Boards.keys());
            } else
                return null;
        })();        
        const cells: Array<React.Element> = [];
        for (let j: number = 0; j < this.props.Y ; j++) {      // it is important that we scan along the X-direction first, then along the Y-direction as this is how the 'static' layout will work
            for (let i: number = 0 ; i < this.props.X ; i++) {
                const point = new Point(i,j);
                const imgFnameOrnt: ?ImageFilenameAndOrientation = (()=>{
                    if (this.props.gameBoard.board.has( point.toString() )) {
                        const p: ?IConcretePieceOnSide = this.props.gameBoard.board.get(point.toString());
                        if (p!=null)
                            return new ImageFilenameAndOrientation(
                                imgFile(p.piece.code.toLowerCase()),
                                p.isSideA);
                        else
                            return 'bug';
                    } else {
                        return null;
                    }
                })();
                const imgIsSelected: ?boolean = (()=>{
                    if (imgFnameOrnt) {
                        if (this.props.selectedPiece)
                            return this.props.selectedPiece.equals(point);
                        else
                            return false;
                    } else
                        return null;
                })();
                cells.push((
                        <Cell key={ JSON.stringify(point) }
                    x = {point.x}
                    y = {point.y}
                    value={`${point.x}-${point.y}`}
                    width={this.props.cellWidth}
                    height={this.props.cellHeight}
                    border={this.props.cellBorder}
                    pieceWidth={this.props.pieceWidth}
                    pieceHeight={this.props.pieceHeight}
                    pieceBorder={this.props.pieceBorder} 
                    imgFnameOrnt={imgFnameOrnt}
                    // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow
                    imgIsSelected={imgIsSelected}
                    selectPiece={this.props.selectPiece}            
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

