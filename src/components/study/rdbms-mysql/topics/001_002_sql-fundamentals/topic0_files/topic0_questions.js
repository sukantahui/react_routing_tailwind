// topic0_files/topic0_questions.js

const questions = [
  {
    question: "Why should you use DECIMAL instead of FLOAT or DOUBLE for financial amounts in MySQL?",
    shortAnswer: "DECIMAL stores exact fixed-point numerical values, preventing binary floating-point rounding errors.",
    explanation: "FLOAT and DOUBLE adhere to IEEE 754 floating-point specifications which store numbers as binary approximations. This causes precision discrepancies (e.g. 0.1 + 0.2 becoming 0.30000000000000004). DECIMAL stores exact decimal digits in binary chunks, ensuring exact calculations for monetary values (₹), bank balances, and taxes.",
    hint: "Think about why a bank balance cannot tolerate even 1 paisa discrepancy.",
    level: "basic",
    codeExample: "price DECIMAL(10, 2) NOT NULL -- Stores up to ₹99,999,999.99 exactly"
  },
  {
    question: "What is the difference between CHAR(30) and VARCHAR(30) in terms of physical disk storage?",
    shortAnswer: "CHAR(30) always occupies 30 characters worth of space regardless of content, while VARCHAR(30) consumes only the actual characters plus a 1-byte length prefix.",
    explanation: "CHAR is a fixed-length string data type. If you store 'Kolkata' (7 characters) in CHAR(30), MySQL pads it with 23 spaces on disk. In VARCHAR(30), 'Kolkata' occupies only 7 bytes plus 1 byte for length tracking (8 bytes total).",
    hint: "Fixed-size box vs expandable envelope.",
    level: "basic",
    codeExample: "-- CHAR(30): 30 bytes | VARCHAR(30): 8 bytes for 'Kolkata'"
  },
  {
    question: "When is CHAR preferred over VARCHAR in production database schemas?",
    shortAnswer: "When column values have a constant, deterministic length, such as MD5/SHA hashes, ISO country codes, Indian PIN codes, or UUIDs.",
    explanation: "Fixed-length columns eliminate the length-prefix byte overhead, reduce data page fragmentation in InnoDB, and improve sequential read throughput because row offset computations are predictable.",
    hint: "Consider data that is always guaranteed to have the exact same character count.",
    level: "moderate",
    codeExample: "pincode CHAR(6) NOT NULL,\nstate_code CHAR(2) NOT NULL,\npassword_hash CHAR(64) NOT NULL"
  },
  {
    question: "What is the key difference between DATETIME and TIMESTAMP regarding time zones?",
    shortAnswer: "TIMESTAMP converts stored values from the current session time zone to UTC on storage and back to session time zone on retrieval; DATETIME stores the literal date/time unchanged.",
    explanation: "TIMESTAMP is timezone-aware and stored internally as 4 bytes (seconds since Unix Epoch 1970). When Mamata in Kolkata (IST +5:30) inserts a TIMESTAMP, and Susmita queries it from London (GMT +0:00), MySQL adjusts the retrieved string to Susmita's local time. DATETIME stores the literal year, month, day, hour, minute, second without any timezone offset conversion.",
    hint: "Think about global distributed applications vs local calendar entries.",
    level: "moderate",
    codeExample: "SET time_zone = '+00:00'; -- UTC\nSELECT created_at FROM orders;"
  },
  {
    question: "What is the Year 2038 problem in MySQL TIMESTAMP columns?",
    shortAnswer: "TIMESTAMP is stored as a 32-bit signed integer counting seconds from 1970-01-01, which overflows on 19 January 2038 at 03:14:07 UTC.",
    explanation: "Because TIMESTAMP uses a signed 32-bit integer, its maximum value is 2,147,483,647 seconds (03:14:07 UTC on 19 January 2038). Any timestamp beyond this date will overflow and fail. For dates extending beyond 2038 (such as loan maturity, future contracts, or birthdates), DATETIME (which supports up to year 9999) must be used.",
    hint: "32-bit integer overflow limit.",
    level: "moderate",
    codeExample: "contract_expiry DATETIME NOT NULL -- Safe beyond 2038"
  },
  {
    question: "How does MySQL implement the BOOLEAN data type internally?",
    shortAnswer: "MySQL treats BOOLEAN / BOOL as a synonym for TINYINT(1), where 0 is FALSE and non-zero (typically 1) is TRUE.",
    explanation: "There is no separate physical bit-level Boolean type in MySQL; BOOLEAN is syntactic sugar for TINYINT(1). It occupies 1 byte of storage per row. In conditional expressions, 0 evaluates to FALSE and any non-zero integer evaluates to TRUE.",
    hint: "Check what SHOW CREATE TABLE shows for a column defined as BOOLEAN.",
    level: "basic",
    codeExample: "is_active BOOLEAN DEFAULT TRUE -- Stored as TINYINT(1) DEFAULT 1"
  },
  {
    question: "What does the UNSIGNED attribute do when applied to integer data types?",
    shortAnswer: "It prevents negative numbers and doubles the upper bound of positive numbers that can be stored.",
    explanation: "A standard INT is signed (-2,147,483,648 to 2,147,483,647). When declared as INT UNSIGNED, negative values are disallowed and the range shifts to 0 through 4,294,967,295. This is recommended for primary key auto-increment IDs, student roll numbers, and physical quantities.",
    hint: "Shifting the sign bit to represent larger positive magnitudes.",
    level: "basic",
    codeExample: "student_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY"
  },
  {
    question: "Why should you store phone numbers as VARCHAR or CHAR instead of INT or BIGINT?",
    shortAnswer: "Integer types strip leading zeros, cannot store country codes with '+' or formatting, and exceed INT capacity.",
    explanation: "Phone numbers are categorical identification strings, not arithmetic quantities. Storing an Indian mobile number '09830012345' in an INT column strips the leading '0' resulting in 9830012345. Furthermore, numbers with country codes like '+91-9830012345' contain non-numeric characters.",
    hint: "Will you ever add, subtract, or multiply phone numbers?",
    level: "basic",
    codeExample: "phone_no VARCHAR(15) NOT NULL"
  },
  {
    question: "What is the difference between DECIMAL(8, 2) and DECIMAL(10, 4)?",
    shortAnswer: "DECIMAL(8, 2) has 8 total digits with 2 after the decimal (up to 999999.99); DECIMAL(10, 4) has 10 total digits with 4 after the decimal (up to 999999.9999).",
    explanation: "In DECIMAL(M, D), M is the precision (total number of significant digits, 1 to 65) and D is the scale (digits after decimal point, 0 to 30). The integer part can hold at most (M - D) digits.",
    hint: "Precision M minus scale D equals maximum integer digits.",
    level: "basic",
    codeExample: "salary DECIMAL(8, 2) -- Maximum ₹999,999.99"
  },
  {
    question: "How does MySQL store ENUM columns internally, and what is the storage benefit?",
    shortAnswer: "MySQL stores ENUM values as internal 1-byte or 2-byte integers mapped to the corresponding string index in metadata.",
    explanation: "For an ENUM with up to 255 member strings, MySQL stores each value as a 1-byte integer (1 for first string, 2 for second, etc.). For 256 to 65,535 strings, it uses 2 bytes. This provides compact storage and fast index lookups compared to repeated VARCHAR strings.",
    hint: "Look up how string literals are converted to index numbers.",
    level: "moderate",
    codeExample: "status ENUM('pending', 'paid', 'shipped', 'cancelled') -- Occupies 1 byte per row"
  },
  {
    question: "What is a major limitation of using ENUM for frequently changing categories?",
    shortAnswer: "Adding, modifying, or reordering ENUM values requires an ALTER TABLE DDL operation, which can lock large tables in production.",
    explanation: "Because the list of allowed strings is stored in the table metadata, adding a new status requires modifying table schema. In high-traffic systems, it is usually better to use a lookup table (e.g. `order_statuses`) with a Foreign Key.",
    hint: "What happens when the business wants to add a new category every week?",
    level: "moderate",
    codeExample: "-- Avoid frequent ALTER TABLE status ENUM(...) on 10M rows"
  },
  {
    question: "What is the difference between VARCHAR(255) and TEXT in MySQL InnoDB?",
    shortAnswer: "VARCHAR is stored inline up to page limits with default values allowed; TEXT stores data off-page (LOB pages) if large and cannot have literal default values in older engines.",
    explanation: "VARCHAR columns are stored directly inside the InnoDB 16KB data page along with other row columns, allowing fast reads and inline indexing. TEXT data types are treated as Large Objects (BLOB/TEXT) where InnoDB stores a 20-byte pointer in the clustered index record pointing to separate overflow pages.",
    hint: "Inline row storage vs overflow page pointers.",
    level: "expert",
    codeExample: "short_desc VARCHAR(255), -- Stored inline\nfull_article TEXT -- Stored off-page when large"
  },
  {
    question: "Why can over-allocating VARCHAR lengths (e.g. VARCHAR(2000) for a 50-character field) degrade query performance?",
    shortAnswer: "MySQL allocates memory for in-memory temporary tables during sorting (ORDER BY) and joins based on the declared maximum column length, consuming excessive RAM.",
    explanation: "When MySQL executes queries involving GROUP BY, DISTINCT, or ORDER BY, it may create internal temporary tables in RAM using the MEMORY or TempTable storage engines. Older engines allocate the full declared maximum length (e.g. 2000 bytes x utf8mb4 4 bytes = 8000 bytes per row), quickly exceeding `tmp_table_size` and forcing disk-based temporary tables.",
    hint: "Consider how internal query buffers allocate memory per row.",
    level: "expert",
    codeExample: "city VARCHAR(50) -- Better than VARCHAR(500) for internal temp table RAM efficiency"
  },
  {
    question: "What is the storage size and character capacity of the utf8mb4 character set in MySQL 8.0?",
    shortAnswer: "utf8mb4 allocates up to 4 bytes per character, supporting all Unicode characters including mathematical symbols and emojis.",
    explanation: "In utf8mb4, characters take between 1 and 4 bytes: standard ASCII characters (A-Z, 0-9) take 1 byte, European characters take 2 bytes, Asian characters (Bengali, Hindi, Chinese) take 3 bytes, and supplementary characters (emojis 🚀, rare scripts) take 4 bytes.",
    hint: "Why is standard utf8 (utf8mb3) deprecated in modern MySQL?",
    level: "moderate",
    codeExample: "CREATE TABLE comments (\n    comment_text VARCHAR(500) CHARACTER SET utf8mb4\n);"
  },
  {
    question: "What is the maximum length of a single row in MySQL InnoDB tables?",
    shortAnswer: "The maximum row size limit in MySQL is 65,535 bytes (excluding BLOB/TEXT columns which store overflow pointers).",
    explanation: "Regardless of storage engine, MySQL imposes a hard limit of 65,535 bytes per row. If the sum of all VARCHAR, CHAR, and numeric column lengths exceeds 65,535 bytes, CREATE TABLE fails with 'Row size too large'. InnoDB also limits inline row data to roughly half a 16KB page (~8,126 bytes).",
    hint: "Sum of all column maximum byte lengths.",
    level: "expert",
    codeExample: "-- CREATE TABLE t (c1 VARCHAR(30000), c2 VARCHAR(30000)) CHARACTER SET latin1;\n-- Exceeds 65,535 byte row limit if utf8mb4 is used"
  },
  {
    question: "What is the difference between TINYINT, SMALLINT, MEDIUMINT, INT, and BIGINT?",
    shortAnswer: "They occupy 1, 2, 3, 4, and 8 bytes of storage respectively, supporting progressively larger integer ranges.",
    explanation: "TINYINT (1 Byte, 0-255 unsigned) is great for age/status; SMALLINT (2 Bytes, 0-65535) for year or stock quantity; MEDIUMINT (3 Bytes, 0-16.7M) for zip codes or medium collections; INT (4 Bytes, 0-4.29B) for general IDs; BIGINT (8 Bytes, 0-18.44 quintillion) for global transaction logs.",
    hint: "1, 2, 3, 4, 8 byte progression.",
    level: "basic",
    codeExample: "user_age TINYINT UNSIGNED,\nviews_count BIGINT UNSIGNED"
  },
  {
    question: "What does the integer display width `INT(11)` or `TINYINT(4)` signify in MySQL versions prior to 8.0.19?",
    shortAnswer: "Display width specifies the number of characters displayed when paired with ZEROFILL; it does NOT restrict the range of values that can be stored.",
    explanation: "A common beginner misconception is that INT(4) only stores numbers up to 9999. In reality, INT(4) stores the full 4-byte integer range (-2.14B to 2.14B). The '4' only dictates padding width when ZEROFILL is enabled. MySQL 8.0.19+ has officially deprecated display widths for integer types.",
    hint: "Display width is not a storage constraint.",
    level: "moderate",
    codeExample: "emp_no INT(4) ZEROFILL -- 5 is displayed as '0005', but 100000 is still stored fully"
  },
  {
    question: "What is the difference between BLOB and TEXT data types?",
    shortAnswer: "BLOB stores binary data (byte streams with no character set/collation); TEXT stores character strings with encoding and collation rules.",
    explanation: "BLOB (Binary Large Object) is used for binary files, images, PDFs, or encrypted ciphertext where data sorting is based on numeric byte values. TEXT is used for textual articles, HTML, or JSON strings where sorting and comparisons respect the specified character set collation (e.g. case insensitivity).",
    hint: "Binary byte array vs encoded character strings.",
    level: "moderate",
    codeExample: "avatar_image BLOB, -- Raw binary image\nbio_text TEXT -- Character encoded text"
  },
  {
    question: "What happens when you insert a string exceeding VARCHAR(10) in MySQL with STRICT SQL mode enabled?",
    shortAnswer: "MySQL rejects the query with an error: 'Data too long for column', preventing truncated data from being inserted.",
    explanation: "When `STRICT_TRANS_TABLES` or `STRICT_ALL_TABLES` is enabled in `sql_mode` (default in modern MySQL), inserting oversized data throws a runtime error and rolls back the statement. In non-strict mode (legacy), MySQL silently truncates the string to 10 characters and issues a warning.",
    hint: "Strict SQL Mode error vs non-strict silent truncation.",
    level: "moderate",
    codeExample: "-- ERROR 1406 (22001): Data too long for column 'short_code' at row 1"
  },
  {
    question: "How do you store fractional seconds (milliseconds/microseconds) in MySQL DATETIME or TIMESTAMP columns?",
    shortAnswer: "By specifying fractional seconds precision (0 to 6) in parentheses, e.g., DATETIME(3) or TIMESTAMP(6).",
    explanation: "DATETIME(0) stores seconds (`YYYY-MM-DD HH:MM:SS`). Specifying DATETIME(3) records milliseconds (`.123`), and DATETIME(6) records microseconds (`.123456`). Each fractional precision level adds 1 to 3 additional bytes of storage.",
    hint: "Precision parameter from 0 to 6.",
    level: "moderate",
    codeExample: "logged_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) -- Microsecond precision"
  },
  {
    question: "What is the difference between the DATE data type and the YEAR data type?",
    shortAnswer: "DATE stores year, month, and day (3 bytes, 'YYYY-MM-DD'); YEAR stores only the 4-digit year (1 byte, 1901-2155).",
    explanation: "When an application only needs to store a manufacturing year, release year, or academic batch (e.g., Batch 2026 at Barrackpore College), YEAR(4) is 3 times more compact on disk than DATE.",
    hint: "1 byte vs 3 bytes when only the year number is required.",
    level: "basic",
    codeExample: "graduation_year YEAR NOT NULL -- e.g. 2026"
  },
  {
    question: "How does the SET data type differ from the ENUM data type in MySQL?",
    shortAnswer: "ENUM allows selecting exactly ONE option from a list; SET allows selecting ZERO, ONE, or MULTIPLE options from a list.",
    explanation: "SET values are stored internally as bitwise bitmasks (1 bit per member). For example, `SET('Reading', 'Gaming', 'Coding')` can store `'Reading,Coding'` as binary 101 (decimal 5). It supports up to 64 distinct members.",
    hint: "Single radio choice vs multiple checkbox selection.",
    level: "moderate",
    codeExample: "user_permissions SET('READ', 'WRITE', 'EXECUTE', 'ADMIN')"
  },
  {
    question: "What is the difference between CHAR and BINARY data types?",
    shortAnswer: "CHAR stores characters encoded with a character set and collation; BINARY stores raw byte strings of fixed length.",
    explanation: "In CHAR, comparisons are collation-based (e.g. 'A' equals 'a' in case-insensitive `_ci` collations). In BINARY, comparisons are strict byte-value comparisons (0x41 vs 0x61), and padding is done with zero bytes (0x00) instead of space characters (0x20).",
    hint: "Character collation vs raw byte comparison.",
    level: "expert",
    codeExample: "guid BINARY(16) -- Compact binary storage for 128-bit UUIDs"
  },
  {
    question: "How does storing UUIDs as BINARY(16) compare to storing them as VARCHAR(36)?",
    shortAnswer: "BINARY(16) reduces disk and RAM usage by more than 55% (16 bytes vs 36 bytes) and dramatically improves B-Tree index cache density.",
    explanation: "A standard UUID string `'6ba7b810-9dad-11d1-80b4-00c04fd430c8'` is 36 characters long. Using `UUID_TO_BIN(UUID())`, MySQL converts the hex string into its raw 16-byte binary representation, saving 20 bytes per row and significantly speeding up primary key joins.",
    hint: "16 bytes packed binary vs 36 ASCII character string.",
    level: "expert",
    codeExample: "id BINARY(16) PRIMARY KEY,\n-- INSERT INTO t VALUES (UUID_TO_BIN(UUID()));"
  },
  {
    question: "What is the storage requirement for DECIMAL(18, 4) in MySQL?",
    shortAnswer: "DECIMAL stores 9 decimal digits in 4 bytes; DECIMAL(18, 4) has 14 integer digits and 4 fraction digits, requiring 10 bytes total.",
    explanation: "MySQL packs digits into 4-byte integers for every group of 9 digits. 14 integer digits take 4 bytes (for first 9 digits) + 3 bytes (for remaining 5 digits) = 7 bytes. 4 fraction digits take 2 bytes. Total storage = 7 + 2 = 9 bytes + 1 byte sign/metadata = 9 to 10 bytes.",
    hint: "9 digits pack into 4 bytes.",
    level: "expert",
    codeExample: "account_balance DECIMAL(18, 4) -- Exact precision for large institutional finances"
  },
  {
    question: "Why does MySQL recommend utf8mb4 over utf8mb3 / utf8?",
    shortAnswer: "Legacy 'utf8' (utf8mb3) only supports 3-byte characters, causing crashes when users insert 4-byte emojis or supplementary Unicode characters.",
    explanation: "In MySQL 5.7 and earlier, 'utf8' was an alias for `utf8mb3`, which maxed out at 3 bytes per character. Attempting to insert a 4-byte emoji (e.g. 😊 or 🎉) resulted in error 1366 'Incorrect string value'. MySQL 8.0 makes `utf8mb4` the default standard.",
    hint: "4-byte full Unicode standard.",
    level: "basic",
    codeExample: "-- Always use utf8mb4 for modern web and mobile apps"
  },
  {
    question: "What is the difference between TIME data type and TIMESTAMP data type?",
    shortAnswer: "TIME stores elapsed time or time-of-day (-838:59:59 to 838:59:59); TIMESTAMP stores an exact instant in calendar time (date + time).",
    explanation: "TIME can represent not only a clock time like '14:30:00', but also accumulated duration (e.g. 150 hours of machine runtime). TIMESTAMP represents a point in history (year, month, day, hour, minute, second).",
    hint: "Duration/clock time vs timestamp point in history.",
    level: "basic",
    codeExample: "training_duration TIME -- e.g. '02:45:00' (2 hours 45 mins)"
  },
  {
    question: "How should you design a column to store Indian Aadhaar numbers or US SSNs?",
    shortAnswer: "Use CHAR(12) for Aadhaar numbers (or CHAR(9) for SSN) with a CHECK constraint enforcing numeric digits only.",
    explanation: "Government ID numbers are fixed-length identification codes that may have leading zeros. Arithmetic will never be performed on them. CHAR(12) ensures exact 12-character allocation without length-prefix overhead.",
    hint: "Fixed-length string with numeric regex check constraint.",
    level: "moderate",
    codeExample: "aadhaar_no CHAR(12) NOT NULL CHECK (aadhaar_no REGEXP '^[0-9]{12}$')"
  },
  {
    question: "What is the JSON data type in MySQL 8.0, and how does it differ from storing JSON in a LONGTEXT column?",
    shortAnswer: "The native JSON data type provides automatic syntax validation and optimized binary storage for fast key-based lookups without parsing text.",
    explanation: "When stored as native JSON, MySQL converts the JSON document into an internal binary format where keys and elements are indexed internally. This allows MySQL to extract specific sub-properties using `->>` operators without reading and parsing the entire document from disk.",
    hint: "Binary JSON format with built-in validation vs raw text.",
    level: "expert",
    codeExample: "metadata JSON NOT NULL,\n-- SELECT metadata->>'$.theme' FROM user_preferences;"
  },
  {
    question: "What is the golden rule for choosing column data types during database schema design?",
    shortAnswer: "Choose the most specific and smallest data type that accurately represents all valid domain values and anticipated growth without risk of overflow.",
    explanation: "Following this principle minimizes disk space, fits more rows into RAM caches (InnoDB Buffer Pool), accelerates index traversals, and guarantees data integrity by disallowing invalid formats at the database engine level.",
    hint: "Smallest, most specific, exact domain constraint.",
    level: "basic",
    codeExample: "-- Rule: TINYINT over INT for age, DECIMAL over FLOAT for ₹, CHAR for fixed hashes"
  }
];

export default questions;
