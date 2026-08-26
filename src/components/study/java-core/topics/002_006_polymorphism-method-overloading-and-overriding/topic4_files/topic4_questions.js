const topic4_questions = [
  {
    question: "What are the two primary benefits of using the '@Override' annotation in Java?",
    shortAnswer: "1. Compiler Safety: Catches typos and signature mismatches at compile time rather than silently creating an accidental overload. 2. Readability: Explicitly signals to team members that this method overrides a superclass contract.",
    explanation: "If the superclass method changes or has a typo, @Override generates an immediate compilation failure.",
    hint: "Catches signature typos at compile time and improves code readability.",
    level: "Beginner",
    codeExample: "@Override public void execute() {}"
  }
];

export default topic4_questions;