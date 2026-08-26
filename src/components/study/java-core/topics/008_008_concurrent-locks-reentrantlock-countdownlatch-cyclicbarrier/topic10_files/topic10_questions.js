const topic10_questions = [
  {
    "question": "How does 'java.util.concurrent.Semaphore' control access to shared resource pools and enforce rate limiting?",
    "shortAnswer": "'Semaphore' maintains a set of virtual 'permits'. Threads call 'semaphore.acquire()' to request a permit; if permits are available (> 0), one is deducted and the thread proceeds immediately. If zero permits remain, the calling thread blocks until another thread returns a permit via 'semaphore.release()'. Semaphores are ideal for throttling concurrency, managing connection pools (e.g. max 10 DB connections), and rate-limiting outbound API calls. A Semaphore initialized with 1 permit ('new Semaphore(1)') functions as a Binary Mutex.",
    "explanation": "Grand architectural capstone of Module 008_008.",
    "hint": "Maintains N permits; acquire() takes a permit; release() returns a permit in finally block.",
    "level": "Advanced",
    "codeExample": "Semaphore sem = new Semaphore(5); sem.acquire(); try { ... } finally { sem.release(); }"
  }
];

export default topic10_questions;