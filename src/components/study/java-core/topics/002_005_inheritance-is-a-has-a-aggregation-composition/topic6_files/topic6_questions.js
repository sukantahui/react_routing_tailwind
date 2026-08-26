const topic6_questions = [
  {
    question: "What class members are NOT inherited by subclasses in Java?",
    shortAnswer: "1. Private members (fields/methods are physically present in the object but not directly accessible by name in the subclass). 2. Constructors (never inherited, only invoked via super()).",
    explanation: "Subclasses must define their own constructors and use getters/setters to interact with private superclass state.",
    hint: "Private members and constructors are NOT inherited.",
    level: "Beginner",
    codeExample: "// private int secret; // Child cannot access directly by name"
  }
];

export default topic6_questions;