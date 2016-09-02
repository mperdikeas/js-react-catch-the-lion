// @flow
'use strict';


class Side {
    constructor(){
        Object.freeze(this);
    }

    static A: Side;
    static B: Side;
    static fromWhetherIsSideA: (b: boolean)=>Side;

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
Side.fromWhetherIsSideA = function(isSideA: boolean): Side { // TODO: It appears I am unable to use this static method from another module
    if (isSideA)
        return Side.A;
    else
        return Side.B;
}

Object.freeze(Side);

export default Side;
