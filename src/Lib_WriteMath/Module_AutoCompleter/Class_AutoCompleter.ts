/******************************************************************************************
* AutoCompleterManager:
* Wrapper object that wrap the textarea where the auto-completion takes place.
* It reimplements the functions of the textarea jQuery element
* and implements new ones.
* */
class AutoCompleterManager {

    protected _inputTextElement: InputTextElement;
    protected _autoCompletionWidget: AutoCompletionWidget;

    public constructor(pInputTextElement: InputTextElement) {
        this._inputTextElement = pInputTextElement;
        this._autoCompletionWidget = new AutoCompletionWidget(this);
    }
    

    /*
    * AutoCompleterManager.keydown():
    * Shortcut to use this.jqEl.keydown
    * */
    public keyDown(pFunction: Function): void {
        this._inputTextElement.keyDown(pFunction);
    }

    public deleteLeftWord(pWordLen: Number): void {
        this._inputTextElement.deleteLeftWord(pWordLen);
    }

    public updateContentAndShow(pKwList: String[]): void {
        this._autoCompletionWidget.updateContentAndShow(pKwList);

    }

    public getValueFromInputText(): String {
        return this._inputTextElement.value();
    }

    public selectNextKeyword(): void {
        this._autoCompletionWidget.selectNextKeyword();
    }

    public selectPreviousKeyword(): void {
        this._autoCompletionWidget.selectPreviousKeyword();
    }

    public setValueToInputText(pValue: String): void {
        this._inputTextElement.setValue(pValue);
    }

    public isVisible(): Boolean {
        return this._autoCompletionWidget.isVisible();
    }

    public getSelectedKeyword(): String {
        return this._autoCompletionWidget.getSelectedKeyword();
    }

    public hide(): void {
        this._autoCompletionWidget.hide();
    }

    public show(): void {
        this._autoCompletionWidget.show();
    }

    public setVisibility(pBool: Boolean) {
        this._autoCompletionWidget.setVisibility(pBool);
    }

    /*
    * AutoCompleterManager.keyup():
    * Shortcut to use this.jqEl.keyup
    * */
    public keyUp(pFunction: Function): void {
        this._inputTextElement.keyUp(pFunction);
    }

    /*
    * AutoCompleterManager.focus():
    * Put the focus on the AutoCompleterManager
    * */
    protected focus(): void {
        this._inputTextElement.focus();
    }

    /*
    * AutoCompleterManager.getSelectionStart():
    * Returns the selectionStart value of the <textatrea#input> element.
    * This will be rewrote in a near future to be up to date ==> <REWRITE>
    * */
    protected getSelectionStart(): Number {
        // return this._inputTextElement.get(0).selectionStart;
        return 42;
    }

    /*
    * AutoCompleterManager.getInputStr():
    * Gives the content of the AutoCompleterManager in raw str
    * */
    public getInputStr(): String {
        return this._inputTextElement.value();
    }

    /*
    * AutoCompleterManager.getCurrentlyTypingWord():
    * Returns the word being typed by the user.
    * This function is used to filter the keywordsList in order to
    * display the suggested keywords according to what the user is currently typing.
    * */
    public getCurrentlyTypingWord(): String {
        // const words = this.getInputStr()
        //                 .replace(/_/g, ' ')
        //                 .replace(/\^/g, ' ')
        //                 .replace(/\{/g, ' ')
        //                 .replace(/\}/g, ' [END_BRACKET]')
        //                 .replace(/\\left\(/g, ' ')
        //                 .replace(/\\right\)/g, ' [END_PARENTHESIS]')
        //                 .replace('\\', ' ')
        //                 .split(' ');

        // let typingWord = '[END_BRACKET]';
        // while (typingWord === '[END_BRACKET]' || typingWord === '[END_PARENTHESIS]') {
        //     typingWord = (words.at(-1) !== undefined ? words.pop() : '');
        // }

        // if (typingWord.indexOf('[END_BRACKET]') !== -1) {
        //     typingWord = typingWord.replace(/\[END_BRACKET\]/g, '')
        // }

        // if (typingWord.indexOf('[END_PARENTHESIS]') !== -1) {
        //     typingWord = typingWord.replace(/\[END_PARENTHESIS\]/g, '')
        // }

        const typingWord = 'pouet';
        return typingWord;
    };

    /*
     * AutoCompleterManager.getCaretCoordinates():
     * Returns the Top and Left coordinates of the caret in the AutoCompleterManager.
     * Uses getCaretCoordinates() function defined in  ./textareaCaretPosition.js.
     * The code and a lot of other features are available here: https://github.com/component/textarea-caret-position
     * */
    public getCursorCoordinates(): Coordinates2D {
        return this._inputTextElement.getCursorCoordinates();
    }

    /*
     * AutoCompleterManager.setContent(pValue):
     * Erase all the content of the AutoCompleterManager and set its content to pValue
     * */
    protected setContent(pValue: String): void {
        this._inputTextElement.setValue(pValue);
    }

    public addContent(pValue: String): void {
        this._inputTextElement.appendValueAtCursorPosition(pValue);
    }

    public addCmd(pValue: String): void {
        this._inputTextElement.appendCmdAtCursorPosition(pValue);
    }
}

/******************************************************************************************
* AutoCompletionWidget:
* Wrapper Object that manages the auto-completion Widget displayed over the textarea.
* Attributes are:
* - this.currentKeywordSelectedIndex = the index of the selected keyword in the widget
*                                      (-1 if no keyword is selected)
* - this.nbKeywords = the number of keywords displayed in the widget
* - this.isVisible = boolean, true if the widget is asked to be visible while typing,
*                    false if not.
*                     
* - this.AutoCompleterManager = the AutoCompleterManager Object where the auto-completion takes place
* */
class AutoCompletionWidget {
    protected _jQEl: JQueryElement;
    protected _currentKeywordSelectedIndex: number;
    protected _nbKeywords: Number;
    protected _isVisible: Boolean;
    protected _autoCompleterManager: AutoCompleterManager;

    public constructor(pAutoCompleterManager: AutoCompleterManager) {
        this._jQEl = $('<ul id="auto_completer"></ul>');
        this.hide(0);
        this.appendTo($('body'));
    
        this._currentKeywordSelectedIndex = -1;
        this._nbKeywords = 0;
        this._isVisible = false;
        this._autoCompleterManager = pAutoCompleterManager;
    }
    
    /*
    * AutoCompletionWidget.show():
    * Displays the auto-completion widget in the AutoCompleterManager
    * */
    public show() {
        this._jQEl.fadeIn(100);
    };

    public isVisible(): Boolean {
        return this._isVisible;
    }

    /*
    * AutoCompletionWidget.hide():
    * Hides the auto-completion widget
    * */
    public hide(pTime: Number = 100): void {
        this._jQEl.fadeOut(100, () => {
            this.emptyContent();
        })
    };

    protected appendTo(pElement: JQueryElement): void {
        this._jQEl.appendTo(pElement);
    }

    public setVisibility(pBool: Boolean): void {
        this._isVisible = pBool;
    }

    /*
    * AutoCompletionWidget.emptyContent():
    * Empty the content of the widget
    * */
    protected emptyContent(): void {
        this._jQEl.html('');
        this._nbKeywords = 0;
        this._currentKeywordSelectedIndex = -1;
    };

    /*
    * AutoCompletionWidget.getLiElements():
    * Returns all Li elements contained in the widget
    * */
    protected getLiElements(): JQueryElement {
        return this._jQEl.find('li');
    }

    /*
    * AutoCompletionWidget.positionWidgetUnderCaret():
    * Positions the widget under the caret of the textarea
    * For now, it shifts the coordinates to 30px down and 5px right
    * but in the near future we will shift with relative values
    * to give more flexibility and adapt font-sizes that have not
    * default values.
    * */
    protected positionWidgetUnderCursor() {
        const caretCoords: Coordinates2D = this._autoCompleterManager.getCursorCoordinates();
        this._jQEl.css({
            "top":  '' + (caretCoords.top.valueOf() + 30) +'px',
            "left": '' + (caretCoords.left.valueOf() + 5) + 'px',
        });
    }

    /*
    * AutoCompletionWidget.getFirstLiElement():
    * Returns the first Li elements contained in the widget
    * */
    protected getFirstLiElement(): JQueryElement {
        return this.getLiElements().first();
    }

    /*
    * AutoCompletionWidget.setLiElementSelected(pLiElement):
    * Takes a Li element (pLiElement) contained in the widget and set it to selected
    * */    
    protected setLiElementSelected (pLiElement: JQueryElement): void {
        pLiElement.addClass('selected_keyword');
    }

    /*
    * AutoCompletionWidget.setLiElementUnselected(pLiElement):
    * Takes a Li element (pLiElement) contained in the widget and set it to NOT selected
    * */
    protected setLiElementUnselected(pLiElement: JQueryElement) {
        pLiElement.removeClass('selected_keyword');
    }

    /*
    * AutoCompletionWidget.updateContentAndShow(pKwList):
    * Updates the content of the widget by clearing its content
    * and filling it with the keyword list given in argument (pKwList).
    * Then it displays it if there is at leat one keyword, or hide it if not.
    * */
    public updateContentAndShow(pKwList: String[]): void {
        this.emptyContent();
        this._nbKeywords = pKwList.length;
        
        if (pKwList.length !== 0) {
            this.positionWidgetUnderCursor();
            for (let keyword of pKwList) {
                this._jQEl.append($('<li>' + keyword + '</li>'));
            }

            if (this._currentKeywordSelectedIndex === -1) {
                this.setLiElementSelected(this.getFirstLiElement());
                this._currentKeywordSelectedIndex = 0;
            }

            this.show();

        } else {
            this.hide();
        }
    }

    /*
    * AutoCompletionWidget.getSelectedLiEl():
    * Returns the selected Li element in the widget
    * */
    protected getSelectedLiEl(): JQueryElement {
        return $(this.getLiElements().get(this._currentKeywordSelectedIndex));
        
    }

    /*
    * AutoCompletionWidget.getSelectedKeyword():
    * Returns the selected keyword in the widget
    * */
    public getSelectedKeyword(): String {
        return this.getSelectedLiEl().text();
    };

    /*
    * AutoCompletionWidget.selectNextKeyword():
    * Set to selected the Li element in the widget that is next to the currently
    * selected Li element, and unselect this one
    * */
    public selectNextKeyword(): void {
        const selectedLiEl = this.getSelectedLiEl();
        const nextLiEl = selectedLiEl.next();

        if (nextLiEl.length !== 0) {
            this.setLiElementUnselected(selectedLiEl);
            nextLiEl.addClass('selected_keyword');
            this._currentKeywordSelectedIndex += 1;
        }
    };

    /*
    * AutoCompletionWidget.selectPreviousKeyword():
    * Set to selected the Li element in the widget that is before the currently
    * selected Li element, and unselect this one
    * */
    public selectPreviousKeyword(): void {
        const selectedLiEl = this.getSelectedLiEl();
        const previousLiEl = selectedLiEl.prev();

        if (previousLiEl.length !== 0) {
            this.setLiElementUnselected(selectedLiEl);
            previousLiEl.addClass('selected_keyword');
            this._currentKeywordSelectedIndex -= 1;
        }
    }
}

/*******************************************************************************************
* ClickAndKeyListener:
* Object that Manages the events definition
* */
class ClickAndKeyListener {

    protected _IsCtrlKeyIsDown: Boolean;
    protected _autoCompleterManager: AutoCompleterManager;
    
    public constructor(pAutoCompleterManager: AutoCompleterManager) {
        this._IsCtrlKeyIsDown = false;
        this._autoCompleterManager = pAutoCompleterManager;
    }

    /*
    * ClickAndKeyListener.setKeydownEventsToAutoCompleterManager(pController):
    * Definition of what to do when we press keys in the AutoCompleterManager.
    *  .  CTRL + SPACE ==> display / hide the auto-completer widget
    *  .  UP / DOWN / ENTER / BACKSPACE ==> navigation into the auto-completer widget
    *  .  ESCAPE ==> hide auto-completer widget
    * */
    protected setKeyDownEventsToAutoCompleterManager(pController: AutoCompleter) {
        this._autoCompleterManager.keyDown((e: EventObject) => {
            if (e.which === KeyCodes.CTRL_KEY) {
                this._IsCtrlKeyIsDown = true;
            }

            /*
             * Ctrl key down + SPACE
             * */

            if (this._IsCtrlKeyIsDown) {
                if (e.which === KeyCodes.SPACE_KEY) {
                    if (this._autoCompleterManager.isVisible() === true) {
                        this._autoCompleterManager.hide();
                        this._autoCompleterManager.setVisibility(false);

                    } else {
                        const keywordsList = pController.getFormatedMatchkingKeywordsList();

                        if (keywordsList.length === 1) {
                            this.writeKeyword(keywordsList[0]);
                        } else {
                            this._autoCompleterManager.updateContentAndShow(keywordsList);
                            this._autoCompleterManager.setVisibility(true);    
                        }                        
                    }
                }

            /*
             * Ctrl key is up and auto-completer widget is visibles
             * */
            } else if (this._autoCompleterManager.isVisible()) {
                if (e.which === KeyCodes.ENTER_KEY) {
                    const selectedKeyword = this._autoCompleterManager.getSelectedKeyword();
                    // const currentlyTypingWord = this._autoCompleterManager.getCurrentlyTypingWord();
                    // const inputStr = this._autoCompleterManager.getInputStr();
                    //let startText = inputStr.substring(0, this.AutoCompleterManager.getSelectionStart() - currentlyTypingWord.length);
                    //let endText = inputStr.substring(this.AutoCompleterManager.getSelectionStart(), inputStr.length);
                    
                    // console.log(selectedKeyword);

                    if (selectedKeyword !== '') {
                        this.writeKeyword(selectedKeyword);
                        this._autoCompleterManager.hide();
                        this._autoCompleterManager.setVisibility(false);
                        e.preventDefault();
                    }

                } else if (e.which === KeyCodes.DOWNARROW_KEY) {
                    this._autoCompleterManager.selectNextKeyword();
                    e.preventDefault();

                } else if (e.which === KeyCodes.UPARROW_KEY) {
                    this._autoCompleterManager.selectPreviousKeyword();
                    e.preventDefault();
                }
            }
        });
    }

    protected writeKeyword(pSelectedKeyword: String): void {
        this._autoCompleterManager.deleteLeftWord(this._autoCompleterManager.getCurrentlyTypingWord().length);

        if (pSelectedKeyword[0] === '\\') {
            this._autoCompleterManager.addCmd(pSelectedKeyword);
        } else {
            this._autoCompleterManager.addContent(pSelectedKeyword);
        }
    }

    /*
    * ClickAndKeyListener.setKeyupEventsToAutoCompleterManager():
    * Definition of what to do when we release keys in the AutoCompleterManager.
    * Very usefull to manage the navigation into the auto-completionWidget
    * */
    protected setKeyUpEventsToAutoCompleterManager(pController: AutoCompleter) {
        this._autoCompleterManager.keyUp((e: EventObject) => {
            if (this._autoCompleterManager.isVisible()
                && (e.which !== KeyCodes.UPARROW_KEY) 
                && (e.which !== KeyCodes.DOWNARROW_KEY)) {
                this._autoCompleterManager.updateContentAndShow(pController.getFormatedMatchkingKeywordsList());
            }

            if (e.which === KeyCodes.CTRL_KEY) {
                this._IsCtrlKeyIsDown = false;
            }
        });
    }

    /*
    * ClickAndKeyListener.setkeyAndMouseEvents():
    * Set all events definitions of the ClickAndKeyListener object
    * */
    public setkeyAndMouseEvents(pController: AutoCompleter) {
        this.setKeyDownEventsToAutoCompleterManager(pController);
        this.setKeyUpEventsToAutoCompleterManager(pController);
    };
}

/*******************************************************************************************
* AutoCompleter:
* Controller object of the auto-completion feature.
* Manages the events setting through ClickAndKeyListener object
* */
class AutoCompleter {
    protected _keywordsList: KeywordObject[];
    protected _autoCompleterManager: AutoCompleterManager;
    protected _clickAndKeyListener: ClickAndKeyListener;

    public constructor(pInputTextElement: InputTextElement, pKeywordsList: KeywordObject[]) {
        this._keywordsList = pKeywordsList;
        this._autoCompleterManager = new AutoCompleterManager(pInputTextElement);
        this._clickAndKeyListener = new ClickAndKeyListener(this._autoCompleterManager);
    
        this._clickAndKeyListener.setkeyAndMouseEvents(this)
    }
    
    public isVisible(): Boolean {
        return this._autoCompleterManager.isVisible();
    }

    public hide(): void {
        this._autoCompleterManager.hide();
        this._autoCompleterManager.setVisibility(false);
    }

    
    /*
    * AutoCompleter.getMatchkingKeywordsList():
    * Returns an array containing all keywords contained in the pList object,
    * but only the word or that is currently typed in the AutoCompleterManager is contained
    * in the keyword or its tags.
    * */
    protected getMatchkingKeywordsList(): KeywordObject[] {
        let currentlyTypingWord = this._autoCompleterManager.getCurrentlyTypingWord().toLowerCase();
        return this._keywordsList.filter(el => ((el.keyword.toLowerCase().indexOf(currentlyTypingWord) !== -1)
                                            || (el.tags.toLowerCase().indexOf(currentlyTypingWord) !== -1)));
    }

    /*
    * Controller.getKeywordsList():
    * Returns an array containing all keywords contained in the pList object,
    * but only the word or that is currently typed in the AutoCompleterManager is contained
    * in the keyword or its tags.
    * But here, "keyword" is meant the string part before the opening parenthesis.
    * To be clear:
    * - if the keyword is a function, like "solv(VAR, EXPR)", the returned keyword in in the array
    *   will be "solv()"
    * - if the keyword isn't a function, like "Infinity", the returned keyword in the array
    *   will be "Infinity"
    * 
    * */
    public getFormatedMatchkingKeywordsList(): String[] {
        const helperKeywordsList = this.getMatchkingKeywordsList();
        const retKeywords = helperKeywordsList.map((el) => {
            const indexOfOpeningParenthesis = el.keyword.indexOf('(');

            if (indexOfOpeningParenthesis !== -1) {
                return el.keyword.substring(0, indexOfOpeningParenthesis + 1) + ')';
            } else {
                return el.keyword;
            }
        });

        return (retKeywords.slice(0, 11));
    }
}
