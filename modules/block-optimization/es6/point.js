// @flow
'use strict';

(function() {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
})();

import assert from 'assert';

import not_used from './number-prototype.js';

import {MAX_BOARD_DIMENSION} from './constants.js';

const SEP='~';

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number, _strict: ?boolean) {
        let strict: boolean = true;
        if (_strict!=undefined)
            strict = _strict;
        if (strict) {
            assert(x.between(0, MAX_BOARD_DIMENSION), `x-value of: ${x} was not >= 0 and < ${MAX_BOARD_DIMENSION} as expected`);
            assert(y.between(0, MAX_BOARD_DIMENSION), `y-value of: ${y} was not >= 0 and <${MAX_BOARD_DIMENSION} as expected`);
        }
        this.x = (x===-0)?0:x; // change negative zeros to ordinary ones
        this.y = (y===-0)?0:y;
    }
    equals(otherPoint: Point) {
        if (!(otherPoint instanceof Point))
            return false;
        else
            return ((this.x === otherPoint.x) && (this.y === otherPoint.y));
    }
    toString(): string {
        return `${this.x}${SEP}${this.y}`;
    }
    static fromString(s: string,  _strict: ?boolean): Point {
        let strict: boolean = true;
        if (_strict!=undefined)
            strict = _strict;        
        const [x,y]=s.split(SEP);
        return new Point(parseInt(x),parseInt(y), strict);
    }
    reflectionInGrid(width: number, height: number) {
        assert(width .between(this.x, MAX_BOARD_DIMENSION)); // we can't reflect it in a smaller grid
        assert(height.between(this.y, MAX_BOARD_DIMENSION)); // we can't reflect it in a smaller grid
        const middle: Point = new Point((width-1)/2., (height-1)/2.);
        return this.subtract(middle, false).opposite().add(middle, false);
    }
    add(other: Point, strict: boolean ) : Point {
        return new Point(this.x+other.x, this.y+other.y, strict);
    }
    opposite(): Point {
        return new Point(-this.x, -this.y, false);
    }
    subtract(other: Point, strict: boolean) {
        return this.add(other.opposite(), strict);
    }
}


module.exports = {Point : Point};
