const topic4_questions = [
  {
    "question": "What problem does the Factory Method pattern solve?",
    "shortAnswer": "It solves the problem of creating product objects without specifying their exact concrete classes in client code, deferring instantiation to specialized creator subclasses.",
    "explanation": "Adheres to the Open-Closed and Single Responsibility principles.",
    "hint": "Defers object instantiation to specialized creator subclasses.",
    "level": "Beginner",
    "codeExample": "public abstract Notification createNotification();"
  },
  {
    "question": "How does Factory Method differ from a Simple Static Factory?",
    "shortAnswer": "A Simple Static Factory uses a single static method with if/switch statements to instantiate classes, whereas the Factory Method pattern uses inheritance and polymorphism (abstract creator class with subclass overrides).",
    "explanation": "Factory Method allows adding new products without modifying existing creator classes.",
    "hint": "Factory Method uses subclass polymorphism rather than a static switch statement.",
    "level": "Intermediate",
    "codeExample": "Factory Method uses abstract creator class + subclass overrides."
  }
];

export default topic4_questions;
