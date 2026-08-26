const topic8_questions = [
  {
    "question": "What is the purpose of the '\\b' word boundary anchor in Java regular expressions?",
    "shortAnswer": "'\\b' matches a zero-width word boundary position between a word character ('\\w') and a non-word character ('\\W' or start/end of string). It ensures search patterns match whole discrete words rather than substrings embedded inside longer identifiers.",
    "explanation": "Essential for exact keyword search in IDEs and text editors.",
    "hint": "Matches zero-width boundaries between words and whitespace/punctuation.",
    "level": "Beginner",
    "codeExample": "Pattern.compile(\"\\\\bcat\\\\b\"); // Matches 'cat', ignores 'category' or 'bobcat'"
  }
];

export default topic8_questions;
