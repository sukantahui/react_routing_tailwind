/**
 * Topic 26: History of MySQL – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "When was MySQL first released and who founded it?",
    shortAnswer:
      "MySQL was first released in 1995 by Michael 'Monty' Widenius and David Axmark, who founded MySQL AB.",
    explanation:
      "The first version of MySQL was named after Monty's daughter 'My'. It was initially released in 1995 and quickly gained popularity among web developers.",
    hint: "Think about the mid-1990s and the founders' names.",
    level: "basic",
  },
  {
    question: "What is the origin of the name 'MySQL'?",
    shortAnswer:
      "The name 'MySQL' comes from 'My' (the name of Michael Widenius's daughter) and 'SQL' (Structured Query Language).",
    explanation:
      "Michael Widenius named the database after his daughter My. The project started as a personal database system and grew into a global success.",
    hint: "Think about the name's personal connection.",
    level: "basic",
  },
  {
    question: "When did MySQL become open-source under the GPL license?",
    shortAnswer:
      "MySQL became open-source under the GPL license in 2000.",
    explanation:
      "This decision was pivotal for MySQL's adoption. Making it free and open-source led to rapid growth in the web development community.",
    hint: "Think about the year 2000.",
    level: "basic",
  },
  {
    question: "What major feature was introduced in MySQL 4.0 (2003)?",
    shortAnswer:
      "MySQL 4.0 introduced the InnoDB storage engine, which added transaction support (ACID) and foreign key constraints.",
    explanation:
      "InnoDB made MySQL suitable for enterprise applications by adding transaction support, row-level locking, and foreign keys. It later became the default storage engine.",
    hint: "Think about the engine that supports transactions.",
    level: "intermediate",
  },
  {
    question: "What major features were introduced in MySQL 5.0 (2005)?",
    shortAnswer:
      "MySQL 5.0 introduced stored procedures, triggers, views, and cursors.",
    explanation:
      "This was a major release that brought MySQL closer to feature parity with commercial databases. It made MySQL more powerful and flexible for developers.",
    hint: "Think about programming features in SQL.",
    level: "intermediate",
  },
  {
    question: "Which company acquired MySQL AB in 2008?",
    shortAnswer:
      "Sun Microsystems acquired MySQL AB in 2008 for approximately $1 billion.",
    explanation:
      "The acquisition by Sun Microsystems was a major event in the database world. It brought MySQL under a major corporate umbrella.",
    hint: "Think about the company that created Java.",
    level: "basic",
  },
  {
    question: "Which company acquired MySQL when it acquired Sun Microsystems?",
    shortAnswer:
      "Oracle Corporation acquired MySQL when it acquired Sun Microsystems in 2010.",
    explanation:
      "Oracle's acquisition of Sun Microsystems included MySQL. This raised concerns about MySQL's future as an open-source project.",
    hint: "Think about the large enterprise database company.",
    level: "basic",
  },
  {
    question: "Why was MariaDB created as a fork of MySQL?",
    shortAnswer:
      "MariaDB was created as a fork of MySQL in 2009 by Michael 'Monty' Widenius to ensure that MySQL would remain open-source and free from Oracle's control.",
    explanation:
      "Monty started MariaDB after the Oracle acquisition to continue development independently and to keep the database fully open-source.",
    hint: "Think about the fork and its reason.",
    level: "intermediate",
  },
  {
    question: "What are the main differences between MySQL and MariaDB?",
    shortAnswer:
      "MariaDB is a fork of MySQL with additional storage engines, improved performance, and a fully open-source license, while MySQL is owned by Oracle.",
    explanation:
      "MariaDB includes features like the Aria storage engine, improved query optimizer, and extra extensions. Both are compatible, but they have diverged over time.",
    hint: "Think about the differences in ownership and features.",
    level: "intermediate",
  },
  {
    question: "What major features were introduced in MySQL 5.7 (2015)?",
    shortAnswer:
      "MySQL 5.7 introduced JSON support, improved performance, enhanced security, and SQL mode improvements.",
    explanation:
      "JSON support was a significant addition, allowing MySQL to store and query JSON documents. Performance improvements made MySQL faster and more efficient.",
    hint: "Think about JSON and performance improvements.",
    level: "intermediate",
  },
  {
    question: "What major features were introduced in MySQL 8.0 (2018)?",
    shortAnswer:
      "MySQL 8.0 introduced window functions, common table expressions (CTEs), a new data dictionary, and improved JSON handling.",
    explanation:
      "Window functions and CTEs brought SQL more in line with modern standards. The new data dictionary improved performance and manageability.",
    hint: "Think about modern SQL features.",
    level: "intermediate",
  },
  {
    question: "What is the current major version of MySQL?",
    shortAnswer:
      "The current major version of MySQL is 8.0, released in 2018 and actively maintained.",
    explanation:
      "MySQL 8.0 continues to receive updates and new features. It is the recommended version for new projects.",
    hint: "Think about the most recent major release.",
    level: "basic",
  },
  {
    question: "Who was Michael 'Monty' Widenius?",
    shortAnswer:
      "Michael 'Monty' Widenius is the lead developer and co-founder of MySQL. He named the database after his daughter My.",
    explanation:
      "Monty was the primary architect of MySQL and later founded MariaDB. He is a prominent figure in the open-source database community.",
    hint: "Think about the creator of MySQL.",
    level: "basic",
  },
  {
    question: "What was the first production version of MySQL?",
    shortAnswer:
      "MySQL 1.0 was the first production release in 1996.",
    explanation:
      "MySQL 1.0 was initially designed for small to medium-sized applications with a focus on speed and simplicity.",
    hint: "Think about the very first version.",
    level: "basic",
  },
  {
    question: "What was the significance of MySQL becoming open-source?",
    shortAnswer:
      "Becoming open-source in 2000 led to rapid adoption, making MySQL the database of choice for web developers and powering the LAMP stack.",
    explanation:
      "Open-source licensing removed barriers to adoption, attracted a large community, and enabled widespread use.",
    hint: "Think about why MySQL became so popular.",
    level: "intermediate",
  },
  {
    question: "How did the Oracle acquisition affect MySQL?",
    shortAnswer:
      "The Oracle acquisition brought continued investment, major releases (5.6, 5.7, 8.0), and improved enterprise features, but also raised concerns about the project's future openness.",
    explanation:
      "Oracle has continued to develop MySQL aggressively, but some community members worried about vendor lock-in and the potential for closed-source features.",
    hint: "Think about both the positives and concerns.",
    level: "intermediate",
  },
  {
    question: "What is the LAMP stack and MySQL's role in it?",
    shortAnswer:
      "LAMP stands for Linux, Apache, MySQL, and PHP/Perl/Python. MySQL is the database component, providing data storage for web applications.",
    explanation:
      "The LAMP stack became the foundation for millions of websites. MySQL's role as the database layer was crucial for the stack's success.",
    hint: "Think about the 'M' in LAMP.",
    level: "basic",
  },
  {
    question: "What are some major companies that use MySQL?",
    shortAnswer:
      "Major companies using MySQL include Facebook, Twitter, YouTube, Wikipedia, and WordPress.",
    explanation:
      "MySQL powers some of the largest websites in the world, demonstrating its scalability and reliability.",
    hint: "Think about the biggest websites you know.",
    level: "basic",
  },
  {
    question: "What was the motivation behind the InnoDB storage engine?",
    shortAnswer:
      "InnoDB was introduced to provide ACID transactions, foreign key support, and better concurrency control, making MySQL suitable for enterprise applications.",
    explanation:
      "InnoDB added transaction support, row-level locking, and crash recovery, addressing the limitations of the earlier MyISAM engine.",
    hint: "Think about ACID compliance.",
    level: "intermediate",
  },
  {
    question: "What are the main MySQL versions and their release years?",
    shortAnswer:
      "Key versions: 1.0 (1996), 4.0 (2003), 5.0 (2005), 5.6 (2013), 5.7 (2015), 8.0 (2018).",
    explanation:
      "Each major version introduced significant features. Versions 4.0, 5.0, 5.6, 5.7, and 8.0 were particularly important milestones.",
    hint: "Think about the major releases timeline.",
    level: "intermediate",
  },
  {
    question: "What was the role of MySQL AB before the acquisition?",
    shortAnswer:
      "MySQL AB was the company founded by Widenius and Axmark to develop and commercialise MySQL.",
    explanation:
      "MySQL AB managed the MySQL project, provided support, and offered commercial licenses. It was the driving force behind MySQL's growth.",
    hint: "Think about the company that created MySQL.",
    level: "basic",
  },
  {
    question: "What is the significance of the GPL license for MySQL?",
    shortAnswer:
      "The GPL license made MySQL free and open-source, allowing anyone to use, modify, and distribute it, which drove widespread adoption.",
    explanation:
      "The GPL license meant that MySQL could be used in open-source projects without cost, making it accessible to developers worldwide.",
    hint: "Think about the license that enables free use.",
    level: "intermediate",
  },
  {
    question: "How has MySQL evolved in terms of performance?",
    shortAnswer:
      "MySQL performance has improved significantly with each release, through better query optimization, indexing, and storage engine improvements.",
    explanation:
      "MySQL 8.0, in particular, introduced significant performance improvements, including better hash joins, improved query execution, and more efficient storage.",
    hint: "Think about how MySQL has become faster over time.",
    level: "expert",
  },
  {
    question: "What is the future of MySQL?",
    shortAnswer:
      "MySQL continues to evolve with regular updates, cloud integration, and new features like JSON support, window functions, and improved security.",
    explanation:
      "Oracle continues to invest in MySQL, with a focus on performance, scalability, and cloud-native features. The community remains strong.",
    hint: "Think about the ongoing development.",
    level: "expert",
  },
  {
    question: "What are the key differences between MySQL Community Edition and Enterprise Edition?",
    shortAnswer:
      "Community Edition is free and open-source; Enterprise Edition includes additional features like advanced security, monitoring, and support.",
    explanation:
      "Enterprise Edition is a commercial offering with features like MySQL Enterprise Backup, Audit, and Firewall, along with technical support.",
    hint: "Think about free vs. paid versions.",
    level: "intermediate",
  },
  {
    question: "What is the role of the MySQL Community?",
    shortAnswer:
      "The MySQL Community contributes to the project through bug reports, code contributions, and support, making MySQL better and more reliable.",
    explanation:
      "The community is essential to MySQL's success. It helps with testing, documentation, and providing feedback.",
    hint: "Think about the people who use and contribute to MySQL.",
    level: "intermediate",
  },
  {
    question: "What is the difference between MySQL and PostgreSQL?",
    shortAnswer:
      "MySQL is known for speed and ease of use, while PostgreSQL is known for advanced features and standards compliance.",
    explanation:
      "Both are open-source RDBMS, but PostgreSQL is more feature-rich in some areas (like advanced indexing and JSON), while MySQL is often faster for simple operations.",
    hint: "Think about the trade-offs between speed and features.",
    level: "intermediate",
  },
  {
    question: "What was the significance of MySQL 5.0?",
    shortAnswer:
      "MySQL 5.0 was significant because it introduced stored procedures, triggers, views, and cursors, making it more competitive with commercial databases.",
    explanation:
      "This release was a major step forward, adding features that were essential for enterprise applications.",
    hint: "Think about enterprise features.",
    level: "intermediate",
  },
  {
    question: "How has MySQL's history influenced its current features?",
    shortAnswer:
      "MySQL's history of focusing on speed, simplicity, and web applications has shaped its feature set, with a strong emphasis on performance and ease of use.",
    explanation:
      "MySQL's development has been driven by the needs of web developers, resulting in a database that is fast, reliable, and easy to manage.",
    hint: "Think about the web development focus.",
    level: "expert",
  },
  {
    question: "What are the key takeaways from MySQL's history?",
    shortAnswer:
      "Key takeaways: open-source can be successful, community matters, corporate acquisition doesn't always kill open-source, and innovation continues.",
    explanation:
      "MySQL's history shows that open-source software can thrive, even after corporate acquisition. The community and ongoing development are crucial.",
    hint: "Think about the lessons from MySQL's journey.",
    level: "expert",
  },
  {
    question: "What is the relationship between MySQL and the LAMP stack?",
    shortAnswer:
      "MySQL is the 'M' in LAMP (Linux, Apache, MySQL, PHP/Perl/Python). It provides the database layer for this popular web development stack.",
    explanation:
      "The LAMP stack powered millions of websites, and MySQL was a key component, making it one of the most widely used databases in the world.",
    hint: "Think about the 'M' in LAMP.",
    level: "basic",
  },
];

export default questions;