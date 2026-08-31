// topic1_files/topic1_questions.js

const questions = [
  {
    question: "Why must parent tables (like `departments`) be created before child tables (like `courses`) in DDL scripts?",
    shortAnswer: "Because a Foreign Key in a child table requires the referenced parent table and its Primary Key column to already exist; otherwise, MySQL throws an error: `Table does not exist`.",
    explanation: "DDL scripts must maintain strict topological dependency ordering.",
    hint: "Referenced parent tables must exist before child tables can establish Foreign Keys.",
    level: "basic"
  },
  {
    question: "What is the correct order to DROP tables that have foreign key dependencies?",
    shortAnswer: "Drop child tables first (e.g. `admissions` → `courses`), and then drop parent tables (`students` → `departments`), or temporarily disable `FOREIGN_KEY_CHECKS = 0`.",
    explanation: "Dropping a parent table while child tables still reference it results in Error 1451.",
    hint: "Drop children before parents, or temporarily disable foreign key checks.",
    level: "basic"
  },
  {
    question: "Why is `DECIMAL(10,2)` preferred over `FLOAT` or `DOUBLE` for storing tuition fees in Indian Rupees (`₹`)?",
    shortAnswer: "`DECIMAL` is an exact-precision numeric data type that prevents floating-point rounding errors common in monetary calculations.",
    explanation: "Financial systems require exact cents/paise precision without binary approximation artifacts.",
    hint: "DECIMAL guarantees exact precision without floating-point rounding errors.",
    level: "basic"
  },
  {
    question: "What does the constraint `CHECK (initial_deposit_inr >= 5000)` enforce?",
    shortAnswer: "It rejects any `INSERT` or `UPDATE` statement where the initial admission deposit is less than ₹5,000, throwing MySQL Error 3819.",
    explanation: "Enforces business rule validation directly at the database storage engine layer.",
    hint: "Rejects initial deposits below ₹5,000 directly at the database layer.",
    level: "basic",
    codeExample: "CREATE TABLE admissions (\n  initial_deposit_inr DECIMAL(10,2) CHECK (initial_deposit_inr >= 5000)\n);"
  },
  {
    question: "What happens if you insert a student with an email that already exists in a column defined as `email VARCHAR(120) NOT NULL UNIQUE`?",
    shortAnswer: "MySQL rejects the insertion and throws Error 1062: `Duplicate entry '...' for key 'email'`.",
    explanation: "Unique constraints prevent duplicate alternate key entries.",
    hint: "Throws Error 1062 Duplicate entry violation.",
    level: "basic"
  },
  {
    question: "What does `ON DELETE RESTRICT` do when someone attempts to delete a department with active courses?",
    shortAnswer: "It blocks the deletion and raises Error 1451, protecting referential integrity by forbidding the deletion of parent records that have linked children.",
    explanation: "Ensures no courses are left without an associated department.",
    hint: "Blocks deletion of parent records that have dependent child records.",
    level: "basic"
  },
  {
    question: "How do you specify a default admission status of 'Provisional' using DDL?",
    shortAnswer: "`admission_status ENUM('Provisional', 'Confirmed', 'Cancelled') DEFAULT 'Provisional'`",
    explanation: "Restricts values to the defined set and automatically assigns 'Provisional' when omitted in `INSERT`.",
    hint: "Use ENUM with DEFAULT 'Provisional'.",
    level: "basic"
  },
  {
    question: "What does `AUTO_INCREMENT` do on the `student_id` column?",
    shortAnswer: "It automatically assigns the next sequential integer (1, 2, 3...) when a new student record is inserted without explicitly supplying an ID.",
    explanation: "Acts as a surrogate primary key generator.",
    hint: "Generates sequential numbers automatically on each new row insert.",
    level: "basic"
  },
  {
    question: "Why is `student_id INT NOT NULL UNIQUE` in the `admissions` table significant?",
    shortAnswer: "The `UNIQUE` constraint on `student_id` enforces a **1-to-1 relationship** between a student and their admission file, ensuring a student cannot be admitted twice.",
    explanation: "Prevents duplicate admission files for the same individual student.",
    hint: "Enforces a 1:1 relationship so each student has at most one admission record.",
    level: "expert"
  },
  {
    question: "How do you query all students who were admitted with an initial deposit greater than ₹10,000?",
    shortAnswer: "`SELECT s.first_name, s.last_name, a.initial_deposit_inr FROM students s JOIN admissions a ON s.student_id = a.student_id WHERE a.initial_deposit_inr > 10000;`",
    explanation: "Joins parent student records to child admission details and filters on deposit amounts.",
    hint: "Join students with admissions on student_id and filter initial_deposit_inr > 10000.",
    level: "basic"
  },
  {
    question: "What is the benefit of defining `campus_city VARCHAR(50) DEFAULT 'Barrackpore'`?",
    shortAnswer: "Any student or department created without specifying a city automatically defaults to 'Barrackpore', saving boilerplate in insert statements.",
    explanation: "Provides safe default fallback values.",
    hint: "Supplies 'Barrackpore' automatically when the campus_city column is omitted.",
    level: "basic"
  },
  {
    question: "How do you view the exact SQL used to create an existing table in MySQL?",
    shortAnswer: "`SHOW CREATE TABLE table_name;`",
    explanation: "Displays the complete DDL definition including all constraint symbols, character sets, and engine settings.",
    hint: "SHOW CREATE TABLE table_name;",
    level: "basic",
    codeExample: "SHOW CREATE TABLE admissions;"
  },
  {
    question: "What is the purpose of the `CONSTRAINT fk_name` naming convention?",
    shortAnswer: "It gives a human-readable identifier to the foreign key constraint, making it easy to reference when altering or dropping constraints later (`ALTER TABLE tbl DROP FOREIGN KEY fk_name`).",
    explanation: "Avoids cryptic auto-generated system constraint names like `students_ibfk_1`.",
    hint: "Provides a readable name for easier future schema alterations.",
    level: "basic"
  },
  {
    question: "How do you insert multiple course records in a single SQL statement?",
    shortAnswer: "`INSERT INTO courses (department_id, course_name, duration_years, total_tuition_fee_inr) VALUES (1, 'BCA', 3, 120000), (1, 'B.Tech CSE', 4, 350000);`",
    explanation: "Batch inserting reduces network round-trips and executes inside a single transaction.",
    hint: "Separate multiple row value tuples with commas in a single INSERT statement.",
    level: "basic"
  },
  {
    question: "What does `ON DELETE CASCADE` do on the `admissions` table foreign key to `students`?",
    shortAnswer: "If a student is deleted from the `students` table, their associated admission record in `admissions` is automatically deleted as well.",
    explanation: "Cleans up child records automatically upon parent deletion.",
    hint: "Automatically deletes child admission records when the parent student is deleted.",
    level: "basic"
  },
  {
    question: "How do you find all students whose last name starts with 'H' (e.g. Hui)?",
    shortAnswer: "`SELECT * FROM students WHERE last_name LIKE 'H%';`",
    explanation: "Uses the `%` wildcard to match any string starting with the capital letter 'H'.",
    hint: "WHERE last_name LIKE 'H%'",
    level: "basic",
    codeExample: "SELECT student_id, first_name, last_name FROM students WHERE last_name LIKE 'H%';"
  },
  {
    question: "Why should `phone_number` be stored as `VARCHAR(15)` rather than `BIGINT`?",
    shortAnswer: "Because phone numbers can contain leading zeros (`098300...`), international prefixes (`+91`), or formatting characters (dashes), and are never used in mathematical calculations.",
    explanation: "Numeric types strip leading zeros and fail on `+` prefixes.",
    hint: "Preserves leading zeros and international '+' formatting symbols.",
    level: "basic"
  },
  {
    question: "How do you calculate the remaining tuition balance for a student?",
    shortAnswer: "`SELECT s.first_name, c.total_tuition_fee_inr - a.initial_deposit_inr AS remaining_balance_inr FROM students s JOIN admissions a ON s.student_id = a.student_id JOIN courses c ON a.course_id = c.course_id;`",
    explanation: "Calculates the difference between total course fee and deposit paid in real time.",
    hint: "Subtract initial deposit from total tuition fee in query projection.",
    level: "basic"
  },
  {
    question: "What is the purpose of `CHECK (duration_years BETWEEN 1 AND 5)` on the `courses` table?",
    shortAnswer: "It prevents invalid course durations (such as 0 or 10 years) from ever being entered into the database.",
    explanation: "Enforces academic degree duration constraints at the schema level.",
    hint: "Restricts course duration to realistic college program lengths between 1 and 5 years.",
    level: "basic"
  },
  {
    question: "What error occurs if you insert an admission referencing `course_id = 999` when no such course exists?",
    shortAnswer: "MySQL throws Error 1452: `Cannot add or update a child row: a foreign key constraint fails`.",
    explanation: "Referential integrity prevents orphaned references to non-existent parent keys.",
    hint: "Error 1452 Foreign key constraint fails.",
    level: "basic"
  },
  {
    question: "How do you update a student's phone number safely?",
    shortAnswer: "`UPDATE students SET phone_number = '9830099887' WHERE student_id = 5;`",
    explanation: "Targets the exact record using its unique Primary Key in the `WHERE` clause.",
    hint: "UPDATE students SET phone_number = '...' WHERE student_id = ?;",
    level: "basic"
  },
  {
    question: "How do you count total admissions per course?",
    shortAnswer: "`SELECT c.course_name, COUNT(a.admission_id) AS total_admissions FROM courses c LEFT JOIN admissions a ON c.course_id = a.course_id GROUP BY c.course_name;`",
    explanation: "Uses `LEFT JOIN` to include courses that have zero admissions, grouping by course name.",
    hint: "LEFT JOIN courses with admissions and GROUP BY course_name.",
    level: "basic"
  },
  {
    question: "What does `FOREIGN_KEY_CHECKS = 0;` do?",
    shortAnswer: "It temporarily disables foreign key constraint validation across the session, allowing out-of-order schema creation or bulk data restoration.",
    explanation: "Must always be re-enabled (`FOREIGN_KEY_CHECKS = 1;`) immediately after maintenance.",
    hint: "Temporarily disables foreign key constraint checks for bulk maintenance.",
    level: "expert",
    codeExample: "SET FOREIGN_KEY_CHECKS = 0;\n-- Execute bulk script\nSET FOREIGN_KEY_CHECKS = 1;"
  },
  {
    question: "What is the purpose of adding `blood_group VARCHAR(5) DEFAULT 'O+'` to student records?",
    shortAnswer: "To store medical emergency profile data, defaulting to the most common blood group when unspecified during initial enrollment.",
    explanation: "Demonstrates practical column default values in student record systems.",
    hint: "Stores emergency medical info with automatic fallback default.",
    level: "basic"
  },
  {
    question: "How do you retrieve the top 5 most expensive courses offered by the college?",
    shortAnswer: "`SELECT course_name, total_tuition_fee_inr FROM courses ORDER BY total_tuition_fee_inr DESC LIMIT 5;`",
    explanation: "Sorts fees in descending order and restricts the output to 5 records.",
    hint: "ORDER BY total_tuition_fee_inr DESC LIMIT 5;",
    level: "basic"
  },
  {
    question: "What is the difference between `admission_date DATE DEFAULT (CURDATE())` and hardcoded date strings?",
    shortAnswer: "`DEFAULT (CURDATE())` dynamically assigns today's calendar date at the moment of row insertion, whereas static strings require client application parameters.",
    explanation: "Available in MySQL 8.0+ for dynamic default expression evaluation.",
    hint: "Dynamically assigns the current system date at insertion time.",
    level: "expert"
  },
  {
    question: "How do you delete all records from `admissions` without dropping the table structure?",
    shortAnswer: "`TRUNCATE TABLE admissions;`",
    explanation: "Quickly empties the table and resets `AUTO_INCREMENT` back to 1.",
    hint: "TRUNCATE TABLE admissions;",
    level: "basic"
  },
  {
    question: "Why should database foreign keys be indexed in production?",
    shortAnswer: "Because foreign key lookups and cascading checks (`ON DELETE`/`ON UPDATE`) require index probes; without an index, checking parent-child linkages triggers full table scans.",
    explanation: "MySQL automatically creates an index on foreign key columns if one does not exist.",
    hint: "Speeds up referential integrity validation and prevents table locks during deletes.",
    level: "expert"
  },
  {
    question: "How do you verify that all created tables use the InnoDB storage engine?",
    shortAnswer: "`SELECT table_name, engine FROM information_schema.tables WHERE table_schema = 'college_admissions';`",
    explanation: "Confirms that tables support ACID transactions and foreign key constraints.",
    hint: "Query information_schema.tables for engine column.",
    level: "basic"
  },
  {
    question: "What is the primary takeaway of Hands-on Lab 1 for database students?",
    shortAnswer: "Building a relational database requires thoughtful schema modeling: ordering DDL dependencies, picking exact data types, enforcing business rules with CHECK and UNIQUE constraints, and linking tables with foreign keys.",
    explanation: "Hands-on implementation solidifies theoretical relational concepts into production skills.",
    hint: "Translating business rules into constrained, normalized relational tables.",
    level: "basic"
  }
];

export default questions;
