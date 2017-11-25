/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import MovingSide from './moving-side.js';
require('./game-control-panel.css');

const GameControlPanel = React.createClass({
    propTypes: {
        aiSide            : React.PropTypes.instanceOf(MovingSide),
        movingSide        : React.PropTypes.instanceOf(MovingSide),
        winner            : React.PropTypes.instanceOf(MovingSide),
        showNewGameDialog : React.PropTypes.func.isRequired,
        showHelpWizard    : React.PropTypes.func.isRequired        
    },
    i: 1,
    render: function() {
        function styleForLinksF(enabled) {
            return cx({
                'special-link': true,
                'special-link-disabled':!enabled
            });
        }
        const linksEnabled = (this.props.aiSide!==this.props.movingSide)||(this.props.winner!==null);
        const styleForLinks = styleForLinksF(linksEnabled);
        console.log(`rendering control panel with style for links: ${styleForLinks}`);
        const style = {backgroundColor: '#7f8c8d', color: 'blue', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'};
        const mainGameControlText = this.props.winner===null?'Give up on this Herculean task':'new game';
        if (linksEnabled) // sse-1511571523
            return (<div id={this.i++} className='mjb44-game-control-panel__div' style={style}>
                <a className={styleForLinks} onClick={this.props.showNewGameDialog}>&nbsp;{mainGameControlText}&nbsp;</a>
                <a className={styleForLinks} onClick={this.props.showHelpWizard}>&nbsp;Help&nbsp;</a>
                 </div>
               );
        else return (null); /* see sse-1511571523. For some weird reason I can't get the buttons to display with the special-link-disabled status.
                               Accordingly, when they are disabled I don't display the component at all. Set the boolean if in 
                               sse-1511571523 to [true] to see the bug.
                             */
    }
});


export default GameControlPanel;

