// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is the function of the `NOT NULL` constraint in MySQL?",
    shortAnswer: "It enforces that a column must always contain a concrete, valid value for every row, rejecting NULL insertions.",
    explanation: "`NOT NULL` prevents missing or unassigned values in mandatory fields.",
    hint: "Disallowing missing values in columns.",
    level: "basic",
    codeExample: "first_name VARCHAR(50) NOT NULL"
  },
  {
    question: "What error is raised when an application attempts to insert `NULL` into a `NOT NULL` column?",
    shortAnswer: "Error 1048 (23000): 'Column ... cannot be null'.",
    explanation: "InnoDB immediately aborts the insert and rolls back the transaction.",
    hint: "Error 1048.",
    level: "basic"
  },
  {
    question: "Does the `NOT NULL` constraint prevent inserting an empty string `''`?",
    shortAnswer: "No, an empty string `''` is a valid string of length zero, which satisfies the `NOT NULL` constraint.",
    explanation: "To forbid both NULL and empty strings, combine `NOT NULL` with a `CHECK (TRIM(col) != '')` constraint.",
    hint: "Empty strings are not NULL.",
    level: "basic"
  },
  {
    question: "Does the `NOT NULL` constraint prevent inserting a numerical zero `0`?",
    shortAnswer: "No, `0` is a concrete numerical integer and completely satisfies the `NOT NULL` constraint.",
    explanation: "Zero is a valid number, whereas NULL is the absence of a value.",
    hint: "Zero is a valid number, not NULL.",
    level: "basic"
  },
  {
    question: "How do you modify an existing nullable column to become `NOT NULL` using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE table_name MODIFY column_name data_type NOT NULL;`.",
    explanation: "Requires that all existing rows in that column already contain non-null values.",
    hint: "ALTER TABLE MODIFY col type NOT NULL.",
    level: "basic",
    codeExample: "ALTER TABLE students MODIFY admission_fee DECIMAL(10, 2) NOT NULL;"
  },
  {
    question: "What error occurs if you try to make a column `NOT NULL` when the table contains existing NULL records?",
    shortAnswer: "Error 1138 (22004): 'Invalid use of NULL value'.",
    explanation: "You must update all existing NULL rows with default values before adding the NOT NULL constraint.",
    hint: "Error 1138.",
    level: "moderate",
    codeExample: "UPDATE students SET phone_no = '0000000000' WHERE phone_no IS NULL;\nALTER TABLE students MODIFY phone_no VARCHAR(10) NOT NULL;"
  },
  {
    question: "Why does declaring columns as `NOT NULL` optimize storage and index performance in InnoDB?",
    shortAnswer: "InnoDB rows store a null bitmap for nullable columns; declaring columns `NOT NULL` reduces row header overhead and simplifies B-Tree comparison logic.",
    explanation: "Eliminates NULL check branches in CPU query evaluation routines.",
    hint: "Reduces null bitmap header overhead in InnoDB rows.",
    level: "expert"
  },
  {
    question: "What is the default nullability of a column in MySQL if neither `NULL` nor `NOT NULL` is specified?",
    shortAnswer: "Columns are nullable (`NULL`) by default, except for `PRIMARY KEY` columns which are implicitly `NOT NULL`.",
    explanation: "Best practice is explicitly declaring `NOT NULL` on mandatory columns.",
    hint: "Nullable by default.",
    level: "basic"
  },
  {
    question: "How does strict SQL mode (`STRICT_TRANS_TABLES`) affect `NOT NULL` violations during `INSERT`?",
    shortAnswer: "In strict mode, omitting a `NOT NULL` column without a `DEFAULT` throws fatal Error 1364; in legacy non-strict mode, it silently coerced the value to an implicit default (0 or '').",
    explanation: "Strict mode prevents accidental silent data corruption.",
    hint: "Fatal Error 1364 in strict SQL mode.",
    level: "expert"
  },
  {
    question: "How do you remove the `NOT NULL` constraint from a column to make it nullable again?",
    shortAnswer: "`ALTER TABLE table_name MODIFY column_name data_type NULL;`.",
    explanation: "Explicitly declaring `NULL` allows future rows to contain missing values.",
    hint: "ALTER TABLE MODIFY col type NULL.",
    level: "basic",
    codeExample: "ALTER TABLE students MODIFY middle_name VARCHAR(50) NULL;"
  },
  {
    question: "Can a `NOT NULL` column be combined with a `DEFAULT` clause?",
    shortAnswer: "Yes, `NOT NULL DEFAULT 'fallback'` ensures the column can never be NULL while automatically populating omitted values.",
    explanation: "Provides the best combination of data completeness and client flexibility.",
    hint: "NOT NULL combined with DEFAULT.",
    level: "basic",
    codeExample: "created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP"
  },
  {
    question: "What happens when you insert an explicit `NULL` into a column defined as `NOT NULL DEFAULT 'Active'`?",
    shortAnswer: "MySQL rejects the insert with Error 1048. The `DEFAULT` is only used when the column is OMITTED, not when `NULL` is explicitly passed.",
    explanation: "Explicit NULL overrides default value substitution in strict mode.",
    hint: "Explicit NULL rejects insert even if DEFAULT is present.",
    level: "expert"
  },
  {
    question: "How does `NOT NULL` simplify SQL expressions involving arithmetic operators?",
    shortAnswer: "It prevents mathematical calculations from returning `NULL` (since `100 + NULL` yields `NULL`).",
    explanation: "Eliminates the need for defensive `COALESCE()` wraps in application code.",
    hint: "Prevents calculation nullification.",
    level: "moderate"
  },
  {
    question: "How does `NOT NULL` prevent subtle bugs in `NOT IN (subquery)` predicates?",
    shortAnswer: "If the subquery returns a column that contains even a single `NULL`, `NOT IN` evaluates to `UNKNOWN` for all rows and returns an empty set. `NOT NULL` columns prevent this.",
    explanation: "A classic SQL trap resolved by enforcing NOT NULL on key columns.",
    hint: "NOT IN NULL evaluation trap.",
    level: "expert"
  },
  {
    question: "Can an `AUTO_INCREMENT` column be created without the `NOT NULL` constraint?",
    shortAnswer: "No, `AUTO_INCREMENT` columns in MySQL must always be indexed and strictly `NOT NULL`.",
    explanation: "Auto-increment sequences cannot generate NULL identifiers.",
    hint: "AUTO_INCREMENT requires NOT NULL.",
    level: "moderate"
  },
  {
    question: "How do you inspect which columns in a table have `NOT NULL` constraints in MySQL CLI?",
    shortAnswer: "Using `DESCRIBE table_name;` or `SHOW COLUMNS FROM table_name;` (inspect the `Null` column for `NO`).",
    explanation: "`Null: NO` indicates a NOT NULL constraint.",
    hint: "DESCRIBE table Null column indicator.",
    level: "basic",
    codeExample: "DESCRIBE students;"
  },
  {
    question: "Can a Foreign Key column be defined as `NOT NULL`?",
    shortAnswer: "Yes, making a foreign key `NOT NULL` establishes a mandatory (non-optional) relationship where every child record MUST belong to a parent.",
    explanation: "Mandatory relationships like `order_items` must always have an `order_id`.",
    hint: "Mandatory parent relationship.",
    level: "basic",
    codeExample: "order_id INT NOT NULL,\nCONSTRAINT fk_item_order FOREIGN KEY (order_id) REFERENCES orders(order_id)"
  },
  {
    question: "What happens to `ON DELETE SET NULL` if the foreign key column is defined as `NOT NULL`?",
    shortAnswer: "MySQL rejects the table definition with Error 1215 or 3780 because a `NOT NULL` column cannot be set to `NULL` on delete.",
    explanation: "Contradictory constraints are caught at table creation time.",
    hint: "Contradictory ON DELETE SET NULL on NOT NULL column.",
    level: "expert"
  },
  {
    question: "How does `NOT NULL` affect aggregate functions like `COUNT(column_name)` vs `COUNT(*)`?",
    shortAnswer: "On a `NOT NULL` column, `COUNT(col)` and `COUNT(*)` produce identical counts; on nullable columns, `COUNT(col)` ignores NULLs while `COUNT(*)` counts all rows.",
    explanation: "`NOT NULL` eliminates count discrepancies.",
    hint: "COUNT(col) vs COUNT(*) equivalence on NOT NULL.",
    level: "moderate"
  },
  {
    question: "Can a `GENERATED ALWAYS AS` column be defined as `NOT NULL`?",
    shortAnswer: "Yes, stored or virtual generated columns can be explicitly declared `NOT NULL`.",
    explanation: "Rejects inserts if the generated expression evaluates to NULL.",
    hint: "Generated column NOT NULL constraint.",
    level: "expert",
    codeExample: "full_name VARCHAR(100) GENERATED ALWAYS AS (CONCAT(first_name, ' ', last_name)) STORED NOT NULL"
  },
  {
    question: "How do you enforce that a text column is neither `NULL` nor whitespace in MySQL 8.0?",
    shortAnswer: "Declare the column `NOT NULL` and add a `CHECK (TRIM(col) != '')` constraint.",
    explanation: "Blocks nulls, empty strings, and strings containing only spaces.",
    hint: "Combine NOT NULL with CHECK(TRIM(col) != '').",
    level: "moderate",
    codeExample: "first_name VARCHAR(50) NOT NULL,\nCONSTRAINT chk_name CHECK (TRIM(first_name) != '')"
  },
  {
    question: "Why is declaring foreign keys `NOT NULL` recommended in Many-to-Many junction tables?",
    shortAnswer: "Because a junction row connecting two entities cannot exist without both parent foreign keys present.",
    explanation: "Guarantees valid tuple linkages.",
    hint: "Mandatory junction foreign keys.",
    level: "basic"
  },
  {
    question: "What is the recommended rule of thumb regarding column nullability in database schema design?",
    shortAnswer: "Make every column `NOT NULL` by default; only allow `NULL` when there is a concrete, justified business requirement for missing data.",
    explanation: "Prevents three-valued logic bugs and saves storage space.",
    hint: "NOT NULL by default design principle.",
    level: "basic"
  },
  {
    question: "How do you find all rows in a table where a nullable column currently contains NULL?",
    shortAnswer: "`SELECT * FROM table_name WHERE column_name IS NULL;`.",
    explanation: "Must use `IS NULL`, not `= NULL`.",
    hint: "WHERE col IS NULL.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE phone_no IS NULL;"
  },
  {
    question: "What is the memory size difference between storing a `NOT NULL` INT vs a nullable INT in InnoDB?",
    shortAnswer: "Both store a 4-byte integer, but nullable columns require 1 bit in the row's null bitmap header and extra branching logic during queries.",
    explanation: "Null bitmaps scale across all nullable columns in a row.",
    hint: "Row header null bitmap allocation.",
    level: "expert"
  },
  {
    question: "Can a `NOT NULL` constraint have an explicit constraint name in MySQL?",
    shortAnswer: "No, in MySQL DDL, `NOT NULL` is an inline column attribute modifier rather than a standalone named table constraint object.",
    explanation: "Named constraints apply to PRIMARY KEY, FOREIGN KEY, UNIQUE, and CHECK.",
    hint: "Inline column attribute modifier.",
    level: "moderate"
  },
  {
    question: "What happens if an `UPDATE` query sets a `NOT NULL` column to `NULL`?",
    shortAnswer: "MySQL immediately aborts the update with Error 1048 and preserves existing data.",
    explanation: "Constraint enforcement applies to all DML modifications.",
    hint: "Error 1048 on UPDATE.",
    level: "basic"
  },
  {
    question: "How do you safely alter a column to `NOT NULL` on a production table with millions of rows without table locks?",
    shortAnswer: "Using MySQL 8.0 `ALGORITHM=INPLACE` or tools like `pt-online-schema-change` / `gh-ost` after populating existing NULL values.",
    explanation: "Avoids long exclusive write locks on large active tables.",
    hint: "Online schema change with ALGORITHM=INPLACE.",
    level: "expert"
  },
  {
    question: "Can a JSON column be declared `NOT NULL` in MySQL?",
    shortAnswer: "Yes, `data JSON NOT NULL` ensures the column cannot contain SQL NULL (though it can contain the JSON literal `'null'`).",
    explanation: "SQL NULL represents column absence; JSON `'null'` is a valid JSON document.",
    hint: "SQL NULL vs JSON null distinction.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist when defining NOT NULL constraints in production schemas?",
    shortAnswer: "1) Default to `NOT NULL` for all columns. 2) Provide sensible `DEFAULT` values where appropriate. 3) Pair with `CHECK (TRIM(col) != '')` on text columns. 4) Ensure `STRICT_TRANS_TABLES` is enabled. 5) Populate legacy NULLs before running `ALTER TABLE MODIFY NOT NULL`.",
    explanation: "Following these 5 rules eliminates missing data corruption and three-valued logic bugs.",
    hint: "NOT NULL default, CHECK whitespace, Strict mode, Clean legacy data.",
    level: "basic"
  }
];

export default questions;
