const topic8_questions = [
  {
    "question": "Why must get() on an access-ordered LinkedHashMap acquire a write lock rather than a read lock in multi-threaded code?",
    "shortAnswer": "Because in access-order mode (accessOrder=true), calling get() mutates the internal doubly-linked list pointers to move the accessed entry to the tail, which is a structural write operation that is not thread-safe under read locks.",
    "explanation": "Access-order LinkedHashMap mutates list nodes on reads.",
    "hint": "get() modifies internal doubly-linked list node order, requiring a write lock.",
    "level": "Advanced",
    "codeExample": "lock.writeLock().lock(); try { return map.get(key); } ..."
  },
  {
    "question": "What are the 4 Coffman conditions required for a Deadlock to occur?",
    "shortAnswer": "1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, 4) Circular Wait. Breaking any one of these four conditions completely prevents deadlocks.",
    "explanation": "Theoretical foundation of deadlock prevention.",
    "hint": "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.",
    "level": "Intermediate",
    "codeExample": "Enforcing global lock acquisition order breaks Circular Wait."
  }
];

export default topic8_questions;
