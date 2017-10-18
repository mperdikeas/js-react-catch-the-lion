/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import MovingSide from './moving-side.js';
require('./game-control-panel.css');

const GameControlPanel = React.createClass({
    propTypes: {
        winner    : React.PropTypes.instanceOf(MovingSide),
        reset        : React.PropTypes.func.isRequired        
    },
    displayNewGameDialogAndResetEverything: function() {
        window.alert('A new game will now begun'); // TODO: use a fancy jquery modal dialog instead of window.alert
        this.props.reset();
    },
    render: function() {
        const style = {backgroundColor: '#7f8c8d', color: 'blue', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'};
        const mainGameControlText = this.props.winner===null?'Give up on this Herculean task':'new game';
        return (<div className='mjb44-game-control-panel__div' style={style}>
                <a className='special-link' onClick={this.displayNewGameDialogAndResetEverything}>&nbsp;{mainGameControlText}&nbsp;</a>
                <a className='special-link'>&nbsp;Help&nbsp;</a>                
                 </div>
                );
    }
});


export default GameControlPanel;

