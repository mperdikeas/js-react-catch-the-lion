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
            return `[MainBoard: ${points)]`;
        else
            return `[CaptureBox ${this.captureBox.friendlyName}: ${points}]`;
    }
}

export default PointInBoardOrCaptureBox;
