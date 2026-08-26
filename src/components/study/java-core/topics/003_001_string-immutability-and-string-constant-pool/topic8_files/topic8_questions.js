const topic8_questions = [
  {
    question: "What is the difference between 'String.isEmpty()' and 'String.isBlank()' (introduced in Java 11)?",
    shortAnswer: "'isEmpty()' returns true ONLY if 'length() == 0'. 'isBlank()' returns true if the string is empty OR contains only whitespace characters (spaces, tabs, newlines).",
    explanation: "'isBlank()' is essential for validating form inputs and user submissions.",
    hint: "isEmpty() checks length == 0; isBlank() checks if empty or all whitespaces.",
    level: "Beginner",
    codeExample: "\"   \".isEmpty(); // false\n\"   \".isBlank(); // true"
  }
];

export default topic8_questions;
