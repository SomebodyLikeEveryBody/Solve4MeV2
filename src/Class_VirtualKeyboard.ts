class VirtualKeyboard {
    protected _jQEl: JQueryElement;
    protected _isVisible: Boolean;

    public constructor(pJQueryElement: JQueryElement) {
        this._jQEl = pJQueryElement;
        this._jQEl.hide(0);
        this._isVisible = false;
    }

    public isVisible(): Boolean {
        return this._isVisible
    }

    public show(): VirtualKeyboard {
        this._jQEl.fadeIn(70, () => {
            this._isVisible = true;
        });

        return this;
    }

    public hide(): VirtualKeyboard {
        this._jQEl.fadeOut(70, () => {
            this._isVisible = false;
        });

        return this;
    }

    public toggle(): VirtualKeyboard {
        if (this._isVisible) {
            this.hide();
        } else {
            this.show();
        }

        return this;
    }
}