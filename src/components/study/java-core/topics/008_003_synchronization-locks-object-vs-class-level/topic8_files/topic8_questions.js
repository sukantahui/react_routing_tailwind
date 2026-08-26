const topic8_questions = [
  {
    "question": "Can one thread execute a 'synchronized static' method while another thread simultaneously executes a 'synchronized' instance method on the same class?",
    "shortAnswer": "YES, both threads execute simultaneously in parallel without blocking each other. The 'synchronized static' method acquires the Class-level monitor lock ('ClassName.class' in Metaspace), whereas the 'synchronized' instance method acquires the Object-level monitor lock ('this' in Heap memory). Because these are two completely distinct object instances with separate locks, they do not interfere with each other.",
    "explanation": "Classic Java multi-threading interview conceptual question.",
    "hint": "Yes, because ClassName.class and 'this' are two completely separate lock objects in memory.",
    "level": "Intermediate",
    "codeExample": "// Thread 1 holds 'this' lock | Thread 2 holds 'MyClass.class' lock -> Run in parallel!"
  }
];

export default topic8_questions;