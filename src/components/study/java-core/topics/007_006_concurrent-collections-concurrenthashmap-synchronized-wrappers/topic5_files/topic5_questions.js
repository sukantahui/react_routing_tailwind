const topic5_questions = [
  {
    "question": "Describe the 2-tier mutation strategy used by 'ConcurrentHashMap' in Java 8+ when calling 'put(key, value)'.",
    "shortAnswer": "1. 'Empty Bucket (Lock-Free CAS)': If the calculated bucket is empty ('null'), Java inserts the new node using atomic hardware CAS ('casTabAt()') without acquiring any lock. 2. 'Occupied Bucket (Fine-Grained Node Lock)': If the bucket is already occupied, Java acquires a monitor lock ONLY on the bucket's head node ('synchronized(f)'). Only threads writing to that exact same bucket wait; threads accessing any other bucket execute concurrently with zero blocking.",
    "explanation": "Core algorithmic innovation of Java 8 ConcurrentHashMap (Doug Lea).",
    "hint": "Empty bucket &rarr; lock-free CAS; Occupied bucket &rarr; synchronized on head node of that bucket.",
    "level": "Advanced",
    "codeExample": "if (casTabAt(tab, i, null, new Node<>(...))) break; else synchronized(f) { ... }"
  }
];

export default topic5_questions;