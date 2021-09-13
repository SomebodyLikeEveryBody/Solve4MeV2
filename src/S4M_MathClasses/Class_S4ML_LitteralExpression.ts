class S4ML_LitteralExpression {
    protected _value: String;

    public constructor(pExpression: String | S4ML_LitteralExpression) {
        if (pExpression instanceof S4ML_LitteralExpression) {
            this._value = pExpression.value;
        } else {
            this._value = pExpression;
        }
    }

    public get value (): String {
        return this._value;
    }

    public set value (pValue: String) {
        this._value = pValue;
    }

    public diff(pVarNameRespectTo: String): S4ML_LitteralExpression {
        return this;
    }

    public integrate(pVarNameRespectTo: String): S4ML_LitteralExpression {
        return this;
    }
}