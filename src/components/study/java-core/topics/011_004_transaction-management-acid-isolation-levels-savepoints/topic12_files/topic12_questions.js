const topic12_questions = [
  {
    "question": "What are the three standard ANSI SQL read anomalies that can occur in concurrent database transactions?",
    "shortAnswer": "1. Dirty Read, 2. Non-Repeatable Read (Fuzzy Read), and 3. Phantom Read.",
    "explanation": "Standard benchmark classifications for transaction isolation.",
    "hint": "Dirty Read, Non-Repeatable Read, Phantom Read.",
    "level": "Beginner",
    "codeExample": "3 Anomalies: Dirty Read, Non-Repeatable Read, Phantom Read."
  },
  {
    "question": "Which isolation level is the minimum required to prevent Dirty Reads?",
    "shortAnswer": "TRANSACTION_READ_COMMITTED (Connection.TRANSACTION_READ_COMMITTED).",
    "explanation": "Ensures transactions only read committed data.",
    "hint": "READ_COMMITTED.",
    "level": "Beginner",
    "codeExample": "conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);"
  }
];

export default topic12_questions;
