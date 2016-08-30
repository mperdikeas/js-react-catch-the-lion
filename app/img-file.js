/* @flow */
'use strict';
require('./css/style.css');
const     _ = require('lodash');
var      cx = require('classnames');

import assert from 'assert';



const piecesInGame: Map<string, string> = new Map();
piecesInGame.set('c', 'chick.png');
piecesInGame.set('l', 'lion.png');
piecesInGame.set('h', 'hen.png');
piecesInGame.set('g', 'giraffe.png');
piecesInGame.set('e', 'elephant.png');

function imgFile(c: string) {
    return piecesInGame.get(c);
}


export default imgFile;

