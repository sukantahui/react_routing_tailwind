const topic10_questions = [
  {
    "question": "How does 'java.util.ArrayDeque' achieve O(1) performance for both 'addFirst()' and 'addLast()' without shifting elements in memory?",
    "shortAnswer": "'ArrayDeque' uses a circular array buffer maintained by two integer indices: 'head' and 'tail'. When 'addFirst()' is called, 'head' decrements circularly ('head = (head - 1) & (length - 1)'). When 'addLast()' is called, 'tail' increments circularly ('tail = (tail + 1) & (length - 1)'). Because pointers move rather than array elements, both head and tail operations execute in O(1) time with zero array shifting.",
    "explanation": "Classic circular ring-buffer data structure implemented in the JDK.",
    "hint": "Circular buffer wraps head and tail indices bitwise without moving elements in memory.",
    "level": "Advanced",
    "codeExample": "elements[head = (head - 1) & (elements.length - 1)] = e; // Circular addFirst"
  }
];

export default topic10_questions;