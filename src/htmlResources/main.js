const saverNOpenerStateManager = new SaverNOpenerStateManager();
const firstMathLineInput = new MathLineInput($('#input_screen'), saverNOpenerStateManager);

const g_s4mCoreMemory = new S4MCoreMemory(firstMathLineInput);
const g_virtualKeyboard = new VirtualKeyboard($('#virtual_keyboard'));
const g_outputScreen = new OutputScreen($('#output_container'));
const g_inputScreen = new InputScren($('#input_container'), $('#logo_container'), g_outputScreen, $('#do_solve'), g_virtualKeyboard, $('#Solve4Me_app'));
const g_keyboardListener = new KeyBoardListener(g_inputScreen, g_outputScreen);

firstMathLineInput.appendToContainer().focus();