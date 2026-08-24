/**
 * Topic 17: Domains and Data Types – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is a domain in the context of a relational database?",
    shortAnswer:
      "A domain is the set of all allowable values for a column (attribute), defining the semantic constraints on the data.",
    explanation:
      "A domain specifies what values are valid for a column. For example, the domain for 'marks' might be integers from 0 to 100. Domains are enforced through data types and constraints.",
    hint: "Think about the range of valid values for a column.",
    level: "basic",
  },
  {
    question: "What is a data type in a relational database?",
    shortAnswer:
      "A data type defines the physical characteristics of a column: storage format, size, and the operations that can be performed on it.",
    explanation:
      "Data types include INT, VARCHAR, DATE, BOOLEAN, etc. They determine how data is stored and how it can be used in queries.",
    hint: "Think about the kind of data a column can hold.",
    level: "basic",
  },
  {
    question: "What is the difference between a domain and a data type?",
    shortAnswer:
      "A domain is a semantic constraint (allowed values), while a data type is a physical constraint (storage and operations).",
    explanation:
      "The domain is the business rule (e.g., marks 0-100). The data type is how it's stored (e.g., INT). They work together to enforce data integrity.",
    hint: "Think about the difference between what values are allowed vs. how they are stored.",
    level: "intermediate",
  },
  {
    question: "What are the common data types in SQL?",
    shortAnswer:
      "Common data types include: INT (integer), VARCHAR (variable text), CHAR (fixed text), DATE, TIME, DATETIME, BOOLEAN, DECIMAL (exact number), FLOAT (approximate number), and BLOB (binary large object).",
    explanation:
      "Different databases have slightly different data types, but these are the most common across all RDBMS.",
    hint: "Think about the types of data you might store in a database.",
    level: "basic",
  },
  {
    question: "What is the difference between CHAR and VARCHAR?",
    shortAnswer:
      "CHAR is a fixed-length string (padded with spaces), while VARCHAR is a variable-length string (storage depends on actual length).",
    explanation:
      "CHAR is better for short, fixed-length data (e.g., 'M', 'F'). VARCHAR is better for variable-length data (e.g., names, addresses). VARCHAR saves storage for shorter values.",
    hint: "Think about the difference between fixed and variable length.",
    level: "intermediate",
  },
  {
    question: "What is the difference between DECIMAL and FLOAT?",
    shortAnswer:
      "DECIMAL is a fixed-point (exact) numeric type, while FLOAT is a floating-point (approximate) numeric type.",
    explanation:
      "DECIMAL is used for precise values like money (no rounding errors). FLOAT is used for scientific calculations where slight rounding is acceptable.",
    hint: "Think about when you need exact vs. approximate values.",
    level: "intermediate",
  },
  {
    question: "What is the INT data type used for?",
    shortAnswer:
      "INT is used for storing whole numbers (integers) in a range of -2,147,483,648 to 2,147,483,647.",
    explanation:
      "It's the most common data type for IDs, counts, and any numeric value that doesn't have decimal places. It uses 4 bytes of storage.",
    hint: "Think about counting or identifying numbers.",
    level: "basic",
  },
  {
    question: "What is the DATE data type used for?",
    shortAnswer:
      "DATE is used for storing date values (year, month, day) in the format YYYY-MM-DD.",
    explanation:
      "It allows date arithmetic (e.g., calculating age). It doesn't include time information.",
    hint: "Think about storing a date without time.",
    level: "basic",
  },
  {
    question: "What is the DATETIME data type used for?",
    shortAnswer:
      "DATETIME is used for storing both date and time values, typically in the format YYYY-MM-DD HH:MM:SS.",
    explanation:
      "It's used for timestamps, such as order dates with exact times.",
    hint: "Think about storing both date and time.",
    level: "basic",
  },
  {
    question: "What is the BOOLEAN data type used for?",
    shortAnswer:
      "BOOLEAN is used for storing TRUE or FALSE values.",
    explanation:
      "It's used for flags and conditions, e.g., is_active, is_deleted, etc. Some databases use TINYINT(1) or BIT as alternatives.",
    hint: "Think about storing true/false values.",
    level: "basic",
  },
  {
    question: "What is the BLOB data type used for?",
    shortAnswer:
      "BLOB (Binary Large Object) is used for storing large binary data like images, videos, or files.",
    explanation:
      "BLOB data is stored as binary strings. It's suitable for storing files, but consider whether you want to store files in the database or on the file system.",
    hint: "Think about storing images or files.",
    level: "intermediate",
  },
  {
    question: "What is the TEXT data type used for?",
    shortAnswer:
      "TEXT is used for storing large amounts of text data, such as articles, descriptions, or JSON.",
    explanation:
      "TEXT can store up to 65,535 characters (or more in some databases). It's suitable for long text fields.",
    hint: "Think about storing long paragraphs or content.",
    level: "intermediate",
  },
  {
    question: "What is the difference between VARCHAR and TEXT?",
    shortAnswer:
      "VARCHAR has a maximum length (e.g., 255) and is stored as a variable-length string. TEXT can store larger amounts of text (up to 65,535+ bytes).",
    explanation:
      "VARCHAR is better for shorter text fields. TEXT is better for longer content, but it may have performance implications for indexing and sorting.",
    hint: "Think about the size of the text you need to store.",
    level: "intermediate",
  },
  {
    question: "Why is choosing the right data type important?",
    shortAnswer:
      "Choosing the right data type optimises storage, improves performance, ensures data integrity, and prevents errors.",
    explanation:
      "Incorrect data types can lead to wasted space, slow queries, and data corruption. They also make it harder to enforce business rules.",
    hint: "Think about the consequences of using the wrong data type.",
    level: "intermediate",
  },
  {
    question: "How do data types affect indexing performance?",
    shortAnswer:
      "Smaller data types produce smaller indexes, which are faster to search. Also, appropriate data types enable efficient comparison operations.",
    explanation:
      "For example, indexing a VARCHAR(255) column is less efficient than indexing a CHAR(10) column. Numeric indexes are generally faster than string indexes.",
    hint: "Think about why smaller indexes are faster.",
    level: "expert",
  },
  {
    question: "What is the `ENUM` data type and when is it useful?",
    shortAnswer:
      "`ENUM` is a string data type that restricts values to a predefined list (e.g., 'M', 'F', 'O').",
    explanation:
      "It's useful for columns with a small, fixed set of values. It's more efficient than VARCHAR with a CHECK constraint.",
    hint: "Think about columns like gender or status.",
    level: "intermediate",
  },
  {
    question: "What is the `JSON` data type in modern databases?",
    shortAnswer:
      "The `JSON` data type allows storing and querying JSON (JavaScript Object Notation) data directly in the database.",
    explanation:
      "It's useful for flexible, semi-structured data and is supported by databases like PostgreSQL and MySQL. You can query JSON fields using JSON functions.",
    hint: "Think about storing structured documents.",
    level: "expert",
  },
  {
    question: "What is the difference between `CHAR` and `VARCHAR` in terms of storage?",
    shortAnswer:
      "CHAR always uses the full allocated space (n bytes), while VARCHAR uses space only for the actual data plus 1-2 bytes overhead.",
    explanation:
      "For example, CHAR(10) always uses 10 bytes. VARCHAR(10) for a 5-character string uses 5 or 6 bytes (depending on overhead).",
    hint: "Think about fixed vs. variable storage.",
    level: "intermediate",
  },
  {
    question: "What is the significance of `NULL` in relation to data types?",
    shortAnswer:
      "`NULL` represents the absence of a value and can be stored in any data type (unless the column is defined as `NOT NULL`).",
    explanation:
      "`NULL` is not a value but a marker. It affects how queries behave and requires special handling (e.g., `IS NULL` comparisons).",
    hint: "Think about what goes in a cell when data is not available.",
    level: "intermediate",
  },
  {
    question: "What are some common mistakes when choosing data types?",
    shortAnswer:
      "Common mistakes include: using VARCHAR for numbers, using FLOAT for money, using CHAR for variable-length data, and not considering NULL constraints.",
    explanation:
      "These mistakes lead to wasted storage, rounding errors, or data integrity issues.",
    hint: "Think about why you shouldn't store phone numbers as INT.",
    level: "intermediate",
  },
  {
    question: "What is the difference between `TIMESTAMP` and `DATETIME`?",
    shortAnswer:
      "`TIMESTAMP` stores date and time with timezone awareness and is limited to a smaller range (1970-2038). `DATETIME` stores date and time without timezone and has a larger range.",
    explanation:
      "`TIMESTAMP` is automatically converted to UTC for storage and is useful for tracking when events occurred. `DATETIME` is storage for absolute date/time values.",
    hint: "Think about time zone handling.",
    level: "expert",
  },
  {
    question: "What is the `DECIMAL(p,s)` data type?",
    shortAnswer:
      "`DECIMAL(p,s)` is a fixed-point numeric type with precision p (total digits) and scale s (digits after the decimal point).",
    explanation:
      "For example, `DECIMAL(10,2)` can store numbers up to 99,999,999.99. It's used for exact numeric values like money.",
    hint: "Think about storing monetary values.",
    level: "intermediate",
  },
  {
    question: "What is the `YEAR` data type used for?",
    shortAnswer:
      "The `YEAR` data type stores year values in a 4-digit format (e.g., 2024).",
    explanation:
      "It's used when you only need the year and want to save storage (1 byte).",
    hint: "Think about storing only the year.",
    level: "basic",
  },
  {
    question: "How do data types affect query performance?",
    shortAnswer:
      "Data types affect performance through storage size, indexing efficiency, and the cost of type conversion during operations.",
    explanation:
      "Using smaller data types can reduce I/O and memory usage. Also, using appropriate types avoids implicit conversions, which can be expensive.",
    hint: "Think about why VARCHAR(255) for a 10-character field is inefficient.",
    level: "expert",
  },
  {
    question: "What is the `BINARY` data type?",
    shortAnswer:
      "`BINARY` is a fixed-length binary string type, used for storing binary data like hashes or encrypted values.",
    explanation:
      "It's similar to CHAR but for binary data. It uses one byte per character.",
    hint: "Think about storing binary data.",
    level: "intermediate",
  },
  {
    question: "What is the `VARBINARY` data type?",
    shortAnswer:
      "`VARBINARY` is a variable-length binary string type, used for storing binary data with varying lengths.",
    explanation:
      "It's like VARCHAR but for binary data. It's used for storing hashes, encrypted data, or other binary content.",
    hint: "Think about variable-length binary data.",
    level: "intermediate",
  },
  {
    question: "What is the difference between `CHAR` and `BINARY`?",
    shortAnswer:
      "`CHAR` stores text (character string) with character set and collation; `BINARY` stores bytes without character set interpretation.",
    explanation:
      "`BINARY` is for raw binary data. `CHAR` is for text that needs to be searchable and comparable based on language rules.",
    hint: "Think about text vs. raw bytes.",
    level: "expert",
  },
  {
    question: "What are the space considerations when choosing data types?",
    shortAnswer:
      "Choosing smaller data types reduces storage requirements, which lowers costs and improves I/O performance.",
    explanation:
      "For example, using TINYINT (1 byte) instead of INT (4 bytes) for a small range of values saves significant space in a large table.",
    hint: "Think about why you would use TINYINT instead of INT.",
    level: "intermediate",
  },
  {
    question: "What is the role of domains in database design?",
    shortAnswer:
      "Domains enforce business rules at the database level, ensuring data quality and consistency.",
    explanation:
      "By defining domains, you ensure that all data in a column follows the same rules, reducing the risk of errors and inconsistencies.",
    hint: "Think about why you would define a domain for marks (0-100).",
    level: "intermediate",
  },
  {
    question: "How do you enforce a domain constraint in SQL?",
    shortAnswer:
      "Domain constraints can be enforced using `CHECK` constraints, `ENUM` types, or by defining the domain in the schema.",
    explanation:
      "For example, `CHECK (Marks BETWEEN 0 AND 100)` enforces the domain rule that marks must be in the range 0-100.",
    hint: "Think about SQL code to restrict values.",
    level: "intermediate",
  },
  {
    question: "What is the `SERIAL` or `AUTO_INCREMENT` data type?",
    shortAnswer:
      "`SERIAL` (PostgreSQL) and `AUTO_INCREMENT` (MySQL) are special data types that generate unique sequential integers automatically for each new row.",
    explanation:
      "They are commonly used for surrogate primary keys. The database automatically assigns the next value in the sequence when a row is inserted.",
    hint: "Think about automatically generated IDs.",
    level: "intermediate",
  },
];

export default questions;