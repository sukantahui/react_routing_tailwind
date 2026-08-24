// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is a Composite Primary Key in a Junction Table?",
    shortAnswer: "A Primary Key formed by combining two or more Foreign Key columns `(student_id, course_id)` to uniquely identify each association row.",
    explanation: "Guarantees uniqueness across the relationship pair at the storage engine level.",
    hint: "Combined multi-column primary key.",
    level: "basic",
    codeExample: "PRIMARY KEY (student_id, course_id)"
  },
  {
    question: "How does a Composite Primary Key physically organize data inside MySQL InnoDB storage pages?",
    shortAnswer: "InnoDB physically sorts and clusters the table rows by the composite key order; all course records for a given `student_id` are stored sequentially in adjacent memory bytes on disk.",
    explanation: "Maximizes I/O page density for parent-specific queries.",
    hint: "Clustered physical index order.",
    level: "expert"
  },
  {
    question: "What is the B-Tree Leftmost Prefix Rule in composite indexes?",
    shortAnswer: "A composite index on `(A, B)` can accelerate queries filtering by `A` alone or `(A and B)` together, but CANNOT accelerate queries filtering ONLY by `B`.",
    explanation: "B-Tree seek trees are sorted primarily by the first leading attribute.",
    hint: "Leftmost leading column requirement.",
    level: "expert"
  },
  {
    question: "Why MUST you create a secondary reverse index on `(course_id, student_id)` in a junction table with `PRIMARY KEY (student_id, course_id)`?",
    shortAnswer: "To optimize reverse lookups (e.g. finding all students enrolled in a specific course), which otherwise require a slow full table scan due to the leftmost prefix rule.",
    explanation: "Ensures bidirectional index coverage.",
    hint: "Optimizes reverse entity lookups.",
    level: "basic",
    codeExample: "CREATE INDEX idx_course_students ON student_courses(course_id, student_id);"
  },
  {
    question: "When should you use a Surrogate Primary Key (`id BIGINT AUTO_INCREMENT`) with a `UNIQUE (A, B)` constraint instead of a Composite Primary Key?",
    shortAnswer: "When other child tables in the database need to maintain foreign key references pointing to the junction table entries.",
    explanation: "A single 8-byte integer foreign key is much cleaner to reference than a multi-column composite foreign key.",
    hint: "When other child tables reference the junction entity.",
    level: "moderate",
    codeExample: "enrollment_id BIGINT AUTO_INCREMENT PRIMARY KEY,\nstudent_id INT NOT NULL,\ncourse_id INT NOT NULL,\nUNIQUE (student_id, course_id)"
  },
  {
    question: "Can a column participating in a Composite Primary Key be `NULL` in MySQL?",
    shortAnswer: "No, SQL standards and MySQL InnoDB strictly require that ALL columns participating in a Primary Key MUST be `NOT NULL`.",
    explanation: "Primary keys require absolute entity integrity.",
    hint: "All primary key columns must be NOT NULL.",
    level: "basic"
  },
  {
    question: "What error occurs if an application attempts to insert a duplicate `(student_id, course_id)` pair into a junction table with a Composite PK?",
    shortAnswer: "Error 1062 (23000): 'Duplicate entry ... for key 'PRIMARY''.",
    explanation: "InnoDB enforces uniqueness on the composite tuple.",
    hint: "Error 1062 duplicate entry.",
    level: "basic"
  },
  {
    question: "How do you decide which column should be FIRST in a Composite Primary Key `(col1, col2)`?",
    shortAnswer: "Place the column that is queried most frequently or has the highest selectivity (cardinality) as the leading column.",
    explanation: "Maximizes the reuse of the primary clustered index without needing extra secondary indexes.",
    hint: "Most frequently filtered column goes first.",
    level: "moderate"
  },
  {
    question: "Can a Composite Primary Key consist of THREE columns in a Ternary junction table?",
    shortAnswer: "Yes: `PRIMARY KEY (doctor_id, patient_id, appointment_date)`.",
    explanation: "Uniquely identifies interactions across three participating dimensions.",
    hint: "Ternary composite primary key.",
    level: "moderate",
    codeExample: "PRIMARY KEY (doctor_id, patient_id, appointment_date)"
  },
  {
    question: "How do you perform an upsert (`INSERT ... ON DUPLICATE KEY UPDATE`) on a junction table with a Composite PK?",
    shortAnswer: "`INSERT INTO student_courses (student_id, course_id, grade) VALUES (101, 1, 'A+') ON DUPLICATE KEY UPDATE grade = VALUES(grade);`.",
    explanation: "Updates the payload attribute if the composite pair already exists.",
    hint: "ON DUPLICATE KEY UPDATE on composite primary key.",
    level: "moderate",
    codeExample: "INSERT INTO student_courses (student_id, course_id, grade)\nVALUES (101, 1, 'A+')\nON DUPLICATE KEY UPDATE grade = VALUES(grade);"
  },
  {
    question: "How does a Composite Primary Key reduce disk storage compared to a surrogate key + secondary unique index?",
    shortAnswer: "It saves the storage of the extra surrogate integer column and completely eliminates the overhead of a separate secondary index tree on the table.",
    explanation: "The primary clustered index serves both as row identifier and uniqueness enforcer.",
    hint: "Saves surrogate column + secondary index storage.",
    level: "expert"
  },
  {
    question: "Can a table have both a `PRIMARY KEY (student_id, course_id)` and an `AUTO_INCREMENT` column in MySQL InnoDB?",
    shortAnswer: "In MySQL InnoDB, an `AUTO_INCREMENT` column MUST be the FIRST column in an index; if it is not the leading column in the PK, it must have its own standalone index.",
    explanation: "Engine requires sequence seek capability.",
    hint: "AUTO_INCREMENT must be indexed.",
    level: "expert"
  },
  {
    question: "How do you query all courses for student #101 using the composite primary key index?",
    shortAnswer: "`SELECT * FROM student_courses WHERE student_id = 101;`.",
    explanation: "Utilizes the leftmost prefix of `PRIMARY KEY (student_id, course_id)` with `type: ref` in EXPLAIN.",
    hint: "Utilizes leftmost prefix of composite PK.",
    level: "basic"
  },
  {
    question: "How does `EXPLAIN` describe a query filtering by `course_id = 1` when NO reverse index exists on `(course_id, student_id)`?",
    shortAnswer: "It shows `type: ALL` (Full Table Scan) and `key: NULL` because the leftmost prefix rule prevents using the PK on `(student_id, course_id)`.",
    explanation: "Demonstrates the necessity of the reverse index.",
    hint: "type: ALL (Full Table Scan) without reverse index.",
    level: "expert"
  },
  {
    question: "How does `EXPLAIN` describe a query filtering by `course_id = 1` AFTER adding `INDEX (course_id, student_id)`?",
    shortAnswer: "It shows `type: ref` and `key: idx_course_students`, scanning only the matching index nodes with zero table scan.",
    explanation: "Achieves optimal B-Tree index range seeking.",
    hint: "type: ref using the reverse index.",
    level: "expert"
  },
  {
    question: "Can a Composite Primary Key in a junction table be defined using inline column syntax?",
    shortAnswer: "No, composite primary keys MUST be defined as a table-level constraint at the end of the column list (`PRIMARY KEY (col1, col2)`).",
    explanation: "Inline `PRIMARY KEY` syntax only supports single columns.",
    hint: "Table-level constraint syntax required.",
    level: "basic"
  },
  {
    question: "How do you drop a Composite Primary Key from an existing junction table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE student_courses DROP PRIMARY KEY;`.",
    explanation: "Removes the composite clustered key.",
    hint: "ALTER TABLE DROP PRIMARY KEY.",
    level: "basic",
    codeExample: "ALTER TABLE student_courses DROP PRIMARY KEY;"
  },
  {
    question: "How do you add a Composite Primary Key to an existing table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE student_courses ADD CONSTRAINT pk_sc PRIMARY KEY (student_id, course_id);`.",
    explanation: "Requires that all existing rows have unique `(student_id, course_id)` combinations and non-null values.",
    hint: "ALTER TABLE ADD PRIMARY KEY (col1, col2).",
    level: "basic",
    codeExample: "ALTER TABLE student_courses ADD PRIMARY KEY (student_id, course_id);"
  },
  {
    question: "What is the maximum number of columns that can participate in a Composite Primary Key in MySQL InnoDB?",
    shortAnswer: "Up to 16 columns (up to 3072 bytes total key length in InnoDB with Dynamic / Compressed row format).",
    explanation: "InnoDB composite index architectural ceiling.",
    hint: "Up to 16 columns.",
    level: "expert"
  },
  {
    question: "Why should you avoid defining Composite Primary Keys with 5+ columns in enterprise schemas?",
    shortAnswer: "Large composite keys bloat all secondary indexes (which append the clustered PK to every leaf node) and make JOIN predicates tedious and error-prone.",
    explanation: "Secondary index leaf nodes replicate the entire primary key.",
    hint: "Secondary index leaf node bloating.",
    level: "expert"
  },
  {
    question: "How do you delete a specific student's enrollment from a course in a junction table?",
    shortAnswer: "`DELETE FROM student_courses WHERE student_id = 101 AND course_id = 2;`.",
    explanation: "Direct point lookup delete using the composite primary key.",
    hint: "WHERE student_id = 101 AND course_id = 2.",
    level: "basic"
  },
  {
    question: "What happens if a child table references a composite primary key as a foreign key?",
    shortAnswer: "The child table MUST define a Composite Foreign Key containing both columns: `FOREIGN KEY (student_id, course_id) REFERENCES student_courses(student_id, course_id)`.",
    explanation: "Foreign key column counts and types must match the referenced composite primary key.",
    hint: "Composite foreign key matching parent composite PK.",
    level: "expert",
    codeExample: "CREATE TABLE grade_audits (\n    audit_id INT AUTO_INCREMENT PRIMARY KEY,\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    old_grade CHAR(2),\n    new_grade CHAR(2),\n    FOREIGN KEY (student_id, course_id) REFERENCES student_courses(student_id, course_id)\n);"
  },
  {
    question: "How does `ON UPDATE CASCADE` operate across a composite foreign key?",
    shortAnswer: "If either `student_id` or `course_id` changes in the parent tables, the composite foreign key in the junction table is automatically updated.",
    explanation: "Preserves dual-column referential integrity.",
    hint: "Propagates updates across composite foreign keys.",
    level: "moderate"
  },
  {
    question: "Can a junction table with a Composite Primary Key also have a `CHECK` constraint?",
    shortAnswer: "Yes (e.g. `CONSTRAINT chk_grade CHECK (grade IN ('A+', 'A', 'B', 'C', 'F'))`).",
    explanation: "Ensures payload attributes meet business criteria.",
    hint: "CHECK constraints on junction attributes.",
    level: "basic"
  },
  {
    question: "What is an 'Index-Covering Query' on a junction table?",
    shortAnswer: "A query that retrieves all requested columns directly from the composite index B-Tree without accessing table rows on disk (e.g. `SELECT course_id FROM student_courses WHERE student_id = 101`).",
    explanation: "Ultra-fast in-memory index scan (`Using index` in EXPLAIN).",
    hint: "Using index covering scan.",
    level: "expert",
    codeExample: "EXPLAIN SELECT course_id FROM student_courses WHERE student_id = 101;"
  },
  {
    question: "How do you count total unique student-course enrollments in a junction table?",
    shortAnswer: "`SELECT COUNT(*) FROM student_courses;` (or `COUNT(student_id)`).",
    explanation: "Because `(student_id, course_id)` is the PK, every row is guaranteed unique.",
    hint: "COUNT(*) on junction table.",
    level: "basic"
  },
  {
    question: "How does `INSERT IGNORE` behave on a junction table with a Composite Primary Key?",
    shortAnswer: "If the `(student_id, course_id)` pair already exists, MySQL quietly skips the insertion without throwing an error.",
    explanation: "Ideal for batch idempotent enrollment scripts.",
    hint: "Silently skips duplicate composite pairs.",
    level: "basic",
    codeExample: "INSERT IGNORE INTO student_courses (student_id, course_id) VALUES (101, 1);"
  },
  {
    question: "What is the difference between `PRIMARY KEY (A, B)` vs `UNIQUE (A, B)` in MySQL InnoDB?",
    shortAnswer: "`PRIMARY KEY (A, B)` defines the physical clustered index sorting order of the table pages; `UNIQUE (A, B)` is a secondary index and requires an independent primary key.",
    explanation: "Every InnoDB table has exactly one clustered primary key index.",
    hint: "Clustered physical index vs secondary index.",
    level: "expert"
  },
  {
    question: "How do you verify the column order of a Composite Primary Key in `information_schema`?",
    shortAnswer: "Query `information_schema.KEY_COLUMN_USAGE` and inspect the `ORDINAL_POSITION` column for `CONSTRAINT_NAME = 'PRIMARY'`.",
    explanation: "Ordinal position 1 is the leading leftmost prefix column.",
    hint: "ORDINAL_POSITION in information_schema.KEY_COLUMN_USAGE.",
    level: "moderate",
    codeExample: "SELECT COLUMN_NAME, ORDINAL_POSITION\nFROM information_schema.KEY_COLUMN_USAGE\nWHERE TABLE_NAME = 'student_courses' AND CONSTRAINT_NAME = 'PRIMARY'\nORDER BY ORDINAL_POSITION;"
  },
  {
    question: "What is the recommended checklist for implementing Composite Primary Keys in Junction Tables?",
    shortAnswer: "1) Define `PRIMARY KEY (id_a, id_b)` across the two foreign keys. 2) Always create a reverse index on `(id_b, id_a)`. 3) Put the most frequently filtered ID as the leading column. 4) Use Surrogate PK + UNIQUE if child tables need to reference this junction. 5) Use `INSERT ... ON DUPLICATE KEY UPDATE` for idempotent upserts.",
    explanation: "Following these 5 rules guarantees optimal clustered I/O density and bidirectional lookup speed.",
    hint: "Composite PK, Reverse index, Leading column choice, Surrogate if referenced, Idempotent upserts.",
    level: "basic"
  }
];

export default questions;
