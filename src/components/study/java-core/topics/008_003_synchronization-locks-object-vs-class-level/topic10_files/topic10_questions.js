const topic10_questions = [
  {
    "question": "Why does Joshua Bloch (Effective Java) strongly recommend using 'private final Object lock = new Object()' instead of synchronizing on 'this' or publicly accessible objects?",
    "shortAnswer": "1. 'Encapsulation & Security': If a class synchronizes on 'this' (or public fields), external clients or malicious subclasses can synchronize on the instance directly ('synchronized(instance)'), potentially causing accidental deadlocks or Denial-of-Service lock hijacking. A 'private' lock object is completely encapsulated and invisible to outside callers. 2. 'Immutability (final)': Declaring the lock 'final' guarantees that the object reference can never be reassigned, preventing threads from synchronizing on different object references.",
    "explanation": "Effective Java Item 78 and secure concurrency coding guidelines.",
    "hint": "Encapsulates the lock to prevent external classes from hijacking 'this', and 'final' prevents lock reassignment.",
    "level": "Intermediate",
    "codeExample": "private final Object lock = new Object(); // 100% encapsulated lock"
  }
];

export default topic10_questions;