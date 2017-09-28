/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Geometry}  from './geometry.js';
import {Point}     from 'geometry-2d';
import MovingSide                    from './moving-side.js';
import {PieceInformation}            from './piece-information.js';

require('./piece-block.css');
const PieceBlock = React.createClass({
    propTypes: {
        point            : React.PropTypes.instanceOf(Point).isRequired,
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
            top: '50%',
            left: '50%',
            maring: 'auto',
            marginLeft: `-${this.props.pieceWidth/2}px`,
            marginTop: `-${this.props.pieceHeight/2}px`,            
            borderWidth: `${imgBorder}px`,
            borderColor: this.props.pieceInformation.sideOfThisPiece===MovingSide.BLACK?'black':'white',
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
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}                        
            onClick={()=>{
                if (this.props.pieceInformation!=null) {
                    if (this.props.pieceInformation.belongsToTheMovingSide())
                        this.props.selectPiece(this.props.point);
                }
                else
                    throw new Error('impossible for an img to not have pieceInformation');
                
            }}
                />
        );
    }
});


export default PieceBlock;

