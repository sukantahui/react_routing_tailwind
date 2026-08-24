/**
 * Topic 13: DBMS vs RDBMS – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is the main difference between DBMS and RDBMS?",
    shortAnswer:
      "DBMS is a general database management system, while RDBMS is a specific type based on the relational model with tables, keys, and relationships.",
    explanation:
      "RDBMS enforces relationships via foreign keys, supports SQL, and provides ACID transactions. DBMS may be hierarchical, network, or file-based without these features.",
    hint: "Think about which one uses tables and relationships.",
    level: "basic",
  },
  {
    question: "Is every DBMS an RDBMS?",
    shortAnswer:
      "No, not every DBMS is an RDBMS. RDBMS is a specific type that follows the relational model.",
    explanation:
      "Some DBMS are hierarchical (IMS), network (IDMS), or file-based. Only those that implement the relational model qualify as RDBMS.",
    hint: "Think about the difference between a general system and a specific type.",
    level: "basic",
  },
  {
    question: "Is every RDBMS a DBMS?",
    shortAnswer:
      "Yes, every RDBMS is a DBMS because it manages databases. RDBMS is a subset of DBMS.",
    explanation:
      "RDBMS provides all the basic DBMS functionalities (storage, retrieval, security) plus relational features.",
    hint: "Think about the relationship between a general category and a subcategory.",
    level: "basic",
  },
  {
    question: "What are the key features that differentiate RDBMS from DBMS?",
    shortAnswer:
      "Key differentiators include: relational model (tables), foreign keys, integrity constraints, SQL, and ACID transactions.",
    explanation:
      "RDBMS also supports normalisation, data independence, and set-based queries, which are absent in many older DBMS.",
    hint: "Think about the features that make RDBMS special.",
    level: "intermediate",
  },
  {
    question: "What is the role of foreign keys in RDBMS that is absent in DBMS?",
    shortAnswer:
      "Foreign keys enforce relationships between tables, ensuring referential integrity. DBMS does not have this feature.",
    explanation:
      "Foreign keys link a column in one table to the primary key of another, preventing orphaned records. This is a core feature of RDBMS.",
    hint: "Think about how tables are linked in an RDBMS.",
    level: "intermediate",
  },
  {
    question: "What is SQL and why is it associated with RDBMS?",
    shortAnswer:
      "SQL (Structured Query Language) is the standard language for querying and managing relational databases, used by RDBMS.",
    explanation:
      "SQL provides a declarative way to define schemas, manipulate data, and query relationships. Non-relational DBMS have proprietary or no query language.",
    hint: "Think about the language used to talk to a relational database.",
    level: "basic",
  },
  {
    question: "Why do RDBMS enforce data integrity better than DBMS?",
    shortAnswer:
      "RDBMS enforces integrity through constraints (PRIMARY KEY, FOREIGN KEY, CHECK, UNIQUE) at the database level, while DBMS relies on application code.",
    explanation:
      "Database-level constraints are more reliable because they are enforced consistently regardless of which application accesses the data.",
    hint: "Think about the difference between rules in the database vs. in the application.",
    level: "intermediate",
  },
  {
    question: "What is ACID and why is it important in RDBMS?",
    shortAnswer:
      "ACID (Atomicity, Consistency, Isolation, Durability) ensures reliable transaction processing, a key feature of RDBMS.",
    explanation:
      "DBMS may not fully support ACID. ACID is critical for financial and business applications where data consistency is paramount.",
    hint: "Think about what makes a bank transaction reliable.",
    level: "intermediate",
  },
  {
    question: "What are examples of non-relational DBMS?",
    shortAnswer:
      "Examples include hierarchical DBMS like IMS, network DBMS like IDMS, and simple file-based systems.",
    explanation:
      "These systems predate the relational model and are still used in legacy applications. They do not use tables and SQL.",
    hint: "Think about databases from the early days of computing.",
    level: "intermediate",
  },
  {
    question: "What are examples of RDBMS?",
    shortAnswer:
      "Examples include MySQL, PostgreSQL, Oracle Database, Microsoft SQL Server, and IBM Db2.",
    explanation:
      "These are the most widely used RDBMS in modern applications, each with its own strengths and ecosystem.",
    hint: "Think about the databases you've heard of in web development and enterprise.",
    level: "basic",
  },
  {
    question: "Why is RDBMS preferred over DBMS for most modern applications?",
    shortAnswer:
      "RDBMS offers data integrity, relationships, standard SQL, ACID transactions, and better scalability, which are essential for complex applications.",
    explanation:
      "Most modern applications require handling complex data relationships, concurrent users, and transaction consistency, which RDBMS provides.",
    hint: "Think about what applications need today.",
    level: "intermediate",
  },
  {
    question: "When would you choose a non-relational DBMS over an RDBMS?",
    shortAnswer:
      "For very simple, single-user applications, or when legacy systems require it, a non-relational DBMS may suffice.",
    explanation:
      "Also for applications that don't need relationships, ACID, or complex queries, a simpler DBMS can be lighter and faster.",
    hint: "Think about when you don't need a full relational database.",
    level: "intermediate",
  },
  {
    question: "What is normalisation and why is it supported by RDBMS?",
    shortAnswer:
      "Normalisation is the process of organising data to reduce redundancy and improve integrity. RDBMS supports it through table design.",
    explanation:
      "Normalisation eliminates data duplication and anomalies. It is a key advantage of the relational model.",
    hint: "Think about why you wouldn't store the same data in multiple places.",
    level: "intermediate",
  },
  {
    question: "What is data independence and how does RDBMS provide it?",
    shortAnswer:
      "Data independence means changes to the physical storage or logical schema do not affect applications. RDBMS provides both physical and logical independence.",
    explanation:
      "Physical independence: storage changes (like adding indexes) don't affect queries. Logical independence: schema changes (like adding columns) don't break existing applications.",
    hint: "Think about adding a column without rewriting all the code.",
    level: "expert",
  },
  {
    question: "What is the difference between relational and hierarchical data models?",
    shortAnswer:
      "The relational model uses tables with relationships, while the hierarchical model organises data in a tree-like structure with parent-child relationships.",
    explanation:
      "Hierarchical models enforce one-to-many relationships and are rigid. Relational models are more flexible and support many-to-many relationships.",
    hint: "Think about the structure: tree vs. table.",
    level: "intermediate",
  },
  {
    question: "What are the limitations of non-relational DBMS that led to RDBMS?",
    shortAnswer:
      "Limitations include: lack of relationships, poor data integrity, no standard query language, and difficulty in handling complex queries.",
    explanation:
      "These limitations made data management error-prone and inefficient, motivating the development of the relational model.",
    hint: "Think about why we needed a better way to manage data.",
    level: "intermediate",
  },
  {
    question: "What is the significance of Codd's 12 rules in distinguishing RDBMS?",
    shortAnswer:
      "Codd's 12 rules define what a fully relational DBMS should support, including data representation, integrity, and querying.",
    explanation:
      "No commercial RDBMS fully complies with all 12 rules, but they serve as a benchmark for relational systems.",
    hint: "Think about the ideal relational database.",
    level: "expert",
  },
  {
    question: "How do integrity constraints in RDBMS compare to DBMS?",
    shortAnswer:
      "RDBMS enforces constraints at the database level, while DBMS relies on application code, which is less reliable.",
    explanation:
      "Database-level constraints ensure data is always valid, even if applications change or bypass validation.",
    hint: "Think about the difference between a rule built into the system vs. an external rule.",
    level: "intermediate",
  },
  {
    question: "What is the role of the query optimizer in RDBMS?",
    shortAnswer:
      "The query optimizer finds the most efficient execution plan for SQL queries, a feature not present in many non-relational DBMS.",
    explanation:
      "This improves performance significantly, especially for complex queries. It's a key advantage of RDBMS.",
    hint: "Think about how a database decides the fastest way to execute a query.",
    level: "expert",
  },
  {
    question: "How do RDBMS handle concurrent access compared to DBMS?",
    shortAnswer:
      "RDBMS uses sophisticated locking and isolation levels to manage concurrency; many DBMS lack such features.",
    explanation:
      "RDBMS ensures that concurrent transactions are isolated, preventing dirty reads and other anomalies.",
    hint: "Think about how multiple users can work simultaneously without conflicts.",
    level: "expert",
  },
  {
    question: "What are the security features of RDBMS that DBMS may lack?",
    shortAnswer:
      "RDBMS provides role-based access control, fine-grained permissions, encryption, and auditing.",
    explanation:
      "These features protect data from unauthorised access and ensure compliance, which are critical for enterprise applications.",
    hint: "Think about how a database protects sensitive information.",
    level: "intermediate",
  },
  {
    question: "Why is SQL considered a powerful advantage of RDBMS?",
    shortAnswer:
      "SQL is a declarative, set-based language that allows complex queries with minimal code, making data access easy.",
    explanation:
      "SQL abstracts the underlying implementation, allowing users to focus on what they need, not how to get it.",
    hint: "Think about how you can ask a complex question in a few lines of code.",
    level: "basic",
  },
  {
    question: "What are the common misconceptions about DBMS vs RDBMS?",
    shortAnswer:
      "A common misconception is that DBMS and RDBMS are the same. Another is that all DBMS support SQL.",
    explanation:
      "Many people use the terms interchangeably, but they are distinct. Non-relational DBMS do not use SQL or support relationships.",
    hint: "Think about the differences you've learned.",
    level: "intermediate",
  },
  {
    question: "How do RDBMS support data warehousing compared to DBMS?",
    shortAnswer:
      "RDBMS support data warehousing with features like partitioning, materialised views, and optimisation for analytical queries.",
    explanation:
      "These features are essential for business intelligence and reporting. Non-relational DBMS are not designed for such workloads.",
    hint: "Think about how you analyse large amounts of historical data.",
    level: "expert",
  },
  {
    question: "What is the difference between DBMS and RDBMS in terms of data redundancy?",
    shortAnswer:
      "RDBMS reduces redundancy through normalisation; DBMS does not enforce normalisation, leading to higher redundancy.",
    explanation:
      "Normalisation is a key feature of the relational model, reducing data duplication and improving data quality.",
    hint: "Think about why you would avoid storing the same data in multiple places.",
    level: "intermediate",
  },
  {
    question: "What is the role of metadata in RDBMS and DBMS?",
    shortAnswer:
      "Both store metadata (data about the database), but RDBMS uses it more extensively for enforcing constraints and optimising queries.",
    explanation:
      "RDBMS's data dictionary contains schema, constraints, and statistics, which are essential for its features.",
    hint: "Think about a catalog of the database structure.",
    level: "intermediate",
  },
  {
    question: "How do RDBMS support application development compared to DBMS?",
    shortAnswer:
      "RDBMS provides standard interfaces (JDBC, ODBC) and tools (stored procedures, triggers) that simplify application development.",
    explanation:
      "These features enable developers to build robust applications faster and with fewer errors.",
    hint: "Think about tools that help you build applications.",
    level: "intermediate",
  },
  {
    question: "What are the cost implications of choosing RDBMS vs DBMS?",
    shortAnswer:
      "RDBMS often have higher licensing and operational costs, but they provide better data quality and lower risk of errors.",
    explanation:
      "Non-relational DBMS may be cheaper initially but can lead to higher maintenance costs due to data inconsistencies.",
    hint: "Think about the cost of data errors vs. the cost of a database license.",
    level: "intermediate",
  },
  {
    question: "How do RDBMS support backup and recovery compared to DBMS?",
    shortAnswer:
      "RDBMS provide comprehensive backup and recovery features, including point-in-time recovery, which are more advanced than DBMS.",
    explanation:
      "Transaction logs and online backups are standard in RDBMS, enabling minimal data loss.",
    hint: "Think about how you recover a database after a crash.",
    level: "intermediate",
  },
  {
    question: "What is the future of RDBMS in the age of NoSQL?",
    shortAnswer:
      "RDBMS continue to evolve, adding JSON support, increased scalability, and cloud-native features, remaining dominant for transactional systems.",
    explanation:
      "RDBMS and NoSQL are complementary. RDBMS excels at structured data and ACID; NoSQL at scalability and flexibility.",
    hint: "Think about how databases are adapting to modern needs.",
    level: "expert",
  },
  {
    question: "How do you decide whether to use a DBMS or RDBMS for a project?",
    shortAnswer:
      "Consider data complexity, need for relationships, transaction requirements, and scalability. RDBMS is usually better for complex, multi-user systems.",
    explanation:
      "For simple, single-user applications, a basic DBMS may suffice. For everything else, RDBMS is the standard choice.",
    hint: "Think about what you need from a database.",
    level: "expert",
  },
];

export default questions;