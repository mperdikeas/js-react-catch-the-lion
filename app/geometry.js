/* @flow */
'use strict';
const     _ = require('lodash');

import assert from 'assert';
import {Point, Rectangle} from 'geometry-2d';

class Geometry {
    gameXOffset: number; // offsets from application div: [#app]
    gameYOffset: number;
    gameWidth: number;
    gameHeight: number;
    
    boardXOffset: number; // offsets from game box
    boardYOffset: number;
    boardBorderHoriz: number;
    boardBorderVertic: number;
    X: number;
    Y: number;
    boardCellWidth: number; // includes the boardCellBorder
    boardCellHeight: number; // includes the boardCellBorder
    boardCellBorder: number;
    constructor(gameXOffset: number,
                gameYOffset: number,
                gameWidth: number,
                gameHeight: number,
                boardXOffset: number, // offsets from game box
                boardYOffset: number,
                boardBorderHoriz: number,
                boardBorderVertic: number,
                X: number,
                Y: number,
                boardCellWidth: number,
                boardCellHeight: number,
                boardCellBorder: number) {
        this.gameXOffset = gameXOffset;
        this.gameYOffset = gameYOffset;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    
        this.boardXOffset = boardXOffset;
        this.boardYOffset = boardYOffset;
        this.boardBorderHoriz = boardBorderHoriz;
        this.boardBorderVertic = boardBorderVertic;

        this.X = X;
        this.Y = Y;
        this.boardCellWidth = boardCellWidth;
        this.boardCellHeight = boardCellHeight;
        this.boardCellBorder = boardCellBorder;
        this.assert();
    }
    boardWidthWithBorder(): number {
        return this.boardWidthWithoutBorder() + 2*this.boardBorderHoriz;
    }
    boardWidthWithoutBorder(): number {
        return this.X*this.boardCellWidth;
    }
    boardHeightWithBorder(): number {
        return this.boardHeightWithoutBorder()+2*this.boardBorderVertic;
    }
    boardHeightWithoutBorder(): number {
        return this.Y*this.boardCellHeight;
    }    
    
    assert(): void {
        const gameBox: Rectangle = new Rectangle(new Point(0,0), new Point(this.gameWidth, -this.gameHeight));
        const board  : Rectangle = Rectangle.topLeftWidthHeight(new Point(this.boardXOffset, -this.boardYOffset), this.boardWidthWithBorder(), this.boardHeightWithBorder());
        console.log(board);
        assert(gameBox.containsRectangle(board, false));
                     
    }
}

const geometry = new Geometry(1, 30, 300, 300,             // game* params
                              100, 100, 5, 5, 3, 5, 50, 30,  // board* params
                              3// cell params
                             );

exports.Geometry = Geometry;
exports.geometry = geometry;


