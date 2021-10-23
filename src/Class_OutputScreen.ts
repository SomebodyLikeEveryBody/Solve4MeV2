class OutputScreenMessage {
    protected _JQEl: JQueryElement;
    protected _mathLineInputSource: MathLineInput;

    public constructor(pMessage: String, pMathLineInputSource: MathLineInput) {
        this._JQEl = $('<div>' + pMessage +'</div>');
        this._mathLineInputSource = pMathLineInputSource;

        this._JQEl.fadeOut(0);
    }

    public get mathLineInputSource(): MathLineInput {
        return this._mathLineInputSource;
    }

    public appendTo(pElement: JQueryElement): OutputScreenMessage {
        this._JQEl.appendTo(pElement);
        return this;
    }

    public insertBefore(pElement: JQueryElement): OutputScreenMessage {
        this._JQEl.insertBefore(pElement);
        return this;
    }

    public toggle(): OutputScreenMessage {
        this._JQEl.show(200);
        return this;
    }

    public removeFromDOM(): OutputScreenMessage {
        this._JQEl.hide(200, () => {
            this._JQEl.remove();
        });
        return this;
    }
    
}

class OutputScreenErrorMessage extends OutputScreenMessage {
    public constructor(pErrorMessage: String, pMathLineInputSource: MathLineInput) {
        super(pErrorMessage, pMathLineInputSource);
        this._JQEl.addClass("error_message")
    }
}

class OutputScreenAnswerMessage extends OutputScreenMessage {
    public constructor(pAnswerMessage: String, pMathLineInputSource: MathLineInput) {
        super(pAnswerMessage, pMathLineInputSource);
        this._JQEl.addClass("answer_message");
    }
}

class OutputScreen {
    protected _jQEl: JQueryElement;
    protected _jQElContent: JQueryElement;
    protected _isVisible: Boolean;
    protected _messages: Array<OutputScreenMessage>;

    public constructor(pJQueryElement: JQueryElement) {
        this._jQEl = pJQueryElement;
        this._isVisible = true;
        this._messages = [];
        this._jQElContent = this._jQEl.find('#output_screen');

        this.setEvents();
    }

    protected setEvents(): OutputScreen {
        this._jQEl.mousedown((e: EventObject) => {
            e.preventDefault();
        })

        return this;
    }

    public isVisible(): Boolean {
        return this._isVisible;
    }

    public setVisibilityTo(pBool: Boolean) {
        this._isVisible = pBool;
    }

    public hide(pFunction?: Function): OutputScreen {
        this._jQEl.fadeOut(100, pFunction);
        this.setVisibilityTo(false);

        return this;
    }

    public show(pFunction?: Function): OutputScreen {
        this._jQEl.fadeIn(100, pFunction);
        this.setVisibilityTo(true);

        return this;
    }

    public displayError(pErrorObject: ErrorObject, pErroredMathLineInput: MathLineInput): OutputScreen {
        let newErrorMessage = new OutputScreenErrorMessage("[Line [1]]:<br />[" + pErrorObject.name + "]: " + pErrorObject.message, pErroredMathLineInput);

        this._messages.push(newErrorMessage);
        newErrorMessage.insertBefore(this._jQElContent.find('hr')).toggle();
        return this;
    }

    public displayAnswerMessage(pAnswerMessage: String, pMathLineInput: MathLineInput): OutputScreen {
        let newAnswerMessage = new OutputScreenAnswerMessage(pAnswerMessage, pMathLineInput);

        this._messages.push(newAnswerMessage);
        newAnswerMessage.insertBefore(this._jQElContent.find('hr')).toggle();
        return this;
    }

    public removeMessagesOf(pMathLineInput: MathLineInput): OutputScreen {
        let messageToRemove = this._messages.filter((messageEl) => (messageEl.mathLineInputSource === pMathLineInput));
        if (messageToRemove[0] !== undefined) {
            this._messages = this._messages.filter((messageEl) => (messageEl !== messageToRemove[0]));
            messageToRemove[0].removeFromDOM();
        }
        
        return this;
    }
}