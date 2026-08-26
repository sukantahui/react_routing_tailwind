const topic7_questions = [
  {
    "question": "How do you instantiate a 'Max-Heap' using Java's standard 'PriorityQueue' class?",
    "shortAnswer": "By passing 'Collections.reverseOrder()' (or a custom reversed Comparator) into the PriorityQueue constructor: 'PriorityQueue<T> maxHeap = new PriorityQueue<>(Collections.reverseOrder());'. This reverses the natural comparison logic, ensuring the maximum element sits at the root index 0.",
    "explanation": "Standard interview and LeetCode algorithmic technique in Java.",
    "hint": "Pass 'Collections.reverseOrder()' into the PriorityQueue constructor.",
    "level": "Beginner",
    "codeExample": "PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());"
  }
];

export default topic7_questions;