import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import docstringCode from "./topic3_files/pep257_docstrings_and_sphinx_formatting.py?raw";
import staticTypingCode from "./topic3_files/pep484_static_typing_and_mypy_annotations.py?raw";
import readmeGenCode from "./topic3_files/readme_generation_and_badges.py?raw";
import institutionalAuditCode from "./topic3_files/institutional_documentation_audit_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Writing complete documentation (README.md, docstrings, typing hints)
 * Module: 004_004_capstone-projects
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("docstringAnatomy");

  // Interactive Laboratory State
  const [docstringFormat, setDocstringFormat] = useState("GOOGLE"); // GOOGLE | NUMPY | SPHINX
  const [enableStrictMypy, setEnableStrictMypy] = useState(true);

  let docstringSnippet = "";
  if (docstringFormat === "GOOGLE") {
    docstringSnippet = `def calculate_waiver(base_fee: float, score: float) -> float:
    """Calculates final net tuition after applying institutional merit rules.

    Args:
        base_fee (float): Initial tuition fee in INR (must be > 0).
        score (float): Academic admission test score between 0.0 and 100.0.

    Returns:
        float: Net discounted tuition fee payable.

    Raises:
        ValueError: If base_fee <= 0 or score is outside [0.0, 100.0].

    Examples:
        >>> calculate_waiver(20000.0, 95.0)
        16000.0
    """`;
  } else if (docstringFormat === "NUMPY") {
    docstringSnippet = `def calculate_waiver(base_fee: float, score: float) -> float:
    """
    Calculates final net tuition after applying institutional merit rules.

    Parameters
    ----------
    base_fee : float
        Initial tuition fee in INR (must be > 0).
    score : float
        Academic admission test score between 0.0 and 100.0.

    Returns
    -------
    float
        Net discounted tuition fee payable.

    Raises
    ------
    ValueError
        If base_fee <= 0 or score is outside [0.0, 100.0].
    """`;
  } else {
    docstringSnippet = `def calculate_waiver(base_fee: float, score: float) -> float:
    """Calculates final net tuition after applying institutional merit rules.

    :param base_fee: Initial tuition fee in INR (must be > 0).
    :type base_fee: float
    :param score: Academic admission test score between 0.0 and 100.0.
    :type score: float
    :returns: Net discounted tuition fee payable.
    :rtype: float
    :raises ValueError: If base_fee <= 0 or score is outside [0.0, 100.0].
    """`;
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
            Segment 4 • Module 004_004
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Capstone Projects, Portfolio &amp; Interview Mastery
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Writing Complete Documentation: <span className="text-teal-400">README, Docstrings &amp; Types</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the art of self-documenting codebases and open-source documentation: writing PEP 257 Google-style docstrings, embedding executable doctests with <code className="text-teal-300 font-mono">doctest.testmod()</code>, annotating full PEP 484 / PEP 585 static types (<code className="text-cyan-300 font-mono">Protocol</code>, <code className="text-cyan-300 font-mono">TypeVar</code>, <code className="text-cyan-300 font-mono">TypedDict</code>), passing <code className="text-purple-300 font-mono">mypy --strict</code>, and crafting standout GitHub <code className="text-amber-300 font-mono">README.md</code> files.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📖 PEP 257 Google-Style Docstrings
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧪 Executable Doctests (doctest.testmod)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ PEP 484 / 585 Static Typing (Mypy)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌟 Shields.io Decorated README
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ARCHITECTURAL PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Professional Documentation &amp; Static Typing Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              High-caliber software engineers treat documentation and static typing contracts as first-class architectural assets alongside production algorithms:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ PEP 257 Docstrings</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">Google / Sphinx Style</code>
                <p className="text-[11px] text-slate-300">
                  Standardized sections (Args, Returns, Raises) parsed by IDE tooltips and automated HTML generators (Sphinx/MkDocs).
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Executable Doctests</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">&gt;&gt;&gt; calculate()</code>
                <p className="text-[11px] text-slate-300">
                  Interactive REPL examples embedded in docstrings that test themselves automatically during CI execution.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ PEP 484 / 585 Types</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">mypy --strict</code>
                <p className="text-[11px] text-slate-300">
                  Full static typing (Protocol, TypeVar, TypedDict, Self) catching type mismatches and None-access errors before runtime.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Standout README</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">Shields.io + Quickstart</code>
                <p className="text-[11px] text-slate-300">
                  Visual badges, copy-paste quickstart commands, and architectural mermaid diagrams establishing immediate repo credibility.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Diátaxis Documentation Framework
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Organize documentation into 4 distinct quadrants: <span className="text-teal-300 font-bold">Tutorials</span> (learning-oriented), <span className="text-cyan-300 font-bold">How-To Guides</span> (problem-oriented recipes), <span className="text-purple-300 font-bold">Reference</span> (technical API specifications), and <span className="text-amber-300 font-bold">Explanation</span> (conceptual architecture).
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
                2. Visualizing Docstring Anatomy, Static Typing &amp; Diátaxis Matrix
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("docstringAnatomy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "docstringAnatomy"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Google Docstring Anatomy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("staticTypes")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "staticTypes"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                PEP 484 Type System
              </button>
              <button
                onClick={() => setActiveInteractiveTab("diataxisMatrix")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "diataxisMatrix"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Diátaxis 4-Quadrant Matrix
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining docstring specification blocks, structural typing contracts, and documentation information architecture:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "docstringAnatomy" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  PEP 257 GOOGLE-STYLE DOCSTRING STRUCTURE &amp; DOCTEST BLOCKS
                </text>

                {/* Code Block Visualizer */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* Top Bar */}
                  <rect x="25" y="30" width="770" height="25" rx="4" fill="#042f2e" stroke="#0d9488" />
                  <text x="35" y="47" fill="#5eead4" fontSize="10" fontFamily="monospace">
                    def calculate_merit_scholarship(base_fee: float, academic_score: float) -&gt; float:
                  </text>

                  {/* Section 1: Summary */}
                  <rect x="35" y="65" width="750" height="30" rx="3" fill="#0c4a6e" />
                  <text x="45" y="84" fill="#e0f2fe" fontSize="9" fontFamily="monospace">
                    """1. One-Line Summary: Calculates discounted tuition fee based on merit scores.
                  </text>

                  {/* Section 2: Args */}
                  <rect x="35" y="100" width="750" height="38" rx="3" fill="#134e4a" />
                  <text x="45" y="115" fill="#a7f3d0" fontSize="9" fontFamily="monospace">
                    Args:
                  </text>
                  <text x="65" y="130" fill="#ccfbf1" fontSize="8" fontFamily="monospace">
                    base_fee (float): Tuition in INR (&gt; 0). | academic_score (float): Score in [0, 100].
                  </text>

                  {/* Section 3: Returns & Raises */}
                  <rect x="35" y="143" width="750" height="38" rx="3" fill="#1e1b4b" />
                  <text x="45" y="158" fill="#e0e7ff" fontSize="9" fontFamily="monospace">
                    Returns: float (Final net fee) | Raises: ValueError (Invalid score or fee)
                  </text>

                  {/* Section 4: Examples / Doctest */}
                  <rect x="35" y="186" width="750" height="38" rx="3" fill="#3b0764" />
                  <text x="45" y="200" fill="#f3e8ff" fontSize="9" fontFamily="monospace">
                    Examples: &gt;&gt;&gt; calculate_merit_scholarship(20000.0, 95.0)  ➔  16000.0 """
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "staticTypes" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  PEP 484 / PEP 585 STATIC TYPE SYSTEM IN MODERN PYTHON
                </text>

                {/* Type System Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Box 1: Generics */}
                  <rect x="25" y="35" width="180" height="180" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="35" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">1. Generics (TypeVar)</text>
                  <text x="35" y="85" fill="#e0f2fe" fontSize="8" fontFamily="monospace">T = TypeVar("T")</text>
                  <text x="35" y="105" fill="#e0f2fe" fontSize="8" fontFamily="monospace">class Repo(Generic[T]):</text>
                  <text x="45" y="125" fill="#e0f2fe" fontSize="8" fontFamily="monospace">def get(self) -&gt; T:</text>
                  <text x="35" y="195" fill="#facc15" fontSize="8" fontWeight="bold">Preserves Type Links</text>

                  {/* Box 2: Protocol */}
                  <rect x="220" y="35" width="180" height="180" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="230" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">2. Protocol (Duck Type)</text>
                  <text x="230" y="85" fill="#e0f2fe" fontSize="8" fontFamily="monospace">class Renderable(Protocol):</text>
                  <text x="240" y="105" fill="#e0f2fe" fontSize="8" fontFamily="monospace">def render(self) -&gt; str:</text>
                  <text x="250" y="125" fill="#e0f2fe" fontSize="8" fontFamily="monospace">...</text>
                  <text x="230" y="195" fill="#facc15" fontSize="8" fontWeight="bold">Structural Subtyping</text>

                  {/* Box 3: TypedDict */}
                  <rect x="415" y="35" width="185" height="180" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="425" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">3. TypedDict</text>
                  <text x="425" y="85" fill="#e0f2fe" fontSize="8" fontFamily="monospace">class StudentDict(TypedDict):</text>
                  <text x="435" y="105" fill="#e0f2fe" fontSize="8" fontFamily="monospace">sid: str</text>
                  <text x="435" y="125" fill="#e0f2fe" fontSize="8" fontFamily="monospace">balance: float</text>
                  <text x="425" y="195" fill="#facc15" fontSize="8" fontWeight="bold">Compile-Time Dict Keys</text>

                  {/* Box 4: Literal & Self */}
                  <rect x="615" y="35" width="180" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="625" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">4. Literal &amp; Self</text>
                  <text x="625" y="85" fill="#ccfbf1" fontSize="8" fontFamily="monospace">Campus = Literal["BP", "CC"]</text>
                  <text x="625" y="110" fill="#ccfbf1" fontSize="8" fontFamily="monospace">def build(self) -&gt; Self:</text>
                  <text x="635" y="130" fill="#ccfbf1" fontSize="8" fontFamily="monospace">return self</text>
                  <text x="625" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Fluent Builder Types</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  THE DIÁTAXIS DOCUMENTATION ARCHITECTURE (4 QUADRANTS)
                </text>

                {/* 4 Quadrants */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Quadrant 1: Tutorials */}
                  <rect x="25" y="35" width="375" height="95" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="35" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">1. Tutorials (Learning-Oriented)</text>
                  <text x="35" y="80" fill="#ccfbf1" fontSize="8">Guides the novice student from zero to first working script.</text>
                  <text x="35" y="98" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Example: "Your First Student Admission in 5 Minutes"</text>

                  {/* Quadrant 2: How-To */}
                  <rect x="420" y="35" width="375" height="95" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="430" y="60" fill="#e0f2fe" fontSize="11" fontWeight="bold">2. How-To Guides (Problem-Oriented)</text>
                  <text x="430" y="80" fill="#bae6fd" fontSize="8">Step-by-step recipes for solving real-world specific tasks.</text>
                  <text x="430" y="98" fill="#e0f2fe" fontSize="8" fontFamily="monospace">Example: "How to Configure SQLite Foreign Keys"</text>

                  {/* Quadrant 3: Reference */}
                  <rect x="25" y="140" width="375" height="90" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="35" y="165" fill="#f3e8ff" fontSize="11" fontWeight="bold">3. Reference (Information-Oriented)</text>
                  <text x="35" y="185" fill="#d8b4fe" fontSize="8">Technical API specifications, signatures, docstrings, and tables.</text>
                  <text x="35" y="203" fill="#f3e8ff" fontSize="8" fontFamily="monospace">Example: "AdmissionService API &amp; Docstrings"</text>

                  {/* Quadrant 4: Explanation */}
                  <rect x="420" y="140" width="375" height="90" rx="6" fill="#78350f" stroke="#f59e0b" />
                  <text x="430" y="165" fill="#fef3c7" fontSize="11" fontWeight="bold">4. Explanation (Understanding-Oriented)</text>
                  <text x="430" y="185" fill="#fde68a" fontSize="8">Discussions on architecture, design trade-offs, and why.</text>
                  <text x="430" y="203" fill="#fef3c7" fontSize="8" fontFamily="monospace">Example: "Why the src/ Layout Prevents Import Parity Bugs"</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE DOCSTRING & TYPE SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Docstring &amp; Static Type Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Switch between standard Python docstring styles (Google, NumPy, Sphinx) and toggle static Mypy strict mode analysis:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Control Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Docstring Format Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Docstring Specification Format:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "GOOGLE", label: "Google Style" },
                    { id: "NUMPY", label: "NumPy Style" },
                    { id: "SPHINX", label: "Sphinx Style" },
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setDocstringFormat(fmt.id)}
                      className={clsx(
                        "p-2.5 rounded-xl border text-center font-mono font-bold transition-all",
                        docstringFormat === fmt.id
                          ? "bg-teal-950/60 border-teal-500 text-teal-300 shadow-md"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mypy Strict Toggle */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Mypy Static Analysis Strictness:
                </label>
                <button
                  onClick={() => setEnableStrictMypy(!enableStrictMypy)}
                  className={clsx(
                    "w-full p-2.5 rounded-xl border font-mono text-xs font-bold transition-all",
                    enableStrictMypy
                      ? "bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  )}
                >
                  {enableStrictMypy ? "MYPY STRICT MODE: ACTIVE (--strict)" : "LENIENT TYPE CHECKING"}
                </button>
              </div>
            </div>

            {/* Generated Code Window */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Generated Annotated Function with PEP 257 Docstring:
              </div>
              <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-teal-200 overflow-x-auto leading-relaxed">
                {docstringSnippet}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: DEEP DIVE CODE LABS (PYTHON FILE LOADERS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Production Code Labs &amp; Documentation Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade documentation and typing labs covering PEP 257 Google docstrings, PEP 484 static typing, automated README generators, and institutional verification suites:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: PEP 257 Google Docstrings &amp; Executable Doctests
                </h3>
                <p className="text-sm text-slate-400">
                  Documenting Args, Returns, Raises, and running embedded doctests automatically with <code className="text-teal-300 font-mono">doctest.testmod()</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={docstringCode}
                title="pep257_docstrings_and_sphinx_formatting.py"
                highlightLines={[18, 30, 42, 54]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: PEP 484 Static Typing, Protocols &amp; Generics
                </h3>
                <p className="text-sm text-slate-400">
                  Annotating structural subtyping with <code className="text-cyan-300 font-mono">Protocol</code>, generic repositories with <code className="text-cyan-300 font-mono">TypeVar</code>, and typed dictionary payloads with <code className="text-cyan-300 font-mono">TypedDict</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={staticTypingCode}
                title="pep484_static_typing_and_mypy_annotations.py"
                highlightLines={[14, 25, 38, 54]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Standout Open-Source README Generator with Shields.io Badges
                </h3>
                <p className="text-sm text-slate-400">
                  Automating GitHub README generation complete with quickstart installation guides, CLI examples, and CI status badges.
                </p>
              </div>
              <PythonFileLoader
                fileModule={readmeGenCode}
                title="readme_generation_and_badges.py"
                highlightLines={[12, 28, 44, 60]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Institutional Documentation &amp; Certification Engine Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Full self-documenting graduation certification engine generating verified graduation transcripts for Mamata across Barrackpore and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={institutionalAuditCode}
                title="institutional_documentation_audit_suite.py"
                highlightLines={[16, 32, 48, 68]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS & ANTI-PATTERNS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Documentation &amp; Typing Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Outdated Docstrings with Mismatched Args
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Refactoring function parameters without updating the docstring confuses callers and breaks automated API documentation builds.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: def f(a, b): """Args: x, y""" (Stale!){'\n'}
                # BEST PRACTICE: Run automated doctests in CI
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Overuse of Any (Type Erasure)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Annotating everything with <code className="text-rose-400 font-mono">Any</code> disables Mypy type-checking completely, defeating the purpose of static typing.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: def process(data: Any) -&gt; Any{'\n'}
                # BEST PRACTICE: Use TypeVar, Protocol, or TypedDict
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Untested Code Examples
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing code snippets in docstrings that contain syntax errors or outdated APIs misleads developers and recruiters.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Add '&gt;&gt;&gt;' doctests and verify with doctest.testmod()
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Sparse 1-Line README Files
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Publishing repositories with empty or single-sentence READMEs repels open-source users and signals low code quality to hiring managers.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Include Badges, Quickstart, Usage, and Tests sections
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: BEST PRACTICES CHECKLIST */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✅</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Professional Documentation &amp; Typing Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">PEP 257 Google Format:</strong> Document every public function with summary, Args, Returns, and Raises blocks.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Embed Executable Doctests:</strong> Add interactive <code className="text-teal-300 font-mono">&gt;&gt;&gt;</code> code examples verified by <code className="text-teal-300 font-mono">doctest.testmod()</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Pass Mypy Strict Mode:</strong> Eliminate implicit <code className="text-teal-300 font-mono">Any</code> and unannotated function signatures.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Decorate README with Badges:</strong> Include Shields.io CI build, coverage %, and license badges at the top of the README.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Documentation, Docstrings &amp; Typing FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Writing Complete Documentation Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Code is written once, but read hundreds of times by your team, maintainers, and future employers. In our institutional student management systems across Barrackpore, Kolkata, Ichapur, and Jadavpur, pairing PEP 257 Google docstrings with executable doctests and strict PEP 484 static typing guarantees that every fee formula, admission waiver, and graduation certificate for Mamata, Mahima, and Susmita is self-documenting, autocompleting, and verifiably bug-free."
            }
          />
        </section>

      </div>
    </div>
  );
}
