// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is the native `JSON` data type in MySQL?",
    shortAnswer: "A specialized data type that stores JSON documents in an **optimized internal binary format**, providing automatic syntax validation, fast key lookup by byte offset, and partial in-place updates.",
    explanation: "Introduced in MySQL 5.7 and fully optimized in MySQL 8.0.",
    hint: "Optimized binary format providing automatic validation and fast key lookups.",
    level: "basic"
  },
  {
    question: "What are the four major advantages of the native `JSON` data type over storing JSON strings in `TEXT` or `VARCHAR`?",
    shortAnswer: "1) **Automatic Syntax Validation** (rejects malformed JSON with Error 3140);\n2) **Optimized Binary Format** (fast $O(\\log K)$ key search by offset);\n3) **Partial In-Place Updates** (modifies bytes without rewriting the whole document);\n4) **Direct Indexing Support** (via generated columns and multi-valued indexes).",
    explanation: "Eliminates application-level validation and full-text parsing overhead.",
    hint: "Validation, fast binary lookup, partial in-place updates, and indexing support.",
    level: "basic"
  },
  {
    question: "What happens when an application attempts to insert malformed JSON into a `JSON` column?",
    shortAnswer: "MySQL immediately rejects the insert and raises **Error 3140 (22032): Invalid JSON text in argument 1 to function cast_as_json: 'Invalid value.'**.",
    explanation: "Guarantees that corrupt or invalid JSON can never enter the database.",
    hint: "Throws Error 3140: Invalid JSON text (aborts transaction).",
    level: "basic",
    codeExample: "-- Throws Error 3140:\nINSERT INTO student_profiles (meta_data) VALUES ('{ name: Mamata, age: 22 }'); -- Missing quotes!"
  },
  {
    question: "How does MySQL physically structure a `JSON` document in its internal binary format?",
    shortAnswer: "It stores the document as a **header with element counts, a sorted dictionary of key strings, and an array of numerical byte offsets** pointing directly to values.",
    explanation: "Enables random access to any nested key without reading preceding elements.",
    hint: "Stores sorted key dictionary and byte offset pointers for direct random access.",
    level: "expert"
  },
  {
    question: "What is the time complexity of looking up a specific key inside a native `JSON` column vs a `LONGTEXT` column?",
    shortAnswer: "- `JSON` column: **$O(\\log K)$** where $K$ is the number of keys (via binary search across sorted key offsets);\n- `LONGTEXT` column: **$O(N)$** where $N$ is the total character length of the entire document (must parse the whole string).",
    explanation: "Delivers orders-of-magnitude faster query execution on large documents.",
    hint: "O(log K) binary search in native JSON vs O(N) full document string parsing in TEXT.",
    level: "expert"
  },
  {
    question: "What is a 'Partial In-Place Update' for JSON columns in MySQL 8.0?",
    shortAnswer: "When updating a single key in a large JSON document using `JSON_SET`, `JSON_REPLACE`, or `JSON_REMOVE` without increasing its length, MySQL modifies **only the specific bytes in the InnoDB page**, without rewriting the entire document or updating secondary indexes.",
    explanation: "Massively reduces redo log generation and disk I/O.",
    hint: "Updates only the changed bytes in-place in InnoDB without rewriting the full document.",
    level: "expert"
  },
  {
    question: "How does MySQL handle insignificant whitespace and formatting when storing a JSON document?",
    shortAnswer: "It **automatically normalizes the document by removing all extra spaces, tabs, and newlines**, storing only the essential tokens to minimize storage consumption.",
    explanation: "Standardizes document formatting and saves disk space.",
    hint: "Normalizes the document by stripping all non-essential whitespace.",
    level: "basic"
  },
  {
    question: "What happens if an inserted JSON document contains duplicate keys (e.g. `{\"city\": \"Barrackpore\", \"city\": \"Kolkata\"}`)?",
    shortAnswer: "MySQL normalizes the document by retaining **only the last specified key-value pair** (`{\"city\": \"Kolkata\"}`), discarding earlier duplicates.",
    explanation: "Standardized duplicate key normalization in MySQL 8.0.3+.",
    hint: "Retains only the last specified key value and discards earlier duplicates.",
    level: "expert"
  },
  {
    question: "What is the maximum storage size of a single `JSON` column value in MySQL?",
    shortAnswer: "Up to **1 GB** (limited by the `max_allowed_packet` server configuration parameter).",
    explanation: "Accommodates massive semi-structured document payloads.",
    hint: "Up to 1 GB (governed by max_allowed_packet).",
    level: "basic"
  },
  {
    question: "What does the `JSON_VALID()` function do in MySQL?",
    shortAnswer: "It tests whether a string is a valid JSON document, returning `1` if valid and `0` if invalid: `SELECT JSON_VALID('{\"name\": \"Susmita\"}');` (Returns 1).",
    explanation: "Useful for validating strings before inserting into JSON columns.",
    hint: "Returns 1 if string is valid JSON, 0 if invalid.",
    level: "basic",
    codeExample: "SELECT JSON_VALID('{\"status\": \"active\"}') AS is_valid;"
  },
  {
    question: "Can a `JSON` column have a `DEFAULT` value in MySQL 8.0?",
    shortAnswer: "Yes! Starting in MySQL 8.0.13, `JSON` columns can have default values when enclosed in parentheses as an expression: `DEFAULT (JSON_OBJECT())` or `DEFAULT ('{}')`.",
    explanation: "Modern default value syntax for LOB and JSON columns.",
    hint: "Yes, supported in MySQL 8.0.13+ when wrapped in parentheses (e.g. DEFAULT ('{}')).",
    level: "basic",
    codeExample: "CREATE TABLE user_settings (\n  user_id INT PRIMARY KEY,\n  preferences JSON NOT NULL DEFAULT (JSON_OBJECT('theme', 'dark', 'notifications', true))\n);"
  },
  {
    question: "Can you create an index directly on a `JSON` column (e.g. `CREATE INDEX idx_json ON tbl (json_col)`)?",
    shortAnswer: "No! A `JSON` column **cannot be indexed directly in its entirety**; you must index specific JSON fields by creating a **Generated Column** or using a **Multi-Valued Index**.",
    explanation: "Architectural constraint: indexes must be built on scalar extract values.",
    hint: "No direct index; must index extracted keys via Generated Columns or Multi-Valued Indexes.",
    level: "expert"
  },
  {
    question: "What is the storage format of JSON numbers inside MySQL's binary JSON implementation?",
    shortAnswer: "Integers and exact decimals are stored in native fixed binary or packed decimal formats, while floats are stored in IEEE 754 binary representation, preserving exact precision.",
    explanation: "Ensures type fidelity without loss of precision.",
    hint: "Stores numbers in native binary/packed formats preserving numerical type fidelity.",
    level: "expert"
  },
  {
    question: "How do you inspect the storage size in bytes of a JSON document stored in a column?",
    shortAnswer: "`JSON_STORAGE_SIZE(json_col)`: Returns the number of bytes used to store the binary representation of the JSON document.",
    explanation: "Diagnostic function for capacity monitoring.",
    hint: "JSON_STORAGE_SIZE(column_name).",
    level: "basic",
    codeExample: "SELECT student_name, JSON_STORAGE_SIZE(academic_history) AS json_bytes \nFROM student_profiles;"
  },
  {
    question: "What is `JSON_STORAGE_FREE()` in MySQL 8.0?",
    shortAnswer: "It returns the number of freed bytes available for partial in-place updates within a JSON column's binary storage after elements have been modified.",
    explanation: "Measures reclaimable binary page space.",
    hint: "Returns freed bytes available for in-place JSON modifications.",
    level: "expert"
  },
  {
    question: "Why does MySQL sort keys alphabetically inside a binary JSON document?",
    shortAnswer: "To enable **$O(\\log K)$ Binary Search** across keys without scanning linearly from left to right, allowing instant lookup of any key regardless of document size.",
    explanation: "Core performance mechanism of MySQL's binary JSON engine.",
    hint: "Enables binary search lookup across keys by byte offset.",
    level: "expert"
  },
  {
    question: "How does native JSON compare to NoSQL document databases like MongoDB when used in MySQL?",
    shortAnswer: "MySQL combines the **flexibility of schema-less JSON documents with ACID transaction safety, relational joins, foreign keys, and relational indexes**, creating a powerful hybrid data platform.",
    explanation: "Provides the best of relational and document database paradigms.",
    hint: "Provides schema flexibility combined with ACID transactions and relational joins.",
    level: "basic"
  },
  {
    question: "What is the `JSON_TYPE()` function used for?",
    shortAnswer: "It returns a string describing the JSON data type of an expression (e.g. `'OBJECT'`, `'ARRAY'`, `'INTEGER'`, `'STRING'`, `'BOOLEAN'`, `'NULL'`).",
    explanation: "Allows dynamic runtime data type inspection of JSON nodes.",
    hint: "Returns the JSON data type string (OBJECT, ARRAY, INTEGER, etc.).",
    level: "basic",
    codeExample: "SELECT JSON_TYPE(JSON_EXTRACT(profile, '$.age')) AS age_type \nFROM user_profiles;"
  },
  {
    question: "What happens when you compare two JSON documents for equality (`json_col1 = json_col2`)?",
    shortAnswer: "MySQL performs a **structural equality comparison** based on normalized keys and values, meaning two documents with identical keys in different order evaluate as **equal (`TRUE`)**.",
    explanation: "Normalized comparison ignores initial key ordering differences.",
    hint: "Compares normalized structure and values; key order differences evaluate as equal.",
    level: "expert"
  },
  {
    question: "What is the primary architectural takeaway of Topic 7 in Module 004_002?",
    shortAnswer: "The native `JSON` data type transforms MySQL into a robust hybrid relational-document engine: it guarantees automatic syntax validation (Error 3140), achieves $O(\\log K)$ key lookups via sorted binary offsets, supports partial in-place page updates, and provides ACID transactional safety over semi-structured schemas.",
    explanation: "Foundational mastery of native JSON enables high-performance modern application architectures.",
    hint: "Native JSON delivers validation, O(log K) binary offset lookups, in-place updates, and ACID safety.",
    level: "basic"
  }
];

export default questions;
