/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Point} from 'geometry-2d';
import {Geometry}  from './geometry.js';
const {GameBoard} = require('../modules/block-optimization/es5/board-lib.js');

const {Chick, Hen, Elephant, Giraffe, Lion} = require('../modules/block-optimization/es5/piece-set.js');
const {createPieceSet}                      = require('../modules/block-optimization/es5/piece-set-factory.js');
const {PieceOnSide}                         = require('../modules/block-optimization/es5/piece.js');
const {CaptureBag}                          = require('../modules/block-optimization/es5/captureBag.js');



import Board     from './board.js';


const TableTop = React.createClass({
    propTypes: {
        geometry   : React.PropTypes.instanceOf(Geometry) .isRequired,
        gameBoard  : React.PropTypes.instanceOf(GameBoard).isRequired,
        selectedPiece: React.PropTypes.instanceOf(Point),
        selectPiece: React.PropTypes.func.isRequired
    },    
    render: function() {
        console.log('rendering tabletop');
        const style = {
            position: 'absolute',
            padding : 0,
            margin  : 0,
            left    : this.props.geometry.tableXOffset,
            top     : this.props.geometry.tableYOffset,
            width   : this.props.geometry.tableWidth,
            height  : this.props.geometry.tableHeight,
            border  : `solid ${this.props.geometry.tableBorder}px blue`,
            background: 'brown'
        };
        return (
            <div style={style}>
                <Board
                    geometry={this.props.geometry}
                    gameBoard={this.props.gameBoard}
                    selectedPiece={this.props.selectedPiece}
                    selectPiece={this.props.selectPiece}            
                />
            </div>                
        );
    }
});

export default TableTop;

