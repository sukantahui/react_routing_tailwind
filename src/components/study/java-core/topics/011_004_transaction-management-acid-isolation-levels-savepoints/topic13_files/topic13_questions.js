const topic13_questions = [
  {
    "question": "Why is a Dirty Read dangerous in enterprise financial applications?",
    "shortAnswer": "Because the application makes real-world decisions or executes payments based on uncommitted data changes that may be immediately rolled back by the originating transaction, resulting in data inconsistency and financial loss.",
    "explanation": "Uncommitted changes can be aborted at any moment.",
    "hint": "Application acts upon data that gets rolled back and never permanently existed.",
    "level": "Beginner",
    "codeExample": "Tx 1 uncommitted update → Tx 2 reads dirty data → Tx 1 rolls back."
  },
  {
    "question": "Under which JDBC isolation level can Dirty Reads occur?",
    "shortAnswer": "Connection.TRANSACTION_READ_UNCOMMITTED",
    "explanation": "The lowest isolation level which allows uncommitted read access.",
    "hint": "TRANSACTION_READ_UNCOMMITTED.",
    "level": "Beginner",
    "codeExample": "conn.setTransactionIsolation(Connection.TRANSACTION_READ_UNCOMMITTED);"
  }
];

export default topic13_questions;
