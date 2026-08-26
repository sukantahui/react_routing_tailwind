const topic10_questions = [
  {
    "question": "Why does Joshua Bloch and most senior Java architects recommend using 'ArrayDeque' instead of 'LinkedList' when queue/stack operations are required?",
    "shortAnswer": "'ArrayDeque' is backed by a contiguous circular array buffer. It delivers O(1) insertions and deletions at both head and tail WITHOUT creating any wrapper Node objects on the heap. It uses less memory than LinkedList, produces zero Garbage Collection pressure, and fully benefits from CPU cache line prefetching, outperforming LinkedList across all queue/deque operations.",
    "explanation": "Effective Java recommendation on queue data structures.",
    "hint": "ArrayDeque has zero Node allocation overhead, circular contiguous buffer, and superior CPU cache locality.",
    "level": "Intermediate",
    "codeExample": "Deque<Task> queue = new ArrayDeque<>(); // Superior to LinkedList for queues"
  }
];

export default topic10_questions;