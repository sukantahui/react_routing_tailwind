// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What defines an Unnormalized Form (UNF) database or spreadsheet?",
    shortAnswer: "A structure containing repeating groups, multi-valued cells (e.g. comma-separated lists), non-atomic data, and no formalized primary keys.",
    explanation: "UNF flat sheets suffer from severe insertion, update, and deletion anomalies.",
    hint: "Contains multi-valued cells, repeating groups, and no unique primary keys.",
    level: "basic"
  },
  {
    question: "What is an 'Insertion Anomaly' in an unnormalized spreadsheet?",
    shortAnswer: "The inability to record information about one entity (e.g. a new course or instructor) without artificially inventing data for another entity (e.g. dummy student).",
    explanation: "Cannot insert standalone independent entities.",
    hint: "Cannot record a new course without having a student enrollment.",
    level: "basic"
  },
  {
    question: "What is an 'Update Anomaly' in an unnormalized spreadsheet?",
    shortAnswer: "When changing a single piece of data (e.g. an instructor's phone number) requires updating hundreds of duplicate rows, risking data inconsistency if any row is missed.",
    explanation: "Data redundancy causes synchronization failures during updates.",
    hint: "Updating redundant data across hundreds of rows risks inconsistency.",
    level: "basic"
  },
  {
    question: "What is a 'Deletion Anomaly' in an unnormalized spreadsheet?",
    shortAnswer: "When deleting a record for one entity (e.g. cancelling a student's enrollment) unintentionally wipes out critical information about another entity (e.g. course or classroom).",
    explanation: "Unintended loss of independent entity data upon row deletion.",
    hint: "Deleting a student accidentally deletes course and classroom details.",
    level: "basic"
  },
  {
    question: "What are the two mandatory requirements to achieve First Normal Form (1NF)?",
    shortAnswer: "1. All column values must be atomic (indivisible scalar values with no repeating/multi-valued groups), and 2. A primary key must uniquely identify each row.",
    explanation: "Eliminates nested lists and guarantees row uniqueness.",
    hint: "Atomic scalar values + Unique primary key.",
    level: "basic"
  },
  {
    question: "What is a 'Partial Functional Dependency' in database normalization?",
    shortAnswer: "A dependency where a non-prime attribute depends on only a subset (part) of a composite primary key, rather than the entire composite key.",
    explanation: "Partial dependencies violate Second Normal Form (2NF).",
    hint: "A non-key column depends on only part of a composite primary key.",
    level: "basic"
  },
  {
    question: "What is the requirement for a table to be in Second Normal Form (2NF)?",
    shortAnswer: "The table must be in 1NF AND contain zero partial functional dependencies (every non-key attribute must be fully functionally dependent on the entire primary key).",
    explanation: "Tables with single-column primary keys that are in 1NF are automatically in 2NF.",
    hint: "Must be in 1NF and have NO partial dependencies.",
    level: "basic"
  },
  {
    question: "What is a 'Transitive Dependency' in database normalization?",
    shortAnswer: "A functional dependency where a non-prime attribute depends on another non-prime attribute ($X \\to Y$ and $Y \\to Z$, where $X$ is the primary key and $Y, Z$ are non-key columns).",
    explanation: "Transitive dependencies violate Third Normal Form (3NF).",
    hint: "Non-key column depends on another non-key column (X -> Y -> Z).",
    level: "basic"
  },
  {
    question: "What is the requirement for a table to be in Third Normal Form (3NF)?",
    shortAnswer: "The table must be in 2NF AND contain zero transitive functional dependencies (no non-key attribute depends on another non-key attribute).",
    explanation: "Every non-key attribute must depend on 'the key, the whole key, and nothing but the key'.",
    hint: "Must be in 2NF and have NO transitive dependencies.",
    level: "basic"
  },
  {
    question: "In the raw student sheet, why does `Student_ID -> Branch_City -> Branch_Pincode` violate 3NF?",
    shortAnswer: "Because `Branch_Pincode` depends transitively on `Branch_City` (a non-key attribute) rather than directly on `Student_ID`.",
    explanation: "Must be decomposed into a separate `branches` lookup table.",
    hint: "Transitive dependency: Branch_Pincode depends on Branch_City.",
    level: "moderate"
  },
  {
    question: "In the raw course sheet, why does `Course_Code -> Instructor_ID -> Instructor_Phone` violate 3NF?",
    shortAnswer: "Because `Instructor_Phone` depends on `Instructor_ID` (non-key), not on `Course_Code` directly.",
    explanation: "Must be decomposed into a separate `instructors` table.",
    hint: "Transitive dependency: Instructor_Phone depends on Instructor_ID.",
    level: "moderate"
  },
  {
    question: "How do you decompose a partial dependency `(StudentID, CourseCode) -> StudentName` during 2NF normalization?",
    shortAnswer: "Extract `(StudentID, StudentName)` into a dedicated `students` table, leaving `StudentID` as a foreign key in `enrollments`.",
    explanation: "Separates student entity attributes from enrollment intersection data.",
    hint: "Extract StudentID and StudentName into a dedicated students table.",
    level: "moderate"
  },
  {
    question: "Why does converting to 3NF eliminate Insertion Anomalies?",
    shortAnswer: "Because each real-world entity (Instructors, Courses, Branches) has its own independent table, allowing records to be inserted without requiring dependent relationships.",
    explanation: "Independent entities can be created freely without dummy placeholder data.",
    hint: "Entities have dedicated tables and can be added independently.",
    level: "basic"
  },
  {
    question: "Why does converting to 3NF eliminate Update Anomalies?",
    shortAnswer: "Because facts are stored in exactly ONE place (single source of truth); changing an instructor's phone requires updating exactly one row in `instructors`.",
    explanation: "Zero data duplication eliminates sync errors.",
    hint: "Every fact is stored in exactly one row in its dedicated entity table.",
    level: "basic"
  },
  {
    question: "Why does converting to 3NF eliminate Deletion Anomalies?",
    shortAnswer: "Because deleting a student's enrollment row in `enrollments` does not affect the physical records in `courses`, `instructors`, or `branches`.",
    explanation: "Relational isolation protects independent entity lifecycles.",
    hint: "Deleting an enrollment does not delete the independent course or instructor.",
    level: "basic"
  },
  {
    question: "What is Boyce-Codd Normal Form (BCNF)?",
    shortAnswer: "A stricter version of 3NF where for EVERY functional dependency $X \\to Y$, the determinant $X$ MUST be a Superkey (Candidate Key).",
    explanation: "Addresses rare anomalies where a candidate key is composite and determinants overlap.",
    hint: "For every functional dependency X -> Y, X must be a superkey.",
    level: "expert"
  },
  {
    question: "What SQL command migrates unique course records from a raw staging table into a clean 3NF `courses` table?",
    shortAnswer: "`INSERT INTO courses (course_code, course_name, instructor_id) SELECT DISTINCT course_code, course_name, instructor_id FROM raw_staging;`",
    explanation: "Uses SELECT DISTINCT to filter out redundant rows during ETL migration.",
    hint: "INSERT INTO courses SELECT DISTINCT ... FROM raw_staging;",
    level: "moderate"
  },
  {
    question: "What is Lossless-Join Decomposition in relational normalization?",
    shortAnswer: "A mathematical property guaranteeing that when normalized tables are joined back together with `NATURAL JOIN` / `INNER JOIN`, they produce the exact original dataset with zero spurious (phantom) rows.",
    explanation: "Guarantees no data corruption or false combinations occur.",
    hint: "Rejoining decomposed tables recreates the original data with no spurious rows.",
    level: "expert"
  },
  {
    question: "What is Dependency Preservation in relational normalization?",
    shortAnswer: "A property ensuring that all functional dependencies from the original schema can be enforced using individual table keys without requiring cross-table joins.",
    explanation: "Ensures constraints can be checked efficiently at write time.",
    hint: "Functional dependencies can be enforced within individual tables without joins.",
    level: "expert"
  },
  {
    question: "Can a table with only TWO columns be in 2NF and 3NF automatically?",
    shortAnswer: "YES. If in 1NF with a candidate key, a 2-column table cannot have partial dependencies (requires composite PK) or transitive dependencies (requires at least 2 non-key columns).",
    explanation: "Two-column tables in 1NF are inherently in 3NF and BCNF.",
    hint: "Yes; mathematically cannot have partial or transitive dependencies.",
    level: "expert"
  },
  {
    question: "What is the trade-off between higher normalization (3NF/BCNF) vs denormalization in high-traffic OLAP analytics?",
    shortAnswer: "3NF eliminates redundancy and speeds up writes (OLTP), but requires multi-table JOINs; denormalization speeds up complex read queries (OLAP) at the cost of duplicate data and write overhead.",
    explanation: "Balances transactional integrity against analytical read throughput.",
    hint: "3NF is optimal for writes and integrity; denormalization accelerates analytical reads.",
    level: "moderate"
  },
  {
    question: "In the 3NF academy schema, which table stores student exam grades (`exam_score_pct`)?",
    shortAnswer: "The `enrollments` junction table, because exam score functionally depends on the combined pair `(student_id, course_code)`.",
    explanation: "Scores belong to the student's enrollment in that specific course.",
    hint: "The enrollments table because score depends on both student and course.",
    level: "basic"
  },
  {
    question: "Which table stores individual fee payment receipts in the 3NF schema?",
    shortAnswer: "`fee_payments (receipt_no PK, enrollment_id FK, payment_date, amount_paid_inr)`.",
    explanation: "Separates individual financial payment events from enrollment registration.",
    hint: "The fee_payments table with receipt_no as Primary Key.",
    level: "basic"
  },
  {
    question: "How do you recreate the original flat spreadsheet report from the clean 6-table 3NF schema in SQL?",
    shortAnswer: "Write an `INNER JOIN` query joining `students` → `branches`, `students` → `enrollments` → `courses` → `instructors`, and `enrollments` → `fee_payments`.",
    explanation: "Reconstructs the wide denormalized report dynamically on read without storing duplicates.",
    hint: "Use a multi-table INNER JOIN query linking all 6 tables.",
    level: "basic"
  },
  {
    question: "What foreign key cascade rule should be applied between `students` and `enrollments`?",
    shortAnswer: "`ON DELETE CASCADE` or `ON DELETE RESTRICT` depending on business policy (RESTRICT preserves historical academic transcripts).",
    explanation: "RESTRICT prevents accidental deletion of students with active academic records.",
    hint: "ON DELETE RESTRICT to preserve academic history.",
    level: "moderate"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu demonstrate the transition from spreadsheet to 3NF?",
    shortAnswer: "By eliminating repeated branch names, extracting Susmita's instructor profile into `instructors`, and storing individual tuition receipts in `fee_payments` with zero data duplication.",
    explanation: "Demonstrates practical reduction of data bloat across student admissions.",
    hint: "Eliminates duplicate branch/instructor data across student enrollment records.",
    level: "basic"
  },
  {
    question: "What is the famous mnemonic quote by Bill Kent summarizing Third Normal Form?",
    shortAnswer: "'Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key, so help me Codd.'",
    explanation: "The classic summary of 1NF (the key), 2NF (the whole key), and 3NF (nothing but the key).",
    hint: "The key, the whole key, and nothing but the key.",
    level: "basic"
  },
  {
    question: "Why should phone numbers be normalized into a `student_phones` table if students have multiple contact numbers?",
    shortAnswer: "To prevent repeating groups and maintain 1NF atomicity without creating hardcoded columns like `phone1, phone2, phone3`.",
    explanation: "Supports 1-to-many phone numbers cleanly.",
    hint: "Enforces 1NF without hardcoding phone1, phone2, phone3 columns.",
    level: "moderate"
  },
  {
    question: "What check constraint ensures that `exam_score_pct` in `enrollments` remains between 0.00 and 100.00?",
    shortAnswer: "`CHECK (exam_score_pct >= 0.00 AND exam_score_pct <= 100.00)`",
    explanation: "Guarantees valid academic percentage ranges at the schema level.",
    hint: "CHECK (exam_score_pct >= 0.00 AND exam_score_pct <= 100.00)",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for end-to-end normalization?",
    shortAnswer: "Audit raw spreadsheets for anomalies, flatten multi-values to achieve 1NF, split composite key dependencies to reach 2NF, eliminate non-key transitivity to achieve 3NF, and write idempotent ETL migration scripts.",
    explanation: "Transforms unstructured spreadsheet chaos into enterprise-grade relational schemas.",
    hint: "UNF -> 1NF (Atomic) -> 2NF (Full Key) -> 3NF (Direct Key) + ETL Migration.",
    level: "expert"
  }
];

export default questions;
