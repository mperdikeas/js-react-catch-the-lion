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

    capturedX: number;
    capturedY: number;
    capturedBorder: number;

    capturedWhiteXOffset: number; // offsets from table box
    capturedWhiteYOffset: number;

    whiteControlXOffset : number; // offsets from table box
    whiteControlYOffset : number;
    whiteControlWidth   : number;
    whiteControlHeight  : number;
    
    capturedBlackXOffset: number; // offsets from table box
    capturedBlackYOffset: number;

    blackControlXOffset : number; // offsets from table box
    blackControlYOffset : number;
    blackControlWidth   : number;
    blackControlHeight  : number;

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

                capturedX: number,
                capturedY: number,
                capturedBorder: number,

                capturedWhiteXOffset: number,
                capturedWhiteYOffset: number,

                whiteControlXOffset : number,
                whiteControlYOffset : number,
                whiteControlWidth   : number,
                whiteControlHeight  : number,
                
                capturedBlackXOffset: number,
                capturedBlackYOffset: number,

                blackControlXOffset : number,
                blackControlYOffset : number,
                blackControlWidth   : number,
                blackControlHeight  : number,

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

                   this.capturedX = capturedX;
                   this.capturedY = capturedY;
                   this.capturedBorder = capturedBorder;
                   this.capturedWhiteXOffset = capturedWhiteXOffset;
                   this.capturedWhiteYOffset = capturedWhiteYOffset;

                   this.whiteControlXOffset = whiteControlXOffset;
                   this.whiteControlYOffset = whiteControlYOffset;
                   this.whiteControlWidth = whiteControlWidth;
                   this.whiteControlHeight = whiteControlHeight;
                   
                   this.capturedBlackXOffset = capturedBlackXOffset;
                   this.capturedBlackYOffset = capturedBlackYOffset;

                   this.blackControlXOffset = blackControlXOffset;
                   this.blackControlYOffset = blackControlYOffset;
                   this.blackControlWidth = blackControlWidth;
                   this.blackControlHeight = blackControlHeight;
                   
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
        return this.tableWidth + 2*this.tableBorder;
    }
    tableHeightWithBorder(): number {
        return this.tableHeight + 2*this.tableBorder;
    }
    captureBoxWidthWithoutBorder(): number {
        return this.capturedX*this.cellWidth;
    }
    captureBoxWidthWithBorder(): number {
        return this.captureBoxWidthWithoutBorder()+2*this.capturedBorder;
    }
    captureBoxHeightWithoutBorder(): number {
        return this.capturedY*this.cellHeight;
    }
    captureBoxHeightWithBorder(): number {
        return this.captureBoxHeightWithoutBorder()+2*this.capturedBorder;
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
        const tableBox : Rectangle =  Rectangle.topLeftWidthHeight(new Point(this.tableXOffset, -this.tableYOffset)
                                                                   , this.tableWidthWithBorder()
                                                                   , this.tableHeightWithBorder());
        const capturedWhite: Rectangle = Rectangle.topLeftWidthHeight(tableBox.fourCorners().topLeft
                                                                      .add(new Point(this.tableBorder, -this.tableBorder))
                                                                      .add(new Point(this.capturedWhiteXOffset, -this.capturedWhiteYOffset))
                                                                      , this.captureBoxWidthWithBorder()
                                                                      , this.captureBoxHeightWithBorder());

        const capturedBlack: Rectangle = Rectangle.topLeftWidthHeight(tableBox.fourCorners().topLeft
                                                                      .add(new Point(this.tableBorder, -this.tableBorder))
                                                                      .add(new Point(this.capturedBlackXOffset, -this.capturedBlackYOffset))
                                                                      , this.captureBoxWidthWithBorder()
                                                                      , this.captureBoxHeightWithBorder());        
        
        const boardBox : Rectangle = Rectangle.topLeftWidthHeight(tableBox.fourCorners().topLeft
                                                                  .add(new Point(this.tableBorder, -this.tableBorder))
                                                                  .add(new Point(this.boardXOffset, -this.boardYOffset))
                                                                  , this.boardWidthWithBorder()
                                                                  , this.boardHeightWithBorder());
        assert(gameBox .containsRectangle(tableBox, false));
        assert(tableBox.containsRectangle(capturedWhite, false));
        assert(tableBox.containsRectangle(capturedBlack, false));
        assert(tableBox.containsRectangle(boardBox, false));
        assert(this.pieceWidth <=this.cellWidth -2*this.cellBorder);
        assert(this.pieceHeight<=this.cellHeight-2*this.cellBorder);        
                     
    }
}

const geometry = new Geometry(0, 0, 900, 900,       // game params
                              100, 100, 650, 450, 10, // table params
                              2, 3, 5,                // captured params
                              10, 20,                 // captured white offset
                              470, 30, 160, 34,       // white control block
                              465, 180,               // captured black offset
                              20, 395, 160, 34,       // black control block                              
                              200, 20, 5, 5, 3, 5,    // board params
                              80, 80, 1,              // cell params
                              70, 70, 5               // piece params
                             );

exports.Geometry = Geometry;
exports.geometry = geometry;


