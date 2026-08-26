const topic2_questions = [
  {
    "question": "Why do 'Hashtable' and 'Collections.synchronizedMap()' fail to scale on modern multi-core server processors?",
    "shortAnswer": "Because they use a single coarse-grained object-level monitor lock (whole-map lock). Every single method ('put', 'get', 'remove', 'containsKey') must acquire this exact same global mutex. Even when multiple threads are reading from or writing to completely different buckets, they block each other sequentially. Adding more CPU cores increases lock contention and context-switching overhead rather than increasing throughput.",
    "explanation": "Core scalability bottleneck that led Doug Lea to design ConcurrentHashMap in JSR-166.",
    "hint": "Uses a single global lock for the entire map; reads block reads and writes block writes across all buckets.",
    "level": "Intermediate",
    "codeExample": "// Inside SynchronizedMap: public V get(Object k) { synchronized(mutex) { return m.get(k); } }"
  }
];

export default topic2_questions;