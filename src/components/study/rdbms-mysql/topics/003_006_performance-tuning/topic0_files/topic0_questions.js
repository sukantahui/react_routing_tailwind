// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What are the primary stages in the MySQL query execution lifecycle?",
    shortAnswer: "1. Connection & Authentication, 2. Lexical Parsing & Syntax Analysis, 3. Preprocessing (Semantic Analysis), 4. Cost-Based Optimization (CBO), 5. Execution Engine, and 6. Storage Engine Handler API retrieval.",
    explanation: "Complete sequence of query processing stages inside MySQL.",
    hint: "Connection -> Parser -> Preprocessor -> Optimizer -> Executor -> Storage Engine.",
    level: "basic"
  },
  {
    question: "What is the role of the MySQL Lexical Parser?",
    shortAnswer: "To break the raw SQL text into tokens, validate the grammatical syntax against SQL grammar rules, and construct an Abstract Syntax Parse Tree.",
    explanation: "Parser responsibilities.",
    hint: "Tokenizes SQL and builds an Abstract Syntax Parse Tree.",
    level: "basic"
  },
  {
    question: "What MySQL error code indicates a failure during the Lexical Parsing stage?",
    shortAnswer: "Error `1064 (42000): You have an error in your SQL syntax`.",
    explanation: "Syntax parsing error code.",
    hint: "Error 1064 (Syntax Error).",
    level: "basic"
  },
  {
    question: "What does the MySQL Preprocessor do after parsing?",
    shortAnswer: "It performs semantic analysis: resolving table and column identifiers against data dictionary metadata, resolving wildcards (`*`), validating column aliases, and checking user privileges.",
    explanation: "Preprocessor semantic verification tasks.",
    hint: "Checks table/column existence, resolves aliases, and verifies permissions.",
    level: "expert"
  },
  {
    question: "Why was the Query Cache completely REMOVED in MySQL 8.0?",
    shortAnswer: "Because it suffered severe global mutex lock contention on multi-core servers; any `INSERT`, `UPDATE`, or `DELETE` on a table invalidated all cached queries for that table, crippling write throughput.",
    explanation: "Architectural rationale for removing query cache in MySQL 8.0.",
    hint: "Global lock contention and frequent cache invalidations on concurrent writes.",
    level: "expert"
  },
  {
    question: "What is the Cost-Based Optimizer (CBO) in MySQL?",
    shortAnswer: "An internal engine component that evaluates multiple possible execution plans (index choices, join orders, scan algorithms) and selects the plan with the lowest estimated execution cost (I/O + CPU).",
    explanation: "Core definition of Cost-Based Optimizer.",
    hint: "Calculates I/O and CPU costs across candidate plans to choose the cheapest path.",
    level: "basic"
  },
  {
    question: "How does the Optimizer estimate query execution costs?",
    shortAnswer: "Using statistical metadata stored in `mysql.innodb_index_stats` and `mysql.innodb_table_stats`, analyzing page counts, row estimates, index cardinality, and cost constants in `mysql.server_cost` and `mysql.engine_cost`.",
    explanation: "Data sources for cost estimations.",
    hint: "Reads table/index statistics and cost constants from mysql system tables.",
    level: "expert"
  },
  {
    question: "What are the two primary components of MySQL's cost calculation model?",
    shortAnswer: "1. **Disk I/O Cost** (cost of reading pages from disk or buffer pool) and 2. **CPU Cost** (cost of comparing row values, evaluating expressions, and sorting).",
    explanation: "I/O and CPU cost model components.",
    hint: "I/O cost (page reads) + CPU cost (row evaluations).",
    level: "basic"
  },
  {
    question: "How do student queries for Mamata illustrate the Optimizer's plan selection?",
    shortAnswer: "When querying `WHERE student_id = 101`, the Optimizer compares the cost of a Clustered Index Const Lookup (~1.0 cost) vs a Full Table Scan of 10,000 pages (~1,500 cost) and selects the index lookup.",
    explanation: "Cost comparison between index lookup and table scan.",
    hint: "Compares cost of index lookup (~1.0) vs table scan (~1500) and picks the cheaper path.",
    level: "basic"
  },
  {
    question: "What is the Handler API in MySQL?",
    shortAnswer: "A standard C++ interface through which the MySQL server execution engine requests data from underlying storage engines (e.g. `ha_innodb::index_read()`, `ha_innodb::rnd_next()`).",
    explanation: "Handler API abstraction layer.",
    hint: "The C++ interface connecting the SQL layer to the storage engine.",
    level: "expert"
  },
  {
    question: "What is the difference between the SQL Layer (Server) and the Storage Engine Layer in MySQL?",
    shortAnswer: "The SQL Layer handles connection management, parsing, preprocessing, optimization, caching, and joins; the Storage Engine layer handles physical row storage, indexing, transactions, locking, and crash recovery.",
    explanation: "Architectural separation of concerns.",
    hint: "SQL layer handles parsing/optimizing; Storage engine handles physical data/indexes.",
    level: "expert"
  },
  {
    question: "What happens if a query requests a table that does not exist?",
    shortAnswer: "The query passes the Parser successfully (valid syntax) but **FAILS in the Preprocessor** with Error `1146 (42S02): Table doesn't exist`.",
    explanation: "Semantic error caught by preprocessor.",
    hint: "Fails in the Preprocessor with Error 1146.",
    level: "basic"
  },
  {
    question: "What happens if a user lacks `SELECT` privilege on a queried column?",
    shortAnswer: "The query fails in the **Preprocessor** with Error `1142 (42000): SELECT command denied to user`.",
    explanation: "Authorization check in preprocessor.",
    hint: "Fails in the Preprocessor during privilege validation.",
    level: "basic"
  },
  {
    question: "What is 'Index Condition Pushdown' (ICP)?",
    shortAnswer: "An optimization where `WHERE` condition evaluations on indexed columns are pushed down directly into the storage engine handler, reducing the number of full row reads from the buffer pool.",
    explanation: "Index Condition Pushdown optimization.",
    hint: "Pushes WHERE clause evaluation down to the storage engine layer.",
    level: "expert"
  },
  {
    question: "What command forces MySQL to recompute statistics for an InnoDB table?",
    shortAnswer: "`ANALYZE TABLE table_name;`.",
    explanation: "Recomputing table statistics for the optimizer.",
    hint: "ANALYZE TABLE table_name;",
    level: "basic"
  },
  {
    question: "What system table contains the cost constants for memory and disk operations in MySQL 8.0?",
    shortAnswer: "`mysql.engine_cost` (e.g. `memory_block_read_cost = 0.25`, `io_block_read_cost = 1.0`) and `mysql.server_cost`.",
    explanation: "Cost configuration tables in MySQL 8.0.",
    hint: "mysql.engine_cost and mysql.server_cost.",
    level: "expert"
  },
  {
    question: "Can the MySQL Optimizer choose a Full Table Scan even if an index exists?",
    shortAnswer: "YES; if the index is non-selective (e.g. matching >20-30% of total rows), random disk I/O for secondary index lookups costs MORE than a sequential full table scan.",
    explanation: "Optimizer deciding against index lookup due to low selectivity.",
    hint: "Yes, when matching a high percentage of rows, sequential table scan is cheaper.",
    level: "expert"
  },
  {
    question: "What tool allows you to trace the exact mathematical steps taken by the Optimizer?",
    shortAnswer: "The **Optimizer Trace** feature (`SET optimizer_trace = 'enabled=on'; SELECT * FROM information_schema.OPTIMIZER_TRACE;`).",
    explanation: "Using Optimizer Trace for debugging optimizer decisions.",
    hint: "OPTIMIZER_TRACE in information_schema.",
    level: "expert"
  },
  {
    question: "What is the difference between Logical Optimization and Physical Optimization?",
    shortAnswer: "Logical Optimization applies algebraic transformation rules (e.g. constant folding, subquery flattening); Physical Optimization chooses index paths, join algorithms, and access methods based on cost.",
    explanation: "Logical vs physical query optimization.",
    hint: "Logical = rule-based rewrites; Physical = cost-based index/join algorithm selection.",
    level: "expert"
  },
  {
    question: "What is 'Constant Folding' in MySQL query optimization?",
    shortAnswer: "The optimizer evaluates constant expressions during compile-time (e.g. converting `WHERE salary > 1000 * 12` to `WHERE salary > 12000`) before query execution.",
    explanation: "Constant folding optimization.",
    hint: "Pre-calculating constant expressions before execution.",
    level: "basic"
  },
  {
    question: "How does the Thread Pool / Thread Cache optimize the Connection stage?",
    shortAnswer: "Instead of creating and destroying OS threads for every incoming client connection, MySQL reuses idle threads from the thread cache (`thread_cache_size`), minimizing CPU context-switching overhead.",
    explanation: "Thread caching in connection lifecycle.",
    hint: "Reuses cached OS threads to avoid expensive thread creation overhead.",
    level: "expert"
  },
  {
    question: "What is a 'Prepared Statement' and how does it affect the query lifecycle?",
    shortAnswer: "It parses and pre-processes the SQL query ONCE during preparation (`PREPARE`), allowing subsequent executions (`EXECUTE`) with different parameters to skip the Parser and Preprocessor stages completely.",
    explanation: "Lifecycle optimization with Prepared Statements.",
    hint: "Skips parsing and preprocessing on subsequent executions with new parameters.",
    level: "expert"
  },
  {
    question: "Can an incorrect data type in a `WHERE` clause defeat the Optimizer?",
    shortAnswer: "YES; implicit type conversion (e.g. `WHERE varchar_col = 12345` instead of `'12345'`) forces MySQL to apply a conversion function on every row, preventing index utilization!",
    explanation: "Implicit type conversion sargability hazard.",
    hint: "Yes, implicit type conversion prevents index usage and forces a table scan.",
    level: "basic"
  },
  {
    question: "What is 'Join Ordering' in MySQL optimization?",
    shortAnswer: "Determining the optimal sequence in which multi-table `JOIN` operations should be executed to minimize intermediate result set row counts.",
    explanation: "Join order optimization.",
    hint: "Sequencing join tables to minimize intermediate working rows.",
    level: "expert"
  },
  {
    question: "What is the maximum number of tables the standard MySQL Optimizer will evaluate permutations for before heuristic pruning?",
    shortAnswer: "Controlled by `optimizer_search_depth` (default is 62, but setting it to a smaller number reduces optimization time for complex queries with 15+ joins).",
    explanation: "Optimizer search depth for join permutations.",
    hint: "Controlled by optimizer_search_depth variable.",
    level: "expert"
  },
  {
    question: "Where does the Execution Engine fetch rows from before reading from physical disk?",
    shortAnswer: "The **InnoDB Buffer Pool** (in-memory LRU cache of 16KB data and index pages).",
    explanation: "Buffer pool in-memory retrieval.",
    hint: "From the in-memory InnoDB Buffer Pool.",
    level: "basic"
  },
  {
    question: "What happens if requested pages are not present in the InnoDB Buffer Pool?",
    shortAnswer: "InnoDB issues synchronous or asynchronous physical disk I/O reads to fetch the 16KB pages from `.ibd` files into the buffer pool.",
    explanation: "Physical disk read on buffer pool miss.",
    hint: "Reads 16KB pages from physical disk (.ibd files) into the buffer pool.",
    level: "basic"
  },
  {
    question: "What is 'Row Streaming' during result transmission back to the client?",
    shortAnswer: "MySQL streams result rows over the network protocol as they are processed in chunks rather than buffering the entire gigabyte result set in memory (unless sorting/temporary tables are required).",
    explanation: "Streaming results to client.",
    hint: "Streams rows across network in packets as they are fetched.",
    level: "moderate"
  },
  {
    question: "How do you view currently running query execution stages in MySQL 8.0?",
    shortAnswer: "Query `performance_schema.events_stages_current` or `information_schema.processlist`.",
    explanation: "Monitoring active query stages.",
    hint: "Inspect performance_schema.events_stages_current or processlist.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for the Query Execution Lifecycle?",
    shortAnswer: "Understand the 6-stage lifecycle from **Connection $\to$ Lexical Parser $\to$ Preprocessor $\to$ Cost-Based Optimizer $\to$ Execution Engine $\to$ Storage Engine Handler API**; ensure that index statistics are up-to-date with `ANALYZE TABLE` so the Cost-Based Optimizer chooses optimal execution plans; and utilize Prepared Statements to eliminate redundant parsing and preprocessing overhead in high-throughput applications.",
    explanation: "Authoritative architectural summary of the query execution lifecycle.",
    hint: "Know the 6 stages + keep statistics fresh with ANALYZE TABLE + use Prepared Statements.",
    level: "expert"
  }
];

export default questions;
