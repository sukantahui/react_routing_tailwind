const topic12_questions = [
  {
    "question": "What is 'Thread Pinning' in Java 21 Virtual Threads, what causes it, and how is it resolved?",
    "shortAnswer": "'Thread Pinning' occurs when a Virtual Thread performs a blocking I/O operation but is unable to unmount from its underlying OS Carrier Thread because its call stack contains: (1) an intrinsic 'synchronized' block/method, or (2) a Native method (JNI/C call). When pinned, the underlying OS Carrier Thread is frozen for the entire duration of the I/O, exhausting the carrier pool. It is resolved by refactoring legacy 'synchronized' blocks to use 'java.util.concurrent.locks.ReentrantLock', which was completely rewritten in Java 21 to support seamless unmounting.",
    "explanation": "Number one production performance gotcha when adopting Virtual Threads in Java 21.",
    "hint": "Occurs when blocking I/O runs inside synchronized or native methods; resolved by replacing synchronized with ReentrantLock.",
    "level": "Advanced",
    "codeExample": "// Replace: synchronized(lock) { doIo(); } → With: reentrantLock.lock(); try { doIo(); } finally { reentrantLock.unlock(); }"
  }
];

export default topic12_questions;