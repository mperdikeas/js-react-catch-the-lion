/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Geometry}  from './geometry.js';
import {Point}     from 'geometry-2d';
import MovingSide                    from './moving-side.js';
import {PieceInformation}            from './piece-information.js';
import PieceBlock                    from './piece-block.js';
require('./cell.css');
const Cell = React.createClass({
    propTypes: {
        point            : React.PropTypes.instanceOf(Point).isRequired,
        width            : React.PropTypes.number.isRequired,
        height           : React.PropTypes.number.isRequired,
        border           : React.PropTypes.number.isRequired,
        pieceWidth       : React.PropTypes.number.isRequired,
        pieceHeight      : React.PropTypes.number.isRequired,
        pieceBorder      : React.PropTypes.number.isRequired,        
        pieceInformation : React.PropTypes.instanceOf(PieceInformation),
        imgIsSelected    : React.PropTypes.bool,
        movableHighlight : React.PropTypes.bool.isRequired,
        involvedInLastMove:React.PropTypes.bool.isRequired,
        selectPiece      : React.PropTypes.func.isRequired,
        moveToCell       : React.PropTypes.func.isRequired
    },
    shouldComponentUpdate(nextProps: any, nextState: any) {
        const b1: boolean = JSON.stringify(nextProps)!==JSON.stringify(this.props);
        if (b1) 
            return true;
        const b2: boolean = JSON.stringify(nextState)!==JSON.stringify(this.state);
        if (b2 && (this.props.pieceInformation))
            return true;
        return false;
    },
    onClick: function() {
        if (false)
            console.log(`clicked on cell: ${this.props.point.toString()}`);
        if (this.props.movableHighlight)
            this.props.moveToCell(this.props.point);
    },
    render: function() {
        if (false)
            console.log(`rendering cell ${this.props.point.toString()}: ${this.props.movableHighlight}, imgIsSelected=${this.props.imgIsSelected}`);
        const style = {
            boxSizing: 'border-box',
            position: 'static',
            display: 'inline-block',
            padding: 0,
            margin: 0,
            width : this.props.width,
            height: this.props.height,
            borderStyle: 'solid',
            borderWidth: this.props.involvedInLastMove?'0':`${this.props.border}px`, // this is done to highlight movement hint
            background: this.props.involvedInLastMove?'rgba(54, 25, 25, .5)':'transparent',
            fontSize: 0,         // https://css-tricks.com/fighting-the-space-between-inline-block-elements/
            verticalAlign: 'top' // http://stackoverflow.com/q/39229068/274677
        };
        const pieceBlock = (()=>{
            if (this.props.pieceInformation!=null) {
                if (this.props.imgIsSelected!=null) {
                    return (
                        <PieceBlock
                        point={this.props.point}
                        border={this.props.border}
                        pieceWidth={this.props.pieceWidth}
                        pieceHeight={this.props.pieceHeight}
                        pieceBorder={this.props.pieceBorder}
                        pieceInformation={this.props.pieceInformation}
                        imgIsSelected={this.props.imgIsSelected}
                        selectPiece={this.props.selectPiece}
                        />
                    );
                } else throw new Error('bug: if imgFrameOrnt is not null, then imgIsSelected must have a value');
            } else
                return null;
        })();
        return (
                <div
                    className={cx({movableHighlight:this.props.movableHighlight})}
                    style={style}
                    onClick={()=>{this.onClick();}}
                >
                {pieceBlock}
                </div>                
        );
    }
});


export default Cell;

