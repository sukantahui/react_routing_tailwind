const topic13_questions = [
  {
    "question": "What is the primary focus of Behavioral design patterns?",
    "shortAnswer": "Behavioral patterns focus on algorithms, the assignment of responsibilities among objects, and the patterns of communication between collaborating classes.",
    "explanation": "Managing runtime interaction protocols.",
    "hint": "Algorithms, responsibility assignment, and communication flows between objects.",
    "level": "Beginner",
    "codeExample": "Strategy, Observer, Command, Chain of Responsibility, Template Method."
  },
  {
    "question": "How did Java 8 Functional Interfaces simplify classic Behavioral design patterns?",
    "shortAnswer": "They eliminated the need for boilerplate single-method abstract classes and anonymous inner classes; patterns like Strategy and Command can now be written inline using concise lambda expressions and method references.",
    "explanation": "Modern functional Java replaces verbose GoF boilerplate.",
    "hint": "Replaces verbose inner classes with concise lambdas and method references.",
    "level": "Intermediate",
    "codeExample": "Comparator.comparing(Student::score); // Inline Strategy Pattern"
  }
];

export default topic13_questions;
