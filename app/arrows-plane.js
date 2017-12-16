/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');
import assert from 'assert';
import {geometry}  from './geometry.js';
import {Move, BoardMove, DropMove, DropMoveNoPieceInformation}  from 'ai-for-shogi-like-games';
import {Point, Vector} from 'geometry-2d';


function gridPointToScreenPoint(p: Point): Point {
    return new Point(geometry.boardXOffset+(p.x+0.5)*(geometry.cellWidth),
                     geometry.boardYOffset+(p.y+0.5)*(geometry.cellHeight));          
}

function prepareLineDirections(p1: Point, p2: Point) {
    let p1s: Point = gridPointToScreenPoint(p1);
    let p2s: Point = gridPointToScreenPoint(p2);
    // we now need to adjust p2s based on the direction of the move.
    const offset: Point = (function() {
        let rv: Point = new Point(0,0);
        if (p2s.y < p1s.y)
            rv = rv.add(new Point(0, +0.5*geometry.cellHeight));
        else if (p2s.y > p1s.y)
            rv = rv.add(new Point(0, -0.5*geometry.cellHeight));


        if (p2s.x < p1s.x)
            rv = rv.add(new Point(+0.5*geometry.cellWidth, 0));
        else if (p2s.x > p1s.x)
            rv = rv.add(new Point(-0.5*geometry.cellWidth, 0));

        return rv;

    })();
    p2s = p2s.add(offset);
    return `M ${p1s.x} ${p1s.y} L ${p2s.x} ${p2s.y}`;
}

const ArrowsPlane = React.createClass({
    propTypes: {
        move    : React.PropTypes.object
    },
    render: function() {
        const borderWidthPx= 0;
        const style = {
            position: 'absolute',
            padding : 0,
            margin  : 0,
            left    : geometry.tableXOffset+geometry.tableBorder,
            top     : geometry.tableYOffset+geometry.tableBorder,
            width   : geometry.tableWidth,
            height  : geometry.tableHeight,
            borderWidth: 1,
            zIndex  : 1,
            background:  'rgba(215, 215, 215, 0.0)',
            color: 'black',
            border: `${borderWidthPx}px solid red`,
            pointerEvents: 'none'
        };
        let svg = null;
        if ((this.props.move!=null) && (this.props.move instanceof BoardMove)) {
            const pA: Point = this.props.move.vector.from;
            const pB: Point = this.props.move.vector.to;
            let directions = prepareLineDirections(pA, pB);
            svg = (
                <svg width="100%" height="100%">
                <defs>
                <marker id="arrow" markerWidth="30" markerHeight="30" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
                <path d="M0 0 L0 3 L3 1.5 z" fill="rgba(255,0,255,0.6)" />
                </marker>
                </defs>
                
                <path d={directions} stroke="rgba(255,0,255,0.6)"
                strokeWidth="10" fill="none"
                markerEnd="url(#arrow)" 
                />
                </svg>
            );
        }

        if (true)
        return (<div style={style}>
                {svg}
                </div>
               );
        else return (
                <div style={style}>
                <svg height="400" width="450">
                <defs>
                <marker id="arrow" markerWidth="300" markerHeight="300" refx="0" refy="0" orient="auto" markerUnits="strokeWidth" >
<circle fill="red" cx="0" cy="0" r="3"/>
                </marker>
                </defs>
                
                <path d="M 30 30 l 100 200" stroke="rgb(255,0,255)"
            strokeWidth="10" fill="none"
            markerEnd="url(#arrow)" 
                />
                </svg>
                </div>
        );
    }
});


export default ArrowsPlane;

