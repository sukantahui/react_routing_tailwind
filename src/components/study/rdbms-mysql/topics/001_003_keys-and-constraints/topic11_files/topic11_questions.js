// topic11_files/topic11_questions.js

const questions = [
  {
    question: "Why should database developers explicitly name table constraints using `CONSTRAINT symbol_name`?",
    shortAnswer: "Explicit names make error messages self-documenting, improve schema maintainability, and allow deterministic dropping/altering during database migrations.",
    explanation: "Omitting names causes MySQL to generate random symbols like `table_ibfk_1` which vary across environments.",
    hint: "Self-documenting error messages and reliable migration scripts.",
    level: "basic",
    codeExample: "CONSTRAINT fk_payments_student FOREIGN KEY (student_id) REFERENCES students(student_id)"
  },
  {
    question: "What are the industry-standard naming prefixes for Primary Keys, Foreign Keys, Unique Keys, and CHECK constraints?",
    shortAnswer: "`pk_` for Primary Keys, `fk_` for Foreign Keys, `uq_` for Unique Keys, and `chk_` for CHECK constraints.",
    explanation: "Standard prefixes enable rapid identification of constraint types in code and error logs.",
    hint: "pk_, fk_, uq_, chk_ prefixes.",
    level: "basic"
  },
  {
    question: "What is the uniqueness scope of Foreign Key constraint names in MySQL?",
    shortAnswer: "Foreign Key constraint names must be UNIQUE across the ENTIRE database schema (not just per table).",
    explanation: "Two tables in the same database cannot share the same foreign key symbol name.",
    hint: "Database schema-wide uniqueness.",
    level: "moderate"
  },
  {
    question: "What error occurs if two tables in the same database use the identical Foreign Key constraint name?",
    shortAnswer: "Error 1005 (HY000): 'Can't create table ... (errno: 121 Duplicate key on write or duplicate FK name)'.",
    explanation: "MySQL schema dictionary enforces global uniqueness on foreign key symbols.",
    hint: "Error 1005 duplicate FK symbol name.",
    level: "moderate"
  },
  {
    question: "What is the recommended naming pattern for Foreign Key constraints?",
    shortAnswer: "`fk_childtable_parenttable` (or `fk_childtable_columnname`).",
    explanation: "Instantly communicates which child table points to which parent master entity.",
    hint: "fk_child_parent pattern.",
    level: "basic",
    codeExample: "CONSTRAINT fk_order_items_orders FOREIGN KEY (order_id) REFERENCES orders(order_id)"
  },
  {
    question: "How do you inspect the names of all constraints defined on a table in MySQL?",
    shortAnswer: "Query `information_schema.TABLE_CONSTRAINTS` where `TABLE_SCHEMA = 'db_name'` and `TABLE_NAME = 'table_name'`.",
    explanation: "Returns constraint names and constraint types (PRIMARY KEY, UNIQUE, FOREIGN KEY, CHECK).",
    hint: "information_schema.TABLE_CONSTRAINTS query.",
    level: "basic",
    codeExample: "SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE\nFROM information_schema.TABLE_CONSTRAINTS\nWHERE TABLE_NAME = 'students';"
  },
  {
    question: "Can a `NOT NULL` constraint be assigned an explicit constraint symbol name in MySQL DDL?",
    shortAnswer: "No, `NOT NULL` is an inline column attribute modifier rather than a standalone named constraint object in MySQL.",
    explanation: "Named constraints apply to Primary Keys, Foreign Keys, Unique Keys, and CHECK constraints.",
    hint: "Inline column attribute modifier.",
    level: "moderate"
  },
  {
    question: "How does an explicit CHECK constraint name improve developer productivity when a violation occurs?",
    shortAnswer: "Instead of a generic `Check constraint 'students_chk_1' is violated`, the error reads `Check constraint 'chk_students_fee_floor' is violated`, immediately pinpointing the broken business rule.",
    explanation: "Eliminates time spent looking up schema definitions.",
    hint: "Self-explanatory error diagnostics.",
    level: "basic"
  },
  {
    question: "How do you drop an explicitly named CHECK constraint using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE table_name DROP CHECK constraint_name;`.",
    explanation: "The explicit name enables single-line dropping.",
    hint: "ALTER TABLE DROP CHECK name.",
    level: "basic",
    codeExample: "ALTER TABLE students DROP CHECK chk_student_fee_floor;"
  },
  {
    question: "How do you drop an explicitly named Foreign Key constraint using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE table_name DROP FOREIGN KEY constraint_name;`.",
    explanation: "Detaches the referential rule cleanly.",
    hint: "ALTER TABLE DROP FOREIGN KEY name.",
    level: "basic",
    codeExample: "ALTER TABLE student_payments DROP FOREIGN KEY fk_payments_student;"
  },
  {
    question: "What happens if you name a Primary Key constraint `CONSTRAINT pk_students PRIMARY KEY (id)` in MySQL?",
    shortAnswer: "Table creation succeeds, but MySQL InnoDB always internally registers the clustered primary key index name as `'PRIMARY'`.",
    explanation: "InnoDB standardizes the Primary Key identifier to 'PRIMARY' while accepting the ANSI syntax.",
    hint: "InnoDB internally uses PRIMARY.",
    level: "expert"
  },
  {
    question: "What is the maximum character length for a constraint identifier name in MySQL?",
    shortAnswer: "64 characters (the standard MySQL identifier length limit).",
    explanation: "Constraint symbols exceeding 64 characters throw Error 1059 (Identifier name too long).",
    hint: "64-character identifier limit.",
    level: "expert"
  },
  {
    question: "How do you drop an explicitly named UNIQUE constraint in MySQL?",
    shortAnswer: "`ALTER TABLE table_name DROP INDEX constraint_name;` (or `DROP KEY constraint_name;`).",
    explanation: "Unique constraints are implemented as secondary indexes in MySQL.",
    hint: "ALTER TABLE DROP INDEX constraint_name.",
    level: "moderate",
    codeExample: "ALTER TABLE students DROP INDEX uq_student_email;"
  },
  {
    question: "Why do automated database migration tools (e.g. Liquibase, Flyway, Prisma, TypeORM) require explicit constraint names?",
    shortAnswer: "Because auto-generated constraint names vary across different database environments (Dev, QA, Staging, Prod), breaking rollback and drop migration scripts.",
    explanation: "Deterministic constraint names guarantee identical schema state across all CI/CD pipelines.",
    hint: "Deterministic migrations across Dev, QA, and Production.",
    level: "expert"
  },
  {
    question: "What is the recommended naming pattern for composite Unique constraints spanning multiple columns?",
    shortAnswer: "`uq_tablename_col1_col2` (e.g. `uq_enrollments_student_course`).",
    explanation: "Explicitly identifies which column combination forms the unique tuple.",
    hint: "uq_table_col1_col2 pattern.",
    level: "basic",
    codeExample: "CONSTRAINT uq_enrollments_student_course UNIQUE (student_id, course_id)"
  },
  {
    question: "Can constraint symbol names contain spaces or special characters?",
    shortAnswer: "Yes, if enclosed in backticks (e.g. ``CONSTRAINT `fk-student-payment` ``), but standard snake_case without backticks is strongly recommended.",
    explanation: "Snake_case avoids escaping issues in migration CLI scripts.",
    hint: "Backticks allow special characters, but snake_case is best practice.",
    level: "moderate"
  },
  {
    question: "Where in the `CREATE TABLE` syntax should table-level named constraints be placed?",
    shortAnswer: "At the end of the column list, separated by commas, before the closing parenthesis.",
    explanation: "Keeps column definitions clean and groups relational rules together.",
    hint: "At the end of the column definition block.",
    level: "basic"
  },
  {
    question: "How do you add an explicitly named Foreign Key to an existing table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE child_table ADD CONSTRAINT fk_name FOREIGN KEY (col) REFERENCES parent_table(id);`.",
    explanation: "Standard syntax for establishing named relationships post table creation.",
    hint: "ALTER TABLE ADD CONSTRAINT fk_name.",
    level: "basic",
    codeExample: "ALTER TABLE student_payments ADD CONSTRAINT fk_payments_student\nFOREIGN KEY (student_id) REFERENCES students(student_id);"
  },
  {
    question: "How do you check which columns participate in a named constraint in MySQL?",
    shortAnswer: "Query `information_schema.KEY_COLUMN_USAGE` where `CONSTRAINT_NAME = 'target_constraint'`.",
    explanation: "Lists participating columns, ordinal positions, and referenced parent keys.",
    hint: "information_schema.KEY_COLUMN_USAGE.",
    level: "moderate",
    codeExample: "SELECT COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME\nFROM information_schema.KEY_COLUMN_USAGE\nWHERE CONSTRAINT_NAME = 'fk_payments_student';"
  },
  {
    question: "What happens if you define a column-level foreign key without the `CONSTRAINT` keyword?",
    shortAnswer: "MySQL creates the foreign key but assigns an auto-generated symbol name like `tablename_ibfk_1`.",
    explanation: "Always prefix with `CONSTRAINT fk_name` to prevent random naming.",
    hint: "Auto-generated ibfk symbol.",
    level: "basic"
  },
  {
    question: "Can two different tables in the same schema have CHECK constraints with the same name in MySQL 8.0?",
    shortAnswer: "Yes, CHECK constraint names only need to be unique per table, but best practice is keeping them globally unique across the schema (`chk_tablename_rule`).",
    explanation: "Table-level scoping for CHECK vs schema-level for FKs.",
    hint: "Per-table uniqueness for CHECK constraints.",
    level: "expert"
  },
  {
    question: "Can an `ALTER TABLE` statement add multiple named constraints in a single command?",
    shortAnswer: "Yes, you can separate multiple `ADD CONSTRAINT` clauses with commas in a single `ALTER TABLE` statement.",
    explanation: "Applies all constraints in a single atomic table modification.",
    hint: "Multiple ADD CONSTRAINT clauses in one statement.",
    level: "moderate",
    codeExample: "ALTER TABLE students\n    ADD CONSTRAINT uq_email UNIQUE (email),\n    ADD CONSTRAINT chk_fee CHECK (admission_fee >= 10000.00);"
  },
  {
    question: "How does `SHOW CREATE TABLE table_name;` display named constraints?",
    shortAnswer: "It outputs the exact `CONSTRAINT \`symbol_name\` ...` DDL syntax for all Primary, Foreign, Unique, and CHECK constraints.",
    explanation: "Displays canonical schema representation.",
    hint: "SHOW CREATE TABLE output format.",
    level: "basic",
    codeExample: "SHOW CREATE TABLE student_admissions;"
  },
  {
    question: "What is the recommended naming pattern for Self-Referencing Foreign Keys?",
    shortAnswer: "`fk_tablename_parent` or `fk_employees_manager`.",
    explanation: "Clearly designates hierarchical parent-child relationships within the same entity.",
    hint: "fk_table_parent pattern.",
    level: "basic",
    codeExample: "CONSTRAINT fk_employees_manager FOREIGN KEY (manager_id) REFERENCES employees(employee_id)"
  },
  {
    question: "Why should constraint names avoid reserved SQL keywords (e.g. `CONSTRAINT check ...`)?",
    shortAnswer: "Using reserved keywords causes syntax parser errors unless continuously escaped with backticks.",
    explanation: "Use descriptive domain names instead.",
    hint: "Avoid reserved keywords to prevent parsing errors.",
    level: "basic"
  },
  {
    question: "Can you rename an existing constraint without dropping and re-creating it in MySQL 8.0?",
    shortAnswer: "In MySQL 8.0, you can rename indexes (which renames Unique constraints: `ALTER TABLE tbl RENAME INDEX old TO new`), but Foreign Keys and CHECK constraints must be dropped and re-added.",
    explanation: "RENAME INDEX works for Unique and secondary keys.",
    hint: "RENAME INDEX for unique keys; drop and re-add for FK/CHECK.",
    level: "expert",
    codeExample: "ALTER TABLE students RENAME INDEX uq_old_email TO uq_student_email;"
  },
  {
    question: "How does explicit constraint naming benefit ORM schema generation (e.g. Prisma or Hibernate)?",
    shortAnswer: "It ensures that code-generated migrations map directly to existing database constraints without causing drop-and-recreate index thrashing.",
    explanation: "Maintains schema synchronization between application code and database.",
    hint: "Prevents ORM migration thrashing.",
    level: "expert"
  },
  {
    question: "What is the risk of using truncated or cryptic constraint names like `c1`, `fk1`, `u1`?",
    shortAnswer: "They make debugging production incident logs tedious because engineers cannot deduce what business rule failed without searching information_schema.",
    explanation: "Cryptic symbols hurt team maintainability.",
    hint: "Loss of self-documenting error clarity.",
    level: "basic"
  },
  {
    question: "How do you verify whether a specific constraint name is already in use in a database before adding it?",
    shortAnswer: "Query `information_schema.TABLE_CONSTRAINTS` where `CONSTRAINT_SCHEMA = 'db_name'` and `CONSTRAINT_NAME = 'candidate_name'`.",
    explanation: "Confirms symbol availability before running migrations.",
    hint: "information_schema.TABLE_CONSTRAINTS pre-check.",
    level: "moderate",
    codeExample: "SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS\nWHERE CONSTRAINT_SCHEMA = 'college_db' AND CONSTRAINT_NAME = 'fk_payments_student';"
  },
  {
    question: "What is the recommended checklist for naming table constraints in enterprise MySQL schemas?",
    shortAnswer: "1) Use standard prefixes (`pk_`, `fk_`, `uq_`, `chk_`). 2) Use `fk_child_parent` for all Foreign Keys. 3) Keep Foreign Key symbols globally unique across the schema. 4) Use `uq_table_col` for Unique keys and `chk_table_rule` for CHECKs. 5) Declare named constraints at the table level in all DDL scripts.",
    explanation: "Following these 5 rules guarantees crystal-clear error logs, painless CI/CD migrations, and self-documenting databases.",
    hint: "Standard prefixes, fk_child_parent, Global uniqueness, Self-documenting symbols, Table-level DDL.",
    level: "basic"
  }
];

export default questions;
