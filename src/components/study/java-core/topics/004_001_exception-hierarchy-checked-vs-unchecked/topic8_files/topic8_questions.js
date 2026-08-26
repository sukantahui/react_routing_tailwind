const topic8_questions = [
  {
    "question": "Why have modern Java frameworks (like Spring, Hibernate, and Quarkus) shifted away from Checked Exceptions toward Unchecked Exceptions?",
    "shortAnswer": "1. Eliminates signature pollution (intermediate service layers are not forced to declare 'throws' for DAO errors). 2. Enables seamless functional programming with Java 8 Streams and Lambdas. 3. Enables clean Centralized Exception Handling (e.g. '@ControllerAdvice' in Spring Web) where unhandled errors map automatically to HTTP error codes.",
    "explanation": "Checked exceptions are widely considered an experiment that failed in large-scale modern architectures.",
    "hint": "Eliminates boilerplate throws, enables lambda compatibility, and enables centralized error handlers.",
    "level": "Intermediate",
    "codeExample": "throw new ResponseStatusException(HttpStatus.NOT_FOUND, \"User missing\");"
  }
];

export default topic8_questions;