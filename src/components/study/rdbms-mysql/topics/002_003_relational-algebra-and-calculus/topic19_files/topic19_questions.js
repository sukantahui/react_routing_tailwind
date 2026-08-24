// topic19_files/topic19_questions.js

const questions = [
  {
    question: "What are the 5 fundamental (primitive) operators of Relational Algebra from which all other operators can be derived?",
    shortAnswer: "1) Selection ($\\sigma$), 2) Projection ($\\pi$), 3) Rename ($\\rho$), 4) Set Union ($\\cup$), and 5) Set Difference ($-$). (Along with Cartesian Product $\\times$).",
    explanation: "Fundamental primitive operator set in relational algebra.",
    hint: "Selection, Projection, Rename, Union, and Set Difference.",
    level: "basic"
  },
  {
    question: "How is Theta Join ($R \\bowtie_\\theta S$) derived using primitive operators?",
    shortAnswer: "$$R \\bowtie_\\theta S = \\sigma_\\theta(R \\times S)$$.",
    explanation: "Derivation of Theta Join from Selection and Cartesian Product.",
    hint: "σ_θ(R × S).",
    level: "basic"
  },
  {
    question: "How is Set Intersection ($R \\cap S$) derived using primitive operators?",
    shortAnswer: "$$R \\cap S = R - (R - S)$$.",
    explanation: "Derivation of Set Intersection from Set Difference.",
    hint: "R - (R - S).",
    level: "basic"
  },
  {
    question: "How is Relational Division ($R \\div S$) derived using primitive operators?",
    shortAnswer: "$$R(X, Y) \\div S(Y) = \\pi_X(R) - \\pi_X((\\pi_X(R) \\times S) - R)$$.",
    explanation: "Codd's primitive derivation formula for relational division.",
    hint: "π_X(R) - π_X((π_X(R) × S) - R).",
    level: "expert"
  },
  {
    question: "How is a Left Outer Join ($R \\mathbin{\\unicode{x27D5}} S$) derived using primitive and join operators?",
    shortAnswer: "$$R \\mathbin{\\unicode{x27D5}} S = (R \\bowtie S) \\cup ((R - \\pi_{\\text{Attrs}(R)}(R \\bowtie S)) \\times \\text{NULL}_S)$$.",
    explanation: "Derivation of Left Outer Join.",
    hint: "(R ⨝ S) ∪ ((R - π_R(R ⨝ S)) × NULL_S).",
    level: "expert"
  },
  {
    question: "How do you express: 'Find students enrolled in at least one course with fee > ₹5000' in Relational Algebra?",
    shortAnswer: "$$\\pi_{\\text{student\\_id, full\\_name}}(\\text{Students} \\bowtie \\text{Enrollments} \\bowtie \\sigma_{\\text{fee} > 5000}(\\text{Courses}))$$.",
    explanation: "Multi-table join with selection pushdown.",
    hint: "π_{id, name}(Students ⨝ Enrollments ⨝ σ_{fee > 5000}(Courses)).",
    level: "basic"
  },
  {
    question: "How do you express: 'Find students who have NEVER enrolled in any course' in Relational Algebra?",
    shortAnswer: "$$\\text{Students} \\triangleright \\text{Enrollments} \\equiv \\text{Students} - (\\text{Students} \\ltimes \\text{Enrollments})$$.",
    explanation: "Antijoin formulation for un-enrolled students.",
    hint: "Students ▷ Enrollments.",
    level: "basic"
  },
  {
    question: "What is the equivalent SQL query for the Left Antijoin above?",
    shortAnswer: "`SELECT s.* FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id WHERE e.student_id IS NULL;`.",
    explanation: "Left Anti-Join in SQL.",
    hint: "LEFT JOIN ... WHERE right_table.pk IS NULL.",
    level: "basic",
    codeExample: "SELECT s.student_id, s.full_name\nFROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id\nWHERE e.student_id IS NULL;"
  },
  {
    question: "How do you calculate city-wise average student admission fee for cities with >= 2 students?",
    shortAnswer: "$$\\sigma_{\\text{cnt} \\ge 2}({}_{\\text{city}} \\mathcal{G}_{\\text{COUNT}(*) \\rightarrow \\text{cnt}, \\text{AVG(admission\\_fee)} \\rightarrow \\text{avg\\_fee}}(\\text{Students}))$$.",
    explanation: "Grouping and aggregate selection.",
    hint: "σ_{cnt >= 2}(_{city} 𝒢_{COUNT(*)->cnt, AVG(fee)->avg}(Students)).",
    level: "basic",
    codeExample: "SELECT city, COUNT(*) AS student_count, AVG(admission_fee) AS avg_fee\nFROM students\nGROUP BY city\nHAVING COUNT(*) >= 2;"
  },
  {
    question: "How do you find students who took ALL core courses using SQL?",
    shortAnswer: "`SELECT s.student_id, s.full_name FROM enrollments e JOIN students s ON e.student_id = s.student_id WHERE e.course_id IN (SELECT course_id FROM core_courses) GROUP BY s.student_id, s.full_name HAVING COUNT(DISTINCT e.course_id) = (SELECT COUNT(*) FROM core_courses);`.",
    explanation: "Relational division SQL pattern.",
    hint: "GROUP BY student_id HAVING COUNT(DISTINCT course_id) = (SELECT COUNT(*) FROM core_courses).",
    level: "moderate"
  },
  {
    question: "What is the purpose of the Rename operator (ρ) when performing Self-Joins?",
    shortAnswer: "To prevent column namespace collisions by giving the second copy of the table and its attributes unique aliases (e.g. `e1.salary > e2.salary`).",
    explanation: "Self-join disambiguation via rename operator.",
    hint: "Gives the second table instance a unique alias to prevent column collisions.",
    level: "basic"
  },
  {
    question: "What are the rules of Union Compatibility (Type Compatibility)?",
    shortAnswer: "1) Relations $R$ and $S$ must have the EXACT SAME degree ($n = m$). 2) The domain of attribute $R.A_i$ must match the domain of $S.B_i$ for all $1 \\le i \\le n$.",
    explanation: "The 2 strict rules for union compatibility.",
    hint: "Same degree (number of columns) and matching pairwise data types.",
    level: "basic"
  },
  {
    question: "Why does `AVG()` in SQL ignore NULL values while manual `SUM() / COUNT(*)` includes them in the denominator?",
    shortAnswer: "Because `AVG(col)` computes `SUM(col) / COUNT(col)` (dividing only by non-NULL rows), whereas `COUNT(*)` counts total rows including NULLs.",
    explanation: "NULL handling in average calculations.",
    hint: "AVG divides by non-NULL count; COUNT(*) includes NULL rows in denominator.",
    level: "moderate"
  },
  {
    question: "How do you emulate a Full Outer Join in MySQL?",
    shortAnswer: "By taking the `UNION` of a `LEFT JOIN` and a `RIGHT JOIN`: `(SELECT * FROM A LEFT JOIN B ON ...) UNION (SELECT * FROM A RIGHT JOIN B ON ...);`.",
    explanation: "Full Outer Join emulation in MySQL.",
    hint: "LEFT JOIN ... UNION ... RIGHT JOIN.",
    level: "basic"
  },
  {
    question: "What is the Cascade of Selection optimization rule?",
    shortAnswer: "$$\\sigma_{c_1 \\land c_2 \\land \\dots \\land c_n}(R) \\equiv \\sigma_{c_1}(\\sigma_{c_2}(\\dots(\\sigma_{c_n}(R))))$$, allowing predicates to be split and pushed down independently.",
    explanation: "Cascade of selection equivalence rule.",
    hint: "σ_{c1 ∧ c2}(R) ≡ σ_{c1}(σ_{c2}(R)).",
    level: "basic"
  },
  {
    question: "Why must join keys be preserved when pushing Projection (π) operators down a Query Tree?",
    shortAnswer: "Because if foreign key or primary key columns are projected away before reaching an ancestor join node, the join condition cannot be evaluated.",
    explanation: "Join key preservation in projection pushdowns.",
    hint: "Otherwise the join fails because its required key was discarded.",
    level: "basic"
  },
  {
    question: "What is the difference between Tuple Relational Calculus (TRC) and Domain Relational Calculus (DRC)?",
    shortAnswer: "TRC uses tuple variables ranging over entire rows ($t \\in R$); DRC uses domain variables ranging over individual attribute values ($\\langle x_1, x_2 \\rangle \\in R$).",
    explanation: "TRC vs DRC variable range comparison.",
    hint: "TRC: whole rows ({ t | P(t) }); DRC: column values ({ <x, y> | P(x, y) }).",
    level: "basic"
  },
  {
    question: "What is Codd's Reduction Theorem?",
    shortAnswer: "The mathematical theorem proving that Relational Algebra, Safe TRC, and Safe DRC all possess identical expressive power ($RA \\equiv TRC_{safe} \\equiv DRC_{safe}$).",
    explanation: "Codd's Equivalence Theorem definition.",
    hint: "Proves RA, Safe TRC, and Safe DRC have identical expressive power.",
    level: "basic"
  },
  {
    question: "What makes a Relational Calculus expression mathematically 'Safe'?",
    shortAnswer: "An expression is Safe if all output values and evaluated variables are strictly bounded to the active finite database domain $\\text{DOM}(P)$, preventing infinite outputs.",
    explanation: "Calculus safety criterion.",
    hint: "All variables are strictly bounded within the finite domain DOM(P).",
    level: "moderate"
  },
  {
    question: "How is Quantifier Duality (De Morgan's Law) applied to universal queries: $\\forall u P(u)$?",
    shortAnswer: "$$\\forall u P(u) \\equiv \\neg \\exists u \\neg P(u)$$, transforming universal requirements into SQL double `NOT EXISTS` queries.",
    explanation: "Quantifier duality for SQL NOT EXISTS mapping.",
    hint: "∀u P(u) ≡ ¬∃u ¬P(u).",
    level: "moderate"
  },
  {
    question: "What is the degree of Generalized Projection $\\pi_{\\text{name, fee} \\times 1.18, \\text{fee} \\times 0.9}(R)$?",
    shortAnswer: "3 (one column for `name`, one for `fee * 1.18`, and one for `fee * 0.9`).",
    explanation: "Degree of generalized projection.",
    hint: "3 columns.",
    level: "basic"
  },
  {
    question: "What happens if a Cartesian Product $R \\times S$ is evaluated where $|R| = 10,000$ and $|S| = 5,000$?",
    shortAnswer: "It generates $10,000 \\times 5,000 = 50,000,000$ intermediate tuples in memory/disk.",
    explanation: "Cartesian product combinatorial explosion.",
    hint: "50,000,000 intermediate rows.",
    level: "basic"
  },
  {
    question: "How does Heuristic Query Optimization prevent the 50-million-row explosion above?",
    shortAnswer: "By pushing selection filters down to $R$ and $S$ before joining, and fusing the Cartesian product and Selection into an indexed Equijoin ($R \\bowtie_\\theta S$).",
    explanation: "Heuristic optimization pushdown and join fusion.",
    hint: "Pushes selections down to filter rows first and fuses cross products into equijoins.",
    level: "basic"
  },
  {
    question: "Can an aggregate function like `AVG()` be used directly in an SQL `WHERE` clause?",
    shortAnswer: "NO! Aggregate functions cannot appear in `WHERE`; they must be evaluated in `HAVING` or inside a subquery / CTE.",
    explanation: "SQL execution phase restriction on aggregates.",
    hint: "No! Aggregates belong in HAVING or subqueries.",
    level: "basic"
  },
  {
    question: "What is the difference between `UNION` and `UNION ALL` in SQL?",
    shortAnswer: "`UNION` performs mathematical set union by sorting and removing duplicate rows; `UNION ALL` preserves all duplicate rows without deduplication.",
    explanation: "UNION vs UNION ALL deduplication behavior.",
    hint: "UNION deduplicates (Set semantics); UNION ALL keeps duplicates (Multiset).",
    level: "basic"
  },
  {
    question: "How is an Antijoin (▷) expressed using Set Difference?",
    shortAnswer: "$$R \\triangleright S = R - (R \\ltimes S)$$.",
    explanation: "Antijoin set difference formulation.",
    hint: "R - (R ⋉ S).",
    level: "moderate"
  },
  {
    question: "What is Query-By-Example (QBE)?",
    shortAnswer: "A 2D visual query interface invented at IBM based on Domain Relational Calculus, where users query databases by filling example elements into graphical table skeletons.",
    explanation: "Query-By-Example visual language definition.",
    hint: "2D visual relational language based on DRC.",
    level: "basic"
  },
  {
    question: "What is the maximum cardinality of Natural Join $R \\bowtie S$?",
    shortAnswer: "$$|R| \\times |S|$$ (when all values in the common attributes are identical across all tuples).",
    explanation: "Upper bound of natural join cardinality.",
    hint: "|R| * |S|.",
    level: "moderate"
  },
  {
    question: "What is the minimum cardinality of Natural Join $R \\bowtie S$?",
    shortAnswer: "0 (when there are zero matching values in the common attributes).",
    explanation: "Lower bound of natural join cardinality.",
    hint: "0 rows.",
    level: "basic"
  },
  {
    question: "What is the ultimate master checklist for Relational Algebra & Calculus Mastery (Module 002_003)?",
    shortAnswer: "1) Master primitive operators ($\\sigma, \\pi, \\rho, \\cup, -$). 2) Master derivative operators ($\\bowtie, \\times, \\cap, \\div, \\ltimes, \\triangleright, \\mathbin{\\unicode{x27D5}}, \\mathbin{\\unicode{x27D6}}, \\mathbin{\\unicode{x27D7}}$). 3) Master extended operators ($\\pi_F, {}_G \\mathcal{G}_F$). 4) Master query trees & pushdown equivalence rules. 5) Master TRC, DRC, and Codd's Reduction Theorem ($RA \\equiv TRC \\equiv DRC$).",
    explanation: "Final master synthesis of Module 002_003.",
    hint: "Primitives, Derivatives, Extended Operators, Query Trees, Heuristic Pushdowns, TRC/DRC/Codd.",
    level: "basic"
  }
];

export default questions;
