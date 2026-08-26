const topic0_questions = [
  {
    question: "Why are mutable string builders (StringBuilder/StringBuffer) essential in Java backend development?",
    shortAnswer: "Because Java Strings are immutable, concatenating strings creates temporary intermediate objects on the Heap. Mutable builders maintain a resizable internal buffer that mutates characters in-place, eliminating GC garbage pressure.",
    explanation: "Essential for building complex JSON payloads, HTML reports, and SQL queries.",
    hint: "Mutates characters in-place inside an internal buffer without creating intermediate garbage.",
    level: "Beginner",
    codeExample: "StringBuilder sb = new StringBuilder(); sb.append(\"data\");"
  }
];

export default topic0_questions;