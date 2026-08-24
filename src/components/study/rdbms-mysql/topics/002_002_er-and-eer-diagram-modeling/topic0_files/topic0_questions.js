// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What are the three distinct phases of the standard Database Design Lifecycle?",
    shortAnswer: "1) Conceptual Design (ER/EER Modeling), 2) Logical Design (Relational Schema & Normalization), and 3) Physical Design (Storage Engine, Indexes & DDL Optimization).",
    explanation: "Standard 3-tier ANSI/SPARC database design methodology.",
    hint: "Conceptual -> Logical -> Physical.",
    level: "basic"
  },
  {
    question: "What is the primary objective of Conceptual Database Design?",
    shortAnswer: "To understand and formally model WHAT data the business needs and HOW entities relate, completely independent of any software, DBMS, or hardware.",
    explanation: "Communicates business rules between domain stakeholders and database architects.",
    hint: "High-level business abstraction independent of technology.",
    level: "basic"
  },
  {
    question: "What is the primary artifact produced during Conceptual Database Design?",
    shortAnswer: "An Entity-Relationship (ER) or Extended Entity-Relationship (EER) Diagram.",
    explanation: "Visual blueprint capturing entities, relationships, attributes, and constraints.",
    hint: "ER / EER Diagram.",
    level: "basic"
  },
  {
    question: "What is the primary objective of Logical Database Design?",
    shortAnswer: "To translate the conceptual ER model into a formal relational model consisting of normalized tables (relations), primary keys, foreign keys, and integrity constraints.",
    explanation: "Eliminates redundancy and anomalies using normalization theory (1NF -> BCNF).",
    hint: "Translates ER into normalized relational tables.",
    level: "basic"
  },
  {
    question: "Is Logical Database Design dependent on a specific DBMS product (like MySQL or Oracle)?",
    shortAnswer: "No, Logical design is Relational Model-dependent, but DBMS-independent; a 3NF relational schema works identically on MySQL, PostgreSQL, SQLite, or Oracle.",
    explanation: "Relational math and normalization apply across all relational database engines.",
    hint: "DBMS-independent relational schema.",
    level: "moderate"
  },
  {
    question: "What is the primary objective of Physical Database Design?",
    shortAnswer: "To optimize the logical schema for a specific DBMS engine (e.g. MySQL InnoDB) by selecting physical data types, storage engines, B-Tree indexes, partitioning, and memory buffer allocations.",
    explanation: "Focuses on storage efficiency, I/O performance, and query execution speed.",
    hint: "Storage engine, indexing, and hardware optimization.",
    level: "basic"
  },
  {
    question: "Why is skipping Conceptual ER modeling and jumping directly into SQL `CREATE TABLE` scripts dangerous?",
    shortAnswer: "It leads to missing business requirements, unnormalized tables full of modification anomalies, poor foreign key topologies, and costly schema refactoring later.",
    explanation: "Conceptual modeling validates business rules before code is committed.",
    hint: "Causes modification anomalies and costly architectural rewrites.",
    level: "moderate"
  },
  {
    question: "At which design level are data types like `DECIMAL(10,2)` or `BIGINT UNSIGNED` chosen?",
    shortAnswer: "Physical Design phase (although high-level domains like 'Currency' or 'Integer' may be noted conceptually).",
    explanation: "Exact byte footprints and precision are physical storage decisions.",
    hint: "Physical design phase.",
    level: "basic"
  },
  {
    question: "At which design level are Normalization algorithms (1NF, 2NF, 3NF, BCNF) applied?",
    shortAnswer: "Logical Design phase.",
    explanation: "Normalization decomposes relations based on functional dependencies to eliminate anomalies.",
    hint: "Logical design phase.",
    level: "basic"
  },
  {
    question: "At which design level are B-Tree indexes, Full-Text indexes, and clustered keys configured?",
    shortAnswer: "Physical Design phase.",
    explanation: "Indexes are physical data structures created to accelerate specific query patterns on disk.",
    hint: "Physical design phase.",
    level: "basic"
  },
  {
    question: "How does the target audience differ across the three database design phases?",
    shortAnswer: "Conceptual: Business domain experts & stakeholders; Logical: Data modelers & software engineers; Physical: Database administrators (DBAs) & performance engineers.",
    explanation: "Different stakeholder audiences for each level of abstraction.",
    hint: "Business experts -> Software engineers -> DBAs.",
    level: "moderate"
  },
  {
    question: "What is 'Requirements Collection and Analysis' in the database development lifecycle?",
    shortAnswer: "The preliminary stage preceding conceptual design where interviews, document reviews, and workflow analysis identify enterprise data requirements.",
    explanation: "Collects business rules, entity lists, and transaction volumes.",
    hint: "Preliminary requirements gathering phase.",
    level: "basic"
  },
  {
    question: "What is the difference between an Entity in Conceptual design vs a Relation in Logical design vs a Table in Physical design?",
    shortAnswer: "An Entity is a real-world business object; a Relation is a mathematical set of tuples; a Table is the physical storage representation on disk pages.",
    explanation: "Evolution of the entity concept across the three design tiers.",
    hint: "Real-world object -> Mathematical relation -> Physical disk table.",
    level: "expert"
  },
  {
    question: "Why should physical concerns (like index names or caching strategies) NEVER appear in a Conceptual ER diagram?",
    shortAnswer: "Because conceptual diagrams should remain pure business representations that non-technical stakeholders can validate without technical distraction.",
    explanation: "Preserves abstraction layers and prevents premature physical bias.",
    hint: "Maintains business clarity without technical clutter.",
    level: "moderate"
  },
  {
    question: "What is 'Schema Refinement' in Logical Design?",
    shortAnswer: "The process of analyzing functional dependencies, checking for lossless join decomposition, and ensuring dependency preservation through normalization.",
    explanation: "Refines raw tables into robust 3NF/BCNF relations.",
    hint: "Functional dependency analysis and normalization.",
    level: "expert"
  },
  {
    question: "How does Physical Design address query read performance vs write performance trade-offs?",
    shortAnswer: "By adding targeted secondary B-Tree indexes (which accelerate SELECT queries but add overhead to INSERT/UPDATE/DELETE operations).",
    explanation: "Physical DBAs balance indexing costs against query frequency.",
    hint: "Secondary index read speed vs insert overhead trade-off.",
    level: "expert"
  },
  {
    question: "Can a database designed at the Logical level in 3NF be deliberately denormalized in the Physical phase?",
    shortAnswer: "Yes, Controlled Denormalization is often applied in the Physical phase to pre-compute expensive joins in high-throughput analytical workloads.",
    explanation: "Physical optimization to reduce multi-table join latency.",
    hint: "Controlled denormalization for read-heavy workloads.",
    level: "expert"
  },
  {
    question: "What is 'Reverse Engineering' in the context of the design lifecycle?",
    shortAnswer: "Extracting the physical DDL from a live database and reconstructing the Logical Schema and Conceptual ER diagram.",
    explanation: "Used to visualize and document legacy databases.",
    hint: "Reconstructing ER diagrams from live physical databases.",
    level: "moderate"
  },
  {
    question: "What is 'Forward Engineering' in the context of the design lifecycle?",
    shortAnswer: "Taking a Conceptual/Logical EER model and automatically generating the physical SQL DDL schema scripts for deployment.",
    explanation: "Translates visual models into executable DDL.",
    hint: "Generating physical SQL DDL from visual models.",
    level: "basic"
  },
  {
    question: "What role does Transaction Volume and Frequency play during Physical Design?",
    shortAnswer: "It determines which columns need indexing, whether tables should be partitioned, and how memory buffer pools should be sized.",
    explanation: "Physical architecture is tailored to workload metrics.",
    hint: "Drives indexing, partitioning, and memory sizing.",
    level: "expert"
  },
  {
    question: "How are Multi-Valued Attributes handled between Conceptual and Logical design?",
    shortAnswer: "In Conceptual design, they appear as a double oval; in Logical design, they MUST be decomposed into a separate child table to satisfy 1NF.",
    explanation: "Multi-valued attributes violate 1NF atomicity in relational tables.",
    hint: "Decomposed into dedicated child tables in logical design.",
    level: "moderate"
  },
  {
    question: "How are Many-to-Many (M:N) relationships handled between Conceptual and Logical design?",
    shortAnswer: "In Conceptual design, they are drawn as an M:N diamond; in Logical design, they are transformed into a Bridge/Junction table with composite foreign keys.",
    explanation: "Relational engines cannot implement direct M:N links without a junction table.",
    hint: "Transformed into junction tables with composite keys.",
    level: "basic"
  },
  {
    question: "What is the ANSI/SPARC Three-Schema Architecture, and how does it map to the design lifecycle?",
    shortAnswer: "External Schema (User Views) maps to Conceptual/Application views; Conceptual Schema maps to Logical Relational Design; Internal Schema maps to Physical Storage Layout.",
    explanation: "Classic architectural framework for data independence.",
    hint: "External -> Conceptual -> Internal schema mapping.",
    level: "expert"
  },
  {
    question: "What is 'Logical Data Independence'?",
    shortAnswer: "The ability to modify the conceptual/logical schema (e.g. adding a new table or attribute) without changing external application views.",
    explanation: "Protects user applications from database restructuring.",
    hint: "Modifying logical schema without breaking user views.",
    level: "moderate"
  },
  {
    question: "What is 'Physical Data Independence'?",
    shortAnswer: "The ability to alter physical storage structures (e.g. adding indexes, partitioning tables, moving tablespaces) without modifying the logical schema or application queries.",
    explanation: "Allows DBAs to tune performance transparently.",
    hint: "Modifying indexes/storage without changing SQL queries.",
    level: "moderate"
  },
  {
    question: "Which design phase produces the Data Dictionary / Metadata Catalog specifications?",
    shortAnswer: "Logical Design phase (finalized with storage parameters in the Physical phase).",
    explanation: "Defines attribute names, domains, nullable flags, and constraint descriptions.",
    hint: "Logical design phase.",
    level: "moderate"
  },
  {
    question: "What security and access control considerations are planned during the design lifecycle?",
    shortAnswer: "Role definitions and view abstractions are planned logically; user accounts, GRANT privileges, and SSL/TDE encryption are implemented physically.",
    explanation: "Layered security across logical and physical tiers.",
    hint: "Role planning in logical phase; GRANTs and encryption in physical phase.",
    level: "moderate"
  },
  {
    question: "How does an enterprise validate that a Conceptual ER Model is complete before starting Logical Design?",
    shortAnswer: "By conducting a Walkthrough with business stakeholders, mapping every business use case / user story to paths through the ER diagram.",
    explanation: "Ensures all required queries and transactions can be answered by the model.",
    hint: "Stakeholder walkthrough validating all business use cases.",
    level: "basic"
  },
  {
    question: "What software tools are commonly used for each design phase?",
    shortAnswer: "Conceptual: Lucidchart, draw.io, ERwin; Logical: MySQL Workbench, DbSchema, ERStudio; Physical: MySQL Workbench, DBeaver, Flyway/Liquibase.",
    explanation: "Industry-standard data modeling toolchains.",
    hint: "ER diagramming tools -> Schema modelers -> Migration/DBA tools.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for managing the 3-tier database design lifecycle?",
    shortAnswer: "1) Gather and document business requirements. 2) Construct a pure Conceptual ER diagram. 3) Validate ER model with business users. 4) Map ER into Logical relations and normalize to 3NF/BCNF. 5) Implement Physical MySQL DDL with InnoDB, data types, and workload-driven indexes.",
    explanation: "Following these 5 steps ensures enterprise database projects succeed on schedule without architectural defects.",
    hint: "Requirements -> Conceptual ER -> Business validation -> Logical 3NF -> Physical MySQL DDL.",
    level: "basic"
  }
];

export default questions;
