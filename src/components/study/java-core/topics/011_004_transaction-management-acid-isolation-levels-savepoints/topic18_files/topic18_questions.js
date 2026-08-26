const topic18_questions = [
  {
    "question": "Why is TRANSACTION_READ_COMMITTED the default isolation level in enterprise databases like PostgreSQL and Oracle?",
    "shortAnswer": "Because it provides the ideal balance between high concurrency throughput and data safety: it completely eliminates dangerous dirty reads while avoiding the heavy locking or serialization aborts of higher isolation levels.",
    "explanation": "The default benchmark for transactional web architectures.",
    "hint": "Optimal balance of high concurrency throughput and eliminating dirty reads.",
    "level": "Intermediate",
    "codeExample": "Default in PostgreSQL, Oracle, and MS SQL Server."
  },
  {
    "question": "Under TRANSACTION_READ_COMMITTED, how does MVCC determine which row version a query should read?",
    "shortAnswer": "The query reads the newest committed row version whose committing transaction ID is less than or equal to the current statement snapshot's transaction timestamp.",
    "explanation": "Uses transaction visibility maps without acquiring read locks.",
    "hint": "Reads the newest row version committed before the current statement began.",
    "level": "Advanced",
    "codeExample": "MVCC statement snapshot reads latest committed tuple."
  }
];

export default topic18_questions;
