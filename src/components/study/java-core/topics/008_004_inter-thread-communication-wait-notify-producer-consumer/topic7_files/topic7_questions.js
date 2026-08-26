const topic7_questions = [
  {
    "question": "Why does 'notifyAll()' prevent missed signals and deadlocks in multi-threaded systems?",
    "shortAnswer": "'notifyAll()' wakes up ALL threads currently in the object's Wait Set and moves them to the Entry Set. Each thread then competes for the intrinsic monitor lock one by one. Once a thread acquires the lock, it re-evaluates its while-loop condition predicate. If the condition is met, it proceeds; if not, it calls 'wait()' again. This ensures that the thread for which the signal was intended is guaranteed to wake up, eliminating missed signal deadlocks where 'notify()' accidentally woke up an unready thread.",
    "explanation": "Standard design recommendation from Java Concurrency in Practice.",
    "hint": "Moves all waiting threads to Entry Set; each checks its own while loop condition without losing signals.",
    "level": "Intermediate",
    "codeExample": "synchronized(lock) { lock.notifyAll(); } // Broadcasts to all waiting threads"
  }
];

export default topic7_questions;