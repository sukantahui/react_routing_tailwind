const topic4_questions = [
  {
    "question": "What characters are matched by the '\\w' meta-character in Java regular expressions?",
    "shortAnswer": "'\\w' matches any 'word character': English letters (a-z, A-Z), numeric digits (0-9), and the underscore character ('_') — equivalent to the character class '[a-zA-Z_0-9]'.",
    "explanation": "'\\W' (uppercase) matches any character that is NOT a word character.",
    "hint": "Matches letters, digits, and underscores ([a-zA-Z_0-9]).",
    "level": "Beginner",
    "codeExample": "boolean isUsername = input.matches(\"\\\\w{5,15}\"); // Alphanumeric + underscore"
  }
];

export default topic4_questions;
