const topic8_questions = [
  {
    "question": "Why does declaring 'volatile int count = 0;' fail to make 'count++' thread-safe under concurrent execution?",
    "shortAnswer": "'volatile' guarantees only Memory Visibility (that reads and writes go directly to main memory); it does NOT provide Mutual Exclusion or Atomicity. The 'count++' operation is a compound Read-Modify-Write sequence composed of 3 distinct bytecode instructions: (1) read value from memory, (2) increment register, (3) write back to memory. Even though the read and write operations are volatile, multiple threads can execute step 1 simultaneously, calculate the same incremented value in step 2, and write back the identical value in step 3, causing lost updates.",
    "explanation": "Number one most frequent technical interview trap regarding volatile.",
    "hint": "volatile provides visibility, not atomicity; count++ is 3 separate instructions that interleave.",
    "level": "Intermediate",
    "codeExample": "volatile int count = 0; count++; // NOT thread-safe! Use AtomicInteger instead."
  }
];

export default topic8_questions;