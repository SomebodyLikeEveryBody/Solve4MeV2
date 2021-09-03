const saverNOpenerStateManager = new SaverNOpenerStateManager();
const firstMathLineInput = new MathLineInput($('#input_screen'), saverNOpenerStateManager);

firstMathLineInput.appendTo($('#input_screen'));
firstMathLineInput.focus()

