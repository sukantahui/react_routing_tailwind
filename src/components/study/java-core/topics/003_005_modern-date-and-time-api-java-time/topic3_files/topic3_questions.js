const topic3_questions = [
  {
    question: "How do you inspect the day of the week and check for leap years using 'java.time.LocalDate'?",
    shortAnswer: "'date.getDayOfWeek()' returns a type-safe 'DayOfWeek' enum (e.g. DayOfWeek.TUESDAY). 'date.isLeapYear()' returns a boolean indicating whether the year is a leap year (366 days).",
    explanation: "Eliminates tedious manual leap year modulo arithmetic formulas.",
    hint: "Use .getDayOfWeek() and .isLeapYear() built-in inspection methods.",
    level: "Beginner",
    codeExample: "boolean leap = LocalDate.now().isLeapYear();"
  }
];

export default topic3_questions;