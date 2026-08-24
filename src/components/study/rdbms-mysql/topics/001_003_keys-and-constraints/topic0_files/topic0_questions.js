// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is Data Integrity in relational database management systems?",
    shortAnswer: "The overall accuracy, completeness, consistency, and reliability of data across the database lifecycle.",
    explanation: "Data integrity ensures that stored data complies with all business rules, mathematical constraints, and relational linkages.",
    hint: "Accuracy, completeness, and consistency of data.",
    level: "basic"
  },
  {
    question: "What are the four primary pillars of Relational Data Integrity?",
    shortAnswer: "1. Entity Integrity, 2. Domain Integrity, 3. Referential Integrity, and 4. User-Defined (Enterprise) Integrity.",
    explanation: "These four tiers govern unique row identification, valid column value ranges, parent-child relationships, and custom business rules.",
    hint: "Entity, Domain, Referential, and User-Defined.",
    level: "basic"
  },
  {
    question: "What is Entity Integrity and how is it enforced in MySQL?",
    shortAnswer: "It guarantees that every row in a table represents a unique, distinct entity, enforced via `PRIMARY KEY` and `UNIQUE` constraints.",
    explanation: "Entity integrity dictates that primary key columns cannot contain duplicate values and cannot contain NULL.",
    hint: "Uniqueness of table rows via Primary Keys.",
    level: "basic",
    codeExample: "CREATE TABLE students (\n    student_id INT AUTO_INCREMENT,\n    CONSTRAINT pk_students PRIMARY KEY (student_id)\n);"
  },
  {
    question: "What is Domain Integrity and what SQL constraints enforce it?",
    shortAnswer: "It ensures that column entries contain valid values conforming to defined data types, formats, and ranges, enforced via `NOT NULL`, `CHECK`, `DEFAULT`, and `ENUM`.",
    explanation: "Domain integrity prevents invalid data such as negative tuition fees or invalid gender strings.",
    hint: "Column-level validation rules.",
    level: "basic",
    codeExample: "CREATE TABLE students (\n    admission_fee DECIMAL(10, 2) NOT NULL DEFAULT 15000.00,\n    CONSTRAINT chk_fee CHECK (admission_fee >= 10000.00)\n);"
  },
  {
    question: "What is Referential Integrity and how is it maintained?",
    shortAnswer: "It ensures that relationships between tables remain synchronized, guaranteeing foreign keys in child tables point to valid primary keys in parent tables.",
    explanation: "Prevents orphaned child records (e.g. an order existing for a non-existent customer).",
    hint: "Parent-child table relationship consistency.",
    level: "basic",
    codeExample: "CONSTRAINT fk_enrollments_student\n    FOREIGN KEY (student_id) REFERENCES students(student_id)\n    ON DELETE RESTRICT;"
  },
  {
    question: "What is User-Defined (Enterprise) Integrity?",
    shortAnswer: "Custom business logic and validation rules that cannot be expressed purely through standard SQL constraints, enforced via Triggers, Stored Procedures, or application code.",
    explanation: "Examples include enforcing that a student cannot enroll in more than 6 courses per semester.",
    hint: "Custom procedural business rules.",
    level: "moderate"
  },
  {
    question: "Why is enforcing integrity at the database level superior to relying solely on application-layer validation?",
    shortAnswer: "Database constraints act as the ultimate source of truth, protecting data integrity against multi-language backends, direct SQL imports, bug regressions, and ETL scripts.",
    explanation: "Application validation can be bypassed by manual CLI scripts or alternate API microservices.",
    hint: "Single source of truth at the storage engine level.",
    level: "moderate"
  },
  {
    question: "What happens if an `INSERT` statement violates a `CHECK` constraint in MySQL 8.0?",
    shortAnswer: "MySQL immediately aborts the transaction with Error 3819 (HY000): 'Check constraint ... is violated'.",
    explanation: "MySQL 8.0 fully enforces CHECK constraints at the engine level.",
    hint: "Error 3819 CHECK constraint violation.",
    level: "moderate"
  },
  {
    question: "What happens if an `INSERT` statement provides a foreign key ID that does not exist in the parent table?",
    shortAnswer: "InnoDB rejects the insert with Error 1452 (23000): 'Cannot add or update a child row: a foreign key constraint fails'.",
    explanation: "Foreign key checks enforce referential existence before committing the child row.",
    hint: "Error 1452 foreign key failure.",
    level: "basic"
  },
  {
    question: "What is an 'Orphaned Record' in relational databases?",
    shortAnswer: "A record in a child table whose foreign key points to a primary key ID that no longer exists in the parent table.",
    explanation: "Orphaned records break referential integrity and cause NULL pointer exceptions in application code.",
    hint: "Child records with missing parent references.",
    level: "basic"
  },
  {
    question: "What role does the `NOT NULL` constraint play in Domain Integrity?",
    shortAnswer: "It guarantees that a column must have a concrete, populated value for every tuple, blocking NULL insertions.",
    explanation: "Mandatory fields like `first_name` or `email` require `NOT NULL`.",
    hint: "Disallowing missing values in columns.",
    level: "basic"
  },
  {
    question: "What is the function of the `DEFAULT` constraint in data integrity?",
    shortAnswer: "It provides an automatic fallback value when an `INSERT` statement omits data for that column.",
    explanation: "Ensures columns have sensible default values without requiring client-side population.",
    hint: "Automatic fallback values.",
    level: "basic",
    codeExample: "created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP"
  },
  {
    question: "What are the four standard Foreign Key referential actions in MySQL?",
    shortAnswer: "`CASCADE`, `RESTRICT`, `SET NULL`, and `NO ACTION`.",
    explanation: "These rules determine what happens to child rows when a parent row is deleted or updated.",
    hint: "CASCADE, RESTRICT, SET NULL, NO ACTION.",
    level: "moderate"
  },
  {
    question: "What does `ON DELETE CASCADE` do when a parent row is deleted?",
    shortAnswer: "It automatically deletes all matching child rows in the child table in the same transaction.",
    explanation: "Cascading deletions maintain referential integrity by cleaning up dependent child rows.",
    hint: "Automatic dependent child deletion.",
    level: "moderate",
    codeExample: "FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE"
  },
  {
    question: "What does `ON DELETE RESTRICT` (or `NO ACTION`) do when an attempt is made to delete a parent row?",
    shortAnswer: "It blocks the deletion and throws an error if ANY child records reference the parent row.",
    explanation: "Protects referenced master data (e.g. preventing the deletion of a student who is currently enrolled in active courses).",
    hint: "Blocking parent deletion if children exist.",
    level: "basic"
  },
  {
    question: "What does `ON DELETE SET NULL` do when a parent row is deleted?",
    shortAnswer: "It automatically sets the foreign key column in all matching child rows to `NULL` (requires the FK column to be nullable).",
    explanation: "Preserves child rows while disassociating them from the deleted parent.",
    hint: "Setting foreign keys to NULL upon parent deletion.",
    level: "moderate"
  },
  {
    question: "What is the effect of setting `foreign_key_checks = 0` in MySQL?",
    shortAnswer: "It temporarily disables foreign key validation, allowing bulk data loading or circular schema creation, but risks data corruption if left disabled.",
    explanation: "Must always be re-enabled immediately (`SET foreign_key_checks = 1;`).",
    hint: "Disabling FK validation for bulk ETL.",
    level: "expert",
    codeExample: "SET foreign_key_checks = 0;\n-- Bulk load tables\nSET foreign_key_checks = 1;"
  },
  {
    question: "How does strict SQL mode (`STRICT_TRANS_TABLES`) protect Domain Integrity?",
    shortAnswer: "It forces MySQL to reject invalid or truncated data with fatal errors rather than silently coercing or truncating strings with non-fatal warnings.",
    explanation: "Guarantees that only valid, schema-compliant data enters the database.",
    hint: "Fatal errors on invalid data instead of silent truncation.",
    level: "expert"
  },
  {
    question: "What is the difference between a `PRIMARY KEY` and a `UNIQUE` constraint in Entity Integrity?",
    shortAnswer: "A table can have only ONE `PRIMARY KEY` (which strictly forbids NULLs); a table can have MULTIPLE `UNIQUE` constraints (which allow NULLs).",
    explanation: "Both enforce uniqueness via B-Tree indexes, but primary keys define the physical clustered index in InnoDB.",
    hint: "One PK per table vs multiple UNIQUE keys.",
    level: "basic"
  },
  {
    question: "Can a `CHECK` constraint reference columns from other tables in MySQL 8.0?",
    shortAnswer: "No, SQL standard `CHECK` constraints can only reference columns within the same row of the same table.",
    explanation: "Cross-table business validation requires MySQL Triggers or Stored Procedures.",
    hint: "Same-table row constraint limitation.",
    level: "expert"
  },
  {
    question: "What is a Composite Primary Key and when is it used for Entity Integrity?",
    shortAnswer: "A primary key composed of two or more columns (e.g. `PRIMARY KEY (student_id, course_id)`), used to enforce uniqueness in Many-to-Many junction tables.",
    explanation: "Guarantees that the combination of student and course is unique.",
    hint: "Multi-column primary key in junction tables.",
    level: "moderate",
    codeExample: "CREATE TABLE course_enrollments (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    PRIMARY KEY (student_id, course_id)\n);"
  },
  {
    question: "How does the `AUTO_INCREMENT` attribute support Entity Integrity?",
    shortAnswer: "It automatically generates a unique, sequential surrogate integer key for every newly inserted tuple without requiring manual ID management.",
    explanation: "Ensures every row receives a guaranteed distinct identifier.",
    hint: "Automatic sequential surrogate key generation.",
    level: "basic"
  },
  {
    question: "What is a Surrogate Key vs a Natural Key in relational modeling?",
    shortAnswer: "A Natural Key is a real-world business attribute (like Aadhaar Number or Roll Number); a Surrogate Key is an artificial system-generated ID (like `student_id INT AUTO_INCREMENT`).",
    explanation: "Surrogate keys isolate relational foreign keys from changing real-world business identifiers.",
    hint: "Artificial system ID vs real-world business attribute.",
    level: "moderate"
  },
  {
    question: "How do `ENUM` and `SET` data types enforce Domain Integrity?",
    shortAnswer: "They restrict column entries strictly to a predefined list of permitted string literals, rejecting any unlisted choices.",
    explanation: "`status ENUM('active', 'inactive')` blocks invalid values like 'pending' or 'deleted'.",
    hint: "Restricting input to permitted lists.",
    level: "basic",
    codeExample: "city ENUM('Barrackpore', 'Kolkata', 'Ichapur', 'Jadavpur') NOT NULL"
  },
  {
    question: "What is the naming convention for database constraints in enterprise schemas?",
    shortAnswer: "Prefixes like `pk_tablename` (Primary Key), `fk_child_parent` (Foreign Key), `uq_tablename_col` (Unique), and `chk_tablename_rule` (Check).",
    explanation: "Explicit constraint names simplify debugging when constraint violation errors are raised.",
    hint: "Explicit constraint naming prefixes.",
    level: "moderate",
    codeExample: "CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id)"
  },
  {
    question: "What happens if you insert a duplicate value into a `UNIQUE` column in MySQL?",
    shortAnswer: "MySQL aborts the insert with Error 1062 (23000): 'Duplicate entry ... for key ...'.",
    explanation: "Unique B-Tree secondary indexes reject duplicate non-null entries.",
    hint: "Error 1062 duplicate key.",
    level: "basic"
  },
  {
    question: "How can you inspect all defined table constraints and foreign keys on a table in MySQL?",
    shortAnswer: "Using `SHOW CREATE TABLE table_name;` or querying `information_schema.TABLE_CONSTRAINTS`.",
    explanation: "Lists constraint symbols, types, and column references.",
    hint: "SHOW CREATE TABLE or information_schema.",
    level: "moderate",
    codeExample: "SELECT * FROM information_schema.TABLE_CONSTRAINTS WHERE TABLE_NAME = 'students';"
  },
  {
    question: "Can a foreign key reference a column that is NOT a PRIMARY KEY in the parent table?",
    shortAnswer: "Yes, but the referenced parent column MUST have a `UNIQUE` constraint or unique index defined on it.",
    explanation: "Referential integrity requires that the target parent record is unambiguously unique.",
    hint: "Foreign keys can reference UNIQUE columns.",
    level: "expert"
  },
  {
    question: "What is the performance impact of maintaining Foreign Keys and Constraints in InnoDB?",
    shortAnswer: "Foreign keys require secondary index seeks during write operations (INSERT/UPDATE/DELETE) to verify parent presence, introducing slight write overhead in exchange for 100% data integrity.",
    explanation: "The integrity guarantees far outweigh the negligible microsecond lookup cost.",
    hint: "Write-time index verification overhead vs total data safety.",
    level: "expert"
  },
  {
    question: "What is the golden rule checklist for implementing Relational Data Integrity in production schemas?",
    shortAnswer: "1) Define an explicit `PRIMARY KEY` on every table. 2) Link related entities with `FOREIGN KEY` constraints. 3) Apply `NOT NULL` to mandatory fields. 4) Use `CHECK` constraints for numeric ranges. 5) Keep `STRICT_TRANS_TABLES` enabled.",
    explanation: "Following these 5 rules guarantees zero data corruption, orphaned records, or invalid states.",
    hint: "Primary Key, Foreign Key, NOT NULL, CHECK constraints, Strict Mode.",
    level: "basic"
  }
];

export default questions;
