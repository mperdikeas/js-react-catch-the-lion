/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import MovingSide from './moving-side.js';
require('./control-panel.css');

const ControlPanel = React.createClass({
    propTypes: {
        movingSide: React.PropTypes.instanceOf(MovingSide).isRequired        
    },
    render: function() {
        const capitalizedFriendlyName = this.props.movingSide.friendlyName.charAt(0).toUpperCase()+this.props.movingSide.friendlyName.slice(1);
        return (
                <div>
                {capitalizedFriendlyName} to move.
                </div>
        );
    }
});


export default ControlPanel;

