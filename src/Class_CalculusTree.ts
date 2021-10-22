interface CalculusNodeDefinition {

}

// is an operator
class CalculusNode {
    protected _operatorName: String;
    protected _operands: Array<CalculusNode | CalculusLeaf>;

    public constructor(pOperatorName: String, pFollowings: Array<CalculusNode | CalculusLeaf>) {
        this._operatorName = pOperatorName;
        this._operands = pFollowings;
    }

    public toString(): String {
        let retStr = "";

        return retStr;
    }
}

//is a mathobj
class CalculusLeaf {
    protected _factor: MathObj;
}

class CalculusTree {
    protected root: CalculusNode;

    public constructor(pRoot: CalculusNode) {
        this.root = pRoot;
    }

    public visualize(): CalculusTree {


        return this;
    }
}