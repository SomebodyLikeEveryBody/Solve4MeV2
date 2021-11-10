/*
 * Class SaverNOpenerStateManager
 * ------------------------------
 * Class that manage the save/open states feature.
 * 
 * Because the purpose of S4M is to be full in
 * front-end, there will be no way to save files on the
 * computer or use files stored on the computer.
 * 
 * So this features will just display or hide a textarea
 * element containing all the content of MathLineInputs 
 * in JSON format.
 * 
 * Press CTRL + S ==> Save
 * = display the textarea, containing all the contents
 *   of the MathLineinputs in JSON-Format, so we can
 *   copy it, paste it into a text-editor and save it
 *   manually on the computer.
 *   * Press Enter hide the textarea
 * 
 * Press CTRL + O ==> Open
 * = display the textarea with an empty JSON-object string
 *   as content, where we can paste the json-format
 *   string previously stored on a file for example.
 *   * Press Enter hide the textarea and load all
 *     MathLineInputs of the JSON-object
 * 
 * * */
enum SaverNOpenerStateManagerAction {
    NOTHING = "",
    OPEN = "OPEN",
    SAVE = "SAVE",
}

class SaverNOpenerStateManager {
    protected _jQEl: JQueryElement;                         // JQueryElement containing the textarea to type JSON string
    protected _textarea: JQueryElement;                     // The textarea to type JSON string
    protected _action: SaverNOpenerStateManagerAction;      // The action the classe is supposed to do. Can be SAVE, OPEN or NOTHING
    protected _callingMathLineInput: MathLineInput | null;  //
    protected _isVisible: boolean;

    public constructor() {
        this._jQEl = $('<div id="SaverNOpenerStateManager"><textarea autocorrect="off" autocapitalize="off" spellcheck="false"></textarea></div>');
        this._textarea = this._jQEl.find('textarea');
        this._callingMathLineInput = null;
        this._action = SaverNOpenerStateManagerAction.NOTHING;
        this._isVisible = false;

        this._jQEl.appendTo($('body')).hide(0);
        this.setEvents();
    }

    public set callingMathLineInput(pValue: MathLineInput) {
        this._callingMathLineInput = pValue;
    }

    public setActionToSave(): this {
        this._action = SaverNOpenerStateManagerAction.SAVE;
        return this;
    }

    public setActionToOpen(): this {
        this._action = SaverNOpenerStateManagerAction.OPEN;
        return this;
    }

    public setActionToNothing(): this {
        this._action = SaverNOpenerStateManagerAction.NOTHING;
        return this;
    }

    public isActionIsSave(): boolean {
        return (this._action === SaverNOpenerStateManagerAction.SAVE);
    }

    public isActionIsOpen(): boolean {
        return (this._action === SaverNOpenerStateManagerAction.OPEN);
    }

    public isActionIsNothing(): boolean {
        return (this._action === SaverNOpenerStateManagerAction.NOTHING);
    }

    /*
     * Replace all non printable chars with nothing
     * * */
    protected secureStr(pStr: string): string {
        return pStr.replace(/[^ -~]+/g, "");
    }

    public show(): this {
        if (this.isActionIsSave() || this.isActionIsOpen()) {
            if (this.isActionIsSave()) {
                this._textarea.val(this.secureStr(this.getJSONState()));
                this.disableEditing();
            } else if (this.isActionIsOpen()) {
                this._textarea.val('{"MathLineInputsValues":[""]}');
                this.enableEditing();
            }
    
            this._jQEl.fadeIn(100, () => {
                this._textarea.select();
                this._isVisible = true;
            });
        }

        return this;
    }

    public hide(): this {
        this._jQEl.fadeOut(100, () => {
            const callingMathLineInput = this.getCallingMathLineInput();
            this._textarea.val('');
            this.setActionToNothing();
            this._isVisible = false;
            if (callingMathLineInput !== null) {
                callingMathLineInput.focus();
            }
        });

        return this;
    }

    public isVisible(): boolean {
        return this._isVisible;
    }
    
    public getCallingMathLineInput(): MathLineInput | null {
        return this._callingMathLineInput;
    }

    public getLastMathLineInput(): MathLineInput | null {
        let retMathLineInput: (MathLineInput | null) = this._callingMathLineInput;

        if (retMathLineInput !== null) {
            retMathLineInput = retMathLineInput.getLastMathLineInput();
        }

        return retMathLineInput;
    }

    public getFirstMathLineInput(): MathLineInput | null {
        let retMathLineInput: (MathLineInput | null) = this._callingMathLineInput;

        if (retMathLineInput !== null) {
            retMathLineInput = retMathLineInput.getFirstMathLineInput();
        }

        return retMathLineInput
    }

    public enableEditing(): this {
        this._textarea.attr('readonly', false);
        return this;
    }

    public disableEditing(): this {
        this._textarea.attr('readonly', true);
        return this;
    }

    protected setEvents(): this {
        this._jQEl.keydown((pEventObj: EventObject) => {
            switch (pEventObj.which) {
                case KeyCodes.ESCAPE_KEY:
                    this.hide();
                    break;

                case KeyCodes.ENTER_KEY:
                    pEventObj.preventDefault();
                    if (this.isActionIsOpen()) {
                        const textareaValue = this.secureStr(this._textarea.val());
                        const state = JSON.parse(textareaValue.valueOf());
                        this.replaceMathLineInputs(state['MathLineInputsValues']);
                    }

                    this.hide();
                    break;
            }
        });

        return this;
    }

    public eraseMathLineInputs(): this {
        let currentMathLineInput: (MathLineInput | null) = this.getLastMathLineInput();

        while (currentMathLineInput !== null) {
            currentMathLineInput.nextMathLineInput = null;
            currentMathLineInput.removeFromDOM();
            currentMathLineInput = currentMathLineInput.previousMathLineInput;
        }

        return this;
    }

    protected checkState(): boolean {
        return true;
    }

    protected replaceMathLineInputs(pState: Array<string>): this {
        const callingMathLineInput = this.getCallingMathLineInput();
        if ((callingMathLineInput !== null) && this.checkState()) {
            if (pState.length !== 0) {
                this.eraseMathLineInputs();
                let mathLineInput = new MathLineInput(callingMathLineInput.container, this);
                    mathLineInput.appendToContainer()
                                 .setValue(pState[0])
                                 .setStyle();
    
                pState = pState.slice(1)
                for (let index in pState) {
                    mathLineInput = mathLineInput.createNewMathLineInputAndAppendAfter(mathLineInput);
                    mathLineInput.setValue(pState[index])
                                 .setStyle();
                }
    
                mathLineInput.getLastMathLineInput().focus();
            }
        }

        return this;
    }

    public getJSONState(): string {
        const retObj = {
            MathLineInputsValues: Array<string>()
        };

        let mathLineInput = this.getFirstMathLineInput();
        while (mathLineInput !== null) {
            retObj.MathLineInputsValues.push(this.secureStr(mathLineInput.value()));
            mathLineInput = mathLineInput.nextMathLineInput;
        }

        return JSON.stringify(retObj);
    }
}