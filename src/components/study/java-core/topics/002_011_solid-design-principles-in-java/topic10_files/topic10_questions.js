const topic10_questions = [
  {
    question: "Why is Constructor Dependency Injection (CDI) considered superior to Field Injection in Java?",
    shortAnswer: "Constructor Injection makes all dependencies explicit and immutable ('final'), prevents creating partially initialized objects, and allows fast, lightweight unit testing by passing mock implementations without needing reflection frameworks.",
    explanation: "Recommended as the gold standard by Spring Framework and Google Guice.",
    hint: "Guarantees immutable dependencies and enables effortless unit test mocking.",
    level: "Intermediate",
    codeExample: "public Service(PaymentProcessor p) { this.p = Objects.requireNonNull(p); }"
  }
];

export default topic10_questions;