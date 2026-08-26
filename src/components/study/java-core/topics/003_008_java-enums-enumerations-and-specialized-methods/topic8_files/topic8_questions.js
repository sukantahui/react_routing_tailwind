const topic8_questions = [
  {
    "question": "What is a 'Constant-Specific Method Implementation' in Java Enums and what problem does it solve?",
    "shortAnswer": "It allows defining an abstract method in the enum and overriding it individually inside each enum constant's body. This eliminates bulky switch/if-else chains inside enum methods and guarantees compile-time enforcement that every new constant provides its own implementation.",
    "explanation": "Featured prominently in Effective Java Item 34 as the clean way to attach polymorphic behavior to enums.",
    "hint": "Declaring an abstract method in the enum and providing distinct implementations per constant.",
    "level": "Intermediate",
    "codeExample": "PLUS { public double apply(double a, double b) { return a + b; } }"
  }
];

export default topic8_questions;