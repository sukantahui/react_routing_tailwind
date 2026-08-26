const topic2_questions = [
  {
    "question": "How does a centralized Global Exception Interceptor (like Spring's @ControllerAdvice) transform error handling architecture in Java web applications?",
    "shortAnswer": "It removes repetitive try-catch boilerplate from individual Controller endpoints. All unhandled exceptions bubble up to a single centralized interceptor gateway, which inspects the exception type, logs it once, and formats a standardized JSON ApiErrorResponse with appropriate HTTP status codes (400, 404, 422, 500).",
    "explanation": "Standard enterprise architectural pattern for all modern Java REST services.",
    "hint": "Centralizes error-to-HTTP mapping in one location, eliminating try-catch in controllers.",
    "level": "Intermediate",
    "codeExample": "@RestControllerAdvice public class GlobalErrorHandler { @ExceptionHandler ... }"
  }
];

export default topic2_questions;