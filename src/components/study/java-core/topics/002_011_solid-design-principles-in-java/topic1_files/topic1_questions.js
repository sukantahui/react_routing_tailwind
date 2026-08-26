const topic1_questions = [
  {
    question: "What is the core definition and benefit of the Single Responsibility Principle (SRP)?",
    shortAnswer: "SRP states that 'A class should have one, and only one, reason to change.' By separating business logic, database persistence, and external notifications into distinct classes, modifying one subsystem never breaks another.",
    explanation: "High cohesion and low coupling are direct results of SRP.",
    hint: "Every class should have a single focused responsibility and only one reason to change.",
    level: "Beginner",
    codeExample: "// Separate: User (model), UserRepository (DB), UserNotifier (email)"
  }
];

export default topic1_questions;