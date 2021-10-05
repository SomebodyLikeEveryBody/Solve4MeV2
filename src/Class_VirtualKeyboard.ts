declare const MathQuill: any;
declare const g_s4mCoreMemory: S4MCoreMemory;

class VirtualKeyboard {
    protected _jQEl: JQueryElement;
    protected _isVisible: Boolean;
    protected _panels: any;
    protected _currentlyDisplayedPanel: KeyboardPanel;

    public constructor(pJQueryElement: JQueryElement) {
        this._jQEl = pJQueryElement;
        this._panels = {};
        // this._jQEl.hide(0);
        // this._isVisible = false;
        this._jQEl.show(0);
        this._isVisible = true;
        
        this._panels.numbersPanel = new NumbersPanel(this);
        this._panels.lettersPanel = new LettersPanel(this);
        this._panels.majLettersPanel = new MajLettersPanel(this);
        this._panels.symbolsPanel = new SymbolsPanel(this);
        this._panels.signsPanel = new SignsPanel(this);
        this._panels.functionsPanel = new FunctionsPanel(this);
        this._currentlyDisplayedPanel = this._panels.numbersPanel;

        this.appendPanelsToKeyboard()
            .setEvents()
            .displayPanel(this._panels.numbersPanel);
    }

    public get panels (): any {
        return this._panels;
    }

    protected appendPanelsToKeyboard(): VirtualKeyboard {
        for (let panelIndex in this._panels) {
            this._panels[panelIndex].appendTo(this._jQEl);
        }

        return this;
    }

    public isVisible(): Boolean {
        return this._isVisible
    }

    public displayPanel(pKeyboardPanel: KeyboardPanel): VirtualKeyboard {
        this._currentlyDisplayedPanel.fadeOut(() => {
            this._currentlyDisplayedPanel = pKeyboardPanel;
            this._currentlyDisplayedPanel.fadeIn(); 
        });

        return this;
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
        this._jQEl.mousedown((e: EventObject) => {
            e.preventDefault();
        });

        return this;
    }
}

class KeyboardPanel {
    protected _jQEl: JQueryElement;
    protected _virtualKeyboardContainer: VirtualKeyboard;
    protected _lineKeysArray: LineKeys[];

    public constructor(pVirtualKeyboardContainer:VirtualKeyboard, pLineKeysArray: Array<LineKeys>) {
        this._jQEl = $('<div class="keyboard_panel"></div>');
        this._virtualKeyboardContainer = pVirtualKeyboardContainer;
        this._lineKeysArray = pLineKeysArray;
        this._jQEl.fadeOut(0);

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

    public fadeIn(pCallback?: Function): KeyboardPanel {
        this._jQEl.fadeIn(100, pCallback);
        return this;
    }

    public fadeOut(pCallback?: Function): KeyboardPanel {
        this._jQEl.fadeOut(100, pCallback);
        return this;
    }

    public replaceWith(pKeyboardPanel: KeyboardPanel): KeyboardPanel {
        this._jQEl.replaceWith(pKeyboardPanel._jQEl);
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
        this._jQEl.css({ 'width' : 'calc(' + (this._width.valueOf() / 10) * 100 + '% - 4px)' });
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
        this._mathField = MathQuill.getInterface(2).StaticMath(tempJQEl.find('span').get(0));
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
    public constructor (pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new TouchKey({
                    label: "[AB]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.lettersPanel);
                    }
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
                    label: "[\\text{OK}]",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.BLUE,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
                }),
            ])
        ]);
    }
}

class LettersPanel extends KeyboardPanel{
    public constructor (pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new TouchKey({
                    label: "q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('q'); }
                }),
                new TouchKey({
                    label: "w",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('w'); }
                }),
                new TouchKey({
                    label: "e",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('e'); }
                }),
                new TouchKey({
                    label: "r",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('r'); }
                }),
                new TouchKey({
                    label: "t",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('t'); }
                }),
                new TouchKey({
                    label: "y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('y'); }
                }),
                new TouchKey({
                    label: "u",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('u'); }
                }),
                new TouchKey({
                    label: "i",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('i'); }
                }),
                new TouchKey({
                    label: "o",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('o'); }
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
                    label: "a",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('a'); }
                }),
                new TouchKey({
                    label: "s",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('s'); }
                }),
                new TouchKey({
                    label: "d",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('d'); }
                }),
                new TouchKey({
                    label: "f",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('f'); }
                }),
                new TouchKey({
                    label: "g",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('g'); }
                }),
                new TouchKey({
                    label: "h",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('h'); }
                }),
                new TouchKey({
                    label: "j",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('j'); }
                }),
                new TouchKey({
                    label: "k",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('k'); }
                }),
                new TouchKey({
                    label: "l",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('l'); }
                }),
                new TouchKey({
                    label: "p",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('p'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[\\uparrow]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => {
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.majLettersPanel);
                    }
                }),
                new TouchKey({
                    label: "z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('z'); }
                }),
                new TouchKey({
                    label: "x",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('x'); }
                }),
                new TouchKey({
                    label: "c",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('c'); }
                }),
                new TouchKey({
                    label: "v",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('v'); }
                }),
                new TouchKey({
                    label: "b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('b'); }
                }),
                new TouchKey({
                    label: "n",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('n'); }
                }),
                new TouchKey({
                    label: "m",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('m'); }
                }),
                new TouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Right'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[123]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new TouchKey({
                    label: "[\\longleftrightarrow]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab'); }
                }),
                new TouchKey({
                    label: "",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Space'); }
                }),
                new TouchKey({
                    label: "\\text{\\}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new TouchKey({
                    label: "[OK]",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.BLUE,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
                }),
            ])
        ]);
    }
}

class MajLettersPanel extends KeyboardPanel{
    public constructor (pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new TouchKey({
                    label: "Q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new TouchKey({
                    label: "W",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.letLineToggle(); }
                }),
                new TouchKey({
                    label: "E",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\star'); }
                }),
                new TouchKey({
                    label: "R",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('7'); }
                }),
                new TouchKey({
                    label: "T",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('8'); }
                }),
                new TouchKey({
                    label: "Y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('9'); }
                }),
                new TouchKey({
                    label: "U",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('/'); }
                }),
                new TouchKey({
                    label: "I",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new TouchKey({
                    label: "O",
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
                    label: "A",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('('); }
                }),
                new TouchKey({
                    label: "S",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition(')'); }
                }),
                new TouchKey({
                    label: "D",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('4'); }
                }),
                new TouchKey({
                    label: "F",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('5'); }
                }),
                new TouchKey({
                    label: "G",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('6'); }
                }),
                new TouchKey({
                    label: "H",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\cdot'); }
                }),
                new TouchKey({
                    label: "J",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new TouchKey({
                    label: "K",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Up') }
                }),
                new TouchKey({
                    label: "L",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
                new TouchKey({
                    label: "P",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { console.log("go to panel [special letters]")}
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[\\downarrow]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => {
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.lettersPanel);
                    }
                }),
                new TouchKey({
                    label: "Z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition(']'); }
                }),
                new TouchKey({
                    label: "X",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('1'); }
                }),
                new TouchKey({
                    label: "C",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('2'); }
                }),
                new TouchKey({
                    label: "V",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('3'); }
                }),
                new TouchKey({
                    label: "B",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('-'); }
                }),
                new TouchKey({
                    label: "N",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Left'); }
                }),
                new TouchKey({
                    label: "M",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Down'); }
                }),
                new TouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Right'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[123]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new TouchKey({
                    label: "[\\longleftrightarrow]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab'); }
                }),
                new TouchKey({
                    label: "",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Space'); }
                }),
                new TouchKey({
                    label: "\\text{\\}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new TouchKey({
                    label: "[OK]",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.BLUE,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
                }),
            ])
        ]);
    }
}


class SymbolsPanel extends KeyboardPanel {
    public constructor(pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, []);
    }
}

class SignsPanel extends KeyboardPanel {
    public constructor(pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, []);
    }
}

class FunctionsPanel extends KeyboardPanel {
    public constructor(pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, []);
    }
}