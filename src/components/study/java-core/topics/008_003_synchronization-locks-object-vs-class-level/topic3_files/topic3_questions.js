const topic3_questions = [
  {
    "question": "Where is an object's intrinsic lock (monitor) stored in the JVM, and what bytecode instructions enforce synchronized blocks?",
    "shortAnswer": "Every Java object contains an intrinsic monitor lock stored within the 'Mark Word' (first 8 bytes) of its Object Header. When compiling a 'synchronized' block, the 'javac' compiler emits two specific bytecode instructions: 'monitorenter' (which increments the monitor's entry count and locks the object) and 'monitorexit' (which decrements the entry count and releases the lock). The JVM automatically wraps the block in an exception table to ensure 'monitorexit' is executed even if an unexpected runtime exception is thrown.",
    "explanation": "Core JVM specification and HotSpot object header internals.",
    "hint": "Stored in Mark Word of Object Header; compiled to monitorenter and monitorexit bytecode instructions.",
    "level": "Advanced",
    "codeExample": "// Bytecode: monitorenter ... monitorexit"
  }
];

export default topic3_questions;