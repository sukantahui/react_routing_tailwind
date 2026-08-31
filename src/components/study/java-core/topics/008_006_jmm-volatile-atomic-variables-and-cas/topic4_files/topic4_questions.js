const topic4_questions = [
  {
    "question": "What is the 'Happens-Before' relationship in Java and what are its primary rules?",
    "shortAnswer": "The 'Happens-Before' relationship is the foundational partial ordering rule of the Java Memory Model. If action A happens-before action B, the JVM guarantees that all memory mutations executed in A are fully visible to action B, and no reordering can place B before A. The core rules are: 1. 'Program Order' (within a single thread). 2. 'Monitor Lock' (unlock on monitor happens-before subsequent lock on same monitor). 3. 'Volatile Variable' (write to volatile happens-before subsequent read of that volatile). 4. 'Thread Start' (calling start() happens-before run()). 5. 'Thread Join' (all actions in thread happen-before join() returns). 6. 'Transitivity' (if A → B and B → C, then A → C).",
    "explanation": "Central theorem of the Java Memory Model (JLS §17.4.5).",
    "hint": "If A happens-before B, memory writes from A are guaranteed visible to B; includes volatile, lock, start, join, and transitivity.",
    "level": "Advanced",
    "codeExample": "// Volatile write in Thread 1 happens-before Volatile read in Thread 2."
  }
];

export default topic4_questions;