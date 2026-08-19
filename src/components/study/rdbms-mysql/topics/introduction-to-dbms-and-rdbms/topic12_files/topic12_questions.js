/**
 * Topic 12: What is RDBMS? – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is RDBMS?",
    shortAnswer:
      "RDBMS (Relational Database Management System) is a DBMS based on the relational model, storing data in tables with rows and columns.",
    explanation:
      "RDBMS uses relationships (foreign keys) between tables to organise data. It supports SQL, ACID transactions, and enforces data integrity. Examples: MySQL, PostgreSQL, Oracle, SQL Server.",
    hint: "Think about a database that uses tables and relationships.",
    level: "basic",
  },
  {
    question: "What is the relational model in database management?",
    shortAnswer:
      "The relational model organises data into relations (tables) with rows (tuples) and columns (attributes), using keys to establish relationships.",
    explanation:
      "Proposed by E.F. Codd in 1970, the relational model is based on set theory and predicate logic. It provides a formal foundation for data management.",
    hint: "Think about how data is organised in a spreadsheet-like structure with links.",
    level: "intermediate",
  },
  {
    question: "Who introduced the relational model?",
    shortAnswer:
      "Dr. Edgar F. Codd, a British computer scientist at IBM, introduced the relational model in 1970.",
    explanation:
      "Codd's paper 'A Relational Model of Data for Large Shared Data Banks' revolutionised the database industry and laid the foundation for modern RDBMS.",
    hint: "Think about the scientist who changed how we store data.",
    level: "basic",
  },
  {
    question: "What are the key components of the relational model?",
    shortAnswer:
      "The key components are: relations (tables), tuples (rows), attributes (columns), domains (data types), and keys (primary, foreign).",
    explanation:
      "Relations are sets of tuples. Each tuple has attributes with values from defined domains. Keys uniquely identify tuples and establish relationships.",
    hint: "Think about the structure of a database table.",
    level: "intermediate",
  },
  {
    question: "What is a relation in RDBMS?",
    shortAnswer:
      "A relation is a table that stores data in rows and columns. It represents an entity (e.g., Students, Courses).",
    explanation:
      "Relations are the fundamental data structure in the relational model. They have a fixed set of attributes and contain a set of tuples (rows).",
    hint: "Think about a table in a database.",
    level: "basic",
  },
  {
    question: "What is a tuple in RDBMS?",
    shortAnswer:
      "A tuple is a single row in a relation, representing one instance of an entity.",
    explanation:
      "Tuples contain values for each attribute in the relation. They are the individual records in a table.",
    hint: "Think about a row in a table.",
    level: "basic",
  },
  {
    question: "What is an attribute in RDBMS?",
    shortAnswer:
      "An attribute is a column in a relation, defining a property of the entity.",
    explanation:
      "Attributes have names and data types. They represent the characteristics of the entity.",
    hint: "Think about a column in a table.",
    level: "basic",
  },
  {
    question: "What is a domain in RDBMS?",
    shortAnswer:
      "A domain is the set of allowed values for an attribute, defined by its data type and constraints.",
    explanation:
      "For example, the domain of a 'StudentID' might be integers between 1 and 9999. Domains ensure data validity.",
    hint: "Think about the range of valid values for a column.",
    level: "intermediate",
  },
  {
    question: "What is a primary key in RDBMS?",
    shortAnswer:
      "A primary key is a column or set of columns that uniquely identifies each tuple in a relation.",
    explanation:
      "Primary keys must be unique and not null. They are used to reference rows from other tables (foreign keys).",
    hint: "Think about what uniquely identifies a student record.",
    level: "basic",
  },
  {
    question: "What is a foreign key in RDBMS?",
    shortAnswer:
      "A foreign key is a column in one relation that refers to the primary key of another relation, establishing a relationship.",
    explanation:
      "Foreign keys enforce referential integrity — they ensure that values in the foreign key column exist in the referenced table.",
    hint: "Think about how a student's marks are linked to the student ID in another table.",
    level: "basic",
  },
  {
    question: "What is referential integrity in RDBMS?",
    shortAnswer:
      "Referential integrity ensures that foreign key values match existing primary key values in the referenced table.",
    explanation:
      "This prevents orphaned records. For example, you can't add an enrollment for a student that doesn't exist.",
    hint: "Think about why every order must have a valid customer.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a DBMS and an RDBMS?",
    shortAnswer:
      "DBMS is a general term; RDBMS is a specific type based on the relational model with tables, keys, and relationships.",
    explanation:
      "RDBMS enforces relationships, supports SQL, and provides ACID transactions. Some older DBMS (like hierarchical) are not relational.",
    hint: "Think about RDBMS as a specific type of DBMS.",
    level: "basic",
  },
  {
    question: "What is SQL and how is it used in RDBMS?",
    shortAnswer:
      "SQL (Structured Query Language) is the standard language for defining, querying, and manipulating data in RDBMS.",
    explanation:
      "SQL provides DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE, SELECT), and DCL (GRANT, REVOKE) commands.",
    hint: "Think about the language used to talk to a relational database.",
    level: "basic",
  },
  {
    question: "What are the advantages of RDBMS?",
    shortAnswer:
      "Advantages include: data integrity, ACID transactions, standard SQL, relationships, security, and data independence.",
    explanation:
      "RDBMS reduces redundancy, ensures consistency, supports concurrent access, and provides powerful querying.",
    hint: "Think about why relational databases are widely used.",
    level: "basic",
  },
  {
    question: "What is normalisation in RDBMS?",
    shortAnswer:
      "Normalisation is the process of organising data to reduce redundancy and improve integrity, typically by dividing tables.",
    explanation:
      "It uses normal forms (1NF, 2NF, 3NF, BCNF) to eliminate duplicate data and dependencies. Normalisation often leads to more tables but better design.",
    hint: "Think about why you wouldn't store a student's address in every marks entry.",
    level: "intermediate",
  },
  {
    question: "What are the normal forms in RDBMS?",
    shortAnswer:
      "Normal forms are progressive levels of normalisation: 1NF, 2NF, 3NF, BCNF, 4NF, 5NF. Each form addresses specific data anomalies.",
    explanation:
      "Most practical applications aim for 3NF or BCNF. Higher normal forms are less common and may be used in specialised scenarios.",
    hint: "Think about the rules for organising data efficiently.",
    level: "expert",
  },
  {
    question: "What is denormalisation and when is it used?",
    shortAnswer:
      "Denormalisation is the process of adding redundancy to improve read performance, often by combining tables.",
    explanation:
      "It's used in data warehousing and reporting where read performance is critical and data is not frequently updated.",
    hint: "Think about when you might sacrifice normalisation for speed.",
    level: "expert",
  },
  {
    question: "What is ACID in RDBMS?",
    shortAnswer:
      "ACID stands for Atomicity, Consistency, Isolation, and Durability — properties that ensure reliable transaction processing.",
    explanation:
      "Atomicity: all-or-nothing. Consistency: data follows rules. Isolation: transactions don't interfere. Durability: committed changes persist.",
    hint: "Think about what makes a transaction reliable.",
    level: "intermediate",
  },
  {
    question: "What is the difference between RDBMS and NoSQL?",
    shortAnswer:
      "RDBMS uses structured tables with fixed schemas and SQL; NoSQL uses flexible schemas and various data models (document, key-value, graph, etc.).",
    explanation:
      "RDBMS prioritises ACID and data integrity. NoSQL prioritises scalability and flexibility.",
    hint: "Think about the trade-offs between consistency and scalability.",
    level: "intermediate",
  },
  {
    question: "What is an index in RDBMS?",
    shortAnswer:
      "An index is a data structure that speeds up data retrieval by allowing the DBMS to find rows without scanning the entire table.",
    explanation:
      "Indexes are created on columns used in WHERE, JOIN, and ORDER BY clauses. They improve performance but add overhead to write operations.",
    hint: "Think about the index at the back of a book.",
    level: "intermediate",
  },
  {
    question: "What is a view in RDBMS?",
    shortAnswer:
      "A view is a virtual table based on a SQL query. It provides a way to present data without storing it physically.",
    explanation:
      "Views can simplify complex queries, restrict access to specific columns/rows, and provide an abstraction layer for applications.",
    hint: "Think about a filtered or combined view of data from multiple tables.",
    level: "intermediate",
  },
  {
    question: "What is a stored procedure in RDBMS?",
    shortAnswer:
      "A stored procedure is pre-compiled SQL code stored in the database that can be executed to perform complex operations.",
    explanation:
      "Stored procedures improve performance, reduce network traffic, encapsulate business logic, and enhance security.",
    hint: "Think about a macro that runs a series of SQL commands.",
    level: "intermediate",
  },
  {
    question: "What is a trigger in RDBMS?",
    shortAnswer:
      "A trigger is a procedure that automatically executes in response to an event (INSERT, UPDATE, DELETE) on a table.",
    explanation:
      "Triggers enforce business rules, maintain audit trails, and automate tasks. They run at the database level.",
    hint: "Think about automatically logging changes to a table.",
    level: "intermediate",
  },
  {
    question: "What is E.F. Codd's 12 rules for RDBMS?",
    shortAnswer:
      "Codd's 12 rules are a set of criteria that define a fully relational DBMS, covering data representation, integrity, and querying.",
    explanation:
      "Rules include: information representation as tables, guaranteed access via keys, systematic null handling, and SQL support. No commercial RDBMS fully complies with all rules.",
    hint: "Think about the ideal relational database.",
    level: "expert",
  },
  {
    question: "What is the role of metadata in RDBMS?",
    shortAnswer:
      "Metadata is data about the data — it describes the schema, tables, columns, constraints, and relationships.",
    explanation:
      "Metadata is stored in the data dictionary and is used by the DBMS to validate queries and enforce integrity.",
    hint: "Think about a catalog of all the information about the database.",
    level: "intermediate",
  },
  {
    question: "How does an RDBMS handle concurrent transactions?",
    shortAnswer:
      "RDBMS uses locking, isolation levels, and MVCC (Multi-Version Concurrency Control) to manage concurrent transactions.",
    explanation:
      "These mechanisms ensure that transactions are isolated from each other, preventing dirty reads, non-repeatable reads, and phantom reads.",
    hint: "Think about how multiple users can update the same database without conflicts.",
    level: "expert",
  },
  {
    question: "What are the common RDBMS implementations?",
    shortAnswer:
      "Common RDBMS include: MySQL, PostgreSQL, Oracle Database, Microsoft SQL Server, and IBM Db2.",
    explanation:
      "Each has its strengths: MySQL is popular in web development, PostgreSQL is feature-rich, Oracle is enterprise-grade, SQL Server integrates with .NET, and Db2 is used in IBM environments.",
    hint: "Think about the databases you've heard of.",
    level: "basic",
  },
  {
    question: "What is the difference between MySQL and PostgreSQL?",
    shortAnswer:
      "MySQL is simpler and faster for basic CRUD operations; PostgreSQL is more feature-rich, standards-compliant, and supports advanced data types like JSON and arrays.",
    explanation:
      "PostgreSQL is often chosen for applications requiring complex queries and data integrity. MySQL is widely used in web applications.",
    hint: "Think about the strengths of each.",
    level: "intermediate",
  },
  {
    question: "What is the significance of Codd's relational model today?",
    shortAnswer:
      "Codd's model is still the foundation of most commercial database systems, including SQL databases, which are the backbone of modern applications.",
    explanation:
      "The model's principles of data independence, integrity, and set-based querying are as relevant today as they were in 1970.",
    hint: "Think about how databases are still structured.",
    level: "intermediate",
  },
  {
    question: "What are the limitations of RDBMS?",
    shortAnswer:
      "Limitations include: scalability challenges for very large datasets, rigid schemas that are hard to change, and potential performance overhead for complex joins.",
    explanation:
      "For applications with massive scale or rapidly changing data structures, NoSQL databases may be more suitable.",
    hint: "Think about when RDBMS might not be the best choice.",
    level: "intermediate",
  },
  {
    question: "How do you choose between RDBMS and NoSQL for a new project?",
    shortAnswer:
      "Choose RDBMS for structured data, ACID transactions, and complex queries. Choose NoSQL for unstructured data, massive scale, and flexible schemas.",
    explanation:
      "Consider data model, consistency needs, scalability requirements, and team expertise. Many projects use both (polyglot persistence).",
    hint: "Think about the trade-offs between the two.",
    level: "expert",
  },
];

export default questions;