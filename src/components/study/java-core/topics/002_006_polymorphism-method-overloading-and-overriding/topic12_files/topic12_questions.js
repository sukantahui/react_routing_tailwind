const topic12_questions = [
  {
    question: "What does the 'instanceof' operator do and what does 'null instanceof ClassName' return?",
    shortAnswer: "'instanceof' tests whether an object reference is an instance of a specified class, subclass, or interface at runtime, returning boolean true or false. 'null instanceof AnyClass' safely returns false without throwing a NullPointerException.",
    explanation: "It protects against ClassCastException by verifying the type before downcasting.",
    hint: "Runtime type test; null instanceof returns false safely.",
    level: "Beginner",
    codeExample: "if (obj instanceof Dog) { Dog d = (Dog) obj; }"
  }
];

export default topic12_questions;