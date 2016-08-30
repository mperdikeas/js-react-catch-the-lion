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
    cellWidth: number; // includes the cellBorder
    cellHeight: number; // includes the cellBorder
    cellBorder: number;

    pieceWidth: number; // includes the pieceBorder
    pieceHeight: number; // includes the pieceBorder
    pieceBorder: number; 
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
                cellWidth: number,
                cellHeight: number,
                cellBorder: number,
                pieceWidth: number,
                pieceHeight: number,
                pieceBorder: number
               ) {
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
                   this.cellWidth = cellWidth;
                   this.cellHeight = cellHeight;
                   this.cellBorder = cellBorder;
                   this.pieceWidth = pieceWidth;
                   this.pieceHeight = pieceHeight;
                   this.pieceBorder = pieceBorder;
                   this.assert();
               }
    boardWidthWithBorder(): number {
        return this.boardWidthWithoutBorder() + 2*this.boardBorderHoriz;
    }
    boardWidthWithoutBorder(): number {
        return this.X*this.cellWidth;
    }
    boardHeightWithBorder(): number {
        return this.boardHeightWithoutBorder()+2*this.boardBorderVertic;
    }
    boardHeightWithoutBorder(): number {
        return this.Y*this.cellHeight;
    }    
    
    assert(): void {
        const gameBox: Rectangle = new Rectangle(new Point(0,0), new Point(this.gameWidth, -this.gameHeight));
        const board  : Rectangle = Rectangle.topLeftWidthHeight(new Point(this.boardXOffset, -this.boardYOffset), this.boardWidthWithBorder(), this.boardHeightWithBorder());
        console.log(board);
        assert(gameBox.containsRectangle(board, false));
        assert(this.pieceWidth <=this.cellWidth -2*this.cellBorder);
        assert(this.pieceHeight<=this.cellHeight-2*this.cellBorder);        
                     
    }
}

const geometry = new Geometry(1, 30, 300, 300,       //  game params
                              100, 100, 5, 5, 3, 5,  // board params
                              50, 30, 1,             //  cell params
                              40, 20, 3
                             );

exports.Geometry = Geometry;
exports.geometry = geometry;


