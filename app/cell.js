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
        height    : React.PropTypes.number.isRequired
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
            border: '1px solid grey',
            background: 'pink'
        };
        
        return (
                <div style={style}>
                {JSON.stringify(this.props.value)}
                </div>                
        );
    }
});

export default Cell;

