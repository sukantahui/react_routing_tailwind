const topic0_questions = [
  {
    "question": "What is the exact output of System.out.println('1' + '2'); and why?",
    "shortAnswer": "It prints '99'. In Java, characters are 16-bit unsigned integers; the ASCII code for '1' is 49 and '2' is 50, so binary operator + performs integer addition (49 + 50 = 99).",
    "explanation": "Char promotion to int during arithmetic operations.",
    "hint": "Characters are promoted to integers; '1'=49 and '2'=50.",
    "level": "Beginner",
    "codeExample": "System.out.println('1' + '2'); // 99"
  },
  {
    "question": "What is the exact output of System.out.println(\"Output: \" + 1 + 2 * 3);?",
    "shortAnswer": "It prints 'Output: 16'. Multiplication (*) has higher operator precedence than addition (+), so 2 * 3 evaluates first to 6. Then left-to-right concatenation gives \"Output: \" + 1 = \"Output: 1\", followed by \"Output: 1\" + 6 = \"Output: 16\".",
    "explanation": "Operator precedence rules in Java expressions.",
    "hint": "Multiplication executes before left-to-right string concatenation.",
    "level": "Intermediate",
    "codeExample": "System.out.println(\"Output: \" + 1 + 2 * 3); // Output: 16"
  }
];

export default topic0_questions;
