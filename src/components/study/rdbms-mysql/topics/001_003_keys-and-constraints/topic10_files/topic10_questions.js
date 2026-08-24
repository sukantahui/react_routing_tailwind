// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is the difference between an `ENUM` and a `SET` data type in MySQL?",
    shortAnswer: "`ENUM` allows choosing exactly ONE value from a permitted list; `SET` allows choosing ZERO, ONE, or MULTIPLE combined values from a permitted list.",
    explanation: "ENUM is mutually exclusive single-choice; SET is multi-choice bitmask.",
    hint: "Single-choice vs multi-choice combination.",
    level: "basic",
    codeExample: "status ENUM('active', 'inactive'),\nskills SET('MySQL', 'React', 'Python')"
  },
  {
    question: "How is an `ENUM` column stored physically inside MySQL storage engine files?",
    shortAnswer: "As a compact integer index (1 byte for lists up to 255 items; 2 bytes for lists up to 65,535 items).",
    explanation: "Saves massive disk and RAM compared to storing repeated VARCHAR strings.",
    hint: "1 or 2 byte integer index.",
    level: "moderate"
  },
  {
    question: "How is a `SET` column stored physically inside MySQL storage engine files?",
    shortAnswer: "As a compact bitmask integer (1 bit per member; up to 64 members occupying 1 to 8 bytes).",
    explanation: "Member combinations are stored as the bitwise OR of their binary powers of 2.",
    hint: "Bitmask integer representation.",
    level: "expert"
  },
  {
    question: "How does `ORDER BY` sort an `ENUM` column by default in MySQL?",
    shortAnswer: "It sorts by the INTERNAL INTEGER INDEX (the order elements were declared in the DDL), NOT alphabetically!",
    explanation: "To sort alphabetically, you must write `ORDER BY CAST(enum_col AS CHAR)`.",
    hint: "Internal index order sorting trap.",
    level: "moderate",
    codeExample: "SELECT * FROM students ORDER BY CAST(city AS CHAR) ASC;"
  },
  {
    question: "What function should be used to search for a specific value inside a `SET` column?",
    shortAnswer: "`FIND_IN_SET('target_value', set_column)`.",
    explanation: "Returns the 1-based index position of the member if found, or 0 if not found.",
    hint: "FIND_IN_SET function.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE FIND_IN_SET('React', skills) > 0;"
  },
  {
    question: "What happens if an `INSERT` supplies an invalid string value not present in the `ENUM` definition in strict SQL mode?",
    shortAnswer: "MySQL immediately rejects the insert with Error 1265 (Data truncated for column ...).",
    explanation: "Strict SQL mode (`STRICT_TRANS_TABLES`) enforces domain integrity.",
    hint: "Error 1265 in strict SQL mode.",
    level: "basic"
  },
  {
    question: "What happens if an invalid string is inserted into an `ENUM` in legacy non-strict mode?",
    shortAnswer: "MySQL inserts a special empty string error value `''` with an internal index of `0` and generates a warning.",
    explanation: "Legacy behavior superseded by modern strict mode.",
    hint: "Error index 0 in non-strict mode.",
    level: "expert"
  },
  {
    question: "Why is defining an ENUM with numeric string literals (e.g. `ENUM('1', '2', '3')`) considered an anti-pattern?",
    shortAnswer: "Because `1` refers to index 1 (value '1'), but `2` refers to index 2 (value '2'). Passing integers vs strings creates severe ambiguity and logic bugs.",
    explanation: "Avoid numbers as ENUM choices to prevent index vs value confusion.",
    hint: "Index vs numeric value confusion.",
    level: "expert"
  },
  {
    question: "What is the maximum number of distinct elements allowed in a single `ENUM` column in MySQL?",
    shortAnswer: "Up to 65,535 distinct elements.",
    explanation: "Represented by a 2-byte unsigned integer index.",
    hint: "65,535 elements limit.",
    level: "expert"
  },
  {
    question: "What is the maximum number of distinct members allowed in a single `SET` column in MySQL?",
    shortAnswer: "Up to 64 distinct members.",
    explanation: "Represented by a 64-bit integer bitmask (1 bit per member).",
    hint: "64 members limit.",
    level: "expert"
  },
  {
    question: "How do you insert multiple values into a `SET` column?",
    shortAnswer: "As a single comma-separated string without spaces: `'MySQL,React,Python'`.",
    explanation: "MySQL automatically parses the string and encodes the bitmask.",
    hint: "Comma-separated string literal.",
    level: "basic",
    codeExample: "INSERT INTO student_profiles (first_name, hobbies) VALUES ('Mamata', 'Coding,Music');"
  },
  {
    question: "What is the alternative to `ENUM` in standard ANSI SQL for cross-database portability?",
    shortAnswer: "`VARCHAR(N) CHECK (column_name IN ('VALUE1', 'VALUE2', ...))`.",
    explanation: "Provides identical domain enforcement while remaining 100% portable to PostgreSQL, Oracle, and SQL Server.",
    hint: "VARCHAR + CHECK constraint alternative.",
    level: "moderate",
    codeExample: "status VARCHAR(20) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE'))"
  },
  {
    question: "How do you add a new choice to an existing `ENUM` column using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE table_name MODIFY column_name ENUM('old1', 'old2', 'new3') NOT NULL;`.",
    explanation: "In MySQL 8.0, appending new elements to the END of an ENUM list is an Instant DDL metadata operation.",
    hint: "MODIFY column with expanded list.",
    level: "moderate",
    codeExample: "ALTER TABLE students MODIFY city ENUM('Barrackpore', 'Kolkata', 'Ichapur', 'Jadavpur', 'Naihati') NOT NULL;"
  },
  {
    question: "Why is appending a new ENUM element to the END of the list faster than inserting it into the middle in MySQL 8.0?",
    shortAnswer: "Appending to the end preserves existing integer index mappings, allowing `ALGORITHM=INSTANT` metadata alteration without rebuilding table rows.",
    explanation: "Inserting in the middle changes existing index numbers, forcing a slow table rebuild.",
    hint: "Preserves index mappings for instant DDL.",
    level: "expert"
  },
  {
    question: "Can an `ENUM` column accept `NULL` values?",
    shortAnswer: "Yes, unless declared `NOT NULL`. A NULL value has an internal index of `NULL`.",
    explanation: "Enables optional state modeling.",
    hint: "Nullable ENUM support.",
    level: "basic"
  },
  {
    question: "How can you query rows using bitwise operators on a `SET` column?",
    shortAnswer: "By using bitwise AND: `WHERE skills & 1;` (checks if the 1st declared member is active) or `WHERE skills & 5 = 5;` (checks if both 1st and 3rd are active).",
    explanation: "Fast bitwise filtering directly on internal integer values.",
    hint: "Bitwise AND filtering on SET column.",
    level: "expert",
    codeExample: "SELECT * FROM employees WHERE permissions & 4 = 4;"
  },
  {
    question: "What happens if duplicate values are passed when inserting into a `SET` column (e.g. `'Music,Music,Coding'`)?",
    shortAnswer: "MySQL automatically deduplicates the entries and saves `'Coding,Music'` with no error.",
    explanation: "Bitwise OR operations are idempotent (`1 | 1 = 1`).",
    hint: "Automatic deduplication in SET values.",
    level: "moderate"
  },
  {
    question: "In what order does MySQL return the members of a `SET` column when queried?",
    shortAnswer: "In the exact order the members were defined in the table's DDL declaration, regardless of the order they were inserted.",
    explanation: "Standardized canonical output format.",
    hint: "Declaration order canonical formatting.",
    level: "expert"
  },
  {
    question: "How do you inspect the full list of allowed values for an `ENUM` column programmatically in MySQL?",
    shortAnswer: "By querying `COLUMN_TYPE` in `information_schema.COLUMNS` where `TABLE_NAME = 'students'` and `COLUMN_NAME = 'city'`.",
    explanation: "Returns the DDL definition string `enum('Barrackpore','Kolkata',...)`.",
    hint: "information_schema.COLUMNS COLUMN_TYPE.",
    level: "moderate",
    codeExample: "SELECT COLUMN_TYPE FROM information_schema.COLUMNS\nWHERE TABLE_SCHEMA = 'college_db' AND TABLE_NAME = 'students' AND COLUMN_NAME = 'city';"
  },
  {
    question: "Can an `ENUM` column participate in a `PRIMARY KEY` or `INDEX`?",
    shortAnswer: "Yes, ENUM columns can be indexed and included in Primary or Secondary keys. Index seeks use the compact integer index representation.",
    explanation: "Ultra-fast compact B-Tree indexing.",
    hint: "Indexed ENUM column support.",
    level: "basic"
  },
  {
    question: "How do you find all distinct values currently stored in an `ENUM` column in a populated table?",
    shortAnswer: "`SELECT DISTINCT enum_col FROM table_name;`.",
    explanation: "Returns only the values that are actively utilized by existing table rows.",
    hint: "SELECT DISTINCT on ENUM column.",
    level: "basic",
    codeExample: "SELECT DISTINCT city FROM students;"
  },
  {
    question: "Can a `SET` column be empty (contain 0 members)?",
    shortAnswer: "Yes, an empty string `''` represents an empty SET with an internal bitmask value of `0`.",
    explanation: "Indicates zero selected checkboxes.",
    hint: "Empty SET has bitmask 0.",
    level: "basic"
  },
  {
    question: "What is the storage overhead of a `SET` column with 8 members vs 24 members vs 64 members?",
    shortAnswer: "1 to 8 members = 1 byte; 9 to 16 members = 2 bytes; 17 to 24 members = 3 bytes; 25 to 32 members = 4 bytes; 33 to 64 members = 8 bytes.",
    explanation: "Storage scales by single bytes up to 8 bytes maximum.",
    hint: "1 to 8 bytes bitmask scaling.",
    level: "expert"
  },
  {
    question: "How does `LIKE` pattern matching perform on `ENUM` columns?",
    shortAnswer: "MySQL converts the ENUM string representation to match against the pattern, but this prevents efficient index range seeks.",
    explanation: "Direct equality comparisons (`= 'Barrackpore'`) are always preferred for index support.",
    hint: "Equality vs LIKE performance on ENUM.",
    level: "moderate"
  },
  {
    question: "Can a `DEFAULT` clause be defined on `ENUM` and `SET` columns?",
    shortAnswer: "Yes, e.g. `DEFAULT 'Barrackpore'` for ENUM, or `DEFAULT 'Coding,Music'` for SET.",
    explanation: "The default value must be a valid member defined in the type list.",
    hint: "DEFAULT on ENUM and SET columns.",
    level: "basic",
    codeExample: "academic_status ENUM('ENROLLED', 'ON_LEAVE', 'GRADUATED') NOT NULL DEFAULT 'ENROLLED'"
  },
  {
    question: "What is the primary drawback of using `SET` instead of a normalized Many-to-Many junction table in relational design?",
    shortAnswer: "`SET` violates First Normal Form (1NF) atomicity; you cannot easily add metadata per relationship (e.g. skill proficiency score) or foreign key references to members.",
    explanation: "Normalized junction tables are preferred for complex, evolving entity relationships.",
    hint: "1NF atomicity violation and lack of relationship metadata.",
    level: "expert"
  },
  {
    question: "What happens if you insert an integer `1` into an `ENUM('Barrackpore', 'Kolkata')` column?",
    shortAnswer: "MySQL interprets integer `1` as internal index 1 and inserts the string `'Barrackpore'`.",
    explanation: "Integer inputs map directly to 1-based ENUM index positions.",
    hint: "Integer inputs map to index positions.",
    level: "moderate"
  },
  {
    question: "How do you count how many members are selected in a `SET` column for a given row?",
    shortAnswer: "Using `BIT_COUNT(set_col + 0)`.",
    explanation: "`+ 0` converts the SET to its numeric bitmask; `BIT_COUNT()` counts the number of 1-bits.",
    hint: "BIT_COUNT on numeric SET bitmask.",
    level: "expert",
    codeExample: "SELECT student_name, BIT_COUNT(hobbies + 0) AS total_hobbies FROM student_profiles;"
  },
  {
    question: "Can `ENUM` values contain spaces or special characters in MySQL?",
    shortAnswer: "Yes, values can contain spaces, hyphens, and unicode characters when enclosed in single quotes: `ENUM('North 24 Parganas', 'South 24 Parganas')`.",
    explanation: "Enclosed in quotes in DDL.",
    hint: "Quoted string support with spaces.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for using ENUM and SET data types in production?",
    shortAnswer: "1) Use `ENUM` for fixed, rarely changing state machines. 2) Provide explicit `DEFAULT` values. 3) Append new ENUM items to the end of lists for Instant DDL. 4) Use `FIND_IN_SET()` or bitwise logic for SET queries. 5) Use `VARCHAR + CHECK` when cross-database portability is required.",
    explanation: "Following these 5 rules ensures maximum storage efficiency without DDL migration headaches.",
    hint: "Stable states, Explicit defaults, Instant DDL append, FIND_IN_SET queries, Portability alternative.",
    level: "basic"
  }
];

export default questions;
