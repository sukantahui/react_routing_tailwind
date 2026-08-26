const topic6_questions = [
  {
    "question": "What is the critical difference between the instance method 'thread.isInterrupted()' and the static method 'Thread.interrupted()'?",
    "shortAnswer": "'thread.isInterrupted()' is an instance method that queries the target thread's interrupt status and returns a boolean WITHOUT modifying or clearing the flag. In contrast, 'Thread.interrupted()' is a static method that queries the CURRENT thread's interrupt status AND automatically CLEARS the interrupt status flag (resetting it to 'false'). Calling 'Thread.interrupted()' twice consecutively will return 'false' on the second call.",
    "explanation": "Classic Java certification and interview trap.",
    "hint": "isInterrupted() only reads the flag; static Thread.interrupted() reads AND clears the flag.",
    "level": "Intermediate",
    "codeExample": "t.isInterrupted(); // Non-clearing check | Thread.interrupted(); // Checks AND clears flag!"
  }
];

export default topic6_questions;