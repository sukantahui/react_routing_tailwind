const topic12_questions = [
  {
    "question": "Why does Joshua Bloch (author of Effective Java) state: 'A single-element enum type is the best way to implement a singleton'?",
    "shortAnswer": "Because an Enum Singleton provides absolute protection against all 3 classic singleton destruction attacks for free: 1. Thread-safety (JVM classloader guarantees single initialization). 2. Serialization (Java serialization guarantees identical instance return). 3. Reflection attacks (Constructor.newInstance() throws an exception when called on enums).",
    "explanation": "Replaces vulnerable double-checked locking with 3 clean lines of code.",
    "hint": "Immune to multithreading race conditions, serialization duplication, and reflection attacks.",
    "level": "Advanced",
    "codeExample": "public enum Singleton { INSTANCE; public void doWork() {} }"
  }
];

export default topic12_questions;