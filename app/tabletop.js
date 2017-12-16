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
import {Move}                                from 'ai-for-shogi-like-games';
import {DropMoveNoPieceInformation}          from 'ai-for-shogi-like-games';

import {Geometry}                 from './geometry.js';
import {arrayOfPoints}            from './custom-react-validators.js';
import MovingSide                 from './moving-side.js';
import CaptureBox                 from './capture-box.js';
import Board                      from './board.js';
import {PointInBoardOrCaptureBox} from './point-in-board-or-capture-box.js';
import PlayerControlPanel         from './player-control-panel.js';

const TableTop = React.createClass({
    propTypes: {
        geometry          : React.PropTypes.instanceOf(Geometry) .isRequired,
        gameBoard         : React.PropTypes.instanceOf(GameBoard).isRequired,
        movingSide        : React.PropTypes.instanceOf(MovingSide).isRequired,
        selectedPiece     : React.PropTypes.instanceOf(PointInBoardOrCaptureBox),
        lastMove          : React.PropTypes.instanceOf(Move),
        selectPiece       : React.PropTypes.func.isRequired,
        moveToCell        : React.PropTypes.func.isRequired,
        winner            : React.PropTypes.instanceOf(MovingSide)        
    },
    getPieceInCaptureBox: function(captureBox: MovingSide, p: Point): IConcretePiece {
        if (captureBox===MovingSide.WHITE)
            return this.refs.whiteCaptureBox.getPieceOnPoint(p);
        else if (captureBox===MovingSide.BLACK)
            return this.refs.blackCaptureBox.getPieceOnPoint(p);
        else
            throw new Error();
    },    
    render: function() {
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
            borderImageWidth: `${this.props.geometry.tableBorder}px`,
            backgroundImage: 'url("bamboo.jpg")',
            backgroundSize: 'cover'
        };
        const endOfGameDisablingPaneStyle = {
            position: 'relative',
            padding: 0,
            margin: 0,
            left    : 0,
            top     : 0,
            width   : this.props.geometry.tableWidth,
            height  : this.props.geometry.tableHeight,
            zIndex  : 1,
            background: 'white',
            opacity: 0.5,
            display: this.props.winner===null?'none':'inherit'
        };
        const involvedInLastMoveBlack: boolean = (this.props.lastMove instanceof DropMoveNoPieceInformation) && (this.props.lastMove.side===MovingSide.BLACK);
        const involvedInLastMoveWhite: boolean = (this.props.lastMove instanceof DropMoveNoPieceInformation) && !involvedInLastMoveBlack;
        /* The rather assymetrical way of the above two lines has to do with the fact that AI moves use Side
           (from the [ai-for-shogi-like-games] package) whereas human moves use MovingSide (from this package) */
        return (
                <div style={style}>
                <div style={endOfGameDisablingPaneStyle}/>
                <CaptureBox       ref = "whiteCaptureBox"
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
                    selectedPiece     = {this.props.selectedPiece}
                    selectPiece       = {this.props.selectPiece}
                    involvedInLastMove= {involvedInLastMoveWhite}
                />
                <PlayerControlPanel
                    winner            = {this.props.winner}
                    isActive          = {this.props.movingSide===MovingSide.WHITE}
                    sideOfPlayer      = {MovingSide.WHITE}
                    xOffset           = {this.props.geometry.whiteControlXOffset}
                    yOffset           = {this.props.geometry.whiteControlYOffset}
                    width             = {this.props.geometry.whiteControlWidth}
                    height            = {this.props.geometry.whiteControlHeight}
                />
                <CaptureBox       ref = "blackCaptureBox"
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
                    selectedPiece     = {this.props.selectedPiece}
                    selectPiece       = {this.props.selectPiece}
                    involvedInLastMove= {involvedInLastMoveBlack}
                />
                <PlayerControlPanel
                    winner            = {this.props.winner}            
                    isActive          = {this.props.movingSide===MovingSide.BLACK}
                    sideOfPlayer      = {MovingSide.BLACK}            
                    xOffset           = {this.props.geometry.blackControlXOffset}
                    yOffset           = {this.props.geometry.blackControlYOffset}
                    width             = {this.props.geometry.blackControlWidth}
                    height            = {this.props.geometry.blackControlHeight}
                />                
                <Board
                    geometry          = {this.props.geometry}
                    gameBoard         = {this.props.gameBoard}
                    movingSide        = {this.props.movingSide}
                    selectedPiece     = {this.props.selectedPiece}
                    lastMove          = {this.props.lastMove}
                    selectPiece       = {this.props.selectPiece}
                    moveToCell        = {this.props.moveToCell}
                    getPieceInCaptureBox = {this.getPieceInCaptureBox}
                />
            </div>                
        );
    }
});

export default TableTop;

