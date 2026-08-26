const topic1_questions = [
  {
    "question": "Explain the key differences between an Operating System 'Process' and a Java 'Thread'.",
    "shortAnswer": "A 'Process' is an independent heavyweight program executing in its own isolated memory address space; processes communicate via complex Inter-Process Communication (IPC) and a crash in one does not affect others. A 'Thread' is a lightweight unit of execution within a process that shares the JVM Heap, Metaspace, and open file handles with other threads in that same process, communicating easily via shared objects with fast context switching.",
    "explanation": "Core operating systems and multithreading foundation question.",
    "hint": "Processes have isolated memory spaces; threads share heap memory within the same process.",
    "level": "Beginner",
    "codeExample": "long pid = ProcessHandle.current().pid(); // OS Process ID"
  }
];

export default topic1_questions;