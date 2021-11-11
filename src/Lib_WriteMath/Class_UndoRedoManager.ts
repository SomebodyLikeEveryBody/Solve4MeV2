const unaffectingKeys: KeyCodes[] = [
    KeyCodes.ENTER_KEY,
    KeyCodes.SHIFT_KEY,
    KeyCodes.CTRL_KEY,
    KeyCodes.ALT_KEY,
    KeyCodes.CAPSLOCK_KEY,
    KeyCodes.ESCAPE_KEY,
    KeyCodes.PAGEUP_KEY,
    KeyCodes.PAGEDOWN_KEY,
    KeyCodes.ALTGR_KEY,
    KeyCodes.END_KEY,
];

class UndoRedoManager {
    protected _mathLineInput: MathLineInput;
    protected _typedHistory: UndoRedoStatement[];
    protected _YIsDown: boolean;
    protected _ZIsDown: boolean;
    protected _currentState: number;
    protected _buffSize: number;

    public constructor(pMathLineInput: MathLineInput) {
        this._mathLineInput = pMathLineInput;
        this._YIsDown = false;
        this._ZIsDown = false;
        this._currentState = 0;
        this._buffSize = 100;
        this._typedHistory = [
            { 
                value: this._mathLineInput.value(),
                cursorConfiguration: this._mathLineInput.getCursorConfiguration()
            }
        ];

        this.setEvents();
    }

    public getTypedHistory(): UndoRedoStatement[] {
        return this._typedHistory;
    }

    public setTypedHistoryWith(pTypedHistory: UndoRedoStatement[]): this {
        this._typedHistory = pTypedHistory;

        return this;
    }

    public setCurrentStateAt(pState: number): this {
        this._currentState = pState;

        return this;
    }

    protected rearrangeTypedHistoryArray(): this {
        if (this._typedHistory.length > this._buffSize) {
            const sizeOverflow: number = ((this._typedHistory.length) - this._buffSize);
            
            this._currentState = this._currentState - sizeOverflow;
            this._typedHistory = this._typedHistory.slice(this._buffSize * (-1));
        }

        return this;
    }

    protected isKeyIsUnaffecting(pKey: number): boolean {

        for (let keyCode of unaffectingKeys) {
            if (keyCode === pKey) {
                return true;
            }
        }

        return false;
    }

    protected isCurrentStateIsLastHistoryState(): boolean {
        return (this._currentState === (this._typedHistory.length - 1));
    }

    protected isCurrentStateIsFirstHistoryState(): boolean {
        return (this._currentState === 0);
    }

    public saveState(): this {
        if (!(this.isCurrentStateIsLastHistoryState())) {
            this._typedHistory = this._typedHistory.slice(0, (this._currentState + 1));
        }   
        
        this._typedHistory.push({
            value: this._mathLineInput.value(),
            cursorConfiguration: this._mathLineInput.getCursorConfiguration()
        });

        this.rearrangeTypedHistoryArray();
        this._currentState = this._currentState + 1;

        return this;
    }

    protected getValueHistoryAtState(pState: number): string {
        return this._typedHistory[pState].value;
    }

    protected getCursorConfigurationHistoryAtState(pState: number): CursorConfiguration {
        return this._typedHistory[pState].cursorConfiguration;
    }

    public undo(): this {
        if (!this.isCurrentStateIsFirstHistoryState()) {
            this._currentState = this._currentState - 1;
            this._mathLineInput.setValue(this.getValueHistoryAtState(this._currentState));
            this._mathLineInput.setCursorConfiguration(this.getCursorConfigurationHistoryAtState(this._currentState));
            this._mathLineInput.showCursor();
        }  else {
            //console.log('do nothing');
        }

        return this;
    }

    public redo(): this {
        if (!this.isCurrentStateIsLastHistoryState()) {
            this._currentState = this._currentState + 1;
            this._mathLineInput.setValue(this.getValueHistoryAtState(this._currentState));
            this._mathLineInput.setCursorConfiguration(this.getCursorConfigurationHistoryAtState(this._currentState));
            this._mathLineInput.showCursor();
        } else {
            //console.log('do nothing');
        }

        return this;
    }

    protected setEvents(): this {
        this.setKeyUpEvents();
        this.setKeyDownEvents();

        return this;
    }

    protected setKeyUpEvents(): this {
        this._mathLineInput.keyUp((e: EventObject) => {

            if (e.which === KeyCodes.ALT_KEY) {
                e.preventDefault();
            }

            if ((this.isKeyIsUnaffecting(e.which) === false)
                && (e.ctrlKey === false || (e.ctrlKey === true && e.which === KeyCodes.V_KEY))) {
                this.saveState();
            }
        });

        return this;
    }

    protected setKeyDownEvents(): this {
        this._mathLineInput.keyDown((e: EventObject) => {

            // ctrl + Z ==> undo
            if (e.ctrlKey && e.which === KeyCodes.Z_KEY) {
                e.preventDefault();
                this.undo();
            }
    
            // ctrl + Y ==> redo
            if (e.ctrlKey && e.which === KeyCodes.Y_KEY) {
                e.preventDefault();
                this.redo();
            }
        });

        return this;
    }

    public getCopy(pMathLineInput: MathLineInput): UndoRedoManager {
        const retUndoRedoManager: UndoRedoManager = new UndoRedoManager(pMathLineInput);
        const retTypedHistory: UndoRedoStatement[] = [];

        for (let state in this._typedHistory) {
            retTypedHistory.push({
                value: this._typedHistory[state].value,
                cursorConfiguration: this._typedHistory[state].cursorConfiguration
            });
        }

        retUndoRedoManager.setTypedHistoryWith(retTypedHistory)
                          .setCurrentStateAt(this._currentState);

        return retUndoRedoManager;
    }
}