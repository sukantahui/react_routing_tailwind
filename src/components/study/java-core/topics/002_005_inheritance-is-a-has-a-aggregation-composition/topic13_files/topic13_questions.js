const topic13_questions = [
  {
    question: "What is the Fragile Base Class problem in object-oriented programming?",
    shortAnswer: "An architectural vulnerability where seemingly harmless modifications or internal method invocations in a superclass inadvertently break the functionality of subclasses that depend on those implementation details.",
    explanation: "Inheritance creates tight white-box coupling, making base classes fragile.",
    hint: "Superclass implementation changes break child subclass behavior.",
    level: "Advanced",
    codeExample: "// AddCount doubled when super.addAll() internally calls add()"
  }
];

export default topic13_questions;