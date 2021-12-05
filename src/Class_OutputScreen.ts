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

    public appendTo(pElement: JQueryElement): this {
        this._jQEl.appendTo(pElement);
        return this;
    }

    public insertBefore(pElement: JQueryElement): this {
        this._jQEl.insertBefore(pElement);
        return this;
    }

    public toggle(pCallBack?: Function): this {
        this._jQEl.toggle(200, pCallBack);
        return this;
    }

    public removeFromDOM(): this {
        this._jQEl.hide(200, () => {
            this._jQEl.remove();
        });
        return this;
    }

    public setTitleTo(pStr: string): this {
        this._jQEl.find('.message_title').text(pStr);
        return this;
    }

    public getTitle(): string {
        return this._jQEl.find('.message_title').text();
    }

    public getTopCoord(): number {
        return this._jQEl.offset().top;
    }

    public getBottomCoord(): number {
        return this.getTopCoord() + this._jQEl.outerHeight().valueOf();
    }

    public blinkAnimate(): this {

        // console.log('blink');
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

    public appendMessageAndScrollToItAndBlinkIt(pMessage: OutputScreenErrorMessage | OutputScreenAnswerMessage) {
        this.appendMessageAtCorrectLocation(pMessage, () => {
            this.adjustScrollToMessage(pMessage);
        });

        if (pMessage instanceof OutputScreenAnswerMessage) {
            pMessage.renderMathAnswers();
        }

        pMessage.blinkAnimate();
    }

    public displayErrorMessage(pErrorObject: ErrorObject, pErroredMathLineInput: MathLineInput): OutputScreen {
        let newErrorMessage = new OutputScreenErrorMessage({
            title: "Line [" + pErroredMathLineInput.numberLine + "]:",
            body: ["[" + pErrorObject.name + "]: " + pErrorObject.message],
        }, pErroredMathLineInput);

        this._messages.push(newErrorMessage);
        this.appendMessageAndScrollToItAndBlinkIt(newErrorMessage);
        
        return this;
    }

    public displayAnswerMessage(pAnswerStr: string[], pMathLineInputSource: MathLineInput): OutputScreen {
        let newAnswerMessage = new OutputScreenAnswerMessage({
            title: "Line [" + pMathLineInputSource.numberLine + "]:",
            body: pAnswerStr,
        }, pMathLineInputSource);
    
        this._messages.push(newAnswerMessage);
        this.appendMessageAndScrollToItAndBlinkIt(newAnswerMessage);

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

    public appendMessageAtCorrectLocation(pNewAnswerMessage: OutputScreenMessage, pCallBack?: Function): OutputScreen {
        let messageJustAfter: OutputScreenMessage | null = this.getMessageWhichIsAfterMessageOf(pNewAnswerMessage.mathLineInputSource);

        if (messageJustAfter === null) {
            pNewAnswerMessage.insertBefore(this._jQElContent.find('hr#outputscreen_end_line')).toggle(pCallBack);
        } else {
            pNewAnswerMessage.insertBefore(messageJustAfter.jQEl).toggle(pCallBack);
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

    protected getTopCoord(): number {
        const scrollableContent = this._jQEl.find('#output');
        return scrollableContent.offset().top;
    }

    protected getBottomCoord(): number {
        const scrollableContent = this._jQEl.find('#output');
        return this.getTopCoord() + scrollableContent.outerHeight();
    }

    protected scrollTop(): this {
        const scrollableContent = this._jQEl.find('#output');
        scrollableContent.scrollTop(0);
        return this;
    }

    protected scrollBottom(): this {
        const scrollableContent = this._jQEl.find('#output');
        scrollableContent.scrollTop(scrollableContent.scrollTop() + scrollableContent.height());
        return this;
    }

    protected adjustScrollToMessage(pMessage: OutputScreenMessage): this {
        const scrollableContent = this._jQEl.find('#output');
        const scrollAdjust = 35;

        if ((pMessage.getTopCoord() < this.getTopCoord())
            || (pMessage.getBottomCoord() > this.getBottomCoord())) {
                scrollableContent.stop().animate({
                    scrollTop: pMessage.jQEl.offset().top
                }, 500);
        }

        console.log('adjusting');
        
        return this;
    }
}