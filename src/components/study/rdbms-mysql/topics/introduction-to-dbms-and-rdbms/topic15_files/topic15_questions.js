/**
 * Topic 15: Concept of Tables (Relations) – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is a table in the context of a relational database?",
    shortAnswer:
      "A table (relation) is the fundamental data structure in a relational database, organising data into rows (tuples) and columns (attributes).",
    explanation:
      "Each table represents an entity (e.g., Students, Courses). It has a fixed schema (columns and data types) and contains a variable number of rows. Tables are linked through primary and foreign keys.",
    hint: "Think about how a spreadsheet is structured.",
    level: "basic",
    codeExample: "CREATE TABLE Students (StudentID INT PRIMARY KEY, Name VARCHAR(50), Class INT);",
  },
  {
    question: "What is the difference between a table and a relation in theory?",
    shortAnswer:
      "In theory, a relation is a mathematical set (no duplicate rows, unordered). In practice, tables may allow duplicates and have a physical order.",
    explanation:
      "The relational model assumes relations are sets. However, RDBMS implementations often treat tables as multisets (bags) allowing duplicates, though constraints can enforce uniqueness.",
    hint: "Think about the theoretical ideal vs. practical implementation.",
    level: "intermediate",
  },
  {
    question: "What is a tuple in relational database terminology?",
    shortAnswer:
      "A tuple is a single row in a table, representing one instance of the entity.",
    explanation:
      "Tuples contain values for each attribute in the table. For example, in a Students table, a tuple would contain data for one student (StudentID, Name, Class, etc.).",
    hint: "Think about a record or row.",
    level: "basic",
  },
  {
    question: "What is an attribute in relational database terminology?",
    shortAnswer:
      "An attribute is a column in a table, defining a property of the entity.",
    explanation:
      "Attributes have names and data types. They represent the characteristics of the entity (e.g., StudentID, Name, Class).",
    hint: "Think about a column or field.",
    level: "basic",
  },
  {
    question: "What are the key properties of a table in a relational database?",
    shortAnswer:
      "Key properties include: no duplicate rows, unordered rows, atomic values in each cell, unique attribute names, defined data types, and relationships via keys.",
    explanation:
      "These properties ensure data integrity and consistency. They are enforced by the RDBMS through constraints and the underlying relational model.",
    hint: "Think about the rules that make a table valid.",
    level: "intermediate",
  },
  {
    question: "What is atomicity in the context of a table cell?",
    shortAnswer:
      "Atomicity means each cell in a table must contain a single, indivisible value (no repeating groups or nested structures).",
    explanation:
      "For example, storing multiple phone numbers in one cell violates atomicity. Instead, you'd create a separate table for phone numbers.",
    hint: "Think about a cell containing only one piece of data.",
    level: "intermediate",
  },
  {
    question: "Why can't tables have duplicate rows in the relational model?",
    shortAnswer:
      "Duplicate rows would violate the definition of a relation as a set (which has unique elements) and make it impossible to uniquely identify tuples.",
    explanation:
      "Primary keys are used to enforce uniqueness. Without uniqueness, data integrity is compromised.",
    hint: "Think about why you need a unique identifier for each row.",
    level: "intermediate",
  },
  {
    question: "What is the degree of a table?",
    shortAnswer:
      "The degree of a table is the number of columns (attributes) it has.",
    explanation:
      "For example, a Students table with columns StudentID, Name, Class, and City has a degree of 4.",
    hint: "Think about the column count.",
    level: "basic",
  },
  {
    question: "What is the cardinality of a table?",
    shortAnswer:
      "The cardinality of a table is the number of rows (tuples) it currently contains.",
    explanation:
      "Cardinality changes as rows are inserted, updated, or deleted. It represents the size of the table at a given time.",
    hint: "Think about the row count.",
    level: "basic",
  },
  {
    question: "What is a schema in the context of a table?",
    shortAnswer:
      "The schema of a table defines its structure, including column names, data types, and constraints.",
    explanation:
      "For example: Students (StudentID INT PRIMARY KEY, Name VARCHAR(50), Class INT). The schema is defined using DDL (Data Definition Language).",
    hint: "Think about the blueprint of the table.",
    level: "basic",
  },
  {
    question: "What is a domain in the context of relational tables?",
    shortAnswer:
      "A domain is the set of allowed values for an attribute, defined by its data type and constraints.",
    explanation:
      "For example, the domain of StudentID might be integers between 1 and 9999. Domains enforce data integrity.",
    hint: "Think about the range of valid values for a column.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a schema and a table?",
    shortAnswer:
      "A schema is the blueprint (definition) of the table; the table is the actual implementation containing data.",
    explanation:
      "The schema is created once (or altered occasionally). The table is where data is stored and queried.",
    hint: "Think about the difference between a blueprint and the actual building.",
    level: "intermediate",
  },
  {
    question: "What is a primary key in the context of a table?",
    shortAnswer:
      "A primary key is a column or set of columns that uniquely identifies each row in a table.",
    explanation:
      "Primary keys must be unique and not null. They are used to reference rows from other tables (foreign keys).",
    hint: "Think about what uniquely identifies a student record.",
    level: "basic",
  },
  {
    question: "What is a foreign key in the context of a table?",
    shortAnswer:
      "A foreign key is a column or set of columns in one table that refers to the primary key of another table, establishing a relationship.",
    explanation:
      "Foreign keys enforce referential integrity — they ensure that values in the foreign key column exist in the referenced table.",
    hint: "Think about how a student's marks are linked to the student ID in another table.",
    level: "basic",
  },
  {
    question: "What is referential integrity and how does it relate to tables?",
    shortAnswer:
      "Referential integrity ensures that foreign key values match existing primary key values in the referenced table.",
    explanation:
      "This prevents orphaned records. For example, you can't add an enrollment for a student that doesn't exist. It's enforced by the RDBMS.",
    hint: "Think about why every order must have a valid customer.",
    level: "intermediate",
  },
  {
    question: "What are the common naming conventions for tables and columns?",
    shortAnswer:
      "Common conventions include: using singular nouns for tables (e.g., Student), using snake_case or PascalCase for columns, and using meaningful descriptive names.",
    explanation:
      "Consistency is key. Avoid abbreviations, use full words, and document the conventions for your team.",
    hint: "Think about how you would name a table for a library system.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a table and a view?",
    shortAnswer:
      "A table stores data physically; a view is a virtual table based on a SQL query that presents data from one or more tables.",
    explanation:
      "Views provide an abstraction layer, can simplify complex queries, and restrict access to specific columns or rows.",
    hint: "Think about a window into the data vs. the actual storage.",
    level: "intermediate",
  },
  {
    question: "What are the common data types used in table definitions?",
    shortAnswer:
      "Common data types include: INT (integer), VARCHAR (variable-length string), DATE, TIMESTAMP, BOOLEAN, and DECIMAL (for precise numbers).",
    explanation:
      "Choosing the right data type is crucial for storage efficiency and data integrity. Different RDBMS have slightly different data types.",
    hint: "Think about the types of data you would store for a student.",
    level: "basic",
  },
  {
    question: "What is the significance of the `NOT NULL` constraint in a table?",
    shortAnswer:
      "The `NOT NULL` constraint ensures that a column cannot store a `NULL` value, enforcing that data must be provided.",
    explanation:
      "For example, StudentID and Name are likely to be `NOT NULL` because every student should have an ID and a name.",
    hint: "Think about which columns must always have a value.",
    level: "basic",
  },
  {
    question: "What is the `UNIQUE` constraint in a table?",
    shortAnswer:
      "The `UNIQUE` constraint ensures that all values in a column (or a set of columns) are distinct from each other.",
    explanation:
      "Unlike `PRIMARY KEY`, a table can have multiple `UNIQUE` constraints, and they can accept one `NULL` value (depending on the DBMS).",
    hint: "Think about columns that must be unique but not be the primary key.",
    level: "intermediate",
  },
  {
    question: "What is the `CHECK` constraint in a table?",
    shortAnswer:
      "The `CHECK` constraint validates data based on a condition, ensuring only valid data is stored in the column.",
    explanation:
      "For example, `CHECK (Age >= 18)` ensures that only adults are entered. It enforces domain integrity.",
    hint: "Think about rules like 'marks must be between 0 and 100'.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a table and a spreadsheet?",
    shortAnswer:
      "A table enforces strict data types, constraints, and relationships, while a spreadsheet is more flexible but less rigid in enforcing data integrity.",
    explanation:
      "Tables are designed for querying and data integrity. Spreadsheets are designed for ad-hoc analysis and data entry.",
    hint: "Think about why a database is better than a spreadsheet for managing large amounts of data.",
    level: "intermediate",
  },
  {
    question: "What is the role of the `ALTER TABLE` statement?",
    shortAnswer:
      "`ALTER TABLE` is a DDL statement used to modify the structure of an existing table (add, drop, or modify columns and constraints).",
    explanation:
      "For example, you can add a new column or change the data type of an existing column using `ALTER TABLE`.",
    hint: "Think about changing the table structure after it's created.",
    level: "intermediate",
    codeExample: "ALTER TABLE Students ADD COLUMN Email VARCHAR(100);",
  },
  {
    question: "What is the role of the `DROP TABLE` statement?",
    shortAnswer:
      "`DROP TABLE` is a DDL statement that deletes an entire table and its data from the database.",
    explanation:
      "This operation is irreversible, so it should be used with caution. It also removes any associated indexes and constraints.",
    hint: "Think about permanently removing a table.",
    level: "basic",
    codeExample: "DROP TABLE Students;",
  },
  {
    question: "What is an entity in the context of a table?",
    shortAnswer:
      "An entity is a real-world object or concept that is represented by a table in the database (e.g., Student, Course, Order).",
    explanation:
      "Tables are designed to model entities and their relationships. Each row represents an instance of the entity.",
    hint: "Think about the 'nouns' in your system (Student, Teacher, Course).",
    level: "basic",
  },
  {
    question: "What is the significance of the order of columns in a table?",
    shortAnswer:
      "The order of columns in a table is not significant for data retrieval or integrity, though it can be important for layout and readability.",
    explanation:
      "Columns can be queried in any order using SELECT. The physical order of columns is determined by the schema definition.",
    hint: "Think about whether the order of columns matters for query results.",
    level: "basic",
  },
  {
    question: "What are temporary tables and when are they used?",
    shortAnswer:
      "Temporary tables are tables that exist only for the duration of a database session or transaction, used for intermediate result storage.",
    explanation:
      "They are useful for complex queries where you need to store intermediate results. They are automatically dropped at the end of the session.",
    hint: "Think about scratch paper for calculations.",
    level: "expert",
  },
  {
    question: "How does the choice of data type affect table performance?",
    shortAnswer:
      "Choosing appropriate data types can improve storage efficiency and query performance. Smaller data types use less storage and improve I/O.",
    explanation:
      "For example, using TINYINT instead of INT for a small range of values saves space. Using VARCHAR instead of CHAR for variable-length strings saves space.",
    hint: "Think about why you shouldn't use VARCHAR(1000) for a 5-character field.",
    level: "expert",
  },
  {
    question: "What is the relationship between tables and indexes?",
    shortAnswer:
      "Indexes are data structures that speed up data retrieval from tables. They are created on columns that are frequently queried.",
    explanation:
      "While indexes improve read performance, they add overhead to write operations (INSERT, UPDATE, DELETE). Choosing the right indexes is a key tuning activity.",
    hint: "Think about the index at the back of a book.",
    level: "intermediate",
  },
  {
    question: "What are the different types of relationships between tables?",
    shortAnswer:
      "The main types are: one-to-one, one-to-many, and many-to-many.",
    explanation:
      "One-to-many is the most common. It's implemented using a foreign key in the 'many' table (e.g., one teacher has many students). Many-to-many requires a junction table.",
    hint: "Think about how teachers and students are related in a school database.",
    level: "intermediate",
  },
  {
    question: "How does normalization relate to table design?",
    shortAnswer:
      "Normalization is the process of organizing tables to reduce redundancy and improve data integrity. It involves applying normal forms (1NF, 2NF, 3NF, etc.).",
    explanation:
      "Normalized table designs reduce data duplication and prevent update anomalies, leading to more maintainable databases.",
    hint: "Think about why you wouldn't store a student's address in every marks entry.",
    level: "intermediate",
  },
];

export default questions;