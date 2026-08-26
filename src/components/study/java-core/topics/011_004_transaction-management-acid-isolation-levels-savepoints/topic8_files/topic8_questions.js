const topic8_questions = [
  {
    "question": "What happens if an application calls connection.commit() while auto-commit is still set to true?",
    "shortAnswer": "The JDBC driver may throw a java.sql.SQLException (e.g. 'Can't call commit when autocommit=true' in MySQL/Oracle) or ignore it as a no-op.",
    "explanation": "Always call conn.setAutoCommit(false) before invoking commit().",
    "hint": "Throws java.sql.SQLException on many drivers.",
    "level": "Beginner",
    "codeExample": "conn.setAutoCommit(false); // Required before conn.commit()"
  },
  {
    "question": "What happens to locks held on database rows when connection.commit() executes?",
    "shortAnswer": "All shared and exclusive row locks acquired during the transaction are immediately released by the database engine, allowing other concurrent transactions to access those rows.",
    "explanation": "Releasing locks terminates lock contention.",
    "hint": "All acquired database locks are immediately released.",
    "level": "Intermediate",
    "codeExample": "commit() -> Releases X-Locks on updated rows."
  }
];

export default topic8_questions;
