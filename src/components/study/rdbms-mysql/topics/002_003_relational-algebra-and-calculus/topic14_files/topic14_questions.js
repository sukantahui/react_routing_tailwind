// topic14_files/topic14_questions.js

const questions = [
  {
    question: "What is a Relational Algebra Query Tree (Expression Tree)?",
    shortAnswer: "A rooted, ordered tree data structure representing a relational algebra expression, where leaf nodes represent stored base relations, internal nodes represent relational operators, and the root represents the final result.",
    explanation: "Core definition of relational query trees.",
    hint: "Tree data structure representing a relational algebra query.",
    level: "basic"
  },
  {
    question: "What do the Leaf Nodes of a Query Tree represent?",
    shortAnswer: "Base relations (physical tables stored on disk, e.g. `Students`, `Courses`).",
    explanation: "Leaf node definition in query trees.",
    hint: "Base tables/relations stored in the database.",
    level: "basic"
  },
  {
    question: "What do the Internal Nodes of a Query Tree represent?",
    shortAnswer: "Relational algebra operators (Unary operators like $\\sigma, \\pi, \\rho$ have 1 child; Binary operators like $\\bowtie, \\times, \\cup, -$ have 2 children).",
    explanation: "Internal node semantics and arity.",
    hint: "Relational operations (Selection, Projection, Join, etc.).",
    level: "basic"
  },
  {
    question: "In what order is a Query Tree evaluated by an RDBMS query engine?",
    shortAnswer: "In a strict BOTTOM-UP order (from leaf table scans up through intermediate operators to the root node).",
    explanation: "Bottom-up evaluation pipeline in execution engines.",
    hint: "Bottom-Up (from leaves up to the root).",
    level: "basic"
  },
  {
    question: "What is a Canonical (Initial) Query Tree?",
    shortAnswer: "The naive, unoptimized tree generated directly by parsing SQL, typically having Cartesian products at the bottom, high-level selections, and a top-level projection.",
    explanation: "Canonical query tree definition.",
    hint: "Unoptimized tree with Cartesian products at the bottom.",
    level: "basic"
  },
  {
    question: "Why are Canonical Query Trees computationally inefficient?",
    shortAnswer: "Because they materialize full Cartesian products ($O(|R| \\times |S|)$) before applying selection filters, causing massive disk I/O and RAM exhaustion.",
    explanation: "Computational bottleneck of unoptimized canonical trees.",
    hint: "Generates massive Cartesian products before filtering rows.",
    level: "basic"
  },
  {
    question: "What is the primary heuristic goal when optimizing a Query Tree?",
    shortAnswer: "To minimize the size of intermediate relations as early as possible by pushing Selections ($\\sigma$) and Projections ($\\pi$) down towards the leaves.",
    explanation: "Core objective of heuristic query optimization.",
    hint: "Push selections and projections down to minimize intermediate rows.",
    level: "basic"
  },
  {
    question: "How is a Cartesian Product followed by a Selection condition transformed in an optimized query tree?",
    shortAnswer: "It is combined into an Equijoin or Theta Join operator node: $$\\sigma_{\\text{R.id = S.id}}(R \\times S) \→ R \\bowtie_{\\text{R.id = S.id}} S$$.",
    explanation: "Join fusion optimization rule.",
    hint: "σ_θ(R × S) becomes R ⨝_θ S.",
    level: "basic"
  },
  {
    question: "What danger occurs if you push Projection (π) down below a Join without retaining the join key?",
    shortAnswer: "The join operator will fail because the required foreign key or primary key attribute has been discarded by the child projection.",
    explanation: "Join key preservation rule during projection pushdown.",
    hint: "The join fails because the join key was discarded too early.",
    level: "moderate"
  },
  {
    question: "How do you construct a Query Tree for: $\\pi_{\\text{name}}(\\sigma_{\\text{city='Kolkata'}}(\\text{Students}))$?",
    shortAnswer: "Leaf node `Students` ➔ Child of Selection `σ_{city='Kolkata'}` ➔ Child of Root Projection `π_{name}`.",
    explanation: "Unary pipeline construction.",
    hint: "Students → σ_{city='Kolkata'} → π_{name}.",
    level: "basic"
  },
  {
    question: "What is a Left-Deep Join Tree?",
    shortAnswer: "A query tree where the right child of every join node is ALWAYS a base relation leaf node, and only the left child can be an intermediate join result.",
    explanation: "Definition of left-deep join trees.",
    hint: "Join tree where the right child of every join is a base table.",
    level: "expert"
  },
  {
    question: "Why do relational database optimizers prefer Left-Deep Join Trees over Bushy Trees?",
    shortAnswer: "Because left-deep trees allow efficient pipelining where intermediate results do not need to be materialized on disk, and they reduce the optimizer search space from $(2n)!$ to $n!$.",
    explanation: "Pipelining and search space benefits of left-deep trees.",
    hint: "Enables pipelining without disk materialization and reduces search space.",
    level: "expert"
  },
  {
    question: "What is a Bushy Join Tree?",
    shortAnswer: "A query tree where both the left and right children of a join node can be intermediate join sub-trees: $(R_1 \\bowtie R_2) \\bowtie (R_3 \\bowtie R_4)$.",
    explanation: "Bushy tree definition.",
    hint: "Tree where both children of a join can be intermediate join results.",
    level: "expert"
  },
  {
    question: "What is a Right-Deep Join Tree?",
    shortAnswer: "A query tree where the left child of every join node is always a base relation, and the right child is an intermediate join sub-tree.",
    explanation: "Right-deep tree definition.",
    hint: "Left child is always a base table; right child is an intermediate join.",
    level: "expert"
  },
  {
    question: "How does the optimizer evaluate the Cost of a Query Tree?",
    shortAnswer: "By calculating the estimated CPU cost, Disk I/O page reads, and network transfer costs across all nodes based on database catalog statistics (cardinalities, histograms).",
    explanation: "Cost-based query evaluation in RDBMS.",
    hint: "Estimates Disk I/O, CPU, and memory costs using catalog statistics.",
    level: "moderate"
  },
  {
    question: "What is the role of the Database Catalog in Query Tree evaluation?",
    shortAnswer: "It provides statistical metadata (table row counts, attribute distinct value counts, index heights, histograms) used to estimate selectivity and intermediate relation sizes.",
    explanation: "Catalog metadata in optimizer cost modeling.",
    hint: "Provides row counts, histograms, and index statistics for cost estimation.",
    level: "moderate"
  },
  {
    question: "How do you represent a 3-table join in a Query Tree: $\\text{Students} \\bowtie \\text{Enrollments} \\bowtie \\text{Courses}$?",
    shortAnswer: "Leaf nodes `Students` and `Enrollments` feed into Join 1; the intermediate result of Join 1 and leaf node `Courses` feed into Join 2 (the Root).",
    explanation: "Multi-table join tree construction.",
    hint: "(Students ⨝ Enrollments) ⨝ Courses.",
    level: "basic"
  },
  {
    question: "What is Pipelining (Pipelined Execution) in a Query Tree?",
    shortAnswer: "An execution model where parent operator nodes consume tuples from child operator nodes one tuple at a time (Iterator / Volcano model) without writing intermediate tables to disk.",
    explanation: "Volcano iterator model in query engines.",
    hint: "Processes tuples one-by-one in memory without writing temp files to disk.",
    level: "expert"
  },
  {
    question: "What is Materialization (Materialized Evaluation) in a Query Tree?",
    shortAnswer: "An execution model where an entire intermediate relation is completely computed and stored in temporary memory or disk before the parent operator starts processing it.",
    explanation: "Materialized query evaluation.",
    hint: "Fully computes and stores intermediate tables before parent processing.",
    level: "moderate"
  },
  {
    question: "Which relational operators are 'Blocking Operators' that prevent pipelining?",
    shortAnswer: "Operators that require reading ALL input tuples before emitting the first output tuple: `ORDER BY` (Sorting), `GROUP BY` (Aggregation), and `UNION DISTINCT` (Deduplication).",
    explanation: "Blocking vs non-blocking operators.",
    hint: "Sorting (ORDER BY), Aggregation (GROUP BY), and Deduplication.",
    level: "expert"
  },
  {
    question: "Can Selection predicates be split into conjuncts in a Query Tree: $\\sigma_{c_1 \\land c_2}(R)$?",
    shortAnswer: "Yes! Cascade of Selection rule: $\\sigma_{c_1 \\land c_2}(R) \\equiv \\sigma_{c_1}(\\sigma_{c_2}(R))$, allowing individual predicates to be pushed down independently.",
    explanation: "Cascade of selection equivalence rule.",
    hint: "Yes, σ_{c1 ∧ c2}(R) ≡ σ_{c1}(σ_{c2}(R)).",
    level: "basic"
  },
  {
    question: "How does pushing down $\\sigma_{\\text{city='Barrackpore'}}$ to `Students` improve a multi-table join with `Enrollments`?",
    shortAnswer: "Instead of joining all 100,000 students, it filters out 95% of rows first, performing the join on only 5,000 Barrackpore students, speeding up the query by 20x.",
    explanation: "Real-world selectivity benefit of selection pushdown.",
    hint: "Filters out 95% of rows before the join, reducing join cost by 20x.",
    level: "basic"
  },
  {
    question: "How is an SQL Subquery represented in a Query Tree?",
    shortAnswer: "As a separate sub-tree whose root node feeds into a Semijoin, Antijoin, or Scalar filter node of the outer query tree.",
    explanation: "Subquery representation in query trees.",
    hint: "Represented as a sub-tree feeding into a semijoin or scalar node.",
    level: "moderate"
  },
  {
    question: "What is a Physical Operator Tree in MySQL (as shown by `EXPLAIN FORMAT=TREE`)?",
    shortAnswer: "The final execution plan tree mapping logical relational operators to concrete physical algorithms (e.g. `Index Scan`, `Hash Join`, `Nested Loop`, `Temporary Table`).",
    explanation: "Physical execution plan tree in MySQL.",
    hint: "Maps logical operators to physical algorithms like Hash Join and Index Scan.",
    level: "moderate",
    codeExample: "EXPLAIN FORMAT=TREE\nSELECT s.full_name, e.course_id\nFROM students s\nJOIN enrollments e ON s.student_id = e.student_id\nWHERE s.city = 'Barrackpore';"
  },
  {
    question: "What is the difference between a Logical Query Tree and a Physical Query Tree?",
    shortAnswer: "A Logical Query Tree specifies WHAT operations to perform ($\sigma, \pi, \bowtie$); a Physical Query Tree specifies HOW to perform them (Index Range Scan, In-Memory Hash Join, Block Nested Loop).",
    explanation: "Logical vs physical query plan distinction.",
    hint: "Logical specifies WHAT operations; Physical specifies HOW (algorithms/indexes).",
    level: "basic"
  },
  {
    question: "How does the Rename operator (ρ) affect a Query Tree?",
    shortAnswer: "It appears as a unary node modifying intermediate relation and attribute identifiers, enabling self-join branches to maintain distinct column namespaces.",
    explanation: "Rename node function in query trees.",
    hint: "Unary node updating attribute names for self-join disambiguation.",
    level: "basic"
  },
  {
    question: "How do you evaluate whether two different Query Trees are semantically equivalent?",
    shortAnswer: "By verifying that for every legal database instance, both query trees produce the exact same set of output tuples.",
    explanation: "Semantic equivalence definition for query trees.",
    hint: "Both trees produce identical output tuples for any valid database state.",
    level: "expert"
  },
  {
    question: "What is the Commutativity of Join in Query Trees: $R \\bowtie S \\equiv S \\bowtie R$?",
    shortAnswer: "It allows the optimizer to swap the left and right children of a join node, placing the smaller relation as the build table in a Hash Join.",
    explanation: "Join commutativity in physical algorithm selection.",
    hint: "Allows optimizer to swap children and pick the smaller table as hash build table.",
    level: "moderate"
  },
  {
    question: "What is the Associativity of Join in Query Trees: $(R \\bowtie S) \\bowtie T \\equiv R \\bowtie (S \\bowtie T)$?",
    shortAnswer: "It allows the optimizer to restructure multi-table join trees into different parent-child hierarchies to find the plan with the lowest total intermediate row counts.",
    explanation: "Join associativity in join tree restructuring.",
    hint: "Allows restructuring the hierarchy of multi-table joins to minimize intermediate rows.",
    level: "moderate"
  },
  {
    question: "What is the master checklist for constructing and evaluating Query Trees?",
    shortAnswer: "1) Map base tables to leaf nodes. 2) Place relational operators as internal nodes with correct arity. 3) Evaluate in strict Bottom-Up order. 4) Push Selections down to leaves immediately after table scans. 5) Push Projections down while preserving necessary join keys. 6) Transform Cartesian products into indexed Equijoins.",
    explanation: "Following these 6 steps guarantees systematic construction and optimization of relational query trees.",
    hint: "Base tables to leaves, Correct arity, Bottom-up evaluation, Push selections, Preserve join keys, Join fusion.",
    level: "basic"
  }
];

export default questions;
