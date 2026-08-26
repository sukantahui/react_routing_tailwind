const topic5_questions = [
  {
    question: "How do you combine a 'LocalDate' and 'LocalTime' into a 'LocalDateTime' in Java?",
    shortAnswer: "You can either use the factory method 'LocalDateTime.of(date, time)' or the fluent method 'date.atTime(time)' or 'time.atDate(date)'.",
    explanation: "Provides seamless bi-directional composition and decomposition.",
    hint: "Use LocalDateTime.of(date, time) or date.atTime(time).",
    level: "Beginner",
    codeExample: "LocalDateTime dt = date.atTime(10, 30);"
  }
];

export default topic5_questions;