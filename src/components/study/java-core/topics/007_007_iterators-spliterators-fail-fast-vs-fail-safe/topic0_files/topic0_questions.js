const topic0_questions = [
  {
    "question": "What is the primary architectural purpose of the Iterator design pattern in the Java Collections Framework?",
    "shortAnswer": "The Iterator pattern provides a standard way to access elements of an aggregate collection sequentially without exposing its underlying internal representation (whether it is an array, linked list, hash bucket table, or balanced binary tree). It decouples the client algorithm from the storage data structure.",
    "explanation": "Classic Gang of Four (GoF) behavioral design pattern integrated into Java.",
    "hint": "Decouples traversal logic from internal collection representation (array, tree, hash table).",
    "level": "Beginner",
    "codeExample": "Iterator<String> it = collection.iterator(); while(it.hasNext()) { process(it.next()); }"
  }
];

export default topic0_questions;