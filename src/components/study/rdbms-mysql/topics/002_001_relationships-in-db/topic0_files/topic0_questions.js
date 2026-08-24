// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is Relationship Cardinality in relational database design?",
    shortAnswer: "The MAXIMUM number of entity instances in Table B that can be associated with a single instance of Table A (1:1, 1:N, or M:N).",
    explanation: "Defines the upper bound multiplicity of the relationship.",
    hint: "Maximum multiplicity bound.",
    level: "basic"
  },
  {
    question: "What is Relationship Modality (Optionality) in database design?",
    shortAnswer: "The MINIMUM number of entity instances in Table B that MUST be associated with an instance of Table A (0 for Optional, 1 for Mandatory).",
    explanation: "Defines the lower bound participation requirement.",
    hint: "Minimum participation requirement (0 or 1).",
    level: "basic"
  },
  {
    question: "How is Mandatory Modality (min = 1) enforced at the SQL DDL level?",
    shortAnswer: "By defining the Foreign Key column as `NOT NULL`.",
    explanation: "`NOT NULL` prevents child rows from existing without referencing a parent entity.",
    hint: "NOT NULL foreign key column.",
    level: "basic",
    codeExample: "dept_id INT NOT NULL,\nCONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(dept_id)"
  },
  {
    question: "How is Optional Modality (min = 0) modeled in SQL DDL?",
    shortAnswer: "By allowing the Foreign Key column to be nullable (`NULL`).",
    explanation: "A NULL value signifies that no parent entity is currently associated with that row.",
    hint: "Nullable foreign key column.",
    level: "basic",
    codeExample: "mentor_id INT NULL,\nCONSTRAINT fk_mentor FOREIGN KEY (mentor_id) REFERENCES instructors(instructor_id)"
  },
  {
    question: "In a One-to-Many (1:N) relationship between Department and Student, where should the Foreign Key be placed?",
    shortAnswer: "On the 'MANY' side (the `students` table), pointing to the Primary Key of `departments`.",
    explanation: "Placing the foreign key on the 'One' side violates First Normal Form by attempting to store multi-valued arrays.",
    hint: "Foreign Key always belongs on the Many side in 1:N.",
    level: "basic"
  },
  {
    question: "How do you enforce a One-to-One (1:1) relationship at the SQL schema level?",
    shortAnswer: "By placing a Foreign Key in one table and adding a `UNIQUE` constraint on that Foreign Key column.",
    explanation: "The UNIQUE constraint guarantees that no parent row can be referenced more than once.",
    hint: "Foreign Key + UNIQUE constraint.",
    level: "moderate",
    codeExample: "student_id INT NOT NULL UNIQUE,\nCONSTRAINT fk_passport_student FOREIGN KEY (student_id) REFERENCES students(student_id)"
  },
  {
    question: "What does the Crow's Foot symbol with a circle and three-pronged branch (O<) represent?",
    shortAnswer: "Zero or Many (0..N) – Optional Many relationship.",
    explanation: "Circle means minimum 0 (optional); crow's foot means maximum N (many).",
    hint: "Zero or Many optional relationship.",
    level: "basic"
  },
  {
    question: "What does the Crow's Foot symbol with a vertical bar and three-pronged branch (|<) represent?",
    shortAnswer: "One or Many (1..N) – Mandatory Many relationship.",
    explanation: "Vertical bar means minimum 1 (mandatory); crow's foot means maximum N (many).",
    hint: "One or Many mandatory relationship.",
    level: "basic"
  },
  {
    question: "What does the Crow's Foot symbol with two vertical bars (||) represent?",
    shortAnswer: "Exactly One (1..1) – Mandatory Single relationship.",
    explanation: "Both minimum and maximum cardinality are strictly 1.",
    hint: "Exactly One mandatory relationship.",
    level: "basic"
  },
  {
    question: "What does the Crow's Foot symbol with a circle and a vertical bar (O|) represent?",
    shortAnswer: "Zero or One (0..1) – Optional Single relationship.",
    explanation: "Minimum cardinality is 0 (optional); maximum is 1.",
    hint: "Zero or One optional relationship.",
    level: "basic"
  },
  {
    question: "Why cannot a Many-to-Many (M:N) relationship be directly modeled using a single foreign key in two tables?",
    shortAnswer: "Because storing multiple foreign keys in a single cell violates 1NF atomicity, while placing single FKs in both tables limits each side to at most 1 association.",
    explanation: "M:N relationships require an intermediate Junction / Bridge table.",
    hint: "Requires a junction table to preserve 1NF.",
    level: "moderate"
  },
  {
    question: "In Min-Max notation `(min, max)`, what does `(0, 1)` indicate?",
    shortAnswer: "Optional Single participation: An entity participates at minimum 0 times and at maximum 1 time in the relationship.",
    explanation: "Equivalent to 0..1 in Crow's Foot.",
    hint: "(0, 1) min-max notation.",
    level: "moderate"
  },
  {
    question: "In Min-Max notation, what does `(1, N)` indicate?",
    shortAnswer: "Mandatory Many participation: An entity participates at minimum 1 time and at maximum N (unlimited) times.",
    explanation: "Total participation on the Many side.",
    hint: "(1, N) min-max notation.",
    level: "moderate"
  },
  {
    question: "What is Total Participation in Peter Chen ER terminology?",
    shortAnswer: "Every entity in the entity set MUST participate in at least one relationship instance (Modality = 1, represented by a double line in Chen notation).",
    explanation: "Represented by NOT NULL foreign keys in SQL.",
    hint: "Total participation = double line in Chen notation.",
    level: "moderate"
  },
  {
    question: "What is Partial Participation in Peter Chen ER terminology?",
    shortAnswer: "Some entities in the entity set may not participate in any relationship instance (Modality = 0, represented by a single line in Chen notation).",
    explanation: "Represented by nullable foreign keys in SQL.",
    hint: "Partial participation = single line in Chen notation.",
    level: "moderate"
  },
  {
    question: "What happens if a developer omits `NOT NULL` on a foreign key intended to be Mandatory (1..N)?",
    shortAnswer: "The schema accidentally permits orphaned rows with `NULL` references, violating the business rule that every child must belong to a parent.",
    explanation: "Always mark mandatory foreign keys `NOT NULL`.",
    hint: "Permits NULLs in mandatory relationships.",
    level: "moderate"
  },
  {
    question: "What happens if a developer omits `UNIQUE` on a foreign key intended to be One-to-One (1:1)?",
    shortAnswer: "The relationship silently behaves as a One-to-Many (1:N) relationship, permitting multiple child rows to attach to the same parent.",
    explanation: "UNIQUE is mandatory for 1:1 referential enforcement.",
    hint: "Degrades into 1:N without UNIQUE.",
    level: "basic"
  },
  {
    question: "How is a Recursive (Self-Referencing) relationship modeled in relational DDL?",
    shortAnswer: "By placing a Foreign Key column in the table that references the Primary Key of the SAME table.",
    explanation: "Commonly used for employee-manager or category-parentcategory hierarchies.",
    hint: "Foreign key referencing own table primary key.",
    level: "moderate",
    codeExample: "CREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(50) NOT NULL,\n    manager_id INT NULL,\n    CONSTRAINT fk_mgr FOREIGN KEY (manager_id) REFERENCES employees(emp_id)\n);"
  },
  {
    question: "In an employee-manager hierarchy, why must `manager_id` be nullable (`NULL`)?",
    shortAnswer: "Because the top-level executive (e.g. CEO) has no manager (`manager_id = NULL`); making it `NOT NULL` creates an impossible infinite loop during initial inserts.",
    explanation: "The root of a tree hierarchy must be nullable.",
    hint: "CEO/Root entity has no manager.",
    level: "moderate"
  },
  {
    question: "How do you query all students along with their department names when the relationship is Optional (0..N)?",
    shortAnswer: "Using a `LEFT JOIN` to ensure students without a department (NULL) are still included in query results.",
    explanation: "`INNER JOIN` would filter out students with NULL departments.",
    hint: "LEFT JOIN preserves rows with NULL foreign keys.",
    level: "basic",
    codeExample: "SELECT s.student_name, d.department_name\nFROM students s\nLEFT JOIN departments d ON s.dept_id = d.dept_id;"
  },
  {
    question: "What is a 'Ternary Relationship' in ER modeling?",
    shortAnswer: "A relationship that simultaneously associates THREE distinct entity sets (e.g. Supplier, Part, and Project).",
    explanation: "Mapped into a relational bridge table containing three foreign keys.",
    hint: "Three participating entity sets.",
    level: "expert"
  },
  {
    question: "How is a Binary Many-to-Many (M:N) relationship mapped into relational tables?",
    shortAnswer: "By creating a dedicated Junction (Bridge) table whose Composite Primary Key consists of Foreign Keys referencing both parent tables.",
    explanation: "Converts one M:N relationship into two 1:N relationships.",
    hint: "Junction table with composite primary key.",
    level: "basic",
    codeExample: "CREATE TABLE student_courses (\n    student_id INT,\n    course_id INT,\n    enrollment_date DATE NOT NULL,\n    PRIMARY KEY (student_id, course_id),\n    FOREIGN KEY (student_id) REFERENCES students(student_id),\n    FOREIGN KEY (course_id) REFERENCES courses(course_id)\n);"
  },
  {
    question: "What is a 'Fan Trap' in relational schema design?",
    shortAnswer: "A modeling error where two 1:N relationships fan out from a single central master table, making it ambiguous to associate child entities from both branches without false Cartesian combinations.",
    explanation: "Resolved by restructuring relationships or linking child tables directly if a true relationship exists.",
    hint: "Ambiguous relationship fan out from single master entity.",
    level: "expert"
  },
  {
    question: "What is a 'Chasm Trap' in relational schema design?",
    shortAnswer: "A modeling error where a relationship path between two entities contains optional (0..N) links, creating a pathway gap that hides valid associations when foreign keys are NULL.",
    explanation: "Resolved by adding direct relationships between the endpoints.",
    hint: "Pathway gap due to optional intermediate links.",
    level: "expert"
  },
  {
    question: "Can a 1:1 relationship place the Foreign Key in EITHER table?",
    shortAnswer: "Yes, but best practice is to place the Foreign Key in the table with Mandatory participation (or the table that is queried most frequently).",
    explanation: "Minimizes NULL values across table pages.",
    hint: "Place in mandatory table to avoid NULLs.",
    level: "expert"
  },
  {
    question: "How do you count how many child records are associated with each parent in a 1:N relationship?",
    shortAnswer: "Using `LEFT JOIN` combined with `GROUP BY` and `COUNT(child.id)`.",
    explanation: "Using `COUNT(child.id)` correctly outputs 0 for parents with zero children.",
    hint: "LEFT JOIN + GROUP BY + COUNT(child_id).",
    level: "basic",
    codeExample: "SELECT d.dept_name, COUNT(s.student_id) AS student_count\nFROM departments d\nLEFT JOIN students s ON d.dept_id = s.dept_id\nGROUP BY d.dept_id, d.dept_name;"
  },
  {
    question: "In Peter Chen notation, how are Relationships represented visually?",
    shortAnswer: "As Diamond shapes containing the relationship verb phrase (e.g. `[Student] -- <Enrolls_In> -- [Course]`).",
    explanation: "Entities are rectangles; attributes are ovals; relationships are diamonds.",
    hint: "Diamond shapes in Chen ER diagrams.",
    level: "basic"
  },
  {
    question: "In Crow's Foot notation, how are entities and relationships represented?",
    shortAnswer: "Entities are rectangular boxes with header compartments; relationships are connecting lines terminated with specific cardinality/modality symbols.",
    explanation: "Industry-standard notation in modern data modeling tools.",
    hint: "Rectangles with line endpoint symbols.",
    level: "basic"
  },
  {
    question: "Why is data modeling the most critical phase of relational software architecture?",
    shortAnswer: "Because schema structural flaws (e.g. wrong cardinalities or misplaced foreign keys) require expensive data migrations, breaking API contracts and query performance down the line.",
    explanation: "Fixing architecture early prevents technical debt.",
    hint: "Prevents breaking schema migrations and data anomalies.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for modeling relationship cardinality and modality?",
    shortAnswer: "1) Identify max multiplicity (1:1, 1:N, M:N). 2) Identify min participation (0=optional, 1=mandatory). 3) Place Foreign Key on Many side in 1:N. 4) Add UNIQUE on FK for 1:1. 5) Create Junction table for M:N. 6) Use NOT NULL for mandatory modality.",
    explanation: "Following these 6 rules guarantees pristine 3NF relational schemas.",
    hint: "Max multiplicity, Min participation, FK on Many, UNIQUE on 1:1, Junction for M:N, NOT NULL for mandatory.",
    level: "basic"
  }
];

export default questions;
