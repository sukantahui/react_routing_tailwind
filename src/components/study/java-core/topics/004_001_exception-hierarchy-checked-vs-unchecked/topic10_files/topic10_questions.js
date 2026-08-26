const topic10_questions = [
  {
    "question": "How do 'Objects.requireNonNull()' and 'Java 14 Helpful NullPointerExceptions' transform NPE debugging in enterprise Java?",
    "shortAnswer": "1. 'Objects.requireNonNull(arg, msg)' enables defensive fast-failing at constructor boundaries, ensuring errors are caught immediately where null is introduced. 2. Java 14 Helpful NPEs analyze bytecode to pinpoint the EXACT expression in a chain ('a.b.c()') that evaluated to null, eliminating guesswork.",
    "explanation": "A landmark JVM feature (JEP 358) that revolutionized production stack trace debugging.",
    "hint": "Objects.requireNonNull enforces fast-failing; Java 14 pinpoints the exact null expression in stack traces.",
    "level": "Intermediate",
    "codeExample": "this.name = Objects.requireNonNull(name, \"Name cannot be null\");"
  }
];

export default topic10_questions;