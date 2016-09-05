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
        x                : React.PropTypes.number.isRequired,
        y                : React.PropTypes.number.isRequired,
        value            : React.PropTypes.node, // TODO: I don't think this is needed anymore
        width            : React.PropTypes.number.isRequired,
        height           : React.PropTypes.number.isRequired,
        border           : React.PropTypes.number.isRequired,
        pieceWidth       : React.PropTypes.number.isRequired,
        pieceHeight      : React.PropTypes.number.isRequired,
        pieceBorder      : React.PropTypes.number.isRequired,        
        pieceInformation : React.PropTypes.instanceOf(PieceInformation),
        imgIsSelected    : React.PropTypes.bool,
        movableHighlight : React.PropTypes.bool.isRequired,
        selectPiece      : React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {isHovering: false};
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
        
    onMouseOver() {
        if (this.props.pieceInformation && this.props.pieceInformation.belongsToTheMovingSide())
            this.setState({isHovering: true});
    },
    onMouseOut() {
        this.setState({isHovering: false});
    },
    render: function() {
        console.log(`rendering cell ${this.props.x}-${this.props.y}: ${this.props.movableHighlight}, imgIsSelected=${this.props.imgIsSelected}`);
        const style = {
            boxSizing: 'border-box',
            position: 'static',
            display: 'inline-block',
            padding: 0,
            margin: 0,
            width : this.props.width,
            height: this.props.height,
            borderStyle: 'solid',
            borderWidth: `${this.props.border}px`,
//            border: `${this.props.border}px solid grey`,
            background: 'transparent',
            fontSize: 0,         // https://css-tricks.com/fighting-the-space-between-inline-block-elements/
            verticalAlign: 'top' // http://stackoverflow.com/q/39229068/274677
        };
        const pieceBlock = (()=>{
            if (this.props.pieceInformation!=null) {
                if (this.props.imgIsSelected!=null) {
                    return (
                        <PieceBlock
                        x={this.props.x}
                        y={this.props.y}
                        width={this.props.width}
                        height={this.props.height}
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
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}            
                >
                {pieceBlock}
                </div>                
        );
    }
});


export default Cell;

