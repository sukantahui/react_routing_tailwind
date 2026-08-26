const topic5_questions = [
  {
    "question": "What are the core reasons to create custom user-defined exceptions instead of using generic RuntimeException in enterprise Java?",
    "shortAnswer": "1. Semantic domain signaling: Class names (like 'UserNotFoundException') immediately clarify business intent. 2. Granular error routing: Allows callers to catch specific business failures independently. 3. Rich domain metadata: Custom exceptions can store structured attributes (like account numbers, timestamps, and error codes) for automated audits.",
    "explanation": "Fundamental to building domain-driven microservice architectures.",
    "hint": "Semantic clarity, granular catch blocks, and rich domain metadata fields.",
    "level": "Beginner",
    "codeExample": "public class InsufficientFundsException extends Exception { ... }"
  }
];

export default topic5_questions;