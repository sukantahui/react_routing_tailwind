const topic7_questions = [
  {
    "question": "Why should business Service classes never import java.sql.* or execute SQL queries directly?",
    "shortAnswer": "Because coupling business logic with SQL queries violates the Single Responsibility Principle, makes business rules impossible to unit-test without a database, and prevents switching persistence technologies without rewriting business code.",
    "explanation": "Preserves clean architectural boundaries and separation of concerns.",
    "hint": "Violates separation of concerns and prevents unit testing without a database.",
    "level": "Beginner",
    "codeExample": "Service classes should only consume Domain Models and DAO Interfaces."
  },
  {
    "question": "How does Constructor Dependency Injection help wire DAOs into Services?",
    "shortAnswer": "By passing the DAO interface instance into the Service constructor, the service remains decoupled from any specific implementation, allowing production code to inject a JDBC DAO while tests inject a Mock DAO.",
    "explanation": "Core pattern for loose coupling and testability.",
    "hint": "Passes DAO interface to service constructor for loose coupling.",
    "level": "Intermediate",
    "codeExample": "public UserService(UserDao dao) { this.dao = dao; }"
  }
];

export default topic7_questions;
