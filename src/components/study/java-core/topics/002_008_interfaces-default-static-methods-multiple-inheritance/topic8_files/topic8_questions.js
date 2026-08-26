const topic8_questions = [
  {
    question: "How do you resolve a compiler error when a class implements two interfaces that declare identical default method signatures?",
    shortAnswer: "The implementing class MUST explicitly override the conflicting method. Inside the override body, it can delegate to a specific interface using 'InterfaceName.super.methodName()'.",
    explanation: "This forces unambiguous developer choice, solving the Diamond Problem with default methods.",
    hint: "Override the method and call 'InterfaceName.super.methodName()'.",
    level: "Intermediate",
    codeExample: "@Override public void log() { InterfaceA.super.log(); }"
  }
];

export default topic8_questions;