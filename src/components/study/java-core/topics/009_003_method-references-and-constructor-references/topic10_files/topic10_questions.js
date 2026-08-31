const topic10_questions = [
  {
    "question": "When should a developer choose an explicit Lambda Expression over a Method Reference in Java?",
    "shortAnswer": "1. 'Parameter Transformations / Constant Injections': When arguments passed to the method require calculations or fixed default values (e.g. 'amt → calcTax(amt, 18.0)'). 2. 'Overload Ambiguity': When the target class contains overloaded methods (e.g. 'print(int)' vs 'print(String)') that confuse the compiler unless parameter types are explicitly declared in a lambda. 3. 'Readability & Context': When parameter names provide critical domain clarity (e.g. '(sourceCurrency, targetCurrency) → ...') that would be lost with an opaque method reference.",
    "explanation": "Grand architectural capstone of Module 009_003.",
    "hint": "Use lambdas when injecting constants, transforming arguments, resolving overloaded method ambiguities, or improving domain readability.",
    "level": "Advanced",
    "codeExample": "// Lambda preferred: x → calculate(x, 10, true) // Cannot be done with method reference!"
  }
];

export default topic10_questions;