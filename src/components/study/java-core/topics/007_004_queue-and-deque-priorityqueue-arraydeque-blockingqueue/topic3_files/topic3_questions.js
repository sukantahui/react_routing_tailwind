const topic3_questions = [
  {
    "question": "Why are 'offer()', 'poll()', and 'peek()' overwhelmingly preferred in concurrent, network, and high-performance Java applications?",
    "shortAnswer": "Because creating and throwing Java exceptions incurs severe CPU and memory performance penalties (allocating exception objects, capturing stack traces, and unwinding the JVM execution stack). Returning special values ('false' on full, 'null' on empty) allows algorithms to handle buffer states using lightweight branch checks (e.g. 'if (item == null)'), achieving maximum throughput.",
    "explanation": "Fundamental performance guideline for Java concurrency and messaging architectures.",
    "hint": "Avoids the heavy JVM performance penalty of creating and unwinding exception stack traces.",
    "level": "Intermediate",
    "codeExample": "Task t = queue.poll(); if (t != null) { process(t); } // Zero exception overhead"
  }
];

export default topic3_questions;