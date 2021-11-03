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
// is an operator
var CalculusNode = /** @class */ (function () {
    function CalculusNode(pOperatorName, pFollowings) {
        this._operatorName = pOperatorName;
        this._operands = pFollowings;
    }
    CalculusNode.prototype.toString = function () {
        var retStr = "";
        return retStr;
    };
    return CalculusNode;
}());
//is a mathobj
var CalculusLeaf = /** @class */ (function () {
    function CalculusLeaf() {
        this._factor = new MathObj();
    }
    return CalculusLeaf;
}());
var CalculusTree = /** @class */ (function () {
    function CalculusTree(pRoot) {
        this.root = pRoot;
    }
    CalculusTree.prototype.visualize = function () {
        return this;
    };
    return CalculusTree;
}());
var MathObj = /** @class */ (function () {
    function MathObj() {
    }
    MathObj.prototype.toString = function () {
        return "A Math Object";
    };
    return MathObj;
}());
var S4MCoreMemory = /** @class */ (function () {
    function S4MCoreMemory(pFirstMathLineInput) {
        this._declaringMathLineInputs = [];
        this._errorMathLineInputs = [];
        //need to declare basic constants here
        this._declaredVars = [];
        this._lastMathLineInputFocusedOut = pFirstMathLineInput;
        this._currentMathLineInputFocused = pFirstMathLineInput;
    }
    S4MCoreMemory.prototype.defineConstants = function () {
        // this.addVar({
        //     declaringMathLineInput: null,
        //     varName: "\\pi",
        //     nerdamerVarName: 'pi',
        //     varValue: '',
        //     processedVarValue: new MathObj(),
        // }, null);
        return this;
    };
    S4MCoreMemory.prototype.currentMathLineInputFocusedIs = function (pMathLineInput) {
        this._currentMathLineInputFocused = pMathLineInput;
        return this;
    };
    S4MCoreMemory.prototype.lastMathLineInputFocusedOutIs = function (pMathLineInput) {
        this._lastMathLineInputFocusedOut = pMathLineInput;
        return this;
    };
    S4MCoreMemory.prototype.setCurrentMathLineInputFocusedToNull = function () {
        this._currentMathLineInputFocused = null;
        return this;
    };
    S4MCoreMemory.prototype.getMathLineInputToEdit = function () {
        if (this._currentMathLineInputFocused === null) {
            return this._lastMathLineInputFocusedOut;
        }
        return this._currentMathLineInputFocused;
    };
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
    S4MCoreMemory.prototype.getMemoryElementsDeclaredBy = function (pMathLineInput) {
        var retArray = this._declaredVars.filter(function (s4mMemoryElement) { return (s4mMemoryElement.declaringMathLineInput === pMathLineInput); });
        return retArray;
    };
    S4MCoreMemory.prototype.removeVarDeclaredBy = function (pMathLineInput) {
        var memoryElementsToRemove = this.getMemoryElementsDeclaredBy(pMathLineInput);
        this._declaredVars = this._declaredVars.filter(function (s4mMemoryElement) { return (s4mMemoryElement.declaringMathLineInput !== pMathLineInput); });
        this._declaringMathLineInputs = this._declaringMathLineInputs.filter(function (mathLineInput) { return (mathLineInput !== pMathLineInput); });
        memoryElementsToRemove.map(function (s4mMemoryElement) { return nerdamer.setVar(s4mMemoryElement.varName, 'delete'); });
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
        nerdamer.setVar(pMemoryElement.varName, pMemoryElement.varValue);
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
        this._jQEl.mousedown(function (e) {
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
            g_s4mCoreMemory.getMathLineInputToEdit().letLineToggle();
        });
        this._unprocessLineToggleButtonEl.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            g_s4mCoreMemory.getMathLineInputToEdit().unprocessedLineToggle();
        });
        return this;
    };
    InputScren.prototype.clickOnShowHideOutputScreenButton = function () {
        this._showHideOutputScreenButton.click();
        return this;
    };
    InputScren.prototype.addNewMathLineInput = function () {
        return this;
    };
    return InputScren;
}());
var OutputScreenMessage = /** @class */ (function () {
    function OutputScreenMessage(pMessage, pMathLineInputSource) {
        this._jQEl = $('<div><div class="message_title">' + pMessage.title + '</div><div class="message_body"></div></div>');
        this._mathLineInputSource = pMathLineInputSource;
        this._jQEl.fadeOut(0);
    }
    Object.defineProperty(OutputScreenMessage.prototype, "mathLineInputSource", {
        get: function () {
            return this._mathLineInputSource;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OutputScreenMessage.prototype, "jQEl", {
        get: function () {
            return this._jQEl;
        },
        enumerable: false,
        configurable: true
    });
    OutputScreenMessage.prototype.appendTo = function (pElement) {
        this._jQEl.appendTo(pElement);
        return this;
    };
    OutputScreenMessage.prototype.insertBefore = function (pElement) {
        this._jQEl.insertBefore(pElement);
        return this;
    };
    OutputScreenMessage.prototype.toggle = function () {
        this._jQEl.show(200);
        return this;
    };
    OutputScreenMessage.prototype.removeFromDOM = function () {
        var _this = this;
        this._jQEl.hide(200, function () {
            _this._jQEl.remove();
        });
        return this;
    };
    OutputScreenMessage.prototype.setTitleTo = function (pStr) {
        this.jQEl.find('.message_title').text(pStr);
        return this;
    };
    return OutputScreenMessage;
}());
var OutputScreenErrorMessage = /** @class */ (function (_super) {
    __extends(OutputScreenErrorMessage, _super);
    function OutputScreenErrorMessage(pErrorMessage, pMathLineInputSource) {
        var _this = _super.call(this, pErrorMessage, pMathLineInputSource) || this;
        for (var _i = 0, _a = pErrorMessage.body; _i < _a.length; _i++) {
            var str = _a[_i];
            _this._jQEl.find('.message_body').append($('<div></div').css({ 'border': 'none' }).text(str));
            _this._jQEl.find('.message_body').append($('<hr class="error_message_separator" />'));
        }
        _this._jQEl.find('hr.error_message_separator:last').remove();
        _this._jQEl.addClass("error_message");
        return _this;
    }
    return OutputScreenErrorMessage;
}(OutputScreenMessage));
var OutputScreenAnswerMessage = /** @class */ (function (_super) {
    __extends(OutputScreenAnswerMessage, _super);
    function OutputScreenAnswerMessage(pAnswerMessage, pMathLineInputSource) {
        var _this = _super.call(this, pAnswerMessage, pMathLineInputSource) || this;
        var newMathField;
        var newDiv;
        for (var _i = 0, _a = pAnswerMessage.body; _i < _a.length; _i++) {
            var str = _a[_i];
            newDiv = $('<div class="answer_mathfield"></div>');
            newMathField = MathQuill.getInterface(2).StaticMath(newDiv.get(0));
            // newMathField.latex('\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}');
            newMathField.latex(str);
            _this._jQEl.find('.message_body').append(newDiv);
            _this._jQEl.find('.message_body').append($('<hr class="answer_message_separator" />'));
        }
        _this._jQEl.find('hr.answer_message_separator:last').remove();
        // this._mathField = MathQuill.getInterface(2).StaticMath(this._jQEl.find('.message_body span').get(0));
        // this._mathField.latex(pAnswerMessage.body);
        _this._jQEl.addClass("answer_message");
        return _this;
    }
    return OutputScreenAnswerMessage;
}(OutputScreenMessage));
var OutputScreen = /** @class */ (function () {
    function OutputScreen(pJQueryElement) {
        this._jQEl = pJQueryElement;
        this._isVisible = true;
        this._messages = [];
        this._jQElContent = this._jQEl.find('#output_screen');
        this.setEvents();
    }
    OutputScreen.prototype.setEvents = function () {
        this._jQEl.mousedown(function (e) {
            e.preventDefault();
        });
        return this;
    };
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
    OutputScreen.prototype.displayErrorMessage = function (pErrorObject, pErroredMathLineInput) {
        var newErrorMessage = new OutputScreenErrorMessage({
            title: "Line [" + pErroredMathLineInput.numberLine + "]:",
            body: ["[" + pErrorObject.name + "]: " + pErrorObject.message],
        }, pErroredMathLineInput);
        this._messages.push(newErrorMessage);
        this.appendMessageAtCorrectLocation(newErrorMessage);
        return this;
    };
    OutputScreen.prototype.displayAnswerMessage = function (pAnswerStr, pMathLineInputSource) {
        var newAnswerMessage = new OutputScreenAnswerMessage({
            title: "Line [" + pMathLineInputSource.numberLine + "]:",
            body: pAnswerStr,
        }, pMathLineInputSource);
        this._messages.push(newAnswerMessage);
        this.appendMessageAtCorrectLocation(newAnswerMessage);
        return this;
    };
    OutputScreen.prototype.getMessageWhichIsAfterMessageOf = function (pMathLineInputSource) {
        var retMessage = null;
        for (var _i = 0, _a = this._messages; _i < _a.length; _i++) {
            var outputScreenMessage = _a[_i];
            if (outputScreenMessage.mathLineInputSource.numberLine > pMathLineInputSource.numberLine) {
                if (retMessage === null) {
                    retMessage = outputScreenMessage;
                }
                else {
                    if (outputScreenMessage.mathLineInputSource.numberLine < retMessage.mathLineInputSource.numberLine) {
                        retMessage = outputScreenMessage;
                    }
                }
            }
        }
        return retMessage;
    };
    OutputScreen.prototype.appendMessageAtCorrectLocation = function (pNewAnswerMessage) {
        var messageJustAfter = this.getMessageWhichIsAfterMessageOf(pNewAnswerMessage.mathLineInputSource);
        if (messageJustAfter === null) {
            pNewAnswerMessage.insertBefore(this._jQElContent.find('hr#outputscreen_end_line')).toggle();
        }
        else {
            pNewAnswerMessage.insertBefore(messageJustAfter.jQEl).toggle();
        }
        return this;
    };
    OutputScreen.prototype.removeMessagesOf = function (pMathLineInputSource) {
        var messageToRemove = this._messages.filter(function (messageEl) { return (messageEl.mathLineInputSource === pMathLineInputSource); });
        if (messageToRemove[0] !== undefined) {
            this._messages = this._messages.filter(function (messageEl) { return (messageEl !== messageToRemove[0]); });
            messageToRemove[0].removeFromDOM();
        }
        return this;
    };
    OutputScreen.prototype.getMessageGeneratedBy = function (pMathLineInput) {
        for (var _i = 0, _a = this._messages; _i < _a.length; _i++) {
            var message = _a[_i];
            if (message.mathLineInputSource === pMathLineInput) {
                return message;
            }
        }
        return null;
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
    VirtualKeyboard.prototype.displayUnitsPanel = function () {
        this.displayPanel(this._panels.unitsPanel);
        return this;
    };
    VirtualKeyboard.prototype.hide = function () {
        var _this = this;
        this._jQEl.animate({ width: 'toggle' }, 250, function () {
            _this._isVisible = false;
            _this.displayPanel(_this._panels.numbersPanel);
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('('); }
                }),
                new LatexTouchKey({
                    label: "\\text{)}",
                    title: ")",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition(')').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "7",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('7').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "8",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('8').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "9",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('9').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{a}{b}",
                    title: "a/b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('/').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\cdot",
                    title: "* (multiply)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\cdot').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('{').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{{}",
                    title: "}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('}').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "4",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('4').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "5",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('5').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "6",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('6').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\times",
                    title: "X",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\times").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\uparrow",
                    title: "Up",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Up').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overrightarrow{[\\partial_z]}",
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('[').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition(']').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "1",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('1').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "2",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('2').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "3",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('3').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "-",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('-').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    title: "Left",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Left').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\downarrow",
                    title: "Down",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Down').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    title: "Right",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Right').saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new ImgTouchKey({
                    label: "actions",
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('#').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: ",",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition(',').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: ".",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('.').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "0",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('0').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "=",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('=').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "+",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('+').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('q').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "w",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('w').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "e",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('e').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "r",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('r').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "t",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('t').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('y').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "u",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('u').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "i",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('i').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "o",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('o').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "a",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('a').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "s",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('s').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "d",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('d').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "f",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('f').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "g",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('g').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "h",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('h').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "j",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('j').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "k",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('k').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "l",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('l').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "p",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('p').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('z').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "x",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('x').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "c",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('c').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "v",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('v').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('b').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "n",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('n').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "m",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('m').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{\\}",
                    title: "\\",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('\\').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('Q').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "W",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('W').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "E",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('E').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "R",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('R').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "T",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('T').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "Y",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('Y').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "U",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('U').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "I",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('I').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "O",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('O').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "A",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('A').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "S",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('S').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "D",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('D').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "F",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('F').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "G",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('G').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "H",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('H').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "J",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('J').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "K",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('K').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "L",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('L').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "P",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('P').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('Z').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "X",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('X').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "C",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('C').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "V",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('V').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "B",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('B').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "N",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('N').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "M",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('M').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{\\}",
                    title: "\\",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('\\').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\alpha').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\beta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\beta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\gamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\gamma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\delta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\delta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\varepsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\varepsilon').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\zeta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\zeta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\eta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\eta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\theta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\theta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\iota",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\iota').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\kappa",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\kappa').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\lambda",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\lambda').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\mu",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\mu').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\nu",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\nu').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\xi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\xi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\pi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rho",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\rho').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\sigma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\tau",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\tau').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\upsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\upsilon').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\phi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\chi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\chi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\psi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\omega').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\infty",
                    title: "Infinity",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\infty').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('[').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition(']').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\ast",
                    title: "*",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\ast').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "Space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\mapsto",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition("\\ \\mapsto\\ ").saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Gamma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\digamma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\digamma').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Delta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Delta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Theta",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Theta').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Lambda",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Lambda').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Pi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Pi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Sigma",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Sigma').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\Phi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Phi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Psi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Psi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Omega",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Omega').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Xi",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Xi').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Upsilon",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Upsilon').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\R').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\C",
                    width: 9 / 8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\C').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Q",
                    width: 9 / 8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Q').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\Z",
                    width: 9 / 8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\Z').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\N",
                    width: 9 / 8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\N').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\emptyset",
                    width: 9 / 8,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\emptyset').saveUndoRedoState(); }
                }),
                new ImgTouchKey({
                    label: "units",
                    title: "Go to [Units] Panel",
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Tab').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a^b\\uparrow",
                    title: "^ (exponent)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('^').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "",
                    title: "space",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\ ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "a_b\\downarrow",
                    title: "_ (Indice)",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{a}{b}",
                    title: "a/b",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('/').saveUndoRedoState(); }
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
                    title: "degree",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\text{°}').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{rad}}",
                    title: "radian",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{rad}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{kg}}",
                    title: "kilogram",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{kg}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{m}}",
                    title: "meter",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{m}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{s}}",
                    title: "second",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{s}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{A}}",
                    title: "ampere",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{A}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{K}}",
                    title: "kelvin",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{K}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{mol}}",
                    title: "mol",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{mol}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{cd}}",
                    title: "candela",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{cd}}").saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "_{\\text{Pa}}",
                    title: "pascal",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{Pa}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{Hz}}",
                    title: "hertz",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{Hz}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{N}}",
                    title: "newton",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{N}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{J}}",
                    title: "joules",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{J}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{W}}",
                    title: "watt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{W}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{V}}",
                    title: "volt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{V}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{°C}",
                    title: "Celcius degree",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("\\text{°C}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{S}}",
                    title: "siemens",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{S}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{H}}",
                    title: "henry",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{H}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{T}}",
                    title: "Telsa",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\text{T}').saveUndoRedoState(); }
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
                    label: "_{\\text{Wb}}",
                    title: "weber",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{rad}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{lm}}",
                    title: "lumen",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{lm}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{lx}}",
                    title: "lux",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{lx}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\delta",
                    title: "dioptrie",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("\\delta").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{Bq}}",
                    title: "becquerel",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{Bq}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{Gy}}",
                    title: "gray",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{Gy}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{Sv}}",
                    title: "sievert",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{Sv}}").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "_{\\text{C}}",
                    title: "coulomb",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{C}}").saveUndoRedoState(); }
                }),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\overleftarrow{[123]}",
                    title: "Go to [Numbers] panel",
                    width: 3,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () {
                        _this._virtualKeyboardContainer.displayPanel(_this._virtualKeyboardContainer.panels.numbersPanel);
                    }
                }),
                new LatexTouchKey({
                    label: "_{\\text{bar}}",
                    title: "bar",
                    width: 4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("{\\text{bar}}").saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\exists').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\vec{v}",
                    title: "Vector arrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\vec').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{[}",
                    title: "[",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('[').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{]}",
                    title: "]",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition(']').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\neg",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\neg').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\sqrt{x}",
                    title: "Square root",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\sqrt').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{|}",
                    title: "|",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('|').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\circ",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\circ').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\rightarrow').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\nexist",
                    title: "?",
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    width: 1,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\nexist').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\forall",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\forall').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\lceil",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\lceil').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rceil",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\rceil').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\land",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\land').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\union",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\union').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\supset",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\supset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\subset",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\subset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\leftarrow').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\partial",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\partial").saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\lfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rfloor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\rfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\lor",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\lor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\cap",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\cap").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\supseteq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\supseteq").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\subseteq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\subseteq").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\mapsto",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\mapsto").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\text{d}",
                    title: "Differential",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\text{d}').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\neq').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\simeq",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\simeq').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\equiv",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\equiv').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\in",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\in').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\notin",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\notin').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\int').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{\\text{d}}{\\text{d}_x}",
                    title: "Closed curve integral",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () {
                        g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition('\\frac{\\text{d}}{\\text{d}_{ }}')
                            .keyStroke('Left Left')
                            .saveUndoRedoState();
                    }
                }),
                new LatexTouchKey({
                    label: "f()",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () {
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\lt').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\gt",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\gt').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\sum_{\\ }^{\\ }",
                    title: "Sum",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\sum').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\overline{42}",
                    title: "Overline",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\overline').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\nabla",
                    title: "nabla",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\nabla').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\vec{\\nabla}",
                    title: "nabla",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("\\vec{\\nabla}").saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new LatexTouchKey({
                    label: "\\oint",
                    title: "Closed curve integral",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\oint').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\frac{\\partial }{\\partial _x}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendValueAtCursorPosition('\\partial/\\partial_').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\vec{V}",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () {
                        g_s4mCoreMemory.getMathLineInputToEdit().focus().writeLatexAtCursorPosition("\\text{Vect}\\left(\\right)")
                            .keyStroke('Left')
                            .saveUndoRedoState();
                    }
                }),
                new LatexTouchKey({
                    label: "\\le",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\le').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\ge",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\ge').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\prod_{\\ }^{\\ }",
                    title: "Product",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\prod').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\supset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\subset').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\uparrow",
                    title: "Up",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Up').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    title: "Given statement",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().givenLineToggle().saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\lfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("{\\rfloor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\lor").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\coprod_{\\ }^{\\ }",
                    title: "Coproduct",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\coprod').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "?",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition("\\supseteq").saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    title: "Left",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Left').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\downarrow",
                    title: "Down",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Down').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    title: "Right",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Right').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\oplus').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\ominus",
                    width: 5 / 4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\ominus').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\otimes",
                    width: 5 / 4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\otimes').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\odot",
                    width: 5 / 4,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().appendCmdAtCursorPosition('\\odot').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().undo(); }
                }),
                new ImgTouchKey({
                    label: "redo",
                    title: "Redo",
                    width: 3.5,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().redo(); }
                }),
                new LatexTouchKey({
                    label: "\\uparrow",
                    title: "Up",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Up').saveUndoRedoState(); }
                }),
                new BackspaceKey(),
            ]),
            new LineKeys([
                new ImgTouchKey({
                    label: "print",
                    title: "Print",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().printLine().saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "[G]",
                    title: "Given statement",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().givenLineToggle().saveUndoRedoState(); }
                }),
                new SelectAllKey(),
                new ImgTouchKey({
                    label: "delete",
                    title: "Delete",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.RED,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().delete(); }
                }),
                new ImgTouchKey({
                    label: "duplicate",
                    title: "Duplicate",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().duplicateMathLine(); }
                }),
                new ImgTouchKey({
                    label: "insertOver",
                    title: "Insert line Over",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().addNewMathLineInputOverMe(); }
                }),
                new LatexTouchKey({
                    label: "\\leftarrow",
                    title: "Left",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Left').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\downarrow",
                    title: "Down",
                    width: 2,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Down').saveUndoRedoState(); }
                }),
                new LatexTouchKey({
                    label: "\\rightarrow",
                    title: "Right",
                    width: 1,
                    style: VirtualKeyboardKeyStyle.DARK,
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Right').saveUndoRedoState(); }
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
                    action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().saveWidgetToggle(); }
                }),
                new ImgTouchKey({
                    label: "open",
                    title: "Open",
                    width: 2.5,
                    style: VirtualKeyboardKeyStyle.LIGHT,
                    action: function () {
                        g_s4mCoreMemory.getMathLineInputToEdit().focus().openWidgetToggle();
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
            action: function () { g_s4mCoreMemory.getMathLineInputToEdit().doIfKeyEnter(); }
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
                g_s4mCoreMemory.getMathLineInputToEdit().focus()
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
            action: function () { g_s4mCoreMemory.getMathLineInputToEdit().focus().keyStroke('Ctrl-A').saveUndoRedoState(); }
        }) || this;
    }
    return SelectAllKey;
}(ImgTouchKey));
