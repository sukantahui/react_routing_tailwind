const topic2_questions = [
  {
    "question": "In standard try-catch execution flow, what is the exact statement sequence when an exception is thrown on step 2 of a 3-step try block?",
    "shortAnswer": "1. Step 1 (runs). 2. Step 2 (fails and throws exception). 3. Step 3 inside try is SKIPPED. 4. Matching 'catch' block executes. 5. Code continues sequentially with statements AFTER the try-catch structure.",
    "explanation": "Guarantees graceful continuation rather than abrupt process termination.",
    "hint": "Statements after the failure in try are skipped; catch executes; execution continues after catch.",
    "level": "Beginner",
    "codeExample": "// Flow: try_step1 → try_step2 (fails) → catch_block → post_statements"
  }
];

export default topic2_questions;