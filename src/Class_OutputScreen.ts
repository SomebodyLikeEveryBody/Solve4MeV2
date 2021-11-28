interface MessageObject {
    title: string;
    body: string[];
}

class OutputScreenMessage {
    protected _jQEl: JQueryElement;
    protected _mathLineInputSource: MathLineInput;

    public constructor(pMessage: MessageObject, pMathLineInputSource: MathLineInput) {
        this._jQEl = $('<div><div class="message_title">' + pMessage.title + '</div><div class="message_body"></div></div>');
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

    public setTitleTo(pStr: string): OutputScreenMessage {
        this.jQEl.find('.message_title').text(pStr);
        return this;
    }
    
}

class OutputScreenErrorMessage extends OutputScreenMessage {
    public constructor(pErrorMessage: MessageObject, pMathLineInputSource: MathLineInput) {
        super(pErrorMessage, pMathLineInputSource);

        for (let str of pErrorMessage.body) {
            this._jQEl.find('.message_body').append($('<div></div').css({'border': 'none'}).text(str));
            this._jQEl.find('.message_body').append($('<hr class="error_message_separator" />'));
        }

        this._jQEl.find('hr.error_message_separator:last').remove();
        this._jQEl.addClass("error_message");
    }
}

class OutputScreenAnswerMessage extends OutputScreenMessage {
    protected _messages: string[];
    protected _mathFields: any[];

    public constructor(pAnswerMessage: MessageObject, pMathLineInputSource: MathLineInput) {
        super(pAnswerMessage, pMathLineInputSource);
        this._messages = pAnswerMessage.body;
        this._mathFields = [];

        let newMathField: any;
        let newDiv: JQueryElement;
        let first = true;
        
        for (let str of pAnswerMessage.body) {
            newDiv = $('<div class="answer_body_container"></div>');

            if (first === true) {
                newDiv.append($('<div class="answer_interrogation"></div>'));
                first = false;
            } else {
                newDiv.append($('<div class="answer_equal"></div>'));
            }
            
            newDiv.append($('<div class="answer_mathfield"></div>'));

            newMathField = MathQuill.getInterface(2).StaticMath(newDiv.find('.answer_mathfield').get(0));
            this._mathFields.push(newMathField);

            // newMathField.latex('\\left(\\frac{2}{3}\\right)^2');

            this._jQEl.find('.message_body').append(newDiv);
            this._jQEl.find('.message_body').append($('<hr class="answer_message_separator" />'));
        }

        this._jQEl.find('hr.answer_message_separator:last').remove();
        this._jQEl.addClass("answer_message");
    }

    public renderMathAnswers(): this {
        for (const index in this._messages) {
            this._mathFields[index].latex(this._messages[index]);
        }

        return this;
    }
}

class OutputScreen {
    protected _jQEl: JQueryElement;
    protected _jQElContent: JQueryElement;
    protected _isVisible: boolean;
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

    public isVisible(): boolean {
        return this._isVisible;
    }

    public setVisibilityTo(pBool: boolean) {
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
            body: ["[" + pErrorObject.name + "]: " + pErrorObject.message],
        }, pErroredMathLineInput);

        this._messages.push(newErrorMessage);
        this.appendMessageAtCorrectLocation(newErrorMessage);
        
        return this;
    }

    public displayAnswerMessage(pAnswerStr: string[], pMathLineInputSource: MathLineInput): OutputScreen {
        let newAnswerMessage = new OutputScreenAnswerMessage({
            title: "Line [" + pMathLineInputSource.numberLine + "]:",
            body: pAnswerStr,
        }, pMathLineInputSource);
    
        this._messages.push(newAnswerMessage);
        this.appendMessageAtCorrectLocation(newAnswerMessage);
        newAnswerMessage.renderMathAnswers();

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
            pNewAnswerMessage.insertBefore(this._jQElContent.find('hr#outputscreen_end_line')).toggle();
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