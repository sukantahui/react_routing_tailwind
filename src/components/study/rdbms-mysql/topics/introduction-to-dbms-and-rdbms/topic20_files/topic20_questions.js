/**
 * Topic 20: Alternate Key – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is an alternate key in a relational database?",
    shortAnswer:
      "An alternate key is a candidate key that is not chosen as the primary key. It is unique and NOT NULL.",
    explanation:
      "Alternate keys are still enforced by UNIQUE constraints to ensure data integrity. They can be used for searching and referencing.",
    hint: "Think about the candidate keys that are not the primary key.",
    level: "basic",
  },
  {
    question: "How is an alternate key different from a primary key?",
    shortAnswer:
      "A primary key is the chosen candidate key; an alternate key is a candidate key not chosen as primary.",
    explanation:
      "Both are unique and NOT NULL. The primary key is used for relationships and is the default identifier.",
    hint: "Think about the difference between chosen and not chosen.",
    level: "basic",
  },
  {
    question: "What is another name for an alternate key?",
    shortAnswer:
      "Alternate keys are also called secondary keys.",
    explanation:
      "They are secondary in the sense that they are not the primary identifier, but they are still essential for data integrity.",
    hint: "Think about a term meaning 'second'.",
    level: "intermediate",
  },
  {
    question: "How do you enforce an alternate key in SQL?",
    shortAnswer:
      "Alternate keys are enforced using UNIQUE constraints.",
    explanation:
      "You can add a UNIQUE constraint to a column or a set of columns. This ensures no duplicate values are entered.",
    hint: "Think about the constraint that enforces uniqueness.",
    level: "basic",
    codeExample: "CREATE TABLE Students (StudentID INT PRIMARY KEY, Email VARCHAR(100) UNIQUE);",
  },
  {
    question: "Can a table have multiple alternate keys?",
    shortAnswer:
      "Yes, a table can have multiple alternate keys, as long as each is unique and NOT NULL.",
    explanation:
      "For example, a Students table could have both Email and Phone as alternate keys, each with a UNIQUE constraint.",
    hint: "Think about how many unique columns a table can have.",
    level: "basic",
  },
  {
    question: "Can an alternate key contain NULL values?",
    shortAnswer:
      "No, an alternate key cannot contain NULL values because it is a candidate key, which must be NOT NULL.",
    explanation:
      "If a column can be NULL, it cannot guarantee uniqueness, so it cannot be a candidate key.",
    hint: "Think about whether a unique identifier can be missing.",
    level: "basic",
  },
  {
    question: "What is the relationship between candidate keys and alternate keys?",
    shortAnswer:
      "Alternate keys are a subset of candidate keys — all candidate keys except the primary key are alternate keys.",
    explanation:
      "If a table has 3 candidate keys, one is chosen as the primary key, and the other 2 become alternate keys.",
    hint: "Think about the set of candidate keys.",
    level: "intermediate",
  },
  {
    question: "Why are alternate keys important?",
    shortAnswer:
      "Alternate keys ensure data integrity by enforcing uniqueness on important business attributes.",
    explanation:
      "They also provide alternative ways to search for records and can be referenced by foreign keys.",
    hint: "Think about why you would want to enforce uniqueness on email.",
    level: "intermediate",
  },
  {
    question: "Can an alternate key be a composite key?",
    shortAnswer:
      "Yes, an alternate key can be a composite key (multiple columns) if that combination is unique.",
    explanation:
      "For example, a combination of (First_Name, Last_Name, DOB) could be an alternate key.",
    hint: "Think about using multiple columns to ensure uniqueness.",
    level: "intermediate",
  },
  {
    question: "What is the difference between an alternate key and a unique key constraint?",
    shortAnswer:
      "An alternate key is the conceptual column(s) that could be a primary key; a unique key constraint is the implementation.",
    explanation:
      "In practice, you create a UNIQUE constraint to enforce an alternate key.",
    hint: "Think about theory vs. practice.",
    level: "intermediate",
  },
  {
    question: "Can an alternate key be used as a foreign key?",
    shortAnswer:
      "Yes, an alternate key can be referenced by a foreign key, though it's less common than referencing the primary key.",
    explanation:
      "For example, you could reference Email instead of StudentID in a foreign key relationship.",
    hint: "Think about using email to link tables.",
    level: "intermediate",
  },
  {
    question: "What happens if you try to insert a duplicate value in an alternate key?",
    shortAnswer:
      "The database will reject the insert and throw a uniqueness violation error.",
    explanation:
      "The UNIQUE constraint prevents duplicates, ensuring data integrity.",
    hint: "Think about the error you get when you try to insert a duplicate email.",
    level: "basic",
  },
  {
    question: "How do you choose which candidate key becomes the primary key vs. alternate keys?",
    shortAnswer:
      "Choose the most stable, simple, and small candidate key as the primary key. The others become alternate keys.",
    explanation:
      "Surrogate keys are preferred as primary keys. Natural keys like email become alternate keys.",
    hint: "Think about the qualities of a good primary key.",
    level: "intermediate",
  },
  {
    question: "Can a primary key be changed to an alternate key?",
    shortAnswer:
      "Yes, you can change the primary key by dropping the primary key constraint and creating a new one on a different column.",
    explanation:
      "The old primary key becomes an alternate key (with a UNIQUE constraint) if it still needs to be unique.",
    hint: "Think about making a different column the primary key.",
    level: "expert",
  },
  {
    question: "What is the significance of naming UNIQUE constraints for alternate keys?",
    shortAnswer:
      "Naming constraints helps with debugging, maintenance, and clarity.",
    explanation:
      "A descriptive name like UQ_Students_Email clearly indicates which column is unique and why.",
    hint: "Think about why you would name constraints.",
    level: "intermediate",
  },
  {
    question: "Are alternate keys automatically indexed?",
    shortAnswer:
      "In most RDBMS, UNIQUE constraints create an index automatically to enforce uniqueness and speed up searches.",
    explanation:
      "The index is often a B-tree index. This helps queries on alternate keys perform well.",
    hint: "Think about whether the database optimises alternate keys.",
    level: "intermediate",
  },
  {
    question: "Can an alternate key be NULL if it's not a candidate key?",
    shortAnswer:
      "If a column is not a candidate key, it can allow NULL. But if it's designated as an alternate key, it cannot.",
    explanation:
      "Alternate keys are a subset of candidate keys, so they must be NOT NULL.",
    hint: "Think about whether alternate keys must be NOT NULL.",
    level: "intermediate",
  },
  {
    question: "What is the difference between an alternate key and a unique index?",
    shortAnswer:
      "An alternate key is a logical constraint; a unique index is a physical structure that can enforce uniqueness.",
    explanation:
      "A UNIQUE constraint creates a unique index. You can also create a unique index without the constraint, but it's less common.",
    hint: "Think about the difference between logical and physical.",
    level: "expert",
  },
  {
    question: "Can an alternate key be added to an existing table?",
    shortAnswer:
      "Yes, you can add a UNIQUE constraint to an existing column to make it an alternate key, provided there are no duplicates.",
    explanation:
      "Use ALTER TABLE ADD CONSTRAINT UNIQUE to add the constraint.",
    hint: "Think about modifying an existing table.",
    level: "intermediate",
    codeExample: "ALTER TABLE Students ADD CONSTRAINT UQ_Students_Email UNIQUE (Email);",
  },
  {
    question: "What are the common uses of alternate keys?",
    shortAnswer:
      "Alternate keys are used for searching, enforcing business uniqueness, and sometimes for foreign key references.",
    explanation:
      "For example, users might search by email, and you need to ensure email is unique. You might also reference email in another table.",
    hint: "Think about why you would use a column other than the primary key.",
    level: "intermediate",
  },
  {
    question: "Can alternate keys help with data cleansing?",
    shortAnswer:
      "Yes, alternate keys help identify duplicates during data cleansing, ensuring only unique records are kept.",
    explanation:
      "By enforcing uniqueness on alternate keys, you prevent duplicates from entering the system.",
    hint: "Think about how unique constraints prevent duplicates.",
    level: "intermediate",
  },
  {
    question: "What is the relationship between alternate keys and normalisation?",
    shortAnswer:
      "Alternate keys are part of normalisation, as they help identify dependencies and candidate keys.",
    explanation:
      "Normalisation involves identifying all candidate keys, which become either primary or alternate keys.",
    hint: "Think about how normalisation uses candidate keys.",
    level: "expert",
  },
  {
    question: "Can a table have only a primary key and no alternate keys?",
    shortAnswer:
      "Yes, a table can have only one candidate key (the primary key) and no alternate keys.",
    explanation:
      "This is common when the primary key is the only column that can uniquely identify rows.",
    hint: "Think about tables where only one column is unique.",
    level: "basic",
  },
  {
    question: "What is the difference between an alternate key and a foreign key?",
    shortAnswer:
      "An alternate key is a unique column within a table; a foreign key references a primary (or alternate) key in another table.",
    explanation:
      "Alternate keys are about internal uniqueness; foreign keys are about relationships between tables.",
    hint: "Think about internal vs. external reference.",
    level: "intermediate",
  },
  {
    question: "Can an alternate key be used in a WHERE clause for efficient searching?",
    shortAnswer:
      "Yes, because alternate keys are often indexed, queries using them in WHERE clauses are fast.",
    explanation:
      "For example, 'SELECT * FROM Students WHERE Email = 's@email.com'' will use the index on Email.",
    hint: "Think about why searching by email is fast.",
    level: "basic",
  },
  {
    question: "What are the risks of not enforcing alternate keys?",
    shortAnswer:
      "Not enforcing alternate keys can lead to duplicate data, inconsistent records, and poor data quality.",
    explanation:
      "For example, duplicate emails could cause communication errors and inaccurate reporting.",
    hint: "Think about the consequences of duplicate emails.",
    level: "intermediate",
  },
  {
    question: "Can an alternate key be part of a composite primary key?",
    shortAnswer:
      "No, an alternate key is a candidate key not chosen as primary. If it's part of the primary key, it's not an alternate key.",
    explanation:
      "The primary key is chosen from the candidate keys. The other candidate keys become alternate keys.",
    hint: "Think about the relationship between candidate and primary keys.",
    level: "intermediate",
  },
  {
    question: "What is the role of alternate keys in data warehousing?",
    shortAnswer:
      "In data warehousing, alternate keys (also called natural keys) are often kept as attributes to maintain business context.",
    explanation:
      "They help trace data back to source systems and provide natural identifiers for reporting.",
    hint: "Think about how business identifiers are used in reporting.",
    level: "expert",
  },
  {
    question: "Can alternate keys be dropped from a table?",
    shortAnswer:
      "Yes, you can drop a UNIQUE constraint, which removes the alternate key.",
    explanation:
      "Use ALTER TABLE DROP CONSTRAINT to remove the constraint. This may allow duplicate values unless other constraints exist.",
    hint: "Think about removing a uniqueness constraint.",
    level: "intermediate",
  },
  {
    question: "How do alternate keys affect performance?",
    shortAnswer:
      "Alternate keys can improve search performance (due to indexes) but add overhead to write operations (index maintenance).",
    explanation:
      "The trade-off is usually worth it for the data integrity and search benefits.",
    hint: "Think about the cost of maintaining unique indexes.",
    level: "expert",
  },
  {
    question: "What is the difference between a unique constraint and a unique index in enforcing alternate keys?",
    shortAnswer:
      "A unique constraint is a declarative rule; a unique index is a physical structure. Both enforce uniqueness.",
    explanation:
      "Creating a UNIQUE constraint creates a unique index. Creating a unique index also enforces uniqueness, but it's considered a performance optimisation.",
    hint: "Think about the difference between a rule and a structure.",
    level: "expert",
  },
];

export default questions;