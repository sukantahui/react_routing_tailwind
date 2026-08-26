const topic10_questions = [
  {
    "question": "What creative enterprise design patterns can be implemented by leveraging custom 'AutoCloseable' classes with Try-with-Resources beyond simple file streams?",
    "shortAnswer": "1. Scoped Execution Timers: Automatically logging execution benchmark duration on block exit. 2. Lock Management: Acquiring a ReentrantLock on instantiation and automatically unlocking it in 'close()'. 3. ThreadContext Mappings (MDC): Setting correlation IDs in logging context and clearing them upon exit.",
    "explanation": "Commonly known as the RAII (Resource Acquisition Is Initialization) pattern in Java.",
    "hint": "Scoped timers, automatic lock release, and thread logging context cleanup.",
    "level": "Intermediate",
    "codeExample": "try (var lock = AutoLock.acquire(mutex)) { ... } // Unlocks automatically on exit"
  }
];

export default topic10_questions;