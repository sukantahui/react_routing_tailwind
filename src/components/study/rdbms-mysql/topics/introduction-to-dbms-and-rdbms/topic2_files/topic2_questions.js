/**
 * Topic 2: What is a Database? – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is a database?",
    shortAnswer:
      "A database is an organized collection of structured data stored electronically, designed for efficient storage, management, and retrieval.",
    explanation:
      "A database is more than just a file. It includes a structure (schema), data, and a management system (DBMS). It supports CRUD operations (Create, Read, Update, Delete) and ensures data integrity, security, and concurrency.",
    hint: "Think about how a digital filing cabinet organizes files for easy access.",
    level: "basic",
    codeExample: "// Example: A database named 'SchoolDB' with tables Students, Courses, Enrollments",
  },
  {
    question: "What are the main components of a database?",
    shortAnswer:
      "The main components include tables (entities), records (rows), fields (columns), relationships, schema, and keys.",
    explanation:
      "Tables store related data in rows and columns. Records are individual entries. Fields define the attributes. Relationships link tables. Schema is the blueprint. Keys (primary, foreign) enforce integrity and relationships.",
    hint: "Think about the structure of a spreadsheet but with more complex relationships.",
    level: "basic",
  },
  {
    question: "What is a Database Management System (DBMS)?",
    shortAnswer:
      "A DBMS is software that interacts with the database, providing an interface to store, retrieve, and manage data.",
    explanation:
      "The DBMS handles data storage, security, concurrency, backup, and recovery. It translates user queries (like SQL) into operations on the physical data. Examples: MySQL, Oracle, PostgreSQL.",
    hint: "Think about the DBMS as the librarian who manages the library (database).",
    level: "basic",
  },
  {
    question: "Why do we need databases instead of just storing data in files?",
    shortAnswer:
      "Databases provide structured storage, efficient querying, data integrity, concurrency, security, and scalability — which files alone cannot offer.",
    explanation:
      "While files can store data, they lack organization, query languages, and mechanisms to prevent data corruption or conflicts. Databases handle these with features like indexing, transactions, and access controls.",
    hint: "Think about why a library uses a catalogue system instead of just piles of books.",
    level: "intermediate",
  },
  {
    question: "What is a table in a database?",
    shortAnswer:
      "A table is a collection of related data organised in rows (records) and columns (fields).",
    explanation:
      "Tables are the fundamental storage unit in relational databases. Each table represents an entity (e.g., Students, Orders). Columns define the attributes, and rows hold the actual data entries.",
    hint: "Think about a spreadsheet with rows and columns.",
    level: "basic",
  },
  {
    question: "What is a primary key?",
    shortAnswer:
      "A primary key is a unique identifier for each record in a table, ensuring no duplicate rows.",
    explanation:
      "The primary key must be unique and not null. It can be a single column or a combination of columns (composite key). It is used to reference records from other tables (foreign key).",
    hint: "Think about a student ID that uniquely identifies a student.",
    level: "basic",
  },
  {
    question: "What is a foreign key?",
    shortAnswer:
      "A foreign key is a column in one table that refers to the primary key of another table, establishing a relationship.",
    explanation:
      "Foreign keys enforce referential integrity — they ensure that values in the foreign key column exist in the referenced table. They are the basis for joining tables in queries.",
    hint: "Think about how a student's marks are linked to the student ID in another table.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a database and a DBMS?",
    shortAnswer:
      "A database is the actual data storage, while a DBMS is the software that manages and provides access to that data.",
    explanation:
      "The database is the collection of structured data. The DBMS is the tool (like MySQL) that allows you to create, query, update, and administer the database. Without a DBMS, the database is just a set of files.",
    hint: "Think of the database as the books and the DBMS as the librarian.",
    level: "basic",
  },
  {
    question: "What are the different types of databases?",
    shortAnswer:
      "Types include relational (RDBMS), NoSQL (document, key-value, graph), cloud databases, and specialised databases like spatial or time-series.",
    explanation:
      "Relational databases use tables with fixed schemas and SQL. NoSQL databases offer flexible schemas and are optimised for scale. Cloud databases are hosted on cloud platforms. Specialised databases handle specific data types.",
    hint: "Think about how you'd store different kinds of data: structured vs. unstructured.",
    level: "intermediate",
  },
  {
    question: "What is SQL?",
    shortAnswer:
      "SQL (Structured Query Language) is the standard language used to communicate with relational databases.",
    explanation:
      "SQL allows users to define schemas (DDL), manipulate data (DML), control access (DCL), and query data (DQL). It is declarative, meaning you specify what you want, not how to get it.",
    hint: "Think about how you'd ask a question like 'Show me all students from Class 10'.",
    level: "basic",
  },
  {
    question: "What is the difference between a relational and a non-relational database?",
    shortAnswer:
      "Relational databases use tables with fixed schemas and enforce relationships; non-relational (NoSQL) databases use flexible schemas and are designed for scalability.",
    explanation:
      "Relational databases are best for structured data with complex queries and transactions. NoSQL databases are suited for unstructured or semi-structured data, high volume, and distributed systems. Each has its strengths.",
    hint: "Think about the difference between a spreadsheet and a collection of JSON documents.",
    level: "intermediate",
  },
  {
    question: "What is a schema in a database?",
    shortAnswer:
      "A schema is the structure or blueprint of a database, defining tables, columns, data types, and relationships.",
    explanation:
      "The schema is defined using DDL (Data Definition Language) commands like CREATE, ALTER, DROP. It's the logical design that dictates how data is organised and how different entities relate to each other.",
    hint: "Think about the architectural plan of a building before construction.",
    level: "intermediate",
  },
  {
    question: "What are the ACID properties in databases?",
    shortAnswer:
      "ACID stands for Atomicity, Consistency, Isolation, and Durability — guarantees for reliable transaction processing.",
    explanation:
      "Atomicity ensures transactions are all-or-nothing. Consistency ensures data follows rules. Isolation ensures concurrent transactions don't interfere. Durability ensures committed changes persist. These properties are critical for transactional systems.",
    hint: "Think about a bank transfer: either both accounts are updated or none.",
    level: "expert",
  },
  {
    question: "What is indexing in a database?",
    shortAnswer:
      "An index is a data structure that improves the speed of data retrieval operations on a table.",
    explanation:
      "Indexes are similar to book indexes — they allow the database to find data without scanning the entire table. They can be created on one or more columns. However, they consume storage and slow down write operations.",
    hint: "Think about how you use the index at the back of a textbook to find topics quickly.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a database and a data warehouse?",
    shortAnswer:
      "A database is used for operational (OLTP) purposes, while a data warehouse is used for analytical (OLAP) purposes, aggregating data from multiple sources.",
    explanation:
      "Databases are optimised for fast inserts, updates, and queries on current data. Data warehouses are optimised for complex queries, historical analysis, and business intelligence. They often use star or snowflake schemas.",
    hint: "Think about a database as a store's point-of-sale system, and a data warehouse as the annual sales report.",
    level: "expert",
  },
  {
    question: "What are the common uses of databases?",
    shortAnswer:
      "Databases are used in almost every application: e-commerce, banking, healthcare, education, social media, logistics, and more.",
    explanation:
      "They store customer information, product catalogs, transaction records, patient histories, student data, user profiles, and inventory. Any system that needs persistent, structured data uses a database.",
    hint: "Think about all the systems you use daily that store data.",
    level: "basic",
  },
  {
    question: "What is data integrity in a database?",
    shortAnswer:
      "Data integrity refers to the accuracy, consistency, and reliability of data stored in a database.",
    explanation:
      "Integrity is enforced through constraints (primary key, foreign key, unique, check) and transactions. It ensures that data is not corrupted by errors or unauthorised changes.",
    hint: "Think about why a bank must ensure account balances are always correct.",
    level: "intermediate",
  },
  {
    question: "What is a cloud database?",
    shortAnswer:
      "A cloud database is a database that runs on a cloud computing platform, offering scalability, high availability, and reduced maintenance.",
    explanation:
      "Cloud providers (AWS, Azure, GCP) offer managed database services that handle backup, patching, and scaling. Examples: Amazon RDS, Azure SQL Database, Google Cloud Spanner.",
    hint: "Think about how you can rent a database server without managing the hardware.",
    level: "intermediate",
  },
  {
    question: "What is the role of the database administrator (DBA)?",
    shortAnswer:
      "A DBA is responsible for the installation, configuration, maintenance, security, and performance tuning of databases.",
    explanation:
      "The DBA ensures the database is available, secure, and performing well. Tasks include backups, recovery, user management, and query optimisation.",
    hint: "Think about the DBA as the caretaker of the database system.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a database and a database server?",
    shortAnswer:
      "A database is the logical data storage; a database server is the physical machine or software that hosts and serves the database.",
    explanation:
      "The server includes the DBMS, hardware resources, and network services. One server can host multiple databases, providing access to clients over a network.",
    hint: "Think about the difference between the library building (server) and the books inside (database).",
    level: "basic",
  },
  {
    question: "What is a transaction in a database?",
    shortAnswer:
      "A transaction is a unit of work that is executed as a single, indivisible operation, ensuring ACID properties.",
    explanation:
      "Transactions group multiple operations (e.g., updating two accounts) into one unit. If any part fails, the entire transaction is rolled back (atomicity). This guarantees data consistency.",
    hint: "Think about how a bank transfer involves multiple steps that must all succeed or fail together.",
    level: "intermediate",
  },
  {
    question: "What are the advantages of using a database over a file system?",
    shortAnswer:
      "Advantages include reduced redundancy, improved data integrity, support for concurrent access, security, backup, and complex querying.",
    explanation:
      "File systems lack these features, making them unsuitable for applications requiring data consistency and multi-user access. Databases provide a robust, standardised environment for data management.",
    hint: "Think about why an e-commerce site can't use simple files to store orders.",
    level: "intermediate",
  },
  {
    question: "What is the difference between SQL and NoSQL?",
    shortAnswer:
      "SQL databases are relational with fixed schemas; NoSQL databases are non-relational with flexible schemas, often used for horizontal scaling.",
    explanation:
      "SQL databases use structured query language and are best for applications requiring complex queries and transactions. NoSQL databases are document-oriented, key-value, or graph-based, and are chosen for big data and high-velocity applications.",
    hint: "Think about the difference between a fixed table structure and a flexible JSON document.",
    level: "intermediate",
  },
  {
    question: "What is data normalization in databases?",
    shortAnswer:
      "Normalization is the process of organising data to reduce redundancy and improve data integrity, typically by dividing tables into smaller related tables.",
    explanation:
      "Normalization uses a set of rules (normal forms 1NF, 2NF, 3NF, BCNF). It aims to eliminate duplicate data and ensure dependencies are logically organised. It often leads to more tables but less redundancy.",
    hint: "Think about why you wouldn't store a student's address in every marks entry.",
    level: "intermediate",
  },
  {
    question: "What is a NoSQL database and when is it used?",
    shortAnswer:
      "A NoSQL database is a non-relational database designed for large-scale data, high performance, and flexible schemas.",
    explanation:
      "NoSQL databases are used for big data, real-time applications, and when data structures are not fixed or are hierarchical. Examples include MongoDB (document), Redis (key-value), and Neo4j (graph).",
    hint: "Think about how social media posts are stored — they don't fit nicely into rows and columns.",
    level: "intermediate",
  },
  {
    question: "What is the role of indexing in database performance?",
    shortAnswer:
      "Indexing speeds up data retrieval by allowing the database to find rows without scanning the entire table, but it can slow down writes.",
    explanation:
      "An index is a data structure (like B-tree) that maps column values to their locations. It is used in WHERE clauses, joins, and sorting. Choosing the right indexes is a key performance tuning activity.",
    hint: "Think about how a book index helps you find a topic quickly.",
    level: "intermediate",
  },
  {
    question: "What are the common database design mistakes?",
    shortAnswer:
      "Common mistakes include poor naming conventions, lack of primary keys, over-normalization, not indexing properly, and ignoring data types.",
    explanation:
      "These mistakes lead to performance issues, maintenance difficulties, and data integrity problems. Good design requires planning, understanding requirements, and following best practices.",
    hint: "Think about the consequences of using the wrong data type for a date field.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a database and a data lake?",
    shortAnswer:
      "A database stores structured data in a schema; a data lake stores raw, unstructured data in its native format.",
    explanation:
      "Data lakes are used for big data and analytics, storing everything (raw logs, sensor data, images) without structure. Data is transformed when read (schema-on-read), unlike databases which have schema-on-write.",
    hint: "Think about a data lake as a large reservoir of raw water and a database as a filtered, bottled water.",
    level: "expert",
  },
  {
    question: "What are the future trends in databases?",
    shortAnswer:
      "Future trends include cloud-native databases, serverless databases, multi-model databases, and AI-driven automated database management.",
    explanation:
      "Organisations are moving to managed cloud services to reduce overhead. Multi-model databases support multiple data models (relational, graph, document) in one system. AI is being used to automate tuning, monitoring, and anomaly detection.",
    hint: "Think about how databases are becoming more intelligent and self-managing.",
    level: "expert",
  },
  {
    question: "How do you choose the right database for a project?",
    shortAnswer:
      "Choose based on data structure, scalability needs, query complexity, consistency requirements, and the team's expertise.",
    explanation:
      "For structured data with strict consistency, a relational database is suitable. For high-volume, unstructured data, consider NoSQL. For real-time analytics, consider columnar or in-memory databases. Also consider operational costs and vendor lock-in.",
    hint: "Think about whether you need ACID transactions or if eventual consistency is acceptable.",
    level: "expert",
  },
  {
    question: "What is the role of the query optimizer in a DBMS?",
    shortAnswer:
      "The query optimizer is a component of the DBMS that determines the most efficient execution plan for a given query.",
    explanation:
      "It evaluates different strategies (e.g., using indexes, table scan, join order) and chooses the one with the lowest estimated cost. This greatly impacts performance.",
    hint: "Think about how a GPS system chooses the fastest route from multiple options.",
    level: "expert",
  },
];

export default questions;