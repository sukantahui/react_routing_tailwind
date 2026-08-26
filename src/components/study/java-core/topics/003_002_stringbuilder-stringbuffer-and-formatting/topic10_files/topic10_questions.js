const topic10_questions = [
  {
    question: "What does the '.formatted(...)' instance method do on modern Java Strings and Text Blocks?",
    shortAnswer: "The '.formatted(...)' method (introduced in Java 15) is an instance method equivalent to 'String.format(this, args)', allowing clean, readable inline string formatting directly on text blocks and templates.",
    explanation: "Greatly simplifies string interpolation in Java 15+.",
    hint: "Instance method shorthand for String.format() on text blocks.",
    level: "Intermediate",
    codeExample: "String json = \"\"\"{\\\"id\\\": %d}\"\"\".formatted(42);"
  }
];

export default topic10_questions;
