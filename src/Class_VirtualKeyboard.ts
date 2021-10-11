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
        this._panels.majSymbolsPanel = new OtherSymbolsPanel(this);
        this._panels.signsPanel = new OperatorsPanel(this);
        this._panels.OtherSignsPanel = new OtherOperatorsPanel(this);
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
        this._jQEl.fadeIn(0, pCallback);
        return this;
    }

    public fadeOut(pCallback?: Function): KeyboardPanel {
        this._jQEl.fadeOut(0, pCallback);
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
    title?: String;
    action: Function,
    width: Number;
    style: VirtualKeyboardKeyStyle;
}

class TouchKey {
    protected _jQEl: JQueryElement;
    protected _label: String
    protected _title: String;
    protected _width: Number;
    protected _style: VirtualKeyboardKeyStyle;
    protected _mathField: any;

    public constructor (pKeyConfiguration: KeyConfiguration) {
        this._label = pKeyConfiguration.label;
        this._title = (pKeyConfiguration.title ? pKeyConfiguration.title : pKeyConfiguration.label);
        this._width = pKeyConfiguration.width;
        this._style = pKeyConfiguration.style;
        this._jQEl = $('');
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

    public appendTo(pElement: JQueryElement): TouchKey {
        this._jQEl.appendTo(pElement);
        return this;
    }

    public append(pElement:JQueryElement): TouchKey {
        this._jQEl.append(pElement);
        return this;
    }
}

class ImgTouchKey extends TouchKey {
    public constructor (pKeyConfiguration: KeyConfiguration) {
        super(pKeyConfiguration);
        this._jQEl = $('<div class="keyboard_key unselectable" title="' + this._title + '"><span></span</div>');
        this._jQEl.css({
            'background-image': "url('./imgs/" + pKeyConfiguration.label + ".png')",
            'background-repeat': 'no-repeat',
            'background-size': '30px',
            'background-position': 'center',
        });

        this.setEvent(pKeyConfiguration.action)
        this.setStyle();
    }    
}

class LatexTouchKey extends TouchKey {
    public constructor (pKeyConfiguration: KeyConfiguration) {
        super(pKeyConfiguration);
        this._jQEl = this.generateMathfieldJQEl(this._label, this._title);

        this.setEvent(pKeyConfiguration.action)
        this.setStyle();
    }

    protected generateMathfieldJQEl(pLatexLabel: String, pTitle: String): JQueryElement {
        const tempJQEl = $('<div class="keyboard_key unselectable" title="' + pTitle + '"><span></span></div>');
        this._mathField = MathQuill.getInterface(2).StaticMath(tempJQEl.find('span').get(0));
        this.setLatexLabel(pLatexLabel);

        //remove all events of mathfield span element
        const retJQEl = tempJQEl.clone();
        tempJQEl.replaceWith(retJQEl);
        return retJQEl;
    }

    protected setLatexLabel(pLatexLabel: String): LatexTouchKey {
        this._mathField.latex(pLatexLabel);
        return this;
    }
}

class NumbersPanel extends KeyboardPanel {
    public constructor (pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "[ab]",
                    title: "Go to [Letters] panel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.lettersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\text{(}",
                    title: "(",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('('); }
                }),
                new LatexTouchKey({
                    label: "\\text{)}",
                    title: ")",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition(')'); }
                }),
                new LatexTouchKey({
                    label: "7",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('7'); }
                }),
                new LatexTouchKey({
                    label: "8",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('8'); }
                }),
                new LatexTouchKey({
                    label: "9",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('9'); }
                }),
                new LatexTouchKey({
                    label: "\\frac{a}{b}",
                    title: "a/b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('/'); }
                }),
                new LatexTouchKey({
                    label: "\\text{\\}",
                    title: "\\",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new LatexTouchKey({
                    label: "\\dagger",
                    title: "Select all",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Ctrl-A') }
                }),
                new BackspaceKey()
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[\\alpha \\beta]",
                    title: "Go to [Greek letters] panel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.symbolsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\text{{}",
                    title: "{",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('{'); }
                }),
                new LatexTouchKey({
                    label: "\\text{{}",
                    title: "}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('}'); }
                }),
                new LatexTouchKey({
                    label: "4",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('4'); }
                }),
                new LatexTouchKey({
                    label: "5",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('5'); }
                }),
                new LatexTouchKey({
                    label: "6",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('6'); }
                }),
                new LatexTouchKey({
                    label: "\\cdot",
                    title: "* (multiply)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\cdot'); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new LatexTouchKey({
                    label: "\\uparrow",
                    title: "Up",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Up') }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[\\in \\partial]",
                    title: "Go to [Operators] panel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.signsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('['); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition(']'); }
                }),
                new LatexTouchKey({
                    label: "1",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('1'); }
                }),
                new LatexTouchKey({
                    label: "2",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('2'); }
                }),
                new LatexTouchKey({
                    label: "3",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('3'); }
                }),
                new LatexTouchKey({
                    label: "-",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('-'); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    title: "Left",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Left'); }
                }),
                new LatexTouchKey({
                    label: "\\downarrow",
                    title: "Down",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Down'); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    title: "Right",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Right'); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[f()]",
                    title: "Go to [Actions] panel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { console.log("go to panel [f()]"); }
                }),
                new LatexTouchKey({
                    label: "\\text{#}",
                    title: "#",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('#'); }
                }),
                new LatexTouchKey({
                    label: ",",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition(','); }
                }),
                new LatexTouchKey({
                    label: "0",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('0'); }
                }),
                new LatexTouchKey({
                    label: ".",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('.'); }
                }),
                new LatexTouchKey({
                    label: "=",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('='); }
                }),
                new LatexTouchKey({
                    label: "+",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('+'); }
                }),
                new EnterKey(),
            ])
        ]);
    }
}

class LettersPanel extends KeyboardPanel{
    public constructor (pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('q'); }
                }),
                new LatexTouchKey({
                    label: "w",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('w'); }
                }),
                new LatexTouchKey({
                    label: "e",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('e'); }
                }),
                new LatexTouchKey({
                    label: "r",                    
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('r'); }
                }),
                new LatexTouchKey({
                    label: "t",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('t'); }
                }),
                new LatexTouchKey({
                    label: "y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('y'); }
                }),
                new LatexTouchKey({
                    label: "u",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('u'); }
                }),
                new LatexTouchKey({
                    label: "i",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('i'); }
                }),
                new LatexTouchKey({
                    label: "o",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('o'); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "a",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('a'); }
                }),
                new LatexTouchKey({
                    label: "s",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('s'); }
                }),
                new LatexTouchKey({
                    label: "d",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('d'); }
                }),
                new LatexTouchKey({
                    label: "f",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('f'); }
                }),
                new LatexTouchKey({
                    label: "g",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('g'); }
                }),
                new LatexTouchKey({
                    label: "h",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('h'); }
                }),
                new LatexTouchKey({
                    label: "j",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('j'); }
                }),
                new LatexTouchKey({
                    label: "k",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('k'); }
                }),
                new LatexTouchKey({
                    label: "l",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('l'); }
                }),
                new LatexTouchKey({
                    label: "p",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('p'); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[\\uparrow]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => {
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.majLettersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('z'); }
                }),
                new LatexTouchKey({
                    label: "x",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('x'); }
                }),
                new LatexTouchKey({
                    label: "c",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('c'); }
                }),
                new LatexTouchKey({
                    label: "v",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('v'); }
                }),
                new LatexTouchKey({
                    label: "b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('b'); }
                }),
                new LatexTouchKey({
                    label: "n",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('n'); }
                }),
                new LatexTouchKey({
                    label: "m",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('m'); }
                }),
                new LatexTouchKey({
                    label: "\\dagger",
                    title: "Select all",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Ctrl-A') }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[123]",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "[\\longleftrightarrow]",
                    title: "Tabulation",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab'); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ ') }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
                new LatexTouchKey({
                    label: "\\text{\\}",
                    title: "\\",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new EnterKey(),
            ])
        ]);
    }
}

class MajLettersPanel extends KeyboardPanel{
    public constructor (pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "Q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('Q'); }
                }),
                new LatexTouchKey({
                    label: "W",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('W'); }
                }),
                new LatexTouchKey({
                    label: "E",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('E'); }
                }),
                new LatexTouchKey({
                    label: "R",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('R'); }
                }),
                new LatexTouchKey({
                    label: "T",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('T'); }
                }),
                new LatexTouchKey({
                    label: "Y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('Y'); }
                }),
                new LatexTouchKey({
                    label: "U",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('U'); }
                }),
                new LatexTouchKey({
                    label: "I",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('I'); }
                }),
                new LatexTouchKey({
                    label: "O",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('O'); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "A",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('A'); }
                }),
                new LatexTouchKey({
                    label: "S",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('S'); }
                }),
                new LatexTouchKey({
                    label: "D",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('D'); }
                }),
                new LatexTouchKey({
                    label: "F",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('F'); }
                }),
                new LatexTouchKey({
                    label: "G",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('G'); }
                }),
                new LatexTouchKey({
                    label: "H",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('H'); }
                }),
                new LatexTouchKey({
                    label: "J",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('J'); }
                }),
                new LatexTouchKey({
                    label: "K",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('K'); }
                }),
                new LatexTouchKey({
                    label: "L",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('L'); }
                }),
                new LatexTouchKey({
                    label: "P",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('P'); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[\\downarrow]",
                    title: "Down",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => {
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.lettersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "Z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('Z'); }
                }),
                new LatexTouchKey({
                    label: "X",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('X'); }
                }),
                new LatexTouchKey({
                    label: "C",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('C'); }
                }),
                new LatexTouchKey({
                    label: "V",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('V'); }
                }),
                new LatexTouchKey({
                    label: "B",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('B'); }
                }),
                new LatexTouchKey({ 
                    label: "N",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('N'); }
                }),
                new LatexTouchKey({
                    label: "M",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('M'); }
                }),
                new LatexTouchKey({
                    label: "\\dagger",
                    title: "Select all",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Ctrl-A') }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[123]",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "[\\longleftrightarrow]",
                    title: "Tabulation",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab'); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ ') }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
                new LatexTouchKey({
                    label: "\\text{\\}",
                    title: "\\",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new EnterKey(),
            ])
        ]);
    }
}


class SymbolsPanel extends KeyboardPanel {
    public constructor(pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "\\alpha",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\alpha'); }
                }),
                new LatexTouchKey({
                    label: "\\beta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\beta'); }
                }),
                new LatexTouchKey({
                    label: "\\gamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\gamma'); }
                }),
                new LatexTouchKey({
                    label: "\\delta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\delta'); }
                }),
                new LatexTouchKey({
                    label: "\\varepsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\varepsilon'); }
                }),
                new LatexTouchKey({
                    label: "\\zeta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\zeta'); }
                }),
                new LatexTouchKey({
                    label: "\\eta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\eta'); }
                }),
                new LatexTouchKey({
                    label: "\\theta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,                   
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\theta'); }
                }),
                new LatexTouchKey({
                    label: "\\iota",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\iota'); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\kappa",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\kappa'); }
                }),
                new LatexTouchKey({
                    label: "\\lambda",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\lambda'); }
                }),
                new LatexTouchKey({
                    label: "\\mu",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\mu'); }
                }),
                new LatexTouchKey({
                    label: "\\nu",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\nu'); }
                }),
                new LatexTouchKey({
                    label: "\\xi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\xi'); }
                }),
                new LatexTouchKey({
                    label: "\\pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\pi'); }
                }),
                new LatexTouchKey({
                    label: "\\rho",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\rho'); } 
                }),
                new LatexTouchKey({
                    label: "\\sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\sigma'); }
                }),
                new LatexTouchKey({
                    label: "\\tau",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\tau'); }
                }),
                new LatexTouchKey({
                    label: "\\upsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\upsilon'); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[\\Pi \\R]",
                    title: "Go to [Others symbols] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => {
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.majSymbolsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\phi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
                new LatexTouchKey({
                    label: "\\chi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\chi'); }
                }),
                new LatexTouchKey({
                    label: "\\psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\psi'); }
                }),
                new LatexTouchKey({
                    label: "\\omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\omega'); }
                }),
                new LatexTouchKey({
                    label: "\\infty",
                    title: "Infinity",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\infty'); }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('['); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition(']'); }
                }),
                new LatexTouchKey({
                    label: "\\ast",
                    title: "*",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\ast'); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[123]",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "[\\longleftrightarrow]",
                    title: "Tabulation",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab'); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ ') }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
                new LatexTouchKey({
                    label: "\\mapsto",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition("\\ \\mapsto\\ "); }
                }),
                new EnterKey(),
            ])
        ]);
    }
}

class OtherSymbolsPanel extends KeyboardPanel {
    public constructor(pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "\\Gamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Gamma'); }
                }),
                new LatexTouchKey({
                    label: "\\Delta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Delta'); }
                }),
                new LatexTouchKey({
                    label: "\\Theta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Theta'); }
                }),
                
                new LatexTouchKey({
                    label: "\\Lambda",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Lambda'); }
                }),
                new LatexTouchKey({
                    label: "\\Pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Pi'); }
                }),
                new LatexTouchKey({
                    label: "\\Sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\Sigma'); }
                }),
                new LatexTouchKey({
                    label: "\\Phi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Phi'); }
                }),
                new LatexTouchKey({
                    label: "\\Psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Psi'); }
                }),
                new LatexTouchKey({
                    label: "\\Omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Omega'); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\R",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\R'); }
                }),
                new LatexTouchKey({
                    label: "\\C",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\C'); }
                }),
                new LatexTouchKey({
                    label: "\\Q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Q'); }
                }),
                new LatexTouchKey({
                    label: "\\Z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Z'); }
                }),
                new LatexTouchKey({
                    label: "\\N",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\N'); }
                }),
                new LatexTouchKey({
                    label: "\\emptyset",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\emptyset'); }
                }),
                new LatexTouchKey({
                    label: "\\rho",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\rho'); } 
                }),
                new LatexTouchKey({
                    label: "\\sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\sigma'); }
                }),
                new LatexTouchKey({
                    label: "\\text{°}",
                    title: "Degree",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\text{°}'); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{rad}}",
                    title: "Radian",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{rad}}"); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[\\alpha \\beta]",
                    title: "Go to [Greek letters] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => {
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.symbolsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "_{\\text{kg}}",
                    title: "kg",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{kg}}"); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{m}}",
                    title: "meter",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{m}}"); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{s}}",
                    title: "second",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{s}}"); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{A}}",
                    title: "Amperes",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{A}}"); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{K}}",
                    title: "Kelvin",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{K}}"); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{mol}}",
                    title: "mol",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{mol}}"); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{cd}}",
                    title: "Candela",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{cd}}"); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[123]",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "[\\longleftrightarrow]",
                    title: "Tabulation",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab'); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ ') }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
                new LatexTouchKey({
                    label: "\\text{\\}",
                    title: "\\",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new EnterKey(),
            ])
        ]);
    }
}

class OperatorsPanel extends KeyboardPanel {
    public constructor(pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "\\exists",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\exists'); }
                }),
                new LatexTouchKey({
                    label: "\\vec{v}",
                    title: "Vector arrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\vec'); }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('['); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition(']'); }
                }),
                new LatexTouchKey({
                    label: "\\neg",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\neg'); }
                }),
                new LatexTouchKey({
                    label: "\\sqrt{x}",
                    title: "Square root",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\sqrt'); }
                }),
                new LatexTouchKey({
                    label: "\\text{|}",
                    title: "|",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('|'); }
                }),
                new LatexTouchKey({
                    label: "\\circ",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\circ'); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\rightarrows'); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\nexist",
                    title: "?",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\nexist'); }
                }),
                new LatexTouchKey({
                    label: "\\forall",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\forall'); }
                }),
                new LatexTouchKey({
                    label: "\\lceil",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\lceil'); }
                }),
                new LatexTouchKey({
                    label: "\\rceil",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\rceil'); }
                }),
                new LatexTouchKey({
                    label: "\\land",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\land'); }
                }),
                new LatexTouchKey({
                    label: "\\union",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\union'); }
                }),
                new LatexTouchKey({
                    label: "\\supset",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\supset'); } 
                }),
                new LatexTouchKey({
                    label: "\\subset",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\subset'); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\leftarrow'); }
                }),
                new LatexTouchKey({
                    label: "\\partial",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\partial"); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[\\ge \\oint]",
                    title: "Go to [Other operators] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => {
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.OtherSignsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\lfloor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\lfloor"); }
                }),
                new LatexTouchKey({
                    label: "\\rfloor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("{\\rfloor"); }
                }),
                new LatexTouchKey({
                    label: "\\lor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\lor"); }
                }),
                new LatexTouchKey({
                    label: "\\cap",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\cap"); }
                }),
                new LatexTouchKey({
                    label: "\\supseteq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\supseteq"); }
                }),
                new LatexTouchKey({
                    label: "\\subseteq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\subseteq"); }
                }),
                new LatexTouchKey({
                    label: "\\mapsto",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\mapsto"); }
                }),
                new LatexTouchKey({
                    label: "\\text{d}",
                    title: "Differential",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\text{d}'); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[123]",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\neq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\neq'); }
                }),
                new LatexTouchKey({
                    label: "\\simeq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\simeq'); }
                }),
                new LatexTouchKey({
                    label: "\\equiv",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\equiv') }
                }),
                new LatexTouchKey({
                    label: "\\in",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\in'); }
                }),
                new LatexTouchKey({
                    label: "\\notin",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\notin'); }
                }),
                new EnterKey(),
            ])
        ]);
    }
}

class OtherOperatorsPanel extends KeyboardPanel {
    public constructor(pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "\\int _{\\ }^{\\ }",
                    title: "Integral",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\int'); }
                }),
                new LatexTouchKey({
                    label: "\\frac{\\text{d}}{\\text{d}_x}",
                    title: "Closed curve integral",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => {
                        g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\frac{\\text{d}}{\\text{d}_{ }}')
                        .keyStroke('Left Left');
                    }
                }),
                new LatexTouchKey({
                    label: "f()",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => {
                        g_s4mCoreMemory.currentMathLineInputFocused
                            .writeLatexAtCursorPosition('\\text{Function}\\left(_{}^{}\\right)')
                            .keyStroke('Left Left');
                    }
                }),
                new LatexTouchKey({
                    label: "\\lt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\lt'); }
                }),
                new LatexTouchKey({
                    label: "\\gt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\gt'); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\exists'); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('|'); }
                }),
                new LatexTouchKey({
                    label: "\\overline{42}",
                    title: "Overline",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\overline'); }
                }),
                new LatexTouchKey({
                    label: "\\nabla",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\nabla'); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\oint",
                    title: "Closed curve integral",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\oint'); }
                }),
                new LatexTouchKey({
                    label: "\\frac{\\partial }{\\partial _x}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\partial/\\partial_'); }
                    
                }),
                new LatexTouchKey({
                    label: "\\vec{V}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => {
                        g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("\\text{Vect}\\left(\\right)")
                            .keyStroke('Left');
                    }
                }),
                new LatexTouchKey({
                    label: "\\le",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\le'); }
                }),
                new LatexTouchKey({
                    label: "\\ge",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\ge'); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\union'); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\supset'); } 
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\subset'); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\leftarrow'); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\partial"); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[\\in \\partial]",
                    title: "Go to [Operators] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.signsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\lfloor"); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("{\\rfloor"); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\lor"); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\cap"); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\supseteq"); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\subseteq"); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\mapsto"); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\text{d}'); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "[123]",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\neq'); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\simeq'); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\equiv') }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\forall'); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\nexist'); }
                }),
                new EnterKey(),
            ])
        ]);
    }
}

class FunctionsPanel extends KeyboardPanel {
    public constructor(pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, []);
    }
}

class EnterKey extends ImgTouchKey {
    public constructor() {
        super({
            label: "enter",
            title: "Enter",
            width: 3,
            style: VirtualKeyboardKeyStyle.BLUE,
            action: () => { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
        });
    }
}

class BackspaceKey extends ImgTouchKey {
    public constructor() {
        super({
            label: "backspace",
            title: "Backspace",
            width: 1,
            style: VirtualKeyboardKeyStyle.RED,
            action: () => { g_s4mCoreMemory.currentMathLineInputFocused
                                .keyStroke('Backspace')
                                .doIfKeyBackspace();
            }
        });
    }
}