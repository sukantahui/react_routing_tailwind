const topic6_questions = [
  {
    "question": "How do you create a custom Unchecked Exception in Java and what are its signature requirements?",
    "shortAnswer": "Create a class that extends 'java.lang.RuntimeException'. Because it is unchecked, methods that throw it are NOT required to declare 'throws' in their signatures, and callers are NOT forced by the compiler to wrap calls in try-catch blocks.",
    "explanation": "Dominant exception pattern in modern Spring Boot and Microservice development.",
    "hint": "Extend RuntimeException; no throws signature is required.",
    "level": "Beginner",
    "codeExample": "public class TokenExpiredException extends RuntimeException { public TokenExpiredException(String msg){super(msg);} }"
  }
];

export default topic6_questions;