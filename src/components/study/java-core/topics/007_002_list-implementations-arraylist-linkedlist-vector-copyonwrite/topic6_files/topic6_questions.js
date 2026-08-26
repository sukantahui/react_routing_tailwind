const topic6_questions = [
  {
    "question": "Describe the internal data structure of 'java.util.LinkedList' and its memory overhead per element compared to 'ArrayList'.",
    "shortAnswer": "'java.util.LinkedList' is implemented as a doubly linked list where each element is wrapped in a dedicated heap object: 'Node<E> { E item; Node<E> next; Node<E> prev; }'. While an ArrayList only stores a single reference pointer (4-8 bytes) in a contiguous array, each LinkedList Node requires 24 to 32 bytes of heap memory (object header + 3 pointers), creating massive memory overhead and GC pressure.",
    "explanation": "Core structural reason why LinkedList consumes 4x-6x more memory than ArrayList.",
    "hint": "Doubly linked list of Node objects (item, next, prev); creates 24-32 bytes of overhead per node.",
    "level": "Intermediate",
    "codeExample": "private static class Node<E> { E item; Node<E> next; Node<E> prev; }"
  }
];

export default topic6_questions;