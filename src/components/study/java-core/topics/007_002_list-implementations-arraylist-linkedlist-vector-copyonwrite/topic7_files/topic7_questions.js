const topic7_questions = [
  {
    "question": "Why does 'java.util.LinkedList' implement both 'List' and 'Deque' interfaces in Java?",
    "shortAnswer": "Because its underlying doubly linked list node structure naturally supports fast O(1) pointer updates at both ends (head and tail) as well as positional index traversal. Implementing both interfaces allows LinkedList to serve simultaneously as an indexed sequential List and as a double-ended Queue (Deque) or LIFO Stack.",
    "explanation": "Core versatile design of java.util.LinkedList.",
    "hint": "Doubly linked structure allows O(1) operations at head and tail (Deque) and indexed access (List).",
    "level": "Intermediate",
    "codeExample": "Deque<String> d = new LinkedList<>(); d.addFirst(\"A\"); d.addLast(\"B\");"
  }
];

export default topic7_questions;