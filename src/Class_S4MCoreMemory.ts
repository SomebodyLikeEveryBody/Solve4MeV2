

// let declaredVars = [
//     {
//         DeclaringMathLineInput: {},
//         varMame: 'a',
//         varValue: '42',
//         processedVarValue: 42,
//     }
// ];

interface S4MMemoryElement {
    DeclaringMathLineInput: MathLineInput;
    varName: String;
    varValue: String;
    processedVarValue: MathObj;
}

class S4MCoreMemory {
    protected declaredVars: MathObj[];

    public constructor() {
        this.declaredVars = [];
    }
}