// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is the primary objective of Database Normalization in relational database design?",
    shortAnswer: "To minimize data redundancy, optimize storage, and completely eliminate data modification anomalies (Insertion, Update, Deletion) without loss of information.",
    explanation: "Core definition and primary goals of relational database normalization.",
    hint: "Minimizes redundancy and eliminates insertion, update, and deletion anomalies.",
    level: "basic"
  },
  {
    question: "Who invented the concept of Database Normalization and in which year?",
    shortAnswer: "Dr. Edgar F. Codd (E. F. Codd) in 1970 as part of the relational database model at IBM.",
    explanation: "Historical foundation of normalization theory.",
    hint: "E. F. Codd in 1970.",
    level: "basic"
  },
  {
    question: "What is an Insertion Anomaly in an unnormalized database table?",
    shortAnswer: "An insertion anomaly occurs when a new entity cannot be inserted into the database without creating a fictional or dependent child record (often because part of the primary key would have to be NULL).",
    explanation: "Definition and root cause of insertion anomalies.",
    hint: "Cannot insert a standalone entity without creating a dependent record.",
    level: "basic"
  },
  {
    question: "What is an Update (Modification) Anomaly?",
    shortAnswer: "An update anomaly occurs when redundant copies of the same data exist across multiple rows, requiring every duplicate row to be updated; missing even one creates data inconsistency.",
    explanation: "Definition and consequence of update anomalies.",
    hint: "Redundant data in multiple rows leads to inconsistent states if not all rows are updated.",
    level: "basic"
  },
  {
    question: "What is a Deletion Anomaly?",
    shortAnswer: "A deletion anomaly occurs when deleting a specific record unintentionally and irreversibly destroys unrelated business information that only existed in that row.",
    explanation: "Definition and consequence of deletion anomalies.",
    hint: "Deleting one piece of data accidentally wipes out other independent data.",
    level: "basic"
  },
  {
    question: "What mathematical concept serves as the foundational cornerstone for 1NF, 2NF, 3NF, and BCNF?",
    shortAnswer: "Functional Dependencies (denoted as $X \\rightarrow Y$).",
    explanation: "Theoretical underpinning of relational normalization.",
    hint: "Functional Dependencies (X → Y).",
    level: "basic"
  },
  {
    question: "What are the two fundamental properties every valid relational decomposition MUST satisfy?",
    shortAnswer: "1) Lossless Join Property (the natural join of decomposed relations yields the exact original relation without spurious tuples), and 2) Dependency Preservation Property.",
    explanation: "Two required mathematical criteria for relational decomposition.",
    hint: "Lossless Join and Dependency Preservation.",
    level: "moderate"
  },
  {
    question: "What is First Normal Form (1NF)?",
    shortAnswer: "A relation is in 1NF if and only if all attribute values are atomic (indivisible scalars) and there are no repeating groups or multi-valued arrays in any cell.",
    explanation: "Definition of 1NF.",
    hint: "Atomic values only, no repeating groups or arrays.",
    level: "basic"
  },
  {
    question: "What is Second Normal Form (2NF)?",
    shortAnswer: "A relation is in 2NF if it is in 1NF AND every non-prime attribute is fully functionally dependent on the entire primary key (no partial dependencies on a subset of a composite key).",
    explanation: "Definition of 2NF.",
    hint: "1NF + No partial dependencies on composite primary keys.",
    level: "basic"
  },
  {
    question: "What is Third Normal Form (3NF)?",
    shortAnswer: "A relation is in 3NF if it is in 2NF AND no non-prime attribute is transitively dependent on the primary key (no non-prime attribute determines another non-prime attribute).",
    explanation: "Definition of 3NF.",
    hint: "2NF + No transitive dependencies between non-prime attributes.",
    level: "basic"
  },
  {
    question: "What is Boyce-Codd Normal Form (BCNF)?",
    shortAnswer: "A relation is in BCNF if for every non-trivial functional dependency $X \\rightarrow Y$, the determinant $X$ is a super key.",
    explanation: "Definition of BCNF (Strict 3.5NF).",
    hint: "For every non-trivial FD X → Y, X must be a super key.",
    level: "moderate"
  },
  {
    question: "What is the difference between 3NF and BCNF?",
    shortAnswer: "In 3NF, $X \\rightarrow Y$ is allowed if $X$ is a super key OR $Y$ is a prime attribute. BCNF strictly requires $X$ to be a super key, removing the prime attribute exception.",
    explanation: "Comparison of 3NF condition vs BCNF condition.",
    hint: "3NF allows Y to be a prime attribute; BCNF strictly requires X to be a super key.",
    level: "moderate"
  },
  {
    question: "What type of dependency is addressed by Fourth Normal Form (4NF)?",
    shortAnswer: "Multi-Valued Dependencies (MVDs, denoted as $X \\twoheadrightarrow Y$).",
    explanation: "Definition of 4NF and Multi-Valued Dependencies.",
    hint: "Multi-Valued Dependencies (MVDs: X ↠ Y).",
    level: "moderate"
  },
  {
    question: "What type of dependency is addressed by Fifth Normal Form (5NF / PJNF)?",
    shortAnswer: "Join Dependencies (Project-Join Normal Form / PJNF).",
    explanation: "Definition of 5NF and Join Dependencies.",
    hint: "Join Dependencies (Project-Join Normal Form).",
    level: "expert"
  },
  {
    question: "What is Domain-Key Normal Form (DKNF)?",
    shortAnswer: "A theoretical normal form where every constraint on a relation is a logical consequence of the definition of domains and keys.",
    explanation: "Definition of Domain-Key Normal Form.",
    hint: "All constraints are logical consequences of domains and keys.",
    level: "expert"
  },
  {
    question: "Why does data redundancy in unnormalized tables increase database storage costs and backup times?",
    shortAnswer: "Because repeated string, numeric, and date values across millions of rows consume gigabytes of redundant disk and RAM cache space and inflate backup image sizes.",
    explanation: "Physical infrastructure impact of unnormalized schemas.",
    hint: "Duplicated strings across millions of rows waste disk, memory cache, and I/O bandwidth.",
    level: "basic"
  },
  {
    question: "What is a 'Lossless Join' (Non-additive Join)?",
    shortAnswer: "A decomposition of relation $R$ into $R_1$ and $R_2$ is lossless if $R_1 \\bowtie R_2 = R$, meaning rejoining them yields the exact original tuples without adding false/spurious rows.",
    explanation: "Mathematical definition of lossless join decomposition.",
    hint: "R1 ⨝ R2 = R without producing false or spurious tuples.",
    level: "moderate"
  },
  {
    question: "What causes spurious tuples when rejoining decomposed relations?",
    shortAnswer: "Decomposing a relation on an attribute that is NOT a candidate key in at least one of the decomposed relations.",
    explanation: "Root cause of lossy decompositions and spurious rows.",
    hint: "The shared join attribute was not a candidate key in either table.",
    level: "moderate"
  },
  {
    question: "What is 'Dependency Preservation' in database decomposition?",
    shortAnswer: "A decomposition preserves dependencies if the union of functional dependencies of all decomposed relations logically implies all functional dependencies of the original relation.",
    explanation: "Definition of dependency preservation.",
    hint: "Enforces all original constraints locally without performing expensive joins.",
    level: "moderate"
  },
  {
    question: "Can every relation always be decomposed into 3NF while preserving dependencies and guaranteeing lossless join?",
    shortAnswer: "YES! 3NF synthesis algorithms always guarantee both Lossless Join and Dependency Preservation.",
    explanation: "3NF theoretical guarantees.",
    hint: "Yes, 3NF guarantees both lossless join and dependency preservation.",
    level: "moderate"
  },
  {
    question: "Can every relation always be decomposed into BCNF while preserving dependencies?",
    shortAnswer: "NO. While BCNF always guarantees Lossless Join, dependency preservation is NOT always achievable in BCNF without cross-table join checks.",
    explanation: "BCNF trade-off: lossless join is guaranteed, but dependency preservation may be sacrificed.",
    hint: "No, BCNF guarantees lossless join but may not preserve all functional dependencies.",
    level: "expert"
  },
  {
    question: "What is Denormalization?",
    shortAnswer: "The intentional introduction of controlled redundancy into a normalized database to reduce expensive JOIN operations and optimize read-intensive query performance.",
    explanation: "Definition and purpose of database denormalization.",
    hint: "Intentionally adding redundancy to speed up read-heavy queries and eliminate joins.",
    level: "basic"
  },
  {
    question: "In what type of database systems is 3NF/BCNF normalization most heavily used?",
    shortAnswer: "OLTP (Online Transaction Processing) systems such as banking, e-commerce checkouts, and ticketing where data write integrity is critical.",
    explanation: "OLTP normalization application.",
    hint: "OLTP systems (e-commerce checkout, banking, ticketing).",
    level: "basic"
  },
  {
    question: "In what type of database systems is Denormalization (e.g. Star Schema) most heavily used?",
    shortAnswer: "OLAP (Online Analytical Processing) systems, Data Warehouses, and reporting data marts where complex aggregations over historical data require high read speeds.",
    explanation: "OLAP denormalization application.",
    hint: "OLAP systems, Data Warehouses, and reporting data marts.",
    level: "basic"
  },
  {
    question: "What is a 'Prime Attribute' vs a 'Non-Prime Attribute'?",
    shortAnswer: "A prime attribute is any attribute that is a member of at least one Candidate Key. A non-prime attribute does not belong to any candidate key.",
    explanation: "Distinction between prime and non-prime attributes.",
    hint: "Prime = part of candidate key; Non-prime = not part of any candidate key.",
    level: "basic"
  },
  {
    question: "If an unnormalized table stores student names, course names, and grades in 1 table, how is it decomposed into 3NF?",
    shortAnswer: "Into 3 tables: `Students(student_id, name)`, `Courses(course_id, title)`, and `Enrollments(student_id, course_id, grade)`.",
    explanation: "Standard 3NF normalization decomposition pattern.",
    hint: "Students table, Courses table, and an Enrollments bridge table.",
    level: "basic"
  },
  {
    question: "How do Foreign Keys maintain data integrity after database normalization?",
    shortAnswer: "Foreign keys enforce referential integrity between decomposed child tables (e.g. Enrollments) and parent tables (e.g. Students, Courses), preventing orphaned rows.",
    explanation: "Role of foreign keys in normalized relational schemas.",
    hint: "Enforces parent-child relationships and prevents orphaned records.",
    level: "basic"
  },
  {
    question: "What is the penalty of over-normalizing a reporting database in production?",
    shortAnswer: "Query latency explodes because simple reports require 10-table to 15-table SQL JOINs, exhausting CPU, memory buffers, and temporary table disk space.",
    explanation: "Performance drawback of over-normalization.",
    hint: "Explosion of multi-table joins causing high query latency and memory usage.",
    level: "moderate"
  },
  {
    question: "What is the relationship between Entity-Relationship (ER) modeling and Database Normalization?",
    shortAnswer: "ER modeling is top-down conceptual design; Normalization is bottom-up mathematical verification that ensures the resulting tables contain no hidden redundancy or anomalies.",
    explanation: "Top-down ER modeling vs bottom-up Normalization synergy.",
    hint: "ER modeling is top-down conceptual design; Normalization is bottom-up mathematical verification.",
    level: "basic"
  },
  {
    question: "What is the golden rule of production database design regarding Normalization?",
    shortAnswer: "'Normalize until it hurts, denormalize until it works.' (Design in 3NF/BCNF first for integrity, then selectively denormalize based on profiled query bottlenecks).",
    explanation: "Industry best-practice aphorism for relational database engineering.",
    hint: "Design in 3NF/BCNF first, then selectively denormalize only after profiling query bottlenecks.",
    level: "basic"
  }
];

export default questions;
