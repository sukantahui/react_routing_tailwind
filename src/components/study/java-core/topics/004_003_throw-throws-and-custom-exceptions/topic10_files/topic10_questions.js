const topic10_questions = [
  {
    "question": "How do domain-specific custom exceptions (e.g. UserNotFoundException, DuplicateAccountException) map directly to modern HTTP REST status codes in Spring Boot microservices?",
    "shortAnswer": "1. 'UserNotFoundException' maps directly to HTTP 404 NOT_FOUND. 2. 'DuplicateAccountException' maps to HTTP 409 CONFLICT. 3. 'InsufficientBalanceException' maps to HTTP 422 UNPROCESSABLE_ENTITY. Global exception handlers ('@ExceptionHandler') intercept these custom exceptions and generate standardized REST responses automatically.",
    "explanation": "The core architectural pattern powering all modern enterprise Spring Boot and Quarkus APIs.",
    "hint": "Custom domain exceptions map cleanly to standard HTTP status codes in REST APIs.",
    "level": "Intermediate",
    "codeExample": "@ExceptionHandler(UserNotFoundException.class) @ResponseStatus(HttpStatus.NOT_FOUND) public ErrorDto handle() {}"
  }
];

export default topic10_questions;