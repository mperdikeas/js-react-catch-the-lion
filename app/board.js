/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Point} from 'geometry-2d';

import {GameBoard} from 'ai-for-shogi-like-games';
import {Move}      from 'ai-for-shogi-like-games';

import {Geometry}  from './geometry.js';
import BoardGrid   from './board-grid.js';
import MovingSide from './moving-side.js';
import {PointInBoardOrCaptureBox} from './point-in-board-or-capture-box.js';

const Board = React.createClass({
    propTypes: {
        geometry          : React.PropTypes.instanceOf(Geometry) .isRequired,
        gameBoard         : React.PropTypes.instanceOf(GameBoard).isRequired,
        movingSide        : React.PropTypes.instanceOf(MovingSide).isRequired,
        selectedPiece     : React.PropTypes.instanceOf(PointInBoardOrCaptureBox),
        lastMove          : React.PropTypes.instanceOf(Move),        
        selectPiece       : React.PropTypes.func.isRequired,
        moveToCell       : React.PropTypes.func.isRequired,
        getPieceInCaptureBox : React.PropTypes.func.isRequired
    },
    render: function() {
        const style = {
            boxSizing: 'content-box', // this is the standard and default in all but the accursed IE
            position: 'absolute',
            padding: 0,
            margin: 0,
            left: this.props.geometry.boardXOffset,
            top: this.props.geometry.boardYOffset,
            width : this.props.geometry.boardWidthWithoutBorder(),
            height: this.props.geometry.boardHeightWithoutBorder(),
            borderWidth: `${this.props.geometry.boardBorderVertic}px ${this.props.geometry.boardBorderHoriz}px`,
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderImageSource: 'url("brickman.jpg")',
            borderImageSlice: `${this.props.geometry.boardBorderVertic} ${this.props.geometry.boardBorderHoriz}`,
            borderImageRepeat: 'round',
            borderImageWidth: `${this.props.geometry.boardBorderVertic} ${this.props.boardBorderHoriz}`,
            backgroundImage: 'url("board-background-1.jpg")' // 'brown'
        };
        return (
                <div style={style}>
                <BoardGrid
                    gameBoard     = {this.props.gameBoard}
                    movingSide    = {this.props.movingSide}            
                    width         = {this.props.geometry.boardWidthWithoutBorder()}
                    height        = {this.props.geometry.boardHeightWithoutBorder()}
                    X             = {this.props.geometry.X}
                    Y             = {this.props.geometry.Y}
                    cellWidth     = {this.props.geometry.cellWidth}
                    cellHeight    = {this.props.geometry.cellHeight}
                    cellBorder    = {this.props.geometry.cellBorder}
                    pieceWidth    = {this.props.geometry.pieceWidth}
                    pieceHeight   = {this.props.geometry.pieceHeight}
                    pieceBorder   = {this.props.geometry.pieceBorder}
                    selectedPiece = {this.props.selectedPiece}
                    lastMove      = {this.props.lastMove}
                    selectPiece   = {this.props.selectPiece}
                    moveToCell    = {this.props.moveToCell}
                    getPieceInCaptureBox = {this.props.getPieceInCaptureBox}            
                />
                </div>                
        );
    }
});

export default Board;

