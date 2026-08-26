const topic9_questions = [
  {
    "question": "Do 'finally' blocks in Daemon threads execute when the JVM terminates because all User threads have finished?",
    "shortAnswer": "NO, they are NOT guaranteed to execute. When the last User thread finishes, the JVM halts immediately and abruptly aborts all running Daemon threads without unwinding their call stacks. Consequently, 'finally' blocks inside Daemon threads will NOT execute, and resources like open file streams or network sockets will not be flushed cleanly. Never perform critical I/O or database writes inside Daemon threads without explicit shutdown hooks.",
    "explanation": "Core Java runtime specification regarding daemon threads and JVM termination.",
    "hint": "Finally blocks in daemon threads do not execute upon JVM shutdown; avoid writing critical files in daemons.",
    "level": "Intermediate",
    "codeExample": "t.setDaemon(true); // Warning: finally block may NOT run when JVM exits!"
  }
];

export default topic9_questions;