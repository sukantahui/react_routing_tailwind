const topic4_questions = [
  {
    "question": "How does 'java.util.PriorityQueue' order elements, and why does iterating with a for-each loop NOT print elements in sorted order?",
    "shortAnswer": "'PriorityQueue' orders elements using a Binary Min-Heap (based on 'Comparable' or a 'Comparator'). The head of the queue is always the minimum (highest priority) element. However, iterating with a for-each loop traverses the internal heap array directly, which is partially ordered according to heap invariants, not globally sorted. Elements are extracted in true priority order ONLY when calling 'poll()' repeatedly.",
    "explanation": "Classic interview trap on heap data structures in Java.",
    "hint": "Backed by a Min-Heap; only repeated poll() extracts elements in exact sorted order, not for-each iteration.",
    "level": "Intermediate",
    "codeExample": "while(!pq.isEmpty()) { System.out.println(pq.poll()); } // Correct sorted extraction"
  }
];

export default topic4_questions;