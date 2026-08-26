const topic17_questions = [
  {
    "question": "In what production scenario is TRANSACTION_READ_UNCOMMITTED appropriate?",
    "shortAnswer": "For high-frequency analytical queries, telemetry monitoring, or approximate counter aggregation where dirty reads do not impact correctness and preventing read locks on write-heavy tables is paramount.",
    "explanation": "Avoids interfering with write-heavy transactional tables.",
    "hint": "Approximate analytics and telemetry dashboards where absolute precision is not critical.",
    "level": "Intermediate",
    "codeExample": "conn.setTransactionIsolation(Connection.TRANSACTION_READ_UNCOMMITTED);"
  },
  {
    "question": "Does TRANSACTION_READ_UNCOMMITTED acquire shared read locks on tables in traditional locking databases?",
    "shortAnswer": "No, queries under READ UNCOMMITTED do not acquire shared locks, allowing them to read rows without waiting for concurrent transactions to finish writing.",
    "explanation": "Eliminates read lock wait times at the expense of data freshness guarantees.",
    "hint": "No shared read locks are acquired.",
    "level": "Intermediate",
    "codeExample": "Zero read lock contention."
  }
];

export default topic17_questions;
