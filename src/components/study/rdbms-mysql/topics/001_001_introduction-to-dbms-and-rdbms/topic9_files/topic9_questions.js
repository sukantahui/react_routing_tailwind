/**
 * Topic 9: Disadvantages of DBMS – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the main disadvantages of using a DBMS?",
    shortAnswer:
      "Main disadvantages include high cost, complexity, need for skilled personnel, performance overhead, security risks, vendor lock-in, resource usage, and learning curve.",
    explanation:
      "While DBMS offers many advantages, these drawbacks must be considered when choosing a data management solution. They can be mitigated with proper planning and management.",
    hint: "Think about the costs and challenges of implementing a database system.",
    level: "basic",
  },
  {
    question: "Why is a DBMS expensive?",
    shortAnswer:
      "DBMS can be expensive due to licensing fees, hardware costs, and the need for skilled database administrators.",
    explanation:
      "Commercial DBMS like Oracle and SQL Server have significant licensing costs. Even open-source DBMS require investment in hardware (SSDs, RAM) and personnel (DBAs, developers).",
    hint: "Think about the cost of software licenses and specialised staff.",
    level: "basic",
  },
  {
    question: "What is vendor lock-in and why is it a disadvantage?",
    shortAnswer:
      "Vendor lock-in occurs when a system is so tightly coupled to a specific DBMS that migrating to another is difficult and expensive.",
    explanation:
      "Proprietary features, data formats, and stored procedures make it hard to switch. This reduces flexibility and gives the vendor pricing power.",
    hint: "Think about why it's hard to move from Oracle to PostgreSQL.",
    level: "intermediate",
  },
  {
    question: "Why does a DBMS have performance overhead?",
    shortAnswer:
      "The DBMS adds layers of abstraction (query parsing, optimization, locking, logging) that slow down operations compared to direct file access.",
    explanation:
      "Each SQL query is parsed, validated, optimised, and executed through the storage engine. Transactions add logging and locking overhead. For simple operations, this can be significant.",
    hint: "Think about the extra steps a database goes through to execute a query.",
    level: "intermediate",
  },
  {
    question: "What are the security risks of a DBMS?",
    shortAnswer:
      "Security risks include SQL injection, default passwords, weak access controls, misconfiguration, and data breaches.",
    explanation:
      "While DBMS offers security features, they are not automatically secure. Misconfiguration, poor passwords, and unpatched systems are common vulnerabilities.",
    hint: "Think about how attackers can exploit poorly configured databases.",
    level: "intermediate",
  },
  {
    question: "Why does a DBMS require skilled personnel?",
    shortAnswer:
      "DBMS are complex systems that require specialised knowledge for installation, configuration, tuning, and maintenance.",
    explanation:
      "Understanding query plans, indexing, normalisation, replication, and backup strategies requires training and experience. DBAs and data architects are in high demand.",
    hint: "Think about why you need a specialist to manage a database.",
    level: "intermediate",
  },
  {
    question: "What is the learning curve for DBMS?",
    shortAnswer:
      "Learning SQL, database design, and optimization takes significant time and effort, especially for advanced features.",
    explanation:
      "Developers and DBAs must master SQL, understand database internals, and learn query tuning. This is a continuous process as new features are added.",
    hint: "Think about how long it takes to become proficient in SQL.",
    level: "basic",
  },
  {
    question: "How does a DBMS use resources?",
    shortAnswer:
      "A DBMS consumes significant disk space, memory, and CPU resources for data storage, indexes, logs, and query processing.",
    explanation:
      "Indexes and logs take up disk space. Memory is used for caching (buffer pool) and sorting. CPU is used for query processing and locking.",
    hint: "Think about the hardware needed for a large database server.",
    level: "intermediate",
  },
  {
    question: "What is the complexity of a DBMS?",
    shortAnswer:
      "DBMS are complex systems with many components (query processor, transaction manager, storage manager) that must be configured and tuned.",
    explanation:
      "Understanding the interplay of these components, and how to configure them for optimal performance, is non-trivial.",
    hint: "Think about all the parts of a DBMS that must work together.",
    level: "intermediate",
  },
  {
    question: "How can high cost be mitigated in DBMS adoption?",
    shortAnswer:
      "Cost can be mitigated by choosing open-source DBMS, using cloud-managed services, and scaling resources appropriately.",
    explanation:
      "Open-source DBMS like PostgreSQL and MySQL are free. Cloud services offer pay-as-you-go pricing. Start small and grow as needed.",
    hint: "Think about alternatives to expensive commercial DBMS.",
    level: "intermediate",
  },
  {
    question: "Why is vendor lock-in a significant risk?",
    shortAnswer:
      "Vendor lock-in reduces flexibility, makes migration costly, and can lead to higher long-term costs as the vendor has pricing power.",
    explanation:
      "Once you invest in a specific DBMS, switching costs (data migration, application rewrite) can be prohibitive. This is a strategic risk.",
    hint: "Think about why companies might feel trapped with a particular vendor.",
    level: "intermediate",
  },
  {
    question: "What are the common performance bottlenecks in a DBMS?",
    shortAnswer:
      "Common bottlenecks include poor indexing, inefficient queries, insufficient memory, and lock contention.",
    explanation:
      "These can be addressed through query tuning, indexing, proper hardware sizing, and using appropriate isolation levels.",
    hint: "Think about why a query might run slowly.",
    level: "expert",
  },
  {
    question: "How does the learning curve affect development timelines?",
    shortAnswer:
      "The learning curve can delay projects as developers and DBAs learn SQL, database design, and optimisation.",
    explanation:
      "Projects may require additional time for training and experimentation, especially for teams new to databases.",
    hint: "Think about the time needed to become proficient in database management.",
    level: "intermediate",
  },
  {
    question: "What are the risks of not having skilled personnel for a DBMS?",
    shortAnswer:
      "Risks include poor performance, data loss, security breaches, and incorrect database design leading to scalability issues.",
    explanation:
      "Without skilled personnel, the DBMS may be misconfigured, queries may be inefficient, and backups may fail.",
    hint: "Think about what could go wrong without a competent DBA.",
    level: "intermediate",
  },
  {
    question: "How does a DBMS's complexity affect disaster recovery?",
    shortAnswer:
      "Complexity makes disaster recovery more difficult, requiring careful planning, testing, and expertise.",
    explanation:
      "Recovering a database from backups and transaction logs requires understanding of the DBMS's recovery mechanisms.",
    hint: "Think about the steps to restore a database after a failure.",
    level: "expert",
  },
  {
    question: "What is the trade-off between performance overhead and data integrity?",
    shortAnswer:
      "Strict ACID compliance (transactions, locking) adds performance overhead but ensures data integrity. Balancing them is a key challenge.",
    explanation:
      "Higher isolation levels provide more consistency but reduce concurrency. Choosing the right level is a trade-off.",
    hint: "Think about the balance between speed and reliability.",
    level: "expert",
  },
  {
    question: "How can security risks be mitigated in a DBMS?",
    shortAnswer:
      "Security risks can be mitigated by using strong passwords, least-privilege access, encryption, regular patching, and security audits.",
    explanation:
      "Security is an ongoing process, not a one-time setup. Regular vulnerability assessments and penetration testing are recommended.",
    hint: "Think about the steps to secure a database server.",
    level: "intermediate",
  },
  {
    question: "What is the impact of resource usage on database performance?",
    shortAnswer:
      "Insufficient resources (CPU, memory, disk I/O) can severely degrade performance, leading to slow queries and timeouts.",
    explanation:
      "Monitoring resource usage is essential. Adding more resources or optimising queries can improve performance.",
    hint: "Think about why a database might become slow under load.",
    level: "intermediate",
  },
  {
    question: "How can vendor lock-in be avoided?",
    shortAnswer:
      "Vendor lock-in can be avoided by using standard SQL, avoiding proprietary features, and designing for portability.",
    explanation:
      "Use standard data types, avoid vendor-specific extensions, and design applications to be database-agnostic.",
    hint: "Think about how to make your application work with any database.",
    level: "expert",
  },
  {
    question: "What are the hidden costs of a DBMS?",
    shortAnswer:
      "Hidden costs include training, consulting, downtime, and the cost of fixing performance or security issues.",
    explanation:
      "These costs often exceed the initial licensing and hardware costs. They should be factored into the total cost of ownership.",
    hint: "Think about the costs beyond the initial purchase.",
    level: "intermediate",
  },
  {
    question: "Why is maintaining a DBMS more complex than a file system?",
    shortAnswer:
      "Maintaining a DBMS involves tasks like query tuning, index maintenance, backup scheduling, user management, and security patching.",
    explanation:
      "File systems only require basic file management. DBMS require ongoing administration to ensure performance, security, and reliability.",
    hint: "Think about all the administrative tasks a DBA does.",
    level: "intermediate",
  },
  {
    question: "What is the impact of the learning curve on team productivity?",
    shortAnswer:
      "The learning curve can reduce productivity initially as team members learn SQL and database concepts, but productivity increases over time.",
    explanation:
      "Investing in training pays off as team members become more efficient and can leverage advanced features.",
    hint: "Think about the short-term vs long-term effects of learning a new skill.",
    level: "intermediate",
  },
  {
    question: "How can the complexity of a DBMS be managed?",
    shortAnswer:
      "Complexity can be managed through proper documentation, use of monitoring tools, standardisation, and training.",
    explanation:
      "Automation (scripts, orchestration) and managed services can also reduce complexity.",
    hint: "Think about tools that help simplify database management.",
    level: "expert",
  },
  {
    question: "What are the risks of using a DBMS that is too powerful for your needs?",
    shortAnswer:
      "Using an overly powerful DBMS can lead to unnecessary costs, complexity, and resource usage without providing proportional benefits.",
    explanation:
      "Choose a DBMS that matches your data volume, user count, and query complexity. Overkill is a waste of resources.",
    hint: "Think about why a small application doesn't need Oracle Enterprise.",
    level: "intermediate",
  },
  {
    question: "How does the choice of DBMS affect scalability?",
    shortAnswer:
      "While DBMS can scale, achieving scalability requires careful design (partitioning, sharding) and can be complex and expensive.",
    explanation:
      "Scaling a database is not automatic. It requires planning, testing, and often significant effort.",
    hint: "Think about the challenges of scaling a database to millions of users.",
    level: "expert",
  },
  {
    question: "What is the role of a DBA in mitigating DBMS disadvantages?",
    shortAnswer:
      "A DBA mitigates disadvantages by optimising performance, ensuring security, managing backups, and training users.",
    explanation:
      "A skilled DBA is essential for a healthy database system. They prevent problems and resolve issues quickly.",
    hint: "Think about why companies hire DBAs.",
    level: "intermediate",
  },
  {
    question: "How can a DBMS become a bottleneck in an application?",
    shortAnswer:
      "A DBMS can become a bottleneck if it is not properly tuned, if queries are inefficient, or if hardware is insufficient.",
    explanation:
      "Monitor query performance and system resources. Optimise slow queries and consider adding indexes or increasing hardware.",
    hint: "Think about why a web application might become slow due to database issues.",
    level: "expert",
  },
  {
    question: "What are the implications of DBMS complexity for small businesses?",
    shortAnswer:
      "Small businesses may struggle with the complexity and cost of DBMS. They often benefit from cloud-managed services or simpler solutions.",
    explanation:
      "Managed services reduce administrative burden. Simpler databases like SQLite may suffice for small-scale applications.",
    hint: "Think about what a small business needs from a database.",
    level: "intermediate",
  },
  {
    question: "How can organisations prepare for the costs of a DBMS?",
    shortAnswer:
      "Organisations should budget for licensing, hardware, personnel, training, and ongoing maintenance from the start.",
    explanation:
      "Total cost of ownership (TCO) should be estimated before adopting a DBMS. Include hidden costs like downtime and recovery.",
    hint: "Think about budgeting for a major IT investment.",
    level: "expert",
  },
  {
    question: "What are the alternatives to a full DBMS for small applications?",
    shortAnswer:
      "Alternatives include SQLite (embedded), file-based storage, or using a cloud database service.",
    explanation:
      "For simple, single-user applications, SQLite is lightweight and easy. For web apps, cloud services like Firebase or Supabase provide managed databases.",
    hint: "Think about options that don't require a full DBMS setup.",
    level: "intermediate",
  },
  {
    question: "How does the choice of DBMS affect long-term maintenance?",
    shortAnswer:
      "The choice affects maintenance effort, cost, and ease of finding skilled personnel. Widely-used DBMS have better community support.",
    explanation:
      "Popular DBMS like PostgreSQL and MySQL have large communities, making it easier to find help and resources.",
    hint: "Think about the support available for different DBMS.",
    level: "intermediate",
  },
];

export default questions;