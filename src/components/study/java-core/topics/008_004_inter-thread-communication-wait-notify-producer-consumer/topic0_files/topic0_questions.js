const topic0_questions = [
  {
    "question": "What is 'Busy Waiting' (Spin-Waiting) and why is Inter-Thread Communication preferred in multi-threaded software?",
    "shortAnswer": "'Busy Waiting' is an anti-pattern where a thread repeatedly executes an empty or tight polling loop (e.g. 'while (!condition) {}') checking for a state change. This consumes 100% of a CPU core, generating extreme thermal load, wasting battery, and starving other threads of CPU time-slices. Inter-Thread Communication ('wait()' and 'notify()') allows the waiting thread to yield the CPU and transition to the 'WAITING' state with 0% CPU consumption until another thread actively signals it.",
    "explanation": "Core concurrency efficiency principle.",
    "hint": "Busy waiting burns 100% CPU cycles spinning; wait/notify suspends the thread with 0% CPU usage until signaled.",
    "level": "Beginner",
    "codeExample": "while (!dataReady) { /* Burns 100% CPU! */ } // Anti-pattern! Use wait() instead."
  }
];

export default topic0_questions;