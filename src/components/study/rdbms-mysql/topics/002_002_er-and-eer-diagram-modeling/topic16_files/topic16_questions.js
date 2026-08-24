// topic16_files/topic16_questions.js

const questions = [
  {
    question: "What is Step 6 of the formal ER-to-Relational Mapping Algorithm?",
    shortAnswer: "Mapping Multi-Valued Attributes into dedicated child tables to satisfy First Normal Form (1NF) atomicity.",
    explanation: "Constructs dedicated child tables for multi-valued attribute sets.",
    hint: "Mapping multi-valued attributes into separate tables.",
    level: "basic"
  },
  {
    question: "Why CANNOT multi-valued attributes be stored as a comma-separated string in the entity's base table?",
    shortAnswer: "Because it violates First Normal Form (1NF) atomicity, prevents B-Tree indexing, precludes unique constraints per item, and makes searching inefficient.",
    explanation: "Violates 1NF scalar value requirements.",
    hint: "Violates 1NF and prevents B-Tree indexing.",
    level: "basic"
  },
  {
    question: "How is the Primary Key of a Step 6 Multi-Valued Attribute table constructed?",
    shortAnswer: "As a Composite Primary Key combining the Parent Entity's Primary Key (which is also a Foreign Key) and the Multi-Valued Attribute column itself (e.g. `PRIMARY KEY (student_id, phone_number)`).",
    explanation: "Composite of Parent PK + Attribute Value.",
    hint: "PRIMARY KEY (parent_id, attribute_value).",
    level: "basic"
  },
  {
    question: "Why MUST Step 6 tables use `ON DELETE CASCADE` on their foreign key?",
    shortAnswer: "Because multi-valued items have total existence dependency on the parent entity; deleting the student must automatically purge all their registered phone numbers.",
    explanation: "Preserves referential existence integrity.",
    hint: "Automatically purges child records when parent is deleted.",
    level: "basic"
  },
  {
    question: "How is a Multi-Valued Composite Attribute (e.g. `{Degree(title, institution, year)}`) mapped in Step 6?",
    shortAnswer: "Create a table with the parent PK, plus all simple components of the composite attribute: `emp_degrees(emp_id, degree_title, institution, year, PRIMARY KEY(emp_id, degree_title))`.",
    explanation: "Decomposes composite multi-valued structures into normalized columns.",
    hint: "Parent PK + all simple components of the composite attribute.",
    level: "moderate",
    codeExample: "CREATE TABLE employee_qualifications (\n    emp_id INT NOT NULL,\n    degree_title VARCHAR(50) NOT NULL,\n    institution VARCHAR(100) NOT NULL,\n    passing_year INT NOT NULL,\n    PRIMARY KEY (emp_id, degree_title),\n    FOREIGN KEY (emp_id) REFERENCES employees(emp_id) ON DELETE CASCADE\n);"
  },
  {
    question: "How do you query all phone numbers for student #101 using SQL?",
    shortAnswer: "`SELECT phone_number, phone_type FROM student_phones WHERE student_id = 101;`.",
    explanation: "Direct index lookup by parent primary key.",
    hint: "SELECT FROM student_phones WHERE student_id = 101.",
    level: "basic"
  },
  {
    question: "How do you aggregate all phone numbers of a student into a single comma-separated string for frontend UI display?",
    shortAnswer: "Using the MySQL `GROUP_CONCAT()` aggregate function: `SELECT s.first_name, GROUP_CONCAT(p.phone_number SEPARATOR ', ') FROM students s LEFT JOIN student_phones p ON s.student_id = p.student_id GROUP BY s.student_id;`.",
    explanation: "MySQL GROUP_CONCAT function for UI aggregation.",
    hint: "GROUP_CONCAT(phone_number SEPARATOR ', ').",
    level: "moderate",
    codeExample: "SELECT s.student_id, s.first_name, s.last_name,\n       GROUP_CONCAT(CONCAT(p.phone_type, ': ', p.phone_number) SEPARATOR ', ') AS all_phones\nFROM students s\nLEFT JOIN student_phones p ON s.student_id = p.student_id\nGROUP BY s.student_id, s.first_name, s.last_name;"
  },
  {
    question: "How do you find a student who owns the specific phone number '9830012345' in sub-millisecond time?",
    shortAnswer: "`SELECT s.student_id, s.first_name, s.last_name FROM students s JOIN student_phones p ON s.student_id = p.student_id WHERE p.phone_number = '9830012345';` (with an index on `phone_number`).",
    explanation: "B-Tree indexed search across child table.",
    hint: "JOIN on student_phones WHERE phone_number = '...'.",
    level: "basic"
  },
  {
    question: "Why should you add a secondary index on `phone_number` in the `student_phones` table?",
    shortAnswer: "Because the Composite Primary Key is `(student_id, phone_number)`, so searching by `phone_number` alone cannot use the leftmost prefix of the PK index.",
    explanation: "Leftmost index prefix optimization.",
    hint: "Enables fast reverse lookups by phone number.",
    level: "expert",
    codeExample: "CREATE INDEX idx_phone_number ON student_phones(phone_number);"
  },
  {
    question: "What happens if a user tries to insert the exact same phone number twice for the same student?",
    shortAnswer: "MySQL immediately aborts with Error 1062 (Duplicate entry for key 'PRIMARY').",
    explanation: "Composite primary key guarantees item uniqueness per parent.",
    hint: "Error 1062 duplicate key error.",
    level: "basic"
  },
  {
    question: "Can two different students have the exact same emergency contact phone number in `student_phones`?",
    shortAnswer: "Yes, because the Composite Primary Key `(student_id, phone_number)` allows the same phone number for different `student_id` values (e.g. siblings with the same home landline).",
    explanation: "Composite uniqueness is scoped to student_id.",
    hint: "Yes, composite primary key allows shared phone numbers across siblings.",
    level: "basic"
  },
  {
    question: "How is a Multi-Valued Attribute represented visually in Peter Chen ER diagrams?",
    shortAnswer: "As a DOUBLE-LINED OVAL attached to the entity rectangle.",
    explanation: "Standard visual notation for multi-valued attribute in Chen notation.",
    hint: "Double-lined oval.",
    level: "basic"
  },
  {
    question: "What is the difference between a Multi-Valued Attribute table (Step 6) and a Weak Entity table (Step 2)?",
    shortAnswer: "A Multi-Valued Attribute table represents a set of primitive values or lightweight sub-records directly belonging to an entity; a Weak Entity is a full-fledged entity type that can participate in its own relationships.",
    explanation: "Primitive attribute set vs full entity type.",
    hint: "Primitive value set vs full entity with its own relationships.",
    level: "expert"
  },
  {
    question: "How does modern MySQL 5.7+ / 8+ support multi-valued attributes using JSON columns, and what are its trade-offs?",
    shortAnswer: "Using `JSON` data type (e.g. `phones JSON`); trade-off: allows storing arrays in a single column, but loses standard SQL foreign key enforcement, requires JSON functional indexes, and complicates relational JOIN queries.",
    explanation: "JSON column trade-offs in relational modeling.",
    hint: "JSON column allows arrays but loses standard relational FK integrity.",
    level: "expert"
  },
  {
    question: "Why is the normalized Step 6 dedicated table pattern still preferred over JSON arrays for core enterprise data?",
    shortAnswer: "Because normalized tables guarantee strict data typing, standard foreign key cascading, zero JSON parsing overhead, and universal compatibility across all SQL reporting tools.",
    explanation: "Normalized relational integrity benefits.",
    hint: "Strict data types, standard FK cascades, and universal SQL tool compatibility.",
    level: "moderate"
  },
  {
    question: "How do you count how many phone numbers each student has registered using SQL?",
    shortAnswer: "`SELECT s.student_id, s.first_name, COUNT(p.phone_number) AS phone_count FROM students s LEFT JOIN student_phones p ON s.student_id = p.student_id GROUP BY s.student_id, s.first_name;`.",
    explanation: "LEFT JOIN aggregation on multi-valued table.",
    hint: "LEFT JOIN students to student_phones with COUNT.",
    level: "basic"
  },
  {
    question: "How do you query for students who have NO phone numbers registered?",
    shortAnswer: "`SELECT s.student_id, s.first_name FROM students s LEFT JOIN student_phones p ON s.student_id = p.student_id WHERE p.phone_number IS NULL;`.",
    explanation: "Anti-join pattern filtering out missing child records.",
    hint: "LEFT JOIN WHERE p.phone_number IS NULL.",
    level: "basic"
  },
  {
    question: "How do you update a student's phone number from '9830011111' to '9830022222'?",
    shortAnswer: "`UPDATE student_phones SET phone_number = '9830022222' WHERE student_id = 101 AND phone_number = '9830011111';`.",
    explanation: "Targeted composite key update.",
    hint: "UPDATE student_phones SET ... WHERE student_id = ... AND phone_number = ...",
    level: "basic"
  },
  {
    question: "Can a Step 6 Multi-Valued Attribute table have additional descriptive columns (e.g. `is_primary BOOLEAN`, `verified_at DATETIME`)?",
    shortAnswer: "Yes, adding metadata columns like `phone_type`, `is_primary`, or `verified_at` enriches the attribute set.",
    explanation: "Metadata enrichment on multi-valued attribute rows.",
    hint: "Yes, metadata columns like is_primary or verified_at are allowed.",
    level: "basic"
  },
  {
    question: "How do you enforce that a student can have at most ONE primary phone number in MySQL?",
    shortAnswer: "Using a unique partial index, conditional check, or a `BEFORE INSERT` trigger validating that `is_primary` is not already true for that `student_id`.",
    explanation: "Exclusivity enforcement on child flags.",
    hint: "BEFORE INSERT trigger or unique index on primary flag.",
    level: "expert"
  },
  {
    question: "What is an example of a multi-valued attribute in a Department entity?",
    shortAnswer: "`{Department_Locations}` (e.g. a Department operating across multiple campus buildings: 'Main Building', 'Science Block', 'Tech Park').",
    explanation: "Classic Elmasri & Navathe textbook example.",
    hint: "Department Locations (dept_locations table).",
    level: "basic"
  },
  {
    question: "How is the `{Department_Locations}` multi-valued attribute mapped to MySQL DDL?",
    shortAnswer: "`CREATE TABLE dept_locations (dept_id INT NOT NULL, location VARCHAR(100) NOT NULL, PRIMARY KEY (dept_id, location), FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE CASCADE);`.",
    explanation: "DDL for department locations.",
    hint: "PRIMARY KEY (dept_id, location) with ON DELETE CASCADE.",
    level: "basic",
    codeExample: "CREATE TABLE dept_locations (\n    dept_id INT NOT NULL,\n    location VARCHAR(100) NOT NULL,\n    PRIMARY KEY (dept_id, location),\n    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE CASCADE\n) ENGINE=InnoDB;"
  },
  {
    question: "Why should you never use `VARCHAR(255)` with comma separation for Department Locations?",
    shortAnswer: "Because queries like 'Find all departments in Barrackpore Campus' would require slow full table scans with `LIKE '%Barrackpore%'` instead of fast index seeks.",
    explanation: "Avoids slow substring pattern scans.",
    hint: "Forces slow LIKE queries instead of indexed lookups.",
    level: "basic"
  },
  {
    question: "How do you delete only one specific phone number for a student without affecting their other phone numbers?",
    shortAnswer: "`DELETE FROM student_phones WHERE student_id = 101 AND phone_number = '9830098765';`.",
    explanation: "Precise row deletion on composite key.",
    hint: "DELETE WHERE student_id = 101 AND phone_number = '...'",
    level: "basic"
  },
  {
    question: "What is the consequence of forgetting `ON DELETE CASCADE` in `student_phones`?",
    shortAnswer: "Attempting to delete a student from `students` will fail with Error 1451 (foreign key constraint fails), blocking the deletion until all phone records are manually removed.",
    explanation: "Blocks parent deletion due to restrict rule.",
    hint: "Error 1451 blocks parent deletion.",
    level: "basic"
  },
  {
    question: "How does a View simplify querying student details along with their concatenated phone numbers?",
    shortAnswer: "Create `vw_student_directory` pre-joining `students` and `student_phones` using `GROUP_CONCAT()`.",
    explanation: "Abstracts 1:N join and aggregation behind a clean view.",
    hint: "Encapsulates GROUP_CONCAT inside a View.",
    level: "basic"
  },
  {
    question: "How many total rows are created in `student_phones` if 100 students each register 2 phone numbers?",
    shortAnswer: "200 rows ($100 \\times 2 = 200$).",
    explanation: "Direct linear row cardinality.",
    hint: "200 rows.",
    level: "basic"
  },
  {
    question: "Can a multi-valued attribute table participate in a relationship with another entity?",
    shortAnswer: "Generally no; if the multi-valued item needs to participate in relationships with other entities, it should be modeled as a full Entity in the conceptual ER diagram instead.",
    explanation: "Promoting multi-valued attributes to entities.",
    hint: "Promote to a full entity if it needs relationships.",
    level: "moderate"
  },
  {
    question: "What index is automatically created by MySQL InnoDB on the `PRIMARY KEY (student_id, phone_number)`?",
    shortAnswer: "A clustered B-Tree index sorted by `student_id` first, and then by `phone_number`.",
    explanation: "Clustered composite primary key index.",
    hint: "Clustered B-Tree index on (student_id, phone_number).",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for Step 6: Mapping Multi-Valued Attributes?",
    shortAnswer: "1) Create a dedicated table for each multi-valued attribute. 2) Include parent Primary Key as Foreign Key. 3) Define Composite PK: `(parent_id, attribute_value)`. 4) Configure `ON DELETE CASCADE`. 5) Add secondary index on attribute value for reverse lookups. 6) Add metadata columns (type, is_primary) as needed.",
    explanation: "Following these 6 rules guarantees 100% 1NF-compliant, high-speed multi-valued relational schemas.",
    hint: "Dedicated table, Composite PK, ON DELETE CASCADE, Secondary index on value, Metadata columns.",
    level: "basic"
  }
];

export default questions;
