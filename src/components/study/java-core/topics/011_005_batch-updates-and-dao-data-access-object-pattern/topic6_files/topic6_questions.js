const topic6_questions = [
  {
    "question": "What is the primary architectural purpose of the Data Access Object (DAO) pattern?",
    "shortAnswer": "To isolate all low-level data access, SQL queries, and database connection logic behind a clean Java interface, decoupling the business service layer from specific database storage technologies.",
    "explanation": "Promotes separation of concerns and single responsibility.",
    "hint": "Isolates SQL queries and data access logic behind clean Java interfaces.",
    "level": "Beginner",
    "codeExample": "Service Layer → StudentDao (Interface) → StudentDaoJdbcImpl (SQL/JDBC)"
  },
  {
    "question": "How does the DAO pattern enable easy unit testing of business service components?",
    "shortAnswer": "Because services depend on the DAO interface rather than concrete JDBC classes, test suites can inject in-memory Mock DAO implementations, allowing service logic to be tested instantly without running a real database.",
    "explanation": "Enables fast, dependency-free test execution.",
    "hint": "Services can be tested using Mock DAOs without needing a live database.",
    "level": "Intermediate",
    "codeExample": "StudentService service = new StudentService(new MockStudentDao());"
  }
];

export default topic6_questions;
