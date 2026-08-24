/**
 * Topic 5: Problems with File-Based Systems – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the main problems of file-based systems?",
    shortAnswer:
      "The main problems are data redundancy, inconsistency, difficult access, no concurrency control, security issues, data isolation, integrity problems, and limited scalability.",
    explanation:
      "These problems arise because file systems are unstructured, lack built-in relationships, and provide no automatic management features. They were the primary motivation for developing database systems.",
    hint: "Think about all the ways a file system fails for multi-user, data-intensive applications.",
    level: "basic",
  },
  {
    question: "What is data redundancy in a file-based system?",
    shortAnswer:
      "Data redundancy occurs when the same data is stored in multiple files, wasting storage and increasing the risk of inconsistency.",
    explanation:
      "For example, a student's name and address might appear in attendance, marks, and fee files. This duplication is wasteful and makes updates error-prone.",
    hint: "Think about how many times your name appears in different files at school.",
    level: "basic",
  },
  {
    question: "What is data inconsistency and how does it arise in file systems?",
    shortAnswer:
      "Data inconsistency happens when different copies of the same data do not match, typically because an update was not applied to all files.",
    explanation:
      "If a student's address changes and the update is made only in one file, the other files will still have the old address — leading to inconsistent records.",
    hint: "Think about how your address might differ between different school records.",
    level: "basic",
  },
  {
    question: "Why is data access difficult in file-based systems?",
    shortAnswer:
      "File systems have no standard query language; you must write custom programs to search, filter, and aggregate data.",
    explanation:
      "For example, finding all students who scored above 80 in a subject requires reading the entire file and manually filtering. Complex queries (like joins) are extremely hard.",
    hint: "Think about how you would find all students from Class 10 who scored above 80 in a text file.",
    level: "intermediate",
  },
  {
    question: "What is concurrency and why is it a problem in file systems?",
    shortAnswer:
      "Concurrency is the ability of multiple users to access data simultaneously. File systems lack proper concurrency control, leading to data corruption.",
    explanation:
      "If two teachers update the same marks file at the same time, one may overwrite the other's changes. File locking exists but is crude and often blocks users.",
    hint: "Think about what happens when two people try to edit the same Word document.",
    level: "intermediate",
  },
  {
    question: "How do file systems handle security compared to databases?",
    shortAnswer:
      "File systems provide basic OS-level permissions (read/write/execute) on entire files, but no fine-grained access control on data within files.",
    explanation:
      "You can't restrict a teacher to see only their class's marks or hide a student's sensitive information. Databases offer row-level, column-level, and role-based security.",
    hint: "Think about how a hospital might restrict access to patient records.",
    level: "intermediate",
  },
  {
    question: "What is data isolation in file-based systems?",
    shortAnswer:
      "Data isolation means that data is scattered across different files with no built-in relationships, making it hard to combine or query related data.",
    explanation:
      "For example, student details are in one file, marks in another, and fees in a third. To get a complete student report, you must manually link records using IDs.",
    hint: "Think about how you would combine data from different spreadsheets.",
    level: "intermediate",
  },
  {
    question: "What are integrity problems in file-based systems?",
    shortAnswer:
      "Integrity problems occur because file systems cannot enforce business rules or data constraints automatically.",
    explanation:
      "There is nothing to prevent a negative mark, a non-existent student ID, or a duplicate record. Application code must enforce rules, but bugs can easily violate them.",
    hint: "Think about why you can't enter a negative mark in a database.",
    level: "intermediate",
  },
  {
    question: "Why do file-based systems have limited scalability?",
    shortAnswer:
      "File systems have no indexing or query optimization, so performance degrades as data volume grows. Searching a large file requires scanning it entirely.",
    explanation:
      "There are no indexes to speed up searches, no caching, and no query optimiser. As data grows from thousands to millions of records, queries become unacceptably slow.",
    hint: "Think about how long it takes to search a 1GB text file.",
    level: "intermediate",
  },
  {
    question: "How does data redundancy lead to data inconsistency?",
    shortAnswer:
      "When data is duplicated across multiple files, an update to one copy must be applied to all copies. Missing an update leads to inconsistency.",
    explanation:
      "The more copies of data you have, the higher the chance of inconsistency. Redundancy is the root cause of inconsistency.",
    hint: "Think about what happens if you update your address in one system but not another.",
    level: "basic",
  },
  {
    question: "What is the cost of maintaining a file-based system?",
    shortAnswer:
      "File-based systems incur high maintenance costs due to manual data management, custom code for queries, and the risk of data corruption.",
    explanation:
      "As the system grows, more time is spent on fixing inconsistencies, writing new queries, and dealing with concurrency issues. This cost often exceeds the cost of a database system.",
    hint: "Think about the time spent correcting data errors in a school's files.",
    level: "intermediate",
  },
  {
    question: "What are the typical warning signs that a file system is failing?",
    shortAnswer:
      "Warning signs include frequent data inconsistencies, slow queries, file corruption, user complaints, and difficulty in generating reports.",
    explanation:
      "If you're spending more time fixing data than using it, it's time to move to a database. Other signs: multiple users can't work effectively, and security breaches are a concern.",
    hint: "Think about the symptoms of a system that is struggling to handle data.",
    level: "intermediate",
  },
  {
    question: "Can file systems be used for production applications?",
    shortAnswer:
      "Yes, but only for small-scale, single-user, or read-only applications where data volume is small and concurrency is not an issue.",
    explanation:
      "Examples: configuration files, log files, or temporary data stores. For any multi-user, business-critical application, a database is essential.",
    hint: "Think about whether a bank could use text files to store accounts.",
    level: "basic",
  },
  {
    question: "What is the difference between file system locking and database concurrency control?",
    shortAnswer:
      "File system locking is crude — it locks the entire file, preventing concurrent access. Database concurrency uses fine-grained locks (row-level, table-level) and isolation levels for safe concurrent access.",
    explanation:
      "Databases allow multiple users to update different rows of the same table simultaneously. File systems force users to wait, reducing productivity.",
    hint: "Think about how a database can update two different records at the same time.",
    level: "expert",
  },
  {
    question: "How does the lack of query language affect file-based systems?",
    shortAnswer:
      "Without a query language, you must write custom code for every data request, which is time-consuming, error-prone, and hard to optimise.",
    explanation:
      "SQL provides a declarative way to query data, making it easy to formulate complex conditions, joins, and aggregations. File systems lack this.",
    hint: "Think about writing code to find all students who scored above 80 in three subjects.",
    level: "intermediate",
  },
  {
    question: "What is the relationship between file systems and application code?",
    shortAnswer:
      "In file systems, application code is tightly coupled with the data format. Changing the file format often requires rewriting the application.",
    explanation:
      "Databases provide data independence, where applications are insulated from physical storage changes. This is a significant advantage.",
    hint: "Think about what happens if you add a new field to a text file.",
    level: "intermediate",
  },
  {
    question: "Why are backups harder in file systems compared to databases?",
    shortAnswer:
      "File system backups are manual and often require taking the system offline. Databases offer automated, online backups with point-in-time recovery.",
    explanation:
      "Databases can back up while running and can restore to any point in time using transaction logs. File systems only have file-level copies, which may be inconsistent if files are being updated.",
    hint: "Think about how a database can recover to just before a power outage.",
    level: "intermediate",
  },
  {
    question: "What is the impact of file system problems on business decisions?",
    shortAnswer:
      "Inconsistent or inaccurate data leads to poor decisions, financial loss, and loss of customer trust.",
    explanation:
      "For example, sending a fee reminder to the wrong address due to inconsistent data can damage the school's reputation and lead to lost revenue.",
    hint: "Think about how wrong data affects a company's decisions.",
    level: "intermediate",
  },
  {
    question: "How do file systems handle data validation?",
    shortAnswer:
      "File systems have no built-in validation. Validation must be implemented in application code, which is often incomplete or bypassed.",
    explanation:
      "Databases enforce constraints at the data layer, ensuring that no invalid data is ever stored. This is a major advantage.",
    hint: "Think about why a database can prevent a negative age.",
    level: "intermediate",
  },
  {
    question: "What is the role of file systems in modern data architectures?",
    shortAnswer:
      "File systems are still used for storing unstructured data (logs, images, videos) and for data exchange (CSV, JSON).",
    explanation:
      "They complement databases in modern architectures. Structured data goes to databases; unstructured data and files are stored in file systems or object storage.",
    hint: "Think about where a company stores its product images.",
    level: "intermediate",
  },
  {
    question: "What are the common mistakes when designing a file-based system?",
    shortAnswer:
      "Common mistakes include: not planning for growth, ignoring concurrency, not enforcing integrity, and not documenting the data structure.",
    explanation:
      "These mistakes lead to the problems we've discussed — redundancy, inconsistency, and difficulty in maintenance.",
    hint: "Think about the consequences of not having a unique student ID.",
    level: "intermediate",
  },
  {
    question: "How do databases solve the data isolation problem?",
    shortAnswer:
      "Databases use relationships (foreign keys) to link tables, allowing you to combine data from multiple tables with JOIN operations.",
    explanation:
      "For example, you can join the Students and Marks tables to get a complete report. This is done with a simple SQL query, without manual file merging.",
    hint: "Think about how a SQL query can combine data from two tables.",
    level: "intermediate",
  },
  {
    question: "What is the difference between data independence in files vs databases?",
    shortAnswer:
      "In file systems, changing the file format breaks applications. In databases, changes to the physical storage (like adding an index) do not affect applications.",
    explanation:
      "This is called physical data independence. Databases also offer logical data independence, where changes to the schema (like adding a column) don't break existing queries.",
    hint: "Think about adding a new column to a database without rewriting all the code.",
    level: "expert",
  },
  {
    question: "What are the security risks of file-based systems?",
    shortAnswer:
      "Security risks include: unauthorised file access, data leaks, lack of audit trails, and vulnerability to theft (as files are easily copied).",
    explanation:
      "Databases provide encryption, access controls, auditing, and activity monitoring, which are essential for sensitive data.",
    hint: "Think about how easy it is to copy a file vs. copying data from a database.",
    level: "intermediate",
  },
  {
    question: "How does the lack of indexing affect file system performance?",
    shortAnswer:
      "Without indexes, every search requires scanning the entire file (O(n)), which becomes impractical for large files.",
    explanation:
      "Databases use B-tree, hash, or other index structures to achieve O(log n) or O(1) lookups, making queries fast even on billions of rows.",
    hint: "Think about the difference between scanning a book and using its index.",
    level: "intermediate",
  },
  {
    question: "What is the cost of data corruption in file-based systems?",
    shortAnswer:
      "Data corruption can lead to data loss, business disruption, legal liability, and loss of trust. It can be extremely expensive to recover.",
    explanation:
      "In file systems, corruption is more likely due to concurrency issues and lack of transaction logging. Databases have built-in mechanisms to prevent and recover from corruption.",
    hint: "Think about what happens if a school's marks file gets corrupted.",
    level: "intermediate",
  },
  {
    question: "What are the challenges of scaling a file-based system?",
    shortAnswer:
      "Challenges include: performance degradation, difficulty in distributing data, and the need for manual sharding or partitioning.",
    explanation:
      "Databases offer automatic sharding, replication, and load balancing, which are essential for modern web-scale applications.",
    hint: "Think about how a popular app handles millions of users.",
    level: "expert",
  },
  {
    question: "How do databases ensure data integrity compared to file systems?",
    shortAnswer:
      "Databases enforce integrity through constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK) and triggers. File systems have no such mechanisms.",
    explanation:
      "This ensures that data is always valid according to business rules, reducing the need for application-level validation.",
    hint: "Think about how a database can prevent duplicate student IDs.",
    level: "intermediate",
  },
  {
    question: "What are the advantages of using a database for a school management system?",
    shortAnswer:
      "Advantages include: no redundancy, consistent data, easy querying (SQL), concurrency support, fine-grained security, integrity enforcement, and scalability.",
    explanation:
      "A school can generate reports, track attendance, manage fees, and communicate with parents efficiently. All these are possible with a database.",
    hint: "Think about how a school can easily find all students with low attendance.",
    level: "basic",
  },
  {
    question: "What are the migration challenges from file to database?",
    shortAnswer:
      "Challenges include: data extraction from files, transformation to database schema, data cleansing, and updating applications.",
    explanation:
      "The migration requires careful planning, testing, and often involves downtime. It's a significant project that needs management support.",
    hint: "Think about the effort to move data from spreadsheets to a new system.",
    level: "intermediate",
  },
  {
    question: "What are the future trends that address file system problems?",
    shortAnswer:
      "Trends include: data lakes that store files but provide SQL-like querying, and NewSQL databases that combine SQL with scalability.",
    explanation:
      "Data lakes (like Amazon S3 + Athena) allow you to query files using SQL. NewSQL databases offer the benefits of SQL and horizontal scaling.",
    hint: "Think about how you can query a CSV file using SQL in modern tools.",
    level: "expert",
  },
];

export default questions;