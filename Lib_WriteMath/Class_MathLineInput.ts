declare var MathQuill: any;
declare function $(pStr: String): JQueryElement;

class MathLineInput {
    protected _jQEl: JQueryElement;
    protected _nextMathLineInput: MathLineInput;
    protected _previousMathLineInput: MathLineInput;
    protected _isDeletable: Boolean;
    protected _autoCompleter: AutoCompleter;
    protected _undoRedoManager: UndoRedoManager;
    protected _shortcutsManager: ShortcutsManager;
    protected _container: JQueryElement;
    protected _saverNOpenerStateManager: SaverNOpenerStateManager;
    protected _mathField: any;

    public constructor(pContainer: JQueryElement, pSaverNOpenerStateManager: SaverNOpenerStateManager) {
        this._jQEl = $('<p class="mathLineInput"></p>');
        this._nextMathLineInput = null;
        this._previousMathLineInput = null;
        this._isDeletable = true;
        this._container = pContainer;
        this._saverNOpenerStateManager = pSaverNOpenerStateManager;

        this._mathField = MathQuill.getInterface(2).MathField(this._jQEl[0], {
            autoCommands: 'implies infinity lor land neg union notin forall nabla Angstrom alpha beta gamma Gamma delta Delta zeta eta theta Theta iota kappa lambda mu nu pi rho sigma tau phi Phi chi psi Psi omega Omega',
            autoOperatorNames: 'ln log det min max mod lcm gcd lim sin cos tan sec neq Function isEven isOdd divides Given Equation diff Vector Matrix Bool Graph Print',
            handlers: {
                edit: () => {
                },
    
                enter: () => {
                    if ((this._autoCompleter.isVisible() === false)) {  
                        const newMathLineInput = this.createNewMathLineInputAndAppendAfter(this);
                    
                        newMathLineInput.focus();
                    }
                },

                upOutOf: () => {
                    if (this.hasPreviousMathLineInput()) {
                        if (!this.autoCompleterIsVisible()) {
                            this.previousMathLineInput.focus();
                        }
                        
                    }
                },

                downOutOf: () => {
                    if (this.hasNextMathLineInput()) {
                        if (!this.autoCompleterIsVisible()) {
                            this.nextMathLineInput.focus();
                        }
                    }
                },
            }
        });

        this._autoCompleter = new AutoCompleter(this, g_keywordsList);
        this._undoRedoManager = new UndoRedoManager(this);
        this._shortcutsManager = new ShortcutsManager(this);
        

        this.setEvents();
    }

    /* * * * * * * * * * * * 
     * Getters and setters * 
     * * * * * * * * * * * */
    public get jQEl (): JQueryElement {
        return this._jQEl;
	}

    public get container (): JQueryElement {
        return this._container;
	}

    public get nextMathLineInput (): MathLineInput {
        return this._nextMathLineInput;
	}

    public set nextMathLineInput (pMathLineInput: MathLineInput) {
        this._nextMathLineInput = pMathLineInput;
	}

    public get previousMathLineInput (): MathLineInput {
        return this._previousMathLineInput;
	}

    public set previousMathLineInput (pMathLineInput: MathLineInput) {
        this._previousMathLineInput = pMathLineInput;
	}

    public get mathField (): any {
        return this._mathField;
	}

    public get isDeletable (): Boolean {
        return this._isDeletable;
    }

    public set isDeletable (pBool: Boolean) {
        this._isDeletable = pBool;
    }

    public get saverNOpenerManager(): SaverNOpenerStateManager {
        return this._saverNOpenerStateManager;
    }

    /* * * * * * 
     * Methods * 
     * * * * * */
    public focus(): MathLineInput {
        this._mathField.focus();
        return this;
    }

    public value(): String {
        return this._mathField.latex();
    }

    public setValue(pValue: String): MathLineInput {
        this._mathField.latex(pValue);
        return this;
    }

    public appendValueAtCursorPosition(pValue: String): void {
        this._mathField.typedText(pValue);
    }

    public appendCmdAtCursorPosition(pValue: String): void {
        this._mathField.cmd(pValue);
    }

    public writeLatexAtCursorPosition(pLatex: String): void {
        this._mathField.write(pLatex);
    }

    public isEmpty(): Boolean {
        return this.value() === '';
    }
    
    public appendTo(pElement: JQueryElement): MathLineInput {        
        this._jQEl.appendTo(pElement);

        return this;
    }

    public appendToContainer(): MathLineInput {
        this.appendTo(this._container);
        return this;
    }

    public insertAfter(pElement: JQueryElement): void {
        this._jQEl.insertAfter(pElement);
    }

    public insertBefore(pElement: JQueryElement): void {
        this._jQEl.insertBefore(pElement);
    }

    public hasPreviousMathLineInput(): Boolean {
        return this._previousMathLineInput !== null;
    }

    public hasNextMathLineInput(): Boolean {
        return this._nextMathLineInput !== null
    }

    public setCtrlToDown(): MathLineInput {
        this._undoRedoManager.setCtrlToDown();
        this._shortcutsManager.setCtrlToDown();
        return this;
    }

    public createNewMathLineInputAndAppendBefore(pMathLineInput: MathLineInput): MathLineInput {
        const newMathLineInput = new MathLineInput(this._container, this.saverNOpenerManager);
              newMathLineInput.insertBefore(pMathLineInput.jQEl);
              newMathLineInput.nextMathLineInput = pMathLineInput;

            if (pMathLineInput.hasPreviousMathLineInput()) {
                newMathLineInput.previousMathLineInput = pMathLineInput.previousMathLineInput;
                pMathLineInput.previousMathLineInput.nextMathLineInput = newMathLineInput;
            }

            pMathLineInput.previousMathLineInput = newMathLineInput;
            newMathLineInput.isDeletable = true;

            return newMathLineInput;
    }

    public createNewMathLineInputAndAppendAfter(pMathLineInput: MathLineInput): MathLineInput {
        const newMathLineInput = new MathLineInput(this._container, this.saverNOpenerManager);
              newMathLineInput.insertAfter(pMathLineInput.jQEl);

            if (pMathLineInput.hasNextMathLineInput()) {
                pMathLineInput.nextMathLineInput.previousMathLineInput = newMathLineInput;
                newMathLineInput.nextMathLineInput = pMathLineInput.nextMathLineInput;
            }

            pMathLineInput.nextMathLineInput = newMathLineInput;
            newMathLineInput.previousMathLineInput = pMathLineInput;
            newMathLineInput.isDeletable = true; 

            return newMathLineInput;
    }

    public getOffset(): Offset {
        return this._jQEl.offset();
    }

    public getCursorCoordinates(): Offset {
        this.mathField.focus();

        let retOffset = this.mathField.__controller.cursor.offset();
        if (!(retOffset)) {
            retOffset = { 'top': 0, 'left': 0 }
        }

        return retOffset
    };

    public erase(): MathLineInput {
        if (this.hasPreviousMathLineInput()) {
            this.previousMathLineInput.nextMathLineInput = this.nextMathLineInput;
        }
        
        if (this.hasNextMathLineInput()) {
            this.nextMathLineInput.previousMathLineInput = this.previousMathLineInput;
        }

        this._autoCompleter.hide();
        this.removeFromDOM();

        return this;
    }

    public removeFromDOM() {
        this._jQEl.remove();
    }

    public keyDown(pFunction: Function): MathLineInput {
        this.jQEl.keydown((e) => pFunction(e));

        return this;
    }

    public keyUp(pFunction: Function): MathLineInput {
        this.jQEl.keyup((e) => pFunction(e));
        return this;
    }

    public autoCompleterIsVisible(): Boolean {
        return this._autoCompleter.isVisible();
    }

    public blur(): MathLineInput {
        this._mathField.blur();

        return this;
    }

    public keyStroke(pKey: String): MathLineInput {
        this._mathField.keystroke(pKey);

        return this;
    }

    public deleteLeftWord(pWordLen: number): MathLineInput {
        for (let i = 0; i< pWordLen; i++) {
            this._mathField.keystroke('Shift-Left');
        }

        this._mathField.keystroke('Backspace');

        return this;
    }

    protected getContainerTopCoord(): Number {
        return this._container.offset().top;
    }

    protected getContainerBottomCoord(): Number {
        return this.getContainerTopCoord().valueOf() + this.container.outerHeight().valueOf();
    }

    protected getTopCoord(): Number {
        return this._jQEl.offset().top;
    }

    protected getBottomCoord(): Number {
        return this.getTopCoord().valueOf() + this._jQEl.outerHeight().valueOf();
    }

    protected setEvents(): MathLineInput {
        this.setKeyDownEvents();
        this.setKeyUpEvents();

        this._jQEl.focusin((e) => {
            const scrollUpAdjust = 20;
            const scrollDownAdjust = 45;
            
            if (this.getTopCoord() < this.getContainerTopCoord()) {
                this._container.scrollTop(this._container.scrollTop().valueOf() - scrollUpAdjust);
            } else if (this.getBottomCoord() > this.getContainerBottomCoord()) {
                this._container.scrollTop(this._container.scrollTop().valueOf() + scrollDownAdjust);
            }

            if (!(this.hasPreviousMathLineInput())) {
                this._container.scrollTop(0);
            } else if (!(this.hasNextMathLineInput())) {
                this._container.scrollTop(this._container.scrollTop().valueOf() + this._container.height().valueOf());
            } else {
                
            }
        });

        this._jQEl.focusout(() => {
            this._autoCompleter.hide();
            this._undoRedoManager.setSpecialKeysToUp();
            this._shortcutsManager.setSpecialKeysToUp();
            this.setStyle();
        });

        return this;
    }

    public setStyle(): MathLineInput {
        if (this.isAGivenLine()) {
            this._jQEl.addClass('GivenLine');
        } else {
            this._jQEl.removeClass('GivenLine');
        }

        if (this.isALetLine()) {
            this._jQEl.addClass('LetLine');
        } else {
            this._jQEl.removeClass('LetLine');
        }

        if (this.isACommentLine()) {
            this._jQEl.addClass('commentLine');
        } else {
            this._jQEl.removeClass('commentLine');
        }

        if (this.isASeparatorLine()) {
            this._jQEl.addClass('separatorLine');
        } else {
            this._jQEl.removeClass('separatorLine');
        }

        if (this.isEmpty()) {
            this._jQEl.addClass('emptyLine');
        } else {
            this._jQEl.removeClass('emptyLine');
        }

        return this;
    }

    protected setKeyDownEvents(): MathLineInput {
        this.keyDown((e) => {

            //press delete ==> delete line if is empty
            if (e.which === KeyCodes.DELETE_KEY && this.isEmpty()) {
                if (this.hasPreviousMathLineInput() || this.hasNextMathLineInput()) {
                    if (this.hasNextMathLineInput()) {
                        this.nextMathLineInput.focus();
                    } else {
                        this.previousMathLineInput.focus();
                    }
    
                    this.erase();
                }

            //press backspace ==> delete if is empty
            } else if (e.which === KeyCodes.BACKSPACE_KEY && this.isDeletable) {
                if (this.hasPreviousMathLineInput() && this.isEmpty()) {
                    this.erase();
                    this.previousMathLineInput.focus();
                }

            //press escape
            } else if (e.which === KeyCodes.ESCAPE_KEY) {
                if (this.autoCompleterIsVisible()) {
                    this._autoCompleter.hide()
                } else {
                    this.blur();
                }

            } else if (this.isEmpty()) {
                this.isDeletable = true;
            } else {
                this.isDeletable = false;
            }
        });

        return this;
    }

    protected setKeyUpEvents(): MathLineInput {
        this.keyUp((e) => {
            if (this.isEmpty()) {
                this.isDeletable = true;
            } else {
                this.isDeletable = false;
            }
        });

        return this;
    }

    protected getLocationOf(pCursor: MathFieldTreeElement): String[] {
        const L = -1;
        const R = 1;
        const retCursorLocation: String[] = [];
        let mathfieldTreeElement: MathFieldTreeElement;

        if (pCursor[L]) {
            retCursorLocation.push('insRightOf');
            mathfieldTreeElement = pCursor[L];
        } else if (pCursor[R]) {
            retCursorLocation.push('insLeftOf')
            mathfieldTreeElement = pCursor[R];
        } else {
            retCursorLocation.push('insAtLeftEnd')
            mathfieldTreeElement = pCursor.parent;
        }
    
        while (mathfieldTreeElement != this._mathField.__controller.root) {
            if (mathfieldTreeElement[L]) {
                retCursorLocation.push('L');
                mathfieldTreeElement = mathfieldTreeElement[L]
            } else {
                retCursorLocation.push('endsL')
                mathfieldTreeElement = mathfieldTreeElement.parent;
            }
        }
    
        return retCursorLocation.reverse();
    }

    public getCursorConfiguration(): CursorConfiguration {
        if (this._mathField.__controller.cursor.anticursor) {
            return { 
                cursor: this.getLocationOf(this._mathField.__controller.cursor),
                anticursor: this.getLocationOf(this._mathField.__controller.cursor.anticursor)
            }

        } else {
            return { cursor: this.getLocationOf(this._mathField.__controller.cursor) }
        }
    }

    public getCursorConfigurationWithCursorAndAnticursorFusion(): CursorConfiguration {
        let retCursorConfiguration: CursorConfiguration = this.getCursorConfiguration();

        if (this.AreCursorAndAnticursorAtSameLocation(retCursorConfiguration)) {
            delete retCursorConfiguration.anticursor;
        }

        return retCursorConfiguration;
    }

    protected setLocationOf(pCursor: (String|Number)[]) {
        const L = -1;
        const R = 1;
        
        let mathfieldTreeElement: MathFieldTreeElement = this._mathField.__controller.root;

        for (let i = 0; i < pCursor.length; i++) {
            switch (pCursor[i]) {
                case 'L':
                    mathfieldTreeElement = mathfieldTreeElement[R];
                    break;

                case 'endsL':
                    mathfieldTreeElement = mathfieldTreeElement.ends[L];
                    break;

                default:
                    this._mathField.__controller.cursor[pCursor[i].valueOf()](mathfieldTreeElement);
            }
        }
    }

    public isAGivenLine(): Boolean {
        if (this.value().substr(0, 14) === '\\text{Given}\\ ') {
            return true;
        }

        return false;
    }

    public isASeparatorLine(): Boolean {
        return this.value() == '--';
    }

    public isALetLine(): Boolean {
        if (this.value().substr(0, 12) === "\\text{Let}\\ ") {
            return true;
        }

        return false;
    }

    public isACommentLine(): Boolean {
        return this.value()[0] === "#";
    }

    public stopBeingAGivenLine(): MathLineInput {
        this.shiftKeywordInField('Given');
        return this;
    }

    public stopBeingALetLine(): MathLineInput {
        this.shiftKeywordInField('Let');
        return this;
    }

    public becomeAGivenLine(): MathLineInput {
        if (!(this.isAGivenLine())) {
            if (this.isALetLine()) {
                this.stopBeingALetLine();
            }

            this.prependToFieldKeyword('Given');
        }

        return this;
    }

    public becomeALetLine() {
        if (!(this.isALetLine())) {
            if (this.isAGivenLine()) {
                this.stopBeingAGivenLine();
            }

            this.prependToFieldKeyword('Let');
        }
    }

    public prependToFieldKeyword(pKeyword: String): MathLineInput {
        const cursorConfiguration: CursorConfiguration = this.getCursorConfigurationWithCursorAndAnticursorFusion();
        const keyWordInLatex = '\\text{' + pKeyword.valueOf() + '}\\ ';

        cursorConfiguration.cursor = ["endsL", "L", "L", ...cursorConfiguration.cursor.slice(1)];
        if (cursorConfiguration.anticursor) {
            cursorConfiguration.anticursor = ["endsL", "L", "L", ...cursorConfiguration.anticursor.slice(1)];
        }

        this.setValue(keyWordInLatex + this.value());
        this.setCursorConfiguration(cursorConfiguration);
        this.saveUndoRedoState();

        return this;
    }

    public shiftKeywordInField(pKeyword: String): MathLineInput {
        const cursorConfiguration: CursorConfiguration = this.getCursorConfigurationWithCursorAndAnticursorFusion();
        const keyWordInLatex = '\\text{' + pKeyword.valueOf() + '}\\ ';

        cursorConfiguration.cursor = ["endsL", ...cursorConfiguration.cursor.slice(3)];
        if (cursorConfiguration.anticursor) {
            cursorConfiguration.anticursor = ["endsL", ...cursorConfiguration.anticursor.slice(3)];
        }
        
        this.setValue(this.value().slice(keyWordInLatex.length));
        this.setCursorConfiguration(cursorConfiguration);
        this.saveUndoRedoState();

        return this;
    }

    public saveUndoRedoState() {
        this._undoRedoManager.saveState();
    }

    public AreCursorAndAnticursorAtSameLocation(pCursorConfiguration: CursorConfiguration): Boolean {
        if ((!(pCursorConfiguration.anticursor))
            || (pCursorConfiguration.cursor.length !== pCursorConfiguration.anticursor.length)) {

            return false;
        }

        for (let index in pCursorConfiguration.cursor) {
            if (pCursorConfiguration.cursor[index] !== pCursorConfiguration.anticursor[index]) {
                return false;
            }
        }

        return true;
    }

    public setCursorConfiguration(pCursorConfiguration: CursorConfiguration): MathLineInput {
        this._mathField.__controller.cursor.clearSelection();
        this._mathField.__controller.cursor.startSelection();
        
        if ((pCursorConfiguration.anticursor) && (!(this.AreCursorAndAnticursorAtSameLocation(pCursorConfiguration)))) {
            this.setLocationOf(pCursorConfiguration.anticursor);
            this._mathField.__controller.cursor.startSelection();
        } else {
            delete this._mathField.__controller.cursor.anticursor;
        }
    
        if (pCursorConfiguration.cursor) {    
            this.setLocationOf(pCursorConfiguration.cursor);

            if (pCursorConfiguration.anticursor) {
                this._mathField.__controller.cursor.select();
            }
        }

        return this;
    }

    public moveCursorToLeftEnd(): MathLineInput{
        this._mathField.moveToLeftEnd();
        return this;
    }

    public moveCursorToRightEnd(): MathLineInput{
        this._mathField.moveToRightEnd();
        return this;
    }

    public showCursor(): void {
        this._mathField.__controller.cursor.show()
    }

    public getTypedHistory(): HistoryStatement[] {
        return this._undoRedoManager.getTypedHistory();
    }

    public setTypedHistoryWith(pTypedHistory: HistoryStatement[]): MathLineInput {
        this._undoRedoManager.setTypedHistoryWith(pTypedHistory);
        return this;
    }

    public addNewMathLineInputOverMe(): MathLineInput {
        const newMathlineInput = this.createNewMathLineInputAndAppendBefore(this)
            .focus()
            .setCtrlToDown();

        this._undoRedoManager.setSpecialKeysToUp(); 

        return newMathlineInput;
    }

    public duplicateMathLine(): MathLineInput {
        const newMathlineInput: MathLineInput = this.createNewMathLineInputAndAppendAfter(this)
            .setValue(this.value())
            .focus()
            .setCtrlToDown();

        newMathlineInput._undoRedoManager = this._undoRedoManager.getCopy(newMathlineInput);
        newMathlineInput.setCursorConfiguration(this.getCursorConfigurationWithCursorAndAnticursorFusion());
        this._undoRedoManager.setSpecialKeysToUp(); 

        return newMathlineInput;
    }

    public getFirstMathLineInput(): MathLineInput {
        let retMathlineInput: MathLineInput = this;
        while (retMathlineInput.previousMathLineInput !== null) {
            retMathlineInput = retMathlineInput.previousMathLineInput;
        }

        return retMathlineInput;
    }

    public getLastMathLineInput(): MathLineInput {
        let retMathlineInput: MathLineInput = this;
        while (retMathlineInput.nextMathLineInput !== null) {
            retMathlineInput = retMathlineInput.nextMathLineInput;
        }

        return retMathlineInput;
    }
}