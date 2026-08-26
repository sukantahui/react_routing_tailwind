const topic3_questions = [
  {
    "question": "Can two threads share local variables located in their respective stack frames?",
    "shortAnswer": "No! JVM Thread Stacks are strictly thread-private. A thread can never access or modify the stack frame or local variables of another thread, ensuring thread safety for local variables.",
    "explanation": "Only Heap and Metaspace objects can be shared between threads.",
    "hint": "No, stack frames are completely private to each individual thread.",
    "level": "Beginner",
    "codeExample": "Local variables are intrinsically thread-safe."
  },
  {
    "question": "What error is thrown when a thread's method invocation depth exceeds the allocated stack size?",
    "shortAnswer": "java.lang.StackOverflowError, a subclass of VirtualMachineError caused by infinite recursion or excessively deep method call chains.",
    "explanation": "Tuned via the -Xss JVM flag.",
    "hint": "StackOverflowError",
    "level": "Beginner",
    "codeExample": "void loop() { loop(); } // Throws StackOverflowError"
  }
];

export default topic3_questions;
