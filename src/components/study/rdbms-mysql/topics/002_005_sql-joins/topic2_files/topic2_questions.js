// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is a LEFT (OUTER) JOIN in SQL?",
    shortAnswer: "A relational join operation that returns all records from the left table, along with matched records from the right table; unmatched right columns are filled with NULLs.",
    explanation: "Standard formal definition of LEFT JOIN.",
    hint: "Preserves all left table rows and fills unmatched right columns with NULL.",
    level: "basic"
  },
  {
    question: "Is the keyword 'OUTER' mandatory in a LEFT JOIN?",
    shortAnswer: "NO. In MySQL and ANSI SQL, `LEFT JOIN` and `LEFT OUTER JOIN` are completely identical.",
    explanation: "Optional nature of OUTER keyword.",
    hint: "No, LEFT JOIN and LEFT OUTER JOIN are identical.",
    level: "basic"
  },
  {
    question: "In relational algebra, what symbol represents the Left Outer Join?",
    shortAnswer: "The bowtie with two left-pointing horizontal prongs (⟕).",
    explanation: "Relational algebra notation for Left Outer Join.",
    hint: "Left bowtie symbol (⟕).",
    level: "basic"
  },
  {
    question: "What values appear in the right table's columns when a left row has no match during a LEFT JOIN?",
    shortAnswer: "`NULL`.",
    explanation: "NULL padding for unmatched right columns.",
    hint: "NULL values.",
    level: "basic"
  },
  {
    question: "How do you find all rows in Table A that have NO matching rows in Table B using a LEFT JOIN?",
    shortAnswer: "By adding a `WHERE tableB.primary_key IS NULL` condition to the query.",
    explanation: "Finding orphan records / set difference with LEFT JOIN.",
    hint: "Use WHERE tableB.id IS NULL.",
    level: "basic"
  },
  {
    question: "What is the 'WHERE Clause Trap' on a LEFT JOIN?",
    shortAnswer: "Adding a filter condition on the right table in the `WHERE` clause (e.g. `WHERE b.price > 100`) filters out NULL rows, accidentally converting the LEFT JOIN into an INNER JOIN.",
    explanation: "The WHERE clause trap in outer joins.",
    hint: "Filtering right table columns in WHERE removes NULL rows and turns the query into an INNER JOIN.",
    level: "moderate"
  },
  {
    question: "How should right-table filter conditions be written to avoid the WHERE clause trap?",
    shortAnswer: "Move the condition into the `ON` clause (e.g. `LEFT JOIN b ON a.id = b.id AND b.price > 100`).",
    explanation: "Placing outer filters in the ON clause.",
    hint: "Place the condition in the ON clause instead of WHERE.",
    level: "moderate"
  },
  {
    question: "What SQL function returns the first non-NULL argument from a list of values?",
    shortAnswer: "`COALESCE(val1, val2, ...)`.",
    explanation: "Standard ANSI function for NULL replacement.",
    hint: "COALESCE.",
    level: "basic"
  },
  {
    question: "What MySQL-specific function provides a 2-argument shortcut for `COALESCE()`?",
    shortAnswer: "`IFNULL(expression, default_value)`.",
    explanation: "MySQL IFNULL function.",
    hint: "IFNULL.",
    level: "basic"
  },
  {
    question: "In academy management, if `students` has 4 rows and `courses` has 2 rows, how many rows will `students LEFT JOIN courses` return at minimum?",
    shortAnswer: "At least 4 rows (every student is guaranteed to appear at least once).",
    explanation: "Guaranteed row count lower bound in LEFT JOIN.",
    hint: "At least 4 rows (equal to the number of rows in the left table).",
    level: "basic"
  },
  {
    question: "Can a LEFT JOIN return MORE rows than exist in the left table?",
    shortAnswer: "YES! If a single left row matches multiple right rows (one-to-many relationship), the left row will be duplicated for each matching right row.",
    explanation: "One-to-many row multiplication in LEFT JOIN.",
    hint: "Yes, if a left row matches multiple right rows.",
    level: "basic"
  },
  {
    question: "How do you count total orders per customer while still showing customers with ZERO orders?",
    shortAnswer: "`SELECT c.customer_name, COUNT(o.order_id) FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.customer_name;`",
    explanation: "COUNT(column) vs COUNT(*) with LEFT JOIN.",
    hint: "Use LEFT JOIN with COUNT(o.order_id) and GROUP BY.",
    level: "moderate"
  },
  {
    question: "Why should you use `COUNT(o.order_id)` instead of `COUNT(*)` when counting child records in a LEFT JOIN?",
    shortAnswer: "Because `COUNT(*)` counts the row (returning 1 for unmatched rows with NULLs), whereas `COUNT(o.order_id)` ignores NULLs and correctly returns 0.",
    explanation: "COUNT(*) vs COUNT(col) behavior on NULLs in outer joins.",
    hint: "COUNT(*) counts the NULL row as 1, while COUNT(col) returns 0.",
    level: "moderate"
  },
  {
    question: "Is `LEFT JOIN` commutative (i.e. is `A LEFT JOIN B` equal to `B LEFT JOIN A`)?",
    shortAnswer: "NO. `A LEFT JOIN B` preserves all rows of A, while `B LEFT JOIN A` preserves all rows of B.",
    explanation: "Non-commutativity of outer joins.",
    hint: "No, table order determines which table's rows are preserved.",
    level: "basic"
  },
  {
    question: "What is the equivalent query to `A RIGHT JOIN B` using a LEFT JOIN?",
    shortAnswer: "`B LEFT JOIN A ON ...` (swapping table order converts RIGHT JOIN to LEFT JOIN).",
    explanation: "Equivalence between LEFT and RIGHT joins.",
    hint: "Swap table order: B LEFT JOIN A.",
    level: "basic"
  },
  {
    question: "In e-commerce, write a query to find all products that have NEVER been ordered.",
    shortAnswer: "`SELECT p.product_id, p.product_name FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id WHERE oi.order_id IS NULL;`",
    explanation: "Finding products with zero sales.",
    hint: "LEFT JOIN products to order_items WHERE oi.order_id IS NULL.",
    level: "basic"
  },
  {
    question: "What is an 'Anti-Join' in database query optimization?",
    shortAnswer: "A query pattern that returns rows from one table that have no matching records in another table (e.g. `LEFT JOIN ... WHERE right.id IS NULL` or `NOT EXISTS`).",
    explanation: "Definition of Anti-Join.",
    hint: "Returns rows from Table A that do not exist in Table B.",
    level: "moderate"
  },
  {
    question: "Why is `NOT EXISTS` sometimes preferred by query optimizers over `LEFT JOIN ... WHERE IS NULL` for anti-joins?",
    shortAnswer: "Because `NOT EXISTS` can stop scanning the inner table as soon as the first match is found (short-circuit evaluation), whereas a naive LEFT JOIN might join all rows before filtering.",
    explanation: "Anti-join optimizer performance.",
    hint: "NOT EXISTS allows short-circuit evaluation on the first match.",
    level: "expert"
  },
  {
    question: "In hospital management, how do you list all patients and their assigned doctors, including unassigned patients?",
    shortAnswer: "`SELECT p.patient_name, COALESCE(d.doc_name, 'Unassigned') FROM patients p LEFT JOIN doctors d ON p.assigned_doc_id = d.doc_id;`",
    explanation: "Healthcare patient assignment LEFT JOIN.",
    hint: "patients LEFT JOIN doctors with COALESCE for doc_name.",
    level: "basic"
  },
  {
    question: "What happens if both tables in a LEFT JOIN have matching primary keys for all rows?",
    shortAnswer: "The result set will be 100% identical to an `INNER JOIN`.",
    explanation: "LEFT JOIN behaving identically to INNER JOIN when all keys match.",
    hint: "Behaves identically to an INNER JOIN.",
    level: "basic"
  },
  {
    question: "Can multiple LEFT JOINs be chained in a single query?",
    shortAnswer: "YES. For example: `FROM customers c LEFT JOIN orders o ON ... LEFT JOIN order_items oi ON ... LEFT JOIN products p ON ...`.",
    explanation: "Multi-table chained LEFT JOINs.",
    hint: "Yes, you can chain multiple LEFT JOIN clauses.",
    level: "basic"
  },
  {
    question: "In a chained LEFT JOIN (`A LEFT JOIN B LEFT JOIN C`), if table B has no match for a row in A, what will columns from table C contain?",
    shortAnswer: "`NULL` (because the join to C fails due to the missing B row).",
    explanation: "Cascade NULL behavior in chained outer joins.",
    hint: "NULL values for both B and C columns.",
    level: "moderate"
  },
  {
    question: "How can you use `CASE WHEN` to display a custom status for matched vs unmatched rows in a LEFT JOIN?",
    shortAnswer: "`SELECT s.name, CASE WHEN c.course_id IS NULL THEN 'Pending Enrollment' ELSE 'Active' END AS status FROM students s LEFT JOIN courses c ON s.course_id = c.course_id;`",
    explanation: "Conditional status formatting with CASE and LEFT JOIN.",
    hint: "Use CASE WHEN right_col IS NULL THEN ... ELSE ... END.",
    level: "basic"
  },
  {
    question: "What index should be created to optimize a `LEFT JOIN students s ON s.course_id = c.course_id` query?",
    shortAnswer: "An index on `students.course_id` (foreign key) and an index on `courses.course_id` (primary key).",
    explanation: "Indexing foreign keys for outer joins.",
    hint: "Index both the foreign key and primary key columns.",
    level: "moderate"
  },
  {
    question: "What is the driving table in a `LEFT JOIN` in MySQL?",
    shortAnswer: "The Left table (Table A) is typically the driving table because all of its rows must be processed and preserved.",
    explanation: "Driving table selection in LEFT JOIN.",
    hint: "The Left table is usually the driving table.",
    level: "moderate"
  },
  {
    question: "In bank account management, how do you find customers who have NEVER made a transaction?",
    shortAnswer: "`SELECT c.account_num, c.holder_name FROM accounts c LEFT JOIN transactions t ON c.account_num = t.account_num WHERE t.txn_id IS NULL;`",
    explanation: "Banking orphan account query.",
    hint: "accounts LEFT JOIN transactions WHERE t.txn_id IS NULL.",
    level: "basic"
  },
  {
    question: "Does `DISTINCT` affect the output of a LEFT JOIN query?",
    shortAnswer: "YES. If multiple matching rows in the right table cause duplicate left rows, `DISTINCT` will eliminate the duplicate rows from the final result.",
    explanation: "DISTINCT with LEFT JOIN.",
    hint: "Yes, eliminates duplicate rows caused by 1:N matches.",
    level: "basic"
  },
  {
    question: "What happens if the join condition is `ON 1=1` in a `LEFT JOIN`?",
    shortAnswer: "It behaves like a `CROSS JOIN` (Cartesian Product) if the right table has rows, or preserves the left table with NULLs if the right table is empty.",
    explanation: "Degenerate join condition evaluation.",
    hint: "Generates a full Cartesian product if right table has rows.",
    level: "expert"
  },
  {
    question: "Why should software engineers prefer `LEFT JOIN` over `RIGHT JOIN` in production codebases?",
    shortAnswer: "Because left-to-right reading order is more natural and consistent, making complex multi-table queries easier to read and maintain.",
    explanation: "Code style consistency convention.",
    hint: "Natural left-to-right reading order improves readability.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding LEFT JOIN?",
    shortAnswer: "Use `LEFT JOIN` whenever you must preserve all records from the primary entity table regardless of whether related records exist; handle NULLs safely with `COALESCE()` and beware of the WHERE clause filter trap.",
    explanation: "Final summary conclusion for Topic 2 in Module 5.",
    hint: "Preserves all left table rows; handle NULLs with COALESCE and place outer filters in ON.",
    level: "basic"
  }
];

export default questions;
