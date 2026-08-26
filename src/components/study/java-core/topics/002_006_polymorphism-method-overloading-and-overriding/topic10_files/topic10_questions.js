const topic10_questions = [
  {
    question: "What is Upcasting in Java and is an explicit cast operator required?",
    shortAnswer: "Upcasting is casting a subtype reference to a supertype reference (e.g. 'Staff s = new Instructor()'). It is implicit, completely automatic, and 100% type-safe without requiring any cast operator.",
    explanation: "Because every Instructor IS-A Staff, upcasting is always guaranteed to succeed.",
    hint: "Subclass to superclass reference; implicit and always safe.",
    level: "Beginner",
    codeExample: "Animal a = new Dog(); // Implicit Upcasting"
  }
];

export default topic10_questions;