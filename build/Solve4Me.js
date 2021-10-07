"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["TILDE_KEY"] = 0] = "TILDE_KEY";
    KeyCodes[KeyCodes["BACKSPACE_KEY"] = 8] = "BACKSPACE_KEY";
    KeyCodes[KeyCodes["TAB_KEY"] = 9] = "TAB_KEY";
    KeyCodes[KeyCodes["ENTER_KEY"] = 13] = "ENTER_KEY";
    KeyCodes[KeyCodes["SHIFT_KEY"] = 16] = "SHIFT_KEY";
    KeyCodes[KeyCodes["CTRL_KEY"] = 17] = "CTRL_KEY";
    KeyCodes[KeyCodes["ALT_KEY"] = 18] = "ALT_KEY";
    KeyCodes[KeyCodes["CAPSLOCK_KEY"] = 20] = "CAPSLOCK_KEY";
    KeyCodes[KeyCodes["ESCAPE_KEY"] = 27] = "ESCAPE_KEY";
    KeyCodes[KeyCodes["SPACE_KEY"] = 32] = "SPACE_KEY";
    KeyCodes[KeyCodes["PAGEUP_KEY"] = 33] = "PAGEUP_KEY";
    KeyCodes[KeyCodes["PAGEDOWN_KEY"] = 34] = "PAGEDOWN_KEY";
    KeyCodes[KeyCodes["END_KEY"] = 35] = "END_KEY";
    KeyCodes[KeyCodes["HOME_KEY"] = 36] = "HOME_KEY";
    KeyCodes[KeyCodes["LEFTARROW_KEY"] = 37] = "LEFTARROW_KEY";
    KeyCodes[KeyCodes["UPARROW_KEY"] = 38] = "UPARROW_KEY";
    KeyCodes[KeyCodes["RIGHTARROW_KEY"] = 39] = "RIGHTARROW_KEY";
    KeyCodes[KeyCodes["DOWNARROW_KEY"] = 40] = "DOWNARROW_KEY";
    KeyCodes[KeyCodes["DELETE_KEY"] = 46] = "DELETE_KEY";
    KeyCodes[KeyCodes["N0_KEY"] = 48] = "N0_KEY";
    KeyCodes[KeyCodes["N1_KEY"] = 49] = "N1_KEY";
    KeyCodes[KeyCodes["N6_KEY"] = 54] = "N6_KEY";
    KeyCodes[KeyCodes["N7_KEY"] = 55] = "N7_KEY";
    KeyCodes[KeyCodes["N8_KEY"] = 56] = "N8_KEY";
    KeyCodes[KeyCodes["N9_KEY"] = 57] = "N9_KEY";
    KeyCodes[KeyCodes["SEMICOLON_KEY"] = 59] = "SEMICOLON_KEY";
    KeyCodes[KeyCodes["EQUAL_KEY"] = 61] = "EQUAL_KEY";
    KeyCodes[KeyCodes["A_KEY"] = 65] = "A_KEY";
    KeyCodes[KeyCodes["C_KEY"] = 67] = "C_KEY";
    KeyCodes[KeyCodes["D_KEY"] = 68] = "D_KEY";
    KeyCodes[KeyCodes["E_KEY"] = 69] = "E_KEY";
    KeyCodes[KeyCodes["F_KEY"] = 70] = "F_KEY";
    KeyCodes[KeyCodes["G_KEY"] = 71] = "G_KEY";
    KeyCodes[KeyCodes["I_KEY"] = 73] = "I_KEY";
    KeyCodes[KeyCodes["L_KEY"] = 76] = "L_KEY";
    KeyCodes[KeyCodes["N_KEY"] = 78] = "N_KEY";
    KeyCodes[KeyCodes["O_KEY"] = 79] = "O_KEY";
    KeyCodes[KeyCodes["P_KEY"] = 80] = "P_KEY";
    KeyCodes[KeyCodes["Q_KEY"] = 81] = "Q_KEY";
    KeyCodes[KeyCodes["R_KEY"] = 82] = "R_KEY";
    KeyCodes[KeyCodes["S_KEY"] = 83] = "S_KEY";
    KeyCodes[KeyCodes["T_KEY"] = 84] = "T_KEY";
    KeyCodes[KeyCodes["U_KEY"] = 85] = "U_KEY";
    KeyCodes[KeyCodes["V_KEY"] = 86] = "V_KEY";
    KeyCodes[KeyCodes["W_KEY"] = 87] = "W_KEY";
    KeyCodes[KeyCodes["X_KEY"] = 88] = "X_KEY";
    KeyCodes[KeyCodes["Y_KEY"] = 89] = "Y_KEY";
    KeyCodes[KeyCodes["Z_KEY"] = 90] = "Z_KEY";
    KeyCodes[KeyCodes["MINUS_KEY"] = 173] = "MINUS_KEY";
    KeyCodes[KeyCodes["OPENCHEVRON_KEY"] = 188] = "OPENCHEVRON_KEY";
    KeyCodes[KeyCodes["CLOSECHEVRON_KEY"] = 190] = "CLOSECHEVRON_KEY";
    KeyCodes[KeyCodes["OPENHOOK_KEY"] = 219] = "OPENHOOK_KEY";
    KeyCodes[KeyCodes["PIPE_KEY"] = 220] = "PIPE_KEY";
    KeyCodes[KeyCodes["CLOSEHOOK_KEY"] = 221] = "CLOSEHOOK_KEY";
    KeyCodes[KeyCodes["ALTGR_KEY"] = 225] = "ALTGR_KEY";
})(KeyCodes || (KeyCodes = {}));
var VirtualKeyboardKeyStyle;
(function (VirtualKeyboardKeyStyle) {
    VirtualKeyboardKeyStyle["LIGHT"] = "light";
    VirtualKeyboardKeyStyle["DARK"] = "dark";
    VirtualKeyboardKeyStyle["BLUE"] = "blue";
    VirtualKeyboardKeyStyle["EMPTY"] = "empty";
})(VirtualKeyboardKeyStyle || (VirtualKeyboardKeyStyle = {}));
var MathObj = /** @class */ (function () {
    function MathObj() {
    }
    return MathObj;
}());
var S4MCoreMemory = /** @class */ (function () {
    function S4MCoreMemory(pFirstMathLineInput) {
        this._declaringMathLineInputs = [];
        this._errorMathLineInputs = [];
        this._declaredVars = [];
        this._lastMathLineInputFocusedOut = pFirstMathLineInput;
        this._currentMathLineInputFocused = pFirstMathLineInput;
    }
    Object.defineProperty(S4MCoreMemory.prototype, "lastMathLineInputFocusedOut", {
        get: function () {
            return this._lastMathLineInputFocusedOut;
        },
        set: function (pNewMathLineInput) {
            this._lastMathLineInputFocusedOut = pNewMathLineInput;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S4MCoreMemory.prototype, "currentMathLineInputFocused", {
        get: function () {
            return this._currentMathLineInputFocused;
        },
        set: function (pMathLineInput) {
            this._currentMathLineInputFocused = pMathLineInput;
        },
        enumerable: false,
        configurable: true
    });
    S4MCoreMemory.prototype.getMemoryElementCreatedBy = function (pMathLineInput) {
        for (var _i = 0, _a = this._declaredVars; _i < _a.length; _i++) {
            var s4mMemoryElement_1 = _a[_i];
            if (s4mMemoryElement_1.declaringMathLineInput === pMathLineInput) {
                return s4mMemoryElement_1;
            }
        }
        throw "The specified MathLineInput created no MemoryElement.";
    };
    S4MCoreMemory.prototype.hasAVarDeclaredBy = function (pMathLineInput) {
        var filteredArray = this._declaringMathLineInputs.filter(function (mathLineInput) { return (mathLineInput === pMathLineInput); });
        return (filteredArray.length !== 0);
    };
    S4MCoreMemory.prototype.hasAVarNamed = function (pVarName) {
        var filtered = this._declaredVars.filter(function (s4mMemoryElement) { return (s4mMemoryElement.varName === pVarName); });
        return (filtered.length !== 0);
    };
    S4MCoreMemory.prototype.getMathLineInputWhichDeclared = function (pVarName) {
        for (var _i = 0, _a = this._declaredVars; _i < _a.length; _i++) {
            var memoryElement = _a[_i];
            if (memoryElement.varName === pVarName) {
                return memoryElement.declaringMathLineInput;
            }
        }
        throw "No MathLineInput declared var [" + pVarName + "]";
    };
    S4MCoreMemory.prototype.addVar = function (pMemoryElement, pMathLineInput) {
        this._declaringMathLineInputs.push(pMathLineInput);
        this._declaredVars.push(pMemoryElement);
        return this;
    };
    S4MCoreMemory.prototype.removeVarDeclaredBy = function (pMathLineInput) {
        this._declaredVars = this._declaredVars.filter(function (s4mMemoryElement) { return (s4mMemoryElement.declaringMathLineInput !== pMathLineInput); });
        this._declaringMathLineInputs = this._declaringMathLineInputs.filter(function (mathLineInput) { return (mathLineInput !== pMathLineInput); });
        return this;
    };
    S4MCoreMemory.prototype.removeAllProducedBy = function (pMathLineInput) {
        this.removeVarDeclaredBy(pMathLineInput);
        return this;
    };
    S4MCoreMemory.prototype.removeVarNamed = function (pVarName) {
        if (this.hasAVarNamed(pVarName)) {
            this.removeVarDeclaredBy(this.getMathLineInputWhichDeclared(pVarName));
        }
        return this;
    };
    S4MCoreMemory.prototype.setVar = function (pMemoryElement, pMathLineInput) {
        this.removeVarDeclaredBy(pMathLineInput);
        this.addVar(pMemoryElement, pMathLineInput);
        return this;
    };
    S4MCoreMemory.prototype.storeErroredMathLineInput = function (pMathLineInput) {
        this._errorMathLineInputs.push(pMathLineInput);
        return this;
    };
    S4MCoreMemory.prototype.unstoreErroredMathLineInput = function (pMathLineInput) {
        this._errorMathLineInputs = this._errorMathLineInputs.filter(function (el) { return (el !== pMathLineInput); });
        return this;
    };
    S4MCoreMemory.prototype.processAllErroredMathLineInputs = function () {
        // for (let mathLineInput of this._errorMathLineInputs) {
        //     mathLineInput.processContent();
        // }
        // this._errorMathLineInputs[0].processContent();
        // this._errorMathLineInputs.forEach((mathLineInput) => mathLineInput.processContent());
        return this;
    };
    return S4MCoreMemory;
}());
var InputScren = /** @class */ (function () {
    function InputScren(pJQueryElement, pShowHideOutputScreenButton, pOutputScren, pSolveButton, pVirtualKeyboard, pApp) {
        this._jQEl = pJQueryElement;
        this._showHideOutputScreenButton = pShowHideOutputScreenButton;
        this._showHideVirtualKeyboard = this._showHideOutputScreenButton.children().first();
        this._outputScreen = pOutputScren;
        this._solveButton = pSolveButton;
        this._virtualKeyboard = pVirtualKeyboard;
        this._app = pApp;
        this.setEvents();
    }
    InputScren.prototype.setEvents = function () {
        var _this = this;
        this._showHideOutputScreenButton.mousedown(function (e) {
            e.preventDefault();
        });
        this._showHideOutputScreenButton.click(function () {
            if (_this._outputScreen.isVisible()) {
                _this._outputScreen.hide(function () {
                    _this._jQEl.animate({
                        'width': '100%',
                        'height': '100%',
                    }, 300);
                    _this._solveButton.addClass('alone');
                });
            }
            else {
                _this._jQEl.animate({
                    'width': '50%',
                }, 300, function () {
                    _this._outputScreen.show();
                });
            }
        });
        this._showHideVirtualKeyboard.mousedown(function (e) {
            e.preventDefault();
        });
        this._showHideVirtualKeyboard.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this._virtualKeyboard.toggle();
        });
        return this;
    };
    InputScren.prototype.clickOnShowHideOutputScreenButton = function () {
        this._showHideOutputScreenButton.click();
        return this;
    };
    return InputScren;
}());
var OutputScreen = /** @class */ (function () {
    function OutputScreen(pJQueryElement) {
        this._jQEl = pJQueryElement;
        this._isVisible = true;
    }
    OutputScreen.prototype.isVisible = function () {
        return this._isVisible;
    };
    OutputScreen.prototype.setVisibilityTo = function (pBool) {
        this._isVisible = pBool;
    };
    OutputScreen.prototype.hide = function (pFunction) {
        this._jQEl.fadeOut(100, pFunction);
        this.setVisibilityTo(false);
        return this;
    };
    OutputScreen.prototype.show = function (pFunction) {
        this._jQEl.fadeIn(100, pFunction);
        this.setVisibilityTo(true);
        return this;
    };
    return OutputScreen;
}());
//Do nothing for the moment
var KeyBoardListener = /** @class */ (function () {
    function KeyBoardListener(pInputScreen, pOutputScreen) {
        this._inputScreen = pInputScreen;
        this._outputScreen = pOutputScreen;
        this.setEvents();
    }
    KeyBoardListener.prototype.setEvents = function () {
        return this;
    };
    return KeyBoardListener;
}());
var VirtualKeyboard = /** @class */ (function () {
    function VirtualKeyboard(pJQueryElement) {
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
        this._panels.majSymbolsPanel = new MajSymbolsPanel(this);
        this._panels.signsPanel = new SignsPanel(this);
        this._panels.functionsPanel = new FunctionsPanel(this);
        this._currentlyDisplayedPanel = this._panels.numbersPanel;
        this.appendPanelsToKeyboard()
            .setEvents()
            .displayPanel(this._panels.numbersPanel);
    }
    Object.defineProperty(VirtualKeyboard.prototype, "panels", {
        get: function () {
            return this._panels;
        },
        enumerable: false,
        configurable: true
    });
    VirtualKeyboard.prototype.appendPanelsToKeyboard = function () {
        for (var panelIndex in this._panels) {
            this._panels[panelIndex].appendTo(this._jQEl);
        }
        return this;
    };
    VirtualKeyboard.prototype.isVisible = function () {
        return this._isVisible;
    };
    VirtualKeyboard.prototype.displayPanel = function (pKeyboardPanel) {
        var _this = this;
        this._currentlyDisplayedPanel.fadeOut(function () {
            _this._currentlyDisplayedPanel = pKeyboardPanel;
            _this._currentlyDisplayedPanel.fadeIn();
        });
        return this;
    };
    VirtualKeyboard.prototype.show = function () {
        var _this = this;
        this._jQEl.animate({ width: 'toggle' }, 250, function () {
            _this._isVisible = true;
        });
        return this;
    };
    VirtualKeyboard.prototype.hide = function () {
        var _this = this;
        this._jQEl.animate({ width: 'toggle' }, 250, function () {
            _this._isVisible = true;
        });
        return this;
    };
    VirtualKeyboard.prototype.toggle = function () {
        if (this._isVisible) {
            this.hide();
        }
        else {
            this.show();
        }
        return this;
    };
    VirtualKeyboard.prototype.setEvents = function () {
        this._jQEl.mousedown(function (e) {
            e.preventDefault();
        });
        return this;
    };
    return VirtualKeyboard;
}());
var KeyboardPanel = /** @class */ (function () {
    function KeyboardPanel(pVirtualKeyboardContainer, pLineKeysArray) {
        this._jQEl = $('<div class="keyboard_panel"></div>');
        this._virtualKeyboardContainer = pVirtualKeyboardContainer;
        this._lineKeysArray = pLineKeysArray;
        this._jQEl.fadeOut(0);
        this.includeLineKeysInJQEl();
    }
    KeyboardPanel.prototype.includeLineKeysInJQEl = function () {
        for (var _i = 0, _a = this._lineKeysArray; _i < _a.length; _i++) {
            var lineKeys = _a[_i];
            lineKeys.appendTo(this._jQEl);
        }
        return this;
    };
    KeyboardPanel.prototype.appendTo = function (pElement) {
        this._jQEl.appendTo(pElement);
        return this;
    };
    KeyboardPanel.prototype.append = function (pElement) {
        this._jQEl.append(pElement);
        return this;
    };
    KeyboardPanel.prototype.fadeIn = function (pCallback) {
        this._jQEl.fadeIn(50, pCallback);
        return this;
    };
    KeyboardPanel.prototype.fadeOut = function (pCallback) {
        this._jQEl.fadeOut(50, pCallback);
        return this;
    };
    KeyboardPanel.prototype.replaceWith = function (pKeyboardPanel) {
        this._jQEl.replaceWith(pKeyboardPanel._jQEl);
        return this;
    };
    return KeyboardPanel;
}());
var LineKeys = /** @class */ (function () {
    function LineKeys(pKeys) {
        this._jQEl = $('<div class="line_key"></div>');
        this._touchKeys = pKeys;
        this.includeKeysInJQEl();
    }
    LineKeys.prototype.includeKeysInJQEl = function () {
        for (var _i = 0, _a = this._touchKeys; _i < _a.length; _i++) {
            var key = _a[_i];
            key.appendTo(this._jQEl);
        }
        return this;
    };
    LineKeys.prototype.appendTo = function (pElement) {
        this._jQEl.appendTo(pElement);
        return this;
    };
    LineKeys.prototype.append = function (pElement) {
        this._jQEl.append(pElement);
        return this;
    };
    return LineKeys;
}());
var TouchKey = /** @class */ (function () {
    function TouchKey(pKeyConfiguration) {
        this._label = pKeyConfiguration.label;
        this._width = pKeyConfiguration.width;
        this._style = pKeyConfiguration.style;
        this._jQEl = this.generateMathfieldJQEl(this._label);
        this.setEvent(pKeyConfiguration.action)
            .setStyle();
    }
    TouchKey.prototype.setStyle = function () {
        this._jQEl.addClass('keyboard_key_' + this._style);
        this._jQEl.css({ 'width': 'calc(' + (this._width.valueOf() / 10) * 100 + '% - 4px)' });
        return this;
    };
    TouchKey.prototype.setEvent = function (pFunction) {
        this._jQEl.click(function () {
            pFunction();
        });
        return this;
    };
    TouchKey.prototype.generateMathfieldJQEl = function (pLatexLabel) {
        var tempJQEl = $('<div class="keyboard_key unselectable"><span></span></div>');
        this._mathField = MathQuill.getInterface(2).StaticMath(tempJQEl.find('span').get(0));
        this.setLatexLabel(pLatexLabel);
        //remove all events of mathfield span element
        var retJQEl = tempJQEl.clone();
        tempJQEl.replaceWith(retJQEl);
        return retJQEl;
    };
    TouchKey.prototype.setLatexLabel = function (pLatexLabel) {
        this._mathField.latex(pLatexLabel);
        return this;
    };
    TouchKey.prototype.appendTo = function (pElement) {
        this._jQEl.appendTo(pElement);
        return this;
    };
    TouchKey.prototype.append = function (pElement) {
        this._jQEl.append(pElement);
        return this;
    };
    return TouchKey;
}());
var NumbersPanel = /** @class */ (function (_super) {
    __extends(NumbersPanel, _super);
    function NumbersPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new TouchKey({
                    label: "[ab]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.lettersPanel);
                    }
                }),
                new TouchKey({
                    label: "[L]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.letLineToggle(); }
                }),
                new TouchKey({
                    label: "\\star",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\star'); }
                }),
                new TouchKey({
                    label: "7",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('7'); }
                }),
                new TouchKey({
                    label: "8",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('8'); }
                }),
                new TouchKey({
                    label: "9",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('9'); }
                }),
                new TouchKey({
                    label: "\\frac{a}{b}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('/'); }
                }),
                new TouchKey({
                    label: "\\text{\\}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new TouchKey({
                    label: "\\dagger",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Ctrl-A'); }
                }),
                new TouchKey({
                    label: "\\Longleftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Backspace');
                        g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyBackspace();
                    }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[\\alpha \\beta]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.symbolsPanel);
                    }
                }),
                new TouchKey({
                    label: "\\text{(}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('('); }
                }),
                new TouchKey({
                    label: "\\text{)}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition(')'); }
                }),
                new TouchKey({
                    label: "4",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('4'); }
                }),
                new TouchKey({
                    label: "5",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('5'); }
                }),
                new TouchKey({
                    label: "6",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('6'); }
                }),
                new TouchKey({
                    label: "\\cdot",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\cdot'); }
                }),
                new TouchKey({
                    label: "a^b\\uparrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new TouchKey({
                    label: "\\uparrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Up'); }
                }),
                new TouchKey({
                    label: "a_b\\downarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[\\in \\partial]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.symbolsPanel);
                    }
                }),
                new TouchKey({
                    label: "\\text{[}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('['); }
                }),
                new TouchKey({
                    label: "\\text{]}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition(']'); }
                }),
                new TouchKey({
                    label: "1",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('1'); }
                }),
                new TouchKey({
                    label: "2",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('2'); }
                }),
                new TouchKey({
                    label: "3",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('3'); }
                }),
                new TouchKey({
                    label: "-",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('-'); }
                }),
                new TouchKey({
                    label: "\\leftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Left'); }
                }),
                new TouchKey({
                    label: "\\downarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Down'); }
                }),
                new TouchKey({
                    label: "\\rightarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Right'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[f()]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { console.log("go to panel [f()]"); }
                }),
                new TouchKey({
                    label: "\\vdash",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.unprocessedLineToggle(); }
                }),
                new TouchKey({
                    label: "\\text{#}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('#'); }
                }),
                new TouchKey({
                    label: "0",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('0'); }
                }),
                new TouchKey({
                    label: ".",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('.'); }
                }),
                new TouchKey({
                    label: "=",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('='); }
                }),
                new TouchKey({
                    label: "+",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('+'); }
                }),
                new TouchKey({
                    label: "[\\text{OK}]",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.BLUE,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
                }),
            ])
        ]) || this;
        return _this;
    }
    return NumbersPanel;
}(KeyboardPanel));
var LettersPanel = /** @class */ (function (_super) {
    __extends(LettersPanel, _super);
    function LettersPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new TouchKey({
                    label: "q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('q'); }
                }),
                new TouchKey({
                    label: "w",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('w'); }
                }),
                new TouchKey({
                    label: "e",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('e'); }
                }),
                new TouchKey({
                    label: "r",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('r'); }
                }),
                new TouchKey({
                    label: "t",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('t'); }
                }),
                new TouchKey({
                    label: "y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('y'); }
                }),
                new TouchKey({
                    label: "u",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('u'); }
                }),
                new TouchKey({
                    label: "i",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('i'); }
                }),
                new TouchKey({
                    label: "o",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('o'); }
                }),
                new TouchKey({
                    label: "\\Longleftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Backspace');
                        g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyBackspace();
                    }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "a",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('a'); }
                }),
                new TouchKey({
                    label: "s",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('s'); }
                }),
                new TouchKey({
                    label: "d",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('d'); }
                }),
                new TouchKey({
                    label: "f",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('f'); }
                }),
                new TouchKey({
                    label: "g",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('g'); }
                }),
                new TouchKey({
                    label: "h",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('h'); }
                }),
                new TouchKey({
                    label: "j",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('j'); }
                }),
                new TouchKey({
                    label: "k",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('k'); }
                }),
                new TouchKey({
                    label: "l",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('l'); }
                }),
                new TouchKey({
                    label: "p",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('p'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[\\uparrow]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.majLettersPanel);
                    }
                }),
                new TouchKey({
                    label: "z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('z'); }
                }),
                new TouchKey({
                    label: "x",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('x'); }
                }),
                new TouchKey({
                    label: "c",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('c'); }
                }),
                new TouchKey({
                    label: "v",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('v'); }
                }),
                new TouchKey({
                    label: "b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('b'); }
                }),
                new TouchKey({
                    label: "n",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('n'); }
                }),
                new TouchKey({
                    label: "m",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('m'); }
                }),
                new TouchKey({
                    label: "\\dagger",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Ctrl-A'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[123]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new TouchKey({
                    label: "[\\longleftrightarrow]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab'); }
                }),
                new TouchKey({
                    label: "a^b\\uparrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new TouchKey({
                    label: "",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ '); }
                }),
                new TouchKey({
                    label: "a_b\\downarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
                new TouchKey({
                    label: "\\text{\\}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new TouchKey({
                    label: "[OK]",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.BLUE,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
                }),
            ])
        ]) || this;
        return _this;
    }
    return LettersPanel;
}(KeyboardPanel));
var MajLettersPanel = /** @class */ (function (_super) {
    __extends(MajLettersPanel, _super);
    function MajLettersPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new TouchKey({
                    label: "Q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('Q'); }
                }),
                new TouchKey({
                    label: "W",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('W'); }
                }),
                new TouchKey({
                    label: "E",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('E'); }
                }),
                new TouchKey({
                    label: "R",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('R'); }
                }),
                new TouchKey({
                    label: "T",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('T'); }
                }),
                new TouchKey({
                    label: "Y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('Y'); }
                }),
                new TouchKey({
                    label: "U",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('U'); }
                }),
                new TouchKey({
                    label: "I",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('I'); }
                }),
                new TouchKey({
                    label: "O",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('O'); }
                }),
                new TouchKey({
                    label: "\\Longleftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Backspace');
                        g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyBackspace();
                    }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "A",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('A'); }
                }),
                new TouchKey({
                    label: "S",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('S'); }
                }),
                new TouchKey({
                    label: "D",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('D'); }
                }),
                new TouchKey({
                    label: "F",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('F'); }
                }),
                new TouchKey({
                    label: "G",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('G'); }
                }),
                new TouchKey({
                    label: "H",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('H'); }
                }),
                new TouchKey({
                    label: "J",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('J'); }
                }),
                new TouchKey({
                    label: "K",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('K'); }
                }),
                new TouchKey({
                    label: "L",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('L'); }
                }),
                new TouchKey({
                    label: "P",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('P'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[\\downarrow]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.lettersPanel);
                    }
                }),
                new TouchKey({
                    label: "Z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('Z'); }
                }),
                new TouchKey({
                    label: "X",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('X'); }
                }),
                new TouchKey({
                    label: "C",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('C'); }
                }),
                new TouchKey({
                    label: "V",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('V'); }
                }),
                new TouchKey({
                    label: "B",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('B'); }
                }),
                new TouchKey({
                    label: "N",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('N'); }
                }),
                new TouchKey({
                    label: "M",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('M'); }
                }),
                new TouchKey({
                    label: "\\dagger",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Ctrl-A'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[123]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new TouchKey({
                    label: "[\\longleftrightarrow]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab'); }
                }),
                new TouchKey({
                    label: "a^b\\uparrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new TouchKey({
                    label: "",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ '); }
                }),
                new TouchKey({
                    label: "a_b\\downarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
                new TouchKey({
                    label: "\\text{\\}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new TouchKey({
                    label: "[OK]",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.BLUE,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
                }),
            ])
        ]) || this;
        return _this;
    }
    return MajLettersPanel;
}(KeyboardPanel));
var SymbolsPanel = /** @class */ (function (_super) {
    __extends(SymbolsPanel, _super);
    function SymbolsPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new TouchKey({
                    label: "\\alpha",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\alpha'); }
                }),
                new TouchKey({
                    label: "\\beta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\beta'); }
                }),
                new TouchKey({
                    label: "\\gamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\gamma'); }
                }),
                new TouchKey({
                    label: "\\delta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\delta'); }
                }),
                new TouchKey({
                    label: "\\varepsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\varepsilon'); }
                }),
                new TouchKey({
                    label: "\\zeta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\zeta'); }
                }),
                new TouchKey({
                    label: "\\eta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\eta'); }
                }),
                new TouchKey({
                    label: "\\theta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\theta'); }
                }),
                new TouchKey({
                    label: "\\iota",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\iota'); }
                }),
                new TouchKey({
                    label: "\\Longleftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Backspace');
                        g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyBackspace();
                    }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "\\kappa",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\kappa'); }
                }),
                new TouchKey({
                    label: "\\lambda",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\lambda'); }
                }),
                new TouchKey({
                    label: "\\mu",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\mu'); }
                }),
                new TouchKey({
                    label: "\\nu",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\nu'); }
                }),
                new TouchKey({
                    label: "\\xi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\xi'); }
                }),
                new TouchKey({
                    label: "\\pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\pi'); }
                }),
                new TouchKey({
                    label: "\\rho",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\rho'); }
                }),
                new TouchKey({
                    label: "\\sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\sigma'); }
                }),
                new TouchKey({
                    label: "\\tau",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\tau'); }
                }),
                new TouchKey({
                    label: "\\upsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\upsilon'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[\\Pi \\R]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.majSymbolsPanel);
                    }
                }),
                new TouchKey({
                    label: "\\phi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
                new TouchKey({
                    label: "\\chi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\chi'); }
                }),
                new TouchKey({
                    label: "\\psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\psi'); }
                }),
                new TouchKey({
                    label: "\\omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\omega'); }
                }),
                new TouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
                new TouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
                new TouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
                new TouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[123]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new TouchKey({
                    label: "[\\longleftrightarrow]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab'); }
                }),
                new TouchKey({
                    label: "a^b\\uparrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new TouchKey({
                    label: "",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ '); }
                }),
                new TouchKey({
                    label: "a_b\\downarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
                new TouchKey({
                    label: "\\text{\\}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new TouchKey({
                    label: "[OK]",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.BLUE,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
                }),
            ])
        ]) || this;
        return _this;
    }
    return SymbolsPanel;
}(KeyboardPanel));
var MajSymbolsPanel = /** @class */ (function (_super) {
    __extends(MajSymbolsPanel, _super);
    function MajSymbolsPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new TouchKey({
                    label: "\\Gamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Gamma'); }
                }),
                new TouchKey({
                    label: "\\Delta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Delta'); }
                }),
                new TouchKey({
                    label: "\\Theta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Theta'); }
                }),
                new TouchKey({
                    label: "\\Lambda",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Lambda'); }
                }),
                new TouchKey({
                    label: "\\Pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Pi'); }
                }),
                new TouchKey({
                    label: "\\Sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\Sigma'); }
                }),
                new TouchKey({
                    label: "\\Phi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Phi'); }
                }),
                new TouchKey({
                    label: "\\Psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Psi'); }
                }),
                new TouchKey({
                    label: "\\Omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Omega'); }
                }),
                new TouchKey({
                    label: "\\Longleftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Backspace');
                        g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyBackspace();
                    }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "\\R",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\R'); }
                }),
                new TouchKey({
                    label: "\\C",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\C'); }
                }),
                new TouchKey({
                    label: "\\Q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Q'); }
                }),
                new TouchKey({
                    label: "\\Z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Z'); }
                }),
                new TouchKey({
                    label: "\\N",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\N'); }
                }),
                new TouchKey({
                    label: "\\pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\pi'); }
                }),
                new TouchKey({
                    label: "\\rho",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\rho'); }
                }),
                new TouchKey({
                    label: "\\sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\sigma'); }
                }),
                new TouchKey({
                    label: "\\tau",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\tau'); }
                }),
                new TouchKey({
                    label: "\\upsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\upsilon'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[\\alpha \\beta]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.symbolsPanel);
                    }
                }),
                new TouchKey({
                    label: "\\phi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
                new TouchKey({
                    label: "\\chi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\chi'); }
                }),
                new TouchKey({
                    label: "\\psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\psi'); }
                }),
                new TouchKey({
                    label: "\\omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\omega'); }
                }),
                new TouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
                new TouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
                new TouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
                new TouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi'); }
                }),
            ]),
            new LineKeys([
                new TouchKey({
                    label: "[123]",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new TouchKey({
                    label: "[\\longleftrightarrow]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab'); }
                }),
                new TouchKey({
                    label: "a^b\\uparrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^'); }
                }),
                new TouchKey({
                    label: "",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ '); }
                }),
                new TouchKey({
                    label: "a_b\\downarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_'); }
                }),
                new TouchKey({
                    label: "\\text{\\}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\'); }
                }),
                new TouchKey({
                    label: "[OK]",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.BLUE,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
                }),
            ])
        ]) || this;
        return _this;
    }
    return MajSymbolsPanel;
}(KeyboardPanel));
var SignsPanel = /** @class */ (function (_super) {
    __extends(SignsPanel, _super);
    function SignsPanel(pVirtualKeyboardContainer) {
        return _super.call(this, pVirtualKeyboardContainer, []) || this;
    }
    return SignsPanel;
}(KeyboardPanel));
var FunctionsPanel = /** @class */ (function (_super) {
    __extends(FunctionsPanel, _super);
    function FunctionsPanel(pVirtualKeyboardContainer) {
        return _super.call(this, pVirtualKeyboardContainer, []) || this;
    }
    return FunctionsPanel;
}(KeyboardPanel));
