declare const MathQuill: any;
declare const g_s4mCoreMemory: S4MCoreMemory;

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
        this._panels = {}
        // this._jQEl.hide(0);
        // this._isVisible = false;
        this._jQEl.show(0);
        this._isVisible = true;

        this._panels.numbersPanel = new NumbersPanel();

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
        });

        return this;
    }
}

class KeyboardPanel {
    protected _jQEl: JQueryElement;
    protected _lineKeysArray: LineKeys[];

    public constructor(pLineKeysArray: Array<LineKeys>) {
        this._jQEl = $('<div class="keyboard_panel"></div>');
        this._lineKeysArray = pLineKeysArray;
        this.includeLineKeysInJQEl();
    }

    protected includeLineKeysInJQEl(): KeyboardPanel {
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
    protected _touchKeys: Array<TouchKey>;

    public constructor(pKeys: Array<TouchKey>) {
        this._jQEl = $('<div class="line_key"></div>');
        this._touchKeys = pKeys;
        this.includeKeysInJQEl();
    }

    public includeKeysInJQEl(): LineKeys {
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

interface KeyConfiguration {
    label: String;
    action: Function,
    width: Number;
    style: VirtualKeyboardKeyStyle;
}

class TouchKey {
    protected _jQEl: JQueryElement;
    protected _label: String
    protected _width: Number;
    protected _style: VirtualKeyboardKeyStyle;
    protected _mathField: any;

    public constructor (pKeyConfiguration: KeyConfiguration) {
        this._label = pKeyConfiguration.label;
        this._width = pKeyConfiguration.width;
        this._style = pKeyConfiguration.style;
        this._jQEl = this.generateMathfieldJQEl(this._label);

        this.setEvent(pKeyConfiguration.action)
            .setStyle();
    }

    protected setStyle(): TouchKey {
        this._jQEl.addClass('keyboard_key_' + this._style);
        this._jQEl.css({ 'flex-grow' : this._width + '' });
        return this;
    }   

    protected setEvent(pFunction: Function): TouchKey {
        this._jQEl.click(() => {
            pFunction();
        });

        return this;
    }

    protected generateMathfieldJQEl(pLatexLabel: String): JQueryElement {
        const tempJQEl = $('<div class="keyboard_key unselectable"><span></span></div>');
        this._mathField = MathQuill.getInterface(2).StaticMath(tempJQEl.find('span')[0]);
        this.setLatexLabel(pLatexLabel);

        //remove all events of mathfield span element
        const retJQEl = tempJQEl.clone();
        tempJQEl.replaceWith(retJQEl);
        return retJQEl;
    }

    protected setLatexLabel(pLatexLabel: String): TouchKey {
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

class NumbersPanel extends KeyboardPanel {
    public constructor () {
        super([
            new LineKeys([
                new TouchKey({
                    label: "[ABC]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { console.log("go to panel [ABC]")}
                }),
                new TouchKey({
                    label: "[L]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.letLineToggle(); }
                }),
                new TouchKey({
                    label: "\\star",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\star'); }
                }),
                new TouchKey({
                    label: "7",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('7'); }
                }),
                new TouchKey({
                    label: "8",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('8'); }
                }),
                new TouchKey({
                    label: "9",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('9'); }
                }),
                new TouchKey({
                    label: "\\frac{a}{b}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('/'); }
                }),
                new TouchKey({
                    label: "\\text{\\}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new TouchKey({
                    label: "\\dagger",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Ctrl-A') }
                }),
                new TouchKey({
                    label: "\\Longleftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Backspace');
                                    g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyBackspace(); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[\\alpha \\beta]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { console.log("go to panel [special letters]")}
                }),
                new TouchKey({
                    label: "\\text{(}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('('); }
                }),
                new TouchKey({
                    label: "\\text{)}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition(')'); }
                }),
                new TouchKey({
                    label: "4",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('4'); }
                }),
                new TouchKey({
                    label: "5",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('5'); }
                }),
                new TouchKey({
                    label: "6",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('6'); }
                }),
                new TouchKey({
                    label: "\\cdot",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\cdot'); }
                }),
                new TouchKey({
                    label: "a^b\\uparrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new TouchKey({
                    label: "\\uparrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Up') }
                }),
                new TouchKey({
                    label: "a_b\\downarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[\\in \\partial]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { console.log("go to panel [symbols]")}
                }),
                new TouchKey({
                    label: "\\text{[}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('['); }
                }),
                new TouchKey({
                    label: "\\text{]}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition(']'); }
                }),
                new TouchKey({
                    label: "1",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('1'); }
                }),
                new TouchKey({
                    label: "2",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('2'); }
                }),
                new TouchKey({
                    label: "3",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('3'); }
                }),
                new TouchKey({
                    label: "-",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('-'); }
                }),
                new TouchKey({
                    label: "\\leftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Left'); }
                }),
                new TouchKey({
                    label: "\\downarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Down'); }
                }),
                new TouchKey({
                    label: "\\rightarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Right'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[f()]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { console.log("go to panel [f()]"); }
                }),
                new TouchKey({
                    label: "\\vdash",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.unprocessedLineToggle(); }
                }),
                new TouchKey({
                    label: "\\text{#}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('#'); }
                }),
                new TouchKey({
                    label: "0",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('0'); }
                }),
                new TouchKey({
                    label: ".",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('.'); }
                }),
                new TouchKey({
                    label: "=",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('='); }
                }),
                new TouchKey({
                    label: "+",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('+'); }
                }),
                new TouchKey({
                    label: "",
                    width: 30,
                    style: VirtualKeyboardKeyStyle.EMPTY,
                    action: () => { console.log("enter")}
                }),
                new TouchKey({
                    label: "",
                    width: 30,
                    style: VirtualKeyboardKeyStyle.EMPTY,
                    action: () => { console.log("enter")}
                }),
                new TouchKey({
                    label: "[\\text{OK}]",
                    width: 30,
                    style: VirtualKeyboardKeyStyle.BLUE,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
                }),
            ])
        ]);
    }
}