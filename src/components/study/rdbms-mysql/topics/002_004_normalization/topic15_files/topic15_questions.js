// topic15_files/topic15_questions.js

const questions = [
  {
    question: "What is Denormalization in relational database engineering?",
    shortAnswer: "The strategic, deliberate re-introduction of controlled data redundancy into a normalized schema to optimize read performance and eliminate join bottlenecks under high load.",
    explanation: "Standard industry definition of denormalization.",
    hint: "Deliberate re-introduction of controlled redundancy for read performance.",
    level: "basic"
  },
  {
    question: "What is the primary golden rule regarding when to apply Denormalization?",
    shortAnswer: "'Normalize until it hurts, Denormalize until it works' — Always start with a pristine 3NF/BCNF schema, and denormalize only when verified profiling reveals read bottlenecks.",
    explanation: "Best practice principle for denormalization.",
    hint: "Always normalize first; denormalize only based on proven read profiling.",
    level: "basic"
  },
  {
    question: "What is the fundamental engineering trade-off of Denormalization?",
    shortAnswer: "It speeds up READ operations by eliminating multi-table joins, at the expense of slower WRITE operations and increased risk of data desynchronization.",
    explanation: "Read vs Write trade-off in denormalization.",
    hint: "Faster READs vs slower WRITEs and desynchronization risks.",
    level: "basic"
  },
  {
    question: "Give an example of the 'Pre-Computed Derived Aggregates' denormalization pattern.",
    shortAnswer: "Storing `total_amount` and `item_count` directly in the `orders` table instead of running `SELECT SUM(price * qty)` across millions of child rows on every request.",
    explanation: "Pre-computed aggregates pattern.",
    hint: "Storing running totals directly on parent order records.",
    level: "basic"
  },
  {
    question: "Give an example of the 'Historical Snapshot Immutability' denormalization pattern.",
    shortAnswer: "Copying `unit_price_at_purchase` and `shipping_address` directly into the `orders` row to ensure invoice accuracy even if catalog prices change next year.",
    explanation: "Historical snapshot immutability pattern.",
    hint: "Freezing purchase price and address at checkout time.",
    level: "basic"
  },
  {
    question: "Why is copying `product_name` into `order_items` an effective denormalization pattern?",
    shortAnswer: "It allows customer order receipt pages to be rendered with a single fast query to `order_items` without joining the `products` table.",
    explanation: "Parent attribute replication in child tables.",
    hint: "Renders receipts without joining the products catalog.",
    level: "basic"
  },
  {
    question: "What mechanism in MySQL can automatically keep denormalized parent totals synchronized with child inserts?",
    shortAnswer: "MySQL `AFTER INSERT`, `AFTER UPDATE`, and `AFTER DELETE` database triggers.",
    explanation: "Automated trigger-based synchronization.",
    hint: "MySQL AFTER INSERT/UPDATE triggers.",
    level: "moderate"
  },
  {
    question: "What is the danger of premature denormalization?",
    shortAnswer: "It introduces complex data synchronization overhead, increased disk usage, and update anomaly risks before exploring simpler optimizations like composite B-Tree indexes or query tuning.",
    explanation: "Risks of premature denormalization.",
    hint: "Adds sync complexity before exhausting indexing and query tuning.",
    level: "basic"
  },
  {
    question: "In high-throughput e-commerce, why is a denormalized read model preferred for catalog search?",
    shortAnswer: "Because catalog reads exceed writes by 100:1 or more; querying a flat pre-joined table (or Elasticsearch index) delivers sub-millisecond responses without multi-table join locks.",
    explanation: "Read-heavy catalog query architecture.",
    hint: "Reads drastically outnumber writes (100:1 ratio).",
    level: "moderate"
  },
  {
    question: "How does Command Query Responsibility Segregation (CQRS) apply denormalization?",
    shortAnswer: "It maintains a fully normalized 3NF/BCNF database for WRITE transactions (Commands), and asynchronously synchronizes a denormalized database or cache for READ queries.",
    explanation: "CQRS architectural pattern with denormalization.",
    hint: "Normalized database for writes, denormalized model for reads.",
    level: "expert"
  },
  {
    question: "What SQL command ensures that multiple updates across denormalized tables occur atomically?",
    shortAnswer: "`START TRANSACTION; ... COMMIT;` (ACID transaction block).",
    explanation: "ACID transaction protection for denormalized writes.",
    hint: "START TRANSACTION and COMMIT.",
    level: "basic"
  },
  {
    question: "What is a 'Materialized View' in relation to denormalization?",
    shortAnswer: "A pre-computed database table storing the physical results of a complex query (including joins and aggregates) that is periodically refreshed.",
    explanation: "Definition of Materialized Views.",
    hint: "A physical pre-computed table storing query join results.",
    level: "moderate"
  },
  {
    question: "How can scheduled reconciliation jobs prevent silent data drift in denormalized systems?",
    shortAnswer: "By periodically running background verification scripts that recalculate sums from raw child records and fix any desynchronized denormalized totals.",
    explanation: "Background data reconciliation strategy.",
    hint: "Periodic background audit scripts to detect and fix drift.",
    level: "moderate"
  },
  {
    question: "In academy management, if `student_courses` denormalizes `student_name`, what happens when a student changes their name?",
    shortAnswer: "All course enrollment rows for that student must be updated (an update anomaly introduced intentionally for read speed).",
    explanation: "Update cost of denormalization.",
    hint: "Must update all child enrollment rows.",
    level: "basic"
  },
  {
    question: "Why should product inventory counts (`available_stock`) be guarded carefully when denormalized?",
    shortAnswer: "Because concurrent checkouts can cause race conditions and overselling unless guarded by atomic updates (`SET stock = stock - 1 WHERE stock > 0`) or row-level locks.",
    explanation: "Concurrency and atomic updates in denormalized stock.",
    hint: "Requires atomic updates to prevent overselling race conditions.",
    level: "moderate"
  },
  {
    question: "What is the difference between an unnormalized 0NF table and a deliberately denormalized table?",
    shortAnswer: "0NF is caused by naive, sloppy design (e.g. CSV strings, repeating columns); denormalization is a deliberate, measured performance optimization derived from a formal 3NF baseline.",
    explanation: "0NF vs deliberate denormalization distinction.",
    hint: "0NF is accidental bad design; denormalization is intentional, engineered optimization.",
    level: "basic"
  },
  {
    question: "In social media platforms, why are follower counts (`followers_count`) denormalized on user profile records?",
    shortAnswer: "Because running `COUNT(*)` over millions of follower rows on every profile view would overwhelm the database servers.",
    explanation: "Social media follower count denormalization.",
    hint: "Avoids running COUNT(*) over millions of rows on profile views.",
    level: "basic"
  },
  {
    question: "What caching layers are commonly paired with denormalized relational data in high-throughput architectures?",
    shortAnswer: "In-memory key-value stores like Redis and Memcached.",
    explanation: "In-memory caching architectures.",
    hint: "Redis and Memcached.",
    level: "basic"
  },
  {
    question: "What is the impact of Denormalization on storage disk footprint?",
    shortAnswer: "It increases storage consumption because duplicated text strings and redundant foreign keys are stored repeatedly across millions of rows.",
    explanation: "Storage trade-off in denormalization.",
    hint: "Increases disk storage usage due to duplicate data.",
    level: "basic"
  },
  {
    question: "When should you NOT denormalize a database table?",
    shortAnswer: "In write-heavy systems where data updates are frequent, data integrity is strictly critical (e.g. banking ledgers), and read volumes are low.",
    explanation: "When denormalization should be avoided.",
    hint: "In write-heavy systems, financial ledgers, and low-read environments.",
    level: "basic"
  },
  {
    question: "How do database indexes differ from denormalization in optimizing read performance?",
    shortAnswer: "Indexes optimize lookups without duplicating non-key entity attributes, whereas denormalization physically copies non-key attributes into other tables to avoid joins completely.",
    explanation: "Indexing vs Denormalization comparison.",
    hint: "Indexes speed up lookups; denormalization copies columns to eliminate joins.",
    level: "moderate"
  },
  {
    question: "In food delivery systems, why is the restaurant's phone number stored directly on active order deliveries?",
    shortAnswer: "To provide delivery drivers with instant access to the restaurant's phone number without performing a join on the restaurant catalog table.",
    explanation: "Real-world logistics denormalization pattern.",
    hint: "Instant driver access to phone number without catalog joins.",
    level: "basic"
  },
  {
    question: "What is the risk of updating a customer's live profile address if past order invoices used relational foreign keys instead of denormalized address snapshots?",
    shortAnswer: "All past historical tax invoices will incorrectly display the customer's NEW address, violating legal and accounting compliance!",
    explanation: "Accounting snapshot compliance requirement.",
    hint: "Past invoices would show the new address, violating accounting laws.",
    level: "moderate"
  },
  {
    question: "How can MySQL Generated Columns (`AS (expr) STORED`) be used for denormalization?",
    shortAnswer: "To store pre-calculated column expressions physically on disk, automatically updated by MySQL on row insert/update and indexable with B-Tree indexes.",
    explanation: "MySQL STORED generated columns.",
    hint: "Physically stores computed expressions and supports indexing.",
    level: "moderate"
  },
  {
    question: "What is Table Flattening?",
    shortAnswer: "Merging a 1:1 parent-child relationship (e.g. Users and User_Settings) into a single wide table to eliminate JOINs on profile lookups.",
    explanation: "Table flattening denormalization pattern.",
    hint: "Merging 1:1 tables into a single wide table.",
    level: "basic"
  },
  {
    question: "How does denormalization impact database backup and replication times?",
    shortAnswer: "Larger table sizes and redundant bytes increase database dump sizes, backup durations, and replication binlog network traffic.",
    explanation: "Operational impacts of denormalization.",
    hint: "Increases backup sizes, dump durations, and replication binlogs.",
    level: "moderate"
  },
  {
    question: "What metrics should a database engineer monitor after denormalizing a production schema?",
    shortAnswer: "Read query latency (p95/p99), write IOPS, row update duration, replication lag, and data reconciliation drift errors.",
    explanation: "Monitoring denormalized production systems.",
    hint: "Query latency, write IOPS, replication lag, and reconciliation drift.",
    level: "moderate"
  },
  {
    question: "In banking transactions, why is the `balance_after_txn` stored directly on each transaction ledger row?",
    shortAnswer: "To provide an immutable, auditable historical running balance at that exact moment without recalculating all transactions from the beginning of time.",
    explanation: "Banking ledger running balance snapshot.",
    hint: "Immutable historical running balance without full ledger recalculation.",
    level: "basic"
  },
  {
    question: "What is the relationship between Normalization and Denormalization in the software lifecycle?",
    shortAnswer: "Normalization is the design phase discipline (guaranteeing sound schema architecture); Denormalization is the scaling phase optimization (tuning specific queries under real load).",
    explanation: "Lifecycle relationship between normalization and denormalization.",
    hint: "Normalization for design architecture; Denormalization for scaling optimization.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Denormalization?",
    shortAnswer: "Always design a clean 3NF/BCNF relational model first; apply controlled denormalization only for proven high-volume read hotspots, and strictly safeguard data consistency with transactions, triggers, or event pipelines.",
    explanation: "Final summary conclusion for Topic 15.",
    hint: "Normalize first; denormalize strategically for high-volume read bottlenecks with strict sync safeguards.",
    level: "basic"
  }
];

export default questions;
