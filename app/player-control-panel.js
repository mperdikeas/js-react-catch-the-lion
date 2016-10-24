/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

require('./player-control-panel.css');
const PlayerControlPanel = React.createClass({
    propTypes: {
        xOffset       : React.PropTypes.number.isRequired,
        yOffset       : React.PropTypes.number.isRequired,
        width         : React.PropTypes.number.isRequired,
        height        : React.PropTypes.number.isRequired,
        numOfSeconds  : React.PropTypes.number.isRequired
    },
    render: function() {
        const style = {
            position  : 'absolute',
            left      : this.props.xOffset,
            top       : this.props.yOffset,
            width     : this.props.width,
            height    : this.props.height,
            textAlign : 'right'
        };        
        return (
                <div style={style}>
                    {this.props.numOfSeconds}
                </div>
        );
    }
});


export default PlayerControlPanel;

