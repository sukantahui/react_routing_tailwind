const topic0_questions = [
  {
    "question": "What is a Regular Expression (Regex) in Java and what are its primary use cases?",
    "shortAnswer": "A Regular Expression is a specialized sequence of characters defining a search pattern. In Java, regex is used for: 1. Input validation (emails, phone numbers, passwords). 2. Pattern searching/token extraction from text. 3. Text sanitization and replacement (masking sensitive data).",
    "explanation": "Standardized in java.util.regex based on Perl 5 regex syntax.",
    "hint": "Pattern matching engine for validation, extraction, and sanitization.",
    "level": "Beginner",
    "codeExample": "boolean valid = input.matches(\"\\\\d{6}\"); // 6-digit PIN code"
  }
];

export default topic0_questions;
