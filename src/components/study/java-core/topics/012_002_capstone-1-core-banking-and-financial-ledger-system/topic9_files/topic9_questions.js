const topic9_questions = [
  {
    "question": "How does a dual CountDownLatch (Start Gate and End Gate) pattern simulate true concurrent burst loads in stress tests?",
    "shortAnswer": "The Start Gate (CountDownLatch(1)) forces all worker threads to block until released simultaneously in a sudden burst, maximizing thread contention. The End Gate (CountDownLatch(N)) allows the main test runner to await all completions before evaluating system assertions.",
    "explanation": "Standard concurrent testing pattern from Java Concurrency in Practice.",
    "hint": "Start gate creates sudden simultaneous burst; end gate waits for all threads to finish.",
    "level": "Intermediate",
    "codeExample": "startGate.countDown(); endGate.await();"
  },
  {
    "question": "What is the ultimate mathematical invariant assertion in a closed-system banking stress test?",
    "shortAnswer": "The sum of all account balances at the end of the test must strictly equal the initial sum of all account balances regardless of how many hundreds of concurrent transfers were executed.",
    "explanation": "Proves conservation of funds and absence of race condition leaks.",
    "hint": "Sum of all account balances before == Sum of all account balances after.",
    "level": "Beginner",
    "codeExample": "assertEquals(initialTotalBalance, finalTotalBalance);"
  }
];

export default topic9_questions;
