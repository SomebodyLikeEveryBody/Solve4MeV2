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
    // KeyCodes.UPARROW_KEY,
    // KeyCodes.DOWNARROW_KEY,
    // KeyCodes.LEFTARROW_KEY,
    // KeyCodes.RIGHTARROW_KEY,
    KeyCodes.END_KEY,
];

class UndoRedoManager {
    protected _mathLineInput: MathLineInput;
    protected _typedHistory: HistoryStatement[];
    protected _ctrlIsDown: Boolean;
    protected _altIsDown: Boolean;
    protected _YIsDown: Boolean;
    protected _ZIsDown: Boolean;
    protected _currentState: Number;
    protected _buffSize: Number;

    public constructor(pMathLineInput: MathLineInput) {
        this._mathLineInput = pMathLineInput;
        this._ctrlIsDown = false;
        this._altIsDown = false;
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

    public setCtrlToDown(): void {
        this._ctrlIsDown = true;   
    }

    protected rearrangeTypedHistoryArray(): void {
        if (this._typedHistory.length > this._buffSize) {
            const sizeOverflow: Number = ((this._typedHistory.length) - this._buffSize.valueOf());
            
            this._currentState = this._currentState.valueOf() - sizeOverflow.valueOf();
            this._typedHistory = this._typedHistory.slice(this._buffSize.valueOf() * (-1));
        }
    }

    protected isKeyIsUnaffecting(pKey: KeyCodes): Boolean {

        for (let keyCode of unaffectingKeys) {
            if (keyCode === pKey) {
                return true;
            }
        }

        return false;
    }

    protected checkIfSpecialKeysAreUpAndSetStates(pUppedKey: KeyCodes): void {
        switch (pUppedKey) {
            case KeyCodes.CTRL_KEY:
                this._ctrlIsDown = false;
                break;

            case KeyCodes.ALT_KEY:
                this._altIsDown = false;
                break;

            case KeyCodes.Y_KEY:
                this._YIsDown = false;
                break;

            case KeyCodes.Z_KEY:
                this._ZIsDown = false;
                break;
        }
    }

    protected checkIfSpecialKeysAreDownAndSetStates(pDownedKey: KeyCodes): void {
        switch (pDownedKey) {
            case KeyCodes.CTRL_KEY:
                this._ctrlIsDown = true;
                break;

            case KeyCodes.ALT_KEY:
                this._altIsDown = true;
                break;

            case KeyCodes.Y_KEY:
                this._YIsDown = true;
                break;

            case KeyCodes.Z_KEY:
                this._ZIsDown = true;
                break;
        }
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

    protected undo(): void {
        if (!this.isCurrentStateIsFirstHistoryState()) {
            this._currentState = this._currentState.valueOf() - 1;
            this._mathLineInput.setValue(this.getValueHistoryAtState(this._currentState));
            this._mathLineInput.setCursorConfiguration(this.getCursorConfigurationHistoryAtState(this._currentState));
            this._mathLineInput.showCursor();
        }  else {
            //console.log('do nothing');
        }
    }

    protected redo(): void {
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

        window.addEventListener('blur', () => {
            this.setSpecialKeysToUp();
        });
    }

    protected setKeyUpEvents(): void {
        this._mathLineInput.keyUp((e) => {
            this.checkIfSpecialKeysAreUpAndSetStates(e.which);

            if (e.which === KeyCodes.ALT_KEY) {
                e.preventDefault();
            }

            if ((this.isKeyIsUnaffecting(e.which) === false)
                && (this._ctrlIsDown === false || (this._ctrlIsDown && e.which === KeyCodes.V_KEY))) {
                this.saveState();
            }
        });    
    }

    protected setKeyDownEvents(): void {
        this._mathLineInput.keyDown((e) => {
            // console.log(this._mathLineInput.getCursorConfiguration());
            this.checkIfSpecialKeysAreDownAndSetStates(e.which);

            // ctrl + Z ==> undo
            if (this._ctrlIsDown && this._ZIsDown) {
                e.preventDefault();
                this.undo();
            }
    
            // ctrl + Y ==> redo
            if (this._ctrlIsDown && this._YIsDown) {
                e.preventDefault();
                this.redo();
            }
        });
    }

    public setSpecialKeysToUp(): void {
        this._ctrlIsDown = false;
        this._altIsDown = false;
        this._YIsDown = false;
        this._ZIsDown = false;
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