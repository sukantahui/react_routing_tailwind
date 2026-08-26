const topic1_questions = [
  {
    "question": "Explain how a 'Check-Then-Act' race condition causes a bank account balance to become negative in multithreaded systems.",
    "shortAnswer": "A 'Check-Then-Act' race condition occurs when a thread checks a condition (e.g. 'if (balance >= amount)'), but before it can execute the corresponding action (e.g. 'balance -= amount'), another thread interleaves, observes the same unmutated state, and executes its own action. As a result, both threads act on stale verification, executing mutually exclusive withdrawals that exceed the available balance and produce a negative deficit.",
    "explanation": "Classic concurrency vulnerability pattern found in financial and inventory software.",
    "hint": "Both threads pass the 'if (balance >= amount)' check before either deducts, causing double spending.",
    "level": "Beginner",
    "codeExample": "if (balance >= amount) { Thread.sleep(delay); balance -= amount; } // Race condition!"
  }
];

export default topic1_questions;