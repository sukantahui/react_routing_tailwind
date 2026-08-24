import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import pathlibFundamentalsCode from "./topic1_files/pathlib_object_oriented_path_fundamentals.py?raw";
import pathlibIoCode from "./topic1_files/pathlib_filesystem_io_and_methods.py?raw";
import globbingCode from "./topic1_files/pathlib_globbing_and_pattern_matching.py?raw";
import vaultManagerCode from "./topic1_files/institutional_pathlib_document_vault_manager.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Modern path manipulation with pathlib.Path
 * Module: 004_001_filesystem-os
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("anatomy");

  // Interactive Laboratory State
  const [campus, setCampus] = useState("barrackpore");
  const [batch, setBatch] = useState("py-ai-2026");
  const [studentId, setStudentId] = useState("STU_101_Sourav_Mukherjee");
  const [ext, setExt] = useState(".kyc.pdf");
  const [activeAction, setActiveAction] = useState("DECOMPOSE"); // DECOMPOSE | WITH_SUFFIX | WRITE_READ | RGLOB

  // Dynamic Path Construction
  const basePathStr = `accotax_vault/${campus}/${batch}/${studentId}${ext}`;
  const filename = `${studentId}${ext}`;
  const lastDotIndex = filename.lastIndexOf(".");
  const stem = lastDotIndex !== -1 ? filename.substring(0, lastDotIndex) : filename;
  const suffix = lastDotIndex !== -1 ? filename.substring(lastDotIndex) : "";
  const suffixes = filename.split(".").slice(1).map((s) => `.${s}`);
  const parentPath = `accotax_vault/${campus}/${batch}`;
  const grandParentPath = `accotax_vault/${campus}`;

  let generatedPythonCode = "";
  let pathInspectorOutput = {};

  if (activeAction === "DECOMPOSE") {
    generatedPythonCode = `# Decompose path object properties:
p = Path("${basePathStr}")
print(p.name)     # '${filename}'
print(p.stem)     # '${stem}'
print(p.suffix)   # '${suffix}'
print(p.suffixes) # ${JSON.stringify(suffixes)}
print(p.parent)   # Path('${parentPath}')`;

    pathInspectorOutput = {
      "Path Object": `Path("${basePathStr}")`,
      ".name": filename,
      ".stem": stem,
      ".suffix": suffix,
      ".suffixes": suffixes,
      ".parent": parentPath,
      ".parents[1]": grandParentPath,
    };
  } else if (activeAction === "WITH_SUFFIX") {
    const transformed = `${studentId}.bak.pdf`;
    generatedPythonCode = `# Pure Copy-on-Write extension replacement:
p = Path("${basePathStr}")
backup_path = p.with_suffix(".bak.pdf")
print("New Filename:", backup_path.name)`;

    pathInspectorOutput = {
      "Original Path": basePathStr,
      "Transformed Path": `accotax_vault/${campus}/${batch}/${transformed}`,
      "Transformed .name": transformed,
      "Transformed .suffix": ".pdf",
    };
  } else if (activeAction === "WRITE_READ") {
    generatedPythonCode = `# Concise one-liner file I/O:
target_file = Path("${basePathStr}").with_suffix(".json")
target_file.parent.mkdir(parents=True, exist_ok=True)
target_file.write_text('{"status": "CLEARED"}', encoding="utf-8")
content = target_file.read_text(encoding="utf-8")`;

    pathInspectorOutput = {
      "File Path": `${parentPath}/${studentId}.json`,
      "Directory Created": `${parentPath} (mkdir parents=True, exist_ok=True)`,
      "Written Content": '{"status": "CLEARED"}',
      "Encoding": "utf-8",
    };
  } else {
    // RGLOB
    generatedPythonCode = `# Recursive search with .rglob():
vault = Path("accotax_vault")
all_pdfs = list(vault.rglob("*.pdf"))
for pdf in all_pdfs:
    print(pdf.relative_to(vault))`;

    pathInspectorOutput = {
      "Search Root": "Path('accotax_vault')",
      "Search Pattern": "vault.rglob('*.pdf')",
      "Matches Found": [
        `${campus}/${batch}/${studentId}${ext}`,
        `${campus}/${batch}/marksheet.pdf`,
        `kolkata/ds-ml-2026/STU_102_Priyanka.pdf`,
      ],
    };
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowTeal {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.8)); }
        }
        .animate-glow-teal {
          animation: pulseGlowTeal 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-800/80 shadow-sm shadow-teal-950/50">
            Segment 4 • Module 004_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced File Operations, OS &amp; Subprocess Automation
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Modern Path Manipulation with <span className="text-teal-400">pathlib.Path</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's modern object-oriented filesystem standard: cross-platform path joining with the slash <code className="text-teal-300 font-mono">/</code> operator, path anatomy (<code className="text-cyan-300 font-mono">.stem</code>, <code className="text-cyan-300 font-mono">.suffix</code>, <code className="text-cyan-300 font-mono">.parent</code>), concise one-liner file I/O (<code className="text-purple-300 font-mono">read_text</code>, <code className="text-purple-300 font-mono">write_text</code>), and recursive glob pattern matching with <code className="text-amber-300 font-mono">rglob()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ✂️ Slash `/` Operator
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧬 `.stem` vs `.suffix`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📝 One-Liner `read_text()`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔍 Recursive `rglob()`
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: PATHLIB PHILOSOPHY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧭</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Object-Oriented Path Paradigm
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In modern Python, filesystem paths are treated as first-class objects rather than raw strings:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Slash Operator</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">base / "sub" / "file.txt"</code>
                <p className="text-[11px] text-slate-300">
                  Joins paths automatically using native OS separators with zero string concatenation bugs.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Path Anatomy</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">.name, .stem, .suffix</code>
                <p className="text-[11px] text-slate-300">
                  Extracts extensions, base names, and parent directories directly as properties.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Concise File I/O</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">path.read_text("utf-8")</code>
                <p className="text-[11px] text-slate-300">
                  Reads and writes file content in a single call without verbose <code className="text-purple-300">with open()</code> boilerplate.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Explicit Encoding Invariant
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Always pass <code className="text-teal-300 font-mono">encoding="utf-8"</code> to <code className="text-cyan-300 font-mono">path.read_text()</code> and <code className="text-cyan-300 font-mono">path.write_text()</code>! On Windows, Python defaults to <code className="text-rose-400 font-mono">cp1252</code>, which raises <code className="text-rose-400 font-mono">UnicodeDecodeError</code> on international characters.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📐</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Path Anatomy, Slash Operator &amp; Recursive Glob
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("anatomy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "anatomy"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Path Anatomy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("slashOp")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "slashOp"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Slash `/` Joining
              </button>
              <button
                onClick={() => setActiveInteractiveTab("rglobScan")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "rglobScan"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Recursive `rglob()`
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining object-oriented path properties, cross-platform path composition, and recursive tree searches:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "anatomy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">PATHLIB.PATH OBJECT ANATOMY BREAKDOWN</text>

                {/* Path String Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="60" rx="6" fill="#090d16" stroke="#14b8a6" />
                  <text x="20" y="35" fill="#38bdf8" fontSize="14 font-mono">/var/accotax/vault/students/STU_101_Sourav.kyc.pdf</text>
                </g>

                {/* Decomposed Components */}
                <g transform="translate(30, 130)">
                  {/* .parent */}
                  <rect x="0" y="0" width="250" height="150" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. `.parent`</text>
                  <text x="15" y="60" fill="#cbd5e1" fontSize="8 font-mono">`/var/accotax/vault/students`</text>
                  <text x="15" y="85" fill="#38bdf8" fontSize="8 font-mono">`.parents[0]` = students</text>
                  <text x="15" y="105" fill="#38bdf8" fontSize="8 font-mono">`.parents[1]` = vault</text>

                  {/* .stem */}
                  <rect x="280" y="0" width="250" height="150" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="295" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. `.stem`</text>
                  <text x="295" y="60" fill="#34d399" fontSize="9 font-mono font-bold">`STU_101_Sourav.kyc`</text>
                  <text x="295" y="85" fill="#cbd5e1" fontSize="8">Base name without the</text>
                  <text x="295" y="105" fill="#cbd5e1" fontSize="8">final extension string.</text>

                  {/* .suffix & .suffixes */}
                  <rect x="560" y="0" width="260" height="150" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="575" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. `.suffix` &amp; `.suffixes`</text>
                  <text x="575" y="60" fill="#c084fc" fontSize="9 font-mono font-bold">`.suffix`   : `.pdf`</text>
                  <text x="575" y="85" fill="#c084fc" fontSize="9 font-mono font-bold">`.suffixes` : `['.kyc', '.pdf']`</text>
                  <text x="575" y="110" fill="#cbd5e1" fontSize="8">Full multi-extension list.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "slashOp" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">SLASH `/` OPERATOR VS STRING CONCATENATION</text>

                {/* Left: String Concat */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">String Concatenation (Anti-Pattern)</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">`path = dir + "\\" + file`</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">❌ Hardcodes Windows backslash</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Crashes on Linux/Docker containers</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Brittle &amp; Non-Portable:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Requires manual delimiter checking and string escaping.</text>
                </g>

                {/* Right: Pathlib / */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">`pathlib.Path` Slash `/` Operator (Standard)</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">`path = Path.cwd() / "vault" / "data.csv"`</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">✅ Resolves native OS delimiter automatically</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">100% Cross-Platform Compatible</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Universal Portability:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Works seamlessly across Windows, Linux, macOS, and AWS.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">SHALLOW `glob()` VS RECURSIVE `rglob()` DIRECTORY TRAVERSAL</text>

                {/* Left: Shallow glob */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">Shallow `path.glob("*.pdf")`</text>
                  
                  <text x="20" y="65" fill="#cbd5e1" fontSize="8 font-mono">Scans ONLY the immediate root directory.</text>
                  <text x="20" y="85" fill="#38bdf8" fontSize="8 font-mono">vault/root_doc.pdf -&gt; MATCHED</text>
                  <text x="20" y="105" fill="#fca5a5" fontSize="8 font-mono">vault/2026/q1/nested.pdf -&gt; SKIPPED</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="30" y="155" fill="#38bdf8" fontSize="9 font-bold">Single-Level Scope:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Does not descend into nested child subfolders.</text>
                </g>

                {/* Right: Recursive rglob */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Recursive `path.rglob("*.pdf")`</text>

                  <text x="20" y="65" fill="#cbd5e1" fontSize="8 font-mono">Recursively traverses entire folder tree.</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">vault/root_doc.pdf -&gt; MATCHED</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">vault/2026/q1/nested.pdf -&gt; MATCHED</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="155" fill="#c4b5fd" fontSize="9 font-bold">Deep Recursive Search:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Yields Path objects from all arbitrary depth subdirectories.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE PATHLAB LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Digital Document Vault &amp; Path Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure campus dossiers, toggle extensions, select pathlib operations, and inspect live path decomposition structures:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Action Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Select Pathlib Action Trigger:
                </span>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: "DECOMPOSE", label: "1. Decompose Path" },
                    { id: "WITH_SUFFIX", label: "2. with_suffix()" },
                    { id: "WRITE_READ", label: "3. write_text() / read" },
                    { id: "RGLOB", label: "4. rglob('*.pdf')" },
                  ].map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setActiveAction(a.id)}
                      className={clsx(
                        "py-1.5 rounded transition-all",
                        activeAction === a.id
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campus Selector */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. Campus Node:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {["barrackpore", "kolkata"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCampus(c)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all capitalize",
                        campus === c
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {c} Campus
                    </button>
                  ))}
                </div>
              </div>

              {/* Extension Selector */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  3. Extension &amp; Dossier Type:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[".kyc.pdf", ".json", ".csv", ".tar.gz"].map((e) => (
                    <button
                      key={e}
                      onClick={() => setExt(e)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        ext === e
                          ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Path Box */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Active Path Object:</div>
                <div className="text-teal-300 text-[11px] break-all font-bold">
                  Path("{basePathStr}")
                </div>
              </div>
            </div>

            {/* Code Generator & Object Inspector */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python Pathlib Code:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonCode}
                </pre>
              </div>

              {/* Path Decomposition Inspector */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Path Object Inspection:</span>
                  <span className="text-emerald-400">Pure Instance</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed font-mono">
                  {JSON.stringify(pathInspectorOutput, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER PATHLIB MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master `pathlib.Path` Method Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Pathlib Method / Property</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Return Type</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`p.with_suffix(new_ext)`</td>
                  <td className="py-3 px-4 text-slate-200">Transformation</td>
                  <td className="py-3 px-4 text-emerald-400">`Path`</td>
                  <td className="py-3 px-4">Changing file extension safely</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`p.read_text(encoding)`</td>
                  <td className="py-3 px-4 text-slate-200">File I/O</td>
                  <td className="py-3 px-4 text-cyan-300">`str`</td>
                  <td className="py-3 px-4">One-liner text reading without `with open()`</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`p.mkdir(parents, exist_ok)`</td>
                  <td className="py-3 px-4 text-slate-200">Directory CRUD</td>
                  <td className="py-3 px-4 text-purple-300">`None`</td>
                  <td className="py-3 px-4">Idempotent recursive folder tree creation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`p.rglob(pattern)`</td>
                  <td className="py-3 px-4 text-slate-200">Search</td>
                  <td className="py-3 px-4 text-emerald-400">`Iterator[Path]`</td>
                  <td className="py-3 px-4">Deep recursive pattern file searching</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating pathlib fundamentals, file I/O, globbing/pattern search, and institutional digital document vaults:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "pathlib_object_oriented_path_fundamentals.py",
                code: pathlibFundamentalsCode,
                description: "Path instantiation, the slash operator, and path decomposition.",
              },
              {
                filename: "pathlib_filesystem_io_and_methods.py",
                code: pathlibIoCode,
                description: "path.read_text, path.write_text, mkdir, and unlink.",
              },
              {
                filename: "pathlib_globbing_and_pattern_matching.py",
                code: globbingCode,
                description: "iterdir, glob, rglob, and relative_to.",
              },
              {
                filename: "institutional_pathlib_document_vault_manager.py",
                code: vaultManagerCode,
                description: "Digital document vault management, student dossier directories, and rglob audits.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Omission of `encoding="utf-8"`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">p.read_text()</code> without encoding defaults to Windows <code className="text-rose-300">cp1252</code>, causing <code className="text-slate-300">UnicodeDecodeError</code> on international data.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always pass <code className="text-emerald-300">encoding="utf-8"</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: String Concatenation on Path Objects
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">p + "/file.txt"</code> fails with <code className="text-slate-300 font-mono">TypeError: unsupported operand type for +: 'WindowsPath' and 'str'</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use the slash operator: <code className="text-emerald-300">p / "file.txt"</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Missing `parents=True` in `mkdir()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-purple-300 font-mono">p.mkdir()</code> on a multi-level path raises <code className="text-slate-300 font-mono">FileNotFoundError</code> if parent folders do not exist.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Specify <code className="text-emerald-300">p.mkdir(parents=True, exist_ok=True)</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Non-Idempotent `unlink()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-cyan-300 font-mono">p.unlink()</code> raises <code className="text-slate-300 font-mono">FileNotFoundError</code> if the target file has already been deleted.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Pass <code className="text-emerald-300">p.unlink(missing_ok=True)</code>.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering pathlib.Path, slash operator, stem vs suffix, read_text, mkdir, and rglob:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with pathlib anatomy rules, slash operator recipes, and digital vault templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic1_pathlib_modern_paths_notes.txt"
              title="Print Topic 1 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
