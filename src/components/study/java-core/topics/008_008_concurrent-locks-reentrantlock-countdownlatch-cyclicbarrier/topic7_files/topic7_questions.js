const topic7_questions = [
  {
    "question": "What is 'CountDownLatch' in Java, how does it coordinate threads, and can it be reset after reaching zero?",
    "shortAnswer": "'CountDownLatch' is a one-time synchronization barrier initialized with an integer count N. Threads calling 'latch.await()' block until the count reaches zero. Worker threads perform independent tasks and call 'latch.countDown()', which decrements the counter atomically. When the count reaches 0, the latch opens and all waiting threads are released simultaneously. 'CountDownLatch CANNOT be reset'—its count is strictly one-way and irreversible; if you need a reusable barrier, use 'CyclicBarrier'.",
    "explanation": "Foundational Java concurrency synchronizer from java.util.concurrent.",
    "hint": "Initialized with count N; workers call countDown(); master calls await(); CANNOT be reset.",
    "level": "Intermediate",
    "codeExample": "CountDownLatch latch = new CountDownLatch(3); latch.countDown(); latch.await();"
  }
];

export default topic7_questions;