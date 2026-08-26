const topic8_questions = [
  {
    "question": "How does 'LinkedList.get(int index)' determine whether to traverse forward from the head or backward from the tail?",
    "shortAnswer": "In the internal helper method 'node(int index)', LinkedList checks: 'if (index < (size >> 1))'. If the requested index is in the first half of the list, it begins at the 'first' pointer and steps forward using 'node.next'. If the index is in the second half, it begins at the 'last' pointer and steps backward using 'node.prev'.",
    "explanation": "Internal binary search optimization for doubly linked list traversal.",
    "hint": "Checks 'index < (size >> 1)'; traverses from head if in first half, from tail if in second half.",
    "level": "Intermediate",
    "codeExample": "Node<E> node(int index) { if (index < (size >> 1)) ... else ... }"
  }
];

export default topic8_questions;