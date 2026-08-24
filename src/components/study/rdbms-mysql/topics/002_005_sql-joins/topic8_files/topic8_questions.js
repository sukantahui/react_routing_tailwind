// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is a Non-Equi Join in SQL?",
    shortAnswer: "A relational join operation where the `ON` predicate uses comparison operators other than exact equality (e.g. BETWEEN, >, <, >=, <=, !=).",
    explanation: "Standard definition of Non-Equi Join.",
    hint: "A join that uses operators other than the equality (=) operator.",
    level: "basic"
  },
  {
    question: "In relational algebra, what is a Non-Equi Join classified as?",
    shortAnswer: "A Theta Join (denoted as $R_1 \\bowtie_\\theta R_2$ where $\\theta$ is any comparison operator).",
    explanation: "Relational algebra Theta join classification.",
    hint: "Theta Join (bowtie symbol with condition).",
    level: "basic"
  },
  {
    question: "Is the SQL `BETWEEN` operator inclusive or exclusive of its boundary values?",
    shortAnswer: "INCLUSIVE (i.e. `x BETWEEN a AND b` is identical to `x >= a AND x <= b`).",
    explanation: "Inclusivity of the BETWEEN operator.",
    hint: "Inclusive of both boundary endpoints.",
    level: "basic"
  },
  {
    question: "Give an example of a Non-Equi Join used for student grading.",
    shortAnswer: "`SELECT s.name, g.grade FROM students s JOIN grades g ON s.score BETWEEN g.min_score AND g.max_score;`",
    explanation: "Academic grade scale non-equi join.",
    hint: "ON s.score BETWEEN g.min_score AND g.max_score.",
    level: "basic"
  },
  {
    question: "What bug occurs if range boundaries in a lookup table overlap (e.g. Grade A: 80–90 and Grade B: 70–80)?",
    shortAnswer: "A student with a score of exactly 80 matches BOTH rows, producing duplicate records in the result set.",
    explanation: "Overlapping range boundary bug.",
    hint: "Produces duplicate rows for boundary scores.",
    level: "basic"
  },
  {
    question: "How do you avoid the overlapping boundary bug when designing range tables?",
    shortAnswer: "Use discrete integer boundaries (e.g. 70–79 and 80–89) or use half-open intervals (`>= min AND < max`).",
    explanation: "Designing clean range tables.",
    hint: "Use non-overlapping integer bounds or half-open intervals.",
    level: "basic"
  },
  {
    question: "In payroll systems, how do you determine employee tax slabs using a Non-Equi Join?",
    shortAnswer: "`SELECT e.name, t.tax_rate FROM employees e JOIN tax_slabs t ON e.salary >= t.min_salary AND (e.salary < t.max_salary OR t.max_salary IS NULL);`",
    explanation: "Income tax slab calculation via non-equi join.",
    hint: "ON salary >= min_salary AND salary < max_salary.",
    level: "basic"
  },
  {
    question: "In e-commerce, how do you match an order with the historical product price active on the order date?",
    shortAnswer: "`SELECT o.id, p.price FROM orders o JOIN price_history p ON o.prod_id = p.prod_id AND o.order_date BETWEEN p.valid_from AND p.valid_to;`",
    explanation: "Effective-date range pricing join.",
    hint: "ON o.order_date BETWEEN p.valid_from AND p.valid_to.",
    level: "moderate"
  },
  {
    question: "Why do B-Tree indexes perform slower on Non-Equi joins compared to Equi-joins?",
    shortAnswer: "Because range conditions require B-Tree index range scans or block nested-loop joins rather than instant $O(1)$ single-point equality lookups.",
    explanation: "Indexing mechanics on range vs equality joins.",
    hint: "Requires index range scans rather than O(1) equality point lookups.",
    level: "moderate"
  },
  {
    question: "Can a Non-Equi Join be combined with an Equi-Join condition in the same `ON` clause?",
    shortAnswer: "YES (e.g. `ON o.product_id = p.product_id AND o.order_date BETWEEN p.valid_from AND p.valid_to`).",
    explanation: "Hybrid equi and non-equi compound joins.",
    hint: "Yes, very common in effective-date joins.",
    level: "basic"
  },
  {
    question: "In sports tournament scheduling, how does a Non-Equi Join prevent duplicate mirror matches?",
    shortAnswer: "Using `ON t1.team_id < t2.team_id` ensures each pair is listed exactly once without self-matches or reversed duplicates.",
    explanation: "Tournament fixture generation with inequality join.",
    hint: "ON t1.id < t2.id.",
    level: "basic"
  },
  {
    question: "In logistics, how do you calculate shipping rates based on package weight tiers?",
    shortAnswer: "`SELECT p.pkg_id, r.rate FROM packages p JOIN shipping_tiers r ON p.weight > r.min_weight AND p.weight <= r.max_weight;`",
    explanation: "Shipping rate weight tier join.",
    hint: "ON p.weight > r.min_weight AND p.weight <= r.max_weight.",
    level: "basic"
  },
  {
    question: "Can a Non-Equi Join be used with `LEFT JOIN`?",
    shortAnswer: "YES. For example, a student with a score outside any defined grade range will be preserved with a NULL grade.",
    explanation: "Outer non-equi join behavior.",
    hint: "Yes, preserves left records when no range matches.",
    level: "basic"
  },
  {
    question: "How do you find all employees who earn more than their direct manager using a Non-Equi Self Join?",
    shortAnswer: "`SELECT e.name, e.salary, m.name, m.salary FROM employees e JOIN employees m ON e.manager_id = m.emp_id AND e.salary > m.salary;`",
    explanation: "Non-equi self join query.",
    hint: "ON e.manager_id = m.id AND e.salary > m.salary.",
    level: "basic"
  },
  {
    question: "In hotel booking systems, how do you detect overlapping room reservations using a Non-Equi Join?",
    shortAnswer: "`SELECT b1.id, b2.id FROM bookings b1 JOIN bookings b2 ON b1.room_id = b2.room_id AND b1.id < b2.id AND b1.checkin < b2.checkout AND b1.checkout > b2.checkin;`",
    explanation: "Overlapping date range collision detection.",
    hint: "b1.checkin < b2.checkout AND b1.checkout > b2.checkin.",
    level: "expert"
  },
  {
    question: "What index type in MySQL best optimizes queries joining on 2D geographic coordinates or spatial bounding boxes?",
    shortAnswer: "SPATIAL B-Tree (R-Tree) indexes.",
    explanation: "Spatial indexing for non-equi geographic joins.",
    hint: "SPATIAL indexes (R-Tree).",
    level: "expert"
  },
  {
    question: "In loyalty rewards programs, how do you assign customer tier levels (Silver, Gold, Platinum) based on annual spend?",
    shortAnswer: "`SELECT c.name, t.tier_name FROM customers c JOIN loyalty_tiers t ON c.annual_spend BETWEEN t.min_spend AND t.max_spend;`",
    explanation: "Customer tier assignment via non-equi join.",
    hint: "ON annual_spend BETWEEN min_spend AND max_spend.",
    level: "basic"
  },
  {
    question: "What is the result if a student's score matches NO range in the `grade_scales` table during an `INNER JOIN`?",
    shortAnswer: "The student's record is completely excluded from the query output.",
    explanation: "Unmatched row behavior in inner non-equi joins.",
    hint: "The record is discarded from the result set.",
    level: "basic"
  },
  {
    question: "How do you ensure students with invalid or unassigned scores still appear in the grade report?",
    shortAnswer: "Use a `LEFT JOIN` and wrap the grade letter in `COALESCE(g.grade_letter, 'Ungraded')`.",
    explanation: "Preserving ungraded students with LEFT JOIN and COALESCE.",
    hint: "Use LEFT JOIN and COALESCE for fallback defaults.",
    level: "basic"
  },
  {
    question: "In inventory restocking, how do you find products where `stock_quantity <= reorder_threshold` using a Non-Equi Join?",
    shortAnswer: "`SELECT p.name, p.stock_quantity, c.category_name FROM products p JOIN categories c ON p.category_id = c.id AND p.stock_quantity <= c.min_stock_alert;`",
    explanation: "Threshold inventory alerts via non-equi join.",
    hint: "ON stock_quantity <= min_stock_alert.",
    level: "basic"
  },
  {
    question: "What is the difference between `BETWEEN` and explicit `>= AND <=`?",
    shortAnswer: "There is zero functional difference; `BETWEEN` is syntactic sugar for `>= AND <=`.",
    explanation: "BETWEEN syntax equivalence.",
    hint: "They are completely identical in execution.",
    level: "basic"
  },
  {
    question: "In credit scoring, how do you map FICO scores (300–850) to risk classifications (Poor, Fair, Good, Excellent)?",
    shortAnswer: "`SELECT u.name, r.risk_level FROM users u JOIN credit_brackets r ON u.credit_score BETWEEN r.min_score AND r.max_score;`",
    explanation: "Credit score bracket non-equi join.",
    hint: "ON credit_score BETWEEN min_score AND max_score.",
    level: "basic"
  },
  {
    question: "How does the MySQL query optimizer execute a pure non-equi join with no equality columns?",
    shortAnswer: "Using Block Nested-Loop Join (or Hash Join in MySQL 8.0.18+ with range predicates).",
    explanation: "Query optimizer execution path for non-equi joins.",
    hint: "Block Nested-Loop or Hash Join.",
    level: "moderate"
  },
  {
    question: "Why should `min_val` and `max_val` columns in range tables be indexed together as a composite index?",
    shortAnswer: "To allow the query optimizer to quickly filter and prune non-matching ranges using index range scans.",
    explanation: "Composite index on range boundary columns.",
    hint: "Composite index on (min_val, max_val).",
    level: "moderate"
  },
  {
    question: "In flight tracking, how do you find flights scheduled to depart within 30 minutes of each other on the same runway?",
    shortAnswer: "`SELECT f1.flight_no, f2.flight_no FROM flights f1 JOIN flights f2 ON f1.runway = f2.runway AND f1.id < f2.id AND TIMESTAMPDIFF(MINUTE, f1.dep_time, f2.dep_time) <= 30;`",
    explanation: "Runway schedule conflict detection.",
    hint: "TIMESTAMPDIFF(MINUTE, f1.dep, f2.dep) <= 30.",
    level: "expert"
  },
  {
    question: "Can a Non-Equi Join use the `LIKE` pattern matching operator?",
    shortAnswer: "YES: `SELECT * FROM logs l JOIN error_rules r ON l.message LIKE CONCAT('%', r.pattern, '%');`",
    explanation: "Pattern matching non-equi joins.",
    hint: "Yes, using LIKE for pattern matching.",
    level: "moderate"
  },
  {
    question: "What is a 'Band Join'?",
    shortAnswer: "A specific category of Non-Equi Join where rows are joined based on a numerical distance or tolerance band (e.g. `ABS(a.val - b.val) <= tolerance`).",
    explanation: "Definition of Band Join in database engines.",
    hint: "Joining on numerical distance or tolerance bands.",
    level: "expert"
  },
  {
    question: "In real estate pricing, how do you find comparable houses sold within ±10% square footage in the same neighborhood?",
    shortAnswer: "`SELECT h1.id, h2.id FROM houses h1 JOIN houses h2 ON h1.neighborhood = h2.neighborhood AND h1.id < h2.id AND h2.sqft BETWEEN (h1.sqft * 0.9) AND (h1.sqft * 1.1);`",
    explanation: "Real estate comparable house band join.",
    hint: "h2.sqft BETWEEN (h1.sqft * 0.9) AND (h1.sqft * 1.1).",
    level: "moderate"
  },
  {
    question: "Why should software engineers prefer Non-Equi Joins over hardcoded `CASE WHEN` statements for business ranges?",
    shortAnswer: "Because storing ranges in a database table allows business users to update thresholds (e.g. tax rates, grade bounds) without modifying and redeploying application code.",
    explanation: "Data-driven architecture vs hardcoded code.",
    hint: "Enables dynamic, data-driven threshold updates without code redeployment.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Non-Equi Joins?",
    shortAnswer: "Non-Equi Joins enable powerful, data-driven range mapping (grades, tax slabs, discount tiers, historical prices); always design non-overlapping range boundaries and index range columns to prevent duplicate rows and slow table scans.",
    explanation: "Final summary conclusion for Topic 8 in Module 5.",
    hint: "Enables data-driven range mapping; ensure non-overlapping boundaries and index range columns.",
    level: "basic"
  }
];

export default questions;
