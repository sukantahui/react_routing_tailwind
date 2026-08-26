const topic4_questions = [
  {
    question: "What precision does 'java.time.LocalTime' maintain internally in Java?",
    shortAnswer: "'LocalTime' maintains nanosecond precision (up to 9 decimal places: HH:mm:ss.nnnnnnnnn), representing a human clock time without any attached date or timezone.",
    explanation: "Useful for store opening schedules, class timings, and alarm clocks.",
    hint: "Maintains nanosecond precision for human wall-clock time.",
    level: "Beginner",
    codeExample: "LocalTime classTime = LocalTime.of(10, 30, 0); // 10:30 AM"
  }
];

export default topic4_questions;