
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
/* nerdamerToLatexVarsTranslaterGrammar.pegj *
 *********************************************/

{
   // console.log('OKAY');
}

start
 = Text

Pattern
 = .* Var .* 

Var
 = "VAR_{" varAtLargeIdentifier:VarAtLargeIdentifier "}" {
      return varAtLargeIdentifier;
 }

VarAtLargeIdentifier
 = varName:(VectorIdentifier
 / SpecialChar
 / Constant
 / VarIdentifier) {
    return varName;
 }

VectorIdentifier
 = "VECTOR" "SEPLEFT" varIdentifier:VarIdentifier "SEPRIGHT" {
      return ("\\vec{" + varIdentifier + "}");
 }

VarIdentifier
 = mainId:(MathBBLetter / SpecialLetter / Letter) index:IdentifierIndex? {
      let retStr = mainId;
      let indexStr = "";

      if (index !== null) {
         index.reverse();
         for (let indexPart of index) {
            indexStr = '_{' + indexPart + indexStr + '}';
         }

         retStr += indexStr;
      }

      return retStr;
 }

MathBBLetter
 = "MATHBB" "SEPLEFT" letter:Letter "SEPRIGHT" {
    return ("\\mathbb{" + letter + "}");
 }

SpecialLetter
 = "SPECIAL" "SEPLEFT" specialLetterStr:SpecialLetterStr "SEPRIGHT" {
      return ("\\" + specialLetterStr);
 }

SpecialLetterStr
 = str:("alpha"
 / "beta"
 / "Gamma"
 / "gamma"
 / "Delta"
 / "delta"
 / "epsilon"
 / "varepsilon"
 / "zeta"
 / "eta"
 / "eta"
 / "Theta"
 / "theta"
 / "iota"
 / "kappa"
 / "Lambda"
 / "lambda"
 / "mu"
 / "nu"
 / "Xi"
 / "xi"
 / "Pi"
 / "pi"
 / "rho"
 / "Sigma"
 / "sigma"
 / "tau"
 / "Upsilon"
 / "upsilon"
 / "Phi"
 / "phi"
 / "chi"
 / "Psi"
 / "psi"
 / "Omega"
 / "omega") {
      return (str);
 }

Letter
 = [A-Za-z]

SpecialChar
 = "SPECIAL" "SEPLEFT" "DEGREE" "SEPRIGHT" {
    return "\\text{°}";
 }
 / "SPECIAL" "SEPLEFT" "DEGREECELCIUS}" "SEPRIGHT" {
    return "\\text{°C}";   
 }

Constant
 = Text

Text
 = "TEXT" "SEPLEFT" str:[^"SEPRIGHT"]  "SEPRIGHT" {
      return ("\\text{" + str.join('') + "}");
 }

Char
 = [A-Za-z0-9]

IdentifierIndex
 = "UNDERSCORE" indexIdentifier:(SpecialLetter / Integer / Char / Text) nextIndex:IdentifierIndex?  {
      let retArray = [indexIdentifier];
      if (nextIndex !== null) {
         retArray = retArray.concat(nextIndex);
      }
      
      return retArray;
 }

 Integer
= digits:[0-9]+ {
   return digits.join('');
}