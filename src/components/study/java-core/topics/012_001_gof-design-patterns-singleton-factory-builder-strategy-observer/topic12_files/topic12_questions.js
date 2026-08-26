const topic12_questions = [
  {
    "question": "What is the primary role of a Virtual Proxy?",
    "shortAnswer": "To defer the instantiation and resource allocation of a heavy or expensive object until the exact moment one of its methods is first invoked (lazy initialization).",
    "explanation": "Core mechanism used by Hibernate lazy-loading entities.",
    "hint": "Defers object creation until it is actually needed.",
    "level": "Beginner",
    "codeExample": "if (realSubject == null) realSubject = new ExpensiveSubject();"
  },
  {
    "question": "How does Spring Framework use Dynamic Proxies to implement declarative transactions (@Transactional)?",
    "shortAnswer": "Spring generates a dynamic proxy wrapping the target service bean. When a transactional method is called, the proxy opens a database transaction, invokes the real service method, and commits or rolls back based on exceptions.",
    "explanation": "Aspect-Oriented Programming (AOP) mechanism in Spring.",
    "hint": "Wraps target beans to intercept method calls for transaction begin/commit/rollback.",
    "level": "Intermediate",
    "codeExample": "Proxy intercepts method -> begins tx -> delegates -> commits tx."
  }
];

export default topic12_questions;
