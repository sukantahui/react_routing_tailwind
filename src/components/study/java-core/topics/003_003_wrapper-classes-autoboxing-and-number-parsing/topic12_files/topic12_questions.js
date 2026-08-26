const topic12_questions = [
  {
    question: "What are the common causes of 'java.lang.NumberFormatException' and how should it be handled defensively?",
    shortAnswer: "NumberFormatException is thrown when a string passed to a parse method is not a parsable integer (contains letters, decimals in parseInt, trailing spaces, or exceeds the min/max range of the type). Defensive code validates for null/blank and wraps parse calls in a try-catch block with a sensible fallback value.",
    explanation: "NumberFormatException is an unchecked RuntimeException (subclass of IllegalArgumentException).",
    hint: "Caused by non-numeric characters, overflow, or decimals; handled defensively via try-catch fallback.",
    level: "Intermediate",
    codeExample: "try { int val = Integer.parseInt(s); } catch (NumberFormatException e) { val = 0; }"
  }
];

export default topic12_questions;