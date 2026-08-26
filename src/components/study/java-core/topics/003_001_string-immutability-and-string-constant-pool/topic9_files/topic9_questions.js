const topic9_questions = [
  {
    question: "What is the difference between 'trim()' and 'strip()' (introduced in Java 11)?",
    shortAnswer: "'trim()' removes only ASCII characters with code point <= 32 (standard space, tab, newline). 'strip()' is Unicode-aware and removes ALL universal Unicode whitespace characters according to Character.isWhitespace().",
    explanation: "'strip()' is the modern replacement for 'trim()' in modern Java applications.",
    hint: "trim() is legacy ASCII; strip() is modern Unicode-compliant whitespace stripping.",
    level: "Intermediate",
    codeExample: "String clean = raw.strip(); // Modern Unicode whitespace removal"
  }
];

export default topic9_questions;