const topic1_questions = [
  {
    question: "What are the core design pillars of the modern 'java.time' package (JSR-310)?",
    shortAnswer: "1. Immutability & Thread Safety (all temporal classes are final and thread-safe). 2. Clear domain separation (LocalDate, LocalTime, Instant, ZonedDateTime). 3. ISO-8601 compliance. 4. Intuitive 1-indexed months and Month enums.",
    explanation: "Inspired by the popular Joda-Time open-source library created by Stephen Colebourne.",
    hint: "Immutability, domain separation (Date vs Time vs Instant), and 1-indexed months.",
    level: "Beginner",
    codeExample: "LocalDate d = LocalDate.of(2026, Month.AUGUST, 26);"
  }
];

export default topic1_questions;