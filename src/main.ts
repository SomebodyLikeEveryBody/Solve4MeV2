class InputScren {
    protected _jQEl: JQueryElement;
    protected _showHideOutputScreenButton: JQueryElement;
    protected _outputScreen: OutputScreen;

    public constructor(pJQueryElement: JQueryElement, pShowHideOutputScreenButton: JQueryElement, pOutputScren: OutputScreen) {
        this._jQEl = pJQueryElement;
        this._showHideOutputScreenButton = pShowHideOutputScreenButton;
        this._outputScreen = pOutputScren;

        this.setEvents();
    }

    protected setEvents(): InputScren {
        this._showHideOutputScreenButton.click(() => {
            if (this._outputScreen.isVisible()) {
                this._outputScreen.hide(() => {
                    this._jQEl.animate({
                        'width': '100%',
                    }, 300);
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

const g_s4mCoreMemory = new S4MCoreMemory();
const g_outputScreen = new OutputScreen($('#output_container'));
const g_inputScreen = new InputScren($('#input_container'), $('#logo_container'), g_outputScreen);