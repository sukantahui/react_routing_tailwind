const topic8_questions = [
  {
    "question": "Why should developers always use 'StandardCharsets.UTF_8' instead of the string literal '\"UTF-8\"' in Java I/O?",
    "shortAnswer": "1. 'StandardCharsets.UTF_8' is a pre-initialized static constant of type 'Charset', eliminating expensive runtime 'Charset.forName(\"UTF-8\")' string lookups. 2. It avoids typos ('utf8', 'UTF8') at compile time. 3. It avoids throwing the checked 'UnsupportedEncodingException' that string-based constructors declare.",
    "explanation": "Standard practice in modern Java 7+ and enterprise codebases.",
    "hint": "Compile-time type safety, zero Charset.forName() lookup overhead, and no UnsupportedEncodingException.",
    "level": "Beginner",
    "codeExample": "new InputStreamReader(is, StandardCharsets.UTF_8); // Clean and fast"
  }
];

export default topic8_questions;