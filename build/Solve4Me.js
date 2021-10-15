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
    VirtualKeyboardKeyStyle["RED"] = "red";
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
    function InputScren(pJQueryElement, pShowHideOutputScreenButtonEl, pOutputScren, pSolveButton, pVirtualKeyboard, pApp) {
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
    InputScren.prototype.setEvents = function () {
        var _this = this;
        this._showHideOutputScreenButton.mousedown(function (e) {
            e.preventDefault();
        });
        this._showHideOutputScreenButton.click(function (e) {
            e.preventDefault();
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
        this._showHideVirtualKeyboardButtonEl.mousedown(function (e) {
            e.preventDefault();
        });
        this._letLineToggleButtonEl.mousedown(function (e) {
            e.preventDefault();
        });
        this._unprocessLineToggleButtonEl.mousedown(function (e) {
            e.preventDefault();
        });
        this._showHideVirtualKeyboardButtonEl.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this._virtualKeyboard.toggle();
        });
        this._letLineToggleButtonEl.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            g_s4mCoreMemory.currentMathLineInputFocused.letLineToggle();
        });
        this._unprocessLineToggleButtonEl.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            g_s4mCoreMemory.currentMathLineInputFocused.unprocessedLineToggle();
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
        var _this = this;
        this._jQEl = $('<div class="keyboard_panel"></div>');
        this._virtualKeyboardContainer = pVirtualKeyboardContainer;
        this._lineKeysArray = pLineKeysArray;
        this._lineKeysArray.map(function (lineKeys) {
            lineKeys.setHeight(100 / _this._lineKeysArray.length);
        });
        // for (let lineKeys of this._lineKeysArray) {
        //     lineKeys.setHeight(100 / this._lineKeysArray.length);
        // }
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
        this._jQEl.fadeIn(0, pCallback);
        return this;
    };
    KeyboardPanel.prototype.fadeOut = function (pCallback) {
        this._jQEl.fadeOut(0, pCallback);
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
    LineKeys.prototype.setHeight = function (pHeight) {
        this._jQEl.css({
            'height': pHeight + "%"
        });
        return this;
    };
    return LineKeys;
}());
var TouchKey = /** @class */ (function () {
    function TouchKey(pKeyConfiguration) {
        this._label = pKeyConfiguration.label;
        this._title = (pKeyConfiguration.title ? pKeyConfiguration.title : pKeyConfiguration.label);
        this._width = pKeyConfiguration.width;
        this._style = pKeyConfiguration.style;
        this._jQEl = $('');
    }
    TouchKey.prototype.setStyle = function () {
        this._jQEl.addClass('keyboard_key_' + this._style);
        this._jQEl.css({ 'width': 'calc(' + (this._width.valueOf() / 10) * 100 + '% - 4px)' });
        return this;
    };
    TouchKey.prototype.setEvent = function (pFunction) {
        this._jQEl.mousedown(function () {
            pFunction();
        });
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
var ImgTouchKey = /** @class */ (function (_super) {
    __extends(ImgTouchKey, _super);
    function ImgTouchKey(pKeyConfiguration) {
        var _this = _super.call(this, pKeyConfiguration) || this;
        _this._jQEl = $('<div class="keyboard_key unselectable" title="' + _this._title + '"><span></span</div>');
        _this._jQEl.css({
            'background-image': "url('./imgs/" + pKeyConfiguration.label + ".svg')",
            'background-repeat': 'no-repeat',
            'background-size': '35px',
            'background-position': 'center',
        });
        _this.setEvent(pKeyConfiguration.action);
        _this.setStyle();
        return _this;
    }
    return ImgTouchKey;
}(TouchKey));
var LatexTouchKey = /** @class */ (function (_super) {
    __extends(LatexTouchKey, _super);
    function LatexTouchKey(pKeyConfiguration) {
        var _this = _super.call(this, pKeyConfiguration) || this;
        _this._jQEl = _this.generateMathfieldJQEl(_this._label, _this._title);
        _this.setEvent(pKeyConfiguration.action);
        _this.setStyle();
        return _this;
    }
    LatexTouchKey.prototype.generateMathfieldJQEl = function (pLatexLabel, pTitle) {
        var tempJQEl = $('<div class="keyboard_key unselectable" title="' + pTitle + '"><span></span></div>');
        this._mathField = MathQuill.getInterface(2).StaticMath(tempJQEl.find('span').get(0));
        this.setLatexLabel(pLatexLabel);
        //remove all events of mathfield span element
        var retJQEl = tempJQEl.clone();
        tempJQEl.replaceWith(retJQEl);
        return retJQEl;
    };
    LatexTouchKey.prototype.setLatexLabel = function (pLatexLabel) {
        this._mathField.latex(pLatexLabel);
        return this;
    };
    return LatexTouchKey;
}(TouchKey));
var NumbersPanel = /** @class */ (function (_super) {
    __extends(NumbersPanel, _super);
    function NumbersPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[ab]}",
                    title: "Go to [Letters] panel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.lettersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\text{(}",
                    title: "(",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('('); }
                }),
                new LatexTouchKey({
                    label: "\\text{)}",
                    title: ")",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition(')').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "7",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('7').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "8",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('8').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "9",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('9').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{a}{b}",
                    title: "a/b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('/').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\cdot",
                    title: "* (multiply)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\cdot').saveUndoRedoState(); }
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
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.symbolsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\text{{}",
                    title: "{",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('{').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{{}",
                    title: "}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('}').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "4",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('4').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "5",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('5').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "6",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('6').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\times",
                    title: "X",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\times").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\uparrow",
                    title: "Up",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Up').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[\\oplus \\partial]}",
                    title: "Go to [Operators] panel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.operatorsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('[').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition(']').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "1",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('1').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "2",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('2').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "3",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('3').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "-",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('-').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    title: "Left",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Left').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\downarrow",
                    title: "Down",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Down').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    title: "Right",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Right').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[f()]}",
                    title: "Go to [Actions] panel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.functionsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\text{#}",
                    title: "#",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('#').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: ",",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition(',').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "0",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('0').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: ".",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('.').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "=",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('=').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "+",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('+').saveUndoRedoState(); }
                }),
                new EnterKey(),
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
                new LatexTouchKey({
                    label: "q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('q').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "w",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('w').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "e",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('e').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "r",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('r').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "t",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('t').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('y').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "u",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('u').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "i",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('i').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "o",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('o').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "a",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('a').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "s",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('s').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "d",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('d').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "f",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('f').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "g",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('g').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "h",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('h').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "j",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('j').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "k",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('k').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "l",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('l').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "p",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('p').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[\\uparrow]}",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.majLettersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('z').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "x",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('x').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "c",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('c').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "v",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('v').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('b').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "n",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('n').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "m",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('m').saveUndoRedoState(); }
                }),
                new SelectAllKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "[\\longleftrightarrow]",
                    title: "Tabulation",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{\\}",
                    title: "\\",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\').saveUndoRedoState(); }
                }),
                new EnterKey(),
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
                new LatexTouchKey({
                    label: "Q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('Q').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "W",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('W').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "E",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('E').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "R",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('R').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "T",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('T').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "Y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('Y').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "U",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('U').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "I",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('I').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "O",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('O').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "A",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('A').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "S",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('S').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "D",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('D').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "F",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('F').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "G",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('G').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "H",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('H').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "J",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('J').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "K",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('K').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "L",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('L').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "P",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('P').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[\\downarrow]}",
                    title: "Down",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.lettersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "Z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('Z').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "X",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('X').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "C",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('C').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "V",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('V').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "B",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('B').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "N",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('N').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "M",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('M').saveUndoRedoState(); }
                }),
                new SelectAllKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "[\\longleftrightarrow]",
                    title: "Tabulation",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{\\}",
                    title: "\\",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\').saveUndoRedoState(); }
                }),
                new EnterKey(),
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
                new LatexTouchKey({
                    label: "\\alpha",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\alpha').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\beta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\beta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\gamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\gamma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\delta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\delta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\varepsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\varepsilon').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\zeta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\zeta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\eta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\eta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\theta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\theta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\iota",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\iota').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\kappa",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\kappa').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\lambda",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\lambda').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\mu",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\mu').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\nu",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\nu').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\xi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\xi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\pi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rho",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\rho').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\sigma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\tau",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\tau').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\upsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\upsilon').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[\\Pi \\R]}",
                    title: "Go to [Others symbols] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.majSymbolsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\phi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\chi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\chi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\psi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\omega').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\infty",
                    title: "Infinity",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\infty').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('[').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition(']').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\ast",
                    title: "*",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\ast').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "[\\longleftrightarrow]",
                    title: "Tabulation",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\mapsto",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition("\\ \\mapsto\\ ").saveUndoRedoState(); }
                }),
                new EnterKey(),
            ])
        ]) || this;
        return _this;
    }
    return SymbolsPanel;
}(KeyboardPanel));
var OtherSymbolsPanel = /** @class */ (function (_super) {
    __extends(OtherSymbolsPanel, _super);
    function OtherSymbolsPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "\\Gamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Gamma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\digamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\digamma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Delta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Delta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Theta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Theta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Lambda",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Lambda').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Pi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Sigma').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\Phi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Phi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Psi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Omega').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Xi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Xi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Upsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Upsilon').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[\\alpha \\beta]}",
                    title: "Go to [Greek letters] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.symbolsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\R",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 9 / 8,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\R').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\C",
                    width: 9 / 8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\C').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Q",
                    width: 9 / 8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Q').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Z",
                    width: 9 / 8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Z').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\N",
                    width: 9 / 8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\N').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\emptyset",
                    width: 9 / 8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\emptyset').saveUndoRedoState(); }
                }),
                new ImgTouchKey({
                    label: "units",
                    title: "Units",
                    width: 10 / 8,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.unitsPanel);
                    }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "[\\longleftrightarrow]",
                    title: "Tabulation",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{a}{b}",
                    title: "a/b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('/').saveUndoRedoState(); }
                }),
                new EnterKey(),
            ])
        ]) || this;
        return _this;
    }
    return OtherSymbolsPanel;
}(KeyboardPanel));
var UnitsPanel = /** @class */ (function (_super) {
    __extends(UnitsPanel, _super);
    function UnitsPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "\\text{°}",
                    title: "Degree",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\text{°}').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{rad}}",
                    title: "Radian",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{rad}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{kg}}",
                    title: "kg",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{kg}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{m}}",
                    title: "meter",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{m}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{s}}",
                    title: "second",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{s}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{A}}",
                    title: "Amperes",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{A}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{K}}",
                    title: "Kelvin",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{K}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{mol}}",
                    title: "mol",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{mol}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{cd}}",
                    title: "Candela",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{cd}}").saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\R",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\R').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\C",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\C').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Q",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Q').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Z",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\Z').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\N",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\N').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\emptyset",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\emptyset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\rho').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\sigma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{°}",
                    title: "Degree",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\text{°}').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{rad}}",
                    title: "Radian",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{rad}}").saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[\\Pi \\R]}",
                    title: "Go to [Others symbols] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.majSymbolsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "_{\\text{kg}}",
                    title: "kg",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{kg}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{m}}",
                    title: "meter",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{m}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{s}}",
                    title: "second",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{s}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{A}}",
                    title: "Amperes",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{A}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{K}}",
                    title: "Kelvin",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{K}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{mol}}",
                    title: "mol",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{mol}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{cd}}",
                    title: "Candela",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("{\\text{cd}}").saveUndoRedoState(); }
                }),
                new ImgTouchKey({
                    label: "units",
                    title: "Units",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\phi').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "[\\longleftrightarrow]",
                    title: "Tabulation",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{a}{b}",
                    title: "a/b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('/').saveUndoRedoState(); }
                }),
                new EnterKey(),
            ])
        ]) || this;
        return _this;
    }
    return UnitsPanel;
}(KeyboardPanel));
var OperatorsPanel = /** @class */ (function (_super) {
    __extends(OperatorsPanel, _super);
    function OperatorsPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "\\exists",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\exists').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\vec{v}",
                    title: "Vector arrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\vec').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('[').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition(']').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\neg",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\neg').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\sqrt{x}",
                    title: "Square root",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\sqrt').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{|}",
                    title: "|",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('|').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\circ",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\circ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\rightarrow').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\nexist",
                    title: "?",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\nexist').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\forall",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\forall').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\lceil",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\lceil').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rceil",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\rceil').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\land",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\land').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\union",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\union').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\supset",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\supset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\subset",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\subset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\leftarrow').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\partial",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\partial").saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[\\ge \\oint]}",
                    title: "Go to [Other operators] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.otherOperatorsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\lfloor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\lfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rfloor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\rfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\lor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\lor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\cap",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\cap").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\supseteq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\supseteq").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\subseteq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\subseteq").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\mapsto",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\mapsto").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{d}",
                    title: "Differential",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\text{d}').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\neq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\neq').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\simeq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\simeq').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\equiv",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\equiv').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\in",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\in').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\notin",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\notin').saveUndoRedoState(); }
                }),
                new EnterKey(),
            ])
        ]) || this;
        return _this;
    }
    return OperatorsPanel;
}(KeyboardPanel));
var OtherOperatorsPanel = /** @class */ (function (_super) {
    __extends(OtherOperatorsPanel, _super);
    function OtherOperatorsPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new LatexTouchKey({
                    label: "\\int _{\\ }^{\\ }",
                    title: "Integral",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\int').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{\\text{d}}{\\text{d}_x}",
                    title: "Closed curve integral",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () {
                        g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition('\\frac{\\text{d}}{\\text{d}_{ }}')
                            .keyStroke('Left Left')
                            .saveUndoRedoState();
                    }
                }),
                new LatexTouchKey({
                    label: "f()",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () {
                        g_s4mCoreMemory.currentMathLineInputFocused
                            .writeLatexAtCursorPosition('\\text{Function}\\left(_{}^{}\\right)')
                            .keyStroke('Left Left')
                            .saveUndoRedoState();
                    }
                }),
                new LatexTouchKey({
                    label: "\\lt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\lt').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\gt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\gt').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\sum_{\\ }^{\\ }",
                    title: "Sum",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\sum').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\overline{42}",
                    title: "Overline",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\overline').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\nabla",
                    title: "nabla",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\nabla').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\vec{\\nabla}",
                    title: "nabla",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("\\vec{\\nabla}").saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\oint",
                    title: "Closed curve integral",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\oint').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{\\partial }{\\partial _x}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendValueAtCursorPosition('\\partial/\\partial_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\vec{V}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () {
                        g_s4mCoreMemory.currentMathLineInputFocused.writeLatexAtCursorPosition("\\text{Vect}\\left(\\right)")
                            .keyStroke('Left')
                            .saveUndoRedoState();
                    }
                }),
                new LatexTouchKey({
                    label: "\\le",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\le').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\ge",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\ge').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\prod_{\\ }^{\\ }",
                    title: "Product",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\prod').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\supset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\subset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\uparrow",
                    title: "Up",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Up').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    title: "Given statement",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.givenLineToggle().saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[\\in \\partial]}",
                    title: "Go to [Operators] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.operatorsPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\lfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("{\\rfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\lor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\coprod_{\\ }^{\\ }",
                    title: "Coproduct",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\coprod').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition("\\supseteq").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    title: "Left",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Left').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\downarrow",
                    title: "Down",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Down').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    title: "Right",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Right').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "\\oplus",
                    width: 5 / 4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\oplus').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\ominus",
                    width: 5 / 4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\ominus').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\otimes",
                    width: 5 / 4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\otimes').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\odot",
                    width: 5 / 4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.appendCmdAtCursorPosition('\\odot').saveUndoRedoState(); }
                }),
                new EnterKey(),
            ])
        ]) || this;
        return _this;
    }
    return OtherOperatorsPanel;
}(KeyboardPanel));
var FunctionsPanel = /** @class */ (function (_super) {
    __extends(FunctionsPanel, _super);
    function FunctionsPanel(pVirtualKeyboardContainer) {
        var _this = _super.call(this, pVirtualKeyboardContainer, [
            new LineKeys([
                new ImgTouchKey({
                    label: "undo",
                    title: "Undo",
                    width: 3.5,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.undo(); }
                }),
                new ImgTouchKey({
                    label: "redo",
                    title: "Redo",
                    width: 3.5,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.redo(); }
                }),
                new LatexTouchKey({
                    label: "\\uparrow",
                    title: "Up",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Up').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new ImgTouchKey({
                    label: "print",
                    title: "Print",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.printLine().saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "[G]",
                    title: "Given statement",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.givenLineToggle().saveUndoRedoState(); }
                }),
                new SelectAllKey(),
                new ImgTouchKey({
                    label: "delete",
                    title: "Delete",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.RED,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.delete(); }
                }),
                new ImgTouchKey({
                    label: "duplicate",
                    title: "Duplicate",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.duplicateMathLine(); }
                }),
                new ImgTouchKey({
                    label: "insertOver",
                    title: "Insert line Over",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.addNewMathLineInputOverMe(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    title: "Left",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Left').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\downarrow",
                    title: "Down",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Down').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    title: "Right",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Right').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new ImgTouchKey({
                    label: "save",
                    title: "Save",
                    width: 2.5,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.currentMathLineInputFocused.saveWidgetToggle(); }
                }),
                new ImgTouchKey({
                    label: "open",
                    title: "Open",
                    width: 2.5,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () {
                        g_s4mCoreMemory.currentMathLineInputFocused.openWidgetToggle();
                    }
                }),
                new EnterKey(),
            ])
        ]) || this;
        return _this;
    }
    return FunctionsPanel;
}(KeyboardPanel));
var EnterKey = /** @class */ (function (_super) {
    __extends(EnterKey, _super);
    function EnterKey() {
        return _super.call(this, {
            label: "enter",
            title: "Enter",
            width: 3,
            style: VirtualKeyboardKeyStyle.BLUE,
            action: function () { g_s4mCoreMemory.currentMathLineInputFocused.doIfKeyEnter(); }
        }) || this;
    }
    return EnterKey;
}(ImgTouchKey));
var BackspaceKey = /** @class */ (function (_super) {
    __extends(BackspaceKey, _super);
    function BackspaceKey() {
        return _super.call(this, {
            label: "backspace",
            title: "Backspace",
            width: 1,
            style: VirtualKeyboardKeyStyle.RED,
            action: function () {
                g_s4mCoreMemory.currentMathLineInputFocused
                    .keyStroke('Backspace')
                    .saveUndoRedoState()
                    .doIfKeyBackspace();
            }
        }) || this;
    }
    return BackspaceKey;
}(ImgTouchKey));
var SelectAllKey = /** @class */ (function (_super) {
    __extends(SelectAllKey, _super);
    function SelectAllKey() {
        return _super.call(this, {
            label: "selectAll",
            title: "Select all",
            width: 1,
            style: VirtualKeyboardKeyStyle.LIGHT,
            action: function () { g_s4mCoreMemory.currentMathLineInputFocused.keyStroke('Ctrl-A').saveUndoRedoState(); }
        }) || this;
    }
    return SelectAllKey;
}(ImgTouchKey));
