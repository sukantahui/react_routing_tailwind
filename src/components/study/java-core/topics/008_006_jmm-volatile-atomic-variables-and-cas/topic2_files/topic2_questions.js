const topic2_questions = [
  {
    "question": "What is 'Instruction Reordering', what are 'as-if-serial' semantics, and why does reordering break multi-threaded programs?",
    "shortAnswer": "'Instruction Reordering' is a performance optimization where the Java compiler, JIT compiler, and CPU pipeline rearrange the execution order of instructions to maximize CPU instruction-level parallelism and cache line efficiency. 'as-if-serial' semantics guarantee that reordering will never change the outcome within a SINGLE thread. However, across MULTIPLE threads, when Thread 1 writes 'data = 42; ready = true;', the CPU may reorder them so 'ready = true' is visible before 'data = 42', causing Thread 2 to observe 'ready == true' but read uninitialized 'data == 0'.",
    "explanation": "Foundational Java Memory Model concurrency concept.",
    "hint": "Compilers and CPUs reorder instructions for speed as long as single-threaded output is unchanged; breaks multi-threading.",
    "level": "Intermediate",
    "codeExample": "int a = 1; boolean ready = true; // May be executed as: ready = true; int a = 1;"
  }
];

export default topic2_questions;