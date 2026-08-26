const topic13_questions = [
  {
    "question": "Why is relying on 'Thread.setPriority()' considered a serious anti-pattern in cross-platform Java applications?",
    "shortAnswer": "Thread priorities in Java (ranging from 1 to 10) are merely 'hints' to the underlying Operating System kernel scheduler. Modern OS schedulers (such as Linux Completely Fair Scheduler - CFS, Windows, and macOS) have different priority scales and policies, often ignoring Java priority levels completely for non-privileged processes. Furthermore, relying on priorities can lead to unpredictable CPU starvation bugs. Application logic should use explicit concurrency synchronizers instead of priorities.",
    "explanation": "Standard cross-platform portability and JVM scheduling reality.",
    "hint": "Priorities are only hints; modern OS kernels map them differently and may ignore them completely.",
    "level": "Intermediate",
    "codeExample": "t.setPriority(Thread.MAX_PRIORITY); // Only a hint to the OS scheduler!"
  }
];

export default topic13_questions;