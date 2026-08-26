const topic7_questions = [
  {
    question: "Why should you use '%n' instead of '\\n' inside 'String.format()' and 'System.out.printf()'?",
    shortAnswer: "'%n' produces the correct platform-specific newline character (\\r\\n on Windows, \\n on Linux/macOS), ensuring consistent multi-line formatting across all operating systems.",
    explanation: "'%n' is portable and cross-platform.",
    hint: "Produces platform-independent newline characters across Windows and Linux.",
    level: "Beginner",
    codeExample: "String.format(\"Line 1%nLine 2\"); // Cross-platform newline"
  }
];

export default topic7_questions;
