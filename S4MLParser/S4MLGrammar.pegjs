start = Declaration / Constraint / Instruction

Declaration = _ "\\text{Let}" __ _ newVarName:UndefinedVarIdentifier _ affectationOperator:AffectationOperator _ mathObjAffected:Instruction _ {
   console.log('Declaration');
   console.log('------------');
   console.log('VarName: [' + newVarName + ']');
   console.log('Operator: ['+ affectationOperator +']');
   console.log('Affected: ['+ mathObjAffected +']');
}

Constraint = _ "\\text{Given}" __ _ statement:Statement {
   console.log('Constraint');
   console.log('----------');
   console.log('Statement' + statement + ']');
}

Instruction = value:.+ {
   console.log('Instruction');
   console.log('-----------');
   console.log(value.join(''))

   return (value.join(''));
}

Statement = value:.+ { 
   return (value.join('')); 
}

__ "MandatoryWhiteSpace" = "\\ "
_ "OptionnalWhiteSpaces" = "\\ "*

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

UndefinedVarIdentifier = varName:(VectorIdentifier / VarIdentifier) { 
   // check if var is not already defined
   return (varName); 
}

DefinedVarIdentifier = varName:(VectorIdentifier / VarIdentifier) { 
   // check if var is already defined
   return (varName); 
}

AffectationOperator = EqualOperator / InOperator

EqualOperator = "="

InOperator = "\\in"

MeasureUnitVar = "\\text{" [A-Za-z0-9]+ "}"