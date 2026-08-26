const topic2_questions = [
  {
    question: "When should an enterprise application choose 'LocalDate' over 'LocalDateTime' or 'Instant'?",
    shortAnswer: "Use 'LocalDate' when the time of day and timezone are irrelevant to the business concept—such as a student's Date of Birth (DOB), a national holiday (Republic Day), or an invoice billing date.",
    explanation: "Selecting the narrowest temporal class prevents timezone conversion bugs.",
    hint: "Use LocalDate when time of day and timezone are irrelevant (e.g. Birthdays, Holidays).",
    level: "Beginner",
    codeExample: "LocalDate dob = LocalDate.of(2003, Month.MARCH, 15);"
  }
];

export default topic2_questions;