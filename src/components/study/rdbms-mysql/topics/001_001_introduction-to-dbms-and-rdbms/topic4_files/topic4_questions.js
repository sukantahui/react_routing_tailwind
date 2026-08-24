/**
 * Topic 4: Traditional File System vs Database System – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is a traditional file system in the context of data storage?",
    shortAnswer:
      "A traditional file system stores data in unstructured or semi-structured files (text, binary, CSV) without built-in relationships or management features.",
    explanation:
      "Files are typically stored on a disk with a directory structure. Data is accessed by reading the entire file or scanning sequentially. There is no built-in query language, integrity constraints, or concurrency control.",
    hint: "Think about how you store a list of students in a text file.",
    level: "basic",
  },
  {
    question: "What is a database system?",
    shortAnswer:
      "A database system is a software system that stores structured data in tables with relationships, provides a query language (SQL), and ensures data integrity, security, and concurrency.",
    explanation:
      "It consists of the data itself, the DBMS (Database Management System), and the applications that interact with it. It supports ACID transactions, indexing, and complex querying.",
    hint: "Think about how a bank stores account information with transactions.",
    level: "basic",
  },
  {
    question: "What are the main differences between file systems and database systems?",
    shortAnswer:
      "File systems are simple, unstructured, and lack relationships, concurrency, and security. Database systems are structured, support relationships, enforce integrity, and handle multi-user access.",
    explanation:
      "The key differences are in data structure, redundancy, consistency, concurrency, security, querying, backup, and scalability. Each has its own strengths and weaknesses.",
    hint: "Think about the difference between a filing cabinet and a library with a catalog system.",
    level: "basic",
  },
  {
    question: "Why do databases reduce data redundancy compared to file systems?",
    shortAnswer:
      "Databases use normalisation to store data in related tables, avoiding duplicate data across different files.",
    explanation:
      "In a file system, the same data (like a student's name) might appear in multiple files (attendance, marks, address). In a database, it's stored once in a student table and referenced by other tables via foreign keys.",
    hint: "Think about how a student's name appears in many places in a file-based system.",
    level: "intermediate",
  },
  {
    question: "What is data inconsistency and why is it common in file systems?",
    shortAnswer:
      "Data inconsistency occurs when different copies of the same data do not match. It's common in file systems because updates must be manually applied to all copies.",
    explanation:
      "For example, if a student changes their address, you must update every file that contains the address. If you miss one, the data becomes inconsistent. Databases avoid this by storing data in a single place.",
    hint: "Think about how your address might be different in different systems.",
    level: "intermediate",
  },
  {
    question: "How do databases ensure data consistency?",
    shortAnswer:
      "Databases use constraints (primary keys, foreign keys, check constraints), transactions, and ACID properties to maintain consistency.",
    explanation:
      "Constraints prevent invalid data entry. Transactions ensure that a series of operations is atomic — either all succeed or none. Isolation prevents interference from concurrent transactions.",
    hint: "Think about how a bank ensures that money is not lost during a transfer.",
    level: "intermediate",
  },
  {
    question: "What is concurrency and why is it a problem in file systems?",
    shortAnswer:
      "Concurrency is the ability of multiple users to access data simultaneously. File systems lack proper concurrency control, leading to file corruption or inconsistent reads.",
    explanation:
      "If two users try to write to the same file at the same time, one may overwrite the other's changes. File locking exists but is crude and often prevents concurrent access altogether. Databases use sophisticated locking and transaction isolation.",
    hint: "Think about what happens when two teachers try to update the same mark sheet file at the same time.",
    level: "intermediate",
  },
  {
    question: "How do databases handle concurrency?",
    shortAnswer:
      "Databases use locking mechanisms, transaction isolation levels, and MVCC (Multi-Version Concurrency Control) to allow multiple users to access data safely.",
    explanation:
      "These mechanisms ensure that transactions are isolated from each other, preventing dirty reads, non-repeatable reads, and phantom reads. The choice of isolation level balances consistency and performance.",
    hint: "Think about how a database prevents one user from seeing uncommitted changes of another.",
    level: "expert",
  },
  {
    question: "What is the role of SQL in database systems?",
    shortAnswer:
      "SQL (Structured Query Language) is the standard language for querying, manipulating, and defining data in relational databases.",
    explanation:
      "SQL is declarative, meaning you specify what you want, not how to get it. It allows complex queries, joins, aggregations, and data manipulation. File systems have no equivalent.",
    hint: "Think about how you ask the database for 'all students in Class 10'.",
    level: "basic",
  },
  {
    question: "What are the security differences between file systems and databases?",
    shortAnswer:
      "File systems provide basic OS-level permissions (read/write/execute). Databases offer fine-grained security: roles, users, table-level access, column-level encryption, and auditing.",
    explanation:
      "Databases can control who can see specific rows or columns, and they can log all access attempts. This is critical for compliance (GDPR, HIPAA). File systems lack such granularity.",
    hint: "Think about how a hospital restricts access to patient records based on roles.",
    level: "intermediate",
  },
  {
    question: "When would you choose a file system over a database?",
    shortAnswer:
      "Choose a file system for simple, single-user applications, configuration files, log files, or when the data volume is very small and querying is minimal.",
    explanation:
      "If you don't need relationships, concurrency, or complex queries, a file system is simpler and faster. Examples: storing application settings, temporary files, or exporting data for exchange.",
    hint: "Think about whether a library's catalog could be stored in a single text file.",
    level: "intermediate",
  },
  {
    question: "When is a database system the clear winner?",
    shortAnswer:
      "A database is superior for multi-user applications, complex relationships, data integrity requirements, security needs, and when data will grow over time.",
    explanation:
      "If your application has multiple users, requires consistent data, complex queries, or must comply with regulations, a database is necessary. Examples: e-commerce, banking, school management.",
    hint: "Think about why Amazon or Flipkart uses databases, not files.",
    level: "basic",
  },
  {
    question: "What is data independence and why is it important?",
    shortAnswer:
      "Data independence means that changes in the storage structure (physical) or schema (logical) do not affect the applications that use the data.",
    explanation:
      "In file systems, changing the file format breaks applications. In databases, the DBMS abstracts the physical storage, so you can add indexes or change storage without rewriting applications.",
    hint: "Think about how you can add a column to a table without breaking existing queries.",
    level: "expert",
  },
  {
    question: "What is the ACID property in databases and why is it important?",
    shortAnswer:
      "ACID stands for Atomicity, Consistency, Isolation, Durability — they guarantee reliable transaction processing.",
    explanation:
      "Atomicity: all or nothing. Consistency: data follows rules. Isolation: concurrent transactions don't interfere. Durability: committed changes persist. These properties ensure data integrity even in the presence of failures.",
    hint: "Think about why a bank transfer must be atomic.",
    level: "expert",
  },
  {
    question: "How do databases handle backup and recovery compared to file systems?",
    shortAnswer:
      "Databases offer automated backup, point-in-time recovery, and transaction logs. File systems rely on manual copies.",
    explanation:
      "Databases can restore to a specific moment before a failure using transaction logs. They also support online backups (backup while running). File systems only have file-level backup, and recovery is manual.",
    hint: "Think about how a database can recover to a state just before a power outage.",
    level: "intermediate",
  },
  {
    question: "What is scalability and how do databases scale better than file systems?",
    shortAnswer:
      "Scalability is the ability to handle growth. Databases can scale vertically (more powerful hardware) and horizontally (distributed across servers), while file systems are limited to vertical scaling.",
    explanation:
      "Sharding, replication, and clustering are common database techniques for horizontal scaling. File systems have no built-in distribution and become a bottleneck as data grows.",
    hint: "Think about how a website can handle millions of users using distributed databases.",
    level: "intermediate",
  },
  {
    question: "What are the cost implications of choosing a database vs a file system?",
    shortAnswer:
      "File systems are cheaper upfront (no licensing, simple administration). Databases have higher costs (licensing, hardware, DBA salaries) but can save costs in the long term through efficiency and reliability.",
    explanation:
      "While a database may cost more initially, it reduces maintenance time, prevents data corruption, and supports business growth. The cost of data loss or downtime can far exceed the cost of a database.",
    hint: "Think about the cost of fixing data inconsistencies manually.",
    level: "intermediate",
  },
  {
    question: "What is the role of indexes in a database and do file systems have them?",
    shortAnswer:
      "Indexes are data structures that speed up data retrieval in databases. File systems do not have indexes; they rely on file names and directory structures.",
    explanation:
      "Without indexes, searching a large file requires scanning the entire file. Databases allow you to create indexes on columns, making queries extremely fast. This is a major advantage.",
    hint: "Think about how you use the index at the back of a book to find information quickly.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a file and a table in a database?",
    shortAnswer:
      "A file is an unstructured or semi-structured container of data. A table is a structured entity with rows and columns, relationships, and constraints.",
    explanation:
      "A table enforces data types, integrity rules, and relationships. A file is just a byte stream. Tables are the fundamental unit of data organisation in relational databases.",
    hint: "Think about the difference between a spreadsheet and a plain text file.",
    level: "basic",
  },
  {
    question: "How do databases enforce business rules compared to file systems?",
    shortAnswer:
      "Databases enforce business rules through constraints (CHECK, UNIQUE, FOREIGN KEY) and triggers, while file systems have no built-in mechanism.",
    explanation:
      "For example, you can enforce that marks must be between 0 and 100 using a CHECK constraint. In a file system, this must be done in application code, which can be bypassed.",
    hint: "Think about why you can't enter a negative mark in a database.",
    level: "intermediate",
  },
  {
    question: "What is the role of a DBA (Database Administrator) versus a system administrator for files?",
    shortAnswer:
      "A DBA manages the database: performance tuning, backup, security, schema design. A system admin manages the operating system and file systems.",
    explanation:
      "Database administration requires specialised knowledge of the DBMS, SQL, and performance tuning. File system administration is more generic.",
    hint: "Think about who would set up a database for a company.",
    level: "intermediate",
  },
  {
    question: "What are the data modelling differences between files and databases?",
    shortAnswer:
      "File systems have no data model — data is stored in whatever format the application decides. Databases use a data model (relational, document, graph) that defines structure and relationships.",
    explanation:
      "The data model provides a blueprint for how data is organised and how entities relate. It enables querying and integrity enforcement.",
    hint: "Think about how a relational model uses tables linked by keys.",
    level: "intermediate",
  },
  {
    question: "How do databases handle schema changes compared to file systems?",
    shortAnswer:
      "Databases support ALTER TABLE statements to modify schema with minimal disruption. File systems require manual file format changes and often application rewrites.",
    explanation:
      "You can add or remove columns, change data types, and add constraints in a database without affecting existing data. In file systems, you might need to rewrite the entire file or write conversion scripts.",
    hint: "Think about adding a new column to a database table.",
    level: "intermediate",
  },
  {
    question: "What is the role of a transaction log in a database?",
    shortAnswer:
      "A transaction log records all changes made to the database, enabling recovery and rollback.",
    explanation:
      "In case of a crash, the log allows the database to replay committed transactions and undo uncommitted ones. This ensures durability and atomicity.",
    hint: "Think about how a journal keeps a record of changes.",
    level: "expert",
  },
  {
    question: "What are the performance differences between files and databases for large datasets?",
    shortAnswer:
      "Databases can handle large datasets efficiently through indexing, caching, and query optimisation. File systems require custom code and become slow for large files.",
    explanation:
      "Files must be scanned sequentially for searches, which is O(n). Databases can use indexes for O(log n) or O(1) lookups. Databases also use caching to reduce disk I/O.",
    hint: "Think about how quickly a database can find a record in a million-row table.",
    level: "intermediate",
  },
  {
    question: "What is the difference between structured and unstructured data in this context?",
    shortAnswer:
      "Structured data fits neatly into tables (databases). Unstructured data (text, images) is often stored in files.",
    explanation:
      "While databases are best for structured data, many modern databases (like MongoDB) support unstructured data. However, files are still common for large blobs.",
    hint: "Think about the difference between a database table and a folder of images.",
    level: "intermediate",
  },
  {
    question: "What are the pros and cons of using a file system for logging?",
    shortAnswer:
      "Pros: simple, fast for appending. Cons: hard to query, no concurrency control, no built-in rotation/compression.",
    explanation:
      "Log files are often written sequentially, making file systems a good choice. However, if you need to search logs, a database or specialised logging system might be better.",
    hint: "Think about how application logs are written to files and how hard it is to search them.",
    level: "intermediate",
  },
  {
    question: "What is the migration cost from file system to database?",
    shortAnswer:
      "Migration costs include designing the database schema, extracting data from files, transforming it, loading it, and updating applications.",
    explanation:
      "It's often expensive and time-consuming. Planning ahead to use a database from the start is cheaper.",
    hint: "Think about the effort to move a school's records from spreadsheets to a database.",
    level: "intermediate",
  },
  {
    question: "What are the common mistakes when comparing file systems and databases?",
    shortAnswer:
      "Common mistakes: assuming databases are always slower, not considering data growth, overlooking concurrency needs, and underestimating integrity and security.",
    explanation:
      "Beginners might choose files for simplicity and later regret it. Others might choose databases for everything, including trivial use cases. The key is to evaluate actual requirements.",
    hint: "Think about why a simple todo list app might not need a database.",
    level: "intermediate",
  },
  {
    question: "How do modern applications combine file systems and databases?",
    shortAnswer:
      "Modern apps often use databases for structured data and file systems (or object storage) for large files like images, videos, and documents.",
    explanation:
      "For example, an e-commerce site stores product details in a database and product images in a cloud storage service. This hybrid approach leverages the strengths of both.",
    hint: "Think about how a social media app stores user profiles in a database and photos in a storage service.",
    level: "intermediate",
  },
  {
    question: "What are the emerging trends that blur the line between file systems and databases?",
    shortAnswer:
      "Emerging trends include NewSQL databases that combine SQL with scalability, and data lakes that store raw data in files but provide query capabilities.",
    explanation:
      "Data lakes store unstructured data in cloud storage but offer query engines (like Presto) to process it like a database. This hybrid approach is gaining popularity in big data.",
    hint: "Think about how you can query a CSV file using SQL in tools like Apache Spark.",
    level: "expert",
  },
];

export default questions;