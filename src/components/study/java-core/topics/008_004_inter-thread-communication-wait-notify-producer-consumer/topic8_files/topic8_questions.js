const topic8_questions = [
  {
    "question": "What is a 'Spurious Wakeup' and why does the Java Memory Model allow it?",
    "shortAnswer": "A 'Spurious Wakeup' is when a thread wakes up from 'wait()' without any corresponding 'notify()' or 'notifyAll()' invocation, timeout, or interruption. It occurs because underlying Operating System kernel threading implementations (like POSIX pthreads on Linux/macOS and Windows condition variables) allow spontaneous wakeups to optimize low-level multi-core hardware context switches and avoid expensive kernel synchronization. The Java Language Specification explicitly permits spurious wakeups, mandating that developers always enclose 'wait()' inside a 'while' condition loop.",
    "explanation": "Core Java Concurrency / OS condition variable specification.",
    "hint": "OS kernel condition variables can wake threads spontaneously; always guard with a while loop.",
    "level": "Advanced",
    "codeExample": "while (!condition) { obj.wait(); } // Immune to spurious wakeups!"
  }
];

export default topic8_questions;