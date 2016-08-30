/* @flow */
'use strict';
require('./css/style.css');
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Geometry}  from './geometry.js';


const Cell = React.createClass({
    propTypes: {
        x         : React.PropTypes.number.isRequired,
        y         : React.PropTypes.number.isRequired,
        value     : React.PropTypes.node,
        width     : React.PropTypes.number.isRequired,
        height    : React.PropTypes.number.isRequired,
        border    : React.PropTypes.number.isRequired,
        imgFname  : React.PropTypes.string
    },
    render: function() {
        console.log(`rendering cell ${this.props.x}-${this.props.y}`);
        const style = {
            boxSizing: 'border-box',
            position: 'static',
            display: 'inline-block',
            padding: 0,
            margin: 0,
            width : this.props.width,
            height: this.props.height,
            border: `${this.props.border}px solid grey`,
            background: 'pink',
            fontSize: 0
        };

        const img = (()=>{
            console.log(`${this.props.x}-${this.props.y}=>${this.props.imgFname}`);
            if (this.props.imgFname!=null) {
                const s:string = `./resources/${this.props.imgFname}`;
                // $SuppressFlowFinding: The parameter passed to require() must be a literal string.
                const imgSrc            = require(s);
                const imgWidth :number  = this.props.width -2*this.props.border;
                const imgHeight:number  = this.props.height-2*this.props.border;
                const imgStyle = {
                    padding: 0,
                    margin: 0,
                    display: 'absolute',
                    top: 0,
                    left: 0
                };
                return (
                    <img style={imgStyle} width={imgWidth} height={imgHeight} src={imgSrc}/>
                );
            } else
                return null;
                })();
        return (
                <div style={style}>
                {img}
                </div>                
        );
    }
});

export default Cell;

