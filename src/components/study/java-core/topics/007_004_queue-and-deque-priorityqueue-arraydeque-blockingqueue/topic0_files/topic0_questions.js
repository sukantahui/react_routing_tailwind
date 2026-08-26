const topic0_questions = [
  {
    "question": "What is the primary operational ordering guaranteed by the 'java.util.Queue' interface for standard implementations?",
    "shortAnswer": "The 'java.util.Queue' interface guarantees 'FIFO' (First-In, First-Out) ordering for standard implementations (like ArrayDeque and LinkedList). Elements are appended to the 'tail' of the queue and extracted from the 'head' of the queue in strict chronological arrival sequence.",
    "explanation": "Core ordering principle of the Queue interface.",
    "hint": "First-In First-Out (FIFO) where elements are added at the tail and removed from the head.",
    "level": "Beginner",
    "codeExample": "Queue<String> q = new ArrayDeque<>(); q.offer(\"First\"); String s = q.poll();"
  }
];

export default topic0_questions;