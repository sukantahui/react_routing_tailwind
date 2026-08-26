const topic5_questions = [
  {
    "question": "Which of the following statements about Java Exception Handling is FALSE?",
    "shortAnswer": "Statement: 'A finally block will always execute even if System.exit(0) is called.' (This is FALSE because System.exit(0) immediately terminates the entire JVM process at the operating system level, completely bypassing finally).",
    "explanation": "System.exit(0) is one of the very few exceptions to the finally guarantee.",
    "hint": "System.exit(0) kills the JVM process immediately, skipping finally blocks.",
    "level": "Beginner",
    "codeExample": "try { System.exit(0); } finally { /* NEVER RUNS */ }"
  },
  {
    "question": "What is the result of placing 'catch (IOException e)' BEFORE 'catch (FileNotFoundException e)'?",
    "shortAnswer": "A compile-time error ('unreachable code') because FileNotFoundException is a subclass of IOException and is already caught by the first block.",
    "explanation": "Subclasses must strictly precede superclasses in multiple catch chains.",
    "hint": "Subclass catch blocks become unreachable and fail compilation.",
    "level": "Beginner",
    "codeExample": "// COMPILE ERROR: catch (IOException e) ... catch (FileNotFoundException e)"
  }
];

export default topic5_questions;