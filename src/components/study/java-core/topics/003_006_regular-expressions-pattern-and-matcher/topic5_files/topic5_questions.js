const topic5_questions = [
  {
    "question": "Why do Java regular expressions require double backslashes (e.g. \"\\\\d\" instead of \"\\d\") in string literals?",
    "shortAnswer": "Because the backslash '\\' is an escape character for the Java compiler itself. The first backslash escapes the second backslash so that a single literal backslash character is embedded into the string in memory. When the Regex engine receives '\\d' in memory, it interprets it as the digit meta-character.",
    "explanation": "To match a literal backslash in regex, you need 4 backslashes: \"\\\\\\\\\".",
    "hint": "The Java compiler consumes the first backslash to produce a literal backslash for the regex engine.",
    "level": "Beginner",
    "codeExample": "Pattern.compile(\"\\\\d+\"); // Produces \\d in memory for the regex engine"
  }
];

export default topic5_questions;
