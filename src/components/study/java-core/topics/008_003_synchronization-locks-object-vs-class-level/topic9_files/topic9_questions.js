const topic9_questions = [
  {
    "question": "What is 'Lock Reentrancy' in Java, and what catastrophic issue would occur if intrinsic locks were NOT reentrant?",
    "shortAnswer": "'Lock Reentrancy' means that if a thread already holds an intrinsic monitor lock on an object, it can acquire the exact same lock again without blocking. The JVM associates an owning thread reference and a 'hold count' with the lock. If locks were NOT reentrant, when a synchronized method calls another synchronized method on the same object (or a subclass calls 'super.synchronizedMethod()'), the thread would wait for a lock it already holds, causing a permanent 'Self-Deadlock'.",
    "explanation": "Core Java Memory Model and JVM synchronization specification.",
    "hint": "Locks are per-thread with a recursion count; non-reentrant locks would cause self-deadlock during nested synchronized calls.",
    "level": "Advanced",
    "codeExample": "public synchronized void a() { b(); } public synchronized void b() { ... } // Reentrant!"
  }
];

export default topic9_questions;