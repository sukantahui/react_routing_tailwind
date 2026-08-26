const topic3_questions = [
  {
    question: "What is Autoboxing in Java and how does the compiler translate it under the hood?",
    shortAnswer: "Autoboxing is the automatic conversion of a primitive value (e.g. 'int') into its corresponding wrapper object (e.g. 'Integer'). The compiler translates 'Integer x = 10;' into 'Integer x = Integer.valueOf(10);'.",
    explanation: "Introduced in Java 5 to eliminate tedious manual wrapping boilerplate.",
    hint: "Automatic conversion from primitive to wrapper; translated to valueOf().",
    level: "Beginner",
    codeExample: "Integer x = 50; // Compiler inserts: Integer.valueOf(50)"
  }
];

export default topic3_questions;