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
        this._jQEl.hide(0);
        this._isVisible = false;
        // this._jQEl.show(0);
        // this._isVisible = true;
        
        this._panels.numbersPanel = new NumbersPanel(this);
        this._panels.lettersPanel = new LettersPanel(this);
        this._panels.majLettersPanel = new MajLettersPanel(this);
        this._panels.symbolsPanel = new SymbolsPanel(this);
        this._panels.majSymbolsPanel = new OtherSymbolsPanel(this);
        this._panels.operatorsPanel = new OperatorsPanel(this);
        this._panels.otherOperatorsPanel = new OtherOperatorsPanel(this);
        this._panels.unitsPanel = new UnitsPanel(this);
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

    public displayUnitsPanel(): VirtualKeyboard {
        this.displayPanel(this._panels.unitsPanel);
        return this;
    }

    public hide(): VirtualKeyboard {
        this._jQEl.animate({width:'toggle'},250, () => {
            this._isVisible = false;
            this.displayPanel(this._panels.numbersPanel);
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

        this._lineKeysArray.map((lineKeys: LineKeys) => {
            lineKeys.setHeight(100 / this._lineKeysArray.length);
        });

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

    public setHeight(pHeight: Number): LineKeys {
        this._jQEl.css({
            'height': pHeight + "%"
        });

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
        this._jQEl.mousedown(() => {
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
            'background-image': "url('./imgs/" + pKeyConfiguration.label + ".svg')",
            'background-repeat': 'no-repeat',
            'background-size': '35px',
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
                    label: "\\overrightarrow{[ab]}",
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('('); }
                }),
                new LatexTouchKey({
                    label: "\\text{)}",
                    title: ")",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition(')').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "7",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('7').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "8",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('8').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "9",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('9').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{a}{b}",
                    title: "a/b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('/').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\cdot",
                    title: "* (multiply)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\cdot').saveUndoRedoState(); }
                }),
                new SelectAllKey(),
                new BackspaceKey()
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[\\alpha \\beta]}",
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('{').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{{}",
                    title: "}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('}').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "4",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('4').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "5",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('5').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "6",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('6').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\times",
                    title: "X",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\times").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\uparrow",
                    title: "Up",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Up').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[\\partial_z]}",
                    title: "Go to [Operators] panel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.operatorsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('[').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition(']').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "1",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('1').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "2",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('2').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "3",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('3').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "-",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('-').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    title: "Left",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Left').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\downarrow",
                    title: "Down",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Down').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    title: "Right",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Right').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new ImgTouchKey({
                    label: "actions",
                    title: "Go to [Actions] panel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.functionsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\text{#}",
                    title: "#",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('#').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: ",",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT    ,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition(',').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: ".",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('.').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "0",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('0').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "=",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('=').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "+",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('+').saveUndoRedoState(); }
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('q').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "w",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('w').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "e",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('e').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "r",                    
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('r').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "t",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('t').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('y').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "u",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('u').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "i",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('i').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "o",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('o').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "a",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('a').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "s",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('s').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "d",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('d').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "f",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('f').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "g",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('g').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "h",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('h').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "j",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('j').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "k",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('k').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "l",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('l').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "p",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('p').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[\\uparrow]}",
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('z').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "x",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('x').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "c",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('c').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "v",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('v').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('b').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "n",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('n').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "m",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('m').saveUndoRedoState(); }
                }),
                new SelectAllKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{\\}",
                    title: "\\",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('\\').saveUndoRedoState(); }
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('Q').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "W",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('W').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "E",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('E').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "R",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('R').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "T",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('T').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "Y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('Y').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "U",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('U').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "I",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('I').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "O",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('O').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "A",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('A').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "S",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('S').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "D",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('D').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "F",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('F').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "G",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('G').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "H",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('H').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "J",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('J').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "K",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('K').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "L",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('L').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "P",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('P').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[\\downarrow]}",
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('Z').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "X",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('X').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "C",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('C').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "V",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('V').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "B",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('B').saveUndoRedoState(); }
                }),
                new LatexTouchKey({ 
                    label: "N",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('N').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "M",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('M').saveUndoRedoState(); }
                }),
                new SelectAllKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{\\}",
                    title: "\\",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('\\').saveUndoRedoState(); }
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\alpha').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\beta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\beta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\gamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\gamma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\delta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\delta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\varepsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\varepsilon').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\zeta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\zeta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\eta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\eta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\theta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,                   
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\theta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\iota",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\iota').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\kappa",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\kappa').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\lambda",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\lambda').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\mu",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\mu').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\nu",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\nu').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\xi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\xi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\pi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rho",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\rho').saveUndoRedoState(); } 
                }),
                new LatexTouchKey({
                    label: "\\sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\sigma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\tau",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\tau').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\upsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\upsilon').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[\\Pi \\R]}",
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\phi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\chi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\chi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\psi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\omega').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\infty",
                    title: "Infinity",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\infty').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('[').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition(']').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\ast",
                    title: "*",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\ast').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\mapsto",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition("\\ \\mapsto\\ ").saveUndoRedoState(); }
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Gamma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\digamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\digamma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Delta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Delta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Theta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Theta').saveUndoRedoState(); }
                }),
                
                new LatexTouchKey({
                    label: "\\Lambda",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Lambda').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Pi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Sigma').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\Phi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Phi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Psi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Omega').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Xi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Xi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Upsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Upsilon').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[\\alpha \\beta]}",
                    title: "Go to [Greek letters] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.symbolsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\R",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 9/8,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\R').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\C",
                    width: 9/8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\C').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Q",
                    width: 9/8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Q').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Z",
                    width: 9/8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Z').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\N",
                    width: 9/8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\N').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\emptyset",
                    width: 9/8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\emptyset').saveUndoRedoState(); }
                }),
                new ImgTouchKey({
                    label: "units",
                    title: "Go to [Units] Panel",
                    width: 10/8,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => {
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.unitsPanel);
                    }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{a}{b}",
                    title: "a/b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('/').saveUndoRedoState(); }
                }),
                new EnterKey(),
            ])
        ]);
    }
}

class UnitsPanel extends KeyboardPanel {
    public constructor(pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "\\text{°}",
                    title: "degree",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\text{°}').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{rad}}",
                    title: "radian",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{rad}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{kg}}",
                    title: "kilogram",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{kg}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{m}}",
                    title: "meter",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{m}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{s}}",
                    title: "second",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{s}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{A}}",
                    title: "ampere",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{A}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{K}}",
                    title: "kelvin",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{K}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{mol}}",
                    title: "mol",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{mol}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{cd}}",
                    title: "candela",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{cd}}").saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "_{\\text{Pa}}",
                    title: "pascal",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{Pa}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{Hz}}",
                    title: "hertz",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{Hz}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{N}}",
                    title: "newton",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{N}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{J}}",
                    title: "joules",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{J}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{W}}",
                    title: "watt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{W}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{V}}",
                    title: "volt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{V}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{°C}",
                    title: "Celcius degree",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("\\text{°C}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{S}}",
                    title: "siemens",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{S}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{H}}",
                    title: "henry",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{H}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{T}}",
                    title: "Telsa",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\text{T}').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[\\Pi \\R]}",
                    title: "Go to [Others symbols] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => {
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.majSymbolsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "_{\\text{Wb}}",
                    title: "weber",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{rad}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{lm}}",
                    title: "lumen",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{lm}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{lx}}",
                    title: "lux",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{lx}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\delta",
                    title: "dioptrie",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("\\delta").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{Bq}}",
                    title: "becquerel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{Bq}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{Gy}}",
                    title: "gray",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{Gy}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{Sv}}",
                    title: "sievert",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{Sv}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{C}}",
                    title: "coulomb",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{C}}").saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "_{\\text{bar}}",
                    title: "bar",
                    width: 4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{bar}}").saveUndoRedoState(); }
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\exists').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\vec{v}",
                    title: "Vector arrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\vec').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('[').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition(']').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\neg",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\neg').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\sqrt{x}",
                    title: "Square root",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\sqrt').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{|}",
                    title: "|",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('|').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\circ",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\circ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\rightarrow').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\nexist",
                    title: "?",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\nexist').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\forall",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\forall').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\lceil",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\lceil').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rceil",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\rceil').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\land",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\land').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\union",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\union').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\supset",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\supset').saveUndoRedoState(); } 
                }),
                new LatexTouchKey({
                    label: "\\subset",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\subset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\leftarrow').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\partial",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\partial").saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[\\ge \\oint]}",
                    title: "Go to [Other operators] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => {
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.otherOperatorsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\lfloor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\lfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rfloor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\rfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\lor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\lor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\cap",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\cap").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\supseteq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\supseteq").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\subseteq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\subseteq").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\mapsto",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\mapsto").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{d}",
                    title: "Differential",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\text{d}').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\neq').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\simeq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\simeq').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\equiv",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\equiv').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\in",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\in').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\notin",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\notin').saveUndoRedoState(); }
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
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\int').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{\\text{d}}{\\text{d}_x}",
                    title: "Closed curve integral",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => {
                        g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\frac{\\text{d}}{\\text{d}_{ }}')
                        .keyStroke('Left Left')
                        .saveUndoRedoState();
                    }
                }),
                new LatexTouchKey({
                    label: "f()",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => {
                        g_s4mCoreMemory.getMathLineInputToEdit().focus()
                            .writeLatexAtCursorPosition('\\text{Function}\\left(_{}^{}\\right)')
                            .keyStroke('Left Left')
                            .saveUndoRedoState();
                    }
                }),
                new LatexTouchKey({
                    label: "\\lt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\lt').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\gt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\gt').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\sum_{\\ }^{\\ }",
                    title: "Sum",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\sum').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\overline{42}",
                    title: "Overline",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\overline').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\nabla",
                    title: "nabla",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\nabla').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\vec{\\nabla}",
                    title: "nabla",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("\\vec{\\nabla}").saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\oint",
                    title: "Closed curve integral",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\oint').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{\\partial }{\\partial _x}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('\\partial/\\partial_').saveUndoRedoState(); }
                    
                }),
                new LatexTouchKey({
                    label: "\\vec{V}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => {
                        g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("\\text{Vect}\\left(\\right)")
                            .keyStroke('Left')
                            .saveUndoRedoState();
                    }
                }),
                new LatexTouchKey({
                    label: "\\le",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\le').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\ge",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\ge').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\prod_{\\ }^{\\ }",
                    title: "Product",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\prod').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\supset').saveUndoRedoState(); } 
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\subset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\uparrow",
                    title: "Up",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Up').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    title: "Given statement",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().givenLineToggle().saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[\\in \\partial]}",
                    title: "Go to [Operators] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.operatorsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\lfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("{\\rfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\lor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\coprod_{\\ }^{\\ }",
                    title: "Coproduct",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\coprod').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\supseteq").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    title: "Left",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Left').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\downarrow",
                    title: "Down",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Down').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    title: "Right",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Right').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\oplus",
                    width: 5/4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\oplus').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\ominus",
                    width: 5/4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\ominus').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\otimes",
                    width: 5/4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\otimes').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\odot",
                    width: 5/4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\odot').saveUndoRedoState(); }
                }),
                new EnterKey(),
            ])
        ]);
    }
}

class FunctionsPanel extends KeyboardPanel {
    public constructor(pVirtualKeyboardContainer: VirtualKeyboard) {
        super(pVirtualKeyboardContainer, [
            new LineKeys([
                new ImgTouchKey({
                    label: "undo",
                     title: "Undo",
                    width: 3.5,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().undo(); }
                }),
                new ImgTouchKey({
                    label: "redo",
                    title: "Redo",
                    width: 3.5,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().redo(); }
                }),
                new LatexTouchKey({
                    label: "\\uparrow",
                    title: "Up",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Up').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new ImgTouchKey({
                    label: "print",
                    title: "Print",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().printLine().saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "[G]",
                    title: "Given statement",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().givenLineToggle().saveUndoRedoState(); }
                }),
                new SelectAllKey(),
                new ImgTouchKey({
                    label: "delete",
                    title: "Delete",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.RED,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().delete(); }
                    
                }),
                new ImgTouchKey({
                    label: "duplicate",
                    title: "Duplicate",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().duplicateMathLine(); }
                }),
                new ImgTouchKey({
                    label: "insertOver",
                    title: "Insert line Over",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().addNewMathLineInputOverMe(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    title: "Left",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Left').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\downarrow",
                    title: "Down",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Down').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    title: "Right",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Right').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: () => { 
                        this._virtualKeyboardContainer.displayPanel(this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new ImgTouchKey({
                    label: "save",
                    title: "Save",
                    width: 2.5,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().saveWidgetToggle(); }
                }),
                new ImgTouchKey({
                    label: "open",
                    title: "Open",
                    width: 2.5,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: () => {
                        g_s4mCoreMemory.getMathLineInputToEdit().focus().openWidgetToggle(); }
                }),
                new EnterKey(),
            ])
        ]);
    }
}

class EnterKey extends ImgTouchKey {
    public constructor() {
        super({
            label: "enter",
            title: "Enter",
            width: 3,
            style: VirtualKeyboardKeyStyle.BLUE,
            action: () => { g_s4mCoreMemory.getMathLineInputToEdit().doIfKeyEnter(); }
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
            action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus()
                                .keyStroke('Backspace')
                                .saveUndoRedoState()
                                .doIfKeyBackspace();

            }
        });
    }
}

class SelectAllKey extends ImgTouchKey {
    public constructor() {
        super({
            label: "selectAll",
            title: "Select all",
            width: 1,
            style: VirtualKeyboardKeyStyle.LIGHT,
            action: () => { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Ctrl-A').saveUndoRedoState(); }
        });       
    }
}