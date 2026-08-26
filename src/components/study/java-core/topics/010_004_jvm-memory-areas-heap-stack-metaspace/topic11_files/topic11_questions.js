const topic11_questions = [
  {
    "question": "How does TLAB enable lock-free object allocation in multi-threaded Java applications?",
    "shortAnswer": "By assigning each thread its own private slice of Eden memory, allowing threads to allocate objects concurrently using simple pointer bumping without acquiring global heap synchronization locks.",
    "explanation": "Eliminates global lock contention during high-throughput allocation.",
    "hint": "Allocates private Eden chunks per thread using lock-free pointer bumping.",
    "level": "Intermediate",
    "codeExample": "Thread A -> TLAB A; Thread B -> TLAB B (Concurrent & Lock-Free)"
  },
  {
    "question": "What happens when an object is too large to fit into a thread's current TLAB?",
    "shortAnswer": "The JVM either allocates a new TLAB for the thread or directly allocates the large object in the shared Eden/Old generation using an atomic CAS (Compare-And-Swap) operation.",
    "explanation": "Controlled by the TLAB refill waste limit threshold.",
    "hint": "Allocated in a new TLAB or directly on shared Eden/Old Gen.",
    "level": "Advanced",
    "codeExample": "Large object -> Direct Eden/Old Gen allocation via CAS."
  }
];

export default topic11_questions;
