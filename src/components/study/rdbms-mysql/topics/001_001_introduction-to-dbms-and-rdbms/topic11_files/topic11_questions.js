/**
 * Topic 11: Examples of Popular DBMS Software – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the most popular relational database management systems (RDBMS)?",
    shortAnswer:
      "The most popular RDBMS include MySQL, PostgreSQL, Oracle Database, and Microsoft SQL Server.",
    explanation:
      "These are widely used in various industries. MySQL and PostgreSQL are open-source; Oracle and SQL Server are commercial enterprise solutions.",
    hint: "Think about the databases you've heard of in web development and enterprise.",
    level: "basic",
  },
  {
    question: "What are the most popular NoSQL databases?",
    shortAnswer:
      "Popular NoSQL databases include MongoDB (document), Redis (key-value), Cassandra (wide column), and Neo4j (graph).",
    explanation:
      "NoSQL databases are designed for specific use cases: document stores for flexible schemas, key-value for caching, wide-column for massive scale, and graph for relationships.",
    hint: "Think about databases that don't use SQL and tables.",
    level: "basic",
  },
  {
    question: "What is MySQL and where is it commonly used?",
    shortAnswer:
      "MySQL is the world's most popular open-source RDBMS, widely used in web applications and the LAMP stack.",
    explanation:
      "MySQL is known for its speed, reliability, and ease of use. It powers many websites, including WordPress, and is the default for many hosting providers.",
    hint: "Think about the database behind most websites.",
    level: "basic",
  },
  {
    question: "What is PostgreSQL and what makes it special?",
    shortAnswer:
      "PostgreSQL is an advanced open-source RDBMS known for its ACID compliance, extensibility, and support for advanced data types like JSON and spatial data.",
    explanation:
      "PostgreSQL is highly compliant with SQL standards, supports concurrency with MVCC, and offers features like full-text search, indexing, and custom data types. It's often used in data warehousing and scientific applications.",
    hint: "Think about a database that supports JSON and spatial data.",
    level: "intermediate",
  },
  {
    question: "What is Oracle Database and who uses it?",
    shortAnswer:
      "Oracle Database is a commercial enterprise RDBMS known for its scalability, security, and advanced features like RAC and partitioning.",
    explanation:
      "Oracle is used by large enterprises in banking, telecom, government, and healthcare. It offers high availability, advanced analytics, and robust security features.",
    hint: "Think about the database used by large corporations.",
    level: "intermediate",
  },
  {
    question: "What is Microsoft SQL Server and what are its strengths?",
    shortAnswer:
      "Microsoft SQL Server is an enterprise RDBMS tightly integrated with the .NET ecosystem and Microsoft Azure.",
    explanation:
      "SQL Server offers robust BI tools, integration with Azure, and strong security features. It's widely used in Windows-based enterprise environments.",
    hint: "Think about the database used in .NET applications.",
    level: "intermediate",
  },
  {
    question: "What is MongoDB and what type of database is it?",
    shortAnswer:
      "MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents.",
    explanation:
      "MongoDB is designed for scalability and flexibility. It supports rich queries, indexing, and aggregation. It's commonly used in content management, mobile apps, and real-time analytics.",
    hint: "Think about a database that uses JSON documents.",
    level: "basic",
  },
  {
    question: "What is Redis and what is it used for?",
    shortAnswer:
      "Redis is an in-memory key-value store used as a database, cache, and message broker.",
    explanation:
      "Redis is extremely fast and supports various data structures like strings, hashes, lists, and sets. It's used for caching, session management, real-time leaderboards, and pub/sub messaging.",
    hint: "Think about a database that stores data in memory for speed.",
    level: "intermediate",
  },
  {
    question: "What is Cassandra and when would you use it?",
    shortAnswer:
      "Cassandra is a distributed wide-column NoSQL database designed for massive scalability and high availability.",
    explanation:
      "Cassandra is fault-tolerant, offers linear scalability, and is optimized for writes. It's used in large-scale applications like IoT, fraud detection, and social media.",
    hint: "Think about a database that can handle petabytes of data across hundreds of servers.",
    level: "intermediate",
  },
  {
    question: "What is SQLite and what makes it unique?",
    shortAnswer:
      "SQLite is a lightweight, serverless, embedded SQL database engine.",
    explanation:
      "SQLite is self-contained, zero-configuration, and has a small footprint. It's used in mobile apps, browsers, IoT devices, and embedded systems.",
    hint: "Think about the database used in your smartphone's apps.",
    level: "basic",
  },
  {
    question: "What is the difference between RDBMS and NoSQL databases?",
    shortAnswer:
      "RDBMS uses structured tables with fixed schemas and SQL; NoSQL uses flexible schemas and various data models (document, key-value, graph, wide-column).",
    explanation:
      "RDBMS is ACID-compliant and best for complex queries and transactions. NoSQL is designed for scalability, high volume, and flexible data structures.",
    hint: "Think about the trade-offs between consistency and scalability.",
    level: "basic",
  },
  {
    question: "When should you choose an RDBMS over a NoSQL database?",
    shortAnswer:
      "Choose RDBMS when you need ACID transactions, complex queries, joins, and data integrity, especially for financial and reporting systems.",
    explanation:
      "RDBMS is ideal for applications requiring strict consistency and data relationships. Examples: banking, ERP, inventory management.",
    hint: "Think about when data accuracy is critical.",
    level: "intermediate",
  },
  {
    question: "When should you choose a NoSQL database over an RDBMS?",
    shortAnswer:
      "Choose NoSQL when you need flexible schemas, massive scalability, high write throughput, or when data is unstructured.",
    explanation:
      "NoSQL is ideal for applications with high data volume, real-time analytics, content management, and when schema evolves rapidly.",
    hint: "Think about when you need to scale horizontally.",
    level: "intermediate",
  },
  {
    question: "What is the CAP theorem and how does it relate to DBMS choice?",
    shortAnswer:
      "The CAP theorem states that a distributed system can only provide two of three: Consistency, Availability, and Partition Tolerance.",
    explanation:
      "RDBMS often prioritize Consistency and Availability over Partition Tolerance. NoSQL systems may prioritize Availability and Partition Tolerance over Consistency (eventual consistency).",
    hint: "Think about the trade-offs in distributed systems.",
    level: "expert",
  },
  {
    question: "What are the licensing differences between popular DBMS?",
    shortAnswer:
      "MySQL (GPL), PostgreSQL (PostgreSQL license - open source), Oracle and SQL Server are commercial with licensing fees.",
    explanation:
      "Open-source DBMS are free to use, but may require support contracts for enterprise features. Commercial DBMS have significant licensing costs but offer extensive support and advanced features.",
    hint: "Think about the cost implications of different DBMS.",
    level: "intermediate",
  },
  {
    question: "What is the LAMP stack and why is MySQL popular in it?",
    shortAnswer:
      "LAMP stands for Linux, Apache, MySQL, PHP/Perl/Python. MySQL is the database component, known for its stability and integration.",
    explanation:
      "The LAMP stack is a classic web development stack. MySQL's performance, reliability, and open-source nature make it a natural fit.",
    hint: "Think about the typical stack for PHP applications.",
    level: "basic",
  },
  {
    question: "What are the strengths of PostgreSQL compared to MySQL?",
    shortAnswer:
      "PostgreSQL is more standards-compliant, supports advanced data types (JSON, arrays, hstore), and has better concurrency handling with MVCC.",
    explanation:
      "PostgreSQL is often chosen for applications requiring complex queries, data integrity, and extensibility. MySQL is simpler and faster for basic CRUD operations.",
    hint: "Think about which DBMS is better for complex queries and JSON support.",
    level: "intermediate",
  },
  {
    question: "What is the role of Oracle RAC (Real Application Clusters)?",
    shortAnswer:
      "Oracle RAC is a clustered database that provides high availability and scalability by allowing multiple servers to access a single database.",
    explanation:
      "RAC enables load balancing and failover, making it suitable for mission-critical applications requiring continuous availability.",
    hint: "Think about how to make a database highly available.",
    level: "expert",
  },
  {
    question: "What is Microsoft's Azure SQL Database?",
    shortAnswer:
      "Azure SQL Database is a fully managed cloud database service based on Microsoft SQL Server.",
    explanation:
      "It offers built-in intelligence, scalability, and high availability. It reduces administrative overhead by automating backups, patching, and monitoring.",
    hint: "Think about SQL Server in the cloud.",
    level: "intermediate",
  },
  {
    question: "What are the key features of MongoDB that make it popular?",
    shortAnswer:
      "MongoDB's key features include flexible schema, horizontal scaling with sharding, rich query language, and aggregation pipeline.",
    explanation:
      "MongoDB's document model maps naturally to application objects, making development faster. It scales easily and supports complex queries.",
    hint: "Think about a database that works well with agile development.",
    level: "intermediate",
  },
  {
    question: "What is Redis persistence and how does it work?",
    shortAnswer:
      "Redis supports persistence through RDB snapshots (point-in-time) and AOF (Append-Only File) logs, which can be replayed for recovery.",
    explanation:
      "Redis can be configured to persist data to disk, balancing between performance and durability. This allows Redis to be used as a primary database, not just a cache.",
    hint: "Think about how Redis can survive a restart.",
    level: "expert",
  },
  {
    question: "What is Cassandra's data model and how does it handle distribution?",
    shortAnswer:
      "Cassandra uses a wide-column store model with tables, rows, and columns. It distributes data across nodes using consistent hashing and offers tunable consistency.",
    explanation:
      "Cassandra is designed for write-heavy workloads. It provides linear scalability and fault tolerance with no single point of failure.",
    hint: "Think about a database that can handle writes across many nodes.",
    level: "expert",
  },
  {
    question: "What is SQLite's performance profile compared to client-server DBMS?",
    shortAnswer:
      "SQLite is fast for small datasets but lacks the scalability of client-server DBMS. It's best for embedded use cases with low concurrency.",
    explanation:
      "SQLite is simple and fast for local storage, but it doesn't support high concurrency or large datasets (millions of records).",
    hint: "Think about the difference between a local database and a server-based one.",
    level: "intermediate",
  },
  {
    question: "How do you choose between MySQL and PostgreSQL for a new project?",
    shortAnswer:
      "Choose MySQL for simplicity, speed, and web applications. Choose PostgreSQL for complex queries, data integrity, and advanced features.",
    explanation:
      "Both are excellent. PostgreSQL is more feature-rich and standards-compliant; MySQL is simpler and faster for basic use cases.",
    hint: "Think about the complexity of your queries and data model.",
    level: "intermediate",
  },
  {
    question: "What is the concept of polyglot persistence?",
    shortAnswer:
      "Polyglot persistence means using multiple database technologies in a single application to leverage their strengths.",
    explanation:
      "For example, using PostgreSQL for transactions, Redis for caching, and MongoDB for logging. This approach is common in microservices architectures.",
    hint: "Think about using different databases for different parts of an application.",
    level: "expert",
  },
  {
    question: "What are the advantages of using managed cloud DBMS services?",
    shortAnswer:
      "Managed services handle provisioning, backups, patching, scaling, and monitoring, reducing operational overhead.",
    explanation:
      "Cloud providers like AWS RDS, Azure SQL, and Google Cloud Spanner offer managed DBMS. They are cost-effective for many businesses.",
    hint: "Think about not having to worry about server maintenance.",
    level: "intermediate",
  },
  {
    question: "What is the role of DBMS in the modern data ecosystem?",
    shortAnswer:
      "DBMS are the backbone of data storage and retrieval, supporting transactional, analytical, and real-time workloads.",
    explanation:
      "They integrate with data pipelines, analytics tools, and applications, enabling data-driven decision-making.",
    hint: "Think about how databases fit into the overall data architecture.",
    level: "intermediate",
  },
  {
    question: "What are some emerging database technologies?",
    shortAnswer:
      "Emerging technologies include NewSQL (CockroachDB, TiDB), time-series databases (InfluxDB), and graph databases (Neo4j).",
    explanation:
      "NewSQL offers SQL and ACID with horizontal scaling. Time-series databases are optimised for IoT and monitoring data. Graph databases handle complex relationships.",
    hint: "Think about databases designed for specific modern workloads.",
    level: "expert",
  },
  {
    question: "How do you evaluate a DBMS for a specific project?",
    shortAnswer:
      "Evaluate based on data model, scalability, consistency requirements, query complexity, cost, community support, and operational expertise.",
    explanation:
      "Create a checklist of requirements and test each candidate with realistic workloads. Consider total cost of ownership, not just initial cost.",
    hint: "Think about a systematic approach to choosing a database.",
    level: "expert",
  },
  {
    question: "What are the common mistakes when comparing DBMS?",
    shortAnswer:
      "Common mistakes include comparing based on features alone, not testing with realistic workloads, and ignoring operational complexity.",
    explanation:
      "Also, assuming a DBMS is 'better' because it's more popular, or choosing based on a single metric (e.g., speed) without considering data integrity needs.",
    hint: "Think about the pitfalls of choosing a DBMS based on hype.",
    level: "expert",
  },
  {
    question: "What is the future of DBMS software?",
    shortAnswer:
      "The future includes AI-powered automation, serverless databases, multi-model support, and deeper integration with machine learning.",
    explanation:
      "Databases will become more intelligent, self-tuning, and cloud-native. They will support multiple data models (relational, document, graph) in a single engine.",
    hint: "Think about how databases will evolve to be more automated and versatile.",
    level: "expert",
  },
];

export default questions;