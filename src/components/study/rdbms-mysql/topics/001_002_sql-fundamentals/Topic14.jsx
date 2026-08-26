import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14 – Pattern Matching with LIKE and Wildcards (% and _)
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive LIKE Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic14 = () => {
  const sectionRefs = useRef([]);

  // Interactive LIKE Sandbox State
  const [pattern, setPattern] = useState("Mam%");
  const [targetColumn, setTargetColumn] = useState("name"); // "name", "email", "city"
  const [isNotLike, setIsNotLike] = useState(false);

  const dataset = [
    { id: 101, name: "Mamata Hui", email: "mamata@codernaccotax.in", city: "Barrackpore", fee: 15000 },
    { id: 102, name: "Abhronila Das", email: "abhronila@gmail.com", city: "Barrackpore", fee: 18500 },
    { id: 103, name: "Susmita Ghosh", email: "susmita@kolkata.org", city: "Kolkata", fee: 15000 },
    { id: 104, name: "Debangshu Roy", email: "debangshu@fintech.co.in", city: "Kolkata", fee: 20000 },
    { id: 105, name: "Mahima Sengupta", email: "mahima@jadavpur.edu", city: "Jadavpur", fee: 18500 },
    { id: 106, name: "Mamon Roy", email: "mamon@gmail.com", city: "Ichapur", fee: 12000 },
  ];

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

  // Convert SQL LIKE pattern to JavaScript RegExp
  const likeToRegExp = (likeStr) => {
    let regexStr = "^";
    for (let i = 0; i < likeStr.length; i++) {
      const char = likeStr[i];
      if (char === "%") {
        regexStr += ".*";
      } else if (char === "_") {
        regexStr += ".";
      } else if (["\\", ".", "^", "$", "*", "+", "?", "(", ")", "[", "]", "{", "}", "|"].includes(char)) {
        regexStr += "\\" + char;
      } else {
        regexStr += char;
      }
    }
    regexStr += "$";
    return new RegExp(regexStr, "i");
  };

  const evaluateRow = (val) => {
    try {
      const regex = likeToRegExp(pattern);
      const matches = regex.test(val);
      return isNotLike ? !matches : matches;
    } catch {
      return false;
    }
  };

  const filteredData = dataset.filter((s) => evaluateRow(s[targetColumn]));
  const isSargable = pattern.length > 0 && !pattern.startsWith("%") && !pattern.startsWith("_");

  const generatedSQL = `SELECT student_id, first_name, email, city\nFROM students\nWHERE ${targetColumn} ${
    isNotLike ? "NOT LIKE" : "LIKE"
  } '${pattern}';`;

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
            Module 001_002 · SQL Fundamentals · Topic 14
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            Pattern Matching with{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              LIKE & Wildcards (% and _)
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master string pattern search, B-Tree index prefix sargability, wildcard character escaping,
            collation sensitivity, and NOT LIKE filtering.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔤 % Multi-Character Wildcard
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📍 _ Single-Character Slot
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ⚡ Prefix Sargability
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🛡️ Backslash Escaping (\%, \_)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: Wildcards & Sargability Mechanics ──────── */}
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
                SQL Wildcards & B-Tree Index Navigation
              </h2>
              <p className="text-xs text-slate-400">
                Understanding % and _ wildcards and why leading wildcards trigger full table scans
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: % */}
            <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                % (Percent Sign) Wildcard
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Matches <strong>zero, one, or multiple</strong> arbitrary characters.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-teal-300 border border-slate-800">
                WHERE email LIKE '%@gmail.com';
              </pre>
            </div>

            {/* Card 2: _ */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                _ (Underscore) Wildcard
              </span>
              <p className="text-xs text-slate-400 mb-2">
                Matches <strong>exactly ONE</strong> single character position.
              </p>
              <pre className="rounded bg-slate-900 p-2 font-mono text-[11px] text-cyan-300 border border-slate-800">
                WHERE name LIKE 'M_hima'; -- Matches Mahima, Mohima
              </pre>
            </div>
          </div>

          {/* ── Semantic SVG 1: Prefix Sargability vs Full Scan ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: Prefix LIKE 'Mam%' (Fast B-Tree Seek) vs '%ata' (Full Table Scan)
            </h3>
            <svg
              viewBox="0 0 780 150"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="LIKE Sargability Diagram"
            >
              {/* Prefix */}
              <g transform="translate(30, 20)">
                <rect width="340" height="110" rx="8" fill="#1e293b" stroke="#10b981" />
                <text x="170" y="24" fill="#10b981" textAnchor="middle" fontWeight="bold">
                  ⚡ Prefix: WHERE name LIKE 'Mam%'
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Starting prefix 'Mam' is known</text>
                <text x="20" y="74" fill="#cbd5e1" fontSize="10">• Traverses B-Tree index in O(log N) microseconds</text>
                <text x="20" y="94" fill="#10b981" fontWeight="bold" fontSize="10">✓ Type: range (Covering Index scan)</text>
              </g>

              {/* Leading Wildcard */}
              <g transform="translate(410, 20)">
                <rect width="340" height="110" rx="8" fill="#1e293b" stroke="#f43f5e" />
                <text x="170" y="24" fill="#f43f5e" textAnchor="middle" fontWeight="bold">
                  ❌ Leading Wildcard: WHERE name LIKE '%ata'
                </text>
                <line x1="15" y1="34" x2="325" y2="34" stroke="#334155" />
                <text x="20" y="54" fill="#cbd5e1" fontSize="10">• Starting character is unknown</text>
                <text x="20" y="74" fill="#cbd5e1" fontSize="10">• B-Tree index CANNOT be navigated</text>
                <text x="20" y="94" fill="#f43f5e" fontWeight="bold" fontSize="10">⚠️ Type: ALL (Full Table Disk Scan)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive LIKE Sandbox ───────────────── */}
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
                Interactive LIKE Pattern Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Type custom wildcard expressions and observe live index sargability feedback & row matching
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Target Column:
                  </label>
                  <select
                    value={targetColumn}
                    onChange={(e) => setTargetColumn(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-teal-500 focus:outline-none"
                  >
                    <option value="name">Full Name</option>
                    <option value="email">Email Address</option>
                    <option value="city">City</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Pattern Template:
                  </label>
                  <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Quick Pattern Presets:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["Mam%", "%gmail.com", "M_hima%", "%kolkata%", "____"].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setPattern(preset)}
                      className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-teal-300 hover:border-teal-500 transition-all"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sargability Badge */}
              <div className="p-3 rounded-lg border bg-slate-950 flex items-center justify-between">
                <span className="text-xs text-slate-400">B-Tree Index Status:</span>
                {isSargable ? (
                  <span className="text-xs font-bold text-teal-400 flex items-center gap-1">
                    <span>⚡</span> Sargable Prefix Scan (Fast)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                    <span>⚠️</span> Non-Sargable (Full Table Scan)
                  </span>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNotLike}
                    onChange={(e) => setIsNotLike(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-teal-500"
                  />
                  <span><strong>Toggle NOT LIKE:</strong> Exclude rows matching pattern</span>
                </label>
              </div>
            </div>

            {/* Generated SQL & Filter Output */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                  Generated SQL Statement:
                </span>
                <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto leading-relaxed">
                  {generatedSQL}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Matched Records:
                  </span>
                  <span className="text-xs text-cyan-400 font-mono">
                    {filteredData.length} of {dataset.length} matched
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">City</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
                      {filteredData.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="p-2 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-2 text-cyan-300">{s.email}</td>
                          <td className="p-2 text-indigo-400">{s.city}</td>
                        </tr>
                      ))}
                      {filteredData.length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-4 text-center text-slate-500 italic">
                            No records match the active LIKE pattern.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
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
                Pattern matching applications from Barrackpore & Kolkata
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata Finding Gmail Student Accounts in Barrackpore College
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding all student emails registered through Google Workspace or personal Gmail.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    roll_no,
    CONCAT(first_name, ' ', last_name) AS student_name,
    email
FROM students
WHERE email LIKE '%@gmail.com'
  AND city = 'Barrackpore';`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu Matching Kolkata Warehouse SKU Structure
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata Warehouse</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Finding products matching the exact standardized SKU structure with 3 digit suffixes.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`SELECT
    sku_code,
    product_name,
    unit_price AS "Price (₹)"
FROM products
WHERE sku_code LIKE 'KOL-2026-___';`}
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
                Critical rules when matching strings with SQL wildcards
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
                  <strong className="text-white">1. Leading Wildcards (LIKE '%abc'):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Disables B-Tree index navigation and forces full table scans.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Unescaped Underscores:</strong>
                  <p className="text-slate-400 mt-0.5">
                    <code>LIKE 'PROMO_100'</code> matches <code>PROMOA100</code>. Escape with <code>\\_</code>.
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
                  <strong className="text-white">1. Use Prefix Searches (LIKE 'abc%'):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Maximizes performance with fast B-Tree index range scans.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. FULLTEXT Indexes for Large Text:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>MATCH(...) AGAINST(...)</code> for body text rather than <code>LIKE '%word%'</code>.
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
              <span><code>%</code> matches zero, one, or multiple characters</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>_</code> matches exactly one character position</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Prefix patterns (<code>'abc%'</code>) use B-Tree indexes in O(log N)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Leading wildcards (<code>'%abc'</code>) trigger slow full table scans</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Escape literal <code>%</code> and <code>_</code> using backslashes (<code>\\%</code>, <code>\\_</code>)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span><code>NULL LIKE '%'</code> evaluates to UNKNOWN (returns 0 rows)</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="Pattern Matching with LIKE – FAQs"
            questions={questions}
            subtitle="Master string pattern search, wildcard sargability, and escaping with 30 comprehensive Q&As"
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
            title="Pattern Matching with LIKE and Wildcards (% and _)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic14_like_wildcards_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "String pattern matching with `LIKE` is an indispensable tool in every developer's arsenal. " +
              "In my classes in Barrackpore, I emphasize the fundamental indexing rule: whenever your wildcard pattern starts " +
              "with a constant character (`LIKE 'Mamata%'`), MySQL can use your B-Tree index to perform a lightning-fast range seek. " +
              "The moment you place a `%` at the beginning (`LIKE '%Mamata%'`), the database is blind and must read every row from disk. " +
              "For heavy full-text search requirements, always upgrade to MySQL `FULLTEXT` indexes."
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 14 · LIKE Pattern Matching · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic14;
