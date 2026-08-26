import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Hands-on Lab 3: Customer Order CRUD Query Challenges
 * Module: 001_004_practice-and-assessment-segment-1
 *
 * @component
 * @returns {JSX.Element} Interactive lab workbench and scenario-based query challenge tutorial: executing multi-table transactional order insertions, mastering precision WHERE/IN/LIKE/BETWEEN filtering, performing safe primary-key updates, testing ON DELETE CASCADE propagations, and calculating revenue metrics in Indian Rupees (₹).
 */
const Topic3 = () => {
  // Interactive Lab Challenge State
  const [selectedChallenge, setSelectedChallenge] = useState("challenge1_create");

  const crudChallenges = {
    challenge1_create: {
      challengeNumber: "Challenge 1: Transactional Create",
      title: "1. Challenge 1: Transactional Order Ingestion with Foreign Keys",
      badge: "Transactional INSERT",
      badgeColor: "emerald",
      sqlScript: `-- 🛒 CHALLENGE 1: TRANSACTIONAL INSERT OF ORDER, ITEMS & PAYMENT:
START TRANSACTION;

-- 1. Insert Customer:
INSERT INTO customers (full_name, email, phone_number, city)
VALUES ('Mamata Hui', 'mamata.hui@example.com', '9830088991', 'Barrackpore');
SET @cust_id = LAST_INSERT_ID();

-- 2. Insert Order Header:
INSERT INTO orders (customer_id, order_total_inr, order_status)
VALUES (@cust_id, 32500.00, 'Processing');
SET @new_order_id = LAST_INSERT_ID();

-- 3. Batch Insert Order Line Items:
INSERT INTO order_items (order_id, product_name, quantity, unit_price_inr) VALUES
(@new_order_id, 'Mechanical Gaming Keyboard', 1, 4500.00),
(@new_order_id, '27-inch 4K IPS Monitor', 1, 28000.00);

-- 4. Insert Payment Transaction Record:
INSERT INTO payment_transactions (order_id, payment_method, amount_paid_inr)
VALUES (@new_order_id, 'UPI', 32500.00);

COMMIT; -- All 4 table records committed atomically! ✅`,
      tableSummary: [
        { table: "customers", purpose: "Created new customer record in Barrackpore", key: "@cust_id Generated" },
        { table: "orders", purpose: "Created parent order ledger header (₹32,500.00)", key: "@new_order_id Generated" },
        { table: "order_items", purpose: "Batch inserted 2 line items linking to order", key: "2 Rows Inserted" },
        { table: "payment_transactions", purpose: "Recorded settled UPI settlement (₹32,500.00)", key: "1:1 Payment Linked" }
      ],
      explanation:
        "Using `START TRANSACTION` and `LAST_INSERT_ID()` ensures that the parent customer, order header, line items, and settlement payment are inserted as an atomic unit. If any step fails, `ROLLBACK` prevents partial data corruption."
    },
    challenge2_read: {
      challengeNumber: "Challenge 2: Precision Read",
      title: "2. Challenge 2: Precision Multi-Predicate Query Challenges",
      badge: "Multi-Predicate SELECT",
      badgeColor: "cyan",
      sqlScript: `-- 🔍 CHALLENGE 2: MULTI-PREDICATE READ QUERY CHALLENGES:

-- Query A: Find all 'Delivered' or 'Shipped' orders in 'Barrackpore' or 'Kolkata' &ge; ₹10,000:
SELECT 
    o.order_id,
    c.full_name AS customer_name,
    c.city,
    o.order_date,
    o.order_total_inr,
    p.payment_method
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN payment_transactions p ON o.order_id = p.order_id
WHERE c.city IN ('Barrackpore', 'Kolkata')
  AND o.order_status IN ('Delivered', 'Shipped', 'Processing')
  AND o.order_total_inr >= 10000.00
ORDER BY o.order_total_inr DESC;

-- Query B: Find customers whose phone starts with '98300' who paid via 'UPI':
SELECT 
    c.customer_id,
    c.full_name,
    c.phone_number,
    o.order_id,
    p.payment_method,
    p.amount_paid_inr
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN payment_transactions p ON o.order_id = p.order_id
WHERE c.phone_number LIKE '98300%'
  AND p.payment_method = 'UPI';`,
      tableSummary: [
        { table: "Query A (High-Value Regional Orders)", purpose: "Combines IN list, comparison (>= ₹10,000) & JOINs", key: "Precision Filtering ✅" },
        { table: "Query B (UPI Mobile Customers)", purpose: "Combines LIKE wildcard prefix with exact payment method", key: "Sargable Query ✅" }
      ],
      explanation:
        "These queries combine `INNER JOIN`s across three tables with `IN`, `LIKE`, and numeric comparison predicates to filter high-value orders and UPI transactions with precision."
    },
    challenge3_update: {
      challengeNumber: "Challenge 3: Safe Update",
      title: "3. Challenge 3: Safe Targeted UPDATE with State Validation",
      badge: "Targeted UPDATE",
      badgeColor: "amber",
      sqlScript: `-- ✏️ CHALLENGE 3: TARGETED STATUS UPDATES & DISCOUNT APPLICATION:

-- Drill A: Advance order status from 'Processing' to 'Shipped' with state check:
UPDATE orders 
SET order_status = 'Shipped'
WHERE order_id = 1 
  AND order_status = 'Processing'; -- Protects against race-condition state skipping!

-- Drill B: Apply 5% festive discount to all 'Pending' orders in Barrackpore:
UPDATE orders o
JOIN customers c ON o.customer_id = c.customer_id
SET o.order_total_inr = o.order_total_inr * 0.95
WHERE c.city = 'Barrackpore'
  AND o.order_status = 'Pending';

-- 📋 VERIFY UPDATED STATUS:
SELECT order_id, customer_id, order_total_inr, order_status 
FROM orders 
WHERE order_id = 1;`,
      tableSummary: [
        { table: "Drill A (State Advancement)", purpose: "Safely updates order status to 'Shipped'", key: "1 Row Modified ✅" },
        { table: "Drill B (Festive Discount)", purpose: "Applies 5% discount to pending Barrackpore orders", key: "Joined UPDATE ✅" }
      ],
      explanation:
        "Safe updates always target exact Primary Keys and validate current state flags in the `WHERE` clause. Multi-table `UPDATE` statements allow applying discounts based on customer location."
    },
    challenge4_delete: {
      challengeNumber: "Challenge 4: Cascade Delete",
      title: "4. Challenge 4: Safe Deletions & ON DELETE CASCADE Verification",
      badge: "Cascade DELETE",
      badgeColor: "rose",
      sqlScript: `-- 🗑️ CHALLENGE 4: VERIFYING CASCADING DELETIONS:

-- 1. Inspect child line items before deletion:
SELECT * FROM order_items WHERE order_id = 1;

-- 2. Delete parent order (Triggers ON DELETE CASCADE):
DELETE FROM orders WHERE order_id = 1;

-- 3. Verify child line items in order_items are automatically cleaned up:
SELECT * FROM order_items WHERE order_id = 1;
-- Output: Empty set (0 rows) - All child records cleanly deleted! ✅

-- 4. Attempt deleting a customer who has existing orders under ON DELETE RESTRICT:
-- (Assuming customer_id has RESTRICT foreign key constraint):
-- Result: Error 1451 (23000): Cannot delete parent row (Referential Integrity Protected!) 🛡️`,
      tableSummary: [
        { table: "Parent Order Deletion", purpose: "Deletes order header with order_id = 1", key: "Parent Deleted" },
        { table: "Cascade Verification", purpose: "Verifies child rows in order_items deleted automatically", key: "0 Orphan Rows ✅" },
        { table: "RESTRICT Verification", purpose: "Verifies customer deletion blocked when orders exist", key: "Error 1451 Handled 🛡️" }
      ],
      explanation:
        "With `ON DELETE CASCADE`, deleting an order header automatically cleans up all associated line items. Meanwhile, `ON DELETE RESTRICT` on customers prevents accidental deletion of customer accounts with active orders."
    }
  };

  const navItems = [
    { id: "lab-overview", label: "1. Order Schema Architecture" },
    { id: "er-diagram", label: "2. Relational Schema Diagram" },
    { id: "interactive-workbench", label: "3. CRUD Challenge Workbench" },
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
            <span>Topic 3 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Hands-on Lab 3
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Hands-on Lab 3: Customer Order CRUD Query Challenges
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the complete CRUD lifecycle in MySQL: execute transactional multi-table insertions, construct precision multi-predicate queries, perform safe state-checked updates, verify cascading deletions, and audit settlement ledgers in Indian Rupees (<code className="text-emerald-400 font-mono">₹</code>).
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
        {/* SECTION 1: Order Schema Architecture */}
        <section id="lab-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Customer Order Relational Schema Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A 4-table e-commerce processing architecture modeled for regional order fulfillment in West Bengal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Table 1</span>
              <h3 className="font-bold text-white">customers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Customer profiles with unique email, phone, and city (Barrackpore, Kolkata, Ichapur).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Table 2</span>
              <h3 className="font-bold text-white">orders</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Order headers with status enum, timestamp defaults, and total INR amount checks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Table 3</span>
              <h3 className="font-bold text-white">order_items</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Individual purchased items with quantity and unit price checks (ON DELETE CASCADE).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Table 4</span>
              <h3 className="font-bold text-white">payment_transactions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                1:1 Settlement records (UPI, Credit Card, COD) with automatic timestamps.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Relational Schema Diagram */}
        <section id="er-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Relational Schema &amp; Cascade Flow Diagram
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing parent-child foreign key linkages and cascade deletion propagation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 3.1: Customer Order Relational Model &amp; Cascading Delete Flow
              </h3>
              <span className="text-xs text-slate-400 font-mono">E-Commerce Schema</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrOrdCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Box 1: Customers */}
                <rect x="30" y="40" width="240" height="140" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="150" y="65" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">CUSTOMERS (Parent)</text>
                <line x1="30" y1="75" x2="270" y2="75" stroke="#334155" />
                <text x="45" y="98" fill="#bae6fd" fontSize="10">🔑 customer_id (PK)</text>
                <text x="45" y="118" fill="#e2e8f0" fontSize="10">full_name, city</text>
                <text x="45" y="138" fill="#fca5a5" fontSize="10">email, phone_number (UNIQUE)</text>

                {/* Box 2: Orders */}
                <rect x="340" y="40" width="260" height="150" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="470" y="65" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">ORDERS (Child / Parent)</text>
                <line x1="340" y1="75" x2="600" y2="75" stroke="#334155" />
                <text x="355" y="98" fill="#bae6fd" fontSize="10">🔑 order_id (PK)</text>
                <text x="355" y="118" fill="#38bdf8" fontSize="10">🔗 customer_id (FK)</text>
                <text x="355" y="138" fill="#e2e8f0" fontSize="10">order_date, order_status</text>
                <text x="355" y="158" fill="#94a3b8" fontSize="10">order_total_inr (CHECK >= 0)</text>

                {/* Box 3: Order Items */}
                <rect x="670" y="40" width="250" height="140" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="795" y="65" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">ORDER_ITEMS (Child / CASCADE)</text>
                <line x1="670" y1="75" x2="920" y2="75" stroke="#334155" />
                <text x="685" y="98" fill="#bae6fd" fontSize="10">🔑 item_id (PK)</text>
                <text x="685" y="118" fill="#38bdf8" fontSize="10">🔗 order_id (FK ON DELETE CASCADE)</text>
                <text x="685" y="138" fill="#e2e8f0" fontSize="10">product_name, quantity (CHECK)</text>
                <text x="685" y="158" fill="#94a3b8" fontSize="10">unit_price_inr (CHECK &gt; 0)</text>

                {/* Box 4: Payments */}
                <rect x="340" y="235" width="260" height="110" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="470" y="258" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">PAYMENTS (1:1 Settlement)</text>
                <line x1="340" y1="268" x2="600" y2="268" stroke="#334155" />
                <text x="355" y="290" fill="#bae6fd" fontSize="10">🔑 payment_id (PK)</text>
                <text x="355" y="310" fill="#38bdf8" fontSize="10">🔗 order_id (FK UNIQUE - 1:1)</text>
                <text x="355" y="330" fill="#94a3b8" fontSize="10">payment_method (ENUM), amount (₹)</text>

                {/* Arrows */}
                <path d="M 340 115 L 270 115" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrOrdCyan)" />
                <path d="M 670 115 L 600 115" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrOrdCyan)" />
                <path d="M 470 235 L 470 190" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrOrdCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: CRUD Challenge Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Hands-on CRUD Challenge Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Step through the 4 CRUD query challenges to inspect transactional inserts, complex filtering, safe updates, and cascading deletes.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(crudChallenges).map((key) => {
              const ch = crudChallenges[key];
              const isSelected = selectedChallenge === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedChallenge(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                &gt;
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      ch.badgeColor === "emerald" && "bg-emerald-400",
                      ch.badgeColor === "cyan" && "bg-cyan-400",
                      ch.badgeColor === "amber" && "bg-amber-400",
                      ch.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{ch.challengeNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {crudChallenges[selectedChallenge].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  crudChallenges[selectedChallenge].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  crudChallenges[selectedChallenge].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  crudChallenges[selectedChallenge].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  crudChallenges[selectedChallenge].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {crudChallenges[selectedChallenge].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Challenge Solution:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {crudChallenges[selectedChallenge].sqlScript}
              </pre>
            </div>

            {/* Table Summary Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Execution Results &amp; Data Verification:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Entity / Step</th>
                      <th className="py-2.5 px-4">Operation Description</th>
                      <th className="py-2.5 px-4">Result / Integrity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {crudChallenges[selectedChallenge].tableSummary.map((row, idx) => (
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
                {crudChallenges[selectedChallenge].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Production Case Studies: Barrackpore &amp; Kolkata Orders
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world order fulfillment challenges solved with SQL DML statements.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Transactional Order Placement */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Handling ₹65,000 Multi-Item UPI Orders in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Atomic Transaction
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, placing an order containing 5 distinct accessories required capturing `LAST_INSERT_ID()` from the `orders` table to insert line items and payment settlements inside a single `START TRANSACTION` block, preventing detached items if an error occurred.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Order Cancellation Cascade */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Clean Order Cancellation in Kolkata Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Orphan Records
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When a customer in Kolkata cancelled an order, executing `DELETE FROM orders WHERE order_id = ?` triggered `ON DELETE CASCADE` to delete all 8 child items from `order_items` automatically, maintaining pristine database cleanliness.
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
              Avoid critical transactional and CRUD mistakes in e-commerce databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Unconditional UPDATE Statements
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing `UPDATE orders SET order_status = 'Delivered';` without a `WHERE` clause overwrites all historical and pending orders table-wide.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always target Primary Key and validate current status in WHERE.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Inserting Without Transactions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Inserting order line items without wrapping the script in a transaction leaves orphan order headers if the server crashes mid-insert.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Wrap multi-table inserts in START TRANSACTION ... COMMIT.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use LAST_INSERT_ID()
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `LAST_INSERT_ID()` to retrieve auto-generated IDs reliably on the current connection without race conditions from concurrent users.
              </p>
              <div className="text-xs text-slate-400">
                Thread-safe surrogate primary key propagation.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Index Foreign Keys &amp; Status Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Ensure `customer_id`, `order_status`, and `order_date` are indexed to keep filtering and join queries sub-millisecond fast.
              </p>
              <div className="text-xs text-slate-400">
                Accelerates JOIN lookups and date-range queries.
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
              Key milestones to complete for Lab 3.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Lab 3 Completion Milestones
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Transactional INSERT</strong> = Insert order, line items, and payment using `LAST_INSERT_ID()`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Complex SELECTs</strong> = Write multi-predicate queries with `IN`, `BETWEEN`, `LIKE`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Targeted UPDATEs</strong> = Perform safe state advancement and location discounts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Cascade Verified</strong> = Verify automatic child item deletion on parent delete.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe atomic transactions...”</span>
                  In production e-commerce backends, always wrap order creation in `START TRANSACTION; ... COMMIT;`. This ensures line items never get created if the order header insertion fails!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Antijoins...”</span>
                  To find customers who haven't ordered yet, use `LEFT JOIN orders ON c.customer_id = o.customer_id WHERE o.order_id IS NULL`. It's one of the most common SQL interview challenges!
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
              Comprehensive reference questions covering the Customer Order CRUD Challenges Lab.
            </p>
          </div>

          <FAQTemplate
            title="Customer Order CRUD Lab FAQs"
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
            title="Hands-on Lab 3: Customer Order CRUD Query Challenges"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="CRUD operations are the heartbeat of every application—from simple mobile apps to massive e-commerce portals. In this lab, you mastered not just writing `INSERT` and `SELECT`, but writing them transactionally with `LAST_INSERT_ID()`, multi-table joins, and safe `UPDATE` status advancements. Never forget: in production, an `UPDATE` or `DELETE` without a strict `WHERE` clause is a developer's nightmare. Practice these challenges until writing precise, safe SQL becomes second nature!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
