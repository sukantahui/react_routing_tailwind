// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What is an Outer Join in Extended Relational Algebra?",
    shortAnswer: "An extension of the join operator that preserves unmatched ('dangling') tuples from one or both relations by padding non-matching attributes with `NULL` values.",
    explanation: "Core definition of outer join operators.",
    hint: "Join operator that preserves non-matching rows by padding with NULLs.",
    level: "basic"
  },
  {
    question: "What are the three types of Outer Joins and their mathematical symbols?",
    shortAnswer: "1) Left Outer Join (⟕), 2) Right Outer Join (⟖), and 3) Full Outer Join (⟗).",
    explanation: "The three standard outer join operators.",
    hint: "Left Outer (⟕), Right Outer (⟖), Full Outer (⟗).",
    level: "basic"
  },
  {
    question: "What is the mathematical definition of Left Outer Join ($R \\mathbin{\\unicode{x27D5}}_\\theta S$)?",
    shortAnswer: "$$R \\mathbin{\\unicode{x27D5}}_\\theta S = (R \\bowtie_\\theta S) \\cup ((R \\triangleright_\\theta S) \\times \\text{NULL}_S)$$, combining the inner join matches with the antijoin non-matches padded with NULLs.",
    explanation: "Formal derivation of left outer join.",
    hint: "(R ⨝_θ S) ∪ ((R ▷_θ S) × NULL_S).",
    level: "expert"
  },
  {
    question: "What is the mathematical definition of Full Outer Join ($R \\mathbin{\\unicode{x27D7}}_\\theta S$)?",
    shortAnswer: "$$R \\mathbin{\\unicode{x27D7}}_\\theta S = (R \\mathbin{\\unicode{x27D5}}_\\theta S) \\cup (R \\mathbin{\\unicode{x27D6}}_\\theta S)$$.",
    explanation: "Formal definition of full outer join.",
    hint: "(R ⟕ S) ∪ (R ⟖ S).",
    level: "basic"
  },
  {
    question: "Does MySQL natively support the `FULL OUTER JOIN` syntax?",
    shortAnswer: "No! MySQL does not have a native `FULL OUTER JOIN` keyword; it must be emulated using a `UNION` of a `LEFT JOIN` and a `RIGHT JOIN`.",
    explanation: "MySQL syntax limitation and standard emulation pattern.",
    hint: "No, emulated using LEFT JOIN UNION RIGHT JOIN.",
    level: "basic"
  },
  {
    question: "Why must `UNION` (instead of `UNION ALL`) be used when emulating a Full Outer Join in MySQL?",
    shortAnswer: "Because `UNION` automatically eliminates duplicate inner join matching rows produced by both the Left and Right joins, whereas `UNION ALL` would duplicate them.",
    explanation: "Deduplication requirement in Full Outer Join emulation.",
    hint: "UNION deduplicates the matching rows present in both joins.",
    level: "moderate"
  },
  {
    question: "What is the disastrous 'Accidental Inner Join Conversion' pitfall in SQL Left Joins?",
    shortAnswer: "Placing a filter condition on the right-side table in the `WHERE` clause (e.g. `WHERE e.grade = 'A'`) filters out all rows where `e.grade` is `NULL`, silently converting the `LEFT JOIN` into an `INNER JOIN`!",
    explanation: "Classic SQL bug converting outer joins to inner joins.",
    hint: "WHERE filters on right-side columns discard NULL rows, making it an INNER JOIN.",
    level: "expert"
  },
  {
    question: "How do you properly filter right-side attributes in a Left Join without discarding non-matching left rows?",
    shortAnswer: "Place the filtering predicate inside the `ON` clause: `FROM students s LEFT JOIN enrollments e ON s.id = e.id AND e.status = 'Paid';`.",
    explanation: "ON vs WHERE filtration in outer joins.",
    hint: "Move the filter into the ON clause.",
    level: "moderate",
    codeExample: "SELECT s.full_name, e.course_id\nFROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id AND e.grade = 'A+';"
  },
  {
    question: "Is Left Outer Join commutative ($R \\mathbin{\\unicode{x27D5}} S \\equiv S \\mathbin{\\unicode{x27D5}} R$)?",
    shortAnswer: "NO! Left Outer Join is strictly NON-COMMUTATIVE. However, $R \\mathbin{\\unicode{x27D5}} S \\equiv S \\mathbin{\\unicode{x27D6}} R$.",
    explanation: "Non-commutative property of directional outer joins.",
    hint: "No! R ⟕ S is equivalent to S ⟖ R.",
    level: "basic"
  },
  {
    question: "Is Full Outer Join commutative ($R \\mathbin{\\unicode{x27D7}} S \\equiv S \\mathbin{\\unicode{x27D7}} R$)?",
    shortAnswer: "Yes! Full Outer Join preserves all rows from both relations, making it commutative up to column ordering.",
    explanation: "Commutative law for full outer join.",
    hint: "Yes, Full Outer Join is commutative.",
    level: "basic"
  },
  {
    question: "What is the minimum cardinality of $R \\mathbin{\\unicode{x27D5}} S$ if $|R| = m$?",
    shortAnswer: "$$m$$ (every tuple of relation $R$ is guaranteed to appear at least once in the output).",
    explanation: "Lower bound of left outer join cardinality.",
    hint: "|R| (at least all rows of R).",
    level: "basic"
  },
  {
    question: "What is the minimum cardinality of Full Outer Join $R \\mathbin{\\unicode{x27D7}} S$ if $|R| = m$ and $|S| = n$?",
    shortAnswer: "$$\\max(m, n)$$ (when the smaller relation is completely matched with the larger relation).",
    explanation: "Lower bound of full outer join cardinality.",
    hint: "max(|R|, |S|).",
    level: "moderate"
  },
  {
    question: "What is the maximum cardinality of $R \\mathbin{\\unicode{x27D7}} S$ if $|R| = m$ and $|S| = n$?",
    shortAnswer: "$$m + n$$ (when zero tuples match, resulting in all tuples from both relations padded with NULLs) or $m \\times n$ (if all rows match on duplicate non-unique keys).",
    explanation: "Upper bound of full outer join cardinality.",
    hint: "m + n (with 0 matches) or m * n (with duplicate keys).",
    level: "moderate"
  },
  {
    question: "What is the degree of $R \\mathbin{\\unicode{x27D5}}_\\theta S$ if $\\text{Degree}(R) = n$ and $\\text{Degree}(S) = m$?",
    shortAnswer: "$$n + m$$ (both schema headers are preserved, with NULLs substituted for $S$ when unmatched).",
    explanation: "Degree of outer theta join.",
    hint: "n + m.",
    level: "basic"
  },
  {
    question: "How do you replace NULL values in outer join output columns with descriptive text in MySQL?",
    shortAnswer: "Using the `COALESCE()` or `IFNULL()` functions: `COALESCE(e.course_title, 'Not Enrolled') AS course`.",
    explanation: "NULL replacement in SQL outer joins.",
    hint: "COALESCE(col, 'Default Text').",
    level: "basic",
    codeExample: "SELECT s.full_name, COALESCE(e.course_title, 'No Enrolled Course') AS enrolled_course\nFROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id;"
  },
  {
    question: "How does a Left Anti-Join relate to a Left Outer Join?",
    shortAnswer: "A Left Anti-Join is computed by taking a Left Outer Join and filtering for rows where the right-side Primary Key is `NULL` (`WHERE S.id IS NULL`).",
    explanation: "Derivation of anti-join from outer join.",
    hint: "LEFT JOIN ... WHERE right_table.pk IS NULL.",
    level: "basic"
  },
  {
    question: "Is Left Outer Join associative: $(R \\mathbin{\\unicode{x27D5}} S) \\mathbin{\\unicode{x27D5}} T \\equiv R \\mathbin{\\unicode{x27D5}} (S \\mathbin{\\unicode{x27D5}} T)$?",
    shortAnswer: "NO! Outer joins are generally NOT associative; parenthesis grouping alters how NULL values propagate across join levels.",
    explanation: "Non-associative property of outer joins.",
    hint: "No! Outer joins are not associative.",
    level: "expert"
  },
  {
    question: "How do you express a Left Natural Outer Join in Relational Algebra?",
    shortAnswer: "$$R \\mathbin{\\unicode{x27D5}} S$$, where matching occurs implicitly on common attribute names and common columns are coalesced without duplicate headers.",
    explanation: "Natural outer join syntax.",
    hint: "R ⟕ S (coalesces common column).",
    level: "moderate"
  },
  {
    question: "What is the degree of a Natural Left Outer Join if $R$ and $S$ share $k$ common columns?",
    shortAnswer: "$$\\text{Degree}(R) + \\text{Degree}(S) - k$$.",
    explanation: "Degree formula for natural outer join.",
    hint: "n + m - k.",
    level: "basic"
  },
  {
    question: "Why should developers avoid excessive chaining of 5+ `LEFT JOIN`s in high-throughput production queries?",
    shortAnswer: "Because each outer join limits the optimizer's ability to reorder joins (outer join ordering constraints), which can force inefficient nested loop execution and large intermediate row sets.",
    explanation: "Query optimizer constraints with chained outer joins.",
    hint: "Restricts optimizer join reordering and causes large intermediate NULL sets.",
    level: "expert"
  },
  {
    question: "What is a 'Dangling Tuple' in relational join theory?",
    shortAnswer: "A tuple in relation $R$ or $S$ that does not match any tuple in the other relation under the join condition $\\theta$.",
    explanation: "Formal definition of dangling tuples.",
    hint: "A tuple that has no matching partner in the other relation.",
    level: "basic"
  },
  {
    question: "How do you generate an audit report showing all students and all courses, even courses with 0 students and students with 0 courses?",
    shortAnswer: "By executing a Full Outer Join between `Students` and `Courses` via `Enrollments`.",
    explanation: "360-degree audit report use case.",
    hint: "Full Outer Join (Students ⟗ Courses).",
    level: "basic"
  },
  {
    question: "Can an Outer Join produce duplicate rows for a single left tuple?",
    shortAnswer: "Yes! If a student matches 3 different enrollment records, the student's left tuple will appear 3 times in the `LEFT JOIN` output.",
    explanation: "1:N cardinality expansion in outer joins.",
    hint: "Yes, if multiple matching rows exist in the right table.",
    level: "basic"
  },
  {
    question: "How do you count enrolled courses per student while keeping students with 0 courses in the report?",
    shortAnswer: "`SELECT s.full_name, COUNT(e.course_id) AS course_count FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id GROUP BY s.full_name;`.",
    explanation: "Counting over outer joins using COUNT(col) instead of COUNT(*).",
    hint: "LEFT JOIN with COUNT(e.course_id) and GROUP BY.",
    level: "moderate",
    codeExample: "SELECT s.full_name, COUNT(e.course_id) AS total_courses\nFROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id\nGROUP BY s.student_id, s.full_name;"
  },
  {
    question: "Why MUST you use `COUNT(e.course_id)` instead of `COUNT(*)` when aggregating over a `LEFT JOIN`?",
    shortAnswer: "Because for a student with 0 courses, `COUNT(*)` counts the single NULL-padded row and returns `1`, whereas `COUNT(e.course_id)` correctly ignores the NULL and returns `0`!",
    explanation: "Critical aggregate bug when grouping over outer joins.",
    hint: "COUNT(*) returns 1 for NULL rows; COUNT(e.course_id) correctly returns 0.",
    level: "expert"
  },
  {
    question: "What is the equivalent relational algebra notation for Right Outer Join?",
    shortAnswer: "$$R \\mathbin{\\unicode{x27D6}} S \\equiv S \\mathbin{\\unicode{x27D5}} R$$.",
    explanation: "Algebraic equivalence of Right and Left Outer Join.",
    hint: "R ⟖ S ≡ S ⟕ R.",
    level: "basic"
  },
  {
    question: "How does the optimizer optimize `LEFT JOIN` when the right-side foreign key has a NOT NULL constraint and an INNER JOIN condition?",
    shortAnswer: "The optimizer performs 'Outer Join Simplification', converting the `LEFT JOIN` into a faster `INNER JOIN` if a `WHERE` predicate rejects all NULLs.",
    explanation: "Outer Join Simplification optimization in MySQL.",
    hint: "Converts LEFT JOIN to INNER JOIN if WHERE clause rejects NULLs.",
    level: "expert"
  },
  {
    question: "Can an Outer Join be performed with non-equi comparison operators ($<, >$) in Relational Algebra?",
    shortAnswer: "Yes! A Theta Left Outer Join $R \\mathbin{\\unicode{x27D5}}_{R.A < S.B} S$ retains all tuples of $R$ even if no tuple in $S$ has a strictly greater value.",
    explanation: "Non-equi outer joins.",
    hint: "Yes, non-equi outer joins are mathematically valid.",
    level: "moderate"
  },
  {
    question: "What is the output of $R \\mathbin{\\unicode{x27D5}} \\emptyset$ (Left outer join with empty relation)?",
    shortAnswer: "Relation $R$ with all attributes of $S$ padded with `NULL` (Degree = $\\text{Deg}(R) + \\text{Deg}(S)$, Cardinality = $|R|$).",
    explanation: "Boundary condition for outer join with empty relation.",
    hint: "All rows of R padded with NULLs for S.",
    level: "basic"
  },
  {
    question: "What is the master checklist for mastering Outer Join Operators (⟕, ⟖, ⟗)?",
    shortAnswer: "1) Use Left Outer Join ($R \\mathbin{\\unicode{x27D5}} S$) to retain all master parent records. 2) Place right-table filters in `ON` (not `WHERE`) to prevent accidental inner join conversion. 3) Emulate Full Outer Join in MySQL via `LEFT JOIN UNION RIGHT JOIN`. 4) Use `COUNT(e.id)` instead of `COUNT(*)` when aggregating over outer joins. 5) Use `COALESCE()` for clean NULL display.",
    explanation: "Following these 5 rules guarantees robust outer join query composition.",
    hint: "Retain parent rows, ON vs WHERE filters, Full Outer Join UNION emulation, COUNT(col) for aggregates, COALESCE.",
    level: "basic"
  }
];

export default questions;
