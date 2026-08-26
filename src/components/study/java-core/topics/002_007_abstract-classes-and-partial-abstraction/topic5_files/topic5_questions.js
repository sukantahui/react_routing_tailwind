const topic5_questions = [
  {
    question: "Why does Java allow concrete (fully implemented) methods inside abstract classes?",
    shortAnswer: "To provide shared default logic across all subclasses, eliminating code duplication while still allowing abstract methods to enforce specialized behavior.",
    explanation: "This creates the foundation for Template Method and partial abstraction designs.",
    hint: "Allows code reuse for shared logic while mandating customization for abstract methods.",
    level: "Beginner",
    codeExample: "abstract class Base { void shared() {} abstract void custom(); }"
  }
];

export default topic5_questions;