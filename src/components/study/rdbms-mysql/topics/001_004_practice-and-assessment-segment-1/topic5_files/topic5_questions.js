// topic5_files/topic5_questions.js

const questions = [
  {
    question: "Why is a composite unique constraint `UNIQUE (student_id, course_id, semester_term)` essential in `course_enrollments`?",
    shortAnswer: "To prevent a student from accidentally enrolling in the exact same course multiple times within the same academic semester term.",
    explanation: "Enforces academic enrollment business rules directly at the database level.",
    hint: "Prevents duplicate enrollments for the same course and semester.",
    level: "basic"
  },
  {
    question: "What does the constraint `CHECK (marks_obtained BETWEEN 0 AND 100)` enforce in `grade_ledgers`?",
    shortAnswer: "It guarantees that exam scores must fall within the valid percentage range of 0 to 100, rejecting negative numbers or values exceeding 100.",
    explanation: "Protects student transcript data from typographical entry mistakes.",
    hint: "Restricts exam marks strictly between 0 and 100.",
    level: "basic",
    codeExample: "CREATE TABLE grade_ledgers (\n  marks_obtained DECIMAL(5,2) CHECK (marks_obtained BETWEEN 0 AND 100)\n);"
  },
  {
    question: "How do you calculate a student's average marks across all registered courses for a semester?",
    shortAnswer: "`SELECT s.roll_number, s.full_name, AVG(g.marks_obtained) AS semester_average FROM students s JOIN course_enrollments e ON s.student_id = e.student_id JOIN grade_ledgers g ON e.enrollment_id = g.enrollment_id WHERE e.semester_term = 'Sem-1' GROUP BY s.student_id, s.roll_number, s.full_name;`",
    explanation: "Joins students to enrollments and grade ledgers, grouping by student and calculating the aggregate mean.",
    hint: "JOIN students, enrollments, and grades, calculating AVG(marks_obtained).",
    level: "basic"
  },
  {
    question: "What happens to grades in `grade_ledgers` if a course enrollment is deleted under `ON DELETE CASCADE`?",
    shortAnswer: "All grade records tied to that specific `enrollment_id` in `grade_ledgers` are automatically removed, preventing orphaned marks.",
    explanation: "Maintains referential integrity automatically across academic ledger entries.",
    hint: "Child grade ledger records are automatically deleted.",
    level: "basic"
  },
  {
    question: "Why should `credits INT CHECK (credits BETWEEN 1 AND 6)` be defined on the `courses` table?",
    shortAnswer: "To enforce standard university curriculum guidelines where courses must carry between 1 credit (e.g. lab practical) and 6 credits (major capstone project).",
    explanation: "Prevents invalid credit weights in academic degree audits.",
    hint: "Validates credit hours within standard university curriculum bounds.",
    level: "basic"
  },
  {
    question: "How do you retrieve the complete semester transcript for student 'Mamata Hui'?",
    shortAnswer: "`SELECT c.course_code, c.title, c.credits, g.exam_type, g.marks_obtained, g.grade_letter FROM students s JOIN course_enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id JOIN grade_ledgers g ON e.enrollment_id = g.enrollment_id WHERE s.full_name = 'Mamata Hui' AND e.semester_term = 'Sem-1';`",
    explanation: "Joins 4 relational tables to generate a comprehensive grade transcript.",
    hint: "Join students, enrollments, courses, and grade ledgers on full_name and semester.",
    level: "basic"
  },
  {
    question: "How do you find all students who scored less than 40 marks (failing score) in any subject?",
    shortAnswer: "`SELECT DISTINCT s.roll_number, s.full_name, c.title, g.marks_obtained FROM students s JOIN course_enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id JOIN grade_ledgers g ON e.enrollment_id = g.enrollment_id WHERE g.marks_obtained < 40;`",
    explanation: "Filters grade entries with marks below the minimum 40% passing threshold.",
    hint: "WHERE marks_obtained < 40",
    level: "basic"
  },
  {
    question: "Why is `roll_number VARCHAR(20) NOT NULL UNIQUE` preferred over using `student_id` for display?",
    shortAnswer: "`roll_number` is a natural business identifier (e.g. `BKP-CSE-2026-001`) meaningful to professors and students, while `student_id` is an internal surrogate integer key.",
    explanation: "Separating surrogate technical keys from natural business keys is a core database design principle.",
    hint: "Natural business identifier formatted for human academic reporting.",
    level: "expert"
  },
  {
    question: "How do you count total enrolled students per course for the 'Sem-1' term?",
    shortAnswer: "`SELECT c.course_code, c.title, COUNT(e.enrollment_id) AS total_enrolled FROM courses c LEFT JOIN course_enrollments e ON c.course_id = e.course_id AND e.semester_term = 'Sem-1' GROUP BY c.course_id, c.course_code, c.title;`",
    explanation: "Uses `LEFT JOIN` to include courses with zero enrollments, grouping by course details.",
    hint: "LEFT JOIN courses with enrollments and COUNT(enrollment_id).",
    level: "basic"
  },
  {
    question: "What does `ON DELETE RESTRICT` on the `course_id` foreign key prevent?",
    shortAnswer: "It prevents deleting a course from the curriculum if any student is currently enrolled in that course.",
    explanation: "Protects historical and active student academic transcripts from accidental curriculum deletion.",
    hint: "Blocks deleting courses that have active student enrollments.",
    level: "basic"
  },
  {
    question: "How do you identify students on the Dean's Honor List (Average marks >= 85)?",
    shortAnswer: "`SELECT s.roll_number, s.full_name, AVG(g.marks_obtained) AS avg_marks FROM students s JOIN course_enrollments e ON s.student_id = e.student_id JOIN grade_ledgers g ON e.enrollment_id = g.enrollment_id GROUP BY s.student_id, s.roll_number, s.full_name HAVING AVG(g.marks_obtained) >= 85 ORDER BY avg_marks DESC;`",
    explanation: "Uses `HAVING` clause to filter aggregated student averages $\\ge 85$.",
    hint: "GROUP BY student and filter with HAVING AVG(marks_obtained) >= 85.",
    level: "expert"
  },
  {
    question: "What is the benefit of `exam_type ENUM('Mid-Term', 'Final-Term', 'Lab-Practical')` in `grade_ledgers`?",
    shortAnswer: "It restricts examination categories to valid university assessment types, preventing arbitrary string inputs.",
    explanation: "Guarantees domain integrity for examination assessment categories.",
    hint: "Restricts exam types to predefined evaluation categories.",
    level: "basic"
  },
  {
    question: "How do you update a student's grade letter from 'F' to 'A' after a re-evaluation?",
    shortAnswer: "`UPDATE grade_ledgers SET marks_obtained = 88.00, grade_letter = 'A' WHERE grade_id = 45;`",
    explanation: "Modifies both score and grade letter atomically by targeting the specific `grade_id` Primary Key.",
    hint: "UPDATE grade_ledgers SET marks = ..., grade = ... WHERE grade_id = ?;",
    level: "basic"
  },
  {
    question: "Why should `grade_ledgers` store `recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`?",
    shortAnswer: "To maintain an immutable audit trail of when each grade entry was posted into the university grading system.",
    explanation: "Essential for academic grade dispute resolution and faculty audit logs.",
    hint: "Provides automated timestamp auditing for grade submissions.",
    level: "basic"
  },
  {
    question: "How do you find students enrolled in courses taught in the 'Barrackpore' campus?",
    shortAnswer: "`SELECT DISTINCT s.full_name, s.email, d.dept_name, d.campus_city FROM students s JOIN course_enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id JOIN departments d ON c.dept_id = d.dept_id WHERE d.campus_city = 'Barrackpore';`",
    explanation: "Traverses the 4-table join path from students to departments, filtering by campus city.",
    hint: "Join students to departments through enrollments and courses, filtering by campus_city.",
    level: "basic"
  },
  {
    question: "What does `admission_year INT CHECK (admission_year >= 2020)` enforce?",
    shortAnswer: "It prevents invalid historical or negative admission years, ensuring records conform to the university's digital operating era.",
    explanation: "Enforces realistic calendar year boundaries on student admission dates.",
    hint: "Validates student admission year >= 2020.",
    level: "basic"
  },
  {
    question: "How do you calculate the total course credits a student is currently taking in 'Sem-1'?",
    shortAnswer: "`SELECT s.roll_number, s.full_name, SUM(c.credits) AS total_enrolled_credits FROM students s JOIN course_enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id WHERE e.semester_term = 'Sem-1' GROUP BY s.student_id, s.roll_number, s.full_name;`",
    explanation: "Sums course credit weights per student for the specified semester.",
    hint: "SUM(c.credits) grouped by student for the semester.",
    level: "basic"
  },
  {
    question: "How do you drop all grades for a specific student who withdrew from college?",
    shortAnswer: "`DELETE FROM course_enrollments WHERE student_id = 5;` (Cascades automatically to delete their records in `grade_ledgers`).",
    explanation: "Cascading foreign keys eliminate the need for manual multi-table delete scripts.",
    hint: "DELETE FROM course_enrollments WHERE student_id = ? (Cascades to grades).",
    level: "basic"
  },
  {
    question: "Why is `DECIMAL(5,2)` used for `marks_obtained` instead of `INT`?",
    shortAnswer: "Because university examination scores frequently include fractional marks (e.g. `84.50` or `92.25`).",
    explanation: "Preserves exact fractional examination scoring precision.",
    hint: "Supports fractional scores like 85.50 marks.",
    level: "basic"
  },
  {
    question: "How do you verify whether all courses in the catalog have at least one assigned department?",
    shortAnswer: "`SELECT course_id, title FROM courses WHERE dept_id IS NULL;` (Returns empty set if `dept_id INT NOT NULL` constraint is active).",
    explanation: "Validates that no orphan courses exist without departmental ownership.",
    hint: "Query courses WHERE dept_id IS NULL.",
    level: "basic"
  },
  {
    question: "What is the difference between `NATURAL JOIN` and `INNER JOIN ... ON` in this academic project?",
    shortAnswer: "`NATURAL JOIN` implicitly joins on all columns sharing the same name (which can cause silent join bugs if multiple tables share columns like `title` or `description`); `INNER JOIN ... ON` explicitly declares the intended key relationship.",
    explanation: "Explicit `INNER JOIN ... ON` is mandatory in professional production SQL.",
    hint: "Always use explicit INNER JOIN ... ON to avoid accidental multi-column joins.",
    level: "expert"
  },
  {
    question: "How do you find the highest mark scored in each course for the 'Final-Term' examination?",
    shortAnswer: "`SELECT c.course_code, c.title, MAX(g.marks_obtained) AS top_score FROM courses c JOIN course_enrollments e ON c.course_id = e.course_id JOIN grade_ledgers g ON e.enrollment_id = g.enrollment_id WHERE g.exam_type = 'Final-Term' GROUP BY c.course_id, c.course_code, c.title;`",
    explanation: "Applies the `MAX()` aggregate function to find peak marks per course.",
    hint: "MAX(marks_obtained) grouped by course for Final-Term exams.",
    level: "basic"
  },
  {
    question: "How do you insert 10 students in a single batch insert statement?",
    shortAnswer: "Write `INSERT INTO students (roll_number, full_name, email, admission_year) VALUES ('R01', 'Mamata', 'm@x.com', 2026), ('R02', 'Susmita', 's@x.com', 2026), ...;`",
    explanation: "Batch inserting is significantly faster than executing 10 individual insert queries.",
    hint: "Separate multiple student value tuples with commas in a single INSERT.",
    level: "basic"
  },
  {
    question: "What does `SHOW FULL COLUMNS FROM grade_ledgers;` display?",
    shortAnswer: "It displays complete column metadata including field names, types, collations, nullability, keys, defaults, extra attributes, privileges, and comments.",
    explanation: "Provides exhaustive structural diagnostic inspection.",
    hint: "SHOW FULL COLUMNS FROM table_name;",
    level: "basic"
  },
  {
    question: "How do you rename the table `grade_ledgers` to `student_evaluations`?",
    shortAnswer: "`RENAME TABLE grade_ledgers TO student_evaluations;`",
    explanation: "Executes an atomic table rename.",
    hint: "RENAME TABLE old_name TO new_name;",
    level: "basic"
  },
  {
    question: "How do you select students whose email contains 'ac.in' (academic institutional domain)?",
    shortAnswer: "`SELECT student_id, roll_number, full_name, email FROM students WHERE email LIKE '%ac.in%';`",
    explanation: "Uses wildcard pattern matching to find domain substrings.",
    hint: "WHERE email LIKE '%ac.in%'",
    level: "basic"
  },
  {
    question: "What is the purpose of structuring this mini-project across 5 normalized tables?",
    shortAnswer: "To completely eliminate data redundancy, prevent update/deletion anomalies, and decouple independent entities (departments, courses, students, enrollments, and grades).",
    explanation: "Core relational normalization principles applied to university administration.",
    hint: "Eliminates redundancy and decouples academic entities cleanly.",
    level: "basic"
  },
  {
    question: "How do you find students enrolled in more than 3 courses in 'Sem-1'?",
    shortAnswer: "`SELECT s.roll_number, s.full_name, COUNT(e.course_id) AS enrolled_courses FROM students s JOIN course_enrollments e ON s.student_id = e.student_id WHERE e.semester_term = 'Sem-1' GROUP BY s.student_id, s.roll_number, s.full_name HAVING COUNT(e.course_id) > 3;`",
    explanation: "Groups by student and uses `HAVING COUNT(...) > 3` to identify heavy course loads.",
    hint: "GROUP BY student HAVING COUNT(course_id) > 3.",
    level: "basic"
  },
  {
    question: "Why should `ON DELETE CASCADE` be used from `students` to `course_enrollments`?",
    shortAnswer: "Because if a student record is removed from the university directory, their course enrollments lose contextual meaning and must be cleaned up to avoid orphan records.",
    explanation: "Ensures referential consistency across student lifecycles.",
    hint: "Cleans up child enrollments automatically when a student record is deleted.",
    level: "basic"
  },
  {
    question: "What is the primary capstone takeaway of Mini Project Topic 5 for Segment 1 students?",
    shortAnswer: "It proves end-to-end relational competence: from modeling business rules and writing clean DDL with composite keys and check constraints, to seeding realistic data and generating complex multi-table academic reports.",
    explanation: "Bridges the gap between basic theory and professional enterprise database engineering.",
    hint: "Synthesizing all Segment 1 DDL, DML, constraint, and querying skills into a complete working system.",
    level: "basic"
  }
];

export default questions;
