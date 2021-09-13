class S4ML_Function {
    protected _startSet: S4ML_Set;
    protected _arrivalSet: S4ML_Set;
    protected _varNames: String[];
    protected _expression: S4ML_LitteralExpression;

    public constructor(pVarNames: String[], pLitteralExpression: S4ML_LitteralExpression, pStartSet: S4ML_Set, pArrivalSet: S4ML_Set) {
        this._startSet = pStartSet;
        this._arrivalSet = pArrivalSet;
        this._varNames = pVarNames;
        this._expression = pLitteralExpression;
    }

    public isEven(): Boolean {
        return true;
    }

    public isOdd(): Boolean {
        return true;
    }

    public isSurjective(): Boolean {
        return true;
    }

    public isInjective(): Boolean {
        return true;
    }

    public isBijective(): Boolean {
        return (this.isSurjective() && this.isInjective());
    }

    public diff(pVarNameRespectTo: String): S4ML_Function {
        return this;
    }

    public primitive(pVarNameRespectTo: String): S4ML_Function {
        return this;
    }
}