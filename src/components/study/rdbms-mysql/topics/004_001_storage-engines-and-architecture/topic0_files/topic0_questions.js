// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What are the three fundamental logical tiers of MySQL server architecture?",
    shortAnswer: "1) **Client / Connection Layer** (authentication, connection pooling, thread management), 2) **Core Server / SQL Layer** (parser, preprocessor, optimizer, execution engine, stored routines), and 3) **Pluggable Storage Engine Layer** (physical data storage, indexing, transactions).",
    explanation: "Modular separation of concerns allows MySQL to support multiple storage engines under a unified SQL interface.",
    hint: "Client layer, Core SQL Server layer, and Pluggable Storage Engine layer.",
    level: "basic"
  },
  {
    question: "What is the primary responsibility of the Client / Connection Layer in MySQL?",
    shortAnswer: "It manages network protocol handshakes (TCP/IP, Unix sockets, named pipes), authenticates users via plugins (`caching_sha2_password`), negotiates SSL/TLS encryption, and allocates thread contexts for incoming client sessions.",
    explanation: "Handles client session connectivity and access authentication before queries reach the SQL engine.",
    hint: "Manages network connections, thread allocation, and user authentication.",
    level: "basic"
  },
  {
    question: "What is the role of the MySQL Parser in the Core Server Layer?",
    shortAnswer: "The Parser performs lexical and syntactic analysis of incoming SQL query strings, validating syntax against SQL grammar rules and constructing an internal **Parse Tree** (Abstract Syntax Tree).",
    explanation: "Throws Error 1064 if the query grammar violates SQL syntax.",
    hint: "Validates SQL grammar and builds the parse tree (AST).",
    level: "basic"
  },
  {
    question: "What does the MySQL Preprocessor do after the Parser generates the Parse Tree?",
    shortAnswer: "It resolves table, database, and column names against the data dictionary (Information Schema), checks user privilege permissions, and validates that referenced objects exist.",
    explanation: "Throws Error 1146 (Table doesn't exist) or Error 1054 (Unknown column) if semantic validation fails.",
    hint: "Performs semantic resolution of columns/tables and verifies user permissions.",
    level: "basic"
  },
  {
    question: "What is the Cost-Based Optimizer (CBO) in MySQL?",
    shortAnswer: "The CBO analyzes multiple candidate execution paths (evaluating available indexes, join orders, and statistics) and chooses the physical execution plan with the lowest estimated I/O and CPU cost.",
    explanation: "The optimizer decides whether to perform full table scans, index range scans, or nested-loop joins.",
    hint: "Chooses the most cost-effective execution plan based on statistical data.",
    level: "basic"
  },
  {
    question: "What is the Pluggable Storage Engine API (the Handler API)?",
    shortAnswer: "It is an open C++ abstract interface (the `handler` base class) that defines standard methods for row operations (`ha_index_read_map`, `ha_write_row`, `ha_rnd_next`), decoupling SQL processing from physical disk layouts.",
    explanation: "Allows developers to plug custom storage engines (InnoDB, MyISAM, RocksDB) into MySQL.",
    hint: "Abstract C++ interface decoupling SQL processing from physical disk storage.",
    level: "expert"
  },
  {
    question: "Does the MySQL Core Server layer know how B+ Trees are physically stored on disk in InnoDB?",
    shortAnswer: "No! The Core Server layer operates entirely on logical tuples and expressions. Physical B+ Tree traversal, page allocation (16KB pages), and disk I/O are fully encapsulated inside the storage engine.",
    explanation: "Clean encapsulation boundary between SQL parsing and physical file layout.",
    hint: "No, physical page structures and B+ trees are fully encapsulated inside the storage engine.",
    level: "expert"
  },
  {
    question: "How do you view all installed and supported storage engines in MySQL?",
    shortAnswer: "`SHOW ENGINES;`",
    explanation: "Displays engine names, support status (DEFAULT, YES, NO), comments, transactions support, and XA support.",
    hint: "SHOW ENGINES;",
    level: "basic",
    codeExample: "SHOW ENGINES;"
  },
  {
    question: "Which components are managed at the Server Layer vs the Storage Engine Layer?",
    shortAnswer: "Views, Triggers, Stored Procedures, Functions, and Query Parsing are handled at the **Server Layer**; Transactions, Row Locking, MVCC, Index Structures (B+ Tree/Hash), and Physical File I/O are handled at the **Storage Engine Layer**.",
    explanation: "Server layer provides universal features; engine layer provides storage-specific mechanics.",
    hint: "Server = Views, Triggers, Routines, Parser; Engine = Transactions, Locks, MVCC, Indexes.",
    level: "expert"
  },
  {
    question: "What default authentication plugin is used in MySQL 8.0+?",
    shortAnswer: "`caching_sha2_password` (which provides SHA-256 password hashing with fast memory caching).",
    explanation: "Replaced the legacy, less secure `mysql_native_password`.",
    hint: "caching_sha2_password",
    level: "basic"
  },
  {
    question: "What is the function of `max_connections` in the Connection Layer?",
    shortAnswer: "It specifies the maximum number of simultaneous client network connections the MySQL server will accept (default is typically 151).",
    explanation: "Prevents server exhaustion from excessive concurrent client connections.",
    hint: "Defines maximum simultaneous client connections permitted.",
    level: "basic"
  },
  {
    question: "What happens if client connection requests exceed `max_connections`?",
    shortAnswer: "MySQL rejects subsequent connection attempts with Error 1040: `Too many connections` (though one extra connection is reserved for users with `CONNECTION_ADMIN` privilege).",
    explanation: "Allows administrators to log in and troubleshoot saturated servers.",
    hint: "Throws Error 1040 Too many connections, reserving one slot for administrators.",
    level: "basic"
  },
  {
    question: "What is the purpose of the `thread_cache_size` system variable?",
    shortAnswer: "It caches idle connection threads when clients disconnect, avoiding the expensive operating system overhead of destroying and recreating threads for new connections.",
    explanation: "Thread caching accelerates high-throughput connection churn.",
    hint: "Caches connection threads in memory to avoid creation overhead.",
    level: "expert"
  },
  {
    question: "Why was the Query Cache completely removed in MySQL 8.0?",
    shortAnswer: "Because it suffered from severe global mutex lock contention on multi-core servers, and any table write immediately invalidated all cached queries for that table, making it a bottleneck in high-concurrency workloads.",
    explanation: "Application-level caching (e.g. Redis) is far more efficient than database-level statement caching.",
    hint: "Suffered from global lock contention and frequent table invalidation under concurrent writes.",
    level: "expert"
  },
  {
    question: "How does the Storage Engine API pass row data back to the Core Server?",
    shortAnswer: "The engine populates internal memory row buffers (`uchar *record`) with column data decoded from disk pages, and the server reads from these buffers to apply filtering, sorting, or client streaming.",
    explanation: "Row data is transferred across memory buffers through standard handler function calls.",
    hint: "Populates in-memory row buffers passed through the handler class.",
    level: "expert"
  },
  {
    question: "Can different tables within the SAME MySQL database use DIFFERENT storage engines?",
    shortAnswer: "Yes! Table A can use `ENGINE=InnoDB` (for transactional orders), Table B can use `ENGINE=MEMORY` (for fast temporary lookups), and Table C can use `ENGINE=CSV` (for raw logging) in the same database.",
    explanation: "Storage engine choice is granularly configurable at the individual table level.",
    hint: "Yes, engine choice is specified per table via ENGINE=...",
    level: "basic"
  },
  {
    question: "What is the default storage engine in modern MySQL 8.0?",
    shortAnswer: "**InnoDB** (which provides full ACID transactions, row-level locking, foreign key integrity, and crash recovery).",
    explanation: "InnoDB has been the default since MySQL 5.5.",
    hint: "InnoDB",
    level: "basic"
  },
  {
    question: "What happens when you execute `SET DEFAULT_STORAGE_ENGINE = MyISAM;`?",
    shortAnswer: "Any subsequent `CREATE TABLE` statement in the current session that omits the `ENGINE=` clause will default to using MyISAM instead of InnoDB.",
    explanation: "Modifies the fallback storage engine for the session.",
    hint: "Changes the fallback engine for new tables created without explicit ENGINE clause.",
    level: "basic"
  },
  {
    question: "What is the role of the MySQL Data Dictionary in MySQL 8.0?",
    shortAnswer: "It is a unified, transactional metadata repository stored in internal InnoDB tables, replacing the old file-based `.frm` metadata files used in MySQL 5.7.",
    explanation: "Guarantees atomic, crash-safe DDL operations (`CREATE`, `ALTER`, `DROP`).",
    hint: "Transactional internal InnoDB repository replacing legacy .frm files.",
    level: "expert"
  },
  {
    question: "How do you check the active thread count and connection statistics?",
    shortAnswer: "`SHOW GLOBAL STATUS LIKE 'Threads_%';`",
    explanation: "Displays `Threads_connected`, `Threads_running`, `Threads_created`, and `Threads_cached`.",
    hint: "SHOW GLOBAL STATUS LIKE 'Threads_%';",
    level: "basic",
    codeExample: "SHOW GLOBAL STATUS LIKE 'Threads_%';"
  },
  {
    question: "What is the execution sequence when a client sends a `SELECT` statement to MySQL?",
    shortAnswer: "1) Client sends packet &rarr; 2) Thread allocated & authentication verified &rarr; 3) Parser builds AST &rarr; 4) Preprocessor checks tables/permissions &rarr; 5) Optimizer creates plan &rarr; 6) Executor calls Handler API &rarr; 7) Engine reads pages &rarr; 8) Server streams rows to client.",
    explanation: "End-to-end lifecycle across the three architectural tiers.",
    hint: "Network &rarr; Connection Thread &rarr; Parser &rarr; Preprocessor &rarr; Optimizer &rarr; Handler API &rarr; Client.",
    level: "expert"
  },
  {
    question: "Why does the modular architecture of MySQL provide superior flexibility compared to monolithic databases?",
    shortAnswer: "Because it allows selecting specialized storage engines optimized for specific workloads (e.g. high-write archive, in-memory cache, transactional OLTP) without changing SQL syntax or application interfaces.",
    explanation: "Applications use the same SQL grammar regardless of underlying engine choices.",
    hint: "Allows choosing workload-specific storage engines without altering SQL query syntax.",
    level: "basic"
  },
  {
    question: "What is a 'Handler Socket' or direct engine access bypass?",
    shortAnswer: "A plugin/interface that allows client applications to bypass the SQL parsing and optimization layer, communicating directly with the storage engine API for ultra-high key-value throughput.",
    explanation: "Provides NoSQL-like speed for simple Primary Key lookups.",
    hint: "Directly accesses storage engine API, bypassing SQL parsing for raw key-value speed.",
    level: "expert"
  },
  {
    question: "What does the `SHOW PROCESSLIST;` command display in the Connection Layer?",
    shortAnswer: "It lists all currently active client connection threads, their assigned user, host, active database, executing command, execution duration (Time), and current execution stage (State).",
    explanation: "Indispensable tool for identifying stuck or long-running queries.",
    hint: "Lists active client threads, user connections, and running query states.",
    level: "basic"
  },
  {
    question: "How can an administrator terminate a stuck client connection thread in MySQL?",
    shortAnswer: "`KILL thread_id;` (e.g. `KILL 45;` using the ID from `SHOW PROCESSLIST`).",
    explanation: "Terminates the client session and aborts its active statement.",
    hint: "KILL thread_id;",
    level: "basic"
  },
  {
    question: "What is the function of the Error Log in the Server Layer?",
    shortAnswer: "It records diagnostic startup, shutdown, and critical runtime errors encountered by the MySQL daemon (`mysqld`), essential for troubleshooting server crashes.",
    explanation: "Primary diagnostic file for server health.",
    hint: "Records server startup, shutdown, and critical runtime diagnostic alerts.",
    level: "basic"
  },
  {
    question: "Why is the separation between Server Layer and Storage Engine Layer crucial for database backup tools?",
    shortAnswer: "Because logical backup tools (like `mysqldump`) operate at the Server Layer querying SQL rows, while physical hot backup tools (like Percona XtraBackup) operate at the Storage Engine layer copying raw InnoDB data pages.",
    explanation: "Enables both portable logical dumps and ultra-fast physical snapshot backups.",
    hint: "Enables logical SQL backups at server layer and physical page backups at engine layer.",
    level: "expert"
  },
  {
    question: "What does `SELECT @@version_comment;` display?",
    shortAnswer: "It displays the build information and distribution details of the running MySQL server binary (e.g. 'MySQL Community Server - GPL').",
    explanation: "Useful for checking server edition metadata.",
    hint: "Displays server binary edition and build comments.",
    level: "basic"
  },
  {
    question: "What causes a query to enter the 'Sending data' state in `SHOW PROCESSLIST`?",
    shortAnswer: "The executor is actively reading rows from the storage engine handler, evaluating `WHERE` filtering conditions, and/or streaming matching records across the network to the client.",
    explanation: "Represents normal active query data processing and transmission.",
    hint: "Server is actively reading rows from the engine, filtering, and transmitting data.",
    level: "expert"
  },
  {
    question: "What is the primary architectural takeaway of Topic 0 in Module 004_001?",
    shortAnswer: "MySQL operates through a clear 3-tier architecture where the Client Layer manages sessions, the Core Server Layer parses and optimizes queries, and the Pluggable Storage Engine Layer handles physical page I/O, transactions, and indexing via the open Handler API.",
    explanation: "Understanding this 3-tier separation is the prerequisite for mastering InnoDB internals and DBA tuning.",
    hint: "Mastering the 3-tier logical architecture: Connection Layer, SQL Server Layer, and Handler API.",
    level: "basic"
  }
];

export default questions;
