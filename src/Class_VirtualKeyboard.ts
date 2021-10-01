class VirtualKeyboard {
    protected _jQEl: JQueryElement;
    protected _isVisible: Boolean;

    public constructor(pJQueryElement: JQueryElement) {
        this._jQEl = pJQueryElement;
        this._jQEl.hide(0);
        this._isVisible = false;

        this.setEvents();
    }

    public isVisible(): Boolean {
        return this._isVisible
    }

    public show(): VirtualKeyboard {
        this._jQEl.animate({width:'toggle'},250, () => {
            this._isVisible = true;
        });

        return this;
    }

    public hide(): VirtualKeyboard {
        this._jQEl.animate({width:'toggle'},250, () => {
            this._isVisible = true;
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

    protected setEvents(): VirtualKeyboard {
        this._jQEl.mousedown((e) => {
            e.preventDefault();
            console.log('pouet');
        });

        return this;
    }
}