const topic17_questions = [
  {
    question: "What role does the constructor play in forging an Immutable Class in Java?",
    shortAnswer: "The constructor performs atomic validation, initializes all 'final' fields, and performs defensive copying of mutable arguments before publishing the object.",
    explanation: "Because immutable classes have no setters, the constructor is the sole opportunity to configure object state.",
    hint: "Atomic initialization of all final fields and defensive copying.",
    level: "Intermediate",
    codeExample: "public final class Point { private final int x; public Point(int x) { this.x = x; } }"
  },
  {
    question: "What is the 'this reference escape' trap in constructors, and why is it dangerous for immutability?",
    shortAnswer: "Passing 'this' to an outside thread, listener, or static collection inside the constructor before the constructor finishes executing.",
    explanation: "Other threads may see partially initialized final fields, destroying thread-safety guarantees of the Java Memory Model.",
    hint: "Never publish 'this' to other threads inside the constructor.",
    level: "Advanced",
    codeExample: "// Anti-pattern: EventManager.register(this); // Inside constructor"
  }
];

export default topic17_questions;