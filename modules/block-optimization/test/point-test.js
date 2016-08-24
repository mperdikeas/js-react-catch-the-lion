'use strict'; 

import 'babel-polyfill';
const assert     = require('assert');

import {Point}  from '../es6/point.js';

describe('Point', function() {

    describe('constructor', function() {
        it('should work as expected', function() {
            const points = [{x: 1, y:2}, {x: 0, y:5}, {x:6, y:7}, {x:0, y:8}, {x:0, y:8}, {x:8, y:7}, {x: 8, y:8}];
            for (let {x,y} of points)
                new Point(x,y);
        });
        it('should baulk as expected', function() {
            const points = [{x: -1, y:2}, {x: 0, y:-1}, {x:-6, y:-7}, {x:0, y:9}, {x:0, y:19}, {x:9, y:7}, {x: 9, y:9}, {x: -234, y:-234}, {x: 23413, y:123}];
            for (let {x,y} of points)
                assert.throws( ()=>{
                    new Point(x,y);
                }, assert.AssertionError);
            for (let {x,y} of points)
                new Point(x,y, false);
        });    
    });

    describe('toString', function() {
        it('should work', function() {
            {
                const v = new Point(2,3);
                assert.equal('2~3', v);
            }
            {
                const v = new Point(-22,-303, false);
                assert.equal('-22~-303', v);
            }
        });
    });

    describe('equals', function() {
        it('should work', function() {
            const v1 = new Point(1,2);
            const v2 = new Point(1,2);
            assert(v1!==v2);
            assert(v1.equals(v2));
            assert(v2.equals(v1));
        });
    });

    describe('fromString', function() {
        it('should work', function() {
            const values = [['2~3', true, new Point(2,3)],
                            ['-23~-3', false, new Point(-23, -3, false)],
                            ['-23~-30', false, new Point(-23, -30, false)]];
            values.forEach( ([s,strict, v2]) => {
                const v1 = Point.fromString(s, strict);
                assert(v1.equals(v2));
                assert(v2.equals(v1));
            });
        });
    });
});
