const topic9_questions = [
  {
    "question": "Summarize the primary differences between 'CountDownLatch' and 'CyclicBarrier' in Java.",
    "shortAnswer": "1. 'Reusability': CountDownLatch is strictly one-time; once its count reaches zero it cannot be reset. CyclicBarrier is reusable and automatically resets its count back to N once all threads pass. 2. 'Coordination Model': CountDownLatch allows one or more coordinator threads to wait for N external events ('countDown()'). CyclicBarrier is a peer-to-peer rendezvous where N participating threads wait for EACH OTHER at a common barrier ('await()'). 3. 'Callback': CyclicBarrier supports an optional 'barrierAction' Runnable that executes when all threads arrive; CountDownLatch does not.",
    "explanation": "Classic Java concurrency interview comparison.",
    "hint": "Latch is one-time waiting for N events; Barrier is reusable rendezvous where N threads wait for each other.",
    "level": "Intermediate",
    "codeExample": "// Latch: latch.countDown(); latch.await(); | Barrier: barrier.await(); (Resets!)"
  }
];

export default topic9_questions;