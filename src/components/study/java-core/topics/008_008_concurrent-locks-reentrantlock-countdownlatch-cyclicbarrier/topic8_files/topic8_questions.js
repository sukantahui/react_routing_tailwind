const topic8_questions = [
  {
    "question": "What is 'CyclicBarrier' in Java and how does its reusable rendezvous mechanism work?",
    "shortAnswer": "'CyclicBarrier' is a synchronization point where a fixed number of threads (N) must all converge ('await()') before any thread is allowed to continue. When the N-th thread calls 'await()', an optional 'barrierAction' Runnable is executed once by the last arriving thread, and all waiting threads are released to proceed into the next phase simultaneously. Unlike CountDownLatch, 'CyclicBarrier is CYCLIC (reusable)': it automatically resets its count back to N and can be used repeatedly across multi-phase algorithms (e.g. game loops, matrix simulations).",
    "explanation": "Core cyclic multi-phase barrier synchronization pattern.",
    "hint": "A reusable rendezvous point where N threads wait for each other; automatically resets after releasing threads.",
    "level": "Intermediate",
    "codeExample": "CyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println(\"Phase complete!\")); barrier.await();"
  }
];

export default topic8_questions;