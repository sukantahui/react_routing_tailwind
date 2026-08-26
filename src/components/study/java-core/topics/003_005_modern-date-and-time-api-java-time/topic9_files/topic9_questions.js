const topic9_questions = [
  {
    question: "What format does 'LocalDate.parse(str)' expect by default in Java?",
    shortAnswer: "It expects the standard ISO-8601 calendar date format: 'YYYY-MM-DD' (e.g. '2026-08-26'). If the string violates this format (e.g. '26/08/2026'), it throws 'DateTimeParseException' unless a custom DateTimeFormatter is supplied.",
    explanation: "ISO-8601 is the default across all java.time parse methods.",
    hint: "Expects standard ISO-8601 format: YYYY-MM-DD.",
    level: "Beginner",
    codeExample: "LocalDate date = LocalDate.parse(\"2026-08-26\"); // ISO-8601"
  }
];

export default topic9_questions;
