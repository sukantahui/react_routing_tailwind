// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is an Entity in ER modeling?",
    shortAnswer: "A distinct real-world object, concept, or event with physical or conceptual existence that can be distinctly identified.",
    explanation: "Examples: Student, Course, Bank Account, Transaction.",
    hint: "Distinct real-world object with independent existence.",
    level: "basic"
  },
  {
    question: "What is an Entity Set in ER modeling?",
    shortAnswer: "A collection of all entities of the same type that share the same set of attributes.",
    explanation: "For example, the set of all Students registered at Coder & AccoTax Barrackpore.",
    hint: "Collection of entities sharing attributes.",
    level: "basic"
  },
  {
    question: "What is a Simple (Atomic) Attribute?",
    shortAnswer: "An attribute that cannot be divided into smaller sub-components with independent meaning (e.g. `roll_no`, `salary`).",
    explanation: "Atomic building blocks of relational columns.",
    hint: "Indivisible attribute.",
    level: "basic"
  },
  {
    question: "What is a Composite Attribute in ER modeling?",
    shortAnswer: "An attribute that can be divided into smaller sub-components (e.g. `full_name` → `first_name`, `last_name`; `address` → `street`, `city`, `pincode`).",
    explanation: "Allows modeling hierarchical attribute structures.",
    hint: "Divisible into sub-components.",
    level: "basic"
  },
  {
    question: "How is a Composite Attribute mapped into a relational database table?",
    shortAnswer: "By flattening its leaf sub-attributes directly into individual atomic columns (the composite parent name is omitted).",
    explanation: "`address` becomes columns `street`, `city`, `state`, `pincode`.",
    hint: "Flattened into individual atomic columns.",
    level: "basic"
  },
  {
    question: "What is a Single-Valued Attribute?",
    shortAnswer: "An attribute that holds exactly ONE value for any given entity instance (e.g. `date_of_birth`, `aadhaar_no`).",
    explanation: "The standard default attribute type.",
    hint: "Holds a single value per entity instance.",
    level: "basic"
  },
  {
    question: "What is a Multi-Valued Attribute in ER modeling?",
    shortAnswer: "An attribute that can hold MULTIPLE distinct values for the same entity instance (e.g. `phone_numbers`, `college_degrees`, `certifications`).",
    explanation: "Represented visually as a Double Oval.",
    hint: "Can hold multiple values simultaneously.",
    level: "basic"
  },
  {
    question: "How is a Multi-Valued Attribute represented visually in Peter Chen ER notation?",
    shortAnswer: "As a DOUBLE OVAL (nested oval).",
    explanation: "Standard Chen notation symbol for multi-valued attributes.",
    hint: "Double oval.",
    level: "basic"
  },
  {
    question: "Why CANNOT a Multi-Valued Attribute be stored as a comma-separated string in a single column in relational databases?",
    shortAnswer: "It violates First Normal Form (1NF) atomicity, prevents B-Tree indexing, disables foreign key constraints, and makes searching with WHERE clauses slow and error-prone.",
    explanation: "Relational theory strictly requires atomic values.",
    hint: "Violates 1NF atomicity and prevents indexing.",
    level: "moderate"
  },
  {
    question: "How is a Multi-Valued Attribute correctly mapped into a relational schema?",
    shortAnswer: "By creating a dedicated child table containing the parent entity's Primary Key (as a Foreign Key) and the attribute value, with a Composite Primary Key on both columns.",
    explanation: "`student_contacts (student_id, phone_number)`.",
    hint: "Dedicated child table with foreign key.",
    level: "moderate",
    codeExample: "CREATE TABLE student_phone_numbers (\n    student_id INT NOT NULL,\n    phone_no VARCHAR(15) NOT NULL,\n    PRIMARY KEY (student_id, phone_no),\n    FOREIGN KEY (student_id) REFERENCES students(student_id)\n);"
  },
  {
    question: "What is a Stored Attribute vs a Derived Attribute?",
    shortAnswer: "A Stored Attribute is physically saved on disk (e.g. `date_of_birth`); a Derived Attribute is computed dynamically from other attributes (e.g. `age` = `CURDATE() - dob`).",
    explanation: "Derived attributes are not physically stored to avoid update anomalies.",
    hint: "Physically saved vs dynamically computed.",
    level: "basic"
  },
  {
    question: "How is a Derived Attribute represented visually in Peter Chen ER notation?",
    shortAnswer: "As a DASHED OVAL.",
    explanation: "Indicates the attribute value is calculated on-the-fly.",
    hint: "Dashed oval.",
    level: "basic"
  },
  {
    question: "How can Derived Attributes be implemented in modern MySQL 8.0 tables?",
    shortAnswer: "Using Virtual or Stored Generated Columns (`GENERATED ALWAYS AS (expression) VIRTUAL`).",
    explanation: "MySQL computes the value dynamically on read without consuming disk space.",
    hint: "Virtual Generated Columns.",
    level: "moderate",
    codeExample: "current_age INT GENERATED ALWAYS AS (TIMESTAMPDIFF(YEAR, dob, CURDATE())) VIRTUAL"
  },
  {
    question: "What is a Key Attribute (Identifier) in ER modeling, and how is it represented visually?",
    shortAnswer: "An attribute whose values are distinct for each individual entity in the entity set; represented as an Oval with UNDERLINED text name.",
    explanation: "Underlined text denotes the primary candidate key.",
    hint: "Oval with underlined text name.",
    level: "basic"
  },
  {
    question: "What is a 'Null-Valued Attribute' (Nullable Attribute)?",
    shortAnswer: "An attribute that may take on a NULL value when it does not apply to a specific entity instance or when the value is unknown/missing.",
    explanation: "Example: `middle_name` or `apartment_no`.",
    hint: "Attribute that permits NULL values.",
    level: "basic"
  },
  {
    question: "Can an attribute be simultaneously Composite AND Multi-Valued?",
    shortAnswer: "Yes (e.g. `previous_degrees` where each degree consists of `degree_name`, `university`, `graduation_year`).",
    explanation: "Complex multi-valued record structures.",
    hint: "Nested composite multi-valued structures.",
    level: "expert"
  },
  {
    question: "How is a Composite Multi-Valued Attribute mapped to a relational schema?",
    shortAnswer: "As a dedicated child table where the columns represent the leaf sub-attributes of the composite plus the parent Foreign Key.",
    explanation: "`student_degrees (student_id, degree_name, university, year)`.",
    hint: "Child table containing all leaf sub-attributes.",
    level: "expert",
    codeExample: "CREATE TABLE student_degrees (\n    student_id INT NOT NULL,\n    degree_name VARCHAR(50) NOT NULL,\n    university VARCHAR(100) NOT NULL,\n    passing_year INT NOT NULL,\n    PRIMARY KEY (student_id, degree_name)\n);"
  },
  {
    question: "Why is storing `age` directly as a stored integer column in a database an anti-pattern?",
    shortAnswer: "Because `age` is time-dependent and becomes stale/incorrect on the person's next birthday unless updated by an external cron job; storing `dob` guarantees 100% temporal accuracy.",
    explanation: "Stale data anomaly caused by storing derived attributes.",
    hint: "Data becomes stale over time; store date of birth instead.",
    level: "basic"
  },
  {
    question: "What is an 'Attribute Domain' (Value Set)?",
    shortAnswer: "The set of all possible allowable values that can be assigned to an attribute (e.g. domain of `admission_fee` is positive decimal numbers; domain of `gender` is `'M', 'F', 'Other'`).",
    explanation: "Defines data types and valid constraints.",
    hint: "Allowable set of valid values for an attribute.",
    level: "basic"
  },
  {
    question: "What is a 'Partial Key' (Discriminator) attribute in ER modeling?",
    shortAnswer: "An attribute that uniquely identifies weak entities belonging to the SAME parent entity instance, but cannot identify entities globally across the entire entity set.",
    explanation: "Represented by a DASHED UNDERLINE in Chen notation.",
    hint: "Dashed underline for weak entity discriminator.",
    level: "moderate"
  },
  {
    question: "How does Peter Chen notation visually represent an Entity vs an Attribute vs a Relationship?",
    shortAnswer: "Entity = RECTANGLE; Attribute = OVAL; Relationship = DIAMOND.",
    explanation: "The foundational triumvirate of Peter Chen ER notation.",
    hint: "Rectangle (Entity), Oval (Attribute), Diamond (Relationship).",
    level: "basic"
  },
  {
    question: "How do you query a multi-valued attribute that has been mapped to a child table using SQL?",
    shortAnswer: "Using an `INNER JOIN` (or `LEFT JOIN`) between the parent and child table, or aggregating with `GROUP_CONCAT(phone_no)`.",
    explanation: "`GROUP_CONCAT` combines multi-valued rows into a display string.",
    hint: "JOIN parent with child or GROUP_CONCAT.",
    level: "moderate",
    codeExample: "SELECT s.first_name, GROUP_CONCAT(c.phone_number SEPARATOR ', ') AS phones\nFROM students s\nLEFT JOIN student_contacts c ON s.student_id = c.student_id\nGROUP BY s.student_id, s.first_name;"
  },
  {
    question: "What is the difference between a Stored Generated Column vs a Virtual Generated Column in MySQL 8.0?",
    shortAnswer: "`VIRTUAL` columns are computed dynamically on-the-fly when read and consume zero disk space; `STORED` columns are evaluated on insert/update and physically saved on disk pages.",
    explanation: "Virtual saves disk I/O; Stored allows standard secondary indexing.",
    hint: "Dynamic compute (zero disk) vs physical disk storage.",
    level: "expert"
  },
  {
    question: "Can an index be created on a Virtual Generated Column in MySQL InnoDB?",
    shortAnswer: "Yes, MySQL InnoDB supports secondary B-Tree indexes on `VIRTUAL` generated columns, creating a material index without duplicating table data.",
    explanation: "Powerful MySQL 8.0 performance optimization.",
    hint: "InnoDB supports secondary indexes on VIRTUAL generated columns.",
    level: "expert"
  },
  {
    question: "What is an 'Entity Instance' (Entity Occurrence)?",
    shortAnswer: "A specific individual member of an entity set (e.g. Student 'Mamata Hui' with ID 101).",
    explanation: "Corresponds to a single row/tuple in a relational table.",
    hint: "Single concrete occurrence of an entity.",
    level: "basic"
  },
  {
    question: "Why should phone numbers be stored as `VARCHAR(15)` rather than integer types like `INT` or `BIGINT`?",
    shortAnswer: "Because phone numbers can have leading zeros (e.g. `098300...`), contain country codes (`+91`), are never used in mathematical calculations, and standard integer types truncate leading zeros.",
    explanation: "Text data types preserve formatting and leading zeros.",
    hint: "Preserves leading zeros and international symbols.",
    level: "basic"
  },
  {
    question: "What is the difference between an Attribute and an Entity Set?",
    shortAnswer: "An Entity Set has its own independent identity and lifecycle; an Attribute is a descriptive property that has no independent existence outside its owner entity.",
    explanation: "If a concept has multiple sub-attributes or relationships of its own, it should be promoted to an Entity.",
    hint: "Independent identity vs descriptive property.",
    level: "moderate"
  },
  {
    question: "How do you decide whether a real-world concept (like 'Address') should be modeled as an Attribute or as a separate Entity?",
    shortAnswer: "If an address is simply a postal attribute of a student, model it as a Composite Attribute; if multiple students/offices share the same address, or addresses need independent tracking, model it as an Entity Set.",
    explanation: "Design choice driven by business queries and sharing.",
    hint: "Composite attribute if unique to parent; Entity if shared across entities.",
    level: "expert"
  },
  {
    question: "What happens if a multi-valued attribute child table uses `ON DELETE CASCADE` on its foreign key?",
    shortAnswer: "Deleting a student automatically and cleanly purges all their associated phone numbers and email addresses without leaving orphaned contact rows.",
    explanation: "Standard lifecycle cascade for decomposed multi-valued tables.",
    hint: "Clean automated cleanup of multi-valued child rows.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for modeling Entities and Attributes in ER diagrams?",
    shortAnswer: "1) Identify real-world entities (Rectangles). 2) Identify key attributes (Underlined). 3) Break down composite attributes (sub-ovals). 4) Identify multi-valued attributes (Double ovals) for child table decomposition. 5) Use Virtual Generated Columns for derived attributes (Dashed ovals).",
    explanation: "Following these 5 steps ensures an accurate conceptual model and clean 1NF relational schema.",
    hint: "Entities, Keys, Composite breakdown, Double ovals for multi-valued, Dashed for derived.",
    level: "basic"
  }
];

export default questions;
