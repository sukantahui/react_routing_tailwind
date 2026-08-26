const topic6_questions = [
  {
    "question": "What was JEP 400 in Java 18 and why was it one of the most critical I/O milestones in Java history?",
    "shortAnswer": "JEP 400 (Java 18) made 'UTF-8 by Default' standard across the entire Java platform on all operating systems. Prior to Java 18, methods like 'FileReader' or 'String.getBytes()' used the host OS default charset (windows-1252 on Windows, UTF-8 on Linux), which caused rampant silent cross-platform file corruption bugs.",
    "explanation": "Eliminates platform-dependent encoding behavior permanently across Java runtimes.",
    "hint": "Standardized UTF-8 as the default charset across all operating systems in Java 18.",
    "level": "Intermediate",
    "codeExample": "Charset c = Charset.defaultCharset(); // Guaranteed UTF-8 in Java 18+"
  }
];

export default topic6_questions;