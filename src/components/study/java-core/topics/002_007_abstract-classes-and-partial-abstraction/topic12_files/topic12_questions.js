const topic12_questions = [
  {
    question: "Can an abstract class or abstract method be declared 'final' in Java?",
    shortAnswer: "No! 'abstract' and 'final' are mutually exclusive, opposing concepts. An abstract class requires inheritance to be useful, while a final class prevents inheritance. Combining them produces a compile-time error.",
    explanation: "'illegal combination of modifiers: abstract and final' is flagged immediately by javac.",
    hint: "Opposing concepts: abstract requires subclassing, final forbids subclassing.",
    level: "Beginner",
    codeExample: "// Compile Error: final abstract class Bad {}"
  }
];

export default topic12_questions;