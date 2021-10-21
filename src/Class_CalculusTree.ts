interface CalculusNodeDefinition {
    
}

class CalculusNode {
    protected mathObj: MathObj;
    protected followings: MathObj[] | null;

    public constructor() {

    }

    public toString(): String {
        let retStr = "";
    }
}

class CalculusTree {
    protected root: CalculusNode;

    public constructor(pRoot: CalculusNode) {
        this.root = pRoot;


    }
}