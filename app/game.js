/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import assert from 'assert';
import TimerMixin    from 'react-timer-mixin';
import {Point, Vector} from 'geometry-2d';

import {GameBoard}                           from 'ai-for-shogi-like-games';
import {Chick, Hen, Elephant, Giraffe, Lion} from 'ai-for-shogi-like-games';
import {createPieceSet}                      from 'ai-for-shogi-like-games';
import {PieceOnSide}                         from 'ai-for-shogi-like-games';
import {CaptureBag}                          from 'ai-for-shogi-like-games';
import {bestMove}                            from 'ai-for-shogi-like-games';
import {model000}                            from 'ai-for-shogi-like-games';
import {Move, BoardMove, DropMove, DropMoveNoPieceInformation}  from 'ai-for-shogi-like-games';

import {Geometry, geometry}  from './geometry.js';
import MovingSide            from './moving-side.js';
import MessagePanel          from './message-panel.js';
import GameControlPanel      from './game-control-panel.js';
import {PointInBoardOrCaptureBoard} from './point-in-board-or-capture-box.js';

import TableTop              from './tabletop.js';
import NewGameDialog         from './new-game-dialog.js';
import HelpWizard            from './help-wizard.js';
import ArrowsPlane           from './arrows-plane.js';
import {sounds}              from './sounds.js';

const PIECE_SET = [Chick, Hen, Elephant, Giraffe, Lion];
const pieceSet  = createPieceSet(PIECE_SET);

function createStartingBoard() {
    const notation: string  = 'c@1~3, e@0~4, l@1~4, g@2~4 * g@0~0, l@1~0, e@2~0, c@1~1';
    const cb = new CaptureBag();
    const gb = GameBoard.create(3, 5, true, 1, pieceSet, notation, cb);
    if (false) console.log(gb.toStringFancy());
    return gb;
}

type StateT = {gameBoard: GameBoard, movingSide: MovingSide, winner: ?MovingSide, selectedPiece: ?PointInBoardOrCaptureBox, lastMove: ?Move, displayNewGameDialog: boolean, showHelpWizard: boolean};



const Game = React.createClass({
    propTypes: {
        reset        : React.PropTypes.func.isRequired
    },    
    mixins: [TimerMixin],
    getInitialState: function(): StateT {
        const gameStartedMS = (new Date()).getTime();
        return {
            gameBoard            : createStartingBoard(),
            aiSide               : MovingSide.WHITE, // A.I. side
            movingSide           : MovingSide.BLACK,
            winner               : null,
            selectedPiece        : null,
            lastMove             : null,
            displayNewGameDialog : false,
            showHelpWizard       : false
        };
    },
    componentDidMount() {
        if (sounds.currentlyPlaying.sound!==null) {
            sounds.currentlyPlaying.sound.stop();
            sounds.currentlyPlaying.sound = null;
        }
        sounds.newGame();
    },
    shouldComponentUpdate(nextProps, nextState) {
        assert.equal(JSON.stringify(nextProps), '{}');
        if (nextState.gameBoard            !==  this.state.gameBoard           ) return true;
        if (nextState.aiSide               !==  this.state.aiSide              ) return true;
        if (nextState.movingSide           !==  this.state.movingSide          ) return true;
        if (nextState.winner               !==  this.state.winner              ) return true;
        if (nextState.selectedPiece        !==  this.state.selectedPiece       ) return true;
        if (nextState.displayNewGameDialog !==  this.state.displayNewGameDialog) return true;
        if (nextState.showHelpWizard       !==  this.state.showHelpWizard      ) return true;        
        return false;
    },
    componentDidUpdate(prevProps, prevState) {
        if ((this.state.movingSide !== prevState.movingSide) && (this.state.movingSide === this.state.aiSide)) {
            setTimeout( ()=> {
                const aiMove = bestMove(this.state.gameBoard, this.state.aiSide===MovingSide.BLACK, 3, model000, PIECE_SET);
                let nextBoard;
                sounds.moveAI();
                if (aiMove instanceof BoardMove) {
                    nextBoard = this.state.gameBoard.move(aiMove.vector.from, aiMove.vector.to);
                } else if (aiMove instanceof DropMove) {
                    nextBoard = this.state.gameBoard.drop(aiMove.pieceOnSide, aiMove.to);
                } else throw new Error();
                const winner: ?boolean = nextBoard.boardImmediateWinSide();
                if (winner!=null) {
                    this.setState({gameBoard: nextBoard,
                                   movingSide: this.state.aiSide.theOther(),
                                   selectedPiece: null,
                                   winner: MovingSide.fromWhetherIsSideA(winner),
                                   lastMove: aiMove
                                  });
                    sounds.defeat();
                } else {
                    this.setState({gameBoard: nextBoard,
                                   movingSide: this.state.aiSide.theOther(),
                                   selectedPiece: null,
                                   lastMove: aiMove
                                  });
                }
            }, 0);
        }
    },
    selectPiece: function(p: PointInBoardOrCaptureBox): void {
        if (this.state.selectedPiece!=null) {
            if (this.state.selectedPiece.equals(p)) {
                this.setState({selectedPiece: null});
                return;
            }
        }
        this.setState({selectedPiece: p});
    },
    moveToCell: function(p: Point): void {
        assert(this.state.movingSide===this.state.aiSide.theOther());
        if (this.state.lastTimeWhite===null)
            this.setState({lastTimeWhite: (new Date()).getTime()});
        const selectedPiece: ?PointInBoardOrCaptureBox = this.state.selectedPiece;
        if (selectedPiece!=null) {
            sounds.moveHuman();
            assert( this.state.gameBoard.isCellEmpty(p) || MovingSide.fromSide(this.state.gameBoard.sideOnCell(p))===this.state.movingSide.theOther());
            if (selectedPiece.captureBox===null) { // case A: normal board move
                const nextBoard: ?GameBoard = this.state.gameBoard.move(selectedPiece.point, p);
                if (nextBoard!=null) {
                    const winner: ?boolean = nextBoard.boardImmediateWinSide();
                    if (winner!=null) {
                        this.setState({gameBoard: nextBoard,
                                       movingSide: this.state.movingSide.theOther(),
                                       selectedPiece: null,
                                       lastMove: new BoardMove(new Vector(selectedPiece.point, p)),
                                       winner: MovingSide.fromWhetherIsSideA(winner)
                                      });
                        sounds.victory();
                    } else {
                        if (this.state.movingSide!=null) {
                            this.setState({gameBoard: nextBoard,
                                           movingSide: this.state.movingSide.theOther(),
                                           lastMove: new BoardMove(new Vector(selectedPiece.point, p)),
                                           selectedPiece: null
                                          });
                        } else
                            throw new Error('bug');
                    }
                } else
                    throw new Error(`bug - it should be impossible to call moveToCell on a point (${p.toString()}) that doesn't exist on the board`);
            } else {                               // case B: drop moves
                const piece: IConcretePiece = this.refs.tableTop.getPieceInCaptureBox(selectedPiece.captureBox, selectedPiece.point);
                const pieceOnSide: IConcretePieceOnSide = new PieceOnSide(piece, selectedPiece.captureBox.side.isSideA());
                const nextBoard: ?GameBoard = this.state.gameBoard.drop(pieceOnSide, p);
                const lastMove: DropMoveNoPieceInformation = new DropMoveNoPieceInformation(this.state.aiSide.theOther(), p);
                assert(nextBoard!=null);
                this.setState({gameBoard: nextBoard,
                               movingSide: this.state.movingSide.theOther(),
                               lastMove: lastMove,
                               selectedPiece: null
                              });
            }
        } else throw new Error(`bug - it should be impossible to call moveToCell when there is no selected piece`);
    },
    showNewGameDialog(): void {
        this.setState({displayNewGameDialog: true});
    },
    showHelpWizard(): void {
        this.setState({showHelpWizard: true});
    },
    closeHelp(): void {
        this.setState({showHelpWizard: false});
    },
    render: function() {

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

        const messagePanelStyle = {
            position: 'absolute',
            padding : 0,
            margin  : 0,
            left    : geometry.tableXOffset,
            top     : geometry.tableYOffset-30-20,
            width   : geometry.tableWidth+2*geometry.tableBorder,
            height  : 30,
            borderWidth: 1
        };

        const gameControlPanelStyle = {
            position: 'absolute',
            padding : 0,
            margin  : 0,
            left    : geometry.tableXOffset,
            top     : geometry.tableYOffset+geometry.tableHeight+geometry.tableBorder*2,
            width   : geometry.tableWidth+2*geometry.tableBorder,
            height  : 40,
            borderWidth: 1
        };
        return (
            <div style={style}>
                <NewGameDialog
                    enabled={this.state.displayNewGameDialog}
                    reset={this.props.reset}
                />
                <ArrowsPlane
                    move={this.state.lastMove}
                />
                <HelpWizard
                    enabled={this.state.showHelpWizard}
                    closeHelp={this.closeHelp}
                />                
                <div style={messagePanelStyle}>
                    <MessagePanel
                        aiSide    = {this.state.aiSide}
                        movingSide={this.state.movingSide}
                        // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow            
                        winner={this.state.winner}
                    />
                </div>
                <TableTop ref='tableTop'
                    geometry={geometry}
                    gameBoard={this.state.gameBoard}
                    movingSide={this.state.movingSide}
                    // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow
                    selectedPiece={this.state.selectedPiece}
                    lastMove={this.state.lastMove}
                    selectPiece={this.selectPiece}
                    moveToCell={this.moveToCell}
                    winner={this.state.winner}
                />
                <div style={gameControlPanelStyle}>
                    <GameControlPanel
            // $SuppressFlowFinding: this is a hack because Flow 0.27 doesn't understand optional React properties. TODO: fix this in a future version of Flow
                        aiSide={this.state.aiSide}
                        movingSide={this.state.movingSide}
                        winner={this.state.winner}
                        showNewGameDialog={this.showNewGameDialog}
                        showHelpWizard={this.showHelpWizard}
                    />
                </div>
            </div>
        );
    }
});

export default Game;

