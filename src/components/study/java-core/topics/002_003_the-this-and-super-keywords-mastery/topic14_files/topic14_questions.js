const topic14_questions = [
  {
    question: "Why can 'this()' and 'super()' NOT both be written in the same constructor body?",
    shortAnswer: "1. Both require being the very first statement on line 1 (syntactic conflict). 2. Allowing both would cause parent constructors to execute multiple times for a single object (semantic error).",
    explanation: "When Constructor A calls 'this()', it delegates to Constructor B, which in turn calls 'super()'. The parent is initialized exactly once.",
    hint: "Syntactic line 1 conflict and prevents duplicate parent initialization.",
    level: "Intermediate",
    codeExample: "// Illegal: cannot have this() and super() in same body"
  }
];

export default topic14_questions;