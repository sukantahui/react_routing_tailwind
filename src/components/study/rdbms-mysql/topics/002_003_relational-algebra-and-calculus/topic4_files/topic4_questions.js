// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What are the three fundamental Set Theory operations in Relational Algebra?",
    shortAnswer: "1) Set Union (∪), 2) Set Intersection (∩), and 3) Set Difference (− or ∖).",
    explanation: "Core binary set operators in relational algebra.",
    hint: "Union, Intersection, and Set Difference.",
    level: "basic"
  },
  {
    question: "What is the mandatory prerequisite for applying Set Union, Intersection, or Difference to two relations?",
    shortAnswer: "The two relations MUST be UNION-COMPATIBLE (Type-Compatible): they must have the same degree (column count) and corresponding attributes must share compatible domains.",
    explanation: "Union compatibility rule in relational algebra.",
    hint: "Union compatibility (same degree and matching attribute domains).",
    level: "basic"
  },
  {
    question: "What is the mathematical definition of Set Union ($R \\cup S$)?",
    shortAnswer: "$$R \\cup S = \\{ t \\mid t \\in R \\lor t \\in S \\}$$.",
    explanation: "Tuples present in R, in S, or in both, with duplicate elimination.",
    hint: "{ t | t ∈ R ∨ t ∈ S }.",
    level: "basic"
  },
  {
    question: "What is the mathematical definition of Set Intersection ($R \\cap S$)?",
    shortAnswer: "$$R \\cap S = \\{ t \\mid t \\in R \\land t \\in S \\}$$.",
    explanation: "Tuples present simultaneously in both R and S.",
    hint: "{ t | t ∈ R ∧ t ∈ S }.",
    level: "basic"
  },
  {
    question: "What is the mathematical definition of Set Difference ($R - S$)?",
    shortAnswer: "$$R - S = \\{ t \\mid t \\in R \\land t \\notin S \\}$$.",
    explanation: "Tuples present in R but absent in S.",
    hint: "{ t | t ∈ R ∧ t ∉ S }.",
    level: "basic"
  },
  {
    question: "Is Set Union commutative ($R \\cup S \\equiv S \\cup R$)?",
    shortAnswer: "Yes. Order of operands does not change the resulting union set.",
    explanation: "Commutative law for set union.",
    hint: "Yes, R ∪ S ≡ S ∪ R.",
    level: "basic"
  },
  {
    question: "Is Set Intersection commutative ($R \\cap S \\equiv S \\cap R$)?",
    shortAnswer: "Yes. Order of operands does not change the resulting intersection set.",
    explanation: "Commutative law for set intersection.",
    hint: "Yes, R ∩ S ≡ S ∩ R.",
    level: "basic"
  },
  {
    question: "Is Set Difference commutative ($R - S \\equiv S - R$)?",
    shortAnswer: "NO! Set Difference is NON-COMMUTATIVE. In general, $R - S \\neq S - R$.",
    explanation: "Non-commutative relative complement property.",
    hint: "No! R - S is completely different from S - R.",
    level: "basic"
  },
  {
    question: "What is the maximum cardinality of $R \\cup S$ if $|R| = m$ and $|S| = n$?",
    shortAnswer: "$$m + n$$ (when $R$ and $S$ are completely disjoint with zero overlapping tuples).",
    explanation: "Upper bound of union cardinality.",
    hint: "|R| + |S|.",
    level: "basic"
  },
  {
    question: "What is the minimum cardinality of $R \\cup S$ if $|R| = m$ and $|S| = n$?",
    shortAnswer: "$$\\max(m, n)$$ (when one relation is a complete subset of the other).",
    explanation: "Lower bound of union cardinality.",
    hint: "max(|R|, |S|).",
    level: "moderate"
  },
  {
    question: "What is the maximum cardinality of $R \\cap S$ if $|R| = m$ and $|S| = n$?",
    shortAnswer: "$$\\min(m, n)$$ (when the smaller relation is entirely contained in the larger relation).",
    explanation: "Upper bound of intersection cardinality.",
    hint: "min(|R|, |S|).",
    level: "basic"
  },
  {
    question: "What is the minimum cardinality of $R \\cap S$?",
    shortAnswer: "0 (when $R$ and $S$ share zero common tuples, resulting in the empty set $\\emptyset$).",
    explanation: "Lower bound of intersection cardinality.",
    hint: "0 (empty set).",
    level: "basic"
  },
  {
    question: "What is the maximum cardinality of $R - S$ if $|R| = m$?",
    shortAnswer: "$$m$$ (when $R$ and $S$ share zero common tuples).",
    explanation: "Upper bound of set difference cardinality.",
    hint: "|R|.",
    level: "basic"
  },
  {
    question: "What is the minimum cardinality of $R - S$?",
    shortAnswer: "0 (when relation $R$ is a subset of relation $S$, meaning all tuples in $R$ are also in $S$).",
    explanation: "Lower bound of set difference.",
    hint: "0 (when R ⊆ S).",
    level: "basic"
  },
  {
    question: "How is Set Intersection derived from Set Difference in Relational Algebra?",
    shortAnswer: "$$R \\cap S = R - (R - S)$$ or $$R \\cap S = S - (S - R)$$.",
    explanation: "Standard mathematical derivation of intersection from difference.",
    hint: "R - (R - S).",
    level: "moderate"
  },
  {
    question: "What SQL keyword implements Set Union with automatic duplicate removal?",
    shortAnswer: "`UNION` (or `UNION DISTINCT`).",
    explanation: "SQL UNION operator semantics.",
    hint: "UNION in SQL.",
    level: "basic"
  },
  {
    question: "What is the difference between SQL `UNION` and SQL `UNION ALL`?",
    shortAnswer: "`UNION` eliminates duplicate tuples by performing an in-memory sort or hash deduplication; `UNION ALL` simply concatenates both relations without removing duplicates, making it much faster.",
    explanation: "Set union vs multiset bag concatenation in SQL.",
    hint: "UNION deduplicates; UNION ALL preserves duplicates and is faster.",
    level: "basic"
  },
  {
    question: "What SQL keyword implements Set Intersection in MySQL 8.0.31+?",
    shortAnswer: "`INTERSECT` (or `INTERSECT DISTINCT`).",
    explanation: "Native SQL INTERSECT support in modern MySQL.",
    hint: "INTERSECT keyword.",
    level: "basic",
    codeExample: "SELECT student_id FROM enrollments WHERE course_id = 101\nINTERSECT\nSELECT student_id FROM enrollments WHERE course_id = 102;"
  },
  {
    question: "How was Set Intersection emulated in older versions of MySQL (pre-8.0.31)?",
    shortAnswer: "Using `INNER JOIN`, `WHERE ... IN (subquery)`, or `WHERE EXISTS (subquery)`.",
    explanation: "Pre-8.0.31 intersection emulation patterns.",
    hint: "INNER JOIN or WHERE EXISTS.",
    level: "moderate",
    codeExample: "SELECT DISTINCT e1.student_id\nFROM enrollments e1\nJOIN enrollments e2 ON e1.student_id = e2.student_id\nWHERE e1.course_id = 101 AND e2.course_id = 102;"
  },
  {
    question: "What SQL keyword implements Set Difference in MySQL 8.0.31+?",
    shortAnswer: "`EXCEPT` (or `EXCEPT DISTINCT`).",
    explanation: "Native SQL EXCEPT support in modern MySQL.",
    hint: "EXCEPT keyword.",
    level: "basic",
    codeExample: "SELECT student_id FROM students\nEXCEPT\nSELECT student_id FROM fee_receipts;"
  },
  {
    question: "How is Set Difference emulated in older MySQL versions or for maximum index performance?",
    shortAnswer: "Using an `ANTI-JOIN`: `SELECT s.student_id FROM students s LEFT JOIN fee_receipts f ON s.student_id = f.student_id WHERE f.student_id IS NULL;`.",
    explanation: "Classic Left Anti-Join emulation pattern for EXCEPT.",
    hint: "LEFT JOIN ... WHERE right_table.id IS NULL.",
    level: "expert"
  },
  {
    question: "What is De Morgan's Law for relations $R$, $S$, and $T$?",
    shortAnswer: "$$T - (R \\cup S) \\equiv (T - R) \\cap (T - S)$$ and $$T - (R \\cap S) \\equiv (T - R) \\cup (T - S)$$.",
    explanation: "De Morgan's algebraic laws in relational set theory.",
    hint: "T - (R ∪ S) ≡ (T - R) ∩ (T - S).",
    level: "expert"
  },
  {
    question: "Is Set Union Associative: $(R \\cup S) \\cup T \\equiv R \\cup (S \\cup T)$?",
    shortAnswer: "Yes. Grouping of union operations does not alter the final result set.",
    explanation: "Associative law for union.",
    hint: "Yes, union is associative.",
    level: "basic"
  },
  {
    question: "Is Set Intersection Associative: $(R \\cap S) \\cap T \\equiv R \\cap (S \\cap T)$?",
    shortAnswer: "Yes. Grouping of intersection operations does not alter the final result set.",
    explanation: "Associative law for intersection.",
    hint: "Yes, intersection is associative.",
    level: "basic"
  },
  {
    question: "Is Set Difference Associative: $(R - S) - T \\equiv R - (S - T)$?",
    shortAnswer: "NO! Set Difference is NOT associative. For example, $(R - S) - T \\equiv R - (S \\cup T) \\neq R - (S - T)$.",
    explanation: "Non-associative property of set difference.",
    hint: "No, set difference is not associative.",
    level: "expert"
  },
  {
    question: "What is the result of $R \\cup \\emptyset$ (union with empty set)?",
    shortAnswer: "$$R$$ (the identity element for union).",
    explanation: "Identity property of empty set under union.",
    hint: "R (unchanged).",
    level: "basic"
  },
  {
    question: "What is the result of $R \\cap \\emptyset$ (intersection with empty set)?",
    shortAnswer: "$$\\emptyset$$ (the annihilator element for intersection).",
    explanation: "Empty set result.",
    hint: "Empty set ∅.",
    level: "basic"
  },
  {
    question: "What is the result of $R - R$ (set difference with itself)?",
    shortAnswer: "$$\\emptyset$$ (the empty relation).",
    explanation: "Self-difference yields empty set.",
    hint: "Empty set ∅.",
    level: "basic"
  },
  {
    question: "Why does `UNION` require column types in both `SELECT` statements to be compatible?",
    shortAnswer: "Because the output relation must have a unified, strongly-typed schema header where each column has a well-defined domain and storage format.",
    explanation: "Type system enforcement for unified result headers.",
    hint: "Output table requires a unified strongly-typed schema.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for using Set Operations in Relational Algebra and SQL?",
    shortAnswer: "1) Verify Union Compatibility (same column count and domain types). 2) Use `UNION` when deduplication is required; `UNION ALL` for fast concatenation. 3) Remember that $R - S \\neq S - R$. 4) Use MySQL 8.0.31+ `INTERSECT` and `EXCEPT` or emulate with Anti-Joins. 5) Use De Morgan's laws for query simplification.",
    explanation: "Following these 5 rules ensures error-free set algebraic queries.",
    hint: "Union compatibility, UNION vs UNION ALL, Difference non-commutativity, EXCEPT/INTERSECT, Anti-Joins.",
    level: "basic"
  }
];

export default questions;
