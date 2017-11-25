/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import {geometry}  from './geometry.js';

const NewGameDialog = React.createClass({
    propTypes: {
        enabled    : React.PropTypes.bool.isRequired,
        reset      : React.PropTypes.func.isRequired        
    },
    render: function() {
        const borderWidth=5;
        const style = {
            position: 'absolute',
            padding : 0,
            margin  : 0,
            left    : geometry.tableXOffset,
            top     : geometry.tableYOffset-30-20, // this is the top of the message panel
            width   : geometry.tableWidth+2*geometry.tableBorder,
            height  : geometry.tableHeight+2*geometry.tableBorder+40+30+20+20-2*borderWidth, // I don't get the second +20 part, remains a mystery, on the next game I should be more rigid with my geometry and should work everything out well in advance
            borderWidth: 1,
            zIndex  : this.props.enabled?2:-1,
            background:  'rgba(200, 200, 255, 0.8)',
            color: 'blue',
            fontSize: '1.6em',
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: `${borderWidth}px solid blue`
        };
        const pStyle={};
        return (<div style={style}>
                    <p>
                        A new game is about to begin &hellip;
                    </p>
                    <a className='special-link' onClick={this.props.reset}>&nbsp;Okey Dokey&nbsp;</a>
                </div>
                );
    }
});


export default NewGameDialog;

