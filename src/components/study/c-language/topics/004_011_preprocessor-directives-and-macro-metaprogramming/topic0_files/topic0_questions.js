const questions = [
  {
    question: "Why should function-like macro arguments always be wrapped in parentheses?",
    shortAnswer: "To prevent operator precedence errors during text macro expansion.",
    explanation: "If SQUARE(x) is defined as x*x, SQUARE(5+1) expands to 5+1*5+1 = 11 instead of 36. Defined as ((x)*(x)), it evaluates to ((5+1)*(5+1)) = 36.",
    hint: "Parenthesize all macro parameters.",
    level: "intermediate"
  }
];

export default questions;
