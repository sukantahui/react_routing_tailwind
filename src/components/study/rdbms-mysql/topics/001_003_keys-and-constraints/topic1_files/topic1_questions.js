// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is a PRIMARY KEY constraint in MySQL?",
    shortAnswer: "A relational constraint that uniquely identifies every tuple in a table, strictly enforcing NOT NULL and UNIQUE.",
    explanation: "In InnoDB, the Primary Key defines the clustered index, dictating the physical disk layout of the table.",
    hint: "Unique entity row identifier.",
    level: "basic",
    codeExample: "CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL\n);"
  },
  {
    question: "How many PRIMARY KEY constraints can a single relational table have?",
    shortAnswer: "Exactly ONE Primary Key per table (though it can span multiple composite columns).",
    explanation: "Because the Primary Key forms the single physical clustered index, a table cannot have multiple primary keys.",
    hint: "Exactly one clustered key per table.",
    level: "basic"
  },
  {
    question: "What is a Composite Primary Key?",
    shortAnswer: "A primary key formed by combining two or more columns to guarantee unique row identification across the tuple.",
    explanation: "In `PRIMARY KEY (student_id, course_id)`, individual IDs can repeat, but the combination of both must be unique.",
    hint: "Multi-column primary key.",
    level: "basic",
    codeExample: "CREATE TABLE course_enrollments (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    PRIMARY KEY (student_id, course_id)\n);"
  },
  {
    question: "What is the relationship between a PRIMARY KEY and the InnoDB Clustered Index?",
    shortAnswer: "In MySQL InnoDB, the Primary Key IS the clustered index. Table rows are physically stored on disk in the leaf pages of the Primary Key B+Tree.",
    explanation: "Every secondary index in InnoDB contains the Primary Key value as its row lookup pointer.",
    hint: "Physical data page storage organization.",
    level: "expert"
  },
  {
    question: "What happens if you create an InnoDB table without explicitly defining a PRIMARY KEY?",
    shortAnswer: "InnoDB uses the first non-null `UNIQUE` index as the clustered key; if none exists, it generates a hidden 6-byte auto-increment row ID (`DB_ROW_ID`).",
    explanation: "Hidden row IDs cannot be controlled or referenced by applications, making explicit Primary Keys best practice.",
    hint: "Hidden 6-byte DB_ROW_ID fallback.",
    level: "expert"
  },
  {
    question: "Why can a PRIMARY KEY column NEVER accept NULL values?",
    shortAnswer: "Relational theory and SQL standards dictate that every entity instance must have a concrete, unambiguous identity.",
    explanation: "Allowing NULL would mean an entity has an unknown identity, violating Entity Integrity.",
    hint: "Implicit NOT NULL enforcement on PK.",
    level: "basic"
  },
  {
    question: "What is a Surrogate Key vs a Natural Key?",
    shortAnswer: "A Natural Key is a real-world business identifier (e.g. Passport Number); a Surrogate Key is an artificial system-generated sequence (e.g. `id INT AUTO_INCREMENT`).",
    explanation: "Surrogate keys isolate relational foreign keys from changes in real-world business numbering rules.",
    hint: "Artificial sequence ID vs real-world business attribute.",
    level: "moderate"
  },
  {
    question: "Why is using random UUID strings (`CHAR(36)`) as Clustered Primary Keys an anti-pattern in InnoDB?",
    shortAnswer: "Random UUIDs cause severe B+Tree leaf page splits, fragmentation, and cache evictions because rows are inserted at random disk locations rather than sequentially.",
    explanation: "Sequential surrogate integers (`AUTO_INCREMENT`) append to the end of the B+Tree with zero page split overhead.",
    hint: "Random inserts cause B+Tree page splits and fragmentation.",
    level: "expert"
  },
  {
    question: "How does MySQL 8.0 support fast ordered UUIDs as Primary Keys?",
    shortAnswer: "Using `UUID_TO_BIN(UUID(), 1)` with time-part swapping to create sequential, binary-compact 16-byte UUIDs.",
    explanation: "Time-swapped UUIDs insert sequentially like integers while preserving global uniqueness.",
    hint: "UUID_TO_BIN time-swapped binary UUIDs.",
    level: "expert",
    codeExample: "CREATE TABLE users (\n    user_id BINARY(16) PRIMARY KEY,\n    username VARCHAR(50) NOT NULL\n);"
  },
  {
    question: "What error occurs if you define two separate columns with the `PRIMARY KEY` keyword in `CREATE TABLE`?",
    shortAnswer: "Error 1068 (42000): 'Multiple primary key defined'.",
    explanation: "To create a multi-column key, use table-level syntax: `PRIMARY KEY (col1, col2)`.",
    hint: "Error 1068 multiple PK syntax violation.",
    level: "basic",
    codeExample: "-- FAILS: id INT PRIMARY KEY, code VARCHAR(10) PRIMARY KEY\n-- CORRECT: PRIMARY KEY (id, code)"
  },
  {
    question: "What is the maximum number of columns that can be included in a single Composite Primary Key in MySQL InnoDB?",
    shortAnswer: "Up to 16 columns (up to 3072 bytes total key prefix length).",
    explanation: "While technically 16 are allowed, most composite keys use 2 or 3 attributes.",
    hint: "16-column maximum composite limit.",
    level: "expert"
  },
  {
    question: "How do you add a PRIMARY KEY to an existing table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE table_name ADD CONSTRAINT pk_name PRIMARY KEY (column_name);`.",
    explanation: "Requires that the specified column already has no duplicates and contains no NULL values.",
    hint: "ALTER TABLE ADD PRIMARY KEY syntax.",
    level: "moderate",
    codeExample: "ALTER TABLE students ADD CONSTRAINT pk_students PRIMARY KEY (student_id);"
  },
  {
    question: "How do you drop a PRIMARY KEY from a table in MySQL?",
    shortAnswer: "`ALTER TABLE table_name DROP PRIMARY KEY;`.",
    explanation: "If the column has an `AUTO_INCREMENT` attribute, `AUTO_INCREMENT` must be removed first before dropping the primary key.",
    hint: "ALTER TABLE DROP PRIMARY KEY.",
    level: "moderate",
    codeExample: "ALTER TABLE students MODIFY student_id INT NOT NULL;\nALTER TABLE students DROP PRIMARY KEY;"
  },
  {
    question: "Why should Primary Key values be treated as strictly immutable (never updated)?",
    shortAnswer: "Updating a Primary Key forces InnoDB to delete and re-insert the clustered row, updates all secondary index lookup pointers, and triggers cascading updates across foreign key tables.",
    explanation: "Mutating primary keys incurs massive lock contention and I/O overhead.",
    hint: "Immutability avoids cascading re-indexing and lock spikes.",
    level: "expert"
  },
  {
    question: "What data type is most recommended for high-volume enterprise Primary Keys?",
    shortAnswer: "`BIGINT UNSIGNED AUTO_INCREMENT` (supports up to 18.4 quintillion rows).",
    explanation: "`INT UNSIGNED` caps at ~4.29 billion rows; `BIGINT` prevents sequence exhaustion in high-throughput systems.",
    hint: "BIGINT UNSIGNED prevents sequence integer overflow.",
    level: "moderate",
    codeExample: "CREATE TABLE financial_ledger (\n    transaction_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY\n);"
  },
  {
    question: "How does the column order in a Composite Primary Key `(col_a, col_b)` affect query performance?",
    shortAnswer: "The leading column `col_a` can be used alone to filter queries using B+Tree index seeks; queries filtering only by `col_b` cannot utilize the composite index efficiently without index skip scans.",
    explanation: "Always place the most frequently filtered or highest cardinality column first.",
    hint: "Leftmost prefix index rule for composite keys.",
    level: "expert"
  },
  {
    question: "How do you inspect the Primary Key definition of a table in MySQL CLI?",
    shortAnswer: "Using `SHOW INDEX FROM table_name WHERE Key_name = 'PRIMARY';` or `DESCRIBE table_name;`.",
    explanation: "The `Key` column in `DESCRIBE` displays `PRI` for primary key attributes.",
    hint: "PRI indicator in DESCRIBE or SHOW INDEX.",
    level: "basic",
    codeExample: "DESCRIBE students;"
  },
  {
    question: "Can a generated (computed) stored column be part of a PRIMARY KEY in MySQL 8.0?",
    shortAnswer: "Yes, `STORED` generated columns can be included in primary keys (VIRTUAL generated columns cannot).",
    explanation: "STORED columns physically persist on disk, enabling index tree inclusion.",
    hint: "STORED generated column support.",
    level: "expert",
    codeExample: "CREATE TABLE items (\n    dept_id INT,\n    seq INT,\n    full_sku VARCHAR(20) GENERATED ALWAYS AS (CONCAT(dept_id, '-', seq)) STORED,\n    PRIMARY KEY (full_sku)\n);"
  },
  {
    question: "What happens if an `INSERT` statement specifies an explicit ID that collides with an existing Primary Key?",
    shortAnswer: "InnoDB blocks the insert with Error 1062 (23000): 'Duplicate entry ... for key 'PRIMARY''.",
    explanation: "Clustered B+Tree rejects key collisions to preserve uniqueness.",
    hint: "Error 1062 duplicate key.",
    level: "basic"
  },
  {
    question: "How do you retrieve a row by its Primary Key in the fastest possible execution time?",
    shortAnswer: "`SELECT * FROM table_name WHERE primary_key_col = ?;` (Point Lookup: type `const` in EXPLAIN).",
    explanation: "Direct B+Tree traversal directly opens the clustered index leaf data page in O(log N) microseconds.",
    hint: "type const lookup in EXPLAIN.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE student_id = 101;"
  },
  {
    question: "What is the storage size of a Primary Key in secondary B-Tree index leaf nodes in InnoDB?",
    shortAnswer: "Every secondary index leaf node in InnoDB stores the full Primary Key column value(s) as the row pointer.",
    explanation: "Wide composite primary keys (e.g. 5 string columns) bloat the memory size of ALL secondary indexes.",
    hint: "Primary key duplication in secondary indexes.",
    level: "expert"
  },
  {
    question: "Why should developers keep Primary Keys as narrow (small byte size) as possible in InnoDB?",
    shortAnswer: "Because narrower primary keys keep secondary index B+Trees compact, allowing more index pages to fit in the InnoDB Buffer Pool RAM.",
    explanation: "A 4-byte `INT` saves gigabytes of RAM compared to a 36-byte string UUID across multiple secondary indexes.",
    hint: "Buffer Pool RAM density with narrow integer keys.",
    level: "expert"
  },
  {
    question: "Can a Primary Key column be created with a `DEFAULT` value?",
    shortAnswer: "Yes, but for auto-generating surrogate keys, the `AUTO_INCREMENT` attribute is preferred over static defaults.",
    explanation: "Static defaults would cause duplicate key errors on the second insert unless randomized/sequential.",
    hint: "AUTO_INCREMENT vs static defaults.",
    level: "basic"
  },
  {
    question: "What is the difference between `KEY`, `PRIMARY KEY`, and `UNIQUE KEY` in MySQL DDL?",
    shortAnswer: "`KEY` is a non-unique secondary index; `UNIQUE KEY` is a unique secondary index; `PRIMARY KEY` is the single clustered unique non-null table identifier.",
    explanation: "Different index types serve different integrity and lookup roles.",
    hint: "Index type hierarchy.",
    level: "moderate"
  },
  {
    question: "How do you define a Composite Primary Key using explicit CONSTRAINT naming syntax?",
    shortAnswer: "`CONSTRAINT pk_name PRIMARY KEY (col1, col2)` at the table level.",
    explanation: "Explicit naming improves schema self-documentation.",
    hint: "CONSTRAINT symbol_name PRIMARY KEY.",
    level: "basic",
    codeExample: "CREATE TABLE registrations (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    CONSTRAINT pk_student_course PRIMARY KEY (student_id, course_id)\n);"
  },
  {
    question: "What happens when you execute `INSERT INTO t (pk_col) VALUES (NULL)` on an `AUTO_INCREMENT` Primary Key?",
    shortAnswer: "MySQL automatically converts the `NULL` into the next sequential integer in the auto-increment sequence.",
    explanation: "Standard mechanism to trigger automatic sequence generation.",
    hint: "NULL triggers AUTO_INCREMENT generation.",
    level: "basic"
  },
  {
    question: "Can a table have a Composite Primary Key where one of the columns is AUTO_INCREMENT in MySQL InnoDB?",
    shortAnswer: "Yes, but in InnoDB, the `AUTO_INCREMENT` column must be the FIRST column in the key (or have an independent index).",
    explanation: "InnoDB requires fast sequence lookup on the auto-increment attribute.",
    hint: "AUTO_INCREMENT leading column requirement.",
    level: "expert"
  },
  {
    question: "What is an 'Index Organized Table' (IOT) and how does it relate to InnoDB Primary Keys?",
    shortAnswer: "An Index Organized Table stores data rows directly inside the index leaf pages; in MySQL, all InnoDB tables are Index Organized Tables around the Primary Key.",
    explanation: "Data is not stored separately in an unordered heap; data IS the primary key B+Tree.",
    hint: "InnoDB tables are Index Organized Tables.",
    level: "expert"
  },
  {
    question: "How does `ON DUPLICATE KEY UPDATE` interact with Primary Key collisions?",
    shortAnswer: "If an insert encounters a collision on the Primary Key, it intercepts the Error 1062 and updates the specified columns instead.",
    explanation: "Enables atomic upsert operations.",
    hint: "Upsert on PK collision.",
    level: "moderate",
    codeExample: "INSERT INTO counters (id, count) VALUES (1, 1) ON DUPLICATE KEY UPDATE count = count + 1;"
  },
  {
    question: "What is the recommended checklist when designing Primary Keys for production MySQL tables?",
    shortAnswer: "1) Define an explicit `PRIMARY KEY` on every table. 2) Prefer narrow unsigned integers (`INT` / `BIGINT AUTO_INCREMENT`). 3) Use composite keys for junction tables. 4) Keep primary keys strictly immutable. 5) Name constraints explicitly.",
    explanation: "Following these 5 rules guarantees optimal InnoDB B+Tree performance, compact secondary indexes, and total entity integrity.",
    hint: "Explicit PK, Narrow integers, Composite junction keys, Immutability, Explicit naming.",
    level: "basic"
  }
];

export default questions;
