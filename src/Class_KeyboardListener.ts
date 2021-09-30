//Do nothing for the moment
class KeyBoardListener {
    protected _inputScreen: InputScren;
    protected _outputScreen: OutputScreen;

    public constructor(pInputScreen: InputScren, pOutputScreen: OutputScreen) {
        this._inputScreen = pInputScreen;
        this._outputScreen = pOutputScreen;
        this.setEvents();
    }

    protected setEvents(): KeyBoardListener {
        return this;
    }
}