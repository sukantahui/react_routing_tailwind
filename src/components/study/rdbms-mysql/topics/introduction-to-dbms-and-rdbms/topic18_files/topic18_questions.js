/**
 * Topic 18: Primary Key Concept – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is a primary key in a relational database?",
    shortAnswer:
      "A primary key is a column (or set of columns) that uniquely identifies each row in a table.",
    explanation:
      "The primary key ensures entity integrity. It must be unique and NOT NULL. It is used to reference rows from other tables (foreign keys).",
    hint: "Think about the unique identifier for each record.",
    level: "basic",
    codeExample: "CREATE TABLE Students (StudentID INT PRIMARY KEY, Name VARCHAR(50));",
  },
  {
    question: "What are the properties of a primary key?",
    shortAnswer:
      "A primary key must be unique, NOT NULL, immutable (should not change), and there can be only one per table.",
    explanation:
      "These properties ensure that each row is uniquely identifiable, reliable for relationships, and stable over time.",
    hint: "Think about the rules that make a key valid.",
    level: "basic",
  },
  {
    question: "Can a primary key contain NULL values?",
    shortAnswer:
      "No, a primary key cannot contain NULL values. Every row must have a value for the primary key column(s).",
    explanation:
      "NULL would mean the row is not uniquely identifiable, which violates entity integrity. This is enforced by the database.",
    hint: "Think about whether a unique identifier can be missing.",
    level: "basic",
  },
  {
    question: "Can a table have more than one primary key?",
    shortAnswer:
      "No, a table can have only one primary key. However, a primary key can consist of multiple columns (composite key).",
    explanation:
      "A table can have multiple candidate keys, but only one is chosen as the primary key.",
    hint: "Think about whether a table can have two different unique identifiers.",
    level: "basic",
  },
  {
    question: "What is a composite primary key?",
    shortAnswer:
      "A composite primary key is a primary key that consists of two or more columns combined to uniquely identify each row.",
    explanation:
      "Composite keys are used when a single column is not sufficient to ensure uniqueness. For example, a combination of StudentID and CourseID in an Enrollments table.",
    hint: "Think about using multiple columns to identify a row.",
    level: "intermediate",
    codeExample: "CREATE TABLE Enrollments (StudentID INT, CourseID INT, Grade CHAR(1), PRIMARY KEY (StudentID, CourseID));",
  },
  {
    question: "What is a surrogate primary key?",
    shortAnswer:
      "A surrogate key is an artificial, system-generated primary key that has no business meaning.",
    explanation:
      "Surrogate keys are usually auto-incrementing integers (e.g., ID). They are preferred because they are stable, simple, and independent of business data.",
    hint: "Think about a meaningless, system-generated ID.",
    level: "intermediate",
    codeExample: "CREATE TABLE Products (ProductID INT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(100));",
  },
  {
    question: "What is the difference between a primary key and a unique key?",
    shortAnswer:
      "A primary key uniquely identifies a row and cannot be NULL; a unique key also enforces uniqueness but can accept one NULL value.",
    explanation:
      "A table can have multiple unique keys but only one primary key. Primary keys are used for relationships; unique keys are for ensuring data uniqueness.",
    hint: "Think about the difference in NULL handling and purpose.",
    level: "intermediate",
  },
  {
    question: "Why should a primary key be immutable (not change)?",
    shortAnswer:
      "Primary keys should be immutable because changing them can break foreign key relationships and complicate data management.",
    explanation:
      "If a primary key changes, all foreign key references must be updated. This is expensive and error-prone. Surrogate keys avoid this problem.",
    hint: "Think about the consequences of changing a student's ID.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a natural key and a surrogate key?",
    shortAnswer:
      "A natural key is a business-meaningful attribute (like SSN or email), while a surrogate key is a system-generated ID with no business meaning.",
    explanation:
      "Natural keys can change over time (e.g., email changes), making them unreliable as primary keys. Surrogate keys are always stable.",
    hint: "Think about whether the key is meaningful to the business.",
    level: "intermediate",
  },
  {
    question: "Why is it recommended to use surrogate keys?",
    shortAnswer:
      "Surrogate keys are recommended because they are simple, stable, and independent of business data that might change.",
    explanation:
      "They avoid the problems of natural keys (changes, non-uniqueness, large size) and are more efficient for indexing and relationships.",
    hint: "Think about why auto-generated IDs are preferred.",
    level: "intermediate",
  },
  {
    question: "Can a primary key be changed after it's created?",
    shortAnswer:
      "Technically yes, but it's not recommended because it can break foreign key relationships and cause data integrity issues.",
    explanation:
      "If you must change a primary key, use `ON UPDATE CASCADE` to automatically update foreign keys, but it's better to avoid changing primary keys.",
    hint: "Think about the ripple effect of changing a student's ID.",
    level: "expert",
  },
  {
    question: "What is the role of the primary key in data integrity?",
    shortAnswer:
      "The primary key enforces entity integrity by ensuring that each row is uniquely identifiable and no duplicate rows exist.",
    explanation:
      "Entity integrity is one of the key integrity rules in the relational model. It prevents duplicate records and ensures data consistency.",
    hint: "Think about how the database ensures each record is distinct.",
    level: "intermediate",
  },
  {
    question: "How does a primary key support relationships between tables?",
    shortAnswer:
      "Primary keys are referenced by foreign keys in other tables, enabling relationships and enforcing referential integrity.",
    explanation:
      "For example, the StudentID (primary key) in the Students table is referenced as a foreign key in the Enrollments table.",
    hint: "Think about how tables are linked together.",
    level: "basic",
  },
  {
    question: "Can a primary key be a VARCHAR?",
    shortAnswer:
      "Yes, a primary key can be a VARCHAR, but it's generally not recommended because string keys are larger and slower than numeric keys.",
    explanation:
      "VARCHAR primary keys are often used for natural keys (like email, ISBN), but they have performance implications for indexing and relationships.",
    hint: "Think about why integer keys are more efficient.",
    level: "intermediate",
  },
  {
    question: "What is a candidate key?",
    shortAnswer:
      "A candidate key is a column or set of columns that could serve as a primary key because they are unique and NOT NULL.",
    explanation:
      "A table may have multiple candidate keys. One of them is chosen as the primary key; the others become alternate keys.",
    hint: "Think about all the columns that could uniquely identify a row.",
    level: "intermediate",
  },
  {
    question: "What is an alternate key?",
    shortAnswer:
      "An alternate key is a candidate key that is not chosen as the primary key.",
    explanation:
      "Alternate keys are unique keys that could have been primary keys but weren't. They still enforce uniqueness in the table.",
    hint: "Think about the candidate keys that are not the primary key.",
    level: "intermediate",
  },
  {
    question: "Can a primary key be a composite key?",
    shortAnswer:
      "Yes, a primary key can be a composite key (multiple columns). This is used when a single column is not sufficient to ensure uniqueness.",
    explanation:
      "Composite keys are common in junction tables (many-to-many relationships). For example, (StudentID, CourseID) in Enrollments.",
    hint: "Think about using multiple columns to uniquely identify a row.",
    level: "basic",
  },
  {
    question: "What is the maximum number of columns allowed in a composite primary key?",
    shortAnswer:
      "The maximum number of columns in a composite key depends on the RDBMS. Most databases allow up to 16 or 32 columns, but it's best to keep it minimal.",
    explanation:
      "In practice, composite keys should be kept small (2-3 columns) for performance and maintainability.",
    hint: "Think about the practical limits of composite keys.",
    level: "expert",
  },
  {
    question: "What happens if you try to insert a duplicate primary key value?",
    shortAnswer:
      "The database will reject the insert and throw a primary key violation error.",
    explanation:
      "The database enforces uniqueness automatically. If you try to insert a row with a primary key that already exists, the insertion fails.",
    hint: "Think about the error you get when you try to insert a duplicate ID.",
    level: "basic",
  },
  {
    question: "What is the difference between a primary key and a foreign key?",
    shortAnswer:
      "A primary key uniquely identifies a row in its own table; a foreign key is a column that references the primary key of another table.",
    explanation:
      "Foreign keys establish relationships and enforce referential integrity. They ensure that values in the foreign key column exist in the referenced table.",
    hint: "Think about the difference between identifying a record and linking to another table.",
    level: "basic",
  },
  {
    question: "Should you index a primary key?",
    shortAnswer:
      "Most RDBMS automatically create an index on the primary key to enforce uniqueness and speed up queries.",
    explanation:
      "The primary key index is typically a clustered index, meaning the data is physically ordered by the primary key. This makes lookups very fast.",
    hint: "Think about whether the database automatically optimises the primary key.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a clustered and a non-clustered index on a primary key?",
    shortAnswer:
      "A clustered index determines the physical order of data; a non-clustered index is a separate structure that points to the data.",
    explanation:
      "In most RDBMS, the primary key is the clustered index by default. Clustered indexes are faster for range queries.",
    hint: "Think about the physical vs. logical ordering of data.",
    level: "expert",
  },
  {
    question: "Can a primary key be dropped from a table?",
    shortAnswer:
      "Yes, you can drop a primary key using `ALTER TABLE DROP PRIMARY KEY`. However, this removes the unique constraint and should be done with caution.",
    explanation:
      "Dropping a primary key can break relationships and allow duplicate rows. Only do this if you have a compelling reason.",
    hint: "Think about the consequences of removing the unique identifier.",
    level: "intermediate",
    codeExample: "ALTER TABLE Students DROP PRIMARY KEY;",
  },
  {
    question: "What is the significance of the `AUTO_INCREMENT` attribute with primary keys?",
    shortAnswer:
      "`AUTO_INCREMENT` automatically generates a unique sequential integer for the primary key when a new row is inserted.",
    explanation:
      "This is the most common way to implement surrogate keys. The database handles the assignment, ensuring uniqueness.",
    hint: "Think about how IDs are automatically generated.",
    level: "basic",
    codeExample: "CREATE TABLE Students (StudentID INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(50));",
  },
  {
    question: "What are the common mistakes when choosing a primary key?",
    shortAnswer:
      "Common mistakes include: using a nullable column, using a large column (like VARCHAR(255)), using business data that can change, and not defining a primary key at all.",
    explanation:
      "These mistakes lead to poor performance, data integrity issues, and maintenance difficulties.",
    hint: "Think about what makes a bad primary key.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a primary key constraint and a unique constraint?",
    shortAnswer:
      "A primary key constraint enforces uniqueness and NOT NULL. A unique constraint enforces uniqueness but allows one NULL value.",
    explanation:
      "A table can have multiple unique constraints but only one primary key. Primary keys are used for relationships.",
    hint: "Think about the NULL handling difference.",
    level: "intermediate",
  },
  {
    question: "What is a foreign key constraint and how does it relate to the primary key?",
    shortAnswer:
      "A foreign key constraint ensures that values in a column match values in the primary key of another table, enforcing referential integrity.",
    explanation:
      "This prevents orphaned records. For example, you can't add an enrollment for a student that doesn't exist.",
    hint: "Think about how relationships are enforced.",
    level: "intermediate",
    codeExample: "CREATE TABLE Enrollments (StudentID INT, FOREIGN KEY (StudentID) REFERENCES Students(StudentID));",
  },
  {
    question: "What are the implications of using a UUID as a primary key?",
    shortAnswer:
      "UUIDs are globally unique but are larger (16 bytes) and less efficient for indexing and clustering compared to integer keys.",
    explanation:
      "UUIDs are useful in distributed systems but have performance implications. Use them only when you need global uniqueness.",
    hint: "Think about the trade-offs of using a large, random key.",
    level: "expert",
  },
  {
    question: "Can a primary key be changed using `UPDATE`?",
    shortAnswer:
      "Yes, but it's generally not recommended as it breaks foreign key relationships. If you must, use `ON UPDATE CASCADE` to automatically update related tables.",
    explanation:
      "Updating a primary key is risky and should be avoided. Using surrogate keys eliminates the need to ever update the primary key.",
    hint: "Think about why you should never need to change a primary key.",
    level: "expert",
    codeExample: "ALTER TABLE Students ADD CONSTRAINT FK_Enrollments FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON UPDATE CASCADE;",
  },
  {
    question: "What is the difference between a primary key and a UNIQUE constraint with NOT NULL?",
    shortAnswer:
      "Functionally, they are similar, but a primary key is used for entity integrity and relationships, while a UNIQUE constraint is for data uniqueness.",
    explanation:
      "A table can have only one primary key but multiple UNIQUE constraints. Primary keys are also used as the target for foreign key constraints.",
    hint: "Think about the semantic difference in purpose.",
    level: "intermediate",
  },
  {
    question: "How do you choose the right primary key for a table?",
    shortAnswer:
      "Choose a simple, immutable, non-nullable column. Prefer a surrogate integer key unless you have a compelling reason for a natural key.",
    explanation:
      "Consider: size, stability, uniqueness, and how the key will be used in relationships. Surrogate keys are usually the best choice.",
    hint: "Think about the characteristics of an ideal key.",
    level: "expert",
  },
];

export default questions;