const topic1_questions = [
  {
    "question": "What is the primary role of the java.sql.DriverManager class in the JDBC architecture?",
    "shortAnswer": "DriverManager acts as the factory service locator that registers available database drivers and iterates through them to find one that recognizes the requested JDBC connection URL when DriverManager.getConnection() is called.",
    "explanation": "Coordinates driver registration and initial connection bootstrapping.",
    "hint": "Manages registered drivers and selects the correct one for the given URL.",
    "level": "Beginner",
    "codeExample": "DriverManager.getConnection('jdbc:postgresql://localhost/db', 'user', 'pass')"
  },
  {
    "question": "Why is the JDBC API composed almost entirely of interfaces rather than concrete classes?",
    "shortAnswer": "To achieve loose coupling and polymorphism. Java defines the abstract specification, allowing database vendors (Oracle, MySQL, Microsoft, Postgres) to write concrete implementations optimized for their specific database network protocols.",
    "explanation": "Separation of specification from vendor implementation.",
    "hint": "Defines the specification while vendor drivers provide the concrete implementations.",
    "level": "Intermediate",
    "codeExample": "Interface: java.sql.Connection; Impl: org.postgresql.jdbc.PgConnection"
  }
];

export default topic1_questions;
