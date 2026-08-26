const topic5_questions = [
  {
    "question": "When should you use 'ensureCapacity(int minCapacity)' vs 'trimToSize()' on an ArrayList?",
    "shortAnswer": "1. Use 'ensureCapacity(int)' BEFORE performing large batch insertions when the approximate element count is known, preventing multiple costly array allocations and memory copying passes. 2. Use 'trimToSize()' AFTER completing insertions on long-lived or cached lists to shrink the backing array down to the exact 'size', freeing unused memory slots for garbage collection.",
    "explanation": "Standard enterprise heap tuning techniques for high-throughput Java applications.",
    "hint": "ensureCapacity pre-allocates to avoid resizes; trimToSize shrinks the buffer to size to free memory.",
    "level": "Intermediate",
    "codeExample": "list.ensureCapacity(100000); // Pre-allocate; list.trimToSize(); // Shrink buffer"
  }
];

export default topic5_questions;