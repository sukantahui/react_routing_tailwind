/**
 * Topic 21: Composite Key – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is a composite key in a relational database?",
    shortAnswer:
      "A composite key is a primary key that consists of two or more columns, where the combination is unique for each row.",
    explanation:
      "Composite keys are used when a single column is not sufficient to uniquely identify a row. For example, (StudentID, CourseID) in an Enrollments table.",
    hint: "Think about using multiple columns to identify a row.",
    level: "basic",
    codeExample: "CREATE TABLE Enrollments (StudentID INT, CourseID INT, PRIMARY KEY (StudentID, CourseID));",
  },
  {
    question: "Why would you use a composite key?",
    shortAnswer:
      "You use a composite key when no single column uniquely identifies a row, but a combination of columns does.",
    explanation:
      "Common use cases include junction tables for many-to-many relationships, historical data, and natural business keys.",
    hint: "Think about when one column is not enough.",
    level: "basic",
  },
  {
    question: "What is the difference between a composite key and a simple key?",
    shortAnswer:
      "A simple key has one column; a composite key has two or more columns.",
    explanation:
      "Simple keys are simpler to use in queries and joins. Composite keys are more complex but reflect natural data relationships.",
    hint: "Think about the number of columns.",
    level: "basic",
  },
  {
    question: "Can a table have a composite primary key and a surrogate key at the same time?",
    shortAnswer:
      "Yes, you can have a composite primary key and also a separate surrogate key column, but the primary key must be unique.",
    explanation:
      "The surrogate key would be an alternate key (with a unique constraint). Some designs use both for flexibility.",
    hint: "Think about having both natural and artificial identifiers.",
    level: "intermediate",
  },
  {
    question: "What is a composite key in a junction table?",
    shortAnswer:
      "In a junction table, the composite key is typically the combination of the foreign keys from the two related tables.",
    explanation:
      "For example, in Enrollments (StudentID, CourseID), the combination uniquely identifies each enrollment.",
    hint: "Think about linking two tables with a combination.",
    level: "basic",
  },
  {
    question: "Can a composite key contain columns with duplicates?",
    shortAnswer:
      "Yes, individual columns in a composite key may have duplicates, but the combination of all columns must be unique.",
    explanation:
      "For example, StudentID may appear many times, and CourseID may appear many times, but (StudentID, CourseID) is unique.",
    hint: "Think about whether each column alone is unique.",
    level: "intermediate",
  },
  {
    question: "What are the advantages of using a composite key?",
    shortAnswer:
      "Advantages include: natural representation of relationships, no need for a surrogate key, and enforcing business uniqueness.",
    explanation:
      "It also self-documents the relationship and can improve query performance in some cases.",
    hint: "Think about why you would use a composite key.",
    level: "intermediate",
  },
  {
    question: "What are the disadvantages of using a composite key?",
    shortAnswer:
      "Disadvantages include: more complex queries, larger indexes, difficulty in changing, and poor framework support.",
    explanation:
      "Composite keys require joining on multiple columns, which can be cumbersome and slow.",
    hint: "Think about the downsides of using multiple columns.",
    level: "intermediate",
  },
  {
    question: "How do you create a composite key in SQL?",
    shortAnswer:
      "You define a composite key using the PRIMARY KEY constraint with multiple column names in parentheses.",
    explanation:
      "For example: CREATE TABLE Enrollments (StudentID INT, CourseID INT, Grade CHAR(1), PRIMARY KEY (StudentID, CourseID));",
    hint: "Think about the syntax for multiple columns.",
    level: "basic",
    codeExample: "PRIMARY KEY (col1, col2, col3)",
  },
  {
    question: "Can you add a composite key to an existing table?",
    shortAnswer:
      "Yes, using ALTER TABLE ADD PRIMARY KEY with multiple columns, provided they have unique combinations.",
    explanation:
      "The columns must be NOT NULL and the combination must be unique. For example: ALTER TABLE Enrollments ADD PRIMARY KEY (StudentID, CourseID);",
    hint: "Think about modifying an existing table.",
    level: "intermediate",
    codeExample: "ALTER TABLE Enrollments ADD PRIMARY KEY (StudentID, CourseID);",
  },
  {
    question: "What is the difference between a composite key and a compound key?",
    shortAnswer:
      "They are often used interchangeably. Both refer to a key made up of multiple columns.",
    explanation:
      "Some people distinguish: compound key = multiple columns that are foreign keys; composite key = any multi-column key. But in practice, they are synonyms.",
    hint: "Think about whether they are the same.",
    level: "intermediate",
  },
  {
    question: "What is a composite foreign key?",
    shortAnswer:
      "A composite foreign key is a foreign key that references a composite primary key, using the same number of columns.",
    explanation:
      "If a table has a composite primary key (col1, col2), any foreign key referencing it must also include (col1, col2).",
    hint: "Think about referencing a multi-column primary key.",
    level: "intermediate",
    codeExample: "FOREIGN KEY (col1, col2) REFERENCES parent_table(col1, col2)",
  },
  {
    question: "When is a composite key preferred over a surrogate key?",
    shortAnswer:
      "Composite keys are preferred when the combination of columns naturally represents the business rule and is stable.",
    explanation:
      "In junction tables, the composite key is often the most natural and efficient choice.",
    hint: "Think about when the business rule defines the uniqueness.",
    level: "intermediate",
  },
  {
    question: "When is a surrogate key preferred over a composite key?",
    shortAnswer:
      "A surrogate key is preferred when the composite key is large, unstable, or when simplicity is needed for framework support.",
    explanation:
      "Surrogate keys are simpler, more stable, and easier to use in queries and ORM tools.",
    hint: "Think about when you want a single, simple ID.",
    level: "intermediate",
  },
  {
    question: "Can a composite key be used as a foreign key reference?",
    shortAnswer:
      "Yes, a composite key can be referenced by a foreign key, but the foreign key must include all columns of the composite key.",
    explanation:
      "For example, if a table has a composite primary key (A, B), a referencing table must have columns (A, B) as a foreign key.",
    hint: "Think about matching all columns.",
    level: "intermediate",
  },
  {
    question: "What is the order of columns in a composite key?",
    shortAnswer:
      "The order matters for indexing and query performance. The first column is the leading column of the composite index.",
    explanation:
      "Place the most selective or most frequently queried column first in the composite key for better performance.",
    hint: "Think about which column should come first for indexing.",
    level: "expert",
  },
  {
    question: "Can a composite key contain a NULL value?",
    shortAnswer:
      "No, a composite key, like any primary key, cannot contain NULL values. All columns in the composite key must be NOT NULL.",
    explanation:
      "If any column allows NULL, it cannot guarantee uniqueness and cannot be part of a primary key.",
    hint: "Think about whether a primary key can be NULL.",
    level: "basic",
  },
  {
    question: "What is a composite key in the context of normalization?",
    shortAnswer:
      "In normalization, composite keys are used to identify dependencies and ensure tables are in correct normal forms.",
    explanation:
      "Normalization identifies candidate keys, which may be composite. Understanding composite keys is essential for 2NF and 3NF.",
    hint: "Think about how normalisation uses keys.",
    level: "expert",
  },
  {
    question: "How does a composite key affect indexing?",
    shortAnswer:
      "A composite key creates a composite index on the columns. The order of columns is crucial for query performance.",
    explanation:
      "Queries that filter on the leading column(s) can use the index efficiently. Queries that don't use the leading column may not benefit from the index.",
    hint: "Think about how multi-column indexes work.",
    level: "expert",
  },
  {
    question: "Can a composite key be used in a WHERE clause?",
    shortAnswer:
      "Yes, you can use all columns of a composite key in a WHERE clause to find a specific row.",
    explanation:
      "For example: WHERE StudentID = 101 AND CourseID = 'CS101'. The index on the composite key will be used effectively.",
    hint: "Think about searching by the whole key.",
    level: "basic",
    codeExample: "SELECT * FROM Enrollments WHERE StudentID = 101 AND CourseID = 'CS101';",
  },
  {
    question: "What is a partial dependency in relation to composite keys?",
    shortAnswer:
      "A partial dependency occurs when a non-key attribute depends on only part of a composite key, violating 2NF.",
    explanation:
      "Normalisation eliminates partial dependencies by separating into smaller tables.",
    hint: "Think about the problem of dependencies on part of a key.",
    level: "expert",
  },
  {
    question: "Can a composite key be auto-incremented?",
    shortAnswer:
      "No, auto-increment only applies to a single column. Composite keys cannot be auto-generated.",
    explanation:
      "If you need auto-generated values, use a surrogate key (single column) instead of a composite key.",
    hint: "Think about whether you can auto-increment multiple columns.",
    level: "intermediate",
  },
  {
    question: "What are the common naming conventions for composite keys?",
    shortAnswer:
      "There are no strict conventions, but names like PK_TableName_Col1_Col2 are common. Some use the column names directly.",
    explanation:
      "Clear naming helps identify the key's purpose. For example, PK_Enrollments_StudentCourse.",
    hint: "Think about naming constraints.",
    level: "intermediate",
  },
  {
    question: "Can a composite key be a candidate key but not the primary key?",
    shortAnswer:
      "Yes, a composite key can be a candidate key and then become an alternate key if not chosen as the primary key.",
    explanation:
      "If a table has multiple candidate keys, the composite one may be alternate, not primary.",
    hint: "Think about candidate keys that are not primary.",
    level: "intermediate",
  },
  {
    question: "How do you update a composite key?",
    shortAnswer:
      "Updating a composite key is generally not recommended, as it can break foreign key relationships. If necessary, use ON UPDATE CASCADE.",
    explanation:
      "It's better to use a stable surrogate key instead of a composite key that might change.",
    hint: "Think about the risks of changing a key.",
    level: "expert",
  },
  {
    question: "What is the impact of a composite key on query performance?",
    shortAnswer:
      "Composite keys can slow down queries that join on multiple columns, but they can also speed up queries that use the full key.",
    explanation:
      "The index on the composite key can be used effectively if the leading columns are used in the query filter.",
    hint: "Think about the trade-offs of multi-column indexes.",
    level: "expert",
  },
  {
    question: "Can a composite key be used with an ORM (Object-Relational Mapping)?",
    shortAnswer:
      "Yes, but many ORMs handle composite keys poorly, requiring additional configuration.",
    explanation:
      "Some ORMs (like Hibernate, Entity Framework) support composite keys, but they can be tricky to map. Surrogate keys are often simpler.",
    hint: "Think about how ORMs map tables to objects.",
    level: "expert",
  },
  {
    question: "What is the maximum number of columns in a composite key?",
    shortAnswer:
      "The maximum depends on the RDBMS. Most databases allow up to 16 or 32 columns, but it's best to keep it small.",
    explanation:
      "In practice, more than 3-4 columns is unusual and often indicates a design flaw.",
    hint: "Think about the practical limit.",
    level: "expert",
  },
  {
    question: "Can a composite key be made of columns with different data types?",
    shortAnswer:
      "Yes, columns in a composite key can have different data types (e.g., INT and VARCHAR).",
    explanation:
      "For example, (StudentID INT, CourseID VARCHAR). The data types do not need to match.",
    hint: "Think about mixing data types.",
    level: "intermediate",
  },
  {
    question: "What is a composite key vs a concatenated key?",
    shortAnswer:
      "They are often used interchangeably. A concatenated key is another name for a composite key.",
    explanation:
      "Both refer to a key made up of multiple columns, usually concatenated in some way.",
    hint: "Think about whether they are the same.",
    level: "intermediate",
  },
  {
    question: "How do you drop a composite key in SQL?",
    shortAnswer:
      "You can drop the primary key constraint using ALTER TABLE DROP PRIMARY KEY or DROP CONSTRAINT.",
    explanation:
      "For example: ALTER TABLE Enrollments DROP PRIMARY KEY; The syntax may vary by RDBMS.",
    hint: "Think about removing the primary key.",
    level: "intermediate",
    codeExample: "ALTER TABLE Enrollments DROP PRIMARY KEY;",
  },
];

export default questions;