const topic1_questions = [
  {
    "question": "List the 4 inter-thread communication methods declared in 'java.lang.Object' and their basic functions.",
    "shortAnswer": "1. 'wait()': releases the object's monitor lock and places the current thread into the object's Wait Set indefinitely (WAITING state). 2. 'wait(long timeoutMillis)': releases lock and waits until signaled OR until the specified timeout expires (TIMED_WAITING state). 3. 'notify()': wakes up a single arbitrary thread currently waiting in the object's Wait Set. 4. 'notifyAll()': wakes up ALL threads currently waiting in the object's Wait Set, allowing them to compete for the monitor lock.",
    "explanation": "Fundamental Object signaling API in Java.",
    "hint": "wait(), wait(timeout), notify(), and notifyAll() declared directly on java.lang.Object.",
    "level": "Beginner",
    "codeExample": "lock.wait(); // Releases lock and sleeps | lock.notifyAll(); // Wakes up all waiters"
  }
];

export default topic1_questions;