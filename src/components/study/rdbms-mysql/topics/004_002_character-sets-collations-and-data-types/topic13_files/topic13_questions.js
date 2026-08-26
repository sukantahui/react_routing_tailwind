// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What is a 'Hybrid Relational + JSON' schema architecture in MySQL?",
    shortAnswer: "An architectural design pattern that combines **relational columns for core, strictly constrained entity fields** (Primary Keys, Foreign Keys, currency amounts, inventory counts) with **native JSON columns for dynamic, polymorphic attributes** (custom product specifications, tags, metadata).",
    explanation: "Provides document flexibility without sacrificing ACID transactions or relational integrity.",
    hint: "Combines relational columns for core fields with JSON for dynamic polymorphic attributes.",
    level: "basic"
  },
  {
    question: "Why does a pure relational schema struggle with polymorphic e-commerce product catalogs?",
    shortAnswer: "Because different product categories have completely different attributes (e.g. Laptops have RAM/CPU; Clothing has Size/Fabric; Groceries have Expiry Date), forcing pure relational schemas into **anti-patterns like Entity-Attribute-Value (EAV) or 200 sparse NULL columns**.",
    explanation: "EAV tables require massive JOINs and destroy query performance.",
    hint: "Leads to anti-patterns like EAV tables with hundreds of slow JOINs or sparse NULL columns.",
    level: "expert"
  },
  {
    question: "Why does a pure NoSQL document database (like MongoDB) struggle with high-concurrency inventory counts and financial ledgers?",
    shortAnswer: "Because pure NoSQL databases lack **native relational ACID isolation levels, strict foreign key cascading integrity, and hardware-packed exact DECIMAL fixed-point math**, making stock overselling and ledger rounding discrepancies harder to prevent under heavy write concurrency.",
    explanation: "Relational engines guarantee 100% ACID consistency for inventory and banking.",
    hint: "Lacks relational foreign keys, row-level ACID locking guarantees, and packed DECIMAL precision.",
    level: "expert"
  },
  {
    question: "How do you define an ultra-fast, case-sensitive SKU column in a hybrid product table?",
    shortAnswer: "`sku VARCHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE`",
    explanation: "Uses 1 byte per character, enforces exact casing, and creates a compact unique B+ tree index.",
    hint: "VARCHAR(32) CHARACTER SET ascii COLLATE ascii_bin UNIQUE.",
    level: "basic",
    codeExample: "sku VARCHAR(32) CHARACTER SET ascii COLLATE ascii_bin UNIQUE NOT NULL"
  },
  {
    question: "Why should `base_price_inr` use `DECIMAL(10, 2)` instead of `FLOAT` or `DOUBLE`?",
    shortAnswer: "Because `DECIMAL(10, 2)` stores numbers with **100% exact mathematical accuracy** without floating-point binary rounding errors, ensuring exact Indian Rupee (₹) and paise reconciliation during invoicing and checkout.",
    explanation: "Mandatory standard for all financial calculations.",
    hint: "Guarantees 100% exact currency math without floating point rounding discrepancies.",
    level: "basic"
  },
  {
    question: "How do you create an instant B+ tree index on the `brand` property inside a product's JSON `attributes` column?",
    shortAnswer: "Create a `VIRTUAL` generated column and attach a standard index:\n`brand VARCHAR(50) GENERATED ALWAYS AS (attributes->>'$.brand') VIRTUAL,`\n`INDEX idx_brand (brand)`",
    explanation: "Costs 0 extra bytes in main table rows while enabling instant O(log N) index lookups.",
    hint: "Create a VIRTUAL generated column and attach a secondary B+ tree index.",
    level: "basic",
    codeExample: "ALTER TABLE product_catalog \nADD COLUMN brand VARCHAR(50) AS (attributes->>'$.brand') VIRTUAL, \nADD INDEX idx_brand (brand);"
  },
  {
    question: "How do you index an array of promotional tags (e.g. `tags: [\"gaming\", \"fast-delivery\"]`) in a hybrid product table?",
    shortAnswer: "Create a **Multi-Valued Index**:\n`INDEX idx_tags ((CAST(attributes->'$.tags' AS CHAR(30) ARRAY)))`",
    explanation: "Allows 1-to-many B+ tree mapping for instant tag membership searches.",
    hint: "INDEX idx_tags ((CAST(attributes->'$.tags' AS CHAR(30) ARRAY))).",
    level: "basic"
  },
  {
    question: "How do you integrate GPS warehouse coordinates into the hybrid product schema?",
    shortAnswer: "`warehouse_location POINT NOT NULL SRID 4326, SPATIAL INDEX (warehouse_location)`",
    explanation: "Enables real-world geodesic distance calculations in meters on Earth's ellipsoid.",
    hint: "POINT NOT NULL SRID 4326 with a SPATIAL INDEX.",
    level: "basic"
  },
  {
    question: "How do you query for laptops under ₹75,000 with the 'gaming' tag located within 10 km of Barrackpore in a single query?",
    shortAnswer: "Combine relational filters, multi-valued operators, and spatial functions in one `WHERE` clause:\n`WHERE base_price_inr <= 75000`\n`  AND brand = 'Lenovo'`\n`  AND 'gaming' MEMBER OF (attributes->'$.tags')`\n`  AND ST_Distance(warehouse_location, @barrackpore_pt) <= 10000;`",
    explanation: "Demonstrates the power of the hybrid schema executing multi-paradigm filtering in a single query.",
    hint: "Combine price filter, generated column brand, MEMBER OF tag, and ST_Distance in WHERE.",
    level: "expert",
    codeExample: "SELECT product_name, base_price_inr, brand \nFROM product_catalog \nWHERE base_price_inr <= 75000.00 \n  AND 'gaming' MEMBER OF (attributes->'$.tags') \n  AND ST_Distance(warehouse_location, ST_GeomFromText('POINT(88.3533 22.7634)', 4326)) <= 10000;"
  },
  {
    question: "How do you execute an atomic in-place price and specification update on a hybrid product row?",
    shortAnswer: "Execute an `UPDATE` combining relational column updates with `JSON_SET`:\n`UPDATE product_catalog`\n`SET base_price_inr = 69999.00,`\n`    attributes = JSON_SET(attributes, '$.ram_gb', 16, '$.updated_by', 'admin')`\n`WHERE product_id = 101;`",
    explanation: "Updates both relational financial columns and JSON attributes in a single ACID transaction.",
    hint: "Combine SET on relational columns with JSON_SET on attributes column in one UPDATE.",
    level: "basic",
    codeExample: "UPDATE product_catalog \nSET base_price_inr = 69999.00, \n    attributes = JSON_SET(attributes, '$.ram_gb', 16) \nWHERE sku = 'LAP-LEGION-01';"
  },
  {
    question: "What character set and collation should the hybrid product catalog table use?",
    shortAnswer: "**`CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci`**",
    explanation: "Guarantees full Unicode support for Bengali, Hindi, and product emojis with Unicode 9.0 sorting.",
    hint: "utf8mb4 with utf8mb4_0900_ai_ci.",
    level: "basic"
  },
  {
    question: "Why should `created_at` and `updated_at` use `DATETIME(6)` instead of `TIMESTAMP`?",
    shortAnswer: "Because `DATETIME(6)` spans from year 1000 to 9999 (immune to the Year 2038 overflow), provides microsecond audit precision, and remains timezone-neutral across distributed server nodes.",
    explanation: "Guarantees future-proof audit logging without Y2038 crashes.",
    hint: "DATETIME(6) avoids the Year 2038 bug and provides microsecond precision.",
    level: "basic"
  },
  {
    question: "How do you enforce that every product MUST contain a `brand` property in its JSON `attributes`?",
    shortAnswer: "Add a `NOT NULL` constraint to the generated column:\n`brand VARCHAR(50) GENERATED ALWAYS AS (attributes->>'$.brand') VIRTUAL NOT NULL`",
    explanation: "Rejects inserts with documents missing the required brand key.",
    hint: "Add NOT NULL to the VIRTUAL generated column definition.",
    level: "expert"
  },
  {
    question: "What is the memory and disk overhead of adding 5 VIRTUAL generated columns to the product catalog?",
    shortAnswer: "**0 Bytes of on-disk storage** in the table data pages; columns are evaluated dynamically in CPU memory only when requested.",
    explanation: "Zero-cost relational abstraction on table storage.",
    hint: "0 extra bytes on disk in the table data pages.",
    level: "basic"
  },
  {
    question: "How do you export complete product listings formatted for mobile app REST API consumption directly from SQL?",
    shortAnswer: "Use `JSON_OBJECT()` combined with `ST_AsGeoJSON()`:\n`SELECT JSON_OBJECT('id', product_id, 'name', product_name, 'price', base_price_inr, 'specs', attributes, 'location', ST_AsGeoJSON(warehouse_location)) AS product_api_payload FROM product_catalog;`",
    explanation: "Generates production-ready API payloads directly in database memory.",
    hint: "Combine JSON_OBJECT with relational columns and ST_AsGeoJSON.",
    level: "expert",
    codeExample: "SELECT JSON_OBJECT(\n  'sku', sku,\n  'title', product_name,\n  'price', base_price_inr,\n  'attributes', attributes\n) AS api_response \nFROM product_catalog;"
  },
  {
    question: "How does the hybrid schema handle transactional inventory stock reservation during checkout?",
    shortAnswer: "Uses standard ACID row-level locking on the relational `stock_quantity` column:\n`UPDATE product_catalog SET stock_quantity = stock_quantity - 1 WHERE product_id = 101 AND stock_quantity >= 1;`",
    explanation: "Guarantees zero stock overselling with InnoDB row-level locking.",
    hint: "Relational row-level locking prevents overselling with ACID isolation.",
    level: "basic"
  },
  {
    question: "Can you create a composite index on `(brand, base_price_inr)` in the hybrid schema?",
    shortAnswer: "Yes! You can combine the `VIRTUAL` generated `brand` column with the relational `base_price_inr` column in a single composite index: `INDEX idx_brand_price (brand, base_price_inr)`.",
    explanation: "Enables compound filtering on JSON fields and relational columns simultaneously.",
    hint: "Yes, generated columns can be combined with relational columns in composite indexes.",
    level: "basic"
  },
  {
    question: "What happens if an application inserts malformed JSON into the `attributes` column?",
    shortAnswer: "MySQL immediately aborts the transaction with **Error 3140: Invalid JSON text**, protecting catalog integrity.",
    explanation: "Native JSON write-time validation gatekeeper.",
    hint: "Throws Error 3140 and aborts the insert immediately.",
    level: "basic"
  },
  {
    question: "How do you calculate the total catalog value across all product categories using exact arithmetic?",
    shortAnswer: "`SELECT SUM(base_price_inr * stock_quantity) AS total_inventory_valuation_inr FROM product_catalog;`",
    explanation: "Executes 100% exact packed decimal math without losing a single paisa.",
    hint: "SUM(base_price_inr * stock_quantity) with DECIMAL precision.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 13 and the entire Module 004_002?",
    shortAnswer: "Modern MySQL 8.0 is a unified multi-model database engine: by harmonizing `utf8mb4_0900_ai_ci` encodings, exact `DECIMAL` math, microsecond `DATETIME(6)` audits, native `JSON` with `VIRTUAL` and `Multi-Valued` indexing, and `SRID 4326` geospatial GIS, developers can build enterprise-scale hybrid systems that outperform standalone single-paradigm databases.",
    explanation: "The complete synthesis of storage, character sets, types, JSON, and spatial technologies.",
    hint: "MySQL 8.0 seamlessly combines relational ACID integrity, NoSQL document JSON, and GIS spatial intelligence.",
    level: "basic"
  }
];

export default questions;
