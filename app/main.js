/* @flow */
const     _ = require('lodash');
const utils = require('./scripts/util.js');
const     $ = require('jquery');
import React    from 'react';
import ReactDOM from 'react-dom';


$(document).ready(doStuff);

import Game from './game.js';

function doStuff(): void {

    ReactDOM.render( (
            <Game/>
    ) , $('#app')[0]);

}
