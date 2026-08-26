// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is a Collation in MySQL, and how does it differ from a Character Set?",
    shortAnswer: "A **Character Set** defines how characters are represented as binary bytes on disk, whereas a **Collation** defines the mathematical rules for **comparing and sorting** those characters (handling case sensitivity, accents, and language-specific alphabetical order).",
    explanation: "Character set is for storage; Collation is for comparison and ordering.",
    hint: "Character set stores bytes; Collation compares and sorts characters.",
    level: "basic"
  },
  {
    question: "What does the `_ci` suffix in a collation name indicate?",
    shortAnswer: "**Case Insensitive**: The collation treats uppercase and lowercase letters as completely equal during comparisons (`'admin' = 'ADMIN'` evaluates to `TRUE`).",
    explanation: "Standard for user-friendly searches, email addresses, and general text.",
    hint: "Case Insensitive (treats uppercase and lowercase as equal).",
    level: "basic"
  },
  {
    question: "What does the `_cs` suffix in a collation name indicate?",
    shortAnswer: "**Case Sensitive**: The collation distinguishes between uppercase and lowercase letters (`'admin' = 'ADMIN'` evaluates to `FALSE`).",
    explanation: "Used when exact letter casing is significant for business logic.",
    hint: "Case Sensitive (distinguishes between uppercase and lowercase).",
    level: "basic"
  },
  {
    question: "What does the `_bin` suffix in a collation name indicate?",
    shortAnswer: "**Binary Collation**: Compares strings strictly by their underlying **numerical byte values** without language rules, making it case-sensitive, accent-sensitive, and extremely fast.",
    explanation: "Fastest comparison because no linguistic lookup tables are required.",
    hint: "Binary comparison based on raw byte values; case and accent sensitive.",
    level: "basic"
  },
  {
    question: "What do the `_ai` and `_as` suffixes mean in modern MySQL 8.0 collations?",
    shortAnswer: "- `_ai`: **Accent Insensitive** (`'café' = 'cafe'` evaluates to `TRUE`).\n- `_as`: **Accent Sensitive** (`'café' = 'cafe'` evaluates to `FALSE`).",
    explanation: "Combined in names like `utf8mb4_0900_ai_ci` (Accent Insensitive, Case Insensitive).",
    hint: "_ai is Accent Insensitive; _as is Accent Sensitive.",
    level: "expert"
  },
  {
    question: "How does a `_ci` collation impact a column with a `UNIQUE` constraint?",
    shortAnswer: "It prevents inserting duplicate strings that differ only by case: inserting `'Susmita'` followed by `'SUSMITA'` will fail with **MySQL Error 1062: Duplicate entry 'SUSMITA' for key '...'**.",
    explanation: "The unique index enforces uniqueness using the column's configured collation.",
    hint: "Throws Error 1062 Duplicate Entry because 'Susmita' equals 'SUSMITA' under _ci.",
    level: "basic",
    codeExample: "CREATE TABLE users (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  email VARCHAR(100) COLLATE utf8mb4_0900_ai_ci UNIQUE\n);\n-- Fails on second insert:\nINSERT INTO users (email) VALUES ('info@codernaccotax.co.in');\nINSERT INTO users (email) VALUES ('INFO@CODERnACCOTAX.CO.IN'); -- Error 1062!"
  },
  {
    question: "What is the critical security vulnerability of storing API tokens or passwords in a column with `_ci` collation?",
    shortAnswer: "An attacker could authenticate using any case combination (e.g. `'SecretToken'` vs `'secrettoken'`), potentially bypassing authorization checks if verified via plain SQL queries.",
    explanation: "Always use `_bin` collations or `BINARY` data types for cryptographic hashes and tokens.",
    hint: "Allows bypassing case-sensitive authentication checks if verified via plain SQL.",
    level: "expert"
  },
  {
    question: "How can you dynamically override a column's collation within a specific `WHERE` clause?",
    shortAnswer: "By using the `COLLATE` clause: `SELECT * FROM users WHERE username COLLATE utf8mb4_bin = 'Admin';`",
    explanation: "Forces exact case-sensitive binary matching for that specific query.",
    hint: "Use the COLLATE clause in the WHERE condition.",
    level: "basic",
    codeExample: "SELECT * FROM users \nWHERE username COLLATE utf8mb4_bin = 'Admin';"
  },
  {
    question: "What causes MySQL Error 1267: `Illegal mix of collations`?",
    shortAnswer: "Attempting to compare, join, or combine strings from two columns or expressions that use **different, incompatible collations** (e.g. comparing a `utf8mb4_unicode_ci` column with a `latin1_swedish_ci` column).",
    explanation: "Common error during schema migrations and multi-table joins.",
    hint: "Comparing two columns or expressions that have different, incompatible collations.",
    level: "expert",
    codeExample: "-- Throws Error 1267 if collations mismatch:\nSELECT * FROM orders o \nJOIN legacy_customers c ON o.customer_code = c.customer_code;"
  },
  {
    question: "How do you resolve MySQL Error 1267 (`Illegal mix of collations`) in a `JOIN` query without altering table schemas?",
    shortAnswer: "Explicitly force one side of the join to match the other's collation using `COLLATE`: `ON o.customer_code = c.customer_code COLLATE utf8mb4_0900_ai_ci`.",
    explanation: "Instantly harmonizes comparison rules for the query.",
    hint: "Add COLLATE to one side of the join condition.",
    level: "basic",
    codeExample: "SELECT * FROM orders o \nJOIN legacy_customers c \n  ON o.customer_code = c.customer_code COLLATE utf8mb4_0900_ai_ci;"
  },
  {
    question: "How do collations affect `ORDER BY` sorting queries?",
    shortAnswer: "- Under `_ci` or language collations: Letters sort alphabetically regardless of case (`'a'`, `'A'`, `'b'`, `'B'`).\n- Under `_bin`: Uppercase letters sort before lowercase letters based on ASCII values (`'A'`, `'B'`, `'a'`, `'b'`).",
    explanation: "Determines the alphabetical sequence of result sets.",
    hint: "_ci sorts alphabetically by letter; _bin sorts by ASCII byte values (uppercase before lowercase).",
    level: "basic"
  },
  {
    question: "How do collations affect `GROUP BY` and `DISTINCT` queries?",
    shortAnswer: "Under a `_ci` collation, `'Barrackpore'` and `'BARRACKPORE'` are treated as identical values and grouped into a **single output row**; under `_bin`, they remain two separate groups.",
    explanation: "Collation rules govern equality evaluation across all grouping operators.",
    hint: "Under _ci, case variations are merged into a single distinct group.",
    level: "basic"
  },
  {
    question: "Why is `utf8mb4_bin` significantly faster for sorting and joins than `utf8mb4_0900_ai_ci`?",
    shortAnswer: "Because `utf8mb4_bin` performs direct **byte-for-byte CPU memory comparisons** (`memcmp`), avoiding complex Unicode Collation Algorithm (UCA) weight lookups and normalization rules.",
    explanation: "Delivers maximum CPU performance for exact-match machine keys and hashes.",
    hint: "Uses raw byte comparisons (memcmp) without complex Unicode weight lookup tables.",
    level: "expert"
  },
  {
    question: "How do you inspect all collations available for the `utf8mb4` character set in MySQL?",
    shortAnswer: "`SHOW COLLATION WHERE Charset = 'utf8mb4';`",
    explanation: "Lists collation names, IDs, default status, and sorting weights.",
    hint: "SHOW COLLATION WHERE Charset = 'utf8mb4';",
    level: "basic",
    codeExample: "SHOW COLLATION WHERE Charset = 'utf8mb4';"
  },
  {
    question: "What is the difference between `utf8mb4_general_ci` and `utf8mb4_unicode_ci`?",
    shortAnswer: "- `utf8mb4_general_ci`: Legacy fast collation that ignores complex language rules and expansions (e.g. treats German `ß` as simple `s`).\n- `utf8mb4_unicode_ci`: Accurate Unicode Collation Algorithm (UCA) implementation (correctly expands German `ß` to `ss`).",
    explanation: "General is legacy; Unicode/0900 is modern and linguistically accurate.",
    hint: "General is a fast approximation; Unicode follows official Unicode collation rules.",
    level: "expert"
  },
  {
    question: "Can an index use a different collation than the column's default collation?",
    shortAnswer: "No; an index on a column automatically adopts the column's defined collation, and range lookups in the B+ tree are ordered strictly according to that collation.",
    explanation: "To index in a different collation, you must alter the column or create a functional/generated column.",
    hint: "Indexes inherit the column's collation; use generated columns for alternative collations.",
    level: "expert"
  },
  {
    question: "How do you specify a case-sensitive collation for a specific column in a `CREATE TABLE` statement?",
    shortAnswer: "`column_name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL`",
    explanation: "Applies binary case sensitivity specifically to that single column.",
    hint: "Add COLLATE utf8mb4_bin directly to the column definition.",
    level: "basic",
    codeExample: "CREATE TABLE auth_tokens (\n  token_id INT PRIMARY KEY AUTO_INCREMENT,\n  token_hash VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL\n);"
  },
  {
    question: "What happens if you use `LIKE` with a `_ci` collation vs `_bin` collation?",
    shortAnswer: "- Under `_ci`: `'Kolkata%' LIKE 'kolkata%'` matches `TRUE`.\n- Under `_bin`: `'Kolkata%' LIKE 'kolkata%'` matches `FALSE` (case must match exactly).",
    explanation: "Pattern matching wildcards adhere strictly to column collation rules.",
    hint: "_ci matches patterns case-insensitively; _bin requires exact case matches.",
    level: "basic"
  },
  {
    question: "What is the default collation for `latin1` in MySQL?",
    shortAnswer: "`latin1_swedish_ci` (historical default in legacy MySQL).",
    explanation: "Legacy default retained for backward compatibility.",
    hint: "latin1_swedish_ci.",
    level: "basic"
  },
  {
    question: "What is the default collation for `utf8mb4` in MySQL 8.0?",
    shortAnswer: "`utf8mb4_0900_ai_ci` (based on the Unicode 9.0.0 standard).",
    explanation: "Replaced utf8mb4_general_ci starting in MySQL 8.0.",
    hint: "utf8mb4_0900_ai_ci.",
    level: "basic"
  },
  {
    question: "How does collation affect string comparison operators like `<`, `>`, and `BETWEEN`?",
    shortAnswer: "It determines alphabetical precedence; for example, under `_ci`, `'Apple' < 'banana'` is `TRUE`, whereas under `_bin`, all uppercase letters (`'Z'`) sort before lowercase letters (`'a'`).",
    explanation: "Range queries and sorting order depend entirely on collation weights.",
    hint: "Governs alphabetical precedence in relational comparison operators.",
    level: "basic"
  },
  {
    question: "Can two different character sets share the same collation?",
    shortAnswer: "No! Every collation belongs to **exactly one** character set; a collation name always begins with its parent character set prefix (e.g. `utf8mb4_...`, `latin1_...`).",
    explanation: "Collations are strictly bound to their character set.",
    hint: "No, a collation is strictly bound to its specific character set.",
    level: "basic"
  },
  {
    question: "What is a 'Language-Specific Collation' (e.g. `utf8mb4_de_pb_0900_ai_ci` or `utf8mb4_ja_0900_as_cs`)?",
    shortAnswer: "A collation tailored to the specific alphabetical sorting and dictionary rules of a particular language (such as German phonebook sorting or Japanese kana case sensitivity).",
    explanation: "Provides country-specific linguistic sorting accuracy.",
    hint: "A collation implementing country-specific dictionary and sorting rules.",
    level: "expert"
  },
  {
    question: "What is the `COLLATION()` function used for in MySQL?",
    shortAnswer: "It returns the collation of any string expression, column, or literal value: `SELECT COLLATION('test'), COLLATION(user_email) FROM users;`.",
    explanation: "Handy diagnostic function to inspect expression collations.",
    hint: "Returns the collation name of a given string expression or column.",
    level: "basic",
    codeExample: "SELECT COLLATION('Barrackpore'), COLLATION(123);"
  },
  {
    question: "How do you change the default collation of an entire database schema?",
    shortAnswer: "`ALTER DATABASE db_name COLLATE = utf8mb4_0900_ai_ci;`",
    explanation: "Updates the database default for future tables.",
    hint: "ALTER DATABASE db_name COLLATE = collation_name;",
    level: "basic"
  },
  {
    question: "Why should email columns generally use `_ci` collation while password hashes use `_bin`?",
    shortAnswer: "Because email addresses are standardly case-insensitive according to RFC specifications (preventing duplicate account registration with differing casing), while password hashes are exact byte strings where casing matters.",
    explanation: "Aligns database constraints with domain security standards.",
    hint: "Emails are case-insensitive by RFC standards; password hashes require exact binary matching.",
    level: "basic"
  },
  {
    question: "What is the `_as_cs` collation suffix in MySQL 8.0?",
    shortAnswer: "**Accent Sensitive and Case Sensitive**: Both accents (`'e' != 'é'`) and letter casing (`'a' != 'A'`) are treated as distinct differences.",
    explanation: "Maximum linguistic precision in Unicode 9.0 collations.",
    hint: "Accent Sensitive and Case Sensitive (distinguishes both case and accents).",
    level: "expert"
  },
  {
    question: "What happens when you execute `SELECT * FROM tbl WHERE BINARY col = 'value'`?",
    shortAnswer: "The `BINARY` keyword casts the string to a binary string, forcing case-sensitive byte matching, but it **disables index usage** on that column unless an index with `_bin` collation exists.",
    explanation: "Wrapping columns in functions or casts prevents index seeks (non-sargable).",
    hint: "Forces binary comparison but invalidates standard index range scans.",
    level: "expert"
  },
  {
    question: "How do you verify the collation of an existing column using Information Schema?",
    shortAnswer: "`SELECT column_name, character_set_name, collation_name FROM information_schema.columns WHERE table_name = 'users';`",
    explanation: "Provides instant tabular inspection of all column collations.",
    hint: "Query collation_name from information_schema.columns.",
    level: "basic",
    codeExample: "SELECT column_name, character_set_name, collation_name \nFROM information_schema.columns \nWHERE table_schema = 'college_admissions' AND table_name = 'students';"
  },
  {
    question: "What is the primary architectural takeaway of Topic 1 in Module 004_002?",
    shortAnswer: "Collations govern all string comparisons, sorting, and `UNIQUE` constraints in MySQL: choosing `_ci` enables human-friendly case-insensitive searches, `_bin` guarantees strict cryptographic security and maximum query performance, and understanding collation inheritance prevents Error 1267 join conflicts.",
    explanation: "Mastery of collations ensures correct business logic, security, and query accuracy.",
    hint: "Collations dictate string comparison, sorting, UNIQUE integrity, and join compatibility.",
    level: "basic"
  }
];

export default questions;
