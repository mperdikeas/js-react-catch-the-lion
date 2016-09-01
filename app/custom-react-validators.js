/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Point} from 'geometry-2d';
import {createChainableTypeChecker} from 'react-chainable-type-checker';

import {Geometry}  from './geometry.js';
const {GameBoard} = require('../modules/block-optimization/es5/board-lib.js');

const {Chick, Hen, Elephant, Giraffe, Lion} = require('../modules/block-optimization/es5/piece-set.js');
const {createPieceSet}                      = require('../modules/block-optimization/es5/piece-set-factory.js');
const {PieceOnSide}                         = require('../modules/block-optimization/es5/piece.js');
const {CaptureBag}                          = require('../modules/block-optimization/es5/captureBag.js');



import Board     from './board.js';

function arrayOfPoints(props, propName, componentName, location) {
    componentName = componentName || 'anonymous';
    const os = props[propName];
    if (os===null)
        return null;
    if (!Array.isArray(os))
        throw new Error( `${propName} passed in ${componentName} is not an array` );
    else {
        for (let i = 0 ; i < os.length ; i++) {
            const o = os[i];
            if (! (o instanceof Point))
                throw new Error(`The ${i}-th element of the array [${propName}] passed in ${componentName} is not a Point`);
        }
    }
    return null; // assume all OK
}


exports.arrayOfPoints = arrayOfPoints;