const topic2_questions = [
  {
    "question": "What is the purpose of the 'throws' keyword in a Java method signature?",
    "shortAnswer": "The 'throws' keyword is part of the method's public API contract. It declares the list of Checked Exceptions that the method might propagate to its callers, alerting the compiler and caller developers to prepare appropriate 'try-catch' handling.",
    "explanation": "Multiple exceptions are separated by commas (e.g. throws IOException, SQLException).",
    "hint": "Declares checked exceptions in method header as part of the public contract.",
    "level": "Beginner",
    "codeExample": "public void process() throws IOException, SQLException { ... }"
  }
];

export default topic2_questions;