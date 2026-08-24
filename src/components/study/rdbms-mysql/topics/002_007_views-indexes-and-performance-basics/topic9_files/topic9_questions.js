// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is a Clustered Index in MySQL InnoDB?",
    shortAnswer: "A clustered index is the physical organization of the table itself where leaf pages store the complete, actual data rows sorted by the Primary Key.",
    explanation: "In InnoDB, the table IS the clustered index (Index-Organized Table).",
    hint: "The physical table structure where leaf nodes store full data rows.",
    level: "basic"
  },
  {
    question: "How many Clustered Indexes can exist on a single table in MySQL InnoDB?",
    shortAnswer: "Exactly **ONE**.",
    explanation: "Physical data rows on disk can only be sorted and stored in one physical order.",
    hint: "Exactly 1 clustered index per table.",
    level: "basic"
  },
  {
    question: "What is a Secondary (Non-Clustered) Index in InnoDB?",
    shortAnswer: "An auxiliary B+Tree index whose leaf pages store only the indexed column value and the corresponding Primary Key value.",
    explanation: "Secondary indexes provide alternative access paths to the table rows.",
    hint: "An auxiliary B-Tree index storing indexed columns + Primary Key pointers.",
    level: "basic"
  },
  {
    question: "How many Secondary Indexes can a table have in MySQL InnoDB?",
    shortAnswer: "Multiple (up to 64 secondary indexes per table in modern InnoDB).",
    explanation: "You can create secondary indexes on any columns needed for query acceleration.",
    hint: "Multiple secondary indexes (up to 64 per table).",
    level: "basic"
  },
  {
    question: "What does an InnoDB Secondary Index store in its leaf nodes to point to the actual table row?",
    shortAnswer: "The row's **Primary Key value** (the lookup bookmark).",
    explanation: "Secondary index leaves do not store physical disk offsets; they store logical Primary Keys.",
    hint: "The Primary Key value of the row.",
    level: "basic"
  },
  {
    question: "What is a 'Double Lookup' (Bookmark Lookup / Secondary Seek)?",
    shortAnswer: "When a query searches via a secondary index and needs non-indexed columns, requiring: (1) Seek on the secondary index to find the Primary Key, followed by (2) Seek on the Clustered Index to retrieve full row data.",
    explanation: "Two sequential B-Tree traversals to fulfill a single query.",
    hint: "Secondary index seek to find PK + Clustered index seek to fetch full row.",
    level: "moderate"
  },
  {
    question: "How does a 'Covering Index' eliminate the Double Lookup?",
    shortAnswer: "If all columns requested in the `SELECT` list are already present in the secondary index leaf node, MySQL returns data immediately without visiting the Clustered Index.",
    explanation: "Bypasses the second seek, cutting disk I/O and latency in half.",
    hint: "All requested columns exist in the secondary index, avoiding the clustered seek.",
    level: "moderate"
  },
  {
    question: "What appears in the `Extra` column of `EXPLAIN` when a query is satisfied by a Covering Index?",
    shortAnswer: "`Using index`",
    explanation: "'Using index' indicates that only the secondary index tree was read.",
    hint: "Using index",
    level: "basic"
  },
  {
    question: "What happens if you create a table in InnoDB WITHOUT defining a `PRIMARY KEY`?",
    shortAnswer: "InnoDB uses the first non-null `UNIQUE` index as the clustered index; if none exists, it generates a hidden 6-byte synthetic `GEN_CLUST_INDEX` row ID.",
    explanation: "InnoDB always creates a clustered index, either explicit or synthetic.",
    hint: "Uses the first non-null UNIQUE key, or generates a synthetic 6-byte row ID.",
    level: "moderate"
  },
  {
    question: "Why is relying on InnoDB's synthetic `GEN_CLUST_INDEX` considered bad practice?",
    shortAnswer: "Because all tables without a primary key share a single global row-id generator and mutex, creating severe lock contention under high-concurrency inserts.",
    explanation: "A global counter lock bottlenecks multi-threaded insert workloads.",
    hint: "Shared global lock counter bottlenecks multi-threaded concurrent inserts.",
    level: "expert"
  },
  {
    question: "Why should Primary Keys in InnoDB always be kept as narrow (compact) as possible?",
    shortAnswer: "Because EVERY secondary index leaf node stores a copy of the Primary Key; a wide primary key bloats all secondary index trees on the table.",
    explanation: "Reduces memory footprint and increases page fan-out across all secondary indexes.",
    hint: "Secondary indexes store the Primary Key, so wide PKs bloat all secondary indexes.",
    level: "expert"
  },
  {
    question: "What is the consequence of choosing a 36-character UUID string as a Clustered Primary Key?",
    shortAnswer: "All secondary indexes must store the 36-byte UUID in every leaf entry, wasting massive RAM/disk, and random UUID inserts cause frequent 50% page splits.",
    explanation: "Causes both secondary index bloat and clustered table fragmentation.",
    hint: "Bloats all secondary indexes and causes 50% page splits on random inserts.",
    level: "expert"
  },
  {
    question: "How does a point lookup on a `PRIMARY KEY` compare to a point lookup on a `UNIQUE` secondary index?",
    shortAnswer: "PRIMARY KEY lookup requires only 1 B-Tree seek directly to full row data; UNIQUE secondary index lookup requires 2 B-Tree seeks (secondary seek + clustered seek).",
    explanation: "Primary key seeks are twice as fast as secondary index seeks.",
    hint: "Primary key is a 1-step direct read; secondary unique index is a 2-step lookup.",
    level: "moderate"
  },
  {
    question: "If a secondary index is `idx_email (email)` on table `students (student_id PK, name, email)`, what columns are stored in the secondary index leaf node?",
    shortAnswer: "`email` AND `student_id` (the Primary Key is automatically appended to every secondary index).",
    explanation: "Secondary index leaves implicitly include the primary key columns.",
    hint: "Both the email column and the primary key (student_id).",
    level: "expert"
  },
  {
    question: "Can a query `SELECT student_id, email FROM students WHERE email = '...'` be satisfied entirely by `idx_email (email)`?",
    shortAnswer: "YES. Because `student_id` is the Primary Key, it is already stored in the leaf nodes of `idx_email`, making it a Covering Index query.",
    explanation: "No clustered table lookup is needed because PK is implicitly present in the leaf node.",
    hint: "Yes; the Primary Key is implicitly included in the secondary index leaf.",
    level: "expert"
  },
  {
    question: "What is the difference between Clustered Index in MySQL InnoDB vs Clustered Index in PostgreSQL?",
    shortAnswer: "InnoDB tables are permanently and strictly clustered by PK as B+Trees; PostgreSQL tables are heap tables by default (though they can be manually reordered with the `CLUSTER` command).",
    explanation: "PostgreSQL uses heap files with row IDs (CTID); InnoDB uses Index-Organized Tables.",
    hint: "InnoDB is strictly Index-Organized; PostgreSQL uses heap tables with CTID pointers.",
    level: "expert"
  },
  {
    question: "Why does updating a Primary Key value incur a huge performance penalty in InnoDB?",
    shortAnswer: "Because modifying the Primary Key moves the row's physical location in the Clustered B-Tree AND requires updating the bookmark pointer in EVERY secondary index on the table.",
    explanation: "Incurs write amplification across the entire table and all secondary indexes.",
    hint: "Moves the physical row in the clustered table and updates all secondary indexes.",
    level: "expert"
  },
  {
    question: "Why are sequential `AUTO_INCREMENT` integers ideal for Clustered Primary Keys?",
    shortAnswer: "They ensure new rows always append to the rightmost leaf page at 93.75% fill factor with zero page splits, keeping clustered storage compact and fast.",
    explanation: "Eliminates fragmentation and maximizes disk write throughput.",
    hint: "Appends sequentially to the rightmost page with zero page splits.",
    level: "basic"
  },
  {
    question: "Can you create a secondary index that includes the primary key column explicitly: `CREATE INDEX idx_test ON table(col1, pk_col)`?",
    shortAnswer: "YES, but it is usually redundant because InnoDB automatically appends the primary key to all secondary indexes.",
    explanation: "Explicitly adding PK columns is generally unnecessary unless controlling column sort order.",
    hint: "Yes, but it is redundant since InnoDB automatically appends the Primary Key.",
    level: "moderate"
  },
  {
    question: "What happens when a query searches via secondary index matching 50,000 rows on a 100,000-row table?",
    shortAnswer: "Performing 50,000 random bookmark lookups on the clustered index is more expensive than sequentially reading the table, so the optimizer will choose a **Full Table Scan** instead.",
    explanation: "The optimizer calculates cost; if secondary lookups exceed ~15-20% of rows, table scan wins.",
    hint: "The optimizer chooses a Full Table Scan because 50,000 random seeks are too slow.",
    level: "expert"
  },
  {
    question: "What is Multi-Range Read (MRR) optimization in MySQL?",
    shortAnswer: "An optimization that collects primary keys from secondary index scans, sorts them in memory by primary key order, and accesses the clustered index sequentially rather than randomly.",
    explanation: "Converts random disk I/O into sequential disk I/O for secondary index range queries.",
    hint: "Sorts primary keys from secondary scans to perform sequential clustered reads.",
    level: "expert"
  },
  {
    question: "What appears in `EXPLAIN Extra` when Multi-Range Read (MRR) is utilized?",
    shortAnswer: "`Using MRR`",
    explanation: "Indicates that the buffer-sorted sequential key lookup optimization was applied.",
    hint: "Using MRR",
    level: "moderate"
  },
  {
    question: "How do you search for student Mamata Hui using her primary key vs using her phone number in terms of SQL syntax and execution?",
    shortAnswer: "`WHERE student_id = 101` (1-step direct clustered seek) vs `WHERE phone_number = '9830098214'` (2-step secondary seek + clustered lookup).",
    explanation: "Primary key lookups bypass the secondary index layer completely.",
    hint: "Primary key seek is 1 step; phone number seek requires 2 steps.",
    level: "basic"
  },
  {
    question: "Why should you avoid using mutable columns (columns whose values change frequently, like `status` or `last_login`) as Clustered Primary Keys?",
    shortAnswer: "Because changing a primary key requires physically moving the row to a new page and rewriting pointers in all secondary indexes.",
    explanation: "Primary keys should be immutable (static).",
    hint: "Updating primary keys physically relocates rows and rewrites all secondary indexes.",
    level: "moderate"
  },
  {
    question: "Can a table have multiple UNIQUE secondary indexes?",
    shortAnswer: "YES. You can define multiple `UNIQUE` constraints/indexes on different columns (e.g. unique email and unique phone).",
    explanation: "Multiple unique secondary indexes coexist alongside the single clustered index.",
    hint: "Yes; a table can have multiple unique secondary indexes.",
    level: "basic"
  },
  {
    question: "What storage engine in MySQL does NOT use Clustered Indexes?",
    shortAnswer: "`MyISAM` (it stores rows in flat heap `.MYD` data files and indexes in `.MYI` B-Trees with 6-byte file byte offset pointers).",
    explanation: "MyISAM uses non-clustered heap tables for all indexes.",
    hint: "MyISAM uses heap data files with byte offset pointers.",
    level: "moderate"
  },
  {
    question: "How does table rebuild (`OPTIMIZE TABLE table_name;`) affect Clustered vs Secondary indexes in InnoDB?",
    shortAnswer: "It rebuilds the clustered index sequentially, defragmenting all physical pages to 93.75% density, and then rebuilds all secondary index B-Trees cleanly.",
    explanation: "Eliminates empty space caused by page splits and row deletions.",
    hint: "Rebuilds clustered and secondary indexes cleanly, eliminating fragmentation.",
    level: "moderate"
  },
  {
    question: "Why is a `COUNT(*)` faster on a secondary index than on the clustered index in InnoDB?",
    shortAnswer: "Because secondary index leaf pages store only key + PK (much smaller than full data rows), allowing more records per page and requiring fewer page reads to count rows.",
    explanation: "MySQL optimizer automatically picks the smallest secondary index for COUNT(*).",
    hint: "Secondary index pages are smaller, requiring fewer page reads to count rows.",
    level: "expert"
  },
  {
    question: "What is the primary architectural difference between Clustered and Secondary indexes?",
    shortAnswer: "Clustered index leaf nodes contain the actual physical table data; Secondary index leaf nodes contain only indexed keys and Primary Key pointers.",
    explanation: "The core foundational concept of InnoDB physical storage.",
    hint: "Clustered contains full rows; Secondary contains keys + Primary Key pointers.",
    level: "basic"
  },
  {
    question: "What is the senior developer's golden rule for Clustered and Secondary Index design?",
    shortAnswer: "Always define an immutable, narrow, sequential Primary Key (`BIGINT AUTO_INCREMENT`) for clustering, and build targeted, covering secondary indexes for high-frequency search queries.",
    explanation: "Maximizes point-lookup speed, avoids secondary index bloat, and eliminates page split fragmentation.",
    hint: "Narrow sequential PK + targeted covering secondary indexes.",
    level: "expert"
  }
];

export default questions;
