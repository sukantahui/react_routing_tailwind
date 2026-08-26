const topic3_questions = [
  {
    "question": "How does an enterprise Resilient Retry Engine distinguish between Transient and Permanent exceptions during fault tolerance recovery?",
    "shortAnswer": "Transient exceptions (like network timeouts or database deadlock errors) represent temporary glitches that can succeed upon immediate or exponential backoff retry. Permanent exceptions (like validation failures or missing user records) will never succeed on retry and must FAST-FAIL immediately without wasting retries.",
    "explanation": "Core design principle behind Spring Retry, Resilience4j, and AWS SDK client retries.",
    "hint": "Transient errors are retried with exponential backoff; permanent errors fast-fail immediately.",
    "level": "Advanced",
    "codeExample": "if (e instanceof PermanentException) throw e; else retry();"
  }
];

export default topic3_questions;