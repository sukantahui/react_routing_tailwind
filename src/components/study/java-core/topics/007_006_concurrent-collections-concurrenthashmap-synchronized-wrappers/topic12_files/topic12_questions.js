const topic12_questions = [
  {
    "question": "Why does 'ConcurrentHashMap' massively outperform 'Hashtable' and 'Collections.synchronizedMap' under multi-threaded contention?",
    "shortAnswer": "Because 'Hashtable' and 'SynchronizedMap' use a single global lock that forces all threads to execute sequentially (even threads accessing different keys or just performing reads). In contrast, 'ConcurrentHashMap' uses CAS for empty buckets, locks only individual bucket heads for collisions, and makes all 'get()' reads completely lock-free via volatile memory. Threads accessing different buckets run in parallel at full hardware capability.",
    "explanation": "Grand summary benchmark of Java concurrent map architectures.",
    "hint": "Hashtable serializes all threads with 1 global lock; ConcurrentHashMap uses CAS, bucket locks, and lock-free reads.",
    "level": "Advanced",
    "codeExample": "ConcurrentMap<K,V> map = new ConcurrentHashMap<>(); // 3x to 6x faster than SynchronizedMap"
  }
];

export default topic12_questions;