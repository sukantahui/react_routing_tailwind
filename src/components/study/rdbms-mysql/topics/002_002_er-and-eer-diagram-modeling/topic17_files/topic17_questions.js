// topic17_files/topic17_questions.js

const questions = [
  {
    question: "What is Step 7 of the ER-to-Relational Mapping Algorithm?",
    shortAnswer: "Mapping Extended ER (EER) Specialization and Generalization Hierarchies into relational schemas using one of 4 distinct architectural strategies (Options 7A, 7B, 7C, 7D).",
    explanation: "EER specialization-to-relational mapping step.",
    hint: "Mapping EER specialization hierarchies using 4 strategies.",
    level: "basic"
  },
  {
    question: "What is Strategy 7A (Table-Per-Type / Joined Inheritance)?",
    shortAnswer: "Creating a table for the Superclass and a separate table for EACH Subclass, where subclass tables share the Superclass Primary Key as both their PK and FK.",
    explanation: "Clean 3NF normalized mapping pattern.",
    hint: "Superclass table + separate subclass tables linked by shared PK/FK.",
    level: "basic"
  },
  {
    question: "What is the primary advantage of Strategy 7A (Table-Per-Type)?",
    shortAnswer: "It strictly adheres to 3NF normalization, ensures zero NULL columns, and allows adding NOT NULL constraints on all subclass-specific fields.",
    explanation: "Eliminates NULL column bloat.",
    hint: "Strict 3NF, zero NULL columns, NOT NULL constraints.",
    level: "basic"
  },
  {
    question: "What is the primary disadvantage of Strategy 7A (Table-Per-Type)?",
    shortAnswer: "Polymorphic queries require multi-table `INNER JOIN` operations to assemble the complete entity profile, which may increase query latency on massive datasets.",
    explanation: "Join overhead during read operations.",
    hint: "Requires multi-table INNER JOINs.",
    level: "moderate"
  },
  {
    question: "What is Strategy 7B (Table-Per-Concrete-Class / Subclasses Only)?",
    shortAnswer: "Creating tables ONLY for the leaf subclasses (no superclass table), with each subclass table duplicating all inherited superclass columns.",
    explanation: "Subclasses-only schema pattern.",
    hint: "Tables only for concrete leaf subclasses.",
    level: "moderate"
  },
  {
    question: "Why can Strategy 7B (Table-Per-Concrete-Class) ONLY be used if the specialization is both DISJOINT and TOTAL?",
    shortAnswer: "Because if it is Partial, generic superclass entities have no table to live in; if it is Overlapping, an entity belonging to multiple subclasses would be duplicated across multiple tables, violating 1:1 identity.",
    explanation: "Mathematical constraints for concrete class mapping.",
    hint: "Disjoint prevents duplicate rows; Total prevents orphan superclass entities.",
    level: "expert"
  },
  {
    question: "What is Strategy 7C (Table-Per-Hierarchy with Single Type Discriminator)?",
    shortAnswer: "Collapsing the superclass and all subclasses into a SINGLE unified table with a single `type_code` ENUM discriminator and nullable subclass-specific columns.",
    explanation: "Single Table Inheritance for disjoint subtypes.",
    hint: "Single table with ENUM discriminator and nullable columns.",
    level: "basic",
    codeExample: "CREATE TABLE academy_members (\n    member_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    member_type ENUM('Student', 'Faculty') NOT NULL,\n    tuition_fee DECIMAL(10,2) NULL,\n    monthly_salary DECIMAL(10,2) NULL\n);"
  },
  {
    question: "Why CANNOT Strategy 7C (Single ENUM Discriminator) be used for Overlapping Specialization?",
    shortAnswer: "Because a single scalar ENUM column can hold only ONE value per row, preventing an individual from simultaneously holding multiple subclass roles.",
    explanation: "Scalar columns enforce mutual exclusivity.",
    hint: "A single column cannot hold multiple roles simultaneously.",
    level: "basic"
  },
  {
    question: "What is Strategy 7D (Table-Per-Hierarchy with Multiple Boolean Flags)?",
    shortAnswer: "Collapsing an Overlapping specialization hierarchy into a SINGLE unified table with multiple boolean flags (`is_student`, `is_faculty`) and nullable subclass columns.",
    explanation: "Single Table Inheritance for overlapping subtypes.",
    hint: "Single table with multiple boolean flags.",
    level: "moderate",
    codeExample: "CREATE TABLE university_persons (\n    person_id INT AUTO_INCREMENT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL,\n    is_student BOOLEAN NOT NULL DEFAULT FALSE,\n    is_faculty BOOLEAN NOT NULL DEFAULT FALSE,\n    tuition_fee DECIMAL(10,2) NULL,\n    monthly_salary DECIMAL(10,2) NULL\n);"
  },
  {
    question: "Which of the 4 strategies works for ALL combinations of Disjointness and Completeness (d/o and Total/Partial)?",
    shortAnswer: "Strategy 7A (Table-Per-Type / Joined Inheritance).",
    explanation: "Universal applicability of TPT.",
    hint: "Strategy 7A (Table-Per-Type).",
    level: "basic"
  },
  {
    question: "In Object-Relational Mapping (ORM) frameworks like Hibernate, what annotation corresponds to Strategy 7C?",
    shortAnswer: "`@Inheritance(strategy = InheritanceType.SINGLE_TABLE)`.",
    explanation: "Standard JPA annotation for TPH.",
    hint: "InheritanceType.SINGLE_TABLE.",
    level: "expert"
  },
  {
    question: "In Object-Relational Mapping (ORM) frameworks, what annotation corresponds to Strategy 7B?",
    shortAnswer: "`@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)`.",
    explanation: "Standard JPA annotation for TPC.",
    hint: "InheritanceType.TABLE_PER_CLASS.",
    level: "expert"
  },
  {
    question: "What is the storage drawback of Strategy 7C and 7D (Single Table Inheritance)?",
    shortAnswer: "Sparse storage with many NULL values in subclass-specific columns, and inability to enforce database-level `NOT NULL` constraints on those specific fields.",
    explanation: "Nullable column trade-off.",
    hint: "Sparse tables with NULL values and no NOT NULL constraints.",
    level: "moderate"
  },
  {
    question: "When is Strategy 7C (Single Table with Discriminator) the optimal choice in enterprise production?",
    shortAnswer: "When subclasses have VERY FEW specific columns (e.g. 1-2 columns each), read/write performance is critical, and eliminating joins outweighs the minor NULL storage cost.",
    explanation: "Performance vs normalization trade-off.",
    hint: "When subclasses have few specific columns and query speed is critical.",
    level: "moderate"
  },
  {
    question: "How do you query all students in Strategy 7C using SQL?",
    shortAnswer: "`SELECT member_id, full_name, tuition_fee FROM academy_members WHERE member_type = 'Student';`.",
    explanation: "Direct filter on discriminator column.",
    hint: "WHERE member_type = 'Student'.",
    level: "basic"
  },
  {
    question: "How do you query all entities in Strategy 7B (Table-Per-Concrete-Class)?",
    shortAnswer: "Using a `UNION ALL` query: `SELECT 'Student' AS type, student_id, name, tuition_fee, NULL AS salary FROM students UNION ALL SELECT 'Faculty', faculty_id, name, NULL, monthly_salary FROM faculty;`.",
    explanation: "UNION ALL across concrete tables.",
    hint: "UNION ALL across concrete leaf tables.",
    level: "moderate"
  },
  {
    question: "How is Total Completeness enforced in Strategy 7D in MySQL?",
    shortAnswer: "Using a table-level `CHECK` constraint: `CHECK (is_student = TRUE OR is_faculty = TRUE)`.",
    explanation: "CHECK constraint requires at least one subtype flag.",
    hint: "CHECK (is_student = TRUE OR is_faculty = TRUE).",
    level: "moderate"
  },
  {
    question: "What is the Primary Key of the subclass table in Strategy 7A?",
    shortAnswer: "The exact same column name and data type as the Superclass Primary Key (serving as both PK and FK).",
    explanation: "Shared primary key identity.",
    hint: "Superclass primary key as both PK and FK.",
    level: "basic"
  },
  {
    question: "Why should you never create an artificial `AUTO_INCREMENT` column on a subclass table in Strategy 7A?",
    shortAnswer: "Because it severs the 1:1 IS-A linkage with the parent superclass row, requiring separate lookup logic.",
    explanation: "Breaks 1:1 identity linkage.",
    hint: "Breaks 1:1 identity linkage with parent row.",
    level: "basic"
  },
  {
    question: "How do you count total students vs total faculty members in Strategy 7C?",
    shortAnswer: "`SELECT member_type, COUNT(*) AS member_count FROM academy_members GROUP BY member_type;`.",
    explanation: "Fast single-table group by aggregation.",
    hint: "GROUP BY member_type.",
    level: "basic"
  },
  {
    question: "How do you enforce that a student's `tuition_fee` CANNOT be NULL when `member_type = 'Student'` in Strategy 7C?",
    shortAnswer: "Using a `CHECK` constraint: `CHECK ((member_type = 'Student' AND tuition_fee IS NOT NULL) OR (member_type != 'Student'))`.",
    explanation: "Conditional check constraint in MySQL 8.0.16+.",
    hint: "Conditional CHECK constraint on discriminator and specific column.",
    level: "expert",
    codeExample: "CONSTRAINT chk_student_fee CHECK (\n    (member_type = 'Student' AND tuition_fee IS NOT NULL) OR\n    (member_type != 'Student' AND tuition_fee IS NULL)\n)"
  },
  {
    question: "What happens if a developer deletes a person in Strategy 7A when `ON DELETE CASCADE` is active?",
    shortAnswer: "MySQL InnoDB automatically deletes matching rows in `students` or `faculty` tables in the same transaction.",
    explanation: "Cascading referential cleanup.",
    hint: "Automatically deletes child subclass rows.",
    level: "basic"
  },
  {
    question: "Which mapping strategy produces the fewest total tables in the database schema?",
    shortAnswer: "Strategy 7C and Strategy 7D (Single Table Inheritance: exactly 1 table).",
    explanation: "Collapses entire hierarchy into 1 table.",
    hint: "Strategy 7C and 7D (1 table).",
    level: "basic"
  },
  {
    question: "Which mapping strategy produces the cleanest 3NF normalization?",
    shortAnswer: "Strategy 7A (Table-Per-Type: zero NULLs and zero schema redundancy).",
    explanation: "Gold standard for 3NF.",
    hint: "Strategy 7A (Table-Per-Type).",
    level: "basic"
  },
  {
    question: "Can an EER hierarchy with 10 subclasses and 50 unique attributes across them use Strategy 7C cleanly?",
    shortAnswer: "No, because a single table with 50 nullable columns would create extreme sparsity, waste row-size limits (65,535 bytes in MySQL), and create schema clutter.",
    explanation: "Sparse table limits in relational engines.",
    hint: "No, 50 nullable columns create extreme sparsity and hit row-size limits.",
    level: "moderate"
  },
  {
    question: "How does a View `vw_all_persons` provide polymorphic querying for Strategy 7A in MySQL?",
    shortAnswer: "By performing `LEFT JOIN` on both `students` and `faculty` tables with a computed `role` column.",
    explanation: "Polymorphic view over joined inheritance.",
    hint: "LEFT JOIN on students and faculty with computed role.",
    level: "basic",
    codeExample: "CREATE VIEW vw_all_persons AS\nSELECT p.person_id, p.full_name,\n       CASE WHEN s.person_id IS NOT NULL THEN 'Student' WHEN f.person_id IS NOT NULL THEN 'Faculty' ELSE 'Generic' END AS person_role,\n       s.tuition_fee, f.monthly_salary\nFROM persons p\nLEFT JOIN students s ON p.person_id = s.person_id\nLEFT JOIN faculty f ON p.person_id = f.person_id;"
  },
  {
    question: "What is the primary risk of using Strategy 7B when primary keys are generated via `AUTO_INCREMENT` in each concrete table?",
    shortAnswer: "Student table and Faculty table will generate colliding ID values (e.g. Student #1 and Faculty #1), making global entity identification impossible without a prefix.",
    explanation: "ID collision in concrete subclass tables.",
    hint: "ID collisions between concrete subclass tables.",
    level: "expert"
  },
  {
    question: "How do you evaluate which strategy to choose for a new EER hierarchy?",
    shortAnswer: "1) If strict 3NF & zero NULLs needed ➔ Strategy 7A. 2) If Disjoint Total with heavy leaf-only queries ➔ Strategy 7B. 3) If Disjoint with few specific columns & fast reads ➔ Strategy 7C. 4) If Overlapping with few specific columns ➔ Strategy 7D.",
    explanation: "Decision rubric for EER mapping strategies.",
    hint: "3NF zero NULLs ➔ 7A; Disjoint Total leaf reads ➔ 7B; Disjoint few attrs ➔ 7C; Overlapping few attrs ➔ 7D.",
    level: "basic"
  },
  {
    question: "What is the impact of Strategy 7A on clustered B-Tree index caching in MySQL InnoDB?",
    shortAnswer: "Very efficient, because each table contains only its own compact rows, maximizing the number of rows that fit inside the InnoDB Buffer Pool.",
    explanation: "Buffer pool efficiency for compact normalized rows.",
    hint: "Compact rows maximize InnoDB buffer pool efficiency.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist for Step 7: Mapping EER Specialization Hierarchies?",
    shortAnswer: "1) Analyze hierarchy constraints (d/o, Total/Partial). 2) Count number of subclass-specific attributes. 3) Choose between 7A (TPT for 3NF), 7C (TPH for speed/disjoint), or 7D (TPH for overlapping). 4) For 7A, use superclass PK as subclass PK/FK with ON DELETE CASCADE. 5) For 7C/7D, add CHECK constraints to enforce conditional completeness.",
    explanation: "Following these 5 rules guarantees optimal architectural selection for any EER hierarchy.",
    hint: "Analyze constraints, count specific attrs, choose 7A/7C/7D, configure PK/FK and CHECK constraints.",
    level: "basic"
  }
];

export default questions;
