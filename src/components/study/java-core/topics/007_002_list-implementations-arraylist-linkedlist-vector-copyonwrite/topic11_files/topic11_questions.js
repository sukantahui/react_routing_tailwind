const topic11_questions = [
  {
    "question": "Why is 'java.util.Stack' considered a flawed design in Java, and what class should be used instead?",
    "shortAnswer": "'java.util.Stack' directly extends 'java.util.Vector' (inheritance instead of composition). As a result, Stack inherits all Vector methods like 'add(int index, E element)', allowing callers to insert elements into arbitrary positions (or at the bottom of the stack), completely violating the LIFO stack abstraction. In addition, all its methods are synchronized. Java architects recommend using 'ArrayDeque' instead.",
    "explanation": "Effective Java Item 18: Favor composition over inheritance (Stack is the classic anti-pattern).",
    "hint": "Inherits from Vector exposing non-stack methods like add(index, e); use ArrayDeque instead.",
    "level": "Intermediate",
    "codeExample": "Deque<String> stack = new ArrayDeque<>(); // Clean modern replacement"
  }
];

export default topic11_questions;