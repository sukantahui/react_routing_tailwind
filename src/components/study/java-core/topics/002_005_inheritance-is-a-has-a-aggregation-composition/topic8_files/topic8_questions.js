const topic8_questions = [
  {
    question: "What effect does the 'final' keyword have when applied to a class vs a method?",
    shortAnswer: "A 'final class' cannot be extended by any subclass (e.g. java.lang.String). A 'final method' can be inherited by subclasses but CANNOT be overridden.",
    explanation: "Used to enforce security invariants, immutability, and prevent behavioral corruption.",
    hint: "Final class = no inheritance; final method = no overriding.",
    level: "Beginner",
    codeExample: "public final class ImmutableClass {}\npublic final void secureMethod() {}"
  }
];

export default topic8_questions;