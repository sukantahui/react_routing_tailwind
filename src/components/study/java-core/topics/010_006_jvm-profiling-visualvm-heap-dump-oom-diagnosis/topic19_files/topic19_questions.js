const topic19_questions = [
  {
    "question": "What are the 5 standard steps in the production JVM memory leak triage runbook?",
    "shortAnswer": "1. Capture HPROF heap dump, 2. Open in Eclipse MAT and run Leak Suspects Report, 3. Inspect Dominator Tree sorted by Retained Heap, 4. Trace Shortest Path to GC Roots excluding weak references, 5. Apply the code fix (bounded cache/cleanup).",
    "explanation": "Industry-standard root cause analysis workflow.",
    "hint": "1. Capture dump, 2. Leak suspects, 3. Dominator tree, 4. Path to GC roots, 5. Fix code.",
    "level": "Beginner",
    "codeExample": "Dump → MAT → Dominator Tree → Path to GC Roots → Code Fix"
  },
  {
    "question": "Why should session or transaction data always be cleared in a finally block or interceptor completion callback?",
    "shortAnswer": "To guarantee cleanup even when unhandled runtime exceptions occur during request processing, ensuring that failed requests do not silently leak memory into long-lived maps or ThreadLocals.",
    "explanation": "Essential for server-side resilience.",
    "hint": "Guarantees cleanup even if runtime exceptions are thrown during processing.",
    "level": "Intermediate",
    "codeExample": "try { service.process(); } finally { service.cleanup(); }"
  }
];

export default topic19_questions;
