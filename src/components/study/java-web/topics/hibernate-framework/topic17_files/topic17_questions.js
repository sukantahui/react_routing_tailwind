const questions = [
  {
    question: "What is the N+1 query problem in Hibernate?",
    shortAnswer: "One query to load parent entities + N queries to load associations for each parent.",
    explanation: "Occurs when lazy loading is triggered inside a loop. For example, load 100 students (1 query), then for each student access courses (100 queries). Total queries = 101. This kills performance.",
    hint: "Enable SQL logging; if you see repetitive SELECT ... WHERE id = ?, you have N+1.",
    level: "basic",
    codeExample: "// Bad: for(Student s: students) s.getCourses().size();"
  },
  {
    question: "How do you fix N+1 queries?",
    shortAnswer: "Use JOIN FETCH, entity graphs, or subselect fetching.",
    explanation: "JOIN FETCH in JPQL: 'SELECT s FROM Student s JOIN FETCH s.courses'. This loads associations in the same query using SQL joins. Another solution: @EntityGraph or Set batch size and fetch mode SUBSELECT.",
    hint: "Be careful with JOIN FETCH on multiple collections – may cause cartesian product.",
    level: "intermediate",
    codeExample: "SELECT DISTINCT s FROM Student s LEFT JOIN FETCH s.courses"
  },
  {
    question: "What is the impact of lazy loading on performance?",
    shortAnswer: "Good if not accessed; bad when accessed in loops (N+1).",
    explanation: "Lazy loading avoids loading unnecessary data, reducing memory and initial query time. However, if you always need the association, lazy loading will cause extra queries. Profiling needed to decide fetch strategy.",
    hint: "For associations always needed, use eager fetching (but carefully).",
    level: "intermediate",
    codeExample: "@OneToMany(fetch = FetchType.LAZY) // default"
  },
  {
    question: "What is the difference between @BatchSize and JOIN FETCH?",
    shortAnswer: "@BatchSize reduces queries to N/batchSize; JOIN FETCH eliminates extra queries entirely.",
    explanation: "JOIN FETCH loads associations in one query via SQL joins. @BatchSize still causes additional queries (N / batchSize) but not N+1. JOIN FETCH is simpler for small datasets, @BatchSize better for large collections to avoid cartesian products.",
    hint: "For paginated results, JOIN FETCH with DISTINCT may be fine.",
    level: "advanced",
    codeExample: "@BatchSize(size=10) // loads 10 entities per query"
  },
  {
    question: "How does hibernate.jdbc.batch_size improve performance?",
    shortAnswer: "Batches multiple SQL statements into one round trip to the database.",
    explanation: "When inserting/updating many rows, instead of sending each statement separately, Hibernate accumulates statements and sends them in batches. Reduces network overhead and database commit log flushing. Effective with identity generators turned off.",
    hint: "Set batch size to 20–50. Also set order_inserts=true for better grouping.",
    level: "intermediate",
    codeExample: "hibernate.jdbc.batch_size=25"
  },
  {
    question: "When should you enable second-level cache?",
    shortAnswer: "For entities that are read frequently and updated rarely.",
    explanation: "Second-level cache caches entities across sessions. Perfect for reference data (countries, statuses). Avoid for frequently updated entities – cache invalidation overhead exceeds benefits.",
    hint: "Monitor cache hit ratio; if <70%, reconsider.",
    level: "intermediate",
    codeExample: "@Cache(usage = CacheConcurrencyStrategy.READ_ONLY) // for static data"
  },
  {
    question: "What is query cache and when to use it?",
    shortAnswer: "Caches results of JPQL/HQL queries based on parameters.",
    explanation: "The query cache stores the list of returned entity IDs, and second-level cache stores the entities themselves. Useful for queries that run often with same parameters and rarely change. But overhead is high if data changes often.",
    hint: "Only enable if you have second-level cache enabled too.",
    level: "advanced",
    codeExample: "query.setHint(\"org.hibernate.cacheable\", true);"
  },
  {
    question: "How do I detect slow Hibernate queries?",
    shortAnswer: "Enable SQL logging, set slow query threshold, or use DataSource proxy.",
    explanation: "Set hibernate.show_sql=true combined with log category org.hibernate.SQL=DEBUG. Also set hibernate.jdbc.log_slow_query=2000ms (Hibernate 6+). Use P6Spy for advanced analysis.",
    hint: "In production, use DataSource proxy like datasource-proxy or log4jdbc.",
    level: "intermediate",
    codeExample: "hibernate.show_sql=true\nhibernate.format_sql=true"
  },
  {
    question: "What is the most common cause of memory issues in Hibernate?",
    shortAnswer: "Loading large result sets without pagination or large persistence contexts.",
    explanation: "If you load 1 million entities into session, all become managed in first-level cache, causing memory bloat. Use scrollable results, stateless session, or clear() periodically.",
    hint: "For mass processing, use session.clear() and flush() every 100 rows.",
    level: "advanced",
    codeExample: "if (++count % 50 == 0) { session.flush(); session.clear(); }"
  },
  {
    question: "What is the role of DTO projections in performance?",
    shortAnswer: "Load only required fields instead of entire entities, reducing memory and SQL overhead.",
    explanation: "Use constructor expressions in JPQL: 'SELECT new com.school.StudentDTO(s.id, s.name) FROM Student s'. This selects only needed columns, no persistence context management, much faster for reporting.",
    hint: "DTOs also avoid lazy loading issues.",
    level: "intermediate",
    codeExample: "SELECT new StudentDTO(s.id, s.name) FROM Student s"
  },
  {
    question: "How does hibernate.order_inserts help batching?",
    shortAnswer: "Groups SQL INSERT statements by entity type for more efficient batching.",
    explanation: "Without ordering, Hibernate may interleave inserts (e.g., Student, Address, Student). With ordering, all Students are batched together, then all Addresses. Improves batch effectiveness.",
    hint: "Use with hibernate.jdbc.batch_size.",
    level: "advanced",
    codeExample: "hibernate.order_inserts=true"
  },
  {
    question: "What is the difference between StatelessSession and regular Session?",
    shortAnswer: "StatelessSession has no persistence context, no dirty checking, no cascading – very fast for batch operations.",
    explanation: "StatelessSession does not track loaded objects; each operation goes directly to DB. Use for bulk inserts/updates where you don't need ORM features. But no lazy loading, no cache.",
    hint: "For bulk deletes, use HQL/JPQL delete queries instead.",
    level: "advanced",
    codeExample: "StatelessSession ss = sessionFactory.openStatelessSession(); ss.insert(entity);"
  },
  {
    question: "How can I optimize pagination in Hibernate?",
    shortAnswer: "Use setFirstResult() and setMaxResults() on the query, but beware of performance with large offsets.",
    explanation: "For large offset, JPA translates to OFFSET which is slow (database still scans rows). Use keyset pagination (where clause on last ID) for better performance.",
    hint: "For huge datasets, consider using scrollable results.",
    level: "intermediate",
    codeExample: "query.setFirstResult(offset).setMaxResults(pageSize);"
  },
  {
    question: "What is the cost of auto-flush before queries?",
    shortAnswer: "Hibernate may flush pending changes before query execution to ensure consistency; can be expensive.",
    explanation: "When you call a query, Hibernate checks if any dirty entities could affect the query result and flushes if needed. This adds overhead. You can control with setFlushMode(FlushModeType.COMMIT).",
    hint: "Set flush mode to COMMIT when doing reporting queries after edits.",
    level: "advanced",
    codeExample: "em.setFlushMode(FlushModeType.COMMIT);"
  },
  {
    question: "How to reduce lock contention in Hibernate?",
    shortAnswer: "Use optimistic locking (@Version) instead of pessimistic locks, keep transactions short.",
    explanation: "Optimistic locking allows concurrent reads and only checks version on update. Pessimistic locks block reads/writes. Always prefer @Version for typical web apps unless you have high write conflicts.",
    hint: "OptimisticLockException should be handled and retried.",
    level: "intermediate",
    codeExample: "@Version private int version;"
  },
  {
    question: "What is connection leak and how does it affect performance?",
    shortAnswer: "Unclosed connections exhaust pool, causing waiting threads and timeouts.",
    explanation: "If you open a Session but never close it, the underlying JDBC connection is not returned to the pool. Eventually, all connections are taken, and new requests wait until they time out.",
    hint: "Always close Session in finally block or use try-with-resources.",
    level: "basic",
    codeExample: "try (Session s = sf.openSession()) { ... }"
  },
  {
    question: "Does Hibernate support read-only transactions and do they help?",
    shortAnswer: "Yes, set transaction to read-only; Hibernate may skip dirty checking, improving performance.",
    explanation: "By marking transaction as read-only (e.g., @Transactional(readOnly=true)), Hibernate avoids snapshot creation and dirty checking. Also reduces connection pool usage in some setups.",
    hint: "Use for any query-only operation.",
    level: "intermediate",
    codeExample: "@Transactional(readOnly = true) public List<Student> findAll() { ... }"
  },
  {
    question: "What is the best fetch strategy for OneToMany collections?",
    shortAnswer: "Default lazy loading with @BatchSize is usually best; avoid eager unless always needed.",
    explanation: "Eager (FetchType.EAGER) can cause performance issues (cartesian product when multiple collections). Lazy + @BatchSize gives you control. If you always need the collection, use JOIN FETCH in specific queries.",
    hint: "Never use EAGER on two or more collections in same entity.",
    level: "advanced",
    codeExample: "@OneToMany(fetch = FetchType.LAZY) @BatchSize(size=10)"
  },
  {
    question: "How to prevent Cartesian product when joining multiple collections?",
    shortAnswer: "Use multiple queries or batch fetching instead of multiple JOIN FETCH.",
    explanation: "JOIN FETCH on two separate collections results in a SQL Cartesian product (size = rows in collection1 * rows in collection2). Either fetch one collection and let Hibernate batch load the other, or use @BatchSize on both.",
    hint: "Use DISTINCT in JPQL but that removes only duplicates, not product.",
    level: "advanced",
    codeExample: "// Bad: SELECT s FROM Student s JOIN FETCH s.courses JOIN FETCH s.addresses"
  },
  {
    question: "How can I measure Hibernate performance in production?",
    shortAnswer: "Enable statistics and expose via JMX or dropwizard metrics.",
    explanation: "Set hibernate.generate_statistics=true and expose using org.hibernate.stat.Statistics. Hibernate can register MBeans. Many APM tools (New Relic, Dynatrace) can capture this.",
    hint: "Statistics collection adds minor overhead, acceptable for most production apps.",
    level: "expert",
    codeExample: "MBeanServer mbs = ManagementFactory.getPlatformMBeanServer(); // register stats"
  },
  {
    question: "Does indexing foreign key columns help Hibernate performance?",
    shortAnswer: "Yes, especially for joins and lazy loading.",
    explanation: "When Hibernate queries foreign key columns (e.g., student_id in course table), proper indexes speed up joins. Without indexes, many performance issues appear in large datasets.",
    hint: "Use @Index annotation or DDL generation to create indexes.",
    level: "basic",
    codeExample: "@Table(indexes = @Index(columnList = \"student_id\"))"
  },
  {
    question: "What is the effect of hibernate.id.new_generator_mappings on performance?",
    shortAnswer: "Minimal performance difference; mainly affects portability.",
    explanation: "Legacy generators (identity/seqhilo) vs JPA-compliant (SequenceStyleGenerator). Both perform similarly; choose based on database compatibility, not performance.",
    hint: "Set to true for new projects.",
    level: "intermediate",
    codeExample: "hibernate.id.new_generator_mappings=true"
  },
  {
    question: "How to tune Hibernate for batch inserts of millions of rows?",
    shortAnswer: "Use StatelessSession, disable batching for identity columns, use JDBC batch.",
    explanation: "Identity generator disables batching because DB assigns IDs immediately. Instead use sequence generator, set batch size, and flush/clear periodically or use StatelessSession for lightweight inserts.",
    hint: "Consider using plain JDBC for huge bulk inserts.",
    level: "expert",
    codeExample: "StatelessSession ss = sessionFactory.openStatelessSession(); ss.insert(record);"
  },
  {
    question: "What is entity graph and how does it optimize fetching?",
    shortAnswer: "Dynamic fetch plan definition to load associations only when needed.",
    explanation: "@EntityGraph allows you to specify which associations to fetch for a specific query, overriding lazy/eager settings. More flexible than fixed fetch strategies.",
    hint: "Useful for different API endpoints needing different data.",
    level: "advanced",
    codeExample: "@EntityGraph(attributePaths = {\"courses\", \"address\"})"
  },
  {
    question: "What is the memory impact of Hibernate proxies?",
    shortAnswer: "Proxies are lightweight, but each uninitialized proxy object consumes memory.",
    explanation: "Proxies are placeholder objects that will load data when accessed. For very large collections, proxies still exist and occupy heap memory. Use batch fetching to reduce proxy count.",
    hint: "But proxies are much lighter than fully loaded entities.",
    level: "advanced",
    codeExample: "// Hibernate creates proxy for each lazy association"
  },
  {
    question: "How does hibernate.jdbc.fetch_size affect performance?",
    shortAnswer: "Controls number of rows fetched per network round-trip from database driver.",
    explanation: "Sets JDBC statement fetch size. Larger fetch size reduces round trips but uses more memory. Default is driver-dependent (e.g., 10 for Oracle, 0 for PostgreSQL). For large result sets, set to 100–500.",
    hint: "Monitor to avoid OOM if set too high.",
    level: "intermediate",
    codeExample: "hibernate.jdbc.fetch_size=100"
  },
  {
    question: "What is the difference between clear() and evict() in performance terms?",
    shortAnswer: "clear() removes all entities from session; evict() removes specific one.",
    explanation: "Both detach entities from persistence context, freeing memory and preventing dirty checking. clear() is coarse and cheap; evict() is fine-grained. Use clear() in batch processing to limit first-level cache growth.",
    hint: "After clear(), previously loaded entities become detached.",
    level: "intermediate",
    codeExample: "session.clear(); // detach all"
  },
  {
    question: "Does Hibernate benefit from using UUIDs as primary keys?",
    shortAnswer: "Performance trade-off: sequential UUID (uuid2) okay, random UUID harms batching.",
    explanation: "Random UUIDs cause index fragmentation and poor batching because keys are not sequential. Use UUIDs only when distributed systems require them; prefer Long or sequential UUID (UUID with time component).",
    hint: "For batch inserts, use database sequences.",
    level: "expert",
    codeExample: "@GenericGenerator(name = \"uuid2\", strategy = \"uuid2\")"
  },
  {
    question: "How to tune Hibernate for read-heavy applications?",
    shortAnswer: "Enable second-level cache, use DTO projections, set read-only transactions.",
    explanation: "Cache entities and queries; avoid write locks; use scrollable results for large exports. Consider using read-only replicas for reporting.",
    hint: "Use separate EntityManagerFactory for read-only replica if possible.",
    level: "intermediate",
    codeExample: "@Transactional(readOnly = true)"
  },
  {
    question: "What is the single most effective Hibernate performance optimization?",
    shortAnswer: "Eliminate N+1 queries by using JOIN FETCH or entity graphs.",
    explanation: "In many applications, 90% of performance issues come from N+1 queries. Fixing this one pattern often yields dramatic improvements. The second most effective: connection pooling tuning.",
    hint: "Always check SQL log before and after optimization.",
    level: "basic",
    codeExample: "// Use JOIN FETCH in queries"
  }
];

export default questions;