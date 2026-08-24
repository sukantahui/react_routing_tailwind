// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What is the primary objective of the Complex Join Capstone Lab?",
    shortAnswer: "To synthesize all join techniques (INNER, LEFT, RIGHT, FULL outer emulation, SELF, NON-EQUI, CTE pre-aggregation, and Anti-Joins) into an enterprise order, shipment, and payment analytics pipeline.",
    explanation: "Capstone lab overview.",
    hint: "Synthesizing all join techniques into an enterprise analytics pipeline.",
    level: "basic"
  },
  {
    question: "In a customer 360-degree analytics report, why must orders, payments, and shipments be aggregated in separate CTEs before joining to `customers`?",
    shortAnswer: "To prevent the Aggregate Fan-Out Bug (row multiplication) that would otherwise inflate financial sums and item counts.",
    explanation: "CTE pre-aggregation to prevent multi-child fan-out.",
    hint: "Prevents row multiplication across independent 1:N child tables.",
    level: "basic"
  },
  {
    question: "How do you calculate a customer's net outstanding balance across multiple joined tables?",
    shortAnswer: "`COALESCE(orders.gross_value, 0) - COALESCE(payments.settled_amount, 0)`.",
    explanation: "Net balance calculation with COALESCE.",
    hint: "Gross orders minus settled payments with COALESCE.",
    level: "basic"
  },
  {
    question: "How does an Anti-Join detect paid orders that have NOT been dispatched by warehouse shipping?",
    shortAnswer: "`FROM orders o JOIN payments p USING (order_id) LEFT JOIN shipments s USING (order_id) WHERE p.status = 'SETTLED' AND s.shipment_id IS NULL`.",
    explanation: "Fulfillment gap detection via anti-join.",
    hint: "LEFT JOIN shipments WHERE s.shipment_id IS NULL.",
    level: "basic"
  },
  {
    question: "How do you calculate the exact duration an order has been waiting for dispatch in hours?",
    shortAnswer: "`TIMESTAMPDIFF(HOUR, o.order_date, NOW()) AS hours_since_order`.",
    explanation: "Date difference calculation in MySQL.",
    hint: "TIMESTAMPDIFF(HOUR, order_date, NOW()).",
    level: "basic"
  },
  {
    question: "In e-commerce reporting, how do you map annual customer spend to loyalty tiers dynamically without hardcoding tiers in SQL?",
    shortAnswer: "Using a Non-Equi join between the customer spend summary and the `loyalty_tiers` table on `spend BETWEEN min_spend AND max_spend`.",
    explanation: "Dynamic loyalty tier mapping via non-equi join.",
    hint: "Non-Equi join on spend BETWEEN min_spend AND max_spend.",
    level: "basic"
  },
  {
    question: "What is the recommended index strategy for high-performance 7-table enterprise joins?",
    shortAnswer: "Create single-column or composite B-Tree indexes on every foreign key column (`customer_id`, `order_id`, `product_id`, `shipment_id`).",
    explanation: "Foreign key index architecture.",
    hint: "Index every foreign key column involved in join paths.",
    level: "basic"
  },
  {
    question: "How do you inspect the execution plan of a complex 7-table CTE join in MySQL 8.0?",
    shortAnswer: "`EXPLAIN FORMAT=TREE SELECT ...`",
    explanation: "Tree format execution plan analysis.",
    hint: "EXPLAIN FORMAT=TREE.",
    level: "moderate"
  },
  {
    question: "What join algorithm does MySQL 8.0.18+ default to for large unindexed equijoins in multi-table queries?",
    shortAnswer: "Hash Join.",
    explanation: "Hash Join algorithm in modern MySQL.",
    hint: "Hash Join.",
    level: "moderate"
  },
  {
    question: "In order line-item analytics, how do you calculate total gross order revenue per category?",
    shortAnswer: "`SELECT cat.category_name, SUM(oi.quantity * oi.unit_price) FROM categories cat JOIN products p USING (category_id) JOIN order_items oi USING (product_id) GROUP BY cat.category_id, cat.category_name;`",
    explanation: "Category revenue aggregation across 3 tables.",
    hint: "Join categories to products and order_items with SUM(qty * price).",
    level: "basic"
  },
  {
    question: "Why should `COALESCE()` be applied to aggregated sums in customer 360-degree reports?",
    shortAnswer: "To display `₹0.00` instead of `NULL` for customers who have placed zero orders or made zero payments.",
    explanation: "Clean output formatting with COALESCE.",
    hint: "Prevents NULL values and formats defaults as ₹0.00.",
    level: "basic"
  },
  {
    question: "In logistics analytics, how do you find carriers with an on-time delivery rate below 90%?",
    shortAnswer: "Join `carriers` with `shipments`, calculate `SUM(CASE WHEN status = 'DELIVERED_ON_TIME' THEN 1 ELSE 0 END) / COUNT(*) * 100`, and filter in the `HAVING` clause.",
    explanation: "Carrier SLA performance aggregation.",
    hint: "Calculate percentage in SELECT and filter HAVING rate < 90.",
    level: "moderate"
  },
  {
    question: "Can a CTE pre-aggregation query contain window functions like `ROW_NUMBER()`?",
    shortAnswer: "YES. CTEs can contain window functions (e.g. to isolate each customer's most recent order date).",
    explanation: "Combining window functions with CTEs.",
    hint: "Yes, fully supported in MySQL 8.0+.",
    level: "moderate"
  },
  {
    question: "In financial accounting, how do you audit discrepancies between internal order totals and payment gateway captured amounts?",
    shortAnswer: "`SELECT o.order_id, o.total_amount, p.amount_paid, (o.total_amount - p.amount_paid) AS discrepancy FROM orders o JOIN payments p USING (order_id) WHERE o.total_amount != p.amount_paid;`",
    explanation: "Financial discrepancy detection query.",
    hint: "Join orders to payments and filter WHERE total != amount_paid.",
    level: "basic"
  },
  {
    question: "How do you write a query that identifies customers who have registered but have NEVER placed any order?",
    shortAnswer: "`SELECT c.customer_id, c.customer_name FROM customers c LEFT JOIN orders o USING (customer_id) WHERE o.order_id IS NULL;`",
    explanation: "Customer acquisition zero-order anti-join.",
    hint: "LEFT JOIN orders WHERE o.order_id IS NULL.",
    level: "basic"
  },
  {
    question: "What is the benefit of encapsulating the Customer 360 analytics query inside a MySQL View?",
    shortAnswer: "It allows reporting dashboards (Tableau, PowerBI, Web UIs) to query `SELECT * FROM view_customer_360` without writing 50 lines of join SQL.",
    explanation: "View encapsulation for reporting dashboards.",
    hint: "Simplifies BI dashboard access to complex multi-table SQL.",
    level: "basic"
  },
  {
    question: "What happens if an order has multiple partial payments (e.g. 2 payments of ₹2,500 for a ₹5,000 order)?",
    shortAnswer: "The CTE `SUM(amount_paid)` correctly sums them to ₹5,000, reducing the net outstanding balance to ₹0.00.",
    explanation: "Partial payment handling in pre-aggregation CTE.",
    hint: "Correctly summed in the payments CTE to ₹5,000.",
    level: "basic"
  },
  {
    question: "In warehouse dispatch, how do you list orders that are ready to pack (Payment Settled + Zero Shipments Generated)?",
    shortAnswer: "`SELECT o.order_id FROM orders o JOIN payments p USING (order_id) LEFT JOIN shipments s USING (order_id) WHERE p.payment_status = 'SETTLED' AND s.shipment_id IS NULL;`",
    explanation: "Warehouse packing queue query.",
    hint: "Paid orders with NULL shipment records.",
    level: "basic"
  },
  {
    question: "Why should `DISTINCT` be avoided inside multi-table aggregate queries?",
    shortAnswer: "Because `SUM(DISTINCT amount)` incorrectly deletes legitimate identical order amounts, corrupting financial reporting.",
    explanation: "Financial corruption risk of SUM(DISTINCT).",
    hint: "Deletes legitimate identical amounts, corrupting financial reports.",
    level: "basic"
  },
  {
    question: "How do you calculate the average delivery time per shipping carrier in days?",
    shortAnswer: "`SELECT carrier_name, ROUND(AVG(DATEDIFF(delivered_date, dispatch_date)), 1) AS avg_days FROM shipments WHERE delivery_status = 'DELIVERED' GROUP BY carrier_name;`",
    explanation: "Carrier transit time calculation.",
    hint: "AVG(DATEDIFF(delivered_date, dispatch_date)) GROUP BY carrier.",
    level: "basic"
  },
  {
    question: "In product inventory, how do you find products that have NEVER been ordered by any customer?",
    shortAnswer: "`SELECT p.product_id, p.product_name FROM products p LEFT JOIN order_items oi USING (product_id) WHERE oi.item_id IS NULL;`",
    explanation: "Zero-sales inventory anti-join.",
    hint: "products LEFT JOIN order_items WHERE oi.item_id IS NULL.",
    level: "basic"
  },
  {
    question: "What is the role of `SQL_CALC_FOUND_ROWS` in MySQL 8.0, and why is it deprecated?",
    shortAnswer: "It was used for pagination row counting; it is deprecated because executing two separate queries (`SELECT ... LIMIT` and `SELECT COUNT(*)`) is faster and optimizes better.",
    explanation: "Pagination deprecation in modern MySQL.",
    hint: "Deprecated in MySQL 8.0 in favor of separate COUNT(*) queries.",
    level: "expert"
  },
  {
    question: "In customer retention, write a query to find customers who placed orders in 2025 but placed ZERO orders in 2026.",
    shortAnswer: "`SELECT DISTINCT c.customer_id, c.customer_name FROM customers c JOIN orders o25 ON c.customer_id = o25.customer_id AND YEAR(o25.order_date) = 2025 LEFT JOIN orders o26 ON c.customer_id = o26.customer_id AND YEAR(o26.order_date) = 2026 WHERE o26.order_id IS NULL;`",
    explanation: "Year-over-year customer churn anti-join.",
    hint: "Join 2025 orders with LEFT JOIN 2026 orders WHERE o26.id IS NULL.",
    level: "moderate"
  },
  {
    question: "How do you ensure consistent Indian Rupee formatting across all currency columns in a complex join query?",
    shortAnswer: "Using `CONCAT('₹', FORMAT(amount, 2))` on final computed columns.",
    explanation: "Indian Rupee output formatting.",
    hint: "CONCAT('₹', FORMAT(amount, 2)).",
    level: "basic"
  },
  {
    question: "What is the memory limit variable in MySQL that governs in-memory Hash Join buffers?",
    shortAnswer: "`join_buffer_size`.",
    explanation: "MySQL join buffer memory configuration.",
    hint: "join_buffer_size.",
    level: "expert"
  },
  {
    question: "In e-commerce return analytics, how do you calculate the return rate percentage per product category?",
    shortAnswer: "`SELECT cat.name, (COUNT(r.return_id) / COUNT(oi.item_id)) * 100 AS return_rate FROM categories cat JOIN products p USING (category_id) JOIN order_items oi USING (product_id) LEFT JOIN returns r USING (item_id) GROUP BY cat.id, cat.name;`",
    explanation: "Category return rate percentage calculation.",
    hint: "COUNT(returns) / COUNT(order_items) * 100.",
    level: "moderate"
  },
  {
    question: "How does a database administrator monitor running long-lived join queries?",
    shortAnswer: "By executing `SHOW FULL PROCESSLIST;` or querying `information_schema.processlist` / `performance_schema.events_statements_current`.",
    explanation: "Monitoring active query processes.",
    hint: "SHOW FULL PROCESSLIST;",
    level: "basic"
  },
  {
    question: "What is the risk of using `ORDER BY rand()` in a multi-table join?",
    shortAnswer: "It forces MySQL to build an unindexed temporary table on disk and sort the entire Cartesian intermediate result set, crippling server performance.",
    explanation: "ORDER BY RAND() penalty in joins.",
    hint: "Forces full Cartesian temporary disk table generation and sort.",
    level: "moderate"
  },
  {
    question: "What is the benefit of using `STRAIGHT_JOIN` in a known-optimal enterprise analytics query?",
    shortAnswer: "It prevents the query optimizer from wasting CPU time evaluating permutations when the developer has already structured the optimal join order.",
    explanation: "STRAIGHT_JOIN query hint.",
    hint: "Forces exact join order, bypassing optimizer search time.",
    level: "expert"
  },
  {
    question: "What is the ultimate takeaway for database engineers from Module 002_005 (Mastering SQL Joins)?",
    shortAnswer: "SQL Joins are the foundation of relational analytics; always use explicit ANSI syntax, avoid aggregate fan-out with CTE pre-aggregation, leverage anti-joins for discrepancy audits, index all foreign keys, and verify execution plans with EXPLAIN.",
    explanation: "Final summary conclusion for Module 002_005.",
    hint: "Master ANSI joins, CTE pre-aggregation, anti-joins, foreign key indexing, and EXPLAIN execution plans.",
    level: "basic"
  }
];

export default questions;
