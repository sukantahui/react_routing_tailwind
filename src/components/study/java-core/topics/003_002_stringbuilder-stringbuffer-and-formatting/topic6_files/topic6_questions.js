const topic6_questions = [
  {
    question: "Why do 'StringBuilder.append()' and 'insert()' return a 'StringBuilder' reference instead of 'void'?",
    shortAnswer: "They return 'this' (the current StringBuilder instance) to enable Method Chaining (the Fluent Interface Pattern), allowing developers to cascade multiple append and manipulation operations in a single readable statement.",
    explanation: "Widely used across modern Java builders (Stream API, HttpRequest, Lombok @Builder).",
    hint: "Returns 'this' to support fluent cascading method calls.",
    level: "Beginner",
    codeExample: "String sql = new StringBuilder().append(\"SELECT \").append(\"* \").toString();"
  }
];

export default topic6_questions;
