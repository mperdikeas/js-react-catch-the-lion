/* @flow */
'use strict';
import assert from 'assert';
import _      from 'lodash';
import React  from 'react';
//const     _ = require('lodash');
//const React = require('react');
var      cx = require('classnames');


const CaptureBox = React.createClass({
    propTypes: {
        xOffset          : React.PropTypes.number.isRequired,
        yOffset          : React.PropTypes.number.isRequired,
        X                : React.PropTypes.number.isRequired,
        Y                : React.PropTypes.number.isRequired,
        border           : React.PropTypes.number.isRequired,
        cellWidth        : React.PropTypes.number.isRequired,
        cellHeight       : React.PropTypes.number.isRequired
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
            border    : `${this.props.border}px solid black`,
            background: 'green',
            fontSize  : 0
        };
        return (
                <div style={style}>
                </div>                
        );
    }
});

export default CaptureBox;

