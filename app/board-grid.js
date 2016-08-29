/* @flow */
'use strict';
require('./css/style.css');
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Geometry}  from './geometry.js';
import Cell        from './cell.js';

const BoardGrid = React.createClass({
    propTypes: {
        width     : React.PropTypes.number.isRequired,
        height    : React.PropTypes.number.isRequired,
        X         : React.PropTypes.number.isRequired,
        Y         : React.PropTypes.number.isRequired,
        cellWidth : React.PropTypes.number.isRequired,
        cellHeight: React.PropTypes.number.isRequired
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
            background: 'yellow'
        };
        const cells: Array<React.Element> = [];
        for (let i = 0; i < this.props.X ; i++)
            for (let j = 0 ; j < this.props.Y ; j++)
                cells.push((
                        <Cell key={ JSON.stringify({x:{i}, y: {j}})}
                              x = {i}
                              y = {j}
                              value={`${i}-${j}`}
                              width={this.props.cellWidth}
                              height={this.props.cellHeight}
                        />
                        ));
        return (
                <div style={style}>
                {cells}
                </div>                
        );
    }
});

export default BoardGrid;

