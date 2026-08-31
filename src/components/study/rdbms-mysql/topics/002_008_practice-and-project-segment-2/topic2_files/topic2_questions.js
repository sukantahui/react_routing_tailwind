// topic2_files/topic2_questions.js

const questions = [
  {
    question: "Why is a retail order normalized into `customer_orders` (Header) and `order_items` (Lines)?",
    shortAnswer: "To achieve 1NF (atomicity) and allow an order to contain multiple products with distinct quantities, unit prices, and discounts.",
    explanation: "Eliminates repeating groups and supports variable line items per invoice.",
    hint: "Separates order header summary from itemized order line items in 1NF.",
    level: "basic"
  },
  {
    question: "Why MUST `order_items` store a snapshot of `unit_price_at_sale_inr` rather than joining to `products.selling_price_inr`?",
    shortAnswer: "To prevent price-drift: if the product's selling price changes in the catalog later, historical sales invoices and accounting records must preserve the exact price paid at the time of purchase.",
    explanation: "Historical accounting records must be immutable.",
    hint: "Preserves the exact sale price paid regardless of future catalog price changes.",
    level: "basic"
  },
  {
    question: "What is the relationship between `warehouses` and `products` in an enterprise supply chain database?",
    shortAnswer: "A Many-to-Many ($M:N$) relationship, resolved via the `warehouse_inventory` junction table.",
    explanation: "A warehouse stocks multiple products, and a product is stocked across multiple warehouses.",
    hint: "Many-to-Many resolved via the warehouse_inventory bridge table.",
    level: "basic"
  },
  {
    question: "What is the primary key and unique constraint of the `warehouse_inventory` table?",
    shortAnswer: "`inventory_id` as surrogate Primary Key, with a composite `UNIQUE (warehouse_id, product_id)` constraint.",
    explanation: "Ensures there is exactly one stock ledger record per product per warehouse.",
    hint: "Surrogate PK with UNIQUE (warehouse_id, product_id).",
    level: "moderate"
  },
  {
    question: "How do you calculate the available (unreserved) inventory in a warehouse?",
    shortAnswer: "`quantity_available = (quantity_on_hand - quantity_reserved)`",
    explanation: "Reserved stock represents items in active customer shopping carts or pending checkout.",
    hint: "(quantity_on_hand - quantity_reserved)",
    level: "basic"
  },
  {
    question: "How do you query for products that have fallen below their minimum safety stock level?",
    shortAnswer: "`SELECT ... FROM warehouse_inventory inv JOIN products p ON inv.product_id = p.product_id WHERE inv.quantity_on_hand <= p.min_reorder_level;`",
    explanation: "Triggers automated replenishment purchase orders to suppliers.",
    hint: "WHERE quantity_on_hand <= min_reorder_level",
    level: "basic"
  },
  {
    question: "How do you calculate Gross Profit per product in SQL?",
    shortAnswer: "`SUM(oi.subtotal_inr) - SUM(oi.quantity * p.cost_price_inr)`",
    explanation: "Subtracts Cost of Goods Sold (COGS) from Gross Revenue.",
    hint: "Gross Revenue minus Cost of Goods Sold (COGS).",
    level: "moderate"
  },
  {
    question: "How do you calculate Gross Margin Percentage in SQL?",
    shortAnswer: "`ROUND(((SUM(oi.subtotal_inr) - SUM(oi.quantity * p.cost_price_inr)) / SUM(oi.subtotal_inr)) * 100.0, 2)`",
    explanation: "Expresses profit as a percentage of total sales revenue.",
    hint: "(Gross Profit / Gross Revenue) * 100",
    level: "moderate"
  },
  {
    question: "What foreign key `ON DELETE` rule should be configured between `customer_orders` and `order_items`?",
    shortAnswer: "`ON DELETE CASCADE` on `order_items` so that if a draft order is cancelled and deleted, all its line items are automatically removed.",
    explanation: "Order lines cannot exist without an order header.",
    hint: "ON DELETE CASCADE on order_items.",
    level: "moderate"
  },
  {
    question: "What foreign key `ON DELETE` rule should be configured between `products` and `order_items`?",
    shortAnswer: "`ON DELETE RESTRICT` to prevent deleting a product that exists in past sales invoices.",
    explanation: "Protects historical sales audit trails.",
    hint: "ON DELETE RESTRICT to preserve sales audit trails.",
    level: "moderate"
  },
  {
    question: "How do you handle hierarchical product categories (e.g. Electronics → Laptops → Gaming Laptops)?",
    shortAnswer: "Using a Self-Referencing Foreign Key: `categories (category_id PK, category_name, parent_category_id FK → categories.category_id)`.",
    explanation: "Enables arbitrary tree depth for category taxonomies.",
    hint: "Self-referencing foreign key on parent_category_id.",
    level: "moderate"
  },
  {
    question: "How do you prevent two online shoppers from buying the same last inventory item simultaneously?",
    shortAnswer: "Execute `SELECT quantity_on_hand, quantity_reserved FROM warehouse_inventory WHERE warehouse_id = ? AND product_id = ? FOR UPDATE;` inside a transaction.",
    explanation: "Locks the inventory row until the reservation is committed.",
    hint: "Use SELECT ... FOR UPDATE inside a transaction.",
    level: "expert"
  },
  {
    question: "What composite index accelerates daily sales reporting by order date and order status?",
    shortAnswer: "`CREATE INDEX idx_order_date_status ON customer_orders (order_date, order_status);`",
    explanation: "Enables sub-millisecond range scans for financial close reports.",
    hint: "INDEX (order_date, order_status)",
    level: "moderate"
  },
  {
    question: "What index accelerates customer lookup by Phone Number and Email at retail checkout counters?",
    shortAnswer: "`CREATE UNIQUE INDEX idx_cust_phone ON customers(phone);` and `CREATE UNIQUE INDEX idx_cust_email ON customers(email);`",
    explanation: "Delivers $O(\\log N)$ point lookups for cashier lookups.",
    hint: "UNIQUE B-Tree indexes on phone and email.",
    level: "basic"
  },
  {
    question: "How do you calculate Customer Lifetime Value (CLV) in SQL?",
    shortAnswer: "`SELECT c.customer_id, CONCAT(c.first_name, ' ', c.last_name), SUM(o.net_total_inr) AS lifetime_spend FROM customers c JOIN customer_orders o ON c.customer_id = o.customer_id WHERE o.order_status = 'DELIVERED' GROUP BY c.customer_id, c.first_name, c.last_name ORDER BY lifetime_spend DESC;`",
    explanation: "Aggregates total historical net spend per customer.",
    hint: "SUM(net_total_inr) grouped by customer for delivered orders.",
    level: "moderate"
  },
  {
    question: "How do you calculate Customer Recency (days since last purchase) in SQL?",
    shortAnswer: "`DATEDIFF(CURRENT_DATE, MAX(o.order_date)) AS recency_days` grouped by customer.",
    explanation: "Measures days elapsed since the customer's most recent order.",
    hint: "DATEDIFF(CURRENT_DATE, MAX(order_date))",
    level: "moderate"
  },
  {
    question: "What is an RFM (Recency, Frequency, Monetary) Customer Segmentation analysis?",
    shortAnswer: "A marketing segmentation model analyzing how recently a customer purchased ($R$), how often they purchase ($F$), and how much money they spend ($M$).",
    explanation: "Segments customers into VIPs, loyalists, at-risk, and churned groups.",
    hint: "Analyzes Recency, Frequency, and Monetary value for customer segmentation.",
    level: "expert"
  },
  {
    question: "How do you automatically decrement warehouse stock when a purchase order is shipped?",
    shortAnswer: "Use database triggers (`AFTER UPDATE ON customer_orders`) or an application checkout transaction updating `warehouse_inventory`.",
    explanation: "Maintains real-time inventory ledger accuracy.",
    hint: "Trigger or application transaction updates warehouse_inventory.",
    level: "expert"
  },
  {
    question: "What is the purpose of the `purchase_orders` and `purchase_order_items` tables?",
    shortAnswer: "To track procurement replenishment orders placed with third-party manufacturers/suppliers before stock arrives at warehouses.",
    explanation: "Separates supplier procurement from customer retail sales.",
    hint: "Tracks B2B supplier procurement and inbound stock shipments.",
    level: "basic"
  },
  {
    question: "Why should `products.sku_code` have a `UNIQUE` index?",
    shortAnswer: "Because Stock Keeping Units (SKUs) are distinct internal business identifiers for physical merchandise.",
    explanation: "Prevents accidental duplicate product catalog entries.",
    hint: "SKUs are unique barcoded inventory identifiers.",
    level: "basic"
  },
  {
    question: "What query identifies top 10 bestselling products by total quantity sold?",
    shortAnswer: "`SELECT p.sku_code, p.product_name, SUM(oi.quantity) AS total_sold FROM order_items oi JOIN products p ON oi.product_id = p.product_id GROUP BY p.product_id, p.sku_code, p.product_name ORDER BY total_sold DESC LIMIT 10;`",
    explanation: "Aggregates item quantities across all orders.",
    hint: "SUM(quantity) GROUP BY product_id ORDER BY total_sold DESC LIMIT 10.",
    level: "basic"
  },
  {
    question: "How do you find all suppliers who have NOT received a single purchase order in the last 6 months?",
    shortAnswer: "Use a `LEFT JOIN purchase_orders po ON s.supplier_id = po.supplier_id AND po.po_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH) WHERE po.po_id IS NULL;`",
    explanation: "Identifies dormant or inactive suppliers.",
    hint: "LEFT JOIN on purchase_orders with date filter WHERE po_id IS NULL.",
    level: "moderate"
  },
  {
    question: "What check constraint ensures that product selling prices are never lower than cost prices?",
    shortAnswer: "`CHECK (selling_price_inr >= cost_price_inr)`",
    explanation: "Enforces positive gross margins at the schema level.",
    hint: "CHECK (selling_price_inr >= cost_price_inr)",
    level: "basic"
  },
  {
    question: "What check constraint ensures order item quantities are strictly positive integers?",
    shortAnswer: "`CHECK (quantity > 0)`",
    explanation: "Prevents zero or negative line quantities.",
    hint: "CHECK (quantity > 0)",
    level: "basic"
  },
  {
    question: "How do you rank products by sales revenue within each category using window functions?",
    shortAnswer: "`DENSE_RANK() OVER (PARTITION BY p.category_id ORDER BY SUM(oi.subtotal_inr) DESC) AS rank_in_category`",
    explanation: "Computes category-specific sales leaderboards.",
    hint: "DENSE_RANK() OVER (PARTITION BY category_id ORDER BY SUM(subtotal) DESC)",
    level: "expert"
  },
  {
    question: "How do customer purchases for Mamata, Susmita, Abhronila, and Debangshu illustrate multi-table order tracking?",
    shortAnswer: "By joining `customers` to `customer_orders` (1:N), `customer_orders` to `order_items` (1:N), and `order_items` to `products` (N:1) across Barrackpore and Kolkata warehouses.",
    explanation: "Demonstrates complete traversal from customer to product SKU.",
    hint: "Traverses customers, orders, order items, and products.",
    level: "basic"
  },
  {
    question: "What database view would you build for executive daily revenue dashboards?",
    shortAnswer: "`CREATE VIEW view_daily_revenue_kpis AS SELECT DATE(order_date) AS sale_date, COUNT(order_id) AS total_orders, SUM(net_total_inr) AS revenue FROM customer_orders WHERE order_status = 'DELIVERED' GROUP BY DATE(order_date);`",
    explanation: "Prepares a standard executive reporting view.",
    hint: "A view aggregating daily order volume and net revenue.",
    level: "basic"
  },
  {
    question: "What index type should be placed on `(products.product_name, products.sku_code)` for e-commerce search bars?",
    shortAnswer: "`FULLTEXT INDEX` (or composite B-Tree for exact SKU lookups).",
    explanation: "Enables fast search on product titles.",
    hint: "FULLTEXT inverted index on title and description.",
    level: "basic"
  },
  {
    question: "How do you handle multi-warehouse stock transfer between Barrackpore and Kolkata warehouses?",
    shortAnswer: "Wrap in a transaction: decrement `quantity_on_hand` at Barrackpore warehouse and increment `quantity_on_hand` at Kolkata warehouse.",
    explanation: "Maintains balanced double-entry inventory transfer.",
    hint: "Atomic transaction decrementing source warehouse and incrementing destination.",
    level: "expert"
  },
  {
    question: "What is the key takeaway from the Retail Inventory & Order Processing database project?",
    shortAnswer: "Separating order headers from line items in 1NF, freezing historical price snapshots on invoices, managing multi-warehouse stock with row locks, and monitoring minimum reorder levels ensures an enterprise-ready supply chain engine.",
    explanation: "Comprehensive supply chain relational modeling mastery.",
    hint: "1NF itemization + frozen price snapshots + multi-warehouse inventory locking.",
    level: "expert"
  }
];

export default questions;
