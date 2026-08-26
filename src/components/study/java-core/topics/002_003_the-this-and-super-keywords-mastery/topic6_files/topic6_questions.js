const topic6_questions = [
  {
    question: "What is the Fluent Interface Pattern and how does 'return this' enable it?",
    shortAnswer: "A design pattern where methods return 'this' (the current object reference), allowing callers to chain method calls sequentially like 'obj.setA().setB().setC()'.",
    explanation: "Returning 'this' provides an expressive, readable API commonly used in Builders, StringBuilder, and Streams.",
    hint: "Methods return 'this' to allow sequential dot operator chaining.",
    level: "Beginner",
    codeExample: "public Builder setName(String n) { this.name = n; return this; }"
  }
];

export default topic6_questions;