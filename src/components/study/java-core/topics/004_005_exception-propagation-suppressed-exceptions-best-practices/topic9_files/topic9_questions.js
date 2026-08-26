const topic9_questions = [
  {
    "question": "What are the rules prescribed by Effective Java Item 74 for documenting exceptions with Javadoc?",
    "shortAnswer": "1. Document EVERY exception (both checked and unchecked) using the Javadoc '@throws' tag with the exact condition under which it occurs. 2. Declare Checked Exceptions in the method 'throws' signature. 3. Do NOT declare Unchecked Exceptions in the method header signature—document them exclusively in Javadoc.",
    "explanation": "Keeps public API signatures clean while providing comprehensive developer documentation.",
    "hint": "Document all exceptions in Javadoc @throws; only include checked exceptions in method header.",
    "level": "Intermediate",
    "codeExample": "/** @throws IllegalArgumentException if amount <= 0 */ public void pay(int amount) {}"
  }
];

export default topic9_questions;