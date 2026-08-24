// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What are the two primary structural constraints in Entity-Relationship modeling?",
    shortAnswer: "1) Cardinality Ratio (Multiplicity / Maximum bound) and 2) Participation Constraint (Modality / Minimum bound).",
    explanation: "Core constraints governing entity associations.",
    hint: "Cardinality Ratio (Max) and Participation Constraint (Min).",
    level: "basic"
  },
  {
    question: "What does Cardinality Ratio specify in ER modeling?",
    shortAnswer: "The MAXIMUM number of relationship instances that an entity can participate in (1:1, 1:N, or M:N).",
    explanation: "Upper bound on relationship participation.",
    hint: "Maximum number of relationship instances.",
    level: "basic"
  },
  {
    question: "What does Participation Constraint (Modality) specify in ER modeling?",
    shortAnswer: "The MINIMUM number of relationship instances that an entity MUST participate in (0 = Partial/Optional; >= 1 = Total/Mandatory).",
    explanation: "Lower bound on relationship participation.",
    hint: "Minimum number of relationship instances.",
    level: "basic"
  },
  {
    question: "How is Total (Mandatory) Participation represented visually in Peter Chen ER notation?",
    shortAnswer: "As a DOUBLE LINE connecting the entity rectangle to the relationship diamond.",
    explanation: "Indicates that every entity instance must participate.",
    hint: "Double line.",
    level: "basic"
  },
  {
    question: "How is Partial (Optional) Participation represented visually in Peter Chen ER notation?",
    shortAnswer: "As a SINGLE LINE connecting the entity rectangle to the relationship diamond.",
    explanation: "Indicates participation is optional (min = 0).",
    hint: "Single line.",
    level: "basic"
  },
  {
    question: "In a 1:1 relationship between Department and Faculty ('Faculty Manages Department'), where Faculty participation is Partial and Department is Total, where should the Foreign Key be placed in SQL?",
    shortAnswer: "In the `departments` table (the TOTAL side) with a `NOT NULL UNIQUE` constraint (`departments.hod_faculty_id INT NOT NULL UNIQUE`).",
    explanation: "Avoids NULLs in the faculty table and guarantees every department has an HOD.",
    hint: "In the TOTAL side table with NOT NULL UNIQUE.",
    level: "moderate",
    codeExample: "CREATE TABLE departments (\n    dept_id INT PRIMARY KEY,\n    dept_name VARCHAR(50) NOT NULL,\n    hod_faculty_id INT NOT NULL UNIQUE,\n    FOREIGN KEY (hod_faculty_id) REFERENCES faculty(id)\n);"
  },
  {
    question: "What happens if you place the Foreign Key on the PARTIAL side of a 1:1 relationship?",
    shortAnswer: "The partial table will contain thousands of `NULL` values in that foreign key column, wasting storage space and requiring nullable index maintenance.",
    explanation: "Only the small fraction of entities that participate will have non-null values.",
    hint: "Generates massive NULL values on non-participating rows.",
    level: "moderate"
  },
  {
    question: "How is Total Participation enforced physically on the Foreign Key in a 1:N relationship in MySQL?",
    shortAnswer: "By adding a `NOT NULL` constraint to the foreign key column in the child ('Many') table (`student_id INT NOT NULL`).",
    explanation: "Prevents orphaned child records without a parent.",
    hint: "NOT NULL constraint on the foreign key column.",
    level: "basic"
  },
  {
    question: "How is a 1:1 relationship with Total Participation on BOTH sides mapped into relational tables?",
    shortAnswer: "Either merge both entities into a single unified table, or create two tables with a `NOT NULL UNIQUE` foreign key in one table and cross-referencing constraints.",
    explanation: "Merging into a single table is usually the cleanest physical design.",
    hint: "Merge into single table or NOT NULL UNIQUE FK.",
    level: "moderate"
  },
  {
    question: "Why do Many-to-Many (M:N) relationships ALWAYS require a separate Bridge / Junction table regardless of participation constraints?",
    shortAnswer: "Because storing multiple foreign keys in either entity violates First Normal Form (1NF) atomicity, and single foreign keys cannot represent multiple associations.",
    explanation: "Relational engines cannot implement direct M:N links without a junction table.",
    hint: "Violates 1NF atomicity without a junction table.",
    level: "basic"
  },
  {
    question: "What is 'Modality' in Information Engineering (Crow's Foot) terminology?",
    shortAnswer: "The minimum cardinality / participation constraint (represented by an 'O' for optional or a '||' tick mark for mandatory).",
    explanation: "Synonym for participation constraint in Crow's foot notation.",
    hint: "Crow's foot circle (0) vs vertical bar (1).",
    level: "moderate"
  },
  {
    question: "What does a Crow's Foot symbol with a circle and a crow's foot (`>o`) represent?",
    shortAnswer: "Zero or More (Optional Many / 0:N).",
    explanation: "Classic Crow's foot notation for optional many.",
    hint: "Optional Many (0 to N).",
    level: "basic"
  },
  {
    question: "What does a Crow's Foot symbol with a line and a crow's foot (`>|`) represent?",
    shortAnswer: "One or More (Mandatory Many / 1:N).",
    explanation: "Mandatory participation with Many cardinality.",
    hint: "Mandatory Many (1 to N).",
    level: "basic"
  },
  {
    question: "What does a Crow's Foot symbol with two vertical bars (`||`) represent?",
    shortAnswer: "Exactly One (Mandatory One / 1:1).",
    explanation: "Mandatory participation with One cardinality.",
    hint: "Exactly One (1:1).",
    level: "basic"
  },
  {
    question: "What does a Crow's Foot symbol with a circle and a vertical bar (`o|`) represent?",
    shortAnswer: "Zero or One (Optional One / 0:1).",
    explanation: "Optional participation with One cardinality.",
    hint: "Zero or One (0:1).",
    level: "basic"
  },
  {
    question: "Can an M:N relationship have Total Participation on one side and Partial on the other?",
    shortAnswer: "Yes (e.g. every Student MUST enroll in at least one Course [Total], but a Course may have zero enrolled students [Partial]).",
    explanation: "Enforced at the application/trigger level since standard junction tables permit 0 rows.",
    hint: "Total on Student, Partial on Course.",
    level: "moderate"
  },
  {
    question: "Why is enforcing Total Participation on the 'ONE' side of a 1:N relationship tricky in pure standard SQL DDL?",
    shortAnswer: "Because inserting a parent requires a child, but inserting the child requires the parent, creating a circular dependency that requires deferred constraints or stored procedures/transactions.",
    explanation: "Classic relational constraint insertion chicken-and-egg problem.",
    hint: "Circular insert dependency requiring transactions.",
    level: "expert"
  },
  {
    question: "How do you define a 1:1 relationship between `users` and `user_profiles` in MySQL InnoDB?",
    shortAnswer: "Make `user_id` in `user_profiles` both the Primary Key AND the Foreign Key referencing `users(user_id)`.",
    explanation: "Shared Primary Key pattern for 1:1 relationships.",
    hint: "Shared Primary Key pattern.",
    level: "moderate",
    codeExample: "CREATE TABLE user_profiles (\n    user_id INT PRIMARY KEY,\n    bio TEXT,\n    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE\n);"
  },
  {
    question: "What is the difference between Structural Constraints vs Semantic Business Rules?",
    shortAnswer: "Structural constraints define basic cardinality (1:N) and participation (Total/Partial); Semantic business rules involve complex cross-row/cross-table computations (e.g. 'Student cannot enroll in > 5 courses per semester').",
    explanation: "Semantic rules require triggers, CHECK constraints, or application logic.",
    hint: "Basic cardinality/participation vs complex logic.",
    level: "moderate"
  },
  {
    question: "How does Peter Chen notation distinguish between 1:1, 1:N, and M:N relationships?",
    shortAnswer: "By writing labels ('1', 'N', 'M') on the lines connecting the entity rectangles to the relationship diamond.",
    explanation: "Cardinality ratio indicators on relationship edges.",
    hint: "Labels 1, N, M on relationship edges.",
    level: "basic"
  },
  {
    question: "What happens when you delete a row from a table on the TOTAL participation side of a 1:1 relationship?",
    shortAnswer: "If `ON DELETE CASCADE` is set, the matching record in the associated table is deleted; if `RESTRICT` is set, the delete is blocked.",
    explanation: "Enforces lifecycle linkage.",
    hint: "Cascades deletion or blocks operation.",
    level: "basic"
  },
  {
    question: "Can an entity set have Total Participation in TWO different relationships simultaneously?",
    shortAnswer: "Yes (e.g. an `Employee` must participate in `Works_In` Department [Total] AND must have a `Tax_Profile` [Total]).",
    explanation: "Multi-relationship total participation constraints.",
    hint: "Entity can be mandatory in multiple relationships.",
    level: "moderate"
  },
  {
    question: "How do you query for entities that have ZERO participation in an optional 1:N relationship?",
    shortAnswer: "Using a `LEFT JOIN` and filtering `WHERE child.id IS NULL`.",
    explanation: "Finds unassociated parent rows (anti-join pattern).",
    hint: "LEFT JOIN WHERE child.id IS NULL.",
    level: "basic",
    codeExample: "SELECT s.first_name\nFROM students s\nLEFT JOIN fee_receipts r ON s.student_id = r.student_id\nWHERE r.receipt_no IS NULL;"
  },
  {
    question: "What is the difference between Cardinality in ER modeling vs Cardinality in Query Optimization (EXPLAIN)?",
    shortAnswer: "In ER modeling, Cardinality is the maximum ratio of entity links (1:1, 1:N); in Query Optimization, Cardinality is the estimated count of distinct values in an indexed column.",
    explanation: "Two different meanings of the term in database theory.",
    hint: "Relationship multiplicity vs column distinct value count.",
    level: "expert"
  },
  {
    question: "What is the 'Minimum-Maximum Constraint' notation, and how does it combine cardinality and participation?",
    shortAnswer: "It specifies a pair `(min, max)` on each entity's connection line, where `min` defines participation ($0$ = partial, $\\ge 1$ = total) and `max` defines cardinality ($1$ or $N$).",
    explanation: "Formal, unambiguous constraint notation developed by ISO.",
    hint: "(min, max) pair on relationship edges.",
    level: "moderate"
  },
  {
    question: "In `(min, max)` notation, what does `(0, 1)` signify?",
    shortAnswer: "Partial Participation (min = 0) with a Maximum Cardinality of 1 (Optional One).",
    explanation: "Entity can participate at most once, and may participate zero times.",
    hint: "Optional One.",
    level: "basic"
  },
  {
    question: "In `(min, max)` notation, what does `(1, N)` signify?",
    shortAnswer: "Total Participation (min = 1) with a Maximum Cardinality of Many (Mandatory Many).",
    explanation: "Entity must participate at least once, and can participate multiple times.",
    hint: "Mandatory Many.",
    level: "basic"
  },
  {
    question: "Why does Peter Chen notation place cardinality numbers (1, N) on the OPPOSITE side compared to `(min, max)` notation?",
    shortAnswer: "Chen notation denotes the cardinality of the relationship looking outward toward the opposite entity; `(min, max)` notation defines the participation bounds for the adjacent entity directly.",
    explanation: "Classic point of confusion in database exams.",
    hint: "Look-across vs look-here semantic perspective.",
    level: "expert"
  },
  {
    question: "How do you enforce a 1:1 relationship at the MySQL database level?",
    shortAnswer: "Add a `UNIQUE` index or constraint on the foreign key column.",
    explanation: "Restricts foreign key to single occurrences.",
    hint: "UNIQUE constraint on foreign key column.",
    level: "basic",
    codeExample: "CONSTRAINT uq_dept_hod UNIQUE (hod_faculty_id)"
  },
  {
    question: "What is the recommended checklist for modeling Structural Constraints in ER diagrams and schemas?",
    shortAnswer: "1) Determine maximum cardinality (1:1, 1:N, M:N). 2) Determine minimum participation (Total = Double Line, Partial = Single Line). 3) For 1:1, place FK on the Total side with `UNIQUE NOT NULL`. 4) For 1:N, place FK on Many side with `NOT NULL` if Total. 5) For M:N, create a dedicated bridge table.",
    explanation: "Following these 5 rules guarantees that business rules are enforced flawlessly in the database.",
    hint: "Cardinality (Max), Participation (Min), Double lines for Total, FK on Total side for 1:1, Bridge table for M:N.",
    level: "basic"
  }
];

export default questions;
