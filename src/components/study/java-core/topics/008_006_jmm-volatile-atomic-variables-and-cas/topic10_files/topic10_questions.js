const topic10_questions = [
  {
    "question": "What is hardware 'Compare-And-Swap' (CAS) and how does it achieve thread-safe mutations without traditional OS mutex locks?",
    "shortAnswer": "CAS (Compare-And-Swap) is an atomic hardware CPU instruction (such as 'LOCK CMPXCHG' on x86 processors or Load-Linked/Store-Conditional on ARM) that accepts three operands: a memory location (V), an expected old value (A), and a new value (B). The CPU atomically inspects V: if V == A, it updates V to B and returns 'true'; if V != A, memory is left untouched and it returns 'false'. Because the entire check-and-update is performed in a single indivisible CPU clock cycle at the silicon hardware level, threads achieve 100% thread safety without acquiring OS mutexes or blocking.",
    "explanation": "Core principle of lock-free data structures and modern concurrency.",
    "hint": "Atomic CPU instruction (LOCK CMPXCHG) that updates memory if and only if the current value matches the expected value in a single clock cycle.",
    "level": "Advanced",
    "codeExample": "boolean success = atomicInt.compareAndSet(expectedValue, newValue);"
  }
];

export default topic10_questions;