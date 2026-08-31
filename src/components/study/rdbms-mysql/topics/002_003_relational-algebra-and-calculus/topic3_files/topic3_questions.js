// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the Rename Operator (ρ) in Relational Algebra?",
    shortAnswer: "A unary operator (denoted by lowercase Greek letter Rho, ρ) that renames a relation, its attributes, or both, without altering the underlying data tuples.",
    explanation: "Identity renaming operator in formal relational algebra.",
    hint: "Unary operator that assigns new names to relations and attributes.",
    level: "basic"
  },
  {
    question: "What SQL keyword directly implements the Rename Operator (ρ)?",
    shortAnswer: "The `AS` keyword (for table aliases and column aliases).",
    explanation: "SQL AS keyword provides relational renaming.",
    hint: "The AS keyword for aliases in SQL.",
    level: "basic"
  },
  {
    question: "What is the mathematical notation to rename a relation $R$ to $S$ without renaming its attributes?",
    shortAnswer: "$$\\rho_S(R)$$.",
    explanation: "Relation-only renaming notation.",
    hint: "ρ_S(R).",
    level: "basic"
  },
  {
    question: "What is the mathematical notation to rename relation $R$ to $S$ AND rename its attributes to $B_1, B_2, \\dots, B_n$?",
    shortAnswer: "$$\\rho_{S(B_1, B_2, \\dots, B_n)}(R)$$.",
    explanation: "Combined relation and attribute positional renaming.",
    hint: "ρ_{S(B_1, B_2, ..., B_n)}(R).",
    level: "basic"
  },
  {
    question: "What is the mathematical notation to rename ONLY the attributes of relation $R$ without renaming the relation itself?",
    shortAnswer: "$$\\rho_{(B_1, B_2, \\dots, B_n)}(R)$$ or $$\\rho_{A/B}(R)$$ (renaming attribute $B$ to $A$).",
    explanation: "Attribute-only positional or replacement renaming notation.",
    hint: "ρ_{(B_1, ..., B_n)}(R) or ρ_{new/old}(R).",
    level: "moderate"
  },
  {
    question: "Why is the Rename operator essential when performing a Self-Join (joining a relation with itself)?",
    shortAnswer: "Because joining a table with itself creates ambiguous identical attribute names (e.g. `Employees.emp_id` and `Employees.emp_id`), which can only be disambiguated by renaming one or both relation instances.",
    explanation: "Disambiguation requirement in recursive joins.",
    hint: "Disambiguates identical column names in self-joins.",
    level: "basic"
  },
  {
    question: "How do you express a self-join in Relational Algebra to find each student and their assigned mentor?",
    shortAnswer: "$$\\text{Students} \\bowtie_{\\text{Students.mentor\\_id} = M.\\text{student\\_id}} \\rho_M(\\text{Students})$$.",
    explanation: "Self-join expression using relation rename.",
    hint: "Students ⨝_{Students.mentor_id = M.student_id} ρ_M(Students).",
    level: "basic",
    codeExample: "SELECT s.full_name AS student, m.full_name AS mentor\nFROM students s\nJOIN students m ON s.mentor_id = m.student_id;"
  },
  {
    question: "What happens if you provide fewer attribute names in $\\rho_{S(B_1, \\dots, B_k)}(R)$ than the degree of relation $R$?",
    shortAnswer: "The expression is mathematically invalid and rejected by the relational engine because positional renaming requires exact 1:1 arity correspondence.",
    explanation: "Arity mismatch error in positional renaming.",
    hint: "Expression is invalid due to arity mismatch.",
    level: "moderate"
  },
  {
    question: "Does the Rename operator (ρ) modify the physical stored data in the database?",
    shortAnswer: "No. The Rename operator is purely a conceptual/logical query-level operation that creates temporary aliases during query evaluation.",
    explanation: "Logical query-level alias semantics.",
    hint: "No, it only creates logical aliases during query execution.",
    level: "basic"
  },
  {
    question: "How does the Rename operator help satisfy 'Union Compatibility' between two relations?",
    shortAnswer: "By renaming attribute names of intermediate relations to match each other before performing Set Union (∪), Intersection (∩), or Difference (−).",
    explanation: "Harmonizing schema headers for set operations.",
    hint: "Aligns column names before set operations.",
    level: "moderate"
  },
  {
    question: "What is the degree (number of columns) of $\\rho_S(R)$ compared to $R$?",
    shortAnswer: "Exactly the same: $\\text{Degree}(\\rho_S(R)) = \\text{Degree}(R)$.",
    explanation: "Degree is strictly preserved.",
    hint: "Degree remains identical.",
    level: "basic"
  },
  {
    question: "What is the cardinality (number of rows) of $\\rho_S(R)$ compared to $R$?",
    shortAnswer: "Exactly the same: $|\\rho_S(R)| = |R|$.",
    explanation: "Cardinality is strictly preserved.",
    hint: "Cardinality remains identical.",
    level: "basic"
  },
  {
    question: "How do you generate all pairs of distinct students from the same city in Relational Algebra?",
    shortAnswer: "$$\\pi_{S_1.\\text{name}, S_2.\\text{name}}(\\sigma_{S_1.\\text{city} = S_2.\\text{city} \\land S_1.\\text{id} < S_2.\\text{id}}(\\rho_{S_1}(\\text{Students}) \\times \\rho_{S_2}(\\text{Students})))$$.",
    explanation: "Pairwise Cartesian product with inequality filter on renamed instances.",
    hint: "Cross product of ρ_S1(Students) and ρ_S2(Students) with id1 < id2 filter.",
    level: "expert",
    codeExample: "SELECT s1.full_name AS student_1, s2.full_name AS student_2\nFROM students s1\nJOIN students s2 ON s1.city = s2.city AND s1.student_id < s2.student_id;"
  },
  {
    question: "Why is the condition $S_1.\\text{id} < S_2.\\text{id}$ used when generating student pairs instead of $S_1.\\text{id} \\neq S_2.\\text{id}$?",
    shortAnswer: "Because $S_1.\\text{id} < S_2.\\text{id}$ eliminates both SELF-PAIRS (Mamata with Mamata) and SYMMETRIC DUPLICATES (e.g. Mamata-Abhronila and Abhronila-Mamata).",
    explanation: "Strict inequality prevents symmetric pair duplication.",
    hint: "Eliminates self-pairing and symmetric duplicate permutations.",
    level: "moderate"
  },
  {
    question: "In what part of an SQL query can column aliases (`AS new_name`) NOT be used directly in MySQL?",
    shortAnswer: "In the `WHERE` clause of the same query block (because the `WHERE` clause is logically evaluated BEFORE the `SELECT` projection list).",
    explanation: "Logical query execution order limitation in SQL.",
    hint: "Cannot be used in the WHERE clause of the same query block.",
    level: "expert"
  },
  {
    question: "Can column aliases defined in `SELECT` be used in `ORDER BY` and `GROUP BY` in MySQL?",
    shortAnswer: "Yes, MySQL allows column aliases in `ORDER BY` and `GROUP BY` because sorting and grouping occur after or during select list evaluation.",
    explanation: "MySQL extension supporting select aliases in grouping and ordering.",
    hint: "Yes, allowed in ORDER BY and GROUP BY in MySQL.",
    level: "moderate"
  },
  {
    question: "What is the equivalent relational algebra expression for SQL `SELECT full_name AS student_name FROM students;`?",
    shortAnswer: "$$\\pi_{\\text{student\\_name}}(\\rho_{(\\text{id}, \\text{student\\_name}, \\text{city}, \\dots)}(\\text{Students}))$$ or generalized projection $$\\pi_{\\text{full\\_name} \→ \\text{student\\_name}}(\\text{Students})$$.",
    explanation: "Attribute renaming in projection.",
    hint: "Generalized projection or rename followed by projection.",
    level: "moderate"
  },
  {
    question: "How does the Rename operator assist in building complex Relational Algebra Query Trees?",
    shortAnswer: "It allows naming intermediate sub-expression nodes (e.g. `Temp1`, `Barrackpore_Students`), making multi-step query trees clean, modular, and readable.",
    explanation: "Modular query tree construction.",
    hint: "Names intermediate query tree nodes for modularity and readability.",
    level: "basic"
  },
  {
    question: "Is the Rename operator Commutative with Selection: $\\rho_S(\\sigma_p(R)) \\equiv \\sigma_{p'}(\\rho_S(R))$?",
    shortAnswer: "Yes, provided the predicate $p'$ uses the renamed attribute names if attribute renaming occurred.",
    explanation: "Commutativity with updated predicate names.",
    hint: "Yes, provided predicate references updated attribute names.",
    level: "expert"
  },
  {
    question: "Is the Rename operator Commutative with Projection: $\\rho_S(\\pi_L(R)) \\equiv \\pi_{L'}(\\rho_S(R))$?",
    shortAnswer: "Yes, provided the projection list $L'$ uses the renamed attribute names.",
    explanation: "Commutativity with updated projection list.",
    hint: "Yes, with corresponding renamed attribute list.",
    level: "expert"
  },
  {
    question: "What is the primary danger of using arbitrary single-letter aliases (like `a`, `b`, `c`, `d`, `e`) in large production SQL queries?",
    shortAnswer: "Severe code unmaintainability, confusion during debugging, and high likelihood of joining the wrong table in multi-table queries.",
    explanation: "Software engineering code quality best practice.",
    hint: "Hurts code readability and increases risk of joining wrong tables.",
    level: "basic"
  },
  {
    question: "How do you rename a subquery in SQL (Derived Table)?",
    shortAnswer: "By placing the subquery inside parentheses followed by the `AS` keyword and alias name: `(SELECT ... FROM ...) AS subquery_alias`.",
    explanation: "Derived table aliasing syntax in SQL.",
    hint: "(SELECT ...) AS alias_name.",
    level: "basic",
    codeExample: "SELECT sub.city, COUNT(*) FROM (SELECT * FROM students WHERE fee > 4000) AS sub GROUP BY sub.city;"
  },
  {
    question: "Why does MySQL require every Derived Table in a `FROM` clause to have an alias?",
    shortAnswer: "Because every intermediate relation in relational algebra must have an unambiguous name so the query engine and outer query can qualify its columns.",
    explanation: "MySQL Error 1248 requirement for derived table aliases.",
    hint: "Every derived table must have a name for column qualification (Error 1248).",
    level: "moderate"
  },
  {
    question: "How does the Rename operator disambiguate attribute names when computing Cartesian Product $\\text{Emp} \\times \\text{Dept}$ where both tables have an attribute named `id`?",
    shortAnswer: "By qualifying the attributes with relation names: $\\text{Emp.id}$ and $\\text{Dept.id}$, or renaming the tables via $\\rho_E(\\text{Emp}) \\times \\rho_D(\\text{Dept})$ to produce $E.\\text{id}$ and $D.\\text{id}$.",
    explanation: "Disambiguation of matching attribute names.",
    hint: "Qualifies matching columns as E.id and D.id.",
    level: "basic"
  },
  {
    question: "Can an attribute be renamed to an existing attribute name in the same relation (e.g. renaming `email` to `name` when `name` already exists)?",
    shortAnswer: "No. A relation cannot have duplicate attribute names within its header schema; doing so violates the relational model definition.",
    explanation: "Duplicate column name prohibition in relational schema.",
    hint: "No, a relation cannot have duplicate attribute names.",
    level: "moderate"
  },
  {
    question: "What is the notation for the Rename operator in Codd's original 1970 specification?",
    shortAnswer: "Codd originally used positional index notation ($R[1], R[2]$); the Greek symbol $\\rho$ (Rho) was formalized in subsequent standard relational algebra textbooks (e.g. Ullman, Elmasri & Navathe).",
    explanation: "Historical evolution of renaming notation.",
    hint: "Greek letter Rho (ρ) formalized by Ullman and standard textbooks.",
    level: "expert"
  },
  {
    question: "How do you rename the output columns of a Common Table Expression (CTE) in SQL?",
    shortAnswer: "`WITH cte_name (new_col1, new_col2) AS (SELECT ...)`; directly corresponds to $\\rho_{\\text{cte}(B_1, B_2)}(R)$.",
    explanation: "CTE explicit column header renaming in SQL.",
    hint: "WITH cte_name (col1, col2) AS (...).",
    level: "moderate",
    codeExample: "WITH barrackpore_summary (city_name, active_count) AS (\n    SELECT city, COUNT(*) FROM students WHERE city = 'Barrackpore' GROUP BY city\n)\nSELECT * FROM barrackpore_summary;"
  },
  {
    question: "What is the relationship between the Rename operator (ρ) and Schema Equivalence?",
    shortAnswer: "Two relations $R$ and $S$ are schema-equivalent under renaming if there exists a bijective mapping between their attributes that preserves domains and functional dependencies.",
    explanation: "Formal schema isomorphism under renaming.",
    hint: "Bijective mapping between attributes preserving domains and dependencies.",
    level: "expert"
  },
  {
    question: "Does the Rename operator incur any computational runtime cost during SQL query execution?",
    shortAnswer: "Virtually zero: renaming is a compile-time metadata operation resolved during query parsing and catalog binding, creating no physical disk or memory copy overhead.",
    explanation: "Zero runtime cost of metadata renaming.",
    hint: "Virtually zero: resolved at compile time with no disk or memory copy.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for using the Rename Operator (ρ)?",
    shortAnswer: "1) Use $\\rho_S(R)$ to rename relations and disambiguate self-joins. 2) Use positional renaming $\\rho_{S(B_1, \\dots, B_n)}(R)$ ensuring exact degree matching. 3) Always provide meaningful table aliases in SQL self-joins (`s1`, `s2`). 4) Always alias derived subqueries in MySQL. 5) Use CTE column lists for clean query restructuring.",
    explanation: "Following these 5 rules guarantees trap-free, clean relational query composition.",
    hint: "Disambiguate self-joins, match degree, meaningful aliases, alias derived subqueries, CTE column lists.",
    level: "basic"
  }
];

export default questions;
