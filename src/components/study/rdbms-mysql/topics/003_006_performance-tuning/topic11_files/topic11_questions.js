// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is the N+1 Query Problem in database application architecture?",
    shortAnswer: "The N+1 problem occurs when an application executes 1 initial query to fetch $N$ parent records, and then executes $N$ individual child queries in a programming loop to fetch related records for each parent.",
    explanation: "Executing $1 + N$ individual queries multiplies network round-trip latency, connection pool hold time, and server thread overhead.",
    hint: "1 query for parent records + N queries for child records in a loop.",
    level: "basic"
  },
  {
    question: "Why do Object-Relational Mapping (ORM) frameworks frequently trigger N+1 queries?",
    shortAnswer: "Because ORMs default to **Lazy Loading**: child relationships are not fetched in the initial query, and the ORM silently triggers a new database query each time a relation property is accessed in a loop.",
    explanation: "Code like `courses.forEach(c => c.getStudents())` causes the ORM to fire a separate query for every iteration.",
    hint: "Lazy loading triggers a separate query every time a relation property is accessed.",
    level: "basic"
  },
  {
    question: "What is the primary performance bottleneck in an N+1 query scenario: database CPU or network latency?",
    shortAnswer: "Network Round-Trip Time (RTT). Even if each query takes only 1 ms on the database engine, 200 sequential network round-trips add 200 ms to 1,000 ms of pure network wait time.",
    explanation: "TCP packet round-trips and socket serialization between application server and database dominate the latency.",
    hint: "Network round-trip latency (RTT) for hundreds of queries dominates overall time.",
    level: "expert"
  },
  {
    question: "How does Eager Loading with `JOIN` eliminate the N+1 query problem?",
    shortAnswer: "By querying both parent and child tables in a single `LEFT JOIN` query, fetching all parent and child records in exactly 1 network round-trip.",
    explanation: "The application parses the combined tabular result set into objects in memory without making further database calls.",
    hint: "Fetches parents and children together in 1 single JOIN query.",
    level: "basic",
    codeExample: "SELECT c.*, s.* FROM courses c LEFT JOIN enrollments e ON c.id = e.course_id LEFT JOIN students s ON e.student_id = s.id;"
  },
  {
    question: "What is a potential downside of Eager Loading with `JOIN` on 1-to-many relationships?",
    shortAnswer: "**Cartesian Product / Data Duplication**: Parent table column values are repeated across every matching child row, increasing memory and network payload size.",
    explanation: "If a course has 50 students, the course title, description, and metadata are duplicated 50 times in the result set.",
    hint: "Parent row data is duplicated across every joined child row in the result set.",
    level: "expert"
  },
  {
    question: "What is the 'Batch IN (...) Loading' strategy (2-Query Pattern)?",
    shortAnswer: "1) Execute Query 1 to fetch all $N$ parent records. 2) Collect all parent IDs into an array. 3) Execute Query 2 to fetch all children using `WHERE parent_id IN (id1, id2... idN)`.",
    explanation: "Reduces $1 + N$ queries to exactly 2 queries without repeating parent column data across duplicate rows.",
    hint: "Query 1 fetches parents; Query 2 fetches all children using WHERE id IN (...).",
    level: "basic",
    codeExample: "-- Query 1:\nSELECT * FROM courses WHERE department_id = 1;\n-- Query 2:\nSELECT * FROM students WHERE course_id IN (10, 11, 12, 13, 14);"
  },
  {
    question: "How does the DataLoader pattern in Node.js / GraphQL solve N+1 queries?",
    shortAnswer: "DataLoader batches individual load requests occurring within a single JavaScript event loop tick into a single `WHERE id IN (...)` database query and caches results in memory.",
    explanation: "Automates the Batch IN pattern across asynchronous resolver functions.",
    hint: "Batches individual queries within the event loop tick into a single IN list query.",
    level: "expert"
  },
  {
    question: "How does MySQL 8.0 JSON Aggregation eliminate N+1 queries?",
    shortAnswer: "Using `JSON_ARRAYAGG()` and `JSON_OBJECT()`, MySQL aggregates nested child rows into JSON arrays directly inside the database, returning fully formed hierarchical objects in 1 query.",
    explanation: "Combines the 1-query benefit of joins with zero row duplication overhead.",
    hint: "Assembles nested child objects as JSON arrays directly in the database.",
    level: "expert",
    codeExample: "SELECT c.id, c.name, JSON_ARRAYAGG(JSON_OBJECT('id', s.id, 'name', s.name)) as students\nFROM courses c JOIN students s ON c.id = s.course_id GROUP BY c.id;"
  },
  {
    question: "How do N+1 queries cause Connection Pool Exhaustion under high traffic?",
    shortAnswer: "Because each incoming HTTP request holds a database connection open across dozens or hundreds of sequential query round-trips, quickly saturating the connection pool and causing thread starvation.",
    explanation: "A request that should take 2ms holds a connection for 200ms, reducing pool concurrency by 100x.",
    hint: "Holding connections open across sequential loops starves the connection pool.",
    level: "expert"
  },
  {
    question: "How do you detect N+1 queries using MySQL Performance Schema?",
    shortAnswer: "Query `performance_schema.events_statements_summary_by_digest` to find statements with extremely high execution counts (`COUNT_STAR`) and identical SQL templates but varying parameter literals.",
    explanation: "A query template executing 5,000 times per minute with low latency per call is a classic sign of an N+1 loop.",
    hint: "Look for high COUNT_STAR on identical statement digests with low average latency.",
    level: "expert"
  },
  {
    question: "What is the `@BatchSize` annotation in Hibernate / JPA?",
    shortAnswer: "An annotation that configures Hibernate to fetch lazy child collections in batches of $K$ (e.g. `@BatchSize(size = 25)`), converting $N$ individual queries into $N / 25$ batch `IN` queries.",
    explanation: "Prevents pure 1-by-1 lazy queries without needing full eager join rewrites.",
    hint: "Batches lazy child collection fetches in Hibernate.",
    level: "moderate"
  },
  {
    question: "How does Prisma ORM prevent N+1 queries in Node.js / TypeScript?",
    shortAnswer: "Prisma query engine automatically batches nested `include` relations into optimized `JOIN`s or `WHERE id IN (...)` queries under the hood.",
    explanation: "Prisma's Rust query engine analyzes the entire query tree before dispatching SQL to the database.",
    hint: "Prisma automatically batches nested includes into single queries or IN lists.",
    level: "basic"
  },
  {
    question: "What is an $N+1$ problem across multiple levels (e.g. $1 + N + M$)?",
    shortAnswer: "When an application fetches parents, loops to fetch children, and then loops again to fetch grandchildren (e.g., Department $\to$ Courses $\to$ Students $\to$ Fees), causing an explosion of thousands of queries.",
    explanation: "10 departments $\times$ 20 courses $\times$ 50 students can trigger over 10,000 queries for a single page load!",
    hint: "Multi-level nested loops trigger cascading query explosions.",
    level: "basic"
  },
  {
    question: "How can you detect N+1 queries during local application development?",
    shortAnswer: "Enable SQL query logging (e.g., `DEBUG=prisma:query`, Django `DEBUG=True` SQL panel, Hibernate `show_sql=true`) or use APM interceptors.",
    explanation: "Seeing repetitive identical SQL queries scroll by on the terminal during a single page reload immediately identifies N+1.",
    hint: "Inspect terminal SQL logs during single page requests for repetitive queries.",
    level: "basic"
  },
  {
    question: "Why is `SELECT * FROM students WHERE course_id = 5` inside an array map function an anti-pattern?",
    shortAnswer: "Because mapping over an array of courses to fire individual queries executes serial asynchronous I/O requests instead of fetching all records in batch.",
    explanation: "Asynchronous loops (`Promise.all(courses.map(...))`) create concurrent query spikes that overwhelm connection pools.",
    hint: "Firing queries inside map/forEach loops creates serial or burst I/O bottlenecks.",
    level: "basic"
  },
  {
    question: "How do you refactor an N+1 query in raw SQL and Node.js?",
    shortAnswer: "Collect IDs: `const courseIds = courses.map(c => c.id);`, then query: `SELECT * FROM students WHERE course_id IN (?)`, passing `[courseIds]`.",
    explanation: "Group the child records in memory using a JavaScript `Map` keyed by `course_id`.",
    hint: "Collect IDs into an array and execute a single WHERE IN query, grouping results in memory.",
    level: "basic",
    codeExample: "const students = await db.query('SELECT * FROM students WHERE course_id IN (?)', [courseIds]);"
  },
  {
    question: "Can an N+1 problem occur with `UPDATE` or `DELETE` statements?",
    shortAnswer: "Yes! Updating 500 rows individually in a loop (`UPDATE tbl SET status = ? WHERE id = ?`) is an N+1 write anti-pattern; refactor to a single batch `UPDATE ... WHERE id IN (...)` or `CASE` statement.",
    explanation: "Batching writes reduces transaction log overhead, disk syncs, and lock acquisition latency.",
    hint: "Updating rows individually in a loop causes write N+1; use batch updates.",
    level: "expert"
  },
  {
    question: "What is the difference between `JOIN FETCH` and regular `JOIN` in JPA / Hibernate?",
    shortAnswer: "`JOIN FETCH` forces Hibernate to populate the child entity collection in the same query; regular `JOIN` performs the join for filtering but still lazy-loads the collection later.",
    explanation: "Using `JOIN FETCH` is the standard way to eliminate N+1 in JPA queries.",
    hint: "JOIN FETCH populates child collections in the same query to prevent lazy loading.",
    level: "expert"
  },
  {
    question: "How does GraphQL's resolver architecture naturally encourage N+1 queries?",
    shortAnswer: "Because each field in a GraphQL schema has an independent resolver function; nested child fields execute their own resolver for every parent item in the list.",
    explanation: "Without a batching layer like DataLoader, GraphQL generates pure N+1 query storms by default.",
    hint: "Independent field resolvers execute once per list item without batching.",
    level: "expert"
  },
  {
    question: "How does N+1 impact server-side caching mechanisms?",
    shortAnswer: "Executing hundreds of distinct tiny queries per request lowers query cache efficiency and prevents effective caching of composite domain objects.",
    explanation: "Caching a single composite parent-child DTO is far more efficient than caching hundreds of tiny key-value fragments.",
    hint: "Fragmented tiny queries defeat composite object caching.",
    level: "moderate"
  },
  {
    question: "What is the 'Select IN' vs 'Join' memory trade-off in backend applications?",
    shortAnswer: "`JOIN` performs the relationship stitching in MySQL RAM (transferring repeated parent data); `Select IN` transfers compact data and stitches relationships in application Node/Java RAM.",
    explanation: "For wide tables with large parent payloads, `Select IN` is often lighter on network bandwidth than deep joins.",
    hint: "JOIN stitches in database; Select IN stitches in application memory.",
    level: "expert"
  },
  {
    question: "How does database replication lag exacerbate the N+1 problem?",
    shortAnswer: "If parent queries read from the Primary and child queries read from a lagging Replica, intermediate data may be inconsistent, leading to missing child records in loops.",
    explanation: "Replication lag causes distributed data inconsistency across multi-query loops.",
    hint: "Lagging replicas cause inconsistent state across sequential child queries.",
    level: "expert"
  },
  {
    question: "Why should you never write a database query inside an `Array.prototype.forEach` in JavaScript?",
    shortAnswer: "`forEach` does not wait for asynchronous promises, causing unhandled promise rejections and uncontrolled concurrent query execution that floods database connections.",
    explanation: "Use `for...of` or batch queries with `WHERE IN` instead.",
    hint: "forEach ignores async/await and floods database connections uncontrollably.",
    level: "basic"
  },
  {
    question: "What is the effect of indexing foreign keys on N+1 queries?",
    shortAnswer: "Indexing foreign keys makes individual child queries faster (converting table scans to `ref` seeks), but it does NOT eliminate the network round-trip overhead of the N+1 problem itself.",
    explanation: "Even with 0.05ms index seeks, 500 network round-trips will still take 500ms of latency.",
    hint: "Foreign key indexes speed up seeks, but network round-trip latency remains.",
    level: "expert"
  },
  {
    question: "How does MySQL 8.0 `JSON_OBJECT` prevent Cartesian product explosion compared to multiple LEFT JOINs?",
    shortAnswer: "Because JSON aggregation bundles child rows directly into a single text/JSON column per parent row, avoiding row multiplication across multiple 1-to-many joins.",
    explanation: "Joining two 1-to-many child tables creates $N \times M$ rows, while JSON aggregation returns exactly 1 row per parent.",
    hint: "JSON aggregation returns exactly 1 row per parent without row multiplication.",
    level: "expert"
  },
  {
    question: "What metric in APM tracing tools (e.g. Datadog, Dynatrace) highlights an N+1 problem?",
    shortAnswer: "A 'waterfall' trace visualization displaying hundreds of identical horizontal query spans executing sequentially one after another during a single web request.",
    explanation: "The characteristic staircase or dense stripe pattern indicates an N+1 iteration loop.",
    hint: "Waterfall trace showing hundreds of identical sequential query spans.",
    level: "basic"
  },
  {
    question: "How can unit/integration tests prevent N+1 regressions in production?",
    shortAnswer: "By writing query count assertions in integration tests (e.g., `expect(queryCount).toBeLessThanOrEqual(2)`) to fail builds if a loop is accidentally introduced.",
    explanation: "Automated query count assertions catch N+1 regressions in CI/CD pipelines.",
    hint: "Assert maximum query counts per API test in CI/CD pipelines.",
    level: "expert"
  },
  {
    question: "What is the impact of N+1 on cloud database billing (e.g. AWS Aurora Serverless / PlanetScale)?",
    shortAnswer: "Serverless databases bill by query volume and I/O operations; N+1 queries multiply billable request units by 100x to 1,000x, causing massive unexpected cloud costs.",
    explanation: "Replacing N+1 with batch queries directly slashes cloud database infrastructure bills.",
    hint: "Multiplies billable query counts and I/O operations by hundreds of times.",
    level: "basic"
  },
  {
    question: "How do you handle pagination when using Eager Loading with `JOIN`?",
    shortAnswer: "Paginate the parent table first using a subquery / CTE (or Deferred Join), and then join the children to that paginated subset.",
    explanation: "Applying `LIMIT 20` directly on a 1-to-many join limits the total joined rows, not the number of parent entities!",
    hint: "Paginate the parent IDs first before joining child collections.",
    level: "expert"
  },
  {
    question: "What is the primary architectural takeaway regarding the N+1 problem for full-stack developers?",
    shortAnswer: "Never execute database queries inside application loops. Always fetch relational data in batch using Eager Joins, Batch `IN` lists, or JSON Aggregations.",
    explanation: "Batch data retrieval is the single most effective way to eliminate latency and build scalable applications.",
    hint: "Never query the database inside a loop; always retrieve relational data in batch.",
    level: "basic"
  }
];

export default questions;
