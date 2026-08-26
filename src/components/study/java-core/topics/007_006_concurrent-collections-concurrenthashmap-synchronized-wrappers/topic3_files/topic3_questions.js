const topic3_questions = [
  {
    "question": "What is 'java.util.concurrent.ConcurrentHashMap' and what are its 3 primary architectural advantages over synchronized wrappers?",
    "shortAnswer": "'ConcurrentHashMap' is a high-performance, thread-safe hash map designed by Doug Lea for concurrent applications. Its 3 primary advantages are: 1. 'Fine-Grained Locking': locks only the specific bucket head being modified, allowing concurrent writes to other buckets. 2. 'Lock-Free Reads': 'get()' lookups use volatile memory semantics without acquiring any locks. 3. 'Linear Scalability': throughput increases with additional CPU cores.",
    "explanation": "Standard concurrent dictionary in enterprise Java applications.",
    "hint": "Fine-grained bucket locking, lock-free reads, and linear multi-core scalability.",
    "level": "Intermediate",
    "codeExample": "ConcurrentMap<K,V> map = new ConcurrentHashMap<>(); // Enterprise standard"
  }
];

export default topic3_questions;