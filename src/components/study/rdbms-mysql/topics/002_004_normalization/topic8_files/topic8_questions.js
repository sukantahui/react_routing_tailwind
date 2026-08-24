// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is the formal definition of First Normal Form (1NF)?",
    shortAnswer: "A relation is in 1NF if and only if all underlying domains contain only atomic (indivisible) scalar values, and every tuple contains a single value for each attribute.",
    explanation: "Dr. E.F. Codd's foundational definition of 1NF.",
    hint: "Every attribute must contain only atomic, single values.",
    level: "basic"
  },
  {
    question: "What does 'Atomicity' mean in the context of relational database columns?",
    shortAnswer: "A value that cannot or should not be divided into smaller sub-parts by the database management system (indivisible single unit).",
    explanation: "Definition of atomic values.",
    hint: "Indivisible single unit of data.",
    level: "basic"
  },
  {
    question: "Give an example of a 1NF violation involving multi-valued attributes.",
    shortAnswer: "Storing multiple phone numbers in a single column: `phone = '9830112233, 9830445566'`.",
    explanation: "Multi-valued comma-separated 1NF violation.",
    hint: "Comma-separated values in a single cell.",
    level: "basic"
  },
  {
    question: "Give an example of a 1NF violation involving repeating groups.",
    shortAnswer: "Creating multiple numbered columns for the same entity: `course_1, course_2, course_3`.",
    explanation: "Repeating groups column design flaw.",
    hint: "Columns like phone_1, phone_2, phone_3.",
    level: "basic"
  },
  {
    question: "Why is storing comma-separated lists (e.g. 'MySQL, React, Python') bad for query performance?",
    shortAnswer: "Because the DBMS cannot use B-Tree indexes on individual items, forcing slow full-table scans with `LIKE '%React%'` and breaking sorting and aggregations.",
    explanation: "Performance penalties of non-atomic attributes.",
    hint: "Prevents index usage and forces full table scans.",
    level: "basic"
  },
  {
    question: "How do you normalize a multi-valued attribute like `phone_numbers` into 1NF?",
    shortAnswer: "Create a separate child table `Student_Phones(student_id [FK], phone_number)` with a foreign key referencing the student.",
    explanation: "1NF decomposition of multivalued attributes.",
    hint: "Move phone numbers into a dedicated child table with a foreign key.",
    level: "basic"
  },
  {
    question: "How do you normalize a composite attribute like `full_name` into 1NF?",
    shortAnswer: "Decompose it into atomic columns: `first_name`, `middle_name`, and `last_name`.",
    explanation: "Composite attribute decomposition.",
    hint: "Split into first_name, middle_name, last_name.",
    level: "basic"
  },
  {
    question: "Why is an unnormalized repeating group table (e.g. `skill_1, skill_2, skill_3`) inflexible in enterprise systems?",
    shortAnswer: "Because adding a 4th skill requires an `ALTER TABLE` DDL migration, and students with fewer skills waste disk space with NULL values.",
    explanation: "Architectural inflexibility of repeating groups.",
    hint: "Requires DDL changes to add more items and wastes storage with NULLs.",
    level: "basic"
  },
  {
    question: "Does 1NF require every table to have a Primary Key?",
    shortAnswer: "YES. In relational theory, all rows must be unique and identifiable, which is enforced via a Primary Key.",
    explanation: "Tuple uniqueness requirement of 1NF.",
    hint: "Yes, every table must have unique rows and a primary key.",
    level: "basic"
  },
  {
    question: "Can a table containing duplicate rows be in 1NF?",
    shortAnswer: "NO. Relational tables are mathematical sets of tuples; duplicate rows violate set theory and 1NF.",
    explanation: "Duplicate tuples violate 1NF.",
    hint: "No, duplicate rows violate relational set theory.",
    level: "basic"
  },
  {
    question: "Is storing a JSON object or array inside a MySQL JSON column a violation of pure relational 1NF?",
    shortAnswer: "Strictly speaking in classical relational theory, YES; however, modern RDBMS support JSON columns for semi-structured documents while relational entities should remain in 1NF.",
    explanation: "Modern JSON data type vs classical relational 1NF.",
    hint: "Violates classical relational 1NF, though supported for semi-structured use cases.",
    level: "moderate"
  },
  {
    question: "In academy management, if `Students_UNF` has `(student_id, name, courses)`, where `courses` contains 'C101, C102', how many rows exist after 1NF normalization?",
    shortAnswer: "Two rows in the enrollment table: (student_id, 'C101') and (student_id, 'C102').",
    explanation: "Row expansion in 1NF transformation.",
    hint: "One row per enrolled course.",
    level: "basic"
  },
  {
    question: "What is an 'Unnormalized Form' (UNF or 0NF)?",
    shortAnswer: "A table that contains non-atomic attributes, repeating groups, nested structures, or lacks a unique primary key.",
    explanation: "Definition of UNF / 0NF.",
    hint: "A table with non-atomic attributes, repeating groups, or duplicate rows.",
    level: "basic"
  },
  {
    question: "How does 1NF improve data consistency during SQL `UPDATE` operations?",
    shortAnswer: "You can update an individual phone number or course enrollment directly by targeting its specific row, without manipulating string substrings.",
    explanation: "Update simplicity in 1NF.",
    hint: "Allows direct row updates without string parsing.",
    level: "basic"
  },
  {
    question: "How does 1NF improve SQL `DELETE` operations?",
    shortAnswer: "Deleting one phone number simply deletes one child record without affecting the student's primary profile or other phone numbers.",
    explanation: "Deletion simplicity in 1NF.",
    hint: "Deletes a single child row cleanly.",
    level: "basic"
  },
  {
    question: "If an address string is always queried and displayed as an indivisible blob and never searched by city or pin code, does it violate practical 1NF?",
    shortAnswer: "If the application domain treats it as a single indivisible scalar unit, it can be considered atomic; however, best practice is to separate it into street, city, state, and pin code.",
    explanation: "Domain context of atomicity.",
    hint: "Domain semantics define atomicity, though separating address components is best practice.",
    level: "moderate"
  },
  {
    question: "What SQL constraint enforces that an atomic column cannot contain missing or blank entries?",
    shortAnswer: "`NOT NULL` constraint.",
    explanation: "SQL NOT NULL constraint.",
    hint: "NOT NULL constraint.",
    level: "basic"
  },
  {
    question: "What SQL clause is used to prevent duplicate rows in a table without a natural single-column key?",
    shortAnswer: "`PRIMARY KEY (col1, col2)` or `UNIQUE (col1, col2)` composite constraints.",
    explanation: "Composite uniqueness constraints.",
    hint: "Composite PRIMARY KEY or UNIQUE constraint.",
    level: "basic"
  },
  {
    question: "Can an array of integers `int[]` in PostgreSQL be considered 1NF in pure relational theory?",
    shortAnswer: "NO. Classical relational theory forbids array types; arrays represent non-atomic multivalued structures.",
    explanation: "Postgres arrays vs pure relational 1NF.",
    hint: "No, arrays violate pure relational 1NF.",
    level: "moderate"
  },
  {
    question: "What happens to the row count when a table with multi-valued attributes is flattened into 1NF?",
    shortAnswer: "The row count increases (multiplies) by the number of values in each multivalued list.",
    explanation: "Row proliferation during 1NF flattening.",
    hint: "The row count increases as multivalued lists expand into individual tuples.",
    level: "basic"
  },
  {
    question: "If a flattened 1NF table has composite key `(student_id, course_id)`, what is the next risk it faces?",
    shortAnswer: "Partial Dependencies (violating 2NF), where student attributes depend only on `student_id`.",
    explanation: "Transition from 1NF to 2NF.",
    hint: "Partial dependencies (violating 2NF).",
    level: "moderate"
  },
  {
    question: "Why should phone numbers be stored as `VARCHAR` rather than `INT` or `BIGINT` in 1NF?",
    shortAnswer: "Because phone numbers can have leading zeros (e.g. `033...`), country code prefixes (+91), and are not used in arithmetic calculations.",
    explanation: "Proper atomic data types for identifiers.",
    hint: "Preserves leading zeros and formatting, not used in math.",
    level: "basic"
  },
  {
    question: "In hospital management, if `Patient(patient_id, allergies)` has `allergies = 'Penicillin, Peanuts, Pollen'`, what is the 1NF solution?",
    shortAnswer: "Create `Patient_Allergies(patient_id [FK], allergy_name, PK = (patient_id, allergy_name))`.",
    explanation: "Healthcare domain 1NF normalization.",
    hint: "Create a Patient_Allergies child table.",
    level: "basic"
  },
  {
    question: "In an e-commerce order table, why is storing `item_ids = '101, 102, 103'` an anti-pattern?",
    shortAnswer: "It makes inventory management, stock deductions, per-item tax calculations, and foreign key verification impossible.",
    explanation: "E-commerce order items anti-pattern.",
    hint: "Breaks inventory deductions, tax calculations, and foreign key checks.",
    level: "basic"
  },
  {
    question: "What is the primary benefit of 1NF for SQL aggregate functions like `COUNT()`, `SUM()`, and `AVG()`?",
    shortAnswer: "Enables direct, fast, index-accelerated aggregation across distinct rows without string parsing functions.",
    explanation: "Aggregation benefits in 1NF.",
    hint: "Direct SQL aggregations without string parsing.",
    level: "basic"
  },
  {
    question: "Does 1NF eliminate data redundancy across entities?",
    shortAnswer: "NO. 1NF only ensures atomicity and eliminates repeating groups; redundancy is eliminated in 2NF, 3NF, and BCNF.",
    explanation: "Scope of 1NF vs higher normal forms.",
    hint: "No, higher normal forms (2NF, 3NF, BCNF) eliminate redundancy.",
    level: "basic"
  },
  {
    question: "What tool in MySQL helps migrate comma-separated strings into 1NF tables?",
    shortAnswer: "SQL scripts using `JSON_TABLE()`, string-splitting recursive CTEs, or application-level ETL scripts.",
    explanation: "Data migration tools to 1NF in MySQL.",
    hint: "Recursive CTEs, JSON_TABLE, or ETL scripts.",
    level: "moderate"
  },
  {
    question: "What is the relationship between 1NF and Entity-Relationship (ER) modeling?",
    shortAnswer: "Multi-valued attributes in ER diagrams (double ovals) and composite attributes directly map to child tables and atomic columns in 1NF relational schemas.",
    explanation: "Mapping ER concepts to 1NF.",
    hint: "Double ovals in ER diagrams become child tables in 1NF.",
    level: "basic"
  },
  {
    question: "If a column contains a URL string (e.g. `https://example.com/page`), is it atomic?",
    shortAnswer: "YES, from a database perspective, the entire URL is typically treated as a single atomic scalar string unless specific sub-domains or query params must be indexed independently.",
    explanation: "Domain-specific atomicity of URLs.",
    hint: "Yes, treated as an atomic scalar string in typical web applications.",
    level: "moderate"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding First Normal Form (1NF)?",
    shortAnswer: "Ensure all columns hold single atomic values, eliminate repeating columns and delimited lists, guarantee row uniqueness with primary keys, and model 1:N relationships with child tables.",
    explanation: "Final summary conclusion for Topic 8.",
    hint: "Atomic scalar values, no repeating groups, unique rows with primary keys.",
    level: "basic"
  }
];

export default questions;
