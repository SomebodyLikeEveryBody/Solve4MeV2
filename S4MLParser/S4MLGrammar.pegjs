start = Declaration

Declaration = "\text{Let}\ " _ variable:Identifier _ "=" _ affectation:Expression {
   console.log(variable);
   console.log(affectation);
}

Identifier = id:[^=]+ { return (id.join('')); }

Expression = word:Word { return (word.join('')); }

Instruction = word:Word { return (word.join('')); }


Word = .+

_ "Whitespace" = [ \t\r]*
