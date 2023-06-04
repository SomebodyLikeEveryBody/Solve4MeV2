<h1 align="center">
  <img src="https://raw.githubusercontent.com/SomebodyLikeEveryBody/Solve4Me/a1594a04d73b211939985aca1dd6f1413d38a4db/logo.svg" alt="Solve4Me" title="Solve4Me" height="200px">
</h1>

&rarr; Try the [Beta here](https://somebodylikeeverybody.github.io/Solve4MeV2/build/index.htm)

![Intro](https://somebodylikeeverybody.github.io/Solve4MeV2/ReadMeFiles/introFull.png)

## What is Solve4Me ?

Solve4Me is supposed to become / be a powerful mathematical calculator, with 3 specificities:
1) All its operation is completely front-end, no server calls are needed and it can run in a browser with a simple drag and drop via the file protocol. The calculation core is done with the [Nerdamer project](https://github.com/jiggzson/nerdamer).

![0](https://somebodylikeeverybody.github.io/Solve4MeV2/ReadMeFiles/0.png)

2) Unlike other calculation tools, such as SageMath for example which is a remarkable tool, here the entry of the calculation is done directly in mathematical language as it would be written on paper (with management of exponents, indices, Greek letters and other mathematical symbols), via the [MathQuill project](https://github.com/mathquill/mathquill). It means that the mathematical formulas you write is managed in LateX in the background. The output is also formatted to be read as if we read the answer on a paper sheet. The output share the same behaviour.

![1](https://somebodylikeeverybody.github.io/Solve4MeV2/ReadMeFiles/1.png)
![2](https://somebodylikeeverybody.github.io/Solve4MeV2/ReadMeFiles/2.png)

3) You can save and open your page with ```Ctrl + S``` and ```Ctrl + O``` shortcuts to work on it later.

![save](https://github.com/SomebodyLikeEveryBody/Solve4MeV2/blob/master/ReadMeFiles/4.png?raw=true)

## How to use - Basis

Incoming...

## How to use - Operators

Incoming...

## Example of what you can write

Ctrl + O and paste
```
{"MathLineInputsValues":["#\\ Gravity\\ acceleration","\\text{Let}\\ g\\ =\\ \\text{elof}\\left(\\mathbb{R}\\right)\\cdot m\\cdot s^{-2}","#\\ \\ Acceleration\\ of\\ mobile\\ M\\ is\\ \\vec{a_M}\\left(t\\right)\\left(_{a_{M_y}\\left(t\\right)=-g}^{a_{M_x}\\left(t\\right)=0}\\right)","\\text{Let}\\ a_{M_x}\\left(t\\right)\\ =\\ \\operatorname{Function}\\left(_{\\mathbb{R}_+\\rightarrow\\left\\{0\\right\\}}^{t\\ \\mapsto\\ 0}\\right)","\\text{Let}\\ a_{M_y}\\left(t\\right)\\ =\\ \\operatorname{Function}\\left(_{\\mathbb{R}_+\\rightarrow\\left\\{-g\\right\\}}^{t\\ \\mapsto\\ -g}\\ \\right)","\\text{Let}\\ \\vec{a_M}\\left(t\\right)=\\ \\text{Function}\\left(_{\\mathbb{R}_+\\rightarrow\\left(\\left\\{0\\right\\}\\times\\left\\{-g\\right\\}\\right)^2}^{t\\ \\mapsto\\ \\text{Vect}\\left(_{_{a_{M_y}\\left(t\\right)}}^{a_{M_x}\\left(t\\right)}\\right)}\\right)\\ ","--","#\\ Velocity\\ of\\ mobile\\ M\\ is\\ \\vec{v_M}\\left(t\\right)\\left(_{v_{M_y}\\left(t\\right)=v_{M_{y_0}}-g\\cdot t}^{v_{M_x}\\left(t\\right)=v_{M_{x_0}}}\\right)","\\text{Let}\\ v_{M_{x_0}}=\\text{elof}\\left(\\mathbb{R}\\right)\\cdot m\\cdot s^{-1}","\\text{Let}\\ v_{M_{y_0}}=\\text{elof}\\left(\\mathbb{R}\\right)\\cdot m\\cdot s^{-1}","\\text{Let}\\ v_{M_x}\\left(t\\right)\\ =\\ \\operatorname{Function}\\left(_{\\mathbb{R}_+\\rightarrow\\left\\{v_{M_{x_0}}\\right\\}}^{t\\ \\mapsto\\ v_{M_{x_0}}}\\right)","\\text{Let}\\ v_{M_y}\\left(t\\right)\\ =\\ \\operatorname{Function}\\left(_{\\mathbb{R}_+\\rightarrow]-\\infty,\\ v_{M_{y_0}}]_{\\mathbb{R}}}^{t\\ \\mapsto\\ v_{M_{y_0}}-g\\cdot t}\\right)","\\text{Let}\\ \\vec{v_M}\\left(t\\right)\\ =\\ \\operatorname{Function}\\left(_{\\mathbb{R}_+\\rightarrow\\left(\\left\\{v_{M_{x_0}}\\right\\}\\times]-\\infty,\\ v_{M_{y_0}}]_{\\mathbb{R}}\\right)^2}^{t\\ \\mapsto\\ \\text{Vect}\\left(_{v_{M_y}\\left(t\\right)}^{v_{M_x}\\left(t\\right)}\\right)}\\right)","--","#\\ Location\\ of\\ mobile\\ M\\ is\\ \\vec{M}\\left(t\\right)\\left(_{y_M\\left(t\\right)=y_{M_0}+v_{M_{y_0}}\\cdot t\\ -\\ \\frac{1}{2}\\cdot g\\cdot t^2}^{x_M\\left(t\\right)=x_{M_0}+v_{M_{x_0}}\\cdot t}\\right)","\\text{Let}\\ x_{M_0}=\\text{elof}\\left(\\mathbb{R}\\right)\\cdot m","\\text{Let}\\ y_{M_0}=\\text{elof}\\left(\\mathbb{R}\\right)\\cdot m","\\text{Let}\\ y_{M_{extr}}=y_{M_0}+\\frac{\\left(v_{M_{y_0}}\\right)^2}{2g}","\\text{Let}\\ \\Im_{x_M}=[x_{M_0},\\ \\text{signof}\\left(v_{M_{x_0}}\\right)\\cdot\\infty[_{\\mathbb{R}}","\\text{Let}\\ \\Im_{y_M}=[y_{M_{extr}},\\ \\text{signof}\\left(g\\right)\\cdot\\infty[","\\text{Let}\\ x_M\\left(t\\right)=\\operatorname{Function}\\left(_{\\mathbb{R}_+\\rightarrow\\ \\Im_{x_M}}^{t\\ \\mapsto\\ x_{M_0}+v_{M_{x_0}}\\cdot t}\\right)","\\text{Let}\\ y_M\\left(t\\right)=\\operatorname{Function}\\left(_{\\mathbb{R}_+\\rightarrow\\ \\Im_{y_M}}^{t\\ \\mapsto\\ y_{M_0}+v_{M_{y_0}}\\cdot t\\ -\\ \\frac{1}{2}\\cdot g\\cdot t^2}\\right)","\\text{Let}\\ \\vec{M}\\left(t\\right)=\\operatorname{Function}\\left(_{\\mathbb{R}_+\\rightarrow\\ \\Im_{x_M}\\times\\Im_{y_M}}^{t\\ \\mapsto\\ \\text{Vect}\\left(_{y_M\\left(t\\right)}^{x_M\\left(t\\right)}\\right)}\\right)","--",""]}
```

To see Projectile motion formulas for examples

