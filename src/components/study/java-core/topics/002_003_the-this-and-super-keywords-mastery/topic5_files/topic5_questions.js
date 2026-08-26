const topic5_questions = [
  {
    question: "Why pass 'this' as an argument into another object's constructor?",
    shortAnswer: "To establish a bi-directional association or parent-child relationship (e.g. a Ledger holding a reference back to its Student owner).",
    explanation: "When an object instantiates its own helper component, passing 'this' allows the helper to maintain a back-reference to its creator.",
    hint: "Establishes bi-directional parent-child association.",
    level: "Intermediate",
    codeExample: "this.ledger = new Ledger(this);"
  }
];

export default topic5_questions;