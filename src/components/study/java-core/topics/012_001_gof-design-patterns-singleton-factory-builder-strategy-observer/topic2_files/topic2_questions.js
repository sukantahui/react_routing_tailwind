const topic2_questions = [
  {
    "question": "Why is hardcoding the 'new' keyword across application classes considered an anti-pattern in large enterprise systems?",
    "shortAnswer": "Because it tightly couples client classes to concrete implementations, preventing runtime polymorphism, dependency injection, mocking in unit tests, and dynamic configuration swapping.",
    "explanation": "Violates the Open-Closed Principle and Dependency Inversion Principle.",
    "hint": "Couples code to concrete classes, making mocking and swapping impossible.",
    "level": "Intermediate",
    "codeExample": "Bad: Service s = new HeavyServiceImpl(); Good: Service s = factory.create();"
  },
  {
    "question": "Which creational pattern is ideal for constructing complex immutable objects with 10+ optional parameters?",
    "shortAnswer": "The Builder Pattern.",
    "explanation": "Provides readable fluent method chaining and enforces immutability.",
    "hint": "The Builder Pattern.",
    "level": "Beginner",
    "codeExample": "Student s = Student.builder().name(\"Swadeep\").score(95.0).build();"
  }
];

export default topic2_questions;
