const topic14_questions = [
  {
    "question": "How does a Non-Repeatable Read differ from a Dirty Read?",
    "shortAnswer": "In a Dirty Read, the data read is UNCOMMITTED (and may be rolled back). In a Non-Repeatable Read, the data read is COMMITTED by another transaction, but it causes the reading transaction to see different values when querying the same row multiple times within a single transaction.",
    "explanation": "Dirty read involves uncommitted changes; non-repeatable read involves committed changes.",
    "hint": "Dirty Read = uncommitted data; Non-Repeatable Read = committed updates causing row value differences.",
    "level": "Intermediate",
    "codeExample": "Non-repeatable read: SELECT returns 4000, then re-query returns 6000."
  },
  {
    "question": "Which JDBC isolation level is the minimum required to prevent Non-Repeatable Reads?",
    "shortAnswer": "Connection.TRANSACTION_REPEATABLE_READ",
    "explanation": "Maintains snapshot or read locks on queried rows for transaction duration.",
    "hint": "REPEATABLE_READ.",
    "level": "Beginner",
    "codeExample": "conn.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);"
  }
];

export default topic14_questions;
