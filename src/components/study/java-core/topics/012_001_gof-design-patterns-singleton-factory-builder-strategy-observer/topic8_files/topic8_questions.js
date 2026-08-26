const topic8_questions = [
  {
    "question": "What is the primary benefit of using object composition over class inheritance in structural patterns?",
    "shortAnswer": "Composition allows component behaviors to be dynamically swapped and configured at runtime, avoids fragile base class hierarchies, and adheres to the Single Responsibility Principle.",
    "explanation": "Core structural pattern principle.",
    "hint": "Dynamic runtime flexibility without fragile inheritance trees.",
    "level": "Beginner",
    "codeExample": "Composition (has-a) vs Inheritance (is-a)."
  },
  {
    "question": "Which structural pattern is standard for wrapping 3rd-party legacy libraries to match your new application interfaces?",
    "shortAnswer": "The Adapter Pattern.",
    "explanation": "Translates one interface into another.",
    "hint": "The Adapter Pattern.",
    "level": "Beginner",
    "codeExample": "PaymentAdapter implements ModernPaymentGateway { ... }"
  }
];

export default topic8_questions;
