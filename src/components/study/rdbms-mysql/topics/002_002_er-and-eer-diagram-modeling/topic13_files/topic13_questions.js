// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What is Step 1 of the formal 7-step ER-to-Relational Mapping Algorithm?",
    shortAnswer: "Mapping Regular (Strong) Entity Types into dedicated relational tables containing all simple attributes and flattened components of composite attributes, with a chosen Primary Key.",
    explanation: "Foundational step converting strong conceptual entities into physical base tables.",
    hint: "Mapping regular strong entities into base tables.",
    level: "basic"
  },
  {
    question: "How is a Composite Attribute in an ER diagram mapped to a relational table in Step 1?",
    shortAnswer: "It is 'flattened': decomposed into its simple atomic components, each becoming an individual column in the table (e.g. `Address` becomes `street`, `city`, `pincode`).",
    explanation: "Composite attributes are decomposed to satisfy 1NF atomicity.",
    hint: "Decomposed into separate simple columns (flattened).",
    level: "basic"
  },
  {
    question: "Why are Multi-Valued attributes EXCLUDED during Step 1 of the mapping algorithm?",
    shortAnswer: "Because storing multiple values in a single column violates First Normal Form (1NF); multi-valued attributes are mapped to dedicated child tables in Step 6.",
    explanation: "Multi-valued attributes require dedicated tables.",
    hint: "Violates 1NF; handled in Step 6 as a separate table.",
    level: "basic"
  },
  {
    question: "How should a Derived Attribute (like `age` calculated from `dob`) be handled in Step 1?",
    shortAnswer: "It is excluded from static physical storage, or implemented as a MySQL `VIRTUAL GENERATED` column or dynamic calculation in a database view.",
    explanation: "Avoids storing redundant, staleness-prone data.",
    hint: "Excluded from physical storage or implemented as a VIRTUAL GENERATED column.",
    level: "moderate"
  },
  {
    question: "What is a Regular (Strong) Entity in ER modeling?",
    shortAnswer: "An entity that has its own Primary Key identifier and does not depend on any owner parent entity for its existence.",
    explanation: "Independent entity type.",
    hint: "Independent entity with its own primary key.",
    level: "basic"
  },
  {
    question: "How do you define a Virtual Generated Column for `age` in MySQL 8+?",
    shortAnswer: "`age INT GENERATED ALWAYS AS (TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)) VIRTUAL`.",
    explanation: "MySQL DDL syntax for computed virtual columns.",
    hint: "GENERATED ALWAYS AS (TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)) VIRTUAL.",
    level: "moderate",
    codeExample: "CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    dob DATE NOT NULL,\n    age INT GENERATED ALWAYS AS (TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)) VIRTUAL\n);"
  },
  {
    question: "What happens if a strong entity has multiple Candidate Keys in the conceptual ER model?",
    shortAnswer: "One candidate key is selected as the table's `PRIMARY KEY`, and all remaining candidate keys are defined with `UNIQUE NOT NULL` constraints.",
    explanation: "Standard primary vs alternate key mapping.",
    hint: "Choose one as PRIMARY KEY, declare others as UNIQUE NOT NULL.",
    level: "basic"
  },
  {
    question: "If a Strong Entity has a Composite Primary Key in the ER diagram (e.g. `course_code` + `section_no`), how is it mapped in Step 1?",
    shortAnswer: "The table is created with a composite primary key: `PRIMARY KEY (course_code, section_no)`.",
    explanation: "Composite primary key table definition.",
    hint: "PRIMARY KEY (col1, col2).",
    level: "basic"
  },
  {
    question: "Why should you never store a student's full address in a single unformatted `VARCHAR(255)` column?",
    shortAnswer: "Because it violates 1NF atomicity, prevents searching or indexing by specific city or pincode, and complicates address validation.",
    explanation: "Violates first normal form atomicity.",
    hint: "Violates 1NF and prevents searching/indexing by city or pincode.",
    level: "basic"
  },
  {
    question: "What is the storage overhead of a MySQL `VIRTUAL` generated column compared to a `STORED` generated column?",
    shortAnswer: "`VIRTUAL` columns consume ZERO disk space (calculated in-memory upon reading); `STORED` columns write the computed value to disk and update whenever source columns change.",
    explanation: "Memory calculation vs disk footprint.",
    hint: "VIRTUAL consumes zero disk space; STORED writes to disk.",
    level: "expert"
  },
  {
    question: "How does Peter Chen notation represent simple vs composite attributes?",
    shortAnswer: "Simple attribute: single oval attached directly to the entity; Composite attribute: parent oval with sub-ovals branching off it.",
    explanation: "Visual distinction in Peter Chen ER diagrams.",
    hint: "Sub-ovals branching off a parent oval.",
    level: "basic"
  },
  {
    question: "How does Peter Chen notation represent derived attributes?",
    shortAnswer: "As a DASHED oval attached to the entity rectangle.",
    explanation: "Dashed oval indicates derived/computed value.",
    hint: "Dashed oval.",
    level: "basic"
  },
  {
    question: "How does Peter Chen notation represent multi-valued attributes?",
    shortAnswer: "As a DOUBLE-LINED oval attached to the entity rectangle.",
    explanation: "Double oval indicates multi-valued set.",
    hint: "Double oval.",
    level: "basic"
  },
  {
    question: "What SQL data type is recommended for an Indian PIN Code column?",
    shortAnswer: "`CHAR(6)` with a `CHECK` constraint: `CHECK (pincode REGEXP '^[1-9][0-9]{5}$')`.",
    explanation: "Fixed-width string preventing numeric truncation of leading zeros.",
    hint: "CHAR(6) with regex check constraint.",
    level: "moderate"
  },
  {
    question: "What SQL data type is recommended for an Indian Aadhaar Number column?",
    shortAnswer: "`CHAR(12)` with `UNIQUE NOT NULL` and a `CHECK` constraint ensuring exactly 12 numeric digits.",
    explanation: "Fixed-width string for 12-digit national ID.",
    hint: "CHAR(12) UNIQUE NOT NULL.",
    level: "basic"
  },
  {
    question: "Can an entity table in Step 1 contain Foreign Keys?",
    shortAnswer: "No, Step 1 focuses strictly on regular entity attributes; foreign keys are introduced in subsequent steps (Steps 3, 4, 5) when mapping relationships.",
    explanation: "Step 1 creates standalone base entity tables.",
    hint: "No, foreign keys are introduced in relationship mapping steps.",
    level: "moderate"
  },
  {
    question: "What is the primary benefit of flattening composite attributes in Step 1?",
    shortAnswer: "It makes every attribute atomic, allowing fine-grained SQL filtering, sorting (e.g. `ORDER BY last_name, first_name`), and individual column indexing.",
    explanation: "Enables granular relational operations.",
    hint: "Enables granular filtering, sorting, and indexing.",
    level: "basic"
  },
  {
    question: "How do you map a nested composite attribute (e.g. `Address` containing `GeoLocation(lat, long)`) in Step 1?",
    shortAnswer: "All nested sub-attributes are flattened into the base table: `address_street`, `address_city`, `geo_lat`, `geo_long`.",
    explanation: "Recursive flattening down to atomic leaves.",
    hint: "Flatten all leaf attributes into columns.",
    level: "moderate"
  },
  {
    question: "Why should `AUTO_INCREMENT` Primary Keys be used when candidate natural keys are long strings?",
    shortAnswer: "Surrogate integer keys provide compact 4-byte clustered B-Tree indexes, faster join operations, and shield internal relations from business identifier changes.",
    explanation: "B-Tree performance and index compactness.",
    hint: "Compact 4-byte integers make B-Trees and joins faster.",
    level: "moderate"
  },
  {
    question: "How do you verify the column structure and primary key of a created strong entity table in MySQL?",
    shortAnswer: "`DESCRIBE students;` or `SHOW CREATE TABLE students;`.",
    explanation: "Standard MySQL schema inspection commands.",
    hint: "DESCRIBE table_name or SHOW CREATE TABLE.",
    level: "basic"
  },
  {
    question: "What is the consequence of mapping a multi-valued attribute directly into a single `VARCHAR` column using comma separation?",
    shortAnswer: "It violates 1NF, makes indexing individual values impossible, and requires inefficient full-table `LIKE '%val%'` pattern matching.",
    explanation: "Severe database anti-pattern.",
    hint: "Violates 1NF and forces slow LIKE queries.",
    level: "basic"
  },
  {
    question: "How does a database View provide backward compatibility if a composite attribute was originally stored as a single string?",
    shortAnswer: "A view can concatenate the flattened columns: `CONCAT(first_name, ' ', last_name) AS full_name`.",
    explanation: "Dynamic concatenation view pattern.",
    hint: "CONCAT(first_name, ' ', last_name) AS full_name in a View.",
    level: "basic",
    codeExample: "CREATE VIEW vw_student_profiles AS\nSELECT student_id, CONCAT(first_name, ' ', last_name) AS full_name, CONCAT(street, ', ', locality, ' - ', pincode) AS full_address, age\nFROM students;"
  },
  {
    question: "Can a Strong Entity table have a `CHECK` constraint defined on simple attributes in Step 1?",
    shortAnswer: "Yes, column-level or table-level `CHECK` constraints (e.g. `CHECK (tuition_fee >= 0)`) should be applied during Step 1 table creation.",
    explanation: "Domain constraint enforcement during base table creation.",
    hint: "Yes, CHECK constraints enforce domain integrity.",
    level: "basic"
  },
  {
    question: "What is the difference between Step 1 (Strong Entities) and Step 2 (Weak Entities) in the mapping algorithm?",
    shortAnswer: "Step 1 creates standalone tables with independent primary keys; Step 2 creates tables that must include the owner entity's primary key as part of their composite primary key.",
    explanation: "Independent PK vs Owner-dependent Composite PK.",
    hint: "Independent PK vs Owner-dependent Composite PK.",
    level: "moderate"
  },
  {
    question: "How do you enforce that a student's `email` attribute is unique and not null in Step 1?",
    shortAnswer: "Define `email VARCHAR(100) NOT NULL UNIQUE` in the `CREATE TABLE` statement.",
    explanation: "Unique constraint syntax in MySQL.",
    hint: "email VARCHAR(100) NOT NULL UNIQUE.",
    level: "basic"
  },
  {
    question: "If an entity has an attribute `Date_Of_Birth`, why should you never add a stored column `Age INT` in the same table?",
    shortAnswer: "Because `Age` is functionally dependent on `Date_Of_Birth` and the current date; storing both creates data redundancy and will become inaccurate without daily updates.",
    explanation: "Violates 3NF and introduces temporal drift.",
    hint: "Creates redundant data that becomes inaccurate over time.",
    level: "basic"
  },
  {
    question: "What default storage engine should always be specified when creating tables in MySQL?",
    shortAnswer: "`ENGINE=InnoDB`, to ensure full ACID transaction compliance and foreign key referential integrity support.",
    explanation: "InnoDB is the gold-standard transactional engine in MySQL.",
    hint: "ENGINE=InnoDB.",
    level: "basic"
  },
  {
    question: "What character set and collation are recommended for strong entity tables supporting multi-lingual names in MySQL?",
    shortAnswer: "`CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`.",
    explanation: "Complete 4-byte UTF-8 coverage including emojis and Indian scripts.",
    hint: "utf8mb4 with utf8mb4_unicode_ci.",
    level: "moderate"
  },
  {
    question: "Can an entity attribute have a `DEFAULT` value specified during Step 1 mapping?",
    shortAnswer: "Yes (e.g. `locality VARCHAR(50) NOT NULL DEFAULT 'Barrackpore'`).",
    explanation: "Default value clause in DDL.",
    hint: "DEFAULT 'Barrackpore'.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for Step 1: Mapping Regular (Strong) Entities?",
    shortAnswer: "1) Create a table for each strong entity. 2) Include all simple stored attributes. 3) Flatten composite attributes into atomic columns. 4) Select candidate key as Primary Key. 5) Declare remaining candidate keys as UNIQUE. 6) Exclude multi-valued attributes (Step 6). 7) Implement derived attributes as VIRTUAL generated columns.",
    explanation: "Following these 7 rules guarantees 100% compliant Step 1 ER-to-relational transformations.",
    hint: "Base table, Simple attrs, Flatten composites, Choose PK, UNIQUE alternate keys, Exclude multi-valued, Virtual derived.",
    level: "basic"
  }
];

export default questions;
