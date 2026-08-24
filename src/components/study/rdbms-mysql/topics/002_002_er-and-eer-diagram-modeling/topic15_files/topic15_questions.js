// topic15_files/topic15_questions.js

const questions = [
  {
    question: "What is Step 5 of the ER-to-Relational Mapping Algorithm?",
    shortAnswer: "Mapping Binary Many-to-Many (M:N) Relationship Types and Higher-Degree n-ary Relationship Types into dedicated Bridge / Junction Tables.",
    explanation: "Constructs bridge tables for multi-cardinality associations.",
    hint: "Mapping M:N and n-ary relationships to junction tables.",
    level: "basic"
  },
  {
    question: "Why CANNOT an M:N relationship be mapped by embedding foreign keys into either entity table?",
    shortAnswer: "Because each entity relates to MULTIPLE instances on the other side; embedding foreign keys would require multi-valued arrays, violating First Normal Form (1NF).",
    explanation: "Violates 1NF atomicity.",
    hint: "Requires multi-valued arrays violating 1NF.",
    level: "basic"
  },
  {
    question: "What is the structure of a Bridge / Junction table for a binary M:N relationship?",
    shortAnswer: "A table containing the Primary Keys of both participating entities as Foreign Keys, forming a Composite Primary Key `PRIMARY KEY (A_id, B_id)`, plus any relationship descriptive attributes.",
    explanation: "Standard binary junction table schema.",
    hint: "Composite PK of both entity foreign keys + relationship attributes.",
    level: "basic"
  },
  {
    question: "Where do relationship descriptive attributes go when mapping an M:N relationship in Step 5?",
    shortAnswer: "They are placed directly as simple columns in the Bridge / Junction table (e.g. `enrolled_date`, `final_grade`).",
    explanation: "Descriptive attributes belong to the association row itself.",
    hint: "Directly in the bridge table.",
    level: "basic"
  },
  {
    question: "How is an n-ary relationship (e.g. Ternary M:N:P) mapped in Step 5?",
    shortAnswer: "Create a dedicated table containing the Primary Keys of ALL $n$ participating entities as Foreign Keys, with a composite primary key spanning all $n$ foreign keys (unless a 1-constraint exists).",
    explanation: "n-way composite primary key table.",
    hint: "Junction table with composite PK of all n participating foreign keys.",
    level: "moderate",
    codeExample: "CREATE TABLE prescriptions (\n    doctor_id INT NOT NULL,\n    patient_id INT NOT NULL,\n    medicine_id INT NOT NULL,\n    dosage VARCHAR(100),\n    PRIMARY KEY (doctor_id, patient_id, medicine_id),\n    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,\n    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,\n    FOREIGN KEY (medicine_id) REFERENCES medicines(medicine_id) ON DELETE CASCADE\n);"
  },
  {
    question: "What happens if an n-ary relationship has a 1-cardinality constraint on one entity $E_1$ (1:N:M)?",
    shortAnswer: "The Primary Key of the junction table consists of the composite of the remaining $n-1$ foreign keys, EXCLUDING $E_1$'s primary key.",
    explanation: "1-cardinality restricts the key definition.",
    hint: "Excludes the 1-side entity PK from the composite primary key.",
    level: "expert"
  },
  {
    question: "Why should `ON DELETE CASCADE` be specified on foreign keys in a Bridge Table?",
    shortAnswer: "To ensure that if a student or course is deleted from the system, all corresponding enrollment records in the bridge table are automatically cleaned up.",
    explanation: "Prevents orphaned bridge records.",
    hint: "Automatically purges bridge rows when parent entities are deleted.",
    level: "basic"
  },
  {
    question: "Why is a secondary index on the SECOND column of `PRIMARY KEY (student_id, course_id)` recommended in MySQL?",
    shortAnswer: "Because B-Tree composite indexes can only be used from left to right; queries filtering by `course_id` alone cannot use the composite PK index and need `CREATE INDEX idx_course ON enrollments(course_id)`.",
    explanation: "Leftmost index prefix rule in B-Tree indexes.",
    hint: "Enables fast lookups by the second column (course_id).",
    level: "expert"
  },
  {
    question: "What is the surrogate key variation of a junction table, and what must be included?",
    shortAnswer: "Adding `id INT AUTO_INCREMENT PRIMARY KEY` to the junction table; you MUST include a `UNIQUE (student_id, course_id)` constraint to prevent duplicate links.",
    explanation: "Surrogate PK with composite UNIQUE constraint.",
    hint: "Surrogate ID + UNIQUE (col1, col2) constraint.",
    level: "moderate",
    codeExample: "CREATE TABLE student_course_enrollments (\n    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    UNIQUE KEY uq_student_course (student_id, course_id),\n    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,\n    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE\n);"
  },
  {
    question: "How do you query all courses taken by student #101 using SQL?",
    shortAnswer: "`SELECT c.course_id, c.course_title FROM courses c JOIN student_course_enrollments e ON c.course_id = e.course_id WHERE e.student_id = 101;`.",
    explanation: "2-way join through junction table.",
    hint: "JOIN courses to junction table WHERE student_id = 101.",
    level: "basic"
  },
  {
    question: "How do you query all students enrolled in course #1 along with their grades?",
    shortAnswer: "`SELECT s.student_id, s.full_name, e.final_grade FROM students s JOIN student_course_enrollments e ON s.student_id = e.student_id WHERE e.course_id = 1;`.",
    explanation: "Reverse join through junction table.",
    hint: "JOIN students to junction table WHERE course_id = 1.",
    level: "basic"
  },
  {
    question: "How do you count total student enrollments per course in SQL?",
    shortAnswer: "`SELECT c.course_title, COUNT(e.student_id) AS total_enrolled FROM courses c LEFT JOIN student_course_enrollments e ON c.course_id = e.course_id GROUP BY c.course_id, c.course_title;`.",
    explanation: "LEFT JOIN aggregation on bridge table.",
    hint: "LEFT JOIN courses to bridge table with COUNT.",
    level: "basic"
  },
  {
    question: "How is a recursive M:N relationship (e.g. Course 'Requires_Prerequisite' Course) mapped in Step 5?",
    shortAnswer: "A junction table with two foreign keys both referencing `courses`: `course_id` and `prereq_course_id`, with `PRIMARY KEY (course_id, prereq_course_id)`.",
    explanation: "Self-referencing M:N bridge table.",
    hint: "Two foreign keys both referencing the same parent table.",
    level: "moderate",
    codeExample: "CREATE TABLE course_prerequisites (\n    course_id INT NOT NULL,\n    prereq_course_id INT NOT NULL,\n    PRIMARY KEY (course_id, prereq_course_id),\n    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,\n    FOREIGN KEY (prereq_course_id) REFERENCES courses(course_id) ON DELETE CASCADE\n);"
  },
  {
    question: "How do you prevent a course from being its own prerequisite in MySQL?",
    shortAnswer: "Add a `CHECK` constraint: `CHECK (course_id != prereq_course_id)`.",
    explanation: "Row-level check constraint preventing self-referencing loops.",
    hint: "CHECK (course_id != prereq_course_id).",
    level: "basic"
  },
  {
    question: "What happens if a developer tries to insert `(101, 1)` into a junction table where `(101, 1)` already exists?",
    shortAnswer: "MySQL immediately aborts with Error 1062 (Duplicate entry '101-1' for key 'PRIMARY').",
    explanation: "Primary key uniqueness protection.",
    hint: "Error 1062 duplicate entry.",
    level: "basic"
  },
  {
    question: "What is an 'Associative Entity' in relation to Step 5 Bridge Tables?",
    shortAnswer: "An M:N bridge table that is treated as a full-fledged independent entity with its own business relationships and attributes (e.g. promoting `Enrollment` to an entity).",
    explanation: "Elevating bridge tables into parent entities.",
    hint: "Promoting a junction table into a first-class named entity.",
    level: "moderate"
  },
  {
    question: "How many foreign keys exist in a Quaternary (4-way) relationship junction table?",
    shortAnswer: "Four foreign keys, one pointing to each of the 4 participating entity tables.",
    explanation: "n foreign keys for n-ary relationships.",
    hint: "Four foreign keys.",
    level: "basic"
  },
  {
    question: "How do you find students who have enrolled in BOTH course #1 AND course #2 using SQL?",
    shortAnswer: "`SELECT student_id FROM student_course_enrollments WHERE course_id IN (1, 2) GROUP BY student_id HAVING COUNT(DISTINCT course_id) = 2;`.",
    explanation: "Relational division / group-having pattern.",
    hint: "GROUP BY student_id HAVING COUNT(DISTINCT course_id) = 2.",
    level: "moderate"
  },
  {
    question: "Why should junction tables never store redundant columns like `student_name` or `course_title`?",
    shortAnswer: "Because it violates 2NF/3NF normalization, introduces data redundancy, and causes update anomalies when a name or title changes.",
    explanation: "Transitive dependency violation.",
    hint: "Violates 2NF/3NF and causes update anomalies.",
    level: "basic"
  },
  {
    question: "How do you perform a batch multi-row insert into an M:N bridge table in MySQL?",
    shortAnswer: "`INSERT INTO student_course_enrollments (student_id, course_id) VALUES (101, 1), (101, 2), (102, 1);`.",
    explanation: "Multi-row INSERT syntax.",
    hint: "INSERT INTO table (col1, col2) VALUES (v1, v2), (v3, v4).",
    level: "basic"
  },
  {
    question: "How do you delete a specific enrollment association without deleting either the student or the course?",
    shortAnswer: "`DELETE FROM student_course_enrollments WHERE student_id = 101 AND course_id = 1;`.",
    explanation: "Deletes only the bridge link row.",
    hint: "DELETE FROM bridge_table WHERE student_id = 101 AND course_id = 1.",
    level: "basic"
  },
  {
    question: "What is the difference between a Bridge Table in Step 5 and a Weak Entity Table in Step 2?",
    shortAnswer: "A Bridge Table connects TWO OR MORE independent strong entities in an M:N link; a Weak Entity Table connects an owner entity to an existence-dependent child entity with a partial key.",
    explanation: "Independent M:N link vs Owner-dependent partial key.",
    hint: "Independent M:N link vs Owner-dependent child entity.",
    level: "expert"
  },
  {
    question: "How does JPA / Hibernate map M:N relationships in Java?",
    shortAnswer: "Using `@ManyToMany` and `@JoinTable(name = 'student_course_enrollments', joinColumns = ..., inverseJoinColumns = ...)`.",
    explanation: "Standard JPA annotation for M:N junction tables.",
    hint: "@ManyToMany with @JoinTable.",
    level: "expert"
  },
  {
    question: "How do you calculate the total tuition revenue generated across all course enrollments?",
    shortAnswer: "`SELECT SUM(c.tuition_fee) AS total_revenue FROM courses c JOIN student_course_enrollments e ON c.course_id = e.course_id;`.",
    explanation: "Aggregated sum through bridge table.",
    hint: "SUM(c.tuition_fee) joining courses to bridge table.",
    level: "basic"
  },
  {
    question: "What happens if `course_id` is updated in the `courses` table when the bridge table has `ON UPDATE CASCADE`?",
    shortAnswer: "MySQL automatically and atomically updates all matching `course_id` values in `student_course_enrollments`.",
    explanation: "Synchronized key update propagation.",
    hint: "Updates all matching course_id values in the bridge table.",
    level: "basic"
  },
  {
    question: "Why should `PRIMARY KEY (student_id, course_id)` be ordered with the most frequently queried column FIRST?",
    shortAnswer: "Because the leftmost column benefits directly from the clustered index for single-column filtering without needing a secondary index.",
    explanation: "Index ordering optimization.",
    hint: "Leftmost column gets free indexing from the clustered PK.",
    level: "expert"
  },
  {
    question: "How does a View simplify querying student enrollments for frontend developers?",
    shortAnswer: "Create `vw_student_enrollments` joining `students`, `courses`, and `student_course_enrollments`.",
    explanation: "Unified reporting view over 3 tables.",
    hint: "Unified view joining students, courses, and bridge table.",
    level: "basic",
    codeExample: "CREATE VIEW vw_student_enrollment_details AS\nSELECT s.student_id, s.first_name, s.last_name, c.course_id, c.course_title, e.enrolled_date, e.final_grade\nFROM students s\nJOIN student_course_enrollments e ON s.student_id = e.student_id\nJOIN courses c ON e.course_id = c.course_id;"
  },
  {
    question: "Can an M:N bridge table contain audit timestamp columns?",
    shortAnswer: "Yes (e.g. `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`, `updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).",
    explanation: "Audit columns on junction tables.",
    hint: "Yes, created_at and updated_at timestamps.",
    level: "basic"
  },
  {
    question: "How many total rows are created in a junction table if 10 students enroll in 5 courses each?",
    shortAnswer: "50 rows ($10 \\times 5 = 50$).",
    explanation: "Multiplicative row cardinality in bridge tables.",
    hint: "10 * 5 = 50 rows.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for Step 5: Mapping M:N and n-ary Relationships?",
    shortAnswer: "1) Create a dedicated bridge table. 2) Include Foreign Keys from all participating entities. 3) Define Composite PK spanning the foreign keys. 4) Add relationship descriptive attributes. 5) Configure `ON DELETE CASCADE` on all FKs. 6) Add secondary index on the second composite column.",
    explanation: "Following these 6 rules guarantees high-speed, 100% normalized M:N and n-ary database schemas.",
    hint: "Dedicated bridge table, Composite PK, Relationship attributes, ON DELETE CASCADE, Secondary index on 2nd col.",
    level: "basic"
  }
];

export default questions;
