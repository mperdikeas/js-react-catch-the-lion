/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Geometry}  from './geometry.js';
import {Point}     from 'geometry-2d';
import MovingSide                    from './moving-side.js';
import {PieceInformation}            from './piece-information.js';

require('./cell.css');
const PieceBlock = React.createClass({
    propTypes: {
        x                : React.PropTypes.number.isRequired,
        y                : React.PropTypes.number.isRequired,
        width            : React.PropTypes.number.isRequired,
        height           : React.PropTypes.number.isRequired,
        border           : React.PropTypes.number.isRequired,
        pieceWidth       : React.PropTypes.number.isRequired,
        pieceHeight      : React.PropTypes.number.isRequired,
        pieceBorder      : React.PropTypes.number.isRequired,        
        pieceInformation : React.PropTypes.instanceOf(PieceInformation).isRequired,
        imgIsSelected    : React.PropTypes.bool.isRequired,
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
        const s:string = `./resources/${this.props.pieceInformation.fname}`;
        // $SuppressFlowFinding: The parameter passed to require() must be a literal string.
        const imgSrc            = require(s);
        const imgWidth :number  = this.props.pieceWidth - 2*this.props.pieceBorder; 
        const imgHeight:number  = this.props.pieceHeight - 2*this.props.pieceBorder;
        const imgBorder:number  = this.props.pieceBorder;
        const imgStyle = {
            position: 'relative',
            top: `${(this.props.height-2*this.props.border-this.props.pieceHeight)/2}px`,
            left: `${(this.props.width-2*this.props.border-this.props.pieceWidth)/2}px`,
            borderWidth: `${imgBorder}px`,
            transform: `scaleY(${this.props.pieceInformation.sideOfThisPiece===MovingSide.BLACK?1:-1})`
        };
        return (
                <img className={cx({hovering:this.state.isHovering,
                                    selected:this.props.imgIsSelected
                                   })}
            style={imgStyle}
            width={imgWidth}
            height={imgHeight}
            src={imgSrc}
            onClick={()=>{
                if (this.props.pieceInformation!=null) {
                    if (this.props.pieceInformation.belongsToTheMovingSide())
                        this.props.selectPiece(new Point(this.props.x, this.props.y));
                }
                else
                    throw new Error('impossible for an img to not have pieceInformation');
                
            }}
                />
        );
    }
});


export default PieceBlock;

