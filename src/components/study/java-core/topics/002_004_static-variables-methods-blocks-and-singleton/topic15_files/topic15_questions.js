const topic15_questions = [
  {
    question: "Why is the 'volatile' keyword mandatory in Double-Checked Locking (DCL) Singleton in Java?",
    shortAnswer: "To prevent instruction reordering by the JVM JIT compiler and CPU hardware, ensuring the object is fully constructed before other threads see a non-null reference.",
    explanation: "Without 'volatile', another thread could see a partially initialized object reference due to memory reordering.",
    hint: "Prevents instruction reordering and guarantees visibility.",
    level: "Advanced",
    codeExample: "private static volatile Singleton instance;"
  }
];

export default topic15_questions;