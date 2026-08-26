const topic8_questions = [
  {
    "question": "Why is attaching structured metadata fields (errorCode, transactionId, timestamp) to custom exceptions essential in modern enterprise microservices?",
    "shortAnswer": "Because structured metadata transforms raw error strings into machine-parseable audit records. It allows centralized API gateways and logging frameworks (e.g. ELK, Datadog) to extract error codes, correlate distributed transaction IDs, and generate standardized JSON error responses (RFC 7807 Problem Details) automatically.",
    "explanation": "Standard practice in REST APIs and financial transactions.",
    "hint": "Enables machine-parseable logging, distributed transaction tracing, and standardized JSON error payloads.",
    "level": "Intermediate",
    "codeExample": "public class ApiException extends RuntimeException { private final int status; private final String code; }"
  }
];

export default topic8_questions;