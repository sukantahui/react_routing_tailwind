const topic4_questions = [
  {
    "question": "What is MVCC (Multi-Version Concurrency Control) and why is it used in modern relational databases?",
    "shortAnswer": "MVCC is a concurrency control technique where the database engine maintains multiple immutable versions of row data, allowing readers to query a consistent snapshot of past committed data without locking writers or being blocked by active updates.",
    "explanation": "Enables massive concurrent read/write throughput without deadlocks.",
    "hint": "Maintains multiple versions of data so readers never block writers.",
    "level": "Intermediate",
    "codeExample": "MVCC: Readers see snapshot without acquiring exclusive row locks."
  },
  {
    "question": "What trade-off exists between higher transaction isolation levels and database performance?",
    "shortAnswer": "Higher isolation levels (e.g. SERIALIZABLE) eliminate concurrency anomalies but increase locking, abort rates, and serialization conflicts, whereas lower isolation levels (e.g. READ COMMITTED) provide much higher concurrent throughput with minor concurrency anomalies.",
    "explanation": "Isolation strictness is balanced against throughput requirements.",
    "hint": "Higher isolation increases correctness but reduces concurrency throughput.",
    "level": "Intermediate",
    "codeExample": "Higher Isolation = Lower Concurrency & Higher Safety."
  }
];

export default topic4_questions;
