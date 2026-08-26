const topic16_questions = [
  {
    "question": "What is the difference between 'insertion-order' and 'access-order' modes in 'java.util.LinkedHashMap'?",
    "shortAnswer": "1. 'Insertion-Order (default)': iteration order reflects the exact chronological order in which keys were first inserted into the map. Calling 'get()' does not alter the order. 2. 'Access-Order (accessOrder = true)': every time 'get(k)' or 'put(k, v)' accesses an existing entry, that entry is automatically moved to the TAIL of the internal doubly linked list. Consequently, the HEAD always points to the Least Recently Used (LRU) element, making it ideal for LRU caching.",
    "explanation": "Core mechanism of LinkedHashMap configured via new LinkedHashMap(cap, loadFactor, accessOrder).",
    "hint": "Access-order mode moves accessed elements to the tail, keeping least-recently-used items at the head.",
    "level": "Intermediate",
    "codeExample": "Map<K,V> map = new LinkedHashMap<>(16, 0.75f, true); // access-order mode"
  }
];

export default topic16_questions;