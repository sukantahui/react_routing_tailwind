const topic4_questions = [
  {
    "question": "Explain the lock compatibility matrix of 'ReentrantReadWriteLock' (ReadLock vs WriteLock).",
    "shortAnswer": "1. 'Read Lock (Shared)': Multiple reader threads can acquire the ReadLock simultaneously as long as no writer holds the WriteLock. Reads do not block other reads. 2. 'Write Lock (Exclusive)': Only one writer thread can hold the WriteLock at any time. When acquired, all other reader and writer threads are blocked from entry. 3. 'Compatibility Matrix': (A) Read-Read: Allowed concurrently. (B) Read-Write: Mutually exclusive (blocked). (C) Write-Write: Mutually exclusive (blocked).",
    "explanation": "Fundamental ReadWriteLock concurrency semantics.",
    "hint": "Many readers can read simultaneously; writers require 100% exclusive access blocking all readers and writers.",
    "level": "Intermediate",
    "codeExample": "rwLock.readLock().lock(); // Shared read; rwLock.writeLock().lock(); // Exclusive write"
  }
];

export default topic4_questions;