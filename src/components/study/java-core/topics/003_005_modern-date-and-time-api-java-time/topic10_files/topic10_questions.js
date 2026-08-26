const topic10_questions = [
  {
    question: "What happens to the original 'LocalDate' instance when calling 'date.plusDays(10)'?",
    shortAnswer: "Nothing! Because 'LocalDate' is completely immutable, 'plusDays(10)' does not mutate the existing date object; it creates and returns a brand-new 'LocalDate' representing the updated calendar date.",
    explanation: "Guarantees zero side-effects in multi-threaded environments.",
    hint: "The original instance is untouched; a new instance is returned.",
    level: "Beginner",
    codeExample: "LocalDate due = today.plusDays(30); // today is unchanged"
  }
];

export default topic10_questions;