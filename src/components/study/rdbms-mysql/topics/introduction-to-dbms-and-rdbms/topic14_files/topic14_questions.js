/**
 * Topic 14: Relational Model by E.F. Codd – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "Who introduced the relational model and when?",
    shortAnswer:
      "Dr. Edgar F. Codd introduced the relational model in his 1970 paper 'A Relational Model of Data for Large Shared Data Banks'.",
    explanation:
      "Codd, a British computer scientist at IBM, proposed organising data in tables (relations) using set theory. This was a radical departure from hierarchical and network models.",
    hint: "Think about the IBM researcher who changed database history.",
    level: "basic",
  },
  {
    question: "What is the relational model?",
    shortAnswer:
      "The relational model is a database model that organises data into tables (relations) with rows (tuples) and columns (attributes), using keys to establish relationships.",
    explanation:
      "Based on set theory and predicate logic, the relational model provides a formal foundation for data management, enabling data independence and powerful querying.",
    hint: "Think about how data is organised in tables with relationships.",
    level: "basic",
  },
  {
    question: "What are the core components of the relational model?",
    shortAnswer:
      "The core components are relations (tables), tuples (rows), attributes (columns), domains (data types), and keys (primary and foreign).",
    explanation:
      "Relations are sets of tuples. Each tuple has attributes with values from defined domains. Keys uniquely identify tuples and establish relationships.",
    hint: "Think about the structure of a database table and its parts.",
    level: "basic",
  },
  {
    question: "What is a relation in the relational model?",
    shortAnswer:
      "A relation is a table that stores data in rows and columns, representing an entity (e.g., Students, Courses).",
    explanation:
      "Relations are the fundamental data structure in the relational model. They have a fixed set of attributes and contain a set of tuples (rows).",
    hint: "Think about a table in a database.",
    level: "basic",
  },
  {
    question: "What is a tuple in the relational model?",
    shortAnswer:
      "A tuple is a single row in a relation, representing one instance of an entity.",
    explanation:
      "Tuples contain values for each attribute in the relation. They are the individual records in a table.",
    hint: "Think about a row in a table.",
    level: "basic",
  },
  {
    question: "What is an attribute in the relational model?",
    shortAnswer:
      "An attribute is a column in a relation, defining a property of the entity.",
    explanation:
      "Attributes have names and data types. They represent the characteristics of the entity (e.g., StudentID, Name).",
    hint: "Think about a column in a table.",
    level: "basic",
  },
  {
    question: "What is a domain in the relational model?",
    shortAnswer:
      "A domain is the set of allowed values for an attribute, defined by its data type and constraints.",
    explanation:
      "For example, the domain of a 'StudentID' might be integers between 1 and 9999. Domains ensure data validity.",
    hint: "Think about the range of valid values for a column.",
    level: "intermediate",
  },
  {
    question: "What are Codd's 12 rules?",
    shortAnswer:
      "Codd's 12 rules (numbered 0-12) define what a fully relational DBMS should support, covering data representation, integrity, and querying.",
    explanation:
      "Rules include information representation as tables, guaranteed access via keys, systematic null handling, and SQL support. No commercial RDBMS fully complies.",
    hint: "Think about the criteria for an ideal relational database.",
    level: "intermediate",
  },
  {
    question: "What is normalisation and why is it important?",
    shortAnswer:
      "Normalisation is the process of organising data to reduce redundancy and improve integrity, using normal forms (1NF, 2NF, 3NF, BCNF).",
    explanation:
      "Normalisation eliminates duplicate data and prevents update anomalies. It's a key advantage of the relational model.",
    hint: "Think about why you wouldn't store the same data in multiple places.",
    level: "intermediate",
  },
  {
    question: "What are the normal forms in the relational model?",
    shortAnswer:
      "The normal forms are progressive levels of normalisation: 1NF (no repeating groups), 2NF (no partial dependencies), 3NF (no transitive dependencies), and BCNF (stronger version of 3NF).",
    explanation:
      "Most practical applications aim for 3NF or BCNF. Higher normal forms (4NF, 5NF) are used in specialised scenarios.",
    hint: "Think about the rules for organising data efficiently.",
    level: "intermediate",
  },
  {
    question: "What is relational algebra?",
    shortAnswer:
      "Relational algebra is a formal set of operations (SELECT, PROJECT, JOIN, UNION, INTERSECT, DIFFERENCE) on relations.",
    explanation:
      "It provides the theoretical foundation for SQL queries. Each operation takes one or more relations and produces a new relation.",
    hint: "Think about the mathematical operations on tables.",
    level: "expert",
  },
  {
    question: "What is the SELECT operation in relational algebra?",
    shortAnswer:
      "SELECT (σ) filters rows from a relation based on a condition, producing a subset of tuples.",
    explanation:
      "For example, σ(StudentID > 100)(Students) returns only students with ID > 100. It corresponds to the WHERE clause in SQL.",
    hint: "Think about filtering rows in a table.",
    level: "intermediate",
  },
  {
    question: "What is the PROJECT operation in relational algebra?",
    shortAnswer:
      "PROJECT (π) chooses specific columns from a relation, producing a relation with only those attributes.",
    explanation:
      "For example, π(Name, Class)(Students) returns only the Name and Class columns. It corresponds to SELECT columns in SQL.",
    hint: "Think about selecting columns in a table.",
    level: "intermediate",
  },
  {
    question: "What is the JOIN operation in relational algebra?",
    shortAnswer:
      "JOIN (⋈) combines two relations based on a common attribute, producing a relation with all columns from both.",
    explanation:
      "JOIN corresponds to SQL JOIN operations. It's the most powerful operation for combining related data.",
    hint: "Think about linking two tables on a common field.",
    level: "intermediate",
  },
  {
    question: "What is data independence in the relational model?",
    shortAnswer:
      "Data independence means changes to the physical storage or logical schema do not affect applications.",
    explanation:
      "Physical independence: storage changes (like adding indexes) don't affect queries. Logical independence: schema changes (like adding columns) don't break existing applications.",
    hint: "Think about adding a column without rewriting all the code.",
    level: "intermediate",
  },
  {
    question: "What is the role of keys in the relational model?",
    shortAnswer:
      "Keys uniquely identify tuples in a relation and establish relationships between relations.",
    explanation:
      "Primary keys uniquely identify each tuple. Foreign keys reference primary keys in other tables, enforcing referential integrity.",
    hint: "Think about what uniquely identifies a record.",
    level: "basic",
  },
  {
    question: "What is a candidate key?",
    shortAnswer:
      "A candidate key is a column or set of columns that can uniquely identify a tuple; one candidate key is chosen as the primary key.",
    explanation:
      "A relation may have multiple candidate keys. The primary key is the one chosen as the main identifier.",
    hint: "Think about all the columns that could uniquely identify a row.",
    level: "intermediate",
  },
  {
    question: "What is a foreign key in the relational model?",
    shortAnswer:
      "A foreign key is a column that refers to the primary key of another relation, establishing a relationship.",
    explanation:
      "Foreign keys enforce referential integrity — they ensure that values in the foreign key column exist in the referenced table.",
    hint: "Think about how a student's marks are linked to the student ID.",
    level: "basic",
  },
  {
    question: "What is referential integrity in the relational model?",
    shortAnswer:
      "Referential integrity ensures that foreign key values match existing primary key values in the referenced table.",
    explanation:
      "This prevents orphaned records. For example, you can't add an enrollment for a student that doesn't exist.",
    hint: "Think about why every order must have a valid customer.",
    level: "intermediate",
  },
  {
    question: "What is the significance of set theory in the relational model?",
    shortAnswer:
      "Set theory provides the mathematical foundation for relations, with operations like union, intersection, and cartesian product.",
    explanation:
      "Relations are sets of tuples. Set operations allow combining and manipulating data in powerful ways.",
    hint: "Think about how tables are sets of rows.",
    level: "expert",
  },
  {
    question: "What is predicate logic in the relational model?",
    shortAnswer:
      "Predicate logic provides the formal framework for querying, with queries expressed as logical formulas.",
    explanation:
      "SQL queries are based on predicate logic. The result of a query is the set of tuples that satisfy the predicate.",
    hint: "Think about how conditions in SQL are logical predicates.",
    level: "expert",
  },
  {
    question: "How does the relational model ensure data integrity?",
    shortAnswer:
      "The relational model ensures integrity through constraints: entity integrity (primary keys), referential integrity (foreign keys), and domain integrity (data types and checks).",
    explanation:
      "These constraints are enforced at the database level, ensuring data is always valid.",
    hint: "Think about the rules that prevent invalid data.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a relation and a table?",
    shortAnswer:
      "In theory, a relation is a mathematical set (no duplicate rows, unordered). In practice, tables may allow duplicates and have an order.",
    explanation:
      "RDBMS often treat tables as multisets (bags) allowing duplicates. However, the relational model assumes sets with unique tuples.",
    hint: "Think about the theoretical vs practical representation.",
    level: "expert",
  },
  {
    question: "What are the limitations of the relational model?",
    shortAnswer:
      "Limitations include: performance issues for complex joins, difficulty in handling nested data, and impedance mismatch with object-oriented programming.",
    explanation:
      "For very large-scale or unstructured data, NoSQL databases may be more suitable. However, the relational model remains dominant for most applications.",
    hint: "Think about when the relational model might not be the best choice.",
    level: "intermediate",
  },
  {
    question: "What is the concept of null values in the relational model?",
    shortAnswer:
      "Null values represent missing or unknown information in a tuple, handled systematically with three-valued logic (TRUE, FALSE, UNKNOWN).",
    explanation:
      "Nulls allow the model to represent incomplete data. However, they require careful handling in queries and comparisons.",
    hint: "Think about how missing data is represented.",
    level: "intermediate",
  },
  {
    question: "What is the impact of Codd's relational model on modern databases?",
    shortAnswer:
      "Codd's relational model is the foundation of most modern database systems, including SQL databases, data warehousing, and business intelligence.",
    explanation:
      "The model's principles of data independence, integrity, and set-based querying are as relevant today as they were in 1970.",
    hint: "Think about how databases are still structured today.",
    level: "intermediate",
  },
  {
    question: "What is the difference between relational algebra and relational calculus?",
    shortAnswer:
      "Relational algebra is procedural (how to get data), while relational calculus is declarative (what data to get).",
    explanation:
      "SQL is based on relational calculus. Relational algebra describes a sequence of operations; relational calculus describes the desired result.",
    hint: "Think about the difference between how vs. what.",
    level: "expert",
  },
  {
    question: "What is the significance of Codd's 1970 paper?",
    shortAnswer:
      "Codd's 1970 paper 'A Relational Model of Data for Large Shared Data Banks' introduced the relational model and revolutionised database management.",
    explanation:
      "It laid the foundation for modern RDBMS and earned Codd the ACM Turing Award in 1981.",
    hint: "Think about the paper that changed database history.",
    level: "intermediate",
  },
  {
    question: "How does the relational model support data abstraction?",
    shortAnswer:
      "The relational model supports data abstraction by separating the logical schema (what data) from physical storage (how data is stored).",
    explanation:
      "Users interact with tables and columns, not files and blocks. This simplifies application development and maintenance.",
    hint: "Think about how you don't need to know where data is physically stored.",
    level: "intermediate",
  },
  {
    question: "What are the alternatives to the relational model?",
    shortAnswer:
      "Alternatives include hierarchical, network, and NoSQL models (document, key-value, graph, wide-column).",
    explanation:
      "Each model has strengths and weaknesses. The relational model remains the most widely used for structured data.",
    hint: "Think about other ways to organise data.",
    level: "intermediate",
  },
  {
    question: "What is the future of the relational model?",
    shortAnswer:
      "The relational model continues to evolve with features like JSON support, distributed SQL, and cloud-native architectures.",
    explanation:
      "While NoSQL databases have gained popularity, relational databases remain dominant for transactional and analytical workloads.",
    hint: "Think about how relational databases are adapting to modern needs.",
    level: "expert",
  },
];

export default questions;