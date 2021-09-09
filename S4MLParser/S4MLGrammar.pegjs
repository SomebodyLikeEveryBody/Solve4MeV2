start = Test

Test = "{salut}"

Declaration = "\\text{Let}\\ " _ variableName:Identifier _ affectationOperator:AffectationOperator _ affectedExpression:Expression {
   console.log(variableName);
   console.log(affectationOperator);
   console.log(affectedExpression);
}

AffectationOperator = EqualOperator / InOperator

EqualOperator = "="

InOperator = "\\in"

Identifier = id:[a-zA-Z0-9_\{\\\}]+ { return (id.join('')); }

VectorIdentifier = "\\vec{" Identifier "}"

Expression = word:Word { return (word.join('')); }

Instruction = word:Word { return (word.join('')); }


Word = .+

_ "Whitespace" = "\\ "*

__ "Mandatory_Whitespace" = "\\ "+
