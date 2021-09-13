class ShortcutsManager {
    protected _mathLineInput: MathLineInput;
    protected _ctrlIsDown: Boolean;
    protected _altIsDown: Boolean;
    
    public constructor(pMathLineInput: MathLineInput) {
        this._mathLineInput = pMathLineInput;
        this._ctrlIsDown = false;
        this._altIsDown = false;

        this.setEvents();
    }

    public setCtrlToDown(): void {
        this._ctrlIsDown = true;   
    }

    protected checkIfSpecialKeysAreUpAndSetStates(pUppedKey: KeyCodes): void {
        switch (pUppedKey) {
            case KeyCodes.CTRL_KEY:
                this._ctrlIsDown = false;
                break;

            case KeyCodes.ALT_KEY:
                this._altIsDown = false;
                break;
        }
    }

    protected checkIfSpecialKeysAreDownAndSetStates(pDownedKey: KeyCodes): void {
        switch (pDownedKey) {
            case KeyCodes.CTRL_KEY:
                this._ctrlIsDown = true;
                break;

            case KeyCodes.ALT_KEY:
                this._altIsDown = true;
                break;
        }
    }

    protected setEvents(): void {
        this.setKeyUpEvents();
        this.setKeyDownEvents();

        window.addEventListener('blur', () => {
            this.setSpecialKeysToUp();
        });
    }

    protected setKeyUpEvents(): void {
        this._mathLineInput.keyUp((e) => {
            this.checkIfSpecialKeysAreUpAndSetStates(e.which);

            if (e.which === KeyCodes.ALT_KEY) {
                e.preventDefault();
            }
        });    
    }

    protected setKeyDownEvents(): void {
        this._mathLineInput.keyDown((e) => {
            this.checkIfSpecialKeysAreDownAndSetStates(e.which);

            //set CTRL shortcuts
            if (this._ctrlIsDown) {
                this.bindCtrlShortcuts(e);
            }

            if (this._altIsDown) {
                e.preventDefault();
                this.bindAltShortcuts(e);
            }
        });
    }

    public setSpecialKeysToUp(): void {
        this._ctrlIsDown = false;
        this._altIsDown = false;
    }

    protected bindCtrlShortcuts(pEventObj: EventObject): void {
        switch (pEventObj.which) {

            //ctrl + [ ==> lfloor
            case KeyCodes.OPENHOOK_KEY:
                pEventObj.preventDefault();
                this._mathLineInput.appendCmdAtCursorPosition('\\lfloor');
                break;

            //ctrl + ] ==> rfloor
            case KeyCodes.CLOSEHOOK_KEY:
                pEventObj.preventDefault();
                this._mathLineInput.mathField.cmd('\\rfloor');
                break;

            //ctrl + D ==> duplicate line
            case KeyCodes.D_KEY:
                if ((this._mathLineInput.autoCompleterIsVisible() === false)) {
                    pEventObj.preventDefault();
                    this._mathLineInput.duplicateMathLine();
                }
                
                break;

            //ctrl + E ==> varepsilon
            case KeyCodes.E_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\varepsilon');
                break;

            //ctrl + F ==> Function()
            case KeyCodes.F_KEY:
                pEventObj.preventDefault();
                this._mathLineInput.writeLatexAtCursorPosition('\\text{Function}\\left(_{}^{}\\right)');
                this._mathLineInput.keyStroke('Left');
                this._mathLineInput.keyStroke('Left');
                break;
                
            //ctrl + O ==> o composition de fonction
            case KeyCodes.N0_KEY:
                pEventObj.preventDefault();
                this._mathLineInput.appendValueAtCursorPosition(' \\circ ');
                break;
        
            //ctrl + P ==> print encapsulation
            case KeyCodes.P_KEY:
                pEventObj.preventDefault();
                // this._mathLineInput.appendValueAtCursorPosition('\\Print(');
                if (this._mathLineInput.isAPrintLine()) {
                    this._mathLineInput.stopBeingAPrintLine();
                } else {
                    this._mathLineInput.becomeAPrintLine();
                    this._mathLineInput.keyStroke('Left');
                }
                break;

            //ctrl + right arrow
            case KeyCodes.RIGHTARROW_KEY:
                this._mathLineInput.appendValueAtCursorPosition(' \\mapsto ');
                break;
                
            //ctrl + down arrow
            case KeyCodes.DOWNARROW_KEY:
                pEventObj.preventDefault();
                this._mathLineInput.addNewMathLineInputOverMe();
                break;

            //ctrl + G
            case KeyCodes.G_KEY:
                pEventObj.preventDefault();
                if (this._mathLineInput.isAGivenLine()) {
                    this._mathLineInput.stopBeingAGivenLine();
                } else {
                    this._mathLineInput.becomeAGivenLine();
                }
                break;

                //ctrl + *
                case KeyCodes.N8_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\star');
                break;

            //ctrl + L
            case KeyCodes.L_KEY:
                pEventObj.preventDefault();
                if (this._mathLineInput.isALetLine()) {
                    this._mathLineInput.stopBeingALetLine();
                } else {
                    this._mathLineInput.becomeALetLine();
                }

                break;

            //ctrl + N
            case KeyCodes.N_KEY:
                pEventObj.preventDefault();
                // this._mathLineInput.writeLatexAtCursorPosition("\\text{N}")
                console.log('ok');
                break;

            //ctrl + up arrow ==> delete if empty and focus down
            case KeyCodes.UPARROW_KEY:
                pEventObj.preventDefault();
                if (this._mathLineInput.isEmpty()) {
                    if (this._mathLineInput.hasNextMathLineInput()) {
                        this._mathLineInput.nextMathLineInput
                            .focus()
                            .setCtrlToDown();

                        this._mathLineInput.erase();

                    } else if (this._mathLineInput.hasPreviousMathLineInput()) {
                        this._mathLineInput.previousMathLineInput
                            .focus()
                            .setCtrlToDown();

                        this._mathLineInput.erase();
                    }
                }
                
                break;

            //save
            case KeyCodes.S_KEY:
                pEventObj.preventDefault();
                this._mathLineInput.saverNOpenerManager.action = "SAVE";
                this._mathLineInput.saverNOpenerManager.callingMathLineInput = this._mathLineInput;
                this._mathLineInput.saverNOpenerManager.show();
                break;

            //open
            case KeyCodes.O_KEY:
                pEventObj.preventDefault();
                this._mathLineInput.saverNOpenerManager.action = "OPEN";
                this._mathLineInput.saverNOpenerManager.callingMathLineInput = this._mathLineInput;
                this._mathLineInput.saverNOpenerManager.show();
                break;
        }
    }

    protected bindAltShortcuts(pEventObj: EventObject): void {
        console.log(pEventObj.which);
        switch (pEventObj.which) {

            //alt + D
            case KeyCodes.D_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\partial');
                break;

            //alt + F
            case KeyCodes.F_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\forall');
                break;

            //alt + G ==> Graph encapsulation
            case KeyCodes.G_KEY:
                pEventObj.preventDefault();
                if (this._mathLineInput.isAGraphLine()) {
                    this._mathLineInput.stopBeingAGraphLine();
                } else {
                    this._mathLineInput.becomeAGraphLine();
                    this._mathLineInput.keyStroke('Left');
                }
                break;

            //alt + right arrow
            case KeyCodes.RIGHTARROW_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\rightarrow');
                break;

            //alt + left arrow
            case KeyCodes.LEFTARROW_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\leftarrow');
                break;

            //alt + V ==> vector arrows
            case KeyCodes.V_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\vec');
                break;

            //alt + S ==> sum
            case KeyCodes.S_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\sum');
                break;

            //alt + P ==> product
            case KeyCodes.P_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\prod');
                break;
                
            //alt + ;
            case KeyCodes.SEMICOLON_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\in');
                break;
            
            //alt + R
            case KeyCodes.R_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\R');
                break;

            //alt + Q
            case KeyCodes.Q_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\Q');
                break;

            //alt + Z
            case KeyCodes.Z_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\Z');
                break;

            //alt + N
            case KeyCodes.N_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\N');
                break;
                
            //alt + C
            case KeyCodes.C_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\C');
                break;

            //alt + <
            case KeyCodes.OPENCHEVRON_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\supset');
                break;

            //alt + >
            case KeyCodes.CLOSECHEVRON_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\subseteq');
                break;

            //alt + U
            case KeyCodes.U_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\union');
                break;

            //alt + I
            case KeyCodes.I_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\cap');
                break;

            //alt + ~
            case KeyCodes.TILDE_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\simeq');
                break;
                
            //alt + W
            case KeyCodes.W_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\sqrt');
                break;

            //alt + E
            case KeyCodes.E_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\exists');
                break;

            //alt + 0
            case KeyCodes.N0_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\emptyset');
                break;

            //alt + =
            case KeyCodes.EQUAL_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\neq');
                break;
            
            //alt + A
            case KeyCodes.A_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\land');
                break;

            //alt + O
            case KeyCodes.O_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\lor');
                break;

            //alt + -
            case KeyCodes.MINUS_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\overline');
                break;

            //alt + T
            case KeyCodes.T_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\perp');
                break;

            //alt + |
            case KeyCodes.PIPE_KEY:
                this._mathLineInput.writeLatexAtCursorPosition('\\ |\\ ');
                break;
                
            //alt + [
            case KeyCodes.OPENHOOK_KEY:
                this._mathLineInput.writeLatexAtCursorPosition('[');
                break;

            //alt + ]
            case KeyCodes.CLOSEHOOK_KEY:
                this._mathLineInput.writeLatexAtCursorPosition(']');
                break;

            //alt + 9
            case KeyCodes.N9_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\infinity');
                break;

            //alt + 7
            case KeyCodes.N7_KEY:
                this._mathLineInput.writeLatexAtCursorPosition('\\frac{\\text{d}}{\\text{d}_{ }}');
                this._mathLineInput.keyStroke('Left');
                this._mathLineInput.keyStroke('Left');
                this._mathLineInput
                break;

            //alt + 6
            case KeyCodes.N6_KEY:
                this._mathLineInput.appendValueAtCursorPosition('\\partial/\\partial_');
                break;

            //alt + 1
            case KeyCodes.N1_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\neg');
                break;

            //alt + X
            case KeyCodes.X_KEY:
                this._mathLineInput.appendCmdAtCursorPosition('\\times');
                break;
        }
    }
}