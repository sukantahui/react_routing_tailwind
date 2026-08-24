// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is Generalized Projection (π_{F_1, ..., F_n}) in Extended Relational Algebra?",
    shortAnswer: "An extension of classical projection that allows arithmetic expressions, string operations, scalar functions, and renamed computed values in the projection list.",
    explanation: "Core definition of extended generalized projection.",
    hint: "Extension of projection permitting arithmetic and scalar expressions.",
    level: "basic"
  },
  {
    question: "How does Generalized Projection differ from Classical Projection (π)?",
    shortAnswer: "Classical projection can ONLY extract existing, unmodified attributes; Generalized Projection can create NEW computed attributes from arithmetic or scalar formulas.",
    explanation: "Difference between classical and generalized projection.",
    hint: "Classical only extracts existing columns; Generalized computes new derived values.",
    level: "basic"
  },
  {
    question: "What is the mathematical notation for Generalized Projection with computed expressions?",
    shortAnswer: "$$\\pi_{F_1, F_2, \\dots, F_n}(R)$$, where each $F_i$ is an attribute or expression of the form $E_i \\rightarrow B_i$ (expression $E_i$ renamed to $B_i$).",
    explanation: "Mathematical formalization of generalized projection.",
    hint: "π_{F1, ..., Fn}(R) where Fi is an expression or column.",
    level: "basic"
  },
  {
    question: "What SQL feature directly implements Generalized Projection?",
    shortAnswer: "Expressions, functions, and calculated columns in the `SELECT` list (e.g. `SELECT fee * 1.18 AS fee_with_gst, CONCAT(first_name, ' ', last_name) AS full_name FROM students;`).",
    explanation: "SQL select list expressions implementation.",
    hint: "Calculated expressions in the SELECT list.",
    level: "basic",
    codeExample: "SELECT full_name, admission_fee, admission_fee * 1.18 AS total_fee_with_gst\nFROM students;"
  },
  {
    question: "How do you calculate net salary after a 12% PF deduction using Generalized Projection?",
    shortAnswer: "$$\\pi_{\\text{emp\\_id, name, basic\\_salary, basic\\_salary} \\times 0.88 \\rightarrow \\text{net\\_salary}}(\\text{Employees})$$.",
    explanation: "Arithmetic projection expression.",
    hint: "π_{id, name, salary * 0.88 -> net_salary}(Employees).",
    level: "basic"
  },
  {
    question: "Does Generalized Projection eliminate duplicate rows in pure Relational Algebra?",
    shortAnswer: "Yes! Like classical projection, pure relational algebra treats all relations as mathematical sets and eliminates duplicate output tuples.",
    explanation: "Relational closure and duplicate elimination in set semantics.",
    hint: "Yes, in pure relational algebra it eliminates duplicate tuples.",
    level: "basic"
  },
  {
    question: "Does SQL `SELECT` eliminate duplicates in generalized expressions by default?",
    shortAnswer: "No! SQL uses multiset (bag) semantics by default and retains duplicates unless `SELECT DISTINCT` is explicitly specified.",
    explanation: "Set vs bag semantics in SQL vs Relational Algebra.",
    hint: "No, SQL requires SELECT DISTINCT to remove duplicates.",
    level: "basic"
  },
  {
    question: "How do you express string concatenation in Generalized Projection?",
    shortAnswer: "$$\\pi_{\\text{CONCAT(first\\_name, ' ', last\\_name)} \\rightarrow \\text{full\\_name}}(\\text{Students})$$.",
    explanation: "String scalar generalized projection.",
    hint: "π_{CONCAT(first, ' ', last) -> full_name}(Students).",
    level: "basic"
  },
  {
    question: "What is the degree (arity) of $\\pi_{F_1, F_2, \\dots, F_k}(R)$?",
    shortAnswer: "Exactly $k$ (the number of items in the generalized projection list).",
    explanation: "Degree equals number of projected expressions.",
    hint: "Degree = k.",
    level: "basic"
  },
  {
    question: "How do you guard against Division-by-Zero errors in Generalized Projection expressions in MySQL?",
    shortAnswer: "Using `NULLIF(divisor, 0)`: `SELECT total_score / NULLIF(total_exams, 0) AS average_score FROM scores;`.",
    explanation: "Division by zero handling pattern in SQL.",
    hint: "NULLIF(divisor, 0).",
    level: "moderate",
    codeExample: "SELECT student_id, total_marks / NULLIF(subjects_count, 0) AS gpa\nFROM student_grades;"
  },
  {
    question: "How do you calculate a student's age in years from their Date of Birth in MySQL?",
    shortAnswer: "`TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age_in_years`.",
    explanation: "Date arithmetic scalar function in MySQL.",
    hint: "TIMESTAMPDIFF(YEAR, dob, CURDATE()).",
    level: "basic"
  },
  {
    question: "Can Generalized Projection be composed with other operators like Selection: $\\sigma_{p}(\\pi_{F_1, \\dots, F_n}(R))$?",
    shortAnswer: "Yes! However, predicate $p$ can only reference attributes and aliases produced in the generalized projection list.",
    explanation: "Composition and scoping rules in query pipelines.",
    hint: "Yes, referencing projected expressions/aliases.",
    level: "moderate"
  },
  {
    question: "Can an expression defined in a Generalized Projection be used in the `WHERE` clause of the SAME query in standard SQL?",
    shortAnswer: "No! Because the `WHERE` clause is evaluated before the `SELECT` projection list; you must repeat the expression or wrap it in a CTE/subquery.",
    explanation: "SQL logical query execution order.",
    hint: "No, because WHERE executes before SELECT list projection.",
    level: "expert"
  },
  {
    question: "How does Generalized Projection maintain Relational Closure?",
    shortAnswer: "The output of Generalized Projection is always a formal relation (a set of tuples where each derived column has a determined data type domain).",
    explanation: "Relational closure preservation.",
    hint: "Output is still a valid mathematical relation.",
    level: "basic"
  },
  {
    question: "What is a 'Generated Column' (Virtual or Stored) in MySQL, and how does it relate to Generalized Projection?",
    shortAnswer: "A table column defined by an expression (e.g. `total_fee AS (admission_fee * 1.18) STORED`), which materializes Generalized Projection directly into the physical schema.",
    explanation: "MySQL generated column feature.",
    hint: "A schema-level computed column implementing generalized projection.",
    level: "expert",
    codeExample: "CREATE TABLE student_invoices (\n    invoice_id INT PRIMARY KEY,\n    base_fee DECIMAL(10,2),\n    gst_fee DECIMAL(10,2) AS (base_fee * 0.18) STORED\n);"
  },
  {
    question: "How do you apply conditional logic (e.g. Pass/Fail status) inside Generalized Projection?",
    shortAnswer: "Using the `CASE WHEN` expression: `CASE WHEN score >= 40 THEN 'PASS' ELSE 'FAIL' END AS status`.",
    explanation: "Conditional scalar projection.",
    hint: "CASE WHEN ... THEN ... ELSE ... END.",
    level: "basic",
    codeExample: "SELECT full_name, marks,\n       CASE WHEN marks >= 40 THEN 'PASS' ELSE 'FAIL' END AS result\nFROM students;"
  },
  {
    question: "What is the equivalent relational algebra notation for SQL `CASE WHEN` conditional projection?",
    shortAnswer: "$$\\pi_{\\text{name, IF(marks } \\ge 40, \\text{'PASS', 'FAIL'}) \\rightarrow \\text{result}}(\\text{Students})$$.",
    explanation: "Functional conditional notation in extended relational algebra.",
    hint: "π_{name, IF(marks >= 40, 'PASS', 'FAIL') -> result}(Students).",
    level: "moderate"
  },
  {
    question: "Can Generalized Projection perform aggregate reductions (like SUM or AVG across rows)?",
    shortAnswer: "NO! Generalized Projection operates strictly ROW-BY-ROW (scalar evaluation). Aggregate reductions across multiple rows require the Grouping Operator (𝒢).",
    explanation: "Scalar vs aggregate operator distinction.",
    hint: "No! It operates row-by-row; multi-row aggregation requires the Grouping operator 𝒢.",
    level: "basic"
  },
  {
    question: "How do you format currency values to 2 decimal places in MySQL Generalized Projection?",
    shortAnswer: "`ROUND(amount, 2)` or `FORMAT(amount, 2)`.",
    explanation: "Numeric formatting scalar function.",
    hint: "ROUND(amount, 2) or FORMAT(amount, 2).",
    level: "basic"
  },
  {
    question: "How do you convert all city names to uppercase using Generalized Projection?",
    shortAnswer: "$$\\pi_{\\text{student\\_id, UPPER(city)} \\rightarrow \\text{city\\_upper}}(\\text{Students})$$.",
    explanation: "String scalar function projection.",
    hint: "π_{id, UPPER(city) -> city_upper}(Students).",
    level: "basic"
  },
  {
    question: "What happens if a scalar expression in Generalized Projection references a column containing `NULL`?",
    shortAnswer: "In standard SQL arithmetic (e.g. `fee + NULL`), the entire expression evaluates to `NULL` (NULL propagation).",
    explanation: "NULL propagation in scalar arithmetic.",
    hint: "Expression evaluates to NULL (NULL propagation).",
    level: "basic"
  },
  {
    question: "How do you prevent NULL propagation in arithmetic expressions in MySQL?",
    shortAnswer: "Using the `COALESCE(column, 0)` or `IFNULL(column, 0)` functions.",
    explanation: "NULL substitution pattern in SQL.",
    hint: "COALESCE(col, 0) or IFNULL(col, 0).",
    level: "basic"
  },
  {
    question: "Can Generalized Projection create constant/literal columns: $\\pi_{\\text{id, name, 'Kolkata Campus'} \\rightarrow \\text{branch}}(\\text{Students})$?",
    shortAnswer: "Yes! Literal constants can be projected as fixed-value attributes for all tuples.",
    explanation: "Literal projection in generalized projection.",
    hint: "Yes, projecting literal constants across all rows.",
    level: "basic"
  },
  {
    question: "How does Generalized Projection interact with Query Optimization and Expression Pushdown?",
    shortAnswer: "Optimizers push selections below Generalized Projections when the selection predicate does not depend on the computed expression, minimizing intermediate data processing.",
    explanation: "Algebraic optimization with generalized projection.",
    hint: "Pushes selections down below projections when independent.",
    level: "expert"
  },
  {
    question: "How do you extract the day of the week from a timestamp in Generalized Projection?",
    shortAnswer: "`DAYNAME(admission_date) AS day_of_week`.",
    explanation: "Temporal scalar extraction in SQL.",
    hint: "DAYNAME(date_col).",
    level: "basic"
  },
  {
    question: "What is the arity of $\\pi_{A, B + C \\rightarrow D, E \\times 2 \\rightarrow F}(R(A, B, C, E))$?",
    shortAnswer: "3 attributes ($A$, $D$, and $F$).",
    explanation: "Degree count calculation.",
    hint: "3 attributes.",
    level: "basic"
  },
  {
    question: "Can multiple mathematical operations be chained inside a single projected expression?",
    shortAnswer: "Yes! Any valid mathematical formula (e.g. `(price * quantity) * (1 - discount_pct / 100) * 1.18 AS net_total`) can be projected.",
    explanation: "Compound mathematical expressions in projection.",
    hint: "Yes, compound arithmetic formulas are fully supported.",
    level: "basic"
  },
  {
    question: "How does Generalized Projection assist in preparing data for machine learning models?",
    shortAnswer: "It performs feature engineering inside the database (e.g. standardizing numeric features, calculating ratios, one-hot encoding with `CASE WHEN`, and computing elapsed days).",
    explanation: "In-database feature engineering applications.",
    hint: "Calculates ratios, log transforms, and feature scaling directly in SQL.",
    level: "expert"
  },
  {
    question: "Why did Codd's original 1970 paper omit Generalized Projection?",
    shortAnswer: "Codd focused on the foundational set-theoretic data model and predicate logic; arithmetic and scalar extensions were formalized in subsequent standard relational algebra extensions (e.g. Ullman, Garcia-Molina).",
    explanation: "Historical evolution of relational algebra extensions.",
    hint: "Formalized later to bridge theoretical relational algebra with practical business SQL.",
    level: "expert"
  },
  {
    question: "What is the master checklist for mastering Generalized Projection?",
    shortAnswer: "1) Use $\\pi_{F_1, \\dots, F_n}(R)$ for scalar arithmetic, strings, dates, and discounts. 2) Assign explicit aliases (`AS col_name`) for all expressions. 3) Guard against division by zero with `NULLIF()`. 4) Prevent NULL propagation using `COALESCE()`. 5) Remember it operates row-by-row and does not aggregate across rows.",
    explanation: "Following these 5 rules ensures clean, safe computed column composition.",
    hint: "Scalar arithmetic, Explicit aliases, NULLIF division guard, COALESCE NULL handling, Row-by-row scope.",
    level: "basic"
  }
];

export default questions;
