// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the primary root cause of database modification anomalies in relational tables?",
    shortAnswer: "Storing multiple independent business entities and their mismatched functional dependencies within a single unnormalized table, leading to redundant duplicate data.",
    explanation: "Architectural root cause of all three anomaly classes.",
    hint: "Mixing multiple entities into 1 table with redundant data.",
    level: "basic"
  },
  {
    question: "What is an Insertion Anomaly?",
    shortAnswer: "An insertion anomaly occurs when a new record for an entity cannot be added to the database without creating fictitious, dummy, or dependent child data, typically because primary key columns cannot be NULL.",
    explanation: "Definition and mechanism of insertion anomalies.",
    hint: "Cannot insert an entity without adding a dependent child record.",
    level: "basic"
  },
  {
    question: "Give a concrete real-world example of an Insertion Anomaly.",
    shortAnswer: "In a table `(student_id, course_id, course_title)`, a new course 'AI Masterclass' cannot be inserted if no student has enrolled yet, because `student_id` is part of the Primary Key and cannot be NULL.",
    explanation: "Real-world classroom scenario of insertion anomaly.",
    hint: "Cannot add a new course before students enroll because student_id is PK NOT NULL.",
    level: "basic"
  },
  {
    question: "What is an Update (or Modification) Anomaly?",
    shortAnswer: "An update anomaly occurs when data redundancy forces the same value to be updated across dozens or hundreds of rows; failing to update every row causes conflicting, corrupted data.",
    explanation: "Definition and consequence of update anomalies.",
    hint: "Redundant data in multiple rows leads to desynchronized, contradictory values.",
    level: "basic"
  },
  {
    question: "Give a concrete real-world example of an Update Anomaly.",
    shortAnswer: "If course fee changes from ₹4,500 to ₹5,000, and 500 students are enrolled in it in an unnormalized table, updating only 499 rows leaves 1 row with ₹4,500, creating conflicting pricing records.",
    explanation: "Real-world fee desynchronization example.",
    hint: "Updating course fee in 500 rows can fail midway, leaving conflicting fees.",
    level: "basic"
  },
  {
    question: "What is a Deletion Anomaly?",
    shortAnswer: "A deletion anomaly occurs when deleting a specific child record unintentionally deletes unrelated, critical master data that was only stored in that row.",
    explanation: "Definition and consequence of deletion anomalies.",
    hint: "Deleting a child record accidentally destroys master entity data.",
    level: "basic"
  },
  {
    question: "Give a concrete real-world example of a Deletion Anomaly.",
    shortAnswer: "If 'Susmita' is the only student enrolled in 'Cloud DevOps', deleting Susmita's enrollment row permanently erases all details of 'Cloud DevOps', including title, fee, and instructor.",
    explanation: "Real-world course erasure scenario.",
    hint: "Deleting the only student in a course erases the entire course from existence.",
    level: "basic"
  },
  {
    question: "How does 2NF (Second Normal Form) eliminate partial-key insertion anomalies?",
    shortAnswer: "By decomposing tables so that non-key attributes depend on the entire primary key, allowing standalone entities (like Courses) to exist in their own table with single-column primary keys.",
    explanation: "2NF partial dependency removal mechanism.",
    hint: "Separates partial dependencies into standalone tables with single primary keys.",
    level: "moderate"
  },
  {
    question: "How does 3NF (Third Normal Form) eliminate transitive update anomalies?",
    shortAnswer: "By removing transitive dependencies ($X \\rightarrow Y \\rightarrow Z$), ensuring non-key attributes (like `instructor_room`) are stored in their own entity table (`Instructors`).",
    explanation: "3NF transitive dependency removal mechanism.",
    hint: "Moves transitively dependent attributes into dedicated entity tables.",
    level: "moderate"
  },
  {
    question: "Why do composite primary keys in unnormalized tables exacerbate insertion anomalies?",
    shortAnswer: "Because SQL Entity Integrity strictly forbids any column of a primary key from containing NULL; if an entity lacks values for one composite key component, insertion is completely blocked.",
    explanation: "Entity Integrity constraint role in composite keys.",
    hint: "Primary keys cannot contain NULL in any component column.",
    level: "basic"
  },
  {
    question: "What happens if a developer attempts to circumvent an Insertion Anomaly by inserting dummy keys (e.g. `student_id = 'DUMMY'`)?",
    shortAnswer: "It introduces fake records, skews aggregate metrics (`COUNT(*)`, `AVG()`), breaks referential integrity, and requires fragile filter logic across all reporting queries.",
    explanation: "Dangers of dummy row workarounds.",
    hint: "Corrupts aggregate queries, skews analytics, and violates data integrity.",
    level: "basic"
  },
  {
    question: "In what layer of database design are anomalies discovered and mathematically eliminated?",
    shortAnswer: "During Logical Database Design and Relational Normalization (Functional Dependency analysis).",
    explanation: "Database design lifecycle phase.",
    hint: "Logical Database Design and Normalization.",
    level: "basic"
  },
  {
    question: "What is the single-source-of-truth (SSOT) principle in relational normalization?",
    shortAnswer: "The principle that every distinct fact in a business domain should be stored in exactly ONE place in the database schema.",
    explanation: "SSOT design principle.",
    hint: "Every business fact is stored in exactly one table row.",
    level: "basic"
  },
  {
    question: "How do Foreign Key constraints prevent orphaned records after anomaly-curing decomposition?",
    shortAnswer: "Foreign keys enforce referential integrity between child tables (e.g. `Enrollments`) and parent tables (`Students`, `Courses`), preventing invalid references.",
    explanation: "Referential integrity role in normalized schemas.",
    hint: "Ensures child rows always reference valid existing parent primary keys.",
    level: "basic"
  },
  {
    question: "What is the performance cost of curing update anomalies through normalization?",
    shortAnswer: "Write (UPDATE/INSERT) performance is drastically improved, but complex read queries may require multi-table JOINs.",
    explanation: "Write vs read trade-off in normalized schemas.",
    hint: "Faster writes and zero desynchronization, but reads require SQL JOINs.",
    level: "basic"
  },
  {
    question: "Why are deletion anomalies particularly dangerous in banking and financial databases?",
    shortAnswer: "Because closing a customer's bank account might accidentally delete branch information, transaction logs, or regulatory audit records if stored in an unnormalized table.",
    explanation: "Financial risk of deletion anomalies.",
    hint: "Could permanently delete branch details, regulatory audit logs, or ledger master data.",
    level: "moderate"
  },
  {
    question: "Can an Insertion Anomaly occur in a table that has a single-column auto-increment primary key?",
    shortAnswer: "YES, if the table combines two independent concepts (e.g. Orders and Product details) where product details cannot be added without creating an order.",
    explanation: "Single-column PK anomaly scenario.",
    hint: "Yes, if product info is mixed into an Orders table.",
    level: "moderate"
  },
  {
    question: "What is the relationship between Functional Dependencies and Update Anomalies?",
    shortAnswer: "An update anomaly occurs whenever a functional dependency $X \\rightarrow Y$ holds in relation $R$, but $X$ is not a candidate key of $R$, resulting in redundant $Y$ values for every repeated $X$.",
    explanation: "Mathematical relationship between FDs and update anomalies.",
    hint: "Occurs when X → Y holds but X is not a candidate key, causing repeated Y values.",
    level: "moderate"
  },
  {
    question: "How does normalizing `Student_Course_Emp` into 4 tables cure the Deletion Anomaly?",
    shortAnswer: "Deleting an enrollment only removes a row from `Enrollments`; the `Courses` table retains the course record with zero enrolled students.",
    explanation: "Deletion anomaly cure mechanism.",
    hint: "Deleting from Enrollments leaves the Courses catalog completely intact.",
    level: "basic"
  },
  {
    question: "What is the consequence of an Update Anomaly in an e-commerce catalog table?",
    shortAnswer: "Customers see contradictory prices for the same product depending on which category or search page they view.",
    explanation: "E-commerce impact of update anomalies.",
    hint: "Same product displays different conflicting prices on different pages.",
    level: "basic"
  },
  {
    question: "Why are unnormalized spreadsheets (e.g. Excel) notoriously vulnerable to all 3 modification anomalies?",
    shortAnswer: "Because spreadsheets lack schema constraints, primary keys, and foreign keys, encouraging users to duplicate text attributes across multiple rows.",
    explanation: "Spreadsheet vulnerability to anomalies.",
    hint: "Spreadsheets lack primary key constraints, foreign keys, and relational decomposition.",
    level: "basic"
  },
  {
    question: "What is the difference between a Functional Anomaly and a Concurrency / Transaction Anomaly (e.g. Dirty Read)?",
    shortAnswer: "Functional anomalies stem from poor static schema design and data redundancy; concurrency anomalies stem from dynamic multi-user transaction execution conflicts.",
    explanation: "Design anomaly vs concurrency anomaly distinction.",
    hint: "Schema design flaws (static) vs transaction isolation conflicts (runtime).",
    level: "moderate"
  },
  {
    question: "How do `ON DELETE RESTRICT` foreign key rules interact with deletion anomalies?",
    shortAnswer: "They prevent accidental deletion of parent records that have active dependent child records, forcing explicit lifecycle management.",
    explanation: "Referential action safeguards.",
    hint: "Prevents accidental parent deletion while child records exist.",
    level: "basic"
  },
  {
    question: "What is the mathematical definition of a normalized relation regarding anomalies?",
    shortAnswer: "A relation is normalized if every functional dependency $X \\rightarrow Y$ is a consequence of the candidate keys of the relation, leaving zero non-key redundancies.",
    explanation: "Theoretical definition of anomaly-free relations.",
    hint: "Every determinant is a candidate key, eliminating all non-key redundancies.",
    level: "expert"
  },
  {
    question: "If a company has 1,000 employees in the 'Accounts' department, how many updates are needed to rename 'Accounts' to 'Finance' in an unnormalized vs 3NF schema?",
    shortAnswer: "Unnormalized: 1,000 row updates. 3NF: EXACTLY 1 row update in the `Departments` table.",
    explanation: "Concrete I/O comparison of update anomaly cost.",
    hint: "Unnormalized: 1,000 updates; 3NF: exactly 1 update.",
    level: "basic"
  },
  {
    question: "Can an Insertion Anomaly be solved by using a NULLABLE foreign key in a normalized schema?",
    shortAnswer: "YES. In a normalized schema, parent entities exist independently, and optional relationships (e.g. employee without a department) are modeled via nullable foreign keys.",
    explanation: "Nullable foreign key modeling for optionality.",
    hint: "Yes, nullable foreign keys cleanly model optional relationships.",
    level: "basic"
  },
  {
    question: "What is a 'Phantom Fact' in unnormalized databases?",
    shortAnswer: "A piece of information that only exists as a side-effect of another record and vanishes when that record is deleted (a direct symptom of Deletion Anomalies).",
    explanation: "Definition of phantom facts in database theory.",
    hint: "Information that only exists as a side-effect of a child record.",
    level: "moderate"
  },
  {
    question: "How does Dr. E. F. Codd's Relational Theory address database anomalies?",
    shortAnswer: "By proving that decomposing relations according to Functional Dependencies into 1NF, 2NF, 3NF, and BCNF systematically purges all modification anomalies.",
    explanation: "Codd's mathematical normalization framework.",
    hint: "Systematic decomposition into higher normal forms based on functional dependencies.",
    level: "basic"
  },
  {
    question: "What is the first step in diagnosing anomalies in an existing legacy database table?",
    shortAnswer: "List all attributes, identify all functional dependencies ($X \\rightarrow Y$), find all candidate keys, and check for partial or transitive dependencies.",
    explanation: "Diagnostic workflow for legacy database auditing.",
    hint: "Identify all functional dependencies and candidate keys.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Database Anomalies?",
    shortAnswer: "Never allow multi-entity unnormalized tables in OLTP production systems; use 3NF/BCNF decomposition to ensure every fact is stored in exactly one place with zero anomalies.",
    explanation: "Final summary for Topic 1.",
    hint: "Use 3NF/BCNF decomposition to store every fact in exactly one place with zero anomalies.",
    level: "basic"
  }
];

export default questions;
