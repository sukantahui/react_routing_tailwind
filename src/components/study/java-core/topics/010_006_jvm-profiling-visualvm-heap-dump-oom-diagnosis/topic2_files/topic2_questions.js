const topic2_questions = [
  {
    "question": "How does WeakHashMap help prevent memory leaks when used as a cache?",
    "shortAnswer": "WeakHashMap stores its keys using WeakReferences. When a key object has no other strong references in the application, the GC reclaims the key, and WeakHashMap automatically purges the associated map entry.",
    "explanation": "Ideal for associating metadata with objects without pinning them in memory.",
    "hint": "Keys are WeakReferences and get collected when no strong references remain.",
    "level": "Intermediate",
    "codeExample": "Map<Student, Metadata> cache = new WeakHashMap<>();"
  },
  {
    "question": "How can LinkedHashMap be configured to function as a bounded LRU cache in standard Java?",
    "shortAnswer": "By instantiating LinkedHashMap with accessOrder = true and overriding the protected boolean removeEldestEntry(Map.Entry eldest) method to return true when size() exceeds the maximum allowed limit.",
    "explanation": "Built-in standard library LRU cache mechanism.",
    "hint": "Set accessOrder=true and override removeEldestEntry().",
    "level": "Intermediate",
    "codeExample": "protected boolean removeEldestEntry(Entry e) { return size() > max; }"
  }
];

export default topic2_questions;
