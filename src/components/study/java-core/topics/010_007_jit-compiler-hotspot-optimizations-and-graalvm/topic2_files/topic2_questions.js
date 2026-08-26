const topic2_questions = [
  {
    "question": "What are the two counters tracked by the JVM at Level 0 to detect hot code?",
    "shortAnswer": "1. The Invocation Counter (counts method entries), and 2. The Backedge Counter (counts loop iterations).",
    "explanation": "When their sum exceeds the compilation threshold, JIT compilation is queued.",
    "hint": "Invocation Counter and Backedge Counter.",
    "level": "Intermediate",
    "codeExample": "Invocation Count + Backedge Count > Threshold -> Triggers JIT"
  },
  {
    "question": "What is On-Stack Replacement (OSR) in the JVM execution engine?",
    "shortAnswer": "A JIT optimization technique where a long-running loop is compiled into native code while it is still actively executing, and the JVM replaces the interpreted stack frame with the native compiled frame mid-execution without waiting for the method to return.",
    "explanation": "Crucial for long-running batch loops.",
    "hint": "Swaps interpreted loop frames with native machine code mid-execution.",
    "level": "Advanced",
    "codeExample": "for (int i=0; i<10_000_000; i++) { ... } // Replaced on stack via OSR!"
  }
];

export default topic2_questions;
