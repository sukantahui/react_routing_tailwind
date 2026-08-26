const topic10_questions = [
  {
    question: "What is the key difference between 'String.replace()' and 'String.replaceAll()' in Java?",
    shortAnswer: "'replace(target, replacement)' replaces exact literal substrings without interpreting regular expressions. 'replaceAll(regex, replacement)' interprets the first argument as a regular expression pattern.",
    explanation: "Both replace ALL occurrences, but replaceAll parses regex syntax.",
    hint: "replace() is literal; replaceAll() takes a regular expression.",
    level: "Beginner",
    codeExample: "str.replace(\".\", \"/\"); // Replaces literal dots\nstr.replaceAll(\".\", \"/\"); // Regex: replaces EVERY character!"
  }
];

export default topic10_questions;
