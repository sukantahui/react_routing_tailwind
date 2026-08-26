const topic0_questions = [
  {
    "question": "Summarize the underlying backing data structure for the 4 primary Map and Set implementations in Java.",
    "shortAnswer": "1. 'HashMap / HashSet': Backed by an array of buckets ('Node<K,V>[] table') with separate chaining (linked list transitioning to Red-Black tree when chain &ge; 8). (HashSet uses a backing HashMap instance). 2. 'LinkedHashMap / LinkedHashSet': Backed by a HashMap table plus a global doubly linked list maintaining insertion or LRU access order. 3. 'TreeMap / TreeSet': Backed by a self-balancing Red-Black Binary Search Tree (O(log n)). 4. 'ConcurrentHashMap': Backed by a lock-free CAS bucket table with synchronized head nodes and volatile pointer visibility.",
    "explanation": "Complete architectural review of the Java Collections Framework.",
    "hint": "HashMap=array+chaining; LinkedHashMap=array+doubly linked list; TreeMap=Red-Black Tree; ConcurrentHashMap=CAS+bucket lock.",
    "level": "Intermediate",
    "codeExample": "Map<K,V> map = new HashMap<>(); // Array table + TreeBin chaining"
  }
];

export default topic0_questions;