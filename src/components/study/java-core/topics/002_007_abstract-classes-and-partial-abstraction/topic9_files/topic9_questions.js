const topic9_questions = [
  {
    question: "What is the compiler requirement when a concrete class extends an abstract superclass?",
    shortAnswer: "The concrete subclass MUST implement every single abstract method inherited from the abstract superclass (and any ancestor abstract classes), or else the subclass itself must be marked 'abstract'.",
    explanation: "This guarantees that by the time an object is instantiated, every method in its type hierarchy has an executable body.",
    hint: "Subclass must override all abstract methods or be declared abstract itself.",
    level: "Beginner",
    codeExample: "class Concrete extends AbstractBase { @Override void m() {} }"
  }
];

export default topic9_questions;