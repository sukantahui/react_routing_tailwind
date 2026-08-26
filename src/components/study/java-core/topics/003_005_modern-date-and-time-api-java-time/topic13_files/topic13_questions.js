const topic13_questions = [
  {
    question: "Why is 'ChronoUnit.DAYS.between(d1, d2)' preferred over 'Period.between(d1, d2).getDays()' when calculating total elapsed days?",
    shortAnswer: "'Period.between(d1, d2).getDays()' returns ONLY the residual day component after extracting full years and months (e.g. 1 year 2 months 5 days returns 5, NOT 430!). 'ChronoUnit.DAYS.between(d1, d2)' calculates the complete, total number of elapsed days.",
    explanation: "This is one of the most widespread bugs in date calculation code.",
    hint: "Period.getDays() returns the remaining days after months/years; ChronoUnit returns total count.",
    level: "Intermediate",
    codeExample: "long totalDays = ChronoUnit.DAYS.between(start, end); // Exact total days"
  }
];

export default topic13_questions;