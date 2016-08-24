// @flow
'use strict';


class Side {
    constructor(){}

    static A: Side;
    static B: Side;

    theOther(): Side {
        if (this===Side.A)
            return Side.B;
        if (this===Side.B)
            return Side.A;
        throw new Error();
    }
}

Side.A = new Side();
Side.B = new Side();

export default Side;
