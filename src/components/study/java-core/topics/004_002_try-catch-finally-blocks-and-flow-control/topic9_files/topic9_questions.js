const topic9_questions = [
  {
    "question": "Does the 'finally' block execute if there is an explicit 'return' statement inside the 'try' or 'catch' block?",
    "shortAnswer": "YES, ABSOLUTELY. The JVM intercepts the 'return' statement, evaluates and stores the return value in a hidden temporary register, executes the entire 'finally' block, and only then delivers the returned value to the caller.",
    "explanation": "One of the most famous and universally asked Java interview questions.",
    "hint": "Yes! Finally executes immediately before the return completes.",
    "level": "Intermediate",
    "codeExample": "try { return 10; } finally { System.out.println(\"Runs before return\"); }"
  }
];

export default topic9_questions;