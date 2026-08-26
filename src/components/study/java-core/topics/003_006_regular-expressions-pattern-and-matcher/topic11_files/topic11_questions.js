const topic11_questions = [
  {
    "question": "What is the critical behavioral difference between 'matcher.matches()' and 'matcher.find()'?",
    "shortAnswer": "'matcher.matches()' requires the ENTIRE input string to match the pattern from start to finish. 'matcher.find()' searches for the NEXT occurrence of a matching substring anywhere within the text without requiring the whole string to match.",
    "explanation": "If you call matches(), you must call matcher.reset() before using find().",
    "hint": "matches() validates the whole string; find() searches for substring matches.",
    "level": "Beginner",
    "codeExample": "boolean fullMatch = m.matches(); // Whole string\nboolean subMatch = m.find(); // Substring search"
  }
];

export default topic11_questions;
