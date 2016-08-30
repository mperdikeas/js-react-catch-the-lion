/* @flow */
'use strict';
require('./css/style.css');
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

const BoardGrid = React.createClass({
    propTypes: {
        board      : React.PropTypes.instanceOf(Map).isRequired,
        width      : React.PropTypes.number.isRequired,
        height     : React.PropTypes.number.isRequired,
        X          : React.PropTypes.number.isRequired,
        Y          : React.PropTypes.number.isRequired,
        cellWidth  : React.PropTypes.number.isRequired,
        cellHeight : React.PropTypes.number.isRequired,
        cellBorder : React.PropTypes.number.isRequired,
        pieceWidth : React.PropTypes.number.isRequired,
        pieceHeight: React.PropTypes.number.isRequired,
        pieceBorder: React.PropTypes.number.isRequired
    },
    cellsFromBoard(board: Map<string, IConcretePieceOnSide>): Array<React.Element> {
        const cells: Array<React.Element> = [];
        console.log(board);
        for (let i: number = 0 ; i < this.props.X ; i++) {
            for (let j: number = 0; j < this.props.Y ; j++) {
                const point = new Point(i,j);
                console.log(point.toString());
                const imgFname: ?string = (()=>{
                    if (board.has( point.toString() )) {
                        const p: ?IConcretePieceOnSide = board.get(point.toString());
                        if (p!=null)
                            return imgFile(p.piece.code.toLowerCase());
                        else
                            return 'bug';
                    } else {
                        return null;
                    }
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
                    // $SuppressFlowFinding:
                    imgFname={imgFname}
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
            background: 'brown',
            fontSize: 0
        };
        const cells: Array<React.Element> = this.cellsFromBoard(this.props.board);
        return (
                <div style={style}>
                {cells}
                </div>                
        );
    }
});

export default BoardGrid;

