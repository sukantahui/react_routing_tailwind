import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Using Recursive CTEs for Hierarchical Data (Org Charts, Category Trees, BOM)
 * Module: 003_001_subqueries-and-cte
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on hierarchical tree traversal, adjacency lists, breadcrumb construction, BOM parts explosion, and cycle detection.
 */
const Topic11 = () => {
  // Interactive Simulator State
  const [selectedHierarchyScenario, setSelectedHierarchyScenario] = useState("top_down_org_chart");

  const hierarchyScenarios = {
    top_down_org_chart: {
      title: "1. Top-Down Org Chart Traversal (Root to Leaves with Indentation)",
      badge: "Top-Down Tree",
      badgeColor: "emerald",
      sqlQuery: `-- Top-Down Organization Chart Traversal:
WITH RECURSIVE FacultyOrgChart AS (
    -- Anchor Member: Root Director (manager_id IS NULL):
    SELECT 
        faculty_id,
        faculty_name,
        manager_id,
        role_title,
        1 AS hierarchy_level,
        CAST(faculty_name AS CHAR(500)) AS breadcrumb_path
    FROM faculty_members
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive Member: Join subordinates to their managers:
    SELECT 
        f.faculty_id,
        f.faculty_name,
        f.manager_id,
        f.role_title,
        o.hierarchy_level + 1,
        CONCAT(o.breadcrumb_path, ' ➔ ', f.faculty_name)
    FROM faculty_members f
    JOIN FacultyOrgChart o ON f.manager_id = o.faculty_id
)
SELECT 
    hierarchy_level,
    CONCAT(REPEAT('    ', hierarchy_level - 1), '├── ', faculty_name) AS indented_org_tree,
    role_title,
    breadcrumb_path
FROM FacultyOrgChart
ORDER BY hierarchy_level, faculty_id;`,
      resultRows: [
        { id: "FAC-01", name: "Sukanta Hui", role: "Director & Lead Architect", level: "Level 1 (Root)", treeVisual: "├── Sukanta Hui", path: "Sukanta Hui", status: "Root Executive" },
        { id: "FAC-02", name: "Mamata Hui", role: "Senior SQL Instructor", level: "Level 2 (Lead)", treeVisual: "    ├── Mamata Hui", path: "Sukanta Hui ➔ Mamata Hui", status: "Department Lead" },
        { id: "FAC-03", name: "Abhronila Saha", role: "Database Lab Lead", level: "Level 2 (Lead)", treeVisual: "    ├── Abhronila Saha", path: "Sukanta Hui ➔ Abhronila Saha", status: "Department Lead" },
        { id: "FAC-04", name: "Susmita Sen", role: "Teaching Assistant (CS)", level: "Level 3 (Staff)", treeVisual: "        ├── Susmita Sen", path: "Sukanta Hui ➔ Mamata Hui ➔ Susmita Sen", status: "Faculty Staff" },
      ],
      explanation:
        "Traverses downward from the Root Director (`manager_id IS NULL`) to department leads and teaching assistants, generating visual indentation and full breadcrumb paths.",
    },
    bottom_up_breadcrumbs: {
      title: "2. Bottom-Up Traversal: Finding Upstream Management Chain",
      badge: "Bottom-Up Path",
      badgeColor: "cyan",
      sqlQuery: `-- Bottom-Up Traversal: Finding the complete leadership chain above Susmita Sen:
WITH RECURSIVE ManagementChain AS (
    -- Anchor Member: Starting target faculty member (Susmita Sen, ID: 4):
    SELECT 
        faculty_id,
        faculty_name,
        manager_id,
        role_title,
        1 AS chain_step
    FROM faculty_members
    WHERE faculty_id = 4
    
    UNION ALL
    
    -- Recursive Member: Climb upward via manager_id:
    SELECT 
        m.faculty_id,
        m.faculty_name,
        m.manager_id,
        m.role_title,
        c.chain_step + 1
    FROM faculty_members m
    JOIN ManagementChain c ON m.faculty_id = c.manager_id
)
SELECT chain_step, faculty_name, role_title 
FROM ManagementChain
ORDER BY chain_step ASC;`,
      resultRows: [
        { id: "FAC-04", name: "Susmita Sen", role: "Teaching Assistant (CS)", level: "Step 1 (Target)", treeVisual: "Target Employee", path: "Reporting Tier 1", status: "Direct Node" },
        { id: "FAC-02", name: "Mamata Hui", role: "Senior SQL Instructor", level: "Step 2 (Direct Manager)", treeVisual: "Direct Supervisor", path: "Reporting Tier 2", status: "Direct Supervisor" },
        { id: "FAC-01", name: "Sukanta Hui", role: "Director & Lead Architect", level: "Step 3 (Ultimate Head)", treeVisual: "Ultimate Executive", path: "Reporting Tier 3", status: "Executive Root" },
      ],
      explanation:
        "Climbs upward from Susmita Sen through Mamata Hui to Director Sukanta Hui, resolving the entire organizational escalation hierarchy in 3 iterations.",
    },
    bill_of_materials_explosion: {
      title: "3. Bill of Materials (BOM) Parts Explosion & Quantity Rollup",
      badge: "BOM Parts Explosion",
      badgeColor: "amber",
      sqlQuery: `-- Bill of Materials Parts Explosion: Building 100 Smart Lab Workstations:
WITH RECURSIVE PartsExplosion AS (
    -- Anchor Member: Top-level assembled product (Workstation, ID: 101):
    SELECT 
        component_id,
        component_name,
        parent_component_id,
        quantity_required,
        (100 * quantity_required) AS total_parts_needed,
        1 AS assembly_depth
    FROM assembly_components
    WHERE parent_component_id IS NULL
    
    UNION ALL
    
    -- Recursive Member: Multiply parent requirement by sub-part requirement:
    SELECT 
        c.component_id,
        c.component_name,
        c.parent_component_id,
        c.quantity_required,
        (p.total_parts_needed * c.quantity_required),
        p.assembly_depth + 1
    FROM assembly_components c
    JOIN PartsExplosion p ON c.parent_component_id = p.component_id
)
SELECT assembly_depth, component_name, total_parts_needed 
FROM PartsExplosion
ORDER BY assembly_depth, component_id;`,
      resultRows: [
        { id: "CMP-101", name: "Smart Lab Workstation Unit", role: "Top Finished Good", level: "Depth 1 (Finished)", treeVisual: "100 Units Assembled", path: "100 Workstations", status: "Final Assembly" },
        { id: "CMP-201", name: "Custom Motherboard Kit", role: "Sub-Assembly", level: "Depth 2 (Sub-Part)", treeVisual: "100 Kits Required", path: "1 per Workstation", status: "Sub-Assembly" },
        { id: "CMP-301", name: "DDR5 32GB RAM Sticks", role: "Raw Component", level: "Depth 3 (Component)", treeVisual: "200 Sticks Required", path: "2 per Motherboard", status: "Raw Parts" },
        { id: "CMP-302", name: "NVMe 1TB PCIe 4.0 SSD", role: "Raw Component", level: "Depth 3 (Component)", treeVisual: "100 Drives Required", path: "1 per Motherboard", status: "Raw Parts" },
      ],
      explanation:
        "Multiplies assembly component ratios down the tree: 100 Workstations $\\times$ 1 Motherboard $\\times$ 2 RAM Sticks = 200 RAM sticks total.",
    },
    cycle_detection_guard: {
      title: "4. Cycle Detection & Runaway Loop Mitigation",
      badge: "Cycle Guard",
      badgeColor: "rose",
      sqlQuery: `-- Preventing Infinite Loops on Corrupted Hierarchies (A → B → A):
WITH RECURSIVE SafeGraphTraversal AS (
    -- Anchor Member: Seed starting node with path tracker:
    SELECT 
        node_id,
        node_name,
        parent_node_id,
        1 AS step_depth,
        CAST(CONCAT('/', node_id, '/') AS CHAR(500)) AS visited_path
    FROM network_nodes
    WHERE parent_node_id IS NULL
    
    UNION ALL
    
    -- Recursive Member: Guard against visiting already-visited nodes:
    SELECT 
        n.node_id,
        n.node_name,
        n.parent_node_id,
        g.step_depth + 1,
        CONCAT(g.visited_path, n.node_id, '/')
    FROM network_nodes n
    JOIN SafeGraphTraversal g ON n.parent_node_id = g.node_id
    -- THE CYCLE GUARD PREDICATE:
    WHERE g.visited_path NOT LIKE CONCAT('%/', n.node_id, '/%')
)
SELECT step_depth, node_name, visited_path 
FROM SafeGraphTraversal;`,
      resultRows: [
        { id: "NOD-01", name: "Gateway Hub", role: "Network Root", level: "Step 1", treeVisual: "Root Node", path: "/1/", status: "Safe Traversal" },
        { id: "NOD-02", name: "Switch Branch A", role: "Network Branch", level: "Step 2", treeVisual: "Branch Node", path: "/1/2/", status: "Safe Traversal" },
        { id: "NOD-03", name: "Switch Branch B", role: "Network Branch", level: "Step 3", treeVisual: "Branch Node", path: "/1/2/3/", status: "Safe Traversal" },
        { id: "NOD-01", name: "Gateway Hub (Loop Attempt)", role: "Circular Reference", level: "Step 4", treeVisual: "[CYCLE BLOCKED]", path: "Blocked by Guard", status: "Loop Prevented" },
      ],
      explanation:
        "The `WHERE visited_path NOT LIKE ...` predicate tracks visited node IDs, gracefully halting when a circular reference is encountered without crashing the server.",
    },
  };

  const navItems = [
    { id: "hierarchy-concept", label: "1. Hierarchical Models" },
    { id: "traversal-dimensions", label: "2. Traversal Dimensions" },
    { id: "svg-diagrams", label: "3. Org Chart & BOM SVGs" },
    { id: "interactive-sandbox", label: "4. Live Hierarchy Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_001</span>
            <span>•</span>
            <span>Topic 11 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Graph & Tree Traversal
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Recursive CTEs for Hierarchical Trees & BOM
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Traverse complex relational hierarchies with ease. Master Adjacency Lists, top-down indented organization trees, bottom-up breadcrumb paths, Bill of Materials (BOM) parts explosion, and cycle detection guards.
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
        {/* SECTION 1: Concepts */}
        <section id="hierarchy-concept" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Relational Hierarchical Data Modeling
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The Adjacency List model uses a self-referencing foreign key to link child records to parent records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🌲</span> Adjacency List Schema
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Simple self-referencing foreign key (<code className="text-emerald-300 font-mono">manager_id REFERENCES employees(id)</code>) enables easy single-row inserts and updates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span>🪜</span> Depth & Breadcrumb Tracking
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Track generation depth (<code className="text-cyan-300 font-mono">level + 1</code>) and accumulate formatted path strings (<code className="text-cyan-300 font-mono">Root ➔ Lead ➔ Staff</code>).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>⚙️</span> Bill of Materials (BOM)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculate total component quantities across multi-tier assembly trees by multiplying parent requirements down the branch.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Traversal Dimensions */}
        <section id="traversal-dimensions" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Traversal Dimensions: Top-Down vs Bottom-Up
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Choosing the correct traversal direction based on business analytics requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>⬇️</span> Top-Down Traversal (Root to Leaves)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Starts where <code className="text-emerald-300 font-mono">manager_id IS NULL</code>. Discovers all direct and indirect subordinates under a leader, sub-categories under a department, or sub-assemblies of a product.
              </p>
              <div className="text-xs text-slate-400 font-mono">
                Join Condition: e.manager_id = o.faculty_id
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <span>⬆️</span> Bottom-Up Traversal (Leaf to Root)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Starts at a specific employee or product SKU. Climbs upward through management reporting lines to build audit escalation paths and navigation breadcrumbs.
              </p>
              <div className="text-xs text-slate-400 font-mono">
                Join Condition: m.faculty_id = c.manager_id
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Org Chart Tree & BOM Parts Explosion
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing top-down organizational trees and multi-tier component rollups.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Org Chart Tree */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Top-Down Faculty Org Chart Tree Architecture
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Root Node */}
                  <g>
                    <rect x="330" y="10" width="190" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="28" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Sukanta Hui (Director)</text>
                    <text x="425" y="42" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">manager_id = NULL (Level 1)</text>
                  </g>

                  {/* Level 2 Nodes */}
                  <g>
                    <rect x="130" y="80" width="180" height="40" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="220" y="98" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Mamata Hui (Lead CS)</text>
                    <text x="220" y="112" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">manager_id = 1 (Level 2)</text>
                  </g>

                  <g>
                    <rect x="540" y="80" width="180" height="40" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="630" y="98" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Abhronila Saha (Lead IT)</text>
                    <text x="630" y="112" fill="#38bdf8" fontSize="7 font-mono" textAnchor="middle">manager_id = 1 (Level 2)</text>
                  </g>

                  {/* Level 3 Node */}
                  <g>
                    <rect x="130" y="135" width="180" height="20" rx="4" fill="#0f172a" stroke="#475569" />
                    <text x="220" y="149" fill="#94a3b8" fontSize="8 font-mono" textAnchor="middle">Susmita Sen (TA CS, Level 3)</text>
                  </g>

                  {/* Connecting Lines */}
                  <path d="M 425 50 L 220 80" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 425 50 L 630 80" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 220 120 L 220 135" stroke="#818cf8" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* SVG 2: BOM Parts Explosion */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Bill of Materials (BOM) Multi-Tier Parts Explosion
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1 */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Tier 1: Finished Unit</text>
                    <rect x="45" y="70" width="200" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="9 font-mono" textAnchor="middle">100 Workstations</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Assembly Multiplier: 100x</text>
                  </g>

                  {/* Tier 2 */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Tier 2: Sub-Assembly Kit</text>
                    <rect x="315" y="70" width="220" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">1 Motherboard per Unit</text>
                    <text x="425" y="102" fill="#a7f3d0" fontSize="7 font-mono" textAnchor="middle">100 x 1 = 100 Motherboards</text>
                  </g>

                  {/* Tier 3 */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#450a0a" stroke="#f59e0b" strokeWidth="2" />
                    <text x="705" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">Tier 3: Raw Components</text>
                    <rect x="605" y="70" width="200" height="40" rx="4" fill="#1e293b" />
                    <text x="705" y="88" fill="#fcd34d" fontSize="8 font-mono" textAnchor="middle">2 RAM Sticks per Kit</text>
                    <text x="705" y="102" fill="#fcd34d" fontSize="7 font-bold" textAnchor="middle">100 x 2 = 200 RAM Sticks</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 260 80 L 300 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 590 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Hierarchical CTE Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test top-down indented trees, bottom-up breadcrumb escalations, BOM parts explosion, and cycle detection live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(hierarchyScenarios).map(([key, item]) => {
              const isActive = selectedHierarchyScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedHierarchyScenario(key)}
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
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Tree" : "○ Traverse Tree"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{hierarchyScenarios[selectedHierarchyScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{hierarchyScenarios[selectedHierarchyScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Tree Traversal Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Recursive Hierarchical SQL Query</span>
                <span className="text-emerald-400">Adjacency List Traversal</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {hierarchyScenarios[selectedHierarchyScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Node ID</th>
                    <th className="py-3 px-4 text-white">Entity Name</th>
                    <th className="py-3 px-4 text-emerald-400">Role / Specification</th>
                    <th className="py-3 px-4 text-cyan-400">Generation Level</th>
                    <th className="py-3 px-4 text-indigo-400">Indented Tree / Visual</th>
                    <th className="py-3 px-4 text-amber-400">Breadcrumb Path</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {hierarchyScenarios[selectedHierarchyScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.role}</td>
                      <td className="py-3 px-4 text-slate-300">{row.level}</td>
                      <td className="py-3 px-4 text-indigo-300 whitespace-pre">{row.treeVisual}</td>
                      <td className="py-3 px-4 text-amber-300 font-sans">{row.path}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium border bg-emerald-950 text-emerald-400 border-emerald-800">
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

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world tree traversals and prerequisite resolution.
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
                  Automated Multi-Tier Course Prerequisite Resolution
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Academy ERP</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui automated prerequisite validation: When student Mamata registers for Advanced Distributed Systems, a bottom-up recursive CTE instantly resolves the entire dependency chain (Operating Systems ➔ Data Structures ➔ Programming Fundamentals) in 0.8ms, verifying that all prerequisite course credits are satisfied!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Resolving Prerequisite Chains Bottom-Up:
WITH RECURSIVE PrerequisiteChain AS (
    SELECT course_id, course_title, prerequisite_id, 1 AS depth
    FROM courses WHERE course_id = 401
    UNION ALL
    SELECT c.course_id, c.course_title, c.prerequisite_id, p.depth + 1
    FROM courses c JOIN PrerequisiteChain p ON c.course_id = p.prerequisite_id
)
SELECT depth, course_title FROM PrerequisiteChain ORDER BY depth DESC;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid silent truncation and circular graph lockups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Uncasted Breadcrumb Paths
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting <code className="text-rose-300 font-mono">CAST(name AS CHAR(500))</code> in the Anchor Member locks the column length to the root name's length, causing silent truncation on child branches.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always cast expanding path strings in the anchor.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Index the Self-Referencing Foreign Key
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always maintain a B-Tree index on <code className="text-emerald-400 font-mono">manager_id / parent_id</code> so each recursive iteration executes in $O(\log N)$ logarithmic time rather than scanning tables.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees sub-millisecond tree traversals.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for hierarchical recursive CTEs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Hierarchy Traversal Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span>Model trees using self-referencing <code className="text-cyan-300 font-mono">parent_id</code> Adjacency Lists.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Seed roots in Anchor with <code className="text-cyan-300 font-mono">WHERE parent_id IS NULL</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Construct indented visual trees with <code className="text-cyan-300 font-mono">REPEAT('   ', level - 1)</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Implement cycle guards with path exclusion predicates on graph data.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe BOM Quantity Multiplications...”</span>
                  In Bill of Materials queries, multiply the accumulated quantity: <code className="text-cyan-300 font-mono">parent_qty * child_qty_per_assembly</code> at each recursive step!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about index support on parent keys...”</span>
                  Without an index on the self-referencing foreign key, every recursive iteration performs a full table scan!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering hierarchical data traversal, adjacency lists, breadcrumbs, BOM parts explosions, and cycle prevention.
            </p>
          </div>

          <FAQTemplate
            title="Hierarchical Recursive CTEs FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Using Recursive CTEs for Hierarchical Data (Org Charts, Category Trees, Bill of Materials)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic11_note.txt"
          />

          <Teacher
            note="Querying hierarchical data was one of the hardest challenges in older versions of MySQL. With Recursive CTEs, traversing an organization chart, category breadcrumb, or Bill of Materials is straightforward. Remember to always cast your breadcrumb string columns in the Anchor Member to allocate enough memory, and index the parent foreign key for instant seeks."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
