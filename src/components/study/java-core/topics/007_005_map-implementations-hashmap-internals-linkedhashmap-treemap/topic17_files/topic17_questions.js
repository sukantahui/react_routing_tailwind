const topic17_questions = [
  {
    "question": "How do you implement a fixed-size LRU (Least Recently Used) cache in Java using 'LinkedHashMap'?",
    "shortAnswer": "1. Subclass 'LinkedHashMap' and pass 'accessOrder = true' to the super constructor ('super(capacity, 0.75f, true)'). 2. Override the protected hook method 'removeEldestEntry(Map.Entry eldest)' to return 'size() > maxCapacity'. Whenever a new entry is added that exceeds the maximum capacity, LinkedHashMap automatically removes the eldest (least recently used) entry at the head.",
    "explanation": "Classic enterprise interview pattern and real-world caching idiom.",
    "hint": "Subclass LinkedHashMap with accessOrder=true and override removeEldestEntry returning size() > maxCapacity.",
    "level": "Advanced",
    "codeExample": "protected boolean removeEldestEntry(Map.Entry<K,V> eldest) { return size() > maxCapacity; }"
  }
];

export default topic17_questions;