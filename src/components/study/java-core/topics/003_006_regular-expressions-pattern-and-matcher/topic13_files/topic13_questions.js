const topic13_questions = [
  {
    "question": "What is the standard regular expression for validating an Indian Mobile Number with optional '+91' country code?",
    "shortAnswer": "'^(\\+91)?[6-9]\\d{9}$'. This pattern allows an optional '+91' prefix, mandates that the first subscriber digit is 6, 7, 8, or 9, followed by exactly 9 more decimal digits (total 10 subscriber digits).",
    "explanation": "Widely used across Indian fintech, banking, and telecom verification gates.",
    "hint": "Starts with optional +91, first digit 6-9, followed by 9 digits.",
    "level": "Intermediate",
    "codeExample": "boolean valid = phone.matches(\"^(\\\\+91)?[6-9]\\\\d{9}$\");"
  }
];

export default topic13_questions;
