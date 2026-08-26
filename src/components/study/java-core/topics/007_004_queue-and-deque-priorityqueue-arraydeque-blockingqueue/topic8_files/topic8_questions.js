const topic8_questions = [
  {
    "question": "What does 'Deque' stand for in Java, and what are its 3 primary architectural use cases?",
    "shortAnswer": "'Deque' stands for 'Double-Ended Queue' (pronounced 'deck'). It supports element insertion and removal at both endpoints. Its 3 primary use cases are: 1. 'FIFO Queue' (operating at head and tail), 2. 'LIFO Stack' (push and pop at head), and 3. 'Bidirectional Work Stealing' buffers in thread pools (e.g. ForkJoinPool).",
    "explanation": "Core contract of java.util.Deque introduced in Java 6.",
    "hint": "Double-Ended Queue; can act as a FIFO Queue, a LIFO Stack, or a bidirectional work-stealing buffer.",
    "level": "Beginner",
    "codeExample": "Deque<String> dq = new ArrayDeque<>(); dq.addFirst(\"Head\"); dq.addLast(\"Tail\");"
  }
];

export default topic8_questions;