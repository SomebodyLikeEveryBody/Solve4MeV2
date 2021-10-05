class SaverNOpenerStateManager {
    protected _jQEl: JQueryElement;
    protected _textarea: JQueryElement;
    protected _action: String;
    protected _callingMathLineInput: Array<MathLineInput>;

    public constructor() {
        this._jQEl = $('<div id="SaverNOpenerStateManager"><textarea autocorrect="off" autocapitalize="off" spellcheck="false"></textarea></div>');
        this._textarea = this._jQEl.find('textarea');
        this._callingMathLineInput = [];
        this._action = "";

        this._jQEl.appendTo($('body')).hide(0);
        this.setEvents();
    }

    public get jQEl(): JQueryElement {
        return this._jQEl;
    }

    public get action(): String {
        return this._action;
    }

    public set action(pValue: String) {
        if (pValue === "SAVE" || pValue === "OPEN") {
            this._action = pValue;
        }
    }

    public set callingMathLineInput(pValue: MathLineInput) {
        this._callingMathLineInput = [pValue];
    }

    protected secureStr(pStr: String): String {
        return pStr.replace(/[^ -~]+/g, "");
    }

    public show(): SaverNOpenerStateManager {
        if (this.action === "SAVE" || this._action === "OPEN") {
            if (this._action === "SAVE") {
                this._textarea.val(this.secureStr(this.getJSONState()));
                this.disableEditing();
            } else if (this._action === "OPEN") {
                this._textarea.val('{"MathLineInputsValues":[""]}');
                this.enableEditing();
            }
    
            this._jQEl.fadeIn(100, () => {
                this._textarea.select();
            });
        }

        return this;
    }

    public hide(): SaverNOpenerStateManager {
        this._jQEl.fadeOut(100, () => {
            this._textarea.val('');
            this._action = "";
            this.getCallingMathLineInput().focus();
        });

        return this;
    }

    public getCallingMathLineInput(): MathLineInput {
        return this._callingMathLineInput[0];
    }

    public enableEditing(): SaverNOpenerStateManager {
        this._textarea.attr('readonly', false);
        return this;
    }

    public disableEditing(): SaverNOpenerStateManager {
        this._textarea.attr('readonly', true);
        return this;
    }

    protected setEvents(): void {
        this._jQEl.keydown((pEventObj: EventObject) => {
            switch (pEventObj.which) {
                case KeyCodes.ESCAPE_KEY:
                    this.hide();
                    break;

                case KeyCodes.ENTER_KEY:
                    pEventObj.preventDefault();
                    if (this._action === "OPEN") {
                        const textareaValue = this.secureStr(this._textarea.val());
                        const state = JSON.parse(textareaValue.valueOf());
                        this.replaceMathLineInputs(state['MathLineInputsValues']);
                    }

                    this.hide();
                    break;
            }
        });
    }

    public eraseMathLineInputs(): SaverNOpenerStateManager {
        let currentMathLineInput: (MathLineInput | null) = this.getCallingMathLineInput().getLastMathLineInput();

        while (currentMathLineInput !== null) {
            currentMathLineInput.nextMathLineInput = null;
            currentMathLineInput.removeFromDOM();
            currentMathLineInput = currentMathLineInput.previousMathLineInput;
        }

        return this;
    }

    protected checkState(): Boolean {
        return true;
    }

    protected replaceMathLineInputs(pState: Array<String>): SaverNOpenerStateManager {
        if (this.checkState()) {
            if (pState.length !== 0) {
                this.eraseMathLineInputs();
                let mathLineInput = new MathLineInput(this.getCallingMathLineInput().container, this);
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

    public getJSONState(): String {
        const retObj = {
            MathLineInputsValues: Array<String>()
        };

        let mathLineInput = this.getCallingMathLineInput().getFirstMathLineInput();
        while (mathLineInput !== null) {
            retObj.MathLineInputsValues.push(this.secureStr(mathLineInput.value()));
            mathLineInput = mathLineInput.nextMathLineInput;
        }

        return JSON.stringify(retObj);
    }
}