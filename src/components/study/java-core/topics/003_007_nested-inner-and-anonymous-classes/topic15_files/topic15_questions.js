const topic15_questions = [
  {
    "question": "Why does Effective Java Item 24 recommend: 'Favor static member classes over non-static'?",
    "shortAnswer": "Every non-static inner class instance retains a hidden reference ('this$0') to its enclosing instance, consuming an extra 8 bytes of heap memory per object and adding constructor time overhead. Static nested classes have no such reference, preventing memory leaks and saving memory in high-volume data structures.",
    "explanation": "Standard optimization across Java Collections Framework (e.g. TreeMap.Entry, HashMap.Node).",
    "hint": "Saves 8 bytes per instance and eliminates memory leak risks.",
    "level": "Intermediate",
    "codeExample": "public static class Node<E> { E item; Node<E> next; } // Zero outer overhead"
  }
];

export default topic15_questions;