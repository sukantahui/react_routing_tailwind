// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is a Strong (Regular) Entity Set in ER modeling?",
    shortAnswer: "An entity set that possesses its own independent Primary Key formed exclusively from its own attributes, with independent existence in the database.",
    explanation: "Represented visually by a single rectangle.",
    hint: "Has its own independent primary key.",
    level: "basic"
  },
  {
    question: "What is a Weak Entity Set in ER modeling?",
    shortAnswer: "An entity set that does not have sufficient attributes to form its own primary key independently and depends on an owner strong entity for identification.",
    explanation: "Represented visually by a double rectangle.",
    hint: "Lacks its own primary key; existence dependent.",
    level: "basic"
  },
  {
    question: "What is an Identifying Relationship in ER modeling?",
    shortAnswer: "The specific relationship type that connects a Weak Entity Set to its Owner Strong Entity Set.",
    explanation: "Represented visually by a double diamond in Peter Chen notation.",
    hint: "Connects weak entity to owner entity.",
    level: "basic"
  },
  {
    question: "How is a Weak Entity Set represented visually in Peter Chen ER notation?",
    shortAnswer: "As a DOUBLE RECTANGLE (nested rectangle).",
    explanation: "Standard Chen notation symbol for weak entities.",
    hint: "Double rectangle.",
    level: "basic"
  },
  {
    question: "How is an Identifying Relationship represented visually in Peter Chen ER notation?",
    shortAnswer: "As a DOUBLE DIAMOND (nested diamond).",
    explanation: "Standard Chen notation symbol for identifying relationships.",
    hint: "Double diamond.",
    level: "basic"
  },
  {
    question: "What is the participation constraint requirement of a Weak Entity Set in its Identifying Relationship?",
    shortAnswer: "Total (Mandatory) Participation: every weak entity instance MUST belong to an existing owner entity instance; represented by a DOUBLE LINE.",
    explanation: "Weak entities cannot exist as orphans without an owner.",
    hint: "Total mandatory participation (double line).",
    level: "basic"
  },
  {
    question: "What is a Partial Key (Discriminator) of a weak entity set?",
    shortAnswer: "The set of attributes that uniquely distinguishes weak entities belonging to the SAME parent owner entity instance.",
    explanation: "Underlined with a dashed line in Peter Chen notation.",
    hint: "Discriminates weak entities under the same parent.",
    level: "basic"
  },
  {
    question: "How is the Primary Key of a weak entity table formed in a relational database?",
    shortAnswer: "As a Composite Primary Key combining the Owner Strong Entity's Primary Key (as Foreign Key) AND the Weak Entity's Partial Key: `(owner_id, partial_key)`.",
    explanation: "Ensures global uniqueness across the entire table.",
    hint: "Composite of Owner PK and Partial Key.",
    level: "basic",
    codeExample: "PRIMARY KEY (student_id, dependent_name)"
  },
  {
    question: "What referential action should be configured on the Foreign Key of a weak entity table?",
    shortAnswer: "`ON DELETE CASCADE`, so that deleting an owner strong entity automatically wipes all its dependent weak entities from the database.",
    explanation: "Because weak entities cannot logically exist without their owner.",
    hint: "ON DELETE CASCADE.",
    level: "basic"
  },
  {
    question: "Why is `ON DELETE SET NULL` invalid for weak entity foreign keys?",
    shortAnswer: "Because the owner's foreign key forms part of the weak entity's Composite Primary Key, which strictly prohibits NULL values under entity integrity rules.",
    explanation: "Primary keys cannot contain NULLs.",
    hint: "Violates Composite Primary Key NOT NULL requirement.",
    level: "moderate"
  },
  {
    question: "Can a Weak Entity Set have another Weak Entity Set dependent on it (Chained Weak Entities)?",
    shortAnswer: "Yes, multi-level weak entity hierarchies (e.g. `Building` (Strong) -> `Floor` (Weak) -> `Room` (Weak of Floor)).",
    explanation: "Primary key cascades down: `(building_id, floor_no, room_no)`.",
    hint: "Multi-level weak entity chains.",
    level: "expert",
    codeExample: "PRIMARY KEY (building_code, floor_number, room_number)"
  },
  {
    question: "Can a Weak Entity Set have more than one Identifying Strong Entity (Multiple Owners)?",
    shortAnswer: "Yes, in complex models (e.g. a `JobExecution` weak entity identified by both `Server_ID` and `Job_ID`).",
    explanation: "Inherits foreign keys from both identifying owners.",
    hint: "Multiple identifying owners.",
    level: "expert"
  },
  {
    question: "What is the difference between an Identifying Relationship (Solid Line in Workbench) vs a Non-Identifying Relationship (Dashed Line)?",
    shortAnswer: "In an Identifying relationship, the parent PK is added to the child's Primary Key; in a Non-Identifying relationship, the parent PK is a standalone Foreign Key.",
    explanation: "Workbench visual convention for weak entity mapping.",
    hint: "Parent PK in child PK vs standalone FK.",
    level: "moderate"
  },
  {
    question: "Why is `order_items` in an e-commerce database considered a Weak Entity of `orders`?",
    shortAnswer: "Because line item numbers (e.g. `item_no = 1, 2, 3`) only make sense within a specific order; their full primary key is `(order_id, item_no)`.",
    explanation: "Classic weak entity example in e-commerce.",
    hint: "Line items depend on parent order for identity.",
    level: "basic"
  },
  {
    question: "Can a Weak Entity participate in regular (non-identifying) relationships with other entities?",
    shortAnswer: "Yes (e.g. `student_dependents` weak entity can have a non-identifying relationship with an `insurance_policies` strong entity).",
    explanation: "Weak entities can participate in standard relationships once mapped.",
    hint: "Yes, can participate in standard relationships.",
    level: "moderate"
  },
  {
    question: "How do you query all dependents for student 'Mamata Hui' (ID 101) using SQL?",
    shortAnswer: "`SELECT d.dependent_name, d.relationship_type FROM student_dependents d WHERE d.student_id = 101;`.",
    explanation: "Simple indexed filter on owner foreign key.",
    hint: "WHERE student_id = 101 on weak entity table.",
    level: "basic"
  },
  {
    question: "What happens if an application tries to insert a dependent with `student_id = 999` when student #999 does not exist?",
    shortAnswer: "MySQL immediately aborts with Error 1452 (foreign key constraint fails).",
    explanation: "Referential integrity prevents orphaned weak entities.",
    hint: "Error 1452.",
    level: "basic"
  },
  {
    question: "Can a Weak Entity have its own partial key that is unique globally without the owner key?",
    shortAnswer: "No, if an attribute were globally unique on its own, it would be a Candidate Key, making the entity a Strong Entity by definition.",
    explanation: "Weak entities by definition lack globally unique candidate keys.",
    hint: "If globally unique, it would be a strong entity.",
    level: "moderate"
  },
  {
    question: "How does Peter Chen notation distinguish between a regular relationship and an identifying relationship?",
    shortAnswer: "Regular relationship = Single Diamond (`<>`); Identifying relationship = Double Diamond (`<<>>`).",
    explanation: "Visual difference in ER diagrams.",
    hint: "Single diamond vs double diamond.",
    level: "basic"
  },
  {
    question: "What is 'Existence Dependency' in weak entities?",
    shortAnswer: "The condition where a weak entity instance cannot exist in the database unless its owner entity instance exists simultaneously.",
    explanation: "Underpins total participation and cascading deletion rules.",
    hint: "Cannot exist without owner entity.",
    level: "basic"
  },
  {
    question: "What is 'ID-Dependent Entity' in Information Engineering (IE) terminology?",
    shortAnswer: "Another industry term for a Weak Entity whose primary key contains the primary key of another parent entity.",
    explanation: "Common synonym in Crow's Foot / IE notation.",
    hint: "ID-dependent entity in IE notation.",
    level: "moderate"
  },
  {
    question: "How is a Weak Entity represented in Crow's Foot (Martin) notation?",
    shortAnswer: "As a rectangle with rounded corners (or a solid identifying relationship line connecting to the parent).",
    explanation: "Visual convention in Crow's Foot diagramming.",
    hint: "Rounded rectangle or solid connecting line.",
    level: "moderate"
  },
  {
    question: "Why should you index the partial key column in a weak entity table in MySQL?",
    shortAnswer: "In `PRIMARY KEY (student_id, dependent_name)`, the leftmost column is `student_id`; if you frequently query by `dependent_name` alone, a secondary index is needed.",
    explanation: "B-Tree leftmost prefix optimization.",
    hint: "Secondary index needed if querying by partial key alone.",
    level: "expert"
  },
  {
    question: "Can a table that has an `AUTO_INCREMENT id` column still represent a Weak Entity conceptually?",
    shortAnswer: "Yes, adding a surrogate `id` to a weak entity is a physical implementation choice, but the conceptual relationship remains weak/existentially dependent on the owner.",
    explanation: "Separation of conceptual weakness from physical surrogate keys.",
    hint: "Surrogate key does not change conceptual weakness.",
    level: "expert",
    codeExample: "CREATE TABLE student_dependents (\n    dependent_id BIGINT AUTO_INCREMENT PRIMARY KEY,\n    student_id INT NOT NULL,\n    dependent_name VARCHAR(50) NOT NULL,\n    UNIQUE (student_id, dependent_name),\n    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE\n);"
  },
  {
    question: "What is the difference between a Many-to-Many junction table vs a Weak Entity table?",
    shortAnswer: "A junction table connects TWO independent strong entities; a weak entity represents dependent child items belonging to a SINGLE owner entity.",
    explanation: "Junction tables have two foreign keys; weak entities have one owner foreign key + discriminator.",
    hint: "Connecting two owners vs child items of one owner.",
    level: "moderate"
  },
  {
    question: "What is a 'Subordinate Entity' in database modeling?",
    shortAnswer: "Another common synonym for a Weak Entity.",
    explanation: "Reflects the subordinate lifecycle to the master record.",
    hint: "Synonym for weak entity.",
    level: "basic"
  },
  {
    question: "How do you prevent duplicate dependent names under the same student?",
    shortAnswer: "By defining `PRIMARY KEY (student_id, dependent_name)` (or a Composite `UNIQUE` constraint).",
    explanation: "Ensures uniqueness within the scope of that specific student.",
    hint: "Composite primary key enforces uniqueness per student.",
    level: "basic"
  },
  {
    question: "What happens when you execute `DELETE FROM students WHERE student_id = 101;` on a student with 3 weak entity dependents?",
    shortAnswer: "InnoDB automatically deletes all 3 dependent rows in `student_dependents` in the same transaction via `ON DELETE CASCADE`.",
    explanation: "Clean automated garbage collection.",
    hint: "All 3 dependents automatically deleted.",
    level: "basic"
  },
  {
    question: "How do you count the total number of dependents per student, including students with 0 dependents?",
    shortAnswer: "`SELECT s.first_name, COUNT(d.dependent_name) FROM students s LEFT JOIN student_dependents d ON s.student_id = d.student_id GROUP BY s.student_id, s.first_name;`.",
    explanation: "Using `LEFT JOIN` and `COUNT(child_col)` preserves 0-dependent parents.",
    hint: "LEFT JOIN + COUNT(dependent_name).",
    level: "basic",
    codeExample: "SELECT s.full_name, COUNT(d.dependent_name) AS total_dependents\nFROM students s\nLEFT JOIN student_dependents d ON s.student_id = d.student_id\nGROUP BY s.student_id, s.full_name;"
  },
  {
    question: "What is the recommended checklist for modeling Weak Entities in ER diagrams and schemas?",
    shortAnswer: "1) Identify existence-dependent concepts. 2) Draw Double Rectangle for Weak Entity. 3) Draw Double Diamond for Identifying Relationship with Double Line. 4) Underline Partial Key with Dashed Line. 5) Map to Composite PK `(owner_id, partial_key)` with `ON DELETE CASCADE`.",
    explanation: "Following these 5 rules guarantees accurate ER notation and robust relational schema mapping.",
    hint: "Double rectangle, Double diamond, Double line, Dashed underline, Composite PK with CASCADE.",
    level: "basic"
  }
];

export default questions;
