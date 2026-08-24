// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What is 'Optimistic Concurrency Control' (OCC)?",
    shortAnswer: "A concurrency control strategy that allows multiple transactions to read and modify data without acquiring locks during the read phase, validating at update time whether another transaction modified the data in between.",
    explanation: "Core definition of optimistic concurrency control.",
    hint: "No locks during read; validates changes at update time using version checks.",
    level: "basic"
  },
  {
    question: "What is the standard SQL update pattern for version-based Optimistic Locking?",
    shortAnswer: "`UPDATE table SET col = ?, version = version + 1 WHERE id = ? AND version = ?;`.",
    explanation: "Standard OCC update statement syntax.",
    hint: "UPDATE ... SET version = version + 1 WHERE id = ? AND version = ?;",
    level: "basic"
  },
  {
    question: "How do you check whether an optimistic update succeeded in MySQL?",
    shortAnswer: "Inspect `ROW_COUNT()`: if `ROW_COUNT() = 1`, the update succeeded; if `ROW_COUNT() = 0`, a conflict occurred (data was modified by another transaction).",
    explanation: "Verifying OCC success via ROW_COUNT().",
    hint: "ROW_COUNT() = 1 means success; ROW_COUNT() = 0 means conflict detected.",
    level: "basic"
  },
  {
    question: "How do student profile edits for Mamata and Susmita illustrate Optimistic Locking?",
    shortAnswer: "Both read Mamata's profile at `version = 1`; Susmita submits first (updates to `version = 2`); Mamata submits second with `WHERE version = 1`, affecting 0 rows and gracefully prompting Mamata to review Susmita's changes.",
    explanation: "Real-world student profile OCC edit conflict.",
    hint: "Susmita increments version to 2; Mamata's update with version=1 affects 0 rows.",
    level: "basic"
  },
  {
    question: "Why is integer `version` preferred over `updated_at` timestamps for Optimistic Locking?",
    shortAnswer: "Integer versions are immune to operating system clock drift, NTP adjustments, and sub-millisecond precision truncation issues that can affect timestamp comparisons.",
    explanation: "Advantages of integer versioning over timestamps.",
    hint: "Integer versions avoid clock drift, NTP skew, and timestamp precision truncation.",
    level: "expert"
  },
  {
    question: "When is Optimistic Locking superior to Pessimistic Locking?",
    shortAnswer: "When user 'think-time' is long (e.g. editing a form in a browser for 5 minutes), conflict probability is low, and holding database locks for minutes is unacceptable.",
    explanation: "Ideal use cases for Optimistic Locking.",
    hint: "Long think-times, web UI form edits, and low-to-medium contention.",
    level: "basic"
  },
  {
    question: "When is Pessimistic Locking superior to Optimistic Locking?",
    shortAnswer: "In high-contention environments (e.g. flash sales, airline seat bookings, high-frequency banking debits) where frequent OCC retries would waste excessive CPU and network bandwidth.",
    explanation: "Ideal use cases for Pessimistic Locking.",
    hint: "High contention, frequent concurrent updates, and financial debit guards.",
    level: "basic"
  },
  {
    question: "How does Hibernate / Spring Data JPA implement Optimistic Concurrency Control?",
    shortAnswer: "By placing the `@Version` annotation on an integer or timestamp field in the JPA Entity, which automatically adds `AND version = ?` to all generated SQL `UPDATE` statements.",
    explanation: "JPA @Version annotation mapping.",
    hint: "@Version annotation on entity fields automatically manages version checks.",
    level: "expert"
  },
  {
    question: "What Java exception is thrown by Spring/Hibernate when an optimistic lock conflict occurs (`ROW_COUNT() = 0`)?",
    shortAnswer: "`OptimisticLockException` (or `ObjectOptimisticLockingFailureException`).",
    explanation: "Spring/Hibernate OCC exception class.",
    hint: "OptimisticLockException / ObjectOptimisticLockingFailureException.",
    level: "expert"
  },
  {
    question: "What is the recommended application response when an Optimistic Lock conflict is detected?",
    shortAnswer: "Depending on business logic: either automatically re-read the fresh state and retry the update (with exponential backoff), or notify the user that data has changed and prompt them to reload.",
    explanation: "Handling OCC conflict resolutions.",
    hint: "Retry with fresh data or prompt the user to review newer changes.",
    level: "basic"
  },
  {
    question: "Can Optimistic Concurrency Control eliminate Deadlocks completely?",
    shortAnswer: "YES for the read phase (since reads are lock-free), but the final `UPDATE` statement still acquires an Exclusive Record Lock briefly during execution.",
    explanation: "OCC impact on deadlocks.",
    hint: "Eliminates read lock deadlocks; updates still acquire brief record locks.",
    level: "expert"
  },
  {
    question: "What is 'Compare-And-Swap' (CAS) in database concurrency?",
    shortAnswer: "Updating a specific column only if its current database value matches the expected previously read value (e.g. `WHERE id = 101 AND status = 'PENDING'`).",
    explanation: "Compare-And-Swap pattern.",
    hint: "Updating only if the current state matches the expected state.",
    level: "basic"
  },
  {
    question: "How can Compare-And-Swap (CAS) prevent over-allocation without an explicit version column?",
    shortAnswer: "`UPDATE inventory SET stock = stock - 1 WHERE item_id = 101 AND stock >= 1;` (checks invariant directly in the `WHERE` clause).",
    explanation: "CAS inventory update pattern.",
    hint: "Check stock >= 1 directly in the UPDATE WHERE clause.",
    level: "expert"
  },
  {
    question: "Does an Optimistic Locking `SELECT` query acquire any locks in MySQL InnoDB?",
    shortAnswer: "NO; plain `SELECT id, balance, version FROM table WHERE id = ?` uses standard lock-free MVCC consistent snapshot reads.",
    explanation: "Lock-free nature of OCC reads.",
    hint: "No, reads are completely lock-free under MVCC.",
    level: "basic"
  },
  {
    question: "What happens if two concurrent transactions execute the exact same OCC `UPDATE` statement simultaneously?",
    shortAnswer: "The first transaction acquires the row lock, checks `version = 1`, increments `version` to 2, commits (`ROW_COUNT() = 1`); the second unblocks, sees `version` is now 2, affects 0 rows (`ROW_COUNT() = 0`).",
    explanation: "Serialized execution of concurrent OCC updates.",
    hint: "First succeeds (ROW_COUNT=1); second fails version check (ROW_COUNT=0).",
    level: "basic"
  },
  {
    question: "Why is OCC well-suited for RESTful HTTP APIs and microservices?",
    shortAnswer: "Because HTTP is stateless: an entity can be sent to a mobile/web client with its `version` field, and sent back in a `PUT`/`PATCH` request without keeping open database connections.",
    explanation: "Stateless architecture alignment with OCC.",
    hint: "Works seamlessly across stateless HTTP requests without keeping connections open.",
    level: "expert"
  },
  {
    question: "What HTTP response header is used in REST APIs to implement optimistic locking at the protocol level?",
    shortAnswer: "`ETag` (Entity Tag) paired with the `If-Match` request header (returns HTTP `412 Precondition Failed` on conflict).",
    explanation: "HTTP ETag and If-Match optimistic concurrency.",
    hint: "ETag header with If-Match (returns HTTP 412 on conflict).",
    level: "expert"
  },
  {
    question: "Can an application experience the 'ABA Problem' when using timestamps for OCC?",
    shortAnswer: "Yes; if a row is modified and then restored to its original value within the same timestamp resolution window; integer versioning prevents this because versions strictly increment monotonically.",
    explanation: "The ABA problem in timestamp OCC.",
    hint: "Yes; integer versioning prevents the ABA problem by monotonically incrementing.",
    level: "expert"
  },
  {
    question: "What is the recommended data type for an integer `version` column in MySQL?",
    shortAnswer: "`BIGINT UNSIGNED NOT NULL DEFAULT 0` (or `INT UNSIGNED NOT NULL DEFAULT 0`).",
    explanation: "Data type definition for version column.",
    hint: "INT UNSIGNED or BIGINT UNSIGNED NOT NULL DEFAULT 0.",
    level: "basic"
  },
  {
    question: "What happens if a developer forgets to include `AND version = ?` in the `UPDATE` `WHERE` clause?",
    shortAnswer: "The update becomes an unconditional blind overwrite, completely bypassing optimistic concurrency protection and losing concurrent updates!",
    explanation: "Hazard of omitting version check in WHERE clause.",
    hint: "Causes an unconditional blind overwrite, bypassing OCC protection.",
    level: "basic"
  },
  {
    question: "How do you implement an automated retry loop for OCC conflicts in a MySQL Stored Procedure?",
    shortAnswer: "Use a `REPEAT ... UNTIL` loop with a max retry counter, re-reading the version and re-attempting the update until `ROW_COUNT() = 1` or retry limit is exceeded.",
    explanation: "Procedural OCC retry loop.",
    hint: "Use a REPEAT loop to re-read and retry until ROW_COUNT() = 1.",
    level: "expert"
  },
  {
    question: "How does Optimistic Locking impact database connection pool utilization compared to Pessimistic Locking?",
    shortAnswer: "OCC drastically reduces connection hold times because connections are checked out only for milliseconds during the instant of the update, rather than being held across long user interactions.",
    explanation: "Connection pool efficiency with OCC.",
    hint: "Drastically reduces connection hold times, maximizing pool capacity.",
    level: "expert"
  },
  {
    question: "Can Optimistic Locking be combined with `READ COMMITTED` isolation level?",
    shortAnswer: "YES; OCC pairs exceptionally well with `READ COMMITTED` for high-throughput OLTP web applications.",
    explanation: "OCC pairing with READ COMMITTED.",
    hint: "Yes, ideal combination for scalable web architectures.",
    level: "basic"
  },
  {
    question: "What is 'First-Committer-Wins' vs 'First-Reader-Wins'?",
    shortAnswer: "OCC follows 'First-Committer-Wins' (the transaction that commits first succeeds; subsequent committers fail); Pessimistic locking follows 'First-Reader-Wins' (the transaction that locks first blocks all others).",
    explanation: "First-committer vs first-reader paradigm.",
    hint: "OCC = First-Committer-Wins; Pessimistic = First-Reader-Wins.",
    level: "expert"
  },
  {
    question: "Does OCC require any special MySQL server configuration parameters?",
    shortAnswer: "NO; OCC is a logical application-level and schema design pattern implemented entirely via standard SQL `WHERE` clauses and column declarations.",
    explanation: "Application-level nature of OCC.",
    hint: "No, implemented purely via schema columns and SQL WHERE clauses.",
    level: "basic"
  },
  {
    question: "What happens if a row is deleted by another transaction before an OCC update executes?",
    shortAnswer: "The OCC `UPDATE` finds 0 matching rows (`ROW_COUNT() = 0`), which the application detects as a conflict or deleted entity.",
    explanation: "OCC handling of concurrent deletions.",
    hint: "Affects 0 rows, detected as an OCC conflict.",
    level: "basic"
  },
  {
    question: "Can an application use a UUID / Hash column for optimistic versioning?",
    shortAnswer: "Yes; generating a new UUID or MD5 hash of the row content on every update and checking `WHERE id = ? AND row_hash = ?` is a valid OCC pattern.",
    explanation: "Hash-based OCC pattern.",
    hint: "Yes, checking row_hash in the WHERE clause is valid.",
    level: "moderate"
  },
  {
    question: "How does Optimistic Locking perform under extreme 99% write contention on a single row?",
    shortAnswer: "Poorly: 99% of transactions fail the version check and must retry repeatedly, wasting massive CPU and network resources (pessimistic locking is preferred in extreme contention).",
    explanation: "OCC performance degradation under extreme contention.",
    hint: "Degrades under high contention due to repeated retry loops.",
    level: "expert"
  },
  {
    question: "What is the formula for calculating whether to choose OCC vs Pessimistic Locking?",
    shortAnswer: "If `(Conflict Probability * Cost of Retry) < Cost of Holding Locks`, choose **Optimistic Locking**; otherwise choose **Pessimistic Locking**.",
    explanation: "Mathematical decision heuristic for OCC vs Pessimistic locking.",
    hint: "Compare the cost of retries under conflict vs the cost of holding locks.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Optimistic Concurrency Control?",
    shortAnswer: "Implement **Optimistic Locking** with an integer `version BIGINT UNSIGNED NOT NULL DEFAULT 0` column for web UI workflows, microservices, and low-to-medium contention tables; always verify `ROW_COUNT() = 1`; implement automated application retry loops with exponential backoff; and reserve **Pessimistic Locking (`FOR UPDATE`)** for high-contention financial and inventory bottlenecks.",
    explanation: "Authoritative architectural best practices for Optimistic Concurrency Control.",
    hint: "Use integer version column for web/microservices + verify ROW_COUNT()=1 + retry with backoff + use FOR UPDATE for high contention.",
    level: "expert"
  }
];

export default questions;
