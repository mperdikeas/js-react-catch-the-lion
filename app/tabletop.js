/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {Point} from 'geometry-2d';
import {createChainableTypeChecker} from 'react-chainable-type-checker';

import {Chick, Hen, Elephant, Giraffe, Lion} from 'ai-for-shogi-like-games';
import {createPieceSet}                      from 'ai-for-shogi-like-games';
import {PieceOnSide}                         from 'ai-for-shogi-like-games';
import {CaptureBag}                          from 'ai-for-shogi-like-games';
import {GameBoard}                           from 'ai-for-shogi-like-games';

import {Geometry}  from './geometry.js';
import {arrayOfPoints} from './custom-react-validators.js';
import MovingSide from './moving-side.js';

import Board     from './board.js';

const TableTop = React.createClass({
    propTypes: {
        geometry          : React.PropTypes.instanceOf(Geometry) .isRequired,
        gameBoard         : React.PropTypes.instanceOf(GameBoard).isRequired,
        movingSide        : React.PropTypes.instanceOf(MovingSide).isRequired,
        selectedPiece     : React.PropTypes.instanceOf(Point),
        selectPiece       : React.PropTypes.func.isRequired,
        moveToCell       : React.PropTypes.func.isRequired                   
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
                    movingSide={this.props.movingSide}
                    selectedPiece={this.props.selectedPiece}
                    selectPiece={this.props.selectPiece}
                    moveToCell    = {this.props.moveToCell}                        
                />
            </div>                
        );
    }
});

export default TableTop;

