const topic1_questions = [
  {
    question: "Why was 'StringBuilder' introduced in Java 5 alongside the existing 'StringBuffer'?",
    shortAnswer: "'StringBuilder' was introduced to provide an unsynchronized (non-thread-safe) alternative to StringBuffer. Because 99% of string construction happens locally within a single method, removing synchronization overhead made StringBuilder significantly faster.",
    explanation: "StringBuilder is the default choice for single-threaded string assembly.",
    hint: "Introduced in Java 5 as a faster, unsynchronized replacement for StringBuffer in single threads.",
    level: "Beginner",
    codeExample: "StringBuilder sb = new StringBuilder(); // Fast & unsynchronized"
  }
];

export default topic1_questions;