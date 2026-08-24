// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is a Formal Relational Query Language?",
    shortAnswer: "A formal mathematical language developed by Dr. E. F. Codd that defines precise algebraic or logical operations for querying relational databases.",
    explanation: "Mathematical foundation for all relational database systems.",
    hint: "Formal mathematical language developed by E. F. Codd.",
    level: "basic"
  },
  {
    question: "What is the fundamental difference between Relational Algebra and Relational Calculus?",
    shortAnswer: "Relational Algebra is PROCEDURAL (specifies WHAT data is desired and HOW to evaluate it step-by-step); Relational Calculus is DECLARATIVE (specifies WHAT data is desired without specifying the evaluation steps).",
    explanation: "Procedural vs Declarative query paradigms.",
    hint: "Algebra = Procedural (How); Calculus = Declarative (What).",
    level: "basic"
  },
  {
    question: "What is 'Relational Completeness' in database theory?",
    shortAnswer: "A query language is relationally complete if it can express any query that can be formulated in basic Relational Algebra (or safe Relational Calculus).",
    explanation: "Benchmark for relational expressive power.",
    hint: "Can express any query expressible in basic Relational Algebra.",
    level: "basic"
  },
  {
    question: "What is Codd's Reduction Theorem?",
    shortAnswer: "The mathematical proof that Relational Algebra, Safe Tuple Relational Calculus, and Safe Domain Relational Calculus all possess the exact same expressive power.",
    explanation: "Equivalence theorem by Dr. Edgar F. Codd.",
    hint: "Algebra ≡ Safe TRC ≡ Safe DRC.",
    level: "moderate"
  },
  {
    question: "What are the FIVE fundamental (primitive) operators of Relational Algebra?",
    shortAnswer: "1) Selection (σ), 2) Projection (π), 3) Cartesian Product (×), 4) Set Union (∪), and 5) Set Difference (−).",
    explanation: "The 5 primitive operators from which all other operators can be derived.",
    hint: "Selection, Projection, Cartesian Product, Union, Difference.",
    level: "basic"
  },
  {
    question: "Why is the Rename Operator (ρ) considered an essential auxiliary operator in Relational Algebra?",
    shortAnswer: "It assigns new names to intermediate relations and disambiguates attribute names when performing self-joins or multiple joins on the same relation.",
    explanation: "Relation and attribute renaming for schema clarity.",
    hint: "Renames relations and attributes for self-joins.",
    level: "basic"
  },
  {
    question: "How is the Set Intersection operator (∩) derived using only the fundamental 5 operators?",
    shortAnswer: "$$R \\cap S = R - (R - S)$$ or $$R \\cap S = S - (S - R)$$.",
    explanation: "Set intersection derived from double set difference.",
    hint: "R - (R - S).",
    level: "moderate"
  },
  {
    question: "How is the Theta Join operator (⨝_θ) derived using only fundamental operators?",
    shortAnswer: "$$R \\bowtie_\\theta S = \\sigma_\\theta(R \\times S)$$.",
    explanation: "Cartesian product followed by a Selection condition.",
    hint: "Selection applied to Cartesian product.",
    level: "basic"
  },
  {
    question: "Why is commercial SQL considered a declarative language rather than a procedural language?",
    shortAnswer: "Because in SQL, the developer writes `SELECT ... FROM ... WHERE ...` (specifying WHAT data is needed), leaving the RDBMS query optimizer to convert it into a procedural Relational Algebra execution plan.",
    explanation: "Declarative interface abstraction in SQL.",
    hint: "Developer specifies target data; optimizer figures out execution steps.",
    level: "basic"
  },
  {
    question: "What does it mean for Relational Algebra to be 'Closed' (The Closure Property)?",
    shortAnswer: "The output of every relational algebra operation is ALWAYS a valid Relation (table), meaning operations can be nested indefinitely as operands for further operations.",
    explanation: "Closure property enables composable query nesting.",
    hint: "Every operator takes relations as input and produces a relation as output.",
    level: "basic"
  },
  {
    question: "What is an 'Unsafe Expression' in Relational Calculus?",
    shortAnswer: "A calculus formula that generates an INFINITE number of tuples (e.g. `{t | NOT Student(t)}` querying everything in the universe that is not a student).",
    explanation: "Domain independence and calculus safety rules.",
    hint: "A query that produces an infinite result set.",
    level: "moderate"
  },
  {
    question: "How does an RDBMS Query Optimizer utilize Relational Algebra internally?",
    shortAnswer: "It parses the incoming declarative SQL query into a Relational Algebra Query Tree, applies algebraic equivalence rules (heuristics) to reorder operators, and generates the optimal physical execution plan.",
    explanation: "Internal query compilation pipeline in RDBMS engines.",
    hint: "Parses SQL into query tree and applies algebraic equivalence transforms.",
    level: "expert"
  },
  {
    question: "What is the arity (degree) of a relation produced by the Cartesian Product $R \\times S$?",
    shortAnswer: "$$\\text{Degree}(R \\times S) = \\text{Degree}(R) + \\text{Degree}(S)$$.",
    explanation: "Sum of attribute counts from both relations.",
    hint: "Degree(R) + Degree(S).",
    level: "basic"
  },
  {
    question: "What is the cardinality (number of tuples) of a relation produced by Cartesian Product $R \\times S$?",
    shortAnswer: "$$\\text{Cardinality}(R \\times S) = |R| \\times |S|$$.",
    explanation: "Product of tuple counts from both relations.",
    hint: "|R| * |S|.",
    level: "basic"
  },
  {
    question: "What mathematical property distinguishes a Relation in Relational Algebra from an SQL table?",
    shortAnswer: "In pure Relational Algebra, a relation is a SET (cannot contain duplicate tuples and row order is undefined); in SQL, tables are MULTISETS/BAGS (can contain duplicates unless `DISTINCT` is used).",
    explanation: "Set semantics vs Multiset/Bag semantics.",
    hint: "Relational Algebra uses pure sets (no duplicates); SQL uses bags/multisets.",
    level: "moderate"
  },
  {
    question: "What are the two variants of formal Relational Calculus?",
    shortAnswer: "1) Tuple Relational Calculus (TRC), where variables range over tuples. 2) Domain Relational Calculus (DRC), where variables range over individual attribute domain values.",
    explanation: "TRC vs DRC taxonomy.",
    hint: "Tuple Relational Calculus and Domain Relational Calculus.",
    level: "basic"
  },
  {
    question: "What is the symbol for the Selection Operator in Relational Algebra?",
    shortAnswer: "The lowercase Greek letter Sigma ($\\sigma$).",
    explanation: "Standard mathematical notation for horizontal filtering.",
    hint: "Sigma (σ).",
    level: "basic"
  },
  {
    question: "What is the symbol for the Projection Operator in Relational Algebra?",
    shortAnswer: "The lowercase Greek letter Pi ($\\pi$).",
    explanation: "Standard mathematical notation for vertical attribute extraction.",
    hint: "Pi (π).",
    level: "basic"
  },
  {
    question: "What is the symbol for the Natural Join Operator in Relational Algebra?",
    shortAnswer: "The bowtie symbol ($\\bowtie$).",
    explanation: "Standard mathematical symbol for natural and theta joins.",
    hint: "Bowtie symbol (⨝).",
    level: "basic"
  },
  {
    question: "What is the Relational Algebra expression to find all students residing in Barrackpore?",
    shortAnswer: "$$\\sigma_{\\text{city} = 'Barrackpore'}(\\text{Students})$$.",
    explanation: "Selection operator filtering by city attribute.",
    hint: "σ_{city = 'Barrackpore'}(Students).",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city = 'Barrackpore';"
  },
  {
    question: "What is the Relational Algebra expression to retrieve only student names and emails from the `Students` relation?",
    shortAnswer: "$$\\pi_{\\text{full\\_name, email}}(\\text{Students})$$.",
    explanation: "Projection operator extracting specific columns.",
    hint: "π_{full_name, email}(Students).",
    level: "basic",
    codeExample: "SELECT DISTINCT full_name, email FROM students;"
  },
  {
    question: "Is commercial SQL more expressive than basic Relational Algebra?",
    shortAnswer: "Yes, SQL includes extended capabilities beyond basic relational algebra such as aggregate functions (`SUM`, `AVG`), grouping (`GROUP BY`), sorting (`ORDER BY`), recursive CTEs (`WITH RECURSIVE`), and window functions.",
    explanation: "Extended SQL features beyond basic relational completeness.",
    hint: "Yes, SQL adds aggregates, sorting, grouping, and recursion.",
    level: "moderate"
  },
  {
    question: "What is 'Type Compatibility' (Union Compatibility) in Relational Algebra?",
    shortAnswer: "The requirement that two relations have the SAME DEGREE (number of attributes) and that corresponding attributes have identical or compatible DOMAINS.",
    explanation: "Prerequisite for Set Union, Intersection, and Difference.",
    hint: "Same number of attributes and matching attribute domains.",
    level: "basic"
  },
  {
    question: "What does the Division Operator (÷) in Relational Algebra represent in plain English?",
    shortAnswer: "Universal quantification: finding entities that are associated with ALL elements of a given target relation (e.g. students who have completed ALL mandatory modules).",
    explanation: "Relational division semantics.",
    hint: "Universal quantification ('for all' queries).",
    level: "moderate"
  },
  {
    question: "Why does the Projection operator (π) automatically eliminate duplicates in pure Relational Algebra?",
    shortAnswer: "Because relations are defined as mathematical sets, and mathematical sets by definition cannot contain duplicate elements.",
    explanation: "Set theory axiom.",
    hint: "Mathematical sets cannot contain duplicate elements.",
    level: "basic"
  },
  {
    question: "In what year did Dr. E. F. Codd publish the foundational paper introducing the Relational Model?",
    shortAnswer: "1970 (in the ACM paper 'A Relational Model of Data for Large Shared Data Banks').",
    explanation: "Birth of relational database theory.",
    hint: "1970 (ACM Turing Award paper).",
    level: "basic"
  },
  {
    question: "How do you express an Equijoin between `Students` and `Enrollments` on `student_id` in Relational Algebra?",
    shortAnswer: "$$\\text{Students} \\bowtie_{\\text{Students.student\\_id} = \\text{Enrollments.student\\_id}} \\text{Enrollments}$$.",
    explanation: "Theta join with equality predicate.",
    hint: "Students ⨝_{Students.student_id = Enrollments.student_id} Enrollments.",
    level: "basic"
  },
  {
    question: "What is the role of First-Order Predicate Logic in relational database theory?",
    shortAnswer: "It serves as the formal mathematical foundation for Relational Calculus, where queries are formulated as logical predicates with existential (∃) and universal (∀) quantifiers.",
    explanation: "Theoretical underpinning of relational calculus.",
    hint: "Mathematical foundation for Relational Calculus with quantifiers.",
    level: "expert"
  },
  {
    question: "Why is understanding Relational Algebra essential for senior database developers and DBAs?",
    shortAnswer: "Because understanding relational algebra enables developers to interpret EXPLAIN query execution plans, understand query optimizer transformations, and write high-performance SQL queries.",
    explanation: "Practical application to database performance optimization.",
    hint: "Enables reading EXPLAIN plans and understanding query optimizer transformations.",
    level: "moderate"
  },
  {
    question: "What is the recommended checklist for mastering Formal Relational Query Languages?",
    shortAnswer: "1) Understand procedural (Algebra) vs declarative (Calculus) paradigms. 2) Master the 5 fundamental operators (σ, π, ×, ∪, −). 3) Master derived operators (⨝, ∩, ÷). 4) Know Codd's Reduction Theorem. 5) Connect relational algebra trees directly to SQL EXPLAIN execution plans.",
    explanation: "Following these 5 rules establishes deep relational database engineering expertise.",
    hint: "Algebra vs Calculus, 5 fundamental operators, Derived operators, Codd's Theorem, Query trees to SQL EXPLAIN.",
    level: "basic"
  }
];

export default questions;
