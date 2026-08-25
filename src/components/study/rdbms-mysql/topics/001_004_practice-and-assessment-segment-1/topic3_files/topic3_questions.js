// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the standard DML sequence for inserting a new customer order containing multiple line items?",
    shortAnswer: "1) Insert parent order into `orders` to generate `order_id`, 2) Retrieve `LAST_INSERT_ID()`, 3) Batch insert line items into `order_items` referencing the generated `order_id`.",
    explanation: "Ensures foreign key linkages are established with valid parent IDs.",
    hint: "Insert into orders first, capture LAST_INSERT_ID(), then insert into order_items.",
    level: "basic",
    codeExample: "INSERT INTO orders (customer_id, order_total_inr) VALUES (1, 12500.00);\nSET @new_order_id = LAST_INSERT_ID();\nINSERT INTO order_items (order_id, product_name, quantity, unit_price_inr) VALUES (@new_order_id, 'Laptop', 1, 12500.00);"
  },
  {
    question: "How do you query all orders placed by customers residing in either 'Barrackpore' or 'Kolkata' with an order total exceeding ₹5,000?",
    shortAnswer: "`SELECT o.order_id, c.full_name, c.city, o.order_total_inr FROM orders o JOIN customers c ON o.customer_id = c.customer_id WHERE c.city IN ('Barrackpore', 'Kolkata') AND o.order_total_inr > 5000;`",
    explanation: "Combines an `INNER JOIN` with list membership (`IN`) and relational comparison (`>`).",
    hint: "JOIN orders with customers and filter city IN ('Barrackpore', 'Kolkata') AND order_total_inr > 5000.",
    level: "basic"
  },
  {
    question: "What happens to child records in `order_items` when a parent order is deleted under `ON DELETE CASCADE`?",
    shortAnswer: "All child line items associated with that `order_id` in `order_items` are automatically deleted by MySQL, leaving zero orphan items.",
    explanation: "Maintains referential integrity automatically across parent-child relationships.",
    hint: "Automatically deletes all associated child items in order_items.",
    level: "basic"
  },
  {
    question: "How do you update the status of an order from 'Pending' to 'Shipped' safely?",
    shortAnswer: "`UPDATE orders SET order_status = 'Shipped' WHERE order_id = 101 AND order_status = 'Pending';`",
    explanation: "Targets the exact Primary Key while validating current status to prevent race condition overwrites.",
    hint: "UPDATE orders SET order_status = 'Shipped' WHERE order_id = ? AND order_status = 'Pending';",
    level: "basic"
  },
  {
    question: "How do you find orders placed between '2026-08-01' and '2026-08-31' inclusive?",
    shortAnswer: "`SELECT order_id, order_date, order_total_inr FROM orders WHERE order_date BETWEEN '2026-08-01' AND '2026-08-31';`",
    explanation: "Uses the inclusive `BETWEEN ... AND` operator on date columns.",
    hint: "WHERE order_date BETWEEN '2026-08-01' AND '2026-08-31'",
    level: "basic"
  },
  {
    question: "Why should you always include a `WHERE` clause when executing `DELETE FROM orders`?",
    shortAnswer: "Because omitting the `WHERE` clause deletes **every single row** in the table, destroying the entire production order history.",
    explanation: "A missing WHERE clause is the most common cause of catastrophic accidental data deletion.",
    hint: "Omitting WHERE deletes all records table-wide.",
    level: "basic"
  },
  {
    question: "How do you paginate the 10 most recent orders using `LIMIT` and `OFFSET`?",
    shortAnswer: "`SELECT order_id, customer_id, order_date, order_total_inr FROM orders ORDER BY order_date DESC, order_id DESC LIMIT 10 OFFSET 0;`",
    explanation: "Sorts newest orders first and restricts the page size to 10 records.",
    hint: "ORDER BY order_date DESC LIMIT 10 OFFSET 0",
    level: "basic"
  },
  {
    question: "What is the function of `LAST_INSERT_ID()` in MySQL?",
    shortAnswer: "It returns the first automatically generated `AUTO_INCREMENT` value set by the most recent `INSERT` statement on the current connection.",
    explanation: "Crucial for retrieving newly generated primary keys in transactional scripts.",
    hint: "Returns the last auto-increment integer generated on the connection.",
    level: "basic"
  },
  {
    question: "How do you search for customers whose email address ends with '@gmail.com'?",
    shortAnswer: "`SELECT customer_id, full_name, email FROM customers WHERE email LIKE '%@gmail.com';`",
    explanation: "Uses `%` wildcard to match any prefix preceding the specified domain.",
    hint: "WHERE email LIKE '%@gmail.com'",
    level: "basic"
  },
  {
    question: "How do you calculate the total line-item subtotal (`quantity * unit_price_inr`) in a query?",
    shortAnswer: "`SELECT item_id, product_name, quantity, unit_price_inr, (quantity * unit_price_inr) AS line_subtotal_inr FROM order_items WHERE order_id = 5;`",
    explanation: "Performs row-level arithmetic projection with an alias.",
    hint: "Multiply quantity by unit_price_inr with an AS alias.",
    level: "basic"
  },
  {
    question: "What does `payment_method ENUM('UPI', 'Credit Card', 'Net Banking', 'Cash on Delivery')` enforce?",
    shortAnswer: "It guarantees that payment method records must be one of the four approved strings, rejecting any unrecognized payment type.",
    explanation: "Enforces strict domain integrity on payment channels.",
    hint: "Restricts payment method values to approved channels only.",
    level: "basic"
  },
  {
    question: "How do you find customers who have NEVER placed any order?",
    shortAnswer: "`SELECT c.customer_id, c.full_name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;`",
    explanation: "Uses a `LEFT JOIN` and filters where the right-table primary key `IS NULL` (an Antijoin pattern).",
    hint: "LEFT JOIN customers with orders and filter WHERE orders.order_id IS NULL.",
    level: "expert",
    codeExample: "SELECT c.customer_id, c.full_name, c.email\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL;"
  },
  {
    question: "How do you apply a 10% discount to all orders with status 'Pending' placed before '2026-08-01'?",
    shortAnswer: "`UPDATE orders SET order_total_inr = order_total_inr * 0.90 WHERE order_status = 'Pending' AND order_date < '2026-08-01';`",
    explanation: "Multiplies order total by 0.90 for matching pending orders.",
    hint: "UPDATE orders SET order_total_inr = order_total_inr * 0.90 WHERE...",
    level: "basic"
  },
  {
    question: "What does `order_id INT NOT NULL UNIQUE` on `payment_transactions` enforce?",
    shortAnswer: "It enforces a strict 1-to-1 relationship between an order and its settlement payment transaction record.",
    explanation: "Prevents duplicate settlement transaction records for the same order.",
    hint: "Enforces a 1:1 relationship between orders and payments.",
    level: "expert"
  },
  {
    question: "How do you delete a specific line item from an order without deleting the order itself?",
    shortAnswer: "`DELETE FROM order_items WHERE item_id = 25 AND order_id = 10;`",
    explanation: "Deletes the individual child row by targeting its Primary Key and parent ID.",
    hint: "DELETE FROM order_items WHERE item_id = ?;",
    level: "basic"
  },
  {
    question: "How do you find all orders where payment was completed via 'UPI'?",
    shortAnswer: "`SELECT o.order_id, o.order_total_inr, p.payment_method, p.amount_paid_inr FROM orders o JOIN payment_transactions p ON o.order_id = p.order_id WHERE p.payment_method = 'UPI';`",
    explanation: "Joins orders to payment transactions and filters on payment method.",
    hint: "JOIN orders with payment_transactions WHERE payment_method = 'UPI'.",
    level: "basic"
  },
  {
    question: "Why is `order_total_inr DECIMAL(10,2) CHECK (order_total_inr >= 0)` important?",
    shortAnswer: "It guarantees that an order total can never be recorded as a negative number, protecting accounting integrity.",
    explanation: "Prevents invalid negative ledger entries at the database engine level.",
    hint: "Prevents negative order total values at the database level.",
    level: "basic"
  },
  {
    question: "How do you retrieve the top 3 highest value orders ever placed in the store?",
    shortAnswer: "`SELECT order_id, customer_id, order_total_inr FROM orders ORDER BY order_total_inr DESC LIMIT 3;`",
    explanation: "Sorts in descending order of total price and limits the output to 3.",
    hint: "ORDER BY order_total_inr DESC LIMIT 3;",
    level: "basic"
  },
  {
    question: "What does `DEFAULT CURRENT_TIMESTAMP` do on `payment_date`?",
    shortAnswer: "It automatically records the exact date and second when the payment transaction was inserted into MySQL.",
    explanation: "Provides automated timestamp auditing on transaction settlements.",
    hint: "Automatically populates the column with current system timestamp upon insertion.",
    level: "basic"
  },
  {
    question: "How do you search for customers whose phone number starts with '98300'?",
    shortAnswer: "`SELECT customer_id, full_name, phone_number FROM customers WHERE phone_number LIKE '98300%';`",
    explanation: "Uses the prefix wildcard pattern `98300%` (which is sargable and index-friendly).",
    hint: "WHERE phone_number LIKE '98300%'",
    level: "basic"
  },
  {
    question: "How do you count total items purchased within a specific order?",
    shortAnswer: "`SELECT order_id, SUM(quantity) AS total_items_count FROM order_items WHERE order_id = 12 GROUP BY order_id;`",
    explanation: "Sums the `quantity` column across all line items of that order.",
    hint: "SUM(quantity) WHERE order_id = ? GROUP BY order_id.",
    level: "basic"
  },
  {
    question: "What error occurs if you insert an order referencing a non-existent `customer_id = 9999`?",
    shortAnswer: "MySQL throws Error 1452: `Cannot add or update a child row: a foreign key constraint fails`.",
    explanation: "Foreign key checks block invalid parent key references.",
    hint: "Error 1452 Foreign key constraint fails.",
    level: "basic"
  },
  {
    question: "How do you update multiple columns simultaneously on a customer record?",
    shortAnswer: "`UPDATE customers SET full_name = 'Mamata Hui', city = 'Kolkata' WHERE customer_id = 1;`",
    explanation: "Separates multiple column assignments with commas inside a single `UPDATE` statement.",
    hint: "UPDATE customers SET col1 = val1, col2 = val2 WHERE customer_id = ?;",
    level: "basic"
  },
  {
    question: "What is the difference between `DELETE FROM table_name;` and `DROP TABLE table_name;`?",
    shortAnswer: "`DELETE` deletes all row records while preserving the table schema and indexes; `DROP` permanently removes both the table data and its schema definition.",
    explanation: "`DELETE` leaves the table ready for new inserts; `DROP` completely destroys the table.",
    hint: "DELETE removes data rows; DROP destroys the table structure completely.",
    level: "basic"
  },
  {
    question: "How do you find all orders that are currently in either 'Shipped' or 'Processing' status?",
    shortAnswer: "`SELECT order_id, customer_id, order_status FROM orders WHERE order_status IN ('Shipped', 'Processing');`",
    explanation: "Uses list filtering to match multiple statuses cleanly.",
    hint: "WHERE order_status IN ('Shipped', 'Processing')",
    level: "basic"
  },
  {
    question: "How do you verify how many orders were placed today?",
    shortAnswer: "`SELECT COUNT(*) AS today_orders_count FROM orders WHERE order_date = CURDATE();`",
    explanation: "Compares the order date with MySQL's `CURDATE()` function.",
    hint: "WHERE order_date = CURDATE()",
    level: "basic"
  },
  {
    question: "Why should `AUTO_INCREMENT` primary keys be `UNSIGNED` in large transaction tables?",
    shortAnswer: "Because `INT UNSIGNED` supports up to 4.29 billion positive IDs (vs 2.14 billion for signed `INT`), doubling capacity before key exhaustion.",
    explanation: "Maximizes integer storage efficiency for high-volume transaction tables.",
    hint: "Doubles positive ID capacity up to 4.29 billion records.",
    level: "expert"
  },
  {
    question: "How do you find all order line items with a unit price strictly greater than ₹1,000?",
    shortAnswer: "`SELECT item_id, order_id, product_name, unit_price_inr FROM order_items WHERE unit_price_inr > 1000 ORDER BY unit_price_inr DESC;`",
    explanation: "Filters line items on unit price and sorts from highest to lowest.",
    hint: "WHERE unit_price_inr > 1000 ORDER BY unit_price_inr DESC",
    level: "basic"
  },
  {
    question: "What does `START TRANSACTION; ... COMMIT;` ensure during multi-table order placement?",
    shortAnswer: "It ensures **Atomicity**: either the order and all its line items and payment record are saved successfully together, or none are saved (via `ROLLBACK`).",
    explanation: "Prevents partial order inserts where an order exists without line items.",
    hint: "Guarantees atomic all-or-nothing execution for multi-table inserts.",
    level: "expert"
  },
  {
    question: "What is the primary pedagogical outcome of completing Hands-on Lab 3?",
    shortAnswer: "Students gain complete fluency in writing comprehensive CRUD queries: transactional insertions, multi-predicate filtering, safe updates, cascading deletions, and financial calculations in Indian Rupees.",
    explanation: "Consolidates all foundational DML and querying skills into practical e-commerce scenarios.",
    hint: "Mastering practical CRUD operations, safe updates, cascading deletes, and multi-table filtering.",
    level: "basic"
  }
];

export default questions;
