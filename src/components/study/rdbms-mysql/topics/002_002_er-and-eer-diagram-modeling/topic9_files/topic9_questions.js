// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What are the two independent constraints governing EER Specialization and Generalization hierarchies?",
    shortAnswer: "1) Disjointness Constraint (Disjoint 'd' vs Overlapping 'o') and 2) Completeness Constraint (Total vs Partial).",
    explanation: "Two orthogonal dimensions defining subclass membership.",
    hint: "Disjointness (d/o) and Completeness (Total/Partial).",
    level: "basic"
  },
  {
    question: "What is a Disjoint Specialization ('d') in EER modeling?",
    shortAnswer: "A constraint specifying that an entity instance can belong to AT MOST ONE subclass in the specialization hierarchy ($Subclass_1 \\cap Subclass_2 = \\emptyset$).",
    explanation: "Subclasses are mutually exclusive.",
    hint: "Belongs to at most one subclass ('d').",
    level: "basic"
  },
  {
    question: "What is an Overlapping Specialization ('o') in EER modeling?",
    shortAnswer: "A constraint specifying that an entity instance can belong to MULTIPLE subclasses in the hierarchy simultaneously ($Subclass_1 \\cap Subclass_2 \\ne \\emptyset$).",
    explanation: "An instance can be both a Student and an Employee.",
    hint: "Can belong to multiple subclasses ('o').",
    level: "basic"
  },
  {
    question: "How is Disjointness represented visually in EER diagrams?",
    shortAnswer: "As a circle containing the letter 'd' (for Disjoint) or the letter 'o' (for Overlapping) placed on the specialization line.",
    explanation: "Standard visual indicator in EER notation.",
    hint: "Circle with 'd' or 'o'.",
    level: "basic"
  },
  {
    question: "What is Total Specialization (Mandatory Completeness)?",
    shortAnswer: "A constraint specifying that EVERY entity instance in the superclass MUST belong to at least one subclass in the hierarchy.",
    explanation: "No generic standalone superclass entities are permitted.",
    hint: "Every superclass entity must belong to a subclass.",
    level: "basic"
  },
  {
    question: "What is Partial Specialization (Optional Completeness)?",
    shortAnswer: "A constraint specifying that an entity instance can exist in the superclass WITHOUT belonging to any subclass in the hierarchy.",
    explanation: "Allows generic or unspecialized superclass entities.",
    hint: "Superclass entity can exist without belonging to any subclass.",
    level: "basic"
  },
  {
    question: "How is Completeness represented visually in EER diagrams?",
    shortAnswer: "Total Specialization = DOUBLE LINE connecting the Superclass to the circle; Partial Specialization = SINGLE LINE connecting the Superclass to the circle.",
    explanation: "Visual distinction between mandatory and optional completeness.",
    hint: "Double line for Total; Single line for Partial.",
    level: "basic"
  },
  {
    question: "What does the combination 'Disjoint, Total' (d, Double Line) signify?",
    shortAnswer: "Every superclass instance MUST belong to EXACTLY ONE subclass.",
    explanation: "Mutually exclusive and exhaustive partitioning.",
    hint: "Exactly one subclass.",
    level: "basic"
  },
  {
    question: "What does the combination 'Disjoint, Partial' (d, Single Line) signify?",
    shortAnswer: "A superclass instance can belong to AT MOST ONE subclass, or may belong to no subclass at all.",
    explanation: "Mutually exclusive but not exhaustive.",
    hint: "At most one subclass (or none).",
    level: "basic"
  },
  {
    question: "What does the combination 'Overlapping, Total' (o, Double Line) signify?",
    shortAnswer: "Every superclass instance MUST belong to AT LEAST ONE subclass, and may belong to multiple subclasses simultaneously.",
    explanation: "Exhaustive but non-exclusive.",
    hint: "At least one subclass (can be multiple).",
    level: "basic"
  },
  {
    question: "What does the combination 'Overlapping, Partial' (o, Single Line) signify?",
    shortAnswer: "A superclass instance can belong to ZERO, ONE, or MULTIPLE subclasses simultaneously.",
    explanation: "The most flexible and least restrictive combination.",
    hint: "Zero, one, or multiple subclasses.",
    level: "basic"
  },
  {
    question: "Why CANNOT a single `ENUM('Student', 'Employee')` column be used for an Overlapping Specialization in MySQL?",
    shortAnswer: "Because a standard single column can hold only ONE value per row, preventing an individual from simultaneously being both a Student and an Employee.",
    explanation: "Single scalar columns enforce mutual exclusivity.",
    hint: "Single scalar column cannot hold multiple roles simultaneously.",
    level: "moderate"
  },
  {
    question: "How can Overlapping Specialization be implemented within a single table in MySQL?",
    shortAnswer: "By creating multiple boolean/flag columns (e.g. `is_student BOOLEAN NOT NULL DEFAULT FALSE`, `is_employee BOOLEAN NOT NULL DEFAULT FALSE`).",
    explanation: "Flag-based Single Table mapping for overlapping subtypes.",
    hint: "Multiple boolean flag columns.",
    level: "moderate",
    codeExample: "CREATE TABLE persons (\n    person_id INT PRIMARY KEY,\n    full_name VARCHAR(100),\n    is_student BOOLEAN NOT NULL DEFAULT FALSE,\n    is_employee BOOLEAN NOT NULL DEFAULT FALSE\n);"
  },
  {
    question: "How is Total Specialization enforced in Table-Per-Hierarchy single-table mapping in MySQL?",
    shortAnswer: "Using a `CHECK` constraint: `CHECK (is_student = 1 OR is_employee = 1)` or `CHECK (role_code IS NOT NULL)`.",
    explanation: "Enforces that at least one subclass condition is true.",
    hint: "CHECK constraint requiring at least one subtype flag.",
    level: "moderate",
    codeExample: "CONSTRAINT chk_total_spec CHECK (is_student = TRUE OR is_instructor = TRUE)"
  },
  {
    question: "How is Disjoint Specialization enforced in Table-Per-Hierarchy single-table mapping in MySQL?",
    shortAnswer: "Using a single `ENUM` discriminator column (e.g. `person_type ENUM('Student', 'Instructor') NOT NULL`), which naturally allows only one value.",
    explanation: "ENUM guarantees mutually exclusive disjointness.",
    hint: "Single ENUM discriminator column.",
    level: "basic"
  },
  {
    question: "In Table-Per-Type mapping with Disjoint Specialization, how do you prevent an application from inserting the same `person_id` into BOTH `students` and `instructors` tables?",
    shortAnswer: "Using a `BEFORE INSERT` trigger on both subclass tables that verifies the `person_id` does not already exist in the other sibling table.",
    explanation: "Cross-table trigger enforcement for disjointness.",
    hint: "BEFORE INSERT triggers checking sibling tables.",
    level: "expert",
    codeExample: "CREATE TRIGGER trg_disjoint_student BEFORE INSERT ON students\nFOR EACH ROW\nBEGIN\n    IF EXISTS (SELECT 1 FROM instructors WHERE person_id = NEW.person_id) THEN\n        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Disjoint violation: Person is already an Instructor';\n    END IF;\nEND;"
  },
  {
    question: "What is an example of a real-world entity hierarchy that is 'Disjoint and Total'?",
    shortAnswer: "`Bank_Account` specialized into `Savings_Account` and `Current_Account` (every account must be one or the other, and cannot be both).",
    explanation: "Classic banking example.",
    hint: "Savings vs Current bank accounts.",
    level: "basic"
  },
  {
    question: "What is an example of a real-world entity hierarchy that is 'Overlapping and Partial'?",
    shortAnswer: "`University_Person` specialized into `Teaching_Assistant`, `Research_Scholar`, and `Sports_Club_Member` (a person can be in none, one, or all three).",
    explanation: "Flexible academic roles.",
    hint: "University campus optional roles.",
    level: "basic"
  },
  {
    question: "What is an example of a real-world entity hierarchy that is 'Disjoint and Partial'?",
    shortAnswer: "`Employee` specialized into `Pilot` and `Flight_Attendant` (an employee can be a Pilot or Flight Attendant, but some employees are Baggage Handlers or Desk Clerks who belong to neither).",
    explanation: "Mutually exclusive specialized roles with unspecialized generic staff.",
    hint: "Airline staff with specialized vs general ground roles.",
    level: "moderate"
  },
  {
    question: "What is an example of a real-world entity hierarchy that is 'Overlapping and Total'?",
    shortAnswer: "`Part_Manufacturer` specialized into `Supplier` and `Consumer` (every part must be supplied or consumed, and some parts are both supplied and consumed internally).",
    explanation: "Exhaustive overlapping manufacturing roles.",
    hint: "Manufacturing parts supplied and consumed.",
    level: "moderate"
  },
  {
    question: "How does Peter Chen notation vs Extended ER (EER) notation represent specialization?",
    shortAnswer: "Peter Chen notation does NOT natively support specialization; EER extends Chen notation by adding the circle ('d'/'o') and subset symbols (`⊂`).",
    explanation: "EER was developed specifically to add subclassing to Chen ER.",
    hint: "EER adds circles and subset symbols to Chen notation.",
    level: "moderate"
  },
  {
    question: "What does the subset symbol `⊂` on the line connecting the circle to the subclass indicate?",
    shortAnswer: "It indicates that the subclass entity set is a proper mathematical SUBSET of the superclass entity set ($Subclass \\subset Superclass$).",
    explanation: "Mathematical set-theoretic definition of subclassing.",
    hint: "Subclass is a subset of Superclass.",
    level: "basic"
  },
  {
    question: "Can an entity have TWO DIFFERENT, INDEPENDENT Specializations simultaneously?",
    shortAnswer: "Yes (e.g. `Employee` can be specialized by `Employment_Status` [Full-Time vs Part-Time] AND independently specialized by `Job_Type` [Engineer vs Accountant]).",
    explanation: "Multiple orthogonal specialization hierarchies on the same superclass.",
    hint: "Multiple orthogonal specialization hierarchies.",
    level: "expert"
  },
  {
    question: "How are two independent specializations on the same superclass represented in EER diagrams?",
    shortAnswer: "By drawing TWO separate circles branching off the same Superclass rectangle, each with its own subclasses and constraints.",
    explanation: "Independent specialization branches.",
    hint: "Two separate circles branching from the superclass.",
    level: "expert"
  },
  {
    question: "What is a 'Defining Predicate' in Disjoint Specialization?",
    shortAnswer: "A boolean expression on a superclass attribute that automatically assigns entity instances to a specific subclass (e.g. `Salary_Type = 'Hourly'` assigns to `Hourly_Employee`).",
    explanation: "Predicate-driven automatic subtype partitioning.",
    hint: "Boolean condition on superclass attribute.",
    level: "moderate"
  },
  {
    question: "How do you query all persons who belong to BOTH subclasses in an Overlapping Table-Per-Type schema?",
    shortAnswer: "Using an `INNER JOIN` across both subclass tables: `SELECT p.full_name FROM persons p JOIN students s ON p.person_id = s.person_id JOIN instructors i ON p.person_id = i.person_id;`.",
    explanation: "Finds entities present in both subclass tables.",
    hint: "INNER JOIN across persons, students, and instructors.",
    level: "moderate",
    codeExample: "SELECT p.person_id, p.full_name\nFROM persons p\nINNER JOIN students s ON p.person_id = s.person_id\nINNER JOIN instructors i ON p.person_id = i.person_id;"
  },
  {
    question: "What happens when you delete a person who belongs to both `students` and `instructors` in a Table-Per-Type schema with `ON DELETE CASCADE`?",
    shortAnswer: "MySQL InnoDB automatically and atomically removes the matching rows from BOTH `students` AND `instructors` tables in the same transaction.",
    explanation: "Cascading deletion cleans up all overlapping subclass tables.",
    hint: "Both subclass rows are automatically deleted.",
    level: "basic"
  },
  {
    question: "What is the primary advantage of choosing Disjoint & Total specialization when applicable?",
    shortAnswer: "It creates the simplest, most performant relational mapping (a single table with a NOT NULL ENUM discriminator) with zero NULL values and fast indexing.",
    explanation: "Optimizes relational storage and indexing.",
    hint: "Simplest single-table mapping with NOT NULL discriminator.",
    level: "moderate"
  },
  {
    question: "How do UML Class Diagrams represent Disjoint vs Overlapping constraints?",
    shortAnswer: "Using constraints in curly braces next to the generalization tree: `{disjoint, complete}`, `{disjoint, incomplete}`, `{overlapping, complete}`, or `{overlapping, incomplete}`.",
    explanation: "Standard UML generalization constraint modifiers.",
    hint: "UML {disjoint, complete} constraints.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist for modeling Specialization Constraints?",
    shortAnswer: "1) Determine Disjointness: can an instance belong to >1 subclass? (Disjoint 'd' vs Overlapping 'o'). 2) Determine Completeness: must every instance belong to a subclass? (Total = Double line vs Partial = Single line). 3) For Disjoint Total, map to single table with ENUM. 4) For Overlapping, map to Table-Per-Type. 5) Use triggers or CHECK constraints for integrity enforcement.",
    explanation: "Following these 5 rules guarantees mathematically consistent specialization schemas.",
    hint: "Disjointness (d/o), Completeness (Total/Partial), ENUM for Disjoint, Table-Per-Type for Overlapping, Integrity triggers.",
    level: "basic"
  }
];

export default questions;
