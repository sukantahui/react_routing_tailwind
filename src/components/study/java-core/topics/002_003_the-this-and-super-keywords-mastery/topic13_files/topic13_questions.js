const topic13_questions = [
  {
    question: "What is the primary syntax rule for 'super()' constructor invocation in Java?",
    shortAnswer: "'super(...)' MUST be the very first executable statement in the subclass constructor body.",
    explanation: "Any code before 'super()' causes a compile error: 'call to super must be first statement in constructor'.",
    hint: "super() must be on line 1.",
    level: "Beginner",
    codeExample: "public Child(int id) { super(id); this.flag = true; }"
  }
];

export default topic13_questions;