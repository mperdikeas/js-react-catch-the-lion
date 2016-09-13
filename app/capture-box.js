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

const CaptureBox = React.createClass({
    propTypes: {
        xOffset          : React.PropTypes.number.isRequired,
        yOffset          : React.PropTypes.number.isRequired,
        X                : React.PropTypes.number.isRequired,
        Y                : React.PropTypes.number.isRequired,
        border           : React.PropTypes.number.isRequired,
        cellWidth        : React.PropTypes.number.isRequired,
        cellHeight       : React.PropTypes.number.isRequired,
        pieces           : React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
    render: function() {
        console.log('rendering capture box');
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
            borderImageWidth: `${this.props.border}`,
            backgroundImage: 'url("green-felt.jpg")',
            backgroundSize: 'cover',
            fontSize  : 0
        };
        console.log(`TODO: I am left to display the ${this.props.pieces.length} captured pieces`);
        const cells: Array<React.Element> = this.prepareCells();
        return (
                <div style={style}>
                {cells}
                </div>                
        );
    },
    prepareCells() {
        const cells: Array<React.Element> = [];
        for (let i: number = 0 ; i < 6; i++) {
            const pieceInformation: ?PieceInformation = (()=>{
                if (this.props.pieces.length>i) {
                    const p: ?IConcretePiece = this.props.pieces[i];
                    if (p!=null) {
                        console.log(`returning piece information for code: ${p.code}`);
                        return new PieceInformation(
                            imgFile(p.code.toLowerCase()),
                            MovingSide.fromSide(Side.A), // TODO
                            MovingSide.BLACK // TODO
                        );
                    } else
                        throw new Error('bug');
                } else {
                    return null;
                }
            })();
            const imgIsSelected: ?boolean = false;
            cells.push(( // many TODOs
                    <Cell key={ i }
                point={new Point(0,0)} 
                width={this.props.cellWidth}
                height={this.props.cellHeight}
                border={1}
                pieceWidth={30}
                pieceHeight={30}
                pieceBorder={5}
                // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow                    
                pieceInformation={pieceInformation}
                // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow
                imgIsSelected= {imgIsSelected}
                movableHighlight={false} // TODO
                selectPiece={ ()=>{} }
                moveToCell={ ()=>{} }
                    />
            ));            
        }
        return cells;
    }
});

export default CaptureBox;

