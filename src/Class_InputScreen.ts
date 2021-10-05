class InputScren {
    protected _jQEl: JQueryElement;
    protected _showHideOutputScreenButton: JQueryElement;
    protected _outputScreen: OutputScreen;
    protected _solveButton: JQueryElement;
    protected _showHideVirtualKeyboard: JQueryElement;
    protected _virtualKeyboard: VirtualKeyboard;
    protected _app: JQueryElement;

    public constructor(pJQueryElement: JQueryElement, pShowHideOutputScreenButton: JQueryElement, pOutputScren: OutputScreen, pSolveButton: JQueryElement, pVirtualKeyboard: VirtualKeyboard, pApp: JQueryElement) {
        this._jQEl = pJQueryElement;
        this._showHideOutputScreenButton = pShowHideOutputScreenButton;
        this._showHideVirtualKeyboard = this._showHideOutputScreenButton.children().first();
        this._outputScreen = pOutputScren;
        this._solveButton = pSolveButton;
        this._virtualKeyboard = pVirtualKeyboard;
        this._app = pApp;

        this.setEvents();
    }

    protected setEvents(): InputScren {
        this._showHideOutputScreenButton.mousedown((e: EventObject) => {
            e.preventDefault();
        });

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
        });

        this._showHideVirtualKeyboard.mousedown((e: EventObject) => {
            e.preventDefault();
        });

        this._showHideVirtualKeyboard.click((e: EventObject) => {
            e.preventDefault();
            e.stopPropagation();

            this._virtualKeyboard.toggle();
        });

        return this;
    }

    public clickOnShowHideOutputScreenButton(): InputScren {
        this._showHideOutputScreenButton.click();
        return this;
    }
}