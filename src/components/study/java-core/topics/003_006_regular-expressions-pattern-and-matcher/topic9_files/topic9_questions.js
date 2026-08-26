const topic9_questions = [
  {
    "question": "What is the difference between a Capturing Group '()' and a Non-Capturing Group '(?:)' in Java regex?",
    "shortAnswer": "A Capturing Group '()' remembers the matched sub-pattern and makes it accessible via 'matcher.group(n)'. A Non-Capturing Group '(?:)' applies grouping logic (such as alternation '(?:http|https)') without storing the matched text in memory, improving performance.",
    "explanation": "Group 0 always refers to the entire matching pattern.",
    "hint": "'()' captures and saves matched text; '(?:)' groups without saving in memory.",
    "level": "Intermediate",
    "codeExample": "Pattern p = Pattern.compile(\"(?:https?://)(.+)\"); // Group 1 contains domain only"
  }
];

export default topic9_questions;
