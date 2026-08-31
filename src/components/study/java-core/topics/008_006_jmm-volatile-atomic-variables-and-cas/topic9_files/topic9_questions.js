const topic9_questions = [
  {
    "question": "Why is the 'volatile' keyword mandatory on the singleton instance variable in the Double-Checked Locking (DCL) pattern?",
    "shortAnswer": "In Java, 'instance = new Singleton()' is not an atomic operation. Under the hood, it executes in 3 steps: (1) allocate memory, (2) execute constructor, (3) assign memory reference to 'instance'. Without 'volatile', the compiler and CPU are allowed to reorder steps 2 and 3 ('allocate' → 'assign' → 'execute constructor'). If reordered, Thread B performing the first 'if (instance == null)' check may observe a non-null reference before Thread A's constructor has finished running, causing Thread B to use a corrupted, half-initialized object.",
    "explanation": "Classic Double-Checked Locking broken algorithm in pre-Java 5 and its volatile resolution in JSR-133.",
    "hint": "Prevents instruction reordering where the memory address is assigned before the constructor finishes, exposing half-initialized objects.",
    "level": "Advanced",
    "codeExample": "private static volatile Singleton instance; // Mandatory volatile in DCL"
  }
];

export default topic9_questions;