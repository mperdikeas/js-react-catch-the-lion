/* @flow */
'use strict';

class PointInBoardOrCaptureBox {
    point: Point;
    captureBox: ?MovingSide;

    constructor(point: Point, captureBox: ?MovingSide) {
        this.point = point;
        this.captureBox = captureBox;
    }

    toString(): string {
        const points = this.point.toString();
        if (this.captureBox===null)
            return `[MainBoard: ${points}]`;
        else
            return `[CaptureBox ${this.captureBox.friendlyName}: ${points}]`;
    }

    equals(p2: PointInBoardOrCaptureBox): boolean {
        return this.point.equals(p2.point) && (this.captureBox === p2.captureBox);
    }
}

exports.PointInBoardOrCaptureBox = PointInBoardOrCaptureBox;


