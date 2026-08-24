// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the Selection Operator (σ) in Relational Algebra?",
    shortAnswer: "A unary relational algebra operator that performs horizontal filtering on a relation, returning only the tuples that satisfy a boolean predicate.",
    explanation: "Core horizontal slicing operator in relational algebra.",
    hint: "Unary operator that filters tuples satisfying a boolean predicate.",
    level: "basic"
  },
  {
    question: "What SQL clause corresponds directly to the Selection Operator (σ)?",
    shortAnswer: "The `WHERE` clause (and `HAVING` clause for post-aggregation row filtering).",
    explanation: "SQL WHERE clause maps to relational selection.",
    hint: "The WHERE clause in SQL.",
    level: "basic"
  },
  {
    question: "What is the degree (number of columns) of $\\sigma_p(R)$ compared to the input relation $R$?",
    shortAnswer: "Exactly the same: $\\text{Degree}(\\sigma_p(R)) = \\text{Degree}(R)$. Selection never modifies the schema or column count.",
    explanation: "Selection is purely horizontal; it does not alter relation degree.",
    hint: "Degree remains unchanged.",
    level: "basic"
  },
  {
    question: "What is the cardinality range of $\\sigma_p(R)$ if relation $R$ has $N$ tuples?",
    shortAnswer: "$$0 \\le |\\sigma_p(R)| \\le N$$.",
    explanation: "Cardinality is bounded between 0 (no matching rows) and N (all rows match).",
    hint: "Between 0 and N tuples.",
    level: "basic"
  },
  {
    question: "What is the Commutative Property of Selection in Relational Algebra?",
    shortAnswer: "$$\\sigma_{p_1}(\\sigma_{p_2}(R)) \\equiv \\sigma_{p_2}(\\sigma_{p_1}(R)) \\equiv \\sigma_{p_1 \\land p_2}(R)$$.",
    explanation: "Order of selection cascading does not affect the final result set.",
    hint: "Cascaded selections can be evaluated in any order or combined with AND (∧).",
    level: "moderate"
  },
  {
    question: "How do you express a selection for students from 'Barrackpore' who have paid a fee greater than ₹5000?",
    shortAnswer: "$$\\sigma_{\\text{city} = 'Barrackpore' \\land \\text{fee} > 5000}(\\text{Students})$$.",
    explanation: "Conjunctive boolean predicate in relational algebra.",
    hint: "σ_{city = 'Barrackpore' ∧ fee > 5000}(Students).",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city = 'Barrackpore' AND fee > 5000;"
  },
  {
    question: "What comparison operators are permitted inside a selection predicate $p$?",
    shortAnswer: "$=, \\neq, <, \\le, >, \\ge$, string pattern matching, and set membership ($\in$).",
    explanation: "Standard scalar comparison predicates.",
    hint: "=, ≠, <, ≤, >, ≥.",
    level: "basic"
  },
  {
    question: "What logical connectives are used to build complex selection predicates?",
    shortAnswer: "Conjunction $\\land$ (AND), Disjunction $\\lor$ (OR), and Negation $\\neg$ (NOT).",
    explanation: "Standard boolean logic connectives.",
    hint: "AND (∧), OR (∨), NOT (¬).",
    level: "basic"
  },
  {
    question: "What is the evaluation precedence among logical connectives $\\neg, \\land, \\lor$?",
    shortAnswer: "1) $\\neg$ (NOT) has the highest precedence, 2) $\\land$ (AND) has middle precedence, 3) $\\lor$ (OR) has the lowest precedence.",
    explanation: "Standard operator precedence in relational algebra and SQL.",
    hint: "NOT > AND > OR.",
    level: "moderate"
  },
  {
    question: "Why is parentheses grouping crucial in `σ_{city = 'Kolkata' ∨ city = 'Barrackpore' ∧ fee > 5000}`?",
    shortAnswer: "Without parentheses, `AND` takes precedence, evaluating `city = 'Kolkata' OR (city = 'Barrackpore' AND fee > 5000)`, which inadvertently includes all Kolkata students regardless of their fee!",
    explanation: "Precedence pitfall in boolean queries.",
    hint: "AND evaluates before OR unless parentheses are used.",
    level: "moderate"
  },
  {
    question: "What is 'Selection Push-Down' (Pushing Selections Down) in query optimization?",
    shortAnswer: "An algebraic optimization heuristic that moves selection operators down the query tree to filter base tables before evaluating expensive Cartesian products or joins.",
    explanation: "Fundamental heuristic query optimization rule.",
    hint: "Filtering base tables early to reduce intermediate join sizes.",
    level: "expert",
    codeExample: "-- Unoptimized: Join all then filter\nSELECT * FROM (students CROSS JOIN courses) WHERE students.city = 'Barrackpore';\n-- Optimized: Filter students first then join\nSELECT * FROM (SELECT * FROM students WHERE city = 'Barrackpore') s CROSS JOIN courses c;"
  },
  {
    question: "Under what condition is $\\sigma_p(R \\bowtie S) \\equiv \\sigma_p(R) \\bowtie S$ valid?",
    shortAnswer: "When the predicate $p$ references ONLY attributes belonging to relation $R$ (and none from relation $S$).",
    explanation: "Equivalence rule for push-down through joins.",
    hint: "When predicate p only involves attributes of relation R.",
    level: "expert"
  },
  {
    question: "How does the Selection operator handle NULL values under Three-Valued Logic (3VL)?",
    shortAnswer: "If an attribute is NULL, comparisons evaluate to `UNKNOWN`; since the Selection operator only keeps tuples where the predicate evaluates strictly to `TRUE`, tuples evaluating to `UNKNOWN` or `FALSE` are discarded.",
    explanation: "Three-valued logic semantics in relational selection.",
    hint: "Discards tuples where predicate evaluates to UNKNOWN or FALSE.",
    level: "moderate"
  },
  {
    question: "How do you select tuples where `phone_number` is NOT NULL in Relational Algebra?",
    shortAnswer: "$$\\sigma_{\\text{phone\\_number} \\neq \\text{NULL}}(\\text{Students})$$ or $$\\sigma_{\\text{phone\\_number IS NOT NULL}}(\\text{Students})$$.",
    explanation: "Null-check predicate in relational algebra.",
    hint: "σ_{phone IS NOT NULL}(Students).",
    level: "basic"
  },
  {
    question: "What is the result of $\\sigma_{\\text{FALSE}}(R)$?",
    shortAnswer: "An EMPTY relation with the exact same attribute schema as $R$ but zero tuples (Cardinality = 0).",
    explanation: "Selection on contradiction predicate.",
    hint: "Empty relation with identical schema.",
    level: "basic"
  },
  {
    question: "What is the result of $\\sigma_{\\text{TRUE}}(R)$?",
    shortAnswer: "The entire original relation $R$ unchanged (Cardinality = $|R|$).",
    explanation: "Identity selection on tautology predicate.",
    hint: "Original relation R unchanged.",
    level: "basic"
  },
  {
    question: "Is Selection an Idempotent operator ($f(f(x)) = f(x)$)?",
    shortAnswer: "Yes: applying the exact same selection condition multiple times yields the exact same result: $\\sigma_p(\\sigma_p(R)) \\equiv \\sigma_p(R)$.",
    explanation: "Mathematical idempotency property.",
    hint: "Yes, σ_p(σ_p(R)) ≡ σ_p(R).",
    level: "moderate"
  },
  {
    question: "How do you select students who are NOT from 'Barrackpore'?",
    shortAnswer: "$$\\sigma_{\\neg(\\text{city} = 'Barrackpore')}(\\text{Students})$$ or $$\\sigma_{\\text{city} \\neq 'Barrackpore'}(\\text{Students})$$.",
    explanation: "Negation predicate in relational selection.",
    hint: "σ_{city ≠ 'Barrackpore'}(Students).",
    level: "basic"
  },
  {
    question: "Can a selection predicate compare two attributes from the SAME relation?",
    shortAnswer: "Yes! For example: $\\sigma_{\\text{bonus} > \\text{salary}}(\\text{Employees})$ or $\\sigma_{\\text{discount\\_price} < \\text{cost\\_price}}(\\text{Products})$.",
    explanation: "Attribute-to-attribute intra-tuple comparison.",
    hint: "Yes, comparing two columns in the same row.",
    level: "basic",
    codeExample: "SELECT * FROM employees WHERE bonus > salary;"
  },
  {
    question: "What is the 'Selectivity Factor' ($s$) of a Selection operator?",
    shortAnswer: "The fraction of tuples from the input relation that satisfy the predicate: $$s = \\frac{|\\sigma_p(R)|}{|R|} \\in [0, 1]$$.",
    explanation: "Cost estimation parameter used by query optimizers.",
    hint: "Fraction of input tuples satisfying the predicate.",
    level: "expert"
  },
  {
    question: "How does a database index (e.g. B-Tree on `city`) optimize $\\sigma_{\\text{city} = 'Barrackpore'}(\\text{Students})$?",
    shortAnswer: "Instead of performing a full-table scan ($O(N)$), the engine traverses the B-Tree index in $O(\\log N)$ to find the matching tuple pointers directly.",
    explanation: "Physical execution acceleration via B-Tree indexes.",
    hint: "Replaces O(N) full table scan with O(log N) index search.",
    level: "moderate"
  },
  {
    question: "Can Selection be distributed over Set Union: $\\sigma_p(R \\cup S)$?",
    shortAnswer: "Yes: $\\sigma_p(R \\cup S) \\equiv \\sigma_p(R) \\cup \\sigma_p(S)$.",
    explanation: "Distributive property of selection over union.",
    hint: "Yes: σ_p(R ∪ S) ≡ σ_p(R) ∪ σ_p(S).",
    level: "expert"
  },
  {
    question: "Can Selection be distributed over Set Intersection: $\\sigma_p(R \\cap S)$?",
    shortAnswer: "Yes: $\\sigma_p(R \\cap S) \\equiv \\sigma_p(R) \\cap \\sigma_p(S) \\equiv \\sigma_p(R) \\cap S \\equiv R \\cap \\sigma_p(S)$.",
    explanation: "Distributive property of selection over intersection.",
    hint: "Yes: σ_p(R ∩ S) ≡ σ_p(R) ∩ σ_p(S).",
    level: "expert"
  },
  {
    question: "Can Selection be distributed over Set Difference: $\\sigma_p(R - S)$?",
    shortAnswer: "Yes: $\\sigma_p(R - S) \\equiv \\sigma_p(R) - \\sigma_p(S) \\equiv \\sigma_p(R) - S$.",
    explanation: "Distributive property of selection over set difference.",
    hint: "Yes: σ_p(R - S) ≡ σ_p(R) - S.",
    level: "expert"
  },
  {
    question: "How do you select students whose name starts with 'M' in Relational Algebra?",
    shortAnswer: "$$\\sigma_{\\text{full\\_name LIKE 'M%'}}(\\text{Students})$$.",
    explanation: "Pattern matching predicate in extended relational algebra.",
    hint: "σ_{full_name LIKE 'M%'}(Students).",
    level: "basic"
  },
  {
    question: "How do you select students aged between 18 and 25 inclusive?",
    shortAnswer: "$$\\sigma_{\\text{age} \\ge 18 \\land \\text{age} \\le 25}(\\text{Students})$$ or $$\\sigma_{\\text{age BETWEEN 18 AND 25}}(\\text{Students})$$.",
    explanation: "Range predicate in relational selection.",
    hint: "σ_{age ≥ 18 ∧ age ≤ 25}(Students).",
    level: "basic"
  },
  {
    question: "What happens when a Selection predicate contains a subquery in SQL?",
    shortAnswer: "In relational algebra, subquery selections (e.g. `WHERE salary > (SELECT AVG(salary)...)`) are modeled using Semi-joins ($\ltimes$) or Theta Joins with aggregated views.",
    explanation: "Relational algebraic modeling of subquery filters.",
    hint: "Modeled as semi-joins or theta joins with aggregated relations.",
    level: "expert"
  },
  {
    question: "Why should developers avoid writing `WHERE YEAR(admission_date) = 2026` instead of `WHERE admission_date >= '2026-01-01' AND admission_date < '2027-01-01'`?",
    shortAnswer: "Because wrapping the indexed column in a function (`YEAR()`) makes the predicate NON-SARGABLE, preventing MySQL from using the B-Tree index and forcing a slow full-table scan.",
    explanation: "SARGable vs non-SARGable selection predicates.",
    hint: "Function on indexed column prevents B-Tree index range scans (non-SARGable).",
    level: "expert"
  },
  {
    question: "What is the difference between Selection (σ) in pure Relational Algebra and the `WHERE` clause in SQL regarding duplicates?",
    shortAnswer: "Both filter rows identically based on boolean conditions, but in pure Relational Algebra the resulting relation is a pure mathematical set, while in SQL duplicate rows satisfying the predicate are preserved.",
    explanation: "Set vs multiset row filtering semantics.",
    hint: "Both filter rows identically, but SQL preserves duplicate satisfying rows.",
    level: "moderate"
  },
  {
    question: "What is the recommended checklist for mastering the Selection Operator (σ)?",
    shortAnswer: "1) Understand that Selection is purely horizontal (degree remains identical). 2) Master complex predicates with $\\land, \\lor, \\neg$ and parentheses. 3) Apply the commutative property $\\sigma_{p_1}(\\sigma_{p_2}(R)) \\equiv \\sigma_{p_1 \\land p_2}(R)$. 4) Always push selections down through joins in query trees. 5) Write SARGable predicates in SQL to enable index range scans.",
    explanation: "Following these 5 rules ensures master-level understanding of relational filtering.",
    hint: "Horizontal filtering, Boolean precedence with parentheses, Commutativity, Selection push-down, SARGable predicates.",
    level: "basic"
  }
];

export default questions;
