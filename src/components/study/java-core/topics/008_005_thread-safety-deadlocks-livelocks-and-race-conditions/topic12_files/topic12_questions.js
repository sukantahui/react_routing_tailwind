const topic12_questions = [
  {
    "question": "How do you trace a circular deadlock by inspecting a JVM thread dump stack trace?",
    "shortAnswer": "1. Locate threads in the 'BLOCKED (on object monitor)' state. 2. For each thread, examine the '- locked <0xHEX>' and '- waiting to lock <0xHEX>' memory address lines. 3. Trace the circular ownership: verify if Thread 1 locked Address A and is waiting to lock Address B, while Thread 2 locked Address B and is waiting to lock Address A. 4. Scroll to the bottom where HotSpot prints the automatic 'Found 1 deadlock' summary listing the exact Java file and line numbers where the lock invocations occurred.",
    "explanation": "Production JVM troubleshooting and thread dump forensics.",
    "hint": "Match the - locked <0xHEX> and - waiting to lock <0xHEX> addresses across BLOCKED threads.",
    "level": "Intermediate",
    "codeExample": "BLOCKED: - waiting to lock <0xABC> held by Thread-2; Thread-2: - waiting to lock <0xXYZ> held by Thread-1"
  }
];

export default topic12_questions;