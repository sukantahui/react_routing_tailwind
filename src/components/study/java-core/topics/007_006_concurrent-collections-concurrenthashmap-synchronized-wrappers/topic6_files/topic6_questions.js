const topic6_questions = [
  {
    "question": "Why are 'get()' read operations completely lock-free in 'ConcurrentHashMap'?",
    "shortAnswer": "Because in the internal 'Node<K,V>' class, both the value field ('volatile V val;') and the next pointer ('volatile Node<K,V> next;') are declared 'volatile'. According to the Java Memory Model (JMM), a write to a volatile field establishes a 'happens-before' relationship with subsequent volatile reads. A reading thread is mathematically guaranteed to observe the latest updated values and linked chain without acquiring any monitor locks.",
    "explanation": "Core Java Memory Model visibility guarantee in JSR-166.",
    "hint": "Volatile 'val' and volatile 'next' guarantee memory visibility without requiring any locks during get().",
    "level": "Advanced",
    "codeExample": "static class Node<K,V> { final int hash; final K key; volatile V val; volatile Node<K,V> next; }"
  }
];

export default topic6_questions;