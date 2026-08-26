const topic0_questions = [
  {
    "question": "Summarize the core architectural components of Java Exception Handling covered across Segment 4.",
    "shortAnswer": "1. The Throwable hierarchy (Error vs Exception). 2. Checked vs Unchecked exceptions. 3. Robust try-catch-finally flow control. 4. Semantic custom domain exceptions with metadata. 5. Automatic Resource Management (ARM) with AutoCloseable and suppressed exceptions. 6. Exception chaining and clean 3-tier enterprise error propagation.",
    "explanation": "The complete toolkit required to build production-grade fault-tolerant Java systems.",
    "hint": "Throwable tree, Checked vs Unchecked, ARM, Custom exceptions, and Chaining.",
    "level": "Intermediate",
    "codeExample": "try (var r = open()) { r.work(); } catch (DomainEx e) { log.error(e); }"
  }
];

export default topic0_questions;