const topic4_questions = [
  {
    "question": "How did 'ConcurrentHashMap' achieve concurrency in Java 7, and why was this approach redesigned in Java 8?",
    "shortAnswer": "In Java 7, ConcurrentHashMap used 'Segment Locking' (Lock Striping): the map was divided into an array of 16 'Segment' objects, where each Segment extended 'ReentrantLock' and managed its own sub-table. This allowed up to 16 threads to write concurrently to different segments. It was redesigned in Java 8 because 16 Segment objects caused massive memory overhead for small maps and concurrency was artificially capped at the segment count. Java 8 replaced segments with direct per-bucket synchronization and CAS operations.",
    "explanation": "Classic architectural evolution question in Java technical interviews.",
    "hint": "Java 7 used an array of 16 Segment objects extending ReentrantLock; Java 8 replaced them with per-bucket CAS and node locks.",
    "level": "Intermediate",
    "codeExample": "static class Segment<K,V> extends ReentrantLock { transient volatile HashEntry<K,V>[] table; }"
  }
];

export default topic4_questions;