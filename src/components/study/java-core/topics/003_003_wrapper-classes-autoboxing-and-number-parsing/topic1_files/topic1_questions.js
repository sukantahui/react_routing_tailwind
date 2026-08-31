const topic1_questions = [
  {
    question: "Which two primitive types do not have wrapper classes named simply with their capitalized primitive name?",
    shortAnswer: "'int' maps to 'Integer' (not Int), and 'char' maps to 'Character' (not Char). The other six simply capitalize the primitive name (Byte, Short, Long, Float, Double, Boolean).",
    explanation: "All 8 wrapper classes are immutable and declared 'final'.",
    hint: "int → Integer and char → Character.",
    level: "Beginner",
    codeExample: "Integer i = 10; Character c = 'A';"
  }
];

export default topic1_questions;