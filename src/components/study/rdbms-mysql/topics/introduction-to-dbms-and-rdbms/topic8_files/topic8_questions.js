/**
 * Topic 8: Advantages of DBMS – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the main advantages of using a DBMS?",
    shortAnswer:
      "Main advantages include: security, data integrity, concurrency control, transaction management, backup/recovery, data independence, reduced redundancy, consistency, powerful querying, and scalability.",
    explanation:
      "A DBMS provides a comprehensive set of features that address the limitations of file-based systems, making data management more reliable, secure, and efficient.",
    hint: "Think about all the problems of file systems that DBMS solves.",
    level: "basic",
  },
  {
    question: "How does a DBMS improve data security?",
    shortAnswer:
      "A DBMS improves security through authentication, authorization (role-based access), encryption, and auditing.",
    explanation:
      "Users are authenticated before access. Authorisation controls what data they can see or modify. Encryption protects data at rest and in transit. Auditing tracks all activities for compliance.",
    hint: "Think about how a hospital protects patient records.",
    level: "basic",
  },
  {
    question: "What is data independence and why is it an advantage?",
    shortAnswer:
      "Data independence means changes to the physical storage or logical schema do not affect applications, reducing maintenance costs and increasing flexibility.",
    explanation:
      "Physical independence: adding indexes or changing storage doesn't break apps. Logical independence: adding columns or tables doesn't break existing queries. This is a significant advantage over file systems.",
    hint: "Think about adding a new column to a table without rewriting all the code.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS ensure data integrity?",
    shortAnswer:
      "A DBMS enforces data integrity through constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK) and triggers.",
    explanation:
      "These rules are enforced at the database level, ensuring no invalid data is ever stored. This is more reliable than application-level validation.",
    hint: "Think about how a database prevents negative marks.",
    level: "basic",
  },
  {
    question: "What is concurrency control and why is it an advantage?",
    shortAnswer:
      "Concurrency control allows multiple users to access and modify data simultaneously without conflicts or data corruption.",
    explanation:
      "It uses locking, isolation levels, and MVCC to manage concurrent access. This enables multi-user applications without the risk of data corruption.",
    hint: "Think about how thousands of customers can bank online simultaneously.",
    level: "intermediate",
  },
  {
    question: "What is transaction management and what are its benefits?",
    shortAnswer:
      "Transaction management ensures ACID properties (Atomicity, Consistency, Isolation, Durability) for reliable operations.",
    explanation:
      "Transactions provide all-or-nothing execution, maintain data consistency, isolate concurrent operations, and persist committed changes. This is critical for financial and business applications.",
    hint: "Think about a bank transfer: either both accounts are updated or none.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS reduce data redundancy?",
    shortAnswer:
      "A DBMS reduces redundancy through normalisation and relationships, storing each piece of data only once.",
    explanation:
      "Data is stored in related tables and referenced via foreign keys, eliminating duplicate copies. This saves storage and prevents inconsistency.",
    hint: "Think about storing a student's name in only one place instead of many files.",
    level: "basic",
  },
  {
    question: "What is the advantage of backup and recovery in a DBMS?",
    shortAnswer:
      "DBMS provides automated backup and point-in-time recovery, protecting data from loss and enabling quick restoration.",
    explanation:
      "Full backups, incremental backups, and transaction logs allow recovery to any point in time. This is essential for disaster recovery.",
    hint: "Think about how a database can recover to just before a power outage.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS provide data consistency?",
    shortAnswer:
      "A DBMS ensures data is uniform across the system through constraints, transactions, and referential integrity.",
    explanation:
      "Updates are atomic and validated. Relationships are enforced. This prevents conflicting or contradictory data.",
    hint: "Think about why a customer's address should be the same in all systems.",
    level: "intermediate",
  },
  {
    question: "What is the advantage of SQL in a DBMS?",
    shortAnswer:
      "SQL is a powerful, declarative query language that enables complex data retrieval, filtering, aggregation, and analysis.",
    explanation:
      "SQL allows users to express complex queries easily, without writing procedural code. It supports joins, subqueries, set operations, and window functions.",
    hint: "Think about how you ask the database for 'all students who scored above 80'.",
    level: "basic",
  },
  {
    question: "How does a DBMS support scalability?",
    shortAnswer:
      "A DBMS supports vertical and horizontal scaling through partitioning, sharding, replication, and clustering.",
    explanation:
      "As data grows, you can add more resources (vertical) or more servers (horizontal). This ensures the system can handle increased loads.",
    hint: "Think about how a popular website handles millions of users.",
    level: "intermediate",
  },
  {
    question: "What are the benefits of data relationships in a DBMS?",
    shortAnswer:
      "DBMS allows definition and enforcement of relationships (foreign keys) between entities, enabling complex queries and ensuring referential integrity.",
    explanation:
      "Relationships like one-to-many and many-to-many are easily represented. Joins allow combining data from related tables.",
    hint: "Think about linking students to courses in a school database.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS improve data quality?",
    shortAnswer:
      "DBMS improves data quality through constraints, validation, and consistency enforcement, preventing errors and anomalies.",
    explanation:
      "Data validation happens at the database level, ensuring only correct data is stored. This reduces the need for cleaning and correction.",
    hint: "Think about how a database prevents duplicate student IDs.",
    level: "intermediate",
  },
  {
    question: "What is the advantage of centralized data management in a DBMS?",
    shortAnswer:
      "A DBMS centralizes data management, making it easier to enforce security, backup, and integrity policies consistently.",
    explanation:
      "All data is in one place (or a coordinated distributed system). Administrators can manage policies uniformly, reducing complexity.",
    hint: "Think about how a school can manage all student data from one system.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS reduce application development time?",
    shortAnswer:
      "DBMS provides built-in features (security, integrity, concurrency, transactions) that developers don't need to reimplement, speeding up development.",
    explanation:
      "Developers can focus on business logic instead of data management infrastructure. This reduces development time and bugs.",
    hint: "Think about not having to write your own authentication system.",
    level: "intermediate",
  },
  {
    question: "What is the advantage of data abstraction in a DBMS?",
    shortAnswer:
      "Data abstraction hides the complexity of physical storage, providing users and applications with a simple, logical view of data.",
    explanation:
      "Users see tables and rows, not files and blocks. This simplifies coding and understanding.",
    hint: "Think about how you don't need to know where data is physically stored.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS support multiple user views?",
    shortAnswer:
      "A DBMS allows different users to see different views of the same data, based on their permissions and needs.",
    explanation:
      "Views can restrict columns or rows, simplify complex data, and provide customized interfaces for different roles.",
    hint: "Think about how a teacher sees only their class's marks, but the principal sees all.",
    level: "intermediate",
  },
  {
    question: "What is the advantage of using stored procedures in a DBMS?",
    shortAnswer:
      "Stored procedures encapsulate business logic in the database, improving performance, security, and maintainability.",
    explanation:
      "They reduce network traffic, allow reuse, and control access. Changes to business logic can be made centrally without updating all applications.",
    hint: "Think about a stored procedure that calculates a student's GPA.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS support data warehousing?",
    shortAnswer:
      "DBMS features like materialised views, partitioning, and query optimisation support data warehousing for analytical workloads.",
    explanation:
      "These features enable fast aggregation, historical analysis, and business intelligence, helping organizations make data-driven decisions.",
    hint: "Think about how a company analyses years of sales data.",
    level: "expert",
  },
  {
    question: "What is the advantage of a DBMS in terms of regulatory compliance?",
    shortAnswer:
      "DBMS provides auditing, encryption, access controls, and logging, which are essential for compliance with regulations like GDPR, HIPAA, and PCI-DSS.",
    explanation:
      "Compliance requires tracking who accessed what data, protecting sensitive information, and ensuring data integrity. DBMS features help meet these requirements.",
    hint: "Think about how a healthcare organization must protect patient data.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS handle large objects (BLOBs/CLOBs)?",
    shortAnswer:
      "DBMS can store large objects like images, videos, and long text efficiently, providing streaming and access controls.",
    explanation:
      "This allows storing unstructured data alongside structured data in a unified system, simplifying management.",
    hint: "Think about storing product images in the same database as product details.",
    level: "intermediate",
  },
  {
    question: "What is the advantage of using indexes in a DBMS?",
    shortAnswer:
      "Indexes dramatically speed up data retrieval, allowing the DBMS to find rows without scanning entire tables.",
    explanation:
      "Indexes are essential for performance, especially for large tables. They enable fast queries, sorting, and joins.",
    hint: "Think about the index at the back of a book.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS support distributed databases?",
    shortAnswer:
      "DBMS supports distribution through replication, partitioning, and distributed query processing, enabling data to be spread across multiple servers.",
    explanation:
      "This improves performance, availability, and disaster recovery. Data can be stored closer to users.",
    hint: "Think about how a global company stores data in different regions.",
    level: "expert",
  },
  {
    question: "What is the advantage of automated backup in a DBMS?",
    shortAnswer:
      "Automated backup ensures data is protected without human intervention, reducing the risk of human error.",
    explanation:
      "Backups can be scheduled and verified automatically. This ensures consistency and reliability.",
    hint: "Think about why you shouldn't rely on manual backups.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS improve data sharing?",
    shortAnswer:
      "DBMS provides controlled data sharing, allowing multiple users and applications to access data with appropriate permissions.",
    explanation:
      "Data is available to authorised users through a standard interface, promoting collaboration and integration.",
    hint: "Think about how a company's sales, marketing, and finance teams can access customer data.",
    level: "intermediate",
  },
  {
    question: "What is the advantage of data federation in a DBMS?",
    shortAnswer:
      "Data federation allows a DBMS to query data from multiple heterogeneous data sources as if they were one database.",
    explanation:
      "This enables integration of legacy systems, spreadsheets, and other data stores without data migration.",
    hint: "Think about combining data from an Oracle database and a MySQL database.",
    level: "expert",
  },
  {
    question: "How does a DBMS reduce total cost of ownership (TCO)?",
    shortAnswer:
      "DBMS reduces TCO through automation, efficient storage, reduced errors, and improved productivity.",
    explanation:
      "Despite licensing costs, DBMS saves money by preventing data loss, reducing development time, and lowering maintenance overhead.",
    hint: "Think about the cost of fixing data inconsistencies manually.",
    level: "expert",
  },
  {
    question: "What are the advantages of a cloud-based DBMS?",
    shortAnswer:
      "Cloud DBMS offers scalability, automatic patching, managed backups, pay-as-you-go pricing, and high availability.",
    explanation:
      "It reduces administrative overhead and allows organisations to focus on their core business rather than infrastructure.",
    hint: "Think about renting a database server without managing the hardware.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS support data governance?",
    shortAnswer:
      "DBMS provides the tools for data governance: metadata management, auditing, access controls, and data quality features.",
    explanation:
      "These enable organisations to enforce data policies, track data lineage, and ensure data is used responsibly.",
    hint: "Think about how a company ensures data is used ethically and legally.",
    level: "expert",
  },
  {
    question: "What is the advantage of using triggers in a DBMS?",
    shortAnswer:
      "Triggers automate actions in response to data changes, enforcing business rules, maintaining audit trails, and ensuring consistency.",
    explanation:
      "They run automatically at the database level, ensuring consistent enforcement across all applications.",
    hint: "Think about automatically logging changes to a table.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS support modern application architectures (microservices, etc.)?",
    shortAnswer:
      "DBMS provides features like connection pooling, transaction management, and isolation levels that are essential for microservices and distributed systems.",
    explanation:
      "It also supports JSON, REST APIs, and other modern data formats, making it suitable for cloud-native applications.",
    hint: "Think about how a microservice handles its own database.",
    level: "expert",
  },
];

export default questions;