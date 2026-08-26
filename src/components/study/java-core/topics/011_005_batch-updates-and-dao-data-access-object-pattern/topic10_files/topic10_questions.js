const topic10_questions = [
  {
    "question": "Why should a Presentation/Controller component never call a DAO directly, bypassing the Service layer?",
    "shortAnswer": "Because bypassing the Service layer prevents business validation rules, authorization checks, auditing, and transaction demarcation from executing, leading to duplicated logic and compromised data integrity.",
    "explanation": "Preserves centralized business rule enforcement.",
    "hint": "Bypasses essential business validation and transaction management.",
    "level": "Beginner",
    "codeExample": "Always route: Controller -> Service -> DAO."
  },
  {
    "question": "What is the Dependency Inversion Principle (DIP) in the context of the DAO pattern?",
    "shortAnswer": "High-level service modules should not depend upon low-level database modules directly; both should depend upon abstractions (the DAO interface).",
    "explanation": "The 'D' in SOLID principles.",
    "hint": "Services depend on abstract DAO interfaces, not concrete JDBC classes.",
    "level": "Intermediate",
    "codeExample": "Service depends on StudentDao (interface), not StudentDaoJdbcImpl."
  }
];

export default topic10_questions;
