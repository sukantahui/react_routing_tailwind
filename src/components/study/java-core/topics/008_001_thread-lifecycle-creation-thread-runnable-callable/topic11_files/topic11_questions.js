const topic11_questions = [
  {
    "question": "What happens if a developer calls 'thread.run()' directly instead of 'thread.start()'?",
    "shortAnswer": "Calling 'thread.run()' directly executes the 'run()' method synchronously on the CURRENT calling thread (e.g. the 'main' thread) as a standard Java method call. No new native OS thread or private Call Stack is created, and zero concurrency or parallel execution occurs. In contrast, calling 'thread.start()' invokes native JVM code ('start0()') to allocate a new OS thread and private Call Stack, executing 'run()' asynchronously in parallel.",
    "explanation": "Number one most common multithreading interview and exam question.",
    "hint": "run() executes synchronously on the current thread; start() creates a new native OS thread and Call Stack.",
    "level": "Beginner",
    "codeExample": "t.run(); // Synchronous on main! | t.start(); // Asynchronous on new thread!"
  }
];

export default topic11_questions;