import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Choosing the Right Referential Integrity Action for Business Needs
 * Module: 002_001_relationships-in-db
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive Decision Engine,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic8 = () => {
  const sectionRefs = useRef([]);

  // Interactive Business Decision Engine State
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);

  const businessScenarios = [
    {
      id: "invoices",
      title: "1. GST Tax Invoices & Ledger (Financial Records)",
      parent: "clients",
      child: "gst_invoices",
      nature: "Permanent Financial & Legal Compliance Ledger",
      recommendedAction: "ON DELETE RESTRICT ON UPDATE CASCADE",
      badgeColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
      reason:
        "Financial regulations strictly prohibit deleting clients while tax invoices or financial transactions exist. RESTRICT ensures complete audit ledger retention.",
      ddl: `CREATE TABLE gst_invoices (\n    invoice_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n    client_id INT NOT NULL,\n    invoice_amount DECIMAL(12, 2) NOT NULL,\n    CONSTRAINT fk_inv_client FOREIGN KEY (client_id)\n        REFERENCES clients(client_id)\n        ON DELETE RESTRICT -- Mandatory Financial Protection!\n        ON UPDATE CASCADE\n) ENGINE=InnoDB;`,
    },
    {
      id: "order_items",
      title: "2. E-Commerce Order Items (Existential Master-Detail)",
      parent: "orders",
      child: "order_items",
      nature: "Existential Child / Line Item Composition",
      recommendedAction: "ON DELETE CASCADE ON UPDATE CASCADE",
      badgeColor: "text-rose-400 border-rose-500/40 bg-rose-500/10",
      reason:
        "An individual order line item (e.g. '2 x Wireless Mouse') has zero meaning outside its parent order. Deleting or canceling an unfulfilled order should cleanly wipe its line items.",
      ddl: `CREATE TABLE order_items (\n    order_id BIGINT UNSIGNED NOT NULL,\n    product_id INT NOT NULL,\n    quantity INT NOT NULL DEFAULT 1,\n    unit_price DECIMAL(10, 2) NOT NULL,\n    PRIMARY KEY (order_id, product_id),\n    CONSTRAINT fk_items_order FOREIGN KEY (order_id)\n        REFERENCES orders(order_id)\n        ON DELETE CASCADE -- Clean automated teardown\n        ON UPDATE CASCADE\n) ENGINE=InnoDB;`,
    },
    {
      id: "mentors",
      title: "3. Student Faculty Mentors (Advisory Allocation)",
      parent: "faculty",
      child: "students",
      nature: "Optional Advisory / Re-assignable Link",
      recommendedAction: "ON DELETE SET NULL ON UPDATE CASCADE",
      badgeColor: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
      reason:
        "If a faculty mentor leaves the institute, students must NOT be deleted. Setting mentor_id to NULL preserves student enrollments until a new mentor is assigned.",
      ddl: `CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    mentor_id INT NULL, -- Must be NULL for SET NULL!\n    CONSTRAINT fk_student_mentor FOREIGN KEY (mentor_id)\n        REFERENCES faculty(faculty_id)\n        ON DELETE SET NULL -- Retains student records\n        ON UPDATE CASCADE\n) ENGINE=InnoDB;`,
    },
    {
      id: "sessions",
      title: "4. Ephemeral User Auth Sessions & Tokens",
      parent: "users",
      child: "user_sessions",
      nature: "Temporary Disposable Security State",
      recommendedAction: "ON DELETE CASCADE ON UPDATE CASCADE",
      badgeColor: "text-teal-400 border-teal-500/40 bg-teal-500/10",
      reason:
        "When a user account is purged, all active session tokens, refresh tokens, and temporary login cookies should be instantly invalidated and deleted from disk.",
      ddl: `CREATE TABLE user_sessions (\n    session_id VARCHAR(128) PRIMARY KEY,\n    user_id INT NOT NULL,\n    expires_at DATETIME NOT NULL,\n    CONSTRAINT fk_session_user FOREIGN KEY (user_id)\n        REFERENCES users(id)\n        ON DELETE CASCADE -- Instant session invalidation\n        ON UPDATE CASCADE\n) ENGINE=InnoDB;`,
    },
  ];

  const currentScenario = businessScenarios[selectedScenarioIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <>
      {/* ─── Scoped Component Styles & Reveal Keyframes ────────── */}
      <style>{`
        .reveal-section {
          transform: translateY(20px);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-section.is-visible {
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* ─── Main Container ────────────────────────────────────── */}
      <div
        className={clsx(
          "w-full max-w-5xl mx-auto px-4 py-10 md:py-14",
          "bg-slate-950 text-slate-100 font-sans leading-relaxed"
        )}
      >
        {/* ─── Module Breadcrumb & Topic Header ────────────────── */}
        <div ref={addRef} className="reveal-section mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-400">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Module 002_001 · Relationships in DB · Topic 8
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Choosing the Right{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Referential Integrity Action
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master the architectural decision framework: evaluating child lifecycle, financial compliance,
            existential compositions, and risk mitigation when selecting between <code>CASCADE</code>, <code>RESTRICT</code>, and <code>SET NULL</code>.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🎯 Business Decision Matrix
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚖️ Financial Audit Compliance
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📦 Existential Composition
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Risk Mitigation Framework
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: The Master Decision Framework ────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold">
              01
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                The 3-Tier Referential Decision Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Evaluating child entity value, audit obligations, and parent dependency
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rule 1 */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                1. Financial / Legal ➔ RESTRICT
              </span>
              <p className="text-xs text-slate-400">
                Invoices, tax receipts, bank ledgers, medical records. Permanent audit retention mandatory.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="rounded-xl border border-rose-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
                2. Existential Child ➔ CASCADE
              </span>
              <p className="text-xs text-slate-400">
                Order line items, shopping cart items, uploaded document files, session tokens.
              </p>
            </div>

            {/* Rule 3 */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                3. Optional Advisory ➔ SET NULL
              </span>
              <p className="text-xs text-slate-400">
                Faculty mentors, department managers, room allocations, hardware lockers.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Decision Flowchart ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: The Referential Action Selection Decision Tree
            </h3>
            <svg
              viewBox="0 0 780 140"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Referential Action Decision Tree"
            >
              {/* Question 1 */}
              <g transform="translate(20, 20)">
                <rect width="210" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="105" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  Q1: Financial / Audit?
                </text>
                <line x1="10" y1="36" x2="200" y2="36" stroke="#334155" />
                <text x="105" y="56" fill="#cbd5e1" textAnchor="middle" fontSize="9">Does child have statutory</text>
                <text x="105" y="70" fill="#cbd5e1" textAnchor="middle" fontSize="9">legal/tax retention need?</text>
                <text x="105" y="90" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="9">YES ➔ USE RESTRICT</text>
              </g>

              {/* Arrow */}
              <line x1="230" y1="70" x2="270" y2="70" stroke="#64748b" strokeWidth="2" />

              {/* Question 2 */}
              <g transform="translate(270, 20)">
                <rect width="220" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="110" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  Q2: Meaningless without Parent?
                </text>
                <line x1="10" y1="36" x2="210" y2="36" stroke="#334155" />
                <text x="110" y="56" fill="#cbd5e1" textAnchor="middle" fontSize="9">Is child an existential</text>
                <text x="110" y="70" fill="#cbd5e1" textAnchor="middle" fontSize="9">part of parent container?</text>
                <text x="110" y="90" fill="#f43f5e" textAnchor="middle" fontWeight="bold" fontSize="9">YES ➔ USE CASCADE</text>
              </g>

              {/* Arrow */}
              <line x1="490" y1="70" x2="530" y2="70" stroke="#64748b" strokeWidth="2" />

              {/* Question 3 */}
              <g transform="translate(530, 20)">
                <rect width="230" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="115" y="24" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                  Q3: Optional Allocation?
                </text>
                <line x1="10" y1="36" x2="220" y2="36" stroke="#334155" />
                <text x="115" y="56" fill="#cbd5e1" textAnchor="middle" fontSize="9">Can child survive without</text>
                <text x="115" y="70" fill="#cbd5e1" textAnchor="middle" fontSize="9">an assigned parent?</text>
                <text x="115" y="90" fill="#2dd4bf" textAnchor="middle" fontWeight="bold" fontSize="9">YES ➔ USE SET NULL</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Decision Engine ─────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 font-bold">
              02
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Interactive Business Domain Decision Engine
              </h2>
              <p className="text-xs text-slate-400">
                Select a business domain scenario to inspect optimal referential rules, justification, and production DDL
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls & Justification */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Select Business Domain Scenario:
                </label>
                <select
                  value={selectedScenarioIndex}
                  onChange={(e) => setSelectedScenarioIndex(Number(e.target.value))}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                &gt;
                  {businessScenarios.map((sc, idx) => (
                    <option key={sc.id} value={idx}>
                      {sc.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Scenario Details */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    Relationship: <code>{currentScenario.parent}</code> (1) ➔ <code>{currentScenario.child}</code> (N)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Recommended Action:</span>
                  <span className={clsx("text-xs font-mono font-bold px-2.5 py-1 rounded-lg border", currentScenario.badgeColor)}>
                    {currentScenario.recommendedAction}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-500 block mb-0.5">
                    Architectural & Compliance Justification:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentScenario.reason}
                  </p>
                </div>
              </div>
            </div>

            {/* Generated Production DDL */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                Production MySQL DDL Schema:
              </span>
              <pre className="rounded-xl bg-slate-900 p-4 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed max-h-64 overflow-y-auto">
                {currentScenario.ddl}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Real-World Production Scenarios (Classroom Case Studies)
              </h2>
              <p className="text-xs text-slate-400">
                Ledger protection and shopping cart lifecycle schemas from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Barrackpore Student Tuition Receipts (RESTRICT)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Accounts</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Student accounts with financial transaction history must be protected from accidental deletion.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE tuition_receipts (
    receipt_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    paid_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rcpt_student FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE RESTRICT -- Financial protection!
        ON UPDATE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Kolkata E-Commerce Cart Items (CASCADE)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Cart items are existential to a shopping cart; deleting the cart cascades to delete items.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`CREATE TABLE cart_items (
    cart_id BIGINT UNSIGNED NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY (cart_id, product_id),
    CONSTRAINT fk_cart_items FOREIGN KEY (cart_id)
        REFERENCES carts(cart_id)
        ON DELETE CASCADE -- Cart destroyed ➔ Items wiped cleanly
        ON UPDATE CASCADE
) ENGINE=InnoDB;`}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Common Pitfalls & Best Practices ───────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40 transition-all duration-300 hover:border-slate-700"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Common Mistakes & Production Best Practices
              </h2>
              <p className="text-xs text-slate-400">
                Avoid blanket cascading deletions and unindexed foreign key performance drops
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfalls */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Common Pitfalls
              </h3>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. Blanket Application of CASCADE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Blindly adding <code>CASCADE</code> to all foreign keys leads to catastrophic mass deletion storms.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Incompatible Nullability:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Using <code>SET NULL</code> on a column defined as <code>NOT NULL</code> fails at schema creation.
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>✅</span> Production Best Practices
              </h3>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2.5 text-xs text-slate-300">
                <div>
                  <strong className="text-white">1. RESTRICT on Financial Tables:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Default to <code>RESTRICT</code> for invoices, ledgers, and accounts to preserve audit trails.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Always Add ON UPDATE CASCADE:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Ensures seamless primary key renumbering across all child tables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Summary Checklist ─────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section mb-12 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-xl shadow-black/40"
        >
          <h2 className="text-lg md:text-xl font-bold text-white border-b border-slate-800 pb-3">
            Summary Checklist (What You Must Remember)
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>RESTRICT</code> for financial, tax, invoice, and legal audit ledgers</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>CASCADE</code> for existential master-detail parts (e.g. Order Items, Cart Items)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Use <code>SET NULL</code> for optional advisory links (e.g. Mentors, Managers)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Foreign Key column MUST be defined as nullable (`INT NULL`) to use <code>SET NULL</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always combine delete actions with <code>ON UPDATE CASCADE</code></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Index all Foreign Key columns to ensure high-speed referential checks</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Choosing Referential Actions – FAQs"
            questions={questions}
            subtitle="Master architectural decision-making, financial audit protection, and lifecycle management with 30 comprehensive Q&As"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── SECTION 7: Plain Text Printable Study Note ───────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <PlainTextPrint
            content={noteText}
            title="Choosing the Right Referential Integrity Action for Business Needs"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic8_choosing_referential_action_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Choosing referential actions is not just a syntax exercise — it is a serious business governance decision! " +
              "In my classes in Barrackpore, I teach students to always ask: 'What happens to the child entity if the parent ceases to exist?' " +
              "If the child is a tax invoice or tuition receipt, the law requires it to stay (`RESTRICT`). If the child is an order line item, " +
              "it has no value on its own (`CASCADE`). If the child is a student whose mentor resigned, the student must remain enrolled (`SET NULL`). " +
              "Apply these three rules, and your database architectures will be rock-solid and enterprise-grade."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 8 · Business Referential Actions · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic8;
