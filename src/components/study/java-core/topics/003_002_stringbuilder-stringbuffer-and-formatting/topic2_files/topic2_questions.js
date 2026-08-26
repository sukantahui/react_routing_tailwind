const topic2_questions = [
  {
    question: "When should you still consider using 'StringBuffer' over 'StringBuilder'?",
    shortAnswer: "Only when multiple concurrent threads are actively writing to and sharing the exact same string buffer instance without external synchronization. In all single-threaded code, StringBuilder is strictly preferred.",
    explanation: "Present since Java 1.0, StringBuffer uses synchronized methods.",
    hint: "Use only when a single buffer is shared across multiple concurrent writing threads.",
    level: "Intermediate",
    codeExample: "StringBuffer sbuf = new StringBuffer(); // Thread-safe synchronized buffer"
  }
];

export default topic2_questions;