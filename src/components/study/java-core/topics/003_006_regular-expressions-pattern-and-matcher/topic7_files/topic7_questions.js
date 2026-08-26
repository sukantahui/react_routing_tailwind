const topic7_questions = [
  {
    "question": "What is the difference between Greedy ('*') and Reluctant/Lazy ('*?') quantifiers in regex?",
    "shortAnswer": "A Greedy quantifier ('*') reads the entire text first and backtracks backwards to find the longest possible match (swallowing intermediate tags). A Reluctant quantifier ('*?') matches as few characters as possible, stopping at the earliest occurrence.",
    "explanation": "Always use reluctant quantifiers ('.*?') when parsing delimited HTML tags or quotes.",
    "hint": "Greedy finds the longest possible match; Reluctant finds the shortest match.",
    "level": "Intermediate",
    "codeExample": "Pattern lazy = Pattern.compile(\"<b>.*?</b>\"); // Matches individual tags"
  }
];

export default topic7_questions;
