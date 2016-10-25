/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

require('./player-control-panel.css');

import MovingSide            from './moving-side.js';

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

const PlayerControlPanel = React.createClass({
    propTypes: {
        isActive      : React.PropTypes.bool.isRequired,
        sideOfPlayer  : React.PropTypes.instanceOf(MovingSide).isRequired,        
        xOffset       : React.PropTypes.number.isRequired,
        yOffset       : React.PropTypes.number.isRequired,
        width         : React.PropTypes.number.isRequired,
        height        : React.PropTypes.number.isRequired,
        numOfSeconds  : React.PropTypes.number.isRequired
    },
    render: function() {
        const baseStyle = {
            position  : 'absolute',
            left      : this.props.xOffset,
            top       : this.props.yOffset,
            width     : this.props.width,
            height    : this.props.height
        };
        const blackStyle = {
            backgroundColor: 'black',
            color          : 'white'
        };
        const whiteStyle = {
            backgroundColor: 'white',
            color          : 'black'            
        };
        const activeStyle = {
            border: '7px solid red'
        };
        const inactiveStyle = {
            border: '7px solid transparent'
        };        
        let style = Object.assign(baseStyle
                                  , this.props.sideOfPlayer===MovingSide.BLACK?blackStyle:whiteStyle
                                  , this.props.isActive && activeStyle
                                  ,!this.props.isActive && inactiveStyle);                                  
        const hours = Math.floor(this.props.numOfSeconds / 3600);
        const mins  = Math.floor( (this.props.numOfSeconds - hours*3600) / 60 );
        const secs  = this.props.numOfSeconds - hours*3600 - mins*60;
        return (
                <div className='mjb44-ctl-player-cpanel__div' style={style}>
                {str_pad_left(hours, '0', 2)}:{str_pad_left(mins, '0', 2)}:{str_pad_left(secs, '0', 2)}
                </div>
        );
    }
});


export default PlayerControlPanel;

