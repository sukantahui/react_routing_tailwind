// topic6_files/topic6_questions.js

const questions = [
  {
    question: "Why should SQL keywords (like `SELECT`, `FROM`, `WHERE`) be written in UPPERCASE in production scripts?",
    shortAnswer: "To provide immediate visual contrast between SQL language grammar keywords and database object identifiers (table and column names), significantly improving readability.",
    explanation: "Standard industry convention across engineering teams.",
    hint: "Differentiates language keywords from table/column identifiers.",
    level: "basic"
  },
  {
    question: "Why is `SELECT *` considered an anti-pattern in production application queries?",
    shortAnswer: "Because: 1) It transfers unnecessary columns over the network, 2) Breaks covering index optimizations, 3) Breaks application bindings if new columns are added, and 4) Increases server memory usage.",
    explanation: "Always explicitly specify the required projected columns.",
    hint: "Transfers extra data, breaks covering indexes, and risks breaking apps on schema changes.",
    level: "basic",
    codeExample: "-- Bad:\nSELECT * FROM students;\n\n-- Good:\nSELECT student_id, first_name, email FROM students;"
  },
  {
    question: "What is the recommended casing convention for table and column names in MySQL?",
    shortAnswer: "Lowercase `snake_case` (e.g. `student_id`, `total_tuition_fee_inr`), which ensures cross-platform consistency across Windows and Linux servers.",
    explanation: "Linux file systems are case-sensitive by default for table files.",
    hint: "Use lowercase snake_case to ensure cross-platform consistency.",
    level: "basic"
  },
  {
    question: "Why is naming constraints explicitly (e.g. `CONSTRAINT fk_admission_course`) considered a critical best practice?",
    shortAnswer: "Because auto-generated system names (like `admissions_ibfk_2`) are cryptic and vary across environments, making future `ALTER TABLE ... DROP FOREIGN KEY` migrations difficult and error-prone.",
    explanation: "Explicit names make migrations and error messages easy to read and manage.",
    hint: "Avoids cryptic auto-generated names, making future schema changes maintainable.",
    level: "basic",
    codeExample: "CONSTRAINT fk_admission_course FOREIGN KEY (course_id) REFERENCES courses (course_id)"
  },
  {
    question: "How should multi-table `JOIN` statements be indented for optimal readability?",
    shortAnswer: "Place each `JOIN` clause on a new line, and indent the `ON` condition directly underneath the `JOIN` statement.",
    explanation: "Makes join relationships immediately visible during code review.",
    hint: "Put each JOIN on a new line with indented ON condition.",
    level: "basic",
    codeExample: "SELECT s.full_name, c.title\nFROM students s\nJOIN course_enrollments e\n    ON s.student_id = e.student_id\nJOIN courses c\n    ON e.course_id = c.course_id;"
  },
  {
    question: "Why should monetary currency (like Indian Rupee `₹`) never be stored as `FLOAT` or `DOUBLE`?",
    shortAnswer: "`FLOAT` and `DOUBLE` use binary floating-point representation, causing inexact rounding errors (e.g. `0.1 + 0.2 = 0.30000000000000004`). `DECIMAL` guarantees exact base-10 precision.",
    explanation: "Financial systems require exact cents/paise precision.",
    hint: "Floating point causes rounding inaccuracies; always use DECIMAL for money.",
    level: "basic"
  },
  {
    question: "What is the purpose of adding table aliases (e.g. `FROM students s`) in multi-table queries?",
    shortAnswer: "Aliases keep queries concise, make column qualification easy (`s.student_id`), and eliminate ambiguity errors when multiple tables share column names.",
    explanation: "Improves query brevity and clarity.",
    hint: "Shortens table references and prevents ambiguous column errors.",
    level: "basic"
  },
  {
    question: "Why should you avoid using `NATURAL JOIN` in production codebases?",
    shortAnswer: "Because `NATURAL JOIN` implicitly joins on all columns that share identical names. If a future migration adds a shared column (like `created_at` or `status`), the join condition silently changes, breaking query results.",
    explanation: "Explicit `INNER JOIN ... ON` ensures deterministic query behavior.",
    hint: "Silently breaks if future schema changes introduce shared column names.",
    level: "expert"
  },
  {
    question: "What is the proper way to comment SQL code for team reviews?",
    shortAnswer: "Use `--` for single-line contextual explanations and `/* ... */` for multi-line architecture documentation or commenting out query blocks during debugging.",
    explanation: "Clean comments explain the business rationale behind complex filter logic.",
    hint: "Use -- for single line and /* ... */ for multi-line block comments.",
    level: "basic"
  },
  {
    question: "Why should `VARCHAR` never be used to store dates or timestamps?",
    shortAnswer: "Because `VARCHAR` loses date validation, breaks date arithmetic (`DATE_ADD`, `DATEDIFF`), makes date sorting lexicographical instead of chronological, and wastes storage space.",
    explanation: "Always use native `DATE`, `TIME`, `DATETIME`, or `TIMESTAMP` data types.",
    hint: "Breaks date functions, enables invalid dates, and sorts alphabetically.",
    level: "basic"
  },
  {
    question: "What is the 'Rule of Parentheses' when mixing `AND` and `OR` in `WHERE` clauses?",
    shortAnswer: "Always wrap `OR` sub-expressions in explicit parentheses because `AND` has higher operator precedence, which can cause subtle logic bugs if left unparenthesized.",
    explanation: "Parentheses make boolean evaluation order deterministic and obvious.",
    hint: "Wrap OR conditions in parentheses because AND evaluates first.",
    level: "basic",
    codeExample: "WHERE (city = 'Kolkata' OR city = 'Barrackpore') AND is_active = TRUE"
  },
  {
    question: "Why is trailing comma elimination important when writing `CREATE TABLE` scripts?",
    shortAnswer: "In standard SQL grammar, a trailing comma before the closing parenthesis `)` is a syntax error (Error 1064) that halts script execution.",
    explanation: "Clean comma formatting prevents common DDL deployment failures.",
    hint: "Trailing commas before ')' cause syntax Error 1064.",
    level: "basic"
  },
  {
    question: "What is the recommended practice for table naming: singular (e.g. `student`) or plural (`students`)?",
    shortAnswer: "Most production SQL style guides recommend **plural table names** (`students`, `orders`, `courses`) because a table represents a collection/set of entity instances. The key rule is strict consistency throughout the schema.",
    explanation: "Pick a convention (preferably plural) and apply it consistently across all tables.",
    hint: "Plural table names representing entity collections; maintain strict consistency.",
    level: "basic"
  },
  {
    question: "Why should you never write unparameterized string concatenations in application SQL queries?",
    shortAnswer: "Because concatenating user input directly into SQL strings creates severe **SQL Injection (SQLi)** vulnerabilities. Always use prepared statements with parameterized placeholders (`?`).",
    explanation: "Primary defense against malicious database manipulation.",
    hint: "String concatenation causes SQL injection vulnerabilities; use parameterized queries.",
    level: "expert"
  },
  {
    question: "What is the benefit of defining `ENGINE=InnoDB` explicitly on all `CREATE TABLE` statements?",
    shortAnswer: "It guarantees that the table is created using MySQL's transactional, crash-safe, foreign-key-supporting storage engine, regardless of server default settings.",
    explanation: "Prevents legacy non-transactional engine defaults on misconfigured servers.",
    hint: "Ensures ACID transactions and foreign key enforcement explicitly.",
    level: "basic"
  },
  {
    question: "Why should `AUTO_INCREMENT` primary keys always be defined as `INT UNSIGNED` or `BIGINT UNSIGNED`?",
    shortAnswer: "Because primary key IDs are never negative numbers; using `UNSIGNED` doubles the positive integer capacity up to 4.29 billion IDs for `INT` and $1.84 \times 10^{19}$ for `BIGINT`.",
    explanation: "Eliminates wasted negative range in surrogate keys.",
    hint: "Doubles positive ID capacity by discarding unnecessary negative range.",
    level: "expert"
  },
  {
    question: "How should long `SELECT` projection lists be formatted for clean code reviews?",
    shortAnswer: "Place each selected column on a separate indented line with trailing commas, and place `FROM` on the next unindented line.",
    explanation: "Makes diffs clean in Git version control when columns are added or removed.",
    hint: "One column per line makes Git diffs clean and easy to review.",
    level: "basic"
  },
  {
    question: "Why should you avoid using reserved words (like `user`, `date`, `order`, `rank`) as column names?",
    shortAnswer: "Because they require backtick quoting everywhere they appear; forgetting backticks causes syntax Error 1064 and confuses developers and ORMs.",
    explanation: "Use descriptive non-reserved names like `user_account`, `order_date`, `student_rank`.",
    hint: "Requires backtick escaping everywhere; use descriptive non-reserved names instead.",
    level: "basic"
  },
  {
    question: "What is the purpose of code review in database engineering teams?",
    shortAnswer: "To catch missing indexes, verify constraint completeness, eliminate `SELECT *`, enforce style conventions, and ensure queries will perform well under high production loads.",
    explanation: "Prevents poorly optimized queries from reaching production servers.",
    hint: "Ensures security, performance, constraint integrity, and style consistency.",
    level: "basic"
  },
  {
    question: "Why is `IS NULL` mandatory instead of `= NULL` in SQL code reviews?",
    shortAnswer: "Under ANSI SQL three-valued logic, `= NULL` evaluates to `UNKNOWN` (falsy) for every row. Code reviewers must reject any query using `= NULL` as an outright bug.",
    explanation: "Always enforce IS NULL or IS NOT NULL during code review.",
    hint: "= NULL is an invalid comparison that always evaluates to UNKNOWN.",
    level: "basic"
  },
  {
    question: "How do you ensure deterministic sorting when paginating with `LIMIT` and `OFFSET`?",
    shortAnswer: "Always include a unique tie-breaker column (such as Primary Key `id`) in the `ORDER BY` clause (`ORDER BY created_at DESC, id DESC`).",
    explanation: "Non-deterministic sorting causes duplicate or skipped rows between pagination pages.",
    hint: "Include primary key as tie-breaker in ORDER BY for deterministic pagination.",
    level: "expert"
  },
  {
    question: "What is the danger of executing bulk `UPDATE` or `DELETE` without wrapping them in a transaction in production?",
    shortAnswer: "If an error occurs midway or if the wrong WHERE filter was applied, changes cannot be rolled back, causing permanent data loss.",
    explanation: "Transactions provide rollback safety nets during manual database maintenance.",
    hint: "Without transactions, accidental changes cannot be undone with ROLLBACK.",
    level: "basic"
  },
  {
    question: "Why should `DEFAULT` values be specified on non-mandatory columns?",
    shortAnswer: "To ensure predictable fallback values when columns are omitted in insert statements, simplifying application payload requirements.",
    explanation: "Provides clean baseline values directly from schema metadata.",
    hint: "Provides automatic fallback values without requiring application logic.",
    level: "basic"
  },
  {
    question: "How should boolean columns be named for clarity in code reviews?",
    shortAnswer: "Use prefix verbs like `is_active`, `has_paid`, `can_enroll`, or `is_verified` so that the column name reads naturally as a true/false condition.",
    explanation: "Self-documenting boolean naming conventions prevent ambiguity.",
    hint: "Prefix boolean flags with is_, has_, or can_ (e.g. is_active).",
    level: "basic"
  },
  {
    question: "What is the recommended approach for organizing large DDL migration scripts?",
    shortAnswer: "1) Drop child tables first, 2) Create parent tables first, 3) Create child tables with named foreign keys, 4) Seed reference data, 5) Verify with diagnostic checks.",
    explanation: "Topological ordering ensures error-free script execution.",
    hint: "Topological order: parent tables before child tables, with clean seed batches.",
    level: "basic"
  },
  {
    question: "Why is explicit `CHECK` constraint enforcement valuable even when backend code has validation?",
    shortAnswer: "Because it provides **Defense in Depth**—even if an API bug, rogue script, or manual database edit bypasses backend checks, the storage engine rejects corrupt data.",
    explanation: "The database is the ultimate guardian of data integrity.",
    hint: "Defense in depth protects the database from bugs in external applications.",
    level: "expert"
  },
  {
    question: "How do you verify whether a query is using indexes properly before approving a pull request?",
    shortAnswer: "Run `EXPLAIN query;` in MySQL Workbench or CLI and check that the access type is not `ALL` (full table scan) on large tables.",
    explanation: "EXPLAIN provides execution plan diagnostics during code review.",
    hint: "Run EXPLAIN to verify index usage and ensure access type is not ALL.",
    level: "basic"
  },
  {
    question: "Why should `SET SQL_SAFE_UPDATES = 1;` be kept enabled in developer tools?",
    shortAnswer: "It prevents catastrophic accidental table wipes by requiring key columns in `WHERE` clauses for `UPDATE` and `DELETE` operations.",
    explanation: "Built-in safeguard against missing WHERE clauses.",
    hint: "Blocks unintended table-wide updates and deletions in workbench sessions.",
    level: "basic"
  },
  {
    question: "What is the difference between `-- ` and `#` comments in MySQL?",
    shortAnswer: "`-- ` is the standard ANSI SQL comment (requires a trailing space after the two dashes); `#` is a MySQL-specific non-standard comment. Standard `-- ` is preferred for portability.",
    explanation: "Use standard ANSI `-- ` for cross-RDBMS portability.",
    hint: "Use standard ANSI -- (with trailing space) for cross-database portability.",
    level: "basic"
  },
  {
    question: "What is the ultimate objective of enforcing SQL code review and formatting standards?",
    shortAnswer: "To produce robust, readable, secure, and maintainable database schemas and queries that scale effortlessly as applications grow from dozens to millions of users.",
    explanation: "Professional craftsmanship turns raw SQL into enterprise-grade software assets.",
    hint: "Building maintainable, robust, and scalable database systems.",
    level: "basic"
  }
];

export default questions;
