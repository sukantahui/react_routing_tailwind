const topic21_questions = [
  {
    "question": "When should connection.setTransactionIsolation(level) be called during a transaction lifecycle?",
    "shortAnswer": "It must be called before beginning a transaction or while no transaction is active on the connection. Changing isolation level mid-transaction can cause driver exceptions or an implicit commit depending on the RDBMS.",
    "explanation": "Must establish isolation level prior to starting work.",
    "hint": "Call before starting the transaction or while auto-commit is enabled.",
    "level": "Intermediate",
    "codeExample": "conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED); conn.setAutoCommit(false);"
  },
  {
    "question": "How do you inspect the current transaction isolation level of a Connection object?",
    "shortAnswer": "conn.getTransactionIsolation()",
    "explanation": "Returns the integer constant corresponding to the active level.",
    "hint": "conn.getTransactionIsolation()",
    "level": "Beginner",
    "codeExample": "int level = conn.getTransactionIsolation();"
  }
];

export default topic21_questions;
