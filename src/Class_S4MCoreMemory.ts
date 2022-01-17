declare const s4mMemoryElement: S4MCoreMemory;
declare const nerdamer: any;

interface S4MMemoryElement {
    declaringMathLineInput: (MathLineInput | null);
    S4MLVarName: string;
    varValue: string;
    processedVarValue: MathObj;
}

class S4MCoreMemory {
    protected _declaringMathLineInputs: MathLineInput[];        //[M1, M2, ..., Mn]
    protected _errorMathLineInputs: MathLineInput[];            //[M1, M2, ..., Mn]
    protected _declaredVars: S4MMemoryElement[];                //[V1, V2, ..., Vn]
    protected _currentMathLineInputFocused: MathLineInput | null;
    protected _lastMathLineInputFocusedOut: MathLineInput;
    protected _varNameCorrespondanceTable: VarNameCorrespondanceTable;

    public constructor(pFirstMathLineInput: MathLineInput) {
        this._declaringMathLineInputs = [];
        this._errorMathLineInputs = [];

        //need to declare basic constants here
        this._declaredVars = [];
        this._lastMathLineInputFocusedOut = pFirstMathLineInput;
        this._currentMathLineInputFocused = pFirstMathLineInput;
        this._varNameCorrespondanceTable = new VarNameCorrespondanceTable();

        this.defineConstants();
    }

    protected defineConstants(): S4MCoreMemory {

        this.addVar({
            declaringMathLineInput: null,
            S4MLVarName: "\\pi",
            varValue: '',
            processedVarValue: new MathObj(),
        });

        this._varNameCorrespondanceTable.addExplicitNerdamerCorrespondanceOf('\\pi', 'pi');

        return this;
    }

    public getLastMathLineInputFocusedOut(): MathLineInput {
        return this._lastMathLineInputFocusedOut;
    }

    public currentMathLineInputFocusedIs(pMathLineInput: MathLineInput): S4MCoreMemory {
        this._currentMathLineInputFocused = pMathLineInput;
        return this;
    }

    public lastMathLineInputFocusedOutIs(pMathLineInput: MathLineInput): S4MCoreMemory {
        this._lastMathLineInputFocusedOut = pMathLineInput;
        return this;
    }

    public setCurrentMathLineInputFocusedToNull(): S4MCoreMemory {
        this._currentMathLineInputFocused = null;
        return this;
    }

    public getMathLineInputToEdit(): MathLineInput {
        if (this._currentMathLineInputFocused === null) {
            return this._lastMathLineInputFocusedOut;
        }

        return this._currentMathLineInputFocused;
    }

    public getMemoryElementCreatedBy(pMathLineInput: MathLineInput): S4MMemoryElement {
        for (let s4mMemoryElement of this._declaredVars) {
            if (s4mMemoryElement.declaringMathLineInput === pMathLineInput) {
                return s4mMemoryElement;
            }
        }

        throw "The specified MathLineInput created no MemoryElement.";
    }

    public hasAVarDeclaredBy(pMathLineInput: MathLineInput): Boolean {
        const filteredArray = this._declaringMathLineInputs.filter((mathLineInput) => (mathLineInput === pMathLineInput));
        return (filteredArray.length !== 0);
    }

    public hasAVarNamed(pVarName: string): Boolean {
        const filtered = this._declaredVars.filter((s4mMemoryElement) => (s4mMemoryElement.S4MLVarName === pVarName));
        return (filtered.length !== 0);
    }

    public getMathLineInputWhichDeclared(pVarName: string): MathLineInput | null {
        for (let memoryElement of this._declaredVars) {
            if (memoryElement.S4MLVarName === pVarName) {
                return memoryElement.declaringMathLineInput;
            }
        }

        throw "No MathLineInput declared var [" + pVarName + "]";
    }
    

    public addVar(pMemoryElement: S4MMemoryElement): S4MCoreMemory {
        if (pMemoryElement.declaringMathLineInput !== null) {
            this._declaringMathLineInputs.push(pMemoryElement.declaringMathLineInput);
        }
        
        this._declaredVars.push(pMemoryElement);
        this._varNameCorrespondanceTable.addNerdamerCorrespondanceIfNotAlreadyIn(pMemoryElement.S4MLVarName);
        return this;
    }

    public getMemoryElementsDeclaredBy(pMathLineInput: MathLineInput): S4MMemoryElement[] {
        let retArray = this._declaredVars.filter((s4mMemoryElement) => (s4mMemoryElement.declaringMathLineInput === pMathLineInput));

        return retArray;
    }

    public removeVarDeclaredBy(pMathLineInput: MathLineInput): S4MCoreMemory {
        let memoryElementsToRemove = this.getMemoryElementsDeclaredBy(pMathLineInput);
        this._declaredVars = this._declaredVars.filter((s4mMemoryElement) => (s4mMemoryElement.declaringMathLineInput !== pMathLineInput));
        this._declaringMathLineInputs = this._declaringMathLineInputs.filter((mathLineInput) => (mathLineInput !== pMathLineInput));

        memoryElementsToRemove.map((s4mMemoryElement) => nerdamer.setVar(s4mMemoryElement.S4MLVarName, 'delete'));
        memoryElementsToRemove.map((s4mMemoryElement) => this._varNameCorrespondanceTable.removeS4MLVar(s4mMemoryElement.S4MLVarName));
        
        return this;
    }

    public removeAllProducedBy(pMathLineInput: MathLineInput): S4MCoreMemory{
        this.removeVarDeclaredBy(pMathLineInput);
        return this;
    }

    public removeVarNamed(pVarName: string): S4MCoreMemory {
        if (this.hasAVarNamed(pVarName)) {
            const declaringMathLineInput = this.getMathLineInputWhichDeclared(pVarName);
            if (declaringMathLineInput !== null) {
                this.removeVarDeclaredBy(declaringMathLineInput);
            }
        }

        return this;
    }

    public setVar(pMemoryElement: S4MMemoryElement): S4MCoreMemory {
        if (pMemoryElement.declaringMathLineInput !== null) {
            this.removeVarDeclaredBy(pMemoryElement.declaringMathLineInput);
        }
        
        this.addVar(pMemoryElement);
        nerdamer.setVar(pMemoryElement.S4MLVarName, pMemoryElement.varValue);

        return this;
    }

    public storeErroredMathLineInput(pMathLineInput: MathLineInput): S4MCoreMemory {
        this._errorMathLineInputs.push(pMathLineInput);

        return this;
    }

    public unstoreErroredMathLineInput(pMathLineInput: MathLineInput): S4MCoreMemory {
        this._errorMathLineInputs = this._errorMathLineInputs.filter((el) => (el !== pMathLineInput));

        return this;
    }

    public processAllErroredMathLineInputs(): S4MCoreMemory {
        // for (let mathLineInput of this._errorMathLineInputs) {
        //     mathLineInput.processContent();
        // }

        // this._errorMathLineInputs[0].processContent();

        // this._errorMathLineInputs.forEach((mathLineInput) => mathLineInput.processContent());

        return this;
    }
}