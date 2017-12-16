/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {geometry}  from './geometry.js';
require('./help-wizard.css');

const HelpWizard = React.createClass({
    propTypes: {
        enabled    : React.PropTypes.bool.isRequired,
        closeHelp  : React.PropTypes.func.isRequired        
    },
    getInitialState: function() {
        return {
            page: 0
        };
    },
    prev: function(se) {
        this.setState({page: this.state.page-1});
    },    
    next: function() {
        this.setState({page: this.state.page+1});
    },
    closeHelp: function() {
        this.setState({page: 0});
        this.props.closeHelp();
    },
    render: function() {
        const borderWidthPx= 5;
        const paddingPx    = 8;
        const style = {
            position: 'absolute',
            padding : 0,
            margin  : 0,
            left    : geometry.tableXOffset,
            top     : geometry.tableYOffset-30-20, // this is the top of the message panel
            width   : geometry.tableWidth+2*geometry.tableBorder-2*paddingPx-2*borderWidthPx,
            height  : geometry.tableHeight+2*geometry.tableBorder+40+30+20+3-2*borderWidthPx, // I don't get the +3 part, it remains a mystery, on the next game I should be more rigid with my geometry and should work everything out well in advance
            borderWidth: 1,
            zIndex  : this.props.enabled?2:-1,
            background:  'rgba(215, 215, 215, 1.0)',
            color: 'black',
            fontSize: '1em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            border: `${borderWidthPx}px solid blue`,
            padding: `${paddingPx}px`
        };
        const buttonDivStyle = {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 'auto' // it's weird that this works, but work it does, see: https://stackoverflow.com/a/33924704/274677
        };
        const giraffeOneSquareAhead = require('./resources/giraffe-one-square-ahead.png');
        const dropOfCapturedChick   = require('./resources/drop-of-captured-chick.png'  );
        const chickPromotedToHen    = require('./resources/chick-promotion-to-hen.png'  );

        function scaledImageStyle(scale) {
            return {
                position: 'relative',
                border: '0',
                transform: `scale(${scale})`
            };
        }
        const pages = [(
                <div>
                    <h1>About the game</h1>
                    <p>
                        <i>Let's Catch the Lion</i> is a simplified version of the
                        Japanese game of <i>Shogi</i>. Wikipedia has nice
                        articles on both &nbsp;<a className='help-link' target="_blank" href='https://en.wikipedia.org/wiki/Shogi'>Shogi</a>
                          &nbsp;and
                        &nbsp;<a className='help-link' target="_blank" href='https://en.wikipedia.org/wiki/D%C5%8Dbutsu_sh%C5%8Dgi'>Let's catch the Lion</a> which lazy slobs like you are unlikely to read.
                </p>
                <p>
                It's precisely because of your indolence that I now have to prepare all these boring help pages!</p>
                <p>So let's get down to business.</p>
<p><i>Shogi</i>, as well as <i>Let's Catch the Lion</i>, are very similar to Chess with a few important differences.
                </p>
                <p>
                In contrast to Chess, the captured pieces switch sides and can be used against
their former owner. As such, pieces are not painted black or white but are rather rotated to denote side. I.e.
their orientation is used to show which side controls them.
                    </p>
                    <p>
                      One side is called "Black" and the other is called "White" (even though the pieces are
                                                                                  not painted).
                </p>
                <p>
                     In another departure from Chess, Black moves first. The idea is
                      that Black is the userper or rebel, and thus gets to make the first move against
                      the lawful king (White). 
                    </p>
                    <p>
                In this application, you only get to play Black because I want to move
            on to other projects.
                    </p>
                    <p>
                        Click "Next" to learn how to play.
                    </p>
                </div>
        ),
(
<div>
    <h1>Object of the game</h1>
    <div>
    You win the game by one of the following two ways:
    <ul>
        <li>by capturing the enemy Lion</li>
        <li>by advancing your own Lion to the far side of the board provided it does not end in check.</li>
    </ul>
    </div>
    <div>
    Note that there is no Chess-style stalemate. If one side has run out of pieces (or moves) 
and is forced to move the Lion to a square where it is immediately captured, then the game is a Win for the other side,
not a tie (as it would be in Chess).
    </div>
</div>
        ),
(<div>
<h1>Moving your pieces</h1>
 <div>To move one of your pieces you have to:
    <ul>
        <li>select it by clicking on it (at that point squares eligible to move into will be highlighted)</li>
        <li>click on one of the eligible squares for your piece to move into</li>
     </ul>
 Sorry, no drag and drop.
</div>
 <p>All pieces move a single square at a time and cannot (as you might expect) move into a square occupied
by a friendly piece. Red dots printed on each piece's tile indicate possible directions of movement.
</p>
<p>E.g. the giraffe in the position below may only move into the highlighted
            square ahead of it:</p>
             <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
               <img style={scaledImageStyle(0.8)} src={giraffeOneSquareAhead}/>
            </div>
    
</div>
),                                                                            
(
    <div>
        <h1>Capturing enemy pieces</h1>
        <p>Enemy pieces are captured simply by moving one of your own pieces into the square they occupy.
        Captured pieces switch sides and are placed in your capture tray. From there, you may drop them
(on your next move) into any empty square, except for the last row on the far side.
        </p>
        <p>
        As captured pieces may only be dropped onto empty squares you cannot capture with a drop
allthough you are allowed to give check (in normal <i>Shogi</i> dropped pieces are not allowed to give check).
        </p>
        <div>
        So a move in <i>Let's Catch the Lion</i> consists of either:
          <ul>
             <li>moving a piece that's already on the board, or</li>
             <li>dropping a captured piece onto the board</li>
          </ul>
        </div>
        <p>
            You <b>must</b> always make a move, even if doing so would result in your Lion be placed in Check. As already explained,
            that would result in a Win for the other side.
        </p>
     </div>
),
(
     <div>                                                                                
        <h1>Capturing enemy pieces (continued)</h1>
        <p>
       E.g. in the position below you have captured the enemy Chicken which you may now drop
    onto any of the highlighted empty squares:
        </p>
             <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                 <img style={scaledImageStyle(1.0)} src={dropOfCapturedChick}/>
            </div>        
    </div>
)
,
(
     <div>                                                                                
        <h1>Promotion</h1>
        <p>
If a Chicken reaches the far side of the board then it is promoted to a much more powerful
Hen. Despite its humble appearance, the Hen is actually the strongest piece in the game after the Lion.
        </p>
<p>In the below position our Chicken managed to reach the far side of the board
and was promoted to a mighty Hen!
</p>
         <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
             <img style={scaledImageStyle(0.8)} src={chickPromotedToHen}/>
        </div>
    <div>
        Note that if the Hen is captured (and switches sides) it's demoted back to Chicken.
    </div>
    </div>
)

];
        function styleForDynamicallyDisabledLink(disabled) {
            return cx({
                'special-link': true,
                'special-link-disabled':disabled
            });
        }
        const prevStyle = styleForDynamicallyDisabledLink(this.state.page === 0             );
        const nextStyle = styleForDynamicallyDisabledLink(this.state.page === pages.length-1);
        const self = this;
        return (<div style={style} className={'help-wizard'}>
                    {pages[this.state.page]}
                    <div style={buttonDivStyle}>
                        <a className={prevStyle}    onClick={this.prev       }>&nbsp;Prev  &nbsp;</a>
                        <a className='special-link' onClick={this.closeHelp  }>&nbsp;Close &nbsp;</a>
                        <a className={nextStyle}    onClick={this.next       }>&nbsp;Next  &nbsp;</a>
                    </div>
                </div>
                );
    }
});


export default HelpWizard;

