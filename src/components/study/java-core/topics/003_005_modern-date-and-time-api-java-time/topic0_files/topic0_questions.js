const topic0_questions = [
  {
    question: "What were the primary design flaws of legacy 'java.util.Date' and 'java.util.Calendar' in Java?",
    shortAnswer: "1. Mutability (objects could be modified in-place, causing multi-threading data races). 2. Non-thread-safe formatters ('SimpleDateFormat'). 3. 0-indexed months (0 was January). 4. Bizarre year offset (years were offset from 1900).",
    explanation: "These massive flaws prompted the introduction of JSR-310 (java.time) in Java 8.",
    hint: "Mutable state, non-thread-safe formatters, 0-indexed months, and 1900 year offsets.",
    level: "Beginner",
    codeExample: "// Legacy trap: cal.set(2026, 0, 1); // 0 is January!"
  }
];

export default topic0_questions;