start = Declaration / Constraint / Instruction / CommentaryLine / EmptyLine

Declaration = _ "\\text{Let}" __ _ newVarName:UndefinedVarIdentifier _ affectationOperator:AffectationOperator _ mathObjAffected:Instruction _ {
   // console.log('Declaration');
   // console.log('------------');
   // console.log('VarName: [' + newVarName + ']');
   // console.log('Operator: ['+ affectationOperator +']');
   // console.log('Affected: ['+ mathObjAffected +']');

   const processedMathLineInput = g_s4mCoreMemory.lastMathLineInputFocusedOut;

   if (!g_s4mCoreMemory.hasAVarNamed(newVarName) || g_s4mCoreMemory.getMathLineInputWhichDeclared(newVarName) === processedMathLineInput) {
      const newMemoryElement = {
         declaringMathLineInput: g_s4mCoreMemory.lastMathLineInputFocusedOut,
         varName: newVarName,
         varValue: (affectationOperator === "=" ? mathObjAffected : "elof(" + mathObjAffected + ")"),
         processedVarValue: new MathObj()
      };

      g_s4mCoreMemory.setVar(newMemoryElement, processedMathLineInput);
      
   } else {
      console.log('Declaring a var already declared');
   }
}

Constraint = _ "\\text{Given}" __ _ statement:Statement {
   // console.log('Constraint');
   // console.log('----------');
   // console.log('Statement' + statement + ']');
}

Instruction = firstChar:[^#] followingChars:.* {

   const processedMathLineInput = g_s4mCoreMemory.lastMathLineInputFocusedOut;
   const value = firstChar + followingChars.join('');
   if (value.indexOf('error') !== -1) {
      processedMathLineInput.isErrored = true;
   } else {
      processedMathLineInput.isErrored = false;
   }

   return (value);
}

Statement = value:.+ { 
   return (value.join('')); 
}

__ "MandatoryWhiteSpace" = "\\ "
_ "OptionnalWhiteSpaces" = "\\ "*

VarAtLargeIdentifier = FunctionIdentifier / VectorIdentifier / Constant / VarIdentifier

FunctionIdentifier = varName:(VectorIdentifier / VarIdentifier) functionVar:FunctionMarker {
   return (varName + "(" + functionVar +")")
}

FunctionMarker = "\\left(" varName:(VectorIdentifier / VarIdentifier) "\\right)" {
   return (varName)
}

VectorIdentifier = "\\vec{" varIdentifier:VarIdentifier "}" {
   return ("Vector{" + varIdentifier + "}");
}

VarIdentifier = mainId:(Letter / SpecialLetter) index:IdentifierIndex? {
   let retArray = [mainId];

   if (index !== null) {
      retArray = retArray.concat(index);
   }

   return retArray.join('_');
}

IdentifierIndex = SimpleIdentifierIndex / ComplexIdentifierIndex

SimpleIdentifierIndex = "_" char:Char { return ([char]);}

ComplexIdentifierIndex = "_" "{" indexIdentifier:(Char / Text / SpecialLetter) nextIndex:IdentifierIndex? "}" {
   let retArray = [indexIdentifier];
   if (nextIndex !== null) {
      retArray = retArray.concat(nextIndex);
   }

   return retArray;
}

Letter = [A-Za-z]

Char = [A-Za-z0-9]

Text = prefix:"\\text{" str:[A-Za-z0-9]+ postfix:"}" {
   return prefix + str.join('') + postfix;
}

SpecialLetter = value:("\\" [A-Za-z]+) { return (value[0] + value[1].join('')); }

UndefinedVarIdentifier = varName:VarAtLargeIdentifier { 
   // check if var is not already defined
   return (varName); 
}

DefinedVarIdentifier = varName:VarAtLargeIdentifier { 
   // check if var is already defined
   return (varName); 
}

AffectationOperator = EqualOperator / InOperator

EqualOperator = "="

InOperator = "\\in"

Constant = "\\text{" str:[A-Za-z0-9]+ "}" {
   return ("Text{" + str.join('') + "}");
}

EmptyLine = "" {
   const processedMathLineInput = g_s4mCoreMemory.lastMathLineInputFocusedOut;

   processedMathLineInput.isErrored = false;
}

CommentaryLine = "#" .* {
   
}