const topic4_questions = [
  {
    "question": "Explain the 'Mutual Exclusion' Coffman condition and how ReadWriteLocks relax this condition for reader threads.",
    "shortAnswer": "'Mutual Exclusion' states that at least one resource must be held in an exclusive, non-shareable mode by a single thread, forcing other requesting threads to block. For state-mutating operations (writes), mutual exclusion is mandatory to prevent data corruption. However, for read-only operations, 'ReentrantReadWriteLock' relaxes mutual exclusion by allowing multiple reader threads to acquire the 'readLock()' concurrently in shared mode, eliminating deadlock potential among readers.",
    "explanation": "First Coffman condition analysis and ReadWriteLock design.",
    "hint": "Exclusive access prevents sharing; ReadWriteLock allows concurrent sharing for readers.",
    "level": "Intermediate",
    "codeExample": "rwLock.readLock().lock(); // Shared read access breaks mutual exclusion for readers"
  }
];

export default topic4_questions;