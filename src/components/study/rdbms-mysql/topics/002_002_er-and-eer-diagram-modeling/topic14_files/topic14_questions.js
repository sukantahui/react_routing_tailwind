// topic14_files/topic14_questions.js

const questions = [
  {
    question: "What does Step 2 of the ER-to-Relational Mapping Algorithm map?",
    shortAnswer: "Weak Entity Types and their Identifying Relationships.",
    explanation: "Constructs tables for owner-dependent weak entities.",
    hint: "Weak entity types and identifying relationships.",
    level: "basic"
  },
  {
    question: "How is the Primary Key of a Weak Entity table determined in Step 2?",
    shortAnswer: "As a Composite Primary Key combining the Owner Entity's Primary Key (which also serves as a Foreign Key) and the Weak Entity's Partial Key (Discriminator).",
    explanation: "Composite of Owner PK + Partial Key.",
    hint: "Composite PK = Owner PK + Partial Key.",
    level: "basic"
  },
  {
    question: "Why MUST Weak Entity Foreign Keys use `ON DELETE CASCADE` in MySQL?",
    shortAnswer: "Because weak entities have existence dependency on their owner; if the owner entity is deleted, all dependent weak entities must be automatically purged.",
    explanation: "Preserves identifying existence dependency.",
    hint: "Purges weak entities when the owner is deleted.",
    level: "basic"
  },
  {
    question: "What are the three alternative mapping strategies for Binary 1:1 Relationships in Step 3?",
    shortAnswer: "1) Strategy 3A: Foreign Key approach (embedding Unique FK in table with total participation). 2) Strategy 3B: Merged Table approach (for total participation on both sides). 3) Strategy 3C: Cross-Reference / Junction Table approach.",
    explanation: "Three standard relational approaches for 1:1 relationships.",
    hint: "Foreign Key, Merged Table, and Cross-Reference Table.",
    level: "moderate"
  },
  {
    question: "In Strategy 3A (Foreign Key Approach for 1:1), why MUST the embedded foreign key column be marked `UNIQUE`?",
    shortAnswer: "Because without the `UNIQUE` constraint, multiple rows could reference the same foreign entity, turning the 1:1 relationship into a 1:N relationship.",
    explanation: "UNIQUE constraint enforces the 1:1 cardinality ceiling.",
    hint: "Prevents multiple rows from pointing to the same foreign entity.",
    level: "basic"
  },
  {
    question: "In Strategy 3A for 1:1 relationships, which table should preferably receive the embedded foreign key?",
    shortAnswer: "The table representing the entity with TOTAL (Mandatory) participation, because this guarantees the foreign key column will never be NULL.",
    explanation: "Eliminates NULL values in foreign key column.",
    hint: "The entity with Total (Mandatory) participation.",
    level: "moderate"
  },
  {
    question: "When is Strategy 3B (Merged Relation Approach for 1:1) recommended?",
    shortAnswer: "When BOTH entities have TOTAL participation in the 1:1 relationship, merging them into a single consolidated table with zero NULLs.",
    explanation: "Consolidates two strictly synchronized entities into one table.",
    hint: "When both sides have Total participation.",
    level: "moderate"
  },
  {
    question: "When is Strategy 3C (Cross-Reference Table for 1:1) recommended?",
    shortAnswer: "When BOTH entities have PARTIAL participation and only a tiny percentage of rows are actually linked, avoiding NULL columns in both base tables.",
    explanation: "Sparse 1:1 relationship mapping pattern.",
    hint: "Sparse 1:1 links with partial participation on both sides.",
    level: "expert"
  },
  {
    question: "What is the standard rule for mapping Binary 1:N Relationships in Step 4?",
    shortAnswer: "Identify the N-side (Many-side) entity relation and embed the Primary Key of the 1-side entity as a FOREIGN KEY column in that N-side relation.",
    explanation: "Embeds 1-side PK into the N-side child table.",
    hint: "Embed 1-side PK as FK in the N-side table.",
    level: "basic"
  },
  {
    question: "Where do relationship attributes go when mapping a 1:N relationship in Step 4?",
    shortAnswer: "They are placed directly as simple columns in the N-side (child) table.",
    explanation: "Every N-side row has at most one 1-side parent, so attributes fit perfectly in the N-side row.",
    hint: "Directly in the N-side table.",
    level: "basic"
  },
  {
    question: "Why CANNOT the Foreign Key for a 1:N relationship be embedded in the 1-side entity table?",
    shortAnswer: "Because the 1-side entity relates to MULTIPLE N-side entities; embedding their IDs in the 1-side table would require storing an array or repeating group, violating 1NF.",
    explanation: "Violates First Normal Form (1NF).",
    hint: "Violates 1NF by requiring multi-valued arrays.",
    level: "basic"
  },
  {
    question: "How is a recursive 1:N relationship (e.g. Employee 'Supervises' Employees) mapped in Step 4?",
    shortAnswer: "By adding a nullable foreign key column `supervisor_emp_id INT NULL` in the same `employees` table, referencing `employees(emp_id)`.",
    explanation: "Self-referencing foreign key column.",
    hint: "Self-referencing foreign key in the same table.",
    level: "moderate",
    codeExample: "CREATE TABLE employees (\n    emp_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    supervisor_emp_id INT NULL,\n    CONSTRAINT fk_supervisor FOREIGN KEY (supervisor_emp_id)\n        REFERENCES employees(emp_id) ON DELETE SET NULL\n);"
  },
  {
    question: "How do you query all weak entity dependents for student #101 in SQL?",
    shortAnswer: "`SELECT dependent_name, relationship FROM student_dependents WHERE student_id = 101;`.",
    explanation: "Direct primary key prefix query.",
    hint: "WHERE student_id = 101.",
    level: "basic"
  },
  {
    question: "What is the primary key of `student_dependents` in Step 2 mapping?",
    shortAnswer: "`PRIMARY KEY (student_id, dependent_name)`.",
    explanation: "Composite primary key.",
    hint: "PRIMARY KEY (student_id, dependent_name).",
    level: "basic"
  },
  {
    question: "Can two different students have a dependent with the exact same name 'Aarav'?",
    shortAnswer: "Yes, because the Composite Primary Key `(student_id, dependent_name)` ensures uniqueness per student.",
    explanation: "Discriminators are unique only within each owner scope.",
    hint: "Yes, uniqueness is scoped to student_id.",
    level: "basic"
  },
  {
    question: "What happens if an application tries to insert into `departments` a `head_faculty_id` that is already assigned to another department?",
    shortAnswer: "MySQL aborts with Error 1062 (Duplicate entry for key 'uq_head_faculty_id'), enforcing the 1:1 constraint.",
    explanation: "UNIQUE constraint prevents multiple departments having the same head.",
    hint: "Error 1062 duplicate key error.",
    level: "basic"
  },
  {
    question: "In 1:N mapping, if a department has Total participation in 'Employs' with Faculty, what constraint must be applied to `dept_id` in `faculty`?",
    shortAnswer: "`dept_id INT NOT NULL` (guarantees every faculty member must belong to a department).",
    explanation: "NOT NULL constraint enforces mandatory participation.",
    hint: "NOT NULL constraint on foreign key.",
    level: "basic"
  },
  {
    question: "How do you query all departments and their total faculty count using SQL?",
    shortAnswer: "`SELECT d.dept_name, COUNT(f.faculty_id) AS faculty_count FROM departments d LEFT JOIN faculty f ON d.dept_id = f.dept_id GROUP BY d.dept_id, d.dept_name;`.",
    explanation: "LEFT JOIN aggregation on 1:N relationship.",
    hint: "LEFT JOIN departments to faculty with COUNT.",
    level: "basic"
  },
  {
    question: "What is the difference between an Identifying Relationship (Weak Entity) and a regular 1:N Relationship?",
    shortAnswer: "In an Identifying Relationship, the parent's PK becomes part of the child's PRIMARY KEY; in a regular 1:N relationship, the parent's PK is only a regular Foreign Key column in the child table.",
    explanation: "Part of PK vs Standalone Foreign Key.",
    hint: "Parent PK is part of child PK in identifying relationship.",
    level: "expert"
  },
  {
    question: "How is a recursive 1:1 relationship (e.g. Person 'Is_Married_To' Person) mapped?",
    shortAnswer: "By adding a `spouse_id INT UNIQUE NULL` column in `persons`, referencing `persons(person_id)`.",
    explanation: "Self-referencing 1:1 unique foreign key.",
    hint: "Self-referencing UNIQUE foreign key column.",
    level: "moderate"
  },
  {
    question: "Can a Weak Entity have another Weak Entity dependent on it (Multi-Level Weak Entities)?",
    shortAnswer: "Yes, the grandchild weak entity table inherits BOTH the grandparent PK and parent partial key into its composite primary key.",
    explanation: "Cascading composite primary key propagation.",
    hint: "Grandchild inherits grandparent PK + parent partial key.",
    level: "expert"
  },
  {
    question: "Why should `ON DELETE SET NULL` be used on recursive supervisor foreign keys?",
    shortAnswer: "To ensure that if a manager is deleted, their subordinates are not deleted, but simply have their supervisor column set to NULL until a new manager is assigned.",
    explanation: "Prevents accidental subordinate deletion.",
    hint: "Prevents subordinate employees from being deleted.",
    level: "moderate"
  },
  {
    question: "What index is automatically created by MySQL InnoDB on the `PRIMARY KEY (student_id, dependent_name)` in Step 2?",
    shortAnswer: "A clustered B-Tree index on `(student_id, dependent_name)`, which also automatically optimizes queries filtering by `student_id` alone.",
    explanation: "Leftmost index prefix optimization.",
    hint: "Clustered B-Tree index on (student_id, dependent_name).",
    level: "expert"
  },
  {
    question: "How do you define a department head 1:1 link that is optional on both sides in MySQL?",
    shortAnswer: "`head_faculty_id INT NULL UNIQUE`, allowing departments to exist without a head and faculty to exist without heading a department.",
    explanation: "Nullable Unique Foreign Key for partial 1:1.",
    hint: "NULL UNIQUE column.",
    level: "basic"
  },
  {
    question: "In Step 4, what happens if an entity participating on the 1-side is deleted, but the N-side child table has `ON DELETE RESTRICT`?",
    shortAnswer: "MySQL blocks the deletion with Error 1451 until all dependent child rows on the N-side are reassigned or removed.",
    explanation: "Prevents orphaned child rows.",
    hint: "MySQL blocks the deletion with Error 1451.",
    level: "basic"
  },
  {
    question: "Why is creating a separate junction table for a 1:N relationship generally considered unnecessary in relational databases?",
    shortAnswer: "Because embedding the foreign key directly in the N-side table achieves the same relationship with ONE fewer table and ONE fewer join operation.",
    explanation: "Avoids unnecessary table overhead.",
    hint: "Embedding FK in N-side saves an extra table and extra join.",
    level: "moderate"
  },
  {
    question: "How does a View simplify querying a 1:1 relationship between Faculty and Department?",
    shortAnswer: "By pre-joining `departments` and `faculty` on `head_faculty_id = faculty_id`, presenting a clean virtual table `vw_department_heads`.",
    explanation: "Encapsulates 1:1 join path.",
    hint: "Pre-joins departments and faculty on head_faculty_id.",
    level: "basic",
    codeExample: "CREATE VIEW vw_department_heads AS\nSELECT d.dept_id, d.dept_name, f.full_name AS head_name, d.assigned_date\nFROM departments d\nJOIN faculty f ON d.head_faculty_id = f.faculty_id;"
  },
  {
    question: "What is the order of table creation when mapping Step 1, Step 2, and Step 4?",
    shortAnswer: "1) Create Strong Entities (Step 1). 2) Create 1-side parent tables. 3) Create N-side child tables referencing 1-side (Step 4). 4) Create Weak Entity tables referencing owner tables (Step 2).",
    explanation: "Dependency-ordered DDL script execution.",
    hint: "Parent tables must exist before child tables referencing them.",
    level: "basic"
  },
  {
    question: "How do you verify the foreign key constraints in `student_dependents` using SQL?",
    shortAnswer: "`SELECT CONSTRAINT_NAME, TABLE_NAME, REFERENCED_TABLE_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_NAME = 'student_dependents';`.",
    explanation: "Metadata inspection for foreign keys.",
    hint: "information_schema.KEY_COLUMN_USAGE.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist for Steps 2, 3, and 4 in ER-to-Relational mapping?",
    shortAnswer: "1) Step 2: Weak entity PK = `{Owner_PK, Partial_Key}` with `ON DELETE CASCADE`. 2) Step 3: For 1:1, embed `UNIQUE` FK in table with total participation. 3) Step 4: For 1:N, embed 1-side PK as FK in N-side table. 4) Place 1:N relationship attributes in N-side table. 5) Add `NOT NULL` on FK if participation is Total.",
    explanation: "Following these 5 rules guarantees robust relational schemas for weak entities, 1:1, and 1:N links.",
    hint: "Weak composite PK, 1:1 Unique FK, 1:N FK in N-side, 1:N attrs in N-side, NOT NULL on Total.",
    level: "basic"
  }
];

export default questions;
