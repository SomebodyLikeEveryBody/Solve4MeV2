// start
//  = Declaration 
//  / Constraint 
//  / Instruction 
//  / CommentaryLine 
//  / SeparatorLine 
//  / UnprocessedLine
//  / EmptyLine
start = Expression

test = .+

Declaration
 = _ "\\text{Let}" __ _ newVarName:VarIdentifier _ affectationOperator:AffectationOperator _ mathObjAffected:Instruction _ {

   const processedMathLineInput = g_s4mCoreMemory.lastMathLineInputFocusedOut;

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

Constraint
 = _ "\\text{Given}" __ _ statement:Statement {
   }

Statement
 = value:.+ { 
      return (value.join('')); 
   }

// Instruction = _ firstChar:[^#] followingChars:.* _ {

//    const processedMathLineInput = g_s4mCoreMemory.lastMathLineInputFocusedOut;
//    const instructionValue = firstChar + followingChars.join('');

//    if (instructionValue.indexOf('error') !== -1) {
//       processedMathLineInput.isErrored = true;
//    } else {
//       processedMathLineInput.isErrored = false;
//    }

//    return (instructionValue);
// }

Instruction = FunctionInstanciation / Number

Expression
 = _ termHead:Term _ expressionTail:ExpressionTail* {
      let retValue = termHead;

      if (expressionTail.length !== 0) {
         for (let val of expressionTail) {
            retValue += val;
         }
      }

      return retValue;
   }

ExpressionTail
 = _ operator:Operator_plusorminus _ termTail:Term {
    return operator + termTail
 }

Term
 = termHead:Factor termTail:(TermTail_pow / TermTail_multiply)* {
     let retValue = termHead;

     if (termTail.length !== 0) {
        for (let val of termTail) {
           retValue += val;
        }
     }

     return retValue;
 }

TermTail_multiply
 = _ operator:Operator_multiply _ factorTail:Factor {
    return operator + factorTail;
 }

TermTail_pow
 = _ operator:OperatorPow "{"? _ exponent:Expression "}"? {
    return operator + "(" + exponent + ")";
 }

Fraction
= "\\frac{" numerator:Expression "}{" denominator:Expression "}" {
   return "((" + numerator + ")/(" +  denominator + "))";
}

Factor
  = "\\left(" _ expr:Expression _ "\\right)" {
      return "(" + expr + ")";
  }
  / Fraction
  / VarAtLargeIdentifier
  / Number


Operator_plusorminus
 = "+" 
 / "-"

Operator_multiply
 = "\\cdot " / "\\cdot" {
      return "*";
 }

 OperatorPow
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

FunctionInstanciation
 = _ "\\text{Function}\\left(_{" _ startSet:Set _ "\\rightarrow" _ endSet:Set _ "}^{" _ varName:VarIdentifier _ "\\mapsto" _ instruction:Instruction _ "}\\right)" {
   console.log('startSet: ' + startSet);
   console.log('endset: ' + endSet);
   console.log('varname: ' + varName);
   console.log('instruction: ' + instruction);
   return ('ok')
 }

Set
 = SetInstanciation
 / MathBBSet 
 / VarIdentifier

SetInstanciation
= setLeft:VarIdentifier operator:SetOperator setRight:VarIdentifier {
      return setLeft + "\\cup " + setRight;
}

// union, inter, -, X, Complementaire = E - A, difference symetrique = A - AinterB, 
SetOperator
 = "\\cup " 
 / "\\cap" 
 / "\\backslash" 
 / "\\times"

__ "MandatoryWhiteSpace" = "\\ "
_ "OptionnalWhiteSpaces" = "\\ "*

VarAtLargeIdentifier
 = FunctionIdentifier 
 / VectorIdentifier 
 / Constant 
 / VarIdentifier

FunctionIdentifier
 = varName:(VectorIdentifier / VarIdentifier) functionVar:FunctionMarker {
      return (varName + "(" + functionVar +")")
 }

FunctionMarker
 = "\\left(" varName:(VectorIdentifier / VarIdentifier) "\\right)" {
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
 = "_" "{" indexIdentifier:(Char / Text / SpecialLetter) nextIndex:IdentifierIndex? "}" {
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

Constant
 = "\\text{" str:[A-Za-z0-9]+ "}" {
      return ("Text{" + str.join('') + "}");
 }

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