/* @flow */
'use strict';
require('./css/style.css');
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Geometry, geometry}  from './geometry.js';
const {GameBoard} = require('../modules/block-optimization/es5/board-lib.js');

const {Chick, Hen, Elephant, Giraffe, Lion} = require('../modules/block-optimization/es5/piece-set.js');
const {createPieceSet}                      = require('../modules/block-optimization/es5/piece-set-factory.js');
const {PieceOnSide}                         = require('../modules/block-optimization/es5/piece.js');
const {CaptureBag}                          = require('../modules/block-optimization/es5/captureBag.js');



import TableTop     from './tabletop.js';

function createStartingBoard() {
    const pieceSet = createPieceSet([Chick, Hen, Elephant, Giraffe, Lion]);
    const notation: string  = 'c@1~3, e@0~4, l@1~4, g@2~4 * g@0~0, l@1~0, e@2~0, c@1~1';
    const cb = new CaptureBag();
    cb.capture(new PieceOnSide(Elephant, true));
    cb.capture(new PieceOnSide(Giraffe, false));                            
    const gb = GameBoard.create(3, 5, true, 0, pieceSet, notation, cb);
    console.log(gb.toStringFancy());
    return gb;
}

const Game = React.createClass({
    getInitialState: function() {
        return {
            gameBoard: createStartingBoard()
        };
    },
    render: function() {
        console.log('rendering game');
        const style = {
            position: 'absolute',
            padding : 0,
            margin  : 0,
            left    : geometry.gameXOffset,
            top     : geometry.gameYOffset,
            width   : geometry.gameWidth,
            height  : geometry.gameHeight,
            background: 'white'
        };
        return (
            <div style={style}>
                <TableTop
                    geometry={geometry}
                    gameBoard={this.state.gameBoard}
                />
            </div>                
        );
    }
});

export default Game;

