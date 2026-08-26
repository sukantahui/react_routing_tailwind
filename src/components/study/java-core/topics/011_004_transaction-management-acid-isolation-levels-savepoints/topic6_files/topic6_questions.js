const topic6_questions = [
  {
    "question": "What is the very first method call required to begin a manual transaction on a JDBC Connection?",
    "shortAnswer": "conn.setAutoCommit(false)",
    "explanation": "Tells the JDBC driver not to commit statements automatically after execution.",
    "hint": "conn.setAutoCommit(false)",
    "level": "Beginner",
    "codeExample": "conn.setAutoCommit(false); // Starts manual transaction"
  },
  {
    "question": "Why should conn.rollback() be invoked in the catch block if any exception occurs during a multi-statement transaction?",
    "shortAnswer": "To immediately release all held database locks, discard intermediate dirty changes, and prevent accidental commits when the connection is reused.",
    "explanation": "Maintains database atomicity and avoids lock contention.",
    "hint": "Discards intermediate uncommitted changes and releases locks.",
    "level": "Beginner",
    "codeExample": "catch (SQLException e) { conn.rollback(); }"
  }
];

export default topic6_questions;
