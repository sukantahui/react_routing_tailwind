const topic14_questions = [
  {
    question: "What is Lazy Initialization in the Singleton pattern and what is its major limitation in multi-threaded environments?",
    shortAnswer: "The instance is created only when 'getInstance()' is called for the first time. Limitation: In a multi-threaded environment without synchronization, two threads can simultaneously enter 'if (instance == null)' and create two separate instances (Race Condition).",
    explanation: "Basic lazy initialization is not thread-safe and must be guarded.",
    hint: "Created on first call; saves memory but vulnerable to multithreading race conditions.",
    level: "Intermediate",
    codeExample: "public static Singleton getInstance() { if (instance == null) instance = new Singleton(); return instance; }"
  }
];

export default topic14_questions;