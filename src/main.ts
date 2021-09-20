declare var g_s4mCoreMemory: any;

class InputScren {
    protected _jQEl: JQueryElement;
    protected _showHideOutputScreenButton: JQueryElement;
    protected _outputScreen: OutputScreen;
    protected _solveButton: JQueryElement;

    public constructor(pJQueryElement: JQueryElement, pShowHideOutputScreenButton: JQueryElement, pOutputScren: OutputScreen, pSolveButton: JQueryElement) {
        this._jQEl = pJQueryElement;
        this._showHideOutputScreenButton = pShowHideOutputScreenButton;
        this._outputScreen = pOutputScren;
        this._solveButton = pSolveButton;

        this.setEvents();
    }

    protected setEvents(): InputScren {
        this._showHideOutputScreenButton.click(() => {
            if (this._outputScreen.isVisible()) {
                this._outputScreen.hide(() => {
                    this._jQEl.animate({
                        'width': '100%',
                        'height': '100%',
                    }, 300);

                this._solveButton.addClass('alone');

                });
            } else {
                this._jQEl.animate({
                    'width': '50%',
                }, 300, () => {
                    this._outputScreen.show();
                });
            }

        g_s4mCoreMemory.lastMathLineInputFocusedOut.focus();

        });

        return this;
    }

    public clickOnShowHideOutputScreenButton(): InputScren {
        this._showHideOutputScreenButton.click();
        return this;
    }
}

class OutputScreen {
    protected _jQEl: JQueryElement;
    protected _isVisible: Boolean;

    public constructor(pJQueryElement: JQueryElement) {
        this._jQEl = pJQueryElement;
        this._isVisible = true;
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
}

class KeyBoardListener {
    protected _inputScreen: InputScren;
    protected _outputScreen: OutputScreen;
    protected _isCtrlDown: Boolean;

    public constructor(pInputScreen: InputScren, pOutputScreen: OutputScreen) {
        this._inputScreen = pInputScreen;
        this._outputScreen = pOutputScreen;
        this._isCtrlDown = false;
        this.setEvents();
    }

    protected setEvents(): KeyBoardListener {
        $('body').keydown((e) => {
            if (e.which === KeyCodes.CTRL_KEY) {
                this._isCtrlDown = true;
            }

            if (e.which === KeyCodes.E_KEY && this._isCtrlDown) {
                e.preventDefault();
                this._inputScreen.clickOnShowHideOutputScreenButton();
            }
        });

        $('body').keyup((e) => {
            if (e.which === KeyCodes.CTRL_KEY) {
                this._isCtrlDown = false;
            }
        });

        return this;
    }
}