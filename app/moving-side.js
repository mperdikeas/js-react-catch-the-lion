/* @flow */
'use strict';

const Side = require('../modules/block-optimization/es5/side.js');


console.log(Side);


class MovingSide {
    side: Side;
    friendlyName: string;
    constructor(side: Side, friendlyName: string){
        this.side = side;
        this.friendlyName = friendlyName;
        Object.freeze(this);
    }
    static BLACK: MovingSide = new MovingSide(Side.A, 'black');
    static WHITE: MovingSide = new MovingSide(Side.B, 'white');

    theOther(): MovingSide {
        if (this===MovingSide.BLACK)
            return MovingSide.WHITE;
        if (this===MovingSide.WHITE)
            return MovingSide.BLACK;
        throw new Error();
    }
    static fromSide(s: Side): MovingSide {
        if (s===Side.A)
            return MovingSide.BLACK;
        else if (s===Side.B)
            return MovingSide.WHITE;
        else throw new Error();
    }
}

Object.freeze(MovingSide);
export default MovingSide;
