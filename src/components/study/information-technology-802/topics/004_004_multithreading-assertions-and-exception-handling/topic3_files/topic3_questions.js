const questions = [
  {
    id: 1,
    question: "What is the primary purpose of the 'assert' keyword in Java?",
    options: [
      "To test internal assumptions and programmatic invariants during development and debugging",
      "To handle network failure exceptions automatically",
      "To encrypt database passwords securely in memory",
      "To guarantee faster loop iteration speeds in production"
    ],
    correctAnswer: 0,
    explanation: "The `assert` keyword in Java is designed for testing assumptions (invariants) during development and debugging. If an assertion condition evaluates to false, an AssertionError is thrown.",
    marks: 1,
    hint: "Think about verifying assumptions and invariants during development/testing."
  },
  {
    id: 2,
    question: "What are the two syntactic forms of assertion statements in Java?",
    options: [
      "1. assert boolean_expression; 2. assert boolean_expression : detail_message;",
      "1. assert(boolean_expression); 2. assert.throw(message);",
      "1. if (assert) { ... }; 2. while (assert) { ... };",
      "1. try assert; 2. catch assert;"
    ],
    correctAnswer: 0,
    explanation: "Java assertions have two syntax forms: (1) Simple form: `assert expression;` and (2) Augmented form with an error message: `assert expression : \"Message\";`.",
    marks: 1,
    hint: "Simple form with boolean condition, and augmented form with a colon (:) and detail expression."
  },
  {
    id: 3,
    question: "What type of error is thrown by the JVM when an assertion fails (evaluates to false)?",
    options: [
      "java.lang.AssertionError",
      "java.lang.NullPointerException",
      "java.lang.ArithmeticException",
      "java.lang.IllegalArgumentException"
    ],
    correctAnswer: 0,
    explanation: "When an assertion condition evaluates to false (and assertions are enabled), the JVM throws a `java.lang.AssertionError`.",
    marks: 1,
    hint: "An Error class subclass that represents assertion failures."
  },
  {
    id: 4,
    question: "Which of the following is considered an INVALID use of assertions in Java?",
    options: [
      "Validating public method arguments instead of using standard IllegalArgumentException checks",
      "Checking internal class invariants that should never be false",
      "Verifying post-conditions at the end of a private calculation method",
      "Checking unreachable code branches in default switch cases"
    ],
    correctAnswer: 0,
    explanation: "Assertions should NEVER be used for validating arguments of public methods because assertions might be disabled in production, which would silently bypass the validation.",
    marks: 1,
    hint: "Assertions can be disabled at runtime, so public API contracts must use standard exceptions."
  },
  {
    id: 5,
    question: "In the statement `assert balance >= 0 : \"Balance cannot be negative!\";`, what is the role of the string after the colon (:)?",
    options: [
      "It is passed as the detail message parameter to the AssertionError constructor if the condition is false",
      "It is printed to the console only if balance is positive",
      "It resets the balance to 0 automatically",
      "It creates a new log file on the hard drive"
    ],
    correctAnswer: 0,
    explanation: "The expression following the colon in an assertion statement is evaluated and converted to a String that is passed to the `AssertionError` constructor when the assertion fails.",
    marks: 1,
    hint: "The detail message accompanying the AssertionError."
  }
];

export default questions;
