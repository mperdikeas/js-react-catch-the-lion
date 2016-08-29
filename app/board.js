/* @flow */
'use strict';
require('./css/style.css');
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Geometry}  from './geometry.js';
import BoardGrid   from './board-grid.js';

const Board = React.createClass({
    propTypes: {
        geometry: React.PropTypes.instanceOf(Geometry).isRequired
    },
    render: function() {
        console.log('rendering board');
        const style = {
            boxSizing: 'content-box', // this is the standard and default in all but the accursed IE
            position: 'absolute',
            padding: 0,
            margin: 0,
            left: this.props.geometry.boardXOffset,
            top: this.props.geometry.boardYOffset,
            width : this.props.geometry.boardWidthWithoutBorder(),
            height: this.props.geometry.boardHeightWithoutBorder(),
            borderWidth: `${this.props.geometry.boardBorderVertic}px ${this.props.geometry.boardBorderHoriz}px`,
            borderStyle: 'solid',
            borderColor: 'black',
            background: 'brown'
        };
        return (
                <div style={style}>
                <BoardGrid
            width={this.props.geometry.boardWidthWithoutBorder()}
            height={this.props.geometry.boardHeightWithoutBorder()}
            X={this.props.geometry.X}
            Y={this.props.geometry.Y}
            cellWidth={this.props.geometry.boardCellWidth}
            cellHeight={this.props.geometry.boardCellHeight}
                />
                </div>                
        );
    }
});

export default Board;

