const topic5_questions = [
  {
    "question": "What is an OS 'Carrier Thread' in Project Loom and what does 'Mounting' and 'Unmounting' mean?",
    "shortAnswer": "A 'Carrier Thread' is a physical OS platform thread belonging to an internal JVM 'ForkJoinPool' scheduler (sized to match available CPU cores). 'Mounting' is the action where the JVM assigns a Virtual Thread to a Carrier Thread to execute its bytecode on a physical CPU core. 'Unmounting' occurs when the Virtual Thread initiates a blocking I/O operation (e.g. socket read, JDBC query, or Thread.sleep): the JVM captures the virtual thread's stack frames into a heap Continuation object and detaches it, immediately freeing the Carrier Thread to execute other virtual threads.",
    "explanation": "Core execution mechanics of Java 21 Virtual Threads.",
    "hint": "Carrier thread is the underlying OS worker; mounting attaches a virtual thread to run CPU instructions; unmounting detaches it on blocking I/O.",
    "level": "Intermediate",
    "codeExample": "VirtualThread[#21,Audit-VThread]/runnable@ForkJoinPool-1-worker-1"
  }
];

export default topic5_questions;