// @flow
'use strict';

(function() {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
})();

import assert from 'assert';

import {Point} from './point.js';

const ARROW ='=>';

class Vector {
    from: Point;
    to  : Point;

    constructor(from: Point, to: Point) {
        this.from = from;
        this.to   = to;
    }

    toString(): string {
        return `(${this.from})${ARROW}(${this.to})`;
    }
    static fromString(s: string,  _strict: ?boolean): Vector {
        let strict: boolean = true;
        if (_strict!=undefined)
            strict = _strict;
        let [fromS,toS]=s.split(ARROW);
        for (let s of [fromS, toS]) {
            assert.equal(s[0], '(');
            assert.equal(s[s.length-1], ')');
        }
        fromS = fromS.slice(1).slice(0, -1);
        toS   =   toS.slice(1).slice(0, -1);
        return new Vector(Point.fromString(fromS, strict)
                          , Point.fromString(toS, strict));
    }
    equals (v: Vector): boolean {
        if (!(v instanceof Vector)) throw new Error();
        return (this.from.equals(v.from) && (this.to.equals(v.to)));
    }
}

exports.Vector = Vector;
exports.ARROW = ARROW;
