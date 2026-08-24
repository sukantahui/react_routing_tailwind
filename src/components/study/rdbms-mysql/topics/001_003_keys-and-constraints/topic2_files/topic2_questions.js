// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is a FOREIGN KEY constraint in MySQL?",
    shortAnswer: "A column or combination of columns in a child table whose values must correspond to the PRIMARY KEY or UNIQUE key in a parent table.",
    explanation: "Foreign keys establish referential links between tables and prevent orphaned child records.",
    hint: "Relational parent-child link.",
    level: "basic",
    codeExample: "CONSTRAINT fk_payments_student\n    FOREIGN KEY (student_id) REFERENCES students(student_id);"
  },
  {
    question: "What is the difference between a Parent Table and a Child Table in a foreign key relationship?",
    shortAnswer: "The Parent Table contains the referenced Primary or Unique key; the Child Table contains the Foreign Key column that points back to the parent.",
    explanation: "In `students` (parent) and `payments` (child), payments reference students.",
    hint: "Referenced parent vs referencing child.",
    level: "basic"
  },
  {
    question: "What are the strict data type matching prerequisites between a Foreign Key and the referenced Primary Key?",
    shortAnswer: "They must have identical data types, sizes, signed/unsigned attributes, and matching collations for string keys.",
    explanation: "Referencing an `INT UNSIGNED` parent with a signed `INT` child throws Error 3780 (referential constraint type mismatch).",
    hint: "Identical types, precision, and signedness.",
    level: "moderate"
  },
  {
    question: "What does `ON DELETE RESTRICT` (the default behavior) do in MySQL?",
    shortAnswer: "It prevents deleting a parent row if ANY child records in the child table reference its primary key.",
    explanation: "Protects master data from accidental deletion while active dependencies exist.",
    hint: "Blocks parent deletion if child exists.",
    level: "basic"
  },
  {
    question: "What does `ON DELETE CASCADE` do in a foreign key relationship?",
    shortAnswer: "When a parent row is deleted, MySQL automatically deletes all matching child rows in the child table in the same transaction.",
    explanation: "Useful for tightly bound child records like line items inside an order invoice.",
    hint: "Automatic child cleanup.",
    level: "basic",
    codeExample: "FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE"
  },
  {
    question: "What does `ON DELETE SET NULL` do and what is its prerequisite?",
    shortAnswer: "It sets the child foreign key column to `NULL` when the parent row is deleted; requires the child column to be nullable.",
    explanation: "Allows disassociating child records without deleting them.",
    hint: "Nullable foreign key requirement.",
    level: "moderate"
  },
  {
    question: "What is the difference between `RESTRICT` and `NO ACTION` in MySQL InnoDB?",
    shortAnswer: "In MySQL InnoDB, `RESTRICT` and `NO ACTION` are functionally identical, both immediately blocking parent deletions that violate referential integrity.",
    explanation: "In some other database systems, NO ACTION defers checking until transaction commit.",
    hint: "Equivalent immediate constraint enforcement.",
    level: "expert"
  },
  {
    question: "Can a Foreign Key column contain `NULL` values in MySQL?",
    shortAnswer: "Yes, unless the column is explicitly marked `NOT NULL`. A NULL foreign key indicates that the child record is unassigned to any parent.",
    explanation: "Enables optional (zero-or-more) relationship modeling.",
    hint: "Optional relationship representation.",
    level: "basic"
  },
  {
    question: "Does MySQL automatically create an index on Foreign Key columns?",
    shortAnswer: "Yes, if an index does not already exist on the child foreign key column, InnoDB automatically creates a secondary index for fast referential checks.",
    explanation: "Indexes are mandatory for fast parent-child lookup joins.",
    hint: "Automatic secondary index creation.",
    level: "expert"
  },
  {
    question: "What error occurs if you try to insert a foreign key ID that does not exist in the parent table?",
    shortAnswer: "Error 1452 (23000): 'Cannot add or update a child row: a foreign key constraint fails'.",
    explanation: "InnoDB checks the parent index and rejects the insert if the key is missing.",
    hint: "Error 1452.",
    level: "basic"
  },
  {
    question: "What error occurs if you try to delete a parent row that has child records under `ON DELETE RESTRICT`?",
    shortAnswer: "Error 1451 (23000): 'Cannot delete or update a parent row: a foreign key constraint fails'.",
    explanation: "InnoDB prevents creating orphaned child records.",
    hint: "Error 1451.",
    level: "basic"
  },
  {
    question: "What is a Self-Referencing (Recursive) Foreign Key?",
    shortAnswer: "A foreign key in a table that references the Primary Key of the SAME table, commonly used for organizational hierarchies or category trees.",
    explanation: "In an `employees` table, `manager_id` references `employees(employee_id)`.",
    hint: "Table referencing itself for hierarchies.",
    level: "moderate",
    codeExample: "CREATE TABLE employees (\n    employee_id INT PRIMARY KEY,\n    first_name VARCHAR(50),\n    manager_id INT,\n    CONSTRAINT fk_emp_manager FOREIGN KEY (manager_id) REFERENCES employees(employee_id)\n);"
  },
  {
    question: "How do you add a Foreign Key to an existing table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE child_table ADD CONSTRAINT fk_name FOREIGN KEY (col) REFERENCES parent_table(id);`.",
    explanation: "Requires that all existing child rows already have valid matching parent IDs.",
    hint: "ALTER TABLE ADD CONSTRAINT FOREIGN KEY.",
    level: "moderate",
    codeExample: "ALTER TABLE payments ADD CONSTRAINT fk_payments_student\nFOREIGN KEY (student_id) REFERENCES students(student_id);"
  },
  {
    question: "How do you drop a Foreign Key constraint in MySQL?",
    shortAnswer: "`ALTER TABLE child_table DROP FOREIGN KEY constraint_symbol_name;`.",
    explanation: "Dropping by explicit constraint name detaches the referential rule without dropping the underlying index.",
    hint: "ALTER TABLE DROP FOREIGN KEY symbol_name.",
    level: "moderate",
    codeExample: "ALTER TABLE payments DROP FOREIGN KEY fk_payments_student;"
  },
  {
    question: "Why should developers explicitly name foreign key constraints with `CONSTRAINT fk_name`?",
    shortAnswer: "Because if omitted, MySQL assigns an auto-generated random symbol (e.g. `students_ibfk_1`), making automated migrations and drops difficult.",
    explanation: "Explicit naming improves schema self-documentation.",
    hint: "Self-documenting constraint identifiers.",
    level: "basic"
  },
  {
    question: "What is a Circular Foreign Key Dependency?",
    shortAnswer: "When Table A references Table B, and Table B simultaneously references Table A.",
    explanation: "Requires temporarily disabling `foreign_key_checks=0` during creation or adding one constraint after table creation.",
    hint: "Mutual table references.",
    level: "expert"
  },
  {
    question: "What storage engine must be used for Foreign Keys to be enforced in MySQL?",
    shortAnswer: "`InnoDB` (the default engine). Older engines like MyISAM silently ignore foreign key declarations.",
    explanation: "MyISAM parses foreign key syntax for compatibility but never enforces it.",
    hint: "InnoDB requirement for FK enforcement.",
    level: "basic"
  },
  {
    question: "What is `ON UPDATE CASCADE` and when should it be used?",
    shortAnswer: "When the primary key of a parent row is updated, all child foreign keys are automatically updated to match the new value.",
    explanation: "Prevents orphaned child records if master keys change.",
    hint: "Automatic parent-to-child key synchronization.",
    level: "moderate",
    codeExample: "FOREIGN KEY (student_id) REFERENCES students(student_id) ON UPDATE CASCADE"
  },
  {
    question: "What happens if a parent table is dropped while a child table still references it?",
    shortAnswer: "MySQL blocks the drop with Error 3730: 'Cannot drop table ... referenced by a foreign key constraint'.",
    explanation: "Child foreign key constraints must be dropped first, or the child table dropped before the parent.",
    hint: "Error 3730 parent table drop prevention.",
    level: "moderate"
  },
  {
    question: "Can a Foreign Key reference a Composite Primary Key in a parent table?",
    shortAnswer: "Yes, the child table must define a composite foreign key matching the exact number and order of columns in the parent key.",
    explanation: "`FOREIGN KEY (s_id, c_id) REFERENCES enrollments(student_id, course_id)`.",
    hint: "Composite foreign key tuple matching.",
    level: "expert",
    codeExample: "CONSTRAINT fk_grades_enrollment\nFOREIGN KEY (student_id, course_id) REFERENCES course_enrollments(student_id, course_id)"
  },
  {
    question: "What is the danger of using `ON DELETE CASCADE` in financial accounting schemas?",
    shortAnswer: "Deleting a user or customer could silently wipe out invoice histories, audit records, and tax filings. Financial data must use `ON DELETE RESTRICT`.",
    explanation: "Ledger histories must never be deleted; they should be soft-deleted or archived.",
    hint: "Accidental ledger history destruction.",
    level: "expert"
  },
  {
    question: "How do you inspect all foreign keys referencing a specific table in MySQL?",
    shortAnswer: "By querying `information_schema.KEY_COLUMN_USAGE` or `information_schema.REFERENTIAL_CONSTRAINTS`.",
    explanation: "Provides metadata on parent-child table mappings.",
    hint: "information_schema.KEY_COLUMN_USAGE.",
    level: "expert",
    codeExample: "SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME\nFROM information_schema.KEY_COLUMN_USAGE\nWHERE REFERENCED_TABLE_NAME = 'students';"
  },
  {
    question: "Can a foreign key reference a column that has a `UNIQUE` constraint instead of a `PRIMARY KEY`?",
    shortAnswer: "Yes, MySQL allows foreign keys to reference any column with a `UNIQUE` index in the parent table.",
    explanation: "Guarantees unambiguous parent row resolution.",
    hint: "Unique column references.",
    level: "moderate"
  },
  {
    question: "What is the difference between an Identifying Relationship and a Non-Identifying Relationship?",
    shortAnswer: "In an Identifying Relationship, the parent's primary key is part of the child's primary key; in a Non-Identifying Relationship, the foreign key is just an ordinary column in the child.",
    explanation: "Junction tables use identifying relationships.",
    hint: "Primary key inclusion vs ordinary foreign key attribute.",
    level: "expert"
  },
  {
    question: "What is the locking behavior of InnoDB during Foreign Key checks?",
    shortAnswer: "InnoDB takes shared row-level locks (S locks) on the parent table record to verify its presence, preventing concurrent transactions from deleting the parent.",
    explanation: "Guarantees transactional consistency across parent-child writes.",
    hint: "Shared row-level S lock on parent record.",
    level: "expert"
  },
  {
    question: "What is the maximum number of Foreign Keys a single table can contain in MySQL?",
    shortAnswer: "Up to 64 foreign key constraints per table (governed by table index limits).",
    explanation: "Practically, tables rarely exceed 5 to 10 foreign keys.",
    hint: "64 foreign key constraint limit.",
    level: "expert"
  },
  {
    question: "How does `ON UPDATE RESTRICT` protect data integrity?",
    shortAnswer: "It prevents changing the Primary Key value of a parent row if child records are currently attached to that parent.",
    explanation: "Guarantees parent keys remain stable.",
    hint: "Blocks parent primary key updates.",
    level: "moderate"
  },
  {
    question: "Can a Foreign Key column be part of an `INDEX` and an `AUTO_INCREMENT` column simultaneously?",
    shortAnswer: "A foreign key column can be indexed, but should not be AUTO_INCREMENT because its values must derive from the parent table, not a local sequence.",
    explanation: "Foreign key values mirror parent values.",
    hint: "Foreign keys mirror parent IDs, not independent sequences.",
    level: "basic"
  },
  {
    question: "What happens if you run `TRUNCATE TABLE parent_table;` when a child table has a foreign key referencing it?",
    shortAnswer: "MySQL rejects the truncate with Error 1701: 'Cannot truncate a table referenced in a foreign key constraint'.",
    explanation: "TRUNCATE bypasses row-level triggers and cascade checks; you must use `DELETE FROM parent_table;` instead.",
    hint: "Error 1701 TRUNCATE prohibition.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist when defining Foreign Keys in production MySQL tables?",
    shortAnswer: "1) Ensure InnoDB engine on both tables. 2) Match column types and signedness exactly. 3) Explicitly name constraints (`CONSTRAINT fk_child_parent ...`). 4) Choose `RESTRICT` for critical data and `CASCADE` for transient children. 5) Create supporting indexes.",
    explanation: "Following these 5 rules guarantees zero constraint creation errors and total referential safety.",
    hint: "InnoDB, Matching data types, Explicit naming, Referential action choice, Index support.",
    level: "basic"
  }
];

export default questions;
