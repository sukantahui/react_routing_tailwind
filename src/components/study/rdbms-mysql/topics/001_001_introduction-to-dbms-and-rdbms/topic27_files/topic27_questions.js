/**
 * Topic 27: Features of MySQL – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the key features of MySQL?",
    shortAnswer:
      "Key features include high performance, ACID compliance, foreign key support, security, JSON support, full-text search, stored procedures, views, replication, scalability, and multiple storage engines.",
    explanation:
      "MySQL offers a comprehensive feature set that makes it suitable for a wide range of applications, from small websites to large enterprise systems.",
    hint: "Think about everything MySQL can do.",
    level: "basic",
  },
  {
    question: "What is the default storage engine in MySQL and why?",
    shortAnswer:
      "InnoDB is the default storage engine because it supports ACID transactions, foreign keys, and row-level locking.",
    explanation:
      "InnoDB is the most feature-complete engine. It provides crash recovery, MVCC, and is suitable for most applications.",
    hint: "Think about the engine that supports transactions.",
    level: "basic",
  },
  {
    question: "What is the difference between InnoDB and MyISAM?",
    shortAnswer:
      "InnoDB supports transactions, foreign keys, and row-level locking. MyISAM does not support transactions or foreign keys and uses table-level locking.",
    explanation:
      "InnoDB is ACID-compliant and suitable for most applications. MyISAM is faster for read-heavy workloads but less robust.",
    hint: "Think about which one supports ACID.",
    level: "intermediate",
  },
  {
    question: "Does MySQL support ACID transactions?",
    shortAnswer:
      "Yes, MySQL supports ACID transactions through the InnoDB storage engine.",
    explanation:
      "InnoDB provides Atomicity, Consistency, Isolation, and Durability, making MySQL suitable for transactional applications.",
    hint: "Think about transaction support.",
    level: "basic",
  },
  {
    question: "How does MySQL support JSON data?",
    shortAnswer:
      "MySQL supports JSON natively with data types, functions, and indexing for JSON documents.",
    explanation:
      "MySQL 5.7+ introduced JSON support. You can store JSON documents, query them with JSON functions, and even create indexes on JSON fields.",
    hint: "Think about storing and querying JSON.",
    level: "intermediate",
    codeExample: "SELECT JSON_EXTRACT(data, '$.name') FROM users;",
  },
  {
    question: "What is full-text search in MySQL?",
    shortAnswer:
      "Full-text search allows fast searching of large text columns using natural language queries and relevance ranking.",
    explanation:
      "It supports Boolean mode, relevance scoring, and is much faster than using LIKE queries for text search.",
    hint: "Think about searching text efficiently.",
    level: "intermediate",
  },
  {
    question: "What are stored procedures in MySQL?",
    shortAnswer:
      "Stored procedures are pre-compiled blocks of SQL code stored in the database that can be executed repeatedly with parameters.",
    explanation:
      "They encapsulate business logic, improve performance by reducing network traffic, and enhance security.",
    hint: "Think about reusable SQL code.",
    level: "intermediate",
  },
  {
    question: "What are views in MySQL?",
    shortAnswer:
      "Views are virtual tables based on a SELECT query that present data without storing it physically.",
    explanation:
      "Views simplify complex queries, restrict access to specific data, and provide a layer of abstraction.",
    hint: "Think about a saved query that looks like a table.",
    level: "intermediate",
  },
  {
    question: "What is MySQL replication?",
    shortAnswer:
      "MySQL replication copies data from a master database to one or more slave databases for high availability and read scalability.",
    explanation:
      "Replication supports different formats (statement-based, row-based, mixed) and can be used for backup, reporting, and load balancing.",
    hint: "Think about copying data to another server.",
    level: "intermediate",
  },
  {
    question: "How does MySQL handle security?",
    shortAnswer:
      "MySQL provides authentication, authorisation (privileges), SSL/TLS encryption, and auditing.",
    explanation:
      "User accounts are managed with passwords and privileges. Data can be encrypted at rest and in transit.",
    hint: "Think about protecting data.",
    level: "basic",
  },
  {
    question: "What are window functions in MySQL 8.0?",
    shortAnswer:
      "Window functions perform calculations across rows related to the current row, without collapsing results.",
    explanation:
      "Examples include ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), and aggregate functions with OVER().",
    hint: "Think about advanced analytics.",
    level: "expert",
    codeExample: "SELECT ROW_NUMBER() OVER (ORDER BY salary DESC) FROM employees;",
  },
  {
    question: "What are Common Table Expressions (CTEs) in MySQL 8.0?",
    shortAnswer:
      "CTEs are temporary result sets that can be referenced within a SELECT, INSERT, UPDATE, or DELETE statement.",
    explanation:
      "CTEs improve query readability and enable recursive queries with the WITH RECURSIVE clause.",
    hint: "Think about named subqueries.",
    level: "expert",
    codeExample: "WITH cte AS (SELECT * FROM users) SELECT * FROM cte;",
  },
  {
    question: "What is the Memory (HEAP) storage engine?",
    shortAnswer:
      "The Memory storage engine stores data in RAM for extremely fast access, but data is lost on server restart.",
    explanation:
      "It's used for temporary tables and caching. It supports hash and B-tree indexes.",
    hint: "Think about in-memory storage.",
    level: "intermediate",
  },
  {
    question: "What is the Archive storage engine?",
    shortAnswer:
      "The Archive storage engine is optimised for storing large amounts of historical data with a small footprint.",
    explanation:
      "It supports only INSERT and SELECT operations (no UPDATE/DELETE), and compresses data to save space.",
    hint: "Think about storing historical data.",
    level: "intermediate",
  },
  {
    question: "What are invisible indexes in MySQL 8.0?",
    shortAnswer:
      "Invisible indexes are indexes that are not used by the query optimizer, useful for testing index removal.",
    explanation:
      "You can make an index invisible to test the impact of dropping it without actually dropping it.",
    hint: "Think about testing index removal.",
    level: "expert",
    codeExample: "CREATE INDEX idx_name ON users(name) INVISIBLE;",
  },
  {
    question: "What are descending indexes in MySQL 8.0?",
    shortAnswer:
      "Descending indexes store index values in descending order, which can improve performance for ORDER BY DESC queries.",
    explanation:
      "Previously, MySQL could only store indexes in ascending order, forcing reverse scans for DESC queries.",
    hint: "Think about index order.",
    level: "expert",
    codeExample: "CREATE INDEX idx_name ON users(name DESC);",
  },
  {
    question: "What is atomic DDL in MySQL 8.0?",
    shortAnswer:
      "Atomic DDL makes Data Definition Language (DDL) operations atomic and crash-safe.",
    explanation:
      "If a DDL operation fails, it is fully rolled back, leaving the database in a consistent state.",
    hint: "Think about DDL being all-or-nothing.",
    level: "expert",
  },
  {
    question: "How does MySQL support foreign keys?",
    shortAnswer:
      "MySQL supports foreign key constraints through the InnoDB storage engine, enforcing referential integrity.",
    explanation:
      "Foreign keys ensure that values in a column match values in a primary key of another table. Options include CASCADE, RESTRICT, SET NULL.",
    hint: "Think about relationships between tables.",
    level: "intermediate",
  },
  {
    question: "What is the role of the query cache in MySQL?",
    shortAnswer:
      "The query cache stores the result of SELECT queries to serve identical queries faster.",
    explanation:
      "Query cache was deprecated in MySQL 5.7 and removed in MySQL 8.0 due to scalability issues.",
    hint: "Think about caching query results.",
    level: "expert",
  },
  {
    question: "What is the Performance Schema in MySQL?",
    shortAnswer:
      "The Performance Schema is a feature for monitoring MySQL server performance at a low level.",
    explanation:
      "It provides instrumentation for query execution, locking, I/O, and memory usage, helping with performance tuning.",
    hint: "Think about performance monitoring.",
    level: "expert",
  },
  {
    question: "What is the Information Schema in MySQL?",
    shortAnswer:
      "The Information Schema is a database that stores metadata about all database objects.",
    explanation:
      "It allows querying the database structure using SQL, including tables, columns, indexes, and privileges.",
    hint: "Think about a database that describes other databases.",
    level: "intermediate",
  },
  {
    question: "What are triggers in MySQL?",
    shortAnswer:
      "Triggers are stored programs that automatically execute in response to INSERT, UPDATE, or DELETE events on a table.",
    explanation:
      "Triggers enforce business rules, maintain audit trails, and automate actions.",
    hint: "Think about automatic actions on data changes.",
    level: "intermediate",
  },
  {
    question: "What are events in MySQL?",
    shortAnswer:
      "Events are scheduled tasks that execute at a specified time or interval, similar to cron jobs.",
    explanation:
      "Events can run SQL statements on a schedule for tasks like data archiving, report generation, and cleanup.",
    hint: "Think about scheduled tasks.",
    level: "intermediate",
  },
  {
    question: "What is the difference between CHAR and VARCHAR in MySQL?",
    shortAnswer:
      "CHAR is a fixed-length string (padded with spaces); VARCHAR is a variable-length string.",
    explanation:
      "CHAR is better for short, fixed-length strings. VARCHAR saves storage for variable-length data.",
    hint: "Think about fixed vs. variable length.",
    level: "basic",
  },
  {
    question: "What is the TIMESTAMP data type in MySQL?",
    shortAnswer:
      "TIMESTAMP stores date and time with timezone support, automatically converting to UTC.",
    explanation:
      "TIMESTAMP has a range of 1970-2038 and is useful for tracking event times with timezone awareness.",
    hint: "Think about time zone handling.",
    level: "intermediate",
  },
  {
    question: "What is the DATETIME data type in MySQL?",
    shortAnswer:
      "DATETIME stores date and time without timezone support, with a larger range (1000-9999).",
    explanation:
      "DATETIME is suitable for storing absolute date/time values where timezone is not relevant.",
    hint: "Think about absolute date/time.",
    level: "intermediate",
  },
  {
    question: "What is the ENUM data type in MySQL?",
    shortAnswer:
      "ENUM is a string data type that restricts values to a predefined list.",
    explanation:
      "ENUM is useful for columns with a fixed set of values, like status ('active', 'inactive', 'pending').",
    hint: "Think about fixed value lists.",
    level: "intermediate",
    codeExample: "CREATE TABLE users (status ENUM('active', 'inactive'));",
  },
  {
    question: "What is the SET data type in MySQL?",
    shortAnswer:
      "SET is a string data type that allows storing multiple values from a predefined list.",
    explanation:
      "SET is useful for storing multiple options, like permissions or categories.",
    hint: "Think about multiple-choice fields.",
    level: "intermediate",
    codeExample: "CREATE TABLE users (permissions SET('read', 'write', 'admin'));",
  },
  {
    question: "What are the MySQL spatial data types?",
    shortAnswer:
      "MySQL supports spatial data types for geographic data, including GEOMETRY, POINT, LINESTRING, and POLYGON.",
    explanation:
      "Spatial data types enable location-based queries and GIS applications.",
    hint: "Think about geographic data.",
    level: "expert",
  },
  {
    question: "How does MySQL handle large databases?",
    shortAnswer:
      "MySQL handles large databases through partitioning, sharding, and optimised storage engines.",
    explanation:
      "Features like table partitioning, appropriate indexing, and InnoDB's scalability enable managing billions of records.",
    hint: "Think about scaling to large datasets.",
    level: "expert",
  },
];

export default questions;