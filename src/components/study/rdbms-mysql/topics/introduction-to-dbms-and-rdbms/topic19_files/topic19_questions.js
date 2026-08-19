/**
 * Topic 19: Candidate Key – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is a candidate key in a relational database?",
    shortAnswer:
      "A candidate key is a column or set of columns that can uniquely identify each row in a table.",
    explanation:
      "Candidate keys have two essential properties: uniqueness (no duplicate values) and irreducibility (no unnecessary columns). A table can have multiple candidate keys.",
    hint: "Think about all the columns that could serve as a unique identifier.",
    level: "basic",
  },
  {
    question: "What are the properties of a candidate key?",
    shortAnswer:
      "A candidate key must be unique (no duplicates), NOT NULL, and minimal (no unnecessary columns).",
    explanation:
      "These properties ensure that the key can reliably identify each row. If any column is removed, the key would no longer be unique.",
    hint: "Think about what makes a column a good unique identifier.",
    level: "basic",
  },
  {
    question: "What is the difference between a candidate key and a primary key?",
    shortAnswer:
      "A candidate key is a potential primary key; the primary key is the candidate key chosen to uniquely identify rows.",
    explanation:
      "A table can have multiple candidate keys, but only one is selected as the primary key. The other candidate keys become alternate keys.",
    hint: "Think about the difference between potential and actual.",
    level: "basic",
  },
  {
    question: "Can a table have multiple candidate keys?",
    shortAnswer:
      "Yes, a table can have multiple candidate keys. For example, StudentID, Email, and Phone could all be candidate keys.",
    explanation:
      "Having multiple candidate keys is common. One is chosen as the primary key; the others become alternate keys with UNIQUE constraints.",
    hint: "Think about how many columns could uniquely identify a student.",
    level: "basic",
  },
  {
    question: "What is an alternate key?",
    shortAnswer:
      "An alternate key is a candidate key that is not chosen as the primary key.",
    explanation:
      "Alternate keys still enforce uniqueness through UNIQUE constraints. They are also known as secondary keys.",
    hint: "Think about the candidate keys that are not the primary key.",
    level: "intermediate",
  },
  {
    question: "Can a candidate key be a composite key?",
    shortAnswer:
      "Yes, a candidate key can be a composite key (multiple columns) when a single column is not sufficient for uniqueness.",
    explanation:
      "Composite candidate keys are common in junction tables. For example, (StudentID, CourseID) could be a composite candidate key.",
    hint: "Think about using multiple columns to identify a row.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a candidate key and a superkey?",
    shortAnswer:
      "A superkey is any set of columns that uniquely identifies a row; a candidate key is a minimal superkey (no unnecessary columns).",
    explanation:
      "Every candidate key is a superkey, but not every superkey is a candidate key. Candidate keys have no redundant columns.",
    hint: "Think about the difference between a minimal and a non-minimal unique set.",
    level: "expert",
  },
  {
    question: "How do you choose a primary key from candidate keys?",
    shortAnswer:
      "Choose a primary key that is simple, stable, small, and preferably a surrogate key.",
    explanation:
      "Consider: single-column vs composite, stability (does it change?), size (for performance), and whether it's a natural or surrogate key.",
    hint: "Think about what makes a column a good primary key.",
    level: "intermediate",
  },
  {
    question: "What is a natural key?",
    shortAnswer:
      "A natural key is a candidate key that comes from the data itself, like SSN, email, or phone number.",
    explanation:
      "Natural keys are meaningful to the business but can change over time, making them less stable as primary keys.",
    hint: "Think about a key that has meaning in the real world.",
    level: "intermediate",
  },
  {
    question: "What is a surrogate key?",
    shortAnswer:
      "A surrogate key is a system-generated candidate key with no business meaning, usually an auto-incrementing integer.",
    explanation:
      "Surrogate keys are preferred as primary keys because they are stable, simple, and independent of business data.",
    hint: "Think about a meaningless, generated ID.",
    level: "intermediate",
  },
  {
    question: "Why are surrogate keys preferred over natural keys?",
    shortAnswer:
      "Surrogate keys are preferred because they are stable (never change), simple (single column), and independent of business rules.",
    explanation:
      "Natural keys can change (e.g., email, phone) and can be large (e.g., VARCHAR), causing performance issues.",
    hint: "Think about why you wouldn't use email as a primary key.",
    level: "intermediate",
  },
  {
    question: "Can a candidate key contain NULL values?",
    shortAnswer:
      "No, a candidate key cannot contain NULL values because it would not be able to uniquely identify rows.",
    explanation:
      "NULL represents missing data, which would violate the uniqueness requirement. This is a fundamental property of candidate keys.",
    hint: "Think about whether a unique identifier can be missing.",
    level: "basic",
  },
  {
    question: "What is the relationship between candidate keys and unique constraints?",
    shortAnswer:
      "Candidate keys are implemented as UNIQUE constraints (and NOT NULL) in the database.",
    explanation:
      "Every candidate key should have a UNIQUE constraint to enforce uniqueness. The primary key is one candidate key with special significance.",
    hint: "Think about how you enforce uniqueness in SQL.",
    level: "intermediate",
  },
  {
    question: "Can a candidate key be changed after it's created?",
    shortAnswer:
      "Technically yes, but it's not recommended. Changing a candidate key can break data integrity and relationships.",
    explanation:
      "If a candidate key is used as a primary key, changing it requires updating all foreign key references. Surrogate keys avoid this problem.",
    hint: "Think about the ripple effect of changing a student's ID.",
    level: "expert",
  },
  {
    question: "What is an example of a candidate key in a Students table?",
    shortAnswer:
      "Candidate keys in a Students table could include StudentID, Email, and Phone number.",
    explanation:
      "Each of these columns could uniquely identify a student. StudentID is a surrogate key, while Email and Phone are natural keys.",
    hint: "Think about what could uniquely identify a student.",
    level: "basic",
  },
  {
    question: "What is an example of a candidate key in a Products table?",
    shortAnswer:
      "Candidate keys in a Products table could include ProductID, SKU, and Barcode.",
    explanation:
      "Each of these columns uniquely identifies a product. ProductID is a surrogate key; SKU and Barcode are natural keys.",
    hint: "Think about what identifies a product uniquely.",
    level: "basic",
  },
  {
    question: "What is the difference between a candidate key and a foreign key?",
    shortAnswer:
      "A candidate key uniquely identifies rows in its own table; a foreign key references a candidate key (usually the primary key) in another table.",
    explanation:
      "Candidate keys are about entity integrity within a table. Foreign keys are about referential integrity between tables.",
    hint: "Think about internal identification vs. external reference.",
    level: "intermediate",
  },
  {
    question: "How many candidate keys can a table have?",
    shortAnswer:
      "There is no fixed limit. A table can have as many candidate keys as there are columns that can uniquely identify rows.",
    explanation:
      "The number depends on the data. Some tables have only one candidate key; others may have several.",
    hint: "Think about all the unique columns in a table.",
    level: "intermediate",
  },
  {
    question: "What is the process of identifying candidate keys?",
    shortAnswer:
      "Identify all columns (or combinations) that are unique and NOT NULL. Then ensure each is minimal (no redundant columns).",
    explanation:
      "This is part of database design. You examine the data and business rules to determine which columns can uniquely identify rows.",
    hint: "Think about how you would find all unique columns in a table.",
    level: "intermediate",
  },
  {
    question: "What is a minimal superkey?",
    shortAnswer:
      "A minimal superkey is a candidate key — a set of columns that uniquely identifies rows with no unnecessary columns.",
    explanation:
      "If you remove any column from the set, it no longer uniquely identifies rows. This is the 'minimal' property.",
    hint: "Think about a key with no extra columns.",
    level: "expert",
  },
  {
    question: "Why is it important to identify all candidate keys?",
    shortAnswer:
      "Identifying all candidate keys ensures data integrity, helps choose the best primary key, and uncovers all unique attributes.",
    explanation:
      "It also helps in normalisation and understanding the data model. Missing candidate keys can lead to duplicates and data inconsistencies.",
    hint: "Think about why you would want to know all ways to identify a row.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a candidate key and a unique key?",
    shortAnswer:
      "A unique key is a database constraint that enforces uniqueness. A candidate key is the conceptual column(s) that have that property.",
    explanation:
      "Every candidate key is implemented as a UNIQUE constraint (or PRIMARY KEY constraint). They are two sides of the same coin.",
    hint: "Think about the conceptual vs. the implemented.",
    level: "intermediate",
  },
  {
    question: "Can a table have no candidate keys?",
    shortAnswer:
      "No, a table must have at least one candidate key to be a valid relation in the relational model.",
    explanation:
      "If a table has no way to uniquely identify rows, it violates entity integrity and is not a proper relation.",
    hint: "Think about why every table needs a unique identifier.",
    level: "basic",
  },
  {
    question: "What is the relationship between candidate keys and normalisation?",
    shortAnswer:
      "Candidate keys are central to normalisation, as they help identify dependencies and determine normal forms.",
    explanation:
      "Normalisation involves understanding which columns depend on candidate keys. Each normal form addresses specific dependency issues.",
    hint: "Think about how candidate keys are used in normalisation.",
    level: "expert",
  },
  {
    question: "What are the common mistakes when dealing with candidate keys?",
    shortAnswer:
      "Common mistakes include: assuming only one candidate key exists, choosing a changing column as a primary key, and ignoring alternate keys.",
    explanation:
      "Always identify all candidate keys and choose the most stable, simple one as the primary key. Add UNIQUE constraints for alternate keys.",
    hint: "Think about the pitfalls in key selection.",
    level: "intermediate",
  },
  {
    question: "Can a candidate key be a column that allows NULL?",
    shortAnswer:
      "No, a candidate key cannot allow NULL values. It must be NOT NULL to uniquely identify rows.",
    explanation:
      "NULL represents unknown data. If a candidate key allowed NULL, it could not guarantee uniqueness.",
    hint: "Think about whether a missing value can identify a row.",
    level: "basic",
  },
  {
    question: "What is the difference between a candidate key and a primary key constraint?",
    shortAnswer:
      "A candidate key is a conceptual property; a primary key constraint is the database implementation that enforces it.",
    explanation:
      "The primary key constraint is the SQL statement that defines the primary key, enforcing uniqueness and NOT NULL.",
    hint: "Think about the theory vs. the practice.",
    level: "intermediate",
  },
  {
    question: "Can a candidate key be used as a foreign key?",
    shortAnswer:
      "Yes, any candidate key can be referenced by a foreign key, though it's most common to reference the primary key.",
    explanation:
      "In some designs, alternate keys are also referenced. For example, you might reference Email as a foreign key instead of StudentID.",
    hint: "Think about using a unique email to reference a student.",
    level: "intermediate",
  },
  {
    question: "What is the significance of candidate keys in database design?",
    shortAnswer:
      "Candidate keys are fundamental to entity integrity, relationship definition, and normalisation in database design.",
    explanation:
      "They ensure each row is uniquely identifiable, enable relationships through foreign keys, and guide the normalisation process.",
    hint: "Think about why candidate keys are essential for good design.",
    level: "intermediate",
  },
  {
    question: "How do you test if a column is a candidate key?",
    shortAnswer:
      "Test if the column is NOT NULL and if it has unique values. Also, ensure no subset of its columns can also uniquely identify rows.",
    explanation:
      "For composite keys, verify that the entire combination is unique and that no subset alone is unique.",
    hint: "Think about how you would verify uniqueness.",
    level: "expert",
  },
  {
    question: "What is a surrogate candidate key?",
    shortAnswer:
      "A surrogate candidate key is an artificial key created specifically to serve as a unique identifier, with no business meaning.",
    explanation:
      "Examples include AUTO_INCREMENT columns, UUIDs, and sequence-generated numbers. They are the safest choice for primary keys.",
    hint: "Think about a key that is generated by the system.",
    level: "intermediate",
  },
];

export default questions;