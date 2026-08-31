"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_002_data_entry_editing_and_formatting_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic4() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "001_002_data_entry_editing_and_formatting_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Scoped CSS Keyframes */}
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); opacity: 0.99; }
          to { transform: translateY(0); opacity: 1; }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 space-y-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span>✏️</span> Module 1.2 · Topic 4
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold font-mono">
              Level: Essential Grid Operations
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-300 text-xs font-semibold font-mono">
              Excel 2016 – 365
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Editing Cell Contents: F2, Formula Bar, Find &amp; Replace, Clear, Undo/Redo and Paste Special Fundamentals
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Efficient cell content editing separates novice spreadsheet users from elite financial modeling professionals. Master the precise mechanical differences between overwriting and in-cell editing (`F2`), formula bar expansion (`Ctrl + Shift + U`), powerful Find &amp; Replace wildcard operations (`Ctrl + H`), nuclear clear options vs Delete, atomic Undo/Redo session control, and the game-changing Paste Special toolset (`Ctrl + Alt + V`).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
              <span className="font-bold text-sky-400">In-Cell Precision (F2)</span>
              <p className="text-slate-400">Press `F2` to enter EDIT mode directly without destroying existing formulas or text strings.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
              <span className="font-bold text-emerald-400">Paste Special Mastery</span>
              <p className="text-slate-400">Freeze formulas into values (`Alt+E+S+V`), transpose matrices (`E`), and execute in-place math operations.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
              <span className="font-bold text-amber-400">Wildcard Engine</span>
              <p className="text-slate-400">Leverage `?` (single char) and `*` (multi char) in Find &amp; Replace with tilde (`~`) escape syntax.</p>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">⚡</span> Cell Editing &amp; Paste Special Command Arsenal
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
              Command Palette Prototype
            </span>
          </div>

          {/* Prototype Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto">
            <span className="text-amber-400">[F2 In-Cell Edit]</span> + <span className="text-rose-400">[Ctrl+Alt+V Paste Special]</span> + <span className="text-emerald-400">[Alt+H+E Clear Menu]</span> + <span className="text-purple-400">[Ctrl+H Find/Replace]</span>
          </div>

          {/* Commands Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-4">Accelerator Key</th>
                  <th className="py-3 px-4">Operation Mode</th>
                  <th className="py-3 px-4">Mechanical Action &amp; Behavior</th>
                  <th className="py-3 px-4">Primary Workplace Use-Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-400 font-bold">F2</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">In-Cell Edit Mode</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Shifts status bar from READY to EDIT, placing text cursor inside cell without overwriting.</td>
                  <td className="py-3 px-4 text-amber-300">Modifying complex cell formulas without re-typing.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-400 font-bold">Ctrl + Shift + U</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Formula Bar Expand/Collapse</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Toggles height of the top Formula Bar between single line and expanded multi-line view.</td>
                  <td className="py-3 px-4 text-amber-300">Inspecting 5-level nested `IF` or `XLOOKUP` formulas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-400 font-bold">Ctrl + Alt + V (Alt+E+S)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Paste Special Dialog</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Opens options to paste Values (`V`), Formats (`T`), Formulas (`F`), Widths (`W`), or Transpose (`E`).</td>
                  <td className="py-3 px-4 text-amber-300">Freezing dynamic formulas into permanent raw values.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-400 font-bold">Ctrl + H</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Find &amp; Replace Window</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Searches text/formula strings with wildcard support (`?` = 1 char, `*` = multi char, `~` = escape).</td>
                  <td className="py-3 px-4 text-amber-300">Replacing old branch codes across 10,000 grid cells.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-400 font-bold">Alt + H + E + A</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Clear All Operations</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Nuclear clear: completely strips values, formatting, custom masks, comments, and hyperlinks.</td>
                  <td className="py-3 px-4 text-amber-300">Sanitizing dirty template sheets back to raw empty grid.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-400 font-bold">F4 (or Ctrl + Y)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Repeat Last Action / Redo</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Repeats the exact previous edit, format, or row insertion command on newly selected cells.</td>
                  <td className="py-3 px-4 text-amber-300">Rapidly applying highlight fills across disparate rows.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🔬</span> Conceptual &amp; Calculation Mechanics
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              When working in Microsoft Excel, understanding cell state transitions prevents accidental data corruption. The spreadsheet engine operates under three primary user modes: **READY** (selecting cells), **ENTER** (typing new content over selected cell), and **EDIT** (manipulating existing character strings inside the cell via `F2` or double-click).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
                  <span>1️⃣</span> Overwrite vs In-Cell Edit (F2)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Selecting cell `B4` and typing directly overwrites the entire contents of `B4`. Pressing `F2` enters **EDIT** mode, placing the cursor at the end of the existing formula string so you can fix a single parameter without destroying 50 characters of verified logic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <span>2️⃣</span> Paste Special Operations Pipeline
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Standard copy/paste (`Ctrl+C` / `Ctrl+V`) transfers values, formulas, background colors, borders, and conditional formatting rules indiscriminately. Paste Special (`Ctrl+Alt+V`) uncouples payload layers—allowing you to paste **Values only** (`V`), **Column Widths only** (`W`), or perform **In-Place Math Operations** (Multiply by GST `1.18` via `M`).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">📐</span> Visual Cell Editing &amp; Paste Special Workflow Pipeline
          </h2>

          <div className="p-4 sm:p-6 rounded-xl bg-slate-950 border border-slate-800 flex justify-center overflow-x-auto">
            <svg className="w-full max-w-2xl text-slate-200" viewBox="0 0 700 280" fill="none">
              {/* Background Cards */}
              <rect x="20" y="20" width="180" height="220" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
              <rect x="260" y="20" width="180" height="220" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
              <rect x="500" y="20" width="180" height="220" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />

              {/* Box Titles */}
              <text x="110" y="50" textAnchor="middle" fill="#38BDF8" fontSize="13" fontWeight="bold">Source Formula Cell</text>
              <text x="350" y="50" textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="bold">Paste Special Engine</text>
              <text x="590" y="50" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="bold">Target Grid Output</text>

              {/* Source Details */}
              <text x="110" y="95" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontFamily="monospace">Formula: =SUM(D4:D33)</text>
              <text x="110" y="125" textAnchor="middle" fill="#38BDF8" fontSize="11" fontFamily="monospace">Result: ₹ 4,85,000</text>
              <text x="110" y="155" textAnchor="middle" fill="#FCD34D" fontSize="10">Fill: Dark Blue (#0F172A)</text>
              <text x="110" y="185" textAnchor="middle" fill="#C084FC" fontSize="10">Width: 26px Generous</text>

              {/* Connectors 1 */}
              <path d="M200 95 L260 95" stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrow)" />
              <path d="M200 125 L260 135" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrow)" />
              <path d="M200 185 L260 175" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Engine Modes */}
              <text x="350" y="95" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="monospace">Paste Formulas (F)</text>
              <text x="350" y="135" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="monospace">Paste Values (V)</text>
              <text x="350" y="175" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="monospace">Paste Widths (W)</text>
              <text x="350" y="215" textAnchor="middle" fill="#C084FC" fontSize="10" fontFamily="monospace">Transpose (E)</text>

              {/* Connectors 2 */}
              <path d="M440 95 L500 95" stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrow)" />
              <path d="M440 135 L500 135" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrow)" />
              <path d="M440 175 L500 175" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Target Details */}
              <text x="590" y="95" textAnchor="middle" fill="#38BDF8" fontSize="11" fontFamily="monospace">Logic Transferred</text>
              <text x="590" y="135" textAnchor="middle" fill="#4ADE80" fontSize="11" fontWeight="bold">Static Value: 485000</text>
              <text x="590" y="175" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="monospace">Column Width = 26px</text>
              <text x="590" y="215" textAnchor="middle" fill="#C084FC" fontSize="11" fontFamily="monospace">Row $\leftrightarrow$ Column Swapped</text>

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
                </marker>
              </defs>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore Topic 4 worksheet tab live in the browser or download the full master workbook to practice in Microsoft Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download full .xlsx master workbook for Module 1.2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileUrl={sampleWorkbookUrl}
            sheetName="Topic4"
            title="Module 1.2 - Topic 4: Editing Cell Contents: F2, Formula Bar, Find & Replace, Clear, Undo/Redo and Paste Special Fundamentals"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS (20 EXAMPLES TABLE)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                20 Real-World Business Scenarios: Cell Content Editing &amp; Paste Special
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                20 practical workplace scenarios detailing F2 in-cell editing, Find &amp; Replace wildcards, Paste Special Values, and Clear operations.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-full border border-amber-800 shrink-0 font-bold">
              20 Real-World Examples
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-3 w-16">ID</th>
                  <th className="py-3 px-3">Business Application</th>
                  <th className="py-3 px-3">Target Cell Operation</th>
                  <th className="py-3 px-3">Applied Editing Accelerator</th>
                  <th className="py-3 px-3">Resulting Grid State</th>
                  <th className="py-3 px-3">Key Design &amp; Productivity Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-101</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Barrackpore Payroll Formula Correction</td>
                  <td className="py-2.5 px-3 text-sky-300">Modify `=SUM(E4:E30)` to `=SUM(E4:E33)`</td>
                  <td className="py-2.5 px-3 text-amber-300">Press `F2` → Edit in-cell</td>
                  <td className="py-2.5 px-3 text-emerald-400">Formula updated without re-typing</td>
                  <td className="py-2.5 px-3 text-slate-300">Prevents complete formula deletion caused by direct overwrite typing.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-102</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Kolkata Corporate Financial Model Freeze</td>
                  <td className="py-2.5 px-3 text-sky-300">Convert live P&amp;L model to static report</td>
                  <td className="py-2.5 px-3 text-amber-300">`Ctrl+C` → `Alt+E+S+V` (Values)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Formulas replaced with raw constants</td>
                  <td className="py-2.5 px-3 text-slate-300">Freezes dynamic calculation model before emailing external board members.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-103</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Shyamnagar Retail Branch Code Migration</td>
                  <td className="py-2.5 px-3 text-sky-300">Replace legacy `SHY-` with `KOL-` across 5,000 rows</td>
                  <td className="py-2.5 px-3 text-amber-300">`Ctrl+H` (Replace All)</td>
                  <td className="py-2.5 px-3 text-emerald-400">5,000 cells updated in 0.2s</td>
                  <td className="py-2.5 px-3 text-slate-300">Automates bulk string replacements across massive datasets.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-104</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Ichapur Plant GST In-Place Calculation</td>
                  <td className="py-2.5 px-3 text-sky-300">Apply 18% GST multiplier directly onto prices</td>
                  <td className="py-2.5 px-3 text-amber-300">Copy `1.18` → `Alt+E+S+M` (Multiply)</td>
                  <td className="py-2.5 px-3 text-emerald-400">All prices scaled up by 18% in-place</td>
                  <td className="py-2.5 px-3 text-slate-300">Eliminates helper columns by performing arithmetic directly via Paste Special.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-105</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Salt Lake SaaS Monthly Transposition</td>
                  <td className="py-2.5 px-3 text-sky-300">Rotate 12 horizontal month columns into vertical rows</td>
                  <td className="py-2.5 px-3 text-amber-300">`Ctrl+C` → `Alt+E+S+E` (Transpose)</td>
                  <td className="py-2.5 px-3 text-emerald-400">12x1 horizontal → 1x12 vertical</td>
                  <td className="py-2.5 px-3 text-slate-300">Restructures legacy horizontal wide reports into database-ready vertical tables.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-106</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Naihati Campus Multi-Row Header Fill</td>
                  <td className="py-2.5 px-3 text-sky-300">Fill '2026 Audit' header across 15 highlighted cells</td>
                  <td className="py-2.5 px-3 text-amber-300">Type text → `Ctrl+Enter`</td>
                  <td className="py-2.5 px-3 text-emerald-400">All 15 cells populated instantly</td>
                  <td className="py-2.5 px-3 text-slate-300">Atomic fill across non-contiguous multi-cell selections.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-107</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Titagarh Logistics Sanitization</td>
                  <td className="py-2.5 px-3 text-sky-300">Strip dirty background fills &amp; borders from template</td>
                  <td className="py-2.5 px-3 text-amber-300">`Alt+H+E+F` (Clear Formats)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Formats removed, raw data intact</td>
                  <td className="py-2.5 px-3 text-slate-300">Clears bad formatting without deleting underlying transactional data.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-108</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Howrah Freight Long Formula Inspection</td>
                  <td className="py-2.5 px-3 text-sky-300">Inspect 4-line nested `XLOOKUP` formula</td>
                  <td className="py-2.5 px-3 text-amber-300">`Ctrl+Shift+U` (Expand Formula Bar)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Formula Bar expanded 4 lines tall</td>
                  <td className="py-2.5 px-3 text-slate-300">Prevents formula truncation while debugging complex logic.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-109</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Durgapur Steel Table Width Sync</td>
                  <td className="py-2.5 px-3 text-sky-300">Copy column widths from Sheet 1 to Sheet 2</td>
                  <td className="py-2.5 px-3 text-amber-300">`Ctrl+C` → `Alt+E+S+W` (Widths)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Column widths matched perfectly</td>
                  <td className="py-2.5 px-3 text-slate-300">Ensures uniform visual layout across multiple report tabs.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-110</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Asansol Energy Grid Wildcard Cleanup</td>
                  <td className="py-2.5 px-3 text-sky-300">Replace all product codes starting with 'TR-1'</td>
                  <td className="py-2.5 px-3 text-amber-300">Find: `TR-1*` → Replace: `NEW-TR`</td>
                  <td className="py-2.5 px-3 text-emerald-400">All matching prefixes replaced</td>
                  <td className="py-2.5 px-3 text-slate-300">Leverages asterisk `*` wildcard for prefix matching.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-111</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Siliguri Tea Partial Update Merge</td>
                  <td className="py-2.5 px-3 text-sky-300">Paste revised prices into list without overwriting blanks</td>
                  <td className="py-2.5 px-3 text-amber-300">`Ctrl+Alt+V` → Check 'Skip Blanks'</td>
                  <td className="py-2.5 px-3 text-emerald-400">Existing non-blank prices preserved</td>
                  <td className="py-2.5 px-3 text-slate-300">Prevents empty source cells from erasing destination data.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-112</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Haldia Dock Nuclear Sheet Reset</td>
                  <td className="py-2.5 px-3 text-sky-300">Wipe legacy corrupted report template completely</td>
                  <td className="py-2.5 px-3 text-amber-300">`Alt+H+E+A` (Clear All)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Values, formats &amp; links wiped 100%</td>
                  <td className="py-2.5 px-3 text-slate-300">Completely resets grid area back to pristine default state.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-113</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Malda Mango Multi-Line Cell Entry</td>
                  <td className="py-2.5 px-3 text-sky-300">Insert line break between Address Line 1 and Line 2</td>
                  <td className="py-2.5 px-3 text-amber-300">Type Line 1 → `Alt+Enter` → Line 2</td>
                  <td className="py-2.5 px-3 text-emerald-400">Multi-line text inside single cell</td>
                  <td className="py-2.5 px-3 text-slate-300">Formats multi-line address blocks without creating separate rows.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-114</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Burdwan Rice Repeat Formatting</td>
                  <td className="py-2.5 px-3 text-sky-300">Apply yellow fill to 10 scattered subtotal rows</td>
                  <td className="py-2.5 px-3 text-amber-300">Format Row 1 → Select Row 2 → Press `F4`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Yellow fill repeated instantly</td>
                  <td className="py-2.5 px-3 text-slate-300">Uses Redo / Repeat Action `F4` to accelerate repetitive styling.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-115</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Hooghly Jute Formula Copy Down</td>
                  <td className="py-2.5 px-3 text-sky-300">Copy upper cell formula to active cell below</td>
                  <td className="py-2.5 px-3 text-amber-300">`Ctrl+D` (Fill Down)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Upper cell copied instantly</td>
                  <td className="py-2.5 px-3 text-slate-300">Copies value, formula, and formatting from cell above in one keystroke.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-116</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Midnapore Hospital Literal Asterisk Find</td>
                  <td className="py-2.5 px-3 text-sky-300">Find literal asterisk characters `*` in medical codes</td>
                  <td className="py-2.5 px-3 text-amber-300">Find: `~*`</td>
                  <td className="py-2.5 px-3 text-emerald-400">Only literal `*` matched</td>
                  <td className="py-2.5 px-3 text-slate-300">Uses tilde `~` escape prefix to disable wildcard matching.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-117</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Bankura Craft Undo Session Rollback</td>
                  <td className="py-2.5 px-3 text-sky-300">Rollback accidental deletion of revenue column</td>
                  <td className="py-2.5 px-3 text-amber-300">`Ctrl+Z` (Undo)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Deleted column restored instantly</td>
                  <td className="py-2.5 px-3 text-slate-300">Restores previous spreadsheet state after accidental grid deletion.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-118</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Purulia Solar Pump Formula Only Copy</td>
                  <td className="py-2.5 px-3 text-sky-300">Copy calculation logic without overwriting custom styles</td>
                  <td className="py-2.5 px-3 text-amber-300">`Ctrl+C` → `Alt+E+S+F` (Formulas)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Formula copied, styles preserved</td>
                  <td className="py-2.5 px-3 text-slate-300">Transfers mathematical logic while preserving custom destination cell borders.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-119</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Darjeeling Hotel Fill Right Accelerator</td>
                  <td className="py-2.5 px-3 text-sky-300">Copy left cell occupancy rate formula to right neighbor</td>
                  <td className="py-2.5 px-3 text-amber-300">`Ctrl+R` (Fill Right)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Left cell copied rightward</td>
                  <td className="py-2.5 px-3 text-slate-300">Copies formula and formatting from adjacent left cell instantly.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-amber-400 font-bold">ED-120</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">Cooch Behar Bank Target Value Adjustment</td>
                  <td className="py-2.5 px-3 text-sky-300">Subtract ₹ 5,000 processing fee from all loans in-place</td>
                  <td className="py-2.5 px-3 text-amber-300">Copy `5000` → `Alt+E+S+S` (Subtract)</td>
                  <td className="py-2.5 px-3 text-emerald-400">All loan values reduced by ₹ 5,000</td>
                  <td className="py-2.5 px-3 text-slate-300">Executes atomic in-place subtraction across loan portfolio without helper formulas.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP PRACTICAL CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-sky-400">📝</span> Step-by-Step Practical Cell Editing &amp; Paste Special Walkthrough
          </h2>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold font-sans">Step 1: Select Target Formula Range &amp; Copy</span>
              <p className="text-slate-300 font-sans">
                Highlight range `E4:E33` on sheet **Topic4**, then press <kbd className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">Ctrl + C</kbd> to copy cell contents to clipboard.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold font-sans">Step 2: Launch Paste Special Dialog</span>
              <p className="text-slate-300 font-sans">
                Right-click target cell `F4` or press <kbd className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">Ctrl + Alt + V</kbd> (or <kbd className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">Alt + E + S</kbd>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold font-sans">Step 3: Select Values Option (`V`)</span>
              <p className="text-slate-300 font-sans">
                Press <kbd className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">V</kbd> to select **Values**, then press **Enter**.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold font-sans">Step 4: Verify Memory Freeze</span>
              <p className="text-slate-300 font-sans">
                Inspect cell `F4` in the Formula Bar. Confirm that the dynamic `=PRACTICE_FORMULA()` string has been frozen into a static constant raw number.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-rose-400">⚠️</span> Common Pitfalls &amp; Troubleshooting Matrix
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-4">Symptom / Error</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification Method</th>
                  <th className="py-3 px-4">Foolproof Fix / Remediation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-400 font-bold">Entire long formula deleted</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">User started typing directly on selected cell without pressing `F2` first.</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Formula bar clears completely upon first keystroke.</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Press `Esc` immediately to discard edit, then press `F2` to enter Edit Mode.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-400 font-bold">Find &amp; Replace updated wrong text</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Wildcard `*` matched unexpected long text fragment.</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Check if 'Match entire cell contents' was unchecked.</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Press `Ctrl + Z` to undo, then enable 'Match entire cell contents' or use `~` escape.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-400 font-bold">Paste Transpose returned `#REF!`</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Source formulas contained relative cell references that broke upon rotation.</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Inspect formula bar after transposing.</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Paste Special Values (`Alt+E+S+V`) first, then Transpose the static values.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-400 font-bold">`Delete` key failed to clear colors</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">`Delete` clears only cell values/formulas (Clear Contents).</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Cell background color remains yellow after pressing Delete.</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Use `Alt + H + E + A` (Clear All) or `Alt + H + E + F` (Clear Formats).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS (HOTKEYS MATRIX)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">💡</span> Pro Tips &amp; Master Hotkeys Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Classroom-tested keyboard accelerators and speed hacks for cell editing and Paste Special.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-full border border-amber-800 shrink-0 font-bold">
              Keyboard Accelerators
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold font-sans flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">F2</kbd>
              </span>
              <p className="text-slate-300 font-sans text-xs">Activates in-cell EDIT mode at cursor tail.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold font-sans flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">Ctrl + Alt + V</kbd>
              </span>
              <p className="text-slate-300 font-sans text-xs">Opens Paste Special dialog menu.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold font-sans flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">Alt + E + S + V</kbd>
              </span>
              <p className="text-slate-300 font-sans text-xs">Legacy accelerator to Paste Values instantly.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold font-sans flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-slate-700">Alt + E + S + E</kbd>
              </span>
              <p className="text-slate-300 font-sans text-xs">Pastes Transpose to swap rows and columns.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold font-sans flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">Ctrl + Shift + U</kbd>
              </span>
              <p className="text-slate-300 font-sans text-xs">Expands or collapses top Formula Bar height.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold font-sans flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-rose-300 border border-slate-700">Alt + H + E + A</kbd>
              </span>
              <p className="text-slate-300 font-sans text-xs">Executes Nuclear Clear All on highlighted cells.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC HINT SECTION ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-purple-400">🤔</span> Socratic Reflection: Think About...
          </h2>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
            <p>
              • **Reflect**: Why is pressing `F2` before editing a formula far safer than clicking into the formula bar with a mouse when dealing with complex cell ranges?
            </p>
            <p>
              • **Observe**: What happens if you try to Transpose a range containing live relative formulas (`=A1+B1`) without using Paste Values first?
            </p>
            <p>
              • **Experiment**: Try copying a cell with value `10` and using Paste Special → Multiply (`Alt + E + S + M`) over a range of numbers. Notice how every number is multiplied by 10 in-place without generating extra helper columns!
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS VIA FAQTEMPLATE)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[10] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <FAQTemplate
            title="Editing Cell Contents &amp; Paste Special FAQ"
            questions={questions}
          />
        </section>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE SECTION
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[11] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <Teacher
            topicName="Editing Cell Contents &amp; Paste Special Fundamentals"
            noteTitle="Sukanta Hui's Mentor Guide: Keyboard Mastery &amp; Data Hygiene"
            mentorAdvice="Always remember: Speed in Excel comes from keyboard muscle memory. Use F2 to edit formulas cleanly without accidental overwrites, use Ctrl+Alt+V to freeze formulas into values before sharing workbooks, and master Alt+H+E+A when clearing templates. True professionals rarely touch the mouse during routine grid editing!"
          />
        </section>
      </div>
    </div>
  );
}
