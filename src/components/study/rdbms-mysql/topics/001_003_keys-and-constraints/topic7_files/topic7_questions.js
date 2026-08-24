// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is a CHECK constraint in MySQL?",
    shortAnswer: "A constraint that enforces domain business validation rules by ensuring column values satisfy a Boolean expression on INSERT and UPDATE.",
    explanation: "If the expression evaluates to FALSE, MySQL rejects the write operation with Error 3819.",
    hint: "Boolean business expression validation.",
    level: "basic",
    codeExample: "CONSTRAINT chk_min_fee CHECK (admission_fee >= 10000.00)"
  },
  {
    question: "In which MySQL version were CHECK constraints first enforced at runtime by the storage engine?",
    shortAnswer: "MySQL 8.0.16 (in MySQL 5.7 and earlier, they were parsed syntactically but silently ignored).",
    explanation: "MySQL 8.0.16+ fully evaluates and blocks CHECK constraint violations.",
    hint: "MySQL 8.0.16+ runtime enforcement.",
    level: "expert"
  },
  {
    question: "What error code is raised when an `INSERT` or `UPDATE` violates a `CHECK` constraint in MySQL 8.0?",
    shortAnswer: "Error 3819 (HY000): 'Check constraint ... is violated'.",
    explanation: "InnoDB aborts the operation and prevents committing invalid rows.",
    hint: "Error 3819.",
    level: "basic"
  },
  {
    question: "How does a `CHECK` constraint evaluate when a column value is `NULL`?",
    shortAnswer: "The expression evaluates to `UNKNOWN`, which is treated as SATISFIED (allowed) by SQL standards and MySQL.",
    explanation: "To reject both invalid numbers and NULLs, combine `CHECK` with `NOT NULL`.",
    hint: "UNKNOWN evaluates as satisfied in CHECK constraints.",
    level: "moderate"
  },
  {
    question: "What is a Multi-Column (Row-Level) CHECK Constraint?",
    shortAnswer: "A check constraint that validates logical conditions comparing two or more columns in the same row.",
    explanation: "Example: `CHECK (end_date >= start_date)` or `CHECK (final_total = subtotal - discount)`.",
    hint: "Comparing two columns within the same row.",
    level: "moderate",
    codeExample: "CONSTRAINT chk_dates CHECK (end_date >= start_date)"
  },
  {
    question: "Can a `CHECK` constraint reference columns in another table in MySQL 8.0?",
    shortAnswer: "No, SQL CHECK constraints can only reference columns within the same row of the same table. Cross-table rules require Triggers or Stored Procedures.",
    explanation: "Cross-table checks are prohibited to prevent expensive foreign table lookups on every row write.",
    hint: "Same-table row constraint limitation.",
    level: "expert"
  },
  {
    question: "Can subqueries be used inside a `CHECK` constraint expression in MySQL?",
    shortAnswer: "No, subqueries are strictly disallowed inside CHECK constraint expressions.",
    explanation: "Expressions must be pure scalar in-memory computations.",
    hint: "Subqueries prohibited in CHECK expressions.",
    level: "expert"
  },
  {
    question: "Can non-deterministic functions like `NOW()` or `RAND()` be used in `CHECK` constraints?",
    shortAnswer: "No, MySQL prohibits non-deterministic functions in CHECK constraints because row validity must remain deterministic over time and during replication.",
    explanation: "If `NOW()` were allowed, a valid row inserted today could become invalid tomorrow without any updates.",
    hint: "Deterministic functions only.",
    level: "expert"
  },
  {
    question: "How do you enforce that a `first_name` column is neither empty nor only spaces using a `CHECK` constraint?",
    shortAnswer: "`CONSTRAINT chk_name CHECK (TRIM(first_name) != '');`.",
    explanation: "TRIM strips leading and trailing whitespace before checking for empty string.",
    hint: "TRIM(col) != ''.",
    level: "basic",
    codeExample: "CONSTRAINT chk_name CHECK (TRIM(first_name) != '')"
  },
  {
    question: "How do you add a `CHECK` constraint to an existing table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE table_name ADD CONSTRAINT chk_name CHECK (expression);`.",
    explanation: "MySQL validates all existing rows in the table; if any row violates the rule, the ALTER TABLE fails.",
    hint: "ALTER TABLE ADD CONSTRAINT CHECK.",
    level: "basic",
    codeExample: "ALTER TABLE students ADD CONSTRAINT chk_gpa CHECK (gpa >= 0.00 AND gpa <= 4.00);"
  },
  {
    question: "How do you drop a `CHECK` constraint in MySQL 8.0?",
    shortAnswer: "`ALTER TABLE table_name DROP CHECK constraint_name;` (or `DROP CONSTRAINT constraint_name;`).",
    explanation: "Removes the validation rule from the table dictionary.",
    hint: "ALTER TABLE DROP CHECK constraint_name.",
    level: "moderate",
    codeExample: "ALTER TABLE students DROP CHECK chk_min_fee;"
  },
  {
    question: "Can a `CHECK` constraint be temporarily disabled without dropping it in MySQL 8.0?",
    shortAnswer: "Yes, using the `NOT ENFORCED` attribute: `ALTER TABLE tbl ALTER CHECK chk_name NOT ENFORCED;`.",
    explanation: "Enables fast bulk loading while preserving the constraint definition for future re-enabling.",
    hint: "NOT ENFORCED state toggle.",
    level: "expert",
    codeExample: "ALTER TABLE students ALTER CHECK chk_min_fee NOT ENFORCED;\n-- Bulk ETL operations\nALTER TABLE students ALTER CHECK chk_min_fee ENFORCED;"
  },
  {
    question: "How do you re-enable an un-enforced `CHECK` constraint in MySQL 8.0?",
    shortAnswer: "`ALTER TABLE table_name ALTER CHECK constraint_name ENFORCED;`.",
    explanation: "MySQL validates all existing rows and resumes active runtime enforcement.",
    hint: "ALTER CHECK ENFORCED.",
    level: "expert"
  },
  {
    question: "What is the naming convention for CHECK constraints in enterprise schemas?",
    shortAnswer: "`chk_tablename_rulename` (e.g. `chk_students_min_fee` or `chk_orders_date_seq`).",
    explanation: "Explicit naming makes constraint violation error messages immediately actionable.",
    hint: "chk_ prefix naming convention.",
    level: "basic",
    codeExample: "CONSTRAINT chk_students_admission_fee CHECK (admission_fee >= 10000.00)"
  },
  {
    question: "What happens if you omit the constraint name when creating a `CHECK` constraint?",
    shortAnswer: "MySQL automatically generates a system symbol name like `table_name_chk_1`.",
    explanation: "Best practice is explicit naming to facilitate migrations and drops.",
    hint: "Auto-generated symbol name fallback.",
    level: "basic"
  },
  {
    question: "Can a `CHECK` constraint validate string format patterns using regular expressions in MySQL 8.0?",
    shortAnswer: "Yes, MySQL 8.0 supports `REGEXP_LIKE()` in CHECK constraints: `CHECK (REGEXP_LIKE(email, '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,}$'))`.",
    explanation: "Enforces email or PAN card regex format directly in SQL.",
    hint: "REGEXP_LIKE() in CHECK expressions.",
    level: "expert",
    codeExample: "CONSTRAINT chk_pan CHECK (REGEXP_LIKE(pan_card, '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'))"
  },
  {
    question: "How does `CHECK (age BETWEEN 18 AND 60)` behave on edge values 18 and 60?",
    shortAnswer: "Both 18 and 60 are valid and permitted because `BETWEEN` is strictly inclusive of endpoints.",
    explanation: "Equivalent to `age >= 18 AND age <= 60`.",
    hint: "Inclusive range evaluation.",
    level: "basic"
  },
  {
    question: "Can a table have multiple `CHECK` constraints?",
    shortAnswer: "Yes, a table can have dozens of independent CHECK constraints verifying different column rules.",
    explanation: "All check constraints must evaluate to TRUE or UNKNOWN for the row to be inserted.",
    hint: "Multiple independent CHECK constraints per table.",
    level: "basic"
  },
  {
    question: "How do you inspect all CHECK constraints defined on a table in MySQL?",
    shortAnswer: "By querying `information_schema.CHECK_CONSTRAINTS` or `information_schema.TABLE_CONSTRAINTS`.",
    explanation: "Lists constraint names, expressions, and enforcement states.",
    hint: "information_schema.CHECK_CONSTRAINTS.",
    level: "moderate",
    codeExample: "SELECT * FROM information_schema.CHECK_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = 'college_db';"
  },
  {
    question: "What happens if a `CHECK` constraint contains an expression that always evaluates to `FALSE` (e.g. `CHECK (1 = 0)`)?",
    shortAnswer: "Table creation succeeds, but NO rows can ever be inserted into the table (all inserts fail with Error 3819).",
    explanation: "Creates an effectively read-only or insert-blocked table.",
    hint: "Unsatisfiable CHECK constraint blocks all writes.",
    level: "expert"
  },
  {
    question: "How does a `CHECK` constraint interact with `INSERT ... ON DUPLICATE KEY UPDATE`?",
    shortAnswer: "Both the initial `INSERT` values and the subsequent `UPDATE` values must satisfy all CHECK constraints; if either violates a rule, Error 3819 is thrown.",
    explanation: "Ensures data integrity during upsert operations.",
    hint: "Applies to both insert and update branches of upserts.",
    level: "expert"
  },
  {
    question: "Can a `CHECK` constraint validate that a column's value is in a list of allowed values using `IN`?",
    shortAnswer: "Yes, `CONSTRAINT chk_status CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED'))`.",
    explanation: "Alternative to ENUM data types with standard SQL compatibility.",
    hint: "CHECK with IN list expression.",
    level: "basic",
    codeExample: "CONSTRAINT chk_priority CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'))"
  },
  {
    question: "What is the difference between an `ENUM` column vs a `VARCHAR` with a `CHECK (col IN (...))` constraint?",
    shortAnswer: "`ENUM` stores values internally as 1 or 2-byte integer indexes; `VARCHAR + CHECK` stores full string text while enforcing ANSI SQL standard compliance.",
    explanation: "`VARCHAR + CHECK` is often favored in cross-database architectures.",
    hint: "Storage format vs ANSI SQL compatibility.",
    level: "expert"
  },
  {
    question: "Can a `CHECK` constraint reference `AUTO_INCREMENT` columns in MySQL?",
    shortAnswer: "No, referencing `AUTO_INCREMENT` columns in CHECK constraints is disallowed because auto-increment values are assigned during insertion.",
    explanation: "Engine evaluates checks before final auto-increment allocation.",
    hint: "AUTO_INCREMENT reference restriction.",
    level: "expert"
  },
  {
    question: "What is the performance overhead of CHECK constraints in MySQL InnoDB?",
    shortAnswer: "Negligible microsecond in-memory CPU evaluation during write operations (`INSERT` and `UPDATE`), with zero overhead on `SELECT` read queries.",
    explanation: "Evaluated in RAM using the internal expression engine.",
    hint: "Negligible write-time CPU evaluation.",
    level: "moderate"
  },
  {
    question: "How does `CHECK (start_date < end_date)` handle rows where either date is `NULL`?",
    shortAnswer: "The expression evaluates to `UNKNOWN`, which is accepted by MySQL. If both dates are required, mark both `NOT NULL`.",
    explanation: "Three-valued logic rules apply to all comparison operators.",
    hint: "NULL dates evaluate to UNKNOWN and pass.",
    level: "moderate"
  },
  {
    question: "Can a `CHECK` constraint be defined at the column level as well as table level?",
    shortAnswer: "Yes; column-level syntax is placed after column type (`age INT CHECK (age >= 18)`), while table-level syntax is placed at the end of the DDL definition.",
    explanation: "Table-level is required for multi-column rules.",
    hint: "Column-level vs table-level syntax.",
    level: "basic"
  },
  {
    question: "What happens if you run `ALTER TABLE ... ADD CONSTRAINT CHECK` and some existing rows violate the rule?",
    shortAnswer: "MySQL immediately aborts the `ALTER TABLE` with Error 3819 and does NOT create the constraint.",
    explanation: "Existing data must be cleaned up before adding constraints.",
    hint: "Existing invalid data blocks constraint creation.",
    level: "basic"
  },
  {
    question: "Can a `CHECK` constraint enforce that a student's `discount_fee` does not exceed their `admission_fee`?",
    shortAnswer: "Yes: `CONSTRAINT chk_discount CHECK (discount_fee <= admission_fee)`.",
    explanation: "Multi-column mathematical validation rule.",
    hint: "Cross-column numeric comparison.",
    level: "basic",
    codeExample: "CONSTRAINT chk_discount CHECK (discount_fee <= admission_fee)"
  },
  {
    question: "What is the recommended checklist for designing CHECK constraints in production MySQL tables?",
    shortAnswer: "1) Explicitly name every constraint (`CONSTRAINT chk_tablename_rule`). 2) Pair `CHECK` with `NOT NULL` to block NULL bypasses. 3) Use `CHECK (TRIM(col) != '')` on text columns. 4) Use `REGEXP_LIKE()` for format validation. 5) Use `NOT ENFORCED` during bulk migrations.",
    explanation: "Following these 5 rules guarantees that invalid business data can never enter your database.",
    hint: "Explicit naming, Pair with NOT NULL, Trim whitespace, Regex validation, Not Enforced in migrations.",
    level: "basic"
  }
];

export default questions;
