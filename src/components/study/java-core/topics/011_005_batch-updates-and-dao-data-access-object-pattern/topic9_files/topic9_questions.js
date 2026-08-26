const topic9_questions = [
  {
    "question": "Why should a DAO class receive a DataSource via its constructor rather than creating DriverManager connections manually?",
    "shortAnswer": "To leverage connection pooling, enable easy configuration swapping between production connection pools and test databases, and avoid hardcoding database credentials inside data access classes.",
    "explanation": "Standard Dependency Injection and connection pooling best practice.",
    "hint": "Leverages connection pooling and enables swapping databases in tests.",
    "level": "Intermediate",
    "codeExample": "public StudentDaoJdbcImpl(DataSource dataSource) { this.ds = dataSource; }"
  },
  {
    "question": "Why do modern DAO implementations translate checked SQLException into unchecked RuntimeExceptions?",
    "shortAnswer": "Because callers in service or controller layers cannot meaningfully recover from low-level SQL syntax or socket connection failures; translating to unchecked exceptions prevents cluttering the entire business layer with checked throws clauses.",
    "explanation": "Standard Spring Data and Hibernate exception translation pattern.",
    "hint": "Prevents cluttering service methods with checked SQLExceptions that business logic cannot recover from.",
    "level": "Intermediate",
    "codeExample": "catch (SQLException e) { throw new DataAccessException(e); }"
  }
];

export default topic9_questions;
