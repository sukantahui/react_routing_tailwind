/**
 * Topic 6: What is DBMS? – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is a DBMS?",
    shortAnswer:
      "A DBMS (Database Management System) is software that manages the creation, maintenance, and access to databases, providing an interface between users and data.",
    explanation:
      "The DBMS handles data storage, security, concurrency, backup, and recovery. It translates user queries (like SQL) into operations on the physical data. Examples: MySQL, Oracle, PostgreSQL.",
    hint: "Think about the DBMS as the librarian that manages the library (database).",
    level: "basic",
  },
  {
    question: "What are the main functions of a DBMS?",
    shortAnswer:
      "Main functions include: data definition, data manipulation, data security, concurrency control, transaction management, backup and recovery.",
    explanation:
      "The DBMS provides DDL for defining schemas, DML for manipulating data, and DCL for controlling access. It also ensures ACID properties and manages concurrency.",
    hint: "Think about all the things a database needs to do beyond just storing data.",
    level: "basic",
  },
  {
    question: "What is the difference between a database and a DBMS?",
    shortAnswer:
      "A database is the collection of structured data; a DBMS is the software that manages and provides access to that data.",
    explanation:
      "The database is the 'what' (the data itself), and the DBMS is the 'how' (the tools to interact with the data). Without a DBMS, the database is just a set of files.",
    hint: "Think about the books (database) versus the librarian (DBMS).",
    level: "basic",
  },
  {
    question: "What are the components of a DBMS?",
    shortAnswer:
      "Components include: DDL compiler, query processor, query optimizer, transaction manager, storage manager, and security manager.",
    explanation:
      "These components work together to handle user requests, optimise performance, ensure data integrity, and manage security. Each has a specific role in the system.",
    hint: "Think about the different parts of a car that work together to make it run.",
    level: "intermediate",
  },
  {
    question: "What is a DDL compiler in a DBMS?",
    shortAnswer:
      "The DDL compiler processes Data Definition Language statements (CREATE, ALTER, DROP) to define and modify the database schema.",
    explanation:
      "It translates schema changes into metadata stored in the data dictionary. This ensures that the database structure is correctly maintained.",
    hint: "Think about how you define the structure of a table.",
    level: "intermediate",
  },
  {
    question: "What is a query processor in a DBMS?",
    shortAnswer:
      "The query processor handles SQL queries, parsing them, checking syntax, and generating execution plans.",
    explanation:
      "It includes components like parser, optimizer, and executor. The goal is to transform high-level SQL into efficient low-level operations.",
    hint: "Think about how the DBMS understands and executes your SQL command.",
    level: "intermediate",
  },
  {
    question: "What is a query optimizer?",
    shortAnswer:
      "The query optimizer is a component that finds the most efficient execution plan for a SQL query.",
    explanation:
      "It uses statistics about tables and indexes to choose the best strategy (e.g., which indexes to use, join order). A good optimizer greatly improves performance.",
    hint: "Think about a GPS finding the fastest route.",
    level: "intermediate",
  },
  {
    question: "What is a transaction manager in a DBMS?",
    shortAnswer:
      "The transaction manager ensures ACID properties (Atomicity, Consistency, Isolation, Durability) for transactions.",
    explanation:
      "It handles commit and rollback operations, and manages concurrency control to prevent conflicts between simultaneous transactions.",
    hint: "Think about how a DBMS ensures a bank transfer either fully completes or fully fails.",
    level: "intermediate",
  },
  {
    question: "What is a storage manager in a DBMS?",
    shortAnswer:
      "The storage manager manages the physical storage of data, including file I/O, buffer management, and data retrieval.",
    explanation:
      "It translates high-level data requests into low-level file operations. It also manages memory buffers for efficiency.",
    hint: "Think about how the DBMS actually reads and writes data to disk.",
    level: "intermediate",
  },
  {
    question: "What is the role of a security manager in a DBMS?",
    shortAnswer:
      "The security manager controls user authentication and authorisation, ensuring only authorised users can access or modify data.",
    explanation:
      "It manages user accounts, roles, and privileges. It also enforces encryption and auditing policies to protect data.",
    hint: "Think about how a DBMS ensures only the right people can see sensitive data.",
    level: "intermediate",
  },
  {
    question: "What are the different types of DBMS?",
    shortAnswer:
      "Types include: Relational (RDBMS), NoSQL (document, key-value, graph), Object-Oriented, and Cloud DBMS.",
    explanation:
      "Each type is optimised for different use cases: relational for structured data with complex queries, NoSQL for scalability and flexibility, object-oriented for complex data models, and cloud for managed services.",
    hint: "Think about the different kinds of databases available.",
    level: "basic",
  },
  {
    question: "What is an RDBMS?",
    shortAnswer:
      "RDBMS (Relational Database Management System) is a DBMS based on the relational model, where data is stored in tables with rows and columns.",
    explanation:
      "RDBMS supports SQL for querying, enforces relationships via foreign keys, and ensures ACID properties. Examples: MySQL, PostgreSQL, Oracle.",
    hint: "Think about the classic database you learn first.",
    level: "basic",
  },
  {
    question: "What is a NoSQL DBMS?",
    shortAnswer:
      "NoSQL DBMS is a non-relational database system designed for large-scale, distributed, and flexible data storage.",
    explanation:
      "NoSQL databases are document-based (MongoDB), key-value (Redis), column-family (Cassandra), or graph-based (Neo4j). They sacrifice ACID for scalability and performance.",
    hint: "Think about databases that don't use tables and SQL.",
    level: "intermediate",
  },
  {
    question: "What is a cloud DBMS?",
    shortAnswer:
      "A cloud DBMS is a database management system hosted on a cloud platform, offering managed services like automatic scaling, backup, and patching.",
    explanation:
      "Examples: Amazon RDS, Azure SQL Database, Google Cloud Spanner. They reduce administrative overhead and offer pay-as-you-go pricing.",
    hint: "Think about renting a database server in the cloud.",
    level: "intermediate",
  },
  {
    question: "What is the difference between DDL and DML in a DBMS?",
    shortAnswer:
      "DDL (Data Definition Language) is used to define the database schema (CREATE, ALTER, DROP). DML (Data Manipulation Language) is used to manipulate data (INSERT, UPDATE, DELETE, SELECT).",
    explanation:
      "DDL changes the structure of the database, while DML changes the content. Both are essential for database operations.",
    hint: "Think about the difference between building a house (DDL) and moving furniture (DML).",
    level: "basic",
  },
  {
    question: "What is ACID in the context of a DBMS?",
    shortAnswer:
      "ACID stands for Atomicity, Consistency, Isolation, and Durability — properties that ensure reliable transaction processing.",
    explanation:
      "Atomicity: all or nothing. Consistency: data follows rules. Isolation: concurrent transactions don't interfere. Durability: committed changes persist. These are critical for transactional systems.",
    hint: "Think about a bank transfer: either both accounts are updated or none.",
    level: "intermediate",
  },
  {
    question: "What is a data dictionary in a DBMS?",
    shortAnswer:
      "A data dictionary is a metadata repository that stores information about the database schema, tables, columns, constraints, and user privileges.",
    explanation:
      "It is used by the DBMS to validate queries and enforce integrity. It is automatically updated when schema changes are made.",
    hint: "Think about a catalog of all the information about the database itself.",
    level: "intermediate",
  },
  {
    question: "What is the role of indexes in a DBMS?",
    shortAnswer:
      "Indexes are data structures that speed up data retrieval by allowing the DBMS to find rows without scanning the entire table.",
    explanation:
      "They are created on columns that are frequently used in WHERE clauses, JOINs, and ORDER BY. They improve read performance but add overhead to writes.",
    hint: "Think about the index at the back of a book.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS handle concurrency?",
    shortAnswer:
      "A DBMS uses locking, transaction isolation levels, and multi-version concurrency control (MVCC) to manage concurrent access.",
    explanation:
      "These mechanisms prevent dirty reads, non-repeatable reads, and phantom reads. The choice of isolation level balances consistency and performance.",
    hint: "Think about how multiple users can update the same database without conflicts.",
    level: "expert",
  },
  {
    question: "What is the role of stored procedures in a DBMS?",
    shortAnswer:
      "Stored procedures are pre-compiled SQL code stored in the DBMS that can be executed to perform complex operations.",
    explanation:
      "They improve performance by reducing network traffic, encapsulate business logic, and enhance security by controlling access.",
    hint: "Think about a macro that runs a series of SQL commands.",
    level: "intermediate",
  },
  {
    question: "What is a view in a DBMS?",
    shortAnswer:
      "A view is a virtual table based on the result of a SQL query. It provides a way to present data without storing it physically.",
    explanation:
      "Views can simplify complex queries, restrict access to specific columns/rows, and provide an abstraction layer for applications.",
    hint: "Think about a filtered or combined view of data from multiple tables.",
    level: "intermediate",
  },
  {
    question: "What are the advantages of using a DBMS over a file system?",
    shortAnswer:
      "Advantages include: reduced redundancy, improved data integrity, concurrency control, security, backup/recovery, and powerful querying.",
    explanation:
      "A DBMS provides a systematic way to manage data, eliminating the problems of file systems (inconsistency, redundancy, etc.).",
    hint: "Think about why we use databases instead of text files.",
    level: "basic",
  },
  {
    question: "What are the disadvantages of using a DBMS?",
    shortAnswer:
      "Disadvantages include: higher cost (licensing, hardware), complexity, need for specialised skills, and potential performance overhead.",
    explanation:
      "DBMS require expertise to administer and tune. They also add overhead compared to simple file operations. However, these are usually outweighed by the benefits.",
    hint: "Think about the cost and complexity of managing a database system.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a DBMS and an RDBMS?",
    shortAnswer:
      "DBMS is a general term for any database management system; RDBMS specifically refers to a relational DBMS that follows E.F. Codd's relational model.",
    explanation:
      "RDBMS enforces relationships, supports SQL, and provides ACID transactions. Some older DBMS (like hierarchical) are not relational.",
    hint: "Think about RDBMS as a specific type of DBMS.",
    level: "basic",
  },
  {
    question: "What is the role of the DBMS in data independence?",
    shortAnswer:
      "The DBMS provides data independence by insulating applications from changes in the physical storage or logical schema.",
    explanation:
      "Physical data independence means changes to storage (e.g., adding indexes) don't affect applications. Logical data independence means changes to schema (e.g., adding columns) don't break existing queries.",
    hint: "Think about how you can change the database structure without rewriting all the code.",
    level: "expert",
  },
  {
    question: "How does a DBMS ensure data integrity?",
    shortAnswer:
      "The DBMS enforces integrity through constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK) and triggers.",
    explanation:
      "These rules ensure that data is always valid according to business rules. The DBMS checks these constraints before allowing any data modification.",
    hint: "Think about how a database prevents you from entering a negative age.",
    level: "intermediate",
  },
  {
    question: "What are the common security features of a DBMS?",
    shortAnswer:
      "Common features include: authentication, authorisation (role-based access control), encryption, auditing, and activity monitoring.",
    explanation:
      "These features protect data from unauthorised access, ensure compliance, and provide an audit trail for forensic analysis.",
    hint: "Think about how a database ensures only the right people can see sensitive data.",
    level: "intermediate",
  },
  {
    question: "What is the importance of backup and recovery in a DBMS?",
    shortAnswer:
      "Backup and recovery ensure that data can be restored after a failure, preventing data loss and ensuring business continuity.",
    explanation:
      "The DBMS provides tools for online backups, point-in-time recovery, and transaction log replay. This is essential for disaster recovery.",
    hint: "Think about how a database can recover to just before a power outage.",
    level: "intermediate",
  },
  {
    question: "What is the future of DBMS?",
    shortAnswer:
      "The future includes cloud-native DBMS, serverless databases, multi-model databases, AI-driven automation, and enhanced security.",
    explanation:
      "Trends are towards more automation, scalability, and flexibility. AI is being used for query optimisation, anomaly detection, and self-tuning.",
    hint: "Think about how databases are becoming more intelligent and easier to manage.",
    level: "expert",
  },
  {
    question: "How do you choose the right DBMS for a project?",
    shortAnswer:
      "Consider data structure, scalability, consistency requirements, query complexity, budget, and team expertise.",
    explanation:
      "For structured data with complex queries, choose RDBMS. For high-volume, unstructured data, choose NoSQL. For cloud-native apps, consider cloud DBMS.",
    hint: "Think about what you need to store and how you need to query it.",
    level: "expert",
  },
  {
    question: "What is the role of the DBMS administrator (DBA)?",
    shortAnswer:
      "The DBA is responsible for installing, configuring, maintaining, and tuning the DBMS, and ensuring data security and availability.",
    explanation:
      "Tasks include: backup and recovery, user management, performance monitoring, capacity planning, and patch management.",
    hint: "Think about who looks after the database server.",
    level: "intermediate",
  },
];

export default questions;