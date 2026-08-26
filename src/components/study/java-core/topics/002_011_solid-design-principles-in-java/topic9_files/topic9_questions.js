const topic9_questions = [
  {
    question: "What is the Dependency Inversion Principle (DIP) in SOLID design?",
    shortAnswer: "DIP states: 1. High-level modules should not depend on low-level modules; both should depend on abstractions. 2. Abstractions should not depend on details; details should depend on abstractions.",
    explanation: "DIP is the architectural foundation of Dependency Injection and Spring Framework.",
    hint: "Both high-level and low-level code must depend on shared interfaces/abstractions.",
    level: "Intermediate",
    codeExample: "class Service { private final Database db; public Service(Database db) { this.db = db; } }"
  }
];

export default topic9_questions;