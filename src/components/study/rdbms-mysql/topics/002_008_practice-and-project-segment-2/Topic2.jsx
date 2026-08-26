import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Design Project 3: Retail Inventory, Supplier & Order Processing DB
 * Module: 002_008_practice-and-project-segment-2
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and real-world project guide on retail supply chain schema design, price-drift protection, and inventory reservation.
 */
const Topic2 = () => {
  // Interactive Simulator State
  const [selectedWorkflow, setSelectedWorkflow] = useState("low_stock_reorder_monitor");

  const retailWorkflows = {
    low_stock_reorder_monitor: {
      title: "1. Automated Low-Stock Reorder Monitor",
      badge: "Supply Chain Alerts",
      badgeColor: "rose",
      sqlQuery: `-- Finding products that have fallen below safety reorder levels across warehouses:
SELECT 
    w.warehouse_name,
    w.city,
    p.sku_code,
    p.product_name,
    inv.quantity_on_hand,
    p.min_reorder_level,
    (p.min_reorder_level - inv.quantity_on_hand) AS shortage_units,
    (p.min_reorder_level - inv.quantity_on_hand) * p.cost_price_inr AS replenishment_cost_inr
FROM warehouse_inventory inv
JOIN warehouses w ON inv.warehouse_id = w.warehouse_id
JOIN products p ON inv.product_id = p.product_id
WHERE inv.quantity_on_hand <= p.min_reorder_level
ORDER BY shortage_units DESC;`,
      resultRows: [
        { id: "SKU-LAP-401", name: "Dell Latitude Pro 16GB", warehouse: "Barrackpore Hub", onHand: "4 Units", min: "15 Units", shortage: "11 Units", cost: "₹6,05,000.00", status: "CRITICAL REORDER" },
        { id: "SKU-MON-204", name: "Samsung 27\" 4K Display", warehouse: "Kolkata Central DC", onHand: "8 Units", min: "20 Units", shortage: "12 Units", cost: "₹2,64,000.00", status: "REORDER REQUIRED" },
      ],
      explanation:
        "Identifies warehouse SKU shortages in real-time, computing shortage quantities and total replenishment purchase costs to trigger supplier purchase orders.",
    },
    gross_margin_analytics: {
      title: "2. Product & Category Gross Profit Margin Analytics",
      badge: "Financial Performance",
      badgeColor: "emerald",
      sqlQuery: `-- Analyzing profitability across products and categories:
SELECT 
    c.category_name,
    p.sku_code,
    p.product_name,
    SUM(oi.quantity) AS total_units_sold,
    SUM(oi.subtotal_inr) AS gross_revenue_inr,
    SUM(oi.quantity * p.cost_price_inr) AS cogs_inr,
    (SUM(oi.subtotal_inr) - SUM(oi.quantity * p.cost_price_inr)) AS gross_profit_inr,
    ROUND(((SUM(oi.subtotal_inr) - SUM(oi.quantity * p.cost_price_inr)) / SUM(oi.subtotal_inr)) * 100.0, 2) AS margin_pct
FROM order_items oi
JOIN customer_orders o ON oi.order_id = o.order_id
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
WHERE o.order_status IN ('DELIVERED', 'SHIPPED')
GROUP BY c.category_name, p.product_id, p.sku_code, p.product_name
ORDER BY gross_profit_inr DESC;`,
      resultRows: [
        { id: "SKU-LAP-401", name: "Dell Latitude Pro", warehouse: "Electronics", onHand: "45 Sold", min: "₹31,50,000.00", shortage: "₹24,75,000.00", cost: "₹6,75,000.00", status: "21.43% Margin" },
        { id: "SKU-ACC-101", name: "Logitech MX Master 3S", warehouse: "Accessories", onHand: "120 Sold", min: "₹10,80,000.00", shortage: "₹6,60,000.00", cost: "₹4,20,000.00", status: "38.89% Margin" },
      ],
      explanation:
        "Calculates true Gross Profit by comparing historical sale line revenue against product cost prices, computing exact profit margins per catalog category.",
    },
    rfm_customer_segmentation: {
      title: "3. Customer RFM Value & Lifetime Spend Segmentation",
      badge: "Customer Analytics",
      badgeColor: "cyan",
      sqlQuery: `-- Customer RFM (Recency, Frequency, Monetary) analysis:
SELECT 
    c.customer_id,
    c.customer_code,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.city,
    DATEDIFF(CURRENT_DATE, MAX(o.order_date)) AS recency_days,
    COUNT(o.order_id) AS order_frequency,
    SUM(o.net_total_inr) AS monetary_lifetime_spend_inr
FROM customers c
JOIN customer_orders o ON c.customer_id = o.customer_id
WHERE o.order_status = 'DELIVERED'
GROUP BY c.customer_id, c.customer_code, c.first_name, c.last_name, c.city
ORDER BY monetary_lifetime_spend_inr DESC;`,
      resultRows: [
        { id: "CUST-101", name: "Mamata Hui", warehouse: "Barrackpore", onHand: "12 Days Ago", min: "8 Orders", shortage: "₹1,85,400.00", cost: "₹1,85,400.00", status: "VIP Platinum" },
        { id: "CUST-103", name: "Abhronila Saha", warehouse: "Kolkata", onHand: "5 Days Ago", min: "5 Orders", shortage: "₹1,24,000.00", cost: "₹1,24,000.00", status: "Loyal Gold" },
      ],
      explanation:
        "Segments retail customers into actionable marketing tiers (VIP, Loyal, At-Risk) based on purchase recency, transaction frequency, and total lifetime spend.",
    },
  };

  const navItems = [
    { id: "project-overview", label: "1. Supply Chain Scope" },
    { id: "schema-design", label: "2. 3NF Retail Schema" },
    { id: "svg-diagrams", label: "3. ER Diagram & Order Flow SVGs" },
    { id: "interactive-sandbox", label: "4. Live Retail Workbench" },
    { id: "ddl-scripts", label: "5. Production DDL Scripts" },
    { id: "case-studies", label: "6. Production Case Studies" },
    { id: "pitfalls-rules", label: "7. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "8. Student Checklist" },
    { id: "faq-section", label: "9. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "10. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_008</span>
            <span>•</span>
            <span>Design Project 3 of 8</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Retail & Supply Chain Architecture
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Design Project 3: Retail Inventory, Supplier & Order Processing DB
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Architect an enterprise retail distribution network. Master multi-warehouse inventory management, price-drift protection in order lines, supplier procurement pipelines, and RFM customer value analytics.
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
        {/* SECTION 1: Scope */}
        <section id="project-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Retail Supply Chain Scope & Business Requirements
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              End-to-end retail operations across warehouses in Barrackpore, Kolkata, and Ichapur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>📦</span> Multi-Warehouse Inventory
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tracks stock levels, reserved quantities, and safety reorder thresholds per SKU across multiple distribution centers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🛡️</span> Price-Drift Protection
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Captures immutable price snapshots in order lines to protect historical accounting records from future catalog price shifts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🚚</span> Supplier Procurement
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Manages B2B purchase orders, inbound receiving ledgers, and supplier GST compliance details.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 3NF Schema */}
        <section id="schema-design" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. 3NF Normalized Retail Schema (10 Core Tables)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Fully normalized architecture separating suppliers, warehouses, products, orders, and inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">1. suppliers</span>
              <p className="text-slate-400 font-sans">GSTIN, vendor contact, address.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">2. warehouses</span>
              <p className="text-slate-400 font-sans">Regional distribution hubs.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">3. categories</span>
              <p className="text-slate-400 font-sans">Self-referencing category tree.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block text-sm">4. products</span>
              <p className="text-slate-400 font-sans">SKU, cost price, selling price.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">5. warehouse_inv</span>
              <p className="text-slate-400 font-sans">Stock on hand vs reserved.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">6. purchase_orders</span>
              <p className="text-slate-400 font-sans">Supplier procurement headers.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">7. po_items</span>
              <p className="text-slate-400 font-sans">Ordered vs received units.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-rose-400 font-bold block text-sm">8. customers</span>
              <p className="text-slate-400 font-sans">Customer profiles & loyalty.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-rose-400 font-bold block text-sm">9. customer_orders</span>
              <p className="text-slate-400 font-sans">Order headers & net totals.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-rose-400 font-bold block text-sm">10. order_items</span>
              <p className="text-slate-400 font-sans">1NF lines & price snapshots.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Retail Supply Chain ER & Checkout Lifecycle
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Relational architecture and atomic checkout inventory reservation pipeline.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Retail ER Schema */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Enterprise Retail Network Relational ER Diagram
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Customers */}
                  <g>
                    <rect x="20" y="20" width="160" height="95" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="100" y="42" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">customers</text>
                    <text x="30" y="60" fill="#38bdf8" fontSize="8 font-mono">PK customer_id</text>
                    <text x="30" y="75" fill="#94a3b8" fontSize="8 font-mono">customer_code (UQ)</text>
                    <text x="30" y="90" fill="#94a3b8" fontSize="8 font-mono">phone, email (UQ)</text>
                  </g>

                  {/* Customer Orders */}
                  <g>
                    <rect x="240" y="20" width="170" height="105" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="325" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">customer_orders</text>
                    <text x="250" y="60" fill="#38bdf8" fontSize="8 font-mono">PK order_id</text>
                    <text x="250" y="75" fill="#fcd34d" fontSize="8 font-mono">FK customer_id</text>
                    <text x="250" y="90" fill="#94a3b8" fontSize="8 font-mono">order_date, status</text>
                    <text x="250" y="105" fill="#a7f3d0" fontSize="8 font-mono">net_total_inr</text>
                  </g>

                  {/* Order Items */}
                  <g>
                    <rect x="470" y="20" width="170" height="105" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="555" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">order_items (1NF)</text>
                    <text x="480" y="60" fill="#38bdf8" fontSize="8 font-mono">PK order_item_id</text>
                    <text x="480" y="75" fill="#fcd34d" fontSize="8 font-mono">FK order_id</text>
                    <text x="480" y="90" fill="#fcd34d" fontSize="8 font-mono">FK product_id</text>
                    <text x="480" y="105" fill="#fcd34d" fontSize="8 font-mono">unit_price_at_sale</text>
                  </g>

                  {/* Products */}
                  <g>
                    <rect x="680" y="20" width="150" height="95" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="755" y="42" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">products</text>
                    <text x="690" y="60" fill="#38bdf8" fontSize="8 font-mono">PK product_id</text>
                    <text x="690" y="75" fill="#94a3b8" fontSize="8 font-mono">sku_code (UQ)</text>
                    <text x="690" y="90" fill="#fcd34d" fontSize="8 font-mono">FK category_id</text>
                  </g>

                  {/* Warehouse Inventory */}
                  <g>
                    <rect x="470" y="155" width="170" height="90" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="555" y="177" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">warehouse_inventory</text>
                    <text x="480" y="195" fill="#38bdf8" fontSize="8 font-mono">PK inventory_id</text>
                    <text x="480" y="210" fill="#fcd34d" fontSize="8 font-mono">FK warehouse_id</text>
                    <text x="480" y="225" fill="#fcd34d" fontSize="8 font-mono">FK product_id</text>
                  </g>

                  {/* Warehouses */}
                  <g>
                    <rect x="240" y="155" width="170" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="325" y="177" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">warehouses</text>
                    <text x="250" y="195" fill="#38bdf8" fontSize="8 font-mono">PK warehouse_id</text>
                    <text x="250" y="210" fill="#94a3b8" fontSize="8 font-mono">warehouse_name, city</text>
                  </g>

                  {/* Connecting Links */}
                  <path d="M 180 65 L 240 65" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 410 65 L 470 65" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 640 65 L 680 65" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 410 200 L 470 200" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 555 125 L 555 155" stroke="#ef4444" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: Checkout Inventory Decrement Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Atomic Checkout & Stock Reservation Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="20" y="30" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="110" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Cart Checkout</text>
                    <rect x="30" y="70" width="160" height="25" rx="3" fill="#022c22" />
                    <text x="110" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Lock Stock FOR UPDATE</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="240" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="330" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. Reserve Stock</text>
                    <rect x="250" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="330" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">quantity_reserved + Qty</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="460" y="30" width="180" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="550" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. Payment Captured</text>
                    <rect x="470" y="70" width="160" height="25" rx="3" fill="#0f172a" />
                    <text x="550" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Create Order & Lines</text>
                  </g>

                  {/* Step 4 */}
                  <g>
                    <rect x="680" y="30" width="150" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="755" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Order Shipped</text>
                    <rect x="690" y="70" width="130" height="25" rx="3" fill="#022c22" />
                    <text x="755" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">on_hand - Qty</text>
                  </g>

                  {/* Connecting Arrows */}
                  <path d="M 200 75 L 240 75" stroke="#10b981" strokeWidth="2" />
                  <path d="M 420 75 L 460 75" stroke="#818cf8" strokeWidth="2" />
                  <path d="M 640 75 L 680 75" stroke="#818cf8" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Retail & Supply Chain Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test low-stock automated alerts, product gross margin analytics, and customer RFM lifetime spend queries live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(retailWorkflows).map(([key, item]) => {
              const isActive = selectedWorkflow === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedWorkflow(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Query" : "○ Run Query"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{retailWorkflows[selectedWorkflow].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{retailWorkflows[selectedWorkflow].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Supply Chain Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Query Execution</span>
                <span className="text-emerald-400">Inventory Ledger Analysis</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {retailWorkflows[selectedWorkflow].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">SKU / Customer</th>
                    <th className="py-3 px-4 text-white">Product / Name</th>
                    <th className="py-3 px-4 text-emerald-400">Warehouse / City</th>
                    <th className="py-3 px-4 text-cyan-400">On-Hand / Recency</th>
                    <th className="py-3 px-4 text-indigo-400">Min / Frequency</th>
                    <th className="py-3 px-4 text-rose-400">Shortage / COGS</th>
                    <th className="py-3 px-4 text-amber-400">Status / Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {retailWorkflows[selectedWorkflow].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 text-white font-sans">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.warehouse}</td>
                      <td className="py-3 px-4 text-slate-300">{row.onHand}</td>
                      <td className="py-3 px-4 text-indigo-300">{row.min}</td>
                      <td className="py-3 px-4 text-rose-300 font-bold">{row.shortage}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Margin") || row.status.includes("VIP")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-rose-950 text-rose-400 border-rose-800"
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production DDL Scripts */}
        <section id="ddl-scripts" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production DDL Schema Creation Script
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Ready-to-deploy MySQL schema script for enterprise retail inventory and order processing.
            </p>
          </div>

          <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed shadow-2xl">
{`-- 1. Warehouses
CREATE TABLE warehouses (
    warehouse_id INT AUTO_INCREMENT PRIMARY KEY,
    warehouse_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- 2. Products Master
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    sku_code VARCHAR(30) NOT NULL UNIQUE,
    product_name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    cost_price_inr DECIMAL(10,2) NOT NULL,
    selling_price_inr DECIMAL(10,2) NOT NULL,
    min_reorder_level INT NOT NULL DEFAULT 10,
    CHECK (selling_price_inr >= cost_price_inr)
) ENGINE=InnoDB;

-- 3. Warehouse Inventory Ledger
CREATE TABLE warehouse_inventory (
    inventory_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    warehouse_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity_on_hand INT NOT NULL DEFAULT 0,
    quantity_reserved INT NOT NULL DEFAULT 0,
    UNIQUE KEY uq_wh_prod (warehouse_id, product_id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(warehouse_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 4. Customer Orders (Header)
CREATE TABLE customer_orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(30) NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL,
    order_date DATETIME NOT NULL,
    order_status ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    net_total_inr DECIMAL(12,2) NOT NULL,
    INDEX idx_order_date_status (order_date, order_status)
) ENGINE=InnoDB;

-- 5. Order Items (Lines - Price Drift Protection)
CREATE TABLE order_items (
    order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price_at_sale_inr DECIMAL(10,2) NOT NULL,
    subtotal_inr DECIMAL(12,2) NOT NULL,
    CHECK (quantity > 0),
    FOREIGN KEY (order_id) REFERENCES customer_orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
) ENGINE=InnoDB;`}
          </pre>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world implementations of retail price-drift prevention and inventory rebalancing.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Protecting Retail Sales Audits from Catalog Price Drift
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Distribution Hub</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audits retail sales lines and ensures that <code className="text-emerald-300 font-mono">unit_price_at_sale_inr</code> is permanently frozen on <code className="text-cyan-300 font-mono">order_items</code>. When laptop prices increase from ₹55,000 to ₹65,000 next quarter, historical order audits for Mamata, Susmita, Abhronila, and Debangshu remain mathematically exact!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Freezing the sale price snapshot at the exact millisecond of purchase:
INSERT INTO order_items (order_id, product_id, quantity, unit_price_at_sale_inr, subtotal_inr)
SELECT 9041, p.product_id, 2, p.selling_price_inr, (2 * p.selling_price_inr)
FROM products p WHERE p.sku_code = 'SKU-LAP-401';`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Inter-Warehouse Stock Transfer Transaction
                </h3>
                <span className="text-xs text-slate-400 font-mono">Barrackpore to Kolkata Transfer</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Rebalancing inventory across warehouses by atomically transferring 20 units of displays from Barrackpore to Kolkata Central with double-entry ACID safety.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`START TRANSACTION;
-- 1. Deduct from Source Warehouse (Barrackpore):
UPDATE warehouse_inventory 
SET quantity_on_hand = quantity_on_hand - 20 
WHERE warehouse_id = 1 AND product_id = 45;

-- 2. Add to Destination Warehouse (Kolkata):
UPDATE warehouse_inventory 
SET quantity_on_hand = quantity_on_hand + 20 
WHERE warehouse_id = 2 AND product_id = 45;
COMMIT;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid historical accounting errors and stock reservation race conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Joining to Current Product Price for Past Orders
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Calculating past revenue by multiplying <code className="text-rose-300 font-mono">quantity * products.selling_price_inr</code> distorts historical accounting whenever catalog prices update!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always use the immutable <code className="text-emerald-400 font-mono">order_items.unit_price_at_sale_inr</code> snapshot.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Enforce Positive Selling Margins
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Add <code className="text-emerald-400 font-mono">CHECK (selling_price_inr &gt;= cost_price_inr)</code> on the products master to prevent cashiers or admins from accidentally listing products below manufacturing cost.
              </p>
              <div className="text-xs text-slate-400">
                Enforces business profitability rules directly in the database engine.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for supply chain project evaluations and technical viva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Project Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Separate orders into Header (customer_orders) and Lines (order_items) in 1NF.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Capture immutable unit price snapshots in <code className="text-cyan-300 font-mono">order_items</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Manage multi-warehouse inventory with <code className="text-cyan-300 font-mono">UNIQUE (warehouse_id, product_id)</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Trigger automated reorder alerts when <code className="text-cyan-300 font-mono">quantity_on_hand &lt;= min_reorder_level</code>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe RFM Customer Segmentation...”</span>
                  Group delivered customer orders by <code className="text-cyan-300 font-mono">DATEDIFF(CURRENT_DATE, MAX(order_date))</code> (Recency), <code className="text-cyan-300 font-mono">COUNT(order_id)</code> (Frequency), and <code className="text-cyan-300 font-mono">SUM(net_total)</code> (Monetary) to build marketing analytics models!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about ON DELETE RESTRICT on products...”</span>
                  Never delete a product record that has past sales history; use an <code className="text-cyan-300 font-mono">is_active BOOLEAN DEFAULT TRUE</code> flag to soft-retire discontinued catalog items!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering retail supply chain modeling, multi-warehouse stock management, price-drift protection, and RFM analytics.
            </p>
          </div>

          <FAQTemplate
            title="Retail Inventory & Order System FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              10. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Design Project 3: Retail Inventory, Supplier & Order Processing DB"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="When students design an e-commerce or retail database, remind them of the Price-Drift Trap. If a student creates an order_items table with only (order_id, product_id, quantity) and joins to products for the price, their past sales numbers will change every time the marketing team changes product prices! Always freeze the unit_price_at_sale snapshot on the order line."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
