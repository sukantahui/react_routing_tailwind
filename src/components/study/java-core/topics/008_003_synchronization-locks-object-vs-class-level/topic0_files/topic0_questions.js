const topic0_questions = [
  {
    "question": "Why is 'count++' not thread-safe in Java, leading to race conditions under concurrent access?",
    "shortAnswer": "'count++' is not an atomic operation. At the bytecode and CPU level, it consists of 3 distinct instructions: 1. 'Read' current value from memory into a CPU register. 2. 'Modify' (increment) the register value by 1. 3. 'Write' the updated value back to main memory. When multiple threads execute these 3 steps simultaneously, their operations interleave, causing 'Lost Updates' where one thread overwrites another's increment.",
    "explanation": "Core race condition definition in computer science and the Java Memory Model.",
    "hint": "count++ consists of 3 steps: Read, Modify, Write; interleaving causes lost updates.",
    "level": "Beginner",
    "codeExample": "counter++; // 3 bytecode instructions: getstatic, iconst_1, iadd, putstatic"
  }
];

export default topic0_questions;