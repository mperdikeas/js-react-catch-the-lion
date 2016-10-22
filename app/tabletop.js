/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Point} from 'geometry-2d';
import {createChainableTypeChecker} from 'react-chainable-type-checker';

import {Chick, Hen, Elephant, Giraffe, Lion} from 'ai-for-shogi-like-games';
import {createPieceSet}                      from 'ai-for-shogi-like-games';
import {PieceOnSide}                         from 'ai-for-shogi-like-games';
import {CaptureBag}                          from 'ai-for-shogi-like-games';
import {GameBoard}                           from 'ai-for-shogi-like-games';

import {Geometry}      from './geometry.js';
import {arrayOfPoints} from './custom-react-validators.js';
import MovingSide      from './moving-side.js';

import CaptureBox      from './capture-box.js';
import Board           from './board.js';

const TableTop = React.createClass({
    propTypes: {
        geometry          : React.PropTypes.instanceOf(Geometry) .isRequired,
        gameBoard         : React.PropTypes.instanceOf(GameBoard).isRequired,
        movingSide        : React.PropTypes.instanceOf(MovingSide).isRequired,
        selectedPiece     : React.PropTypes.instanceOf(Point),
        selectPiece       : React.PropTypes.func.isRequired,
        moveToCell       : React.PropTypes.func.isRequired                   
    },    
    render: function() {
        console.log('rendering tabletop');
        const style = {
            position: 'absolute',
            padding : 0,
            margin  : 0,
            left    : this.props.geometry.tableXOffset,
            top     : this.props.geometry.tableYOffset,
            width   : this.props.geometry.tableWidth,
            height  : this.props.geometry.tableHeight,
            border: `${this.props.geometry.tableBorder}px solid transparent`, // http://stackoverflow.com/a/37715462/274677 https://www.chromestatus.com/feature/5542503914668032
            borderImageSource: 'url("zebrano.jpg")',
            borderImageSlice: `${this.props.geometry.tableBorder} ${this.props.geometry.tableBorder} ${this.props.geometry.tableBorder}`,
            borderImageRepeat: 'round',
            borderImageWidth: `${this.props.geometry.tableBorder}`,
            backgroundImage: 'url("bamboo.jpg")',
            backgroundSize: 'cover'
        };
        return (
                <div style={style}>
                <CaptureBox
                    sideOfCaptureBox  = {MovingSide.WHITE}
                    movingSide        = {this.props.movingSide}
                    xOffset           = {this.props.geometry.capturedWhiteXOffset}
                    yOffset           = {this.props.geometry.capturedWhiteYOffset}
                    X                 = {this.props.geometry.capturedX}
                    Y                 = {this.props.geometry.capturedY}
                    border            = {this.props.geometry.capturedBorder}
                    cellWidth         = {this.props.geometry.cellWidth}
                    cellHeight        = {this.props.geometry.cellHeight}
                    pieceWidth        = {this.props.geometry.pieceWidth}
                    pieceHeight       = {this.props.geometry.pieceHeight}
                    pieceBorder       = {this.props.geometry.pieceBorder}
                    pieces            = {this.props.gameBoard.captured.piecesOfThisSide(false)}
                    selectedPiece     = {new Point(0,0)}
            
                />
                <CaptureBox
                    sideOfCaptureBox  = {MovingSide.BLACK}
                    movingSide        = {this.props.movingSide}
                    xOffset           = {this.props.geometry.capturedBlackXOffset}
                    yOffset           = {this.props.geometry.capturedBlackYOffset}
                    X                 = {this.props.geometry.capturedX}
                    Y                 = {this.props.geometry.capturedY}
                    border            = {this.props.geometry.capturedBorder}
                    cellWidth         = {this.props.geometry.cellWidth}
                    cellHeight        = {this.props.geometry.cellHeight}
                    pieceWidth        = {this.props.geometry.pieceWidth}
                    pieceHeight       = {this.props.geometry.pieceHeight}            
                    pieceBorder       = {this.props.geometry.pieceBorder}
                    pieces            = {this.props.gameBoard.captured.piecesOfThisSide(true)}
                    selectedPiece     = {new Point(0,0)}            
                />                
                <Board
                    geometry={this.props.geometry}
                    gameBoard={this.props.gameBoard}
                    movingSide={this.props.movingSide}
                    selectedPiece={this.props.selectedPiece}
                    selectPiece={this.props.selectPiece}
                    moveToCell    = {this.props.moveToCell}                        
                />
            </div>                
        );
    }
});

export default TableTop;

