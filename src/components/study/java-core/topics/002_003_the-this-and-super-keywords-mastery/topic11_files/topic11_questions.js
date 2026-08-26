const topic11_questions = [
  {
    question: "Why must a child class constructor invoke 'super()'?",
    shortAnswer: "To initialize the inherited fields and establish invariants of the parent superclass before child class initialization begins.",
    explanation: "Because an object is a single unified entity containing both parent and child state, the parent portion must be initialized first.",
    hint: "Initializes inherited parent fields before child fields.",
    level: "Beginner",
    codeExample: "public Child(int id, String name) { super(name); this.id = id; }"
  }
];

export default topic11_questions;