// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is the Semijoin (⋉) operator in Relational Algebra?",
    shortAnswer: "A binary operator that returns all tuples from relation $R$ for which there exists at least one matching tuple in relation $S$ on the join condition: $$R \\ltimes_\\theta S = \\pi_{\\text{Attrs}(R)}(R \\bowtie_\\theta S)$$.",
    explanation: "Core existence testing operator in relational algebra.",
    hint: "R ⋉_θ S = π_{Attrs(R)}(R ⨝_θ S).",
    level: "basic"
  },
  {
    question: "What is the Antijoin (▷ or $\\bar{\\ltimes}$) operator in Relational Algebra?",
    shortAnswer: "A binary operator that returns all tuples from relation $R$ for which NO matching tuple exists in relation $S$: $$R \\triangleright_\\theta S = R - (R \\ltimes_\\theta S)$$.",
    explanation: "Core non-existence testing operator in relational algebra.",
    hint: "R ▷_θ S = R - (R ⋉_θ S).",
    level: "basic"
  },
  {
    question: "What is the degree (number of columns) of $R \\ltimes S$ compared to $R$?",
    shortAnswer: "$$\\text{Degree}(R \\ltimes S) = \\text{Degree}(R)$$. Attributes from relation $S$ are completely discarded.",
    explanation: "Degree preservation in semijoin.",
    hint: "Degree equals Degree(R).",
    level: "basic"
  },
  {
    question: "What is the degree of $R \\triangleright S$ compared to $R$?",
    shortAnswer: "$$\\text{Degree}(R \\triangleright S) = \\text{Degree}(R)$$.",
    explanation: "Degree preservation in antijoin.",
    hint: "Degree equals Degree(R).",
    level: "basic"
  },
  {
    question: "Why does a Semijoin NEVER produce duplicate output rows from relation $R$ when a row in $R$ matches multiple rows in $S$?",
    shortAnswer: "Because Semijoin is an EXISTENCE filter; as soon as the first matching tuple in $S$ is found, tuple $t_R$ is emitted once and the search stops.",
    explanation: "Deduplication and early termination property of semijoin.",
    hint: "Tests existence only; emits row once and stops searching.",
    level: "basic"
  },
  {
    question: "How does using `INNER JOIN` instead of `SEMIJOIN` cause subtle bugs in SQL application logic?",
    shortAnswer: "If a student has 4 course enrollments, an `INNER JOIN` multiplies the student record 4 times; a Semijoin (`WHERE EXISTS`) returns the student record exactly once.",
    explanation: "Row duplication pitfall in existence checks.",
    hint: "INNER JOIN duplicates rows; Semijoin keeps exactly 1 row per entity.",
    level: "basic"
  },
  {
    question: "What is the Partition Theorem for Semijoin and Antijoin?",
    shortAnswer: "$$(R \\ltimes S) \\cup (R \\triangleright S) \\equiv R$$ and $$(R \\ltimes S) \\cap (R \\triangleright S) \\equiv \\emptyset$$. Together they form a complete disjoint partition of relation $R$.",
    explanation: "Mathematical partition theorem in relational set theory.",
    hint: "(R ⋉ S) ∪ (R ▷ S) ≡ R and (R ⋉ S) ∩ (R ▷ S) ≡ ∅.",
    level: "expert"
  },
  {
    question: "What SQL syntax directly implements a Semijoin?",
    shortAnswer: "`SELECT * FROM R WHERE EXISTS (SELECT 1 FROM S WHERE R.id = S.id)` or `SELECT * FROM R WHERE id IN (SELECT id FROM S)`.",
    explanation: "SQL EXISTS and IN subquery semantics.",
    hint: "WHERE EXISTS (SELECT 1 FROM S ...).",
    level: "basic",
    codeExample: "SELECT * FROM students s\nWHERE EXISTS (\n    SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id\n);"
  },
  {
    question: "What are the three SQL syntaxes that implement an Antijoin?",
    shortAnswer: "1) `WHERE NOT EXISTS (...)`, 2) `LEFT JOIN ... WHERE S.key IS NULL` (Left Anti-Join), and 3) `WHERE id NOT IN (SELECT id FROM S WHERE id IS NOT NULL)`.",
    explanation: "Three standard SQL implementations of antijoin.",
    hint: "NOT EXISTS, LEFT JOIN ... IS NULL, and NOT IN.",
    level: "moderate",
    codeExample: "SELECT s.* FROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id\nWHERE e.student_id IS NULL;"
  },
  {
    question: "What is the disastrous 'NOT IN NULL Trap' in SQL Antijoins?",
    shortAnswer: "If the subquery returns even ONE `NULL` value, `WHERE x NOT IN (...)` evaluates to `UNKNOWN` for all rows, causing the query to return ZERO rows unexpectedly!",
    explanation: "Three-valued logic NULL trap in NOT IN.",
    hint: "A single NULL in subquery makes NOT IN evaluate to UNKNOWN and return 0 rows.",
    level: "expert"
  },
  {
    question: "Why does `WHERE NOT EXISTS` NOT suffer from the 'NOT IN NULL Trap'?",
    shortAnswer: "Because `EXISTS` tests for the presence of ANY returned row matching the correlated predicate, evaluating strictly to `TRUE` or `FALSE` without three-valued logic contamination.",
    explanation: "Boolean evaluation safety of EXISTS vs three-valued logic of IN.",
    hint: "Evaluates strictly to TRUE or FALSE regardless of NULL values.",
    level: "expert"
  },
  {
    question: "Is the Semijoin operator commutative: $R \\ltimes S \\equiv S \\ltimes R$?",
    shortAnswer: "NO! Semijoin is NON-COMMUTATIVE. $R \\ltimes S$ returns tuples from $R$; $S \\ltimes R$ returns tuples from $S$.",
    explanation: "Non-commutative property of semijoin.",
    hint: "No! Operands determine the output relation schema.",
    level: "basic"
  },
  {
    question: "Is the Antijoin operator commutative: $R \\triangleright S \\equiv S \\triangleright R$?",
    shortAnswer: "NO! Antijoin is NON-COMMUTATIVE. $R \\triangleright S$ returns non-matching rows of $R$; $S \\triangleright R$ returns non-matching rows of $S$.",
    explanation: "Non-commutative property of antijoin.",
    hint: "No! Non-matching rows from different relations.",
    level: "basic"
  },
  {
    question: "What is the cardinality range of $R \\ltimes S$ if $|R| = m$ and $|S| = n$?",
    shortAnswer: "$$0 \\le |R \\ltimes S| \\le m$$ (strictly bounded by the cardinality of $R$).",
    explanation: "Cardinality bounds of semijoin.",
    hint: "Between 0 and |R|.",
    level: "basic"
  },
  {
    question: "What is the cardinality range of $R \\triangleright S$ if $|R| = m$?",
    shortAnswer: "$$0 \\le |R \\triangleright S| \\le m$$.",
    explanation: "Cardinality bounds of antijoin.",
    hint: "Between 0 and |R|.",
    level: "basic"
  },
  {
    question: "What is the result of $R \\ltimes \\emptyset$ (Semijoin with empty relation)?",
    shortAnswer: "$$\\emptyset$$ (empty set, because no matching tuples exist).",
    explanation: "Empty set result.",
    hint: "Empty relation ∅.",
    level: "basic"
  },
  {
    question: "What is the result of $R \\triangleright \\emptyset$ (Antijoin with empty relation)?",
    shortAnswer: "$$R$$ (all tuples in $R$ have zero matches, so all tuples are retained).",
    explanation: "Identity property of empty set under antijoin.",
    hint: "Relation R (all tuples retained).",
    level: "basic"
  },
  {
    question: "What is the result of $R \\ltimes R$ (Semijoin with itself)?",
    shortAnswer: "$$R$$ (every tuple matches itself).",
    explanation: "Idempotent property of self-semijoin.",
    hint: "Relation R.",
    level: "basic"
  },
  {
    question: "What is the result of $R \\triangleright R$ (Antijoin with itself)?",
    shortAnswer: "$$\\emptyset$$ (no tuple has zero matches with itself).",
    explanation: "Self-antijoin yields empty set.",
    hint: "Empty relation ∅.",
    level: "basic"
  },
  {
    question: "How does the Semijoin operator dramatically optimize Distributed Database queries?",
    shortAnswer: "Instead of transferring an entire 10-million-row remote table $S$ across the network, the local node sends $\\pi_{\\text{key}}(R)$ to compute $S \\ltimes \\pi_{\\text{key}}(R)$ remotely, returning only matching rows across the network.",
    explanation: "Distributed query optimization using semijoins.",
    hint: "Transfers only matching keys across the network, reducing bandwidth by 99%.",
    level: "expert"
  },
  {
    question: "How does MySQL 8.0 optimize `IN (subquery)` queries using Semijoins?",
    shortAnswer: "The MySQL optimizer converts `IN` subqueries into internal Semijoin execution strategies: 1) FirstMatch, 2) LooseScan, 3) Materialization, or 4) DuplicateWeedout.",
    explanation: "MySQL query optimizer semijoin transformations.",
    hint: "Uses FirstMatch, LooseScan, Materialization, or DuplicateWeedout.",
    level: "expert"
  },
  {
    question: "What is the FirstMatch optimization strategy in MySQL Semijoin execution?",
    shortAnswer: "As soon as the query engine finds the first matching row in table $S$ for a given row in $R$, it immediately stops scanning $S$ and emits the row of $R$.",
    explanation: "FirstMatch early exit optimization.",
    hint: "Stops scanning as soon as the first match is found.",
    level: "moderate"
  },
  {
    question: "How do you find all students in Barrackpore who have NEVER enrolled in any course using Relational Algebra?",
    shortAnswer: "$$\\sigma_{\\text{city} = \\text{'Barrackpore'}}(\\text{Students}) \\triangleright \\text{Enrollments}$$.",
    explanation: "Antijoin expression for unenrolled students.",
    hint: "σ_{city = 'Barrackpore'}(Students) ▷ Enrollments.",
    level: "basic",
    codeExample: "SELECT s.* FROM students s\nWHERE s.city = 'Barrackpore'\nAND NOT EXISTS (\n    SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id\n);"
  },
  {
    question: "How do you find all courses that have AT LEAST ONE enrolled student?",
    shortAnswer: "$$\\text{Courses} \\ltimes_{\\text{Courses.course\\_id} = \\text{Enrollments.course\\_id}} \\text{Enrollments}$$.",
    explanation: "Semijoin expression for active courses.",
    hint: "Courses ⋉ Enrollments.",
    level: "basic"
  },
  {
    question: "How do you find all courses with ZERO enrollments (orphaned courses)?",
    shortAnswer: "$$\\text{Courses} \\triangleright_{\\text{Courses.course\\_id} = \\text{Enrollments.course\\_id}} \\text{Enrollments}$$.",
    explanation: "Antijoin expression for empty courses.",
    hint: "Courses ▷ Enrollments.",
    level: "basic"
  },
  {
    question: "What is a Right Semijoin ($R \\rtimes S$)?",
    shortAnswer: "The mirror of Semijoin, returning tuples from relation $S$ that have at least one match in relation $R$: $$R \\rtimes S = S \\ltimes R = \\pi_{\\text{Attrs}(S)}(R \\bowtie S)$$.",
    explanation: "Right semijoin definition.",
    hint: "S ⋉ R (returns matching rows of S).",
    level: "moderate"
  },
  {
    question: "What is a Right Antijoin ($R \\triangleleft S$)?",
    shortAnswer: "The mirror of Antijoin, returning tuples from relation $S$ that have NO match in relation $R$: $$R \\triangleleft S = S \\triangleright R$$.",
    explanation: "Right antijoin definition.",
    hint: "S ▷ R (returns non-matching rows of S).",
    level: "moderate"
  },
  {
    question: "Can an Antijoin be expressed as a Set Difference involving a Semijoin?",
    shortAnswer: "Yes! $$R \\triangleright S \\equiv R - (R \\ltimes S)$$.",
    explanation: "Formal derivation of antijoin from set difference and semijoin.",
    hint: "R - (R ⋉ S).",
    level: "basic"
  },
  {
    question: "In database normalization audits, why are Antijoins used to detect referential integrity violations?",
    shortAnswer: "By performing $\\text{Child} \\triangleright \\text{Parent}$, the query returns all orphaned foreign key records that have no corresponding primary key in the parent table.",
    explanation: "Integrity check pattern using antijoin.",
    hint: "Child ▷ Parent finds orphaned foreign key records.",
    level: "moderate",
    codeExample: "SELECT e.* FROM enrollments e\nLEFT JOIN students s ON e.student_id = s.student_id\nWHERE s.student_id IS NULL;"
  },
  {
    question: "What is the master checklist for mastering Semijoin (⋉) and Antijoin (▷)?",
    shortAnswer: "1) Use Semijoin ($R \\ltimes S$) for existence testing without row multiplication. 2) Use Antijoin ($R \\triangleright S$) for non-existence / orphan checking. 3) Output degree strictly equals $\\text{Degree}(R)$. 4) Partition theorem: $(R \\ltimes S) \\cup (R \\triangleright S) \\equiv R$. 5) In SQL, prefer `WHERE NOT EXISTS` or Left Anti-Joins to avoid the `NOT IN` NULL trap.",
    explanation: "Following these 5 rules ensures safe existence and non-existence query composition.",
    hint: "Existence testing, Non-existence testing, Degree(R) preservation, Partition theorem, NOT IN NULL avoidance.",
    level: "basic"
  }
];

export default questions;
