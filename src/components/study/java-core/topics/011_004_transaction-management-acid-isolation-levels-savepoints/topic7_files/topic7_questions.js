const topic7_questions = [
  {
    "question": "Why does batch inserting 10,000 rows with auto-commit disabled run significantly faster than with auto-commit enabled?",
    "shortAnswer": "Because with auto-commit enabled, the database engine must perform an expensive disk fsync and Write-Ahead Log commit for every single row (10,000 disk syncs), whereas with auto-commit disabled, the database flushes all 10,000 rows in a single batch fsync at commit time.",
    "explanation": "Drastically minimizes disk I/O bottlenecks.",
    "hint": "Flushes disk write-ahead logs once at commit rather than 10,000 individual times.",
    "level": "Intermediate",
    "codeExample": "conn.setAutoCommit(false); // 1 commit fsync instead of 10,000"
  },
  {
    "question": "What happens if a query is executed when auto-commit is false and the program terminates normally without calling commit() or rollback()?",
    "shortAnswer": "The transaction is implicitly aborted and rolled back by the database server when the connection socket is closed.",
    "explanation": "Uncommitted transactions are never saved without an explicit commit.",
    "hint": "The database rolls back uncommitted changes upon connection closure.",
    "level": "Beginner",
    "codeExample": "No commit() called → Changes discarded on disconnect."
  }
];

export default topic7_questions;
