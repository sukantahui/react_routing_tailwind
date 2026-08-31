// topic15_files/topic15_questions.js

const questions = [
  {
    question: "What are Relational Algebra Equivalence Rules?",
    shortAnswer: "Mathematical transformation rules stating that two relational algebra expressions $E_1$ and $E_2$ produce identical result sets for all valid database states ($E_1 \\equiv E_2$).",
    explanation: "Core definition of relational equivalence rules.",
    hint: "Transformation rules where expressions produce identical results for all database instances.",
    level: "basic"
  },
  {
    question: "What is the 'Cascade of Selection' (Splitting Conjuncts) equivalence rule?",
    shortAnswer: "$$\\sigma_{c_1 \\land c_2 \\land \\dots \\land c_n}(R) \\equiv \\sigma_{c_1}(\\sigma_{c_2}(\\dots (\\sigma_{c_n}(R))\\dots))$$.",
    explanation: "Cascade of selection definition.",
    hint: "σ_{c1 ∧ c2}(R) ≡ σ_{c1}(σ_{c2}(R)).",
    level: "basic"
  },
  {
    question: "Why is the Cascade of Selection rule essential for heuristic query optimization?",
    shortAnswer: "Because it breaks a complex compound predicate into individual atomic filters, allowing each sub-filter to be pushed down independently to its respective base relation.",
    explanation: "Enables independent sub-filter pushdown.",
    hint: "Allows individual atomic filters to be pushed down independently.",
    level: "basic"
  },
  {
    question: "What is the 'Cascade of Projection' equivalence rule?",
    shortAnswer: "$$\\pi_{L_1}(\\pi_{L_2}(\\dots(\\pi_{L_n}(R))\\dots)) \\equiv \\pi_{L_1}(R)$$, provided that $L_1 \\subseteq L_2 \\subseteq \\dots \\subseteq L_n$.",
    explanation: "Cascade of projection subsumption rule.",
    hint: "π_L1(π_L2(R)) ≡ π_L1(R) when L1 ⊆ L2.",
    level: "basic"
  },
  {
    question: "How is a Selection pushed down through a Join: $\\sigma_{c_R}(R \\bowtie S)$ where $c_R$ references only attributes of $R$?",
    shortAnswer: "$$\\sigma_{c_R}(R \\bowtie S) \\equiv (\\sigma_{c_R}(R)) \\bowtie S$$.",
    explanation: "Selection pushdown over join rule.",
    hint: "(σ_{c_R}(R)) ⨝ S.",
    level: "basic"
  },
  {
    question: "How is a conjunctive Selection $\\sigma_{c_R \\land c_S}(R \\bowtie S)$ pushed down across both relations?",
    shortAnswer: "$$\\sigma_{c_R \\land c_S}(R \\bowtie S) \\equiv (\\sigma_{c_R}(R)) \\bowtie (\\sigma_{c_S}(S))$$.",
    explanation: "Dual-sided selection pushdown over join.",
    hint: "(σ_{c_R}(R)) ⨝ (σ_{c_S}(S)).",
    level: "basic"
  },
  {
    question: "Can a Selection predicate containing an `OR` condition across two relations: $\\sigma_{c_R \\lor c_S}(R \\bowtie S)$ be pushed down directly?",
    shortAnswer: "NO! A tuple from $R$ matching $c_R$ requires all tuples of $S$ to evaluate the join, so pushing an `OR` condition across branches is not algebraically valid without converting to a Union.",
    explanation: "Non-pushdown of cross-relation OR disjunctions.",
    hint: "No, disjunctive OR filters across multiple relations cannot be pushed down directly.",
    level: "expert"
  },
  {
    question: "How do you push a Projection $\\pi_L(R \\bowtie_J S)$ down through a Join?",
    shortAnswer: "$$\\pi_L(R \\bowtie_J S) \\equiv \\pi_L(\\pi_{L_1 \\cup J}(R) \\bowtie_J \\pi_{L_2 \\cup J}(S))$$, where $L_1$ are $L$'s attributes in $R$, $L_2$ are $L$'s attributes in $S$, and $J$ are the join key attributes.",
    explanation: "Projection pushdown rule retaining join keys.",
    hint: "π_L(π_{L1 ∪ J}(R) ⨝_J π_{L2 ∪ J}(S)).",
    level: "expert"
  },
  {
    question: "Is Selection commutative with Set Union: $\\sigma_c(R \\cup S)$?",
    shortAnswer: "Yes! $$\\sigma_c(R \\cup S) \\equiv \\sigma_c(R) \\cup \\sigma_c(S)$$.",
    explanation: "Distributivity of selection over union.",
    hint: "σ_c(R) ∪ σ_c(S).",
    level: "basic"
  },
  {
    question: "Is Selection commutative with Set Intersection: $\\sigma_c(R \\cap S)$?",
    shortAnswer: "Yes! $$\\sigma_c(R \\cap S) \\equiv \\sigma_c(R) \\cap \\sigma_c(S) \\equiv \\sigma_c(R) \\cap S \\equiv R \\cap \\sigma_c(S)$$.",
    explanation: "Distributivity of selection over intersection.",
    hint: "σ_c(R) ∩ σ_c(S).",
    level: "basic"
  },
  {
    question: "Is Selection commutative with Set Difference: $\\sigma_c(R - S)$?",
    shortAnswer: "Yes! $$\\sigma_c(R - S) \\equiv \\sigma_c(R) - \\sigma_c(S) \\equiv \\sigma_c(R) - S$$.",
    explanation: "Distributivity of selection over set difference.",
    hint: "σ_c(R) - S.",
    level: "moderate"
  },
  {
    question: "Is Projection commutative with Set Union: $\\pi_L(R \\cup S)$?",
    shortAnswer: "Yes! $$\\pi_L(R \\cup S) \\equiv \\pi_L(R) \\cup \\pi_L(S)$$.",
    explanation: "Distributivity of projection over union.",
    hint: "π_L(R) ∪ π_L(S).",
    level: "basic"
  },
  {
    question: "Is Projection commutative with Set Difference: $\\pi_L(R - S) \\equiv \\pi_L(R) - \\pi_L(S)$?",
    shortAnswer: "NO! In general, $$\\pi_L(R - S) \\neq \\pi_L(R) - \\pi_L(S)$$. For example, if $R = \\{(1, a), (1, b)\\}$ and $S = \\{(1, a)\\}$, $R - S = \\{(1, b)\\}$, $\\pi_1(R - S) = \\{1\\}$, but $\\pi_1(R) - \\pi_1(S) = \\{1\\} - \\{1\\} = \\emptyset$!",
    explanation: "Non-distributivity of projection over set difference.",
    hint: "No! Projection does not distribute over set difference.",
    level: "expert"
  },
  {
    question: "What is Join Commutativity: $R \\bowtie S \\equiv S \\bowtie R$?",
    shortAnswer: "The rule stating that swapping the operands of a join produces an identical set of tuples, allowing optimizers to choose the smaller relation as the hash build table.",
    explanation: "Join commutativity property.",
    hint: "R ⨝ S ≡ S ⨝ R.",
    level: "basic"
  },
  {
    question: "What is Join Associativity: $(R \\bowtie S) \\bowtie T \\equiv R \\bowtie (S \\bowtie T)$?",
    shortAnswer: "The rule stating that join grouping order does not alter the output, enabling optimizers to evaluate different join tree shapes to minimize intermediate row counts.",
    explanation: "Join associativity property.",
    hint: "(R ⨝ S) ⨝ T ≡ R ⨝ (S ⨝ T).",
    level: "basic"
  },
  {
    question: "What is the Heuristic Query Optimization Algorithm's Step 1?",
    shortAnswer: "Deconstruct conjunctive Selection predicates into a cascade of atomic selections: $\\sigma_{c_1 \\land c_2}(R) \→ \\sigma_{c_1}(\\sigma_{c_2}(R))$.",
    explanation: "Step 1 of heuristic optimization.",
    hint: "Cascade selections into individual atomic filters.",
    level: "basic"
  },
  {
    question: "What is the Heuristic Query Optimization Algorithm's Step 2?",
    shortAnswer: "Push each Selection operator down the tree as close as possible to the base table leaves.",
    explanation: "Step 2 of heuristic optimization.",
    hint: "Push selections down towards the leaves.",
    level: "basic"
  },
  {
    question: "What is the Heuristic Query Optimization Algorithm's Step 3?",
    shortAnswer: "Reorder leaf nodes so that relations with the most restrictive selections (smallest intermediate outputs) are joined first.",
    explanation: "Step 3 of heuristic optimization.",
    hint: "Reorder leaf nodes to join the smallest tables first.",
    level: "moderate"
  },
  {
    question: "What is the Heuristic Query Optimization Algorithm's Step 4?",
    shortAnswer: "Combine Cartesian product nodes and subsequent selection nodes into single Equijoin nodes: $\\sigma_{R.A = S.B}(R \\times S) \→ R \\bowtie_{R.A = S.B} S$.",
    explanation: "Step 4 of heuristic optimization.",
    hint: "Combine Cross Products and Selections into Equijoins.",
    level: "basic"
  },
  {
    question: "What is the Heuristic Query Optimization Algorithm's Step 5?",
    shortAnswer: "Push Projection operations down the tree, discarding unneeded attributes as early as possible while retaining join keys.",
    explanation: "Step 5 of heuristic optimization.",
    hint: "Push projections down while preserving join keys.",
    level: "basic"
  },
  {
    question: "How does the optimizer recognize that a Selection can be pushed down to a leaf table?",
    shortAnswer: "By inspecting the attributes referenced in the selection predicate; if ALL referenced attributes belong to a single base table, it can be pushed directly to that table's scan node.",
    explanation: "Attribute containment test for selection pushdown.",
    hint: "If all predicate attributes belong to one table, push it down.",
    level: "basic"
  },
  {
    question: "What is an Index Pushdown (Index Condition Pushdown - ICP) in MySQL?",
    shortAnswer: "An engine-level optimization where MySQL pushes `WHERE` filter evaluation down to the storage engine (InnoDB B-Tree index) rather than fetching full table rows to the server layer.",
    explanation: "Index Condition Pushdown in MySQL.",
    hint: "Pushes WHERE clause evaluation directly into the storage engine index scan.",
    level: "expert",
    codeExample: "EXPLAIN SELECT * FROM students\nWHERE city = 'Barrackpore' AND admission_fee > 4000;\n-- Extra: Using index condition"
  },
  {
    question: "What happens if a Selection predicate is a tautology (e.g. $\\sigma_{1=1}(R)$)?",
    shortAnswer: "The optimizer eliminates the selection node entirely: $\\sigma_{\\text{TRUE}}(R) \\equiv R$.",
    explanation: "Tautology elimination rule.",
    hint: "σ_TRUE(R) ≡ R (node is eliminated).",
    level: "basic"
  },
  {
    question: "What happens if a Selection predicate is a contradiction (e.g. $\\sigma_{1=0}(R)$)?",
    shortAnswer: "The optimizer replaces the entire sub-tree with an empty relation $\\emptyset$ without executing any table scan: $\\sigma_{\\text{FALSE}}(R) \\equiv \\emptyset$.",
    explanation: "Contradiction short-circuit optimization rule.",
    hint: "σ_FALSE(R) ≡ ∅ (short-circuits query).",
    level: "basic"
  },
  {
    question: "How does Commutativity of Selection: $\\sigma_{c_1}(\\sigma_{c_2}(R)) \\equiv \\sigma_{c_2}(\\sigma_{c_1}(R))$ assist query optimization?",
    shortAnswer: "It allows the optimizer to evaluate the more selective (or indexed) filter $c_2$ first to drastically reduce the number of rows that must evaluate the expensive non-indexed predicate $c_1$.",
    explanation: "Evaluation order optimization based on cost and selectivity.",
    hint: "Evaluates the cheaper/indexed filter first to discard rows early.",
    level: "moderate"
  },
  {
    question: "What is the equivalent relational algebra expression after applying selection pushdown to: $\\sigma_{\\text{city='Barrackpore'}}(\\text{Students} \\bowtie \\text{Enrollments})$?",
    shortAnswer: "$$(\\sigma_{\\text{city='Barrackpore'}}(\\text{Students})) \\bowtie \\text{Enrollments}$$.",
    explanation: "Standard selection pushdown transformation.",
    hint: "(σ_{city='Barrackpore'}(Students)) ⨝ Enrollments.",
    level: "basic"
  },
  {
    question: "Can Generalized Projection expressions be pushed down below Selections?",
    shortAnswer: "No, unless the selection does not depend on the computed expression; if the selection tests the computed alias, it must execute AFTER the generalized projection.",
    explanation: "Dependency ordering in generalized projection pushdown.",
    hint: "No, if the selection depends on the computed expression.",
    level: "moderate"
  },
  {
    question: "How does pushing down projection $\\pi$ reduce query memory consumption?",
    shortAnswer: "It reduces tuple byte-width (record length) in memory buffers and temporary hash tables, allowing more rows to fit in L1/L2/L3 CPU cache.",
    explanation: "Memory bandwidth reduction via projection pushdown.",
    hint: "Reduces tuple byte width, fitting more rows into CPU cache.",
    level: "moderate"
  },
  {
    question: "Why can't an optimizer blindly reorder joins in queries with Outer Joins (⟕, ⟖)?",
    shortAnswer: "Because Outer Joins are NOT associative with Inner Joins: $(R \\mathbin{\\unicode{x27D5}} S) \\bowtie T \\neq R \\mathbin{\\unicode{x27D5}} (S \\bowtie T)$, restricting join permutation options.",
    explanation: "Non-associativity of outer joins.",
    hint: "Outer joins are not associative with inner joins.",
    level: "expert"
  },
  {
    question: "What is the master checklist for applying Heuristic Equivalence Rules?",
    shortAnswer: "1) Cascade compound Selections into atomic filters. 2) Push Selections down to base tables. 3) Reorder joins starting with the most selective relations. 4) Combine Cross Products and Selections into Equijoins. 5) Push Projections down while preserving foreign keys. 6) Use Index Condition Pushdown (ICP) in MySQL.",
    explanation: "Following these 6 steps guarantees maximum heuristic query optimization.",
    hint: "Cascade selections, Push selections down, Reorder joins, Fuse equijoins, Push projections, Index Condition Pushdown.",
    level: "basic"
  }
];

export default questions;
