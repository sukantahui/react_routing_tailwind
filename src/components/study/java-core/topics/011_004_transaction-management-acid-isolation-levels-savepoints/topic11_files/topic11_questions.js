const topic11_questions = [
  {
    "question": "What is the purpose of java.sql.Savepoint in JDBC transaction management?",
    "shortAnswer": "A Savepoint defines a checkpoint within an active transaction that allows partial rollbacks: the application can roll back modifications made after the savepoint while preserving modifications made prior to the savepoint.",
    "explanation": "Enables nested sub-transaction control.",
    "hint": "Allows partial rollback of subsequent operations while preserving earlier ones.",
    "level": "Intermediate",
    "codeExample": "Savepoint sp = conn.setSavepoint(); ... conn.rollback(sp);"
  },
  {
    "question": "What does conn.releaseSavepoint(savepoint) do?",
    "shortAnswer": "It removes the specified Savepoint from the current transaction on the database server, freeing server memory and lock tracking resources.",
    "explanation": "Once released, you can no longer roll back to that savepoint.",
    "hint": "Frees savepoint resources on the database server.",
    "level": "Intermediate",
    "codeExample": "conn.releaseSavepoint(sp);"
  }
];

export default topic11_questions;
