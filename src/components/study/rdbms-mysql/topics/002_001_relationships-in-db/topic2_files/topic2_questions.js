// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is a One-to-Many (1:N) relationship in relational database design?",
    shortAnswer: "A relationship where a single parent record in Table A is linked to zero, one, or multiple child records in Table B, but each child record links to at most one parent.",
    explanation: "The most common relationship type in relational modeling.",
    hint: "Single parent with multiple children.",
    level: "basic"
  },
  {
    question: "What is the fundamental rule for Foreign Key placement in a 1:N relationship?",
    shortAnswer: "The Foreign Key MUST ALWAYS be placed in the table on the 'MANY' (child) side.",
    explanation: "Placing foreign keys on the 'One' side violates First Normal Form by attempting to store multi-valued arrays in a single column.",
    hint: "Foreign Key goes on the Many side.",
    level: "basic"
  },
  {
    question: "Why is storing a comma-separated list of child IDs (e.g. `student_ids = '101,102,103'`) in the parent table an anti-pattern?",
    shortAnswer: "It violates 1NF atomicity, prevents B-Tree indexing, makes foreign key referential integrity impossible, and slows down JOIN operations with full table scans.",
    explanation: "Standard relational modeling requires atomic values per cell.",
    hint: "Violates 1NF atomicity and prevents foreign key enforcement.",
    level: "basic"
  },
  {
    question: "How do you query all child records along with their parent attributes using SQL?",
    shortAnswer: "Using an `INNER JOIN` (or `LEFT JOIN`) matching child foreign key to parent primary key.",
    explanation: "`FROM students s INNER JOIN departments d ON s.dept_id = d.dept_id`.",
    hint: "INNER JOIN child.fk = parent.pk.",
    level: "basic",
    codeExample: "SELECT s.student_name, d.department_name\nFROM students s\nINNER JOIN departments d ON s.dept_id = d.dept_id;"
  },
  {
    question: "Why should you use `COUNT(child_table.id)` instead of `COUNT(*)` when counting children with `LEFT JOIN`?",
    shortAnswer: "Because `COUNT(*)` counts the returned NULL row for parent records with 0 children as 1, while `COUNT(child.id)` correctly returns 0.",
    explanation: "`COUNT(column)` ignores NULLs, whereas `COUNT(*)` counts the row presence.",
    hint: "COUNT(column) ignores NULLs; COUNT(*) does not.",
    level: "moderate",
    codeExample: "SELECT d.dept_name, COUNT(s.student_id) AS student_count\nFROM departments d\nLEFT JOIN students s ON d.dept_id = s.dept_id\nGROUP BY d.dept_id, d.dept_name;"
  },
  {
    question: "What index does MySQL InnoDB automatically create on a Foreign Key column in the child table?",
    shortAnswer: "A secondary B-Tree index on the Foreign Key column (if an index on that column does not already exist).",
    explanation: "InnoDB requires an index on foreign keys to accelerate referential checks and cascading updates/deletes.",
    hint: "Automatic secondary B-Tree index.",
    level: "moderate"
  },
  {
    question: "What happens if a Foreign Key column in a 1:N relationship is declared `NOT NULL`?",
    shortAnswer: "Participation is mandatory: every child record must belong to an existing parent entity; orphan rows cannot exist.",
    explanation: "Enforces mandatory modality (1..N).",
    hint: "Mandatory parent assignment.",
    level: "basic"
  },
  {
    question: "What happens if a Foreign Key column in a 1:N relationship is declared `NULL`?",
    shortAnswer: "Participation is optional: child records are allowed to exist with `dept_id = NULL` (unassigned/unaffiliated children).",
    explanation: "Enforces optional modality (0..N).",
    hint: "Optional parent assignment.",
    level: "basic"
  },
  {
    question: "In Crow's Foot notation, how is a Mandatory One-to-Many relationship (1..N) drawn?",
    shortAnswer: "Two vertical bars (`||`) on the 'One' end, and a vertical bar with a three-pronged fork (`|<`) on the 'Many' end.",
    explanation: "Indicates exactly one parent and one or more children.",
    hint: "|| on parent end; |< on child end.",
    level: "basic"
  },
  {
    question: "In Crow's Foot notation, how is an Optional One-to-Many relationship (0..N) drawn?",
    shortAnswer: "Two vertical bars (`||`) on the 'One' end, and a circle with a three-pronged fork (`O<`) on the 'Many' end.",
    explanation: "Indicates exactly one parent and zero, one, or more children.",
    hint: "|| on parent end; O< on child end.",
    level: "basic"
  },
  {
    question: "How do you find all parent records that currently have ZERO child records in a 1:N relationship?",
    shortAnswer: "Using an anti-join: `SELECT d.* FROM departments d LEFT JOIN students s ON d.dept_id = s.dept_id WHERE s.dept_id IS NULL;`.",
    explanation: "Identifies empty departments with no enrolled students.",
    hint: "LEFT JOIN WHERE child.fk IS NULL.",
    level: "moderate",
    codeExample: "SELECT d.dept_name\nFROM departments d\nLEFT JOIN students s ON d.dept_id = s.dept_id\nWHERE s.student_id IS NULL;"
  },
  {
    question: "What is the difference between a 1:N relationship and a 1:1 relationship at the SQL constraint level?",
    shortAnswer: "In a 1:1 relationship, the Foreign Key column has a `UNIQUE` constraint; in a 1:N relationship, the Foreign Key column permits duplicate values.",
    explanation: "Allowing duplicate parent IDs in the child table enables multiple children per parent.",
    hint: "Lack of UNIQUE constraint allows multiple children.",
    level: "basic"
  },
  {
    question: "How does `ON DELETE RESTRICT` behave in a 1:N relationship when attempting to delete a parent record with children?",
    shortAnswer: "MySQL rejects the parent delete with Error 1451 until all child records referencing that parent are first deleted or reassigned.",
    explanation: "Prevents accidental mass loss of child data.",
    hint: "Blocks parent deletion if children exist.",
    level: "basic"
  },
  {
    question: "How does `ON DELETE CASCADE` behave in a 1:N relationship?",
    shortAnswer: "Deleting a parent record causes MySQL to automatically and atomically delete ALL corresponding child records in the 1:N table.",
    explanation: "Useful for master-detail relationships like Order -> Order Items.",
    hint: "Automatically deletes all child records.",
    level: "basic",
    codeExample: "CONSTRAINT fk_order_items FOREIGN KEY (order_id)\nREFERENCES orders(order_id) ON DELETE CASCADE"
  },
  {
    question: "How does `ON DELETE SET NULL` behave in a 1:N relationship?",
    shortAnswer: "Deleting a parent record updates all matching child records to have `NULL` in their foreign key column.",
    explanation: "Requires the foreign key column to be nullable (`NULL`).",
    hint: "Sets child foreign keys to NULL upon parent deletion.",
    level: "moderate"
  },
  {
    question: "Can a child table in a 1:N relationship participate in another 1:N relationship as a parent?",
    shortAnswer: "Yes, creating a hierarchical multi-tier cascade (e.g. Department (1) -> Student (N) -> Payment (N)).",
    explanation: "Relational modeling supports multi-level parent-child tree graphs.",
    hint: "Multi-tier hierarchical cascades.",
    level: "moderate"
  },
  {
    question: "Why should database developers explicitly specify `ON UPDATE CASCADE` on 1:N foreign keys?",
    shortAnswer: "So that if a parent's primary key is ever updated, all matching child foreign keys are automatically updated, preventing broken links.",
    explanation: "Ensures referential synchronization upon primary key updates.",
    hint: "Propagates parent key updates to children.",
    level: "moderate"
  },
  {
    question: "What is a 'Surrogate Key' vs a 'Natural Key' in 1:N parent-child relationships?",
    shortAnswer: "A Surrogate Key is a system-generated integer (e.g. `student_id AUTO_INCREMENT`), while a Natural Key is a real-world unique attribute (e.g. `aadhaar_no` or `roll_no`).",
    explanation: "Surrogate keys are preferred for foreign key links because integer joins are faster and immune to business logic changes.",
    hint: "Generated integer ID vs real-world identifier.",
    level: "moderate"
  },
  {
    question: "How does composite indexing on `(dept_id, admission_fee)` in the child table improve 1:N query performance?",
    shortAnswer: "It allows queries filtering by department and sorting by fee to execute via an index range scan with zero extra temporary file sorting.",
    explanation: "Composite indexes covering the FK accelerate filtered aggregations.",
    hint: "Accelerates filtered department queries.",
    level: "expert",
    codeExample: "CREATE INDEX idx_students_dept_fee ON students(dept_id, admission_fee);"
  },
  {
    question: "What is the N+1 Query Problem in ORMs when fetching 1:N relationships?",
    shortAnswer: "Executing 1 query to fetch N parent records, and then executing N additional queries (1 per parent) to fetch each parent's child records.",
    explanation: "Solved in SQL by executing a single `JOIN` query or batch fetching with `WHERE parent_id IN (...)`.",
    hint: "N individual child queries instead of a single JOIN.",
    level: "expert"
  },
  {
    question: "Can a 1:N relationship have additional attributes attached to the relationship itself?",
    shortAnswer: "In pure relational design, attributes describing the relationship (e.g. `enrollment_date`) belong directly in the child table on the 'MANY' side.",
    explanation: "Since the child record is uniquely associated with that link, relationship attributes live in the child table.",
    hint: "Relationship attributes live in the child table.",
    level: "moderate"
  },
  {
    question: "How do you calculate the total revenue generated per student in a 1:N Student-Payments schema?",
    shortAnswer: "`SELECT s.student_name, COALESCE(SUM(p.amount_paid), 0) AS total_revenue FROM students s LEFT JOIN student_payments p ON s.student_id = p.student_id GROUP BY s.student_id, s.student_name;`.",
    explanation: "Uses SUM aggregate with COALESCE to handle students with 0 payments.",
    hint: "SUM aggregate with COALESCE and LEFT JOIN.",
    level: "basic",
    codeExample: "SELECT s.first_name, COALESCE(SUM(p.amount_paid), 0) AS total_paid\nFROM students s\nLEFT JOIN student_payments p ON s.student_id = p.student_id\nGROUP BY s.student_id, s.first_name;"
  },
  {
    question: "What is the maximum number of child records a parent can have in a 1:N relationship in MySQL InnoDB?",
    shortAnswer: "Virtually unlimited (governed only by the integer capacity of the child's primary key, e.g. 18.4 quintillion for `BIGINT UNSIGNED`).",
    explanation: "InnoDB storage allows billions of rows referencing the same parent ID.",
    hint: "Unlimited by relational theory; bounded only by integer scale.",
    level: "basic"
  },
  {
    question: "Can a single parent table have multiple child tables in independent 1:N relationships?",
    shortAnswer: "Yes, e.g. `students` (1) -> `student_payments` (N) and `students` (1) -> `student_attendance` (N).",
    explanation: "Standard star/hub relational architecture.",
    hint: "Multiple child tables referencing one parent.",
    level: "basic"
  },
  {
    question: "How do you prevent duplicate child records for the same parent when multiple attributes should be unique together?",
    shortAnswer: "Add a Composite `UNIQUE` constraint in the child table: `CONSTRAINT uq_student_receipt UNIQUE (student_id, receipt_no)`.",
    explanation: "Enforces uniqueness per parent scope.",
    hint: "Composite UNIQUE constraint across parent ID and child attribute.",
    level: "moderate",
    codeExample: "CONSTRAINT uq_dept_role UNIQUE (dept_id, role_name)"
  },
  {
    question: "What is the risk of deeply nested cascading deletes in a multi-tier 1:N schema (e.g. Level 1 -> Level 2 -> Level 3)?",
    shortAnswer: "Deleting a single top-level record can trigger thousands of cascaded lock acquisitions and row deletions, stalling the InnoDB engine and causing transaction timeouts.",
    explanation: "High-volume cascades should be executed in smaller application batches.",
    hint: "Lock escalation and transaction timeouts on large cascades.",
    level: "expert"
  },
  {
    question: "Why does an `INNER JOIN` exclude parent records that have no children in a 1:N relationship?",
    shortAnswer: "Because `INNER JOIN` requires a match on both sides of the join condition; if no child rows exist, the join predicate fails.",
    explanation: "Use `LEFT JOIN` when parents with 0 children must be preserved in query output.",
    hint: "INNER JOIN requires matches on both sides.",
    level: "basic"
  },
  {
    question: "How do you verify the parent-child relationship link using `EXPLAIN` in MySQL?",
    shortAnswer: "Check the `EXPLAIN` plan to confirm the join uses `type: ref` or `type: eq_ref` and utilizes the Foreign Key index (`key: fk_name`).",
    explanation: "Confirms efficient indexed B-Tree join seeks.",
    hint: "type: ref using foreign key index.",
    level: "expert",
    codeExample: "EXPLAIN SELECT * FROM students s JOIN departments d ON s.dept_id = d.dept_id;"
  },
  {
    question: "Can a table in a 1:N relationship have a foreign key that references a non-primary key column in the parent table?",
    shortAnswer: "Yes, MySQL InnoDB allows foreign keys to reference any column in the parent table as long as that column is indexed with a `UNIQUE` constraint.",
    explanation: "Referenced column must be unique to guarantee at most 1 parent row.",
    hint: "Allowed if referenced parent column is UNIQUE.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist for implementing One-to-Many (1:N) relationships in production MySQL databases?",
    shortAnswer: "1) Always place the Foreign Key on the 'MANY' side. 2) Mark FK `NOT NULL` for mandatory participation. 3) Define explicit constraint names (`fk_child_parent`). 4) Configure appropriate referential actions (`ON DELETE RESTRICT/CASCADE`). 5) Use `LEFT JOIN` and `COUNT(child.id)` for reports with 0-child parents.",
    explanation: "Following these 5 rules ensures high-performance 1:N relational modeling without orphaned data.",
    hint: "FK on Many side, NOT NULL for mandatory, Explicit naming, Cascading rules, LEFT JOIN with COUNT(col).",
    level: "basic"
  }
];

export default questions;
