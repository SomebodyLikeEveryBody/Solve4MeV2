//(function main(): void {
const saverNOpenerStateManager = new SaverNOpenerStateManager($('#content'));
var firstMathLineInput = new MathLineInput($('#content'), saverNOpenerStateManager);
firstMathLineInput.appendTo($('#content'));
firstMathLineInput.focus();
//})();

// (new MathLineInput($('#content'), new SaverNOpenerStateManager($('#content')))).appendTo($('#content')).focus();
