const topic9_questions = [
  {
    "question": "Why MUST 'wait()' always be called inside a 'while' loop rather than an 'if' statement?",
    "shortAnswer": "1. 'Interleaved State Mutation': When 'notifyAll()' is called, multiple waiting threads wake up and compete for the lock sequentially. The first thread to acquire the lock consumes the available resource and resets the state (e.g. stock goes from 1 to 0). If the second thread used an 'if' statement, it would resume past the check and operate on an empty stock. A 'while' loop forces the second thread to re-verify the condition upon waking, seeing the stock is 0 and safely calling 'wait()' again. 2. 'Spurious Wakeups': If the OS kernel wakes the thread spontaneously without a signal, the 'while' loop re-tests the condition and immediately returns the thread to sleep.",
    "explanation": "Standard Java Concurrency Golden Rule (Effective Java Item 81).",
    "hint": "Re-tests condition after another thread consumed the resource or after a spurious wakeup.",
    "level": "Intermediate",
    "codeExample": "while (!condition) { lock.wait(); } // The Golden Rule of Inter-Thread Communication"
  }
];

export default topic9_questions;