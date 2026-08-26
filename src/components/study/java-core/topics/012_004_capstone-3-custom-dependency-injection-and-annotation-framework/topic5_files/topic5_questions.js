const topic5_questions = [
  {
    "question": "Why is constructor injection generally considered superior to field injection in enterprise architecture?",
    "shortAnswer": "Constructor injection ensures that dependencies cannot be null, allows immutable final fields, makes classes testable without reflection frameworks in plain unit tests, and fails immediately at compile/startup time if a dependency is missing.",
    "explanation": "Modern Spring best practice recommendation.",
    "hint": "Enables immutable final fields and easy instantiation in unit tests without reflection.",
    "level": "Intermediate",
    "codeExample": "public UserService(UserRepository repo) { this.repo = repo; }"
  },
  {
    "question": "What does field.setAccessible(true) do under the hood?",
    "shortAnswer": "It suppresses Java language access control checks for that specific Field object, enabling the framework to inspect and mutate private/protected fields at runtime.",
    "explanation": "Java reflection accessibility override.",
    "hint": "Suppresses JVM access control checks on private members.",
    "level": "Beginner",
    "codeExample": "field.setAccessible(true);"
  }
];

export default topic5_questions;
