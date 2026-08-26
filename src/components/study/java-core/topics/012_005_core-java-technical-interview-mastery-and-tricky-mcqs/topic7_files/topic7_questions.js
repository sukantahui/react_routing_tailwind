const topic7_questions = [
  {
    "question": "How do Virtual Threads (Project Loom) achieve high concurrency compared to traditional OS Platform Threads?",
    "shortAnswer": "Virtual Threads are lightweight JVM-managed tasks that consume only a few hundred bytes of heap memory and unmount from OS carrier threads during blocking I/O operations, allowing millions of concurrent tasks on modest hardware.",
    "explanation": "Project Loom M:N user-mode thread scheduling.",
    "hint": "Lightweight user-mode threads unmounting on blocking I/O.",
    "level": "Advanced",
    "codeExample": "Thread.startVirtualThread(task);"
  },
  {
    "question": "What is a 'Happens-Before' relationship in the Java Memory Model (JSR-133)?",
    "shortAnswer": "A formal specification guarantee that memory writes performed by one action are guaranteed to be visible to another specific action without data races or compiler/hardware reordering.",
    "explanation": "Core formal guarantee of Java Memory Model.",
    "hint": "Formal guarantee that memory writes of one action are visible to another.",
    "level": "Advanced",
    "codeExample": "volatile write happens-before subsequent volatile read."
  }
];

export default topic7_questions;
