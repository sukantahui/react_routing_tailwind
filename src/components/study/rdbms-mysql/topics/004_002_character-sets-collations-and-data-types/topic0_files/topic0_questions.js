// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is a Character Set in MySQL?",
    shortAnswer: "A set of symbols and glyphs paired with a specific numerical binary encoding rule used to represent, store, and transmit textual characters in the database.",
    explanation: "Defines the byte mapping for alphabets, numbers, symbols, and emojis.",
    hint: "A defined mapping between characters/symbols and their binary byte representations.",
    level: "basic"
  },
  {
    question: "What is the key limitation of the ASCII character set?",
    shortAnswer: "It uses only **7 bits** (128 characters, 0-127), accommodating only basic English letters, digits, and control codes, making it completely unable to represent accented characters, international scripts, or emojis.",
    explanation: "ASCII was designed exclusively for early English teletypewriters.",
    hint: "7-bit encoding with only 128 characters; cannot store non-English scripts.",
    level: "basic"
  },
  {
    question: "What is the `latin1` (ISO-8859-1) character set, and what are its boundaries?",
    shortAnswer: "An **8-bit character set** (256 characters, 1 byte per character) supporting Western European languages (English, French, German, Spanish), but incapable of storing Asian, Cyrillic, Indic (Bengali/Hindi), or emoji characters.",
    explanation: "Legacy default in MySQL 4.x and 5.0.",
    hint: "8-bit encoding for Western European languages; cannot store Asian, Indic, or emoji characters.",
    level: "basic"
  },
  {
    question: "What was the major architectural flaw of MySQL's legacy `utf8` (now renamed `utf8mb3`) character set?",
    shortAnswer: "MySQL's original `utf8` implementation only allocated a maximum of **3 bytes per character** (covering U+0000 to U+FFFF), failing to support the full 4-byte Unicode standard (Supplementary Multilingual Plane).",
    explanation: "Cannot store emojis (😀, 🚀) or rare historical and Asian characters.",
    hint: "Only supports up to 3 bytes per character, failing to store 4-byte emojis and full Unicode.",
    level: "expert"
  },
  {
    question: "What error occurs when an application attempts to insert an emoji (like 😀) into a `utf8mb3` column?",
    shortAnswer: "**MySQL Error 1366 (HY000)**: `Incorrect string value: '\\xF0\\x9F\\x98\\x80' for column 'content' at row 1`.",
    explanation: "The byte sequence \\xF0\\x9F\\x98\\x80 represents a 4-byte emoji that utf8mb3 cannot encode.",
    hint: "Error 1366: Incorrect string value (cannot encode 4-byte UTF-8 sequences).",
    level: "basic",
    codeExample: "-- Throws Error 1366 in utf8mb3:\nINSERT INTO comments (content) VALUES ('Great course! 🚀');"
  },
  {
    question: "What is `utf8mb4` in MySQL, and why is it the universal standard in MySQL 8.0+?",
    shortAnswer: "`utf8mb4` (UTF-8 Most Bytes 4) is MySQL's full, true **4-byte UTF-8 implementation** conforming 100% to the Unicode standard, capable of storing all global languages (including Bengali, Hindi, Chinese) and modern emojis.",
    explanation: "Default character set in MySQL 8.0 and recommended for all modern applications.",
    hint: "Full 4-byte UTF-8 encoding supporting 100% of Unicode characters and emojis.",
    level: "basic"
  },
  {
    question: "How many bytes per character does `utf8mb4` consume on disk and in memory?",
    shortAnswer: "It uses a **variable-length encoding of 1 to 4 bytes per character**:\n- 1 Byte: Standard ASCII (English letters, numbers)\n- 2 Bytes: Latin accented, Greek, Arabic, Hebrew\n- 3 Bytes: Indic (Bengali, Hindi), Chinese, Japanese\n- 4 Bytes: Emojis, mathematical symbols, historic scripts.",
    explanation: "English text in utf8mb4 still consumes only 1 byte per character, maintaining high disk efficiency.",
    hint: "Variable 1 to 4 bytes dynamically depending on the Unicode code point.",
    level: "expert"
  },
  {
    question: "How does `utf8mb4` impact the maximum memory allocation for internal temporary tables and sort buffers?",
    shortAnswer: "MySQL must allocate memory based on the **worst-case byte size** ($N \\times 4$ bytes) for fixed-length sorting; for example, `VARCHAR(255)` in `utf8mb4` reserves up to $255 \\times 4 = 1,020\\text{ bytes}$ per row in RAM.",
    explanation: "Why overly wide `VARCHAR(255)` columns should be sized appropriately to avoid RAM bloat.",
    hint: "Reserves worst-case N * 4 bytes per character in RAM sort buffers.",
    level: "expert"
  },
  {
    question: "What is the maximum character length for a single-column index on a `VARCHAR` column in `utf8mb4` under InnoDB DYNAMIC row format?",
    shortAnswer: "**768 Characters** (because InnoDB's maximum index key prefix length is 3072 bytes, and $3072 / 4\\text{ bytes per char} = 768\\text{ characters}$).",
    explanation: "In legacy COMPACT row format with a 767-byte index limit, the maximum was only `VARCHAR(191)`.",
    hint: "768 characters (3072 bytes / 4 bytes per character).",
    level: "expert"
  },
  {
    question: "Why did older MySQL 5.5/5.6 applications frequently use `VARCHAR(191)` for unique email and username columns?",
    shortAnswer: "Because in the older `COMPACT` row format, the maximum index prefix length was **767 bytes**; dividing $767 / 4 = 191.75$, making `VARCHAR(191)` the absolute largest indexable `utf8mb4` column without error.",
    explanation: "Classic MySQL legacy limitation that gave rise to the ubiquitous VARCHAR(191) pattern.",
    hint: "Due to the 767-byte index prefix limit in legacy COMPACT row format (767 / 4 = 191).",
    level: "expert"
  },
  {
    question: "How do you check all supported character sets in your MySQL server instance?",
    shortAnswer: "`SHOW CHARACTER SET;` (or `SHOW CHARACTER SET LIKE 'utf8%';`)",
    explanation: "Lists character set names, descriptions, default collations, and maximum bytes per character.",
    hint: "SHOW CHARACTER SET;",
    level: "basic",
    codeExample: "SHOW CHARACTER SET LIKE 'utf8%';"
  },
  {
    question: "What SQL command safely converts an entire existing table and all its string columns from `latin1` or `utf8mb3` to `utf8mb4`?",
    shortAnswer: "`ALTER TABLE table_name CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;`",
    explanation: "`CONVERT TO` automatically converts and re-encodes all existing character data properly.",
    hint: "ALTER TABLE tbl CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;",
    level: "basic",
    codeExample: "ALTER TABLE user_profiles \nCONVERT TO CHARACTER SET utf8mb4 \nCOLLATE utf8mb4_0900_ai_ci;"
  },
  {
    question: "What is the dangerous difference between `ALTER TABLE tbl CONVERT TO CHARACTER SET` and `ALTER TABLE tbl DEFAULT CHARACTER SET`?",
    shortAnswer: "- `CONVERT TO`: Modifies the encoding of all **existing column data** and updates column schemas.\n- `DEFAULT CHARACTER SET`: Only changes the default charset for **future new columns**, leaving existing columns and their data in their old character set!",
    explanation: "Using DEFAULT CHARACTER SET will NOT fix existing columns suffering from emoji errors.",
    hint: "CONVERT TO converts existing data; DEFAULT only affects newly added future columns.",
    level: "expert"
  },
  {
    question: "How do you verify the character set and collation of a specific table in MySQL?",
    shortAnswer: "`SHOW TABLE STATUS WHERE Name = 'table_name';` or `SHOW CREATE TABLE table_name;`",
    explanation: "Displays `Collation` in status and full DDL specification in CREATE TABLE.",
    hint: "SHOW CREATE TABLE table_name;",
    level: "basic"
  },
  {
    question: "What are the key client/server character set configuration variables in MySQL?",
    shortAnswer: "1) `character_set_server` (default server charset),\n2) `character_set_database` (current DB charset),\n3) `character_set_client` (incoming query charset),\n4) `character_set_connection` (internal translation charset),\n5) `character_set_results` (result set charset returned to client).",
    explanation: "Ensures seamless character translation across the client-server bridge.",
    hint: "character_set_server, character_set_client, character_set_connection, and character_set_results.",
    level: "expert"
  },
  {
    question: "What does the SQL command `SET NAMES 'utf8mb4';` accomplish?",
    shortAnswer: "It sets `character_set_client`, `character_set_connection`, and `character_set_results` to `utf8mb4` simultaneously in the current session, ensuring complete end-to-end UTF-8 communication.",
    explanation: "Standard command executed immediately upon establishing a database connection.",
    hint: "Sets client, connection, and results character sets to utf8mb4 simultaneously.",
    level: "basic",
    codeExample: "SET NAMES 'utf8mb4';"
  },
  {
    question: "What is a 'Mojibake' character corruption bug?",
    shortAnswer: "Text corruption that occurs when characters written in one character set (e.g. UTF-8) are decoded using a different character set (e.g. Latin1), producing garbled meaningless symbols like `Ã©` instead of `é` or `à¦¬` instead of Bengali letters.",
    explanation: "Caused by mismatched character set configurations between client and server.",
    hint: "Garbled text caused by mismatched encoding and decoding character sets.",
    level: "basic"
  },
  {
    question: "Can different columns in the SAME table have different character sets?",
    shortAnswer: "Yes! A table can use `utf8mb4` as its default, while specific columns can explicitly define `CHARACTER SET ascii` (e.g. for UUID or MD5 hashes) or `CHARACTER SET latin1` to save storage and memory.",
    explanation: "Allows micro-optimization of pure ASCII/hash columns.",
    hint: "Yes, character sets can be defined per-column.",
    level: "basic",
    codeExample: "CREATE TABLE api_keys (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  api_token CHAR(32) CHARACTER SET ascii NOT NULL, -- 32 bytes strictly\n  user_name VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL -- Full Unicode\n);"
  },
  {
    question: "Why does an ASCII character like letter 'A' take only 1 byte in `utf8mb4` instead of 4 bytes?",
    shortAnswer: "Because UTF-8 is a **backward-compatible variable-width encoding** where Unicode code points U+0000 to U+007F (the ASCII range) are encoded using a single 7-bit byte with the highest bit set to `0`.",
    explanation: "Ensures zero storage penalty for standard English and numeric data.",
    hint: "Because UTF-8 encodes code points 0-127 in a single 1-byte sequence matching ASCII.",
    level: "expert"
  },
  {
    question: "What is the `HEX()` function used for in character set debugging?",
    shortAnswer: "It returns the hexadecimal representation of the raw binary bytes stored for a string, allowing DBAs to inspect the exact bytes on disk to identify encoding corruption.",
    explanation: "Invaluable tool for diagnosing Mojibake and character conversion issues.",
    hint: "Displays the raw hexadecimal bytes stored on disk for a character.",
    level: "basic",
    codeExample: "SELECT '🚀' AS emoji, HEX('🚀') AS hex_bytes;\n-- Output: F09F9A80 (4 Bytes)"
  },
  {
    question: "What happens if you store an Indian rupee symbol (`₹`) in a `latin1` column?",
    shortAnswer: "The insert fails or corrupts the character into a question mark (`?`) because the Indian Rupee sign (Unicode code point `U+20B9`, 3 bytes in UTF-8: `E2 82 B9`) does not exist in the 8-bit Latin1 character map.",
    explanation: "Demonstrates why international financial applications must use utf8mb4.",
    hint: "Fails or turns into a '?' because the Rupee symbol does not exist in Latin1.",
    level: "basic"
  },
  {
    question: "What is `utf8mb3` in MySQL 8.0?",
    shortAnswer: "The officially deprecated alias for the legacy 3-byte `utf8` character set; it will be permanently removed in future MySQL major releases.",
    explanation: "Deprecated in favor of utf8mb4.",
    hint: "The deprecated 3-byte UTF-8 alias slated for removal in future releases.",
    level: "basic"
  },
  {
    question: "How do you set the default character set for the entire MySQL server in `my.cnf`?",
    shortAnswer: "`[mysqld]`\n`character-set-server = utf8mb4`\n`collation-server = utf8mb4_0900_ai_ci`",
    explanation: "Ensures all newly created databases and tables default to utf8mb4.",
    hint: "character-set-server = utf8mb4 in my.cnf.",
    level: "basic"
  },
  {
    question: "What is the `CHAR_LENGTH()` vs `LENGTH()` function in MySQL?",
    shortAnswer: "- `CHAR_LENGTH(str)`: Returns the number of **characters** (e.g. `CHAR_LENGTH('🚀') = 1`).\n- `LENGTH(str)`: Returns the number of **bytes** (e.g. `LENGTH('🚀') = 4` in utf8mb4).",
    explanation: "Crucial distinction when validating user input length vs disk storage.",
    hint: "CHAR_LENGTH counts characters; LENGTH counts raw physical bytes.",
    level: "basic",
    codeExample: "SELECT \n  CHAR_LENGTH('Kolkata 🇮🇳') AS num_chars, -- 9 characters\n  LENGTH('Kolkata 🇮🇳') AS num_bytes;     -- 15 bytes in utf8mb4"
  },
  {
    question: "Can an administrator convert a `BLOB` column directly to `VARCHAR` without specifying a character set?",
    shortAnswer: "No; `BLOB` is raw binary data with no character set; converting to `VARCHAR` requires specifying a character set so MySQL knows how to interpret the byte sequences: `ALTER TABLE tbl MODIFY col VARCHAR(255) CHARACTER SET utf8mb4;`.",
    explanation: "Prevents accidental corruption of binary data during string conversion.",
    hint: "Must specify a character set so MySQL knows how to decode the binary bytes.",
    level: "expert"
  },
  {
    question: "Why should MD5, SHA-256 hashes, and UUID strings use `CHARACTER SET ascii` or `latin1` rather than `utf8mb4`?",
    shortAnswer: "Because hash digests and UUIDs only contain hexadecimal characters (`0-9`, `a-f`), which are strictly ASCII; using `ascii` saves memory during sorting and reduces index buffer overhead by 4x compared to `utf8mb4`.",
    explanation: "High-performance schema micro-optimization for high-throughput databases.",
    hint: "Saves memory during sorting and reduces index buffer footprint since hashes are pure ASCII.",
    level: "expert"
  },
  {
    question: "What is the purpose of `innodb_default_row_format = DYNAMIC` in relation to `utf8mb4`?",
    shortAnswer: "It allows a maximum index key prefix length of **3072 bytes** (supporting up to `VARCHAR(768)` in `utf8mb4`), eliminating the old 767-byte `VARCHAR(191)` limitation of `COMPACT` row formats.",
    explanation: "Standard default in MySQL 8.0.",
    hint: "Enables 3072-byte index prefixes, removing the old 767-byte VARCHAR(191) limit.",
    level: "expert"
  },
  {
    question: "What happens if a client application sends UTF-8 data to a MySQL connection configured with `character_set_client = latin1`?",
    shortAnswer: "MySQL will attempt to translate the bytes from Latin1 to the table's character set, corrupting multi-byte characters (Double-Encoding / Mojibake) and destroying original international text and emojis.",
    explanation: "The root cause of 99% of web application character corruption bugs.",
    hint: "Causes Double-Encoding / Mojibake, corrupting multi-byte characters and emojis.",
    level: "basic"
  },
  {
    question: "How do you verify whether a database connection pool in Node.js or Python is using `utf8mb4`?",
    shortAnswer: "Specify `charset: 'utf8mb4'` in the connection options (e.g. in `mysql2` or `PyMySQL`), or execute `SELECT @@character_set_client, @@character_set_connection, @@character_set_results;`.",
    explanation: "Ensures connection pools properly negotiate 4-byte UTF-8 upon initialization.",
    hint: "Set charset: 'utf8mb4' in connection config and verify session variables.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 0 in Module 004_002?",
    shortAnswer: "`utf8mb4` is the universal, non-negotiable character set standard for modern MySQL: it eliminates Error 1366, supports all global languages and emojis, and must be configured end-to-end across server, database, table, and application client connections.",
    explanation: "Foundational knowledge for building bulletproof internationalized applications.",
    hint: "utf8mb4 is the essential universal standard for full Unicode, international scripts, and emojis.",
    level: "basic"
  }
];

export default questions;
