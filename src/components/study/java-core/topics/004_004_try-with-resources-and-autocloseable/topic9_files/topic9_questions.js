const topic9_questions = [
  {
    "question": "How does 'Throwable.printStackTrace()' format and render Suppressed Exceptions in the console?",
    "shortAnswer": "'Throwable.printStackTrace()' automatically formats all suppressed exceptions beneath the primary stack trace, prefixing each suppressed exception with 'Suppressed: ...' and indenting its associated call stack, guaranteeing full diagnostic visibility without extra logging code.",
    "explanation": "Seamlessly supported across standard JDK logging tools and production APM agents.",
    "hint": "Automatically outputs 'Suppressed: ...' sections beneath the primary stack trace.",
    "level": "Intermediate",
    "codeExample": "ex.printStackTrace(); // Built-in support prints both primary and suppressed traces"
  }
];

export default topic9_questions;