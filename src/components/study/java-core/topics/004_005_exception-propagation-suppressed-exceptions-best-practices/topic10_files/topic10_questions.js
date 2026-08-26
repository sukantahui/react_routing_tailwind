const topic10_questions = [
  {
    "question": "How should exceptions be architectured across a standard 3-tier enterprise application (Repository -> Service -> Controller)?",
    "shortAnswer": "1. Repository Layer: Catches or lets raw low-level database/I/O exceptions bubble up. 2. Service Layer: Translates low-level exceptions into high-level business domain exceptions with root cause chaining. 3. Controller Layer: Functions as the centralized error boundary, intercepting domain exceptions, logging them ONCE with full traces, and returning standardized HTTP error status payloads to clients.",
    "explanation": "The foundational architecture powering Spring Boot microservices globally.",
    "hint": "Repo accesses raw data; Service wraps in domain exceptions; Controller logs once and returns HTTP errors.",
    "level": "Advanced",
    "codeExample": "// Repo (SQLException) -> Service (DomainException) -> Controller (@ExceptionHandler HTTP 500)"
  }
];

export default topic10_questions;