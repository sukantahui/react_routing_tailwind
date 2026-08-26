// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is a Multi-Valued Index in MySQL 8.0?",
    shortAnswer: "A secondary index defined on a **JSON array** where **multiple index records point to a single table row**, allowing fast B+ tree index lookups on array elements.",
    explanation: "Introduced in MySQL 8.0.17 to solve the JSON array indexing challenge.",
    hint: "An index on a JSON array where multiple index entries point to one row.",
    level: "basic"
  },
  {
    question: "What is the syntax for creating a Multi-Valued Index on a JSON array column?",
    shortAnswer: "`CREATE INDEX idx_name ON table_name ((CAST(json_col->'$.path' AS type ARRAY)));`",
    explanation: "Requires wrapping the CAST expression in double parentheses.",
    hint: "CREATE INDEX idx ON tbl ((CAST(doc->'$.path' AS CHAR(30) ARRAY)));",
    level: "basic",
    codeExample: "CREATE TABLE candidates (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  profile JSON NOT NULL,\n  INDEX idx_skills ((CAST(profile->'$.skills' AS CHAR(30) ARRAY)))\n);"
  },
  {
    question: "Which three SQL operators can utilize a Multi-Valued Index for fast query execution?",
    shortAnswer: "1) **`MEMBER OF()`** (single value membership);\n2) **`JSON_CONTAINS()`** (subset matching);\n3) **`JSON_OVERLAPS()`** (set intersection matching).",
    explanation: "The query optimizer specifically routes these three functions to multi-valued indexes.",
    hint: "MEMBER OF(), JSON_CONTAINS(), and JSON_OVERLAPS().",
    level: "expert"
  },
  {
    question: "How do you query a Multi-Valued Index using the `MEMBER OF()` operator?",
    shortAnswer: "`SELECT * FROM candidates WHERE 'React' MEMBER OF (profile->'$.skills');`",
    explanation: "Executes a B+ tree index seek on the 'React' entry in the multi-valued index.",
    hint: "WHERE 'value' MEMBER OF (json_col->'$.array_path').",
    level: "basic",
    codeExample: "SELECT student_name \nFROM candidate_profiles \nWHERE 'MySQL' MEMBER OF (profile->'$.skills');"
  },
  {
    question: "What does the `JSON_OVERLAPS()` operator do?",
    shortAnswer: "It tests whether two JSON documents or arrays have **at least one common key-value pair or array element (set intersection)**, returning `1` if an overlap exists, otherwise `0`.",
    explanation: "Extremely fast tag-matching operator supported by multi-valued indexes.",
    hint: "Returns 1 if two JSON arrays or objects share at least one common element.",
    level: "basic",
    codeExample: "SELECT * FROM candidate_profiles \nWHERE JSON_OVERLAPS(profile->'$.skills', '[\"React\", \"Vue\", \"Angular\"]');"
  },
  {
    question: "When should you use a Generated Column Index vs a Multi-Valued Index for JSON data?",
    shortAnswer: "- **Generated Column Index**: For **scalar values** (e.g. `$.city`, `$.email`, `$.user_id`);\n- **Multi-Valued Index**: For **arrays of elements** (e.g. `$.skills[*]`, `$.tags[*]`, `$.role_ids[*]`).",
    explanation: "Scalar properties use Generated Columns; array collections use Multi-Valued Indexes.",
    hint: "Generated Columns for scalar values; Multi-Valued Indexes for arrays.",
    level: "basic"
  },
  {
    question: "What data types can be used in `CAST(... AS type ARRAY)` when creating Multi-Valued Indexes?",
    shortAnswer: "- `BINARY(N) ARRAY` / `CHAR(N) ARRAY`\n- `DATE ARRAY` / `DATETIME ARRAY` / `TIME ARRAY`\n- `DECIMAL(M, D) ARRAY`\n- `SIGNED ARRAY` / `UNSIGNED ARRAY`",
    explanation: "Covers all standard scalar data types within JSON array payloads.",
    hint: "CHAR, UNSIGNED, SIGNED, DECIMAL, DATE, DATETIME, TIME, and BINARY arrays.",
    level: "expert"
  },
  {
    question: "Can a Multi-Valued Index be created as a `UNIQUE` index?",
    shortAnswer: "Yes! A `UNIQUE` multi-valued index guarantees that **no two rows in the table share any identical array element**, and that no single row contains duplicate elements within its own array.",
    explanation: "Enforces global uniqueness across all array elements in the table.",
    hint: "Yes, ensures no two rows share the same array element.",
    level: "expert"
  },
  {
    question: "Can a Multi-Valued Index be defined as a Primary Key?",
    shortAnswer: "No! A Multi-Valued Index **cannot be a Primary Key or a Foreign Key**.",
    explanation: "Primary keys require a strict 1:1 row identification mapping.",
    hint: "No, multi-valued indexes cannot serve as primary keys or foreign keys.",
    level: "basic"
  },
  {
    question: "Can you create a Composite (Multi-Column) Index that includes a Multi-Valued Index?",
    shortAnswer: "Yes! You can combine a standard scalar column with a multi-valued array in a single composite index: `INDEX idx_dept_skills (department_id, (CAST(profile->'$.skills' AS CHAR(30) ARRAY)))`.",
    explanation: "Permits compound filtering across relational columns and JSON arrays.",
    hint: "Yes, standard relational columns can be combined with JSON array casts.",
    level: "expert",
    codeExample: "CREATE TABLE employees (\n  emp_id INT PRIMARY KEY,\n  dept_id INT NOT NULL,\n  profile JSON NOT NULL,\n  INDEX idx_dept_skills (dept_id, (CAST(profile->'$.skills' AS CHAR(30) ARRAY)))\n);"
  },
  {
    question: "How many Multi-Valued array components can exist within a single composite index?",
    shortAnswer: "Only **one** multi-valued array cast can be included in any composite index definition.",
    explanation: "Multiple array Cartesian products in a single index are disallowed.",
    hint: "Maximum of one multi-valued array component per composite index.",
    level: "expert"
  },
  {
    question: "What happens if a JSON row contains an empty array `[]` or `null` for the indexed path?",
    shortAnswer: "The row is **not included in the multi-valued index** (or indexed with a single NULL entry), consuming minimal index space.",
    explanation: "Graceful handling of empty or missing JSON arrays.",
    hint: "Empty arrays produce no index entries; null produces a single null entry.",
    level: "basic"
  },
  {
    question: "How do you verify with `EXPLAIN` that a query is using a Multi-Valued Index?",
    shortAnswer: "Look for **`type: range`** and the name of the multi-valued index in the **`key`** column of the `EXPLAIN` query output.",
    explanation: "Multi-valued lookups execute as range scans over B+ tree key entries.",
    hint: "EXPLAIN shows type: range and the index name in key.",
    level: "basic",
    codeExample: "EXPLAIN SELECT * FROM candidate_profiles \nWHERE 'React' MEMBER OF (profile->'$.skills');"
  },
  {
    question: "What happens if an array element in a JSON document exceeds the defined length in `CAST(... AS CHAR(30) ARRAY)`?",
    shortAnswer: "The insert or update fails with a **data truncation error** (e.g. string exceeds 30 characters), enforcing length integrity.",
    explanation: "Cast type definitions strictly enforce maximum element boundaries.",
    hint: "Throws a data truncation error if an element exceeds the defined character length.",
    level: "expert"
  },
  {
    question: "How does `JSON_CONTAINS()` utilize a Multi-Valued Index when searching for multiple array elements?",
    shortAnswer: "It performs multiple B+ tree seeks on each required element and computes an internal index intersection to identify rows containing **all** specified elements.",
    explanation: "High-efficiency index intersection on array subsets.",
    hint: "Performs index intersection across the required elements in the B+ tree.",
    level: "expert"
  },
  {
    question: "Can you create a Multi-Valued Index on an array of nested JSON objects (e.g. `items: [{\"id\": 1}, {\"id\": 2}]`)?",
    shortAnswer: "Yes, by casting the extracted scalar path from the array: `(CAST(doc->'$.items[*].id' AS UNSIGNED ARRAY))`.",
    explanation: "The wildcard $[*] extracts the scalar sub-key across all array objects.",
    hint: "Use $[*].sub_key wildcard path syntax in the CAST ARRAY definition.",
    level: "expert",
    codeExample: "CREATE TABLE orders (\n  order_id INT PRIMARY KEY,\n  order_doc JSON NOT NULL,\n  INDEX idx_product_ids ((CAST(order_doc->'$.items[*].product_id' AS UNSIGNED ARRAY)))\n);"
  },
  {
    question: "What is the performance advantage of a Multi-Valued Index over a normalized `many-to-many` junction table?",
    shortAnswer: "It eliminates the need for **multi-table JOIN operations and junction table maintenance**, allowing fast array filtering directly on the parent document in a single table seek.",
    explanation: "Combines document modeling simplicity with index seek speeds.",
    hint: "Eliminates junction tables and expensive multi-table JOINs.",
    level: "basic"
  },
  {
    question: "What happens if a JSON document contains duplicate values inside its own array (e.g. `[\"React\", \"React\"]`) on a non-unique Multi-Valued Index?",
    shortAnswer: "MySQL indexes **only one unique entry per row** in the multi-valued index, avoiding redundant duplicate index records.",
    explanation: "Internal deduplication per row in index leaf pages.",
    hint: "Deduplicates entries per row; only one index record is created for duplicate items.",
    level: "expert"
  },
  {
    question: "How do you drop a Multi-Valued Index in MySQL?",
    shortAnswer: "`ALTER TABLE table_name DROP INDEX index_name;`",
    explanation: "Standard index removal syntax.",
    hint: "ALTER TABLE tbl DROP INDEX idx_name;",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 11 in Module 004_002?",
    shortAnswer: "Multi-Valued Indexes in MySQL 8.0+ solve the historical limitation of indexing JSON arrays: by enabling 1-to-many index mapping, they deliver instant B+ tree range lookups for `MEMBER OF()`, `JSON_CONTAINS()`, and `JSON_OVERLAPS()`, eliminating the need for complex many-to-many junction tables.",
    explanation: "Revolutionary feature that gives MySQL native document database array indexing capabilities.",
    hint: "Multi-Valued Indexes enable 1-to-many B+ tree indexing on JSON arrays for fast set operations.",
    level: "basic"
  }
];

export default questions;
