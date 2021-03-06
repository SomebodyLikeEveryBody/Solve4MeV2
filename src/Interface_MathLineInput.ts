declare function $(pStr: string): JQueryElement;

interface MathLineInput {
    numberLine: number;
    focus(): MathLineInput;
    value(): string;
    setValue(pValue: string): MathLineInput;
    appendValueAtCursorPosition(pValue: string): MathLineInput;
    appendCmdAtCursorPosition(pValue: string): MathLineInput;
    writeLatexAtCursorPosition(pLatex: string): MathLineInput;
    isEmpty(): boolean;
    appendTo(pElement: JQueryElement): MathLineInput;
    appendToContainer(): MathLineInput;
    insertAfter(pElement: JQueryElement): MathLineInput;
    insertBefore(pElement: JQueryElement): MathLineInput;
    hasPreviousMathLineInput(): boolean;
    hasNextMathLineInput(): boolean;
    setCtrlToDown(): MathLineInput;
    createNewMathLineInputAndAppendBefore(pMathLineInput: MathLineInput): MathLineInput;
    createNewMathLineInputAndAppendAfter(pMathLineInput: MathLineInput): MathLineInput;
    erase(): MathLineInput;
    removeFromDOM(): MathLineInput;
    keyDown(pFunction: Function): MathLineInput;
    keyUp(pFunction: Function): MathLineInput;
    autoCompleterIsVisible(): boolean;
    blur(): MathLineInput;
    keyStroke(pKey: string): MathLineInput;
    deleteLeftWord(pWordLen: number): MathLineInput;
    setStyle(): MathLineInput;
    isAGivenLine(): boolean;
    isASeparatorLine(): boolean;
    isALetLine(): boolean;
    isACommentLine(): boolean;
    isAPrintLine(): boolean;
    isAGraphLine(): boolean;
    stopBeingAGivenLine(): MathLineInput;
    stopBeingALetLine(): MathLineInput;
    stopBeingAPrintLine(): MathLineInput;
    stopBeingAGraphLine(): MathLineInput;
    becomeAGivenLine(): MathLineInput;
    becomeALetLine(): MathLineInput;
    becomeAPrintLine(): MathLineInput;
    becomeAGraphLine(): MathLineInput;
    prependToFieldKeyword(pKeyword: string, pFollowingStr: string): MathLineInput;
    shiftKeywordInField(pKeyword: string): MathLineInput;
    saveUndoRedoState(): MathLineInput;
    moveCursorToLeftEnd(): MathLineInput;
    moveCursorToRightEnd(): MathLineInput;
    showCursor(): MathLineInput;
    addNewMathLineInputOverMe(): MathLineInput;
    duplicateMathLine(): MathLineInput;
    getFirstMathLineInput(): MathLineInput;
    getLastMathLineInput(): MathLineInput;
    processContent(): MathLineInput;
    letLineToggle(): MathLineInput;
    givenLineToggle(): MathLineInput;
    unprocessedLineToggle(): MathLineInput;
    doIfKeyEnter(): MathLineInput;
    doIfKeyBackspace(): MathLineInput;
    displaySaveWidget(): MathLineInput;
    displayOpenWidget(): MathLineInput;
    printLine(): MathLineInput;
    saveWidgetToggle(): MathLineInput;
    openWidgetToggle(): MathLineInput;
    undo(): MathLineInput;
    redo(): MathLineInput;
    delete(): void;
}