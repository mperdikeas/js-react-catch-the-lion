/* @flow */
'use strict';
const     _ = require('lodash');
const React = require('react');
var      cx = require('classnames');

import MovingSide from './moving-side.js';
require('./control-panel.css');

const ControlPanel = React.createClass({
    propTypes: {
        movingSide: React.PropTypes.instanceOf(MovingSide)        
    },
    render: function() {
        const movingSide: ?MovingSide = this.props.movingSide;
        if (movingSide!=null) {
            const capitalizedFriendlyName = movingSide.friendlyName.charAt(0).toUpperCase()+movingSide.friendlyName.slice(1);
            return (
                    <div>
                    {capitalizedFriendlyName} to move.
                    </div>
            );
        } else {
            return (
                    <div>
                    Game over
                    </div>
            );
        }
    }
});


export default ControlPanel;

