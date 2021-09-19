var MathObj = /** @class */ (function () {
    function MathObj() {
    }
    return MathObj;
}());
var S4MCoreMemory = /** @class */ (function () {
    function S4MCoreMemory() {
        this._declaringMathLineInputs = [];
        this._errorMathLineInputs = [];
        this._declaredVars = [];
        this._lastMathLineInputFocusedOut = null;
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
    S4MCoreMemory.prototype.getMemoryElementCreatedBy = function (pMathLineInput) {
        for (var _i = 0, _a = this._declaredVars; _i < _a.length; _i++) {
            var s4mMemoryElement_1 = _a[_i];
            if (s4mMemoryElement_1.declaringMathLineInput === pMathLineInput) {
                return s4mMemoryElement_1;
            }
        }
        return (null);
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
        return null;
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
    S4MCoreMemory.prototype.getMathLineInputwhichDeclared = function (pVarName) {
        if (this.hasAVarNamed(pVarName)) {
            for (var _i = 0, _a = this._declaredVars; _i < _a.length; _i++) {
                var s4mMemoryElement_2 = _a[_i];
                if (s4mMemoryElement_2.varName === pVarName) {
                    return s4mMemoryElement_2.declaringMathLineInput;
                }
            }
        }
        return null;
    };
    S4MCoreMemory.prototype.removeVarNamed = function (pVarName) {
        if (this.hasAVarNamed(pVarName)) {
            this.removeVarDeclaredBy(this.getMathLineInputwhichDeclared(pVarName));
        }
        return this;
    };
    S4MCoreMemory.prototype.setVar = function (pMemoryElement, pMathLineInput) {
        this.removeVarDeclaredBy(pMathLineInput);
        this.addVar(pMemoryElement, pMathLineInput);
        return this;
    };
    return S4MCoreMemory;
}());
var InputScren = /** @class */ (function () {
    function InputScren(pJQueryElement, pShowHideOutputScreenButton, pOutputScren) {
        this._jQEl = pJQueryElement;
        this._showHideOutputScreenButton = pShowHideOutputScreenButton;
        this._outputScreen = pOutputScren;
        this.setEvents();
    }
    InputScren.prototype.setEvents = function () {
        var _this = this;
        this._showHideOutputScreenButton.click(function () {
            if (_this._outputScreen.isVisible()) {
                _this._outputScreen.hide(function () {
                    _this._jQEl.animate({
                        'width': '100%',
                    }, 300);
                });
            }
            else {
                _this._jQEl.animate({
                    'width': '50%',
                }, 300, function () {
                    _this._outputScreen.show();
                });
            }
            g_s4mCoreMemory.lastMathLineInputFocusedOut.focus();
        });
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
var g_s4mCoreMemory = new S4MCoreMemory();
var g_outputScreen = new OutputScreen($('#output_container'));
var g_inputScreen = new InputScren($('#input_container'), $('#logo_container'), g_outputScreen);
