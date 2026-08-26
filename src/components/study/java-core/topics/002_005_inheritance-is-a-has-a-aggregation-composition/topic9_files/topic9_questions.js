const topic9_questions = [
  {
    question: "What is the fundamental difference between an IS-A relationship and a HAS-A relationship in Java?",
    shortAnswer: "IS-A represents Inheritance ('extends') where a child is a specialized subtype of the parent (e.g. Dog IS-A Animal). HAS-A represents Association/Composition where an object contains a reference to another object (e.g. Car HAS-A Engine).",
    explanation: "IS-A binds classes tightly at compile time. HAS-A provides loose coupling and dynamic runtime flexibility.",
    hint: "IS-A = Inheritance ('extends'); HAS-A = Association (holding object references).",
    level: "Beginner",
    codeExample: "class Car extends Vehicle { Engine engine; } // Car IS-A Vehicle; Car HAS-A Engine"
  }
];

export default topic9_questions;