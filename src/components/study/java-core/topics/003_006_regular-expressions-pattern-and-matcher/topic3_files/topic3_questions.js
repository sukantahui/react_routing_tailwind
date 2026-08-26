const topic3_questions = [
  {
    "question": "What does the 'Pattern.DOTALL' flag do in Java regular expressions?",
    "shortAnswer": "By default, the dot meta-character ('.') matches any character EXCEPT newline terminators (\\n, \\r). Enabling 'Pattern.DOTALL' (or inline flag '(?s)') makes '.' match absolutely any character including newlines, allowing cross-line multi-line matching.",
    "explanation": "Combine flags using bitwise OR: Pattern.CASE_INSENSITIVE | Pattern.DOTALL.",
    "hint": "Allows the dot '.' meta-character to match newlines across multi-line text.",
    "level": "Intermediate",
    "codeExample": "Pattern p = Pattern.compile(\"<div>.*</div>\", Pattern.DOTALL);"
  }
];

export default topic3_questions;
