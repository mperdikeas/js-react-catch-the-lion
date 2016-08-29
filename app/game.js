/* @flow */
'use strict';
require('./css/style.css');
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Geometry, geometry}  from './geometry.js';
import Board     from './board.js';

const Game = React.createClass({
    render: function() {
        console.log('rendering game');
        const style = {
            position: 'absolute',
            padding: 0,
            margin: 0,
            left: geometry.gameXOffset,
            top: geometry.gameYOffset,
            width : geometry.gameWidth,
            height: geometry.gameHeight,
            background: 'white'
        };
        return (
            <div style={style}>
                <Board geometry={geometry}/>
            </div>                
        );
    }
});

export default Game;

