// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is a RIGHT (OUTER) JOIN in SQL?",
    shortAnswer: "A relational join operation that returns all records from the right table, along with matched records from the left table; unmatched left columns are populated with NULLs.",
    explanation: "Standard definition of RIGHT JOIN.",
    hint: "Preserves all right table rows and fills unmatched left columns with NULL.",
    level: "basic"
  },
  {
    question: "Is the keyword 'OUTER' mandatory in a RIGHT JOIN in MySQL?",
    shortAnswer: "NO. In MySQL and ANSI SQL, `RIGHT JOIN` and `RIGHT OUTER JOIN` are completely identical.",
    explanation: "Optional nature of the OUTER keyword in RIGHT JOIN.",
    hint: "No, RIGHT JOIN and RIGHT OUTER JOIN are identical.",
    level: "basic"
  },
  {
    question: "In relational algebra, what symbol represents the Right Outer Join?",
    shortAnswer: "The bowtie with two right-pointing horizontal prongs (⟖).",
    explanation: "Relational algebra notation for Right Outer Join.",
    hint: "Right bowtie symbol (⟖).",
    level: "basic"
  },
  {
    question: "How can every RIGHT JOIN query be rewritten as a LEFT JOIN?",
    shortAnswer: "By swapping the order of the two tables in the `FROM` clause: `A RIGHT JOIN B` becomes `B LEFT JOIN A`.",
    explanation: "Conversion rule between RIGHT and LEFT joins.",
    hint: "Swap table order: B LEFT JOIN A.",
    level: "basic"
  },
  {
    question: "Why do most engineering teams and SQL style guides prefer `LEFT JOIN` over `RIGHT JOIN`?",
    shortAnswer: "Because left-to-right reading order is more natural and intuitive, and mixing LEFT and RIGHT joins in multi-table queries creates confusing precedence rules.",
    explanation: "Style guide preference for LEFT JOIN.",
    hint: "Improves readability and prevents confusing join precedence.",
    level: "basic"
  },
  {
    question: "In academy management, if `students` has 2 rows and `courses` has 3 rows (one course with 0 students), how many rows does `students RIGHT JOIN courses` return?",
    shortAnswer: "3 rows (all 3 courses are guaranteed to appear).",
    explanation: "Row count guarantee in RIGHT JOIN.",
    hint: "3 rows (equal to the number of courses).",
    level: "basic"
  },
  {
    question: "What values appear in the left table's columns for a right-table course with zero enrolled students?",
    shortAnswer: "`NULL`.",
    explanation: "NULL padding for unmatched left columns.",
    hint: "NULL values.",
    level: "basic"
  },
  {
    question: "How do you find all courses that have ZERO enrolled students using a RIGHT JOIN?",
    shortAnswer: "By adding `WHERE s.student_id IS NULL` to the query.",
    explanation: "Anti-join pattern using RIGHT JOIN.",
    hint: "WHERE s.student_id IS NULL.",
    level: "basic"
  },
  {
    question: "What happens if you add `WHERE s.city = 'Barrackpore'` to a `students RIGHT JOIN courses` query?",
    shortAnswer: "It filters out courses with NULL student rows, accidentally converting the RIGHT JOIN into an INNER JOIN (the WHERE clause trap).",
    explanation: "The WHERE clause trap on RIGHT JOIN.",
    hint: "Filters out NULL left rows and turns the query into an INNER JOIN.",
    level: "moderate"
  },
  {
    question: "How do you safely filter student attributes in a RIGHT JOIN without dropping unmatched courses?",
    shortAnswer: "Place the student condition inside the `ON` clause: `ON s.course_id = c.course_id AND s.city = 'Barrackpore'`.",
    explanation: "Safe filtering in the ON clause for RIGHT JOIN.",
    hint: "Place the condition in the ON clause instead of WHERE.",
    level: "moderate"
  },
  {
    question: "In e-commerce, write a RIGHT JOIN query to list all products and their sales, ensuring products with zero sales are included.",
    shortAnswer: "`SELECT p.product_name, COALESCE(SUM(oi.quantity), 0) AS total_sold FROM order_items oi RIGHT JOIN products p ON oi.product_id = p.product_id GROUP BY p.product_id, p.product_name;`",
    explanation: "E-commerce product catalog RIGHT JOIN.",
    hint: "order_items RIGHT JOIN products with COALESCE and GROUP BY.",
    level: "basic"
  },
  {
    question: "What is the driving table in a `RIGHT JOIN` in MySQL?",
    shortAnswer: "The Right table (Table B) is typically the driving table because all of its rows must be preserved in the output.",
    explanation: "Driving table selection in RIGHT JOIN.",
    hint: "The Right table is usually the driving table.",
    level: "moderate"
  },
  {
    question: "Can a RIGHT JOIN return MORE rows than exist in the right table?",
    shortAnswer: "YES! If one row in the right table matches multiple rows in the left table (one-to-many relationship), the right row will be duplicated.",
    explanation: "1:N row proliferation in RIGHT JOIN.",
    hint: "Yes, if a right row matches multiple left rows.",
    level: "basic"
  },
  {
    question: "In hospital management, how do you list all departments and their assigned doctors, ensuring departments with no doctors are shown?",
    shortAnswer: "`SELECT d.dept_name, doc.doc_name FROM doctors doc RIGHT JOIN departments d ON doc.dept_id = d.dept_id;`",
    explanation: "Hospital department RIGHT JOIN.",
    hint: "doctors RIGHT JOIN departments on dept_id.",
    level: "basic"
  },
  {
    question: "What is the equivalent query to `doctors doc RIGHT JOIN departments d` using LEFT JOIN?",
    shortAnswer: "`SELECT d.dept_name, doc.doc_name FROM departments d LEFT JOIN doctors doc ON d.dept_id = doc.dept_id;`",
    explanation: "Equivalence to LEFT JOIN.",
    hint: "departments d LEFT JOIN doctors doc.",
    level: "basic"
  },
  {
    question: "What happens if the right table is completely empty in a RIGHT JOIN query?",
    shortAnswer: "The query returns 0 rows (empty result set), regardless of how many rows exist in the left table.",
    explanation: "Empty right table behavior in RIGHT JOIN.",
    hint: "Returns 0 rows.",
    level: "basic"
  },
  {
    question: "How does `COALESCE(s.student_name, 'No Enrolled Students')` assist in formatting RIGHT JOIN results?",
    shortAnswer: "It converts unreadable `NULL` values into clear, user-friendly labels in reporting dashboards.",
    explanation: "Formatting NULL values with COALESCE.",
    hint: "Replaces NULL with a user-friendly fallback string.",
    level: "basic"
  },
  {
    question: "In payroll systems, why might an HR query use a RIGHT JOIN between `attendance` and `employees`?",
    shortAnswer: "To guarantee that all active employees appear on the monthly payroll sheet, even if they had zero recorded attendance entries.",
    explanation: "Payroll attendance outer join use case.",
    hint: "Ensures all employees appear on payroll even with zero attendance.",
    level: "basic"
  },
  {
    question: "Can you combine `INNER JOIN` and `RIGHT JOIN` in the same multi-table query?",
    shortAnswer: "YES, but it requires careful attention to join precedence and parenthesis to avoid unintended row filtering.",
    explanation: "Mixing join types in multi-table queries.",
    hint: "Yes, but requires careful grouping to avoid unintended filtering.",
    level: "moderate"
  },
  {
    question: "What index should be created to optimize a `FROM order_items oi RIGHT JOIN products p ON oi.product_id = p.product_id` query?",
    shortAnswer: "An index on `order_items.product_id` (foreign key) and a primary key index on `products.product_id`.",
    explanation: "Indexing for RIGHT JOIN performance.",
    hint: "Index both foreign key and primary key columns.",
    level: "moderate"
  },
  {
    question: "What is the result of `A RIGHT JOIN B` if every row in table B matches exactly one row in table A?",
    shortAnswer: "The result set is identical to an `INNER JOIN`.",
    explanation: "RIGHT JOIN when all right rows have matches.",
    hint: "Identical to an INNER JOIN.",
    level: "basic"
  },
  {
    question: "In banking, how do you list all branch offices and their total accounts, including branches with zero accounts?",
    shortAnswer: "`SELECT b.branch_name, COUNT(a.account_num) FROM accounts a RIGHT JOIN branches b ON a.branch_id = b.branch_id GROUP BY b.branch_id, b.branch_name;`",
    explanation: "Branch accounts aggregation via RIGHT JOIN.",
    hint: "accounts RIGHT JOIN branches with COUNT(a.account_num).",
    level: "basic"
  },
  {
    question: "Why does `COUNT(*)` give an incorrect count for unmatched right-table rows in a RIGHT JOIN?",
    shortAnswer: "Because `COUNT(*)` counts the row (returning 1 for the NULL row), whereas `COUNT(a.account_num)` ignores NULLs and correctly returns 0.",
    explanation: "COUNT(*) vs COUNT(col) on RIGHT JOIN.",
    hint: "COUNT(*) returns 1 for NULL rows; COUNT(col) returns 0.",
    level: "moderate"
  },
  {
    question: "What is the ANSI SQL standard representation of full outer join using LEFT and RIGHT joins?",
    shortAnswer: "`SELECT ... FROM A LEFT JOIN B ... UNION SELECT ... FROM A RIGHT JOIN B ...`",
    explanation: "Simulating FULL OUTER JOIN in MySQL.",
    hint: "LEFT JOIN UNION RIGHT JOIN.",
    level: "basic"
  },
  {
    question: "Does `RIGHT JOIN` support non-equi join conditions (e.g. `ON a.score BETWEEN b.min_score AND b.max_score`)?",
    shortAnswer: "YES. RIGHT JOIN supports any valid Boolean expression in its `ON` clause.",
    explanation: "Non-equi conditions in RIGHT JOIN.",
    hint: "Yes, supports inequality and BETWEEN operators.",
    level: "basic"
  },
  {
    question: "What happens if a query has `FROM A RIGHT JOIN B ON A.id = B.id` and Table A has 0 rows while Table B has 10 rows?",
    shortAnswer: "It returns 10 rows, where all column values from Table A are NULL and all values from Table B are populated.",
    explanation: "Empty left table behavior in RIGHT JOIN.",
    hint: "Returns 10 rows with NULLs for Table A.",
    level: "basic"
  },
  {
    question: "How does the MySQL query optimizer handle RIGHT JOIN internally?",
    shortAnswer: "MySQL internally converts `A RIGHT JOIN B` into `B LEFT JOIN A` during query parsing and optimization.",
    explanation: "Internal query rewrite by MySQL optimizer.",
    hint: "Internally converts RIGHT JOIN into LEFT JOIN.",
    level: "expert"
  },
  {
    question: "In warehouse logistics, how do you find storage bins that are currently EMPTY?",
    shortAnswer: "`SELECT b.bin_id, b.aisle_num FROM inventory i RIGHT JOIN bins b ON i.bin_id = b.bin_id WHERE i.item_id IS NULL;`",
    explanation: "Warehouse inventory empty bin anti-join.",
    hint: "inventory RIGHT JOIN bins WHERE i.item_id IS NULL.",
    level: "basic"
  },
  {
    question: "When refactoring legacy SQL, what is the best practice regarding RIGHT JOINs?",
    shortAnswer: "Convert all `RIGHT JOIN`s into `LEFT JOIN`s by reordering the tables to maintain uniform left-to-right query readability.",
    explanation: "Refactoring best practice for SQL joins.",
    hint: "Convert RIGHT JOINs to LEFT JOINs for consistency.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding RIGHT JOIN?",
    shortAnswer: "RIGHT JOIN preserves all records from the right table and fills unmatched left columns with NULL; while mathematically valid, professional engineers generally rewrite RIGHT JOINs as LEFT JOINs for cleaner readability.",
    explanation: "Final summary conclusion for Topic 3 in Module 5.",
    hint: "Preserves all right table rows; equivalent to LEFT JOIN with swapped table order.",
    level: "basic"
  }
];

export default questions;
