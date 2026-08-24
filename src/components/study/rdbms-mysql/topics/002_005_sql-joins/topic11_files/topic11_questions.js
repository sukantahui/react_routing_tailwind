// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is the primary difference between placing a filter in the `ON` clause versus the `WHERE` clause in a `LEFT JOIN`?",
    shortAnswer: "A filter in the `ON` clause filters the right table before the join (preserving all left rows with NULLs), whereas a filter on the right table in the `WHERE` clause eliminates rows with NULLs, converting the query into an INNER JOIN.",
    explanation: "Core divergence between ON and WHERE in outer joins.",
    hint: "ON preserves all left rows with NULLs; WHERE on right table discards NULL rows.",
    level: "basic"
  },
  {
    question: "Does placing a filter in the `ON` clause versus the `WHERE` clause change the output in an `INNER JOIN`?",
    shortAnswer: "NO. In an `INNER JOIN`, placing non-join conditions in the `ON` clause or `WHERE` clause produces the exact same result set.",
    explanation: "Equivalence of ON and WHERE in inner joins.",
    hint: "No, they produce identical results in INNER JOIN.",
    level: "basic"
  },
  {
    question: "Why does placing `WHERE right_table.status = 'ACTIVE'` turn a `LEFT JOIN` into an `INNER JOIN`?",
    shortAnswer: "Because unmatched rows from the left table have `NULL` in the right table's columns, and `NULL = 'ACTIVE'` evaluates to `UNKNOWN` (failing the WHERE clause).",
    explanation: "Three-valued logic NULL filtering in WHERE.",
    hint: "NULL = 'ACTIVE' fails, discarding unmatched left rows.",
    level: "basic"
  },
  {
    question: "If you want to list ALL students and show their courses ONLY if the course fee is > ₹5,000, where must `course_fee > 5000` be placed?",
    shortAnswer: "In the `ON` clause: `FROM students s LEFT JOIN courses c ON s.course_id = c.course_id AND c.course_fee > 5000`.",
    explanation: "Preserving left records while filtering joined attributes.",
    hint: "In the ON clause of the LEFT JOIN.",
    level: "basic"
  },
  {
    question: "Where should filters on the LEFT table (e.g. `students.city = 'Barrackpore'`) be placed in a `LEFT JOIN`?",
    shortAnswer: "In the `WHERE` clause: `WHERE s.city = 'Barrackpore'`.",
    explanation: "Proper placement for driving table filters.",
    hint: "In the WHERE clause.",
    level: "basic"
  },
  {
    question: "What bizarre behavior occurs if you put a left-table filter in the `ON` clause (e.g. `LEFT JOIN courses c ON ... AND s.city = 'Barrackpore'`)?",
    shortAnswer: "Students from other cities (e.g. Kolkata) will still be returned in the result set, but with NULL course details.",
    explanation: "Left table filter in ON clause anomaly.",
    hint: "Non-matching students are still returned with NULL columns.",
    level: "moderate"
  },
  {
    question: "How does the 'Anti-Join' pattern utilize the `WHERE` clause with a `LEFT JOIN`?",
    shortAnswer: "By filtering `WHERE right_table.primary_key IS NULL`, isolating only the left rows that have NO matching record in the right table.",
    explanation: "Anti-join pattern mechanics.",
    hint: "WHERE right_table.id IS NULL.",
    level: "basic"
  },
  {
    question: "What is 'Predicate Pushdown' in database query optimization?",
    shortAnswer: "An optimizer technique that pushes filtering conditions as close to the storage layer as possible before performing expensive join operations.",
    explanation: "Definition of predicate pushdown.",
    hint: "Optimizer pushing filters before joins to reduce row volume.",
    level: "moderate"
  },
  {
    question: "In academy management, write a query listing ALL students and their exam scores for 'Term-1' only, preserving students who missed Term-1.",
    shortAnswer: "`SELECT s.name, e.score FROM students s LEFT JOIN exam_scores e ON s.id = e.student_id AND e.term = 'Term-1';`",
    explanation: "Selective term score join.",
    hint: "ON s.id = e.student_id AND e.term = 'Term-1'.",
    level: "basic"
  },
  {
    question: "What happens if the query above is written with `WHERE e.term = 'Term-1'`?",
    shortAnswer: "Students who did not take Term-1 will be completely excluded from the result.",
    explanation: "Accidental exclusion of students.",
    hint: "Students who missed Term-1 are deleted from the report.",
    level: "basic"
  },
  {
    question: "In e-commerce, how do you find all customers along with their completed orders in 2026, preserving customers with no 2026 orders?",
    shortAnswer: "`SELECT c.name, o.order_id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id AND YEAR(o.order_date) = 2026;`",
    explanation: "Year-filtered outer join.",
    hint: "AND YEAR(o.order_date) = 2026 in the ON clause.",
    level: "basic"
  },
  {
    question: "How do you filter customers from 'Kolkata' who have placed NO orders in 2026?",
    shortAnswer: "`SELECT c.name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id AND YEAR(o.order_date) = 2026 WHERE c.city = 'Kolkata' AND o.order_id IS NULL;`",
    explanation: "Combining left table WHERE filter with right table ON filter and anti-join.",
    hint: "Filter year in ON, filter city and IS NULL in WHERE.",
    level: "moderate"
  },
  {
    question: "Can an `ON` clause in a `LEFT JOIN` reference columns from a third table not in the current join pair?",
    shortAnswer: "YES, as long as the third table appears earlier in the join sequence in the `FROM` clause.",
    explanation: "Cross-table references in ON clauses.",
    hint: "Yes, if the table was joined earlier in the sequence.",
    level: "moderate"
  },
  {
    question: "What is the result of `FROM A LEFT JOIN B ON 1 = 0`?",
    shortAnswer: "All rows from Table A are returned, with all columns from Table B populated with `NULL`.",
    explanation: "False predicate in outer join ON clause.",
    hint: "Returns all rows of A with NULL columns for B.",
    level: "moderate"
  },
  {
    question: "What is the result of `FROM A INNER JOIN B ON 1 = 0`?",
    shortAnswer: "0 rows returned (empty result set).",
    explanation: "False predicate in inner join ON clause.",
    hint: "Returns 0 rows.",
    level: "basic"
  },
  {
    question: "In payroll, how do you list all employees with their overtime pay for August 2026, preserving employees with 0 overtime?",
    shortAnswer: "`SELECT e.name, ot.amount FROM employees e LEFT JOIN overtime ot ON e.id = ot.emp_id AND ot.month_year = '2026-08';`",
    explanation: "Overtime payroll mapping in ON clause.",
    hint: "Join condition in ON clause with month filter.",
    level: "basic"
  },
  {
    question: "Why should developers avoid putting complex business filters inside `ON` clauses for `INNER JOIN`s?",
    shortAnswer: "For code readability: best practice keeps join link predicates in `ON` and business filters in `WHERE`.",
    explanation: "Readability separation of concerns in INNER JOIN.",
    hint: "Keep join keys in ON and business filtering in WHERE.",
    level: "basic"
  },
  {
    question: "In a `RIGHT JOIN`, which table's filters must be in the `ON` clause to preserve outer rows?",
    shortAnswer: "The LEFT table's filters (since RIGHT JOIN preserves the right table).",
    explanation: "Inverted logic for RIGHT JOIN.",
    hint: "The LEFT table's filters.",
    level: "moderate"
  },
  {
    question: "What happens if you have a `WHERE` condition on a coalesced column: `WHERE COALESCE(o.status, 'NONE') = 'NONE'`?",
    shortAnswer: "It retains both customers with status 'NONE' and customers with NULL orders (acting as an anti-join or specific status filter).",
    explanation: "COALESCE in WHERE clauses.",
    hint: "Matches both 'NONE' and NULL values.",
    level: "moderate"
  },
  {
    question: "How does the MySQL optimizer handle `WHERE right_table.id IS NOT NULL` on a `LEFT JOIN`?",
    shortAnswer: "It automatically rewrites the `LEFT JOIN` into an `INNER JOIN` (Outer Join Elimination).",
    explanation: "Outer Join Elimination optimization.",
    hint: "Rewrites the query internally into an INNER JOIN.",
    level: "expert"
  },
  {
    question: "In hospital management, how do you list all registered doctors and any surgeries scheduled for TODAY, preserving doctors with no surgeries?",
    shortAnswer: "`SELECT d.name, s.surgery_type FROM doctors d LEFT JOIN surgeries s ON d.id = s.doctor_id AND s.surgery_date = CURDATE();`",
    explanation: "Hospital schedule outer join with date in ON.",
    hint: "AND s.surgery_date = CURDATE() in ON clause.",
    level: "basic"
  },
  {
    question: "What is the performance implication of putting a filter in the `ON` clause of an `INNER JOIN` versus `WHERE`?",
    shortAnswer: "None; modern query optimizers produce the exact same execution plan for both.",
    explanation: "Optimizer equivalence in inner joins.",
    hint: "Zero performance difference.",
    level: "basic"
  },
  {
    question: "In inventory auditing, how do you find all warehouse bins that currently contain zero units of SKU 'CA-HD-M'?",
    shortAnswer: "`SELECT b.bin_id FROM bins b LEFT JOIN stock s ON b.bin_id = s.bin_id AND s.sku = 'CA-HD-M' WHERE s.bin_id IS NULL;`",
    explanation: "SKU-specific bin vacancy anti-join.",
    hint: "Filter SKU in ON clause, check IS NULL in WHERE.",
    level: "moderate"
  },
  {
    question: "Can a `WHERE` clause contain subqueries that reference tables from the join?",
    shortAnswer: "YES (Correlated subqueries in WHERE).",
    explanation: "Subqueries in WHERE clause.",
    hint: "Yes, correlated subqueries are fully supported.",
    level: "basic"
  },
  {
    question: "If a query has 3 `LEFT JOIN`s, how does a single `WHERE` filter on the 3rd table impact the preceding tables?",
    shortAnswer: "It converts the entire chain into an inner join for all rows where the 3rd table is NULL, eliminating outer rows.",
    explanation: "Chain cancellation in multi-table outer joins.",
    hint: "Silently cancels outer row preservation across the entire chain.",
    level: "moderate"
  },
  {
    question: "How can you safely filter a 3rd table in a 3-table `LEFT JOIN` chain without losing outer rows?",
    shortAnswer: "Place the 3rd table's filter directly in its own `ON` clause.",
    explanation: "Safe filtering in multi-table outer chains.",
    hint: "Place the filter in the 3rd table's ON clause.",
    level: "moderate"
  },
  {
    question: "In university grading, what does `ON s.id = g.student_id AND g.grade = 'A'` achieve?",
    shortAnswer: "Returns all students, but shows grade details only if they received an 'A'; all other students display NULL grade details.",
    explanation: "Selective grade display via ON clause.",
    hint: "Shows grade 'A' for qualifiers and NULL for others, preserving all students.",
    level: "basic"
  },
  {
    question: "What does `WHERE g.grade = 'A'` achieve in the same query?",
    shortAnswer: "Returns ONLY students who received an 'A', eliminating all other students.",
    explanation: "Result set restriction via WHERE clause.",
    hint: "Filters out all students who did not receive an 'A'.",
    level: "basic"
  },
  {
    question: "Why is understanding WHERE vs ON placement critical for junior developers transitioning to senior roles?",
    shortAnswer: "Because misplacing filters in outer joins causes subtle, hard-to-detect business logic bugs (e.g. missing customer counts, inflated churn metrics).",
    explanation: "Business reporting accuracy and join filter placement.",
    hint: "Prevents subtle data corruption and inaccurate executive reports.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding WHERE vs ON placement?",
    shortAnswer: "In `LEFT JOIN`s, place right-table filtering conditions in the `ON` clause to preserve outer rows; placing right-table conditions in `WHERE` eliminates NULLs and silently converts the query into an `INNER JOIN`.",
    explanation: "Final summary conclusion for Topic 11 in Module 5.",
    hint: "In LEFT JOIN: filter right table in ON to preserve left rows; filter in WHERE converts to INNER JOIN.",
    level: "basic"
  }
];

export default questions;
