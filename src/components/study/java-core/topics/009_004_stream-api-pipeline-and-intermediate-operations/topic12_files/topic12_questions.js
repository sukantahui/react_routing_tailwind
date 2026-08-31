const topic12_questions = [
  {
    "question": "What is the return type of the lambda expression passed into Stream.filter()?",
    "shortAnswer": "The lambda must conform to java.util.function.Predicate<T> and therefore must return a boolean (primitive boolean or boxed Boolean that unboxes to boolean).",
    "explanation": "Returning true keeps the element in the pipeline; returning false discards it.",
    "hint": "Must return boolean.",
    "level": "Beginner",
    "codeExample": "stream.filter(s → s.length() > 5) // returns boolean"
  },
  {
    "question": "Is chaining two filter() calls slower than combining them with the && operator?",
    "shortAnswer": "No. Because of stream loop fusion, chaining two filter() calls does not create intermediate lists; both predicates are evaluated sequentially in the same pass per element.",
    "explanation": "Chaining often improves code readability without any measurable performance penalty.",
    "hint": "Loop fusion evaluates chained filters in the same single traversal pass.",
    "level": "Intermediate",
    "codeExample": "stream.filter(Student::isActive).filter(s → s.getScore() > 80)"
  }
];

export default topic12_questions;
