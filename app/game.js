/* @flow */
'use strict';
require('./css/style.css');
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {GameBoard} from '../modules/block-optimization/es5/index.js';

const Game = React.createClass({
    propTypes: {
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    },
    render: function() {
        return (
                <b>this is going to be awesome</b>
        );
    }
});

export default Game;

