/* @flow */
'use strict';
import assert from 'assert';
import _      from 'lodash';
import React  from 'react';
//const     _ = require('lodash');
//const React = require('react');
var      cx = require('classnames');

import {Point                  }     from 'geometry-2d';
import {Side}                        from 'ai-for-shogi-like-games';

import Cell                          from './cell.js';
import MovingSide                    from './moving-side.js';
import {PieceInformation}            from './piece-information.js';
import imgFile                       from './img-file.js';
import {PointInBoardOrCaptureBox}    from './point-in-board-or-capture-box.js';

const CaptureBox = React.createClass({
    propTypes: {
        sideOfCaptureBox : React.PropTypes.instanceOf(MovingSide).isRequired,
        movingSide       : React.PropTypes.instanceOf(MovingSide).isRequired,
        xOffset          : React.PropTypes.number.isRequired,
        yOffset          : React.PropTypes.number.isRequired,
        X                : React.PropTypes.number.isRequired,
        Y                : React.PropTypes.number.isRequired,
        border           : React.PropTypes.number.isRequired,
        cellWidth        : React.PropTypes.number.isRequired,
        cellHeight       : React.PropTypes.number.isRequired,
        pieceWidth       : React.PropTypes.number.isRequired,
        pieceHeight      : React.PropTypes.number.isRequired,
        pieceBorder      : React.PropTypes.number.isRequired,        
        pieces           : React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        selectedPiece    : React.PropTypes.instanceOf(PointInBoardOrCaptureBox),
        selectPiece      : React.PropTypes.func.isRequired   ,
        involvedInLastMove: React.PropTypes.bool.isRequired
    },
    linearToPoint: function(i: int): Point {
        return new Point(i % this.props.X, Math.floor(i / this.props.X));
    },
    pointToLinear: function(p: Point): int {
        const rv: int = p.y*this.props.X+p.x;
        console.log(`point ${p.toString()} is linearly translated to: ${rv}`);
        return rv;
    },
    getPieceOnPoint(p: Point): IConcretePiece {
        return this.props.pieces[this.pointToLinear(p)];
    },
    render: function() {
        const style = {
            position  : 'absolute',
            padding   : 0,
            margin    : 0,
            left      : this.props.xOffset,
            top       : this.props.yOffset,
            width     : this.props.X*this.props.cellWidth,
            height    : this.props.Y*this.props.cellHeight,
            //            border    : `${this.props.border}px solid DarkRed`,
            border: `${this.props.border}px solid transparent`,
            borderImageSource: 'url("mahogany.jpg")',
            borderImageSlice: `${this.props.border} ${this.props.border}`,
            borderImageRepeat: 'round',
            borderImageWidth: `${this.props.border}px`,
            backgroundImage: 'url("green-felt.jpg")',
            backgroundSize: 'cover',
            fontSize  : 0
        };
        const cells: Array<React.Element> = this.prepareCells();
        return (
                <div style={style}>
                {cells}
                </div>                
        );
    },
    prepareCells() {
        const cells: Array<React.Element> = [];
        const PIECES_IN_GAME = 8;
        const NUM_OF_LIONS = 2;
        const MAX_NUM_OF_CAPTURED_PIECES = PIECES_IN_GAME - NUM_OF_LIONS;
        for (let i: number = 0 ; i < MAX_NUM_OF_CAPTURED_PIECES; i++) {
            const pieceInformation: ?PieceInformation = (()=>{
                if (this.props.pieces.length>i) {
                    const p: ?IConcretePiece = this.props.pieces[i];
                    if (p!=null) {
                        return new PieceInformation(
                            imgFile(p.code.toLowerCase()),
                            this.props.sideOfCaptureBox,
                            this.props.movingSide
                        );
                    } else
                        throw new Error('bug');
                } else {
                    return null;
                }
            })();
            const point: Point = this.linearToPoint(i);
            const imgIsSelected: boolean = (()=>{
                if ((this.props.selectedPiece!=null) && (this.props.selectedPiece.captureBox!=null) && (this.props.selectedPiece.captureBox===this.props.sideOfCaptureBox))
                    return point.equals(this.props.selectedPiece.point);
                else
                    return false;
            })();
            cells.push((
                    <Cell key={ i }
                point={point}
                width={this.props.cellWidth}
                height={this.props.cellHeight}
                border={0}
                pieceWidth={this.props.pieceWidth}
                pieceHeight={this.props.pieceHeight}
                pieceBorder={this.props.pieceBorder}
                // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow                    
                pieceInformation={pieceInformation}
                // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow
                imgIsSelected= {imgIsSelected}
                involvedInLastMove={this.props.involvedInLastMove && (i===this.props.pieces.length)}
                movableHighlight={false} // it doesn't make sense to move inside a capture box
                selectPiece={(p)=>{this.props.selectPiece(new PointInBoardOrCaptureBox(p, this.props.sideOfCaptureBox));}}
                moveToCell={ ()=>{} }
                    />
            ));
        }
        return cells;
    }
});

export default CaptureBox;

