class OutputScreen {
    protected _jQEl: JQueryElement;
    protected _isVisible: Boolean;

    public constructor(pJQueryElement: JQueryElement) {
        this._jQEl = pJQueryElement;
        this._isVisible = true;

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
}