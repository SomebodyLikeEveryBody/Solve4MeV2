enum BoolValue {
    TRUE = 'true',
    FALSE = 'false',
    UNDETERMINED = 'undetermined',
}

class S4ML_Bool {
    protected _value: BoolValue;

    public constructor(pValue: (BoolValue | S4ML_Bool)) {
        if (pValue instanceof S4ML_Bool) {
            this.value = pValue.value;
        } else {
            this.value = pValue;
        }
    }

    public get value () : BoolValue {
        return this._value;
    }

    public set value (pValue: BoolValue) {
        this._value = pValue;
    }
}

