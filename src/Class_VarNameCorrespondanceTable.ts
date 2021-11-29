
// {'\\pi': 'pi', '\alpha': 'var0' }
class VarNameCorrespondanceTable {
    protected _correspondanceTable: { [key: string]: string};
    protected _varNamecounter: number;

    public constructor() {
        this._correspondanceTable = {};
        this._varNamecounter = 0;
    }

    /*
     * '\alpha' ==> 'var42'
     * if variable doesn't exist, return null
     * * */
    public getNerdamerCorrespondanceOf(pS4MLVarName: string): (string | null) {
        const retCorrespondance = this._correspondanceTable[pS4MLVarName];
        if (retCorrespondance === undefined) {
            return null;
        }

        return retCorrespondance;
    }

    public getS4MLCorrespondanceOf(pNerdamerVarName: string): (string | null) {
        const retCorrespondance = Object.keys(this._correspondanceTable).filter((key) => this._correspondanceTable[key] === pNerdamerVarName)[0];

        if (retCorrespondance === undefined) {
            return null;
        }
        
        return retCorrespondance;
    }

    public addExplicitNerdamerCorrespondanceOf(pS4MLVarName: string, pNerdamerVarName: string): this {
        this._correspondanceTable[pS4MLVarName] = pNerdamerVarName;
        return this;
    }

    public hasNerdamerCorrespondanceOf(pS4MLVarName: string): boolean {
        return (this.getNerdamerCorrespondanceOf(pS4MLVarName) !== null);
    }

    public hasS4MLCorrespondanceOf(pVarName: string): boolean {
        return (this.getS4MLCorrespondanceOf(pVarName) !== null);
    }

    protected generateNewVarName(): string {
        const retVarName = 'var' + this._varNamecounter;
        this._varNamecounter++;

        return retVarName;
    }

    public addNerdamerCorrespondanceOf(pS4MLVarName: string): this {
        this._correspondanceTable[pS4MLVarName] = 'var' + this._varNamecounter;
        this._varNamecounter++;

        return this;
    }

    public addNerdamerCorrespondanceIfNotAlreadyIn(pS4MLVarName: string): this {
        if (!(this.hasNerdamerCorrespondanceOf(pS4MLVarName))) {
            this.addNerdamerCorrespondanceOf(pS4MLVarName);
        }

        return this;
    }

    public removeS4MLVar(pS4MLVarName: string): this {
        if (this.hasNerdamerCorrespondanceOf(pS4MLVarName)) {
            delete(this._correspondanceTable[pS4MLVarName]);
        }
        
        return this;
    }

    public removeNerdamerVar(pNerdamerVarName: string): this {
        if (this.hasS4MLCorrespondanceOf(pNerdamerVarName)) {
            const key = this.getS4MLCorrespondanceOf(pNerdamerVarName)!;
            delete(this._correspondanceTable[key]);
        }

        return this;
    }

    public S4MLVarsToNerdamerVarsTranslate(pStr: string): string {
        let retStr = pStr;
        for (const S4MLVar of Object.keys(this._correspondanceTable)) {
            retStr = retStr.replace(new RegExp(S4MLVar, 'g'), this._correspondanceTable[S4MLVar]);
        }

        return retStr;
    }
}