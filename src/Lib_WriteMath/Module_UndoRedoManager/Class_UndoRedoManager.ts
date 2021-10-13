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
    protected _typedHistory: HistoryStatement[];
    protected _YIsDown: Boolean;
    protected _ZIsDown: Boolean;
    protected _currentState: Number;
    protected _buffSize: Number;

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

    public getTypedHistory(): HistoryStatement[] {
        return this._typedHistory;
    }

    public setTypedHistoryWith(pTypedHistory: HistoryStatement[]): void {
        this._typedHistory = pTypedHistory;
    }

    public setCurrentStateAt(pState: Number): void {
        this._currentState = pState;
    }

    protected rearrangeTypedHistoryArray(): void {
        if (this._typedHistory.length > this._buffSize) {
            const sizeOverflow: Number = ((this._typedHistory.length) - this._buffSize.valueOf());
            
            this._currentState = this._currentState.valueOf() - sizeOverflow.valueOf();
            this._typedHistory = this._typedHistory.slice(this._buffSize.valueOf() * (-1));
        }
    }

    protected isKeyIsUnaffecting(pKey: Number): Boolean {

        for (let keyCode of unaffectingKeys) {
            if (keyCode === pKey) {
                return true;
            }
        }

        return false;
    }

    protected isCurrentStateIsLastHistoryState(): Boolean {
        return (this._currentState === (this._typedHistory.length - 1));
    }

    protected isCurrentStateIsFirstHistoryState(): Boolean {
        return (this._currentState === 0);
    }

    public saveState(): void {
        if (!(this.isCurrentStateIsLastHistoryState())) {
            this._typedHistory = this._typedHistory.slice(0, (this._currentState.valueOf() + 1));
        }   
        
        this._typedHistory.push({
            value: this._mathLineInput.value(),
            cursorConfiguration: this._mathLineInput.getCursorConfiguration()
        });

        this.rearrangeTypedHistoryArray();
        this._currentState = this._currentState.valueOf() + 1;
    }

    protected getValueHistoryAtState(pState: Number): String {
        return this._typedHistory[pState.valueOf()].value;
    }

    protected getCursorConfigurationHistoryAtState(pState: Number): CursorConfiguration {
        return this._typedHistory[pState.valueOf()].cursorConfiguration;
    }

    public undo(): void {
        if (!this.isCurrentStateIsFirstHistoryState()) {
            this._currentState = this._currentState.valueOf() - 1;
            this._mathLineInput.setValue(this.getValueHistoryAtState(this._currentState));
            this._mathLineInput.setCursorConfiguration(this.getCursorConfigurationHistoryAtState(this._currentState));
            this._mathLineInput.showCursor();
        }  else {
            //console.log('do nothing');
        }
    }

    public redo(): void {
        if (!this.isCurrentStateIsLastHistoryState()) {
            this._currentState = this._currentState.valueOf() + 1;
            this._mathLineInput.setValue(this.getValueHistoryAtState(this._currentState));
            this._mathLineInput.setCursorConfiguration(this.getCursorConfigurationHistoryAtState(this._currentState));
            this._mathLineInput.showCursor();
        } else {
            //console.log('do nothing');
        }
    }

    protected setEvents(): void {
        this.setKeyUpEvents();
        this.setKeyDownEvents();
    }

    protected setKeyUpEvents(): void {
        this._mathLineInput.keyUp((e: EventObject) => {

            if (e.which === KeyCodes.ALT_KEY) {
                e.preventDefault();
            }

            if ((this.isKeyIsUnaffecting(e.which) === false)
                && (e.ctrlKey === false || (e.ctrlKey === true && e.which === KeyCodes.V_KEY))) {
                this.saveState();
            }
        });    
    }

    protected setKeyDownEvents(): void {
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
    }

    public getCopy(pMathLineInput: MathLineInput): UndoRedoManager {
        const retUndoRedoManager = new UndoRedoManager(pMathLineInput);
        const retTypedHistory = [];

        for (let state in this._typedHistory) {
            retTypedHistory.push({
                value: this._typedHistory[state].value,
                cursorConfiguration: this._typedHistory[state].cursorConfiguration
            });
        }

        retUndoRedoManager.setTypedHistoryWith(retTypedHistory);
        retUndoRedoManager.setCurrentStateAt(this._currentState.valueOf());

        return retUndoRedoManager;
    }
}