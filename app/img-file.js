/* @flow */
'use strict';
const     _ = require('lodash');
var      cx = require('classnames');

import assert from 'assert';



const piecesInGame: Map<string, string> = new Map();
piecesInGame.set('c', 'chick.png');
piecesInGame.set('l', 'lion.png');
piecesInGame.set('h', 'hen.png');
piecesInGame.set('g', 'giraffe.png');
piecesInGame.set('e', 'elephant.png');

function imgFile(c: string): string {
    const rv : ?string = piecesInGame.get(c);
    if (rv!=null)
        return rv;
    else
        throw new Error(`I was asked to provide the image for non-existent piece: [${c}]`);
}


export default imgFile;

