const topic1_questions = [
  {
    "question": "Why does a worker thread running 'while (running)' enter an infinite loop when another thread sets 'running = false' if the field is not volatile?",
    "shortAnswer": "Because without the 'volatile' keyword or synchronization memory barriers, the JVM JIT compiler and hardware CPU assume the variable is only accessed by a single thread. The JIT compiler optimizes the loop by 'hoisting' the read out of the loop ('if (running) while(true)'), caching 'running = true' indefinitely in a CPU register or L1 cache. The worker thread never re-reads the updated value from main RAM, remaining trapped in an infinite loop.",
    "explanation": "Classic Java Memory Model visibility defect.",
    "hint": "JIT compiler hoists the variable read into a CPU register; the worker never checks RAM again.",
    "level": "Intermediate",
    "codeExample": "private static boolean running = true; // Stuck! Change to: private static volatile boolean running = true;"
  }
];

export default topic1_questions;