const topic10_questions = [
  {
    "question": "How do Backreferences (like '\\1') work in regular expressions and what is '$1' in replacement strings?",
    "shortAnswer": "Inside the regex pattern, '\\1' refers to the exact text captured by the first capturing group '()', allowing detection of duplicate words (e.g. '(\\b\\w+)\\s+\\1'). In replacement strings (e.g. 'replaceAll(\"$1\")'), '$1' inserts the text captured by Group 1.",
    "explanation": "Backreferences dynamically match the evaluated content, not just the pattern structure.",
    "hint": "\\1 matches captured group text inside pattern; $1 inserts captured text during replacement.",
    "level": "Intermediate",
    "codeExample": "str.replaceAll(\"(\\\\b\\\\w+)\\\\s+\\\\1\", \"$1\"); // Removes duplicate words"
  }
];

export default topic10_questions;
