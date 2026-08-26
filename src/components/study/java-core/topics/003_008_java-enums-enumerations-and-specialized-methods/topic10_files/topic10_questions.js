const topic10_questions = [
  {
    "question": "Why does Java permit Enums to implement interfaces even though they cannot extend classes?",
    "shortAnswer": "Implementing interfaces allows enums to participate in polymorphic hierarchies and the Strategy Design Pattern. It enables passing enum constants to generic APIs expecting an interface type (e.g. 'TaxStrategy'), achieving extensible behavior without violating the single-class-inheritance rule.",
    "explanation": "Effective Java Item 38: Emulate extensible enums with interfaces.",
    "hint": "Allows enums to participate polymorphically in design patterns and generic APIs.",
    "level": "Intermediate",
    "codeExample": "public enum MathOp implements BinaryOperation { ADD, SUBTRACT }"
  }
];

export default topic10_questions;