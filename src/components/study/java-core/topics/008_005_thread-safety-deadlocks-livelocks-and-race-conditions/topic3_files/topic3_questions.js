const topic3_questions = [
  {
    "question": "Name the 4 Coffman Conditions required for a deadlock to occur in a computer system.",
    "shortAnswer": "1. 'Mutual Exclusion': at least one resource must be held in a non-shareable mode by one thread. 2. 'Hold and Wait': a thread holding at least one resource is actively waiting to acquire additional resources held by other threads. 3. 'No Preemption': resources cannot be forcibly confiscated from a thread holding them; only the thread can voluntarily release them. 4. 'Circular Wait': a circular chain of threads exists such that each thread waits for a resource held by the next thread in the chain.",
    "explanation": "Fundamental operating systems and concurrency theorem by Edward G. Coffman Jr. (1971).",
    "hint": "Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
    "level": "Intermediate",
    "codeExample": "// Deadlock occurs if and only if ALL 4 Coffman conditions hold simultaneously."
  }
];

export default topic3_questions;