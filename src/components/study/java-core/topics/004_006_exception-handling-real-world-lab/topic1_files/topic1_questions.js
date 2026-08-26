const topic1_questions = [
  {
    "question": "What are the standard fields recommended by RFC 7807 (Problem Details for HTTP APIs) in a unified enterprise error response model?",
    "shortAnswer": "1. 'timestamp': UTC Instant of failure. 2. 'status': HTTP status integer (e.g. 400, 404, 500). 3. 'errorCode': Domain-specific business error code string (e.g. 'ERR_VALIDATION_4001'). 4. 'message': Human-readable summary. 5. 'path': Request endpoint URI path. 6. 'fieldErrors': Key-value map of invalid form fields.",
    "explanation": "Provides consistent, machine-parseable error responses across all REST microservices.",
    "hint": "timestamp, status, errorCode, message, path, and fieldErrors map.",
    "level": "Intermediate",
    "codeExample": "public record ApiError(Instant time, int status, String code, String message, String path) {}"
  }
];

export default topic1_questions;