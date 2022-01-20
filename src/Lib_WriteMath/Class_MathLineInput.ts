declare const S4MLParser: S4MLParser;
declare const nerdamerToLatexVarsTranslater: any;
declare const MathQuill: any;
declare const g_s4mCoreMemory: any;
declare const g_inputScreen: any;
declare const g_outputScreen: any;
declare const g_virtualKeyboard: any;
declare const nerdamer: any;
declare function $(pStr: string | JQueryElement): JQueryElement;

interface Coordinates2D {
    top: Number;
    left: Number;
}

/*
 * Class MathLineInput
 * ------------------------------
 * Main Class which generates an input text element where we
 * can type math visually formatted directly
 * * */
class MathLineInput {
    protected _jQWrapperEl: JQueryElement;
    protected _jQEl: JQueryElement;
    protected _container: JQueryElement;
    protected _mathField: any;

    protected _nextMathLineInput: MathLineInput | null;
    protected _previousMathLineInput: MathLineInput | null;
    protected _isDeletable: boolean;
    protected _lastValueBeforeFocusOut: string;
    protected _isErrored: boolean;
    protected _numberLine: number;

    protected _autoCompleter: AutoCompleter;
    protected _undoRedoManager: UndoRedoManager;
    protected _shortcutsManager: ShortcutsManager;
    protected _saverNOpenerStateManager: SaverNOpenerStateManager;

    public constructor(pContainer: JQueryElement, pSaverNOpenerStateManager: SaverNOpenerStateManager) {
        this._jQWrapperEl = $('<div class="mathlineinput_container"><div class="number_line"><span> [1]</span></div><div class="mathLineInput"></div></div>');
        this._jQEl = this._jQWrapperEl.find('.mathLineInput');
        this._nextMathLineInput = null;
        this._previousMathLineInput = null;
        this._isDeletable = true;
        this._container = pContainer;
        this._saverNOpenerStateManager = pSaverNOpenerStateManager;
        this._lastValueBeforeFocusOut = "";
        this._isErrored = false;
        this._numberLine = 1;

        this._mathField = MathQuill.getInterface(2).MathField(this._jQEl.get(0), {
            autoCommands: 'implies infinity lor land neg union notin forall nabla Angstrom alpha beta gamma Gamma delta Delta zeta eta theta Theta iota kappa lambda Lambda mu nu pi Pi rho sigma Sigma tau phi Phi chi psi Psi omega Omega',
            autoOperatorNames: 'acotan cotan atan tan asin sin acosec cosec asec sec acos cos Function isEven isOdd divides Equation diff Vector Matrix Bool min max log ln solve factor',
            substituteTextarea: (() => {
                const JQTextarea = $('<textarea autocapitalize="none" autocomplete="off" autocorrect="off" spellcheck="false" x-palm-disable-ste-all="true" inputmode="none"></textarea>');
                
                return JQTextarea.get(0);
            }),

            handlers: {
                edit: () => {
                },
    
                enter: () => {
                    this.doIfKeyEnter();
                },

                upOutOf: () => {
                    if (this.hasPreviousMathLineInput() && (!this.autoCompleterIsVisible())) {
                        this._previousMathLineInput!.focus();
                    }
                },

                downOutOf: () => {
                    if (this.hasNextMathLineInput() && (!this.autoCompleterIsVisible())) {
                        this.nextMathLineInput!.focus();
                    }
                },
            }
        });

        this._autoCompleter = new AutoCompleter(this, g_keywordsList);
        this._undoRedoManager = new UndoRedoManager(this);
        this._shortcutsManager = new ShortcutsManager(this);
        

        this.setEvents()
            .setStyle();
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

    public get nextMathLineInput (): MathLineInput | null {
        return this._nextMathLineInput;
	}

    public set nextMathLineInput (pMathLineInput: MathLineInput | null) {
        if (pMathLineInput !== null) {
            this._nextMathLineInput = pMathLineInput;
        }
	}

    public set isErrored (pValue: boolean) {
        this._isErrored = pValue;
	}

    public get isErrored (): boolean {
        return this._isErrored;
    }


    public get previousMathLineInput (): MathLineInput | null {
        return this._previousMathLineInput;
	}

    public set previousMathLineInput (pMathLineInput: MathLineInput | null) {
        this._previousMathLineInput = pMathLineInput;
	}

    public get mathField (): any {
        return this._mathField;
	}

    public get isDeletable (): boolean {
        return this._isDeletable;
    }

    public set isDeletable (pBool: boolean) {
        this._isDeletable = pBool;
    }

    public get saverNOpenerManager(): SaverNOpenerStateManager {
        return this._saverNOpenerStateManager;
    }

    public get numberLine (): number {
        return this._numberLine;
    }

    /* * * * * * 
     * Methods * 
     * * * * * */
    public focus(): MathLineInput {
        this._mathField.focus();
        return this;
    }

    public value(): string {
        return this._mathField.latex();
    }

    public setValue(pValue: string): MathLineInput {
        this._mathField.latex(pValue);
        return this;
    }

    public appendValueAtCursorPosition(pValue: string): MathLineInput {
        this._mathField.typedText(pValue);
        return this;
    }

    public appendCmdAtCursorPosition(pValue: string): MathLineInput {
        this._mathField.cmd(pValue);
        return this;
    }

    public writeLatexAtCursorPosition(pLatex: string): MathLineInput {
        this._mathField.write(pLatex);
        return this;
    }

    public isEmpty(): boolean {
        return this.value() === '';
    }
    
    public appendTo(pElement: JQueryElement): MathLineInput {
        this._jQWrapperEl.appendTo(pElement);
        return this;
    }

    public appendToContainer(): MathLineInput {
        this.appendTo(this._container);
        return this;
    }

    public insertAfter(pElement: JQueryElement): MathLineInput {
        this._jQWrapperEl.insertAfter(pElement);
        return this;
    }

    public insertBefore(pElement: JQueryElement): MathLineInput {
        this._jQWrapperEl.insertBefore(pElement);
        return this;
    }

    public hasPreviousMathLineInput(): boolean {
        if (this._previousMathLineInput !== null) {
            this._previousMathLineInput instanceof MathLineInput;
            return true;
        }

        return (false);
    }

    public hasNextMathLineInput(): boolean {
        return (this._nextMathLineInput !== null);
    }

    public hasBeenModifiedSinceLastFocusOut(): boolean {
        return (this.value() !== this._lastValueBeforeFocusOut);
    }

    public createNewMathLineInputAndAppendBefore(pMathLineInput: MathLineInput): MathLineInput {
        const newMathLineInput = new MathLineInput(this._container, this.saverNOpenerManager);
              newMathLineInput.nextMathLineInput = pMathLineInput;

              newMathLineInput.insertBefore(pMathLineInput._jQWrapperEl)
                              .updatenumberLineNDisplay(this._numberLine)
                              .incrementFollowingsMathLineInputsnumberLine();

        if (pMathLineInput.hasPreviousMathLineInput()) {
            newMathLineInput.previousMathLineInput = pMathLineInput.previousMathLineInput;
            pMathLineInput.previousMathLineInput!.nextMathLineInput = newMathLineInput;
        }

        pMathLineInput.previousMathLineInput = newMathLineInput;
        newMathLineInput.isDeletable = true;

        return newMathLineInput;
    }

    public createNewMathLineInputAndAppendAfter(pMathLineInput: MathLineInput): MathLineInput {
        const newMathLineInput = new MathLineInput(this._container, this.saverNOpenerManager);

              newMathLineInput.insertAfter(pMathLineInput._jQWrapperEl)
                              .updatenumberLineNDisplay(this._numberLine + 1);

        if (pMathLineInput.hasNextMathLineInput()) {
            pMathLineInput.nextMathLineInput!.previousMathLineInput = newMathLineInput;
            newMathLineInput.nextMathLineInput = pMathLineInput.nextMathLineInput;

            newMathLineInput.incrementFollowingsMathLineInputsnumberLine();
        }

        pMathLineInput.nextMathLineInput = newMathLineInput;
        newMathLineInput.previousMathLineInput = pMathLineInput;
        newMathLineInput.isDeletable = true; 

        return newMathLineInput;
    }

    public getOffset(): Offset {
        return this._jQWrapperEl.offset();
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
            this._previousMathLineInput!.nextMathLineInput = this.nextMathLineInput;
        }
        
        if (this.hasNextMathLineInput()) {
            this._nextMathLineInput!.previousMathLineInput = this.previousMathLineInput;
        }

        this._autoCompleter.hide();
        this.removeFromDOM();
        this.decrementFollowingsMathLineInputsnumberLine();
        g_s4mCoreMemory.removeAllProducedBy(this);

        return this;
    }

    public removeFromDOM(): MathLineInput {
        this._jQWrapperEl.remove();
        g_outputScreen.removeMessagesOf(this);
        return this;
    }

    public keyDown(pFunction: Function): MathLineInput {
        this.jQEl.keydown((e: EventObject) => pFunction(e));

        return this;
    }

    public keyUp(pFunction: Function): MathLineInput {
        this.jQEl.keyup((e: EventObject) => pFunction(e));
        return this;
    }

    public autoCompleterIsVisible(): boolean {
        return this._autoCompleter.isVisible();
    }

    public blur(): MathLineInput {
        this._mathField.blur();

        return this;
    }

    public keyStroke(pKey: string): MathLineInput {
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

    protected getContainerTopCoord(): number {
        return this._container.offset().top;
    }

    protected getContainerBottomCoord(): number {
        return this.getContainerTopCoord().valueOf() + this.container.outerHeight().valueOf();
    }

    protected getTopCoord(): number {
        return this._jQEl.offset().top;
    }

    protected getBottomCoord(): number {
        return this.getTopCoord().valueOf() + this._jQEl.outerHeight().valueOf();
    }

    protected adjustContainerScrollToMe(): MathLineInput {
        const scrollUpAdjust = 20;
        const scrollDownAdjust = 45;
        
        if (this.getTopCoord() < this.getContainerTopCoord()) {
            this._container.scrollTop(this._container.scrollTop() - scrollUpAdjust);
        } else if (this.getBottomCoord() > this.getContainerBottomCoord()) {
            this._container.scrollTop(this._container.scrollTop() + scrollDownAdjust);
        }

        if (!(this.hasPreviousMathLineInput())) {
            this._container.scrollTop(0);
        } else if (!(this.hasNextMathLineInput())) {
            this._container.scrollTop(this._container.scrollTop() + this._container.height());
        } else {
            
        }

        return this;
    }

    protected boldNumberLine(): MathLineInput {
        this._jQWrapperEl.find('.number_line span').css({
            'font-weight': 'bold',
            'opacity': '1',
        });

        return this;
    }

    protected unBoldnumberLine(): MathLineInput {
        this._jQWrapperEl.find('.number_line span').css({
            'font-weight': 'lighter',
            'opacity': '0.5',
        });

        return this;
    }

    protected setEvents(): MathLineInput {
        this.setKeyDownEvents();
        this.setKeyUpEvents();

        this._jQEl.focusin(() => {
            if (g_s4mCoreMemory !== undefined) {
                g_s4mCoreMemory.currentMathLineInputFocusedIs(this);
            }

            this.adjustContainerScrollToMe()
                .boldNumberLine();
        });

        this._jQEl.focusout(() => {
            this._autoCompleter.hide();
            g_s4mCoreMemory.lastMathLineInputFocusedOutIs(this);
            g_s4mCoreMemory.setCurrentMathLineInputFocusedToNull();

            this.unBoldnumberLine();
            
            // S4M interactions:
            if (S4MLParser !== undefined && g_s4mCoreMemory !== undefined) {
                g_s4mCoreMemory.currentMathLineInputFocused = null;
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
        g_outputScreen.removeMessagesOf(this);
        
        try {
            const S4MLQuestion = this.value();
            const parsedStr = S4MLParser.parse(S4MLQuestion, {processedMathLineInput: this});
            const answerMessagesArray: string[] = [S4MLQuestion];

            console.log('S4ML:-- ' + this.value());
            // console.log('nerdamer:-- ' + parsedStr);

            nerdamer.set('SOLUTIONS_AS_OBJECT', true);

            // Display answer if nerdamer has a string output
            if (parsedStr !== undefined && parsedStr !== "[Unprocess]" && parsedStr.substring(0, 7) !== "[Print]" && parsedStr !== '') {
                let nerdamerAnswer = nerdamer(parsedStr);
                if (nerdamerAnswer.toString() !== "undefined") {
                    const nerdamerLatexAnswer = nerdamerAnswer.latex();
                    const evaluatedAnswer = nerdamerAnswer.evaluate();
                    const evaluatedLatexAnswer: string = evaluatedAnswer.latex();
                    // const recurringNumericalAnswer: string = evaluatedAnswer.text('recurring');
                    const approxAnswer: string = evaluatedAnswer.text('decimals', 50);

                    answerMessagesArray.push(nerdamerLatexAnswer);

                    // if evaluatedLatexAnswer is different from all messages already shown
                    if (answerMessagesArray.indexOf(evaluatedLatexAnswer) === -1) {
                        answerMessagesArray.push(evaluatedLatexAnswer);
                    }

                    // // if recurringNumericalAnswer is not too long and different from all messages already shown
                    // if (recurringNumericalAnswer.length < 200 && answerMessagesArray.indexOf(recurringNumericalAnswer) === -1) {
                    //     answerMessagesArray.push(recurringNumericalAnswer.replace(/'([0-9]+)'/, '\\overline{$1}'));
                    // }

                    // if approxAnswer is different from all messages already shown
                    if (answerMessagesArray.indexOf(approxAnswer) === -1) {
                        answerMessagesArray.push(approxAnswer);
                    }

                    g_outputScreen.displayAnswerMessage(answerMessagesArray, this);
                }
            } else if (parsedStr.substring(0, 7) == "[Print]") {
                let latexStr = parsedStr.substring("[Print]".length, parsedStr.length);
                
                answerMessagesArray.push(latexStr);
                g_outputScreen.displayPrintLatexMessage(answerMessagesArray , this);
            }
            
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

    public delete(): void {
        if (this.hasPreviousMathLineInput() || this.hasNextMathLineInput()) {
            if (this.hasNextMathLineInput()) {
                this.nextMathLineInput!.focus();
            } else {
                this.previousMathLineInput!.focus();
            }

            this.erase();
        }
    }

    protected setKeyDownEvents(): MathLineInput {
        this.keyDown((e: EventObject) => {

            //press delete ==> delete line if is empty
            if (e.which === KeyCodes.DELETE_KEY && this.isEmpty()) {
                this.delete();

            //press backspace ==> delete if is empty
            } else if (e.which === KeyCodes.BACKSPACE_KEY && this.isDeletable) {
                this.doIfKeyBackspace();

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
        this.keyUp((e: EventObject) => {
            if (this.isEmpty()) {
                this.isDeletable = true;
            } else {
                this.isDeletable = false;
            }
        });

        return this;
    }

    //protected getLocationOf(pCursor: MathFieldTreeElement): string[] {
    protected getLocationOf(pCursor: any): string[] {
        const L = -1;
        const R = 1;
        const retCursorLocation: string[] = [];
        let mathfieldTreeElement: any;

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

    protected setLocationOf(pCursor: (string|number)[]) {
        const L = -1;
        const R = 1;
        
        let mathfieldTreeElement: any = this._mathField.__controller.root;

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

    public isAGivenLine(): boolean {
        if (this.value().substr(0, 14) === '\\text{Given}\\ ') {
            return true;
        }

        return false;
    }

    public isAnUnprocessedLine(): boolean {
        if (this.value().substr(0, 8) === '\\vdash\\ ') {
            return true;
        }

        return false;
    }

    public isASeparatorLine(): boolean {
        return this.value() == '--';
    }

    public isALetLine(): boolean {
        if (this.value().substr(0, 12) === "\\text{Let}\\ ") {
            return true;
        }

        return false;
    }

    public isACommentLine(): boolean {
        return this.value()[0] === "#";
    }

    public isAPrintLine(): boolean {
        return (this.value().substr(0, 14) === "\\text{Print}\\ ");
    }

    public isAGraphLine(): boolean {
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
    }

    public stopBeingALetLine(): MathLineInput {
        this.shiftKeywordInField('Let');
        return this;
    }

    public stopBeingAPrintLine(): MathLineInput {
        this.setValue(this.value().substring("\\text{Print}\\ ".length, this.value().length));
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

        this.saveUndoRedoState();
        return this;
    }

    
    public becomeAnUnprocessedLine(): MathLineInput {
        if (!this.isAnUnprocessedLine()) {
            this.prependToFieldLatex('\\vdash\\ ');
        }

        this.saveUndoRedoState();
        return this;
    }

    public becomeALetLine(): MathLineInput {
        if (!(this.isALetLine())) {
            if (this.isAGivenLine()) {
                this.stopBeingAGivenLine();
            }

            this.prependToFieldKeyword('Let');
        }

        this.saveUndoRedoState();
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

    public givenLineToggle(): MathLineInput {
        if (this.isAGivenLine()) {
            this.stopBeingAGivenLine();
        } else {
            this.becomeAGivenLine();
        }

        return this;
    }

    public printLine(): MathLineInput {
        if (this.isAPrintLine()) {
            this.stopBeingAPrintLine();
        } else {
            this.becomeAPrintLine();
        }

        this.saveUndoRedoState();
        return this;
    }

    public displaySaveWidget(): MathLineInput {
        this.saverNOpenerManager.setActionToSave();
        this.saverNOpenerManager.callingMathLineInput = this;
        this.saverNOpenerManager.show();

        return this;
    }

    public displayOpenWidget(): MathLineInput {
        this.saverNOpenerManager.setActionToOpen();
        this.saverNOpenerManager.callingMathLineInput = this;
        this.saverNOpenerManager.show();

        return this;
    }

    public openWidgetToggle(): MathLineInput {
        if (this.saverNOpenerManager.isVisible()) {
            this.saverNOpenerManager.hide();
        } else {
            this.displayOpenWidget();
        }

        return this;
    }

    public saveWidgetToggle(): MathLineInput {
        if (this.saverNOpenerManager.isVisible()) {
            this.saverNOpenerManager.hide();
        } else {
            this.displaySaveWidget();
        }

        return this;
    }

    public unprocessedLineToggle(): MathLineInput {
        if (this.isAnUnprocessedLine()) {
            this.stopBeingAnUnprocessedLine();
        } else {
            this.becomeAnUnprocessedLine();
        }

        return this;
    }

    public becomeAPrintLine(): MathLineInput {
        if (!(this.isAPrintLine())) {
            this.setValue("\\text{Print}\\ " + this.value());
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

    public prependToFieldKeyword(pKeyword: string, pFollowingStr: string='\\ '): MathLineInput {
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

    public prependToFieldLatex(pLatexKeyword: string): MathLineInput {
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

    
    public shiftLatexInField(pLatexKeyword: string): MathLineInput {
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

    public shiftKeywordInField(pKeyword: string): MathLineInput {
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

    public AreCursorAndAnticursorAtSameLocation(pCursorConfiguration: CursorConfiguration): boolean {
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

    public getTypedHistory(): UndoRedoStatement[] {
        return this._undoRedoManager.getTypedHistory();
    }

    public setTypedHistoryWith(pTypedHistory: UndoRedoStatement[]): MathLineInput {
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
        g_outputScreen.displayErrorMessage(errorObject, this);

        return this;
    }

    public signalNoError(): MathLineInput {
        this._isErrored = false;
        this._jQEl.attr('title', this.value());
        this.setStyle();

        g_s4mCoreMemory.unstoreErroredMathLineInput(this);
        
        return this;
    }

    public doIfKeyEnter(): MathLineInput {
        if ((this._autoCompleter.isVisible() === false)) {  
            const newMathLineInput = this.createNewMathLineInputAndAppendAfter(this);
        
            newMathLineInput.focus();   
        }

        return this;
    }

    public doIfKeyBackspace(): MathLineInput {
        if (this.hasPreviousMathLineInput() && this.isEmpty()) {
            this.erase();
            this.previousMathLineInput!.focus();
        }
        
        return this;
    }

    public undo(): MathLineInput {
        this._undoRedoManager.undo();
        return this;
    }

    public redo(): MathLineInput {
        this._undoRedoManager.redo();
        return this;
    }

    protected updatenumberLineNDisplay(pnumberLine: number): MathLineInput {
        this._numberLine = pnumberLine;
        let spanEl = this._jQWrapperEl.find('.number_line span');

        spanEl.text(((this._numberLine < 10) ? ' ' : '') + '[' + (pnumberLine) + ']')
        return this;
    }

    protected updateOutputScreenTitle(): MathLineInput {
        let messageGeneratedByMe = g_outputScreen.getMessageGeneratedBy(this);
        if (messageGeneratedByMe !== null) {
            messageGeneratedByMe.setTitleTo('Line [' + this.numberLine + ']');
        }

        return this;
    }

    public incrementnumberLine(): MathLineInput {
        this._numberLine++;
        this.updatenumberLineNDisplay(this._numberLine);
        this.updateOutputScreenTitle();

        return this;
    }

    public decrementnumberLine(): MathLineInput {
        this._numberLine--;
        this.updatenumberLineNDisplay(this._numberLine);
        this.updateOutputScreenTitle();
        return this;
    }

    public incrementFollowingsMathLineInputsnumberLine(): MathLineInput {
        for (let mathLineInput: MathLineInput | null = this.nextMathLineInput; mathLineInput !== null; mathLineInput = mathLineInput.nextMathLineInput) {
            mathLineInput.incrementnumberLine();
        }

        return this;
    }

    public decrementFollowingsMathLineInputsnumberLine(): MathLineInput {
        for (let mathLineInput: MathLineInput | null = this.nextMathLineInput; mathLineInput !== null; mathLineInput = mathLineInput.nextMathLineInput) {
            mathLineInput.decrementnumberLine();
        }

        return this;
    }
}