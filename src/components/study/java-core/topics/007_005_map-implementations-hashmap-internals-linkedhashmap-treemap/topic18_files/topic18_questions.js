const topic18_questions = [
  {
    "question": "Summarize the architectural differences between 'HashMap', 'LinkedHashMap', and 'TreeMap' across ordering, time complexity, and internal structure.",
    "shortAnswer": "1. 'HashMap': Unordered; backed by a hash bucket array ('Node<K,V>[]') with Red-Black treeification (TreeBin); O(1) average lookup; allows 1 null key. 2. 'LinkedHashMap': Maintains insertion or access order; backed by HashMap buckets + a global doubly-linked list; O(1) lookup; allows 1 null key; ideal for LRU caching. 3. 'TreeMap': Maintains sorted key order; backed by a pure Red-Black self-balancing binary search tree; O(log n) lookup; implements NavigableMap; does NOT permit null keys (throws NullPointerException).",
    "explanation": "Grand architectural summary of the Java Map hierarchy.",
    "hint": "HashMap: O(1) unordered; LinkedHashMap: O(1) insertion/access order; TreeMap: O(log n) sorted Red-Black tree.",
    "level": "Advanced",
    "codeExample": "Map<K,V> hm = new HashMap<>(); Map<K,V> lhm = new LinkedHashMap<>(); NavigableMap<K,V> tm = new TreeMap<>();"
  }
];

export default topic18_questions;