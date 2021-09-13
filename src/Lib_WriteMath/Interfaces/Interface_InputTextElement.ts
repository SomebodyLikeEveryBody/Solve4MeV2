interface InputTextElement {
    focus(): void;
    value(): String;
    setValue(pValue: String): void;
    appendValueAtCursorPosition(pValue: String): void;
    appendCmdAtCursorPosition(pValue: String): void;
    isEmpty(): Boolean;
    getCursorCoordinates(): Coordinates2D;
    keyDown(pFunction: Function): void;
    keyUp(pFunction: Function): void;
    blur(): void;
    deleteLeftWord(pWordLen: Number): void;
}