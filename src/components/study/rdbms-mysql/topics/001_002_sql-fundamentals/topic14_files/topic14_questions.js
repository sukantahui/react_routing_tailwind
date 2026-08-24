// topic14_files/topic14_questions.js

const questions = [
  {
    question: "What does the `LIKE` operator do in MySQL?",
    shortAnswer: "It performs string pattern matching using wildcard characters against textual data columns.",
    explanation: "Allows searching for prefixes, suffixes, substrings, or specific character length templates.",
    hint: "Pattern matching predicate.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE first_name LIKE 'Mam%';"
  },
  {
    question: "What are the two standard SQL wildcards used with the `LIKE` operator?",
    shortAnswer: "`%` (matches zero, one, or multiple characters) and `_` (matches exactly one single character).",
    explanation: "`%` handles variable length patterns; `_` matches fixed character slot lengths.",
    hint: "Percent and underscore.",
    level: "basic"
  },
  {
    question: "Why is `WHERE col LIKE 'abc%'` fast (sargable) while `WHERE col LIKE '%abc'` is slow (non-sargable)?",
    shortAnswer: "Prefix searches (`'abc%'`) allow B-Tree indexes to navigate root-to-leaf in O(log N); leading wildcards (`'%abc'`) hide the starting letter, forcing a full table scan (ALL).",
    explanation: "B-Tree indexes sort text alphabetically from the first letter; without the first letter, index navigation is impossible.",
    hint: "B-Tree alphabetical prefix navigation.",
    level: "expert"
  },
  {
    question: "How do you search for a literal percent `%` or underscore `_` character in a `LIKE` pattern?",
    shortAnswer: "By escaping with a backslash (`\\%`, `\\_`) or defining an explicit `ESCAPE` character.",
    explanation: "`WHERE promo_code LIKE '10\\%%'` matches literal '10%' followed by any characters.",
    hint: "Backslash escaping.",
    level: "basic",
    codeExample: "SELECT * FROM discounts WHERE code LIKE 'DISC\\_20%';"
  },
  {
    question: "How does `NOT LIKE` work in MySQL?",
    shortAnswer: "It inverts the pattern match, returning rows that do NOT match the specified wildcard pattern.",
    explanation: "`WHERE email NOT LIKE '%@gmail.com'` finds non-Gmail accounts.",
    hint: "Pattern match inversion.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE email NOT LIKE '%@gmail.com';"
  },
  {
    question: "How does collation affect `LIKE` pattern matching in MySQL?",
    shortAnswer: "Under case-insensitive collations (`_ci`), `'mamata%'` matches `'Mamata'`; under binary collations (`_bin`), it requires exact case matching.",
    explanation: "Default UTF-8 collations in MySQL 8.0 are case-insensitive.",
    hint: "Case-insensitive vs binary collation rules.",
    level: "moderate",
    codeExample: "SELECT * FROM users WHERE username LIKE 'Admin%' COLLATE utf8mb4_bin;"
  },
  {
    question: "What does `WHERE col LIKE '___'` (three underscores) match?",
    shortAnswer: "Any string that is exactly 3 characters long.",
    explanation: "Each underscore matches exactly one character position.",
    hint: "Exact 3-character length filter.",
    level: "basic",
    codeExample: "SELECT * FROM product_codes WHERE code LIKE '___';"
  },
  {
    question: "What happens if you evaluate `NULL LIKE '%'` in SQL?",
    shortAnswer: "It evaluates to `UNKNOWN` (NULL) and is rejected by the WHERE clause.",
    explanation: "Even though `%` matches all characters, `NULL` is not a string and yields UNKNOWN.",
    hint: "NULL evaluates to UNKNOWN in LIKE.",
    level: "moderate"
  },
  {
    question: "What is the alternative to `LIKE '%keyword%'` for fast searching across large text bodies?",
    shortAnswer: "MySQL Full-Text Search with `FULLTEXT` indexes using `MATCH(...) AGAINST(...)`.",
    explanation: "Full-text indexes use inverted indexes, searching millions of words in milliseconds.",
    hint: "FULLTEXT inverted indexes.",
    level: "expert",
    codeExample: "SELECT * FROM articles WHERE MATCH(title, body) AGAINST('database' IN NATURAL LANGUAGE MODE);"
  },
  {
    question: "How do you match a string that starts with 'A' and ends with 'Z'?",
    shortAnswer: "`WHERE col LIKE 'A%Z'`.",
    explanation: "`A` prefix, arbitrary middle characters `%`, and `Z` suffix.",
    hint: "Prefix and suffix wildcard bounding.",
    level: "basic",
    codeExample: "SELECT * FROM words WHERE term LIKE 'A%Z';"
  },
  {
    question: "What is the difference between `LIKE` and `REGEXP` (or `RLIKE`) in MySQL?",
    shortAnswer: "`LIKE` uses simple SQL wildcards (`%`, `_`) across the entire string; `REGEXP` supports full POSIX regular expressions (`^`, `$`, `[0-9]`, etc.) matching substrings.",
    explanation: "`REGEXP` is vastly more expressive but cannot use standard B-Tree indexes.",
    hint: "Simple wildcards vs full regular expression engine.",
    level: "moderate",
    codeExample: "SELECT * FROM students WHERE phone_no REGEXP '^[6-9][0-9]{9}$';"
  },
  {
    question: "How do you specify a custom escape character in a `LIKE` pattern?",
    shortAnswer: "Using the `ESCAPE` keyword (e.g. `WHERE col LIKE '50!%' ESCAPE '!'`).",
    explanation: "Allows choosing any delimiter character instead of the default backslash.",
    hint: "ESCAPE keyword clause.",
    level: "moderate",
    codeExample: "SELECT * FROM sales WHERE margin LIKE '25!%%' ESCAPE '!';"
  },
  {
    question: "What is the return value of `SELECT 'Mamata' LIKE 'M%'` in MySQL?",
    shortAnswer: "`1` (representing boolean TRUE).",
    explanation: "'Mamata' begins with 'M'.",
    hint: "Boolean 1 outcome.",
    level: "basic"
  },
  {
    question: "What is the return value of `SELECT 'Mamata' LIKE 'M_mata'`?",
    shortAnswer: "`1` (TRUE) because the second character 'a' matches the single underscore wildcard.",
    explanation: "Underscore matches 'a' precisely.",
    hint: "Underscore single character match.",
    level: "basic"
  },
  {
    question: "What is the return value of `SELECT 'Mamata' LIKE 'M__mata'`?",
    shortAnswer: "`0` (FALSE) because two underscores require 2 characters between 'M' and 'mata'.",
    explanation: "'Mamata' only has 1 character between 'M' and 'mata'.",
    hint: "Character length mismatch.",
    level: "basic"
  },
  {
    question: "How does `LIKE` behave when comparing against numeric columns (e.g. `WHERE int_col LIKE '10%'`)?",
    shortAnswer: "MySQL implicitly converts the number to a string and matches the pattern, but this disables index range scans.",
    explanation: "Type coercion prevents B-Tree navigation.",
    hint: "Implicit string casting on numbers.",
    level: "moderate"
  },
  {
    question: "How do you find all students whose names contain 'an' anywhere in their name?",
    shortAnswer: "`WHERE first_name LIKE '%an%'`.",
    explanation: "Surrounding the pattern with `%` matches any preceding or succeeding characters.",
    hint: "Substring wildcard surrounding.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE first_name LIKE '%an%';"
  },
  {
    question: "Why does `WHERE name LIKE '%'` exclude records where `name` is NULL?",
    shortAnswer: "Because `NULL` is not matched by wildcard expressions in Three-Valued Logic.",
    explanation: "To include NULLs, write `WHERE name LIKE '%' OR name IS NULL`.",
    hint: "Wildcard does not match NULL.",
    level: "moderate"
  },
  {
    question: "Can `LIKE` be used with the `BINARY` keyword for fast case-sensitive matching?",
    shortAnswer: "Yes: `WHERE BINARY name LIKE 'Mamata%'`.",
    explanation: "Forces byte-by-byte ASCII comparison.",
    hint: "BINARY operator forcing case distinction.",
    level: "basic",
    codeExample: "SELECT * FROM users WHERE BINARY username LIKE 'Admin%';"
  },
  {
    question: "How do you match email addresses originating from any education institution (`.edu` or `.ac.in`)?",
    shortAnswer: "`WHERE email LIKE '%.edu' OR email LIKE '%.ac.in'`.",
    explanation: "Combines suffix pattern matches with OR.",
    hint: "Domain suffix matching.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE email LIKE '%.edu' OR email LIKE '%.ac.in';"
  },
  {
    question: "What is the difference between `LIKE ''` (empty string) and `LIKE '%'`?",
    shortAnswer: "`LIKE ''` matches only strings of zero length; `LIKE '%'` matches strings of any length (0 or more characters).",
    explanation: "`''` requires an exact empty string.",
    hint: "Empty string vs multi-character wildcard.",
    level: "basic"
  },
  {
    question: "How do you filter records where the second letter of a name is 'a'?",
    shortAnswer: "`WHERE name LIKE '_a%'`.",
    explanation: "First letter is any character `_`, second letter is `'a'`, followed by any remaining characters `%`.",
    hint: "Fixed second slot pattern.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE first_name LIKE '_a%';"
  },
  {
    question: "How does MySQL optimize `LIKE` when the pattern has no wildcards (e.g. `WHERE name LIKE 'Mamata'`)?",
    shortAnswer: "The query optimizer rewrites `LIKE 'Mamata'` to exact equality `name = 'Mamata'`, utilizing exact B-Tree point lookups (type: `ref` or `const`).",
    explanation: "Wildcard-free LIKE patterns are converted into exact equality.",
    hint: "Optimizer rewrite to equality.",
    level: "expert"
  },
  {
    question: "Can you combine `LIKE` with `CASE WHEN` statements?",
    shortAnswer: "Yes: `CASE WHEN email LIKE '%@gmail.com' THEN 'Consumer' ELSE 'Corporate' END AS email_type`.",
    explanation: "Evaluates patterns inside conditional expressions.",
    hint: "CASE WHEN pattern evaluation.",
    level: "basic",
    codeExample: "SELECT email, IF(email LIKE '%@codernaccotax.in', 'Internal', 'External') AS domain_type FROM students;"
  },
  {
    question: "How do you match phone numbers that begin with '+91' using `LIKE`?",
    shortAnswer: "`WHERE phone_no LIKE '+91%'`.",
    explanation: "Matches the country code prefix followed by digits.",
    hint: "Country code prefix matching.",
    level: "basic",
    codeExample: "SELECT * FROM contacts WHERE phone_no LIKE '+91%';"
  },
  {
    question: "What is the performance consequence of querying `WHERE description LIKE '%error%'` on a 10M row table?",
    shortAnswer: "It triggers a catastrophic full table scan reading tens of gigabytes of disk pages, locking memory and causing high query latency.",
    explanation: "Must be replaced with `FULLTEXT` indexing.",
    hint: "Leading wildcard full table scan penalty.",
    level: "expert"
  },
  {
    question: "Can the pattern in `LIKE` be a column reference rather than a literal string?",
    shortAnswer: "Yes: `WHERE user_input LIKE CONCAT('%', stored_pattern, '%')`.",
    explanation: "Dynamic pattern construction from table columns.",
    hint: "Column-derived dynamic patterns.",
    level: "moderate",
    codeExample: "SELECT * FROM logs l JOIN error_patterns p ON l.message LIKE CONCAT('%', p.pattern_str, '%');"
  },
  {
    question: "How do you search for records where a code ends with an underscore (`_`)?",
    shortAnswer: "`WHERE code LIKE '%\\_'` (escaped with backslash).",
    explanation: "Escaping ensures the underscore is treated literally rather than as a single-character wildcard.",
    hint: "Escaped trailing underscore.",
    level: "moderate",
    codeExample: "SELECT * FROM identifiers WHERE raw_id LIKE '%\\_';"
  },
  {
    question: "What is an 'Index Prefix Scan' when evaluating `LIKE 'Barrack%'`?",
    shortAnswer: "InnoDB searches the index B-Tree for keys starting with 'Barrack' and scans until keys begin with 'Barrack[next_char]', terminating without scanning the rest of the index.",
    explanation: "Extremely efficient B-Tree range seek.",
    hint: "Index prefix range seek.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist when using `LIKE` pattern matching in production?",
    shortAnswer: "1) Prefer prefix matching (`'prefix%'`) to keep queries sargable. 2) Escape literal `%` and `_` with `\\`. 3) Use `FULLTEXT` indexes for multi-word document searches. 4) Verify case-sensitivity via collation. 5) Use `NOT LIKE` for domain filtering.",
    explanation: "Following these 5 rules maximizes B-Tree index utilization and prevents unexpected wildcard matching bugs.",
    hint: "Prefix sargability, Backslash escaping, FULLTEXT alternatives, Collation awareness, NOT LIKE filtering.",
    level: "basic"
  }
];

export default questions;
