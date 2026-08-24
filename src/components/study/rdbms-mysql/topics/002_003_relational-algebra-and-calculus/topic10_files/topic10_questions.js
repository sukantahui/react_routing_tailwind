// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is the Division Operator (÷) in Relational Algebra?",
    shortAnswer: "A specialized binary operator designed to answer universal quantification ('FOR ALL' / 'EVERY') queries by finding tuples in $R$ associated with ALL tuples in $S$.",
    explanation: "Core universal quantification operator in relational algebra.",
    hint: "Binary operator for 'FOR ALL' / universal queries.",
    level: "basic"
  },
  {
    question: "What is the mathematical definition of Relational Division ($R \\div S$)?",
    shortAnswer: "$$R \\div S = \\{ t_A \\in \\pi_A(R) \\mid \\forall t_S \\in S, \\ (t_A \\circ t_S) \\in R \\}$$, where $A = \\text{Attrs}(R) - \\text{Attrs}(S)$.",
    explanation: "Formal definition of relational division.",
    hint: "{ t_A ∈ π_A(R) | ∀ t_S ∈ S, (t_A ∘ t_S) ∈ R }.",
    level: "basic"
  },
  {
    question: "What schema prerequisite must hold between relations $R$ and $S$ for Division $R \\div S$ to be valid?",
    shortAnswer: "The attributes of $S$ must be a PROPER SUBSET of the attributes of $R$ ($\\{B\\} = \\text{Attrs}(S) \\subset \\text{Attrs}(R)$), and corresponding attributes must share compatible domains.",
    explanation: "Schema subset prerequisite for relational division.",
    hint: "Attributes of S must be a proper subset of attributes of R.",
    level: "basic"
  },
  {
    question: "What is the degree (number of columns) of $R \\div S$ if $\\text{Degree}(R) = n + m$ and $\\text{Degree}(S) = m$?",
    shortAnswer: "$$\\text{Degree}(R \\div S) = (n + m) - m = n$$.",
    explanation: "Degree subtraction formula for relational division.",
    hint: "Degree(R) - Degree(S) = n.",
    level: "basic"
  },
  {
    question: "Why is the Division operator considered the algebraic INVERSE of Cartesian Product (×)?",
    shortAnswer: "Because if $T = R \\times S$, then dividing $T$ by $S$ returns the original relation $R$: $$(R \\times S) \\div S \\equiv R$$.",
    explanation: "Inverse algebraic relationship.",
    hint: "(R × S) ÷ S ≡ R.",
    level: "moderate"
  },
  {
    question: "What is the 4-step formal derivation of $R(A, B) \\div S(B)$ using primitive operators ($\pi, \\times, -$)?",
    shortAnswer: "1) $T_1 = \\pi_A(R)$ (All candidates), 2) $T_2 = T_1 \\times S$ (All required pairs), 3) $T_3 = T_2 - R$ (Missing pairs/disqualifiers), 4) $R \\div S = T_1 - \\pi_A(T_3)$ (Qualified winners).",
    explanation: "Canonical 4-step derivation of division in relational algebra.",
    hint: "π_A(R) - π_A((π_A(R) × S) - R).",
    level: "expert"
  },
  {
    question: "What is the full single-line relational algebra expression for $R(A, B) \\div S(B)$?",
    shortAnswer: "$$\\pi_A(R) - \\pi_A((\\pi_A(R) \\times S) - R)$$.",
    explanation: "Single-line primitive expression for relational division.",
    hint: "π_A(R) - π_A((π_A(R) × S) - R).",
    level: "expert"
  },
  {
    question: "Why does SQL NOT have a native `DIVIDE BY` keyword?",
    shortAnswer: "Because Relational Division is a derived operator that can be expressed either via double `NOT EXISTS` subqueries or via `GROUP BY ... HAVING COUNT(DISTINCT ...) = (SELECT COUNT(*))`.",
    explanation: "Derived nature of division in commercial SQL.",
    hint: "It is derived using GROUP BY HAVING or double NOT EXISTS.",
    level: "basic"
  },
  {
    question: "How is the Double `NOT EXISTS` pattern logically derived from the Universal Quantifier ($\forall$)?",
    shortAnswer: "By applying the classical first-order logic equivalence: $$\\forall x \\ P(x) \\equiv \\neg \\exists x \\ \\neg P(x)$$ ('For all courses, student enrolled' $\\equiv$ 'There is no course that the student did NOT enroll in').",
    explanation: "First-order logic equivalence of universal quantification.",
    hint: "∀x P(x) ≡ ¬∃x ¬P(x) (There is no course not enrolled in).",
    level: "expert"
  },
  {
    question: "How do you write a Double `NOT EXISTS` query in SQL to find students enrolled in ALL core courses?",
    shortAnswer: "`SELECT s.student_id FROM students s WHERE NOT EXISTS (SELECT c.course_id FROM core_courses c WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id AND e.course_id = c.course_id));`.",
    explanation: "Standard double NOT EXISTS SQL pattern.",
    hint: "WHERE NOT EXISTS (SELECT course WHERE NOT EXISTS (SELECT enrollment...)).",
    level: "expert",
    codeExample: "SELECT s.student_id, s.full_name\nFROM students s\nWHERE NOT EXISTS (\n    SELECT c.course_id FROM core_courses c\n    WHERE NOT EXISTS (\n        SELECT 1 FROM enrollments e\n        WHERE e.student_id = s.student_id AND e.course_id = c.course_id\n    )\n);"
  },
  {
    question: "How do you express Relational Division in SQL using `GROUP BY` and `HAVING COUNT(DISTINCT)`?",
    shortAnswer: "`SELECT student_id FROM enrollments WHERE course_id IN (SELECT course_id FROM core_courses) GROUP BY student_id HAVING COUNT(DISTINCT course_id) = (SELECT COUNT(*) FROM core_courses);`.",
    explanation: "Modern high-performance aggregation pattern for division.",
    hint: "GROUP BY student_id HAVING COUNT(DISTINCT course_id) = (SELECT COUNT(*) FROM core_courses).",
    level: "moderate",
    codeExample: "SELECT e.student_id, s.full_name\nFROM enrollments e\nJOIN students s ON e.student_id = s.student_id\nWHERE e.course_id IN (SELECT course_id FROM core_courses)\nGROUP BY e.student_id, s.full_name\nHAVING COUNT(DISTINCT e.course_id) = (SELECT COUNT(*) FROM core_courses);"
  },
  {
    question: "Why is `COUNT(DISTINCT course_id)` MANDATORY in the `HAVING` clause instead of `COUNT(*)`?",
    shortAnswer: "Because if a student enrolled in Course 101 multiple times (e.g. retaking an exam), `COUNT(*)` would count duplicates and falsely satisfy the total count even if the student missed other core courses!",
    explanation: "Duplicate course enrollment avoidance.",
    hint: "DISTINCT prevents duplicate retakes from inflating the course count.",
    level: "moderate"
  },
  {
    question: "What is the result of $R(A, B) \\div S(B)$ if relation $S$ is EMPTY ($|S| = 0$)?",
    shortAnswer: "$$\\pi_A(R)$$ (all distinct candidates in $R$ vacuously satisfy the condition, since there are no elements in $S$ to fail on).",
    explanation: "Vacuous truth under empty divisor set.",
    hint: "π_A(R) (all candidates vacuously satisfy).",
    level: "expert"
  },
  {
    question: "What is the result of $R(A, B) \\div S(B)$ if relation $R$ is EMPTY ($|R| = 0$) and $|S| > 0$?",
    shortAnswer: "$$\\emptyset$$ (empty set, because there are zero candidate tuples in $R$).",
    explanation: "Empty dividend result.",
    hint: "Empty relation ∅.",
    level: "basic"
  },
  {
    question: "If relation $S$ contains 3 courses and student Mamata has taken 3 courses, Mahima has taken 2, and Susmita has taken 1, who appears in $R \\div S$?",
    shortAnswer: "ONLY Mamata (she is the only student who took ALL 3 courses).",
    explanation: "Universal quantification evaluation.",
    hint: "Only Mamata.",
    level: "basic"
  },
  {
    question: "What is the maximum cardinality of $R(A, B) \\div S(B)$?",
    shortAnswer: "$$|\\pi_A(R)|$$ (at most the number of distinct candidate values of attribute $A$).",
    explanation: "Upper bound of division cardinality.",
    hint: "|π_A(R)|.",
    level: "basic"
  },
  {
    question: "Is the Relational Division operator commutative: $R \\div S \\equiv S \\div R$?",
    shortAnswer: "NO! Division is NON-COMMUTATIVE. In fact, $S \\div R$ is not even mathematically defined unless $\\text{Attrs}(R) \\subseteq \\text{Attrs}(S)$.",
    explanation: "Non-commutative property of division.",
    hint: "No, division is strictly non-commutative.",
    level: "basic"
  },
  {
    question: "How do you find all suppliers who supply EVERY part in a manufacturing database?",
    shortAnswer: "$$\\pi_{\\text{supplier\\_id, part\\_id}}(\\text{Catalog}) \\div \\pi_{\\text{part\\_id}}(\\text{Parts})$$.",
    explanation: "Classic supplier-parts universal query.",
    hint: "Catalog ÷ Parts.",
    level: "basic"
  },
  {
    question: "How do you find all doctors who are certified in ALL 5 emergency surgical procedures?",
    shortAnswer: "$$\\pi_{\\text{doctor\\_id, procedure\\_id}}(\\text{Doctor\\_Certifications}) \\div \\pi_{\\text{procedure\\_id}}(\\text{Emergency\\_Procedures})$$.",
    explanation: "Healthcare certification universal division query.",
    hint: "Doctor_Certifications ÷ Emergency_Procedures.",
    level: "basic"
  },
  {
    question: "Which of the two SQL division patterns (Double `NOT EXISTS` vs `GROUP BY HAVING COUNT`) is typically faster in MySQL?",
    shortAnswer: "`GROUP BY ... HAVING COUNT(DISTINCT)` is usually significantly faster on modern databases because it uses single-pass hash aggregation and B-Tree indexes instead of correlated nested subqueries.",
    explanation: "Query performance comparison in MySQL.",
    hint: "GROUP BY HAVING COUNT(DISTINCT) is faster due to hash aggregation.",
    level: "moderate"
  },
  {
    question: "When is the Double `NOT EXISTS` pattern preferred over `GROUP BY HAVING`?",
    shortAnswer: "When the universal divisor set $S$ is defined dynamically per-outer-row (e.g. 'Find students who have taken all courses offered by THEIR OWN department').",
    explanation: "Correlated dynamic divisor division queries.",
    hint: "When the divisor set varies per student (correlated dynamic sets).",
    level: "expert"
  },
  {
    question: "Can Division be performed if relation $S$ has multiple attributes (e.g. degree of $S = 2$)?",
    shortAnswer: "Yes! If $R(A, B, C)$ has degree 3 and $S(B, C)$ has degree 2, $R \\div S$ returns all values of $A$ associated with every $(B, C)$ pair in $S$.",
    explanation: "Multi-attribute divisor division.",
    hint: "Yes, attributes of S can be multi-column composite keys.",
    level: "moderate"
  },
  {
    question: "What is the degree of $\\text{Enrollments}(4) \\div \\text{CoreCourses}(1)$?",
    shortAnswer: "$$4 - 1 = 3$$ attributes.",
    explanation: "Arity subtraction.",
    hint: "4 - 1 = 3.",
    level: "basic"
  },
  {
    question: "What role does the Cartesian Product play in the 4-step derivation of Division?",
    shortAnswer: "It generates the complete theoretical matrix of all possible combinations between candidates and required items ($T_1 \\times S$), creating the baseline against which missing pairs are detected.",
    explanation: "Baseline generation via cross product.",
    hint: "Generates the complete matrix of all expected pairs.",
    level: "moderate"
  },
  {
    question: "What role does Set Difference play in the 4-step derivation of Division?",
    shortAnswer: "It identifies the 'Disqualifier Pairs'—combinations in $T_1 \\times S$ that were NOT completed by candidate $t_A$ in relation $R$.",
    explanation: "Disqualifier identification via set difference.",
    hint: "Subtracts actual rows from expected rows to find missing pairs.",
    level: "moderate"
  },
  {
    question: "How do you find all bank clients who have accounts in ALL branches located in Kolkata?",
    shortAnswer: "`SELECT customer_id FROM branch_accounts WHERE branch_id IN (SELECT branch_id FROM branches WHERE city = 'Kolkata') GROUP BY customer_id HAVING COUNT(DISTINCT branch_id) = (SELECT COUNT(*) FROM branches WHERE city = 'Kolkata');`.",
    explanation: "Filtered divisor division in banking domain.",
    hint: "GROUP BY customer_id HAVING COUNT(DISTINCT branch_id) = (SELECT COUNT(*) FROM branches WHERE city = 'Kolkata').",
    level: "moderate",
    codeExample: "SELECT customer_id\nFROM branch_accounts\nWHERE branch_id IN (SELECT branch_id FROM branches WHERE city = 'Kolkata')\nGROUP BY customer_id\nHAVING COUNT(DISTINCT branch_id) = (\n    SELECT COUNT(*) FROM branches WHERE city = 'Kolkata'\n);"
  },
  {
    question: "What is Exact Relational Division (Division with exact match and no extra items)?",
    shortAnswer: "A division query that requires a candidate to match ALL items in $S$ AND have NO ADDITIONAL items outside of $S$: $$|\\text{Items}(A)| = |S| \\land \\text{Items}(A) \\subseteq S$$.",
    explanation: "Exact division vs superset division.",
    hint: "Matches all items in S with zero extra items.",
    level: "expert"
  },
  {
    question: "How do you write an Exact Division query in SQL?",
    shortAnswer: "By combining `COUNT(DISTINCT CASE WHEN course_id IN (...) THEN course_id END) = Total_S` AND `COUNT(DISTINCT course_id) = Total_S`.",
    explanation: "SQL implementation of exact set equality matching.",
    hint: "Enforce that total distinct items equals required count with zero outside items.",
    level: "expert"
  },
  {
    question: "In relational completeness definitions, why is the Division operator (÷) classified as a Derived Operator rather than a Primitive Operator?",
    shortAnswer: "Because Codd proved that any division expression can be fully simulated using only the 5 primitive operators: Selection (σ), Projection (π), Cartesian Product (×), Set Union (∪), and Set Difference (−).",
    explanation: "Codd's theorem on primitive completeness.",
    hint: "Can be fully constructed from Selection, Projection, Cross Product, Union, and Difference.",
    level: "basic"
  },
  {
    question: "What is the master checklist for mastering the Relational Division Operator (÷)?",
    shortAnswer: "1) Recognize 'FOR ALL', 'EVERY', or 'ALL' query requirements. 2) Degree formula: $\\text{Deg}(R \\div S) = \\text{Deg}(R) - \\text{Deg}(S)$. 3) Master the 4-step primitive derivation $\\pi_A(R) - \\pi_A((\\pi_A(R) \\times S) - R)$. 4) Implement in SQL using `GROUP BY ... HAVING COUNT(DISTINCT ...) = (SELECT COUNT(*))`. 5) Use Double `NOT EXISTS` for correlated/dynamic divisor sets.",
    explanation: "Following these 5 rules establishes total command over universal relational queries.",
    hint: "Universal quantification, Degree subtraction, 4-step derivation, HAVING COUNT(DISTINCT), Double NOT EXISTS.",
    level: "basic"
  }
];

export default questions;
