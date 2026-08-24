// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is an Entity Identifier in ER modeling?",
    shortAnswer: "An attribute or minimal set of attributes whose values uniquely distinguish each individual entity instance within an entity set.",
    explanation: "Core mechanism for enforcing entity integrity.",
    hint: "Attribute uniquely distinguishing entity instances.",
    level: "basic"
  },
  {
    question: "What is the difference between a Superkey and a Candidate Key?",
    shortAnswer: "A Superkey is ANY set of attributes that uniquely identifies an entity; a Candidate Key is a MINIMAL Superkey with no extraneous/redundant attributes.",
    explanation: "Candidate keys have no proper subsets that are also superkeys.",
    hint: "Any unique set vs minimal unique set.",
    level: "basic"
  },
  {
    question: "What is a Primary Key (PK) in relational database design?",
    shortAnswer: "The specific Candidate Key chosen by the database architect as the official unique identifier for rows in the table.",
    explanation: "Enforces non-null entity integrity and forms the clustered index in InnoDB.",
    hint: "Chosen candidate key.",
    level: "basic"
  },
  {
    question: "What is an Alternate (Secondary) Key?",
    shortAnswer: "Any Candidate Key that was NOT selected as the Primary Key.",
    explanation: "Enforced in SQL tables using `UNIQUE NOT NULL` constraints.",
    hint: "Non-primary candidate key.",
    level: "basic"
  },
  {
    question: "What is a Partial Key (Discriminator) in ER modeling?",
    shortAnswer: "An attribute that uniquely distinguishes weak entities belonging to the SAME parent owner, but cannot identify entities globally on its own.",
    explanation: "Combined with the owner's primary key to form the weak entity's composite primary key.",
    hint: "Discriminator for weak entity instances under a parent.",
    level: "moderate"
  },
  {
    question: "How is a Primary Key attribute represented visually in Peter Chen ER notation?",
    shortAnswer: "As an Oval containing text with a SOLID UNDERLINE (`_student_id_`).",
    explanation: "Standard Chen notation symbol for primary identifiers.",
    hint: "Oval with solid underlined text.",
    level: "basic"
  },
  {
    question: "How is a Partial Key (Discriminator) represented visually in Peter Chen ER notation?",
    shortAnswer: "As an Oval containing text with a DASHED UNDERLINE (`- - - dependent_name - - -`).",
    explanation: "Dashed underline denotes a partial discriminator.",
    hint: "Oval with dashed underlined text.",
    level: "basic"
  },
  {
    question: "What is a Natural Key vs a Surrogate Key?",
    shortAnswer: "A Natural Key is a real-world unique attribute (e.g. `aadhaar_no` or `email`); a Surrogate Key is a system-generated integer ID (e.g. `student_id INT AUTO_INCREMENT`).",
    explanation: "Surrogate keys are preferred for foreign key joins to decouple schemas from business logic changes.",
    hint: "Real-world business identifier vs generated integer.",
    level: "basic"
  },
  {
    question: "Why should database developers prefer Surrogate Primary Keys over Natural Primary Keys for Foreign Key relationships?",
    shortAnswer: "Surrogate integer keys are compact (4-8 bytes), immutable, provide blazing-fast B-Tree join seeks, and protect child tables if natural attributes ever change.",
    explanation: "Decouples physical relational storage from mutable business identifiers.",
    hint: "Compact integer storage, fast joins, and business immutability.",
    level: "moderate"
  },
  {
    question: "How do you enforce Natural Candidate Keys in a table that uses a Surrogate Primary Key in MySQL?",
    shortAnswer: "By adding explicit `UNIQUE KEY` constraints on the natural columns (`CONSTRAINT uq_aadhaar UNIQUE (aadhaar_no)`).",
    explanation: "Combines surrogate join speed with natural duplicate prevention.",
    hint: "Add UNIQUE constraints on natural columns.",
    level: "basic",
    codeExample: "student_id INT AUTO_INCREMENT PRIMARY KEY,\naadhaar_no CHAR(12) NOT NULL,\nCONSTRAINT uq_aadhaar UNIQUE (aadhaar_no)"
  },
  {
    question: "Can an entity set have multiple Candidate Keys?",
    shortAnswer: "Yes (e.g. in a Student entity set, `student_id`, `aadhaar_no`, and `email` can all be candidate keys).",
    explanation: "The architect selects one as Primary Key and marks others as UNIQUE.",
    hint: "Multiple candidate keys can coexist.",
    level: "basic"
  },
  {
    question: "Can a Primary Key column contain `NULL` values in MySQL InnoDB?",
    shortAnswer: "No, SQL standards and MySQL InnoDB strictly require that all columns in a Primary Key MUST be `NOT NULL`.",
    explanation: "Entity integrity requires non-null primary keys.",
    hint: "Primary key columns cannot contain NULL.",
    level: "basic"
  },
  {
    question: "Can an Alternate Candidate Key with a `UNIQUE` constraint contain `NULL` values in MySQL?",
    shortAnswer: "Yes, MySQL allows multiple `NULL` values in a `UNIQUE` column unless the column is explicitly defined as `NOT NULL`.",
    explanation: "SQL three-valued logic treats NULLs as distinct in UNIQUE indexes.",
    hint: "UNIQUE permits NULLs unless marked NOT NULL.",
    level: "moderate"
  },
  {
    question: "How is the Primary Key of a Weak Entity constructed in the relational schema?",
    shortAnswer: "As a Composite Primary Key combining the Owner Strong Entity's Primary Key (as Foreign Key) AND the Weak Entity's Partial Key.",
    explanation: "`PRIMARY KEY (owner_id, partial_key)`.",
    hint: "Composite of Owner PK and Partial Key.",
    level: "moderate",
    codeExample: "CREATE TABLE student_dependents (\n    student_id INT NOT NULL,\n    dependent_name VARCHAR(50) NOT NULL,\n    PRIMARY KEY (student_id, dependent_name),\n    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE\n);"
  },
  {
    question: "What is a Composite Candidate Key?",
    shortAnswer: "A Candidate Key that consists of two or more attributes combined together to achieve minimal uniqueness (e.g. `{building_code, room_number}`).",
    explanation: "Neither attribute alone is unique; only the combination is unique.",
    hint: "Multi-attribute minimal unique key.",
    level: "moderate"
  },
  {
    question: "What is the danger of using an Email Address as the Primary Key in a high-traffic production database?",
    shortAnswer: "Emails are long strings (wasting secondary index leaf space) and mutable: if a user changes their email, MySQL must acquire locks and update all referencing child tables.",
    explanation: "String primary keys degrade clustered index performance.",
    hint: "Large byte footprint and cascading update locks.",
    level: "expert"
  },
  {
    question: "What is a 'Compound Key' vs a 'Composite Key'?",
    shortAnswer: "A Composite Key is any multi-attribute key; a Compound Key is a specific composite key where at least one component is a Foreign Key referencing another entity.",
    explanation: "Compound keys are common in junction and weak entity tables.",
    hint: "Composite key containing at least one foreign key.",
    level: "expert"
  },
  {
    question: "How do you define a Composite Primary Key using MySQL DDL?",
    shortAnswer: "Using the table-level constraint: `PRIMARY KEY (col1, col2)`.",
    explanation: "Composite keys cannot be declared inline on a single column definition.",
    hint: "Table-level PRIMARY KEY (col1, col2) syntax.",
    level: "basic",
    codeExample: "PRIMARY KEY (student_id, course_id)"
  },
  {
    question: "What is an 'Extraneous Attribute' in a Superkey?",
    shortAnswer: "An attribute whose removal from the superkey still leaves a set of attributes that uniquely identifies tuples.",
    explanation: "If `{student_id, email}` is a superkey, `email` is extraneous because `{student_id}` alone is already unique.",
    hint: "Redundant attribute that can be removed without losing uniqueness.",
    level: "expert"
  },
  {
    question: "What is 'Minimality' in Candidate Key definition?",
    shortAnswer: "The property that no proper subset of the Candidate Key is a Superkey.",
    explanation: "Ensures no unnecessary columns bloat the identifier.",
    hint: "No subset can uniquely identify rows.",
    level: "expert"
  },
  {
    question: "How many Primary Keys can a single table have in MySQL InnoDB?",
    shortAnswer: "Exactly ONE Primary Key (though it may be composite with multiple columns).",
    explanation: "Every InnoDB table has exactly one clustered primary key index.",
    hint: "Exactly one primary key per table.",
    level: "basic"
  },
  {
    question: "What does MySQL InnoDB do if you create a table with NO explicit Primary Key and no UNIQUE NOT NULL index?",
    shortAnswer: "InnoDB automatically generates an internal 6-byte hidden clustered surrogate key named `DB_ROW_ID`.",
    explanation: "InnoDB requires a clustered index for page organization.",
    hint: "Generates a hidden 6-byte DB_ROW_ID.",
    level: "expert"
  },
  {
    question: "Why is relying on InnoDB's hidden `DB_ROW_ID` considered an architectural anti-pattern?",
    shortAnswer: "Because `DB_ROW_ID` uses a single global mutex across all tables without a PK, creating severe lock contention on high-concurrency inserts.",
    explanation: "Always explicitly declare a Primary Key on every table.",
    hint: "Global mutex contention degrades insert throughput.",
    level: "expert"
  },
  {
    question: "What is an 'Intelligent Key' (Smart Key), and why is it discouraged?",
    shortAnswer: "A key that embeds business codes into its structure (e.g. `CS-2026-001` where `CS` = Dept, `2026` = Year); discouraged because business logic changes break the key.",
    explanation: "Violates separation of identity and data attributes.",
    hint: "Embedding business data into key strings.",
    level: "moderate"
  },
  {
    question: "Can a table have both an `AUTO_INCREMENT` Primary Key AND multiple `UNIQUE` Candidate Keys?",
    shortAnswer: "Yes, this is the industry-standard architecture for robust, high-performance schema design.",
    explanation: "Surrogate key provides fast joins; UNIQUE constraints protect business uniqueness.",
    hint: "Industry-standard pattern.",
    level: "basic",
    codeExample: "CREATE TABLE users (\n    user_id INT AUTO_INCREMENT PRIMARY KEY,\n    username VARCHAR(30) NOT NULL UNIQUE,\n    email VARCHAR(100) NOT NULL UNIQUE\n);"
  },
  {
    question: "How do you drop a Primary Key and add a new one in MySQL?",
    shortAnswer: "`ALTER TABLE table_name DROP PRIMARY KEY, ADD PRIMARY KEY (new_col);`.",
    explanation: "Atomic drop and replacement of the clustered primary key.",
    hint: "ALTER TABLE DROP PRIMARY KEY, ADD PRIMARY KEY.",
    level: "moderate"
  },
  {
    question: "How do you query `information_schema` to list all Candidate Keys (Primary and Unique) on a table?",
    shortAnswer: "Query `information_schema.TABLE_CONSTRAINTS` for `CONSTRAINT_TYPE IN ('PRIMARY KEY', 'UNIQUE')`.",
    explanation: "Inspects schema metadata catalog.",
    hint: "information_schema.TABLE_CONSTRAINTS.",
    level: "moderate",
    codeExample: "SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE\nFROM information_schema.TABLE_CONSTRAINTS\nWHERE TABLE_NAME = 'students';"
  },
  {
    question: "What happens when a child table inserts a foreign key that does NOT exist in the parent's primary key?",
    shortAnswer: "MySQL immediately aborts with Error 1452 (Cannot add or update a child row: foreign key constraint fails).",
    explanation: "Referential integrity protection.",
    hint: "Error 1452.",
    level: "basic"
  },
  {
    question: "Why should Primary Key integer columns be declared `UNSIGNED` in MySQL?",
    shortAnswer: "Because IDs are never negative; `UNSIGNED` doubles the positive integer capacity (e.g. `INT UNSIGNED` supports up to 4.29 billion rows vs 2.14 billion).",
    explanation: "Doubles maximum row capacity with zero extra bytes.",
    hint: "Doubles positive ID capacity.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for modeling Entity Identifiers in ER diagrams and relational schemas?",
    shortAnswer: "1) Identify Candidate Keys during requirements analysis. 2) Underline the Primary Key in the ER diagram. 3) Use Dashed Underlines for Weak Entity Partial Keys. 4) Use Surrogate `INT UNSIGNED AUTO_INCREMENT` for physical PKs. 5) Enforce Natural Candidate Keys with `UNIQUE NOT NULL`.",
    explanation: "Following these 5 rules guarantees high-performance joins and duplicate-free databases.",
    hint: "Candidate keys, Underline PK, Dashed for Partial Key, Surrogate PK in DDL, UNIQUE on natural keys.",
    level: "basic"
  }
];

export default questions;
