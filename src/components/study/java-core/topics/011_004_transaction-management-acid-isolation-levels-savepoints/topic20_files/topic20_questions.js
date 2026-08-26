const topic20_questions = [
  {
    "question": "What must client applications be prepared to handle when using TRANSACTION_SERIALIZABLE under modern engines like PostgreSQL SSI?",
    "shortAnswer": "They must handle serialization failure exceptions (SQLState '40001' / 'could not serialize access due to read/write dependencies') by implementing an automatic retry loop that re-executes the transaction from the beginning.",
    "explanation": "Serializable engines use optimistic conflict detection and abort conflicting transactions.",
    "hint": "Must implement retry loops to handle serialization failure exceptions (SQLState 40001).",
    "level": "Advanced",
    "codeExample": "while (retries < MAX) { try { ... commit(); break; } catch (SerializationException e) { retries++; } }"
  },
  {
    "question": "Does TRANSACTION_SERIALIZABLE guarantee that transactions actually run single-threaded on the database server?",
    "shortAnswer": "No, transactions execute concurrently in parallel, but the engine uses lock graphs or Serializable Snapshot Isolation (SSI) to ensure the observable outcome is identical to some serial sequence.",
    "explanation": "Concurrent execution with serial equivalence.",
    "hint": "Runs concurrently in parallel while mathematically guaranteeing serial outcome equivalence.",
    "level": "Intermediate",
    "codeExample": "Concurrent Parallel Execution + Strict Serial Equivalence."
  }
];

export default topic20_questions;
