class InputScren {
    protected _jQEl: JQueryElement;
    protected _showHideOutputScreenButton: JQueryElement;
    protected _outputScreen: OutputScreen;
    protected _solveButton: JQueryElement;
    protected _showHideVirtualKeyboardButtonEl: JQueryElement;
    protected _letLineToggleButtonEl: JQueryElement;
    protected _unprocessLineToggleButtonEl: JQueryElement;
    protected _virtualKeyboard: VirtualKeyboard;
    protected _app: JQueryElement;

    public constructor(pJQueryElement: JQueryElement,
                       pShowHideOutputScreenButtonEl: JQueryElement,
                       pOutputScren: OutputScreen,
                       pSolveButton: JQueryElement,
                       pVirtualKeyboard: VirtualKeyboard,
                       pApp: JQueryElement) {
        this._jQEl = pJQueryElement;
        this._showHideOutputScreenButton = pShowHideOutputScreenButtonEl;
        this._letLineToggleButtonEl = this._showHideOutputScreenButton.children().eq(0);
        this._unprocessLineToggleButtonEl = this._showHideOutputScreenButton.children().eq(1);
        this._showHideVirtualKeyboardButtonEl = this._showHideOutputScreenButton.children().eq(2);
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

        this._jQEl.mousedown((e: EventObject) => {
            e.preventDefault();
        })

        this._showHideOutputScreenButton.click((e: EventObject) => {
            e.preventDefault();
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

        this._showHideVirtualKeyboardButtonEl.mousedown((e: EventObject) => {
            e.preventDefault();
        });

        this._letLineToggleButtonEl.mousedown((e: EventObject) => {
            e.preventDefault();
        });

        this._unprocessLineToggleButtonEl.mousedown((e: EventObject) => {
            e.preventDefault();
        });

        this._showHideVirtualKeyboardButtonEl.click((e: EventObject) => {
            e.preventDefault();
            e.stopPropagation();

            this._virtualKeyboard.toggle();
        });

        this._letLineToggleButtonEl.click((e: EventObject) => {
            e.preventDefault();
            e.stopPropagation();
            g_s4mCoreMemory.getMathLineInputToEdit().letLineToggle();
        });

        this._unprocessLineToggleButtonEl.click((e: EventObject) => {
            e.preventDefault();
            e.stopPropagation();
            g_s4mCoreMemory.getMathLineInputToEdit().unprocessedLineToggle();
        });

        return this;
    }

    public clickOnShowHideOutputScreenButton(): InputScren {
        this._showHideOutputScreenButton.click();
        return this;
    }
}