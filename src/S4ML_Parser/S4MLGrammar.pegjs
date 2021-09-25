start
 = UnprocessedLine
 / CommentaryLine
 / SeparatorLine
 / Declaration
 / Constraint
 / Instruction
 / EmptyLine

// start = ContiguousMathObj
 
test = .+

//--------------------------------
Declaration "Declaration"
 = _ "\\text{Let}" __ _ newVarName:(FunctionIdentifier / VarAtLargeIdentifier) _ affectationOperator:AffectationOperator _ mathObjAffected:Instruction _ {

   const processedMathLineInput = g_s4mCoreMemory.lastMathLineInputFocusedOut;

   // if newvarName is a Function Identifier
   if (typeof (newVarName) === typeof ([])) {
      let funcVar = newVarName.functionVar;
      newVarName = newVarName.functionName
   }

   if (!g_s4mCoreMemory.hasAVarNamed(newVarName) || g_s4mCoreMemory.getMathLineInputWhichDeclared(newVarName) === processedMathLineInput) {
      const newMemoryElement = {
         declaringMathLineInput: g_s4mCoreMemory.lastMathLineInputFocusedOut,
         varName: newVarName,
         varValue: (affectationOperator === "=" ? mathObjAffected : "elof(" + mathObjAffected + ")"),
         processedVarValue: new MathObj()
      };

      g_s4mCoreMemory.setVar(newMemoryElement, processedMathLineInput);
      processedMathLineInput.signalNoError();
      
   } else {
      processedMathLineInput.signalError();
      throw "Declaring a var already declared somewhere";
   }
}

UndefinedVarIdentifier
 = varName:VarAtLargeIdentifier { 
      const processedMathLineInput = g_s4mCoreMemory.lastMathLineInputFocusedOut;

      // check if var is not already defined
      if (g_s4mCoreMemory.hasAVarNamed(varName)
         && g_s4mCoreMemory.getMathLineInputWhichDeclared(varName) !== processedMathLineInput) {
         console.log('ERROR');
      }

      return (varName); 
 }

DefinedVarIdentifier
 = varName:VarAtLargeIdentifier {

      // check if var is already defined
      if (!(
            g_s4mCoreMemory.hasAVarNamed(varName)
            && g_s4mCoreMemory.getMathLineInputWhichDeclared(varName) !== processedMathLineInput)) {
         console.log('ERROR');
      }

      return (varName); 
 }

AffectationOperator
 = EqualOperator
 / InOperator

EqualOperator
 = "="

InOperator  
 = "\\in"

//--------------------------------
Constraint
 = _ "\\text{Given}" __ _ statement:Statement {
 }

Statement
 = value:.+ { 
      return (value.join('')); 
 }


//--------------------------------
Instruction
 = Instanciation
 / Expression

Instanciation
 = FunctionInstanciation
 / SetInstanciation

Expression
 = head:Term tail:(_ Operator_plus _ Term)* {
      return tail.reduce((result, element) => {
         return (result + element[1] + element[3]);
      }, head);
 }

Term
 = head:Factor tail:(_ OperatorTerm _ Factor)* {
      return tail.reduce((result, element) => {
         return result + element[1] + element[3];
      }, head);
 }

OperatorTerm
 = Operator_minus
 / Operator_multiply
 / Operator_cross
 / Operator_pow

Operator_empty
 = __ {
    return "*";
 }

Factor
 = ContiguousMathObj
 / Factor_bracketed
 / Fraction
 / Factor_braced
 / S4MLObject
 / Number

ContiguousMathObj
 = _ firstObject:S4MLObject _ list:(_ Expression _)+ {
      let varsArray = list.reduce((result, currentEl) => {
         result.push(currentEl[1]);
         return result;
      }, [firstObject]);

      return (varsArray.join('*'));
 }

PlusFactor
 = _ "+" _ factor:Factor{
      return (factor);
 }

MinusFactor
 = _ "-" _ factor:Factor {
    return ('(-1)*' + factor)
 }

Factor_braced
 = "{" _ expr:Expression _ "}" {
    return ("(" + expr + ")");
 }

Factor_bracketed
 = "\\left(" _ expr:Expression _ "\\right)" {
      return ("(" + expr + ")");
 }

Fraction
= "\\frac{" _ numerator:Expression _ "}{" _ denominator:Expression _ "}" {
      return ("((" + numerator + ")/(" + denominator + "))");
}

 Operator
  = Operator_plus
  / OperatorTerm

Operator_plus
 = "+"

Operator_minus
 = "-"

Operator_multiply
 = ("\\cdot " / "\\cdot") {
      return "*";
 }

 Operator_pow
  = "^"

Operator_cross
 = ("\\times " / "\\times") {
    return "[X]";
 }

Number
= Float
/ Integer

Integer
= _ sign:"-"? _ digits:[0-9]+ {
   let retStr = '';

   if (sign !== null) {
      retStr += sign;
   }

   for (let el of digits) {
      retStr += el;
   }

   return retStr;
}

Float
 = integer:Integer "." decimals:Integer {
   return integer + "." + decimals;
 }


//--------------------------------
FunctionInstanciation
 = _ "\\text{Function}\\left(_{" _ startSet:Set _ "\\rightarrow" _ endSet:Set _ "}^{" _ varName:(VarIdentifier / VectorIdentifier) _ "\\mapsto" _ instruction:Instruction _ "}\\right)" {
    let funcObj = {
       startSet: startSet,
       endSet: endSet,
       varName: varName,
       instruction: instruction
    };

   return (funcObj);
 }



//--------------------------------
Set "Set"
 = SetInstanciation
 / MathBBSet
 / VarIdentifier

SetInstanciation
 = SetInstanciationByBraces
 / SetInstanciationByVARNOTHING
 / SetInstanciationByHooks

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

SetInstanciationByVARNOTHING
 = "\\varnothing" {
      return "<SET[Elements[]]>";
 }

SetInstanciationByHooks
 = firstHook:("[" / "]") _ firstBoundary:(Instruction) _ "," _ secondBoundary:(Instruction) _ secondHook:("]" / "[") "_{" _ includedIn:(MathBBSet / VarIdentifier) "}" {
      // return ("<SET[boundary1[" + firstBoundary + "][" + (firstHook === "[" ? "included" : "excluded ") + "]]boundary2[" + secondBoundary + "][" (secondHook === "[" ? "included" : "excluded ") + "]>");
      return ("<SET[boundary1[" + firstBoundary + "][" + (firstHook === "[" ? "included" : "excluded") + "]]boundary2[" + secondBoundary + "][" + (secondHook === "]" ? "included" : "excluded") + "]subSetOf[" + includedIn + "]>");
 }

// union, inter, -, X, Complementaire = E - A, difference symetrique = A - AinterB, 
SetOperator
 = "\\cup" 
 / "\\cap" 
 / "\\backslash" 
 / "\\times"

__ "MandatoryWhiteSpace" = "\\ "
_ "OptionnalWhiteSpaces" = ("\\ " / " ")*


//--------------------------------
VarAtLargeIdentifier
 = varName:(VectorIdentifier 
 / Constant 
 / VarIdentifier) {
    return "<VAR[" + varName + "]>";
 }

FunctionIdentifier
 = funcName:(VectorIdentifier / VarIdentifier) funcVar:FunctionMarker {
      return ({functionName: funcName, functionVar: funcVar})
 }

FunctionMarker
 = "\\left(" varName:(VarAtLargeIdentifier) "\\right)" {
      return (varName)
 }

VectorIdentifier
 = "\\vec{" varIdentifier:VarIdentifier "}" {
      return ("Vector{" + varIdentifier + "}");
 }

VarIdentifier
 = mainId:(Letter / MathBBLetter / SpecialLetter) index:IdentifierIndex? {
      let retArray = [mainId];

      if (index !== null) {
         retArray = retArray.concat(index);
      }

      return retArray.join('_');
 }

IdentifierIndex
 = SimpleIdentifierIndex 
 / ComplexIdentifierIndex

SimpleIdentifierIndex
 = "_" char:Char { 
      return ([char]);
 }

ComplexIdentifierIndex
 = "_" "{" indexIdentifier:(Number / Char / Text / SpecialLetter) nextIndex:IdentifierIndex? "}" {
      let retArray = [indexIdentifier];
      if (nextIndex !== null) {
         retArray = retArray.concat(nextIndex);
      }

      return retArray;
 }

Letter
 = [A-Za-z]

Char
 = [A-Za-z0-9]

Text
 = prefix:"\\text{" str:[A-Za-z0-9]+ postfix:"}" {
      return prefix + str.join('') + postfix;
 }

SpecialLetter
 = "\\alpha"
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
 / "\\omega"

MathBBLetter
 = value:("\\mathbb{" Letter "}") {
      return value.join('');
 }

Constant
 = "\\text{" str:[A-Za-z0-9]+ "}" {
      return ("Text{" + str.join('') + "}");
 }

//--------------------------------
S4MLObject
 = VarAtLargeIdentifier
 / Factor_bracketed
 / Fraction
 / Number

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

//--------------------------------
EmptyLine
 = "" {
      const processedMathLineInput = g_s4mCoreMemory.lastMathLineInputFocusedOut;

      processedMathLineInput.isErrored = false;
 }

CommentaryLine
 = "#" .* {

 }

SeparatorLine
= "--"

UnprocessedLine
= "\\vdash" .*