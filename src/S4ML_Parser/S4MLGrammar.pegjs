start
 = UnprocessedLine
 / CommentaryLine
 / SeparatorLine
 / Declaration
 / Constraint
 / Instruction
 / EmptyLine

// start = FunctionIdentifier
 
test = .+


//--------------------------------
Declaration
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
      if (g_s4mCoreMemory.hasAVarNamed(varName) && g_s4mCoreMemory.getMathLineInputWhichDeclared(varName) !== processedMathLineInput) {
         console.log('ERROR');
      }

      return (varName); 
 }

DefinedVarIdentifier
 = varName:VarAtLargeIdentifier { 
      // check if var is already defined
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
 = FunctionInstanciation
 / SetInstanciation
 / Expression

Expression
  = head:Term tail:(_ Operator_plus _ Term)* {
      return tail.reduce(function(result, element) {
        return (result + element[1] + element[3]);
      }, head);
    }

Term
  = head:Factor tail:(_ OperatorTerm _ Factor)* {
      return tail.reduce(function(result, element) {
        return result + element[1] + element[3];
      }, head);
    }

OperatorTerm
 = Operator_minus
 / Operator_multiply
 / Operator_pow   

Factor
  = Factor_bracketed
  / Fraction
  / Factor_braced
  / VarAtLargeIdentifier
  / Number


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
  / Operator_minus
  / Operator_multiply
  / Operator_pow

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

Number
= Float
/ Integer

Integer
= value:[0-9]+ {
   return value.join('');
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
Set
 = SetInstanciation
 / MathBBSet 
 / VarIdentifier

SetInstanciation
= _ "\\left\\{" _ firstEl:S4MLObject _ followingEls:(_ "," _ S4MLObject)* _ "\\right\\}" {
   let setContent = followingEls.reduce((total, currentEl) => {
      return (total + "," + currentEl[3]);
   }, firstEl);

   return "{" + setContent + "}";
}
/ _ "\\left\\{\\right\\}"_  {
   return "{}";
}
/ "\\varnothing" {
   return "{}";
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
 = VectorIdentifier 
 / Constant 
 / VarIdentifier

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
 = value:("\\" [A-Za-z]+) {
      return (value[0] + value[1].join('')); 
 }

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