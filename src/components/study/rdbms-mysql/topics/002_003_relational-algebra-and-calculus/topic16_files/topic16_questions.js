// topic16_files/topic16_questions.js

const questions = [
  {
    question: "How does the Relational Algebra Selection operator (σ) translate into SQL?",
    shortAnswer: "It translates directly to the `WHERE` clause: $$\\sigma_{\\text{city='Barrackpore'}}(\\text{Students}) \→ \\text{SELECT * FROM students WHERE city = 'Barrackpore'};$$.",
    explanation: "Selection to WHERE clause translation.",
    hint: "Translates to the SQL WHERE clause.",
    level: "basic"
  },
  {
    question: "How does the Relational Algebra Projection operator (π) translate into SQL?",
    shortAnswer: "It translates to the `SELECT` column list. If strict set deduplication is required, it translates to `SELECT DISTINCT`: $$\\pi_{\\text{city}}(\\text{Students}) \→ \\text{SELECT DISTINCT city FROM students;}$$.",
    explanation: "Projection to SELECT DISTINCT translation.",
    hint: "Translates to SELECT or SELECT DISTINCT.",
    level: "basic"
  },
  {
    question: "How does the Relational Algebra Rename operator (ρ) translate into SQL?",
    shortAnswer: "It translates to table and column aliases via the `AS` keyword: $$\\rho_S(R) \→ \\text{FROM R AS S}$$, and $$\\rho_{B/A}(R) \→ \\text{SELECT A AS B FROM R;}$$.",
    explanation: "Rename to AS keyword translation.",
    hint: "Translates to the AS keyword for table and column aliases.",
    level: "basic"
  },
  {
    question: "How does the Cartesian Product (×) translate into SQL?",
    shortAnswer: "It translates to `CROSS JOIN` or the comma syntax: $$R \\times S \→ \\text{SELECT * FROM R CROSS JOIN S;}$$.",
    explanation: "Cartesian product to CROSS JOIN translation.",
    hint: "Translates to CROSS JOIN.",
    level: "basic"
  },
  {
    question: "How does an Equijoin (⨝_θ) translate into SQL?",
    shortAnswer: "It translates to `INNER JOIN ... ON`: $$R \\bowtie_{R.A = S.B} S \→ \\text{SELECT * FROM R JOIN S ON R.A = S.B;}$$.",
    explanation: "Equijoin to INNER JOIN ON translation.",
    hint: "Translates to INNER JOIN ... ON condition.",
    level: "basic"
  },
  {
    question: "How does a Natural Join (⨝) translate into SQL?",
    shortAnswer: "It translates to `NATURAL JOIN` or `JOIN ... USING (attribute_list)`: $$R \\bowtie S \→ \\text{SELECT * FROM R JOIN S USING (student\\_id);}$$.",
    explanation: "Natural join to JOIN USING translation.",
    hint: "Translates to NATURAL JOIN or JOIN ... USING.",
    level: "basic"
  },
  {
    question: "How does Set Union (∪) translate into SQL?",
    shortAnswer: "It translates to `UNION` (which eliminates duplicates automatically) or `UNION ALL` (if duplicate preservation is acceptable): $$R \\cup S \→ \\text{SELECT * FROM R UNION SELECT * FROM S;}$$.",
    explanation: "Set union to SQL UNION translation.",
    hint: "Translates to UNION in SQL.",
    level: "basic"
  },
  {
    question: "How does Set Intersection (∩) translate into SQL in modern MySQL 8.0.31+?",
    shortAnswer: "It translates to `INTERSECT`: $$R \\cap S \→ \\text{SELECT * FROM R INTERSECT SELECT * FROM S;}$$.",
    explanation: "Set intersection to INTERSECT translation.",
    hint: "Translates to INTERSECT.",
    level: "basic"
  },
  {
    question: "How does Set Difference (−) translate into SQL in modern MySQL 8.0.31+?",
    shortAnswer: "It translates to `EXCEPT`: $$R - S \→ \\text{SELECT * FROM R EXCEPT SELECT * FROM S;}$$.",
    explanation: "Set difference to EXCEPT translation.",
    hint: "Translates to EXCEPT in SQL.",
    level: "basic"
  },
  {
    question: "How does a Semijoin (⋉) translate into SQL?",
    shortAnswer: "It translates to a `WHERE EXISTS (subquery)` or `WHERE id IN (subquery)`: $$R \\ltimes S \→ \\text{SELECT * FROM R WHERE EXISTS (SELECT 1 FROM S WHERE R.id = S.id);}$$.",
    explanation: "Semijoin to WHERE EXISTS translation.",
    hint: "Translates to WHERE EXISTS (SELECT 1 FROM S ...).",
    level: "basic"
  },
  {
    question: "How does an Antijoin (▷) translate into SQL?",
    shortAnswer: "It translates to `WHERE NOT EXISTS (subquery)` or a Left Anti-Join: $$R \\triangleright S \→ \\text{SELECT R.* FROM R LEFT JOIN S ON R.id = S.id WHERE S.id IS NULL;}$$.",
    explanation: "Antijoin to WHERE NOT EXISTS or Left Anti-Join translation.",
    hint: "Translates to WHERE NOT EXISTS or LEFT JOIN ... WHERE IS NULL.",
    level: "basic"
  },
  {
    question: "How does the Relational Division operator (÷) translate into SQL?",
    shortAnswer: "It translates into a `GROUP BY ... HAVING COUNT(DISTINCT ...) = (SELECT COUNT(*) FROM S)` query or a Double `NOT EXISTS` pattern.",
    explanation: "Division to GROUP BY HAVING translation.",
    hint: "Translates to GROUP BY HAVING COUNT(DISTINCT) or Double NOT EXISTS.",
    level: "moderate"
  },
  {
    question: "How does Generalized Projection ($\pi_{F_1, \dots, F_n}$) translate into SQL?",
    shortAnswer: "It translates to calculated expressions, arithmetic formulas, and scalar functions in the `SELECT` list: $$\\pi_{\\text{name, fee} \\times 1.18 \→ \\text{total}}(R) \→ \\text{SELECT name, fee * 1.18 AS total FROM R;}$$.",
    explanation: "Generalized projection to calculated SELECT columns translation.",
    hint: "Translates to arithmetic expressions with AS aliases in the SELECT list.",
    level: "basic"
  },
  {
    question: "How does the Grouping Operator (${}_G \mathcal{G}_F$) translate into SQL?",
    shortAnswer: "It translates to `GROUP BY` and aggregate functions: $${}_{\\text{city}} \\mathcal{G}_{\\text{COUNT}(*), \\text{AVG}(\\text{fee})}(R) \→ \\text{SELECT city, COUNT(*), AVG(fee) FROM R GROUP BY city;}$$.",
    explanation: "Grouping operator to GROUP BY translation.",
    hint: "Translates to GROUP BY with aggregate functions.",
    level: "basic"
  },
  {
    question: "How does Selection over Grouping ($\\sigma_c({}_G \mathcal{G}_F)$) translate into SQL?",
    shortAnswer: "It translates to the `HAVING` clause: $$\\sigma_{\\text{cnt} \\ge 2}({}_{\\text{city}} \\mathcal{G}_{\\text{COUNT}(*) \→ \\text{cnt}}(R)) \→ \\text{SELECT city, COUNT(*) FROM R GROUP BY city HAVING COUNT(*) >= 2;}$$.",
    explanation: "Selection over grouping to HAVING clause translation.",
    hint: "Translates to the HAVING clause in SQL.",
    level: "basic"
  },
  {
    question: "How does a Left Outer Join (⟕) translate into SQL?",
    shortAnswer: "It translates to `LEFT OUTER JOIN` (or `LEFT JOIN`): $$R \\mathbin{\\unicode{x27D5}} S \→ \\text{SELECT * FROM R LEFT JOIN S ON R.id = S.id;}$$.",
    explanation: "Left outer join to LEFT JOIN translation.",
    hint: "Translates to LEFT JOIN ... ON.",
    level: "basic"
  },
  {
    question: "How does a Right Outer Join (⟖) translate into SQL?",
    shortAnswer: "It translates to `RIGHT OUTER JOIN` (or `RIGHT JOIN`): $$R \\mathbin{\\unicode{x27D6}} S \→ \\text{SELECT * FROM R RIGHT JOIN S ON R.id = S.id;}$$.",
    explanation: "Right outer join to RIGHT JOIN translation.",
    hint: "Translates to RIGHT JOIN ... ON.",
    level: "basic"
  },
  {
    question: "How does a Full Outer Join (⟗) translate into MySQL?",
    shortAnswer: "Since MySQL lacks native `FULL OUTER JOIN`, it is translated as a `UNION` of a `LEFT JOIN` and a `RIGHT JOIN`: `(SELECT * FROM R LEFT JOIN S ON ...) UNION (SELECT * FROM R RIGHT JOIN S ON ...);`.",
    explanation: "Full outer join MySQL UNION emulation translation.",
    hint: "Translates to LEFT JOIN ... UNION ... RIGHT JOIN in MySQL.",
    level: "moderate"
  },
  {
    question: "What is the equivalent SQL query for: $\\pi_{\\text{full\\_name}}(\\sigma_{\\text{city='Kolkata' \\land fee > 4000}}(\\text{Students}))$?",
    shortAnswer: "`SELECT full_name FROM students WHERE city = 'Kolkata' AND admission_fee > 4000;`.",
    explanation: "Basic selection and projection translation.",
    hint: "SELECT full_name FROM students WHERE city = 'Kolkata' AND admission_fee > 4000.",
    level: "basic"
  },
  {
    question: "What is the equivalent SQL query for: $\\text{Students} \\bowtie_{\\text{Students.student\\_id} = \\text{Enrollments.student\\_id}} \\text{Enrollments}$?",
    shortAnswer: "`SELECT * FROM students s JOIN enrollments e ON s.student_id = e.student_id;`.",
    explanation: "Equijoin translation.",
    hint: "SELECT * FROM students JOIN enrollments ON students.student_id = enrollments.student_id.",
    level: "basic"
  },
  {
    question: "How do you translate a 3-table relational algebra expression: $\\pi_{\\text{name, title}}(\\text{Students} \\bowtie \\text{Enrollments} \\bowtie \\text{Courses})$ into SQL?",
    shortAnswer: "`SELECT s.full_name, c.course_title FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id;`.",
    explanation: "3-table chained join translation.",
    hint: "Chains 2 INNER JOINs projecting name and title.",
    level: "basic"
  },
  {
    question: "What is the equivalent SQL query for: ${}_{\\text{city}} \\mathcal{G}_{\\text{COUNT}(*) \→ \\text{total}}(\\sigma_{\\text{fee} > 4000}(\\text{Students}))$?",
    shortAnswer: "`SELECT city, COUNT(*) AS total FROM students WHERE admission_fee > 4000 GROUP BY city;`.",
    explanation: "Filtered grouped aggregation translation.",
    hint: "SELECT city, COUNT(*) FROM students WHERE fee > 4000 GROUP BY city.",
    level: "moderate"
  },
  {
    question: "Why does translating $\\pi_A(R)$ to `SELECT A FROM R` sometimes produce duplicate rows in SQL?",
    shortAnswer: "Because SQL is based on Multiset (bag) theory by default, while Relational Algebra is based on pure Set theory; use `SELECT DISTINCT` to enforce exact set semantics.",
    explanation: "Set vs bag semantic translation discrepancy.",
    hint: "SQL uses multiset semantics by default; use SELECT DISTINCT for set semantics.",
    level: "basic"
  },
  {
    question: "How do you translate a Self-Join query in Relational Algebra: $\\text{Employees} \\bowtie_{\\text{manager\\_id} = \\text{mgr.id}} \\rho_{\\text{mgr}}(\\text{Employees})$?",
    shortAnswer: "`SELECT e.full_name AS employee, m.full_name AS manager FROM employees e JOIN employees m ON e.manager_id = m.emp_id;`.",
    explanation: "Self-join translation with table aliasing.",
    hint: "FROM employees e JOIN employees m ON e.manager_id = m.emp_id.",
    level: "basic"
  },
  {
    question: "What is the equivalent SQL query for finding all students who took ALL core courses: $\\pi_{\\text{student\\_id, course\\_id}}(\\text{Enrollments}) \\div \\text{Core\\_Courses}$?",
    shortAnswer: "`SELECT student_id FROM enrollments WHERE course_id IN (SELECT course_id FROM core_courses) GROUP BY student_id HAVING COUNT(DISTINCT course_id) = (SELECT COUNT(*) FROM core_courses);`.",
    explanation: "Relational division to SQL translation.",
    hint: "GROUP BY student_id HAVING COUNT(DISTINCT course_id) = (SELECT COUNT(*) FROM core_courses).",
    level: "moderate"
  },
  {
    question: "How is an Antijoin translated in SQL using a Left Outer Join?",
    shortAnswer: "`SELECT s.* FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id WHERE e.student_id IS NULL;`.",
    explanation: "Antijoin to Left Anti-Join translation pattern.",
    hint: "LEFT JOIN ... WHERE right_table.pk IS NULL.",
    level: "basic"
  },
  {
    question: "How do you translate a nested selection and projection inside a CTE in SQL?",
    shortAnswer: "`WITH sub AS (SELECT col1, col2 FROM table WHERE condition) SELECT * FROM sub;` corresponds to defining an intermediate named relation $\\rho_{\\text{sub}}(\\pi_{L}(\\sigma_c(R)))$.",
    explanation: "CTE translation of intermediate relational algebra expressions.",
    hint: "WITH cte_name AS (SELECT ...) corresponds to a named intermediate relation.",
    level: "moderate"
  },
  {
    question: "What is the 5-step systematic workflow for translating any Relational Algebra expression to SQL?",
    shortAnswer: "1) Identify base tables $\→$ `FROM`. 2) Identify joins $\→$ `JOIN ... ON`. 3) Identify row selections $\→$ `WHERE`. 4) Identify group aggregates $\→$ `GROUP BY` and `HAVING`. 5) Identify projections $\→$ `SELECT`.",
    explanation: "Universal 5-step translation algorithm.",
    hint: "FROM → JOIN → WHERE → GROUP BY/HAVING → SELECT.",
    level: "basic"
  },
  {
    question: "Why is understanding Relational Algebra to SQL translation critical for software engineers?",
    shortAnswer: "Because it allows engineers to understand how the RDBMS query optimizer deconstructs, rewrites, and executes declarative SQL statements under the hood.",
    explanation: "Professional relevance of formal relational translation.",
    hint: "Enables understanding how SQL optimizers deconstruct and execute queries.",
    level: "basic"
  },
  {
    question: "What is the master checklist for translating Relational Algebra to SQL?",
    shortAnswer: "1) $\\sigma \→$ `WHERE`. 2) $\\pi \→$ `SELECT` (add `DISTINCT` for sets). 3) $\\bowtie \→$ `INNER JOIN`. 4) $\\mathbin{\\unicode{x27D5}} \→$ `LEFT JOIN`. 5) $\\ltimes \→$ `WHERE EXISTS`. 6) $\\triangleright \→$ `WHERE NOT EXISTS`. 7) $\\div \→$ `GROUP BY ... HAVING COUNT(DISTINCT)`. 8) ${}_G \\mathcal{G} \→$ `GROUP BY`.",
    explanation: "Master translation rosetta stone summary.",
    hint: "σ->WHERE, π->SELECT, ⨝->JOIN, ⟕->LEFT JOIN, ⋉->EXISTS, ▷->NOT EXISTS, ÷->HAVING COUNT, 𝒢->GROUP BY.",
    level: "basic"
  }
];

export default questions;
