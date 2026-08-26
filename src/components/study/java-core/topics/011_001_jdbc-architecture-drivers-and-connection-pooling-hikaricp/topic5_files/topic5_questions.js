const topic5_questions = [
  {
    "question": "Why does java.sql.Connection implement java.lang.AutoCloseable?",
    "shortAnswer": "To support Java's try-with-resources statement, ensuring that database connections, sockets, and server session handles are automatically closed and returned to the connection pool even if runtime exceptions occur.",
    "explanation": "Eliminates database connection leaks.",
    "hint": "Enables automatic cleanup with try-with-resources.",
    "level": "Beginner",
    "codeExample": "try (Connection conn = dataSource.getConnection()) { ... }"
  },
  {
    "question": "What is the default auto-commit mode of a newly opened JDBC Connection?",
    "shortAnswer": "True (auto-commit enabled), which means every individual SQL update or insert statement commits immediately to the database as its own independent transaction.",
    "explanation": "Must be set to false for manual multi-statement transaction management.",
    "hint": "True (enabled by default).",
    "level": "Beginner",
    "codeExample": "conn.setAutoCommit(false); // Begin manual transaction"
  }
];

export default topic5_questions;
