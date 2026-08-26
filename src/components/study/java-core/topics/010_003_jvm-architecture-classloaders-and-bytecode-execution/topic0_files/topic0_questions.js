const topic0_questions = [
  {
    "question": "What are the four primary subsystems of the Java Virtual Machine?",
    "shortAnswer": "1. ClassLoader Subsystem, 2. Runtime Data Areas (Memory), 3. Execution Engine (Interpreter, JIT, GC), and 4. Java Native Interface (JNI) & Native Method Libraries.",
    "explanation": "Standard HotSpot JVM high-level architectural specification.",
    "hint": "ClassLoader, Runtime Memory Areas, Execution Engine, and JNI.",
    "level": "Beginner",
    "codeExample": "JVM = ClassLoaders + Memory (Heap/Stack) + Engine (JIT/GC) + JNI"
  },
  {
    "question": "What is the role of the Execution Engine in the JVM?",
    "shortAnswer": "The Execution Engine reads bytecode from the Runtime Data Areas and executes it either by interpreting instructions one-by-one or compiling frequently executed 'hot' methods into native machine code via the JIT (Just-In-Time) compiler.",
    "explanation": "Combines fast startup (Interpreter) with peak performance (JIT).",
    "hint": "Interprets and JIT-compiles bytecode into native CPU instructions.",
    "level": "Intermediate",
    "codeExample": "Interpreter -> JIT Compiler (C1/C2) -> Native CPU Execution"
  }
];

export default topic0_questions;
