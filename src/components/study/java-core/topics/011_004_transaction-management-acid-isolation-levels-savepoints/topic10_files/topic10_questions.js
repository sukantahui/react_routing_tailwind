const topic10_questions = [
  {
    "question": "What bug occurs if a connection with autoCommit=false is returned to a connection pool without being reset?",
    "shortAnswer": "The next application thread that borrows the connection will execute queries assuming standard auto-commit behavior, but the statements will remain uncommitted in a silent, open transaction, causing missing data updates and lock contention.",
    "explanation": "Known as Connection State Contamination.",
    "hint": "Subsequent threads execute queries that never commit automatically.",
    "level": "Intermediate",
    "codeExample": "conn.setAutoCommit(true); // Always restore in finally block"
  },
  {
    "question": "How does HikariCP handle a connection returned to the pool with an active uncommitted transaction?",
    "shortAnswer": "HikariCP detects the dirty transaction state, issues an automatic rollback() to discard uncommitted work and release locks, resets auto-commit to true, and logs a warning message.",
    "explanation": "Built-in safety net in modern enterprise connection pools.",
    "hint": "Automatically rolls back uncommitted work, resets auto-commit, and logs a warning.",
    "level": "Intermediate",
    "codeExample": "HikariCP auto-rollback on dirty connection close."
  }
];

export default topic10_questions;
