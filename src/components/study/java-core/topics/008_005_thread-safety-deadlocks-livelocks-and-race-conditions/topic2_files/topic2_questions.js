const topic2_questions = [
  {
    "question": "What is a 'Deadlock' in Java multi-threading and what state do deadlocked threads enter?",
    "shortAnswer": "A 'Deadlock' is a permanent concurrency freeze where two or more threads are blocked indefinitely because each thread holds a lock that another thread needs, while simultaneously waiting to acquire a lock held by that other thread. Deadlocked threads enter the 'BLOCKED' state (when waiting on synchronized monitor locks) or 'WAITING' state and can never make forward progress on their own without external process termination.",
    "explanation": "Fundamental deadlock definition in operating systems and JVM concurrency.",
    "hint": "Permanent freeze where Thread A holds Lock 1 waiting for Lock 2, while Thread B holds Lock 2 waiting for Lock 1.",
    "level": "Beginner",
    "codeExample": "// Thread 1: Lock A -> Lock B | Thread 2: Lock B -> Lock A => Deadlock!"
  }
];

export default topic2_questions;