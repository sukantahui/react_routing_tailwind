// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is the Projection Operator (π) in Relational Algebra?",
    shortAnswer: "A unary relational algebra operator that performs vertical slicing on a relation, extracting only the specified subset of attributes and discarding all others.",
    explanation: "Core vertical slicing operator in relational algebra.",
    hint: "Unary operator that selects specified attributes from a relation.",
    level: "basic"
  },
  {
    question: "What SQL keyword or clause corresponds to the pure Projection Operator (π)?",
    shortAnswer: "The `SELECT DISTINCT <attribute_list>` clause in SQL.",
    explanation: "Pure projection requires duplicate elimination via DISTINCT.",
    hint: "SELECT DISTINCT in SQL.",
    level: "basic"
  },
  {
    question: "What is the degree (number of columns) of $\\pi_{A_1, A_2, \\dots, A_k}(R)$?",
    shortAnswer: "Exactly $k$, the number of attributes specified in the projection list ($k \\le \\text{Degree}(R)$).",
    explanation: "Degree equals the number of projected attributes.",
    hint: "Exactly k attributes.",
    level: "basic"
  },
  {
    question: "Why does the Projection operator (π) automatically eliminate duplicates in pure Relational Algebra?",
    shortAnswer: "Because a relation is mathematically defined as a SET of tuples, and set theory prohibits duplicate elements.",
    explanation: "Set theory axiom applied to relational modeling.",
    hint: "Relations are mathematical sets that cannot contain duplicates.",
    level: "basic"
  },
  {
    question: "What is the cardinality range of $\\pi_L(R)$ if relation $R$ contains $N$ tuples?",
    shortAnswer: "$$1 \\le |\\pi_L(R)| \\le N$$ (assuming $N \\ge 1$). If $L$ contains a candidate key, $|\\pi_L(R)| = N$; if $L$ excludes all keys, duplicate rows may collapse, reducing cardinality.",
    explanation: "Cardinality bounded between 1 and N.",
    hint: "Between 1 and N tuples depending on candidate keys.",
    level: "moderate"
  },
  {
    question: "What is the Idempotent property of nested Projections when $L_1 \\subseteq L_2$?",
    shortAnswer: "$$\\pi_{L_1}(\\pi_{L_2}(R)) \\equiv \\pi_{L_1}(R)$$.",
    explanation: "Cascaded projections collapse to the innermost subset list.",
    hint: "π_L1(π_L2(R)) ≡ π_L1(R) when L1 is a subset of L2.",
    level: "moderate"
  },
  {
    question: "Why is standard SQL `SELECT city FROM students` NOT identical to $\\pi_{\\text{city}}(\\text{Students})$ by default?",
    shortAnswer: "Because standard SQL uses MULTISET (Bag) semantics and retains duplicate city values, whereas pure Relational Algebra projection eliminates duplicates.",
    explanation: "Set semantics vs multiset bag semantics.",
    hint: "SQL keeps duplicates by default; relational algebra removes duplicates.",
    level: "basic"
  },
  {
    question: "What is 'Projection Push-Down' in query optimization?",
    shortAnswer: "An optimization heuristic that pushes projection operators down query trees to discard unneeded attributes as early as possible, reducing tuple byte-size and RAM usage during joins.",
    explanation: "Heuristic for minimizing memory buffer footprint.",
    hint: "Discarding unneeded columns early to shrink tuple size in RAM.",
    level: "expert"
  },
  {
    question: "What critical mistake must be avoided when pushing projections down through a join: $\\pi_L(R \\bowtie S)$?",
    shortAnswer: "The projected attribute list for each sub-relation MUST include the JOIN KEY columns, otherwise the engine cannot evaluate the join condition!",
    explanation: "Join key retention rule during push-down.",
    hint: "Must retain join key columns during early projection.",
    level: "expert"
  },
  {
    question: "How do you project all unique cities where students reside in Relational Algebra?",
    shortAnswer: "$$\\pi_{\\text{city}}(\\text{Students})$$.",
    explanation: "Single-attribute projection expression.",
    hint: "π_{city}(Students).",
    level: "basic",
    codeExample: "SELECT DISTINCT city FROM students;"
  },
  {
    question: "What is the result of projecting the primary key of a relation: $\\pi_{\\text{PK}}(R)$?",
    shortAnswer: "A relation with cardinality EXACTLY equal to $|R|$, because primary key values are already unique across all tuples.",
    explanation: "No duplicates exist on primary key projection.",
    hint: "Cardinality equals |R| because PK values are unique.",
    level: "basic"
  },
  {
    question: "Can Projection (π) and Selection (σ) commute: $\\pi_L(\\sigma_p(R)) \\equiv \\sigma_p(\\pi_L(R))$?",
    shortAnswer: "ONLY IF the predicate $p$ references ONLY attributes that are present in the projection list $L$. If $p$ uses an attribute NOT in $L$, $\\sigma_p(\\pi_L(R))$ is invalid!",
    explanation: "Commutativity condition between selection and projection.",
    hint: "Only if predicate p references attributes present in projection list L.",
    level: "expert"
  },
  {
    question: "What is Generalized Projection in Extended Relational Algebra?",
    shortAnswer: "An extension to basic projection that allows arithmetic expressions, string transformations, and scalar functions in the projection list (e.g. $\\pi_{\\text{id, salary * 1.10 \\rightarrow new\\_salary}}(R)$).",
    explanation: "Extended relational algebra allowing computed columns.",
    hint: "Allows computed expressions and arithmetic in the projection list.",
    level: "moderate"
  },
  {
    question: "How does a database engine physically implement duplicate elimination for `SELECT DISTINCT`?",
    shortAnswer: "Using either a SORT-BASED algorithm (External Merge Sort + deduplication pass) or a HASH-BASED algorithm (building an in-memory hash table of seen tuples).",
    explanation: "Physical execution mechanics of deduplication.",
    hint: "Sort-based deduplication or Hash-based deduplication.",
    level: "expert"
  },
  {
    question: "What is the cost implication of adding `DISTINCT` to an SQL query?",
    shortAnswer: "It introduces a pipeline-breaking blocking operation that requires sorting or hashing the entire result set, increasing CPU and temporary memory buffer consumption.",
    explanation: "Performance overhead of duplicate removal.",
    hint: "Requires expensive sorting or hashing across all rows.",
    level: "moderate"
  },
  {
    question: "How do you express projecting student names and admission fees in Relational Algebra?",
    shortAnswer: "$$\\pi_{\\text{full\\_name, admission\\_fee}}(\\text{Students})$$.",
    explanation: "Multi-attribute projection.",
    hint: "π_{full_name, admission_fee}(Students).",
    level: "basic"
  },
  {
    question: "Can Projection change the order of attributes compared to the input relation?",
    shortAnswer: "In pure Relational Algebra, attributes are an unordered set identified by name; in implementation, the projection list defines the visual left-to-right column order.",
    explanation: "Attribute ordering semantics.",
    hint: "Pure relational algebra is unordered; implementation respects list order.",
    level: "basic"
  },
  {
    question: "What is the projection $\\pi_{\\text{ALL\\_ATTRIBUTES}}(R)$ equivalent to?",
    shortAnswer: "The original relation $R$ itself (the identity operation on relations).",
    explanation: "Full-attribute identity projection.",
    hint: "The original relation R unchanged.",
    level: "basic"
  },
  {
    question: "Does Projection distribute over Set Union: $\\pi_L(R \\cup S)$?",
    shortAnswer: "Yes: $\\pi_L(R \\cup S) \\equiv \\pi_L(R) \\cup \\pi_L(S)$.",
    explanation: "Distributive law over union.",
    hint: "Yes: π_L(R ∪ S) ≡ π_L(R) ∪ π_L(S).",
    level: "expert"
  },
  {
    question: "Does Projection distribute over Set Intersection: $\\pi_L(R \\cap S)$?",
    shortAnswer: "NO in the general case! In general, $\\pi_L(R \\cap S) \\subseteq \\pi_L(R) \\cap \\pi_L(S)$, but they are not necessarily equal.",
    explanation: "Intersection distribution failure due to projected duplicates.",
    hint: "No, π_L(R ∩ S) is a subset of π_L(R) ∩ π_L(S).",
    level: "expert"
  },
  {
    question: "Does Projection distribute over Set Difference: $\\pi_L(R - S)$?",
    shortAnswer: "NO in the general case! In general, $\\pi_L(R) - \\pi_L(S) \\subseteq \\pi_L(R - S)$, but they are not necessarily equal.",
    explanation: "Set difference distribution failure in projection.",
    hint: "No, projection does not distribute over set difference.",
    level: "expert"
  },
  {
    question: "How does a Covering Index accelerate Projection queries in MySQL?",
    shortAnswer: "If all columns in the projection list are contained within a single secondary B-Tree index, MySQL satisfies the query directly from the index (Index-Only Scan) without reading base table data pages.",
    explanation: "Covering index optimization for projection queries.",
    hint: "Satisfies query directly from index without reading table pages.",
    level: "expert"
  },
  {
    question: "What happens if you project an attribute that does NOT exist in relation $R$?",
    shortAnswer: "The relational algebra expression is mathematically undefined and results in a compilation/semantic error (e.g. MySQL Error 1054: Unknown column).",
    explanation: "Schema validation error on non-existent attribute.",
    hint: "Semantic schema error (Unknown column).",
    level: "basic"
  },
  {
    question: "How do you express projecting distinct course titles for active students from Barrackpore?",
    shortAnswer: "$$\\pi_{\\text{course\\_title}}(\\sigma_{\\text{city} = 'Barrackpore' \\land \\text{status} = 'Active'}(\\text{Students}))$$",
    explanation: "Composition of Selection followed by Projection.",
    hint: "π_{course_title}(σ_{city = 'Barrackpore' ∧ status = 'Active'}(Students)).",
    level: "basic",
    codeExample: "SELECT DISTINCT course_title FROM students WHERE city = 'Barrackpore' AND status = 'Active';"
  },
  {
    question: "Why does the projection list appear FIRST in SQL (`SELECT ...`) but is evaluated LAST conceptually?",
    shortAnswer: "Because conceptually the query must filter rows (`FROM` and `WHERE`), join tables, and group rows before extracting the final requested columns in projection (`SELECT`).",
    explanation: "Logical SQL query processing order vs syntax.",
    hint: "FROM/WHERE filter rows before columns are extracted in projection.",
    level: "moderate"
  },
  {
    question: "What is the Nullary Relation produced by projecting zero attributes $\\pi_\\emptyset(R)$?",
    shortAnswer: "A relation of degree 0 containing either 1 empty tuple (if $|R| > 0$) or 0 tuples (if $|R| = 0$), often called TABLE_DUM and TABLE_DEE in relational theory.",
    explanation: "Theoretical boundary case for zero-attribute projection.",
    hint: "Degree 0 relation containing at most 1 empty tuple.",
    level: "expert"
  },
  {
    question: "How does Projection interact with Aggregate Functions in Extended Relational Algebra?",
    shortAnswer: "Aggregate functions are evaluated using the Grouping operator ($\\mathcal{G}$), after which standard projection ($\\pi$) can select or format the aggregated results.",
    explanation: "Grouping and aggregation pipeline.",
    hint: "Evaluated with grouping operator G, then projected.",
    level: "moderate"
  },
  {
    question: "What is the difference between $\\sigma$ (Selection) and $\\pi$ (Projection) in a nutshell?",
    shortAnswer: "Selection ($\sigma$) slices HORIZONTALLY (filters rows, keeps all columns); Projection ($\pi$) slices VERTICALLY (filters columns, keeps unique rows).",
    explanation: "Horizontal vs vertical relation slicing.",
    hint: "Selection = Horizontal (Rows); Projection = Vertical (Columns).",
    level: "basic"
  },
  {
    question: "What is the impact of projecting only 2 small integer columns from a 50-column wide table in high-concurrency systems?",
    shortAnswer: "It drastically reduces I/O throughput, network payload serialization, and InnoDB buffer pool memory consumption.",
    explanation: "Benefits of precise projection vs SELECT * anti-pattern.",
    hint: "Drastically reduces I/O, network payload, and memory footprint.",
    level: "moderate"
  },
  {
    question: "What is the recommended checklist for mastering the Projection Operator (π)?",
    shortAnswer: "1) Understand that Projection is purely vertical (reduces degree to $k$). 2) Remember that pure relational projection automatically removes duplicate tuples. 3) Use `SELECT DISTINCT` in SQL for set semantics. 4) Push projections down in query trees to reduce tuple byte-width in RAM. 5) Leverage Covering Indexes to fulfill projections directly from B-Trees.",
    explanation: "Following these 5 rules ensures master-level expertise in relational projection.",
    hint: "Vertical slicing, Automatic deduplication, SELECT DISTINCT, Projection push-down, Covering indexes.",
    level: "basic"
  }
];

export default questions;
