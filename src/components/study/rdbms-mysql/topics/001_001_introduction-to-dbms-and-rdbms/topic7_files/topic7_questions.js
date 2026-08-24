/**
 * Topic 7: Features of DBMS – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the main features of a DBMS?",
    shortAnswer:
      "Main features include: data storage and retrieval, query language (SQL), security, data integrity, concurrency control, transaction management, backup/recovery, data independence, and scalability.",
    explanation:
      "A DBMS provides a comprehensive set of features to manage data efficiently, securely, and reliably. These features address the limitations of file-based systems.",
    hint: "Think about everything a database needs to do beyond just storing data.",
    level: "basic",
  },
  {
    question: "What is data independence and why is it important?",
    shortAnswer:
      "Data independence means changes to the database structure (schema) or storage do not affect applications using the data.",
    explanation:
      "Physical data independence allows changes to storage (like adding indexes) without application changes. Logical data independence allows schema changes (like adding columns) without breaking existing queries.",
    hint: "Think about adding a new column to a table without rewriting all queries.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS ensure data integrity?",
    shortAnswer:
      "A DBMS enforces data integrity through constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK) and triggers.",
    explanation:
      "These rules ensure that data is always valid according to business rules. The DBMS checks these constraints before allowing any data modification, preventing invalid data from being stored.",
    hint: "Think about how a database prevents you from entering a negative age.",
    level: "intermediate",
  },
  {
    question: "What is concurrency control in a DBMS?",
    shortAnswer:
      "Concurrency control allows multiple users to access and modify data simultaneously without conflicts or data corruption.",
    explanation:
      "It uses techniques like locking, transaction isolation levels, and MVCC to manage concurrent access. This ensures that transactions are isolated from each other.",
    hint: "Think about how multiple people can update a bank database simultaneously.",
    level: "intermediate",
  },
  {
    question: "What is transaction management in a DBMS?",
    shortAnswer:
      "Transaction management ensures that database operations are executed reliably with ACID properties (Atomicity, Consistency, Isolation, Durability).",
    explanation:
      "It handles commit and rollback operations. If a transaction fails, changes are rolled back. If it succeeds, changes are permanently committed.",
    hint: "Think about a bank transfer: either both accounts are updated or none.",
    level: "intermediate",
  },
  {
    question: "What is ACID in DBMS?",
    shortAnswer:
      "ACID stands for Atomicity, Consistency, Isolation, and Durability — properties that guarantee reliable transaction processing.",
    explanation:
      "Atomicity: all-or-nothing execution. Consistency: data follows rules. Isolation: transactions don't interfere. Durability: committed changes persist even after failures.",
    hint: "Think about what makes a bank transaction reliable.",
    level: "basic",
  },
  {
    question: "How does a DBMS provide security?",
    shortAnswer:
      "A DBMS provides authentication, authorisation (role-based access control), encryption, and auditing.",
    explanation:
      "Authentication verifies user identity. Authorisation controls what data users can access. Encryption protects data at rest and in transit. Auditing tracks all access for compliance.",
    hint: "Think about how a hospital ensures only doctors can see patient records.",
    level: "intermediate",
  },
  {
    question: "What is the role of SQL in a DBMS?",
    shortAnswer:
      "SQL (Structured Query Language) is the standard language for defining, manipulating, and querying data in a relational DBMS.",
    explanation:
      "SQL includes DDL (CREATE, ALTER, DROP) for schema definition, DML (INSERT, UPDATE, DELETE, SELECT) for data manipulation, and DCL (GRANT, REVOKE) for access control.",
    hint: "Think about how you talk to the database to get information.",
    level: "basic",
  },
  {
    question: "What is backup and recovery in a DBMS?",
    shortAnswer:
      "Backup and recovery provide mechanisms to protect data from loss and restore it to a consistent state after failures.",
    explanation:
      "Backup creates copies of the database. Recovery uses backups and transaction logs to restore the database to a specific point in time. This is essential for disaster recovery.",
    hint: "Think about how a database can recover to just before a power outage.",
    level: "intermediate",
  },
  {
    question: "What is scalability in a DBMS?",
    shortAnswer:
      "Scalability is the ability to handle increasing data volumes and user loads by adding resources (vertical or horizontal scaling).",
    explanation:
      "Vertical scaling adds more power to a single server. Horizontal scaling adds more servers. DBMS support both through partitioning, sharding, and replication.",
    hint: "Think about how a popular website handles millions of users.",
    level: "intermediate",
  },
  {
    question: "What is the difference between DDL and DML in a DBMS?",
    shortAnswer:
      "DDL (Data Definition Language) defines the database schema. DML (Data Manipulation Language) manipulates the data within that schema.",
    explanation:
      "DDL commands: CREATE, ALTER, DROP. DML commands: INSERT, UPDATE, DELETE, SELECT. Both are essential for database management.",
    hint: "Think about the difference between building a house (DDL) and moving furniture (DML).",
    level: "basic",
  },
  {
    question: "How does a DBMS support data independence?",
    shortAnswer:
      "A DBMS provides data independence by separating logical schema from physical storage, using a three-level architecture (external, conceptual, internal).",
    explanation:
      "This separation allows changes to the physical storage or the logical schema without affecting applications. It reduces maintenance costs and improves flexibility.",
    hint: "Think about how you can change the structure of a table without rewriting all the code.",
    level: "expert",
  },
  {
    question: "What is the role of indexes in a DBMS?",
    shortAnswer:
      "Indexes are data structures that speed up data retrieval by allowing the DBMS to find rows without scanning the entire table.",
    explanation:
      "They are created on columns used in WHERE clauses, JOINs, and ORDER BY. Indexes improve read performance but add overhead to writes. They are a key performance feature.",
    hint: "Think about the index at the back of a book.",
    level: "intermediate",
  },
  {
    question: "What is a view in a DBMS and what feature does it provide?",
    shortAnswer:
      "A view is a virtual table based on a SQL query. It provides an abstraction layer, data security, and simplified access.",
    explanation:
      "Views can restrict access to specific columns or rows, simplify complex queries, and provide a consistent interface even as underlying tables change.",
    hint: "Think about a filtered or combined view of data from multiple tables.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS handle data validation?",
    shortAnswer:
      "A DBMS validates data using constraints (CHECK, NOT NULL, UNIQUE) and triggers to enforce business rules.",
    explanation:
      "Validation happens at the database level, ensuring that no invalid data is ever stored. This is more reliable than application-level validation.",
    hint: "Think about how a database ensures marks are between 0 and 100.",
    level: "intermediate",
  },
  {
    question: "What are stored procedures in a DBMS?",
    shortAnswer:
      "Stored procedures are pre-compiled SQL code stored in the database that can be executed to perform complex operations.",
    explanation:
      "They improve performance, reduce network traffic, encapsulate business logic, and enhance security. They are a powerful feature for database applications.",
    hint: "Think about a macro that runs a series of SQL commands.",
    level: "intermediate",
  },
  {
    question: "What is the feature of data abstraction in a DBMS?",
    shortAnswer:
      "Data abstraction hides the complexity of physical storage from users, providing a simple, logical view of data.",
    explanation:
      "Users interact with tables and rows, not with files and bytes. This simplifies application development and maintenance.",
    hint: "Think about how you don't need to know how data is stored on disk.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS provide multi-user access?",
    shortAnswer:
      "A DBMS provides multi-user access through concurrency control and transaction management, allowing many users to work simultaneously.",
    explanation:
      "Users can access and modify data at the same time without conflicts. The DBMS manages locking, isolation, and scheduling to ensure data consistency.",
    hint: "Think about how thousands of customers can use an online banking system at once.",
    level: "intermediate",
  },
  {
    question: "What is the feature of schema management in a DBMS?",
    shortAnswer:
      "Schema management allows users to define, modify, and manage the database structure (tables, columns, constraints, relationships).",
    explanation:
      "It uses DDL statements to create, alter, and drop schema elements. Modern DBMS support online schema changes with minimal downtime.",
    hint: "Think about how you define the structure of a database.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS support relationship management?",
    shortAnswer:
      "A DBMS supports relationships between entities using foreign keys, ensuring referential integrity and enabling JOIN operations.",
    explanation:
      "Relationships (one-to-one, one-to-many, many-to-many) are defined in the schema. The DBMS enforces these relationships and allows complex queries across related tables.",
    hint: "Think about how students and courses are linked in a database.",
    level: "intermediate",
  },
  {
    question: "What is the performance monitoring feature of a DBMS?",
    shortAnswer:
      "Performance monitoring provides tools to track query performance, resource usage, and system health for optimisation.",
    explanation:
      "Features include: query execution plans, slow query logs, performance dashboards, and monitoring of CPU, memory, and disk I/O. This helps identify and fix bottlenecks.",
    hint: "Think about how a DBA can see which queries are slow.",
    level: "intermediate",
  },
  {
    question: "What are the advantages of using built-in DBMS features?",
    shortAnswer:
      "Built-in features are reliable, optimised, secure, and reduce development time, making applications more robust and maintainable.",
    explanation:
      "Implementing security, integrity, and concurrency controls from scratch is error-prone and time-consuming. Using DBMS features is safer and more efficient.",
    hint: "Think about why you shouldn't write your own authentication system.",
    level: "intermediate",
  },
  {
    question: "What is the feature of triggers in a DBMS?",
    shortAnswer:
      "Triggers are automated procedures that execute in response to specific events (INSERT, UPDATE, DELETE) on a table.",
    explanation:
      "They enforce business rules, maintain audit trails, and automate tasks. They run automatically at the database level, ensuring consistent enforcement.",
    hint: "Think about automatically logging changes to a table.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS support data distribution?",
    shortAnswer:
      "A DBMS supports data distribution through replication, partitioning, and distributed query processing.",
    explanation:
      "Data can be distributed across multiple servers for performance and availability. The DBMS handles the complexity of distributing data and queries.",
    hint: "Think about how data is stored across different geographic regions.",
    level: "expert",
  },
  {
    question: "What is the role of the data dictionary in a DBMS?",
    shortAnswer:
      "The data dictionary stores metadata about the database schema, users, permissions, and constraints, used by the DBMS to manage data.",
    explanation:
      "It automatically tracks all database objects and their properties. It is essential for enforcing integrity and validating queries.",
    hint: "Think about a catalog of all the information about the database itself.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS handle large objects (BLOBs, CLOBs)?",
    shortAnswer:
      "A DBMS supports large objects like images, videos, and long text using BLOB (Binary Large Object) and CLOB (Character Large Object) data types.",
    explanation:
      "These are stored separately from regular data but can be accessed through SQL. Some DBMS also provide streaming for efficient handling.",
    hint: "Think about storing images or PDFs in a database.",
    level: "intermediate",
  },
  {
    question: "What is the feature of data compression in a DBMS?",
    shortAnswer:
      "Data compression reduces storage space and improves I/O performance by compressing data at the database level.",
    explanation:
      "Compression is transparent to applications. It reduces storage costs and can improve performance for I/O-bound workloads.",
    hint: "Think about reducing the size of a database.",
    level: "expert",
  },
  {
    question: "How does a DBMS support data warehousing?",
    shortAnswer:
      "A DBMS supports data warehousing through features like materialised views, partitioning, and optimised query processing for analytical workloads.",
    explanation:
      "These features handle large volumes of historical data and complex analytical queries. They are essential for business intelligence.",
    hint: "Think about how a company analyses years of sales data.",
    level: "expert",
  },
  {
    question: "What are the emerging features in modern DBMS?",
    shortAnswer:
      "Emerging features include: AI-driven automation, serverless architecture, multi-model support, and built-in machine learning.",
    explanation:
      "DBMS are becoming more intelligent and easier to manage. Features like automatic tuning, anomaly detection, and predictive analytics are being integrated.",
    hint: "Think about how databases are becoming smarter and more automated.",
    level: "expert",
  },
  {
    question: "How do you choose a DBMS based on its features?",
    shortAnswer:
      "Evaluate your needs: data model, scalability, consistency, performance, security, and cost. Choose a DBMS that matches your requirements.",
    explanation:
      "For structured data with ACID requirements, choose RDBMS. For high-volume, flexible data, choose NoSQL. For managed services, choose cloud DBMS.",
    hint: "Think about what you need to store and how you need to access it.",
    level: "expert",
  },
  {
    question: "What is the difference between features of RDBMS and NoSQL DBMS?",
    shortAnswer:
      "RDBMS features include ACID, SQL, and fixed schemas. NoSQL features include flexibility, horizontal scalability, and schema-less design.",
    explanation:
      "RDBMS is best for structured data and complex transactions. NoSQL is best for high-volume, unstructured data and distributed systems.",
    hint: "Think about the trade-offs between consistency and scalability.",
    level: "intermediate",
  },
];

export default questions;