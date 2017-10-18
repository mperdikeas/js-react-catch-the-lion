/* @flow */
const     _ = require('lodash');
const utils = require('./scripts/util.js');
const     $ = require('jquery');
import React    from 'react';
import ReactDOM from 'react-dom';


$(document).ready(doStuff);

import Game from './game.js';

let key = 0; // https://stackoverflow.com/a/21750576/274677

function doStuff(): void {
    ReactDOM.render( (
            <Game key={key++} reset={doStuff}/>
    ) , $('#app')[0]);

}
