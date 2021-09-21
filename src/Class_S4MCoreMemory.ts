declare const s4mMemoryElement: S4MCoreMemory;

interface S4MMemoryElement {
    declaringMathLineInput: MathLineInput;
    varName: String;
    varValue: String;
    processedVarValue: MathObj;
}

class S4MCoreMemory {
    protected _declaringMathLineInputs: MathLineInput[];        //[M1, M2, ..., Mn]
    protected _errorMathLineInputs: MathLineInput[];            //[M1, M2, ..., Mn]
    protected _declaredVars: S4MMemoryElement[];                //[V1, V2, ..., Vn]
    protected _lastMathLineInputFocusedOut: MathLineInput;
    protected _currentMathLineInputFocused: MathLineInput;

    public constructor(pFirstMathLineInput) {
        this._declaringMathLineInputs = [];
        this._errorMathLineInputs = [];
        this._declaredVars = [];
        this._lastMathLineInputFocusedOut = pFirstMathLineInput;
        this._currentMathLineInputFocused = pFirstMathLineInput;
    }

    public get lastMathLineInputFocusedOut(): MathLineInput {
        return this._lastMathLineInputFocusedOut;
    }

    public set lastMathLineInputFocusedOut(pNewMathLineInput: MathLineInput) {
        this._lastMathLineInputFocusedOut = pNewMathLineInput;
    }

    public get currentMathLineInputFocused (): MathLineInput {
        return this._currentMathLineInputFocused;
    }

    public set currentMathLineInputFocused (pMathLineInput: MathLineInput) {
        this._currentMathLineInputFocused = pMathLineInput;
    }

    public getMemoryElementCreatedBy(pMathLineInput: MathLineInput): S4MMemoryElement {
        for (let s4mMemoryElement of this._declaredVars) {
            if (s4mMemoryElement.declaringMathLineInput === pMathLineInput) {
                return s4mMemoryElement;
            }
        }

        return (null);
    }

    public hasAVarDeclaredBy(pMathLineInput: MathLineInput): Boolean {
        const filteredArray = this._declaringMathLineInputs.filter((mathLineInput) => (mathLineInput === pMathLineInput));
        return (filteredArray.length !== 0);
    }

    public hasAVarNamed(pVarName: String): Boolean {
        const filtered = this._declaredVars.filter((s4mMemoryElement) => (s4mMemoryElement.varName === pVarName));
        return (filtered.length !== 0);
    }

    public getMathLineInputWhichDeclared(pVarName: String): MathLineInput {
        for (let memoryElement of this._declaredVars) {
            if (memoryElement.varName === pVarName) {
                return memoryElement.declaringMathLineInput;
            }
        }

        return null;
    }
    

    public addVar(pMemoryElement: S4MMemoryElement, pMathLineInput: MathLineInput): S4MCoreMemory {
        this._declaringMathLineInputs.push(pMathLineInput);
        this._declaredVars.push(pMemoryElement);
        return this;
    }

    public removeVarDeclaredBy(pMathLineInput: MathLineInput): S4MCoreMemory {
        this._declaredVars = this._declaredVars.filter((s4mMemoryElement) => (s4mMemoryElement.declaringMathLineInput !== pMathLineInput));
        this._declaringMathLineInputs = this._declaringMathLineInputs.filter((mathLineInput) => (mathLineInput !== pMathLineInput));

        return this;
    }

    public removeAllProducedBy(pMathLineInput: MathLineInput): S4MCoreMemory{
        this.removeVarDeclaredBy(pMathLineInput);
        return this;
    }

    getMathLineInputwhichDeclared(pVarName: String): MathLineInput {
        if (this.hasAVarNamed(pVarName)) {
            for (let s4mMemoryElement of this._declaredVars) {
                if (s4mMemoryElement.varName === pVarName) {
                    return s4mMemoryElement.declaringMathLineInput;
                }
            }
        }

        return null;
    }

    public removeVarNamed(pVarName: String): S4MCoreMemory {
        if (this.hasAVarNamed(pVarName)) {
            this.removeVarDeclaredBy(this.getMathLineInputwhichDeclared(pVarName));
        }

        return this;
    }

    public setVar(pMemoryElement: S4MMemoryElement, pMathLineInput: MathLineInput): S4MCoreMemory {
        this.removeVarDeclaredBy(pMathLineInput);
        this.addVar(pMemoryElement, pMathLineInput);

        return this;
    }
}