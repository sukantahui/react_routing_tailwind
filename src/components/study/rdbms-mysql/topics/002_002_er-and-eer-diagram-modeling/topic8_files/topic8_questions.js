// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is Extended Entity-Relationship (EER) Modeling?",
    shortAnswer: "An extension of classical ER modeling incorporating advanced object-oriented conceptual abstractions such as Subclasses, Superclasses, Specialization, Generalization, and Inheritance.",
    explanation: "Standardized conceptual framework for complex data hierarchies.",
    hint: "Extension of ER with subclasses, superclasses, and inheritance.",
    level: "basic"
  },
  {
    question: "What is a Superclass in EER modeling?",
    shortAnswer: "A generic parent entity set that includes distinct subgroups of entity instances that need to be represented in the data model.",
    explanation: "Example: `Person`, `Employee`, `Vehicle`.",
    hint: "Generic parent entity set.",
    level: "basic"
  },
  {
    question: "What is a Subclass in EER modeling?",
    shortAnswer: "A specialized child subgrouping of entities from a superclass that possess distinct specific attributes or relationships.",
    explanation: "Example: `Student` or `Instructor` as subclasses of `Person`.",
    hint: "Specialized child subgroup of entities.",
    level: "basic"
  },
  {
    question: "What is an 'IS-A Relationship'?",
    shortAnswer: "The 1:1 relationship between a subclass instance and its superclass instance (e.g. 'A Student IS-A Person').",
    explanation: "Conceptual inheritance association.",
    hint: "Subclass instance IS-A superclass instance.",
    level: "basic"
  },
  {
    question: "What is Type Inheritance in EER modeling?",
    shortAnswer: "The principle that a subclass automatically inherits ALL attributes and relationships of its superclass, while also defining its own local specific attributes.",
    explanation: "Subclasses inherit superclass attributes including primary key.",
    hint: "Subclass inherits all superclass attributes and relationships.",
    level: "basic"
  },
  {
    question: "What is Specialization in EER modeling?",
    shortAnswer: "A top-down conceptual design process of defining one or more specialized subclasses from a generic superclass based on distinguishing features.",
    explanation: "Top-down decomposition from general to specific.",
    hint: "Top-down design from superclass to subclasses.",
    level: "basic"
  },
  {
    question: "What is Generalization in EER modeling?",
    shortAnswer: "A bottom-up conceptual design process of identifying common features across multiple entity sets and synthesizing them into a single generic superclass.",
    explanation: "Bottom-up synthesis from specific entities to generic superclass.",
    hint: "Bottom-up synthesis into a single superclass.",
    level: "basic"
  },
  {
    question: "How is a Subclass/Superclass hierarchy represented visually in EER diagrams?",
    shortAnswer: "The Superclass connects to a central circle (containing a 'd' or 'o') which connects via subset symbols (`⊂`) to the Subclass rectangles.",
    explanation: "Standard EER visual notation for specialization hierarchies.",
    hint: "Connecting circle with subset symbols to subclasses.",
    level: "moderate"
  },
  {
    question: "When should an entity subgroup be modeled as a formal Subclass vs a simple ENUM column in the superclass?",
    shortAnswer: "Model as a Subclass ONLY IF the subgroup has specific attributes or participates in specific relationships that other subgroups do not have; otherwise, use a simple discriminator column.",
    explanation: "Avoids unnecessary table proliferation.",
    hint: "Subclass if it has specific attributes or relationships.",
    level: "moderate"
  },
  {
    question: "What is Table-Per-Type (TPT) relational mapping for EER hierarchies?",
    shortAnswer: "Creating a dedicated table for the superclass AND a dedicated table for each subclass, where each subclass table uses the superclass Primary Key as its own Primary Key and Foreign Key.",
    explanation: "Clean normalized 3NF relational mapping pattern.",
    hint: "Separate table for superclass and each subclass.",
    level: "moderate",
    codeExample: "CREATE TABLE persons (\n    person_id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100)\n);\nCREATE TABLE students (\n    person_id INT PRIMARY KEY,\n    tuition_fee DECIMAL(10,2),\n    FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE\n);"
  },
  {
    question: "What is Table-Per-Hierarchy (TPH / Single Table Inheritance) mapping?",
    shortAnswer: "Collapsing the entire superclass and all its subclasses into a single unified table with a discriminator column (e.g. `person_type`) and nullable subclass-specific columns.",
    explanation: "Fast query reads at the expense of NULL values in specific columns.",
    hint: "Single table with discriminator column and nullable fields.",
    level: "expert"
  },
  {
    question: "What is Table-Per-Concrete-Class (TPC) mapping?",
    shortAnswer: "Creating tables ONLY for the leaf subclasses (no superclass table), where each subclass table duplicates all inherited superclass columns.",
    explanation: "Eliminates joins for leaf queries, but makes polymorphic queries difficult.",
    hint: "Tables only for concrete leaf subclasses.",
    level: "expert"
  },
  {
    question: "Why MUST subclass tables in Table-Per-Type mapping use `ON DELETE CASCADE` on their foreign key?",
    shortAnswer: "Because if a person is deleted from the `persons` superclass table, their corresponding record in `students` or `instructors` must be automatically deleted to prevent orphaned subclass records.",
    explanation: "Preserves 1:1 IS-A lifecycle integrity.",
    hint: "Prevents orphaned subclass records when superclass is deleted.",
    level: "basic"
  },
  {
    question: "Can a subclass itself act as a superclass for further lower-level subclasses (Multi-Level Specialization Hierarchy)?",
    shortAnswer: "Yes (e.g. `Person` -> `Employee` -> `Engineering_Manager`), creating multi-level inheritance trees.",
    explanation: "Inheritance cascades down through all ancestor levels.",
    hint: "Multi-level specialization trees.",
    level: "moderate"
  },
  {
    question: "How do you query all students along with their inherited person details using SQL in Table-Per-Type mapping?",
    shortAnswer: "Using an `INNER JOIN`: `SELECT p.person_id, p.full_name, s.tuition_fee FROM persons p JOIN students s ON p.person_id = s.person_id;`.",
    explanation: "Joins parent superclass table with child subclass table.",
    hint: "INNER JOIN on person_id.",
    level: "basic"
  },
  {
    question: "What is a 'Specialization Lattice' in EER modeling?",
    shortAnswer: "A specialization structure where a subclass can have MORE THAN ONE superclass (Multiple Inheritance), such as `Teaching_Assistant` inheriting from both `Student` and `Instructor`.",
    explanation: "Directed Acyclic Graph (DAG) of entity inheritance.",
    hint: "Subclass with multiple superclasses (multiple inheritance).",
    level: "expert"
  },
  {
    question: "What is a 'Predicate-Defined' (Condition-Defined) Subclass?",
    shortAnswer: "A subclass where entity membership is automatically determined by evaluating a predicate condition on an attribute of the superclass (e.g. `Job_Type = 'Engineer'`).",
    explanation: "Rule-based automatic subclass membership.",
    hint: "Membership determined by evaluating a predicate condition.",
    level: "moderate"
  },
  {
    question: "What is an 'Attribute-Defined Specialization'?",
    shortAnswer: "A specialization where all subclasses in the hierarchy are determined by the values of a single distinguishing attribute (the Defining Attribute) in the superclass.",
    explanation: "e.g. `Account_Type` defining Savings vs Checking subclasses.",
    hint: "All subclasses determined by a single defining attribute.",
    level: "moderate"
  },
  {
    question: "What is a 'User-Defined Subclass'?",
    shortAnswer: "A subclass where membership is not determined by an automated rule/attribute, but is explicitly assigned by a human database user (e.g. assigning an employee to a 'Research Committee').",
    explanation: "Manual assignment of subclass membership.",
    hint: "Membership explicitly assigned by user.",
    level: "basic"
  },
  {
    question: "What is the primary key of a subclass in a Table-Per-Type relational schema?",
    shortAnswer: "The exact same Primary Key column inherited from the superclass (which also acts as a Foreign Key referencing the superclass table).",
    explanation: "Shared primary key enforces 1:1 IS-A linkage.",
    hint: "Inherited superclass primary key.",
    level: "basic"
  },
  {
    question: "Why does a Subclass NOT have its own independent surrogate `AUTO_INCREMENT` column in Table-Per-Type mapping?",
    shortAnswer: "Because a subclass is not an independent entity; it IS the superclass instance. Having a separate ID would break the 1:1 identity linkage.",
    explanation: "Shared identity between parent and child records.",
    hint: "Shares identity with the superclass instance.",
    level: "moderate"
  },
  {
    question: "How do you enforce that a `student` record CANNOT exist without a corresponding `person` record?",
    shortAnswer: "The Foreign Key constraint `FOREIGN KEY (person_id) REFERENCES persons(person_id)` on the `students` table strictly prevents inserting a student without a matching person.",
    explanation: "Referential integrity enforces IS-A existence.",
    hint: "Foreign key constraint enforces existence in persons table.",
    level: "basic"
  },
  {
    question: "Can a Subclass participate in its own unique relationships that other sibling subclasses do not participate in?",
    shortAnswer: "Yes (e.g. only `Student` participates in `Takes_Exam`, while `Instructor` participates in `Grades_Exam`).",
    explanation: "Core motivation for creating subclasses.",
    hint: "Subclasses have unique relationships.",
    level: "basic"
  },
  {
    question: "What happens when you insert a new Student in a Table-Per-Type schema?",
    shortAnswer: "You must execute TWO inserts inside a single transaction: 1) Insert generic data into `persons`, and 2) Insert student-specific data into `students` using the generated `person_id`.",
    explanation: "Transactional two-table insertion pattern.",
    hint: "Two-step insert inside a transaction.",
    level: "moderate",
    codeExample: "START TRANSACTION;\nINSERT INTO persons (full_name, email) VALUES ('Mamata Hui', 'mamata@barrackpore.in');\nSET @new_id = LAST_INSERT_ID();\nINSERT INTO students (person_id, tuition_fee) VALUES (@new_id, 15000.00);\nCOMMIT;"
  },
  {
    question: "How do you count the total count of all persons, students, and instructors in a Table-Per-Type schema?",
    shortAnswer: "`SELECT (SELECT COUNT(*) FROM persons) AS total_persons, (SELECT COUNT(*) FROM students) AS total_students, (SELECT COUNT(*) FROM instructors) AS total_instructors;`.",
    explanation: "Subquery counting across superclass and subclass tables.",
    hint: "Subqueries across superclass and subclass tables.",
    level: "basic"
  },
  {
    question: "What is the difference between a Weak Entity and a Subclass?",
    shortAnswer: "A Weak Entity is a SEPARATE child entity owned by a parent entity (Part-Of / Has-A); a Subclass is the SAME entity instance viewed in a specialized role (IS-A).",
    explanation: "Part-Of association vs IS-A type specialization.",
    hint: "Part-Of (Weak Entity) vs IS-A (Subclass).",
    level: "expert"
  },
  {
    question: "In Object-Relational Mapping (ORM) frameworks like Hibernate or Prisma, what annotation corresponds to EER Table-Per-Type mapping?",
    shortAnswer: "`@Inheritance(strategy = InheritanceType.JOINED)`.",
    explanation: "Standard JPA / Hibernate annotation for TPT.",
    hint: "InheritanceType.JOINED in JPA.",
    level: "expert"
  },
  {
    question: "Can an entity instance be simultaneously a member of multiple sibling subclasses in EER?",
    shortAnswer: "Yes, if the specialization constraint is Overlapping (`'o'`); No, if the specialization is Disjoint (`'d'`).",
    explanation: "Governed by disjointness constraints.",
    hint: "Yes if Overlapping ('o'); No if Disjoint ('d').",
    level: "moderate"
  },
  {
    question: "What is the benefit of Table-Per-Type mapping over Table-Per-Hierarchy in terms of database normalization?",
    shortAnswer: "TPT strictly complies with 3NF because specific attributes only exist in their respective subclass tables, resulting in ZERO NULL columns and clean NOT NULL constraints.",
    explanation: "Eliminates NULL column bloat.",
    hint: "Zero NULL columns and strict 3NF compliance.",
    level: "moderate"
  },
  {
    question: "What is the recommended checklist for modeling EER Superclasses and Subclasses?",
    shortAnswer: "1) Identify generic parent entity (Superclass). 2) Identify specialized subgroups with unique attributes or relationships (Subclasses). 3) Map to Table-Per-Type relational schema. 4) Use Superclass PK as Subclass PK and FK. 5) Configure `ON DELETE CASCADE` on all subclass foreign keys.",
    explanation: "Following these 5 rules guarantees robust object-oriented relational schemas.",
    hint: "Superclass, Subclasses with unique attrs, Table-Per-Type, Shared PK/FK, ON DELETE CASCADE.",
    level: "basic"
  }
];

export default questions;
