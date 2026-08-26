const topic4_questions = [
  {
    "question": "When is orElse(value) the most appropriate choice for extracting an Optional?",
    "shortAnswer": "When the fallback value is an already existing primitive, string literal, or static constant that requires zero computation or database access.",
    "explanation": "Cheap constants are ideal for orElse().",
    "hint": "When the fallback value is a cheap literal or existing constant.",
    "level": "Beginner",
    "codeExample": "String status = opt.orElse('ACTIVE');"
  },
  {
    "question": "Is the argument expression passed into orElse() evaluated if the Optional contains a value?",
    "shortAnswer": "Yes! Because Java evaluates method parameters eagerly before invoking the method, whatever is passed inside orElse(compute()) will be computed every time, even if the result is thrown away.",
    "explanation": "To avoid eager execution of heavy methods, use orElseGet() with a lambda Supplier.",
    "hint": "Yes, arguments in method calls are evaluated eagerly in Java.",
    "level": "Intermediate",
    "codeExample": "opt.orElse(heavyDatabaseQuery()); // heavyDatabaseQuery() runs EVERY TIME!"
  }
];

export default topic4_questions;
