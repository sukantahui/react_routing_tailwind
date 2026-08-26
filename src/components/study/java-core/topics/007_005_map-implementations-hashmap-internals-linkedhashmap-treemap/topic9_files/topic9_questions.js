const topic9_questions = [
  {
    "question": "How does 'HashMap' resolve collisions when two non-equal keys compute to the exact same bucket index?",
    "shortAnswer": "'HashMap' resolves collisions using 'Separate Chaining'. When a new node maps to an occupied bucket, HashMap traverses the bucket's singly-linked list. If it finds a node with matching hash and 'equals() == true', it updates the value. If no match is found, it appends the new 'Node<K,V>' to the tail of the bucket's linked list.",
    "explanation": "Standard collision resolution technique in Java Collections.",
    "hint": "Separate chaining appends collided nodes to a singly linked list linked via 'Node.next'.",
    "level": "Intermediate",
    "codeExample": "for (Node<K,V> e = p;; ++binCount) { if (e.next == null) { e.next = newNode; break; } }"
  }
];

export default topic9_questions;