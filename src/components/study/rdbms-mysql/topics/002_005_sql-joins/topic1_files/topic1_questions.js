// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is an INNER JOIN in SQL?",
    shortAnswer: "A relational join operation that returns only those rows where there is a matching value in both the left and right tables based on the join predicate.",
    explanation: "Standard definition of INNER JOIN.",
    hint: "Returns only rows that have matching values in both tables.",
    level: "basic"
  },
  {
    question: "Is the keyword 'INNER' mandatory when writing an inner join in MySQL?",
    shortAnswer: "NO. In MySQL and standard ANSI SQL, `JOIN` without any prefix defaults directly to `INNER JOIN`.",
    explanation: "Optional nature of the INNER keyword.",
    hint: "No, JOIN and INNER JOIN are completely identical.",
    level: "basic"
  },
  {
    question: "What is the ANSI SQL-92 recommended syntax for an INNER JOIN?",
    shortAnswer: "`SELECT ... FROM tableA a INNER JOIN tableB b ON a.key = b.key;`",
    explanation: "Standard ANSI-92 syntax.",
    hint: "tableA INNER JOIN tableB ON condition.",
    level: "basic"
  },
  {
    question: "What happens to rows in Table A that have a NULL value in the join column during an INNER JOIN?",
    shortAnswer: "They are completely excluded from the result set because `NULL = value` evaluates to `UNKNOWN`.",
    explanation: "NULL handling in INNER JOIN predicates.",
    hint: "They are excluded because NULL comparisons evaluate to UNKNOWN.",
    level: "basic"
  },
  {
    question: "What happens to rows in Table B that have no matching rows in Table A during an INNER JOIN?",
    shortAnswer: "They are discarded and do not appear in the final output.",
    explanation: "Unmatched row handling in INNER JOIN.",
    hint: "They are discarded from the output.",
    level: "basic"
  },
  {
    question: "What is an Equi-Join?",
    shortAnswer: "An inner join that uses the equality operator (`=`) in its join condition (e.g. `ON s.course_id = c.course_id`).",
    explanation: "Definition of equi-join.",
    hint: "A join that uses the equality (=) operator.",
    level: "basic"
  },
  {
    question: "How do you join two tables that share a composite primary key / composite foreign key?",
    shortAnswer: "By combining multiple equality conditions using the `AND` operator in the `ON` clause: `ON a.id = b.id AND a.year = b.year`.",
    explanation: "Composite key join syntax.",
    hint: "Use the AND operator in the ON clause.",
    level: "basic"
  },
  {
    question: "What is the difference between legacy comma syntax (`FROM A, B WHERE A.id = B.id`) and ANSI `INNER JOIN ... ON`?",
    shortAnswer: "ANSI syntax clearly separates table relationship logic (`ON`) from row filtering logic (`WHERE`), avoiding accidental Cartesian explosions if filters are forgotten.",
    explanation: "ANSI-92 vs legacy comma syntax comparison.",
    hint: "ANSI syntax separates join matching from row filtering and prevents accidental Cartesian products.",
    level: "basic"
  },
  {
    question: "In academy management, if `students` has 4 rows (one with NULL course) and `courses` has 3 rows (one with 0 students), how many rows does `students INNER JOIN courses` return?",
    shortAnswer: "3 rows (only the students with valid matching courses).",
    explanation: "Concrete calculation of inner join row count.",
    hint: "3 matching rows.",
    level: "basic"
  },
  {
    question: "Can an INNER JOIN return more rows than exist in either individual table?",
    shortAnswer: "YES! In a one-to-many or many-to-many relationship, if 1 parent row matches 5 child rows, the result set will contain 5 rows.",
    explanation: "Row proliferation in 1:N and M:N inner joins.",
    hint: "Yes, in 1:N or M:N relationships matching multiple rows.",
    level: "moderate"
  },
  {
    question: "Why should table aliases be used in SQL join queries?",
    shortAnswer: "To keep SQL queries concise, improve readability, and prevent ambiguous column name errors.",
    explanation: "Purpose of table aliases.",
    hint: "Improves readability and prevents ambiguous column errors.",
    level: "basic"
  },
  {
    question: "What error does MySQL raise if you select a non-prefixed column name that exists in both joined tables?",
    shortAnswer: "ERROR 1052 (23000): Column 'column_name' in field list is ambiguous.",
    explanation: "MySQL ambiguous column error code.",
    hint: "Error 1052: Column is ambiguous.",
    level: "basic"
  },
  {
    question: "Is `INNER JOIN` commutative in relational algebra (i.e. is A ⋈ B equal to B ⋈ A)?",
    shortAnswer: "YES. The tuples returned are identical regardless of table ordering, and the query optimizer selects the optimal driving table automatically.",
    explanation: "Commutativity of inner join.",
    hint: "Yes, INNER JOIN is commutative.",
    level: "basic"
  },
  {
    question: "Is `INNER JOIN` associative (i.e. is (A ⋈ B) ⋈ C equal to A ⋈ (B ⋈ C))?",
    shortAnswer: "YES. Multi-table inner joins can be reordered by the query optimizer to minimize intermediate row sets.",
    explanation: "Associativity of inner join.",
    hint: "Yes, INNER JOIN is associative.",
    level: "moderate"
  },
  {
    question: "What is the effect of placing a filter condition in the `ON` clause versus the `WHERE` clause in an `INNER JOIN`?",
    shortAnswer: "In an `INNER JOIN`, both produce identical results because unmatched rows are discarded regardless of where the condition is placed.",
    explanation: "ON vs WHERE equivalence in INNER JOIN.",
    hint: "Produces identical results in an INNER JOIN.",
    level: "moderate"
  },
  {
    question: "Why is it best practice to keep table matching in `ON` and business filters in `WHERE`?",
    shortAnswer: "For semantic clarity and consistency, especially when transitioning queries between INNER JOIN and OUTER JOIN.",
    explanation: "Code cleanliness and refactoring safety.",
    hint: "Improves readability and prevents bugs when switching to outer joins.",
    level: "basic"
  },
  {
    question: "What happens if the data types of the join columns do not match (e.g. `VARCHAR` joined to `INT`)?",
    shortAnswer: "MySQL performs implicit type casting on every row, preventing index lookups and causing full table scans.",
    explanation: "Type mismatch performance penalty in joins.",
    hint: "Forces implicit type casting and disables index lookups.",
    level: "moderate"
  },
  {
    question: "How can you verify that an INNER JOIN is utilizing an index in MySQL?",
    shortAnswer: "Run `EXPLAIN SELECT ...` and check that the `type` column shows `ref`, `eq_ref`, or `const`, and `key` lists the index name.",
    explanation: "EXPLAIN output interpretation for joins.",
    hint: "Check EXPLAIN for type='ref' or 'eq_ref' and the key used.",
    level: "basic"
  },
  {
    question: "In e-commerce, write an INNER JOIN query connecting `customers`, `orders`, and `order_items`.",
    shortAnswer: "`SELECT * FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN order_items oi ON o.order_id = oi.order_id;`",
    explanation: "Three-table inner join syntax.",
    hint: "Chain two INNER JOIN ... ON clauses.",
    level: "basic"
  },
  {
    question: "What is the difference between an `INNER JOIN` and a `CROSS JOIN`?",
    shortAnswer: "A `CROSS JOIN` returns all possible row pairings (Cartesian product), whereas an `INNER JOIN` returns only pairings that satisfy the `ON` predicate.",
    explanation: "INNER JOIN vs CROSS JOIN distinction.",
    hint: "CROSS JOIN returns all pairs; INNER JOIN filters by ON condition.",
    level: "basic"
  },
  {
    question: "Can an `INNER JOIN` be performed on non-key columns?",
    shortAnswer: "YES. You can join tables on any compatible columns (e.g. `ON s.city = c.center_city`), though unindexed columns will run slower.",
    explanation: "Joining on arbitrary non-key attributes.",
    hint: "Yes, you can join on any matching columns.",
    level: "basic"
  },
  {
    question: "What is a 'Self-Equi Join'?",
    shortAnswer: "An inner join where a table is joined to itself using two different aliases (e.g. `employees e INNER JOIN employees m ON e.manager_id = m.emp_id`).",
    explanation: "Definition of self inner join.",
    hint: "Joining a table to itself using two aliases.",
    level: "moderate"
  },
  {
    question: "What does the `STRAIGHT_JOIN` keyword do in MySQL?",
    shortAnswer: "It forces MySQL to join tables in the exact order they are listed in the `FROM` clause, overriding the optimizer's choice.",
    explanation: "STRAIGHT_JOIN optimizer hint.",
    hint: "Forces MySQL to join tables in the exact written order.",
    level: "expert"
  },
  {
    question: "In hospital management, how do you query doctors and their assigned wards using an INNER JOIN?",
    shortAnswer: "`SELECT d.doc_name, w.ward_name FROM doctors d INNER JOIN wards w ON d.ward_id = w.ward_id;`",
    explanation: "Healthcare inner join example.",
    hint: "Join doctors and wards on ward_id.",
    level: "basic"
  },
  {
    question: "Why should `SELECT *` be avoided in production INNER JOIN queries?",
    shortAnswer: "Because it pulls redundant join key columns and all non-essential attributes, increasing memory consumption and network I/O.",
    explanation: "Performance impact of SELECT * in joins.",
    hint: "Increases bandwidth and memory usage by fetching unnecessary columns.",
    level: "basic"
  },
  {
    question: "What is an Equi-Join vs a Non-Equi Join?",
    shortAnswer: "An Equi-Join uses equality (`=`), whereas a Non-Equi Join uses inequality or range operators (`>`, `<`, `BETWEEN`).",
    explanation: "Equi vs Non-equi join classification.",
    hint: "Equi-join uses =; Non-equi join uses >, <, BETWEEN.",
    level: "basic"
  },
  {
    question: "If an INNER JOIN between two tables returns 0 rows, what are the possible causes?",
    shortAnswer: "1. No matching keys exist between the tables; 2. Join columns contain NULLs; 3. Data type mismatch; or 4. A `WHERE` filter eliminated all rows.",
    explanation: "Troubleshooting empty inner join results.",
    hint: "Key mismatch, NULL values, type mismatch, or strict WHERE filters.",
    level: "basic"
  },
  {
    question: "What is the primary benefit of creating a Foreign Key index for INNER JOIN queries?",
    shortAnswer: "It allows the database engine to locate matching rows in logarithmic $O(\\log N)$ or constant $O(1)$ time rather than performing $O(N)$ full table scans.",
    explanation: "Index lookup speedup in joins.",
    hint: "Enables fast O(log N) or O(1) index lookups instead of full table scans.",
    level: "moderate"
  },
  {
    question: "Can an INNER JOIN query be combined with aggregate functions like `COUNT()` and `GROUP BY`?",
    shortAnswer: "YES. You can join tables and group the result to compute metrics such as total orders per customer or enrolled students per course.",
    explanation: "Joining with aggregation.",
    hint: "Yes, very common for summary reporting.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding INNER JOIN?",
    shortAnswer: "INNER JOIN is the standard tool for querying related data across tables where matching values exist in both; always use explicit ANSI `INNER JOIN ... ON` syntax and ensure join columns are indexed for optimal speed.",
    explanation: "Final summary conclusion for Topic 1 in Module 5.",
    hint: "Standard tool for matching records across tables; use explicit ANSI syntax and indexed join columns.",
    level: "basic"
  }
];

export default questions;
