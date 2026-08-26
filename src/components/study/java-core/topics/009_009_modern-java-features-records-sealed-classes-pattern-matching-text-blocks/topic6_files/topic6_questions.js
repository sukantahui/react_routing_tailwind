const topic6_questions = [
  {
    "question": "What is the primary architectural purpose of Sealed Classes in Java 17+?",
    "shortAnswer": "To restrict which specific classes or interfaces can extend or implement a type, enabling domain modeling of closed type hierarchies and allowing the compiler to perform exhaustiveness checking in switch expressions.",
    "explanation": "Prevents arbitrary external subclasses.",
    "hint": "Restricts subclassing to an explicit permitted whitelist.",
    "level": "Intermediate",
    "codeExample": "public sealed interface Result permits Success, Failure {}"
  },
  {
    "question": "Can an unauthorized third-party class in another package extend a sealed class?",
    "shortAnswer": "No! The compiler enforces that all permitted subclasses must be declared in the permits clause and must reside in the same module or package as the sealed class.",
    "explanation": "Guarantees domain boundary integrity at compile time.",
    "hint": "No, compilation fails if the class is not explicitly permitted.",
    "level": "Beginner",
    "codeExample": "class Unauthorized extends SealedClass // COMPILE ERROR!"
  }
];

export default topic6_questions;
