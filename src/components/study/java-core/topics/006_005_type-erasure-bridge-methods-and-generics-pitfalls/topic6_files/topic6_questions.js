const topic6_questions = [
  {
    "question": "Why does Java prohibit generic type parameterization with primitive types like 'List<int>' or 'Map<char, boolean>'?",
    "shortAnswer": "Because type erasure converts type parameters to 'java.lang.Object' in bytecode. In Java's memory model, primitive types (int, boolean, double) are raw bits stored on the stack/fields, not heap reference pointers extending 'java.lang.Object'. Since a primitive cannot substitute for an Object reference pointer, wrapper classes ('Integer', 'Double') must be used.",
    "explanation": "A fundamental distinction between Java reference types and primitive value types.",
    "hint": "Primitives do not inherit from java.lang.Object and cannot be assigned to erased Object pointers.",
    "level": "Beginner",
    "codeExample": "List<Integer> list = new ArrayList<>(); // Use boxed wrapper instead of List<int>"
  }
];

export default topic6_questions;