const topic11_questions = [
  {
    "question": "Why is 'ArrayDeque' significantly faster than 'java.util.Stack' for LIFO stacks and faster than 'LinkedList' for FIFO queues?",
    "shortAnswer": "1. 'Against Stack': Stack's methods are all 'synchronized', paying unnecessary lock acquisition overhead on every operation; ArrayDeque is unsynchronized. 2. 'Against LinkedList': LinkedList allocates a separate 'Node' object on the heap for every element and scatters references across RAM; ArrayDeque uses a flat contiguous circular array with zero node allocation and optimal CPU cache locality.",
    "explanation": "Effective Java and JDK core performance recommendation.",
    "hint": "ArrayDeque has zero synchronization overhead (vs Stack) and zero Node allocation overhead (vs LinkedList).",
    "level": "Intermediate",
    "codeExample": "Deque<Task> stack = new ArrayDeque<>(); // Faster than Stack and LinkedList"
  }
];

export default topic11_questions;