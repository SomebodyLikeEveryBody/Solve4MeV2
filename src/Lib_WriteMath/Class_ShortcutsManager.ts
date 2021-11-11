/*
 * Class ShortcutsManager
 * ----------------------
 * Define and manage the shortcuts the user can use to simplify its entries
 * to a given MathLineInput
 * * */
class ShortcutsManager {

    protected _managedMathLineInput: MathLineInput;    

    public constructor(pMathLineInput: MathLineInput) {
        this._managedMathLineInput = pMathLineInput;

        this.setEvents();
    }

    protected setEvents(): this {
        this.setKeyUpEvents();
        this.setKeyDownEvents();

        return this;
    }

    protected setKeyUpEvents(): this {
        this._managedMathLineInput.keyUp((e: EventObject) => {

            /* 
             * Deactivate the browser behavior when the user press the alt key
             * while focus is on the managed MathLineInput
             * * */
            if (e.which === KeyCodes.ALT_KEY) {
                e.preventDefault();
            }
        });  
        
        return this;
    }

    protected setKeyDownEvents(): this {
        this._managedMathLineInput.keyDown((e: EventObject) => {

            /* 
            * Set <CTRL + KEY> and <ALT + KEY> shortcuts
            * * */
            if (e.ctrlKey) {
                this.bindCtrlShortcuts(e);
            }

            if (e.altKey) {
                e.preventDefault();
                this.bindAltShortcuts(e);
            }
        });

        return this;
    }

    protected bindCtrlShortcuts(pEventObj: EventObject): this {
        switch (pEventObj.which) {

            //ctrl + [ ==> lfloor
            case KeyCodes.OPENHOOK_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.appendCmdAtCursorPosition('\\lfloor');
                break;

            //ctrl + ] ==> rfloor
            case KeyCodes.CLOSEHOOK_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.mathField.cmd('\\rfloor');
                break;

            //ctrl + D ==> duplicate line
            case KeyCodes.D_KEY:
                if ((this._managedMathLineInput.autoCompleterIsVisible() === false)) {
                    pEventObj.preventDefault();
                    this._managedMathLineInput.duplicateMathLine();
                }
                
                break;

            //ctrl + \ ==> \
            case KeyCodes.PIPE_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.appendValueAtCursorPosition(' \\backslash ');
                break;

            //ctrl + F ==> Function()
            case KeyCodes.F_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.writeLatexAtCursorPosition('\\text{Function}\\left(_{}^{}\\right)');
                this._managedMathLineInput.keyStroke('Left');
                this._managedMathLineInput.keyStroke('Left');
                break;
            
            //ctrl + E ==> show / hide outputScreen
            case KeyCodes.E_KEY:
                pEventObj.preventDefault();
                if (g_inputScreen) {
                    g_inputScreen.clickOnShowHideOutputScreenButton();
                } else {
                    console.log('ko');
                }

                break;

            //ctrl + K ==> display or hide virtual keyboard
            case KeyCodes.K_KEY:
                if (g_virtualKeyboard) {
                    pEventObj.preventDefault();
                    g_virtualKeyboard.toggle();
                }

                break;

            //ctrl + O ==> o composition de fonction
            case KeyCodes.N0_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.appendValueAtCursorPosition(' \\circ ');
                break;
        
            //ctrl + P ==> print encapsulation
            case KeyCodes.P_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.printLine();
                break;

            //ctrl + right arrow
            case KeyCodes.RIGHTARROW_KEY:
                this._managedMathLineInput.appendValueAtCursorPosition(' \\mapsto ');
                break;
                
            //ctrl + down arrow
            case KeyCodes.DOWNARROW_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.addNewMathLineInputOverMe();
                break;

            //ctrl + G ==> become given line
            case KeyCodes.G_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.givenLineToggle();
                break;

            //ctrl + 8
            case KeyCodes.N8_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\infinity');
                break;

            //ctrl + L
            case KeyCodes.L_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.letLineToggle();

                break;

            //ctrl + /
            case KeyCodes.SLASH_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.unprocessedLineToggle();
                break;

            //ctrl + N
            case KeyCodes.N_KEY:
                pEventObj.preventDefault();
                break;

            //ctrl + U ==> display units keyboard
            case KeyCodes.U_KEY:
                pEventObj.preventDefault();

                if (g_virtualKeyboard.isVisible()) {
                    g_virtualKeyboard.displayUnitsPanel();
                } else {
                    g_virtualKeyboard.displayUnitsPanel().show();
                }
                
                break;

            //ctrl + up arrow ==> delete if empty and focus down
            case KeyCodes.UPARROW_KEY:
                pEventObj.preventDefault();
                if (this._managedMathLineInput.isEmpty()) {
                    if (this._managedMathLineInput.hasNextMathLineInput()) {
                        this._managedMathLineInput.nextMathLineInput!.focus()
                        this._managedMathLineInput.erase();

                    } else if (this._managedMathLineInput.hasPreviousMathLineInput()) {
                        this._managedMathLineInput.previousMathLineInput!.focus()
                        this._managedMathLineInput.erase();
                    }
                }
                
                break;

            //ctrl + S ==> save
            case KeyCodes.S_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.displaySaveWidget();
                break;

            //ctrl + O ==> open
            case KeyCodes.O_KEY:
                pEventObj.preventDefault();
                this._managedMathLineInput.displayOpenWidget();
                break;
        }

        return this;
    }

    protected bindAltShortcuts(pEventObj: EventObject): this {
        switch (pEventObj.which) {

            //alt + D
            case KeyCodes.D_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\partial');
                break;

            //alt + F
            case KeyCodes.F_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\forall');
                break;

            //alt + G ==> Graph encapsulation
            case KeyCodes.G_KEY:
                pEventObj.preventDefault();
                if (this._managedMathLineInput.isAGraphLine()) {
                    this._managedMathLineInput.stopBeingAGraphLine();
                } else {
                    this._managedMathLineInput.becomeAGraphLine();
                    this._managedMathLineInput.keyStroke('Left');
                }
                break;

            //alt + right arrow
            case KeyCodes.RIGHTARROW_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\rightarrow');
                break;

            //alt + left arrow
            case KeyCodes.LEFTARROW_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\leftarrow');
                break;

            //alt + V ==> vector arrows
            case KeyCodes.V_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\vec');
                break;

            //alt + S ==> sum
            case KeyCodes.S_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\sum');
                break;

            //alt + P ==> product
            case KeyCodes.P_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\prod');
                break;
                
            //alt + ;
            case KeyCodes.SEMICOLON_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\in');
                break;
            
            //alt + R
            case KeyCodes.R_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\R');
                break;

            //alt + Q
            case KeyCodes.Q_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\Q');
                break;

            //alt + Z
            case KeyCodes.Z_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\Z');
                break;

            //alt + N
            case KeyCodes.N_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\N');
                break;
                
            //alt + C
            case KeyCodes.C_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\C');
                break;

            //alt + <
            case KeyCodes.OPENCHEVRON_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\supset');
                break;

            //alt + >
            case KeyCodes.CLOSECHEVRON_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\subseteq');
                break;

            //alt + U
            case KeyCodes.U_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\union');
                break;

            //alt + I
            case KeyCodes.I_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\cap');
                break;

            //alt + ~
            case KeyCodes.TILDE_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\simeq');
                break;
                
            //alt + W
            case KeyCodes.W_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\sqrt');
                break;

            //alt + E
            case KeyCodes.E_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\exists');
                break;

            //alt + 0
            case KeyCodes.N0_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\emptyset');
                break;

            //alt + =
            case KeyCodes.EQUAL_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\neq');
                break;
            
            //alt + A
            case KeyCodes.A_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\land');
                break;

            //alt + O
            case KeyCodes.O_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\lor');
                break;

            //alt + -
            case KeyCodes.MINUS_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\overline');
                break;

            //alt + T
            case KeyCodes.T_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\perp');
                break;

            //alt + |
            case KeyCodes.PIPE_KEY:
                this._managedMathLineInput.writeLatexAtCursorPosition('\\ |\\ ');
                break;
                
            //alt + [
            case KeyCodes.OPENHOOK_KEY:
                this._managedMathLineInput.writeLatexAtCursorPosition('[');
                break;

            //alt + ]
            case KeyCodes.CLOSEHOOK_KEY:
                this._managedMathLineInput.writeLatexAtCursorPosition(']');
                break;

            //alt + 8
            case KeyCodes.N8_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\ast');
                break;

            //alt + 9 ==> degree symbol
            case KeyCodes.N9_KEY:
                this._managedMathLineInput.writeLatexAtCursorPosition('\\text{°}');
                break;

            //alt + 7 ==> differentiate
            case KeyCodes.N7_KEY:
                this._managedMathLineInput.writeLatexAtCursorPosition('\\frac{\\text{d}}{\\text{d}_{ }}');
                this._managedMathLineInput.keyStroke('Left');
                this._managedMathLineInput.keyStroke('Left');
                break;

            //alt + 6
            case KeyCodes.N6_KEY:
                this._managedMathLineInput.appendValueAtCursorPosition('\\partial/\\partial_');
                break;

            //alt + 1
            case KeyCodes.N1_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\neg');
                break;

            //alt + X
            case KeyCodes.X_KEY:
                this._managedMathLineInput.appendCmdAtCursorPosition('\\times');
                break;
        }

        return this;
    }
}