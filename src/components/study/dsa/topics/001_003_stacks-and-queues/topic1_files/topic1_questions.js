const questions = [
  {
    id: 1,
    question: "What operator precedence order is followed during Infix to Postfix conversion?",
    options: ["^ (3) > *, / (2) > +, - (1)", "+, - (3) > *, / (2)", "All equal precedence", "Right-to-left only"],
    answer: "^ (3) > *, / (2) > +, - (1)",
    explanation: "Exponentiation ^ has precedence 3, multiplication/division have precedence 2, and addition/subtraction have precedence 1."
  }
];

export default questions;
