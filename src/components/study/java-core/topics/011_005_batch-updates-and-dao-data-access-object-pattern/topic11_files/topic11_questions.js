const topic11_questions = [
  {
    "question": "Why are in-memory databases like H2 or SQLite popular for testing DAO layers?",
    "shortAnswer": "Because they run embedded inside the JVM process in RAM with zero external server dependencies, execute queries in fractions of a millisecond, and automatically destroy all data when tests complete, ensuring test isolation.",
    "explanation": "Enables fast, isolated automated test suites in CI/CD pipelines.",
    "hint": "Runs entirely in RAM inside the JVM with zero external installation required.",
    "level": "Beginner",
    "codeExample": "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1"
  },
  {
    "question": "What is a potential caveat of testing DAOs against H2 when production uses PostgreSQL or Oracle?",
    "shortAnswer": "Dialect mismatches: H2 might accept SQL syntax or data types that fail on PostgreSQL/Oracle (or vice versa), and database-specific features (e.g. JSONB columns, stored procedures) may not behave identically.",
    "explanation": "Testcontainers with real database Docker images solve dialect disparities.",
    "hint": "SQL dialect differences between H2 and production database engines.",
    "level": "Intermediate",
    "codeExample": "Dialect divergence: H2 vs PostgreSQL JSONB / CTEs."
  }
];

export default topic11_questions;
