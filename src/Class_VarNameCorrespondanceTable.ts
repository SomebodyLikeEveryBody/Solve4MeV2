class VarNameCorrespondanceTable {
    protected _correspondanceTable: string[];

    public constructor() {
        this._correspondanceTable = [];
    }

    /*
     * '\alpha' ==> 'var42'
     * if variable doesn't exist, return -1
     * * */
    public getNerdamerCorrespondanceOf(pVarName: string): (string | null) {
        const index: number = this._correspondanceTable.indexOf(pVarName);
        if (index !== -1) {
            return 'var' + index;
        }

        return null;
    }

    public getS4MLCorrespondanceOf(pVarName: string): (string | null) {
        const index = parseInt(pVarName.slice(3));
        if (typeof index !== typeof parseInt('notnumber') && this.hasIndex(index)) {
            return this._correspondanceTable[index];
        }

        return null;
    }

    protected hasIndex(pIndex: number): boolean {
        return (this._correspondanceTable[pIndex] !== undefined);
    }

    public hasNerdamerCorrespondanceOf(pVarName: string): boolean {
        return (this.getNerdamerCorrespondanceOf(pVarName) !== null);
    }

    public hasS4MLCorrespondanceOf(pVarName: string): boolean {
        return (this.getS4MLCorrespondanceOf(pVarName) !== null);
    }

    public addS4MLCorrespondanceOf(pVarName: string): this {
        const index: number = this._correspondanceTable.length;
        this._correspondanceTable[index] = pVarName;

        return this;
    }

    public addS4MLCorrespondanceIfNotAlreadyIn(pVarName: string): this {
        if (!(this.hasNerdamerCorrespondanceOf(pVarName))) {
            this.addS4MLCorrespondanceOf(pVarName);
        }
        
        return this;
    }
}