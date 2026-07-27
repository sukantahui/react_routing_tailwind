/**
 * Topic 25: Introduction to MySQL – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is MySQL?",
    shortAnswer:
      "MySQL is the world's most popular open-source relational database management system (RDBMS).",
    explanation:
      "MySQL is fast, reliable, and easy to use. It's the database of choice for web applications, e-commerce platforms, and content management systems. It uses SQL for querying.",
    hint: "Think about the most popular open-source database.",
    level: "basic",
    codeExample: "SELECT * FROM users;",
  },
  {
    question: "Who developed MySQL and when was it first released?",
    shortAnswer:
      "MySQL was developed by MySQL AB (now owned by Oracle) and first released in 1995.",
    explanation:
      "Michael Widenius and David Axmark founded MySQL AB. The name 'MySQL' comes from 'My' (the name of Michael's daughter) and SQL.",
    hint: "Think about the 1990s and the name's origin.",
    level: "basic",
  },
  {
    question: "What does the 'M' in the LAMP stack stand for?",
    shortAnswer:
      "The 'M' in LAMP stands for MySQL.",
    explanation:
      "LAMP is Linux, Apache, MySQL, PHP/Perl/Python. It's a popular web development stack used by millions of websites.",
    hint: "Think about the database component of LAMP.",
    level: "basic",
  },
  {
    question: "What are the key features of MySQL?",
    shortAnswer:
      "Key features include high performance, reliability, ACID compliance, open-source licensing, scalability, JSON support, security, and cross-platform compatibility.",
    explanation:
      "MySQL also supports stored procedures, triggers, views, and full-text search. It offers multiple storage engines, with InnoDB being the default.",
    hint: "Think about what makes MySQL popular.",
    level: "basic",
  },
  {
    question: "What is the default storage engine in MySQL?",
    shortAnswer:
      "The default storage engine in MySQL is InnoDB.",
    explanation:
      "InnoDB is ACID-compliant, supports transactions, foreign keys, and row-level locking. It replaced MyISAM as the default engine in MySQL 5.5.",
    hint: "Think about the engine that supports transactions.",
    level: "basic",
  },
  {
    question: "What is the difference between InnoDB and MyISAM?",
    shortAnswer:
      "InnoDB supports transactions, foreign keys, and row-level locking. MyISAM does not support transactions or foreign keys and uses table-level locking.",
    explanation:
      "InnoDB is recommended for most applications due to its ACID compliance. MyISAM is faster for read-heavy workloads but is less robust.",
    hint: "Think about which one supports ACID.",
    level: "intermediate",
  },
  {
    question: "What is the MySQL architecture?",
    shortAnswer:
      "MySQL has a layered architecture: Client Layer, Server Layer, and Storage Engine Layer.",
    explanation:
      "The Client Layer handles user connections. The Server Layer processes queries (parser, optimizer, cache). The Storage Engine Layer manages data storage (InnoDB, MyISAM, etc.).",
    hint: "Think about the separation of concerns.",
    level: "intermediate",
  },
  {
    question: "What is the role of the MySQL query optimizer?",
    shortAnswer:
      "The query optimizer determines the most efficient execution plan for a SQL query.",
    explanation:
      "It considers indexes, table statistics, and join methods to choose the optimal plan. This improves query performance.",
    hint: "Think about how MySQL decides the best way to execute a query.",
    level: "intermediate",
  },
  {
    question: "What is MySQL Workbench?",
    shortAnswer:
      "MySQL Workbench is a visual tool for database design, management, and querying.",
    explanation:
      "It provides a GUI for creating tables, running queries, designing EER diagrams, and managing MySQL servers.",
    hint: "Think about a visual tool for MySQL.",
    level: "basic",
  },
  {
    question: "What is the purpose of the `mysqldump` command?",
    shortAnswer:
      "`mysqldump` is a utility for backing up MySQL databases by generating SQL scripts.",
    explanation:
      "It exports the database structure and data into a SQL file, which can be used to restore the database.",
    hint: "Think about backing up a database.",
    level: "intermediate",
  },
  {
    question: "What is the difference between MySQL and SQL?",
    shortAnswer:
      "SQL is the structured query language; MySQL is a database management system that uses SQL.",
    explanation:
      "SQL is the language used to interact with databases. MySQL is one of the many RDBMS that implement SQL.",
    hint: "Think about the language vs. the software.",
    level: "basic",
  },
  {
    question: "What is the difference between MySQL and MariaDB?",
    shortAnswer:
      "MariaDB is a fork of MySQL created by the original developers after Oracle acquired MySQL.",
    explanation:
      "MariaDB is compatible with MySQL and includes additional features and performance improvements. It is maintained by the MariaDB Foundation.",
    hint: "Think about the open-source fork.",
    level: "intermediate",
  },
  {
    question: "What are the MySQL data types?",
    shortAnswer:
      "Common MySQL data types include INT, VARCHAR, CHAR, DATE, DATETIME, TIMESTAMP, DECIMAL, FLOAT, TEXT, and JSON.",
    explanation:
      "Choosing the right data type is crucial for storage efficiency and query performance.",
    hint: "Think about the types of values you store.",
    level: "basic",
  },
  {
    question: "What is the `AUTO_INCREMENT` attribute in MySQL?",
    shortAnswer:
      "`AUTO_INCREMENT` automatically generates a unique sequential number for a column when a new row is inserted.",
    explanation:
      "It's commonly used for primary keys. For example, `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100));`",
    hint: "Think about automatically generated IDs.",
    level: "basic",
  },
  {
    question: "What is the difference between `CHAR` and `VARCHAR` in MySQL?",
    shortAnswer:
      "`CHAR` is a fixed-length string (padded with spaces), while `VARCHAR` is a variable-length string.",
    explanation:
      "`CHAR` is better for short, fixed-length strings (like 'M', 'F'). `VARCHAR` is better for variable-length strings and saves storage.",
    hint: "Think about fixed vs. variable length.",
    level: "intermediate",
  },
  {
    question: "What is the `TIMESTAMP` vs `DATETIME` data type?",
    shortAnswer:
      "`TIMESTAMP` stores date and time with timezone support and a range of 1970-2038. `DATETIME` stores date and time without timezone and has a larger range.",
    explanation:
      "`TIMESTAMP` is useful for tracking when events occurred and is automatically converted to UTC.",
    hint: "Think about time zone handling.",
    level: "intermediate",
  },
  {
    question: "What is the difference between `DELETE` and `TRUNCATE` in MySQL?",
    shortAnswer:
      "`DELETE` removes rows one by one and can be rolled back. `TRUNCATE` removes all rows in one operation and cannot be rolled back (in many databases).",
    explanation:
      "`TRUNCATE` is faster because it doesn't log individual row deletions and resets auto-increment counters.",
    hint: "Think about the speed and ability to rollback.",
    level: "intermediate",
  },
  {
    question: "What is a MySQL view?",
    shortAnswer:
      "A view is a virtual table based on a SELECT query. It presents data without storing it physically.",
    explanation:
      "Views can simplify complex queries, restrict access to specific data, and provide a layer of abstraction.",
    hint: "Think about a saved query that looks like a table.",
    level: "intermediate",
  },
  {
    question: "What is a stored procedure in MySQL?",
    shortAnswer:
      "A stored procedure is a pre-compiled block of SQL code stored in the database that can be executed repeatedly.",
    explanation:
      "Procedures can accept parameters, contain logic, and perform complex operations. They improve performance and security.",
    hint: "Think about a reusable query or function.",
    level: "intermediate",
  },
  {
    question: "What is a trigger in MySQL?",
    shortAnswer:
      "A trigger is a piece of code that automatically executes in response to certain events (INSERT, UPDATE, DELETE) on a table.",
    explanation:
      "Triggers enforce business rules, maintain audit trails, or automate actions.",
    hint: "Think about automatic actions on data changes.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the `EXPLAIN` command in MySQL?",
    shortAnswer:
      "`EXPLAIN` shows the execution plan of a query, helping to identify performance bottlenecks.",
    explanation:
      "It displays how MySQL uses indexes, join types, and row estimations. It's essential for query optimization.",
    hint: "Think about analysing query performance.",
    level: "intermediate",
  },
  {
    question: "What are the MySQL user privileges?",
    shortAnswer:
      "MySQL privileges control what actions users can perform, such as SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, etc.",
    explanation:
      "Privileges are managed with `GRANT` and `REVOKE` commands. They ensure database security.",
    hint: "Think about granting permissions.",
    level: "intermediate",
  },
  {
    question: "What is the `GRANT` command in MySQL?",
    shortAnswer:
      "`GRANT` gives specific privileges to a user or role on database objects.",
    explanation:
      "For example: `GRANT SELECT ON mydb.* TO 'user1'@'localhost';`",
    hint: "Think about giving access.",
    level: "intermediate",
  },
  {
    question: "What is MySQL replication?",
    shortAnswer:
      "MySQL replication is the process of copying data from a master database to one or more slave databases.",
    explanation:
      "It's used for high availability, load balancing, and disaster recovery. There are various replication formats: statement-based, row-based, and mixed.",
    hint: "Think about copying data to another server.",
    level: "expert",
  },
  {
    question: "What is the MySQL `INFORMATION_SCHEMA` database?",
    shortAnswer:
      "`INFORMATION_SCHEMA` is a database that stores metadata about all database objects (tables, columns, privileges, etc.).",
    explanation:
      "It allows querying the database structure using SQL. For example: `SELECT * FROM INFORMATION_SCHEMA.TABLES;`",
    hint: "Think about a database that describes other databases.",
    level: "expert",
  },
  {
    question: "What is the purpose of the `mysql` database?",
    shortAnswer:
      "The `mysql` database stores user accounts, privileges, and system metadata in MySQL.",
    explanation:
      "It contains tables like `user`, `db`, `tables_priv`, and `columns_priv` for access control.",
    hint: "Think about the system database.",
    level: "intermediate",
  },
  {
    question: "What is the difference between MySQL 5.7 and MySQL 8.0?",
    shortAnswer:
      "MySQL 8.0 introduces window functions, common table expressions (CTEs), improved JSON support, and better performance.",
    explanation:
      "8.0 also includes a new data dictionary, atomic DDL, and improved security features.",
    hint: "Think about modern SQL features.",
    level: "expert",
  },
  {
    question: "What are the MySQL system variables?",
    shortAnswer:
      "System variables configure MySQL's behaviour, such as `max_connections`, `innodb_buffer_pool_size`, and `query_cache_size`.",
    explanation:
      "They can be set globally or per session. Use `SHOW VARIABLES` to view them.",
    hint: "Think about configuration settings.",
    level: "expert",
  },
  {
    question: "How does MySQL handle transactions?",
    shortAnswer:
      "MySQL handles transactions using the InnoDB engine, supporting `START TRANSACTION`, `COMMIT`, and `ROLLBACK` statements.",
    explanation:
      "Transactions ensure ACID properties. InnoDB uses locking and MVCC to manage concurrency.",
    hint: "Think about ACID compliance.",
    level: "intermediate",
  },
  {
    question: "What is the role of the `mysql` command-line client?",
    shortAnswer:
      "The `mysql` command-line client is a tool for interacting with MySQL databases from the terminal.",
    explanation:
      "It allows executing SQL queries, managing databases, and administering the MySQL server.",
    hint: "Think about the terminal interface.",
    level: "basic",
  },
];

export default questions;