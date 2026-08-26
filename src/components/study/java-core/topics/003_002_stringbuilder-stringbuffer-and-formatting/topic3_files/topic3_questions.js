const topic3_questions = [
  {
    question: "Summarize the differences between String, StringBuilder, and StringBuffer in Java.",
    shortAnswer: "1. String: Immutable, thread-safe, uses Constant Pool. 2. StringBuilder: Mutable, NOT thread-safe, fastest performance (Java 5). 3. StringBuffer: Mutable, thread-safe (synchronized), slower performance (Java 1.0).",
    explanation: "This 3-way showdown is one of the top 5 most frequently asked Java interview questions.",
    hint: "String (immutable), StringBuilder (mutable, unsynchronized, fast), StringBuffer (mutable, synchronized).",
    level: "Beginner",
    codeExample: "// String (constant) vs StringBuilder (fast loop) vs StringBuffer (thread safe)"
  }
];

export default topic3_questions;