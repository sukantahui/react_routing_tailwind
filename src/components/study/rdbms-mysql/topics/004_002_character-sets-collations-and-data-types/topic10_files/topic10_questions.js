// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is a Generated Column in MySQL?",
    shortAnswer: "A column whose value is **automatically computed from a deterministic expression** referencing other columns in the same table row, rather than being explicitly inserted by the user.",
    explanation: "Also referred to as a Computed or Functional column.",
    hint: "A column computed automatically from an expression referencing other columns in the row.",
    level: "basic"
  },
  {
    question: "What is the primary difference between `VIRTUAL` and `STORED` generated columns?",
    shortAnswer: "- `VIRTUAL` (Default): **Consumes 0 bytes of disk storage** in the table row; computed dynamically in RAM when read.\n- `STORED`: **Physically stored on disk** inside the row payload; computed upon `INSERT` or `UPDATE`.",
    explanation: "VIRTUAL saves disk space; STORED saves read-time CPU.",
    hint: "VIRTUAL takes 0 bytes disk space; STORED writes values physically to disk.",
    level: "basic"
  },
  {
    question: "Can you create a B+ tree secondary index on a `VIRTUAL` generated column in InnoDB?",
    shortAnswer: "Yes! InnoDB **fully supports secondary indexes on `VIRTUAL` columns**; the index physically stores the extracted values in the secondary B+ tree leaf pages without bloating the clustered data page.",
    explanation: "One of the most powerful architectural features in modern MySQL.",
    hint: "Yes, fully supported; index entries are materialized in the secondary B+ tree.",
    level: "basic",
    codeExample: "CREATE TABLE candidate_profiles (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  profile JSON NOT NULL,\n  city VARCHAR(50) GENERATED ALWAYS AS (profile->>'$.city') VIRTUAL,\n  INDEX idx_city (city) -- Fast index seek on JSON data! ⚡\n);"
  },
  {
    question: "Why are `VIRTUAL` generated columns preferred over `STORED` for indexing JSON documents?",
    shortAnswer: "Because `VIRTUAL` columns **avoid duplicate storage on disk** (the value exists in the JSON document and the secondary index, but not in the main table row payload), saving disk space and reducing write I/O.",
    explanation: "Optimal balance of write performance and index seek speed.",
    hint: "Avoids duplicating the data on disk while providing full index search speeds.",
    level: "expert"
  },
  {
    question: "How do you extract a JSON property into a typed `VIRTUAL` generated column?",
    shortAnswer: "`col_name data_type GENERATED ALWAYS AS (json_col->>'$.path') VIRTUAL`",
    explanation: "Standard syntax for creating typed relational bridges over JSON documents.",
    hint: "AS (json_col->>'$.path') VIRTUAL.",
    level: "basic",
    codeExample: "ALTER TABLE students \nADD COLUMN student_email VARCHAR(150) \nGENERATED ALWAYS AS (profile->>'$.email') VIRTUAL;"
  },
  {
    question: "Can a generated column expression use non-deterministic functions like `NOW()`, `RAND()`, or `UUID()`?",
    shortAnswer: "No! Generated column expressions must be **strictly deterministic** (evaluating to the exact same output for the same input); non-deterministic functions raise **Error 3763: Expression of generated column '...' contains a disallowed function**.",
    explanation: "Guarantees repeatable values and index integrity.",
    hint: "No, expressions must be strictly deterministic.",
    level: "expert"
  },
  {
    question: "Can you add a `UNIQUE` constraint to a generated column based on a JSON field?",
    shortAnswer: "Yes! Creating a `UNIQUE INDEX` on a generated column enforces uniqueness on that specific nested JSON property across all rows in the table.",
    explanation: "Brings relational uniqueness integrity to schema-less JSON documents.",
    hint: "Yes, UNIQUE indexes can be created on generated columns.",
    level: "basic",
    codeExample: "CREATE TABLE accounts (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  payload JSON NOT NULL,\n  account_code VARCHAR(30) AS (payload->>'$.code') VIRTUAL UNIQUE\n);"
  },
  {
    question: "What happens if an `INSERT` statement tries to explicitly provide a value for a generated column?",
    shortAnswer: "The transaction fails with **Error 3105 (HY000): The value specified for generated column '...' is not allowed**, unless the keyword `DEFAULT` is supplied.",
    explanation: "Generated column values are read-only and computed exclusively by MySQL.",
    hint: "Fails with Error 3105 because generated columns cannot be explicitly assigned.",
    level: "basic"
  },
  {
    question: "Can you enforce a `NOT NULL` constraint on a `VIRTUAL` generated column?",
    shortAnswer: "Yes! If an inserted row has a JSON payload missing the required key (evaluating to `NULL`), MySQL will reject the insert with **Error 1048: Column '...' cannot be null**.",
    explanation: "Enforces required schema key presence on flexible JSON documents.",
    hint: "Yes, NOT NULL enforces that the extracted JSON property cannot evaluate to null.",
    level: "basic"
  },
  {
    question: "What is the optimizer behavior when a query filters on the original JSON expression (`WHERE profile->>'$.city' = 'Barrackpore'`) when an indexed generated column exists?",
    shortAnswer: "The MySQL query optimizer automatically **detects that the expression matches an existing indexed generated column and rewrites the query to use the index scan!**",
    explanation: "Automatic query rewrite feature in MySQL 5.7+ and 8.0.",
    hint: "The optimizer automatically uses the generated column index for matching expressions.",
    level: "expert"
  },
  {
    question: "Can a `STORED` generated column be used as a Foreign Key parent or child?",
    shortAnswer: "Yes, `STORED` generated columns can be defined as **Foreign Keys or referenced by Foreign Keys** (unlike `VIRTUAL` columns with `CASCADE` options).",
    explanation: "Foreign key constraints require materialized on-disk row stability.",
    hint: "Yes, STORED columns can participate in Foreign Key relationships.",
    level: "expert"
  },
  {
    question: "How do you calculate full name from `first_name` and `last_name` using a generated column?",
    shortAnswer: "`full_name VARCHAR(100) GENERATED ALWAYS AS (CONCAT(first_name, ' ', last_name)) VIRTUAL`",
    explanation: "Classic relational use case for generated columns.",
    hint: "AS (CONCAT(first_name, ' ', last_name)) VIRTUAL.",
    level: "basic",
    codeExample: "CREATE TABLE users (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  first_name VARCHAR(50) NOT NULL,\n  last_name VARCHAR(50) NOT NULL,\n  full_name VARCHAR(105) GENERATED ALWAYS AS (CONCAT(first_name, ' ', last_name)) VIRTUAL\n);"
  },
  {
    question: "Can a generated column reference another generated column in the same table?",
    shortAnswer: "Yes, provided the referenced generated column appears **earlier in the table definition** (forward references to subsequent columns are disallowed).",
    explanation: "Requires strictly ordered dependency resolution.",
    hint: "Yes, as long as it references columns defined earlier in the table.",
    level: "expert"
  },
  {
    question: "What is the write-time overhead of `VIRTUAL` vs `STORED` generated columns?",
    shortAnswer: "- `VIRTUAL` (Unindexed): **0 Write Overhead** (expression is not evaluated during insert/update).\n- `STORED`: **Requires CPU evaluation & extra disk I/O** to write the computed bytes on every insert/update.",
    explanation: "Makes unindexed VIRTUAL columns virtually free during high-speed writes.",
    hint: "VIRTUAL has zero write overhead; STORED evaluates and writes bytes on every row write.",
    level: "expert"
  },
  {
    question: "How do you alter an existing `VIRTUAL` generated column expression?",
    shortAnswer: "`ALTER TABLE tbl MODIFY COLUMN col_name data_type AS (new_expression) VIRTUAL;`",
    explanation: "Updates the computation expression in table metadata.",
    hint: "ALTER TABLE tbl MODIFY COLUMN col_name ... AS (new_expression) VIRTUAL;",
    level: "basic"
  },
  {
    question: "Can you create a `CHECK` constraint on a `VIRTUAL` generated column?",
    shortAnswer: "Yes! For example, `CHECK (extracted_age >= 18)` validates that a nested JSON age property adheres to business validation rules.",
    explanation: "Applies relational validation constraints to extracted JSON properties.",
    hint: "Yes, CHECK constraints can validate generated column values.",
    level: "basic"
  },
  {
    question: "What information schema table shows which columns are generated?",
    shortAnswer: "`SELECT column_name, generation_expression, extra FROM information_schema.columns WHERE table_name = 'candidate_profiles';` (extra shows `VIRTUAL GENERATED` or `STORED GENERATED`).",
    explanation: "Inspects computed column metadata and formulas.",
    hint: "Query generation_expression and extra from information_schema.columns.",
    level: "basic",
    codeExample: "SELECT column_name, data_type, extra, generation_expression \nFROM information_schema.columns \nWHERE table_name = 'candidate_profiles';"
  },
  {
    question: "What happens when you drop the base column referenced by a generated column?",
    shortAnswer: "MySQL prevents dropping the base column and throws **Error 3108: Column '...' has a generated column dependency and cannot be dropped**.",
    explanation: "Preserves relational dependency integrity.",
    hint: "Fails with Error 3108 due to generated column dependency.",
    level: "basic"
  },
  {
    question: "Why does indexing a `VIRTUAL` generated column transform JSON query performance from $O(N)$ to $O(\\log N)$?",
    shortAnswer: "Because without an index, MySQL must scan every row in the table ($O(N)$ full table scan); indexing the `VIRTUAL` column creates a B+ tree index that enables instant **$O(\\log N)$ B+ tree range and point seeks**.",
    explanation: "The ultimate solution for high-speed JSON queries in MySQL.",
    hint: "Transforms full table scans O(N) into instant B+ tree index seeks O(log N).",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 10 in Module 004_002?",
    shortAnswer: "Generated Columns act as the architectural bridge between schema-less JSON and relational indexing: `VIRTUAL` columns consume 0 extra disk space in table rows while enabling full B+ tree secondary indexing, `UNIQUE` constraints, and relational type safety over semi-structured documents.",
    explanation: "Mastery of Generated Columns is the key to high-performance hybrid relational-document databases.",
    hint: "VIRTUAL generated columns provide 0-byte disk bridges for indexing and constraining JSON data.",
    level: "basic"
  }
];

export default questions;
