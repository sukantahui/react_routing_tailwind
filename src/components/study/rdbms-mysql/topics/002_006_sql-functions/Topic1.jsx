import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – String Functions: CONCAT, CONCAT_WS, SUBSTRING, LENGTH, CHAR_LENGTH
 * Module: 002_006_sql-functions (Built-in Functions, Grouping & Aggregations)
 *
 * @component
 * @returns {JSX.Element} Educational tutorial component with interactive String Function Simulator Sandbox,
 *                        SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic1 = () => {
  const sectionRefs = useRef([]);

  // Interactive String Function State
  const [selectedStringMode, setSelectedStringMode] = useState("mode_concat_ws"); // "mode_concat_ws" | "mode_null_poison" | "mode_utf8_length" | "mode_negative_substr"

  const stringScenarios = {
    mode_concat_ws: {
      title: "1. Address & Badge Stitching (CONCAT_WS + SUBSTRING)",
      sqlQuery: `SELECT 
    student_id,
    CONCAT_WS(', ', student_name, street_address, city, 'West Bengal') AS formatted_address,
    CONCAT('BADGE-', SUBSTRING(student_id, 2), '-', UPPER(SUBSTRING(student_name, 1, 3))) AS badge_code
FROM student_profiles;`,
      resultRows: [
        { name: "Mamata Hui", address: "25 Shibtala Rd, Barrackpore, West Bengal", badge: "BADGE-101-MAM", badgeColor: "emerald" },
        { name: "Debangshu Roy", address: "42 Park St, Kolkata, West Bengal", badge: "BADGE-102-DEB", badgeColor: "emerald" },
        { name: "Susmita Sen", address: "Station Rd, Ichapur, West Bengal", badge: "BADGE-103-SUS", badgeColor: "emerald" },
      ],
      verdictText: "✓ CLEAN FORMATTING & NULL RESILIENT",
      badgeColor: "emerald",
      explanation: "CONCAT_WS skips missing street addresses cleanly without leaving empty trailing commas, while SUBSTRING builds clean badge codes.",
    },
    mode_null_poison: {
      title: "2. The CONCAT NULL Poisoning Trap",
      sqlQuery: `-- ⚠️ CONCAT returns NULL if ANY argument is NULL:
SELECT 
    student_name,
    CONCAT(first_name, ' ', middle_name, ' ', last_name) AS naive_full_name,
    CONCAT_WS(' ', first_name, middle_name, last_name) AS safe_full_name
FROM student_names;
-- If middle_name is NULL:
-- CONCAT('Mamata', NULL, 'Hui') ➔ NULL ❌
-- CONCAT_WS(' ', 'Mamata', NULL, 'Hui') ➔ 'Mamata Hui' ✓`,
      resultRows: [
        { name: "Mamata (NULL middle)", address: "CONCAT: NULL ❌", badge: "CONCAT_WS: 'Mamata Hui' ✓", badgeColor: "rose" },
        { name: "Debangshu (NULL middle)", address: "CONCAT: NULL ❌", badge: "CONCAT_WS: 'Debangshu Roy' ✓", badgeColor: "rose" },
      ],
      verdictText: "⚠️ NULL POISONING COLLAPSE",
      badgeColor: "rose",
      explanation: "CONCAT() suffers from NULL poisoning—any NULL argument causes the entire output to collapse to NULL. Always use CONCAT_WS() for nullable names and addresses!",
    },
    mode_utf8_length: {
      title: "3. UTF-8 Byte Length vs Character Count (LENGTH vs CHAR_LENGTH)",
      sqlQuery: `-- Comparing LENGTH (Bytes) vs CHAR_LENGTH (Characters):
SELECT 
    sample_text,
    CHAR_LENGTH(sample_text) AS character_count,
    LENGTH(sample_text) AS byte_size_in_utf8mb4
FROM text_samples;`,
      resultRows: [
        { name: "English: 'Kolkata'", address: "CHAR_LENGTH: 7 characters", badge: "LENGTH: 7 bytes (1 byte/char)", badgeColor: "cyan" },
        { name: "Bengali: 'কলকাতা'", address: "CHAR_LENGTH: 6 characters", badge: "LENGTH: 18 bytes (3 bytes/char)", badgeColor: "cyan" },
        { name: "Emoji: '🚀 SQL Pro'", address: "CHAR_LENGTH: 9 characters", badge: "LENGTH: 12 bytes (4-byte emoji)", badgeColor: "cyan" },
      ],
      verdictText: "✓ MULTI-BYTE UNICODE DISCOVERY",
      badgeColor: "cyan",
      explanation: "In utf8mb4, Bengali characters consume 3 bytes each and emojis consume 4 bytes. Always use CHAR_LENGTH() for user-facing UI character count validation!",
    },
    mode_negative_substr: {
      title: "4. Negative Substring Indexing & Card Masking",
      sqlQuery: `-- Extracting suffixes and masking card numbers:
SELECT 
    customer_name,
    card_number AS raw_card,
    CONCAT('************', SUBSTRING(card_number, -4)) AS masked_card_number,
    SUBSTRING_INDEX(email, '@', -1) AS email_domain
FROM customer_cards;`,
      resultRows: [
        { name: "Mamata Hui", address: "Raw: 4532112233448899", badge: "Masked: ************8899", badgeColor: "indigo" },
        { name: "Debangshu Roy", address: "Raw: 5424998877661234", badge: "Masked: ************1234", badgeColor: "indigo" },
      ],
      verdictText: "✓ NEGATIVE INDEX EXTRACTION",
      badgeColor: "indigo",
      explanation: "Negative indices in SUBSTRING(str, -4) count backwards from the end of the string, making card masking and domain parsing trivial.",
    },
  };

  const currentString = stringScenarios[selectedStringMode];

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
            Module 002_006 · SQL Functions · Topic 1
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white">
            String Functions:{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              CONCAT, CONCAT_WS, SUBSTRING &amp; LENGTH
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-slate-400">
            Master essential text manipulation functions: avoiding the CONCAT NULL poisoning trap with CONCAT_WS,
            1-based and negative substring indexing, and understanding byte length vs character count in multi-byte UTF-8 databases.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🔗 CONCAT_WS (NULL-Safe Separator)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              ✂️ 1-Based &amp; Negative SUBSTRING()
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              📏 LENGTH() [Bytes] vs CHAR_LENGTH() [Chars]
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5">
              🌐 Multi-Byte Unicode (Bengali / Emoji)
            </span>
          </div>
        </div>

        {/* ─── SECTION 1: String Functions Theory & Mechanics ────── */}
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
                The Mechanics of SQL String Manipulation &amp; Character Sets
              </h2>
              <p className="text-xs text-slate-400">
                Understanding concatenation safety, 1-based indexing, and byte-vs-character length disparity
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-teal-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">1. CONCAT_WS() Safety</span>
              <strong className="text-white text-xs block font-mono">CONCAT_WS(', ', first, middle, last)</strong>
              <p className="text-xs text-slate-300">
                Automatically skips <code>NULL</code> arguments without poisoning the output or inserting duplicate consecutive delimiters.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. UTF-8 Multi-Byte Rule</span>
              <strong className="text-white text-xs block font-mono">LENGTH = Bytes | CHAR_LENGTH = Characters</strong>
              <p className="text-xs text-slate-300">
                In <code>utf8mb4</code>, ASCII is 1 byte, Bengali text ('কলকাতা') is 3 bytes per character, and emojis ('🚀') are 4 bytes.
              </p>
            </div>
          </div>

          {/* ── Semantic SVG 1: Byte vs Character Diagram ── */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Visual Guide: LENGTH() in Bytes vs CHAR_LENGTH() in Code Points in UTF-8
            </h3>
            <svg
              viewBox="0 0 780 130"
              className="w-full h-auto text-xs font-sans"
              role="img"
              aria-label="Byte vs Character Length Diagram"
            >
              {/* ASCII Box */}
              <g transform="translate(20, 20)">
                <rect width="220" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="110" y="22" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">ASCII: 'Kolkata'</text>
                <text x="10" y="48" fill="#cbd5e1" fontSize="9">CHAR_LENGTH: 7 characters</text>
                <text x="10" y="68" fill="#a7f3d0" fontSize="9">LENGTH: 7 bytes (1B / char)</text>
                <text x="10" y="82" fill="#38bdf8" fontSize="8">1:1 Byte-Char Parity</text>
              </g>

              {/* Bengali Unicode Box */}
              <g transform="translate(270, 20)">
                <rect width="240" height="90" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="120" y="22" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="10">Bengali: 'কলকাতা'</text>
                <text x="10" y="48" fill="#cbd5e1" fontSize="9">CHAR_LENGTH: 6 characters</text>
                <text x="10" y="68" fill="#fde68a" fontSize="9">LENGTH: 18 bytes (3B / char)</text>
                <text x="10" y="82" fill="#10b981" fontSize="8">3x Byte Expansion in UTF-8</text>
              </g>

              {/* Emoji Box */}
              <g transform="translate(540, 20)">
                <rect width="220" height="90" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="110" y="22" fill="#818cf8" textAnchor="middle" fontWeight="bold" fontSize="10">Emoji: '🚀 SQL Pro'</text>
                <text x="10" y="48" fill="#cbd5e1" fontSize="9">CHAR_LENGTH: 9 characters</text>
                <text x="10" y="68" fill="#c084fc" fontSize="9">LENGTH: 12 bytes (4B Emoji)</text>
                <text x="10" y="82" fill="#818cf8" fontSize="8">4-Byte Astral Code Point</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Sandbox ────────────────────── */}
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
                Interactive String Function Simulator Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test CONCAT_WS address joining, CONCAT NULL poisoning traps, UTF-8 multi-byte lengths, and card masking
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Scenario Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedStringMode("mode_concat_ws")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedStringMode === "mode_concat_ws"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                1. CONCAT_WS &amp; Badges
              </button>

              <button
                onClick={() => setSelectedStringMode("mode_null_poison")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedStringMode === "mode_null_poison"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                2. NULL Poison Trap ⚠️
              </button>

              <button
                onClick={() => setSelectedStringMode("mode_utf8_length")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedStringMode === "mode_utf8_length"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                3. UTF-8 Byte vs Char
              </button>

              <button
                onClick={() => setSelectedStringMode("mode_negative_substr")}
                className={clsx(
                  "py-2 px-2 rounded-lg text-xs font-bold transition-all border text-center font-mono",
                  selectedStringMode === "mode_negative_substr"
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                4. Negative Substring
              </button>
            </div>

            {/* Sandbox Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Query & Explanation */}
              <div className="space-y-4">
                <div className="rounded-xl border border-teal-500/30 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">{currentString.title}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-2 py-0.5 rounded border",
                        currentString.badgeColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : currentString.badgeColor === "cyan"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : currentString.badgeColor === "indigo"
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                      )}
                    >
                      {currentString.verdictText}
                    </span>
                  </div>

                  <pre className="font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-56">
                    {currentString.sqlQuery}
                  </pre>

                  <p className="text-[11px] text-slate-300">{currentString.explanation}</p>
                </div>
              </div>

              {/* Right: Result Set */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                  <span className="text-xs font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    Evaluated String Tuples
                  </span>

                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="text-[10px] text-teal-400 uppercase border-b border-slate-800 bg-slate-900">
                      <tr>
                        <th className="p-1.5">Input Entity / Text</th>
                        <th className="p-1.5">Transformed Value 1</th>
                        <th className="p-1.5">Transformed Value 2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {currentString.resultRows.map((r, i) => (
                        <tr key={i} className="bg-slate-950/40">
                          <td className="p-1.5 text-white font-bold">{r.name}</td>
                          <td className="p-1.5 text-cyan-300">{r.address}</td>
                          <td className="p-1.5 text-emerald-300 font-bold">{r.badge}</td>
                        </tr>
                      ))}
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
                How Barrackpore and Kolkata training institutes use string functions in live applications
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Case 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 1: Mamata's Student Certificate Serial Number Generator
                </h3>
                <span className="text-xs text-slate-500 font-mono">Barrackpore Academy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Generating ISO certificate serial numbers combining course code, year, and student sequence:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Formatted ISO Certificate Serial Code:
SELECT 
    student_id,
    student_name,
    CONCAT(
        'CA-CERT-',
        YEAR(CURDATE()),
        '-',
        SUBSTRING(course_id, 2),
        '-',
        LPAD(SUBSTRING(student_id, 2), 5, '0')
    ) AS certificate_serial_no
FROM students;
-- Example Output: 'CA-CERT-2026-101-00101'`}
              </pre>
            </div>

            {/* Case 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-400">
                  Case 2: Debangshu's Multi-Lingual Product Name Validator
                </h3>
                <span className="text-xs text-slate-500 font-mono">Kolkata E-Commerce</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Validating character length on localized product descriptions in Bengali and English:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
{`-- Validating Character Count Limits for Product Titles:
SELECT 
    product_id,
    product_title_bengali,
    CHAR_LENGTH(product_title_bengali) AS visible_char_length,
    LENGTH(product_title_bengali) AS raw_byte_storage_size,
    CASE 
        WHEN CHAR_LENGTH(product_title_bengali) > 50 THEN 'REJECT (Exceeds 50 chars)'
        ELSE 'APPROVED'
    END AS validation_status
FROM product_translations;`}
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
                Guidelines for manipulating text strings efficiently and safely
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
                  <strong className="text-white">1. CONCAT NULL Poisoning:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Using <code>CONCAT()</code> on nullable columns causes entire rows to collapse to NULL.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Using LENGTH for UI Validation:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Using <code>LENGTH()</code> on Bengali text or emojis measures byte count, rejecting valid short text.
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
                  <strong className="text-white">1. Default to CONCAT_WS:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Use <code>CONCAT_WS()</code> for concatenating names, addresses, and labels to handle NULLs automatically.
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Use CHAR_LENGTH for UI Limits:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Always validate character constraints using <code>CHAR_LENGTH()</code> in UTF-8 databases.
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
              <span>CONCAT() returns NULL if any input parameter is NULL</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>CONCAT_WS(sep, ...) skips NULLs safely and cleanly</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>SQL string indices in SUBSTRING() are 1-based</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Negative start positions in SUBSTRING() count backwards from string end</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>LENGTH() measures bytes; CHAR_LENGTH() measures character code points</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">☑</span>
              <span>Always use CHAR_LENGTH() for multi-byte UTF-8 input length checks</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FAQ Template ──────────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <FAQTemplate
            title="String Functions &amp; UTF-8 Analytics – FAQs"
            questions={questions}
            subtitle="Master string concatenation safety, CONCAT_WS delimiters, 1-based and negative SUBSTRING indexing, byte vs character length in UTF-8, and card masking with 30 comprehensive Q&As"
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
            title="String Functions: CONCAT, CONCAT_WS, SUBSTRING, LENGTH, CHAR_LENGTH"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic1_string_functions_note.txt"
          />
        </section>

        {/* ─── SECTION 8: Teacher's Note ───────────────────────── */}
        <section ref={addRef} className="reveal-section mb-12">
          <Teacher
            note={
              "Text manipulation is at the heart of every real-world application! " +
              "In my classroom at Coder & AccoTax in Barrackpore, I share two golden rules with my students: " +
              "First, never use `CONCAT()` for combining customer names or addresses—one missing middle name will poison the whole string to NULL. Always use `CONCAT_WS()`. " +
              "Second, in West Bengal and across India, your database will store Bengali ('কলকাতা'), Hindi, and emojis. " +
              "If you use `LENGTH()`, a 6-letter Bengali word will report 18 bytes because UTF-8 consumes 3 bytes per letter! " +
              "Always use `CHAR_LENGTH()` when validating form input length limits for users!"
            }
          />
        </section>

        {/* ─── Footer ───────────────────────────────────────────── */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <span>
            Topic 1 · String Functions · Module 002_006 · Segment 2 · RDBMS MySQL Course · Coder & AccoTax Barrackpore
          </span>
        </div>
      </div>
    </>
  );
};

export default Topic1;
