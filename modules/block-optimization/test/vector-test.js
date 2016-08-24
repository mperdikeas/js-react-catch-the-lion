'use strict'; 

import 'babel-polyfill';
const assert     = require('assert');

import {Point}  from '../es6/point.js';
import {Vector, ARROW} from '../es6/vector.js';

describe('Vector', function() {

    describe('toString', function() {
        it('should work', function() {
            const v = new Vector(new Point(0,1), new Point(2,3));
            assert.equal(`(0~1)${ARROW}(2~3)`, v.toString());
        });
    });

    describe('equals', function() {
        it('should work', function() {
            const v1 = new Vector(new Point(0,1), new Point(2,3));
            const v2 = new Vector(new Point(0,1), new Point(2,3));
            assert(v1!==v2);
            assert(v1.equals(v2));
            assert(v2.equals(v1));
        });
    });

    describe('fromString', function() {
        it('should work', function() {
            const v1 = new Vector(new Point(0,1), new Point(2,3));
            const v2 = Vector.fromString(`(0~1)${ARROW}(2~3)`);
            assert(v1.equals(v2));
            assert(v2.equals(v1));
        });
        it('should baulk as expected', function() {
            const invalids=[`(0~1)${ARROW}(2~-3)`, `(-3~1)${ARROW}(2~-3)`];
            for (let invalid of invalids)
                assert.throws(()=> {
                    return Vector.fromString(invalid);
                }, assert.AssertionError);
        });
        it('baulking can be silenced', function() {
            const values=[[`(0~1)${ARROW}(2~-3)`  , new Vector(new Point(0,1)        , new Point( 2,-3, false))],
                          [`(0~-1)${ARROW}(-2~-3)`, new Vector(new Point(0,-1, false), new Point(-2,-3, false))]];
            for (let [s, v2] of values) {
                const v1 = Vector.fromString(s, false);
                assert(v1.equals(v2));
                assert(v2.equals(v1));
            }
        });        
    });    

});
