const topic12_questions = [
  {
    question: "When does the Java compiler automatically insert 'super()' into a constructor?",
    shortAnswer: "Whenever a constructor contains neither an explicit 'this(...)' call nor an explicit 'super(...)' call as its first statement.",
    explanation: "The compiler injects a zero-argument 'super();' call on line 1 to initialize the superclass.",
    hint: "Automatically injected when neither this() nor super() is written on line 1.",
    level: "Beginner",
    codeExample: "public Child() { /* Compiler injects super(); here */ }"
  }
];

export default topic12_questions;