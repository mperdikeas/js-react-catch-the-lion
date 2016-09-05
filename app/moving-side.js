/* @flow */
'use strict';

import {Side} from '../modules/block-optimization/es6/side.js';


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
        if (s===Side.A) {
            console.log('MovingSide#fromSide returning BLACK');
            return MovingSide.BLACK;
        }
        else if (s===Side.B) {
            console.log('MovingSide#fromSide returning WHITE');            
            return MovingSide.WHITE;
        }
        else throw new Error();
    }
    static fromWhetherIsSideA(isSideA: boolean): MovingSide {
        return MovingSide.fromSide(Side.fromWhetherIsSideA(isSideA));
    }
}

Object.freeze(MovingSide);
export default MovingSide;
