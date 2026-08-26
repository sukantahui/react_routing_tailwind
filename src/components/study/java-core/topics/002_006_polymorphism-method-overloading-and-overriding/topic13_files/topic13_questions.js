const topic13_questions = [
  {
    question: "What is Pattern Matching for 'instanceof' in Java 16+ (JEP 394)?",
    shortAnswer: "A modern language feature that combines type checking and cast assignment into a single statement: 'if (obj instanceof String s) { System.out.println(s.length()); }'.",
    explanation: "Eliminates repetitive, boilerplate downcasting lines across your codebase.",
    hint: "Combines instanceof check and variable binding in one step: 'instanceof Type var'.",
    level: "Intermediate",
    codeExample: "if (obj instanceof String s) { return s.length(); }"
  }
];

export default topic13_questions;