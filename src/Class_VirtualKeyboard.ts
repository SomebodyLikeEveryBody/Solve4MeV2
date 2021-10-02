declare const MathQuill: any;

class VirtualKeyboard {
    protected _jQEl: JQueryElement;
    protected _isVisible: Boolean;
    protected _panels: any;

    // protected _numbersPanel: KeyboardPanel;
    // protected _lettersPanel: KeyboardPanel;
    // protected _symbolsPanel: KeyboardPanel;
    // protected _signsPanel: KeyboardPanel;
    // protected _functionsPanel: KeyboardPanel;

    public constructor(pJQueryElement: JQueryElement) {
        this._jQEl = pJQueryElement;
        // this._jQEl.hide(0);
        // this._isVisible = false;
        this._jQEl.show(0);
        this._isVisible = true;
        this._panels = {}

        this._panels.numbersPanel = new KeyboardPanel([
            ["a^b", "b^a", "\\ge", "\\le", "\\sqrt{x}"],
            ["a", "b", "c", "d", "e"],
            ["a", "b", "c", "d", "e"],
            ["a", "b", "c", "d", "e"],
        ]);

        this._panels.numbersPanel.appendTo(this._jQEl);
        this.setPanels()
            .setEvents();
    }

    protected setPanels(): VirtualKeyboard {
        return this;
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

class KeyboardPanel {
    protected _jQEl: JQueryElement;
    protected _lineKeysArray: LineKeys[];

    public constructor(pLabels: Array<String[]>) {
        this._jQEl = $('<div class="keyboard_panel"></div>');
        this.createLineKeysArray(pLabels)
            .includeLineKeys();
    }

    protected createLineKeysArray(pLabels: Array<String[]>): KeyboardPanel {
        this._lineKeysArray = [];

        for (let pLabelsArray of pLabels) {
            this._lineKeysArray.push(new LineKeys(pLabelsArray));
        }

        return this;
    }

    protected includeLineKeys(): KeyboardPanel {
        for (let lineKeys of this._lineKeysArray) {
            lineKeys.appendTo(this._jQEl);
        }

        return this;
    }

    public appendTo(pElement: JQueryElement): KeyboardPanel {
        this._jQEl.appendTo(pElement);
        return this;
    }

    public append(pElement: JQueryElement): KeyboardPanel {
        this._jQEl.append(pElement);
        return this;
    }
}

class LineKeys {
    protected _jQEl: JQueryElement;
    protected _touchKeys: TouchKey[]

    public constructor(pLatexKeyLabels: String[]) {
        this._jQEl = $('<div class="line_key"></div>');
        this.createTouchKeys(pLatexKeyLabels)
            .includeKeys();
    }

    protected createTouchKeys(pLatexLabels: String[]): LineKeys {
        this._touchKeys = [];

        for (let latexLabel of pLatexLabels) {
            this._touchKeys.push(new TouchKey(latexLabel));
        }

        return this;
    }

    public includeKeys(): LineKeys {
        for (let key of this._touchKeys) {
            key.appendTo(this._jQEl);
        }
        return this;
    }

    public appendTo(pElement: JQueryElement): LineKeys {
        this._jQEl.appendTo(pElement);
        return this;
    }

    public append(pElement: JQueryElement): LineKeys {
        this._jQEl.append(pElement);
        return this;
    }
}

class TouchKey {
    protected _jQEl: JQueryElement;
    protected _value: String;
    protected _mathField: any;

    public constructor (pLatexLabel: String) {
        this._jQEl = $('<div class="keyboard_key unselectable"><span></span></div>');
        this._mathField = MathQuill.getInterface(2).StaticMath(this._jQEl.find('span')[0]);

        this.setLatexLabel(pLatexLabel);
    }

    public setLatexLabel(pLatexLabel: String): TouchKey {
        this._mathField.latex(pLatexLabel);
        return this;
    }

    public appendTo(pElement: JQueryElement): TouchKey {
        this._jQEl.appendTo(pElement);
        return this;
    }

    public append(pElement:JQueryElement): TouchKey {
        this._jQEl.append(pElement);
        return this;
    }
}