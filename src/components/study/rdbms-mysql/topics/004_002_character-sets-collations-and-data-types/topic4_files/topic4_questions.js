// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is the primary difference between `CHAR(M)` and `VARCHAR(M)` in MySQL?",
    shortAnswer: "- `CHAR(M)`: **Fixed-length** ($0 \\le M \\le 255$); always allocates space for $M$ characters regardless of string length, right-padding with spaces.\n- `VARCHAR(M)`: **Variable-length** ($0 \\le M \\le 65,535$ bytes); stores only the actual characters plus a 1-byte or 2-byte length prefix.",
    explanation: "CHAR is ideal for static-length codes; VARCHAR saves disk space for variable-length text.",
    hint: "CHAR is fixed-length with padding; VARCHAR is variable-length with a length prefix.",
    level: "basic"
  },
  {
    question: "How does MySQL store the length of a `VARCHAR(M)` column on disk?",
    shortAnswer: "- If maximum column bytes $\\le 255$: Uses a **1-byte length prefix**.\n- If maximum column bytes $> 255$: Uses a **2-byte length prefix**.",
    explanation: "The length prefix records the byte count of the string payload.",
    hint: "1-byte prefix for <= 255 bytes; 2-byte prefix for > 255 bytes.",
    level: "expert"
  },
  {
    question: "What is the theoretical maximum character length of a single `VARCHAR` column in a `utf8mb4` table?",
    shortAnswer: "Approximately **16,383 Characters** (because the maximum InnoDB row size limit is 65,535 bytes, and $65,532 / 4\\text{ bytes per char} = 16,383\\text{ characters}$, subtracting 2 bytes for length prefix and 1 byte for NULL mask).",
    explanation: "If you exceed this, MySQL throws Error 1118: Row size too large.",
    hint: "16,383 characters in utf8mb4 (65,535 bytes / 4 bytes per char).",
    level: "expert"
  },
  {
    question: "What happens to trailing spaces when retrieving data from a `CHAR(M)` column vs `VARCHAR(M)`?",
    shortAnswer: "- `CHAR(M)`: Trailing spaces are **automatically stripped upon retrieval**.\n- `VARCHAR(M)`: Trailing spaces are **fully preserved and returned intact**.",
    explanation: "Important consideration when storing formatted strings where trailing spaces have meaning.",
    hint: "CHAR strips trailing spaces on read; VARCHAR preserves trailing spaces.",
    level: "basic"
  },
  {
    question: "What are the four tiers of `TEXT` data types in MySQL and their maximum storage capacities?",
    shortAnswer: "1) `TINYTEXT`: Up to **255 Bytes** (1-byte length prefix),\n2) `TEXT`: Up to **64 KB** (65,535 Bytes, 2-byte prefix),\n3) `MEDIUMTEXT`: Up to **16 MB** (16,777,215 Bytes, 3-byte prefix),\n4) `LONGTEXT`: Up to **4 GB** (4,294,967,295 Bytes, 4-byte prefix).",
    explanation: "All TEXT types support character sets and collations.",
    hint: "TINYTEXT (255B), TEXT (64KB), MEDIUMTEXT (16MB), LONGTEXT (4GB).",
    level: "basic"
  },
  {
    question: "What is the fundamental difference between `TEXT` and `BLOB` data types?",
    shortAnswer: "- `TEXT`: Stores **character strings**; has a defined Character Set and Collation; comparisons are case-insensitive if using `_ci` collations.\n- `BLOB` (Binary Large Object): Stores **raw binary bytes** (images, PDFs, encrypted payloads); has NO character set; comparisons are strictly case-sensitive byte values.",
    explanation: "Use TEXT for human text (articles, HTML); use BLOB for binary media (files, PDFs).",
    hint: "TEXT has character set/collation; BLOB stores raw binary bytes without character set.",
    level: "basic"
  },
  {
    question: "Why does creating an index on a `TEXT` or `BLOB` column require an explicit prefix length?",
    shortAnswer: "Because `TEXT` and `BLOB` columns can be megabytes or gigabytes in size, which exceeds the maximum index key limit (3072 bytes); you must specify a prefix length (e.g. `INDEX (content(100))`) to index only the first $N$ characters/bytes.",
    explanation: "Restricts index entry size to manageable B+ tree limits.",
    hint: "Must specify a prefix length (e.g. content(100)) because full column size exceeds index limits.",
    level: "expert",
    codeExample: "CREATE TABLE blog_posts (\n  post_id INT PRIMARY KEY AUTO_INCREMENT,\n  content TEXT NOT NULL,\n  INDEX idx_content_prefix (content(100))\n);"
  },
  {
    question: "How does InnoDB handle large `TEXT` and `BLOB` columns under `ROW_FORMAT=DYNAMIC`?",
    shortAnswer: "It offloads the entire large string payload to external **16KB Overflow Pages** outside the clustered B+ tree, storing only a compact **20-byte pointer** inside the leaf page.",
    explanation: "Prevents wide text columns from polluting B+ tree leaf pages and degrading scan speeds.",
    hint: "Offloads the data to external overflow pages, keeping a 20-byte pointer in the B+ tree page.",
    level: "expert"
  },
  {
    question: "What is the performance penalty of including `TEXT` or `BLOB` columns in `SELECT *` queries?",
    shortAnswer: "1) Forces extra random disk reads to fetch external overflow pages;\n2) Prevents MySQL from using in-memory `MEMORY` temporary tables for sorting, forcing slow disk-based temporary tables.",
    explanation: "Golden rule of database optimization: never SELECT * when tables contain wide TEXT columns.",
    hint: "Causes extra overflow disk I/O and forces queries to use on-disk temporary tables for sorting.",
    level: "expert"
  },
  {
    question: "What happens when an application attempts to insert a 300-character string into a `VARCHAR(255)` column under strict SQL mode (`STRICT_TRANS_TABLES`)?",
    shortAnswer: "The transaction fails and aborts with **MySQL Error 1406 (22001): Data too long for column '...' at row 1**.",
    explanation: "Strict SQL mode enforces data integrity and prevents silent data truncation.",
    hint: "Throws Error 1406: Data too long for column (aborts transaction).",
    level: "basic"
  },
  {
    question: "When is `CHAR` definitively preferred over `VARCHAR`?",
    shortAnswer: "When storing **fixed-length strings** of predictable size, such as ISO Country Codes (`CHAR(2)`), Indian State Codes (`CHAR(2)`), Pincodes (`CHAR(6)`), MD5 hashes (`CHAR(32)`), or UUID strings (`CHAR(36)`).",
    explanation: "Eliminates length prefix overhead and prevents in-page row fragmentation during updates.",
    hint: "For fixed-length data like country codes, MD5 hashes, and UUIDs.",
    level: "basic"
  },
  {
    question: "What is the row size limit in MySQL across all columns in a table?",
    shortAnswer: "**65,535 Bytes** per row (excluding data stored off-page in overflow pages like `TEXT` and `BLOB`).",
    explanation: "MySQL table design architectural boundary.",
    hint: "65,535 bytes total row size limit.",
    level: "expert"
  },
  {
    question: "Can a `TEXT` or `BLOB` column have a `DEFAULT` value in modern MySQL 8.0?",
    shortAnswer: "Yes! Starting in MySQL 8.0.13, `DEFAULT` values for `TEXT` and `BLOB` columns are fully supported (provided literal values are enclosed in parentheses: `DEFAULT ('No comments')`).",
    explanation: "A major modernization over older MySQL 5.7 limitations.",
    hint: "Yes, fully supported in MySQL 8.0.13+ when wrapped in parentheses.",
    level: "basic",
    codeExample: "CREATE TABLE feedback (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  user_comment TEXT DEFAULT ('No feedback provided')\n);"
  },
  {
    question: "What are the four tiers of `BLOB` data types in MySQL?",
    shortAnswer: "1) `TINYBLOB` (255 B),\n2) `BLOB` (64 KB),\n3) `MEDIUMBLOB` (16 MB),\n4) `LONGBLOB` (4 GB).",
    explanation: "Binary counterparts to the four TEXT tiers.",
    hint: "TINYBLOB (255B), BLOB (64KB), MEDIUMBLOB (16MB), LONGBLOB (4GB).",
    level: "basic"
  },
  {
    question: "How do you calculate the exact physical disk storage required for `VARCHAR(100)` storing the 7-character string `'Kolkata'` in `utf8mb4`?",
    shortAnswer: "**8 Bytes total**:\n- 7 Bytes for ASCII characters `'Kolkata'` (1 byte per char)\n- 1 Byte for the length prefix ($100 \\times 4 = 400\\text{ bytes max} > 255$, so 2 bytes prefix if max exceeds 255; since $100 \\times 4 = 400 > 255$, it uses 2 bytes prefix &rarr; total 9 bytes).",
    explanation: "Demonstrates how length prefix is determined by column definition.",
    hint: "Payload bytes + 2-byte length prefix (since 100 * 4 = 400 > 255).",
    level: "expert"
  },
  {
    question: "What is the difference between `VARCHAR(255)` in `latin1` vs `utf8mb4` regarding length prefix storage?",
    shortAnswer: "- `VARCHAR(255) latin1`: Max bytes $= 255 \\times 1 = 255$ &rarr; Uses **1-byte length prefix**.\n- `VARCHAR(255) utf8mb4`: Max bytes $= 255 \\times 4 = 1020$ &rarr; Uses **2-byte length prefix**.",
    explanation: "Because the max potential byte length exceeds 255 bytes in utf8mb4.",
    hint: "latin1 uses a 1-byte prefix; utf8mb4 uses a 2-byte prefix because max bytes > 255.",
    level: "expert"
  },
  {
    question: "Why should image files (JPEG, PNG) generally NOT be stored in `LONGBLOB` columns in production databases?",
    shortAnswer: "Because storing large binary files bloats the database tablespace, consumes Buffer Pool cache, causes massive backup files, and degrades I/O throughput; industry standard is to store images in **Object Storage (AWS S3, Cloud Storage)** and store only the URL in `VARCHAR`.",
    explanation: "Database best practice for high-scale media applications.",
    hint: "Bloats tablespaces and Buffer Pool; store files in Object Storage (S3) and URLs in VARCHAR.",
    level: "basic"
  },
  {
    question: "What is the maximum character length for `TINYTEXT`?",
    shortAnswer: "**255 Characters in single-byte charsets** (or 63 characters in `utf8mb4` since $255 / 4 = 63.75$).",
    explanation: "TINYTEXT has an absolute 255-byte capacity.",
    hint: "255 bytes max capacity (63 characters in utf8mb4).",
    level: "basic"
  },
  {
    question: "How do you check if a table is currently experiencing row size overflow warnings?",
    shortAnswer: "Execute `SHOW WARNINGS;` after `CREATE TABLE` or check `information_schema.innodb_tablespaces`.",
    explanation: "Warns if row length approaches or exceeds 65,535 bytes.",
    hint: "SHOW WARNINGS; after CREATE TABLE.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 4 in Module 004_002?",
    shortAnswer: "Selecting the right string type balances storage density and query performance: use `CHAR` for fixed-length codes, `VARCHAR` sized realistically for variable text, `TEXT` with prefix indexes for large articles, `BLOB` for raw binaries, and avoid storing large media files inside the database.",
    explanation: "Foundational mastery of string data types prevents row size bloat and maximizes caching efficiency.",
    hint: "CHAR for fixed-length codes, realistic VARCHAR for text, and object storage for large media.",
    level: "basic"
  }
];

export default questions;
