const topic11_questions = [
  {
    question: "What is 'java.time.Period' used for in Java?",
    shortAnswer: "'Period' represents a date-based amount of time measured in Years, Months, and Days. It is used with 'LocalDate' to compute human-scale age, project deadlines, and contract terms (e.g. 'Period.between(dob, today)').",
    explanation: "For time-based units (hours, minutes, seconds), use Duration instead.",
    hint: "Measures date-based intervals in Years, Months, and Days.",
    level: "Beginner",
    codeExample: "Period age = Period.between(birthDate, LocalDate.now());"
  }
];

export default topic11_questions;