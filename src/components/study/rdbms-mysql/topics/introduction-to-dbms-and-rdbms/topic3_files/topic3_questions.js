/**
 * Topic 3: Characteristics of a Good Database – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the key characteristics of a good database?",
    shortAnswer:
      "A good database should have data integrity, security, performance, scalability, availability, consistency, flexibility, and ease of use.",
    explanation:
      "These characteristics ensure the database is reliable, secure, fast, can handle growth, is always accessible, maintains consistent data, adapts to changes, and is user-friendly. Each characteristic addresses a different aspect of database quality.",
    hint: "Think about what you would look for in a trustworthy data storage system.",
    level: "basic",
  },
  {
    question: "Why is data integrity important in a database?",
    shortAnswer:
      "Data integrity ensures that data is accurate, consistent, and reliable, which is essential for making correct decisions.",
    explanation:
      "Without integrity, data can be corrupted, inconsistent, or duplicated, leading to incorrect reports, poor decisions, and loss of trust. Integrity is enforced through constraints like primary keys, foreign keys, and check constraints.",
    hint: "Think about why a bank must ensure account balances are always correct.",
    level: "basic",
  },
  {
    question: "What is the difference between data integrity and data security?",
    shortAnswer:
      "Data integrity ensures data is accurate and consistent; data security protects data from unauthorised access and breaches.",
    explanation:
      "Integrity is about correctness and reliability — ensuring data hasn't been corrupted. Security is about protection — preventing unauthorised people from seeing or modifying data. Both are essential but address different concerns.",
    hint: "Think about the difference between a lock on a door (security) and checking that the contents are correct (integrity).",
    level: "intermediate",
  },
  {
    question: "What is database security and why is it critical?",
    shortAnswer:
      "Database security involves protecting data from unauthorised access, modification, or destruction through authentication, authorisation, and encryption.",
    explanation:
      "Data breaches can cause financial loss, legal penalties, and reputational damage. Security measures include strong passwords, role-based access control, encryption, and regular security audits.",
    hint: "Think about why a hospital must protect patient records.",
    level: "basic",
  },
  {
    question: "What is database performance and how is it measured?",
    shortAnswer:
      "Database performance refers to the speed and efficiency of data operations, measured by query response time, throughput, and resource utilisation.",
    explanation:
      "Good performance means queries return quickly, transactions complete promptly, and the system handles concurrent users. It is measured by metrics like response time, transactions per second, and CPU/memory usage.",
    hint: "Think about how quickly an online store loads your order history.",
    level: "intermediate",
  },
  {
    question: "What is scalability in a database context?",
    shortAnswer:
      "Scalability is the ability of a database to handle increasing amounts of data and users without performance degradation.",
    explanation:
      "Scalability can be vertical (adding more power to a single server) or horizontal (adding more servers). A scalable database can grow with the business, avoiding the need for a complete redesign.",
    hint: "Think about how a social media platform handles millions of users.",
    level: "intermediate",
  },
  {
    question: "What is the difference between performance and scalability?",
    shortAnswer:
      "Performance is about speed in the current state; scalability is about maintaining speed as the system grows.",
    explanation:
      "A database can be fast for small datasets but not scale well to large ones. Conversely, a database might be slower initially but maintain its speed as data grows. Both are important but address different stages of growth.",
    hint: "Think about a car's top speed (performance) vs. its ability to carry more passengers (scalability).",
    level: "intermediate",
  },
  {
    question: "What is high availability in databases?",
    shortAnswer:
      "High availability ensures a database is accessible and operational with minimal downtime, often using redundancy and failover mechanisms.",
    explanation:
      "High availability systems aim for 'five nines' (99.999% uptime). They use techniques like replication, clustering, and automated failover to recover from failures quickly.",
    hint: "Think about why an e-commerce site must be available 24/7.",
    level: "intermediate",
  },
  {
    question: "What is data consistency and why is it important?",
    shortAnswer:
      "Data consistency ensures data is the same across all tables and systems, avoiding contradictions and anomalies.",
    explanation:
      "Inconsistency occurs when the same data is stored in multiple places and updated unevenly. Consistent data is crucial for accurate reporting and decision-making. Consistency is enforced through constraints and transactions.",
    hint: "Think about why a customer's address should be the same in all systems.",
    level: "intermediate",
  },
  {
    question: "What is the CAP theorem and how does it relate to database characteristics?",
    shortAnswer:
      "The CAP theorem states that a distributed database can only provide two of three: Consistency, Availability, and Partition Tolerance.",
    explanation:
      "This trade-off is fundamental for distributed systems. You cannot have all three simultaneously. Understanding CAP helps you choose the right database for your needs — prioritising consistency (banking) or availability (social media).",
    hint: "Think about why a banking system prioritises consistency over availability.",
    level: "expert",
  },
  {
    question: "What is database flexibility?",
    shortAnswer:
      "Database flexibility is the ability to adapt to changing requirements, such as new data types, relationships, or business rules.",
    explanation:
      "Flexible databases can accommodate schema changes without major disruption. NoSQL databases offer more flexibility, while relational databases offer more structure. Flexibility is important in rapidly changing environments.",
    hint: "Think about how a system might need to store new types of data as the business evolves.",
    level: "intermediate",
  },
  {
    question: "What is the role of indexing in database performance?",
    shortAnswer:
      "Indexing improves query performance by allowing the database to find data without scanning entire tables.",
    explanation:
      "Indexes are data structures (like B-trees) that map column values to row locations. They speed up SELECT, WHERE, and JOIN operations but slow down INSERT, UPDATE, and DELETE. Good indexing is critical for performance.",
    hint: "Think about how the index in a book helps you find topics quickly.",
    level: "intermediate",
  },
  {
    question: "What is data normalisation and how does it affect database quality?",
    shortAnswer:
      "Normalisation organises data to reduce redundancy and improve integrity, typically by dividing large tables into smaller related tables.",
    explanation:
      "Normalisation follows rules (1NF, 2NF, 3NF, BCNF). It reduces duplicate data, prevents update anomalies, and improves consistency. However, over-normalisation can hurt performance.",
    hint: "Think about why you wouldn't store a student's address in every marks entry.",
    level: "intermediate",
  },
  {
    question: "What is denormalisation and when is it used?",
    shortAnswer:
      "Denormalisation is the process of adding redundancy to a database to improve read performance, often by combining tables.",
    explanation:
      "It's the opposite of normalisation. Denormalisation is used when read performance is critical and write operations are less frequent. It reduces the number of JOINs needed for queries.",
    hint: "Think about how a data warehouse might combine tables for faster reporting.",
    level: "expert",
  },
  {
    question: "What is the difference between a good and a bad database design?",
    shortAnswer:
      "A good design is consistent, efficient, secure, and scalable; a bad design has redundancy, poor performance, security holes, and is hard to maintain.",
    explanation:
      "Good design follows best practices: proper normalisation, appropriate indexing, clear naming conventions, and thorough documentation. Bad design often results from rushing, lack of planning, or insufficient understanding of the domain.",
    hint: "Think about the consequences of poor database design on a business.",
    level: "intermediate",
  },
  {
    question: "What is a query optimizer and why is it important for performance?",
    shortAnswer:
      "The query optimizer is a DBMS component that determines the most efficient execution plan for a query.",
    explanation:
      "It considers indexes, table statistics, join methods, and more to choose the optimal plan. A good optimizer significantly improves performance, especially for complex queries.",
    hint: "Think about how a GPS system chooses the fastest route.",
    level: "expert",
  },
  {
    question: "What is database replication and how does it support availability?",
    shortAnswer:
      "Replication copies data from one database to another to improve availability, performance, and disaster recovery.",
    explanation:
      "Replication can be synchronous or asynchronous. It supports read scalability, failover, and geographic distribution. Popular replication patterns include master-slave and multi-master.",
    hint: "Think about how a website can serve users from different regions using replicas.",
    level: "intermediate",
  },
  {
    question: "What is the role of backup and recovery in database quality?",
    shortAnswer:
      "Backup and recovery ensure data can be restored after loss, corruption, or disaster, preserving business continuity.",
    explanation:
      "Regular backups and tested recovery procedures are essential. They protect against hardware failures, human errors, and cyberattacks. A good database must have a robust backup strategy.",
    hint: "Think about why you should always back up your important files.",
    level: "basic",
  },
  {
    question: "What is data validation and why is it important?",
    shortAnswer:
      "Data validation checks that data meets defined rules before it's stored, ensuring quality and preventing errors.",
    explanation:
      "Validation can be at the application level or database level (constraints). It prevents invalid data from entering the system, reducing the need for cleaning later.",
    hint: "Think about how a form checks that you've entered a valid email.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a database and a data warehouse in terms of characteristics?",
    shortAnswer:
      "Databases are optimised for OLTP (fast transactions); data warehouses are optimised for OLAP (complex analytics and historical data).",
    explanation:
      "Databases prioritise integrity and concurrency; data warehouses prioritise performance for large, complex queries and historical analysis. They have different characteristics and serve different purposes.",
    hint: "Think about the difference between a store's point-of-sale system and the annual sales report.",
    level: "expert",
  },
  {
    question: "What is database monitoring and why is it important?",
    shortAnswer:
      "Database monitoring tracks performance, health, and security, enabling proactive management and problem detection.",
    explanation:
      "Monitoring helps identify slow queries, resource bottlenecks, security threats, and impending failures. It's essential for maintaining a good database over time.",
    hint: "Think about how a dashboard can alert you to server issues.",
    level: "intermediate",
  },
  {
    question: "What is the difference between logical and physical database design?",
    shortAnswer:
      "Logical design defines the schema and relationships; physical design defines how the data is stored on disk (indexes, partitions, etc.).",
    explanation:
      "Logical design is about the 'what' — tables, columns, constraints. Physical design is about the 'how' — storage, indexing, performance tuning. Both are needed for a good database.",
    hint: "Think about the difference between a map (logical) and the actual roads (physical).",
    level: "expert",
  },
  {
    question: "What are the common performance tuning techniques for databases?",
    shortAnswer:
      "Common techniques include indexing, query optimisation, proper normalisation, partitioning, caching, and hardware upgrades.",
    explanation:
      "Tuning requires understanding the workload and identifying bottlenecks. It's an ongoing process, not a one-time activity.",
    hint: "Think about how you would speed up a slow-running report.",
    level: "expert",
  },
  {
    question: "What is the difference between vertical and horizontal scaling?",
    shortAnswer:
      "Vertical scaling adds more resources to a single server; horizontal scaling adds more servers to distribute the load.",
    explanation:
      "Vertical (scale-up) is simpler but has hardware limits. Horizontal (scale-out) is more complex but offers unlimited growth. The choice depends on the application and budget.",
    hint: "Think about the difference between upgrading your computer's RAM and adding more computers to a network.",
    level: "intermediate",
  },
  {
    question: "What is data consistency and how is it different from data integrity?",
    shortAnswer:
      "Consistency ensures data is uniform across the system; integrity ensures data is accurate and valid.",
    explanation:
      "Consistency is about data being the same everywhere. Integrity is about data following defined rules. Both are essential but address different aspects of data quality.",
    hint: "Think about consistency as 'same everywhere' and integrity as 'correct'.",
    level: "intermediate",
  },
  {
    question: "What are the characteristics of a good database schema?",
    shortAnswer:
      "A good schema is well-normalised, has clear naming conventions, uses appropriate data types, enforces relationships, and includes proper documentation.",
    explanation:
      "A well-designed schema reduces redundancy, ensures integrity, and makes queries easier. It should be extensible to accommodate future changes.",
    hint: "Think about how you would design a schema for a library system.",
    level: "intermediate",
  },
  {
    question: "What is database partitioning and why is it used?",
    shortAnswer:
      "Partitioning divides a large table into smaller, more manageable pieces to improve performance and maintenance.",
    explanation:
      "Partitioning can be range-based, list-based, or hash-based. It improves query performance by scanning only relevant partitions and makes data maintenance (like archiving) easier.",
    hint: "Think about how a phone book is divided by alphabet for faster searching.",
    level: "expert",
  },
  {
    question: "What is the role of stored procedures in a database?",
    shortAnswer:
      "Stored procedures are pre-compiled SQL code stored in the database that can be executed to perform complex operations.",
    explanation:
      "They improve performance, reduce network traffic, and encapsulate business logic. They also enhance security by controlling access to data.",
    hint: "Think about how a stored procedure can automate a multi-step process.",
    level: "intermediate",
  },
  {
    question: "How do you balance performance and security in a database?",
    shortAnswer:
      "Balance by using encryption (with some performance cost), implementing access controls, using secure connections, and monitoring for threats.",
    explanation:
      "Both are essential. The key is to apply security measures that minimise performance impact — like using hardware acceleration for encryption and caching frequently accessed data.",
    hint: "Think about why HTTPS is slower than HTTP but necessary.",
    level: "expert",
  },
  {
    question: "What are the emerging trends in database characteristics?",
    shortAnswer:
      "Trends include AI-powered automation, serverless databases, multi-model databases, and increased focus on privacy and ethics.",
    explanation:
      "AI is automating tuning and monitoring. Serverless databases reduce operational overhead. Multi-model databases support multiple data types. Privacy regulations are driving stronger security and data governance.",
    hint: "Think about how databases are becoming more intelligent and easier to manage.",
    level: "expert",
  },
  {
    question: "How do you evaluate if a database meets your needs?",
    shortAnswer:
      "Evaluate against the key characteristics: integrity, security, performance, scalability, availability, consistency, flexibility, and ease of use.",
    explanation:
      "Also consider cost, team expertise, and vendor lock-in. Test with realistic workloads and data volumes. A good database fits both your current and future needs.",
    hint: "Think about what you would check before choosing a database for a new project.",
    level: "expert",
  },
];

export default questions;