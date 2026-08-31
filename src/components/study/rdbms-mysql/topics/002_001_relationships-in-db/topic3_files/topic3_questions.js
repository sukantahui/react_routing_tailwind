// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is a Many-to-Many (M:N) relationship in database design?",
    shortAnswer: "An association where an entity in Table A can relate to multiple entities in Table B, and an entity in Table B can simultaneously relate to multiple entities in Table A.",
    explanation: "Examples: Students & Courses, Orders & Products, Authors & Books.",
    hint: "Multi-directional many multiplicity.",
    level: "basic"
  },
  {
    question: "Why cannot a Many-to-Many relationship be implemented directly with a Foreign Key in either table?",
    shortAnswer: "Because a single Foreign Key cell can only hold one scalar value; storing multiple IDs violates 1NF atomicity and prevents foreign key enforcement.",
    explanation: "Relational database engines require a Junction table to decompose M:N into two 1:N links.",
    hint: "Single scalar foreign key constraint limitation.",
    level: "basic"
  },
  {
    question: "What is a Bridge / Junction Table (Associative Entity)?",
    shortAnswer: "An intermediate table that connects two master tables by containing Foreign Keys referencing both tables' Primary Keys.",
    explanation: "Decomposes one M:N relationship into two clean 1:N relationships.",
    hint: "Intermediate connecting table with two foreign keys.",
    level: "basic",
    codeExample: "CREATE TABLE student_courses (\n    student_id INT,\n    course_id INT,\n    PRIMARY KEY (student_id, course_id),\n    FOREIGN KEY (student_id) REFERENCES students(student_id),\n    FOREIGN KEY (course_id) REFERENCES courses(course_id)\n);"
  },
  {
    question: "What is the primary key strategy typically used in a pure Junction table?",
    shortAnswer: "A Composite Primary Key consisting of the two Foreign Key columns `(student_id, course_id)`.",
    explanation: "Guarantees that a student cannot be enrolled in the exact same course twice.",
    hint: "Composite Primary Key across both FK columns.",
    level: "basic"
  },
  {
    question: "What are 'Relationship Attributes' (Payload Attributes) in a Junction Table?",
    shortAnswer: "Columns that describe the relationship event itself (e.g. `enrolled_at`, `final_grade`, `order_quantity`, `unit_price_at_purchase`).",
    explanation: "These attributes cannot belong to either parent table independently; they only exist at the intersection of both.",
    hint: "Attributes that exist only at the intersection of both entities.",
    level: "moderate"
  },
  {
    question: "How many `JOIN` operations are required to fetch data from both master entities in an M:N relationship?",
    shortAnswer: "TWO `JOIN` operations: Parent A → Junction Table → Parent B.",
    explanation: "Must traverse through the intermediate bridge table.",
    hint: "Two sequential JOIN operations.",
    level: "basic",
    codeExample: "SELECT s.first_name, c.course_title\nFROM students s\nJOIN student_courses sc ON s.student_id = sc.student_id\nJOIN courses c ON sc.course_id = c.course_id;"
  },
  {
    question: "Why should you create a reverse secondary index on `(course_id, student_id)` in the junction table?",
    shortAnswer: "Because the Composite Primary Key index `(student_id, course_id)` optimizes lookups starting with `student_id`, but cannot optimize reverse queries looking up all students in a `course_id`.",
    explanation: "B-Tree leftmost prefix rule requires a reverse index for fast reverse seeks.",
    hint: "Leftmost prefix rule requires reverse index.",
    level: "expert",
    codeExample: "CREATE INDEX idx_reverse_lookup ON student_courses(course_id, student_id);"
  },
  {
    question: "How does `ON DELETE CASCADE` behave on the foreign keys of a junction table?",
    shortAnswer: "Deleting either parent entity (e.g. deleting a student OR deleting a course) automatically deletes all corresponding intersection rows in the junction table.",
    explanation: "Prevents orphaned relationship rows when master entities are removed.",
    hint: "Automatically cleans up junction links.",
    level: "moderate"
  },
  {
    question: "When is it preferable to give a Junction Table its own standalone surrogate primary key (`id BIGINT AUTO_INCREMENT`)?",
    shortAnswer: "When the junction table acts as a full-fledged business entity that is referenced as a parent by other child tables (e.g. `enrollment_id` referenced by `attendance_logs`).",
    explanation: "Simplifies foreign key references from secondary child entities.",
    hint: "When other child tables reference the junction entity.",
    level: "expert",
    codeExample: "CREATE TABLE student_enrollments (\n    enrollment_id BIGINT AUTO_INCREMENT PRIMARY KEY,\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    UNIQUE (student_id, course_id)\n);"
  },
  {
    question: "How do you find all courses that student 'Mamata Hui' (ID 101) is currently enrolled in?",
    shortAnswer: "`SELECT c.course_title FROM courses c JOIN student_courses sc ON c.course_id = sc.course_id WHERE sc.student_id = 101;`.",
    explanation: "Standard indexed 2-table join starting from the junction.",
    hint: "JOIN courses with student_courses WHERE student_id = 101.",
    level: "basic"
  },
  {
    question: "How do you find all students who are NOT enrolled in any course?",
    shortAnswer: "Using an anti-join: `SELECT s.* FROM students s LEFT JOIN student_courses sc ON s.student_id = sc.student_id WHERE sc.student_id IS NULL;`.",
    explanation: "Identifies students with 0 junction table entries.",
    hint: "LEFT JOIN WHERE junction.student_id IS NULL.",
    level: "moderate",
    codeExample: "SELECT s.first_name\nFROM students s\nLEFT JOIN student_courses sc ON s.student_id = sc.student_id\nWHERE sc.student_id IS NULL;"
  },
  {
    question: "In Crow's Foot notation, how is a Many-to-Many relationship depicted conceptually before relational decomposition?",
    shortAnswer: "A single line with Crow's Foot forks (`O<` or `|<`) on BOTH ends of the relationship.",
    explanation: "In relational physical design, it is replaced by two 1:N lines pointing to the junction table.",
    hint: "Crow's foot forks on both ends.",
    level: "basic"
  },
  {
    question: "How do you count the total number of students enrolled in each course?",
    shortAnswer: "`SELECT c.course_title, COUNT(sc.student_id) AS total_students FROM courses c LEFT JOIN student_courses sc ON c.course_id = sc.course_id GROUP BY c.course_id, c.course_title;`.",
    explanation: "Using `COUNT(sc.student_id)` accurately outputs 0 for courses with no enrollments.",
    hint: "LEFT JOIN + GROUP BY + COUNT(child_col).",
    level: "basic"
  },
  {
    question: "What is an 'Associative Entity' in ER modeling?",
    shortAnswer: "A Many-to-Many relationship that has been promoted to entity status because it possesses its own attributes, identity, and relationships with other entities.",
    explanation: "Another term for a rich junction table with payload attributes.",
    hint: "Rich junction table with independent attributes.",
    level: "moderate"
  },
  {
    question: "How do you prevent a student from enrolling in the same course twice in a junction table that uses a surrogate `id` PK?",
    shortAnswer: "By adding an explicit Composite `UNIQUE (student_id, course_id)` constraint on the two foreign key columns.",
    explanation: "Guarantees uniqueness across the relationship tuple.",
    hint: "Composite UNIQUE constraint across both FK columns.",
    level: "moderate",
    codeExample: "CONSTRAINT uq_student_course UNIQUE (student_id, course_id)"
  },
  {
    question: "What happens if an `INSERT` statement attempts to add an existing `(student_id, course_id)` pair into a junction table with a Composite PK?",
    shortAnswer: "MySQL immediately aborts the insert with Error 1062: 'Duplicate entry ... for key 'PRIMARY''.",
    explanation: "Enforces duplicate enrollment prevention at the engine level.",
    hint: "Error 1062 duplicate entry on composite primary key.",
    level: "basic"
  },
  {
    question: "How do you find all students enrolled in BOTH 'MySQL' AND 'React' courses?",
    shortAnswer: "`SELECT s.student_name FROM students s JOIN student_courses sc ON s.student_id = sc.student_id JOIN courses c ON sc.course_id = c.course_id WHERE c.course_title IN ('MySQL', 'React') GROUP BY s.student_id, s.student_name HAVING COUNT(DISTINCT c.course_title) = 2;`.",
    explanation: "Classic relational division / double match using HAVING COUNT.",
    hint: "IN ('MySQL', 'React') + HAVING COUNT(DISTINCT) = 2.",
    level: "expert",
    codeExample: "SELECT s.first_name\nFROM students s\nJOIN student_courses sc ON s.student_id = sc.student_id\nJOIN courses c ON sc.course_id = c.course_id\nWHERE c.course_title IN ('MySQL', 'React')\nGROUP BY s.student_id, s.first_name\nHAVING COUNT(DISTINCT c.course_title) = 2;"
  },
  {
    question: "Can a Junction Table connect THREE master entities simultaneously (Ternary M:N:P relationship)?",
    shortAnswer: "Yes (e.g. `doctor_patient_medications` linking `doctor_id`, `patient_id`, and `medication_id`).",
    explanation: "Composite Primary Key consists of all three foreign key attributes.",
    hint: "Ternary junction table with 3 foreign keys.",
    level: "expert"
  },
  {
    question: "Why should `historical_unit_price` be stored in the `order_items` junction table rather than queried dynamically from `products`?",
    shortAnswer: "Because product prices change over time; order records must preserve the exact price paid at the historical moment of purchase.",
    explanation: "Preserves temporal financial truth and audit integrity.",
    hint: "Preserves historical price at the moment of purchase.",
    level: "moderate"
  },
  {
    question: "How do you delete a specific relationship link in an M:N table without deleting either parent record?",
    shortAnswer: "`DELETE FROM student_courses WHERE student_id = 101 AND course_id = 2;`.",
    explanation: "Removes only the association row; both student #101 and course #2 remain intact.",
    hint: "Delete specific tuple from junction table.",
    level: "basic"
  },
  {
    question: "What is the storage overhead of a pure 2-integer junction table per row in MySQL InnoDB?",
    shortAnswer: "Around 30-34 bytes per row (two 4-byte integers + InnoDB 6-byte transaction ID + 7-byte roll pointer + 5-byte row header).",
    explanation: "Highly compact physical memory and disk layout.",
    hint: "Compact ~30-byte row footprint.",
    level: "expert"
  },
  {
    question: "Can a junction table contain `CHECK` constraints on its payload columns?",
    shortAnswer: "Yes (e.g. `CHECK (quantity > 0)` or `CHECK (discount_percent BETWEEN 0 AND 50)`).",
    explanation: "Enforces domain integrity on relationship attributes.",
    hint: "CHECK constraints on relationship attributes.",
    level: "basic",
    codeExample: "CONSTRAINT chk_quantity CHECK (quantity > 0)"
  },
  {
    question: "How does `INSERT IGNORE INTO student_courses ...` behave when inserting existing enrollments?",
    shortAnswer: "MySQL skips duplicate enrollment rows silently without throwing Error 1062, inserting only new non-duplicate links.",
    explanation: "Useful for idempotent batch enrollment scripts.",
    hint: "Skips duplicates silently.",
    level: "moderate"
  },
  {
    question: "How do you calculate the total tuition fee collected across all enrolled courses in an M:N schema?",
    shortAnswer: "`SELECT SUM(c.course_fee) AS total_tuition FROM student_courses sc JOIN courses c ON sc.course_id = c.course_id;`.",
    explanation: "Aggregates fees across all active junction links.",
    hint: "SUM aggregate across joined junction.",
    level: "basic"
  },
  {
    question: "What is the result of joining an M:N junction table without appropriate join conditions?",
    shortAnswer: "A full Cartesian Product (Cross Join), creating an explosive multiplication of all rows ($N \\times M$).",
    explanation: "Always verify that both join conditions (`ON s.id = sc.id` AND `ON c.id = sc.id`) are specified.",
    hint: "Cartesian product multiplication.",
    level: "basic"
  },
  {
    question: "Why does an M:N schema prevent data anomalies when a course is created with 0 students?",
    shortAnswer: "Because course details reside in their own master `courses` table independently of student enrollments, preventing insertion anomalies.",
    explanation: "Core benefit of relational normalization.",
    hint: "Prevents insertion anomalies for standalone courses.",
    level: "moderate"
  },
  {
    question: "How do you update a student's grade in a specific course in an M:N schema?",
    shortAnswer: "`UPDATE student_courses SET grade = 'A+' WHERE student_id = 101 AND course_id = 1;`.",
    explanation: "Updates the relationship payload attribute for that specific tuple.",
    hint: "UPDATE junction table WHERE student_id AND course_id.",
    level: "basic",
    codeExample: "UPDATE student_courses SET grade = 'A+'\nWHERE student_id = 101 AND course_id = 1;"
  },
  {
    question: "What is the difference between a Self-Referencing relationship vs a Many-to-Many junction table?",
    shortAnswer: "A Self-Referencing relationship links rows within the SAME table (typically 1:N hierarchical), while an M:N junction table links two independent tables across multiple associations.",
    explanation: "Self-referencing can also be M:N (e.g. `bill_of_materials` or `user_friends`).",
    hint: "Same table hierarchy vs cross-table association.",
    level: "moderate"
  },
  {
    question: "How do you model a Many-to-Many relationship where an entity relates to other instances of the SAME entity (e.g. Social Network Friendship)?",
    shortAnswer: "Using a Self-Referencing Junction Table with two foreign keys both referencing the SAME table: `(user_id, friend_id)`.",
    explanation: "Enables symmetric or asymmetric social network graphs.",
    hint: "Self-referencing junction table.",
    level: "expert",
    codeExample: "CREATE TABLE user_friendships (\n    user_id INT NOT NULL,\n    friend_id INT NOT NULL,\n    PRIMARY KEY (user_id, friend_id),\n    FOREIGN KEY (user_id) REFERENCES users(id),\n    FOREIGN KEY (friend_id) REFERENCES users(id)\n);"
  },
  {
    question: "What is the recommended checklist for implementing Many-to-Many relationships in production MySQL databases?",
    shortAnswer: "1) Decompose M:N into two 1:N links via a dedicated Junction Table. 2) Enforce uniqueness using a Composite Primary Key `(id_a, id_b)`. 3) Add a reverse index on `(id_b, id_a)` for fast reverse seeks. 4) Store relationship attributes (date, price) in the junction table. 5) Use `ON DELETE CASCADE` to clean up junction links.",
    explanation: "Following these 5 rules ensures high-performance, anomaly-free M:N relational models.",
    hint: "Junction table, Composite PK, Reverse index, Payload attributes, Cascade deletes.",
    level: "basic"
  }
];

export default questions;
