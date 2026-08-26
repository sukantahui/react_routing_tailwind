import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Hands-on Lab 2: Retail Product Catalog & Inventory DDL Scripts
 * Module: 001_004_practice-and-assessment-segment-1
 *
 * @component
 * @returns {JSX.Element} Interactive lab workbench and step-by-step database tutorial: building a normalized retail product catalog and multi-warehouse inventory schema in MySQL, executing ALTER TABLE schema modifications, calculating inventory valuations, and setting low-stock reorder alerts.
 */
const Topic2 = () => {
  // Interactive Lab Step State
  const [selectedLabStep, setSelectedLabStep] = useState("step1_retail_ddl");

  const labSteps = {
    step1_retail_ddl: {
      stepNumber: "Step 1: Retail DDL",
      title: "1. Step 1: Retail Schema DDL with SKU Uniqueness & Checks",
      badge: "Retail Schema DDL",
      badgeColor: "emerald",
      sqlScript: `-- 🛒 STEP 1: CREATE RETAIL CATALOG & INVENTORY DATABASE:
CREATE DATABASE IF NOT EXISTS retail_inventory_db;
USE retail_inventory_db;

-- 1. Categories Master Table
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
) ENGINE=InnoDB;

-- 2. Suppliers Master Table
CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    city VARCHAR(50) DEFAULT 'Kolkata'
) ENGINE=InnoDB;

-- 3. Products Catalog Table (Child of Categories & Suppliers)
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    supplier_id INT NOT NULL,
    sku_code VARCHAR(30) NOT NULL UNIQUE,
    product_name VARCHAR(120) NOT NULL,
    unit_price_inr DECIMAL(10,2) CHECK (unit_price_inr > 0),
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_prod_category FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE RESTRICT,
    CONSTRAINT fk_prod_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 4. Inventory Stock Table (1:1 Product Stock Ledger)
CREATE TABLE inventory_stock (
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL UNIQUE,
    warehouse_city VARCHAR(50) DEFAULT 'Barrackpore',
    stock_quantity INT CHECK (stock_quantity >= 0) DEFAULT 0,
    reorder_level INT DEFAULT 10,
    last_restocked_date DATE DEFAULT (CURDATE()),
    CONSTRAINT fk_stock_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB;`,
      tableSummary: [
        { table: "categories", purpose: "Classification categories (Electronics, Books)", key: "PK: category_id" },
        { table: "suppliers", purpose: "Vendor contacts & locations (Kolkata, Barrackpore)", key: "PK: supplier_id" },
        { table: "products", purpose: "Product definitions with unique SKU & price checks", key: "FK -> categories, suppliers" },
        { table: "inventory_stock", purpose: "1:1 Stock ledgers with non-negative checks", key: "FK -> products (1:1)" }
      ],
      explanation:
        "The retail schema establishes strict normalization: categories and suppliers are decoupled from product items. SKU codes are globally unique, and non-negative constraints (`CHECK (stock_quantity >= 0)`) protect warehouse ledgers from corrupt negative quantities."
    },
    step2_seeding: {
      stepNumber: "Step 2: Seed Inventory",
      title: "2. Step 2: Seeding Products, Categories & Suppliers (INR ₹)",
      badge: "Seed Data",
      badgeColor: "cyan",
      sqlScript: `-- 📝 STEP 2: BATCH SEEDING RETAIL PRODUCTS & STOCK:

-- 1. Seed Categories:
INSERT INTO categories (category_name, description) VALUES
('Laptops & Computers', 'High performance workstations and ultrabooks'),
('Peripherals', 'Keyboards, mice, webcams, and monitors'),
('Audio', 'Noise cancelling headphones and microphones');

-- 2. Seed Suppliers:
INSERT INTO suppliers (supplier_name, contact_person, phone_number, city) VALUES
('Barrackpore Tech Distro', 'Debangshu Dey', '9830077881', 'Barrackpore'),
('Kolkata Electronics Hub', 'Abhronila Das', '9830077882', 'Kolkata'),
('Ichapur Hardware Works', 'Susmita Roy', '9830077883', 'Ichapur');

-- 3. Seed Products:
INSERT INTO products (category_id, supplier_id, sku_code, product_name, unit_price_inr) VALUES
(1, 1, 'SKU-BKP-LAP-01', 'Core i7 Pro Laptop 16GB', 68500.00),
(1, 1, 'SKU-BKP-LAP-02', 'Ryzen 7 Slim Ultrabook', 54000.00),
(2, 2, 'SKU-KOL-KB-01', 'RGB Mechanical Keyboard', 3200.00),
(2, 2, 'SKU-KOL-MON-01', '27-inch 4K IPS Monitor', 24500.00),
(3, 3, 'SKU-ICH-AUD-01', 'Wireless ANC Headphones', 4800.00);

-- 4. Seed Inventory Stock:
INSERT INTO inventory_stock (product_id, warehouse_city, stock_quantity, reorder_level) VALUES
(1, 'Barrackpore', 15, 5),
(2, 'Barrackpore', 3, 5),   -- LOW STOCK ALERT! (3 <= 5)
(3, 'Kolkata', 45, 10),
(4, 'Kolkata', 8, 10),     -- LOW STOCK ALERT! (8 <= 10)
(5, 'Ichapur', 22, 10);`,
      tableSummary: [
        { table: "categories", purpose: "3 Product Categories Seeded", key: "3 Rows Inserted" },
        { table: "suppliers", purpose: "3 Vendors across Barrackpore, Kolkata & Ichapur", key: "3 Rows Inserted" },
        { table: "products", purpose: "5 Hardware Products (₹3,200 to ₹68,500)", key: "5 Rows Inserted" },
        { table: "inventory_stock", purpose: "5 Stock Ledgers (2 Items in Low Stock State)", key: "5 Rows Inserted" }
      ],
      explanation:
        "Seeding realistic retail records links products to their authorized suppliers and categories. Notice that 2 products have stock levels below their reorder threshold, ready for alerting queries."
    },
    step3_alter_table: {
      stepNumber: "Step 3: ALTER TABLE Drills",
      title: "3. Step 3: Practicing ALTER TABLE Schema Evolutions",
      badge: "ALTER TABLE Drills",
      badgeColor: "amber",
      sqlScript: `-- 🛠️ STEP 3: PRACTICING DDL ALTER TABLE COMMANDS:

-- Drill 1: Add Discount Percentage column with CHECK constraint:
ALTER TABLE products 
ADD COLUMN discount_pct DECIMAL(4,2) DEFAULT 0.00 CHECK (discount_pct BETWEEN 0 AND 100);

-- Drill 2: Modify stock_quantity to ensure NOT NULL constraint:
ALTER TABLE inventory_stock 
MODIFY COLUMN stock_quantity INT NOT NULL DEFAULT 0;

-- Drill 3: Rename warehouse_city column to storage_location in MySQL 8.0:
ALTER TABLE inventory_stock 
RENAME COLUMN warehouse_city TO storage_location;

-- Drill 4: Add Warranty Months column after product_name:
ALTER TABLE products 
ADD COLUMN warranty_months INT DEFAULT 12 AFTER product_name;

-- 📋 VERIFY UPDATED TABLE DEFINITION:
DESCRIBE products;
DESCRIBE inventory_stock;`,
      tableSummary: [
        { table: "ADD COLUMN discount_pct", purpose: "Added discount percentage with range check (0-100)", key: "Altered products ✅" },
        { table: "MODIFY COLUMN stock_quantity", purpose: "Enforced NOT NULL default on inventory stock", key: "Altered inventory_stock ✅" },
        { table: "RENAME COLUMN", purpose: "Renamed warehouse_city -> storage_location", key: "Altered inventory_stock ✅" },
        { table: "ADD COLUMN AFTER", purpose: "Positioned warranty_months immediately after product_name", key: "Altered products ✅" }
      ],
      explanation:
        "`ALTER TABLE` enables live schema evolutions in production databases. We add new validated columns, modify column nullability, and rename columns cleanly using MySQL 8.0 DDL syntax."
    },
    step4_reports: {
      stepNumber: "Step 4: Valuation & Alerts",
      title: "4. Step 4: Inventory Valuation & Low Stock Alert Queries",
      badge: "Inventory Analytics",
      badgeColor: "rose",
      sqlScript: `-- 📊 STEP 4: PRODUCTION INVENTORY QUERIES:

-- Query 1: Total Warehouse Inventory Valuation Report (INR ₹):
SELECT 
    i.storage_location,
    COUNT(p.product_id) AS distinct_products_count,
    SUM(i.stock_quantity) AS total_units_in_stock,
    SUM(p.unit_price_inr * i.stock_quantity) AS total_inventory_valuation_inr
FROM products p
JOIN inventory_stock i ON p.product_id = i.product_id
WHERE p.is_active = TRUE
GROUP BY i.storage_location;

-- Query 2: Low Stock Reorder Alert (Items requiring immediate purchase order):
SELECT 
    p.sku_code,
    p.product_name,
    c.category_name,
    s.supplier_name,
    s.phone_number AS supplier_phone,
    i.stock_quantity AS current_stock,
    i.reorder_level,
    (i.reorder_level - i.stock_quantity) AS shortage_units
FROM products p
JOIN categories c ON p.category_id = c.category_id
JOIN suppliers s ON p.supplier_id = s.supplier_id
JOIN inventory_stock i ON p.product_id = i.product_id
WHERE i.stock_quantity <= i.reorder_level
ORDER BY shortage_units DESC;`,
      tableSummary: [
        { table: "Valuation Report", purpose: "Calculates total asset value per warehouse location", key: "Grouped Summary" },
        { table: "Reorder Alert Report", purpose: "Identifies shortage items with supplier contact info", key: "Shortage Alert ⚠️" }
      ],
      explanation:
        "These queries calculate total warehouse asset values and generate actionable shortage reports, showing supplier phone numbers so warehouse managers in Barrackpore and Kolkata can immediately place restock purchase orders."
    }
  };

  const navItems = [
    { id: "lab-overview", label: "1. Retail Schema Architecture" },
    { id: "er-diagram", label: "2. Relational Schema Diagram" },
    { id: "interactive-workbench", label: "3. Interactive Lab Workbench" },
    { id: "case-studies", label: "4. Production Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Student Lab Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 001_004</span>
            <span>•</span>
            <span>Topic 2 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Hands-on Lab 2
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Hands-on Lab 2: Retail Product Catalog &amp; Inventory DDL Scripts
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Build a production-grade retail inventory database: enforce unique SKU formatting, manage foreign key supplier relationships, execute <code className="text-cyan-400 font-mono">ALTER TABLE</code> schema evolutions, and calculate real-time inventory valuations in Indian Rupees (<code className="text-emerald-400 font-mono">₹</code>).
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Retail Schema Architecture */}
        <section id="lab-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Retail Inventory &amp; Catalog Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A normalized 4-table relational architecture designed for e-commerce and retail supply chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Table 1</span>
              <h3 className="font-bold text-white">categories</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Normalized product categories (Laptops, Peripherals, Audio equipment).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Table 2</span>
              <h3 className="font-bold text-white">suppliers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vendor partners with unique contact phone numbers across Barrackpore and Kolkata.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Table 3</span>
              <h3 className="font-bold text-white">products</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Catalog records with unique SKU codes and strictly positive price checks (`&gt; 0`).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Table 4</span>
              <h3 className="font-bold text-white">inventory_stock</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                1:1 Stock ledgers with non-negative constraints (`&gt;= 0`) and reorder thresholds.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Relational Schema Diagram */}
        <section id="er-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Relational Schema &amp; Inventory Flow Diagram
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the linkages between categories, suppliers, catalog products, and warehouse ledgers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 2.1: Retail Inventory &amp; Catalog Relational Schema
              </h3>
              <span className="text-xs text-slate-400 font-mono">InnoDB Relational Graph</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrRetCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Box 1: Categories */}
                <rect x="30" y="40" width="240" height="130" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="150" y="65" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">CATEGORIES (Parent)</text>
                <line x1="30" y1="75" x2="270" y2="75" stroke="#334155" />
                <text x="45" y="98" fill="#bae6fd" fontSize="10">🔑 category_id (PK)</text>
                <text x="45" y="118" fill="#e2e8f0" fontSize="10">category_name (UNIQUE)</text>
                <text x="45" y="138" fill="#94a3b8" fontSize="10">description</text>

                {/* Box 2: Suppliers */}
                <rect x="680" y="40" width="240" height="140" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="800" y="65" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">SUPPLIERS (Parent)</text>
                <line x1="680" y1="75" x2="920" y2="75" stroke="#334155" />
                <text x="695" y="98" fill="#bae6fd" fontSize="10">🔑 supplier_id (PK)</text>
                <text x="695" y="118" fill="#e2e8f0" fontSize="10">supplier_name, contact_person</text>
                <text x="695" y="138" fill="#fca5a5" fontSize="10">phone_number (UNIQUE)</text>
                <text x="695" y="158" fill="#94a3b8" fontSize="10">city</text>

                {/* Box 3: Products */}
                <rect x="330" y="40" width="290" height="160" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="475" y="65" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">PRODUCTS (Child / Parent)</text>
                <line x1="330" y1="75" x2="620" y2="75" stroke="#334155" />
                <text x="345" y="98" fill="#bae6fd" fontSize="10">🔑 product_id (PK)</text>
                <text x="345" y="118" fill="#38bdf8" fontSize="10">🔗 category_id (FK), supplier_id (FK)</text>
                <text x="345" y="138" fill="#fca5a5" fontSize="10">sku_code (VARCHAR UNIQUE)</text>
                <text x="345" y="158" fill="#e2e8f0" fontSize="10">product_name, unit_price_inr (CHECK)</text>
                <text x="345" y="178" fill="#94a3b8" fontSize="10">is_active (BOOLEAN)</text>

                {/* Box 4: Inventory Stock */}
                <rect x="330" y="235" width="290" height="110" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="475" y="258" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">INVENTORY_STOCK (Child / 1:1)</text>
                <line x1="330" y1="268" x2="620" y2="268" stroke="#334155" />
                <text x="345" y="290" fill="#bae6fd" fontSize="10">🔑 stock_id (PK)</text>
                <text x="345" y="310" fill="#38bdf8" fontSize="10">🔗 product_id (FK UNIQUE - 1:1 Link)</text>
                <text x="345" y="330" fill="#94a3b8" fontSize="10">stock_quantity (CHECK &gt;= 0), reorder_level</text>

                {/* Arrows */}
                <path d="M 330 110 L 270 110" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrRetCyan)" />
                <path d="M 620 110 L 680 110" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrRetCyan)" />
                <path d="M 475 235 L 475 200" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrRetCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Lab Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Hands-on Lab Execution Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Step through the 4 lab stages to inspect DDL statements, seed batches, ALTER TABLE drills, and valuation queries.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(labSteps).map((key) => {
              const step = labSteps[key];
              const isSelected = selectedLabStep === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLabStep(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      step.badgeColor === "emerald" && "bg-emerald-400",
                      step.badgeColor === "cyan" && "bg-cyan-400",
                      step.badgeColor === "amber" && "bg-amber-400",
                      step.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{step.stepNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {labSteps[selectedLabStep].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  labSteps[selectedLabStep].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  labSteps[selectedLabStep].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  labSteps[selectedLabStep].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  labSteps[selectedLabStep].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {labSteps[selectedLabStep].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Lab Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {labSteps[selectedLabStep].sqlScript}
              </pre>
            </div>

            {/* Table Summary Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Execution &amp; Schema Highlights:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Entity / Drill</th>
                      <th className="py-2.5 px-4">Description / Operation</th>
                      <th className="py-2.5 px-4">Status / Key</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {labSteps[selectedLabStep].tableSummary.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.table}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{row.purpose}</td>
                        <td className="py-3 px-4 text-emerald-400">{row.key}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Insight:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {labSteps[selectedLabStep].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Production Case Studies: Barrackpore &amp; Kolkata Warehouses
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world inventory management deployed across West Bengal distribution hubs.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Warehouse Stock Tracking */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Managing ₹18.5 Lakh Electronics Stock in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Inventory Control Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Barrackpore central hub, 50 distinct computer hardware lines are tracked using unique SKU codes. The non-negative stock constraint prevented a critical race condition bug during high-traffic flash sales from driving inventory balances into negative values.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Low-Stock Reorder Triggers */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Automated Reorder Triggers in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Stockouts
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, automated nightly queries check <code>stock_quantity &lt;= reorder_level</code> and immediately generate supplier purchase order drafts with contact phone numbers, completely eliminating out-of-stock delays for high-demand items.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid dangerous schema modification and inventory modeling mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Hard Deleting Discontinued Products
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Physically running `DELETE FROM products WHERE product_id = ?` breaks foreign keys on historical orders and sales invoices.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use soft deletion (`is_active = FALSE`) to retire catalog items safely.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting NOT NULL on Modified Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running `ALTER TABLE tbl MODIFY COLUMN col INT;` removes previous `NOT NULL` constraints unless explicitly re-specified in the `MODIFY` clause.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always restate `NOT NULL DEFAULT ...` when modifying columns with ALTER TABLE.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Enforce Non-Negative Stock Checks
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always define <code>CHECK (stock_quantity &gt;= 0)</code> on warehouse ledger tables to guarantee physical sanity at the storage engine level.
              </p>
              <div className="text-xs text-slate-400">
                Protects inventory databases against accidental race-condition overdrafts.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Format SKUs Systematically
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use structured SKU conventions (e.g. `SKU-LOCATION-CATEGORY-ID`) to make barcode and stock lookups human-readable and index-friendly.
              </p>
              <div className="text-xs text-slate-400">
                Simplifies warehouse sorting and logistics auditing.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Student Lab Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Student Hands-on Lab Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key milestones to complete for Lab 2.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Lab 2 Completion Milestones
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Catalog DDL Created</strong> = Build categories, suppliers, products, and inventory stock.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Inventory Seeded</strong> = Insert realistic hardware records with INR (`₹`) prices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">ALTER TABLE Mastered</strong> = Add columns, modify constraints, and rename columns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Valuations &amp; Alerts</strong> = Calculate asset totals and filter shortage items.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe DECIMAL precision...”</span>
                  We used `DECIMAL(10,2)` for `unit_price_inr` (up to ₹9.99 Crores) and `DECIMAL(4,2)` for `discount_pct` (up to 99.99%). Choose precision that matches business reality!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about soft deletes...”</span>
                  Instead of deleting products when stock runs out, toggle `is_active = FALSE`. This preserves all historical sales invoices without breaking foreign keys!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering the Retail Product Catalog & Inventory Lab.
            </p>
          </div>

          <FAQTemplate
            title="Retail Catalog & Inventory Lab FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Hands-on Lab 2: Retail Product Catalog & Inventory DDL Scripts"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="In enterprise systems, product catalogs and inventory ledgers are the lifeblood of business operations. In this lab, you experienced the power of `ALTER TABLE` to evolve schemas over time—adding discount percentages and modifying constraints without destroying existing data. Pay close attention to how we calculated total inventory asset valuations by joining `products` and `inventory_stock`. Real-world database design is all about building models that reflect physical business reality with mathematically exact precision!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
