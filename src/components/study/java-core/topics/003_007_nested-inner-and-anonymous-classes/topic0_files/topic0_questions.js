const topic0_questions = [
  {
    "question": "What are the primary architectural benefits of nesting one class inside another in Java?",
    "shortAnswer": "1. Logical Grouping: If a class is useful to only one other class, it is logical to embed it. 2. Enhanced Encapsulation: Inner classes can access all private members of the enclosing outer class. 3. More readable and maintainable source files.",
    "explanation": "Examples in Java standard library include Map.Entry inside Map and Node inside LinkedList.",
    "hint": "Logical grouping, direct access to outer private state, and code readability.",
    "level": "Beginner",
    "codeExample": "public class Map { public static class Entry { ... } }"
  }
];

export default topic0_questions;