const topic1_questions = [
  {
    "question": "What is the threading model difference between 'java.util.regex.Pattern' and 'java.util.regex.Matcher'?",
    "shortAnswer": "'Pattern' is immutable and thread-safe; a compiled Pattern can be safely declared as 'public static final' and shared across multiple threads. 'Matcher' maintains mutable internal state (match pointers, capture groups) and is NOT thread-safe.",
    "explanation": "Always compile Patterns once as static constants, and create new Matchers per thread/request.",
    "hint": "Pattern is compiled, immutable, and thread-safe; Matcher is stateful and single-threaded.",
    "level": "Intermediate",
    "codeExample": "public static final Pattern EMAIL_PAT = Pattern.compile(\"^[A-Za-z0-9+_.-]+@(.+)$\");"
  }
];

export default topic1_questions;
