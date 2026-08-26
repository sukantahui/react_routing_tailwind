// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is a Stock Keeping Unit (SKU) and why is it defined with a `UNIQUE` constraint?",
    shortAnswer: "An SKU is a distinct alphanumeric identifier assigned to each product variant to track inventory; a `UNIQUE` constraint guarantees no two products share the same SKU code.",
    explanation: "Prevents warehouse inventory tracking confusion and barcode scanning collisions.",
    hint: "Distinct alphanumeric code uniquely identifying each inventory item.",
    level: "basic"
  },
  {
    question: "Why should `stock_quantity` have a `CHECK (stock_quantity >= 0)` constraint in inventory tables?",
    shortAnswer: "To prevent physical warehouse stock from ever dropping into negative numbers due to race conditions or application bugs.",
    explanation: "Enforces physical reality constraints directly at the database engine level.",
    hint: "Prevents warehouse stock from becoming negative.",
    level: "basic",
    codeExample: "CREATE TABLE inventory_stock (\n  stock_quantity INT CHECK (stock_quantity >= 0) DEFAULT 0\n);"
  },
  {
    question: "How do you add a new `discount_pct` column to an existing `products` table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE products ADD COLUMN discount_pct DECIMAL(4,2) DEFAULT 0.00 CHECK (discount_pct BETWEEN 0 AND 100);`",
    explanation: "Adds the new decimal column with a default value and range validation.",
    hint: "ALTER TABLE products ADD COLUMN discount_pct DECIMAL(4,2)...",
    level: "basic"
  },
  {
    question: "What is the difference between `ALTER TABLE ... MODIFY COLUMN` and `CHANGE COLUMN`?",
    shortAnswer: "`MODIFY COLUMN` changes the data type or constraints of a column without renaming it; `CHANGE COLUMN` allows renaming the column while also altering its data type and constraints.",
    explanation: "`CHANGE COLUMN old_name new_name datatype` is used when renaming is required in older MySQL versions.",
    hint: "MODIFY keeps the same column name; CHANGE allows renaming the column.",
    level: "basic"
  },
  {
    question: "How do you rename a column using MySQL 8.0 `RENAME COLUMN` syntax?",
    shortAnswer: "`ALTER TABLE inventory_stock RENAME COLUMN warehouse_city TO storage_location;`",
    explanation: "MySQL 8.0 introduced the clean `RENAME COLUMN old_name TO new_name` syntax.",
    hint: "ALTER TABLE tbl RENAME COLUMN old_name TO new_name;",
    level: "basic",
    codeExample: "ALTER TABLE inventory_stock RENAME COLUMN warehouse_city TO storage_location;"
  },
  {
    question: "How do you calculate the total inventory asset valuation (INR ₹) across all products in stock?",
    shortAnswer: "`SELECT SUM(p.unit_price_inr * i.stock_quantity) AS total_inventory_valuation_inr FROM products p JOIN inventory_stock i ON p.product_id = i.product_id;`",
    explanation: "Multiplies unit price by available stock quantity and sums the total valuation.",
    hint: "SUM(unit_price * stock_quantity) over joined products and inventory.",
    level: "basic"
  },
  {
    question: "How do you find all products that have dropped to or below their reorder threshold level?",
    shortAnswer: "`SELECT p.product_name, p.sku_code, i.stock_quantity, i.reorder_level FROM products p JOIN inventory_stock i ON p.product_id = i.product_id WHERE i.stock_quantity <= i.reorder_level;`",
    explanation: "Identifies products that require immediate purchase orders to restock warehouse shelves.",
    hint: "WHERE stock_quantity <= reorder_level",
    level: "basic"
  },
  {
    question: "What does `is_active BOOLEAN DEFAULT TRUE` accomplish in a product catalog?",
    shortAnswer: "It allows 'Soft Deletion'—deactivating discontinued products (`is_active = FALSE`) without deleting their records, preserving historical order and invoice foreign key references.",
    explanation: "Prevents breaking foreign keys in historical transaction ledgers.",
    hint: "Enables soft deletion to hide discontinued products while preserving order history.",
    level: "expert"
  },
  {
    question: "Why does the `products` table have two separate Foreign Keys (`category_id` and `supplier_id`)?",
    shortAnswer: "To establish a normalized relational model where each product belongs to a distinct category classification and is sourced from an authorized supplier entity.",
    explanation: "Normalizes categories and suppliers into dedicated master tables, eliminating string redundancy.",
    hint: "Links product items to both classification categories and sourcing suppliers.",
    level: "basic"
  },
  {
    question: "How do you drop a column from a table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE products DROP COLUMN discount_pct;`",
    explanation: "Permanently removes the column and its stored data from the table structure.",
    hint: "ALTER TABLE tbl DROP COLUMN col_name;",
    level: "basic"
  },
  {
    question: "What happens if you attempt to insert a product with `unit_price_inr = -50.00`?",
    shortAnswer: "MySQL rejects the insertion and throws Error 3819 due to the `CHECK (unit_price_inr > 0)` constraint.",
    explanation: "Guarantees that prices are strictly positive numbers.",
    hint: "Error 3819 Check constraint is violated.",
    level: "basic"
  },
  {
    question: "How do you search for all products whose category is either 'Electronics' or 'Computer Accessories'?",
    shortAnswer: "`SELECT p.product_name, p.unit_price_inr FROM products p JOIN categories c ON p.category_id = c.category_id WHERE c.category_name IN ('Electronics', 'Computer Accessories');`",
    explanation: "Filters the joined result set using the `IN (...)` operator on category names.",
    hint: "WHERE category_name IN ('Electronics', 'Computer Accessories')",
    level: "basic"
  },
  {
    question: "Why is `product_id INT NOT NULL UNIQUE` in `inventory_stock` configured with a 1-to-1 relationship?",
    shortAnswer: "To ensure that each unique product catalog entry has exactly one inventory stock record per warehouse location.",
    explanation: "Prevents duplicate conflicting stock ledgers for the same physical product.",
    hint: "Enforces 1:1 relationship between product definition and its stock ledger.",
    level: "expert"
  },
  {
    question: "What does `DEFAULT (CURDATE())` do on `last_restocked_date`?",
    shortAnswer: "It automatically records the current date whenever new stock is added without needing manual date inputs.",
    explanation: "Provides automated timestamp auditing on warehouse arrivals.",
    hint: "Automatically populates the column with today's calendar date upon insertion.",
    level: "basic"
  },
  {
    question: "How do you sort products by category name ascending and unit price descending?",
    shortAnswer: "`SELECT c.category_name, p.product_name, p.unit_price_inr FROM products p JOIN categories c ON p.category_id = c.category_id ORDER BY c.category_name ASC, p.unit_price_inr DESC;`",
    explanation: "Groups products by category in alphabetical order, displaying the most expensive products first within each category.",
    hint: "ORDER BY category_name ASC, unit_price_inr DESC",
    level: "basic"
  },
  {
    question: "How do you update the stock quantity of a product after a sale of 5 units?",
    shortAnswer: "`UPDATE inventory_stock SET stock_quantity = stock_quantity - 5 WHERE product_id = 10;`",
    explanation: "Performs atomic arithmetic reduction on the current stock balance.",
    hint: "UPDATE inventory_stock SET stock_quantity = stock_quantity - 5 WHERE product_id = ?;",
    level: "basic"
  },
  {
    question: "What error occurs if you delete a category that still contains active products under `ON DELETE RESTRICT`?",
    shortAnswer: "MySQL blocks the deletion and throws Error 1451: `Cannot delete or update a parent row: a foreign key constraint fails`.",
    explanation: "Guarantees that no products become orphaned without a category.",
    hint: "Error 1451 Foreign key constraint fails.",
    level: "basic"
  },
  {
    question: "How do you count the total number of products supplied by each supplier?",
    shortAnswer: "`SELECT s.supplier_name, COUNT(p.product_id) AS total_products FROM suppliers s LEFT JOIN products p ON s.supplier_id = p.supplier_id GROUP BY s.supplier_id, s.supplier_name;`",
    explanation: "Uses `LEFT JOIN` to include suppliers with zero products, grouping by supplier ID and name.",
    hint: "LEFT JOIN suppliers with products and GROUP BY supplier_name.",
    level: "basic"
  },
  {
    question: "Why should table names be plural (e.g. `products`, `categories`) or consistently singular?",
    shortAnswer: "Consistency in naming conventions prevents developer errors and makes SQL code self-documenting across large engineering teams.",
    explanation: "Industry best practice recommends adhering to a consistent schema naming standard.",
    hint: "Enforces consistent, readable database conventions.",
    level: "basic"
  },
  {
    question: "How do you find products whose SKU code contains the string 'BKP' (indicating Barrackpore stock)?",
    shortAnswer: "`SELECT product_id, sku_code, product_name FROM products WHERE sku_code LIKE '%BKP%';`",
    explanation: "Uses wildcard pattern matching to find substrings within SKU identifiers.",
    hint: "WHERE sku_code LIKE '%BKP%'",
    level: "basic"
  },
  {
    question: "What does `ALTER TABLE products AUTO_INCREMENT = 1000;` do?",
    shortAnswer: "It resets the next generated `AUTO_INCREMENT` primary key value to start at 1,000 instead of 1.",
    explanation: "Useful for generating professional 4-digit or 6-digit product IDs.",
    hint: "Sets the starting number for future auto-increment insertions.",
    level: "basic"
  },
  {
    question: "How do you enforce that a supplier's phone number must be unique across all records?",
    shortAnswer: "Define `phone_number VARCHAR(15) NOT NULL UNIQUE` on the `suppliers` table.",
    explanation: "Guarantees no two supplier accounts share the same primary telephone number.",
    hint: "UNIQUE NOT NULL constraint on the phone_number column.",
    level: "basic"
  },
  {
    question: "How do you add a `NOT NULL` constraint to an existing nullable column?",
    shortAnswer: "`ALTER TABLE products MODIFY COLUMN product_name VARCHAR(120) NOT NULL;`",
    explanation: "Modifies the column definition to reject `NULL` entries (requires all existing rows to have non-null values first).",
    hint: "ALTER TABLE tbl MODIFY COLUMN col_name datatype NOT NULL;",
    level: "basic"
  },
  {
    question: "What is the difference between `DECIMAL(10,2)` and `DECIMAL(4,2)`?",
    shortAnswer: "`DECIMAL(10,2)` stores numbers up to 8 digits before the decimal and 2 after (up to ₹99,999,999.99); `DECIMAL(4,2)` stores up to 2 digits before and 2 after (up to 99.99, ideal for percentages).",
    explanation: "Precision specifies total digits; Scale specifies digits after the decimal point.",
    hint: "Precision is total digits; Scale is digits after decimal point.",
    level: "expert"
  },
  {
    question: "How do you filter products that are priced between ₹500 and ₹5,000 inclusive?",
    shortAnswer: "`SELECT product_name, unit_price_inr FROM products WHERE unit_price_inr BETWEEN 500 AND 5000;`",
    explanation: "Uses the inclusive `BETWEEN ... AND` range operator.",
    hint: "WHERE unit_price_inr BETWEEN 500 AND 5000",
    level: "basic"
  },
  {
    question: "What does `SHOW TABLES;` display in MySQL?",
    shortAnswer: "It lists all table names present in the currently selected active database.",
    explanation: "Essential command for interactive schema inspection.",
    hint: "SHOW TABLES;",
    level: "basic"
  },
  {
    question: "How do you rename a table from `inventory_stock` to `warehouse_inventory`?",
    shortAnswer: "`RENAME TABLE inventory_stock TO warehouse_inventory;`",
    explanation: "Executes an atomic table rename in metadata.",
    hint: "RENAME TABLE old_name TO new_name;",
    level: "basic"
  },
  {
    question: "What is the performance advantage of maintaining clean normalized retail tables?",
    shortAnswer: "It eliminates redundant text storage (e.g., repeating supplier addresses across 10,000 product rows), avoids update anomalies, and minimizes row byte width.",
    explanation: "Normalization keeps data compact and consistent.",
    hint: "Eliminates duplicate text and prevents update anomalies.",
    level: "basic"
  },
  {
    question: "How do you retrieve the 5 least expensive products in the catalog?",
    shortAnswer: "`SELECT product_name, unit_price_inr FROM products WHERE is_active = TRUE ORDER BY unit_price_inr ASC LIMIT 5;`",
    explanation: "Filters active products and sorts ascending by price, returning the top 5.",
    hint: "ORDER BY unit_price_inr ASC LIMIT 5;",
    level: "basic"
  },
  {
    question: "What is the primary architectural outcome of completing Hands-on Lab 2?",
    shortAnswer: "Students gain practical mastery in writing production-grade DDL scripts, creating normalized 1-to-many and 1-to-1 relationships, executing `ALTER TABLE` schema evolutions, and implementing stock inventory calculations in Indian Rupees.",
    explanation: "Translates retail domain requirements into constrained, production-grade MySQL tables.",
    hint: "Mastering retail catalog DDL, foreign keys, ALTER TABLE evolutions, and stock valuation queries.",
    level: "basic"
  }
];

export default questions;
