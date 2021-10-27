interface MessageObject {
    title: String;
    body: String;
}

class OutputScreenMessage {
    protected _jQEl: JQueryElement;
    protected _mathLineInputSource: MathLineInput;

    public constructor(pMessage: MessageObject, pMathLineInputSource: MathLineInput) {
        this._jQEl = $('<div><div class="message_title">' + pMessage.title + '</div><div class="message_body">' + pMessage.body + '</div></div>');
        this._mathLineInputSource = pMathLineInputSource;

        this._jQEl.fadeOut(0);
    }

    public get mathLineInputSource(): MathLineInput {
        return this._mathLineInputSource;
    }

    public get jQEl (): JQueryElement {
        return this._jQEl;
    }

    public appendTo(pElement: JQueryElement): OutputScreenMessage {
        this._jQEl.appendTo(pElement);
        return this;
    }

    public insertBefore(pElement: JQueryElement): OutputScreenMessage {
        this._jQEl.insertBefore(pElement);
        return this;
    }

    public toggle(): OutputScreenMessage {
        this._jQEl.show(200);
        return this;
    }

    public removeFromDOM(): OutputScreenMessage {
        this._jQEl.hide(200, () => {
            this._jQEl.remove();
        });
        return this;
    }

    public setTitleTo(pStr: String): OutputScreenMessage {
        this.jQEl.find('.message_title').text(pStr);
        return this;
    }
    
}

class OutputScreenErrorMessage extends OutputScreenMessage {
    public constructor(pErrorMessage: MessageObject, pMathLineInputSource: MathLineInput) {
        super(pErrorMessage, pMathLineInputSource);
        this._jQEl.addClass("error_message");
    }
}

class OutputScreenAnswerMessage extends OutputScreenMessage {
    public constructor(pAnswerMessage: MessageObject, pMathLineInputSource: MathLineInput) {
        super(pAnswerMessage, pMathLineInputSource);
        this._jQEl.addClass("answer_message");
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

    public displayErrorMessage(pErrorObject: ErrorObject, pErroredMathLineInput: MathLineInput): OutputScreen {
        let newErrorMessage = new OutputScreenErrorMessage({
            title: "Line [" + pErroredMathLineInput.numberLine + "]:",
            body: "[" + pErrorObject.name + "]: " + pErrorObject.message,
        }, pErroredMathLineInput);

        this._messages.push(newErrorMessage);
        this.appendMessageAtCorrectLocation(newErrorMessage);
        
        return this;
    }

    public displayAnswerMessage(pAnswerStr: String, pMathLineInputSource: MathLineInput): OutputScreen {
        let newAnswerMessage = new OutputScreenAnswerMessage({
            title: "Line [" + pMathLineInputSource.numberLine + "]:",
            body: pAnswerStr,
        }, pMathLineInputSource);
    
        this._messages.push(newAnswerMessage);
        this.appendMessageAtCorrectLocation(newAnswerMessage);

        return this;
    }

    protected getMessageWhichIsAfterMessageOf(pMathLineInputSource: MathLineInput): OutputScreenMessage | null {
        let retMessage: OutputScreenMessage | null = null;

        for (let outputScreenMessage of this._messages) {
            if (outputScreenMessage.mathLineInputSource.numberLine > pMathLineInputSource.numberLine) {
                if (retMessage === null) {
                    retMessage = outputScreenMessage;
                } else {
                    if (outputScreenMessage.mathLineInputSource.numberLine < retMessage.mathLineInputSource.numberLine ) {
                        retMessage = outputScreenMessage;
                    }
                }
            }
        }

        return retMessage;
    }

    public appendMessageAtCorrectLocation(pNewAnswerMessage: OutputScreenMessage): OutputScreen {
        let messageJustAfter: OutputScreenMessage | null = this.getMessageWhichIsAfterMessageOf(pNewAnswerMessage.mathLineInputSource);

        if (messageJustAfter === null) {
            pNewAnswerMessage.insertBefore(this._jQElContent.find('hr')).toggle();
        } else {
            pNewAnswerMessage.insertBefore(messageJustAfter.jQEl).toggle();
        }

        return this;
    }

    public removeMessagesOf(pMathLineInputSource: MathLineInput): OutputScreen {
        let messageToRemove = this._messages.filter((messageEl) => (messageEl.mathLineInputSource === pMathLineInputSource));
        if (messageToRemove[0] !== undefined) {
            this._messages = this._messages.filter((messageEl) => (messageEl !== messageToRemove[0]));
            messageToRemove[0].removeFromDOM();
        }
        
        return this;
    }

    public getMessageGeneratedBy(pMathLineInput: MathLineInput): OutputScreenMessage | null {
        for (let message of this._messages) {
            if (message.mathLineInputSource === pMathLineInput) {
                return message;
            }
        }

        return null;
    }
}