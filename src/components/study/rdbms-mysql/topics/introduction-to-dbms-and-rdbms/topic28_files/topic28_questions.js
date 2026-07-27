/**
 * Topic 28: MySQL Editions – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the main editions of MySQL?",
    shortAnswer:
      "The main editions are MySQL Community Edition (free, open-source) and MySQL Enterprise Edition (commercial, paid).",
    explanation:
      "Community Edition is GPL-licensed and suitable for most developers. Enterprise Edition includes advanced features like Enterprise Backup, Monitor, Firewall, Audit, and HeatWave.",
    hint: "Think about free vs. paid versions.",
    level: "basic",
  },
  {
    question: "What is MySQL Community Edition?",
    shortAnswer:
      "MySQL Community Edition is the free, open-source version of MySQL released under the GPL license.",
    explanation:
      "It includes all core features like InnoDB, JSON support, full-text search, and replication. It is suitable for developers, startups, and educational use.",
    hint: "Think about the free version.",
    level: "basic",
  },
  {
    question: "What is MySQL Enterprise Edition?",
    shortAnswer:
      "MySQL Enterprise Edition is the commercial version of MySQL with advanced features, tools, and 24/7 Oracle support.",
    explanation:
      "It includes Enterprise Backup, Monitor, Audit, Firewall, and HeatWave (in-memory analytics). It requires a paid subscription.",
    hint: "Think about the paid version with advanced features.",
    level: "basic",
  },
  {
    question: "What is the licensing difference between Community and Enterprise editions?",
    shortAnswer:
      "Community Edition is licensed under GPL (open-source). Enterprise Edition is licensed under a commercial license.",
    explanation:
      "The GPL license means you can use, modify, and distribute the software freely. The commercial license requires payment and restricts redistribution.",
    hint: "Think about open-source vs. commercial licensing.",
    level: "intermediate",
  },
  {
    question: "Is MySQL Enterprise Edition free to use?",
    shortAnswer:
      "No, MySQL Enterprise Edition is a paid commercial product that requires a subscription.",
    explanation:
      "Oracle offers MySQL Enterprise Edition with tiered pricing based on the number of servers and required features.",
    hint: "Think about whether it costs money.",
    level: "basic",
  },
  {
    question: "Does MySQL Community Edition support transactions?",
    shortAnswer:
      "Yes, MySQL Community Edition supports transactions through the InnoDB storage engine.",
    explanation:
      "InnoDB is included in Community Edition and provides ACID compliance, foreign key support, and row-level locking.",
    hint: "Think about whether the free version has transactions.",
    level: "basic",
  },
  {
    question: "What is MySQL Enterprise Backup?",
    shortAnswer:
      "MySQL Enterprise Backup is a commercial backup and recovery tool for MySQL Enterprise Edition.",
    explanation:
      "It supports hot backups (online), incremental backups, compression, and point-in-time recovery. It is not available in Community Edition.",
    hint: "Think about an advanced backup tool.",
    level: "intermediate",
  },
  {
    question: "What is MySQL Enterprise Monitor?",
    shortAnswer:
      "MySQL Enterprise Monitor is a proactive monitoring tool that provides real-time dashboards, alerts, and performance advice.",
    explanation:
      "It helps identify performance issues, slow queries, and server health problems. It's part of the Enterprise Edition.",
    hint: "Think about performance monitoring.",
    level: "intermediate",
  },
  {
    question: "What is MySQL Enterprise Firewall?",
    shortAnswer:
      "MySQL Enterprise Firewall protects against SQL injection attacks by whitelisting allowed queries.",
    explanation:
      "It blocks suspicious queries that are not in the whitelist, providing an additional layer of security.",
    hint: "Think about SQL injection protection.",
    level: "intermediate",
  },
  {
    question: "What is MySQL Enterprise Audit?",
    shortAnswer:
      "MySQL Enterprise Audit is a plugin that logs and tracks all database activities for compliance and security.",
    explanation:
      "It helps meet regulatory requirements like HIPAA, GDPR, and SOX by providing detailed audit logs.",
    hint: "Think about tracking database access.",
    level: "intermediate",
  },
  {
    question: "What is MySQL HeatWave?",
    shortAnswer:
      "MySQL HeatWave is an integrated in-memory query accelerator that provides fast analytics on transactional data.",
    explanation:
      "It enables real-time OLAP queries without moving data to a separate analytics system. It's available in Enterprise Edition.",
    hint: "Think about in-memory analytics.",
    level: "intermediate",
  },
  {
    question: "When should I choose MySQL Community Edition?",
    shortAnswer:
      "Choose Community Edition for learning, development, startups, and applications that don't require enterprise-grade support or advanced security.",
    explanation:
      "It's free, feature-rich, and sufficient for most projects. Upgrade to Enterprise only when you need advanced features and 24/7 support.",
    hint: "Think about when free is good enough.",
    level: "basic",
  },
  {
    question: "When should I choose MySQL Enterprise Edition?",
    shortAnswer:
      "Choose Enterprise Edition for mission-critical applications that require advanced security, backup, monitoring, and professional support.",
    explanation:
      "It's suitable for large enterprises, financial systems, healthcare applications, and any system requiring compliance or 24/7 support.",
    hint: "Think about critical applications needing support.",
    level: "basic",
  },
  {
    question: "Can I migrate from Community Edition to Enterprise Edition?",
    shortAnswer:
      "Yes, migration from Community to Enterprise Edition is straightforward — it's the same database server with additional plugins and features.",
    explanation:
      "You can simply install Enterprise Edition and enable the advanced features. Your data and applications will work without changes.",
    hint: "Think about whether you can upgrade easily.",
    level: "intermediate",
  },
  {
    question: "Is MySQL Enterprise Edition available in the cloud?",
    shortAnswer:
      "Yes, Oracle offers MySQL Enterprise Edition on Oracle Cloud Infrastructure, and cloud providers like AWS, Azure, and GCP offer MySQL services.",
    explanation:
      "Cloud-managed MySQL services often include many enterprise features without the direct licensing cost.",
    hint: "Think about cloud options.",
    level: "intermediate",
  },
  {
    question: "What are the alternatives to MySQL Enterprise Edition?",
    shortAnswer:
      "Alternatives include MariaDB (fork with enterprise-like features), PostgreSQL (open-source), and commercial options like Oracle Database and Microsoft SQL Server.",
    explanation:
      "MariaDB offers similar features to Enterprise Edition at a lower cost. PostgreSQL is a powerful open-source alternative.",
    hint: "Think about other databases.",
    level: "intermediate",
  },
  {
    question: "Is MySQL Community Edition suitable for production use?",
    shortAnswer:
      "Yes, MySQL Community Edition is used in production by many large companies including Facebook, Twitter, and Wikipedia.",
    explanation:
      "It's reliable and scalable, but you won't have enterprise support or the advanced enterprise tools.",
    hint: "Think about whether production use is okay.",
    level: "basic",
  },
  {
    question: "What is included in the MySQL Enterprise Edition subscription?",
    shortAnswer:
      "The subscription includes Enterprise Backup, Enterprise Monitor, Enterprise Audit, Enterprise Firewall, HeatWave, and 24/7 Oracle support.",
    explanation:
      "It also includes software updates, patches, and access to the Oracle support portal.",
    hint: "Think about all the features you get.",
    level: "intermediate",
  },
  {
    question: "What is the cost of MySQL Enterprise Edition?",
    shortAnswer:
      "The cost varies based on the number of servers, edition tier, and subscription duration. Oracle does not publish fixed prices publicly.",
    explanation:
      "Pricing is typically per socket, per server, or per volume. Contact Oracle or a reseller for a quote.",
    hint: "Think about the pricing model.",
    level: "expert",
  },
  {
    question: "Can I use MySQL Enterprise Edition for development and testing?",
    shortAnswer:
      "Yes, Oracle offers development and testing licenses for Enterprise Edition at a lower cost than production licenses.",
    explanation:
      "Check the Oracle licensing terms for specific rules regarding development and non-production environments.",
    hint: "Think about development vs. production licensing.",
    level: "expert",
  },
  {
    question: "What is MySQL Cluster?",
    shortAnswer:
      "MySQL Cluster is a distributed, shared-nothing database solution that provides high availability and horizontal scalability.",
    explanation:
      "It's available in both Community and Enterprise editions. It's designed for real-time applications requiring high throughput.",
    hint: "Think about distributed database.",
    level: "intermediate",
  },
  {
    question: "What is the difference between MySQL Community and MySQL Cluster?",
    shortAnswer:
      "MySQL Community is a single-server database; MySQL Cluster is a distributed, multi-node database for high availability.",
    explanation:
      "MySQL Cluster uses the NDB storage engine and provides automatic sharding, failover, and high availability.",
    hint: "Think about single-server vs. distributed.",
    level: "intermediate",
  },
  {
    question: "Does MySQL Community Edition support replication?",
    shortAnswer:
      "Yes, MySQL Community Edition supports both master-slave and master-master replication.",
    explanation:
      "Replication is a core feature available in all editions. It's used for read scaling, backup, and high availability.",
    hint: "Think about replication availability.",
    level: "basic",
  },
  {
    question: "What is the MySQL Enterprise Tuning Advisor?",
    shortAnswer:
      "The MySQL Enterprise Tuning Advisor is a tool that provides recommendations for improving MySQL performance.",
    explanation:
      "It analyses server configuration, queries, and usage patterns to suggest optimizations. It's part of the Enterprise Monitor.",
    hint: "Think about performance tuning recommendations.",
    level: "expert",
  },
  {
    question: "Can I use MySQL Enterprise Edition without a license?",
    shortAnswer:
      "No, using MySQL Enterprise Edition without a license is illegal and violates Oracle's licensing terms.",
    explanation:
      "Enterprise Edition is commercial software that requires a valid subscription.",
    hint: "Think about the legal requirements.",
    level: "basic",
  },
  {
    question: "What are the advantages of MySQL Enterprise Edition over Community Edition?",
    shortAnswer:
      "Advantages include 24/7 Oracle support, Enterprise Backup, Monitor, Audit, Firewall, HeatWave, and advanced security features.",
    explanation:
      "These features provide enhanced security, performance, and peace of mind for mission-critical applications.",
    hint: "Think about the extra features.",
    level: "intermediate",
  },
  {
    question: "What are the disadvantages of MySQL Enterprise Edition?",
    shortAnswer:
      "Disadvantages include the cost, vendor lock-in, and the need to manage commercial licensing.",
    explanation:
      "The subscription can be expensive. Also, if you rely on proprietary features, switching to another database becomes harder.",
    hint: "Think about the downsides of a paid version.",
    level: "intermediate",
  },
  {
    question: "Is MariaDB a viable alternative to MySQL Enterprise Edition?",
    shortAnswer:
      "Yes, MariaDB offers a fully open-source database with many enterprise-like features, often at no cost.",
    explanation:
      "MariaDB includes features similar to Enterprise Backup, Monitor, and more. It's a popular choice for those who want enterprise features without commercial licensing.",
    hint: "Think about open-source alternatives.",
    level: "intermediate",
  },
  {
    question: "What is the role of Oracle in MySQL development?",
    shortAnswer:
      "Oracle owns MySQL and continues to develop both Community and Enterprise Editions, adding features and improvements regularly.",
    explanation:
      "Oracle has invested significantly in MySQL, releasing major versions (5.6, 5.7, 8.0) with modern features.",
    hint: "Think about who develops MySQL.",
    level: "basic",
  },
  {
    question: "What should I consider when choosing between MySQL Community and Enterprise editions?",
    shortAnswer:
      "Consider your budget, need for support, security requirements, compliance needs, and the criticality of your application.",
    explanation:
      "If you need 24/7 support, advanced security, or compliance, Enterprise is the better choice. Otherwise, Community is sufficient.",
    hint: "Think about the deciding factors.",
    level: "intermediate",
  },
  {
    question: "Can I get MySQL Enterprise Edition features in the cloud without a direct license?",
    shortAnswer:
      "Yes, cloud providers like AWS RDS, Azure Database for MySQL, and GCP Cloud SQL offer managed MySQL services with enterprise-like features.",
    explanation:
      "These services include backup, monitoring, and high availability without the need for a separate Enterprise Edition license.",
    hint: "Think about cloud managed services.",
    level: "intermediate",
  },
];

export default questions;