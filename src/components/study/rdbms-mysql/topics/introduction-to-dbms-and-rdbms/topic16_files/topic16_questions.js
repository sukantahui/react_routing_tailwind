/**
 * Topic 16: Rows (Tuples) and Columns (Attributes) – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is a row in a relational database table?",
    shortAnswer:
      "A row (tuple) is a single record in a table, representing one instance of the entity, containing values for each column.",
    explanation:
      "Rows are horizontal entries. For example, in a Students table, a row contains data for one student: StudentID, Name, Class, etc. Rows are uniquely identified by the primary key.",
    hint: "Think about a single record or entry.",
    level: "basic",
  },
  {
    question: "What is a column in a relational database table?",
    shortAnswer:
      "A column (attribute) is a vertical data field in a table, representing a specific property of the entity.",
    explanation:
      "Columns have a name and a data type. All values in a column are of the same type. For example, the 'Name' column in a Students table stores the names of all students.",
    hint: "Think about a field or property.",
    level: "basic",
  },
  {
    question: "What is the difference between a row and a column?",
    shortAnswer:
      "A row is a horizontal record (a tuple), while a column is a vertical field (an attribute). Rows represent individual instances; columns represent properties.",
    explanation:
      "Rows are the actual data entries; columns define the structure (schema). They are the two dimensions of a table.",
    hint: "Think about the difference between a record and a field.",
    level: "basic",
  },
  {
    question: "What is a tuple in relational database terminology?",
    shortAnswer:
      "A tuple is a row in a table, representing a single instance of the entity.",
    explanation:
      "The term 'tuple' comes from the relational model. It is synonymous with 'row' or 'record'.",
    hint: "Think about a record or row.",
    level: "basic",
  },
  {
    question: "What is an attribute in relational database terminology?",
    shortAnswer:
      "An attribute is a column in a table, representing a property of the entity.",
    explanation:
      "Attributes are also called 'fields' or 'columns'. They define the characteristics of the entity.",
    hint: "Think about a column or field.",
    level: "basic",
  },
  {
    question: "Are rows ordered in a table?",
    shortAnswer:
      "No, rows are unordered in the relational model. The order of rows does not affect the meaning of the data.",
    explanation:
      "Although rows may have a physical order in storage, logically they are a set. The ORDER BY clause can impose an order for query results.",
    hint: "Think about whether the sequence of records matters.",
    level: "intermediate",
  },
  {
    question: "Are columns ordered in a table?",
    shortAnswer:
      "Yes, columns have a defined order in the table schema, though this is more about structure than meaning.",
    explanation:
      "The order of columns is determined when the table is created (or altered). Queries can select columns in any order.",
    hint: "Think about the sequence of fields in a record.",
    level: "intermediate",
  },
  {
    question: "How are rows uniquely identified in a table?",
    shortAnswer:
      "Rows are uniquely identified by a primary key, which is a column (or set of columns) with unique values.",
    explanation:
      "The primary key ensures that no two rows have the same identifying value(s). This is crucial for data integrity and relationships.",
    hint: "Think about what makes each record distinct.",
    level: "basic",
  },
  {
    question: "What is the data type of a column?",
    shortAnswer:
      "A column's data type defines the kind of values it can hold (e.g., INT, VARCHAR, DATE) and the operations that can be performed on it.",
    explanation:
      "Data types enforce domain integrity. Choosing the right data type is essential for storage efficiency and correct query results.",
    hint: "Think about the kind of values a field can store.",
    level: "basic",
  },
  {
    question: "What is the degree of a table?",
    shortAnswer:
      "The degree of a table is the number of columns (attributes) it has.",
    explanation:
      "Degree is a property of the schema, not the data. It is fixed when the table is created.",
    hint: "Think about the column count.",
    level: "basic",
  },
  {
    question: "What is the cardinality of a table?",
    shortAnswer:
      "The cardinality of a table is the number of rows (tuples) it currently contains.",
    explanation:
      "Cardinality is dynamic; it changes as rows are inserted, updated, or deleted.",
    hint: "Think about the row count.",
    level: "basic",
  },
  {
    question: "Can a table have duplicate rows?",
    shortAnswer:
      "In a properly designed relational table, duplicate rows are not allowed because they would violate the primary key or unique constraint.",
    explanation:
      "The relational model requires uniqueness. If duplicates are allowed, the table is not a relation in the strict mathematical sense.",
    hint: "Think about why you need a primary key.",
    level: "intermediate",
  },
  {
    question: "What is the significance of the row count vs. column count?",
    shortAnswer:
      "The row count (cardinality) represents the number of instances; the column count (degree) represents the number of properties.",
    explanation:
      "Both are important for understanding the table's size and structure. Row count affects performance; column count affects storage and design.",
    hint: "Think about how many instances vs. how many attributes.",
    level: "intermediate",
  },
  {
    question: "What is a composite key and how does it relate to rows?",
    shortAnswer:
      "A composite key is a primary key made up of two or more columns, used when a single column is not sufficient to uniquely identify a row.",
    explanation:
      "For example, in an Enrollments table, the combination of StudentID and CourseID can serve as a composite primary key.",
    hint: "Think about using multiple fields to identify a record.",
    level: "intermediate",
  },
  {
    question: "What is the `NULL` value and how does it affect rows and columns?",
    shortAnswer:
      "`NULL` represents missing or unknown data. It can be stored in any column that is not defined as `NOT NULL`. It affects queries and comparisons.",
    explanation:
      "`NULL` is not a value; it's a marker for the absence of a value. Operations involving `NULL` require special handling.",
    hint: "Think about what you put in a cell when information is not available.",
    level: "intermediate",
  },
  {
    question: "What is the effect of the `NOT NULL` constraint on a column?",
    shortAnswer:
      "The `NOT NULL` constraint ensures that a column cannot contain `NULL` values, meaning data must be provided for every row.",
    explanation:
      "This enforces business rules. For example, a StudentID should never be `NULL`.",
    hint: "Think about columns that must always have a value.",
    level: "basic",
  },
  {
    question: "What is the `UNIQUE` constraint on a column?",
    shortAnswer:
      "The `UNIQUE` constraint ensures that all values in a column are distinct, preventing duplicates in that column.",
    explanation:
      "A table can have multiple `UNIQUE` constraints. Unlike a primary key, a `UNIQUE` column can accept one `NULL` value (in most DBMS).",
    hint: "Think about columns that must be unique but not be the primary key.",
    level: "intermediate",
  },
  {
    question: "What is the `CHECK` constraint on a column?",
    shortAnswer:
      "The `CHECK` constraint validates data based on a condition, ensuring that only valid values are stored in the column.",
    explanation:
      "For example, `CHECK (Age >= 18)` ensures that only adults are entered. It enforces domain integrity at the column level.",
    hint: "Think about rules like 'marks must be between 0 and 100'.",
    level: "intermediate",
  },
  {
    question: "How does the choice of data type affect a column's storage?",
    shortAnswer:
      "Choosing appropriate data types reduces storage space and improves query performance. For example, using `TINYINT` instead of `INT` for a small range saves bytes.",
    explanation:
      "Different data types have different storage requirements. Also, using `VARCHAR` instead of `CHAR` can save space for variable-length strings.",
    hint: "Think about why you wouldn't use VARCHAR(1000) for a 5-character field.",
    level: "expert",
  },
  {
    question: "What is the difference between a row and a tuple in practice?",
    shortAnswer:
      "In practice, they are used interchangeably. 'Tuple' is the formal term in the relational model; 'row' is the common SQL term.",
    explanation:
      "Both refer to a single record in a table.",
    hint: "Think about formal vs. practical terminology.",
    level: "basic",
  },
  {
    question: "What is the difference between a column and an attribute?",
    shortAnswer:
      "They are synonyms. 'Attribute' is the formal term in the relational model; 'column' is the SQL term.",
    explanation:
      "Both refer to a field in a table.",
    hint: "Think about formal vs. practical terminology.",
    level: "basic",
  },
  {
    question: "How do rows and columns together form a table?",
    shortAnswer:
      "Rows and columns are the two dimensions of a table. Columns define the structure (schema), and rows provide the actual data.",
    explanation:
      "The intersection of a row and a column is a cell containing a single value.",
    hint: "Think about a grid with rows and columns.",
    level: "basic",
  },
  {
    question: "What is the significance of row order in query results?",
    shortAnswer:
      "The order of rows in query results is determined by the ORDER BY clause. Without it, the order is undefined (but often follows insertion order).",
    explanation:
      "You should never rely on the natural order of rows; always use ORDER BY if a specific order is needed.",
    hint: "Think about how you can control the order of displayed records.",
    level: "intermediate",
  },
  {
    question: "Can a column be dropped from a table?",
    shortAnswer:
      "Yes, using the `ALTER TABLE DROP COLUMN` statement. This removes the column and its data from the table.",
    explanation:
      "This is a DDL operation and should be done with caution, as it permanently removes data.",
    hint: "Think about removing a field from the schema.",
    level: "intermediate",
    codeExample: "ALTER TABLE Students DROP COLUMN City;",
  },
  {
    question: "Can a new column be added to an existing table?",
    shortAnswer:
      "Yes, using `ALTER TABLE ADD COLUMN`. The new column is added to the schema, and existing rows will have `NULL` (or a default value) for that column.",
    explanation:
      "This is a common DDL operation. In some databases, adding a column can be expensive for large tables.",
    hint: "Think about adding a new field to an existing record.",
    level: "intermediate",
    codeExample: "ALTER TABLE Students ADD COLUMN Email VARCHAR(100);",
  },
  {
    question: "What is the impact of a large number of columns on performance?",
    shortAnswer:
      "Having many columns can increase storage and query complexity. It may also slow down operations if many columns are selected.",
    explanation:
      "Wide tables (many columns) can affect I/O and caching. It's often better to split large tables into smaller, related tables (normalisation).",
    hint: "Think about why you wouldn't have 100 columns in one table.",
    level: "expert",
  },
  {
    question: "What is the impact of a large number of rows on performance?",
    shortAnswer:
      "A large number of rows increases query time if indexes are not used. Proper indexing and partition strategies are needed for very large tables.",
    explanation:
      "Indexes speed up queries on large tables. Without indexes, the database must scan the entire table (full table scan).",
    hint: "Think about why you need indexes on a large table.",
    level: "intermediate",
  },
  {
    question: "How do rows and columns relate to the concept of data independence?",
    shortAnswer:
      "Data independence allows changes to the structure (columns) without affecting applications (logical independence) and changes to storage without affecting queries (physical independence).",
    explanation:
      "Adding or dropping columns (schema changes) should not break applications that use the table, provided they use standard SQL. This is a key benefit of the relational model.",
    hint: "Think about adding a new column without breaking existing code.",
    level: "expert",
  },
  {
    question: "What is the difference between a row and a record in SQL?",
    shortAnswer:
      "They are interchangeable. 'Row' is the SQL term; 'record' is a more general term used in databases and programming.",
    explanation:
      "Both refer to a single entry in a table.",
    hint: "Think about different words for the same thing.",
    level: "basic",
  },
  {
    question: "How do you insert a new row into a table?",
    shortAnswer:
      "Use the `INSERT INTO` statement to add a new row. You must provide values for all non-nullable columns (or specify default values).",
    explanation:
      "Example: `INSERT INTO Students (StudentID, Name, Class) VALUES (106, 'Amit', 10);`",
    hint: "Think about adding a new record.",
    level: "basic",
    codeExample: "INSERT INTO Students (StudentID, Name, Class) VALUES (106, 'Amit', 10);",
  },
  {
    question: "How do you delete a row from a table?",
    shortAnswer:
      "Use the `DELETE FROM` statement to remove rows. Be careful to include a WHERE clause to specify which rows to delete.",
    explanation:
      "Example: `DELETE FROM Students WHERE StudentID = 106;` Without a WHERE clause, all rows are deleted.",
    hint: "Think about removing a record.",
    level: "basic",
    codeExample: "DELETE FROM Students WHERE StudentID = 106;",
  },
];

export default questions;