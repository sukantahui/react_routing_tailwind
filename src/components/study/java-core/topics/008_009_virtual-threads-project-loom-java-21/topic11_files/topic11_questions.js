const topic11_questions = [
  {
    "question": "Why is pooling Virtual Threads (e.g. placing them in a fixed-size thread pool) considered a major anti-pattern in Java 21?",
    "shortAnswer": "Platform threads were pooled because creating OS threads was expensive. Virtual Threads, however, are lightweight ephemeral objects (~few hundred bytes) designed to have a 1:1 lifetime with a single task (create, execute, die). Pooling virtual threads introduces unnecessary synchronization lock overhead and limits concurrency. If an application needs to throttle access to a limited downstream resource (like a database with only 20 connections), developers should throttle using a 'Semaphore', NOT by restricting virtual thread creation.",
    "explanation": "Core design philosophy and best practices of Project Loom.",
    "hint": "Virtual threads are ephemeral and cheap; never pool them. Use Semaphores to throttle downstream resources instead.",
    "level": "Intermediate",
    "codeExample": "// Anti-Pattern: new FixedThreadPool(20, virtualThreadFactory); // DO NOT POOL! Use Semaphore for throttling."
  }
];

export default topic11_questions;