const topic5_questions = [
  {
    "question": "What happens if both try and finally blocks execute a return statement?",
    "shortAnswer": "The return statement in the finally block overwrites and discards the return value from the try block, returning the finally value to the caller.",
    "explanation": "Finally block has the last word on control flow return values.",
    "hint": "Finally block return statement supersedes the try block return.",
    "level": "Beginner",
    "codeExample": "try { return 1; } finally { return 2; } // returns 2"
  },
  {
    "question": "Is there any scenario where a finally block will NOT execute?",
    "shortAnswer": "Yes: 1) If System.exit() is called, 2) If the JVM encounters a fatal crash/SIGKILL, 3) If an infinite loop or deadlock freezes the try block thread.",
    "explanation": "Extreme JVM termination cases where finally is bypassed.",
    "hint": "System.exit(), fatal JVM abort/crash, or unyielding infinite loop.",
    "level": "Intermediate",
    "codeExample": "System.exit(0); // Finally will NOT run"
  }
];

export default topic5_questions;
