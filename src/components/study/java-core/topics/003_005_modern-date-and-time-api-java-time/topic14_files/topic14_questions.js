const topic14_questions = [
  {
    question: "Why is 'java.time.format.DateTimeFormatter' superior to legacy 'java.text.SimpleDateFormat'?",
    shortAnswer: "'DateTimeFormatter' is completely immutable and thread-safe. It can be safely declared as a 'public static final' constant and shared across thousands of concurrent threads without synchronization or ThreadLocal wrappers, whereas SimpleDateFormat corrupted state during concurrent access.",
    explanation: "Standard practice in Spring Boot controllers and microservice formatters.",
    hint: "Immutable and thread-safe; can be safely stored in static final constants.",
    level: "Beginner",
    codeExample: "public static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern(\"dd/MM/yyyy\");"
  }
];

export default topic14_questions;
