const topic12_questions = [
  {
    "question": "Why is giving descriptive names to threads via 'thread.setName()' or Thread constructors essential in production enterprise systems?",
    "shortAnswer": "In production, when servers experience deadlocks, memory leaks, or 100% CPU spikes, engineers take thread dumps using diagnostic tools like 'jstack', VisualVM, or JConsole. Default generated names like 'Thread-0' or 'pool-1-thread-1' make it nearly impossible to identify which component is malfunctioning. Descriptive names (e.g. 'Order-Payment-Worker-1', 'GST-Batch-Processor') allow immediate root-cause isolation.",
    "explanation": "Enterprise observability and JVM troubleshooting best practice.",
    "hint": "Enables instant root-cause analysis during production jstack thread dumps and deadlock diagnosis.",
    "level": "Beginner",
    "codeExample": "Thread t = new Thread(task, \"Payment-Processor-Worker-1\"); // Best practice"
  }
];

export default topic12_questions;