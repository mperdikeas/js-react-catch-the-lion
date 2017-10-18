/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import MovingSide from './moving-side.js';
require('./message-panel.css');

const MessagePanel = React.createClass({
    propTypes: {
        aiSide    : React.PropTypes.instanceOf(MovingSide).isRequired,        
        movingSide: React.PropTypes.instanceOf(MovingSide).isRequired,
        winner    : React.PropTypes.instanceOf(MovingSide)
    },
    render: function() {
        const capitalizedFriendlyName = this.props.movingSide.friendlyName.charAt(0).toUpperCase()
                  +this.props.movingSide.friendlyName.slice(1);
        const MSG = (()=>{
            if (this.props.winner==null) {
                if (this.props.movingSide===this.props.aiSide)
                    return (
                            <span> <b>Awesome</b> AI playing {capitalizedFriendlyName} contemplating <b>next glorious move</b> &hellip; </span>
                    );
                else
                    return (
                            <span> <b>Worthless</b> human playing {capitalizedFriendlyName} to make his <b>pathetic</b> move ! </span>
                    );
            } else {
                if (this.props.winner===this.props.aiSide)                
                    return (
                        <span><b>Divine</b> AI playing {this.props.winner.friendlyName} <b>WINS</b> due to <b>superior</b> intellect</span>
                    );
                else return (
                        <span>Smelly mortal wins (<u>possibly</u> due to <b>cheating</b>)</span>
                );
            }
        })();
        const blackStyle = {backgroundColor: 'black',
                            color: 'white'};
        const whiteStyle = {backgroundColor: 'white',
                            color: 'black',
                            border: '1px solid black'
                           };
        const style = Object.assign({},
                                    ((this.props.movingSide===MovingSide.BLACK)||(this.props.winner===MovingSide.BLACK))?blackStyle:whiteStyle);
        return (<div className='mjb44-msg-panel__div' style={style}>
                {MSG}
                 </div>
                );
    }
});


export default MessagePanel;

