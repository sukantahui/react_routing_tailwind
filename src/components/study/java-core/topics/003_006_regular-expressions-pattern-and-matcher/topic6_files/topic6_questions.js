const topic6_questions = [
  {
    "question": "What does the '^' caret symbol mean when placed as the FIRST character inside square brackets '[^0-9]'?",
    "shortAnswer": "Inside square brackets, '^' at the beginning acts as a NEGATION operator, matching any character that is NOT in the specified set (e.g. '[^0-9]' matches any non-digit). Outside square brackets, '^' matches the start of a line.",
    "explanation": "Position dictates meaning: inside [] it negates; outside [] it anchors start of line.",
    "hint": "Inside brackets it acts as negation; outside brackets it anchors line start.",
    "level": "Beginner",
    "codeExample": "Pattern nonVowels = Pattern.compile(\"[^aeiouAEIOU]\");"
  }
];

export default topic6_questions;
