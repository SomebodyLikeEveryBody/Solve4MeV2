
/******************************************************************************
*MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM*
*MMMMMMMMMMMWKOxdxOXWMMMMMMMWNXKK0OOO00KKXXNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM*
*MMMMMMMMMNk;..''..'l0NXOxl:;,''''''''''''',;cok0NWMMMMMMMMMMMMMMMMMMMMMMMMMMM*
*MMMMMMMMNo..cxOOkd;..,'.,;codkO00KKK000OOxdlc;'.':d0NMMMMMMMMMMMMMMMMMMMMMMMM*
*MMMMMMMMO..l000000O; .o0XNNNNNNNNNNNNNNNNNNNNNKOo:'.,o0WMMMMMMMMMMMMMMMMMMMMM*
*MMMMMMMMO..lO00000k; ;KNNNNNNNNNNNNNNNNNNNNNNNNNNNKxc'.;kNMMMMMMMMMMMMMMMMMMM*
*MMMMMMMMNo..cxkOkd;..xNNNNNNNNNX0kdolcccclodk0XNNNNNNKd,.,kNMMMMMMMMMMMMMMMMM*
*MMMMMMMMMX:  ..'..'cONNNNNNNKx:'.            .;dKNNNNNNKd,.:0WMMMMMMMMMMMMMMM*
*MMMMMMMMKc.'dkddxOKNNNNNNNKo'   .,:llooolc:'    ,ONNNNNNNKo..dNMMMMMMMMMMMMMM*
*MMMMMMM0;.:0NNNNNNNNNNNNN0;   ,d0XNNNNNNNNNXd.   ;0NNNNNNNNk'.lXMMMMMMMMMMMMM*
*MMMMMM0,.lKNNNNNNNNNNNNN0;   cKNNNNNNNNNNNNNNo.  .kNNNNNNNNNO,.lNMMMMMMMMMMMM*
*MMMMMX:.cKNNNNNNNNNNNNNNo.  .kNNNNNNNNNNNNNNNO:,;oKNNNNNNNNNNO'.dWMMMMMMMMMMM*
*MMMMWd.,ONNNNNNNNNNNNNNXl   .c0XNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNd..x0KXWMMMMMMM*
*MMMMK,.oNNNNNNNNXK00XNNNO,    .,:oxO0XNNNNNNNNNNNNNXKXNNNNNNNO:. ...':xNMMMMM*
*MMMMk..kNNNNNNNk;...'l0NN0l'        .';:coxOKNNNNNKl.;xXNNNXo..;lddoc'.;0MMMM*
*MMMWd.,0NNNNNNK;     .oNNNNKkdl:,..        .'l0NNNNx'  ,dKNk..cOOOOOOx, cNMMM*
*MMMWd ,0NNNNNNXk;....c0NNNNNNNNNXKOkdl:,'.    'xNNN0;  .c0Nx..oOOOOOOk; :XMMM*
*MMMMx.'ONNNNNNNNX0O0KXXXNNNNNNNNNNNNNNNNXOc.   ,0NKc..:kXNN0;.'okOOOxc..xWMMM*
*MMMMO..xNNNNNNNNNNNNx;',oKNNNNNNNNNNNNNNNNXc   'ONXOdOXNNNNN0l...,;,..;kWMMMM*
*MMMMNc cKNNNNNNNNNNXc   ;KNNNNNNNNNNNNNNNN0,   lXNNNNNNNNNNNNNx..;lox0NMMMMMM*
*MMMMMO..xNNNNNNNNNNXl   .dXNNNNNNNNNNNNNXk,   cKNNNNNNNNNNNNNXc.:XMMMMMMMMMMM*
*MMMMMWd.'kNNNNNNNNNNO;   .:x0KXXXXXKOxl:,.  .dKNNNNNNNNNNNNNXo.'OMMMMMMMMMMMM*
*MMMMMMNo.'kNNNNNNNNNN0c.    ..''''...    .,o0NNNNNNNNNNNNNNXo.'kWMMMMMMMMMMMM*
*MMMMMMMNd..dXNNNXXXXNNN0dc,.........';cldOXNNNNNNNNNNNNNNN0c.,OWMMMMMMMMMMMMM*
*MMMMMMMMWO,.;do:,'',:d0NNNXK00OOOO0KXNNNNNNNNNNNNNNNNNNNKd'.cKWMMMMMMMMMMMMMM*
*MMMMMMMMMMXl. .,colc'.'xXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNKx,.,kNMMMMMMMMMMMMMMMM*
*MMMMMMMMMMWd..oO0000Oc..xNNNNNNNNNNNNNNNNNNNNNNNNNNX0o,.,xNMMMMMMMMMMMMMMMMMM*
*MMMMMMMMMMNc ;O000000x' oNNNNNNNNNNNNNNNNNNNNNNNXOo;.'ckNMMMMMMMMMMMMMMMMMMMM*
*MMMMMMMMMMWx..lO0000kc. :k0KXNNNNNNNNNNNNNXK0xo:'.'cxKWMMMMMMMMMMMMMMMMMMMMMM*
*MMMMMMMMMMMNx'.':cc:'.';,''',;ccllllllcc:;,''',cdOXWMMMMMMMMMMMMMMMMMMMMMMMMM*
*MMMMMMMMMMMMMXxl;;;:lkNWNKOxdllc:::::ccllodk0XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM*
*MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM*
******************************************************************************/
/* S4MLGrammar.pegjs *
 ********************/

{
   let currentlyParsing = false;

   function displayMessageOnOutputScreen(pQuestion, pAnswers) {
      // Sometimes the parsing reconization is triggered twice so the messager displays twice for some reason I didn't found out
      // so I use a boolean currentParsing to avoid this behavior, while waiting to find the cause of this bug and solve it 
      if (currentlyParsing === false) {
         currentlyParsing = true;

         g_s4mCoreMemory.unstoreErroredMathLineInput(options.processedMathLineInput);
         g_outputScreen.removeMessagesOf(options.processedMathLineInput);
         g_outputScreen.displayAnswerMessage([pQuestion, ...pAnswers], options.processedMathLineInput);
      }
   }

   function formatVarAtLargeNameFromS4MLToNerdamer(pS4MLVarName) {
      const retVarName = pS4MLVarName.replace(/\{/g, 'OPNCRL').replace(/\}/g, 'CLSCRL').replace(/\\/g, 'BCKSLSH').replace(/ /g, 'SPACE').replace(/BCKSLSHpi/, 'pi');

      return retVarName;
   }

   function formatVarAtLargeNameFromNerdamerToS4ML(pNerdamerVarName) {
      const retVarName = pNerdamerVarName.replace(/OPNCRL/g, '{').replace(/CLSCRL/g, '}').replace(/BCKSLSH/g, '\\').replace(/SPACE/g, ' ');
      return retVarName;
   }
}

start
 = UnprocessedLine
 / PrintLine
 / CommentaryLine
 / SeparatorLine
 / Declaration
 / Constraint
 / Instruction
 / EmptyLine

/***********************************
 * Declaration: Let a = 42
 *              Let x \in R
 * */
Declaration "Declaration"
 = _ "\\text{Let}" __ _ newVarName:(UndefinedFunctionIdentifier / UndefinedVarAtLargeIdentifier) _ affectationOperator:AffectationOperator _ mathObjAffected:Instruction _ {

   const processedMathLineInput = options.processedMathLineInput;

   // if newvarName is a Function Identifier
   if (typeof (newVarName) === typeof ([])) {
      let funcVar = newVarName.functionVar;
      newVarName = newVarName.functionName
   }

   const newMemoryElement = {
      declaringMathLineInput: processedMathLineInput,
      S4MLVarName: newVarName,
      varValue: (affectationOperator === "=" ? mathObjAffected : "elof(" + mathObjAffected + ")"),
      processedVarValue: new MathObj(),
   };

   console.log(newMemoryElement);

   g_s4mCoreMemory.setVar(newMemoryElement);
   processedMathLineInput.signalNoError();

   return "";
}

/***********************************
 * UndefinedVarIdentifier: 
 * --> a VarIdentifier that is not
 *     already declared in memory
 * */
UndefinedVarAtLargeIdentifier
 = varName:VarAtLargeIdentifier {
      const processedMathLineInput = options.processedMathLineInput;

      // check if var is not already defined
      if (g_s4mCoreMemory.hasAVarNamed(varName)
         && g_s4mCoreMemory.getMathLineInputWhichDeclared(varName) !== processedMathLineInput) {

         throw {
            name: "DeclarationError",
            message: "Variable [" + varName + "] is already defined."
         };
      }

      return (varName); 
 }

/***********************************
 * DefinedVarIdentifier: 
 * --> a VarIdentifier that is
 *     already declared in memery
 * */
DefinedVarAtLargeIdentifier
 = varName:VarAtLargeIdentifier {
      const processedMathLineInput = options.processedMathLineInput;

      // check if var is already defined
      // if (!(
      //       g_s4mCoreMemory.hasAVarNamed(varName)
      //       && g_s4mCoreMemory.getMathLineInputWhichDeclared(varName) !== processedMathLineInput)) {

      //       throw {
      //          name: "VarError",
      //          message: "Variable [" + varName + "] is undefined."
      //       };
      // }

      return (varName); 
 }

/***********************************
 * AffectationOperator:
 * [.] Operator used to affect a 
 *     MathObj to a variable
 * [.] = value --> affect value
 * [.] \in set --> affect elof(set)
 * */
AffectationOperator
 = EqualOperator
 / InOperator

EqualOperator
 = "="

InOperator
 = "\\in"

Equation
 = EquationBracked
 / EquationBasic

EquationBasic
 = expr1:Expression operator:EqualOperator expr2:Expression {
    return expr1 + operator + expr2;
 }

EquationBracked
 = _ "\\left(" equationBasic:EquationBasic "\\right)" _ {
    return equationBasic;
 }

/***********************************
 * Constraint: Given a > 0
 * [.] Defines and set a constraint on a
 *     previously declared variable(s)
 * --> <UNDER CONSTRUCTION>
 * */
Constraint
 = _ "\\text{Given}" __ _ statement:Statement {
 }

/***********************************
 * Statement: a > 0, a - b <= 10,
 *            negA=True, etc
 * [.] Defines a statement that is a
 *     constraint on a variable(s) 
 * --> <UNDER CONSTRUCTION>
 * */
Statement
 = value:.+ { 
      return (value.join('')); 
 }

/***********************************
 * Instruction: a+b, integral, derivation, etc
 * [.] An expression to process
 * */
Instruction
 = Expression

/***********************************
 * Instanciation: Function(), Set(), etc
 * [.] An expression resulting into
 *     an instanciated MathObj
 * */
Instanciation
 = FunctionInstanciation
 / SetInstanciation

/***********************************
 * Expression: a+b, integral, derivation, etc
 * [.] An expression to process
 * [.] firstTerm ("+"/"-" term)*
 * */
Expression
 = _ head:FirstPriority3Term _ tail:(_ Priority3Operator _ Priority3Term _)* {
      return tail.reduce((result, element) => {
         return (result + element[1] + element[3]);
      }, head);
 }

Priority3Operator
 = Operator_plus
 / Operator_minus

/***********************************
 * FirstTerm:
 * [.] a term which can be preceded
 *     by a "+" or "-" or another
 *     unary operator to have its
 *     opposite value
 * [.] essential to have expressions
 *     like -a*b, -(a+b), b^(-a), etc
 * */
FirstPriority3Term
 = _ sign:UnaryOperator? _ term:Priority3Term {
      return (sign !== null ? sign : '') + term;
 }

/***********************************
 * Term:
 * [.] Factor (("*" / "/" / ...) Factor)*
 * */
Priority3Term
 = head:Priority2Term tail:(_ Priority2Operator _ Priority2Term)* {
      return tail.reduce((result, element) => {
         return result + element[1] + element[3];
      }, head);
 }

Priority2Term
 = head:Factor tail:(_ Priority1Operator _ Factor)* {
      return tail.reduce((result, element) => {
         return result + element[1] + element[3];
      }, head);
 }

/***********************************
 * BinaryOperator:
 * [.] Operator that takes 2 arguments
 *     (+, -, *, /, Union, Inter, etc)
 * */
Priority2Operator
 = Operator_multiply
 / Operator_cross
 / Operator_divide
 / Operator_modulo

Priority1Operator
= Operator_pow

/***********************************
 * UnaryOperation: -3, -A, +Infinity, etc
 * [.] UnaryOperator Expression
 * */
UnaryOperation
 = _ operator:UnaryOperator _ expression:Expression {
      return (operator + "(" + expression + ")")
 }

/***********************************
 * UnaryOperator:
 * [.] Operator that takes 1 argument
 *     (+, -, etc)
 * */
UnaryOperator
 = Operator_opposite
 / Operator_identity

/***********************************
 * Factor:
 * [.] Primary element of Expressions
 * */
Factor
 = ContiguousFactors
 / Factor_bracketed
 / Fraction
 / Factor_braced
 / S4MLObject
 / Instanciation
 / Number
 
/***********************************
 * S4MLObject: x, Vect{v}, Instanciation(), etc
 * [.] Variable or Instanciation or
 *     anything that is a built 
 *     S4ML object
 * */
S4MLObject
 = Instanciation
 / DeposedKeyword
 / VarAtLargeIdentifier
 

 DeposedKeyword
  = "\\sqrt{" expression:Expression "}" {
      return "sqrt(" + expression + ")";   
  }
  / "\\log_" base:(VarAtLargeIdentifier / Number) "\\left(" expression:Expression "\\right)" {
      return "log(" + expression+ ")/log(" + base + ")";
  }
  / "\\log_{" base:(VarAtLargeIdentifier / Number) "}\\left(" expression:Expression "\\right)" {
      return "log(" + expression+ ")/log(" + base + ")";
  }
  / "\\operatorname{atan}_2\\left(" _ xValue:Expression _ "," _ yValue:Expression _ "\\right)" {
      return "atan2(" + xValue + "," + yValue +")" 
  }
  / "\\operatorname{solve}\\left(" _ varName: VarAtLargeIdentifier _ "," _ equation:Equation _ "\\right)" {
      nerdamer.set('SOLUTIONS_AS_OBJECT', true);
      const answersStr = [];
      const answersArray = [];

      const answersObjArray = nerdamer('solve(' + equation + ', ' + varName + ')').symbol.elements;

      for (const answer of answersObjArray) {
         answersStr.push(nerdamer(answer).toString());
      }

      answersArray.push('\\left[' + answersStr.map((exp) => nerdamer.convertToLaTeX(exp)).join('\\ \\ ,\\ \\ ') + '\\right]');
      answersArray.push('\\left[' + answersStr.map((exp) => nerdamer.convertToLaTeX(nerdamer(exp).evaluate().toString())).join('\\ \\ ,\\ \\ ') + '\\right]');
      answersArray.push('\\left[' + answersStr.map((exp) => nerdamer.convertToLaTeX(nerdamer(exp).evaluate().text('decimals', 50), {decimals: true})).join('\\ \\ ,\\ \\ ') + '\\right]');

      displayMessageOnOutputScreen('\\text{solve}\\left(' + varName + '\\ \\ |\\\ \\ \\left(' + nerdamer.convertToLaTeX(equation) + '\\right)\\ \\right)', answersArray);

      return '[Unprocess]';
  }
  / "\\operatorname{solve}\\left(\\left[" firstEquation:Equation _ followingEquations:("," Equation)* "\\right]\\right)" {

      nerdamer.set('SOLUTIONS_AS_OBJECT', true);

      let equationsArray = [firstEquation].concat(followingEquations.map((el) => el[1]));
      console.log(equationsArray.join(','));
   
      const answerObj = nerdamer('solveEquations([ ' + equationsArray.join(',') + '])');
      console.log(answerObj.symbol);
      // const answersArray = [];
      // const varValuesArray = [];

      //faut faire un objet genre Answers['x']=[v1, v2, v3], Answers['y'] = [v4, v5, v6], etc
      //ou v1 v2 v3 c'est genre nerdamer(), evaluate et text()
      //comme ca apres on les push dans l'array de reponse et on l'affiche
      //test avec \operatorname{solve}\left(\left[x^2+y^2=42,\ \frac{x^2}{y}=7\right]\right)
      //je vais dodo bn

      // let tempObj = {}
      // for (const varName in answerObj.symbol) {
      //    tempObj[varName] = [answerObj.symbol[varName], nerdamer(answerObj.symbol[varName]).evaluate(), nerdamer(answerObj.symbol[varName]).evaluate().text('decimals', 50)];
      //    varValuesArray.push(tempObj);
      //    tempObj = {};
      // }

      // const variablesArray = varValuesArray.map(obj => Object.keys(obj));
      // const nerdamerAnswer = '\\left[';
      // const evaluatedAnswer = '\\left[';
      // const textAnswer = '\\left[';

      // for (const varName of variablesArray) {
      //    nerdamerAnswer += 'nerdamerAnswer'; 
      //    evaluatedAnswer = 
      // }

      // answersArray.push('\\left[' + ().join(',') + '\\right]');
      // answersArray.push('\\left[' + varValuesArray.map((obj) => nerdamer.convertToLaTeX(el)).join('\\ \\ ,\\ \\ ') + '\\right]');
      // answersArray.push('\\left[' + varValuesArray.map((el) => nerdamer.convertToLaTeX(el.evaluate().toString())).join('\\ \\ ,\\ \\ ') + '\\right]');
      // answersArray.push('\\left[' + varValuesArray.map((el) => nerdamer.convertToLaTeX(el.evaluate().toString())).join('\\ \\ ,\\ \\ ') + '\\right]');

      // displayMessageOnOutputScreen('\\text{solve}\\left(\\left(' + equationsArray.map((el) => nerdamer.convertToLaTeX(el)).join('\\right)\\ \\ ,\\ \\ \\left(') + '\\right)\\right)', answersArray);

      return '[Unprocess]';

      // return "solveEquations([" + equationsArray.join(',') + "])"
  }
  / "\\operatorname{polarForm}\\left(" expression:Expression "\\right)" {
      return "polarform(" + expression + ")";
  }
  / "\\operatorname{cartForm}\\left(" expression:Expression "\\right)" {
      return "rectform(" + expression + ")";
  }
  / "\\operatorname{expand}\\left(" expression:Expression "\\right)" {
      return "expand(" + expression + ")";
  }
  / "\\operatorname{expand}" "\\ "? expression:Expression {
      return "expand(" + expression + ")";
  }
  / "\\Re\\left(" expression:Expression "\\right)" {
      return "realpart(" + expression + ")";
  }
  / "\\Im\\left(" expression:Expression "\\right)" {
      return "imagpart(" + expression + ")";
  }
  / "\\min\\left(" firstExpression:Expression followingExpressionsCapture:("," Expression)* "\\right)" {
     const followingExpressions = followingExpressionsCapture.map(array => array[1]);
     const args = [firstExpression].concat(followingExpressions);

      return "min(" + args.join(',') + ")";
  }
  / "\\max\\left(" firstExpression:Expression followingExpressionsCapture:("," Expression)* "\\right)" {
     const followingExpressions = followingExpressionsCapture.map(array => array[1]);
     const args = [firstExpression].concat(followingExpressions);

      return "max(" + args.join(',') + ")";
  }
  / "\\left|" expression:Expression "\\right|" {
      return "abs(" + expression + ")";
  }
  / "\\lfloor" " "? expression:Expression "\\rfloor" {
      return "floor(" + expression + ")";
  }
  / "\\lceil" " "? expression:Expression "\\rceil" {
      return "ceil(" + expression + ")";
  }
  / "\\operatorname{simplify}\\left(" expression:Expression "\\right)" {
      return "simplify(" + expression + ")";
  }
  / "\\text{Si}\\left(" expression:Expression "\\right)" {
      return ('Si(' + expression + ')');
  }
  / "\\text{Ci}\\left(" expression:Expression "\\right)" {
      return ('Ci(' + expression + ')');
  }
  / "\\text{Ei}\\left(" expression:Expression "\\right)" {
      return ('Ei(' + expression + ')');
  }
  / "\\text{rect}\\left(" expression:Expression "\\right)" {
      return ('rect(' + expression + ')');
  }
  / "\\Pi\\left(" expression:Expression "\\right)" {
      return ('rect(' + expression + ')');
  }
  / "\\text{step}\\left(" expression:Expression "\\right)" {
      return ('step(' + expression + ')');
  }
  / "\\text{erf}\\left(" expression:Expression "\\right)" {
      return ('erf(' + expression + ')');
  }
  / "\\operatorname{factor}\\left(" number:Float "\\right)" {
      return "pfactor(" + number + ")";
  }
  / value:(Integer / VarAtLargeIdentifier) "!" {
      return "fact(" + value + ")";
  }
  / "\\operatorname{sign}\\left(" expression:Expression"\\right)" {
      return "sign(" + expression + ")";
  }
  / "\\operatorname{round}\\left(" expression:Expression"\\right)" {
      return "round(" + expression + ")";
  }
  / "\\operatorname{fib}\\left(" number:Integer "\\right)" {
      return "fib(" + number + ")";
  }
  / "\\operatorname{CF}\\left(" expression:Expression "," _ "raw" _ "\\right)" {

      const answer = nerdamer('continued_fraction(' + expression + ')').toString();
      let retStr = '';

      if (answer.match(/\[[-]?[0-9]+,[0-9]+,\[[0-9]*(,[0-9]+)*\]\]/g)) {
         retStr = answer;
      } else {
         retStr = '\\text{CF}\\left(' + nerdamer.convertToLaTeX(nerdamer('simplify(' + expression + ')').toString()) + ',\\ raw\\right)';
      }

      displayMessageOnOutputScreen('\\text{CF}\\left(' + expression + ',\\ raw\\right)', [retStr]);
      return '[Unprocess]';
  }
  / "\\operatorname{CF}\\left(" expression:Expression "\\right)" {
      // take the result of nerdamer instruction, like [1, 3, [4, 5, 6, 7]], and display 3+1/(4+1/(5+1/(6+1/(7))))
      const question = 'continued_fraction(' + expression + ')';
      const resultStr = nerdamer(question).toString();
      let retStr = '';

      // if the nerdamer answer is a processed answer, that is if it has a pattern like "[1, 2, [3, 4, 5]]" and not just "continued_fraction(expression)"
      if (resultStr.match(/\[[-]?[0-9]+,[0-9]+,\[[0-9]*(,[0-9]+)*\]\]/g)) {
         const resultArray = resultStr.substring(1, resultStr.length - 1).split(',');
         const signInt = parseInt(resultArray[0]);
         const firstInt = signInt * parseInt(resultArray[1]);

         retStr = '' + firstInt;

         //if the expression passed as argument is not just an integer
         if (resultArray[2] !== "[]") {
            const followingInts = resultStr.substring(1, resultStr.length - 2).split('[')[1].split(',').map(intStr => parseInt(intStr))

            for (let followingInt of followingInts) {
               retStr += '+1/(' + (signInt * followingInt);
            }

            for (let followingInt of followingInts) {
               retStr += ')';
            }

            retStr = nerdamer.convertToLaTeX(retStr);
            const numericalValue = nerdamer(expression);
            displayMessageOnOutputScreen('\\text{CF}(' + expression + ')', [retStr, nerdamer.convertToLaTeX(numericalValue.toString()), numericalValue.text('decimals')]);
         } else {
            displayMessageOnOutputScreen('\\text{CF}(' + expression + ')', [retStr]);
         }         
      } else {
         retStr = '\\text{CF}\\left(' + nerdamer.convertToLaTeX(nerdamer('simplify(' + expression + ')').toString()) + '\\right)';
         displayMessageOnOutputScreen('\\text{CF}\\left(' + expression + '\\right)', [retStr]);
      }
      
      return "[Unprocess]";
  }
  / "\\operatorname{PF}\\left(" expression:Expression "\\right)" {
     return "partfrac(" + expression +")";
  }
  / "\\operatorname{PF}\\left(" expression:Expression "," varName:VarAtLargeIdentifier "\\right)" {
     return "partfrac(" + expression +", " + varName +")";
  }
  / "\\operatorname{line}\\left(\\left(" x1:Expression "," y1:Expression "\\right),\\left(" x2:Expression "," y2:Expression "\\right)\\right)" {
      return "line([" + x1 + "," + y1 + "], [" + x2 + "," + y2 + "])";
  }
  / "\\sum_{" counter:VarAtLargeIdentifier "=" startValue:Expression "}^" endValue:(VarAtLargeIdentifier / Number) "\\left(" expression:Expression "\\right)" {
     return "sum(" + expression + ", " + counter + ", " + startValue + ", " + endValue + ")";
  }
  / "\\sum_{" counter:VarAtLargeIdentifier "=" startValue:Expression "}^{" endValue:Expression "}\\left(" expression:Expression "\\right)" {
     return "sum(" + expression + ", " + counter + ", " + startValue + ", " + endValue + ")";
  }
  / "\\prod_{" counter:VarAtLargeIdentifier "=" startValue:Expression "}^" endValue:(VarAtLargeIdentifier / Number) "\\left(" expression:Expression "\\right)" {
     return "product(" + expression + ", " + counter + ", " + startValue + ", " + endValue + ")";
  }
  / "\\prod_{" counter:VarAtLargeIdentifier "=" startValue:Expression "}^{" endValue:Expression "}\\left(" expression:Expression "\\right)" {
     return "product(" + expression + ", " + counter + ", " + startValue + ", " + endValue + ")";
  }
  / "\\lim_{" varName:VarAtLargeIdentifier "\\rightarrow" limit:Expression "}\\left(" expression:Expression "\\right)" {
     return "limit(" + expression + ", " + varName + ", " + limit +  ")";
  }
  / "\\lim_{" varName:VarAtLargeIdentifier "\\rightarrow" sign:("+" / "-")? "\\infty}\\left(" expression:Expression "\\right)" {
     if (sign === null) {
        sign = '';
     }
     
     return "limit(" + expression + ", " + varName + ", " + sign + "Infinity)";
  }
  / "\\frac{\\text{d}_" expression:VarAtLargeIdentifier "^" level1:Integer "}{\\text{d}_" varName:VarAtLargeIdentifier "^" level2:Integer "}" {
     if (!g_s4mCoreMemory.hasAVarNamed(expression)) {
        throw {name: "Var Error", message: "Variable \"" + expression + "\" is undefined." }
     }

     if (parseInt(level1) === parseInt(level2)) {
        return "diff(" + expression + ", " + varName + ", " + level1 +")"
     } else {
        throw {name: "Syntax Error", message: "You need to put the same degree of derivation up and down. The syntax you used is not managed yet..." }
     }
  }
  / "\\frac{\\text{d}}{\\text{d}_" varName:VarAtLargeIdentifier "}\\left(" expression:Expression "\\right)" {
     return "diff(" + expression + ", " + varName + ", 1)";
  }
  / "\\frac{\\text{d}_" expression:Expression "}{\\text{d}_" varName:VarAtLargeIdentifier "}" {
     return "diff(" + expression + ", " + varName + ", 1)";
  }
  / "\\left(\\frac{\\text{d}}{\\text{d}_" varName:VarAtLargeIdentifier "}\\right)^" level:Integer "\\left(" expression:Expression "\\right)" {
     return "diff(" + expression + ", " + varName + ", " + level + ")";
  }
  / "\\int_{ }^{ }\\left(" expression:Expression "\\right)\\text{d}_" "{"? varName:VarAtLargeIdentifier "}"? {
     return "integrate(" + expression + ", " + varName + ")";
  }
  / "\\int_" down:(VarAtLargeIdentifier / Number) "^" up:(VarAtLargeIdentifier / Number) "\\left(" expression:Expression "\\right)\\text{d}_" "{"? varName:VarAtLargeIdentifier "}"? {
     return "defint(" + expression + ", " + down+ ", " + up + ", " + varName +")";
  }
  / "\\int_{" down:Expression "}^" up:(VarAtLargeIdentifier / Number) "\\left(" expression:Expression "\\right)\\text{d}_" "{"? varName:VarAtLargeIdentifier "}"? {
     return "defint(" + expression + ", " + down+ ", " + up + ", " + varName +")";
  }
  / "\\int_" down:(VarAtLargeIdentifier / Number) "^{" up:Expression "}\\left(" expression:Expression "\\right)\\text{d}_" "{"? varName:VarAtLargeIdentifier "}"? {
     return "defint(" + expression + ", " + down+ ", " + up + ", " + varName +")";
  }
  / "\\int_{" down:Expression "}^{" up:Expression "}\\left(" expression:Expression "\\right)\\text{d}_" "{"? varName:VarAtLargeIdentifier "}"? {
     return "defint(" + expression + ", " + down+ ", " + up + ", " + varName +")";
  }
  / "\\operatorname{lcm}\\left(" v1:Expression "," v2:Expression "\\right)" {
     return "lcm(" + v1 + "," + v2 + ")";
  }
  / "\\gcd\\left(" v1:Expression "," v2:Expression "\\right)" {
     return "gcd(" + v1 + "," + v2 + ")";
  }
  / "\\deg\\left(" expression:Expression "\\right)" {
     return "deg(" + expression +")";
  }
  / deposedFuncName:DeposedFuncName "\\left(" expression:Expression "\\right)" {
      return deposedFuncName + "(" + expression + ")";
  }

DeposedFuncName
 = "\\operatorname{acosH}" { return "acosh" }
 / "\\operatorname{asinH}" { return "asinh" }
 / "\\operatorname{atanH}" { return "atanh" }
 / "\\operatorname{asecH}" { return "asech" }
 / "\\operatorname{acosecH}" { return "acsch" }
 / "\\operatorname{acotanH}" { return "acoth" }
 / "\\operatorname{cosH}" { return "cosh" }
 / "\\operatorname{sinH}" { return "sinh" }
 / "\\operatorname{tanH}" { return "tanh" }
 / "\\operatorname{secH}" { return "sech" }
 / "\\operatorname{cosecH}" { return "csch" }
 / "\\operatorname{cotanH}" { return "coth" }
 / "\\operatorname{acotan}" { return "acot" }
 / "\\operatorname{cotan}" { return "cot" }
 / "\\operatorname{atan}" { return "atan" }
 / "\\operatorname{factor}" { return "factor" }
 / "\\operatorname{asec}" { return "asec" }
 / "\\operatorname{Shi}" { return "Shi" }
 / "\\operatorname{Chi}" { return "Chi" }
 / "\\tan" { return "tan" }
 / "\\operatorname{asin}" { return "asin" }
 / "\\sin" { return "sin" }
 / "\\operatorname{acosec}" { return "acsc" }
 / "\\operatorname{cosec}" { return "csc" }
 / "\\operatorname{roots}" { return "roots" }
 / "\\sec" { return "sec" }
 / "\\operatorname{acos}" { return "acos" }
 / "\\cos" { return "cos" }
 / "\\cos" { return "cos" }
 / "\\ln" { return "log" }
 / "\\log_{10}" { return "log10" }
 / "\\log" { return "log" }
 / "\\arg" { return "arg" }
 
/***********************************
 * ContiguousFactors: ab, cdef, a(b+c), etc
 * [.] The purpose of this rule is to permit
 *     syntaxs with following factors to
 *     write products, instead of write
 *     "*" between each terms which is
 *     onerous, like
 *     ab -> a*b
 *     a(b+c) -> a*(b+c)
 *     (a+b)c -> (a+b)*c
 *     ax^2 +bx + c -> a*x^2 +b*x + c
 *    
 * */
ContiguousFactors
 = _ firstObject:FirstContiguousFactor _ list:(_ Factor _)+ {
      let varsArray = list.reduce((result, currentEl) => {
         result.push(currentEl[1]);
         return result;
      }, [firstObject]);

      return (varsArray.join('*'));
 }

/***********************************
 * FirstContiguousFactor:
 * [.] First factor of an expression
 *     like "ab" or "(-a + b)" or "a(b+c)"
 * */
FirstContiguousFactor
= S4MLObject
/ Factor_bracketed
/ Fraction
/ Number

/***********************************
 * Factor_braced: {a+b}
 * [.] {expression}
 * */
Factor_braced
 = "{" _ expr:Expression _ "}" {
    return ("(" + expr + ")");
 }

/***********************************
 * Factor_bracketed: (a+b)
 * [.] (expression)
 * */
Factor_bracketed
 = "\\left(" _ expr:Expression _ "\\right)" {
      return ("(" + expr + ")");
 }

/***********************************
 * Fraction: 2+a/3-a -> \frac{2+a}{3-a} -> ((2+a)/(3-a))
 * [.] \frac{numerator}{denominator}
 * */
Fraction
= "\\frac{" _ numerator:Expression _ "}{" _ denominator:Expression _ "}" {
      return ("((" + numerator + ")/(" + denominator + "))");
}

/***********************************
 * Number: 43 or 5.65 etc
 * */
Number
= Float
/ Integer

/***********************************
 * Integer: 42
 * */
Integer
= _ digits:[0-9]+ {
   return digits.join('');
}

/***********************************
 * Float: 42.84
 * */
Float
 = integer:Integer "." decimals:Integer {
   return integer + "." + decimals;
 }

/***********************************
 * FunctionInstanciation: Function(x->x R->R)
 * [.] Syntax to instanciate an S4ML
 *     Function Object
 * */
FunctionInstanciation
 = _ "\\text{Function}\\left(_{" _ startSet:Set _ "\\rightarrow" _ endSet:Set _ "}^" functionVarDef:FunctionVarDefinition "\\right)" {
    let funcObj = {
       startSet: startSet,
       endSet: endSet,
       S4MLVarName: functionVarDef.varName,
       instruction: functionVarDef.instruction
    };

   // nerdamer.setFunction(, functionVarDef.varName, functionVarDef.instruction)

   return (funcObj);
 }

/***********************************
 * FunctionVarDefinition: f(t)
 * [.] Syntax to declare a variable
 *     and affect a function to it,
 *     but to simplify readability,
 *     instead of writing
 *     Let f = Function(x->x R->R)
 *     which is still possible,
 *     we can write
 *     Let f(x) = Function(x->x R->R)
 * */
FunctionVarDefinition
 = "{" varName:(VarIdentifier / VectorIdentifier) _ "\\mapsto" _ instruction:(Instruction / "?") _ "}" {
       return ({
         varName: varName,
         instruction: (instruction !== "?" ? instruction : null)
      });
 }

/***********************************
 * Set: {1, 2, 3} or [-1, 1]R or E
 * */
Set
 = SetInstanciation
 / MathBBSet
 / VarIdentifier

/***********************************
 * SetInstanciation:
 * [.] Syntax to instanciate an S4ML
 *     Set Object
 * */
SetInstanciation
 = SetInstanciationByBraces
 / SetInstanciationByVARNOTHING
 / SetInstanciationByHooks

/***********************************
 * SetInstanciationByOperations: 
 * --> <UNDER CONSTRUCTION>
 * */
SetInstanciationByOperations
 = Set Operator_cross Set

/***********************************
 * SetInstanciationByBraces: {1, 2, 3}
 * */
SetInstanciationByBraces
 = _ "\\left\\{" _ firstEl:S4MLObject _ followingEls:(_ "," _ S4MLObject)* _ "\\right\\}" {
   let setContent = followingEls.reduce((total, currentEl) => {
      return (total + "," + currentEl[3]);
   }, firstEl);

   return "<SET[Elements["+ setContent + "]]>";
}
/ _ "\\left\\{\\right\\}"_  {
   return "<SET[Elements[]]>";
}

/***********************************
 * SetInstanciationByVARNOTHING: \\varnothing --> {}
 * */
SetInstanciationByVARNOTHING
 = "\\varnothing" {
      return "<SET[Elements[]]>";
 }

/***********************************
 * SetInstanciationByHooks: [1, 42]N or [-pi/2, pi/2]R etc
 * */
SetInstanciationByHooks
 = firstHook:("[" / "]") _ firstBoundary:(Instruction) _ "," _ secondBoundary:(Instruction) _ secondHook:("]" / "[") "_{" _ includedIn:(MathBBSet / VarIdentifier) "}" {
      return ("<SET[boundary1[" + firstBoundary + "][" + (firstHook === "[" ? "included" : "excluded") + "]]boundary2[" + secondBoundary + "][" + (secondHook === "]" ? "included" : "excluded") + "]subSetOf[" + includedIn + "]>");
 }

/***********************************
 * SetOperator: U, Inter, \, X, ^ etc
 * */
SetOperator
 = Operator_union
 / Operator_intersection
 / Operator_backslash
 / Operator_cross

/***********************************
 * VarAtLargeIdentifier: A or Vect{A} or text{Pa}
 * [.] Syntax to name an S4ML variable
 * */
VarAtLargeIdentifier
 = varName:(VectorIdentifier 
 / SpecialChar
 / Constant
 / VarIdentifier) {
    return (formatVarAtLargeNameFromS4MLToNerdamer(varName));
 }

/***********************************
 * FunctionIdentifier: f(x)
 * [.] varName "(" varName ")"
 * [.] rule to recognize id(var) syntax
 *     like f(x) or g(t)
 * */
FunctionIdentifier
 = funcName:VarAtLargeIdentifier funcVar:FunctionMarker {
      return ({functionName: funcName, functionVar: funcVar})
 }

 UndefinedFunctionIdentifier
 = functionIdentifier:FunctionIdentifier {
      let varName = functionIdentifier.functionName

      // check if var is not already defined
      if (g_s4mCoreMemory.hasAVarNamed(varName)
         && g_s4mCoreMemory.getMathLineInputWhichDeclared(varName) !== processedMathLineInput) {

         throw {
            name: "DeclarationError",
            message: "Variable [" + varName + "] is already defined."
         };
      }

      return (varName); 
 }

/***********************************
 * FunctionMarker: (x) or (t_x) etc
 * [.] "(" varName ")" 
 * [.] rule to recognize the syntax
 *     following a varName that is
 *     specific to functions
 *     (t) in f(t) for example
 * */
FunctionMarker
 = "\\left(" varName:(VarAtLargeIdentifier) "\\right)" {
      return (varName)
 }


/***********************************
 * VectorIdentifier: vec{u} -> Vector{u}
 * [.] vec{varName}
 * [.] rule to recognize the syntax
 *     to define a variable with an
 *     an arrow over its name
 * */
VectorIdentifier
 = "\\vec{" varIdentifier:VarIdentifier "}" {
      return ('\\vec{' + varIdentifier + '}');
 }

/***********************************
 * VarIdentifier: x or x_1 or x_{pouet} or v_M_x_0 etc
 * [.] Syntax of a variable name
 * [.] mainId followed or not by an index
 * [.] a variable name can only be ONE letter, with
 *     as many indexes as needed to explicit the variable
 *     so x_{initial} is okay, but {initial}_x is not
 * */
VarIdentifier
 = mainId:(Letter / MathBBLetter / SpecialLetter) indexes:IdentifierIndex? {
      let indexesStr = '';
      if (indexes !== null) {
         indexes.reverse();

         for (let index of indexes) {
            if (indexesStr === '') {
               indexesStr = index;
            } else {
               indexesStr = index + "_{" + indexesStr + "}";   
            }
            
         }

         indexesStr = "_{" + indexesStr + "}";
      }

      return mainId + indexesStr;
 }

/***********************************
 * IdentifierIndex: _1 or _x or _y_0_f
 * [.] Syntax of the index of a variable
 * [.] can be simple, that is on one
 *     level with one char, (like in var x_1)
 *     or complex, that is on multiple
 *     levels and/or with multiple chars
 *     (like in var x_1_f_{pouet})
 * */
IdentifierIndex
 = SimpleIdentifierIndex
 / ComplexIdentifierIndex

/***********************************
 * SimpleIdentifierIndex: _1 or _x
 * [.] variable index on one level and
 *     with one char
 * */
SimpleIdentifierIndex
 = "_" char:Char { 
      return ([char]);
      // return ("_{" + char + "}");
 }

/***********************************
 * ComplexIdentifierIndex: _{pouet} or _x_1_f
 * [.] variable index on multiple levels and/or
 *     with multiple chars
 * */
ComplexIdentifierIndex
 = "_" "{" indexIdentifier:(Integer / Char / Text / SpecialLetter) nextIndex:IdentifierIndex? "}" {
      let retArray = [indexIdentifier];
      if (nextIndex !== null) {
         retArray = retArray.concat(nextIndex);
      }

      return retArray;
 }

/***********************************
 * Letter: A b etc
 * */
Letter
 = [A-Za-z]

/***********************************
 * Char: A b 0 etc
 * */
Char
 = [A-Za-z0-9]

/***********************************
 * Text: \text{pouet}
 * [.] \text{str}
 * [.] rule to recognize Latex Text syntax
 * */
Text
 = "\\text{" str:[A-Za-z0-9°]+ "}" {
      return ("\\text{" + str.join('') +"}");
 }

/***********************************
 * SpecialLetter: alpha, Gamma, etc
 * [.] All special letters used in S4ML
 * */
SpecialLetter
 = str:("\\alpha"
 / "\\beta"
 / "\\Gamma"
 / "\\gamma"
 / "\\Delta"
 / "\\delta"
 / "\\epsilon"
 / "\\varepsilon"
 / "\\zeta"
 / "\\eta"
 / "\\eta"
 / "\\Theta"
 / "\\theta"
 / "\\iota"
 / "\\kappa"
 / "\\Lambda"
 / "\\lambda"
 / "\\mu"
 / "\\nu"
 / "\\Xi"
 / "\\xi"
 / "\\Pi"
 / "\\pi"
 / "\\rho"
 / "\\Sigma"
 / "\\sigma"
 / "\\tau"
 / "\\Upsilon"
 / "\\upsilon"
 / "\\Phi"
 / "\\phi"
 / "\\chi"
 / "\\Psi"
 / "\\psi"
 / "\\Omega"
 / "\\omega") {
   return (str);
 }

SpecialChar
 = "\\text{°}"
 / "\\text{°C}"
 / "\\text{d}"

/***********************************
 * MathBBLetter: R, Z, Q, etc
 * [.] \mathbb{letter}
 * [.] All Latex letters used in S4ML
 *     to define Sets in maths
 * */
MathBBLetter
 = "\\mathbb{" letter:Letter "}" {
    return ("\\mathbb{" + letter + "}");
 }

/***********************************
 * Constant: \text{Pa} or \text{m} etc
 * [.] 
 * */
Constant
 = str:Text {
    let forbiddensStr = [
       "Let",
       "Given",
    ];

    if (forbiddensStr.includes(str)) {
       throw {
         name: "DeclarationError",
         message: "Using a forbidden keyword for naming a constant."
      };
    }
    return str;
 }

/***********************************
 * MathBBSet: R+*, Z- etc
 * [.] a set defined with a MathBB Letter
 * */
MathBBSet
 = mathBBLetter:MathBBLetter indice:("_" [+-])? exposant:("^{" "\\ast" "}")? {
      let retValue = mathBBLetter;
      if (indice !== null) {
         retValue += indice.join('');
      }

      if (exposant !== null) {
         retValue += exposant.join('');
      }

      return retValue;
 }

/***********************************
 * EmptyLine: ""
 * */
EmptyLine
 = "" {
      const processedMathLineInput = options.processedMathLineInput;

      processedMathLineInput.signalNoError();
      return "[Unprocess]";
 }

/***********************************
 * CommentaryLine: #coucou tout le monde
 * [.] Syntax to define a specific comment line
 * */
CommentaryLine
 = "#" .* {
    return "[Unprocess]";
 }

/***********************************
 * SeparatorLine: --
 * [.] Syntax to define a line that is
 *     used to separate 2 parts of the input screen
 *     (like an <hr />)
 * */
SeparatorLine
= "--" {
   return "[Unprocess]";
}

/***********************************
 * UnprocessedLine: "\\vdash" followed by anything
 * [.] Syntax to define a line we don't want
 *     it to be processed (to simply write maths
 *     or use syntax that is not allowed yet but
 *     usefull to visualize certain things)
 * */
UnprocessedLine
= "\\vdash" .* {
   return "[Unprocess]";
}

PrintLine
= "\\text{Print}\\ " latexStr:.* {
   return "[Print]" + latexStr.join('');
}

/***********************************
 * MandatoryWhiteSpace:
 * [.] space wich is mandatory
 * */
__ "MandatoryWhiteSpace" = "\\ "

/***********************************
 * OptionnalWhiteSpaces:
 * [.] space wich is not mandatory
 * */
_ "OptionnalWhiteSpaces" = ("\\ " / " ")*


/***************************************************************************
 * OPERATORS *
 ************/

/***********************************
 * Operator_plus: a + b
 * [.] Binary operator
 * */
Operator_plus
 = "+" {
    return "+";
 }

/***********************************
 * Operator_minus: a - b
 * [.] Binary operator
 * */
Operator_minus
 = "-" {
    return "-";
 }

/***********************************
 * Operator_multiply: a * b
 * [.] Binary operator
 * */
Operator_multiply
 = ("\\cdot " / "\\cdot") {
      return "*";
 }

 Operator_divide
 = "/" {
    return "/";
 }

 Operator_modulo
 = "\\%" {
    return "%";
 }

/***********************************
 * Operator_pow: a^b
 * [.] Binary operator
 * */
Operator_pow
 = "^" {
    return "^";
 }

/***********************************
 * Operator_cross: A X B
 * [.] Binary operator
 * */
Operator_cross
 = ("\\times " / "\\times") {
    return "*";
 }

/***********************************
 * Operator_union: A U B
 * [.] Binary operator
 * */
Operator_union
 = "\\cup" {
    return "<Operator[Union]>";
 }

/***********************************
 * Operator_intersection: A Inter B
 * [.] Binary operator
 * */
 Operator_intersection
  = "\\cap" {
     return "<Operator[Intersection]>";
  }

/***********************************
 * Operator_backslash: A \ B
 * [.] Binary operator
 * */
Operator_backslash
 = "\\backslash" {
    return "<Operator[Backslash]>";
 }

/***********************************
 * Operator_opposite: -a
 * [.] Unary operator
 * */
Operator_opposite
 = "-" {
    return "-"
 }

/***********************************
 * Operator_identity: +Infinity
 * [.] Unary operator
 * */
Operator_identity
 = "+" {
    return "<Operator[Identity]>"
 }
