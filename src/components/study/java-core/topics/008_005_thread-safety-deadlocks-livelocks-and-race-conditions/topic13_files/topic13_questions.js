const topic13_questions = [
  {
    "question": "What is a 'Livelock' in multi-threading, how does it differ from a Deadlock, and how is it resolved?",
    "shortAnswer": "A 'Livelock' occurs when two or more threads continuously change their state in active response to each other without making any forward progress on their actual business tasks. Unlike Deadlock (where threads are BLOCKED with 0% CPU usage), in Livelock threads remain RUNNABLE and actively burn 100% CPU cycles spinning in polite retry loops. Livelock is resolved by introducing 'Randomized Back-off Jitter' (e.g. 'Thread.sleep(random(10, 50))'), which breaks the deterministic lockstep resonance between competing threads.",
    "explanation": "Classic concurrency anomaly and mitigation via randomized exponential backoff.",
    "hint": "Threads actively change state with 100% CPU burn but make no forward progress; solved by randomized back-off jitter.",
    "level": "Intermediate",
    "codeExample": "Thread.sleep((long)(Math.random() * 50)); // Randomized back-off breaks livelock"
  }
];

export default topic13_questions;