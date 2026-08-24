// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is a SELF JOIN in SQL?",
    shortAnswer: "A regular SQL join operation in which a table is joined to itself by referencing the table twice using two distinct table aliases.",
    explanation: "Standard definition of a SELF JOIN.",
    hint: "A join where a table is joined to itself using two distinct aliases.",
    level: "basic"
  },
  {
    question: "Is there a specific 'SELF JOIN' keyword in SQL syntax?",
    shortAnswer: "NO. You use standard `JOIN`, `INNER JOIN`, or `LEFT JOIN` syntax, qualifying the single table name with two different aliases.",
    explanation: "Standard join syntax reused for self joins.",
    hint: "No, it uses regular JOIN keywords with distinct aliases.",
    level: "basic"
  },
  {
    question: "Why are table aliases mandatory when performing a SELF JOIN?",
    shortAnswer: "Because without aliases, MySQL cannot distinguish which instance of the table you are referencing, throwing 'ERROR 1066: Not unique table/alias'.",
    explanation: "Mandatory requirement of table aliases in self joins.",
    hint: "Prevents Error 1066: Not unique table/alias.",
    level: "basic"
  },
  {
    question: "What is a Unary (Recursive) Relationship?",
    shortAnswer: "A relational relationship where an entity type is related to itself (e.g. an employee is managed by another employee in the same table).",
    explanation: "Definition of unary relationship.",
    hint: "A relationship where an entity is related to itself.",
    level: "basic"
  },
  {
    question: "What is the classic benchmark use case for a SELF JOIN?",
    shortAnswer: "The Employee-Manager hierarchy, where `manager_id` is a recursive foreign key referencing `emp_id` in the same `employees` table.",
    explanation: "Classic employee-manager hierarchy benchmark.",
    hint: "Employee-Manager hierarchy.",
    level: "basic"
  },
  {
    question: "Why does an `INNER JOIN` self-join exclude the top executive or CEO?",
    shortAnswer: "Because the top executive has `manager_id = NULL`, which fails the equi-join condition `e.manager_id = m.emp_id`.",
    explanation: "Exclusion of root nodes in inner self joins.",
    hint: "Because the CEO has manager_id = NULL.",
    level: "basic"
  },
  {
    question: "How do you preserve the CEO or top director in an Employee-Manager self join?",
    shortAnswer: "Use a `LEFT JOIN` instead of an INNER JOIN: `FROM employees e LEFT JOIN employees m ON e.manager_id = m.emp_id`.",
    explanation: "Preserving root records with LEFT self join.",
    hint: "Use a LEFT JOIN.",
    level: "basic"
  },
  {
    question: "In category trees (e.g. E-Commerce), how does a SELF JOIN retrieve a sub-category's parent category name?",
    shortAnswer: "`SELECT sub.category_name, parent.category_name AS parent_name FROM categories sub LEFT JOIN categories parent ON sub.parent_id = parent.category_id;`",
    explanation: "Category hierarchy self join.",
    hint: "categories sub LEFT JOIN categories parent ON sub.parent_id = parent.category_id.",
    level: "basic"
  },
  {
    question: "How do you find pairs of students who live in the same city using a SELF JOIN?",
    shortAnswer: "`SELECT s1.name, s2.name, s1.city FROM students s1 JOIN students s2 ON s1.city = s2.city AND s1.student_id < s2.student_id;`",
    explanation: "Peer comparison with self join.",
    hint: "Join on city AND s1.student_id < s2.student_id.",
    level: "basic"
  },
  {
    question: "Why should `s1.student_id < s2.student_id` be used instead of `s1.student_id != s2.student_id` in peer pairing queries?",
    shortAnswer: "Because `<` eliminates both self-matches (A with A) and reverse duplicate permutations (A,B and B,A), returning unique pairings.",
    explanation: "Deduplicating pairings with inequality comparison.",
    hint: "Eliminates self-matches and duplicate reverse pairs.",
    level: "moderate"
  },
  {
    question: "How can you query 2 levels of management (Employee ➔ Manager ➔ Grand-Manager) using SELF JOINs?",
    shortAnswer: "By chaining two self joins: `FROM employees e LEFT JOIN employees m ON e.manager_id = m.emp_id LEFT JOIN employees gm ON m.manager_id = gm.emp_id`.",
    explanation: "Two-level management chain self join.",
    hint: "Chain two LEFT JOINs on the employees table.",
    level: "moderate"
  },
  {
    question: "In course catalog management, how do you find all prerequisite courses using a SELF JOIN?",
    shortAnswer: "`SELECT c.course_title, pre.course_title AS prerequisite FROM courses c LEFT JOIN courses pre ON c.prerequisite_id = pre.course_id;`",
    explanation: "Course prerequisite self join.",
    hint: "courses c LEFT JOIN courses pre ON c.prerequisite_id = pre.course_id.",
    level: "basic"
  },
  {
    question: "What happens if a self-referencing relationship contains a cyclic loop (e.g. A manages B and B manages A)?",
    shortAnswer: "A recursive query without cycle detection will enter an infinite loop; a standard 1-level self join will return cyclic records normally.",
    explanation: "Cyclic references in hierarchical data.",
    hint: "Can cause infinite loops in recursive queries.",
    level: "moderate"
  },
  {
    question: "What MySQL 8.0 feature is recommended for traversing hierarchies of arbitrary, unlimited depth instead of multi-step SELF JOINs?",
    shortAnswer: "Recursive Common Table Expressions (`WITH RECURSIVE`).",
    explanation: "Recursive CTEs for deep hierarchies in MySQL 8.0+.",
    hint: "WITH RECURSIVE (Recursive CTE).",
    level: "moderate"
  },
  {
    question: "How do you find all employees who manage at least one other employee using a SELF JOIN?",
    shortAnswer: "`SELECT DISTINCT m.emp_id, m.emp_name FROM employees e INNER JOIN employees m ON e.manager_id = m.emp_id;`",
    explanation: "Finding manager records.",
    hint: "INNER JOIN employees on manager_id with DISTINCT.",
    level: "basic"
  },
  {
    question: "How do you find all 'leaf employees' (employees who manage NO ONE) using a SELF JOIN?",
    shortAnswer: "`SELECT m.emp_id, m.emp_name FROM employees m LEFT JOIN employees e ON m.emp_id = e.manager_id WHERE e.emp_id IS NULL;`",
    explanation: "Finding leaf nodes in hierarchies.",
    hint: "LEFT JOIN on manager_id WHERE child.emp_id IS NULL.",
    level: "moderate"
  },
  {
    question: "In family genealogy, how do you find sibling pairs using a SELF JOIN?",
    shortAnswer: "`SELECT c1.name, c2.name FROM people c1 JOIN people c2 ON c1.father_id = c2.father_id AND c1.id < c2.id;`",
    explanation: "Genealogy sibling detection with self join.",
    hint: "Join on father_id AND c1.id < c2.id.",
    level: "basic"
  },
  {
    question: "What index is essential for fast performance in Employee-Manager SELF JOIN queries?",
    shortAnswer: "A secondary B-Tree index on the `manager_id` foreign key column, along with the primary key index on `emp_id`.",
    explanation: "Indexing foreign keys for self joins.",
    hint: "Index on manager_id and primary key on emp_id.",
    level: "moderate"
  },
  {
    question: "Can a SELF JOIN use a Non-Equi condition (e.g. finding all employees earning more than their manager)?",
    shortAnswer: "YES: `SELECT e.name, e.salary, m.name, m.salary FROM employees e JOIN employees m ON e.manager_id = m.emp_id WHERE e.salary > m.salary;`",
    explanation: "Non-equi conditions on self joins.",
    hint: "Yes, join on manager_id and filter WHERE e.salary > m.salary.",
    level: "basic"
  },
  {
    question: "How do you find duplicate rows in a table (e.g. duplicate emails) using a SELF JOIN?",
    shortAnswer: "`SELECT a.user_id, a.email FROM users a JOIN users b ON a.email = b.email AND a.user_id < b.user_id;`",
    explanation: "Duplicate row detection with self join.",
    hint: "Join on email AND a.id < b.id.",
    level: "basic"
  },
  {
    question: "What is the result of `FROM tableA a CROSS JOIN tableA b`?",
    shortAnswer: "A Cartesian Product of the table with itself, generating $N \\times N = N^2$ rows (useful for matrix comparisons).",
    explanation: "Self cross join cardinality.",
    hint: "Generates N² rows.",
    level: "basic"
  },
  {
    question: "In logistics, how do you find all pairs of packages that have identical weights and delivery dates?",
    shortAnswer: "`SELECT p1.pkg_id, p2.pkg_id, p1.weight FROM packages p1 JOIN packages p2 ON p1.weight = p2.weight AND p1.delivery_date = p2.delivery_date AND p1.pkg_id < p2.pkg_id;`",
    explanation: "Package matching self join.",
    hint: "Join on weight, delivery_date, and p1.id < p2.id.",
    level: "basic"
  },
  {
    question: "How do you format the output of a self join to show 'Top Level' when the manager is NULL?",
    shortAnswer: "`COALESCE(m.emp_name, 'Top Leadership / Executive') AS manager_name`.",
    explanation: "COALESCE on self join nulls.",
    hint: "Use COALESCE(m.emp_name, 'Top Level').",
    level: "basic"
  },
  {
    question: "In flight booking, how do you find connecting flights (Leg 1 + Leg 2) with a layover using a SELF JOIN?",
    shortAnswer: "`SELECT f1.flight_no AS leg1, f2.flight_no AS leg2, f1.dest AS layover FROM flights f1 JOIN flights f2 ON f1.dest = f2.origin AND f2.dep_time > f1.arr_time;`",
    explanation: "Flight connection layover query.",
    hint: "f1.dest = f2.origin AND f2.dep_time > f1.arr_time.",
    level: "moderate"
  },
  {
    question: "What is the driving table in a `FROM employees e LEFT JOIN employees m` self join?",
    shortAnswer: "`employees e` (the employee instance acting as the left driving table).",
    explanation: "Driving table in self left join.",
    hint: "The left table alias (e).",
    level: "moderate"
  },
  {
    question: "Why should meaningful alias names like `emp` and `mgr` (or `parent` and `child`) be used instead of `a` and `b`?",
    shortAnswer: "To make the semantic role of each table instance immediately obvious, reducing logic errors in complex queries.",
    explanation: "Semantic alias naming best practice.",
    hint: "Improves readability and clarifies table roles.",
    level: "basic"
  },
  {
    question: "In sports tournament scheduling, how does a SELF JOIN generate a round-robin match schedule where every team plays every other team once?",
    shortAnswer: "`SELECT t1.team_name, t2.team_name FROM teams t1 JOIN teams t2 ON t1.team_id < t2.team_id;`",
    explanation: "Round-robin tournament fixture generation.",
    hint: "Join on t1.team_id < t2.team_id.",
    level: "basic"
  },
  {
    question: "Can a SELF JOIN be used to calculate running balances or previous day comparisons in MySQL 5.7 before Window Functions?",
    shortAnswer: "YES. Before MySQL 8.0 window functions, self joins (`ON t1.date >= t2.date`) were the standard method for running totals.",
    explanation: "Historical running totals via self joins.",
    hint: "Yes, was the primary method for running totals before window functions.",
    level: "expert"
  },
  {
    question: "How do you verify the hierarchy depth of an organizational chart without Recursive CTEs?",
    shortAnswer: "By counting the number of non-null managers across multiple chained self joins (`e ➔ m1 ➔ m2 ➔ m3`).",
    explanation: "Fixed depth hierarchy inspection.",
    hint: "Chain multiple self joins and count non-null manager levels.",
    level: "moderate"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding SELF JOIN?",
    shortAnswer: "SELF JOIN allows a single table to be queried against itself to represent hierarchical structures (Employee-Manager, Categories), compare peer records, and detect duplicates; always use descriptive aliases and `LEFT JOIN` to protect root nodes.",
    explanation: "Final summary conclusion for Topic 5 in Module 5.",
    hint: "Queries hierarchical and peer relationships within a single table; use descriptive aliases and LEFT JOIN for root nodes.",
    level: "basic"
  }
];

export default questions;
