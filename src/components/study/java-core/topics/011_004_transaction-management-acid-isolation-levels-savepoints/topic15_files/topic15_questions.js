const topic15_questions = [
  {
    "question": "How does a Phantom Read differ from a Non-Repeatable Read?",
    "shortAnswer": "A Non-Repeatable Read occurs when existing rows are updated with new values. A Phantom Read occurs on predicate range queries when newly inserted or deleted rows appear or disappear in subsequent queries, changing the set or count of matching rows.",
    "explanation": "Range scan insertions vs single row updates.",
    "hint": "Non-Repeatable Read = modified existing rows; Phantom Read = newly inserted/deleted rows in range query.",
    "level": "Intermediate",
    "codeExample": "Phantom Read: 10 rows on 1st query -> 11 rows on 2nd query."
  },
  {
    "question": "Which standard ANSI SQL isolation level is guaranteed to prevent Phantom Reads?",
    "shortAnswer": "Connection.TRANSACTION_SERIALIZABLE",
    "explanation": "Applies predicate range locks or strict serializable snapshot isolation.",
    "hint": "TRANSACTION_SERIALIZABLE.",
    "level": "Beginner",
    "codeExample": "conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);"
  }
];

export default topic15_questions;
