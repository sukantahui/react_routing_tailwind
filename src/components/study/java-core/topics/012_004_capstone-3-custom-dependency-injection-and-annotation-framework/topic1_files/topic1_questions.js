const topic1_questions = [
  {
    "question": "Why is @Retention(RetentionPolicy.RUNTIME) mandatory for custom Dependency Injection annotations?",
    "shortAnswer": "Because without RUNTIME retention, the compiler discards annotations or stores them in class files without loading them into JVM memory, making them completely invisible to reflection APIs (Class.getAnnotations(), Field.isAnnotationPresent()).",
    "explanation": "Essential for runtime metadata inspection.",
    "hint": "Makes annotations visible to JVM reflection at runtime.",
    "level": "Beginner",
    "codeExample": "@Retention(RetentionPolicy.RUNTIME)"
  },
  {
    "question": "Why are stereotype annotations like @Service and @Repository useful even if they behave identically to @Component?",
    "shortAnswer": "They convey explicit architectural intent (domain layering), enable layer-specific exception translation, and allow AOP pointcuts to target specific layers (e.g. apply caching only to @Repository beans).",
    "explanation": "Domain clarity and specialized aspect targeting.",
    "hint": "Communicates domain intent and allows layer-specific AOP targeting.",
    "level": "Intermediate",
    "codeExample": "@Service public class PaymentService { ... }"
  }
];

export default topic1_questions;
