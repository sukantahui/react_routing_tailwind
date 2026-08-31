// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is Aggregation in Entity-Relationship (ER) modeling?",
    shortAnswer: "An abstraction mechanism that treats a relationship (and its participating entities) as a higher-level composite entity so that it can participate in subsequent relationships with other entities.",
    explanation: "Allows modeling relationships between relationships and entities.",
    hint: "Treating a relationship as a higher-level composite entity.",
    level: "basic"
  },
  {
    question: "Why was the Aggregation abstraction introduced in ER modeling?",
    shortAnswer: "Because standard Peter Chen ER notation only allows relationships between ENTITIES, making it impossible to attach a relationship directly to another relationship without aggregation.",
    explanation: "Resolves the limitation of relationship-to-relationship associations.",
    hint: "Enables relationships to connect to existing relationships.",
    level: "basic"
  },
  {
    question: "How is Aggregation represented visually in Peter Chen ER notation?",
    shortAnswer: "By enclosing the participating entity rectangles and their connecting relationship diamond inside a LARGE BOUNDING RECTANGLE.",
    explanation: "Standard visual bounding box for aggregated units.",
    hint: "Large bounding rectangle enclosing the relationship and its entities.",
    level: "basic"
  },
  {
    question: "What is the key semantic difference between Aggregation and a Ternary Relationship?",
    shortAnswer: "A Ternary relationship is an atomic 3-way simultaneous association; Aggregation represents a 2-tier process where an outer entity interacts with a pre-existing 2-way relationship.",
    explanation: "Simultaneous 3-way event vs tiered interaction on an existing link.",
    hint: "Simultaneous 3-way link vs tiered interaction on pre-existing link.",
    level: "expert"
  },
  {
    question: "How is an Aggregated relationship mapped into a relational schema in MySQL?",
    shortAnswer: "Tier 1: A bridge table with Composite PK `(A_id, B_id)`; Tier 2: A higher-level table whose Foreign Key is a COMPOSITE pointer `(A_id, B_id)` referencing Tier 1.",
    explanation: "Two-tier table hierarchy linked via composite foreign key.",
    hint: "Tier 1 bridge table referenced by Tier 2 composite foreign key.",
    level: "moderate",
    codeExample: "CREATE TABLE student_enrollments (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    PRIMARY KEY (student_id, course_id)\n);\nCREATE TABLE enrollment_mentors (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    faculty_id INT NOT NULL,\n    PRIMARY KEY (student_id, course_id, faculty_id),\n    FOREIGN KEY (student_id, course_id) REFERENCES student_enrollments(student_id, course_id) ON DELETE CASCADE\n);"
  },
  {
    question: "What happens if a student unenrolls from a course in an Aggregation schema with `ON DELETE CASCADE`?",
    shortAnswer: "Deleting the row in `student_enrollments` automatically cascades and deletes all corresponding mentorship records in `enrollment_mentors`.",
    explanation: "Composite foreign key CASCADE guarantees cleanup.",
    hint: "Mentorship records are automatically purged via CASCADE.",
    level: "basic"
  },
  {
    question: "Can an entity participate in an Aggregated relationship at a DIFFERENT TIME than when the base relationship was formed?",
    shortAnswer: "Yes, this temporal independence is a major advantage of Aggregation over Ternary modeling (e.g. assigning a project evaluator 3 months after the project began).",
    explanation: "Decouples creation timing between base link and higher-level link.",
    hint: "Temporal independence between base link and higher-level link.",
    level: "moderate"
  },
  {
    question: "What is a real-world example of Aggregation in hospital management?",
    shortAnswer: "`Doctor` prescribes `Treatment` to `Patient` (Aggregated unit), and an `Insurance_Auditor` audits that specific prescription at a later audit date.",
    explanation: "Auditing an existing medical prescription association.",
    hint: "Auditor reviewing an existing doctor-patient prescription.",
    level: "basic"
  },
  {
    question: "Why should the Foreign Key in Tier 2 reference `(student_id, course_id)` as a composite pair rather than referencing `students` and `courses` individually?",
    shortAnswer: "Referencing them individually allows assigning a mentor to a student for a course they NEVER enrolled in; referencing the composite key guarantees that only valid, active enrollments can have mentors.",
    explanation: "Crucial foreign key integrity principle in aggregation schemas.",
    hint: "Guarantees mentorship can only exist for valid active enrollments.",
    level: "expert"
  },
  {
    question: "How do you query all course enrollments that currently have NO assigned mentor using SQL?",
    shortAnswer: "`SELECT e.student_id, e.course_id FROM student_enrollments e LEFT JOIN enrollment_mentors m ON e.student_id = m.student_id AND e.course_id = m.course_id WHERE m.faculty_id IS NULL;`.",
    explanation: "Anti-join on composite foreign key.",
    hint: "LEFT JOIN on composite key WHERE m.faculty_id IS NULL.",
    level: "basic"
  },
  {
    question: "Can an Aggregated unit participate in MULTIPLE different higher-level relationships?",
    shortAnswer: "Yes (e.g. `[Employee] ──< Works_On >── [Project]` can be 'Monitored_By' a Manager AND 'Funded_By' a Sponsor).",
    explanation: "Multiple higher-level relationships connecting to the same bounding rectangle.",
    hint: "Yes, multiple higher-level relationships can connect to it.",
    level: "moderate"
  },
  {
    question: "How does UML Class Diagram notation represent Aggregation in this ER sense?",
    shortAnswer: "By defining an Association Class for the base link, and then drawing a separate Association Line from the outer class to that Association Class.",
    explanation: "UML association class with outer association lines.",
    hint: "Association Class connected to an outer class association.",
    level: "expert"
  },
  {
    question: "What is an 'Associative Entity' and how does it relate to Aggregation?",
    shortAnswer: "An Associative Entity is the physical realization of Aggregation: turning an M:N relationship table into a first-class named entity with foreign keys pointing to it.",
    explanation: "Bridge table promoted to a parent entity.",
    hint: "Bridge table promoted to a first-class named entity.",
    level: "moderate"
  },
  {
    question: "How do you define a composite foreign key referencing an aggregated table in MySQL InnoDB?",
    shortAnswer: "`CONSTRAINT fk_name FOREIGN KEY (col1, col2) REFERENCES parent_table(col1, col2) ON DELETE CASCADE`.",
    explanation: "Syntax for composite foreign key constraint.",
    hint: "FOREIGN KEY (col1, col2) REFERENCES parent(col1, col2).",
    level: "basic",
    codeExample: "CONSTRAINT fk_mentor_enroll FOREIGN KEY (student_id, course_id)\n    REFERENCES student_enrollments(student_id, course_id) ON DELETE CASCADE"
  },
  {
    question: "What error occurs if you try to insert into `enrollment_mentors` with a `(student_id, course_id)` pair that does NOT exist in `student_enrollments`?",
    shortAnswer: "MySQL immediately aborts with Error 1452 (Cannot add or update a child row: foreign key constraint fails).",
    explanation: "Referential integrity failure on composite foreign key.",
    hint: "Error 1452.",
    level: "basic"
  },
  {
    question: "Can an Aggregated unit contain a Weak Entity inside its bounding box?",
    shortAnswer: "Yes, any valid ER entity-relationship cluster can be enclosed within an aggregation bounding rectangle if business rules require higher-level associations.",
    explanation: "Composition of complex sub-models.",
    hint: "Yes, complex entity clusters can be aggregated.",
    level: "expert"
  },
  {
    question: "Why does converting an Aggregation into a single 3-way flat table cause data redundancy?",
    shortAnswer: "Because if one employee-project assignment has multiple supervisors or multiple reviews, the employee-project base attributes are repeated across every review row.",
    explanation: "Violates 2NF/3NF through row multiplication.",
    hint: "Repeats base assignment attributes on every review row.",
    level: "moderate"
  },
  {
    question: "How many Primary Key columns exist in `enrollment_mentors` if a faculty can mentor an enrollment only once?",
    shortAnswer: "Three columns: `PRIMARY KEY (student_id, course_id, faculty_id)`.",
    explanation: "Composite primary key covering both dimensions.",
    hint: "Composite of student_id, course_id, and faculty_id.",
    level: "basic"
  },
  {
    question: "How do you count the number of active mentors per student across all enrolled courses?",
    shortAnswer: "`SELECT s.full_name, COUNT(m.faculty_id) AS total_mentors FROM students s JOIN student_enrollments e ON s.student_id = e.student_id LEFT JOIN enrollment_mentors m ON e.student_id = m.student_id AND e.course_id = m.course_id GROUP BY s.student_id, s.full_name;`.",
    explanation: "Chained aggregation query spanning 3 tables.",
    hint: "Chained join from students → enrollments → mentors with COUNT.",
    level: "moderate"
  },
  {
    question: "What is 'Nested Aggregation' in advanced ER modeling?",
    shortAnswer: "An aggregation bounding box that encloses another aggregation bounding box, creating multi-tiered structural hierarchies.",
    explanation: "Multi-level relational composition.",
    hint: "Bounding box enclosing another bounding box.",
    level: "expert"
  },
  {
    question: "How do you enforce that a faculty cannot mentor a student in a course unless the faculty is in the SAME department as the course?",
    shortAnswer: "Using a `BEFORE INSERT` trigger on `enrollment_mentors` that validates that `faculty.dept_id == courses.dept_id`.",
    explanation: "Cross-table semantic integrity check.",
    hint: "BEFORE INSERT trigger validating department match.",
    level: "expert"
  },
  {
    question: "Why is Aggregation rarely supported natively in basic ER drawing tools?",
    shortAnswer: "Because simple visual diagramming tools only support direct node-to-node links; drawing a relationship line connecting to another relationship line requires special bounding box support.",
    explanation: "Diagramming toolchain limitations.",
    hint: "Requires visual bounding box support around relationships.",
    level: "basic"
  },
  {
    question: "How is an Aggregation schema queried using a database View in MySQL?",
    shortAnswer: "Create a View `vw_mentored_enrollments` joining `students`, `courses`, `student_enrollments`, `enrollment_mentors`, and `faculty`.",
    explanation: "Unified virtual reporting interface.",
    hint: "Multi-table join encapsulated inside a View.",
    level: "basic"
  },
  {
    question: "Can an Aggregation be modeled using a surrogate Primary Key on the Tier 1 table?",
    shortAnswer: "Yes: `enrollments(enrollment_id AUTO_INCREMENT PRIMARY KEY)`, and Tier 2 simply stores `enrollment_id` as a single-column foreign key.",
    explanation: "Surrogate realization of aggregation (extremely common in industry).",
    hint: "Surrogate enrollment_id PK referenced by Tier 2 table.",
    level: "moderate",
    codeExample: "CREATE TABLE enrollments (enrollment_id INT AUTO_INCREMENT PRIMARY KEY, student_id INT, course_id INT);\nCREATE TABLE mentors (mentor_assignment_id INT PRIMARY KEY, enrollment_id INT, faculty_id INT, FOREIGN KEY (enrollment_id) REFERENCES enrollments(enrollment_id) ON DELETE CASCADE);"
  },
  {
    question: "What is the advantage of using a Surrogate Primary Key on the Tier 1 table in Aggregation?",
    shortAnswer: "It simplifies foreign keys in Tier 2 from a composite key `(student_id, course_id)` to a single compact integer column `enrollment_id`.",
    explanation: "Reduces index width and foreign key complexity in child tables.",
    hint: "Reduces composite foreign key to a single integer ID.",
    level: "moderate"
  },
  {
    question: "What is the risk of using a Surrogate Key on the Tier 1 table without a UNIQUE constraint on `(student_id, course_id)`?",
    shortAnswer: "A student could be accidentally enrolled in the same course multiple times with different `enrollment_id` values, creating duplicate enrollments.",
    explanation: "Always add UNIQUE (student_id, course_id) when using surrogate keys.",
    hint: "Allows duplicate enrollments unless UNIQUE constraint is added.",
    level: "moderate"
  },
  {
    question: "How do you index Tier 2 `enrollment_mentors` for queries searching by `faculty_id`?",
    shortAnswer: "`CREATE INDEX idx_mentor_faculty ON enrollment_mentors(faculty_id);`.",
    explanation: "Secondary index to support reverse lookups by faculty.",
    hint: "Secondary index on faculty_id.",
    level: "basic"
  },
  {
    question: "How does Crow's Foot notation represent Aggregation?",
    shortAnswer: "By drawing the Tier 1 junction table as a standard entity box, and connecting a Crow's Foot 1:N relationship line from that junction table to the Tier 2 table.",
    explanation: "Crow's foot naturally represents aggregation through junction tables.",
    hint: "Standard 1:N line from junction table to Tier 2 table.",
    level: "moderate"
  },
  {
    question: "What is the relationship between Aggregation and First Normal Form (1NF)?",
    shortAnswer: "Aggregation structures multi-tier associations into distinct 1NF atomic tables, preventing nested array columns or comma-separated lists.",
    explanation: "Enforces relational normalization.",
    hint: "Prevents non-atomic multi-tier arrays.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for modeling Aggregation in ER diagrams and schemas?",
    shortAnswer: "1) Identify relationships that need to be related to another entity. 2) Enclose the base relationship and entities in a bounding box. 3) Connect outer entity to the box. 4) Map Tier 1 to a bridge table with Composite PK or Surrogate PK with UNIQUE. 5) Map Tier 2 using composite FK with `ON DELETE CASCADE`.",
    explanation: "Following these 5 rules guarantees seamless aggregation modeling and robust integrity.",
    hint: "Bounding box in ER, Tier 1 bridge table, Composite FK in Tier 2, ON DELETE CASCADE.",
    level: "basic"
  }
];

export default questions;
