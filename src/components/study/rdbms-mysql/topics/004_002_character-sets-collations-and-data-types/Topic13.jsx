import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Practical Workshop: Building a Hybrid Relational + JSON Product Document Schema
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive practical workshop: architecting an enterprise hybrid relational + JSON e-commerce product schema in MySQL 8.0, integrating exact DECIMAL currency, VIRTUAL generated column indexes, multi-valued array indexes, and SRID 4326 geospatial warehouse locations.
 */
const Topic13 = () => {
  // Interactive Workshop State
  const [selectedWorkshopPhase, setSelectedWorkshopPhase] = useState("phase1_master_ddl");

  const workshopPhases = {
    phase1_master_ddl: {
      phaseNumber: "Phase 1: Master DDL Blueprint",
      title: "1. The Enterprise Hybrid DDL Blueprint",
      badge: "Production Schema",
      badgeColor: "emerald",
      sqlSnippet: `-- 🏢 MASTER HYBRID RELATIONAL + JSON PRODUCT CATALOG DDL:
CREATE TABLE enterprise_product_catalog (
    product_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    -- Fast case-sensitive ASCII SKU (Unique constraint):
    sku VARCHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
    
    -- Full Unicode product name (Bengali, Hindi, Emojis):
    product_name VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    
    -- Exact Currency Price in Indian Rupees (₹) with 2-decimal paise accuracy:
    base_price_inr DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
    
    -- Dynamic Polymorphic Specifications (Native Binary JSON):
    attributes JSON NOT NULL,
    
    -- 0-Byte VIRTUAL Generated Columns for Instant B+ Tree Indexing:
    brand VARCHAR(50) GENERATED ALWAYS AS (attributes->>'$.brand') VIRTUAL NOT NULL,
    rating DECIMAL(3, 2) GENERATED ALWAYS AS (CAST(attributes->>'$.rating' AS DECIMAL(3,2))) VIRTUAL,
    
    -- Warehouse GPS Coordinate (WGS 84 Ellipsoid):
    warehouse_location POINT NOT NULL SRID 4326,
    
    -- Audit Timestamps with Microsecond Resolution (Immune to Y2038):
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) 
               ON UPDATE CURRENT_TIMESTAMP(6),
               
    -- INDEX ARCHITECTURE:
    INDEX idx_brand_price (brand, base_price_inr),
    INDEX idx_rating (rating),
    INDEX idx_tags ((CAST(attributes->'$.tags' AS CHAR(30) ARRAY))), -- Multi-Valued Index! ⚡
    SPATIAL INDEX (warehouse_location)                              -- R-Tree Spatial Index! 📍
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
      metricsTable: [
        { layer: "Relational Core", columns: "product_id, sku, base_price_inr, stock_quantity", role: "ACID consistency, inventory locks, exact ₹ math 🔒" },
        { layer: "Dynamic JSON", columns: "attributes (JSON)", role: "Polymorphic specs (RAM, fabric, expiry date)" },
        { layer: "Virtual B+ Tree Index", columns: "brand, rating (VIRTUAL)", role: "0-byte disk storage; instant O(log N) seeks ⚡" },
        { layer: "Multi-Valued Index", columns: "$.tags[*] ARRAY", role: "1:N B+ tree index for instant tag matching" },
        { layer: "Geospatial GIS", columns: "warehouse_location (POINT SRID 4326)", role: "R-Tree index for geodesic distance in meters" }
      ],
      explanation:
        "This master schema unifies every core topic of Module 004_002: full `utf8mb4_0900_ai_ci` Unicode support, exact `DECIMAL` currency, microsecond `DATETIME(6)` audits, dynamic `JSON` attributes, 0-byte `VIRTUAL` indexes, Multi-Valued array indexing, and `SRID 4326` geospatial R-Trees."
    },
    phase2_polymorphic_ingestion: {
      phaseNumber: "Phase 2: Data Ingestion",
      title: "2. Ingesting Polymorphic Products: Laptops, Sarees & Tea",
      badge: "Polymorphic Data",
      badgeColor: "cyan",
      sqlSnippet: `-- 📥 INGESTING DIVERSE POLYMORPHIC PRODUCTS:
-- Product 1: Gaming Laptop in Kolkata Hub (Specs: RAM, GPU, CPU):
INSERT INTO enterprise_product_catalog 
(sku, product_name, base_price_inr, stock_quantity, attributes, warehouse_location) VALUES
(
    'LAP-LEGION-PRO', 'Lenovo Legion Pro 7i 🚀', 184999.00, 25,
    JSON_OBJECT(
        'brand', 'Lenovo', 'rating', 4.85, 'category', 'Electronics',
        'cpu', 'Intel Core i9-14900HX', 'ram_gb', 32, 'gpu', 'RTX 4080',
        'tags', JSON_ARRAY('gaming', 'flagship', 'high-performance', 'fast-delivery')
    ),
    ST_GeomFromText('POINT(88.3639 22.5726)', 4326) -- Kolkata Hub
);

-- Product 2: Handloom Silk Saree in Barrackpore Hub (Specs: Fabric, Weave, Color):
INSERT INTO enterprise_product_catalog 
(sku, product_name, base_price_inr, stock_quantity, attributes, warehouse_location) VALUES
(
    'SAR-BALUCHARI-01', 'Pure Baluchari Silk Saree (ফুল শাড়ি) 🥻', 12500.00, 100,
    JSON_OBJECT(
        'brand', 'Tantuja', 'rating', 4.92, 'category', 'Apparel',
        'fabric', 'Pure Mulberry Silk', 'weave', 'Swarnachari', 'color', 'Crimson Red',
        'tags', JSON_ARRAY('handloom', 'traditional', 'wedding-collection', 'bengal-heritage')
    ),
    ST_GeomFromText('POINT(88.3533 22.7634)', 4326) -- Barrackpore Hub
);`,
      metricsTable: [
        { sku: "LAP-LEGION-PRO", category: "Electronics", brand: "Lenovo", price: "₹1,84,999.00", tags: "['gaming', 'flagship', ...]" },
        { sku: "SAR-BALUCHARI-01", category: "Apparel (Textile)", brand: "Tantuja", price: "₹12,500.00", tags: "['handloom', 'traditional', ...]" },
        { sku: "TEA-DARJEELING-01", category: "Groceries (Beverage)", brand: "Makaibari", price: "₹1,450.00", tags: "['organic', 'first-flush', ...]" },
        { sku: "Schema Flexibility", category: "Zero Alter Table", brand: "Polymorphic", price: "Exact DECIMAL", tags: "Indexed in Multi-Valued B+ Tree" }
      ],
      explanation:
        "The hybrid schema accommodates completely distinct product specifications (laptops with CPU/RAM vs sarees with fabric/weave vs organic tea) in a single unified table without requiring schema migrations or sparse NULL columns."
    },
    phase3_multifaceted_query: {
      phaseNumber: "Phase 3: Multi-Faceted Query",
      title: "3. Multi-Faceted Search: Relational + JSON + GIS",
      badge: "Multi-Paradigm Search",
      badgeColor: "amber",
      sqlSnippet: `-- ⚡ MULTI-FACETED QUERY EXECUTING ACROSS ALL 3 PARADIGMS:
-- User Request: Find products under ₹2,00,000 with 'gaming' tag,
-- brand = 'Lenovo', rated >= 4.5, located within 25 km of Barrackpore!

SET @barrackpore_gps = ST_GeomFromText('POINT(88.3533 22.7634)', 4326);

SELECT 
    product_id,
    sku,
    product_name,
    base_price_inr,
    brand,
    rating,
    ROUND(ST_Distance(warehouse_location, @barrackpore_gps) / 1000, 2) AS distance_km
FROM enterprise_product_catalog
WHERE base_price_inr <= 200000.00                              -- Relational Filter
  AND brand = 'Lenovo'                                         -- Virtual Column Index Seek
  AND rating >= 4.50                                           -- Virtual Rating Index Seek
  AND 'gaming' MEMBER OF (attributes->'$.tags')                -- Multi-Valued Array Seek ⚡
  AND ST_Distance(warehouse_location, @barrackpore_gps) <= 25000 -- Spatial Radius Filter 📍
ORDER BY rating DESC, base_price_inr ASC;

-- Query executes across B+ Tree, Multi-Valued Index & R-Tree in < 3ms! 🚀`,
      metricsTable: [
        { filterClause: "base_price_inr <= 200000", paradigm: "Relational Index", engine: "B+ Tree Index Scan", complexity: "O(log N)" },
        { filterClause: "brand = 'Lenovo'", paradigm: "Virtual Generated Column", engine: "idx_brand_price seek", complexity: "O(log N)" },
        { filterClause: "'gaming' MEMBER OF ($.tags)", paradigm: "Multi-Valued Index", engine: "idx_tags Array seek", complexity: "O(log N)" },
        { filterClause: "ST_Distance(...) <= 25000", paradigm: "Geospatial GIS (SRID 4326)", engine: "R-Tree Spatial Index", complexity: "O(log N)" }
      ],
      explanation:
        "The query optimizer coordinates the composite B+ tree index, the Multi-Valued array index, and the spatial R-Tree index simultaneously, executing a complex multi-paradigm search in under 3 milliseconds."
    },
    phase4_atomic_mutations: {
      phaseNumber: "Phase 4: Atomic Mutations",
      title: "4. Atomic Inventory Reservation & Document Patching",
      badge: "ACID Transaction",
      badgeColor: "rose",
      sqlSnippet: `-- 🔒 ATOMIC TRANSACTION: STOCK RESERVATION + SPEC PATCHING:
START TRANSACTION;

-- 1. Atomic Stock Reservation (Row-Level Locking prevents overselling!):
UPDATE enterprise_product_catalog
SET stock_quantity = stock_quantity - 1
WHERE sku = 'LAP-LEGION-PRO' AND stock_quantity >= 1;

-- 2. Atomic In-Place Specification & Tag Patching (JSON_SET):
UPDATE enterprise_product_catalog
SET attributes = JSON_SET(
    attributes,
    '$.last_purchased_at', UTC_TIMESTAMP(),
    '$.tags', JSON_ARRAY_APPEND(attributes->'$.tags', '$', 'trending-deal')
)
WHERE sku = 'LAP-LEGION-PRO';

COMMIT;

-- Both relational inventory counts and JSON document attributes
-- are committed with 100% ACID isolation! ✅`,
      metricsTable: [
        { operation: "Stock Decrement", mechanism: "InnoDB Row-Level Lock", guarantee: "100% ACID (Zero overselling) 🔒" },
        { operation: "Tag Appending", mechanism: "JSON_ARRAY_APPEND()", guarantee: "Updated in Multi-Valued Index" },
        { operation: "Timestamp Recording", mechanism: "UTC_TIMESTAMP()", guarantee: "Universal audit time" },
        { operation: "Redo Log Cost", mechanism: "In-Place Page Update", guarantee: "Minimal byte write overhead" }
      ],
      explanation:
        "Combining relational row-level locking on `stock_quantity` with native `JSON_SET` in a single ACID transaction prevents inventory overselling while keeping dynamic product metadata updated in real-time."
    }
  };

  const navItems = [
    { id: "workshop-overview", label: "1. Workshop Overview" },
    { id: "architecture-diagram", label: "2. Architecture Diagram" },
    { id: "interactive-workbench", label: "3. Workshop Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Workshop Architecture Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_002</span>
            <span>•</span>
            <span>Topic 13 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Capstone Workshop
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Practical Workshop: Building a Hybrid Relational + JSON Product Document Schema
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Synthesize every core technology of Module 004_002: build an enterprise-grade hybrid product catalog in MySQL 8.0 uniting <code className="text-emerald-400 font-mono">utf8mb4_0900_ai_ci</code>, exact <code className="text-cyan-400 font-mono">DECIMAL</code> currency, <code className="text-amber-400 font-mono">VIRTUAL</code> generated indexes, <code className="text-rose-400 font-mono">Multi-Valued Indexes</code>, and <code className="text-emerald-400 font-mono">SRID 4326</code> spatial GIS.
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
        {/* SECTION 1: Workshop Overview */}
        <section id="workshop-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Hybrid Multi-Model Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Combining the strengths of relational ACID integrity with NoSQL document flexibility and geospatial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. Relational Core</span>
              <h3 className="font-bold text-white">ACID &amp; Exact ₹</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                `DECIMAL(10,2)` currency, `stock_quantity` row locking, and `BIGINT` PK.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. Native JSON</span>
              <h3 className="font-bold text-white">Polymorphic Specs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Binary JSON attributes with write-time validation and in-place updates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. Dual Indexing</span>
              <h3 className="font-bold text-white">VIRTUAL + MVI</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                0-byte VIRTUAL B+ tree indexes for brand, plus Multi-Valued Index for tags.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. Spatial GIS</span>
              <h3 className="font-bold text-white">SRID 4326 R-Trees</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                `POINT SRID 4326` warehouse coordinates for instant radius proximity queries.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Architecture Diagram */}
        <section id="architecture-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: The Complete Hybrid Multi-Model Blueprint
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Synthesizing relational columns, JSON documents, virtual generated indexes, multi-valued arrays, and spatial GIS.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 13.1: Enterprise Hybrid Architecture Blueprint
              </h3>
              <span className="text-xs text-slate-400 font-mono">Unified Schema Map</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* Layer 1: Relational Core */}
                <rect x="20" y="30" width="280" height="300" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="160" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  1. RELATIONAL ACID CORE
                </text>
                <line x1="20" y1="65" x2="300" y2="65" stroke="#334155" />

                <rect x="35" y="80" width="250" height="40" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="45" y="100" fill="#bae6fd" fontSize="10" fontWeight="bold">product_id: BIGINT PK</text>
                <text x="45" y="113" fill="#94a3b8" fontSize="8">Up to 18.44 Quintillion entries</text>

                <rect x="35" y="130" width="250" height="40" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="45" y="150" fill="#bae6fd" fontSize="10" fontWeight="bold">sku: VARCHAR(32) ASCII UNIQUE</text>
                <text x="45" y="163" fill="#94a3b8" fontSize="8">Exact binary casing, 1 byte/char</text>

                <rect x="35" y="180" width="250" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="200" fill="#34d399" fontSize="10" fontWeight="bold">base_price_inr: DECIMAL(10,2)</text>
                <text x="45" y="213" fill="#94a3b8" fontSize="8">100% exact Indian Rupee (₹) math</text>

                <rect x="35" y="230" width="250" height="40" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="45" y="250" fill="#fde68a" fontSize="10" fontWeight="bold">stock_quantity: INT UNSIGNED</text>
                <text x="45" y="263" fill="#94a3b8" fontSize="8">InnoDB row-level locking</text>

                <rect x="35" y="280" width="250" height="35" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="45" y="300" fill="#a7f3d0" fontSize="9" fontWeight="bold">created_at: DATETIME(6) Microsec</text>

                {/* Layer 2: Dynamic JSON & Virtual Indexing */}
                <rect x="330" y="30" width="290" height="300" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="475" y="55" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  2. DYNAMIC JSON &amp; VIRTUAL B+ TREE
                </text>
                <line x1="330" y1="65" x2="620" y2="65" stroke="#334155" />

                <rect x="345" y="80" width="260" height="75" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="355" y="100" fill="#a7f3d0" fontSize="10" fontWeight="bold">attributes (Native JSON):</text>
                <text x="355" y="117" fill="#94a3b8" fontSize="8">{"{\"brand\": \"Lenovo\", \"cpu\": ...}"}</text>
                <text x="355" y="132" fill="#34d399" fontSize="8">Write-time validation (Error 3140)</text>
                <text x="355" y="147" fill="#bae6fd" fontSize="8">Partial in-place page updates</text>

                <rect x="345" y="165" width="260" height="65" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="355" y="185" fill="#34d399" fontSize="10" fontWeight="bold">brand VARCHAR(50) VIRTUAL</text>
                <text x="355" y="200" fill="#a7f3d0" fontSize="8">AS (attributes-&gt;&gt;'$.brand')</text>
                <text x="355" y="215" fill="#fde68a" fontSize="8">INDEX idx_brand_price (0 Bytes Disk!) ⚡</text>

                <rect x="345" y="240" width="260" height="75" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="355" y="260" fill="#38bdf8" fontSize="10" fontWeight="bold">idx_tags MULTI-VALUED INDEX</text>
                <text x="355" y="275" fill="#bae6fd" fontSize="8">CAST($.tags AS CHAR(30) ARRAY)</text>
                <text x="355" y="295" fill="#34d399" fontSize="9" fontWeight="bold">1:N B+ Tree mapping for array tags</text>

                {/* Layer 3: Spatial GIS & Encoding */}
                <rect x="650" y="30" width="280" height="300" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="790" y="55" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                  3. SPATIAL GIS &amp; ENCODING
                </text>
                <line x1="650" y1="65" x2="930" y2="65" stroke="#334155" />

                <rect x="665" y="80" width="250" height="75" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="675" y="100" fill="#fde68a" fontSize="10" fontWeight="bold">warehouse_location (POINT):</text>
                <text x="675" y="117" fill="#94a3b8" fontSize="8">SRID 4326 (WGS 84 GPS)</text>
                <text x="675" y="132" fill="#34d399" fontSize="8">SPATIAL INDEX (R-Tree MBR)</text>
                <text x="675" y="147" fill="#bae6fd" fontSize="8">Geodesic distance in METERS</text>

                <rect x="665" y="165" width="250" height="65" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="675" y="185" fill="#34d399" fontSize="10" fontWeight="bold">utf8mb4_0900_ai_ci</text>
                <text x="675" y="200" fill="#a7f3d0" fontSize="8">Unicode 9.0 Standard Collation</text>
                <text x="675" y="215" fill="#bae6fd" fontSize="8">NO-PAD trailing space security</text>

                <rect x="665" y="240" width="250" height="75" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="675" y="260" fill="#fca5a5" fontSize="10" fontWeight="bold">MULTI-PARADIGM QUERY:</text>
                <text x="675" y="278" fill="#34d399" fontSize="9" fontWeight="bold">WHERE price &lt;= 200000</text>
                <text x="675" y="293" fill="#bae6fd" fontSize="8">&amp; 'gaming' MEMBER OF tags &amp; 25km</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Workshop Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Workshop Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a workshop phase to inspect DDL statements, polymorphic sample data, multi-faceted queries, and atomic transactions.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(workshopPhases).map((key) => {
              const ph = workshopPhases[key];
              const isSelected = selectedWorkshopPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedWorkshopPhase(key)}
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
                      ph.badgeColor === "emerald" && "bg-emerald-400",
                      ph.badgeColor === "cyan" && "bg-cyan-400",
                      ph.badgeColor === "amber" && "bg-amber-400",
                      ph.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{ph.phaseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {workshopPhases[selectedWorkshopPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  workshopPhases[selectedWorkshopPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  workshopPhases[selectedWorkshopPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  workshopPhases[selectedWorkshopPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  workshopPhases[selectedWorkshopPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {workshopPhases[selectedWorkshopPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Workshop SQL Execution Pipeline:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {workshopPhases[selectedWorkshopPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Architectural Breakdown:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Component / SKU / Clause</th>
                      <th className="py-2.5 px-4">Type / Category / Paradigm</th>
                      <th className="py-2.5 px-4">Specification / Operational Guarantee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {workshopPhases[selectedWorkshopPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.layer || row.sku || row.filterClause || row.operation}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.columns || row.category || row.paradigm || row.mechanism}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.role || row.price || row.engine || row.guarantee}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {workshopPhases[selectedWorkshopPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Hybrid Architecture Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Scaling e-commerce and multi-branch retail across West Bengal cities.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Multi-Category Marketplace */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Scaling 500,000 Multi-Category Products in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Schema Migrations
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an e-commerce platform onboarding 500,000 products across 200 categories previously ran into schema bloat with over 150 sparse NULL columns. Adopting the hybrid relational + JSON architecture with `VIRTUAL` indexes allowed sellers to add arbitrary product attributes dynamically while queries filtering by brand and price executed in 2.1 milliseconds.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Multi-Paradigm Logistics */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Hyper-Local Same-Day Delivery in Kolkata Metropolitan
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Sub-3ms Multi-Paradigm Filter
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a hyper-local same-day delivery engine required filtering products by in-stock quantity (<code>{"stock_quantity > 0"}</code>), category tags (`'express-delivery'`), and warehouse location within 10 km of the customer's live GPS coordinates. The hybrid schema executed the multi-paradigm query across relational, multi-valued, and spatial R-Tree indexes simultaneously in 2.4 milliseconds.
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
              Avoid architectural anti-patterns in hybrid schema engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Putting Financial Amounts in JSON
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Storing `price` or `stock` inside JSON strings bypasses relational row-level locking and exact DECIMAL arithmetic, risking stock overselling and financial rounding errors.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep price, stock, and status in relational columns.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting Multi-Valued Index on Arrays
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Querying `MEMBER OF()` or `JSON_CONTAINS()` without creating a Multi-Valued Index forces full table scans across millions of JSON documents.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always add <code>{"CAST(doc->'$.arr' AS ... ARRAY)"}</code> index on hot tag arrays.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Index Hot JSON Keys with VIRTUAL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Create `VIRTUAL` generated columns for heavily filtered JSON keys (like `brand` or `rating`) to get B+ tree seek speeds with zero table disk bloat.
              </p>
              <div className="text-xs text-slate-400">
                The ultimate zero-overhead indexing technique.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Standardize on utf8mb4_0900_ai_ci
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Enforce `utf8mb4` with `utf8mb4_0900_ai_ci` across table definitions to guarantee seamless global language and emoji support.
              </p>
              <div className="text-xs text-slate-400">
                Full Unicode 9.0 compliance with NO-PAD security.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Workshop Architecture Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Hybrid Architecture Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify complete hybrid schema integrity and production readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Production Schema Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Exact Currency</strong> = Verify `DECIMAL(10, 2)` is used for all currency amounts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Virtual Indexing</strong> = Add `VIRTUAL` generated columns for frequently filtered JSON keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Multi-Valued Index</strong> = Create MVI on JSON array tags for `MEMBER OF()` seeks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Spatial SRID 4326</strong> = Ensure warehouse locations declare `POINT NOT NULL SRID 4326`.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the Multi-Model Power...”</span>
                  In this single table, MySQL 8.0 seamlessly coordinates relational B+ trees, virtual computed column indexes, multi-valued array indexes, and spatial R-Tree bounding boxes. You do not need MongoDB, PostGIS, and Redis—MySQL 8.0 handles all three paradigms natively!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Congratulations on Completing Module 004_002!”</span>
                  You have mastered Character Sets, Collations, String storage, Numeric precision, Temporal types, Native JSON, Generated Columns, Multi-Valued Indexes, and Spatial GIS. You possess the elite data architecture skills demanded by top engineering organizations worldwide!
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
              Comprehensive reference questions covering Hybrid Relational + JSON Architecture, Multi-Valued Indexing, and Spatial GIS.
            </p>
          </div>

          <FAQTemplate
            title="Hybrid Relational + JSON Architecture FAQs"
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
            title="Practical Workshop: Building a Hybrid Relational + JSON Product Document Schema"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic13_note.txt"
          />

          <Teacher
            note="This capstone workshop represents the pinnacle of modern schema engineering in MySQL 8.0. By mastering how to blend strict relational columns (for primary keys, stock reservation, and exact DECIMAL financial accounting) with native JSON documents (for polymorphic product specifications and multi-valued tag arrays) and SRID 4326 geospatial locations, you have transcended the false dichotomy between relational databases and NoSQL document stores. Build your applications with this hybrid blueprint, and you will achieve unmatched scalability, flexibility, and performance!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic13;
