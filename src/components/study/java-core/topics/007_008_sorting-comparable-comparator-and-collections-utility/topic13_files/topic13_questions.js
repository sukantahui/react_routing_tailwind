const topic13_questions = [
  {
    "question": "Why MUST you manually synchronize on a 'Collections.synchronizedList' wrapper when iterating over it?",
    "shortAnswer": "Although individual methods (like 'add()' and 'get()') on a synchronized wrapper are synchronized on an internal mutex, the Iterator returned by 'syncList.iterator()' is NOT automatically synchronized across the entire traversal. Between individual 'hasNext()' and 'next()' invocations, another thread can interleave and mutate the list. To prevent 'ConcurrentModificationException', the developer must enclose the iteration inside a 'synchronized (syncList) { ... }' block.",
    "explanation": "Explicit requirement documented in java.util.Collections Javadoc.",
    "hint": "Iterator does not lock the list across iterations; manual synchronized(syncList) block is required.",
    "level": "Intermediate",
    "codeExample": "synchronized(syncList) { for (String s : syncList) { ... } }"
  }
];

export default topic13_questions;