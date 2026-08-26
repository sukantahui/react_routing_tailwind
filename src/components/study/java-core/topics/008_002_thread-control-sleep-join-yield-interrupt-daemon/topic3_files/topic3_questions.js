const topic3_questions = [
  {
    "question": "Why should enterprise applications prefer overloaded 'thread.join(millis)' over unbounded 'thread.join()'?",
    "shortAnswer": "Unbounded 'thread.join()' causes the calling thread to wait indefinitely in the 'WAITING' state until the target thread terminates. If the target thread hangs (due to network socket deadlocks, database connection timeouts, or infinite loops), the calling thread hangs forever, leaking resources and freezing upstream systems. Overloaded 'thread.join(millis)' transitions the caller to 'TIMED_WAITING', enforcing an SLA timeout so the caller can take fallback or recovery actions.",
    "explanation": "Enterprise resilience and fail-fast architectural pattern.",
    "hint": "Bounded join(millis) prevents indefinite thread hangs if the target thread freezes or encounters network issues.",
    "level": "Intermediate",
    "codeExample": "thread.join(2000); // Waits at most 2 seconds before timing out"
  }
];

export default topic3_questions;