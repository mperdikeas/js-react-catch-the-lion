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

    tableXOffset: number; // offsets from game box
    tableYOffset: number;
    tableWidth: number;
    tableHeight: number;
    tableBorder: number;

    boardXOffset: number; // offsets from table box
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

                tableXOffset: number, // offsets from table box
                tableYOffset: number,
                tableWidth: number,
                tableHeight: number,
                tableBorder: number,

                boardXOffset: number, // offsets from table box
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

                   this.tableXOffset = tableXOffset;
                   this.tableYOffset = tableYOffset;
                   this.tableWidth = tableWidth;
                   this.tableHeight = tableHeight;
                   this.tableBorder = tableBorder;
                   
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
    tableWidthWithBorder(): number {
        console.log(`returning: ${this.tableWidth + 2*this.tableBorder}`);
        return this.tableWidth + 2*this.tableBorder;
    }
    tableHeightWithBorder(): number {
        console.log(`returning: ${this.tableHeight + 2*this.tableBorder}`);
        return this.tableHeight + 2*this.tableBorder;
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
        const gameBox  : Rectangle  =  new Rectangle(new Point(0,0), new Point(this.gameWidth, -this.gameHeight));
        const tableBox : Rectangle =  Rectangle.topLeftWidthHeight(new Point(this.tableXOffset, -this.tableYOffset), this.tableWidthWithBorder(), this.tableHeightWithBorder());
        const boardBox : Rectangle = Rectangle.topLeftWidthHeight(tableBox.fourCorners().topLeft.add(new Point(this.boardXOffset, -this.boardYOffset)), this.boardWidthWithBorder(), this.boardHeightWithBorder());
        console.log(boardBox);
        assert(gameBox .containsRectangle(tableBox, false));
        assert(tableBox.containsRectangle(boardBox, false));        
        assert(this.pieceWidth <=this.cellWidth -2*this.cellBorder);
        assert(this.pieceHeight<=this.cellHeight-2*this.cellBorder);        
                     
    }
}

const geometry = new Geometry(15, 30, 300, 300,       //  game params
                              10, 10, 250, 250, 3, // table params
                              20, 20, 5, 5, 3, 5,  // board params
                              75, 42, 1,             //  cell params
                              40, 20, 3
                             );

exports.Geometry = Geometry;
exports.geometry = geometry;


