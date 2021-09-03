class S4ML_Equation {
    protected _leftMember: S4ML_LitteralExpression;
    protected _rightMember: S4ML_LitteralExpression;
    protected _relation: String;

    public constructor(pleftMember: S4ML_LitteralExpression, pRightMember: S4ML_LitteralExpression, pRelation: String) {
        this._leftMember = pleftMember;
        this._rightMember = pRightMember;
        this._relation = pRelation;
    }

    public solve(pVarNamesRespectTo): Object[] {
        //ensemble des (var1, var2, var3) tels que eq = {(v1, v2, v3), (v4 v5, v6), (v7, v8, v9)}
        //reflechir au type de retour
        return [
            {
                'var1': 'valeur',
                'var2': 'valeur',
            },
            {
                'var1': 'valeur',
                'var2': 'valeur',
            },
            {
                'var1': 'valeur',
                'var2': 'valeur',
            },
        ];
    }
}