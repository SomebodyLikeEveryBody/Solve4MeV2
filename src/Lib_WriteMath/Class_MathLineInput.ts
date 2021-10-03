declare const S4MLParser: any;
declare const MathQuill: any;
declare const g_s4mCoreMemory: any;
declare const g_inputScreen: any;
declare const g_virtualKeyboard: any;
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
    protected _lastValueBeforeFocusOut: String;
    protected _isErrored: Boolean;

    public constructor(pContainer: JQueryElement, pSaverNOpenerStateManager: SaverNOpenerStateManager) {
        this._jQEl = $('<p class="mathLineInput"></p>');
        this._nextMathLineInput = null;
        this._previousMathLineInput = null;
        this._isDeletable = true;
        this._container = pContainer;
        this._saverNOpenerStateManager = pSaverNOpenerStateManager;
        this._lastValueBeforeFocusOut = "";

        this._mathField = MathQuill.getInterface(2).MathField(this._jQEl[0], {
            autoCommands: 'implies infinity lor land neg union notin forall nabla Angstrom alpha beta gamma Gamma delta Delta zeta eta theta Theta iota kappa lambda Lambda mu nu pi Pi rho sigma Sigma tau phi Phi chi psi Psi omega Omega',
            autoOperatorNames: 'acotan cotan atan tan asin sin cosec sec acos cos Function isEven isOdd divides Equation diff Vector Matrix Bool min max log ln',
            substituteTextarea: (() => {
                const JQTextarea = $('<textarea autocapitalize="none" autocomplete="off" autocorrect="off" spellcheck="false" x-palm-disable-ste-all="true" inputmode="none"></textarea>');
                
                return JQTextarea[0];
            }),

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

    public set isErrored (pValue: Boolean) {
        this._isErrored = pValue;
	}

    public get isErrored (): Boolean {
        return this._isErrored;
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

        if (g_s4mCoreMemory !== undefined) {
            g_s4mCoreMemory.currentMathLineInputFocused = this;
        }

        return this;
    }

    public value(): String {
        return this._mathField.latex();
    }

    public setValue(pValue: String): MathLineInput {
        this._mathField.latex(pValue);
        return this;
    }

    public appendValueAtCursorPosition(pValue: String): MathLineInput {
        this._mathField.typedText(pValue);
        return this;
    }

    public appendCmdAtCursorPosition(pValue: String): MathLineInput {
        this._mathField.cmd(pValue);
        return this;
    }

    public writeLatexAtCursorPosition(pLatex: String): MathLineInput {
        this._mathField.write(pLatex);
        return this;
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

    public insertAfter(pElement: JQueryElement): MathLineInput {
        this._jQEl.insertAfter(pElement);
        return this;
    }

    public insertBefore(pElement: JQueryElement): MathLineInput {
        this._jQEl.insertBefore(pElement);
        return this;
    }

    public hasPreviousMathLineInput(): Boolean {
        return this._previousMathLineInput !== null;
    }

    public hasNextMathLineInput(): Boolean {
        return this._nextMathLineInput !== null
    }

    public hasBeenModifiedSinceLastFocusOut(): Boolean {
        return (this.value() !== this._lastValueBeforeFocusOut);
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

    public removeFromDOM(): MathLineInput {
        this._jQEl.remove();
        return this;
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
            
            // S4M interactions:
            if (S4MLParser !== undefined && g_s4mCoreMemory !== undefined) {
                g_s4mCoreMemory.lastMathLineInputFocusedOut = this;

                if (this.hasBeenModifiedSinceLastFocusOut() || this._isErrored) {
                    g_s4mCoreMemory.removeAllProducedBy(this);
                    this.processContent();
                }
            } else {
                this.setStyle();
            }

            this._lastValueBeforeFocusOut = this.value();
        });

        return this;
    }

    public processContent(): MathLineInput {
        g_s4mCoreMemory.unstoreErroredMathLineInput(this);
        
        try {
            console.log('parser Output:');
            console.log(S4MLParser.parse(this.value(), {processedMathLineInput: this}));
            console.log('-------------');
            this.signalNoError();
        } catch (e) {
            this.signalError(e);
        }

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

        if (this.isErrored === true) {
            this._jQEl.addClass('errorLine');
        } else {
            this._jQEl.removeClass('errorLine');
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
        const retCursorConfiguration: CursorConfiguration = this.getCursorConfiguration();

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

    public isAnUnprocessedLine(): Boolean {
        if (this.value().substr(0, 8) === '\\vdash\\ ') {
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

    public isAPrintLine(): Boolean {
        return (this.value().substr(0, 18) === "\\text{Print}\\left(");
    }

    public isAGraphLine(): Boolean {
        return (this.value().substr(0, 18) === "\\text{Graph}\\left(");
    }

    public stopBeingAGivenLine(): MathLineInput {
        if  (this.isAGivenLine()) {
            this.shiftKeywordInField('Given');
            this.saveUndoRedoState();
        }
        
        return this;
    }

    public stopBeingAnUnprocessedLine(): MathLineInput {
        this.shiftLatexInField('\\vdash\\ ');
        return this;
    }s

    public stopBeingALetLine(): MathLineInput {
        this.shiftKeywordInField('Let');
        return this;
    }

    public stopBeingAPrintLine(): MathLineInput {
        this.setValue(this.value().substring("\\text{Print}\\left(".length, this.value().length - "\\right)".length));
        return this;
    }

    public stopBeingAGraphLine(): MathLineInput {
        this.setValue(this.value().substring("\\text{Graph}\\left(".length, this.value().length - "\\right)".length));
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

    
    public becomeAnUnprocessedLine(): MathLineInput {
        if (!this.isAnUnprocessedLine()) {
            this.prependToFieldLatex('\\vdash\\ ');
        }

        return this;
    }

    public becomeALetLine(): MathLineInput {
        if (!(this.isALetLine())) {
            if (this.isAGivenLine()) {
                this.stopBeingAGivenLine();
            }

            this.prependToFieldKeyword('Let');
        }

        return this;
    }

    public letLineToggle(): MathLineInput {
        if (this.isALetLine()) {
            this.stopBeingALetLine();
        } else {
            this.becomeALetLine();
        }

        return this;
    }

    public unprocessedLineToggle() {
        if (this.isAnUnprocessedLine()) {
            this.stopBeingAnUnprocessedLine();
        } else {
            this.becomeAnUnprocessedLine();
        }
    }

    public becomeAPrintLine(): MathLineInput {
        if (!(this.isAPrintLine())) {
            this.setValue("\\text{Print}\\left(" + this.value() + "\\right)");
            this.saveUndoRedoState();
        }

        return this;
    }

    public becomeAGraphLine(): MathLineInput {
        if (!(this.isAGraphLine())) {
            this.setValue("\\text{Graph}\\left(" + this.value() + "\\right)");
            this.saveUndoRedoState();
        }

        return this;
    }

    public prependToFieldKeyword(pKeyword: String, pFollowingStr: String='\\ '): MathLineInput {
        const cursorConfiguration: CursorConfiguration = this.getCursorConfigurationWithCursorAndAnticursorFusion();
        const keyWordInLatex = '\\text{' + pKeyword.valueOf() + '}' + pFollowingStr;

        cursorConfiguration.cursor = ["endsL", "L", "L", ...cursorConfiguration.cursor.slice(1)];
        if (cursorConfiguration.anticursor) {
            cursorConfiguration.anticursor = ["endsL", "L", "L", ...cursorConfiguration.anticursor.slice(1)];
        }

        this.setValue(keyWordInLatex + this.value());
        this.setCursorConfiguration(cursorConfiguration);
        this.saveUndoRedoState();

        return this;
    }

    public prependToFieldLatex(pLatexKeyword: String): MathLineInput {
        const cursorConfiguration: CursorConfiguration = this.getCursorConfigurationWithCursorAndAnticursorFusion();

        cursorConfiguration.cursor = ["endsL", "L", "L", ...cursorConfiguration.cursor.slice(1)];
        if (cursorConfiguration.anticursor) {
            cursorConfiguration.anticursor = ["endsL", "L", "L", ...cursorConfiguration.anticursor.slice(1)];
        }

        this.setValue(pLatexKeyword.valueOf() + this.value());
        this.setCursorConfiguration(cursorConfiguration);
        this.saveUndoRedoState();

        return this;
    }

    
    public shiftLatexInField(pLatexKeyword: String): MathLineInput {
        const cursorConfiguration: CursorConfiguration = this.getCursorConfigurationWithCursorAndAnticursorFusion();

        cursorConfiguration.cursor = ["endsL", ...cursorConfiguration.cursor.slice(3)];
        if (cursorConfiguration.anticursor) {
            cursorConfiguration.anticursor = ["endsL", ...cursorConfiguration.anticursor.slice(3)];
        }
        
        this.setValue(this.value().slice(pLatexKeyword.length));
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

    public saveUndoRedoState(): MathLineInput {
        this._undoRedoManager.saveState();
        return this;
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

    public showCursor(): MathLineInput {
        this._mathField.__controller.cursor.show();
        return this;
    }

    public getTypedHistory(): HistoryStatement[] {
        return this._undoRedoManager.getTypedHistory();
    }

    public setTypedHistoryWith(pTypedHistory: HistoryStatement[]): MathLineInput {
        this._undoRedoManager.setTypedHistoryWith(pTypedHistory);
        return this;
    }

    public addNewMathLineInputOverMe(): MathLineInput {
        const newMathlineInput = this.createNewMathLineInputAndAppendBefore(this).focus()

        return newMathlineInput;
    }

    public duplicateMathLine(): MathLineInput {
        const newMathlineInput: MathLineInput = this.createNewMathLineInputAndAppendAfter(this)
            .setValue(this.value())
            .focus()

        newMathlineInput._undoRedoManager = this._undoRedoManager.getCopy(newMathlineInput);
        newMathlineInput.setCursorConfiguration(this.getCursorConfigurationWithCursorAndAnticursorFusion());

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

    public signalError(errorObject: ErrorObject): MathLineInput {
        this._isErrored = true;
        this._jQEl.attr('title', "[" + errorObject.name + "]: " + errorObject.message)
        this.setStyle();

        g_s4mCoreMemory.storeErroredMathLineInput(this);

        return this;
    }

    public signalNoError(): MathLineInput {
        this._isErrored = false;
        this._jQEl.attr('title', this.value());
        this.setStyle();

        g_s4mCoreMemory.unstoreErroredMathLineInput(this);
        
        return this;
    }
}