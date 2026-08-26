const topic4_questions = [
  {
    "question": "What is stored in a thread's PC Register when it is executing a native C/C++ method via JNI?",
    "shortAnswer": "The value of the PC Register is 'Undefined' because native C/C++ instructions execute directly on the physical host CPU and are not managed by JVM bytecode offsets.",
    "explanation": "Defined explicitly in the JVM Specification Section 2.5.1.",
    "hint": "Undefined",
    "level": "Intermediate",
    "codeExample": "Executing Native C -> PC Register is Undefined"
  },
  {
    "question": "Which JVM memory area is the only one guaranteed by the specification never to throw an OutOfMemoryError?",
    "shortAnswer": "The Program Counter (PC) Register. It has a fixed, minute size (just enough to hold an instruction pointer) and requires no dynamic heap/stack memory allocation.",
    "explanation": "All other four areas can throw OutOfMemoryError or StackOverflowError.",
    "hint": "The Program Counter (PC) Register.",
    "level": "Beginner",
    "codeExample": "PC Register never throws OutOfMemoryError."
  }
];

export default topic4_questions;
