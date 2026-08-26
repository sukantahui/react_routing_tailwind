const topic19_questions = [
  {
    "question": "How does REPEATABLE_READ ensure that reading the same row multiple times returns identical data?",
    "shortAnswer": "In MVCC databases, it creates a single consistent snapshot timestamp when the transaction performs its first read, reusing that exact snapshot for all subsequent queries so modifications committed by other transactions are hidden.",
    "explanation": "Anchors visibility to the initial transaction read snapshot.",
    "hint": "Reuses the transaction's initial snapshot timestamp for all queries.",
    "level": "Intermediate",
    "codeExample": "conn.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);"
  },
  {
    "question": "What is the default isolation level of the MySQL InnoDB storage engine?",
    "shortAnswer": "TRANSACTION_REPEATABLE_READ",
    "explanation": "MySQL defaults to Repeatable Read with Next-Key locking.",
    "hint": "TRANSACTION_REPEATABLE_READ.",
    "level": "Beginner",
    "codeExample": "MySQL InnoDB Default: REPEATABLE READ"
  }
];

export default topic19_questions;
