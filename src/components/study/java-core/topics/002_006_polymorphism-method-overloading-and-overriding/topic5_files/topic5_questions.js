const topic5_questions = [
  {
    question: "What is the access modifier rule when overriding a method in Java?",
    shortAnswer: "An overriding method in a subclass CANNOT assign stricter (weaker/narrower) access privileges, but CAN maintain the same or provide broader (wider) access.",
    explanation: "If parent is protected, child can be protected or public (cannot be default or private). This preserves the Liskov Substitution Principle.",
    hint: "Child can widen or keep same access; child CANNOT narrow access.",
    level: "Intermediate",
    codeExample: "// Parent: protected void show()\n// Child: public void show() // Valid!"
  }
];

export default topic5_questions;