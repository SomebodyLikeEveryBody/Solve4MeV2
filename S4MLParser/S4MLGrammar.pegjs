start = VarIdentifier

Declaration = _ "\\text{Let}" __ _ newVarName:UndefinedVarIdentifier _ affectationOperator:AffectationOperator _ mathObjAffected:MathObj _ {
   
}

__ "MandatoryWhiteSpace" = "\\ "
_ "OptionnalWhiteSpaces" = "\\ "*

VarIdentifier = mainId:(Letter / SpecialLetter) index:IdentifierIndex?

IdentifierIndex = SimpleIdentifierIndice / ComplexIdentifierIndex

SimpleIdentifierIndice = "_" Char

ComplexIdentifierIndex = "_" "{" (Char / Text / SpecialLetter) IdentifierIndex? "}"

Letter = [A-Za-z]

Char = [A-Za-z0-9]

Text = "\\text{" [A-Za-z0-9]+ "}"

SpecialLetter = value:("\\" [A-Za-z]+) { return (value[0] + value[1].join('')); }

UndefinedVarIdentifier = varName:VarIdentifier { 
   // check if var is not already defined
   return (varName); 
}

DefinedVarIdentifier = varName:VarIdentifier { 
   // check if var is already defined
   return (varName); 
}

AffectationOperator = EqualOperator / InOperator

EqualOperator = "="

InOperator = "\\in"

MathObj = value:.+ { return (value.join('')) }

MeasureUnitVar = "\\text{" [A-Za-z0-9]+ "}"