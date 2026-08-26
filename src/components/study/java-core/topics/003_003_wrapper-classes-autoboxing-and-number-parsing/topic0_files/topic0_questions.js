const topic0_questions = [
  {
    question: "What are the 3 primary reasons why Java provides Wrapper Classes for primitives?",
    shortAnswer: "1. Collections Framework compatibility (generics require Objects like 'List<Integer>', not 'List<int>'). 2. Null representation (useful for database columns and uninitialized DTO fields). 3. Utility methods (parsing, binary conversion, MIN/MAX constants).",
    explanation: "Wrapper classes bridge the gap between high-performance primitives and object polymorphism.",
    hint: "Collections require objects, allows nulls in DB fields, and provides conversion utilities.",
    level: "Beginner",
    codeExample: "List<Integer> numbers = new ArrayList<>(); // Primitives not allowed in generics"
  }
];

export default topic0_questions;